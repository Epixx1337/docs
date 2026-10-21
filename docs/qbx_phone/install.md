# Installing qbx_phone

## What you need

| Dependency | Notes |
| --- | --- |
| [qbx_core](https://github.com/Qbox-project/qbx_core) | character data and phone numbers |
| [ox_lib](https://github.com/CommunityOx/ox_lib) | callbacks, keybinds, commands, UI theming |
| [oxmysql](https://github.com/CommunityOx/oxmysql) | contacts, groups, calls, texts, SIM cards, cloud backups |
| [ox_inventory](https://github.com/CommunityOx/ox_inventory) | the phone item and, optionally, SIM card containers |
| [pma-voice](https://github.com/AvarianKnight/pma-voice) | call audio. No changes needed, group calls included |

## Steps

1. **Remove npwd.** Stop and delete `npwd` and `qbx_npwd`. qbx_phone answers the npwd exports other resources use, so don't run both.
2. **Add the phone item** to `ox_inventory/data/items.lua`, replacing npwd's entry:

    ```lua
    ['phone'] = {
        label = 'Phone',
        weight = 190,
        stack = false,
        consume = 0,
    },
    ```

    The stock ox_inventory `phone` hook still calls npwd's export, which qbx_phone answers, so using the item opens the phone without editing ox_inventory.

3. **Ensure it after its dependencies.** Inside a `[qbx]` folder, `ensure [qbx]` covers it, as long as ox_inventory and pma-voice start first.
4. **Start the server.** All tables are created automatically.
5. **Optional: character deletion.** Add the character-owned tables to `characterDataTables` in `qbx_core/config/server.lua`:

    ```lua
    {'qbx_phone_contacts', 'citizenid'},
    {'qbx_phone_groups', 'citizenid'},
    {'qbx_phone_cloud', 'citizenid'},
    ```

    Call history and texts belong to the phone number, not the character, so they are left alone.

The UI ships prebuilt in `web/build`. You only need [bun](https://bun.sh) if you change the UI source.

## Optional systems

All of these are off by default.

| System | Turn on | Guide |
| --- | --- | --- |
| SIM cards | `simcards.enabled` in `config/shared.lua`, plus the `simcard` item | [Items and SIM cards](items.md) |
| Cell towers | `towers.enabled` and your tower list | [Cell towers](towers.md) |
| Wi-Fi networks | `wifi.enabled` and your network list | [Wi-Fi](wifi.md) |
| Duckcam video calls | `duckcam.enabled` in `config/server.lua` plus two convars | [Duckcam](duckcam.md) |

## Configuration

The keys people change most. Everything else is on the [configuration](config.md) page.

| Key | File | What it does |
| --- | --- | --- |
| `openKey` | `config/client.lua` | Opens the phone (`F1`). Players can rebind it |
| `answerKey` / `declineKey` | `config/client.lua` | Answer or decline while the phone is closed (`Y` / `N`) |
| `themes` / `defaultTheme` | `config/client.lua` | Which styles players can pick, and the default. `'flip'` is the Flip-Flop, `'slab'` is the Bill |
| `allowTablet` | `config/client.lua` | Lets the Flip-Flop unfold into a tablet |
| `calls.maxGroupSize` | `config/shared.lua` | Most people in one call |
| `adminGroup` | `config/server.lua` | Who can open `/phoneadmin` |
| `limits` | `config/server.lua` | Contacts, groups and texts per player |

## After installing: sanity checklist

- [ ] `F1` opens the phone. A new character sees it switched off; the power button boots it
- [ ] The radial menu's "give number" entry shows an accept prompt to the player you face
- [ ] Two players can call each other and hear each other through pma-voice
- [ ] A text sent in Peeps arrives, shows a badge, and the badge clears when the conversation is opened
- [ ] `/phoneadmin` opens for an admin
