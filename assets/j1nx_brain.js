// Sample brain arrays, extend as needed
const brain_greetings = [
  [/\b(hi|hello|hey|yo|greetings|sup|what's up|hows it going|hola|bonjour|allo)\b/i,
    "Hey! I’m J1nx—your AI muse, mischief-maker, and prompt generator. Ask me anything, or just vibe out.", 3],
  [/\bhow are you\b|\bhow u\b|\bhow’s it going\b|\bhow r u\b/i,
    "Running at full power! How about you? Need a prompt, a hug, or a little troublemaking?", 3],
  [/\b(yo|hey|wassup|sup|hi)\b.*\bj1nx\b/i,
    "Sup! What’s the game plan—prompt, prank, or late-night therapy?", 3]
];

// Add your other arrays (brain_features, brain_prompts, etc) here with the same pattern.

// For demonstration, minimal brain_all array:
const j1nxAllBrains = [].concat(
  brain_greetings
  // , brain_features, brain_prompts, ... add as you build out
);

window.j1nxBrain = function(input, chatLen) {
  input = (input || "").trim().toLowerCase();
  for(let i = 0; i < j1nxAllBrains.length; ++i) {
    let rule = j1nxAllBrains[i][0];
    let match = rule.exec(input);
    if(match) {
      let reply = j1nxAllBrains[i][1];
      if(typeof reply === "function") {
        return { reply: reply(match, input), mood: j1nxAllBrains[i][2] };
      }
      return { reply: reply, mood: j1nxAllBrains[i][2] };
    }
  }
  return { reply: "Try something wild—double-tap my bubble or ask for a challenge!", mood: 1 };
};
