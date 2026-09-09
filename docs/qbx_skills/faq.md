# qbx_skills — FAQ & troubleshooting

## Players do an activity and get no XP

Almost always the **category system doing its job**, not a bug. `AddXp(source, amount, category)` with a category only lands when the player's *active* tree belongs to that category — lockpicking a car that awards `'crime'` XP pays nothing while a civilian tree is active. That is exactly the showcased behaviour: first attempt pays 0 on a civilian spec, switch to the crime tree, the same lockpick pays 15 XP.

Checklist:

- The player has **activated** a tree of the right category (dormant trees never receive XP).
- With multiple categories in play, consider `activeTreePerCategory = true` so a crime *and* a civilian tree can be active at once.
- To pay a specific tree regardless of what's active, the integration should use `AddTreeXp` instead.
- The tree isn't at `xp.maxLevel`.

## The UI doesn't open / opens to a black screen

The NUI must be **built once**: `cd web && bun install && bun run build`. A missing `web/build` (or a failed build) is the black screen. It opens from the **ox_lib radial menu** — there is no command by default.

## No tables were created on first start

Table creation needs a database user with `CREATE` permission. Either grant it or run `skills.sql` and `skills_seed.sql` by hand once. The server console shows the failing query.

## How do I get rid of the example trees?

Delete or retire them in the in-game editor, and set `seedExampleTrees = false` in `config/shared.lua` — otherwise the seed re-inserts them (and previously deleted example skills) on a fresh database.

## I can't see the Edit button

The editor and the Players panel are gated by the **qbx_core `admin` permission** — the same one `/pedmenu`-style admin tools use. Check your ace/principal setup in qbx_core.

## Perks from my second tree stopped working

By design: unlocked skills only apply while their tree is **active**. `inactivePerksApply = true` (shared config) keeps dormant trees' skills working if you prefer that. Related: job-locked trees auto-deactivate the moment the player loses the job, taking their perks with them.

## Health / armour / stamina perks don't apply

`stats.enabled = true` is required (it is by default) — qbx_skills applies those bonuses to the ped itself and publishes them on the `qbx_skills_stats` statebag for HUDs. Caps live under `stats.healthCap` / `armourCap` / `staminaCap`; a bonus past the cap is clamped, not lost. If a different resource also manages max health, one of them has to own it.

## Something else?

[Integrating your scripts](integration.md) covers the export surface, the [full reference](readme.md) the config table — and bugs go to the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP).
