# Voice and group calls

Calls use pma-voice call channels. **No changes to pma-voice are needed**, group
calls included.

- Every call gets its own random call channel. The server moves players in and out
  of it with `exports['pma-voice']:setPlayerCall`.
- A pma-voice call channel holds any number of players, so a group call is every
  member who answers joining the same channel.
- Calling a contact group rings every member at once. Each member answers or
  declines on their own; the call stays up while at least two people are in it.
- If the caller leaves a group call, the rest stay connected.

`voice_enableCalls` must stay at its default of `1`.

## Not included

- Speakerphone, where people standing next to you hear the other side. pma-voice
  only routes call audio to call members, so this would need a pma-voice change.
- Muting yourself in a call. pma-voice has no per-call mute.
