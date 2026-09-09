# qbx_core (Epixx build) — FAQ & troubleshooting

## Two characters stand inside each other on the select screen

The active scene has fewer `spawnPoints` than the player has characters — extra characters share the last point. Give **every** scene in `config/client.lua → characters.scenes` at least as many points as your character cap (`defaultNumberOfCharacters` / `playersNumberOfCharacters` in `config/server.lua`).

## How do I change the look of the screen?

`uiLayout` in `config/client.lua` under `characters`: `panel`, `dock`, `tags`, `cinematic` or `cards` — [screenshots of each](readme.md#layouts). Colours are not configured here at all: the UI follows ox_lib's `ox:primaryColor` and `ox:primaryShade` convars, like the rest of the ox-themed UIs on your server.

## Portraits are missing or blank

Portraits are ped headshots rendered by the game once the peds stand in the scene — there is nothing to install and no CDN involved. They are captured one after another, so on a slow load they can trail in by a second or two. If they never appear, check the F8 console for script errors and that `web/build` exists (rebuild: `cd web && pnpm install && pnpm build`).

## Does it work with my multicharacter-dependent resources?

Yes — that is the design constraint the redesign kept: **creating, loading and deleting characters go through the same callbacks as stock qbx_core**, and `QBCore:Server:OnPlayerLoaded` fires exactly as before. qbx_properties' first-login apartment picker, job scripts and HUDs need no changes.

## Can I still pull upstream Qbox updates?

It is a fork that tracks upstream — the multichar work is contained (mostly `web/`, the character client code and the `characters` config block). We merge upstream releases into the build; if you maintain your own fork of our fork, expect the occasional conflict in those areas.

## Where did the old apartment/spawn selection go?

Spawning after selection is unchanged — qbx_core spawns at last location by default, [qbx_spawn](https://github.com/Qbox-project/qbx_spawn) works as before, and with [qbx_properties](../qbx_properties/index.md) installed its `characters.startingApartment = true` flow opens the apartment picker for fresh characters right after the select screen.

## Something else?

The [full reference](readme.md) covers scenes, keys, registration and the build steps — bugs go to the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP).
