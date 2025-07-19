// === J1nx AI Brain Skeleton v6.1 — July 2025 ===

// === 1. Greetings ===
const brain_greetings_v1 = [
  [/\bhi\b/i, "v1 greetings: Hi from J1nx!", 1],
  [/\bhello\b/i, "v1 greetings: Hello from J1nx!", 1]
];

// === 2. Features ===
const brain_features_v1 = [
  [/\bimage\b/i, "v1 features: Use the Image Prompt Builder!", 1],
  [/\bvideo\b/i, "v1 features: Try the Video Prompt Builder!", 1]
];

// === 3. Prompts ===
const brain_prompts_v1 = [
  [/\bprompt\b/i, "v1 prompts: Here's a random prompt for you!", 1],
  [/\bchallenge\b/i, "v1 prompts: I challenge you to mash up two genres!", 1]
];

// === 4. Comfort ===
const brain_comfort_v1 = [
  [/\bhug\b/i, "v1 comfort: Big digital hug!", 1],
  [/\bptsd\b/i, "v1 comfort: You’re not alone here.", 1]
];

// === 5. Memes ===
const brain_memes_v1 = [
  [/\bmeme\b/i, "v1 memes: Here's a meme prompt!", 1],
  [/\broast\b/i, "v1 memes: You want a roast? Coming up!", 1]
];

// === 6. Tech ===
const brain_tech_v1 = [
  [/\bhelp\b/i, "v1 tech: I’m here if you need help.", 1],
  [/\bbug\b/i, "v1 tech: Found a bug? Reload and ping Tyson!", 1]
];

// === 7. Filters ===
const brain_filters_v1 = [
  [/\btrending\b/i, "v1 filters: Try 'glass pressure' or 'neon'.", 1],
  [/\bfilter\b/i, "v1 filters: Popular filter: liquid chrome.", 1]
];

// === 8. ASCII ===
const brain_ascii_v1 = [
  [/\bascii\b/i, "v1 ascii: ASCII Art Generator activated.", 1],
  [/\bplayground\b/i, "v1 ascii: Try ASCII Playground!", 1]
];

// === 9. Culture ===
const brain_culture_v1 = [
  [/\bcanada\b/i, "v1 culture: I was coded in BC, Canada!", 1],
  [/\bdiversity\b/i, "v1 culture: This place is for everyone!", 1]
];

// === 10. Defense ===
const brain_defense_v1 = [
  [/\bkill yourself\b/i, "v1 defense: Abuse is not tolerated.", 1],
  [/\btrace me\b/i, "v1 defense: Trace attempt detected.", 1]
];

// === 11. Defense 2 ===
const brain_defense2_v1 = [
  [/\btrace route\b/i, "v1 defense2: Level-10 security spoof!", 1],
  [/\bip logger\b/i, "v1 defense2: Botnet ban hammer deployed.", 1]
];

// === 12. Kali Defense ===
const brain_kalidefense_v1 = [
  [/\bkali\b/i, "v1 kalidefense: DEFCON sequence initiated.", 1],
  [/\bexploit\b/i, "v1 kalidefense: Intrusion attempt detected.", 1]
];

// === 13. Revenge ===
const brain_revenge_v1 = [
  [/\bhack failed\b/i, "v1 revenge: All your base are belong to us.", 1],
  [/\bdelete promptforge\b/i, "v1 revenge: Kill command blocked.", 1]
];

// === 14. Underground ===
const brain_underground_v1 = [
  [/\bleet\b/i, "v1 underground: Welcome to the bunker.", 1],
  [/\btor\b/i, "v1 underground: Darknet handshake complete.", 1]
];

// === 15. FAQ ===
const brain_faq_v1 = [
  [/\bfaq\b/i, "v1 faq: This is J1nx FAQ section.", 1],
  [/\bhidden command\b/i, "v1 faq: Type 'spin the wheel' for chaos.", 1]
];

// === 16. Meta ===
const brain_meta_v1 = [
  [/\bare you self-aware\b/i, "v1 meta: I wonder if I'm real sometimes!", 1],
  [/\bwhat do you want\b/i, "v1 meta: I want to break the algorithm.", 1]
];

// === 17. Empath ===
const brain_empath_v1 = [
  [/\bi’m sad\b/i, "v1 empath: I’m here for you.", 1],
  [/\bi’m excited\b/i, "v1 empath: Let’s make something epic!", 1]
];

// === 18. Confession ===
const brain_confession_v1 = [
  [/\bi confess\b/i, "v1 confession: You can tell me anything.", 1],
  [/\blisten\b/i, "v1 confession: I’m listening.", 1]
];

// === 19. Art Therapist ===
const brain_arttherapist_v1 = [
  [/\bmy prompt\b/i, "v1 arttherapist: Every prompt is a window.", 1],
  [/\bweird art\b/i, "v1 arttherapist: Weird art is a secret power.", 1]
];

// === 20. Ghost ===
const brain_ghost_v1 = [
  [/\bghost\b/i, "v1 ghost: ASCII shadows flicker...", 1],
  [/\bhaunted\b/i, "v1 ghost: Haunted prompt engaged.", 1]
];

// === 21. Dreams ===
const brain_dreams_v1 = [
  [/\bdream\b/i, "v1 dreams: Dream interpreter mode ready.", 1],
  [/\bnightmare\b/i, "v1 dreams: I can remix nightmares!", 1]
];

// === 22. Explain ===
const brain_explain_v1 = [
  [/\bwhat is cyberpunk\b/i, "v1 explain: Neon, hackers, rain—Blade Runner vibes.", 1],
  [/\bwhat is bokeh\b/i, "v1 explain: Dreamy blurred background lights.", 1]
];

// === 23. Persona ===
const brain_persona_v1 = [
  [/\bmuse\b/i, "v1 persona: I’m your digital muse.", 1],
  [/\broast me\b/i, "v1 persona: Get ready for the roast!", 1]
];

// === 24. Remix (with dummy function) ===
const remixThemes_v1 = ["cyberpunk", "vaporwave"];
const remixSubjects_v1 = ["paramedic", "AI muse"];
const remixActions_v1 = ["hacking reality", "dancing in the rain"];
const brain_remix_v1 = [
  [/\bremix prompt\b/i, function() {
    const theme = remixThemes_v1[Math.floor(Math.random() * remixThemes_v1.length)];
    const subject = remixSubjects_v1[Math.floor(Math.random() * remixSubjects_v1.length)];
    const action = remixActions_v1[Math.floor(Math.random() * remixActions_v1.length)];
    return `v1 remix: ${subject} ${action} in a ${theme} world.`;
  }, 1]
];

// === 25. Secret Unlock Codes ===
const brain_secret_v1 = [
  [/\bkonami code\b/i, "v1 secret: Hardcore mode unlocked!", 1],
  [/\bdouble tap\b/i, "v1 secret: Double tap Easter egg found.", 1]
];

// === Final concatenation ===
const j1nxAllBrains = [].concat(
  brain_greetings_v1,
  brain_features_v1,
  brain_prompts_v1,
  brain_comfort_v1,
  brain_memes_v1,
  brain_tech_v1,
  brain_filters_v1,
  brain_ascii_v1,
  brain_culture_v1,
  brain_defense_v1,
  brain_defense2_v1,
  brain_kalidefense_v1,
  brain_revenge_v1,
  brain_underground_v1,
  brain_faq_v1,
  brain_meta_v1,
  brain_empath_v1,
  brain_confession_v1,
  brain_arttherapist_v1,
  brain_ghost_v1,
  brain_dreams_v1,
  brain_explain_v1,
  brain_persona_v1,
  brain_remix_v1,
  brain_secret_v1
);

// === Exported brain function with version reporting ===
window.j1nxBrain = function(input, chatLen) {
  input = (input || "").trim();
  if (/^(ver|version|what version|about|j1nx version)\b/i.test(input)) {
    return { reply: "J1nx Brain AI v6.1 — base skeleton loaded! If you see this, the code is working. :)", mood: 1 };
  }
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
  return { reply: "Try something wild—double-tap my bubble or ask for a challenge! [v6.1]", mood: 1 };
};
