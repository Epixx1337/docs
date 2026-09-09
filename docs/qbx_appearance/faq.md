# qbx_appearance — FAQ & troubleshooting

## The clothing menu shows blank / placeholder thumbnails

The thumbnails are not shipped — they are **generated on your server** by the screenshot studio (every server's clothing packs differ, so pre-made images would be wrong). On a dev client with the `qbx_appearance.studio` ace:

1. Run `/screenshotclothing`, `/screenshotfaces`, `/screenshotpeds` (batches resume if interrupted — see [the studio guide](studio.md), including the client convar needed for headless clothing shots).
2. **Restart the resource** — like all FiveM streamed files, new images only reach clients after a restart.

Added a new clothing DLC later? The studio's per-DLC button shoots just that pack for both genders. To serve images over HTTP instead of the resource download, see [CDN thumbnails](cdn.md).

## `/pants` plays an animation instead of giving me the item

That is the known **qbx_radialmenu conflict**: its clothing module registers *client-side* chat commands with the same names (`/hat`, `/mask`, `/pants`, …), and a client command intercepts the chat command before qbx_appearance's server command runs. Fix: comment out the command-registration loop in `qbx_radialmenu/client/clothing.lua` (~line 912) — the radial menu's clothing *buttons* keep working, only its duplicate chat commands go. Alternatively rename qbx_appearance's commands in `config/shared.lua → physicalItems.slots[*].command`. Details: [Known conflicts](conflicts.md).

## Outfits broke after a GTA update / after reordering clothing packs

They shouldn't — that is the core design. Clothing is stored as `{ collection, local index }` pairs, which don't shift with title updates or pack order, unlike the global indexes every other appearance script saves. If a saved piece points at a drawable that was **genuinely removed** from the server, that piece is logged, skipped and the rest of the outfit loads. If you imported data from illenium/qb-clothing, make sure the [migration](migration.md) conversion ran — unconverted rows still hold old global indexes.

## Can I keep resources that depend on illenium-appearance?

Yes — the compat layer re-registers illenium's client events and exports, so dependent resources keep working unchanged. What you must do is **remove** (not stop) illenium-appearance / qb-clothing themselves, or both scripts fight over the same events and tables. See [Migration](migration.md) for the conversion commands and the qbx_core patches.

## Players spawn with a default ped / skin not applying

Check the load order (after qbx_core, ox_lib, oxmysql, ox_inventory) and that `sql/install.sql` was imported — the resource cannot save or load skins without its tables. The server console will show the failing query if the tables are missing.

## How do I give someone an animal ped / restrict ped models?

`config/peds.lua`: toggles for the human and animal sets, whitelist/blacklist per model, and per-player grants by any identifier. Portraits for the picker come from `/screenshotpeds`.

## Something else?

The [full reference](readme.md) links every deep-dive doc, and bugs go to the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP) with the template.
