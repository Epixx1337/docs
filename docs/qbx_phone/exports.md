# Exports and events

## Client exports

| Export | Description |
| --- | --- |
| `OpenPhone()` / `ClosePhone()` | Open or close the phone |
| `IsPhoneOpen()` | `boolean` |
| `HasPhone()` | `true` when the player carries a phone |
| `GetDevice()` | `{ serial, number, simcards }` or `nil` |
| `IsInCall()` | `true` while connected to a call |
| `Notify(data)` | Show a phone notification, see below |
| `RegisterApp(data)` / `RemoveApp(id)` | Add your own app, see [apps.md](apps.md) |

```lua
exports.qbx_phone:Notify({
    title = 'Garage',
    content = 'Your car was delivered',
    app = 'beanrewards',   -- optional, tapping opens this app and it gets a badge
    route = {},            -- optional, passed to the app when it opens
    badge = true,          -- optional, false skips the home screen badge
    duration = 5000,       -- optional
    keepOpen = false,      -- optional, stay until dismissed
    controls = true,       -- optional, adds Accept / Decline
    onConfirm = function() end,
    onCancel = function() end,
})
```

A notification with an `app` counts towards that app's badge on the home screen. The
badge clears when the player taps the notification or opens the app. Closing the
notification with its × keeps the badge, like a real phone. Do not disturb hides the
popup but still adds the badge.

## Server exports

| Export | Description |
| --- | --- |
| `GetPhoneNumber(source)` | The player's current number, or `nil` |
| `GetSourceByNumber(number)` | The online player holding that number |
| `IsInCall(source)` | `boolean` |
| `RefreshPhone(source)` | Re-check the player's phone and SIM, e.g. after editing their inventory |
| `SendMessage(sender, number, body)` | Text a number from another resource. `sender` is a number or a short label such as `'Bennys'` (max 20 characters); players can't reply to a label. Returns `true` when stored |

```lua
exports.qbx_phone:SendMessage('Bennys', '5550142921', 'Your vehicle is ready for pickup.')
```

## Events

| Event | Side | Description |
| --- | --- | --- |
| `qbx_phone:client:open` | client | Opens the phone |
| `qbx_phone:client:shareNumber` | client | Gives your number to the player you face |
| `qb-phone:client:GiveContactDetails` | client | Same as above. Kept so the stock qbx_radialmenu entry works unchanged |
| `qbx_npwd:client:setPhoneVisible` | client | `true` opens the phone, `false` closes it. Kept for resources written for qbx_npwd |

## npwd compatibility

qbx_phone answers the npwd exports other resources call, so they keep working after
npwd is removed. Don't run npwd at the same time.

| npwd export | Behaviour |
| --- | --- |
| `setPhoneVisible`, `isPhoneVisible` | Open/close and state |
| `setPhoneDisabled`, `isPhoneDisabled` | Blocks opening the phone |
| `createNotification` | Phone notification |
| `createSystemNotification` | Notification with Accept/Decline, `onConfirm`/`onCancel` are called |
| `removeSystemNotification` | Dismiss by id |
| `fillNewContact` | Opens a prefilled new contact |
| `newPlayer`, `getPhoneNumber` (server) | Refresh / number lookup |
| `emitMessage` (server) | Sends a Peeps text from `senderNumber` to `targetNumber` |
| `sendNPWDMessage`, `unloadPlayer` | Accepted and ignored |

npwd apps (`npwd_*` resources) don't run inside qbx_phone; only their notifications
show up.
