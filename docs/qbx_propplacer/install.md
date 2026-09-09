# Installing qbx_propplacer

## What you need

| Dependency | Notes |
| --- | --- |
| [qbx_core](https://github.com/Qbox-project/qbx_core) | (`main` branch — see the [`multiframework` branch](https://github.com/Epixx1337/qbx_propplacer/tree/multiframework) for QBCore/ESX/standalone) |
| [ox_lib](https://github.com/overextended/ox_lib) · [oxmysql](https://github.com/overextended/oxmysql) | |
| [ox_target](https://github.com/overextended/ox_target) | optional — "Edit sign" / "Move prop" / "Remove prop" on placed objects |

**Prop packs (paid, sold by their creators, never bundled):**

| Pack | Used for | Buy |
| --- | --- | --- |
| Atenea — Alphabet | every sign letter (`ate_alphabet_*`) | [atenea.tebex.io](https://atenea.tebex.io/package/7630928) |
| bzzz — Dream of Lights / World of Lamps | the default prop catalog | [bzzz.tebex.io](https://bzzz.tebex.io/package/5650689) |

## Steps

1. Drop the resource in and `ensure qbx_propplacer` **after** qbx_core, ox_lib, oxmysql **and the prop packs**.
2. Tables (`qbx_propplacer_signs`, `qbx_propplacer_props`) are created automatically from `schema.sql`.
3. Admin access comes from `adminAce` in `config/server.lua` (`admin` / `group.admin`) — Qbox's default `add_ace group.admin admin allow` already covers it.
4. Prop pictures: keep them in the resource's `images/` folder, or set `config/client.lua → imagePath` to `nui://ox_inventory/web/images/` to reuse your inventory images.

## After installing — sanity checklist

- [ ] `/props` opens the tabbed UI (`command` in `config/server.lua` to rename)
- [ ] Typing in **New sign** spawns letters in front of you that follow the text
- [ ] Letters have textures (if not — the Atenea pack isn't streamed, see the [FAQ](faq.md#letters-are-invisible-or-show-as-missing-models))
- [ ] An admin sees the **All signs** tab
- [ ] Props from the catalog place and persist over a restart

## Config

| File | Holds |
| --- | --- |
| `config/server.lua` | command, admin aces, per-character sign/prop caps, placement distance |
| `config/shared.lua` | colours, letter/light limits, scale range, layout defaults, **the prop catalog** |
| `config/client.lua` | image path, streaming distance, light defaults, freecam range, keys |

Adding a prop to the catalog is one line: `{ model = 'prop_beach_fire', label = 'Beach fire', image = 'beach_fire.png' }`.
