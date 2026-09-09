# General FAQ

Questions that apply across the scripts. Each script also has its own FAQ page with the script-specific ones.

## Which framework do these run on?

[Qbox](https://qbox-project.github.io/). They are written against qbx_core and the ox stack (ox_lib, oxmysql, and where stated ox_inventory, ox_target, ox_doorlock) — not QBCore, not ESX.

The one exception: **qbx_propplacer** has a [`multiframework` branch](https://github.com/Epixx1337/qbx_propplacer/tree/multiframework) supporting QBCore, ESX Legacy, standalone or a custom bridge.

## Do I need to build the web UIs?

No — every script ships its NUI prebuilt. You only rebuild after changing the UI source:

| Script | Rebuild |
| --- | --- |
| qbx_properties | `cd web && bun i && bun run build` |
| qbx_appearance | `cd web && bun i && bun run build` |
| qbx_skills | `cd web && bun install && bun run build` |
| qbx_propplacer | `cd web && bun install && bun run build` |
| qbx_core | `cd web && pnpm install && pnpm build` |

Any npm-compatible tool works if you don't use bun/pnpm.

## Do I have to run SQL files by hand?

Usually not — qbx_properties, qbx_skills and qbx_propplacer create and migrate their tables automatically on first start. Run the shipped `.sql` files manually only when your database user is not allowed to `CREATE`/`ALTER`, or when a changelog explicitly says so (qbx_appearance's `sql/install.sql` is the one that is always manual).

## In what order do resources need to start?

Dependencies first, always: `oxmysql`, `ox_lib` (and `ox_inventory` / `ox_target` / `ox_doorlock` where used), then `qbx_core`, then the script. If you keep the scripts inside a `[qbx]` folder, one `ensure [qbx]` after the ox stack covers it.

## How do I update safely?

Watch **#updates** on [Discord](https://discord.gg/2PjtpqdQXP): every change is posted as a changelog. If it contains an **⚠️ Action required** block — a new config key, an SQL file to run, a dependency bump — do those steps as part of the update. Nothing in that block means drop-in.

## Are the scripts free?

The public ones, yes — source on [GitHub](https://github.com/Epixx1337), releases announced on Discord. qbx_propplacer's *models* (the Atenea alphabet and the bzzz lights it is built around) are paid packs by their creators and are never bundled — buy and stream them separately.

## Where do I report a bug?

The **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP). Use the pinned template — script, version, description, steps to reproduce, expected/actual and a screenshot or video. Reports that follow it get picked up by our triage tooling automatically; reports that don't get a bot reply asking for the missing pieces.
