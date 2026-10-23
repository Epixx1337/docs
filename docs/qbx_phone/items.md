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
  receives your calls and texts.
- Call history and Peeps texts belong to the number, so they move with the SIM.
- Phones created before SIM cards were enabled are converted to containers the
  next time the server checks them.

Without SIM cards the number lives on the phone itself. The first time a character
uses a phone, it is registered to them with their `charinfo.phone` number. When they
start using a different phone, the number moves to that one, and the old phone
shows "No service".

## What lives on a phone

Everything on a phone stays with the phone item, so whoever holds it sees what is on
it, not their own data:

| Data | Lives on |
| --- | --- |
| Number, call history and Peeps texts | The SIM (SIM cards on) or the phone (SIM cards off) |
| Contacts and groups | The phone |
| Wallpaper, ringtone, sound mode and every other setting, including power and airplane mode | The phone |
| Quackers login | The phone. It stays logged in until someone logs it out |
| Duck Cloud backup | The phone's owner, the character who set it up first |

A stolen phone therefore shows its owner's contacts, texts and Quackers account to
the thief, and with the number on it, the thief receives the owner's calls and
texts. To get back on their feet the owner:

1. Starts using a new phone. With SIM cards off, their number moves to it straight
   away; with SIM cards on, they need a new SIM.
2. Picks **Restore from Duck Cloud** on the setup screen to get their contacts,
   groups and settings back.
3. Logs in to Quackers and uses **Edit profile → Log out other phones**.

Only the owner can back a phone up to Duck Cloud or restore it, so a thief can't
overwrite the owner's backup.

SIM cards can be sold in any ox_inventory shop or handed out with `/phoneadmin`.
