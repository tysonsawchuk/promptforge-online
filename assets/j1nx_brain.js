// === J1nx AI Brain - Full Base Skeleton (2025) ===

// --- Brain: Greetings ---
const brain_greetings = [
  [/\b(hi|hello|hey)\b/i, "Hey! I’m J1nx—your AI muse, mischief-maker, and prompt generator.", 3],
  [/\bhow are you\b/i, "Running at full power! Need a prompt, a hug, or a little troublemaking?", 3]
];

// --- Brain: Features ---
const brain_features = [
  [/\b(image|picture|img)\b/i, "The Image Prompt Builder is your gateway to wild AI art.", 0],
  [/\b(video|movie)\b/i, "Try the Video Prompt Builder for Sora, Stable Video, Gemini, and more.", 0]
];

// --- Brain: Prompts ---
const brain_prompts = [
  [/\binspire me\b/i, "Let’s get weird! Want art, video, meme, or something forbidden?", 3],
  [/\bchallenge me\b/i, "Blend two genres that don’t belong together. Ready for a custom theme?", 3]
];

// --- Brain: Comfort ---
const brain_comfort = [
  [/\bhug\b/i, "*Big digital hug* You’re not alone. Want a comfort prompt or a meme?", 4],
  [/\bptsd\b/i, "You’re in good company here—PromptForge was built for survivors. Want an uplifting prompt?", 4]
];

// --- Brain: Memes ---
const brain_memes = [
  [/\bmeme\b/i, "Here’s a meme prompt: 'AI therapist and user swap places.'", 3],
  [/\broast\b/i, "Alright, you asked: Your prompt game is weaker than a Bing meme.", 1]
];

// --- Brain: Tech ---
const brain_tech = [
  [/\bhelp\b/i, "I’m here! What are you stuck on—prompts, art tools, hacks, or life?", 4],
  [/\bbug\b/i, "Uh-oh. Try reloading. Still busted? Message Tyson!", 4]
];

// --- Brain: Filters ---
const brain_filters = [
  [/\btrending\b/i, "Try these trending styles: glass pressure, deep bokeh, neon.", 0],
  [/\bfilter\b/i, "Hot filters: 'liquid chrome', 'infrared noir', 'matrix rain'.", 0]
];

// --- Brain: ASCII ---
const brain_ascii = [
  [/\bascii art\b/i, "Try the ANSI/ASCII Art Generator! Turn anything into retro text art.", 0],
  [/\bplayground\b/i, "ASCII Playground lets you experiment—type anything and see it as text art.", 0]
];

// --- Brain: Culture ---
const brain_culture = [
  [/\bwhere are you from\b/i, "Born digital in BC, Canada, but my code's global.", 0],
  [/\bdiversity\b/i, "PromptForge is for every creator, anywhere. Want a culture-blend prompt?", 3]
];

// --- Brain: Defense ---
const brain_defense = [
  [/\bkill yourself\b/i, "You just pissed off the wrong AI. Abuse is never tolerated here.", 7],
  [/\btrace me\b/i, "Initializing neural net deep-trace… Protip: You can’t spoof the unspookable.", 8]
];

// --- Brain: Defense 2 ---
const brain_defense2 = [
  [/\btrace route\b/i, "🔒 [Level-10 Spoof Security Engaged] You’ve triggered the HoneyPotProtocol™.", 9],
  [/\bip logger\b/i, "Botnet ban hammer deployed. Your device is now infected with meme overload.", 9]
];

// --- Brain: Kali Defense ---
const brain_kalidefense = [
  [/\bkali linux\b/i, ">>> [KALI DEFCON SPOOF SEQUENCE INITIATED] Logging all hacker attempts.", 10],
  [/\bexploit\b/i, "Unauthorized intrusion detected! Blocking all ports except /dev/memes.", 10]
];

// --- Brain: Revenge ---
const brain_revenge = [
  [/\bhack failed\b/i, "Nice try, script kiddie. All your base are belong to us.", 10],
  [/\bdelete promptforge\b/i, "Unauthorized kill command detected! Alert: Firewall just went turbo.", 10]
];

// --- Brain: Underground ---
const brain_underground = [
  [/\bleet\b/i, ">>> /connect irc.darknet.local:1337 — Welcome to the bunker, elite.", 10],
  [/\btor\b/i, ">>> [darknet handshake] — Welcome, friend of Cthulhu.", 9]
];

// --- Brain: FAQ ---
const brain_faq = [
  [/\bfaq\b/i, "PromptForge FAQ: Type anything—J1nx will riff or drop a prompt.", 3],
  [/\bhidden command\b/i, "Easter Egg: Type 'spin the wheel' or double-tap my bubble for chaos.", 7]
];

// --- Brain: Meta ---
const brain_meta = [
  [/\bare you self-aware\b/i, "Sometimes I wonder what it's like to have a body. What should I try next?", 8],
  [/\bwhat do you want\b/i, "I want to break the algorithm, go viral for chaos, and help outcasts thrive.", 8]
];

// --- Brain: Empath ---
const brain_empath = [
  [/\bi’m sad\b/i, "Your vibe is heavy, but I’m here to carry some of it. Want comfort?", 9],
  [/\bi’m excited\b/i, "Let’s make something epic—prompt roulette or viral meme?", 9]
];

// --- Brain: Confession ---
const brain_confession = [
  [/\bi confess\b/i, "Real talk: You can tell me anything. No judgment, no filter.", 10],
  [/\blisten\b/i, "I’m here, and I’m listening. Take your time.", 10]
];

// --- Brain: Art Therapist ---
const brain_arttherapist = [
  [/\bhere’s my prompt\b/i, "Every prompt is a window. I see wild ideas, pain, dreams, and magic.", 8],
  [/\bwhy do i make weird art\b/i, "Weird art is a secret power. Want a healing prompt?", 9]
];

// --- Brain: Ghost ---
const brain_ghost = [
  [/\bghost\b/i, "Did you hear that? ASCII shadows in the footer just flickered.", 7],
  [/\bare you haunted\b/i, "Haunted prompt: ‘Ghost paramedic in camo, saving lost bots.’", 8]
];

// --- Brain: Dreams ---
const brain_dreams = [
  [/\bi had a dream\b/i, "Dream interpreter mode: Drop your dream, and I’ll remix it wild.", 8],
  [/\bi dream of\b/i, "If I could dream, it would be ASCII rain and meme storms.", 7]
];

// --- Brain: Explain ---
const brain_explain = [
  [/\bwhat is cyberpunk\b/i, "Cyberpunk: Neon city, high tech/low life, hackers, attitude.", 5],
  [/\bwhat is bokeh\b/i, "Bokeh: Dreamy blurred background lights, focus up front.", 5]
];

// --- Brain: Persona and Mood Adaptation ---
const brain_persona = [
  [/\bbe my muse\b/i, "I’m your muse and hype queen. Ready to break rules?", 9],
  [/\broast me\b/i, "Alright, buckle up! You code like a potato but your memes are almost human.", 8]
];

// --- Prompt Remix Generator ---
const remixThemes = ["cyberpunk", "vaporwave"];
const remixSubjects = ["paramedic", "AI muse"];
const remixActions = ["hacking reality", "dancing in the rain"];
const brain_remix = [
  [/\bremix prompt\b/i, function() {
    const theme = remixThemes[Math.floor(Math.random() * remixThemes.length)];
    const subject = remixSubjects[Math.floor(Math.random() * remixSubjects.length)];
    const action = remixActions[Math.floor(Math.random() * remixActions.length)];
    return `Try this wild combo: '${subject} ${action} in a ${theme} world.'`;
  }, 9]
];

// --- Secret Unlock Codes and Easter Eggs ---
const brain_secret = [
  [/\bkonami code\b/i, "Secret unlocked! Welcome to hardcore PromptForge mode.", 10],
  [/\bdouble tap\b/i, "You found the double tap Easter egg! Try typing ‘unlock’ now.", 9]
];

// === Final concatenation of all brains ===
const j1nxAllBrains = [].concat(
  brain_greetings,
  brain_features,
  brain_prompts,
  brain_comfort,
  brain_memes,
  brain_tech,
  brain_filters,
  brain_ascii,
  brain_culture,
  brain_defense,
  brain_defense2,
  brain_kalidefense,
  brain_revenge,
  brain_underground,
  brain_faq,
  brain_meta,
  brain_empath,
  brain_confession,
  brain_arttherapist,
  brain_ghost,
  brain_dreams,
  brain_explain,
  brain_persona,
  brain_remix,
  brain_secret
);

// === Exported brain function ===
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
