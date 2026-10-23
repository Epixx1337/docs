# qbx_phone: FAQ & troubleshooting

## The phone doesn't open

- The character needs a `phone` item in their inventory, and the item has to exist in `ox_inventory/data/items.lua`.
- New characters start with the phone **switched off**. Opening it shows the power screen; press the power button on the side to boot it.
- The phone won't open while dead, in last stand, handcuffed, in the pause menu or swimming underwater.
- Another resource may have disabled it through npwd's `setPhoneDisabled`.

## Using the phone item opens a small inventory instead of the phone

That's SIM cards at work. With `simcards.enabled`, every phone is a one-slot container, and using the item opens the SIM tray. The phone itself opens with the keybind (`F1`) or the radial menu. See [Items and SIM cards](items.md).

## "Your phone has no SIM card"

With SIM cards on, the number lives on the SIM. Put a `simcard` item into the phone's tray, or hand one out from `/phoneadmin`.

## Calls connect but nobody hears anything

Calls run over pma-voice call channels. Make sure pma-voice is started and `voice_enableCalls` is at its default of `1`. Nothing in pma-voice needs changing, group calls included.

## "No signal" everywhere

Cell towers are on and the player is outside every tower's range. Add towers that cover your map, or turn `towers.enabled` off for full signal everywhere. Set `towers.debug = true` to see the coverage spheres in game. A Wi-Fi network in range also lets the phone make calls and send texts.

## The radial menu's give-number option does nothing

qbx_phone listens to the stock `qb-phone:client:GiveContactDetails` event, so the default qbx_radialmenu entry works unchanged. The other player has to be within `share.distance` (3 m), in front of you, carrying a phone that is switched on.

## Duckcam is missing

It stays hidden until it is set up. Set `duckcam.enabled = true` in `config/server.lua` and add both Cloudflare convars with `set` in `server.cfg`. See [Duckcam video calls](duckcam.md).

## Nobody hears the ringtone or notification sound

The sound mode is per phone: **Silent** mutes everything but still shows notifications, **Vibrate** only buzzes quietly, and **Do not disturb** hides notifications and silences calls. A call still shows up when you open the phone and goes to missed if you don't. Check the slider on the side of the phone and the quick settings.

## A badge won't go away

Badges clear when you open the app or tap the notification. In Peeps, unread texts count per conversation, so the badge goes down as you open each conversation. Closing a notification with its × keeps the badge, like a real phone.

## Pressing N doesn't hang up

The decline key (`N`) only declines a call that is still ringing. To end a call you're in, open the phone and tap the red button. This keeps players who talk with `N` from hanging up by accident. Players can rebind both keys under Settings → Key Bindings → FiveM.

## "Wait a moment before calling again" or "Slow down"

The server rate-limits calls, texts and contact changes so a modified client can't spam other players or the database. Normal use never hits the limits; see [Configuration](config.md).

## Quackers says "No connection"

Quackers needs cell service or Wi-Fi, like calls and texts. Check the signal bars, airplane mode and mobile data in quick settings. With cell towers on, move into coverage or join a Wi-Fi network.

## Can a player change their Quackers handle?

Not from the phone, so mentions keep pointing at the right person. Players can change their display name and bio from their profile. An admin can change the handle in `/phoneadmin` → Quackers.

## How do I remove a quack or a rude account name?

Open `/phoneadmin` → Quackers. Find the account by handle, name or citizen ID, then rename it or list its quacks and delete them. A deleted quack disappears from every open phone straight away. To turn the app off for everyone, set `quackers.enabled = false` in `config/shared.lua`. See [Quackers](quackers.md).

## Can other resources send texts or notifications?

Yes. `exports.qbx_phone:SendMessage(sender, number, body)` on the server sends a text; the sender can be a short label such as `'Bennys'`. `exports.qbx_phone:Notify({...})` on the client shows a notification. npwd's `emitMessage` and `createNotification` keep working too. See [Exports and events](exports.md).

## Can I add my own app?

Yes. Register it from your own resource with `exports.qbx_phone:RegisterApp`. A complete starter resource lives in the repository's `templates/resource` folder. See [Custom apps](apps.md). To add an app to the phone itself, see [Built-in apps](built-in-apps.md).

## Do players keep their settings on a new phone?

Settings live in the player's local KVP, per character. With SIM cards on, a different phone starts the setup screen, which offers to restore the **Duck Cloud** backup. Contacts and groups belong to the character and are never lost with a phone.

## Something else?

The [full reference](readme.md) and the pages in the sidebar cover every option. Bugs go to the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP).
