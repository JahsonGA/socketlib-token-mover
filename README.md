# socketlib-token-mover

A lightweight Foundry VTT module that leverages [SocketLib](https://github.com/manuelVo/foundryvtt-socketlib) to allow **GM-authorized token movement** from macros—even when triggered by players without permissions.

## Features

- **Move any token as the GM**, regardless of player permissions.
- **Exposes a simple API**: `moveTokenAsGM(tokenId, x, y)`
- Tested with animation workflows like *Vortex Warp*, *Misty Step*, and others.
- Seamless integration with custom macros and automation tools.

## Installation

1. In Foundry VTT, go to **Add-on Modules** > **Install Module**.
2. Paste this Manifest URL:
https://raw.githubusercontent.com/JahsonGA/socketlib-token-mover/main/module.json

3. Click **Install** and enable the module for your world.

## How It Works

This module registers a single GM-executable function using SocketLib:

```
SocketLib.register("socketlib-token-mover", "moveTokenAsGM", (tokenId, x, y) => {
const token = canvas.tokens.get(tokenId);
if (!token) return ui.notifications.error("Token not found.");
return token.document.update({ x, y });
});
```

Once active, any macro can call this function using:
```
await SocketLib.executeAsGM("socketlib-token-mover", "moveTokenAsGM", tokenId, x, y);
```
This bypasses the permission check and moves the token as if a GM had done it.

## Requirements
SocketLib must be installed and enabled.

## Compatibility
Designed for Foundry VTT v10+

Works well with Midi-QOL, Warpgate, and Sequencer

## License
This project is licensed under the MIT License.

Created by Jahson Gonzalez-Allie
