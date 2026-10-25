---
title: Full reference
---

!!! info "Mirrored from GitHub"
    This page mirrors the [qbx_phone README](https://github.com/Epixx1337/qbx_phone/tree/main#readme) and is refreshed automatically.

# qbx_phone

A duck-themed phone for Qbox. The default device is the **Flip-Flop**: a flip phone
with a cover screen that also unfolds sideways into a tablet. The **Bill** is a
slab phone with a duck-bill home button, available as a second style.

## Features

- Calls over pma-voice, including **group calls** to a contact group
- **Duckcam** video calls, relayed through a Cloudflare TURN key you provide
- Contacts, favourites and contact groups
- **Peeps** texting to contacts or any number, with read receipts and unread badges
- **Flock** social feed: quack, requack, like, reply, mention and follow, with admin moderation
- Give your number to the player you are facing (radial menu), with an accept prompt
- Optional **SIM cards**: the phone becomes a one-slot ox_inventory container and the number lives on the SIM
- Optional **cell towers** with configurable coverage and an in-world debug view
- Optional **Wi-Fi networks** (15 unit range) with passwords, Wi-Fi calling and Wi-Fi-only apps
- Quick settings from the signal bars: Wi-Fi, mobile data, airplane mode, a synced flashlight and more
- Custom app API for other resources
- Duck ringtones and notification tones, synthesized in the browser (no audio files to license)
- Ring, vibrate and silent modes, do not disturb, and power off/on with a Qbox boot screen
- Contacts, settings, texts and logins live on the phone, so a stolen phone shows its owner's data
- Texts to a phone without service wait and arrive when it gets signal back
- Duck Cloud backs up contacts and settings so a new phone can restore them
- `/phoneadmin` panel for players, numbers, SIM cards, contacts, call history and Flock moderation
- Drop-in replacement for npwd exports used by other resources

## Requirements

- qbx_core, ox_lib, oxmysql, ox_inventory, pma-voice

## Install

1. Remove `npwd` and `qbx_npwd` from your server.
2. Add the items to `ox_inventory/data/items.lua`, see [docs/items.md](items.md).
3. `ensure qbx_phone` after the dependencies.

Tables are created on first start.

## Building the UI

The built UI in `web/build` is committed. Only rebuild after changing the source:

```sh
cd web
bun install
bun run build
```

`bun run dev` serves the UI in a browser with mock data and a control bar.
In the browser, M opens and closes the phone and Escape closes it. "closed phone"
keeps the closed Flip-Flop on screen (in game it goes back in the pocket) and
"hide phone" puts it away again. Useful URL options: `?open=1`, `&tablet=1`,
`&closed=1`, `&theme=slab`, `&off=1`, `&setup=1`, `&app=contacts`,
`&app=messages&thread=5550142921`, `&app=quackers&quack=2`, `&app=quackers&profile=jordan`,
`&app=quackers&hatch=1` (account setup),
`&scene=incoming|groupIncoming|call|groupCall|videoCall|endCall|offer|notify|text|arrived|quack|mention|admin`,
`&app=quackers&loggedout=1`, `&app=settings&page=cloud&stolen=1`,
`&clean=1` hides the bar.
In the preview, texts you send get a mock reply.

## Docs

- [Configuration](config.md)
- [Items and SIM cards](items.md)
- [Cell towers](towers.md)
- [Wi-Fi, quick settings and flashlight](wifi.md)
- [Custom apps](apps.md), with a starter resource in [templates/resource](https://github.com/Epixx1337/qbx_phone/blob/main/templates/resource)
- [Built-in apps](built-in-apps.md), with starter files in [templates/app](https://github.com/Epixx1337/qbx_phone/blob/main/templates/app)
- [Voice and group calls](voice.md)
- [Duckcam video calls](duckcam.md)
- [Flock](quackers.md)
- [Exports, events and npwd compatibility](exports.md)
- [Admin panel](admin.md)

## Contributing

Bug reports, feature requests and app proposals use the issue forms. Read
[CONTRIBUTING.md](https://github.com/Epixx1337/qbx_phone/blob/main/CONTRIBUTING.md) before opening a pull request. New built-in apps
need an accepted App proposal and use the app pull request template.
