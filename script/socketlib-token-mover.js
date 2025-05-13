let tokenMoverSocket;

Hooks.once("socketlib.ready", () => {
  // 1. Register your module with SocketLib
  tokenMoverSocket = socketlib.registerModule("socketlib-token-mover");

  // 2. Register the actual function
  tokenMoverSocket.register("moveTokenAsGM", async (tokenUuid, x, y) => {
    const token = await fromUuid(tokenUuid);

    // Error trap
    if (!token) {
      console.warn(`[SocketLib Token Mover] Token not found: ${tokenUuid}`);
      return;
    }

    console.log(`[SocketLib Token Mover] Moving ${token.name} to (${x}, ${y})`);
    await token.update({ x, y }, { animate: false });
  });

  // 3. Expose the socket for other macros to access
  game.modules.get("socketlib-token-mover").socket = tokenMoverSocket;

  console.log("[SocketLib Token Mover] Registered moveTokenAsGM and initialized.");
});