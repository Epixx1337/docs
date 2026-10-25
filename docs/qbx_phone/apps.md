# Custom apps

Other resources can add apps to the phone. An app is a web page from your own
resource, shown inside the phone screen.

A complete starter resource lives in [templates/resource](https://github.com/Epixx1337/qbx_phone/blob/main/templates/resource).
Want to add an app to qbx_phone itself instead? See [built-in-apps.md](built-in-apps.md).

```lua
exports.qbx_phone:RegisterApp({
    id = 'beanrewards',
    label = 'Bean Rewards',
    url = ('https://cfx-nui-%s/web/index.html'):format(GetCurrentResourceName()),
    icon = ('https://cfx-nui-%s/web/icon.png'):format(GetCurrentResourceName()), -- optional
    background = 'linear-gradient(160deg, #a9713a, #6b4423)', -- optional icon background
    wifi = { 'beanmachine' }, -- optional: only while connected to these networks
    cover = true, -- optional: also show a glance view on the closed phone
})
```

Call it from a **client** script, for example on resource start. The app is
removed automatically when your resource stops, or with
`exports.qbx_phone:RemoveApp('beanrewards')`.

Your page must be listed in your own resource's `files {}` so it can be loaded.

## The three layouts

The Flip-Flop has three fold modes, and every app should look right in each of
them. Built-in apps all ship a layout per mode; follow the same pattern.

| Mode | When | App area (CSS px) | Notes |
| --- | --- | --- | --- |
| `cover` | Phone closed, app was open | **286 × 328** | Glance only, the player has no cursor. Keep the top-left 60 × 30 clear (camera lenses). |
| `phone` | Phone open | **286 × 556** | The main layout. Single column. |
| `tablet` | Phone unfolded | **586 × 556** | The largest. Use two panes or a grid, don't just stretch the phone layout. |

The **Bill** style only has `phone` mode, with an app area of **286 × 553**.

Sizes are logical CSS pixels. The whole phone is scaled to the player's screen
height and their phone-size setting, so design at these sizes and let the phone do
the scaling. The status bar and the home bar sit outside your app area; you never
need to pad for them.

### Responding to the mode

Your iframe's viewport *is* the app area, so plain media queries work, and they
switch live when the player folds or unfolds:

```css
.layout {
    display: flex;
    flex-direction: column;
}

/* tablet: 586 px wide */
@media (min-width: 450px) {
    .layout {
        display: grid;
        grid-template-columns: 40% 1fr;
    }
}
```

The phone also posts a context message whenever the mode, size, Wi-Fi network or
style changes:

```js
window.addEventListener('message', (event) => {
    if (event.data?.type !== 'qbx_phone:context') return
    const { mode, width, height, theme, tablet, wifi } = event.data
    document.body.dataset.mode = mode // 'cover' | 'phone' | 'tablet'
})
```

### Cover view

With `cover = true`, closing the phone while your app is open shows your app on the
cover screen. The phone loads a second copy of your page with `?mode=cover` added to
the URL (and sends `mode: 'cover'` in the context message), so you can render a
separate glance view:

```js
if (new URLSearchParams(location.search).get('mode') === 'cover') {
    document.body.classList.add('cover')
}
```

Keep cover views glanceable: one or two big pieces of information (a timer, a
count, a status), no inputs, no scrolling. The player can't click while the phone
is closed. Without `cover = true` the cover shows the clock instead.

### Layout tips

- **Phone first.** Design `phone` (286 px wide) first, then give `tablet` a real
  two-pane or grid layout: list on the left and detail on the right, keypad next to
  history, a two-column grid, and so on. The built-in Phone, Quackers, Settings and
  Duckcam apps all do this.
- **Unfolding happens while your app is open.** The layout changes size in place,
  without a reload. Don't store layout in JavaScript at load time; use media queries
  or react to the context message.
- **Match the phone's look.** Dark background (`#0a0a0c` to `#1a1b1e`), white text,
  Roboto, 12 to 16 px corner radii. The Qbox duck yellow is `#fcc419`, with the bill
  orange `#ff922b`.
- **Use a transparent page background** if you want the player's wallpaper to show
  through.

## Wi-Fi-only apps

With `wifi` set, the app appears on the home screen only while the player is
connected to one of the listed networks (see [wifi.md](wifi.md)). If the player
walks out of range with the app open, it shows a "Wi-Fi connection lost" screen.

## Talking to your own resource

Use your own resource's NUI callbacks as usual
(`fetch('https://<your-resource>/<callback>', { method: 'POST', body: '{}' })`).

## Notifications and badges

Send notifications with your app id so they count towards your icon's badge and open
your app when tapped:

```lua
exports.qbx_phone:Notify({ app = 'beanrewards', title = 'Bean Rewards', content = 'You earned a free coffee' })
```

The badge clears when the player opens your app or taps the notification. See
[exports.md](exports.md) for every option.
