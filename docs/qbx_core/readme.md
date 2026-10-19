---
title: Full reference
---

!!! info "Mirrored from GitHub"
    This page mirrors the [qbx_core README](https://github.com/Epixx1337/qbx_core/tree/main#readme) and is refreshed automatically.

![image](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/banner.jpg)


_<p align="center">"And then there was Qbox"</p>_


# qbx_core

qbx_core is a framework created on September 27, 2022, as a successor to qb-core and continues the development of a solid foundation for building easy-to-use, performant, and secure server resources.

Want to know more? View our [documentation](https://qbox-project.github.io/)

# Features

- **Bridge layer provides Backwards compatibility with Most QB Resources with 0 effort required**
- Built-in multicharacter
- Built-in multi-job/gang
- Built-in queue system for full servers
- Persistent player vehicles
- Export based API to read/write core data

## Modules
The core makes available several optional modules for developers to import into their resources:
- Hooks: For developers to provide Ox style hooks to extend the functionality of their resources
- Logger: Can log to either discord, or Ox's logger through one interface
- Lib: Common functions for tables, strings, math, native audio, vehicles, and drawing text.

# Character select

The multicharacter screen is a NUI that ships with the core. It spawns every character the player owns in the world wearing their saved clothing, shows a portrait for each one and lets the player flip through a few scenes before picking who to play. Creating, loading and deleting characters go through the same callbacks as before, so other resources don't need to change.

All of it is configured in `config/client.lua` under `characters`.

## Layouts

`uiLayout` picks the look. Colours follow ox_lib through the `ox:primaryColor` and `ox:primaryShade` convars.

`panel` - list on the left, scene switcher at the bottom. This is the default.

![panel](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/panel.jpg)

`dock` - compact cards along the bottom under the peds, details on the right, scenes as tabs.

![dock](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/dock.jpg)

`tags` - a name tag floats above each ped and the selected one opens into a card.

![tags](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/tags.jpg)

`cinematic` - letterbox bars with a numbered list on the right.

![cinematic](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/cinematic.jpg)

`cards` - every slot is a citizen ID card with the character's photo.

![cards](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/cards.jpg)

## Scenes

`scenes` is the list of places the player can switch between. One is picked at random when the screen opens.

```lua
scenes = {
    {
        label = 'Casino Terrace',
        camCoords = vec4(974.72, 73.15, 116.68, 95.61),
        spawnPoints = {
            vec4(969.76, 70.77, 116.18, 295.61),
            vec4(969.43, 71.67, 116.18, 285.61),
            vec4(969.25, 72.61, 116.18, 275.61),
        },
    },
}
```

`camCoords` is where the camera sits, `w` is its heading. Each `spawnPoints` entry is where one character stands, slot 1 on the first point, slot 2 on the second and so on. Give every scene at least as many points as characters your players can have (`defaultNumberOfCharacters` and `playersNumberOfCharacters` in `config/server.lua`), otherwise the extra characters share a point. The `dock` and `cards` layouts read left to right, so lay the points out that way as seen from the camera.

A spawn point can also be a table, which poses the character standing on it:

```lua
spawnPoints = {
    vec4(969.76, 70.77, 116.18, 295.61),
    { coords = vec4(969.43, 71.67, 116.18, 285.61), scenario = 'WORLD_HUMAN_AA_COFFEE' },
    { coords = vec4(969.25, 72.61, 116.18, 275.61), sync = { dict = 'mp_ped_interaction', clip = 'hugs_guy_a', partner = 4, partnerClip = 'hugs_guy_b' } },
    { coords = vec4(969.24, 73.57, 116.18, 265.61), scenario = 'WORLD_HUMAN_STAND_MOBILE' },
    { coords = vec4(969.40, 74.51, 116.18, 255.61), anim = { dict = 'anim@heists@heist_corona@single_team', clip = 'single_team_loop_boss' } },
}
```

`scenario` starts an in-place scenario and brings its own prop where the game has one, like the coffee cup above. `anim` plays a clip from a dictionary, `flag` defaults to 1 so it loops. `sync` runs a synchronised scene between this character and the one in `partner`, with the point as the scene origin, so the two line up on their own. It only plays when both slots have a character, otherwise each stands on its own point with its own pose. `prop = { model, bone, pos, rot }` attaches an object to the ped, the bone defaults to the right hand. Props, animations and scenes are cleaned up when the scene changes or the player spawns in.

## Registration

Creating a character opens a form in the same style: name, nationality (limited to `data/nationalities.lua` when `limitNationalities` is on, with `fullNationalityList` showing the whole list under the field instead of the closest matches), sex and a date picker bound by `dateMin` and `dateMax`. The same word and profanity checks as before run on the client before the server callback is hit.

![registration](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/registration.jpg)

![date picker](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/datepicker.png)

Deleting asks for confirmation first and can be turned off with `enableDeleteButton`.

![delete](https://raw.githubusercontent.com/Epixx1337/qbx_core/main/.github/images/multichar/delete.jpg)

## Keys

Left and right arrows switch scenes, the number keys pick a slot and Enter plays the selected character or opens registration on an empty slot.

## Portraits

Portraits are ped headshots rendered by the game itself, so there is nothing extra to install. They are captured one after another once the peds are in place and released again when the screen closes.

## Building the UI

The UI source lives in `web/` (Svelte and Vite). The built files are committed, so this is only needed after changing something in there:

```
cd web
pnpm install
pnpm build
```

# Dependencies

- [oxmysql](https://github.com/overextended/oxmysql)
- [ox_lib](https://github.com/overextended/ox_lib)
- [ox_inventory](https://github.com/overextended/ox_inventory)

#

⚠️We advise not modifying the core outside of the config files⚠️

If you feel something is missing or want to suggest additional functionality that can be added to qbx_core, bring it up on the official [Qbox Discord](https://discord.gg/qbox)!

Thank you to everyone and their contributions (large or small!), as this wouldn't have been possible.
