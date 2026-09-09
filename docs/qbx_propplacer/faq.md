# qbx_propplacer — FAQ & troubleshooting

## Letters are invisible or show as missing models

The alphabet models are **not part of the resource** — they are the paid [Atenea Alphabet](https://atenea.tebex.io/package/7630928) pack (`ate_alphabet_*`). Buy it, stream it as its own resource, and ensure it before qbx_propplacer. Same story for the default prop catalog (bzzz lights): entries for models you don't stream simply won't spawn.

## Some letters won't glow (or glow when they shouldn't)

A **known Atenea pack issue (1.0.x)**, not something the script can fix: a few drawables were exported with the wrong shader. `ate_alphabet_blue/yellow_emissive_t_2` use the plain `default` shader (a lowercase `t` never glows in blue or yellow), and the plain `ate_alphabet_white/blue/yellow_3` use the `emissive` shader (the `3` always glows). Nothing in the resource can repair the model files — ask Atenea for corrected drawables.

## Words come out mirrored

Set `frontIsPositiveY = true` in `config/client.lua`. Which side of the letter models is "front" depends on how the pack was exported; this flips it.

## Prop pictures are missing in the catalog

Images come from the resource's `images/` folder by default. Either drop matching pictures there, or point `config/client.lua → imagePath` at `nui://ox_inventory/web/images/` and reuse the inventory's images (the catalog `image` field then takes ox_inventory file names).

## Players can't see each other's signs from far away

By design — signs and props are **streamed through `lib.zones`**: they only exist for players near them and nothing is networked. The streaming distance is configurable in `config/client.lua`. If a sign seems missing entirely, check the server console for `propplacer:startup_error` (schema/load failures are logged).

## I don't see the All signs tab

That tab is admin-only, gated by `adminAce` in `config/server.lua` (default expects Qbox's `add_ace group.admin admin allow`). The same ace gates editing and deleting other players' objects — every denied attempt is logged as `propplacer:permission_denied`.

## A player hit their sign/prop limit

Per-character caps: `maxSignsPerPlayer` / `maxPropsPerPlayer` in `config/server.lua`. Rejected saves land in the logs as `propplacer:save_rejected` with the reason.

## The keyboard shortcuts fight with my other binds

Shortcuts are **captured by the UI**, not registered as in-game keybinds — remap them under `keys` in `config/client.lua`. `G` toggles between cursor and mouse-look while editing.

## Something else?

The [full reference](readme.md) documents controls, every config file and the complete `lib.logger` event list — and the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP) takes the rest.
