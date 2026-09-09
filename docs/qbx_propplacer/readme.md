---
title: Full reference
---

!!! info "Mirrored from GitHub"
    This page mirrors the [qbx_propplacer README](https://github.com/Epixx1337/qbx_propplacer#readme) and is refreshed automatically.

# qbx_propplacer

Scene creator for Qbox: type a word and place it as a real 3D sign (the [Atenea Alphabet](https://atenea.gitbook.io/atenea-store-r/props) prop pack), light it, and drop decorative props from a configurable catalog — all through an ox_lib-styled editor.

## Showcase

**Placement workflow (video):** [placement-showcase.mp4](https://github.com/Epixx1337/qbx_propplacer/releases/download/v1.0.0/placement-showcase.mp4) — gizmo, free placement, snapping and the freecam.

![Grid layout with per-letter overrides](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/editor-grid.jpg)
*Grid layout, per-letter colour / glow overrides, night-only glow and the Placement panel.*

![Freecam](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/freecam.jpg)
*Freecam: fly around the sign while the ped stays put; `G` brings the cursor back to use the panel.*

| New sign | Props catalog |
| --- | --- |
| ![New sign tab](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/tab-new-sign.png) | ![Props tab](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/tab-props.png) |

| My signs | All signs (admin) |
| --- | --- |
| ![My signs tab](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/tab-my-signs.png) | ![All signs tab](https://raw.githubusercontent.com/Epixx1337/qbx_propplacer/main/docs/tab-all-signs.png) |

## Features

- One command, one tabbed UI: **New sign** (live editor), **Props** (catalog + placed props), **My signs**, **All signs** (admins)
- Prop catalog driven by `config/shared.lua` → `props` with pictures from this resource's `images/` folder or straight from ox_inventory (`config/client.lua` → `imagePath`) — no items involved, it is a scene tool
- The sign in the world follows what you type; `Enter` starts a new line (stacked rows, side-by-side columns or a new grid row)
- Horizontal (left / centre / right aligned), vertical and free grid layouts
- Three colours (white / blue / yellow), emissive glow, optional night-only glow
- Per-letter colour, glow and offset overrides
- Spotlights and point lights with full RGB, intensity, distance, cone and falloff, optional fixture props, positioned with the gizmo — a marker and aim line show every light while editing
- Gizmo (move / rotate / scale), camera raycast placement, snap the whole word to the ground or flush against the nearest wall
- Free camera limited to a configurable range around the (frozen, clipboard-holding) ped
- Freeze and collision toggles per sign / prop
- Persistent (MySQL) and streamed through `lib.zones` — letters and props only exist for players near them, nothing is networked
- Ownership per character (citizenid + character name) with per-character caps (`maxSignsPerPlayer` / `maxPropsPerPlayer` in `config/server.lua`); admins can teleport to, edit and delete anything
- Full `lib.logger` audit trail

## Branches

| Branch | For |
| --- | --- |
| [`main`](https://github.com/Epixx1337/qbx_propplacer/tree/main) | Qbox only, requires ox_lib — the leanest version |
| [`multiframework`](https://github.com/Epixx1337/qbx_propplacer/tree/multiframework) | Qbox, QBCore, ESX Legacy, standalone or your own framework (`bridge/custom.lua`); ox_lib optional — see that branch's README for the framework setup |

**You are reading the `main` branch.**

## Requirements

- [qbx_core](https://github.com/Qbox-project/qbx_core)
- [ox_lib](https://github.com/overextended/ox_lib)
- [oxmysql](https://github.com/overextended/oxmysql)
- Optional: [ox_target](https://github.com/overextended/ox_target) for the "Edit sign" / "Move prop" / "Remove prop" options on placed objects

### Prop packs (paid, not included)

This resource ships **no models**. The packs it is built around are sold by their creators and must be bought and streamed separately:

| Pack | Used for | Buy |
| --- | --- | --- |
| Atenea — Alphabet | every sign letter (`ate_alphabet_*`) | https://atenea.tebex.io/package/7630928 |
| bzzz — Dream of Lights / World of Lamps | the default `config/shared.lua` → `props` catalog | https://bzzz.tebex.io/package/5650689 |

Any other prop pack works for the Props tab — add its models to `config/shared.lua` → `props`. Please respect the creators' licences: do not redistribute their files with this resource.

**Known pack issue (Atenea Alphabet 1.0.x):** a few drawables were exported with the wrong shader — `ate_alphabet_{blue,yellow}_emissive_t_2` use the plain `default` shader (lowercase `t` never glows in blue/yellow) and the plain `ate_alphabet_{white,blue,yellow}_3` use the `emissive` shader (the `3` always glows). Nothing in this resource can fix the files themselves; ask Atenea for corrected drawables.

## Install

1. Drop `qbx_propplacer` into your resources and `ensure qbx_propplacer` after qbx_core, ox_lib, oxmysql and the prop packs.
2. The tables `qbx_propplacer_signs` and `qbx_propplacer_props` are created automatically (see `schema.sql`).
3. Admin access is granted by `adminAce` in `config/server.lua` (`admin` or `group.admin`), which Qbox's default `add_ace group.admin admin allow` already covers.
4. Prop pictures: keep them in `images/` (default) or point `config/client.lua` → `imagePath` at `nui://ox_inventory/web/images/` to reuse your inventory images.

## Usage

`/props` (`command` in `config/server.lua`) opens the app. Tabs are shown according to your permissions.

| Tab | What |
| --- | --- |
| New sign | live editor — Sign (text, layout, style), Letters (per-letter overrides, grid), Lights |
| Props | Catalog: click a prop to place it · Placed: move / remove your props (admins can list everyone's) |
| My signs | edit / delete the signs your character owns |
| All signs | admins: teleport / edit / delete every sign |

The **Placement** panel on the right holds the gizmo, free placement, freecam, snapping and the numeric transform. While positioning it lists the active controls and offers *Done / Cancel* buttons.

## Controls

Shortcuts are captured by the UI (`keys` in `config/client.lua`), so nothing is registered as an in-game keybind. Press `G` to switch between the cursor (click the gizmo / UI) and mouse look.

| Mode | Keys |
| --- | --- |
| Gizmo | `W` move · `R` rotate · `S` scale · `Q` local/world · `Alt` snap to ground · `H` snap to wall · `LMB` drag a handle |
| Free place | mouse aims the sign · scroll rotates · `LMB` places |
| Freecam | `WASD` fly · `E` / `Q` up / down · `Shift` faster · `Ctrl` slower · flying past `freecam.range` in `config/client.lua` snaps you back |
| Any | `G` cursor / look · `F` freecam · `Enter` done · `Backspace` cancel |

## Logging

Every action goes through ox_lib's `lib.logger` (configure `ox:logger` / `ox:loggerEndpoint` as usual). Each line carries `name`, `source`, `license`, `citizenid`, `character`, the player's coordinates and a `kind` (sign / prop); sign events add `signId`, `text`, `owner`, layout / style flags, scale, letter and light counts and the sign position, prop events add `propId`, `model`, owner, flags and position.

| Event | When |
| --- | --- |
| `propplacer:startup` / `propplacer:startup_error` | signs and props loaded from the database / schema or load failures |
| `propplacer:command` | `/props` used |
| `propplacer:sync` | a client received the sign and prop lists |
| `propplacer:list_own` / `propplacer:list_admin` | a sign or prop list opened |
| `propplacer:editor_open` / `propplacer:editor_cancel` | editor opened (create / edit sign, place / move prop) / discarded |
| `propplacer:created` / `propplacer:updated` / `propplacer:deleted` | persisted changes (admin actions on other people's objects are flagged) |
| `propplacer:save_rejected` / `propplacer:delete_rejected` | validation, ownership, permission, distance or limit failures (with `reason`) |
| `propplacer:admin_teleport` | admin teleported to a sign or prop |
| `propplacer:permission_denied` | admin-only action attempted without permission |
| `propplacer:error_db` | insert / update / delete failures |

## Configuration

| File | Holds |
| --- | --- |
| `config/server.lua` | command, admin aces, create restriction, per-character sign / prop caps, placement distance |
| `config/shared.lua` | colours, letter / light limits, scale range, layout defaults, light fixtures, prop catalog |
| `config/client.lua` | image path, streaming distance, model timeout, light defaults, freecam, editor scenario, keys and controls |

If words appear mirrored in-game, set `frontIsPositiveY = true` in `config/client.lua`.

Adding a prop is one line:

```lua
{ model = 'prop_beach_fire', label = 'Beach fire', image = 'beach_fire.png' },
```

## Building the UI

```
cd web
bun install
bun run build
```

## Credits

- Letter models: [Atenea Alphabet](https://atenea.tebex.io/package/7630928) by Atenea
- Default prop catalog: [Dream of Lights / World of Lamps](https://bzzz.tebex.io/package/5650689) by bzzz
