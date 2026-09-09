# qbx_propplacer

Scene creator for Qbox: **type a word and place it as a real 3D sign** (the Atenea Alphabet prop pack), light it, and drop decorative props from a configurable catalog — all through one ox_lib-styled tabbed editor.

[:material-github: Repository](https://github.com/Epixx1337/qbx_propplacer){ .md-button } [Installation](install.md){ .md-button .md-button--primary } [FAQ](faq.md){ .md-button }

![Grid layout with per-letter overrides](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/editor-grid.jpg)

## What's inside

- One `/props` command, one tabbed UI: **New sign** (live editor — the sign in the world follows what you type), **Props** (catalog + placed props), **My signs**, **All signs** (admins).
- Layouts (horizontal/vertical/free grid), three colours, emissive glow with a night-only option, and **per-letter** colour/glow/offset overrides.
- Spotlights and point lights with full RGB, intensity, distance, cone and falloff, positioned with the gizmo.
- Gizmo (move/rotate/scale), camera-raycast placement, ground/wall snapping and a range-limited freecam.
- Persistent in MySQL and **streamed through `lib.zones`** — letters and props only exist for players near them, nothing is networked.
- Ownership per character with per-character caps; admins can teleport to, edit and delete anything. Full `lib.logger` audit trail.

!!! warning "The models are paid packs — not included"
    The resource ships **no models**. Signs are built around the [Atenea Alphabet](https://atenea.tebex.io/package/7630928); the default prop catalog is bzzz's [Dream of Lights / World of Lamps](https://bzzz.tebex.io/package/5650689). Buy and stream them separately — any other prop pack works for the Props tab via `config/shared.lua`.

## Branches

| Branch | For |
| --- | --- |
| [`main`](https://github.com/Epixx1337/qbx_propplacer/tree/main) | Qbox + ox_lib — the leanest version (these docs) |
| [`multiframework`](https://github.com/Epixx1337/qbx_propplacer/tree/multiframework) | QBCore, ESX Legacy, standalone or your own framework bridge; ox_lib optional |

## Where to go next

| Page | For |
| --- | --- |
| [Installation](install.md) | packs, aces, images |
| [FAQ & troubleshooting](faq.md) | invisible letters, glow quirks, mirrored words |
| [Full reference](readme.md) | controls, logging events, config — mirrored from the repo |
