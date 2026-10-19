# qbx_idcard

Identity cards, licenses and badges for Qbox, with an **in-game card designer**. Admins lay out every card with `/idcards`: text, player data fields, the mugshot, images and shapes. Saved designs apply to every player instantly, no restarts and no external card maker.

[:material-github: Repository](https://github.com/Epixx1337/qbx_idcard/tree/card-designer){ .md-button } [Installation](install.md){ .md-button .md-button--primary } [FAQ](faq.md){ .md-button }

![The card designer](https://raw.githubusercontent.com/Epixx1337/qbx_idcard/card-designer/docs/media/designer-overview.png)

## What's inside

- **Card designer**: drag, resize and style elements on a live preview filled with your own character data. Undo/redo, layers, snapping guides and a color picker with transparency.
- **Any item can be a card**: ID cards, driver and weapon licenses, lawyer passes, permits. Start from the ID card layout, the badge wallet or a blank card.
- **Badges**: a badge-type card is held as the badge prop instead of a card, and can be locked to jobs so only police can show a police badge.
- **Shown in hand**: using a card plays the hold animation with its prop and shows it to the closest player, or to yourself when nobody is near.
- **Mugshots**: taken on first use and stored on the item, optionally uploaded to a CDN (Qbox, Fivemanage, Fivemerr or your own endpoint).
- **Plug and play**: the original `CreateMetaLicense` / `GetMetaLicense` exports, events and `config/shared.lua` licenses keep working, so qbx_cityhall and qbx_core's starter items need no changes.
- Themed by the `ox:primaryColor` / `ox:primaryShade` convars, like the rest of the Epixx scripts.

<div class="grid" markdown>

![ID card in game](https://raw.githubusercontent.com/Epixx1337/qbx_idcard/card-designer/docs/media/viewer-card.png)

![Badge in game](https://raw.githubusercontent.com/Epixx1337/qbx_idcard/card-designer/docs/media/viewer-badge.png)

</div>

!!! note "Branch"
    The designer lives on the `card-designer` branch of the repository. `main` mirrors upstream Qbox until the work is merged there.

## Where to go next

| Page | For |
| --- | --- |
| [Installation](install.md) | dependencies, items, first start |
| [FAQ & troubleshooting](faq.md) | the questions we get |
| [The card designer](designer.md) | every tool, setting and shortcut |
| [Badges](badges.md) | badge props and job locks |
| [Mugshot uploads](cdn.md) | CDN providers |
| [Full reference](readme.md) | mirrored from the repo |
