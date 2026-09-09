# Installing qbx_properties

## What you need

**Required**

| Dependency | Notes |
| --- | --- |
| [qbx_core](https://github.com/Qbox-project/qbx_core) | our [qbx_core build](../qbx_core/index.md) works too |
| [ox_lib](https://github.com/CommunityOx/ox_lib) · [oxmysql](https://github.com/CommunityOx/oxmysql) · [ox_inventory](https://github.com/CommunityOx/ox_inventory) · [ox_target](https://github.com/CommunityOx/ox_target) | the usual stack |
| [ox_doorlock](https://github.com/CommunityOx/ox_doorlock) | **needs three small additions** — see below, doors are skipped without them |
| [screencapture](https://github.com/pushkarydv/screencapture) | realtor property photos |

**Optional** (detected at runtime): [Renewed-Banking](https://github.com/Renewed-Scripts/Renewed-Banking) for society/government payouts, [scully_emotemenu](https://github.com/Scullyy/scully_emotemenu) (its keybinds are suspended while decorating).

**Assets for specific features**: the [Battering-Ram](https://github.com/Epixx1337/Battering-Ram) weapon for police breaches, our [wiwang_hotel](https://github.com/Epixx1337/wiwang_hotel) edit and the [Prodigy shells](https://studio.prodigyrp.net/map) for tintable walls, K4MB1's free starter shells (bundled).

## Steps

1. **Remove `qbx_apartments` and `qbx_houses`.** They cover the same ground and will fight over spawns.
2. Use either no spawn system (qbx_core defaults to last location) or [qbx_spawn](https://github.com/Qbox-project/qbx_spawn).
3. Drop the resource in and ensure it **after** all the dependencies above.
4. **Do the [ox_doorlock additions](readme.md#ox_doorlock-additions)** — copy `docs/ox_doorlock/hooks.lua` into ox_doorlock's `server/`, wire the `doorAuthorization` hook into `server/main.lua`, and add the `createDoorProgrammatic` / `removeDoorByName` exports. This is the step everyone skips; without it the server log prints a warning on start and **property doors are ignored entirely**.
5. Start it once — tables are created and migrated automatically from `schema.sql` (run the file by hand only if your DB user can't `CREATE`/`ALTER`).
6. Optional: set an `imageUpload` API key in `config/server.lua` (Qbox CDN, Fivemanage or Fivemerr) so realtor photos upload instantly instead of needing a resource restart — see [Property photos](readme.md#property-photos).
7. Optional: run [`house_catalog.sql`](faq.md#i-ran-house_catalogsql-but-the-houses-have-no-interiors) once for 809 ready-made walk-in houses (needs the matching MLO house packs streamed).

!!! tip "First spawn works out of the box"
    New characters get an apartment immediately: the six built-in IPL apartments are marked `fallback = true` and are offered whenever none of the configured buildings has its map resource running — no MLO required for a working first join. Install a supported building map and it takes over automatically. For the apartment picker at character creation, qbx_core needs `characters.startingApartment = true` in its `config/client.lua`.

## After installing — sanity checklist

- [ ] Server log shows **no ox_doorlock warning** from qbx_properties on start
- [ ] A new character gets the apartment picker (or an auto-assigned unit) on first login
- [ ] A realtor (job in `realtorJobs`, `config/shared.lua`) sees the New property / Manage tabs in `/housing`
- [ ] Buying a test property locks its door and gives you access
- [ ] The housing tablet opens from the mounted prop via ox_target

## Where the config lives

| File | Contents |
| --- | --- |
| `config/shared.lua` | realtor jobs, property sizes/types, market, utilities, maintenance, physical keys, wall colours |
| `config/server.lua` | payouts, rent, stash sizes, image upload, Discord log webhook |
| `config/client.lua` | furniture catalog + categories, interior IPL data, editor settings |
| `config/crime.lua` / `config/dispatch.lua` | robbery & raid rules, dispatch hooks |
| `config/buildings.lua` | apartment buildings (written by the MLO Apartments Creator) |
| `config/garages.lua` | third-party garage adapters |

The [full reference](readme.md#configuration) walks through every option worth knowing.
