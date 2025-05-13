/*
  push-effects module boilerplate
  -------------------------------
  This is the base index.js script for a FoundryVTT module that adds push/knockback spell support
  using Sequencer, JB2A, SocketLib, and Warpgate.
*/

Hooks.once("socketlib.ready", () => {
  const socket = socketlib.registerModule("push-effects");

  // Register a GM-level function to move tokens
  socket.register("moveTokenAsGM", async (tokenUuid, x, y) => {
    const token = await fromUuid(tokenUuid);
    if (!token) return console.warn(`[push-effects] Token not found: ${tokenUuid}`);
    await token.update({ x, y }, { animate: false });
  });

  // Store the socket reference so macros can access it later
  game.modules.get("push-effects").socket = socket;

  console.log("[push-effects] Registered moveTokenAsGM function.");
});
