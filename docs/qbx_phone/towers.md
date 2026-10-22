# Cell towers

Cell towers are off by default; with them off, every phone has full signal everywhere.

```lua
towers = {
    enabled = true,
    debug = false,
    dropGrace = 5,
    list = {
        { label = 'Downtown', coords = vec3(150.0, -850.0, 30.0), range = 2600.0 },
        { label = 'Sandy Shores', coords = vec3(1850.0, 3700.0, 33.0), range = 2200.0 },
    },
},
```

- Each tower covers a sphere of `range` metres around `coords`. Add as many as you
  like, with any range; overlapping towers are fine.
- Signal bars come from the strongest tower: full near the centre, dropping to one
  bar at the edge. Outside every sphere there is no service.
- With no service you cannot place or receive calls. A call drops after
  `dropGrace` seconds without signal, and a call that was still ringing is logged as
  missed.
- The server checks signal itself when a call is placed or answered, and every
  second during the call, so a modified client can't keep a call alive.

The bundled list is a rough starting layout. Replace it with your own.

## Debug view

Set `debug = true` to draw every coverage sphere in the world in duck yellow, with
a tall orange beam at each tower and its label and range when you are close.
Use it while placing towers, and turn it off for players.
