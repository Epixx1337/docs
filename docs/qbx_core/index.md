# qbx_core (Epixx build)

Our build of the **Qbox framework core** — a drop-in [qbx_core](https://github.com/Qbox-project/qbx_core) fork with the multicharacter screen rebuilt from scratch as a NUI. Everything else stays standard Qbox: the QB bridge layer, built-in multi-job/gang, the join queue, persistent vehicles and the export-based API.

[:material-github: Repository](https://github.com/Epixx1337/qbx_core){ .md-button } [Installation](install.md){ .md-button .md-button--primary } [FAQ](faq.md){ .md-button }

![panel layout](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/panel.jpg)

## The character select

- Every character the player owns **spawns into the world wearing their saved clothing**, with a portrait rendered by the game itself — nothing extra to install.
- **Five looks** via `uiLayout` in `config/client.lua`: `panel` (list + scene switcher, the default), `dock` (compact cards under the peds), `tags` (floating name tags), `cinematic` (letterbox + numbered list), `cards` (citizen ID cards with photos).
- **Scenes** — configurable places (camera + one spawn point per slot); one is picked at random per open, arrow keys switch, number keys pick a slot, Enter plays.
- **Registration** in the same style: name, nationality (optionally limited to `data/nationalities.lua`), sex and a date picker; the usual word/profanity checks run before the server callback.
- Deleting asks for confirmation (`enableDeleteButton` to remove entirely).
- Colours follow **ox_lib** through the `ox:primaryColor` / `ox:primaryShade` convars.
- **Same callbacks as stock qbx_core** — creating, loading and deleting characters go through the identical events, so other resources (including [qbx_properties](../qbx_properties/index.md)' apartment picker) work unchanged.

## Where to go next

| Page | For |
| --- | --- |
| [Installation](install.md) | swapping it in, scenes, layouts |
| [FAQ & troubleshooting](faq.md) | spawn points, layout switching, upstream parity |
| [Full reference](readme.md) | the whole README, mirrored from the repo |
