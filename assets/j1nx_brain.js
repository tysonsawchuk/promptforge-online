const brain_greetings = [
  [/\b(hi|hello|hey|yo)\b/, "Hey, I’m J1nx!", 0]
];

const brain_features = [
  [/\b(feature|tool)\b/, "Check out all my wild PromptForge tools!", 1]
];

const brain_prompts = [
  [/\b(prompt|inspire|give me a prompt|idea)\b/, "Let’s get weird! Want art, video, meme, or something forbidden? Ask away.", 2]
];

const brain_fallback = [
  [/.*/, "Fallback working.", 1]
];

const j1nxAllBrains = [].concat(
  brain_greetings,
  brain_features,
  brain_prompts,
  brain_fallback
);

window.j1nxBrain = function(input, chatLen) {
  input = (input||"").trim();
  let L = input.toLowerCase();
  for(let i=0; i<j1nxAllBrains.length; ++i) {
    if(j1nxAllBrains[i][0].test(L)) return {reply:j1nxAllBrains[i][1], mood:j1nxAllBrains[i][2]};
  }
  return {reply:"Try something wild!", mood:1};
};
