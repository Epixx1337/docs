# Built-in apps

Built-in apps live inside qbx_phone and ship to every server. Apps for a single
server don't belong here; register them from your own resource instead (see
[apps.md](apps.md) and [templates/resource](https://github.com/Epixx1337/qbx_phone/blob/main/templates/resource)).

## Process

1. Open an **App proposal** issue. Describe the app, its three layouts, its data and
   its config.
2. Wait for a maintainer to accept it.
3. Build the app from [templates/app](https://github.com/Epixx1337/qbx_phone/blob/main/templates/app).
4. Open a pull request with the app template (add `?template=app.md` to the "open
   pull request" URL) and work through its checklist.

## How an app is put together

| Piece | Where |
| --- | --- |
| App component | `web/src/lib/apps/<Name>.svelte` |
| Cover component | `web/src/lib/apps/cover/<Name>Cover.svelte` |
| Registration | `APPS` and `ICON_BACKGROUNDS` in `web/src/lib/apps/registry.js` |
| Routing | `APPS` map in `web/src/lib/screen/Screen.svelte` |
| Icon | `web/src/lib/ui/pixelIcons.js`, 32 × 32 |
| Client state shared with notifications or the cover | a `*.svelte.js` module next to `store.svelte.js`, like `messages.svelte.js` |
| NUI ↔ server | the `passthrough` table in `client/main.lua` and `lib.callback.register` on the server |
| Live pushes from the server | `TriggerClientEvent` → `SendUI` in `client/main.lua` → `onMessage` in `App.svelte` |
| Tables | `SCHEMA` in `server/modules/db.lua` |
| Server logic | `server/modules/<feature>.lua` |
| Dev mocks | `web/src/lib/devmock.js` |

Peeps is a complete worked example of every row above: `Messages.svelte`,
`PeepsCover.svelte`, `messages.svelte.js`, `server/modules/messages.lua` and the
`qbx_phone_messages` table.

## Layout rules

The app component gets two props: `wide` (true in the tablet) and `mode` (`'phone'`
or `'tablet'`). The cover is a separate component because the full app isn't mounted
while the phone is closed.

| Mode | Size | Rules |
| --- | --- | --- |
| `cover` | 286 × 328 | Glance only. No inputs, no scrolling. Keep the top-left 60 × 30 clear for the camera lenses. Read from the store; don't fetch. |
| `phone` | 286 × 556 | One column. Navigate between list and detail. |
| `tablet` | 586 × 556 | Two panes (list ~40% plus detail) or a grid. Never a stretched phone layout. |
| Bill | 286 × 553 | Same as `phone`. There is no home bar, so don't rely on it. |

Folding and unfolding happen while the app is open, and the component stays mounted.
Keep state in `$state`, not in anything tied to the layout.

## UI conventions

- Svelte 5 runes (`$state`, `$derived`, `$effect`), no stores from `svelte/store`.
- Use `Header`, `Avatar`, `Icon`, `Toggle` and `Duck` from `web/src/lib/ui`.
- Colours come from the theme variables: `--duck` (#fcc419), `--bill` (#ff922b),
  `--accent`, `--accent-light`, `--dark-0` … `--dark-9`, `--green`, `--red`.
- Don't use `color-mix()` or `color-scheme` in CSS: the FiveM browser drops them, and
  `color-scheme: dark` paints the whole game black.
- Duck-themed names and copy, in a light tone ("Start quacking", "Peep").
- Notifications from your app always set `app: '<id>'`, so badges and tap-to-open work.
  Use `badge: false` when you count unread items yourself, as Peeps does.

## Server conventions

- Follow the qbx_core Lua style: 4 spaces, `local` everything, early returns.
- Validate every value from the client: its type, length and ownership. Never trust
  ids, numbers or prices sent by the UI.
- Rate-limit anything a player can repeat with `limiter.allow(source, key, count)`
  from `server/modules/limiter.lua`. Put limits admins may tune in
  `config/server.lua` under `limits`.
- Character-owned data uses `citizenid`; data that follows a SIM uses the phone number.
  List character-owned tables under character deletion in [config.md](config.md).
- Respect the phone state: check `phones.isPowered` and `phones.hasService` before
  anything that needs signal.

## Testing

```sh
cd web
bun run dev
```

Open `http://localhost:5199/?open=1&app=<id>` and check:

- `&tablet=1` for the tablet layout
- `?closed=1&app=<id>` for the cover
- `&theme=slab` for the Bill
- unfolding and folding with the app open (control bar → "tablet on / off")

Then test on a local Qbox server, with two players if the app sends anything to
other players.
