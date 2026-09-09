# qbx_skills

Skill tree progression for Qbox: players pick a **specialization**, earn XP from activities around the server, spend the talent points they gain on level-up and unlock skills that other resources query through exports. Admins edit the trees **live in-game** — nodes, links, descriptions, icons, bonuses, whole trees — no restarts, no config files.

[:material-github: Repository](https://github.com/Epixx1337/qbx_skills){ .md-button } [Installation](install.md){ .md-button .md-button--primary } [FAQ](faq.md){ .md-button }

![Skill tree](https://raw.githubusercontent.com/Epixx1337/qbx_skills/main/docs/media/tree-view.png)

## What's inside

- **Specializations** — any number of trees grouped into categories (crime, civilian, …). One tree is active per player — or one per category with `activeTreePerCategory` — and the rest lie dormant until selected.
- **Levels & talent points** — each level-up grants a point and raises the XP curve; points unlock skills in the tree. Skill links gate children behind parents (`linkRequirement = 'all'` for every parent).
- **The live editor** — admins (qbx_core `admin` permission) add, drag and delete skills, draw or cut links, edit labels/descriptions/costs/icons/bonuses, create or retire trees, undo — stored in the database and pushed to every online player instantly.
- **Admin player panel** — inspect any online player's progression, grant XP, levels or points.
- **Built-in stat perks** — `max_health`, `max_armour`, `stamina` applied to the ped by the script and published to HUDs via the `qbx_skills_stats` statebag.
- **Job-locked trees** — restrict a tree to jobs with minimum grades (`police, ambulance:2` syntax); enforced server-side, auto-deactivated on job loss.
- Opens from the **ox_lib radial menu**, themed by the `ox:primaryColor` / `ox:primaryShade` convars, everything logged via `lib.logger`.

## For your other scripts

The whole point: activity scripts award XP and query unlocks without knowing anything about trees —

```lua
exports.qbx_skills:AddXp(source, 15, 'crime')      -- only lands if a crime tree is active
exports.qbx_skills:HasSkill(source, 'fast_hands')
exports.qbx_skills:GetSkillBonus(source, 'lockpick_speed') -- summed across unlocked skills
```

[Integrating your scripts](integration.md) documents every export, the category system and full worked examples.

## Where to go next

| Page | For |
| --- | --- |
| [Installation](install.md) | dependencies, UI build, SQL, seed trees |
| [FAQ & troubleshooting](faq.md) | "no XP", editor access, seed trees |
| [Integrating your scripts](integration.md) | exports & category system |
| [Full reference](readme.md) | mirrored from the repo |
