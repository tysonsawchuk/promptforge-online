window.j1nxBrain = function(input, chatLen) {
  input = (input||"").toLowerCase();
  if(input.includes("hi") || input.includes("hello")) return {reply:"Hey! J1nx here.", mood:5};
  return {reply:"Try 'hi' or 'hello' to test.", mood:0};
};
