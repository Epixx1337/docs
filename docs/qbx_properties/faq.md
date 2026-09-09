# qbx_properties — FAQ & troubleshooting

## My doors aren't locking

The number one question, and it is almost always the same cause: **the ox_doorlock additions were skipped during install.**

Stock ox_doorlock only manages doors through its admin UI and has no access hooks, so qbx_properties needs three small additions to it — a hook file plus two exports. Without them the resource **prints a warning in the server console on start and skips property doors entirely**: MLO front doors, apartment unit doors and door furniture simply never register.

Fix:

1. Copy [`docs/ox_doorlock/hooks.lua`](https://github.com/Epixx1337/qbx_properties/blob/main/docs/ox_doorlock/hooks.lua) into ox_doorlock's `server/` folder.
2. Wire the `doorAuthorization` hook into ox_doorlock's `server/main.lua` (a `require` at the top and a small block at the end of the authorisation function).
3. Add the `createDoorProgrammatic` and `removeDoorByName` exports to the same file.
4. Restart ox_doorlock, then qbx_properties.

The exact code to paste is in the [README's ox_doorlock section](readme.md#ox_doorlock-additions). After the restart, the warning is gone and every property door registers and locks. Normal (non-property) ox_doorlock doors are never touched — the hook filters by door name.

!!! note "Still not locking for one specific house?"
    Boot-time validation reports properties that **share a door** (the same house created twice) in the console with names and ids. A shared door opens for anyone with access to *any* of those properties — delete the duplicate from the Manage tab.

## New characters don't get an apartment / the picker never opens

- qbx_core must have `characters.startingApartment = true` in its `config/client.lua` — that is what triggers the picker when a character loads with no property.
- With **no building maps installed** the six built-in IPL apartments take over automatically (they are `fallback = true` entries in `config/buildings.lua`), so a bare server still works.
- `apartmentChoice = false` (shared config) skips the picker on purpose and auto-assigns the first free unit; a single active building also skips it on its own.
- Using **um-multicharacter**: it hands characters over only when `setr um:NewPlayerApartmentInsideStart "true"` is in `server.cfg` — the convar, not its config value. See [the README](readme.md#using-a-different-multicharacter-or-spawn-system) for the um-spawn bridge details.

## Realtor photos don't show up

Photos taken without a CDN configured are saved as **local files and only stream to clients after the next resource restart** — that is a FiveM limitation, not a bug. Either restart when convenient, or set an `imageUpload` provider + API key in `config/server.lua` (Qbox CDN, Fivemanage, Fivemerr or a custom host) and photos appear immediately. If an upload fails, the local file is kept as a fallback.

## I ran house_catalog.sql but the houses have no interiors

`house_catalog.sql` seeds 809 priced, typed walk-in houses — but the **interiors are MLO house packs you stream yourself**. Without the matching MLOs, the doors exist and the catalog fills, but there is nothing behind the door. Run the file **once, by hand** (it is intentionally not automatic), then let realtors list houses at their own pace — the Manage tab's bulk-list button can put every unowned house on the market in one click.

## Players say furniture is too expensive / I want decorating free

`furnitureShop = false` in `config/shared.lua` ignores all furniture prices: everything places instantly for free and the shopping cart never appears.

## "You already own the maximum number of properties"

`propertyLimit` (shared config) is enforced on **every** purchase path — buying, rent-to-own, auctions, offers, player sales. It is a per-type table (residential, commercial, warehouse, gang); `0` means unlimited for that type, a plain number acts as one shared limit, and **apartments never count**. Old properties created before the type system count as residential.

## The breaker tripped and now furniture doesn't work at all

That is the electricity model working: an overload trips the breaker **and burns out every powered furniture piece**. An electrician has to repair the breaker first, then rewire each burned piece through its target. If you want the softer behaviour back, `electricity.burnout = false` keeps it breaker-only.

## Garage names look like `property_fudge_ln_4` in jg / cd / okok

Set `prettyGarageNames` (shared config) so bridged garage systems show the plain property name. **Fresh servers only** — the garage name is stored on parked vehicles, so flipping it on a live server strands everything parked under the old names. Same warning for the `prefixes` and `apartmentGarages[].name` options: never change them once a server has data.

## We enabled physical keys and some players are locked out

Expected on a live server: turning `physicalKeys.enabled` on hands every **owner and tenant** their key automatically on next login, but anyone who only had access-list rights (friends given door access) holds no key until someone cuts them a spare from **Housing tablet → Housing Management → Keys**. Raids and breaches bypass keys, and the tablet is inside — so the "I lost my last key" answer is: ring the doorbell, get let in via the doorcam, cut a new key.

## Wall colours don't work in my building

Wall tinting needs interiors with **tint-capable wall meshes** (`entitySet` per room). Our [wiwang_hotel edit](https://github.com/Epixx1337/wiwang_hotel) and the Prodigy house shells ship with them; a random MLO does not — its walls have no entity sets to recolour, so the tab does nothing there. The bundled modular walls and the intercom prop always tint.

## Something else?

Check the [full reference](readme.md) — the Configuration section documents every option — and if it still looks wrong, file it in the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP) with the template.
