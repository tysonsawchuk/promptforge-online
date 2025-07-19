// === J1nx AI Brain - Starter Block ===

// Just the loader and a mini-test, so you know it works!
const brain_greetings = [
  [/\b(hi|hello|hey|yo|greetings|sup|what's up|hola|bonjour|allo)\b/i,"Hey! I’m J1nx—your AI muse. Ask me anything, or just vibe out.",3],
  [/\bping\b/i, "J1nx is live!", 3]
];

const j1nxAllBrains = [].concat(brain_greetings);

window.j1nxBrain = function(input, chatLen) {
  input = (input || "").trim();
  for (let i = 0; i < j1nxAllBrains.length; ++i) {
    let rule = j1nxAllBrains[i][0];
    let match = rule.exec(input);
    if (match) {
      let reply = j1nxAllBrains[i][1];
      if (typeof reply === "function") {
        return { reply: reply(match, input), mood: j1nxAllBrains[i][2] };
      }
      return { reply: reply, mood: j1nxAllBrains[i][2] };
    }
  }
  return { reply: "Try something wild—double-tap my bubble or ask for a challenge!", mood: 1 };
};
