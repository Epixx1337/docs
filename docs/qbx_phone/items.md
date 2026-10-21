# Items and SIM cards

## Phone item

Replace the npwd `phone` entry in `ox_inventory/data/items.lua`:

```lua
['phone'] = {
    label = 'Phone',
    weight = 190,
    stack = false,
    consume = 0,
},
```

The stock ox_inventory client still has a `phone` item hook that calls
`exports.npwd:setPhoneVisible`. qbx_phone answers those calls, so using the item
opens the phone without editing ox_inventory.

Every phone gets a `serial` in its metadata the first time it is created or seen.

## SIM cards

Set `simcards.enabled = true` in `config/shared.lua` and add the item:

```lua
['simcard'] = {
    label = 'SIM card',
    weight = 5,
    stack = false,
    close = true,
    description = 'A prepaid Qbox Mobile SIM',
},
```

How it works:

- Every phone item becomes an ox_inventory **container with one slot** that only
  accepts the SIM item. **Using the phone item opens that SIM tray**; the phone
  itself opens with the keybind (`F1`) or the radial menu.
- A new SIM gets a unique number when it is created. Give a specific number by
  passing metadata: `exports.ox_inventory:AddItem(source, 'simcard', 1, { number = '5551234567' })`.
- Your number is the SIM in the first phone you carry that has one. Lose the SIM
  (or the phone with it inside) and you lose the number. Whoever picks it up
  receives your calls.
- Contacts, groups and the Duck Cloud backup belong to the character, so they
  survive a lost SIM. Call history and Peeps texts belong to the number.
- Phones created before SIM cards were enabled are converted to containers the
  next time the server checks them.

Without SIM cards the number is the character's `charinfo.phone` from qbx_core.

SIM cards can be sold in any ox_inventory shop or handed out with `/phoneadmin`.
