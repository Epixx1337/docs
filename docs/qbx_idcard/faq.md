# qbx_idcard: FAQ & troubleshooting

## Using a card does nothing

The item has to exist in `ox_inventory/data/items.lua`, and it needs a design: either an entry in `licenses` in `config/shared.lua` or a saved design in `/idcards`. The designer marks cards whose item is missing from ox_inventory with a red `!`.

## The first use doesn't show a photo

The mugshot is taken on the first use and saved on the item. Make sure `MugShotBase64` is started. Cards held by someone other than their owner never get a new mugshot, so a picked-up card can't take the finder's photo.

## I can't open `/idcards`

The command is restricted to `commands.restricted` in `config/shared.lua` (`group.admin` by default). Check your ace setup, or point it at another group.

## My design doesn't show in game

Press **Save**. Unsaved changes show a dot next to the card name and a **Draft** or **Default** tag. Saved designs apply to every player immediately.

## How do I go back to the original card?

Open the card in `/idcards` and press **Reset**. Cards that came from `licenses` return to their default layout. Cards created with **New card** have **Delete** instead, which stops the item from working as a card.

## Can I use my own images?

Yes. Paste an `https://` link into an Image element or the card background, or put the file in `web/public` (for example `web/public/badges/sheriff.png` as `badges/sheriff.png`) and rebuild the UI.

## The badge sits wrong in the hand

Open the badge in `/idcards`, go to **Card**, tick **Custom hand position** and adjust the offset with **Preview in hand** until it lines up. The defaults for all badges are in `handheld.badge` in `config/shared.lua`.

## Players see someone else's name on a card

Cards show the data stored on the item when it was issued, like a real ID. Handing your card to someone shows your details to whoever they show it to.

## Something else?

The [card designer](designer.md) page covers every tool, the [full reference](readme.md) the exports. Bugs go to the **bug-reports forum** on [Discord](https://discord.gg/2PjtpqdQXP).
