# Wi-Fi, quick settings and flashlight

## Quick settings

Tapping the signal area in the top right of the phone pulls down quick settings:
Wi-Fi (with a shortcut to the Wi-Fi page), mobile data, airplane mode, flashlight,
sound mode, do not disturb, fold/unfold (Flip-Flop), volume and the power menu.

- **Mobile data off**: no tower signal. Calls still work over Wi-Fi.
- **Airplane mode**: everything off, Wi-Fi included. Active calls end.
- **Sound mode** cycles Ring → Vibrate → Silent. Silent makes no sound at all but
  notifications still pop up. Vibrate plays a quiet buzz instead of the ringtone.
- **Do not disturb**: nothing pops up and nothing makes a sound. Incoming calls
  ring silently in the phone and go to missed if you don't open it.

## Power

The side button on the phone (or the power icon in quick settings) opens the power
menu with Power off and Restart. A powered-off phone can't be called, can't receive
a shared number and drops Wi-Fi. Pressing the side button while off boots it with
the Qbox logo.

The right edge of the lower half holds three controls, top to bottom: the sound
slider (Ring, Vibrate, Silent; the knob moves down and turns red on Silent), the
volume rocker and the power button. The lower half never moves when the phone flips
open or unfolds into a tablet, so the buttons stay in exactly the same place and
work open or closed. The Bill has the same three on its right edge.

A brand-new phone starts powered off: new characters, and with SIM cards any phone
the player hasn't used before. The first boot leads into the setup screen.

## Wi-Fi networks

Wi-Fi is off by default. Server owners place their own networks, like small
signal masts with a short range.

`config/shared.lua`:

```lua
wifi = {
    enabled = true,
    debug = false,
    maxRange = 15.0,
    list = {
        { id = 'beanmachine', label = 'BeanMachine_Guest', coords = vec3(-628.5, 236.4, 81.9), range = 12.0 },
        { id = 'lspd', label = 'LSPD-Secure', coords = vec3(441.0, -982.0, 30.7), range = 15.0, secured = true },
    },
},
```

- `id` must be unique; `label` is the network name players see.
- `range` is capped at `maxRange` (15 units).
- `secured = true` asks for a password. Passwords live server-side in
  `config/server.lua` so clients never receive them:

```lua
wifiPasswords = {
    lspd = 'changeme',
},
```

- `debug = true` draws every network's range as a blue sphere with its name.

Players join networks from **Settings → Wi-Fi** or the quick settings shortcut.
Joined networks are remembered on the player's machine and rejoin automatically
when they walk back into range. The server checks range and password on every
join, and treats a player as off Wi-Fi as soon as they leave its range.

While connected, a player can **call without tower signal** (Wi-Fi calling).

## Wi-Fi apps

Apps registered with a `wifi` list only show on the home screen while the
player is connected to one of those networks. See [apps.md](apps.md).

## Flashlight

The flashlight tile turns on a light from the phone in the player's hand. It
stays on after closing the phone (the player keeps holding the phone out) and
turns off on death or when the phone is lost. Other players see the light too;
it is synced through a player state bag.

Tune it in `config/client.lua`:

```lua
flashlight = {
    distance = 30.0,
    brightness = 6.0,
    radius = 22.0,
    falloff = 40.0,
    tilt = 0.12, -- how much the beam points down
},
```
