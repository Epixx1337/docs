# qbx_properties

Player housing for Qbox. Apartments, shell interiors and **real MLO houses** with an in-game realtor job, a furniture editor, a property market, rent and utilities, and police raids — no config-file property setup, everything is created standing at the property.

[:material-github: Repository](https://github.com/Epixx1337/qbx_properties){ .md-button } [Installation](install.md){ .md-button .md-button--primary } [FAQ](faq.md){ .md-button }

![Market tab](https://raw.githubusercontent.com/Epixx1337/qbx_properties/main/.github/media/market.png)

## What's inside

- **Properties** — pooled IPL apartments, multi-unit buildings (Wiwang Hotel, the four Prodigy towers, the Starlite Motel ship preconfigured), standalone shells, IPL interiors and MLO houses whose real front doors lock. Property types (residential, commercial, warehouse, gang), purchasable upgrades, breaker/wiring electricity, maintenance fees with seizure, owner-to-player leasing, doorbell + doorcam, optional physical key items.
- **Realtor job** — a four-step in-world wizard (laser door capture, interior points, gizmo-placed shells), a Manage panel over the whole catalog with map view, bulk listing, `/housephotos` guided photo tours and commission on sales and rent.
- **Decorating** — furniture editor with catalog, gizmo, snapping, modular walls with a 32-colour tint palette, priced furniture with a cart, real ox_inventory stashes (fridges keep food fresh, pin-code storage), garden zones, saveable furniture layouts with share codes.
- **Economy** — market with direct sales, auctions (anti-snipe) and escrowed offers, an interactive GTA map of listings, rent cycles, utility billing, a sales ledger, optional society/government accounts, and `house_catalog.sql` with 809 ready-made walk-in houses.
- **Crime** — burglary with lockpicking and alarms, police raids with warrants and a battering-ram door breach.

## The 60-second tour

1. A **realtor** stands at a house, runs the New property wizard, captures the door with the laser, sets price/size/type and lists it.
2. A **buyer** finds it on the market (or the map), buys, and walks in through the now-locked front door with their key.
3. They **furnish** it in the editor, mount the housing tablet, grant a roommate door access, and pay the power bill from the Utilities tab.
4. The police get a **warrant**, breach the door with the ram, and rob the safe. The insurance premium was not covered.

## Where to go next

| Page | For |
| --- | --- |
| [Installation](install.md) | dependencies, the ox_doorlock additions, first start |
| [FAQ & troubleshooting](faq.md) | doors not locking, photos, first-spawn apartments, limits |
| [Full reference](readme.md) | every feature and config option, mirrored from the repo |
| [Property types & upgrades](upgrades-and-types.md) | the type system, upgrade catalog, electricity |
| [Garage systems](garage-systems.md) | qbx_garages default, jg / cd / okok bridges |
| [Phone integrations](phone-integrations.md) | lb-phone and sd-phone home apps |
| [Placeable inventory items](placeable-items.md) | letting your scripts' items become furniture |
| [Embedding the UI](third-party-ui.md) | the market inside fd_laptops and friends |
