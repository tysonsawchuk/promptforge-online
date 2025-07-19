// === J1nx Brain v1.2 FINAL FIXED ===
// FIXED regex escaping issue clearly identified

// === Greetings ===
const brain_greetings = [
[/\b(hi|hello|hey|yo|greetings|sup|what's up|hows it going|hola|bonjour|allo)\b/i,"Hey! I’m J1nx—your AI muse, mischief-maker, and prompt generator. Ask me anything, or just vibe out.",3],
[/\bhow (are|r) (you|u)\b|\bhow’s it going\b/i,"Running at full power! How about you? Need a prompt, a hug, or troublemaking?",3]
];

// === Memes ===
const brain_memes = [
[/\b(meme|joke|funny|laugh)\b/i,"Why don't programmers like nature? Too many bugs! Want another?",0]
];

// === Tech ===
const brain_tech = [
[/\b(how.*AI|explain.*AI)\b/i,"AI: Machines learning from data to mimic human smarts—curious about deep learning or prompts?",0]
];

// === ASCII ===
const brain_ascii = [
[/\b(ascii|ansi|text art)\b/i,"Ready to turn your ideas into ASCII art? Name a theme or phrase!",0]
];

// === COMBINE ALL BRAINS ===
const j1nxAllBrains = [].concat(
brain_greetings,
brain_memes,
brain_tech,
brain_ascii
);

// === EXPORTED FUNCTION (LAST ALWAYS) ===
window.j1nxBrain=function(input,chatLen){
  input=(input||"").trim();
  for(let i=0;i<j1nxAllBrains.length;++i){
    let rule=j1nxAllBrains[i][0];
    let match=rule.exec(input);
    if(match){
      let reply=j1nxAllBrains[i][1];
      if(typeof reply==="function"){
        return{reply:reply(match,input),mood:j1nxAllBrains[i][2]};
      }
      return{reply:reply,mood:j1nxAllBrains[i][2]};
    }
  }
  return{reply:"Try something wild—double-tap my bubble or ask for a challenge!",mood:1};
};
