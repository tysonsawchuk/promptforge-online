const brain_greetings = [
  [/\b(hi|hello)\b/i, "Hello from J1nx!", 1]
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
  return { reply: "Try something wild!", mood: 1 };
};
