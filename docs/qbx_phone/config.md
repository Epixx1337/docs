# Configuration

## `config/shared.lua`

| Key | Default | Description |
| --- | --- | --- |
| `phoneItems` | `{ 'phone' }` | Items that count as a phone |
| `simcards.enabled` | `false` | Numbers live on SIM cards instead of the character, see [items.md](items.md) |
| `simcards.item` | `'simcard'` | SIM card item name |
| `calls.ringTime` | `30` | Seconds before an unanswered call is missed |
| `calls.maxGroupSize` | `8` | Most people in one call, caller included |
| `quackers.enabled` | `true` | The Quackers social feed, see [quackers.md](quackers.md) |
| `share.distance` | `3.0` | How close the other player must be to receive your number |
| `share.cooldown` | `10` | Seconds between number shares |
| `towers` | | See [towers.md](towers.md) |
| `wifi` | | See [wifi.md](wifi.md) |

## `config/client.lua`

| Key | Default | Description |
| --- | --- | --- |
| `openKey` | `'F1'` | Opens and closes the phone. Players can rebind it in the FiveM key settings |
| `answerKey` / `declineKey` | `'Y'` / `'N'` | Answer or decline a ringing call while the phone is closed. Neither works while dead, downed or cuffed. To hang up, open the phone |
| `walkWhileOpen` | `true` | Keep movement while the phone is open. Typing in a text field always takes full focus |
| `themes` | `{ 'flip', 'slab' }` | Phone styles players can pick in Settings |
| `defaultTheme` | `'flip'` | Style a new phone starts with. `'flip'` is the Flip-Flop, `'slab'` is the Bill |
| `allowTablet` | `true` | Lets the Flip-Flop unfold into a tablet |
| `flashlight` | | Phone flashlight beam, see [wifi.md](wifi.md) |
| `duckcam` | | Selfie camera and video quality, see [duckcam.md](duckcam.md) |
| `prop`, `animations` | | Hand prop and animation clips |

The keys are FiveM key mappings named `qbx_phone_open`, `qbx_phone_answer` and
`qbx_phone_decline`, so players can rebind them under Settings → Key Bindings → FiveM.
Changing a default only affects players who never had the mapping before.

Limit players to one style by listing just that one in `themes`.

## `config/server.lua`

| Key | Default | Description |
| --- | --- | --- |
| `adminGroup` | `'group.admin'` | Principal allowed to use `/phoneadmin` |
| `wifiPasswords` | `{}` | Password per secured Wi-Fi network id, see [wifi.md](wifi.md) |
| `duckcam.enabled` | `false` | Video calls, see [duckcam.md](duckcam.md). Needs the Cloudflare convars |
| `duckcam.ttl` | `14400` | Lifetime in seconds of each player's TURN credential |
| `limits.contacts` | `250` | Contacts per character |
| `limits.groups` | `25` | Contact groups per character |
| `limits.groupMembers` | `8` | Contacts per group |
| `limits.messagesPer10s` | `10` | Texts one player can send per 10 seconds |
| `limits.quacksPerMinute` | `6` | Quacks and replies one player can post per minute |

Everything else a player can repeat is rate limited on the server too: 5 calls per 10
seconds, 20 contact, group, thread or recents changes per 10 seconds, 5 wrong Wi-Fi
passwords per minute, 3 Duck Cloud backups per 30 seconds, and 20 Quackers likes,
requacks or follows per 10 seconds.

## Player settings

Ringtone, tones, sound mode, volume, wallpaper, shell colour, style, size, do not
disturb, airplane mode and the power state are stored in the player's local KVP, keyed by character. With
Duck Cloud backup on (the default), a copy is kept in `qbx_phone_cloud` so a new
phone can restore it.

With SIM cards enabled, settings are also tied to the phone's serial. Picking up a
different phone starts the setup screen, which offers the Duck Cloud restore.

## Character deletion

Add the phone tables to `characterDataTables` in `qbx_core/config/server.lua` so
deleting a character removes its phone data:

```lua
{'qbx_phone_contacts', 'citizenid'},
{'qbx_phone_groups', 'citizenid'},
{'qbx_phone_cloud', 'citizenid'},
{'qbx_phone_quackers_accounts', 'citizenid'},
```

Deleting the Quackers account also deletes its quacks, likes and follows.

Call history and texts are stored per phone number, not per character, and are left
alone. With SIM cards they move with the SIM. `qbx_phone_simcards` is also keyed by
number; its `citizenid` column only records who used the SIM last.
