/**
 * SOCKETLIB-TOKEN-MOVER
 * ---------------------
 * Registers a GM-safe token move function for use by macros.
 * Requires: SocketLib
 */

let tokenMoverSocket;

Hooks.once("socketlib.ready", () => {
  // 1. Register your module with SocketLib
  tokenMoverSocket = socketlib.registerModule("socketlib-token-mover");

  // 3. Register the function by name
  tokenMoverSocket.register("moveTokenAsGM", moveTokenAsGM);

  // 4. Expose the socket on your own module for macro access
  game.modules.get("socketlib-token-mover").tokenMoverSocket = tokenMoverSocket;

  console.log("[SocketLib Token Mover] moveTokenAsGM registered and ready.");
});

// 2. Define the function (non-async as requested)
function moveTokenAsGM(tokenUuid, x, y) {
  fromUuid(tokenUuid).then(token => {
    if (!token) {
      console.warn(`[SocketLib Token Mover] Token not found: ${tokenUuid}`);
      return;
    }

    console.log(`[SocketLib Token Mover] Moving ${token.name} to (${x}, ${y})`);
    token.update({ x, y }, { animate: false });
  });
}
