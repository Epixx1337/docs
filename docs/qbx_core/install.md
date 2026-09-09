# Installing qbx_core (Epixx build)

## What you need

Exactly what stock qbx_core needs:

| Dependency | |
| --- | --- |
| [oxmysql](https://github.com/overextended/oxmysql) | |
| [ox_lib](https://github.com/overextended/ox_lib) | |
| [ox_inventory](https://github.com/overextended/ox_inventory) | |

## Steps

1. **Replace** your existing `qbx_core` folder with [this build](https://github.com/Epixx1337/qbx_core) — it is a drop-in fork; your database, configs from upstream and dependent resources carry over. Diff your `config/` against the new files for the added `characters` options.
2. The UI ships prebuilt; after changing anything in `web/` rebuild with `cd web && pnpm install && pnpm build`.
3. Configure the character select in `config/client.lua` under `characters`:
   - `uiLayout` — `panel` (default), `dock`, `tags`, `cinematic` or `cards`.
   - `scenes` — the list of places characters are shown. Each scene has `camCoords` (`w` = camera heading) and `spawnPoints`, slot 1 on the first point, slot 2 on the second, and so on.
   - `startingApartment` — keep `true` if [qbx_properties](../qbx_properties/index.md) should offer the apartment picker to fresh characters.
4. Character slot counts stay where they always were: `defaultNumberOfCharacters` / `playersNumberOfCharacters` in `config/server.lua`.

!!! warning "Give every scene enough spawn points"
    Each scene needs **at least as many `spawnPoints` as characters a player can have**, otherwise the extra characters share a point and stand inside each other. The `dock` and `cards` layouts read left-to-right as seen from the camera — lay the points out that way.

## After installing — sanity checklist

- [ ] The character screen shows your characters standing in a scene, dressed, with portraits
- [ ] Arrow keys switch scenes; number keys select; Enter plays / opens registration
- [ ] Creating a character runs the registration form and spawns you as before
- [ ] UI colours match your `ox:primaryColor` / `ox:primaryShade` convars
- [ ] Resources that hook `QBCore:Server:OnPlayerLoaded` (job scripts, housing) behave exactly as before
