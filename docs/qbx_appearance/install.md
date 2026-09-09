# Installing qbx_appearance

## What you need

| Dependency | Notes |
| --- | --- |
| [qbx_core](https://github.com/Qbox-project/qbx_core) | |
| [ox_lib](https://github.com/CommunityOx/ox_lib) · [oxmysql](https://github.com/CommunityOx/oxmysql) · [ox_inventory](https://github.com/CommunityOx/ox_inventory) | |
| [screencapture](https://github.com/pushkarydv/screencapture) | **studio only** — needed to generate thumbnails, can be stopped afterwards |

!!! warning "Replacing, not adding"
    If the server currently runs **illenium-appearance or qb-clothing, remove them completely** — do not just `stop` them. qbx_appearance re-registers their events and exports through its compat layer; if the originals are still started, both fight over `/reloadskin`, the events and the `playerskins` table. Migration of existing player data is covered in [Migration](migration.md).

## Steps

1. **Import [`sql/install.sql`](https://github.com/Epixx1337/qbx_appearance/blob/main/sql/install.sql)** into your database (this one is always manual).
2. Add the item definitions from [Inventory items](items.md) to `ox_inventory/data/items.lua` (clothing bag, outfit bag, the physical clothing pieces).
3. `ensure qbx_appearance` **after** `qbx_core`, `ox_lib`, `oxmysql`, `ox_inventory`, `screencapture`.
4. Grant the studio permission: `add_ace group.admin qbx_appearance.studio allow` in `server.cfg`.
5. **Generate the thumbnails once** on a dev client: `/screenshotclothing`, `/screenshotfaces`, `/screenshotpeds`, then restart the resource. The [studio guide](studio.md) covers the framing presets and the one client convar headless clothing shots need.
6. Migrating? Run `/convertappearance illenium` (or `qb-clothing`) after reading [Migration](migration.md) — it includes the small qbx_core patches.

The NUI ships prebuilt in `web/build` (`cd web && bun i && bun run build` to rebuild).

## After installing — sanity checklist

- [ ] Character creation opens the new editor for a fresh character
- [ ] Clothing store / barber / tattoo zones open their scoped editors
- [ ] Item thumbnails show real screenshots (not placeholders) after the studio run + restart
- [ ] `/pedmenu` works for admins
- [ ] `/pants` strips the pants into an inventory item (if it plays an animation instead, see the [FAQ](faq.md#pants-plays-an-animation-instead-of-giving-me-the-item))

## Config

Everything lives in `config/` — [Configuration](config.md) documents every option (`config/shared.lua` for items/commands, `config/client.lua` for editor & camera, `config/peds.lua` for the model lists, `config/server.lua`, `config/tattoos.lua`).
