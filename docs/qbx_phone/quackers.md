# Quackers

Quackers is the phone's social feed. Players post short public quacks, requack and
like other quacks, reply in threads, mention each other and follow accounts.

## Accounts

The first time a character opens Quackers they hatch an account: a unique handle
(3 to 15 letters, numbers or underscores, not case sensitive) and a display name.
Players can change their display name and bio later, but not their handle. Admins
can rename both from `/phoneadmin`.

Accounts belong to the character, not the phone number, so they survive a lost
phone or SIM. Deleting the account (or the character, see
[config.md](config.md#character-deletion)) removes its quacks, likes and follows.

## Quacks

| Action | What happens |
| --- | --- |
| Quack | Posts up to 280 characters to the feed |
| Reply | Adds a reply to a quack's thread. Replying to a reply stays in the same thread and starts the text with an `@mention` of that person |
| Requack | Shares a quack to everyone's feed under your name. Tap again to undo |
| Like | Toggles a like. Likes don't notify anyone |
| Delete | Removes your own quack together with its replies, requacks and likes |
| `@handle` | Mentions a player. Up to 5 mentions per quack notify their owners |

The feed has two tabs: **For you** shows every quack on the server, **Following**
shows quacks and requacks from accounts you follow and your own. Replies only appear
in their thread and are counted on the quack. Profiles show an account's quacks,
requacks, bio and follower counts.

## Notifications

The owner of a quack is notified when someone replies to it or requacks it, and an
account is notified when someone mentions or follows it. They only arrive while the
player is online with a phone that has signal. Players can mute them under
Settings → Notifications → Quackers.

While the feed is open, new quacks from other players collect in a "new quacks"
button at the top instead of moving the list.

## Signal

Quackers needs a connection: cell service or Wi-Fi. Without one, the app shows "No
connection" and nothing can be posted or loaded.

## Moderation

`/phoneadmin` has a Quackers tab: search accounts by handle, name or citizen ID,
rename an account, list its quacks and delete any quack. A deleted quack disappears
from every open phone right away. See [admin.md](admin.md).

## Config

| Key | File | Default | Description |
| --- | --- | --- | --- |
| `quackers.enabled` | `config/shared.lua` | `true` | Shows the app and allows its server calls |
| `limits.quacksPerMinute` | `config/server.lua` | `6` | Quacks and replies one player can post per minute |

Likes, requacks and follows are limited to 20 per 10 seconds, and profile or account
changes to 5 per 10 seconds. Deleting is limited to 20 quacks and loading to 30 pages per 10 seconds.

## Tables

| Table | Holds |
| --- | --- |
| `qbx_phone_quackers_accounts` | One account per character: handle, name, bio |
| `qbx_phone_quacks` | Quacks, replies (`reply_to`) and requacks (`requack_of`) |
| `qbx_phone_quack_likes` | Who liked which quack |
| `qbx_phone_quack_follows` | Who follows whom |

The last three use foreign keys with `ON DELETE CASCADE`, so deleting an account
or a quack cleans up everything that depends on it.
