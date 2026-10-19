# Installing qbx_idcard

## What you need

| Dependency | Notes |
| --- | --- |
| [qbx_core](https://github.com/Qbox-project/qbx_core) | usable items and character data |
| [ox_lib](https://github.com/CommunityOx/ox_lib) | callbacks, commands, keybind, UI theming |
| [oxmysql](https://github.com/CommunityOx/oxmysql) | stores the card designs |
| [ox_inventory](https://github.com/CommunityOx/ox_inventory) | the card items and their metadata |
| [MugShotBase64](https://github.com/BaziForYou/MugShotBase64) | takes the mugshot |

## Steps

1. Download the [`card-designer` branch](https://github.com/Epixx1337/qbx_idcard/tree/card-designer) and replace your `qbx_idcard` folder with it. It ships the UI prebuilt.
2. Add the card items to `ox_inventory/data/items.lua`. Every card needs a real inventory item:

    ```lua
    ['id_card'] = { label = 'Identification Card' },
    ['driver_license'] = { label = 'Drivers License' },
    ['weaponlicense'] = { label = 'Weapon License' },
    ['lawyerpass'] = { label = 'Lawyer Pass' },
    ['police_badge'] = { label = 'Police Badge' },
    ```

3. Ensure it **after `qbx_core` and ox_inventory**. Inside a `[qbx]` folder, `ensure [qbx]` covers it.
4. Start the server. The `qbx_idcard_templates` table is created automatically.

Optional: set `imageUpload` in `config/server.lua` to upload mugshots to a CDN, see [Mugshot uploads](cdn.md).

## Configuration

`config/shared.lua`:

| Key | What it does |
| --- | --- |
| `idCardSettings.closeKey` | Default key to close a shown card (`BACK`), players can rebind it |
| `idCardSettings.autoClose` | Close the card on its own after `time` ms |
| `commands` | Names of the designer and give commands and the ace group allowed to use them (`group.admin`) |
| `handheld.card` / `handheld.badge` | Animation, default prop, bone, offset and duration per card type |
| `licenses` | The default cards. They show until an admin saves a custom design for the item. |

## After installing: sanity checklist

- [ ] `/idcards` opens the designer for an admin and lists the default cards
- [ ] **Give to me** puts a card in your inventory
- [ ] Using the card plays the hold animation and shows the card on the right, `Backspace` closes it
- [ ] With another player next to you, they see the card instead of you
- [ ] A `police_badge` can't be shown without the police job

## Upgrading from the original qbx_idcard

Nothing to migrate. Existing cards keep their metadata and mugshot, the exports and events are unchanged, and your `licenses` entries become the default designs. `lang/global.js` and the old `web/` files are gone. Labels are now in `locales/en.json` and the card layout lives in the designer.
