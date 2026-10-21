# Duckcam (video calls)

Duckcam is off by default. It needs a **Cloudflare TURN key**, because players sit
behind different home networks and routers, and video can only reach them through
a relay. Without the key the Duckcam app and buttons stay hidden and normal calls
work as before.

## 1. Create a TURN key

1. Log in to the Cloudflare dashboard and open **Realtime** → **TURN Server**.
2. Create a TURN key. Cloudflare shows a **Turn Token ID** and an **API Token**.
   Copy both; the API token is only shown once.

Cloudflare's TURN service has a free monthly allowance; check their pricing for
how much traffic it covers.

## 2. Add the key to your server

Put both values in `server.cfg` with `set` (not `setr`, so they are never sent to
clients):

```cfg
set qbx_phone:turnKeyId "your-turn-token-id"
set qbx_phone:turnApiToken "your-api-token"
```

## 3. Turn it on

In `config/server.lua`:

```lua
duckcam = {
    enabled = true,
    ttl = 14400, -- seconds each player's TURN credential lasts
},
```

Restart the resource. If `enabled` is true but a convar is missing, the server
console warns and Duckcam stays off.

## How it works

- The API token stays on the server. When a video call connects, the server asks
  Cloudflare for short-lived credentials for each player and hands only those to
  that player's phone. They are revoked when the player leaves.
- Video is one-to-one. Group calls are audio only.
- **Audio still goes through pma-voice.** The video stream has no sound.
- While the phone is open in a video call, your view switches to a selfie camera in
  front of your character. Flip switches to your normal game view instead (the
  "rear camera"). Closing the phone pauses your camera; the other side sees your
  avatar until you open it again.
- If video can't connect, the call keeps going as a normal voice call.

## Tuning (`config/client.lua`)

```lua
duckcam = {
    fov = 50.0,
    selfieOffset = vec3(0.08, 0.75, 0.68), -- camera position relative to the player
    fps = 24,
    width = 360,
    height = 640,
    maxBitrate = 1200000,
    flipY = true, -- flip if video arrives upside down
},
```

Lower `fps`, the size or `maxBitrate` to save bandwidth and CPU.
