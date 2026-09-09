# qbx_appearance

Appearance system for Qbox, built as a **full replacement for illenium-appearance** with a compatibility layer so your existing resources keep working while you migrate.

[:material-github: Repository](https://github.com/Epixx1337/qbx_appearance){ .md-button } [Installation](install.md){ .md-button .md-button--primary } [FAQ](faq.md){ .md-button }

![Clothing browser](https://raw.githubusercontent.com/Epixx1337/qbx_appearance/main/docs/media/editor-clothing.jpg)

## Why it's different

Every other appearance script stores clothing as **global drawable indexes** — numbers that shift every time a GTA title update lands or you reorder your clothing packs, silently corrupting saved outfits. qbx_appearance stores `{ collection, local index }` pairs through the FiveM collection natives instead. **Saved outfits survive game updates.** Only a genuinely removed drawable falls back — logged and skipped, never a crash.

## What's inside

- **One editor** for character creation, clothing stores, barbers, tattoo shops, the surgeon, lockers and the admin `/pedmenu` — floating category diamonds, an orbiting camera that zooms to the body part under your cursor, real screenshots for every item, image-grid heritage/skin/eyes, drag-pad face shaping.
- **The screenshot studio** — generates the 2,600+ item thumbnails in-game, resumable batches, per-DLC framing, a difference-matte pipeline for exact alpha. New pack added? One button shoots just that DLC.
- **Tattoos** — the full 840-entry catalogue with stacking, layer ordering and per-tattoo opacity.
- **Outfits** — full-look saves with wear-clothing-only / wear-hair-and-tattoos-only actions, in-game job & gang presets by bosses, sharing via `outfit_bag` items or nearby-player offers.
- **Items** — a clothing bag with the kneeling duffel animation, and `/pants`-style commands that strip worn pieces into real ox_inventory items with the piece's screenshot as its image.
- **Peds** — 1,000+ human models plus animals behind toggles, whitelist/blacklist, per-player grants, portraits in the model picker.

## Where to go next

| Page | For |
| --- | --- |
| [Installation](install.md) | SQL, items, aces, generating thumbnails |
| [FAQ & troubleshooting](faq.md) | blank thumbnails, `/pants` conflicts, migration |
| [Full reference](readme.md) | mirrored from the repo |
| [Configuration](config.md) · [The editor](editor.md) · [Screenshot studio](studio.md) · [Outfits](outfits.md) | deep dives |
| [Migration](migration.md) | leaving illenium-appearance / qb-clothing |
| [Events & exports](events.md) · [Schema](schema.md) · [Internals](internals.md) | for developers |
