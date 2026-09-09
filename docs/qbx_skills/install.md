# Installing qbx_skills

## What you need

| Dependency | Notes |
| --- | --- |
| [qbx_core](https://github.com/Qbox-project/qbx_core) | admin permission gates the editor |
| [ox_lib](https://github.com/CommunityOx/ox_lib) | radial menu entry, logger, UI theming |
| [oxmysql](https://github.com/CommunityOx/oxmysql) | |

## Steps

1. Ensure the resource **after `qbx_core`** — inside a `[qbx]` folder, `ensure [qbx]` covers it.
2. **Build the UI once**: `cd web && bun install && bun run build` (any npm-compatible tool works).
3. Start it — the tables in `skills.sql` are created automatically on first start, along with **three example trees** from `skills_seed.sql`. If the database user can't `CREATE`, run both `.sql` files by hand instead.

That's the whole install. Configuration lives in `config/shared.lua` — XP curve (`xp.base`, `xp.growth`, `xp.maxLevel`), `pointsPerLevel`, `linkRequirement`, `activeTreePerCategory`, tree-switching rules (`abandonResetsProgress`, `switchRequiresMaxLevel`, `inactivePerksApply`), the stat-perk caps under `stats`, and `seedExampleTrees`.

!!! tip "The example trees are meant to be replaced"
    They exist so the UI has something to show on first start. Build your own trees in the in-game editor, then set `seedExampleTrees = false` so deleted example skills stay gone and fresh installs start clean.

## After installing — sanity checklist

- [ ] The skill tree opens from the **ox_lib radial menu**
- [ ] An admin (qbx_core `admin` permission) sees the **Edit** button and the **Players** panel
- [ ] `exports.qbx_skills:AddXp(source, 10)` from a test script raises XP on the active tree
- [ ] Unlocking a `max_health` skill visibly raises max health (`stats.enabled = true`)

## Wiring your activities

XP only flows in through exports — nothing is awarded automatically. Head to [Integrating your scripts](integration.md) for `AddXp` (with the category system), `AddTreeXp`, `HasSkill`, `GetSkillBonus`, `GetLevel` and worked examples for lockpicking, jobs and crafting.
