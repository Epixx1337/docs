# Admin panel

`/phoneadmin` opens the panel for anyone in `adminGroup` (`group.admin` by default).

- **Overview**: totals, every online player with their number, SIM state and
  signal, and active calls. End any player's call from here.
- **Lookup**: search by phone number or citizen ID. Shows the character, every
  number they own, their contacts and groups (delete any of them), their call
  history (clear per number) and their Duck Cloud backup.
- **SIM cards** (with SIM cards enabled): every SIM ever issued, who used it last
  and when. Give a player a SIM, optionally with a chosen number.

Every panel action is checked on the server against the same permission.
