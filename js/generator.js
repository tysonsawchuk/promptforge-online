/*
====================================================================
=  PROMPTFORGE GOD MODE GENERATOR.JS (v1.0.0)                      =
=  The Ultimate Modular Prompt Brain — Pro, Expandable, No Bullshit=
=  Tyson | Gore & Giggles | 2025                                   =
=                                                                  =
=  This is the *brain only*. NO UI. NO personality.                =
=  Designed to be imported by any site or app.                     =
=                                                                  =
=  - All wordbanks modular and future-proof                        =
=  - All prompt logic visible and editable                         =
=  - 100% deduped, commented, organized for pro dev use            =
=  - “Addon” sections for user/community expansions                =
=  - If you add a new bank, add to PF_DICT at bottom.              =
=  - NEVER put UI logic or bot/console code here.                  =
=  - Copy/extend banks at bottom as needed (PF_BANKS_ADDON etc)    =
=  - If this is not the best on the internet, keep building        =
=                                                                  =
=  See README for commit log, expansion notes, TODOs               =
====================================================================
*/

// === CHUNK 1: Core Utilities ===

// Pick N random items from an array, no repeats
function pf_pick(arr, n=1) {
  let pool = Array.from(arr);
  let picks = [];
  for (let i=0; i<n && pool.length>0; i++) {
    let idx = Math.floor(Math.random() * pool.length);
    picks.push(pool[idx]);
    pool.splice(idx,1);
  }
  return n === 1 ? picks[0] : picks;
}

// Capitalize first letter
function pf_cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Shuffle array (Fisher-Yates)
function pf_shuffle(arr) {
  let out = Array.from(arr);
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Remove duplicates
function pf_uniq(arr) {
  return Array.from(new Set(arr));
}

// Check type, fallback
function pf_get(arr, fallback=[]) {
  if (Array.isArray(arr) && arr.length) return arr;
  if (Array.isArray(fallback) && fallback.length) return fallback;
  return [];
}

/*
Dev Note:  
All utilities above are pure, stateless, and safe for reuse.  
DO NOT add prompt, UI, or DOM code here. Utilities = logic only!
*/

// === END CHUNK 1 ===
/* 
=====================================================================
=  CHUNK 2: WORD BANKS: PF_BANKS Structure, Core & Addon Ready      =
=  - All banks live as const arrays (or objects for special types)  =
=  - Add-on banks always follow core, for easy future expansion     =
=  - Each bank gets a clear comment and spot for future devs        =
=  - PF_BANKS = master map (see bottom) for category linkage        =
=====================================================================
*/

// --- PF_BANKS: All core word banks, add new ones at bottom ---

// === PF_ADJECTIVES: Every descriptor, clean/NSFW, meme, art, SFW, poetic, tech ===
const PF_ADJECTIVES = [
  "smooth", "rough", "soft", "hard", "warm", "cold", "bright", "dark", "shiny", "matte", "wet", "dry", "sleek", "sparkling", "thick", "thin",
  "beautiful", "gorgeous", "cute", "hot", "sexy", "sensual", "erotic", "kinky", "dirty", "raunchy", "shameless", "edgy", "innocent", "corrupted",
  "classic", "retro", "modern", "vintage", "noir", "cinematic", "dreamy", "hyperreal", "pixelated", "glitched", "cyber", "ethereal", "macabre",
  "lush", "minimal", "iconic", "timeless", "trippy", "meme", "OG", "forbidden", "taboo", "blessed", "cursed", "legendary", "savage"
  // [Expand in PF_ADJECTIVES_ADDON below]
];

// === PF_VERBS: Actions, movement, art/photo/NSFW-safe, meme, etc ===
const PF_VERBS = [
  "touch", "stroke", "caress", "kiss", "lick", "suck", "bite", "grope", "embrace", "snuggle", "hug", "pose", "stare", "glance", "gaze", "admire",
  "walk", "run", "crawl", "jump", "dance", "spin", "twist", "arch", "spread", "thrust", "grind", "mount", "straddle", "climb", "slide", "slap",
  "moan", "whisper", "pant", "smirk", "giggle", "laugh", "tease", "flirt", "command", "submit", "dominate", "resist", "seduce", "tempt",
  "create", "draw", "paint", "compose", "render", "blend", "mask", "edit", "enhance", "upscale", "distort", "glitch", "overlay"
  // [Expand in PF_VERBS_ADDON below]
];

// === PF_NOUNS: Character, people, meme, NSFW, roles, animals, alt ===
const PF_NOUNS = [
  "girl", "woman", "boy", "man", "person", "lover", "partner", "friend", "stranger", "artist", "model", "muse", "starlet", "idol",
  "teacher", "nurse", "paramedic", "cop", "queen", "king", "princess", "stud", "milf", "baddie", "boss", "maid", "butler", "vixen",
  "fox", "kitten", "puppy", "lion", "bunny", "angel", "devil", "monster", "vampire", "android", "robot", "elf", "orc", "dragon"
  // [Expand in PF_NOUNS_ADDON below]
];

// === PF_SCENE: Locations, environments, lighting, objects, settings ===
const PF_SCENES = [
  "luxury bedroom", "cheap motel", "sunlit kitchen", "nightclub", "private booth", "forest glade", "hotel bathroom", "gym locker room",
  "neon-lit street", "retro arcade", "dark alley", "rooftop", "garage", "art studio", "strip club", "mansion", "balcony", "dungeon",
  "dreamscape", "void", "space station", "castle", "enchanted forest", "rainy window", "mirror maze", "underground club", "rooftop pool"
  // [Expand in PF_SCENES_ADDON below]
];

// === PF_EMOTIONS: Mood, feelings, state, meme, poetic, art direction ===
const PF_EMOTIONS = [
  "happy", "sad", "angry", "confused", "ecstatic", "nervous", "terrified", "excited", "bored", "melancholic", "serene", "peaceful",
  "furious", "inspired", "hopeless", "hopeful", "dreamy", "wistful", "sassy", "flirty", "bashful", "embarrassed", "mortified",
  "ashamed", "guilty", "proud", "triumphant", "empowered", "dominant", "submissive", "teasing", "provocative", "lustful", "horny",
  "craving", "needy", "clingy", "desperate", "content", "smug", "pensive", "obsessed", "fascinated", "vulnerable", "exposed"
  // [Expand in PF_EMOTIONS_ADDON below]
];

// === [Add all future banks here, one per section, always commented] ===

/*
Dev Note:  
All banks should be deduped, sorted by "theme," and easily expanded.
Add-on banks (PF_ADJECTIVES_ADDON, etc) should always follow each core bank,
so the main ones stay clean and organized, and new slang or categories
are always easy to add, delete, or tweak.
*/

// --- Add-on banks go below for each category (leave blank to start) ---

const PF_ADJECTIVES_ADDON = [];
const PF_VERBS_ADDON = [];
const PF_NOUNS_ADDON = [];
const PF_SCENES_ADDON = [];
const PF_EMOTIONS_ADDON = [];

// --- Future banks: PF_COLORS, PF_LIGHTING, PF_PROPS, etc. (expand here) ---

/* 
Dev Note:  
Add new banks below with `const PF_BANKNAME = [];`
Always update PF_BANKS_MAP at bottom!
*/

// === END CHUNK 2 ===
/* 
=====================================================================
=  CHUNK 3: CATEGORY MAP & PROMPT GENERATOR LOGIC                   =
=  - PF_BANKS_MAP: Token/category-to-bank lookup for all categories =
=  - Add a new [TOKEN] here to link to a bank (or multiple banks)   =
=  - PF_GENERATE: “God Mode” prompt generation engine               =
=====================================================================
*/

// --- MASTER CATEGORY MAP: [TOKEN] → BANK NAME(S) ---
// Add new categories here as you add banks above. Supports single or fallback.
const PF_BANKS_MAP = {
  "[ADJECTIVE]": ["PF_ADJECTIVES", "PF_ADJECTIVES_ADDON"],
  "[VERB]":      ["PF_VERBS", "PF_VERBS_ADDON"],
  "[NOUN]":      ["PF_NOUNS", "PF_NOUNS_ADDON"],
  "[SCENE]":     ["PF_SCENES", "PF_SCENES_ADDON"],
  "[EMOTION]":   ["PF_EMOTIONS", "PF_EMOTIONS_ADDON"]
  // Add new mappings below as you create banks (ex: [COLOR], [PROP], [LIGHT], etc)
};

/*
Dev Note:  
When you add new word banks, map them here as [TOKEN]: ["BANK", "BANK_ADDON"], etc.
Prompt templates will swap tokens for words using this lookup.
*/

// --- GOD MODE PROMPT TEMPLATES ---
// Add templates in any style; tokens are auto-replaced with random words from banks!
const PF_PROMPT_TEMPLATES = [
  // Cinematic/Art
  "[ADJECTIVE] [NOUN] [VERB] in the [SCENE], feeling [EMOTION].",
  // Erotic
  "[ADJECTIVE] [NOUN] [VERB] [ADJECTIVE] in a [SCENE], with [EMOTION].",
  // Minimalist
  "[NOUN] [VERB] [ADJECTIVE].",
  // Story
  "A [ADJECTIVE] [NOUN] in a [SCENE], [VERB] with [EMOTION].",
  // Add more prompt templates below!
];

// --- TOKEN REPLACEMENT ENGINE ---
// Picks random word from mapped banks, supports fallback, auto-dedupes.
function pf_get_token_word(token) {
  const banks = PF_BANKS_MAP[token] || [];
  let words = [];
  banks.forEach(bank => {
    if (typeof window !== "undefined" && window[bank]) {
      words = words.concat(window[bank]);
    } else if (typeof global !== "undefined" && global[bank]) {
      words = words.concat(global[bank]);
    } else if (typeof eval(bank) !== "undefined") {
      words = words.concat(eval(bank));
    }
  });
  return pf_pick(pf_uniq(words));
}

// --- GOD MODE PROMPT GENERATOR (Main Function) ---
function pf_generate_prompt() {
  // Pick a template at random
  let tmpl = pf_pick(PF_PROMPT_TEMPLATES);

  // Replace tokens in template with random words from mapped banks
  let prompt = tmpl.replace(/\[([A-Z_]+)\]/g, (match, token) => {
    return pf_get_token_word("[" + token + "]");
  });

  // Clean up spaces/commas/periods
  return prompt.replace(/\s+([,\.])/g, "$1").replace(/\s+/g, " ").trim();
}

/*
Dev Note:  
You can now generate a God Mode prompt at any time by calling pf_generate_prompt().
Add as many templates and tokens as you want; system will auto-expand.
*/

// === END CHUNK 3 ===
<!-- 
==============================================================
=  PROMPTFORGE GENERATOR.HTML (Dev Playground)               =
=  Drop this in with generator.js loaded for instant testing =
=  Tyson | Gore & Giggles | 2025                             =
==============================================================
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PromptForge God Mode Playground</title>
  <style>
    body { background: #151922; color: #eee; font-family: 'JetBrains Mono', 'Fira Mono', monospace; margin: 0; padding: 2em; }
    h1 { color: #ff32c0; font-size: 2em; margin-bottom: .2em;}
    #prompt { font-size: 1.25em; background: #23263a; border-radius: 8px; padding: 1em; margin: 1em 0; box-shadow: 0 0 5px #1117; min-height: 2.5em;}
    button { background: #ff32c0; color: #fff; font-size: 1em; border: none; border-radius: 5px; padding: .75em 2em; cursor: pointer; transition: 0.2s;}
    button:hover { background: #ff61a6; }
    .footer { color: #666; font-size: 0.95em; margin-top: 3em;}
    .mono { font-family: 'Fira Mono', 'JetBrains Mono', monospace; font-size: 1em; }
  </style>
  <!-- 
    NOTE: You must include generator.js in the same folder!
    <script src="generator.js"></script> 
  -->
</head>
<body>
  <h1>PromptForge God Mode Playground</h1>
  <div id="prompt" class="mono"></div>
  <button onclick="refreshPrompt()">New Prompt</button>
  <br>
  <div class="footer mono">
    Powered by <b>PromptForge GOD MODE</b> &copy; Tyson | Gore & Giggles 2025
    <br>
    <span style="color:#999;">All wordbanks &amp; prompt logic are editable.<br>
    To expand, edit <b>generator.js</b> and refresh this page.<br>
    <b>NO UI logic or personalities in the brain file!</b>
    </span>
  </div>
  <script src="generator.js"></script>
  <script>
    function refreshPrompt() {
      document.getElementById('prompt').innerText = pf_generate_prompt();
    }
    // First load
    refreshPrompt();
  </script>
</body>
</html>
/* 
=====================================================================
=  CHUNK 4: SUPERBANKS, ADD-ONS, ADVANCED CATEGORIES                =
=  - Each core bank now gets a matching *_ADDON for user expansion  =
=  - NSFW toggle logic ready (if/when wanted)                       =
=  - Advanced examples: COLORS, LIGHTING, PROPS, EMOJI, MOOD, etc   =
=====================================================================
*/

// === COLORS (art/photo/lighting/mood) ===
const PF_COLORS = [
  "neon pink", "blood red", "emerald green", "ice blue", "midnight violet", "smoky black", "ash gray", "sunset orange", "peach blush",
  "golden amber", "frosted silver", "cloudy white", "sky blue", "forest green", "royal purple", "electric yellow", "bruised plum", "rose gold"
];
const PF_COLORS_ADDON = []; // For user/community expansion

// === LIGHTING (scene/photo/cinema) ===
const PF_LIGHTING = [
  "golden hour", "harsh neon", "soft backlight", "rim-lit", "moonlit", "strobe-lit", "candle-glow", "twilight haze", "UV blacklight", "firelight",
  "flickering bulb", "spotlit", "tv glow", "police lights", "streetlamp-lit"
];
const PF_LIGHTING_ADDON = [];

// === PROPS (physical objects, realism) ===
const PF_PROPS = [
  "mirror", "champagne flute", "broken glass", "cigarette case", "fur coat", "ice cube", "silk scarf", "shot glass", "makeup bag", "handcuffs",
  "mask", "love note", "stripper pole", "hotel keycard", "vintage camera", "pearl necklace", "garter belt"
];
const PF_PROPS_ADDON = [];

// === EMOJI (meme, emotion, art, etc) ===
const PF_EMOJI = [
  "😏","😉","😍","😘","😈","👄","👅","💋","🍑","🍆","🍒","💦","🔥","✨","💜","💛","🖤","🤍","🥵","🥴","🤤","😳","🙈","😋","😜"
];
const PF_EMOJI_ADDON = [];

// === MOOD/EMOTIONAL STATES (layer for [EMOTION] or [MOOD]) ===
const PF_MOODS = [
  "romantic", "sensual", "playful", "naughty", "innocent", "bold", "confident", "dominant", "submissive", "tender", "caring",
  "adoring", "loving", "passionate", "wild", "fiery", "intense", "dreamy", "wistful", "longing", "lustful", "desperate", "hypnotic",
  "entranced", "reckless", "forbidden", "taboo", "dangerous", "enigmatic", "secretive", "coy", "coquettish", "sultry", "smoldering",
  "blushing", "giggly", "excited", "freaky", "exhausted", "satisfied"
];
const PF_MOODS_ADDON = [];

// === EXAMPLE: NSFW ON/OFF TOGGLE (pro future proof, not wired by default) ===
let PF_NSFW_MODE = true; // Turn off for safe/PG prompts

// Example: If you want to restrict/expand banks in safe mode, use:
function pf_get_safe_bank(arr, arr_nsfw=[]) {
  return PF_NSFW_MODE ? arr.concat(arr_nsfw) : arr;
}

// --- Add these new banks to the map for token use ---
Object.assign(PF_BANKS_MAP, {
  "[COLOR]":   ["PF_COLORS", "PF_COLORS_ADDON"],
  "[LIGHT]":   ["PF_LIGHTING", "PF_LIGHTING_ADDON"],
  "[PROP]":    ["PF_PROPS", "PF_PROPS_ADDON"],
  "[EMOJI]":   ["PF_EMOJI", "PF_EMOJI_ADDON"],
  "[MOOD]":    ["PF_MOODS", "PF_MOODS_ADDON"]
});

// --- New prompt template examples using new categories ---
PF_PROMPT_TEMPLATES.push(
  // Advanced “cinema” prompt
  "[ADJECTIVE] [NOUN] [VERB] with a [PROP] in [SCENE], lit by [LIGHT] and feeling [MOOD] [EMOJI].",
  // Art-style
  "[ADJECTIVE] [NOUN] in a [COLOR] [SCENE], bathed in [LIGHT], mood is [MOOD]."
);

/*
Dev Note:
- Add-on banks make expanding as easy as dropping new lists at the end.
- PF_NSFW_MODE toggle is for future expansion: call pf_get_safe_bank to swap SFW/NSFW.
- To expand with more categories, repeat the same pattern above.
- Templates can call new tokens any time, just map them!
*/

// === END CHUNK 4 ===
/* 
=========================================================================
=  CHUNK 5: NSFW/SAFE TOGGLE · IMPORT/EXPORT · WEIGHTED PROMPT SLIDERS  =
=  - Toggle SFW/NSFW on any wordbank                                   =
=  - Live bank import/export for backup/sharing                        =
=  - Weighted (slider) word choice for “rare” or “common” tokens       =
=========================================================================
*/

// --- NSFW/SAFE BANK SPLIT SYSTEM ---
const PF_VERBS_SFW = [
  "smile", "walk", "pose", "dance", "gaze", "hold", "hug", "caress", "whisper", "sing", "jump"
];
const PF_VERBS_NSFW = [
  "grind", "straddle", "nibble", "lick", "spank", "suckle", "arch", "moan", "whimper", "ride"
];

// Example: weighted slider values (to use later)
const PF_VERBS_WEIGHT = [
  // [word, weight] (1=common, 5=ultra-rare/strong)
  ["smile", 1], ["pose", 1], ["gaze", 2], ["caress", 2],
  ["arch", 4], ["ride", 5], ["grind", 5], ["moan", 3]
];

// --- Category Map Wiring ---
PF_BANKS_MAP["[VERB_SFW]"]  = ["PF_VERBS_SFW"];
PF_BANKS_MAP["[VERB_NSFW]"] = ["PF_VERBS_NSFW"];
PF_BANKS_MAP["[VERB_WEIGHTED]"] = ["PF_VERBS_WEIGHT"];

// --- Weighted (slider) picker utility ---
function pf_weighted_pick(weightArr, userWeight = 1) {
  // userWeight: 1 (normal), 5 (rare), etc.
  let flat = [];
  weightArr.forEach(([word, w]) => {
    if (w <= userWeight) flat.push(word);
  });
  if (flat.length === 0) flat = weightArr.map(x => x[0]);
  return pf_pick(flat);
}

// --- Example: weighted slider UI logic hook ---
// (You wire this in your HTML wherever you want the slider)
let pf_weight_level = 1; // 1 = common, 5 = rare/explicit

// --- Export/import feature for all wordbanks ---
// Export as JSON string (for backup/sharing)
function pf_export_banks() {
  let banks = {};
  Object.keys(PF_BANKS_MAP).forEach(tok => {
    PF_BANKS_MAP[tok].forEach(bn => {
      if (typeof window[bn] !== "undefined") banks[bn] = window[bn];
    });
  });
  return JSON.stringify(banks, null, 2);
}
// Import: merge/replace banks from JSON (for upgrades/patches)
function pf_import_banks(json) {
  try {
    let banks = JSON.parse(json);
    Object.keys(banks).forEach(bn => window[bn] = banks[bn]);
    return true;
  } catch (e) { return false; }
}

// --- NSFW/Clean picker example for prompt engine ---
function pf_get_nsfw_word(token) {
  if (token === "[VERB]") {
    return PF_NSFW_MODE ? pf_pick(PF_VERBS_NSFW) : pf_pick(PF_VERBS_SFW);
  }
  // Add similar logic for any other split bank!
  return pf_get_token_word(token);
}

// --- For weighted: in a template, call as needed ---
function pf_get_weighted_word(token) {
  if (token === "[VERB_WEIGHTED]") {
    return pf_weighted_pick(PF_VERBS_WEIGHT, pf_weight_level);
  }
  return pf_get_token_word(token);
}

// --- Example: add slider to HTML playground ---
// <input type="range" min="1" max="5" value="1" id="pfWeightSlider" oninput="pf_weight_level=this.value;">
// Then use pf_weight_level as needed in prompt generation

/*
Dev Notes:
- NSFW/SFW logic is clean and modular—add as many splits as you want.
- Weighted banks let users pick “how wild/rare” their output gets!
- Import/export is for instant backup, upgrades, or “share my banks.”
- All above features are pure JS, no backend or server needed.
*/

// === END CHUNK 5 ===
// === PF_ADJECTIVES: Everything for bodies, scenes, moods, NSFW, art, meme, poetic, tech ===
const PF_ADJECTIVES = [
  "beautiful", "ugly", "smooth", "rough", "soft", "hard", "wet", "dry", "warm", "cold", "sharp", "dull", "gentle", "harsh", "clean", "dirty", "brilliant", "dark",
  "rad", "slick", "classy", "fly", "wicked", "lit", "fire", "boujee", "savage", "slay", "cringe", "goated", "vibe", "simp", "drippy", "salty",
  "rizz", "sigma", "based", "shook", "zesty", "valid", "voluptuous", "curvy", "sultry", "luscious", "teasing", "sensual", "scandalous",
  "provocative", "revealing", "steamy", "intimate", "passionate", "naughty", "frisky", "alluring", "bodacious", "busty", "plush",
  "muscular", "petite", "athletic", "angular", "lithe", "asymmetrical", "radiant", "cinematic", "dreamy", "ethereal", "surreal", "hyperrealistic",
  "vivid", "saturated", "noir", "analog", "polished", "distorted", "bokeh", "shimmering", "deepfaked", "glitched", "pixelated", "cyberpunk",
  "twisted", "forbidden", "taboo", "sinful", "filthy", "blasphemous", "unhinged", "melancholic", "gossamer", "opalescent", "verdant", "dusky",
  "gilded", "obsidian", "wired", "digital", "tactical", "portable", "augmented", "open-source", "ruggedized", "ephemeral", "colossal",
  "towering", "interdimensional", "fractal", "spectral", "supernatural", "trippy"
];
const PF_ADJECTIVES_ADDON = []; // For user/community

// === PF_VERBS: SFW, NSFW, meme, movement, cinematic, art ===
const PF_VERBS = [
  "strut", "saunter", "glide", "swagger", "stumble", "prance", "sprint", "jump", "hop", "climb", "crawl", "roll", "slide", "twist", "spin",
  "flip", "zoom in", "fade out", "montage", "paint", "draw", "render", "blend", "smudge", "warp", "sparkle", "twinkle", "glow", "ripple",
  "surge", "melt", "evaporate", "materialize", "transform", "power up", "level up", "charge", "dash", "summon", "teleport", "buff", "nerf",
  "cut to", "fade to", "close-up", "reaction shot", "pull back", "smash zoom", "blur to", "caress", "cup", "grip", "massage", "tease", "suckle",
  "kiss", "embrace", "straddle", "sway", "gyrate", "grind", "thrust", "arch", "shimmy", "rock", "spasm", "pulse", "tingle", "quiver", "shudder",
  "yeet", "dab", "vibe", "rizz", "stan", "slide in", "flex", "spill tea"
];
const PF_VERBS_ADDON = [];

// === PF_NOUNS: People, roles, body, object, meme, mascot, internet, erotic ===
const PF_NOUNS = [
  "girl", "boy", "woman", "man", "stranger", "friend", "enemy", "partner", "lover", "artist", "model", "star", "queen", "boss", "kitten",
  "puppy", "vixen", "succubus", "vampire", "devil", "angel", "monster", "android", "robot", "clone", "mermaid", "fae", "elf", "orc", "demon",
  "ghost", "reaper", "idol", "influencer", "streamer", "gamer", "hottie", "stud", "cutie", "fox", "lion", "wolf", "bunny", "snake", "tiger",
  "bimbo", "himbo", "femboy", "brat", "tease", "seductress", "nymph", "vixen", "beaver", "dragon", "unicorn"
];
const PF_NOUNS_ADDON = [];

// === PF_SCENES: Cinematic, location, art, meme, SFW/NSFW ===
const PF_SCENES = [
  "luxury bedroom", "cheap motel", "sunlit kitchen", "rainy window", "night club", "back alley", "secluded forest", "hidden garden",
  "deserted beach", "mountain cabin", "lake dock", "hot tub", "poolside", "campfire", "rooftop", "balcony", "garage", "workshop",
  "locker room", "abandoned warehouse", "neon-lit city", "retro arcade", "tattoo parlor", "underground club", "strip club", "spooky attic",
  "mirror maze", "floating bed", "velvet lounge", "crystal cave", "space station", "zero gravity", "cyberpunk alley", "alien landscape"
];
const PF_SCENES_ADDON = [];

// === PF_EMOTIONS: Raw, meme, poetic, NSFW, cinematic ===
const PF_EMOTIONS = [
  "romantic", "sensual", "playful", "naughty", "innocent", "bold", "confident", "dominant", "submissive", "tender", "caring",
  "adoring", "loving", "passionate", "wild", "fiery", "intense", "dreamy", "wistful", "longing", "lustful", "desperate", "hypnotic",
  "entranced", "reckless", "forbidden", "taboo", "dangerous", "enigmatic", "secretive", "coy", "coquettish", "sultry", "smoldering",
  "blushing", "giggly", "excited", "freaky", "exhausted", "satisfied"
];
const PF_EMOTIONS_ADDON = [];

// --- Already included in previous chunks:
const PF_COLORS = [/* ...see above... */];
const PF_LIGHTING = [/* ...see above... */];
const PF_PROPS = [/* ...see above... */];
const PF_EMOJI = [/* ...see above... */];
const PF_MOODS = [/* ...see above... */];

// === Example: To add more, just push to PF_ADJECTIVES_ADDON (and so on)! ===
// PF_ADJECTIVES_ADDON.push("newword1", "newword2");

// === PF_SCENARIOS: All possible prompt setups, kinks, movie, NSFW, wild, meme ===
const PF_SCENARIOS = [
  // Cinematic/real world
  "caught in the act", "office after hours", "strangers at a club", "forbidden classroom", "hotel rendezvous", "backseat encounter",
  "accidental voyeur", "secret affair", "midnight dare", "initiation ritual", "lost bet", "neighbor’s window", "under the table",
  "initiation ritual", "double life revealed", "role reversal", "bachelorette party", "public risk", "risky photoshoot", "dark web stream",
  // NSFW/Taboo (all filter-dodging, safe phrasing)
  "anonymous hookup", "power play", "voyeurism", "exhibitionism", "age gap fantasy", "teacher/student", "sibling rivalry", "stepfamily tension",
  "seducing authority", "dirty confession", "humiliation", "cross-dressing", "fetish exposure", "unplanned pregnancy", "blackmail", "coercion",
  "cheating", "public play", "after-hours party", "dangerous obsession", "summer camp crush", "confessional sin",
  // Meme/weirdcore/absurd
  "mid-session selfie", "glitch in the Matrix", "breaking the fourth wall", "AI prompt gone wild", "cosplay gone wrong",
  "caught streaming", "NPC moment", "vibe check", "hard launch", "girlboss takeover", "boy/boy pair", "girl/girl pair", "main character moment",
  // Internet legend/trope
  "bathroom mirror selfie", "lost phone video", "leaked DMs", "reacting to comments", "teaching a noob", "found footage", "plot twist confession",
  "exposed by AI", "undercover mission", "night at the club", "subreddit drama", "Discord call", "Zoom mishap", "face reveal", "catfish exposed"
];

// === PF_PUNCTUATION: Every style for stress, highlight, mark, meme, retro ===
const PF_PUNCTUATION = [
  ".", ",", ";", ":", "-", "—", "(", ")", "[", "]", "{", "}", "<", ">", "!", "?", "...", "‽", "/", "\\", "|", "\"", "'", "`", "~", "_", "*", "**", "***",
  "!!!", "???", "?!", "...", "—", "–", "•", "·", "°", "→", "←", "↑", "↓", "↔", "#", "@", "&", "$", "%", "^", "+", "=", "~",
  "(*_*)", "( ͡° ͜ʖ ͡°)", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "(☞ﾟヮﾟ)☞", "(¬‿¬)", "¯\\_(ツ)_/¯", "【 】", "『 』", "《 》", "❝ ❞"
];

// === PF_EMPHASIS: Highlight styles for stars, underscores, brackets, meme ===
const PF_EMPHASIS = [
  "*", "**", "***", "_", "__", "~~", "`", "=", "()", "[]", "{}", "<>", "<b>", "</b>", "<i>", "</i>", "<u>", "</u>", "<mark>", "</mark>",
  "<em>", "</em>", "<strong>", "</strong>", "(( ))", "【 】", "『 』", "《 》", "❝ ❞", "【NSFW】", "⚠️", "‼️", "💥", "🔥", "✨", "🔞"
];

// === PF_SLANG: Meme, oldschool, modern, global, SFW/NSFW, filter dodge ===
const PF_SLANG = [
  "lit", "fire", "woke", "savage", "sus", "cringe", "based", "bussin", "drip", "cap", "no cap", "salty", "yeet", "flex", "lowkey", "highkey",
  "squad", "fam", "shade", "stan", "simp", "thirsty", "ghost", "AF", "IRL", "slay", "goat", "slaps", "main character", "vibe", "vibing", "chill",
  "swole", "beef", "ship", "OTP", "go off", "periodt", "spill the tea", "tea", "fomo", "glow up", "extra", "basic", "snatched", "mood", "deadass",
  "bet", "fit", "iconic", "clap back", "glow up", "receipts", "tbh", "fr", "oop", "shook", "boomer", "Karen", "Chad", "NPC", "rizz", "mid", "gyat",
  "cheugy", "wyd", "ngl", "finna", "vibe check", "say less", "it’s giving", "ok boomer", "smh", "lol", "lmao", "rofl", "xd", "pwned", "rekt", "pog",
  "ez", "gg", "noob", "pro", "afk", "brb", "btw", "idk", "idc", "fml", "wtf", "bff", "jk", "imo", "irl", "yolo", "tfw", "ftw", "meme", "dank", "cracked",
  "sweaty", "meta"
];

// === PF_SWEARS: SFW, filter dodge, meme, retro, alt replacements ===
const PF_SWEARS = [
  "heck", "dang", "shoot", "fudge", "crap", "bollocks", "bugger", "bloody", "git", "arse", "blimey", "wanker", "piss", "bollocks", "darn",
  "friggin", "shite", "bull", "baloney", "malarkey", "jerk", "doofus", "douche", "twat", "muppet", "numpty", "dork", "bozo", "dweeb",
  "turd", "tool", "dingus", "knob", "git", "prat", "pillock", "tart", "tosser", "skank", "perv", "sleazebag", "floozy", "hussy",
  // NSFW-ish alt phrasing for swap-in
  "bad girl", "bad boy", "wild thing", "tease", "vixen", "naughty one", "spitfire", "minx", "rascal"
];

// === PF_EMOJI: Massive emoji set, SFW/NSFW-coded, modern & classic ===
const PF_EMOJI = [
  "🔥", "💦", "✨", "🌈", "💀", "🧃", "🧊", "🧸", "🍑", "🍆", "😈", "🥵", "🥶", "😏", "😍", "🤤", "😳", "🙈", "🙉", "🙊", "👀", "👅", "🫦", "💋",
  "🫦", "🧲", "🍭", "🍬", "🍒", "🌸", "🌹", "🎉", "💫", "🩷", "💜", "💙", "💚", "💛", "❤️", "🖤", "💯", "☠️", "🤍", "🤎", "😜", "🥳", "👑", "🎩", "👓",
  "🕶️", "🥽", "⛓️", "🧣", "🧤", "🥻", "🧥", "🩲", "🩳", "🥿", "👠", "👡", "👢", "👞", "👟", "🥾", "🩰", "⛸️", "🥇", "🥈", "🥉", "🏅"
];

// === PF_NSFW_SWAPS: Automated filter-dodge word swaps ===
const PF_NSFW_SWAPS = {
  "cunt":      ["intimate area", "velvet bud", "soft petal"],
  "pussy":     ["kitten", "lotus", "delicate bloom"],
  "cock":      ["shaft", "pillar", "tower"],
  "dick":      ["member", "wand", "instrument"],
  "tits":      ["chest", "bosom", "curves"],
  "boobs":     ["bust", "upper body", "front"],
  "ass":       ["hips", "backside", "curve"],
  "anus":      ["backdoor", "rosebud", "circle"],
  "cum":       ["essence", "nectar", "dew"],
  "cumshot":   ["cascade", "burst", "splash"],
  "fuck":      ["embrace", "join", "fuse"],
  "fucking":   ["entwined", "joined", "blended"],
  "shit":      ["mess", "wreck", "storm"],
  "bitch":     ["badass", "queen", "boss"],
  "whore":     ["vixen", "temptress", "goddess"],
  "slut":      ["free spirit", "risk-taker", "pleasure-seeker"],
  // etc, extend as needed...
};

// === PF_BRACKETS: Every bracket style for text highlighting ===
const PF_BRACKETS = [
  "()", "[]", "{}", "<>", "《》", "【】", "『』", "❝❞", "“”", "''", "\"\"", "**", "***", "!!", "‼️"
];

// === PF_SPECIAL: “God Mode” extras (for meta, control, hacks) ===
const PF_SPECIAL = [
  "[scene]", "[fade in]", "[fade out]", "[cut to]", "[flashback]", "[dream]", "[voiceover]", "[music]", "[silence]", "[pause]", "[NSFW]", "[SFX]", "[VFX]", "[fx]", "[trigger warning]", "[content warning]", "[close-up]", "[zoom]", "[pan]", "[montage]", "[caption]", "[credits]", "[overlay]", "[monster]", "[taboo]", "[hack]", "[deepfake]", "[meta]", "[hyperreal]", "[style transfer]", "[GAN]", "[StableDiffusion]", "[LoRA]", "[controlnet]", "[prompt weighting]", "[negative prompt]", "[CFG scale]", "[sampler type]", "[seed lock]", "[embedding]"
];

// --- Just copy-paste these at the bottom (or above the add-on area) in your generator.js ---

// === PF_POSITIONS: Every pose/position/scene setup, SFW & NSFW ===
const PF_POSITIONS = [
  "standing tall", "kneeling", "crouched", "sprawled", "reclining", "arched back", "spooning", "straddling", "side by side",
  "face to face", "back to chest", "sitting in lap", "leaning over", "against the wall", "hands tied", "legs spread", "bent over",
  "on all fours", "suspended", "cross-legged", "spooning from behind", "cowgirl", "reverse cowgirl", "doggy style", "lotus", "missionary",
  "69 position", "face-sitting", "lap dance pose", "over the edge", "against the glass", "standing embrace", "on the edge of the bed",
  "over the table", "under the sheets", "shower pose", "bath tub position", "mirror shot", "pinned down", "riding", "mounting", "bridging"
];

// === PF_GROUP_TYPES: Relationship & group/scene, all combos ===
const PF_GROUP_TYPES = [
  "lesbian duo", "gay duo", "male/female pair", "lesbian trio", "threesome (2 girls, 1 guy)", "boy/boy pair", "foursome",
  "polycule", "swingers group", "couple plus guest", "voyeur crowd", "stag party", "bachelorette", "orgy", "rival teams",
  "enemies to lovers", "best friends", "college roommates", "step-family", "office team", "secret society", "neighbors"
];

// === PF_KINKS: Every common and wild kink, SFW/NSFW phrasing ===
const PF_KINKS = [
  "bondage", "domination", "submission", "voyeurism", "exhibitionism", "impact play", "temperature play", "role reversal",
  "shame play", "praise kink", "brat taming", "edging", "restraint", "wax play", "pet play", "public play", "humiliation",
  "overstimulation", "deprivation", "collaring", "sensory play", "spanking", "hair pulling", "oral fixation", "anal play",
  "strap-on play", "group play", "double penetration", "dirty talk", "nipple play", "feet", "heels", "stockings", "nylon", "crossdressing"
];

// === PF_GENRES: All film/art/scene genres, SFW & dark/alt included ===
const PF_GENRES = [
  "action", "adventure", "drama", "romance", "comedy", "dark comedy", "thriller", "horror", "psychological horror", "erotic thriller",
  "mystery", "noir", "cyberpunk", "fantasy", "high fantasy", "urban fantasy", "sci-fi", "space opera", "parody", "mockumentary",
  "teen drama", "coming of age", "musical", "animation", "anime", "arthouse", "indie", "surreal", "altcore", "dreamcore", "nightmarecore",
  "slasher", "gothic", "slapstick", "historical", "post-apocalypse", "dystopian", "slice of life", "school life", "sports", "fetish", "taboo"
];

// === PF_TABOO_EXTRA: All the wildest (clean-phrased) NSFW/edge scenarios ===
const PF_TABOO_EXTRA = [
  "age difference fantasy", "stepfamily drama", "forbidden office romance", "teacher/student", "caught in public", "public play",
  "anonymous hookup", "secret affair", "power dynamic", "risky confession", "blackmail", "unplanned risk", "voyeur surprise",
  "public exhibition", "roleplay as authority", "seduction dare", "after hours", "rivalry seduction", "masked encounter"
];

// === PF_PHOTO_STYLE: For movie/image prompt, every vibe/lighting/FX imaginable ===
const PF_PHOTO_STYLE = [
  "soft focus", "vivid color", "sepia", "black and white", "hyperreal", "cinematic", "noir", "glitchcore", "neon", "retro film",
  "bokeh", "dream blur", "chromatic aberration", "infrared", "ultra-wide", "fisheye", "studio strobe", "moonlit", "spotlit",
  "split-tone", "high-contrast", "muted", "vaporwave", "holographic", "Instagram filter", "TikTok effect", "open flash", "ring light",
  "HDR", "grainy", "overexposed", "low-key", "high-key", "golden hour", "sunset gradient", "shadow-dappled", "night vision", "heatmap"
];

// === PF_SPECIAL_CHAR: All non-letter highlight and meme marks ===
const PF_SPECIAL_CHAR = [
  "★", "☆", "✦", "✧", "⚡", "‼", "❗", "❓", "✔", "✘", "☠", "💀", "🔥", "💦", "💫", "🩷", "💜", "🖤", "✨", "🎉", "🍑", "🍆", "🍒", "😈"
];

// === PF_ERA: Time period, vibe, setting (movie, photo, style, scene) ===
const PF_ERA = [
  "modern day", "future", "cyberpunk", "80s", "90s", "Y2K", "old Hollywood", "silent film era", "Victorian", "Roaring 20s", "medieval",
  "ancient Greece", "ancient Egypt", "post-apocalyptic", "space age", "early 2000s", "grunge era", "vintage porn", "golden age film"
];

// === PF_EMOTIONS: Deep, varied, cinematic feelings for any prompt ===
const PF_EMOTIONS = [
  "ecstatic", "melancholic", "anxious", "impulsive", "wistful", "provocative", "starved for touch",
  "apathetic", "thrilled", "lonely", "satisfied", "torn", "daring", "paranoid", "euphoric", "content",
  "overwhelmed", "defiant", "hopeful", "devastated", "jealous", "curious", "obsessed", "serene", "restless",
  "shy", "shaken", "hypnotized", "broken", "bold", "nervous", "aroused", "lustful", "vulnerable", "exposed",
  "smitten", "tense", "angsty", "lost in thought", "zoned out", "smug", "triumphant", "inspired", "resigned"
];

// === PF_REACTIONS: Every cinematic and NSFW-ready facial/body reaction ===
const PF_REACTIONS = [
  "gasping", "moaning", "biting lip", "trembling", "shuddering", "arch back", "crying out", "quivering",
  "flushed cheeks", "panting", "breathless", "sighing", "shaking", "rolling eyes", "squirming", "blushing",
  "begging", "purring", "shaking head", "nervous laugh", "winking", "smiling", "smirk", "cheeky grin",
  "teasing smile", "mock surprise", "sulking", "pouting", "wide-eyed stare", "side-eye", "furrowed brow",
  "gritting teeth", "licking lips", "sticking tongue out", "hiding face", "smug look", "evil grin"
];

// === PF_FACIAL_DETAILS: Micro-details for realism, photo, or story close-ups ===
const PF_FACIAL_DETAILS = [
  "tear tracks", "smudged mascara", "flushed cheeks", "quivering lip", "arced eyebrow", "beaded sweat",
  "teeth showing", "freckled nose", "swollen lips", "crooked grin", "smeared blush", "fluttering lashes",
  "wrinkled brow", "furrowed forehead", "dimples", "sunken eyes", "cracked smile", "glistening eyes",
  "downturned mouth", "sharp jawline", "flaring nostrils", "glossy lips", "bitten lip", "pale skin"
];

// === PF_MOOD: From sweet to deranged, a spectrum for every prompt ===
const PF_MOOD = [
  "moody", "playful", "innocent", "lustful", "naughty", "teasing", "fiery", "mischievous", "dreamy",
  "gentle", "tender", "serious", "domineering", "submissive", "vulnerable", "excited", "hypnotic",
  "trance-like", "reckless", "forbidden", "dangerous", "enigmatic", "bold", "soft", "whimsical", "somber",
  "chaotic", "wild", "euphoric", "carefree", "sassy", "wicked", "desperate", "troubled", "blissful"
];

// === PF_SENSATION: Touch, feeling, and body-based descriptors (all SFW/NSFW) ===
const PF_SENSATIONS = [
  "tingling", "electric", "burning", "freezing", "warmth", "cool breeze", "icy shiver", "soft caress",
  "rough scrape", "sharp tingle", "gentle squeeze", "stinging", "aching", "numbing", "prickling", "pulsing",
  "throbbing", "soaking", "dripping", "sticky", "slick", "smooth", "velvety", "gritty", "powdery", "silky",
  "downy", "goosebumps", "butterflies", "heartbeat racing", "palms sweating", "short of breath"
];
// === PF_PROPS: Physical objects/props for scenes, SFW+NSFW ===
const PF_PROPS = [
  "ice cube", "fur coat", "playing cards", "striped tie", "vintage camera", "biker helmet", "shot glass", "silk scarf", "ankle bracelet",
  "lipstick tube", "mirror compact", "hand fan", "glass ashtray", "barstool", "cigarette case", "pearl necklace", "garter belt", "shower loofah",
  "blindfold", "perfume bottle", "bed restraints", "cat ears", "feather boa", "nipple clamps", "zipper mask", "body chain", "spiked collar"
];

// === PF_SCENE_TOKENS: Settings, places, scene glue ===
const PF_SCENE_TOKENS = [
  "shadowy corner", "private booth", "hotel elevator", "dance floor", "parking garage", "sweaty gym", "downtown rooftop", "marble staircase",
  "VIP lounge", "janitor’s closet", "midnight diner", "VIP balcony", "dark hallway", "steamy sauna", "cheap motel", "basement studio",
  "crowded subway", "rooftop pool", "public restroom", "abandoned lot", "luxury suite", "rainy alley", "art studio", "locker room"
];

// === PF_LIGHTING_COLOR: All light/color moods, for [LIGHT] & [COLOR] ===
const PF_LIGHTING_COLOR = [
  "cool blue", "sultry red", "amber gold", "ice white", "warm orange", "green glow", "midnight purple", "frosted silver",
  "sunset pink", "dirty yellow", "foggy grey", "rich copper", "seafoam green", "neon violet", "hazy gold", "smoky teal", "milky rose",
  "moonlit silver", "bone white", "dusky brown", "sunbeam yellow", "emerald green", "midnight black", "infrared", "ultraviolet"
];

// === PF_DIALOGUE: Cinematic, NSFW, and meme-friendly prompt lines ===
const PF_DIALOGUE = [
  "Don’t stop.", "You know you want this.", "Make me beg.", "Not here—someone might see.", "Do you trust me?", "Shut up and kiss me.",
  "Say my name.", "Harder.", "I shouldn’t want this.", "Take it off.", "Bite me.", "Keep your eyes on me.", "No one can hear us.",
  "I dare you.", "Is this what you want?", "You’re shaking.", "Tell me you need it.", "You like it rough?", "Pull my hair.", "Don’t you dare stop.",
  "Prove it.", "Be a good girl.", "Lose control.", "Let’s make a mess.", "Closer.", "I want all of you.", "Let me taste you.", "It’s just us now."
];

// === PF_CAMERA_TRICKS: Posing, FX, and cinematic tricks for art/film ===
const PF_CAMERA_TRICKS = [
  "soft focus", "close-up", "macro shot", "split screen", "freeze-frame", "over-the-shoulder", "POV angle", "bokeh blur", "fish-eye lens",
  "motion blur", "tilt-shift", "color gel lighting", "neon wash", "strobe", "infrared filter", "vaporwave filter", "double exposure",
  "mirror reflection", "lens flare", "low-key lighting", "rim light", "golden hour", "drone shot", "hidden cam", "zoom-in", "panning"
];

// === PF_HASHTAGS: Viral, AI, meme, and underground art tags ===
const PF_HASHTAGS = [
  "#PromptForge", "#GodMode", "#AIPrompts", "#AdultArt", "#ViralPrompts", "#ForbiddenAI", "#UndergroundAI",
  "#DarkHumor", "#NSFW", "#AIArt", "#PromptMaster", "#ArtHack", "#AIhacks", "#BannedPrompt", "#AIErotica", "#GoreAndGiggles",
  "#Trending", "#Taboo", "#ExplorePage", "#SensualArt", "#Edgy", "#NoFilter", "#PromptWizard", "#MemePrompt", "#HackerArt"
];

// === PF_META: Meta notes, rules, system instructions for prompt hacking ===
const PF_META = [
  "no censorship", "full creative freedom", "cinematic realism", "emotional impact", "surreal tone", "dream logic", "dark themes",
  "NSFW encouraged", "art-house style", "inspired by real events", "multiple layers", "raw dialogue", "loose narrative", "unpredictable twists",
  "taboo-friendly", "high detail", "intense atmosphere", "vivid color", "for advanced users", "open interpretation", "prompt hacking enabled"
];
// === PF_BODY_PARTS: Every body/anatomy part, SFW & NSFW, poetic & meme ===
const PF_BODY_PARTS = [
  // SFW & clinical
  "face","lips","eyes","cheeks","chin","jawline","forehead","nose","eyebrows","eyelashes","smile","teeth","tongue",
  "neck","shoulders","collarbone","arms","elbows","wrists","hands","palms","fingers","nails","thumbs",
  "chest","breasts","bust","nipples","areola","sternum","torso","abdomen","stomach","navel","waist","hips","back","spine","shoulder blades",
  "pelvis","groin","pubic area","mons","thighs","inner thighs","knees","legs","calves","shins","ankles","feet","heels","toes","arches",
  // NSFW/meme/poetic/alt
  "butt","buttocks","ass","booty","rear","glutes","intimate area","crotch","vulva","labia","clitoris","clit","perineum","taint","anus","star","rosebud",
  "penis","shaft","head","tip","scrotum","balls","testicles","foreskin","urethra","meatus","frenulum",
  "vagina","canal","entrance","g-spot","cervix","womb","love button","peach","eggplant","cherries","cupcake","cookie","snack","snuggle spot",
  // Playful/emoji
  "🍑","🍆","🍒","🌶️","💦","🥵","🥶","😏","😈","👅","🫦","💋"
];

// === PF_KINKS: NSFW, kink, and alt culture (swap for SFW where needed) ===
const PF_KINKS = [
  "bondage","domination","exhibitionism","impact play","voyeurism","power exchange","role reversal","restraint","praise kink","shame play","choking",
  "temperature play","brat taming","edging","sensory deprivation","spanking","wax play","collaring","overstimulation","public play","pet play",
  "costume play","hair pulling","strap-on","gagging","consensual non-consent","discipline","tease & denial","obedience","subspace","aftercare"
];

// === PF_FETISHES: Visual, sensory, and scenario triggers (SFW+NSFW) ===
const PF_FETISHES = [
  "feet","lingerie","heels","latex","wetlook","pantyhose","gloves","nylon","corset","spit","masochism","leather","uniform","crossdressing","sweat",
  "piercing","hair pulling","handcuffs","socks","spectacles","stockings","boots","satin","bikini","messy play","squirting","body paint","costumes"
];

// === PF_ACTS: Sexual acts, scenario triggers, for explicit or safe swaps ===
const PF_ACTS = [
  "oral fixation","deep kissing","blindfolded teasing","body worship","handjob under the table","riding on top","spooning from behind","lap dance",
  "mutual masturbation","public touch","striptease","mirror play","shower fun","against the wall","slow grinding","over-the-clothes rub","edge of the bed",
  "face-sitting","roleplay confession","forced submission","tied and waiting","exhibition","threesome","group play","self pleasure","phone sex"
];

// === PF_GROUP_TYPES: Pairings, trios, scenes, for movies/art/NSFW ===
const PF_GROUP_TYPES = [
  "lesbian couple","lesbian trio","throuple","bachelor party","two girls and a guy","group of strangers","best friends group","foursome","couple with guest",
  "swingers","open polycule","orgy scene","voyeur crowd","lovers’ triangle","secret admirers","dom and subs","stag and vixen","step-siblings",
  "college roommates","daddy and girls","gay lovers","polyamorous quad","pet & handler","dominant trio"
];

// === PF_TABOO: Taboo, risky, edge-of-filter, scenario or mood ===
const PF_TABOO = [
  "age gap","public risk","teacher/student","sibling rivalry","stepfamily tension","risky photo","blackmail","coercion","cheating","voyeurism",
  "seducing authority","dirty confession","humiliation","anonymous hookup","anonymous tip","unplanned pregnancy","roleplay deception","cross-dressing",
  "secret affair","fetish exposure","forbidden fruit","power play","after-hours party","summer camp crush","confessional sin","dangerous obsession"
];

// === PF_NSFW_BODY_PARTS: For detailed realism in NSFW, swaps, and taboo ===
const PF_NSFW_BODY_PARTS = [
  "inner thigh","nape of neck","small of back","nipple","lower belly","wet slit","bare chest","swollen lips","firm ass","pulsing cock","arched foot",
  "slick folds","hungry mouth","dripping tip","taut stomach","delicate jawline","moist opening","sensitive bud","clenched fist","open palm"
];

// === PF_NSFW_MARKS: Aftermath, realism, traces, fluids/marks ===
const PF_NSFW_MARKS = [
  "fresh bite marks","red handprint","smeared lipstick","tangled hair","nail scratches","love bruise","spilled lube","streaked mascara","sticky residue",
  "faded hickeys","lip gloss on skin","wet trail","stained pillow","damp spot","smudged makeup","slippery fingers","saliva strings","perfume lingering",
  "wrinkled sheets","sweet musk","pearlescent streaks","spit trails","tear-stained cheeks","sweat-slicked skin","bite marks","scratched shoulders","thigh bruises"
];
// === PF_ADJECTIVES: Visual, mood, body, style, meme, NSFW, all-in-one ===
const PF_ADJECTIVES = [
  // Visual/scene/texture
  "smooth","rough","silky","dewy","sparkling","glossy","soft","hard","lush","radiant","ethereal","noir","vivid","muted","chiaroscuro","glistening",
  // Body/physical
  "curvy","plush","petite","muscular","athletic","lithe","angular","feminine","masculine","glistening","tumescent","sultry","teasing","sensual","steamy",
  // Modern/meme/Gen Z
  "rizzed","gyatt","based","lit","fire","savage","clutch","iconic","legendary","extra","boujee","simp","drippy","pookie","tight","slay","zesty",
  // NSFW/erotic/poetic
  "voluptuous","scandalous","provocative","revealing","intimate","naughty","frisky","moist","alluring","busty","risqué","unfiltered","raw","forbidden",
  // Artistic
  "cinematic","dreamy","surreal","hyperrealistic","lofi","analog","distorted","vaporwave","biohacked","uncanny","distressed","shimmering","painterly"
];

// === PF_ADVERBS: How it’s done, mood, meme, power ===
const PF_ADVERBS = [
  "slowly","quickly","gently","roughly","eagerly","hungrily","sensually","lustfully","passionately","tenderly","urgently","boldly","timidly","deliberately",
  "playfully","quietly","softly","intensely","carefully","recklessly","wildly","shamelessly","innocently","fearlessly","fiercely","awkwardly","gracefully",
  "fluidly","rigidly","casually","covertly","seductively","provocatively","obediently","rebelliously","defiantly","smugly","blushingly","wetly","slickly",
  "breathlessly","dreamily","furtively","clumsily","purposefully"
];

// === PF_ACTIONS: Physical acts, NSFW, scene, and meme/film actions ===
const PF_ACTIONS = [
  // General
  "standing","lying down","kneeling","crouching","crawling","sprawled","arched","reaching","stretching","posing","jumping","leaping","twisting",
  "dancing","grinding","clutching","caressing","stroking","slapping","patting","squeezing","hugging","embracing","tickling","tracing","licking",
  "sucking","nibbling","biting","grazing","pressing","smooching","making out","french kissing","blowing a kiss","smacking lips",
  // NSFW
  "intimate touching","exploring","massaging","fondling","stroking softly","gentle teasing","seductive grinding","slow undressing",
  "pulling down","unbuttoning","unzipping","straddling","riding","pinning","dominating","submitting","nuzzling","cuddling","snuggling","groping",
  "caressing thighs","tickling inner thigh","spreading legs","pressing bodies","entwining","kissing neck","biting earlobe","nibbling collarbone",
  "sliding hand","slipping hand under","clutching sheets","arching back","moaning softly","whispering","panting","trembling","shuddering","melting",
  // Film/scene/meme
  "zoom in","slow pan","dolly shot","tracking shot","over-the-shoulder","POV","reaction shot","cutaway","montage","close-up","macro shot","soft fade",
  "cross dissolve","jump cut","freeze frame","split screen","voiceover","establishing shot","dream sequence","timelapse","hyperlapse"
];

// === PF_VERBS: Bonus/expanded, for deep flexibility (film, meme, poetic) ===
const PF_VERBS = [
  "touch","stroke","caress","tease","kiss","lick","suck","bite","nibble","fondle","grope","rub","press","grind","thrust","slide","glide","massage",
  "tickle","pinch","squeeze","pull","tug","twist","flip","roll","slap","spank","scratch","claw","grasp","grab","hold","embrace","hug","snuggle",
  "cuddle","nuzzle","bury","devour","gulp","swallow","moan","whisper","sigh","pant","gasp","cry out","shout","scream","beg","plead","command",
  "order","submit","obey","defy","resist","succumb","yield","dominate","control","possess","own","mark","brand","claim","ravish","love","cherish",
  "worship","adore","idolize","praise","admire","envy","lust","crave","desire","need","want","wish","fantasize","dream","imagine","pretend","fake"
];

// === PF_CONNECTORS: Connect phrases/ideas, flow, filter-dodging ===
const PF_CONNECTORS = [
  "and","or","but","yet","so","nor","for","although","because","since","unless","until","while","whereas","even though","as if","whether","after",
  "before","though","as long as","as soon as","provided that","rather than","not only","but also","either","neither","both","just as","when","whenever"
];

// === PF_SCENE_GLUE: Prepositional/phrase glue for fluid prompts ===
const PF_SCENE_GLUE = [
  "in the", "on the", "by the", "beside the", "under the", "above the", "between the", "across the", "around the", "next to the", "within the", "amid the",
  "among the", "through the", "at the", "near the", "against the", "behind the", "before the", "after the", "inside the", "outside the", "upon the", "beyond the",
  "toward the", "from the", "with the", "without the", "up against the", "sprawled over", "pressed against", "leaning on", "lying atop"
];

// === PF_TIME_PHRASES: Time, flow, narrative markers ===
const PF_TIME_PHRASES = [
  "at midnight", "during golden hour", "right before dawn", "after sunset", "in the dead of night", "at sunrise", "just before curfew",
  "on a rainy night", "after the party", "in the morning", "after school", "before work", "during recess", "at dusk", "late at night", "early morning"
];

// === PF_SEASONS: Season, era, scene temp ===
const PF_SEASONS = [
  "spring","summer","autumn","fall","winter","monsoon","dry season","wet season","rainy season","festival season"
];

// === PF_MOODS: Emotions, states, vibes (no repeats) ===
const PF_MOODS = [
  "happy","sad","angry","curious","playful","bored","excited","nervous","confident","shy","anxious","relaxed","surprised","ecstatic","orgasmic","aroused",
  "teasing","mischievous","serious","intense","tender","loving","affectionate","moody","cheeky","sultry","smitten","flirty","stoned","zoned","savage",
  "chill","crushing","obsessed","vulnerable","broken","blissed out","euphoric","dazed","overjoyed","hypnotic"
];

// === PF_EMOTIONS: Bonus pool for true emotional tone ===
const PF_EMOTIONS = [
  "longing","anticipation","envy","regret","shame","pride","admiration","comfort","remorse","delight","disgust","fear","terror","relief","awe",
  "melancholy","nostalgia","contentment","determination","dread","jealousy","pleasure","gratitude"
];

// === PF_VIBES: For the “it’s giving…” crowd (TikTok, meme, culture) ===
const PF_VIBES = [
  "main character","forbidden","taboo","dangerous","secret","wild","legendary","iconic","banned","OG","toxic","blessed","cursed","viral","slay",
  "frenzied","zoned","vibing","uncanny","dark","angelic","feral","dreamy","aesthetic","nostalgic","edgy","chill","chaotic","zen"
];
// === PF_ARCHETYPES: Characters/archetypes, movie, meme, SFW/NSFW ===
const PF_ARCHETYPES = [
  "bad girl","innocent ingenue","stoic protector","playful tease","domme queen","needy sub","flirty neighbor","naughty nurse","strict teacher",
  "rebel lover","mysterious stranger","jealous ex","trophy partner","forbidden step","caring mentor","wild party animal","shy wallflower",
  "cocky jock","crush next door","charismatic boss","dreamy artist","emo heartthrob","goth queen","nerdy hacker","biker","loner",
  "sorority sister","frat brother","rock star","star athlete","lonely teacher","stepmom","boss","brat","cheerleader","captain",
  "bimbo","himbo","stud","twink","femboy","alt-girl","bad boy","tsundere","yandere","cute dork","seductress","tease"
];

// === PF_CHARACTERS: Universal nouns (girl/guy/etc), film, anime, meme ===
const PF_CHARACTERS = [
  "girl","woman","boy","man","person","lover","partner","friend","stranger","teacher","nurse","doctor","paramedic","firefighter",
  "cop","officer","milf","dilf","cougar","stud","twink","femboy","bimbo","boss","intern","maid","queen","king","prince","princess",
  "slave","domme","sub","pet","kitten","puppy","brat","nymph","vixen","succubus","angel","devil","monster","vampire","werewolf",
  "android","robot","doll","idol","influencer","streamer","gamer","model","pornstar","starlet","escort","mistress","master"
];

// === PF_PERSONALITY: Personality/attitude, fuel for dialogue/scene ===
const PF_PERSONALITY = [
  "shy","bold","confident","submissive","dominant","obedient","rebellious","fiery","icy","warm","cold","soft","rough","hard",
  "tender","gentle","rough","firm","delicate","intense","passionate","loving","caring","nurturing","protective","possessive",
  "jealous","clingy","needy","obsessive","demanding","spoiled","playful","mischievous","troublesome","flirty","sultry",
  "lush","curvy","thick","slender","skinny","petite","tall","short","athletic","toned","chubby","voluptuous","busty"
];

// === PF_OCCUPATIONS: Jobs/roles for story/scene logic, meme/NSFW ===
const PF_OCCUPATIONS = [
  "student","teacher","nurse","paramedic","doctor","firefighter","cop","officer","stripper","pornstar","actor","director",
  "influencer","gamer","model","maid","intern","CEO","bartender","DJ","dancer","camgirl","spy","assassin","artist","musician",
  "mechanic","tattoo artist","cosplayer","waiter","barista","bouncer","lifeguard","trainer","bodybuilder"
];

// === PF_ROLES: Scene/costume/story roles, meme, anime, SFW/NSFW ===
const PF_ROLES = [
  "dominant","submissive","brat","tease","master","mistress","pet","handler","mentor","apprentice","leader","follower",
  "captain","cheerleader","brat tamer","protector","rebel","queen","king","starlet","vixen","wildcard","sidekick","villain",
  "antihero","main character","rival","backup","trophy","obsession","damsel","savior"
];

// === PF_PROPS: Scene, art, NSFW, story, realism ===
const PF_PROPS = [
  "ice cube","fur coat","playing cards","striped tie","vintage camera","biker helmet","shot glass","silk scarf","ankle bracelet",
  "lipstick tube","mirror compact","hand fan","glass ashtray","barstool","cigarette case","pearl necklace","garter belt","shower loofah",
  "blindfold","perfume bottle","champagne flute","hotel keycard","broken mirror","handcuffs","crumpled letter","bloody towel",
  "stripper pole","neon sign","ashtray","makeup bag","feather boa","silk rope","pill bottle","vinyl record","security camera",
  "love note","bed restraints","mask","glitter","condom wrapper"
];

// === PF_COSTUMES: Outfits/costume-play, cosplay, fantasy, alt, meme ===
const PF_COSTUMES = [
  "lingerie","lace bra","silk panties","garter belt","fishnet","stockings","sheer bodysuit","leather corset","bikini","microbikini",
  "sports bra","pantyhose","suspender belt","g-string","thong","boyshorts","bralette","lace teddy","nightgown","babydoll","chemise",
  "kimono robe","oversized shirt","button-up","open blouse","crop top","braless","off-shoulder","deep V-neck","sideboob","underboob",
  "wet t-shirt","tied tank","tie-front","satin slip","mini skirt","pleated skirt","high-waist shorts","daisy dukes","cutoffs","booty shorts",
  "spandex","yoga pants","bodycon dress","slip dress","evening gown","gala dress","gothic dress","corset dress","fairy dress","cosplay costume",
  "anime outfit","bunny suit","maid costume","catgirl ears","fox tail","elf costume","witch hat","sailor suit","schoolgirl uniform","nurse outfit",
  "latex suit","fetish harness","bondage gear","leather gloves","opera gloves","fishnet gloves","lace mask","face veil","choker","ribbon choker",
  "chain necklace","anklet","toe ring","belly chain","arm cuffs","wrist cuffs","ankle cuffs","bare feet","heels","platforms","combat boots",
  "knee-high boots","mary janes","flip-flops","fuzzy slippers","ballet flats","skate shoes","stilettos","clogs","rain boots","slippers",
  "Uggs","Crocs","socks","over-the-knee socks","striped socks","toe socks","fuzzy socks","mismatched socks","band tee","graphic tee","tank top",
  "hoodie","zip hoodie","cropped hoodie","bomber jacket","puffer jacket","raincoat","poncho","cape","painted-on","body paint","digital outfit",
  "glitched clothing","ripped jeans","distressed denim","mesh top","harness bra","pasties","nipple covers","censored bar","safe-for-work disguise"
];

// === PF_CLOTHING: Additional clothes, footwear, meme, SFW/NSFW ===
const PF_CLOTHING = [
  "t-shirt","tank top","sweater","hoodie","jeans","shorts","skirt","dress","sundress","blouse","polo","jacket","leggings","sweatpants","pajamas",
  "overalls","vest","scarf","hat","cap","beanie","gloves","bra","panties","boxers","briefs","thong","g-string","bikini","swimsuit","one-piece","corset",
  "bustier","bodysuit","garter","stockings","fishnets","lace panties","boyshorts","sports bra","bralette","pasties"
];

// === PF_ACCESSORIES: Fashion/scene detail, meme/alt/cosplay/NSFW ===
const PF_ACCESSORIES = [
  "choker necklace","silver hoop earrings","lace gloves","aviator sunglasses","spiked collar","anklet","body chain","velvet ribbon","knee pads",
  "fingerless gloves","toe ring","bandana","bolo tie","cat ears","corset laces","leather cuffs","nipple clamps","tiara","zipper mask","spiked wristband"
];

// === PF_FACIAL_DETAILS: For [DETAIL]—face realism, mood, film, art ===
const PF_FACIAL_DETAILS = [
  "smudged mascara","flushed cheeks","quivering lip","arced eyebrow","beaded sweat","teeth showing","freckled nose","swollen lips","tear tracks",
  "crooked grin","smeared blush","fluttering lashes","wrinkled brow","furrowed forehead","dimples","sunken eyes","cracked smile","glistening eyes",
  "downturned mouth","sharp jawline"
];

// === PF_EYE_DETAILS: Eyes/gaze, meme, anime, mood ===
const PF_EYE_DETAILS = [
  "wide-eyed","narrowed gaze","smoky eyes","cat eyes","doe eyes","puppy eyes","bedroom eyes","half-lidded","twinkling eyes","piercing stare",
  "sparkling eyes","teary-eyed","glassy-eyed","glowing eyes","mischievous glint","deadpan stare","googly eyes","laser focus","anime eyes",
  "retro anime glare","fluttering eyelashes","dilated pupils","rolling eyes"
];

// === PF_HAIR_DETAILS: Hair, meme, style, color, era ===
const PF_HAIR_DETAILS = [
  "long hair","short hair","messy bun","pigtails","ponytail","braids","dreadlocks","bald","buzzcut","shaved sides","undercut","frosted tips",
  "spiked hair","bedhead","curly hair","wavy hair","straight hair","bleached hair","dyed pink","neon streaks","rainbow hair","buns","side part",
  "center part","mullet","perm","pageboy","retro curls","vintage waves","wet look"
];

// === PF_VOICES: Voice/sound for narrative or prompt detail ===
const PF_VOICES = [
  "soft whisper","raspy","gravelly","smooth","silky","husky","deep","high-pitched","melodic","sing-song","robotic","glitched","cracking","breathy",
  "soothing","commanding","sultry","playful","shaky","trembling"
];

// === PF_TATTOOS: Art, meme, body, alt ===
const PF_TATTOOS = [
  "dragon tattoo","butterfly tattoo","barcode tattoo","sleeve tattoo","tribal tattoo","rose tattoo","heart tattoo","skull tattoo","text tattoo",
  "anchor tattoo","infinity symbol","wrist tattoo","ankle tattoo","neck tattoo","shoulder tattoo","star tattoo","eye tattoo","wing tattoo",
  "barcode on neck","hidden tattoo","temporary tattoo"
];

// === PF_PIERCINGS: Face/body/alt/fantasy/meme ===
const PF_PIERCINGS = [
  "earring","hoop","stud","nose ring","septum","lip ring","eyebrow bar","tongue stud","belly ring","nipple ring","navel bar","dermal anchor",
  "snakebite","angel bites","bridge piercing","smiley piercing","labret","cheek piercing","surface bar"
];
const PF_LOOKALIKE_VIBES = [
  // Real names purposely *never* used! Only the “vibe” or “energy” of celebs/characters:
  "looks like a certain pop icon from the 2000s",
  "vibe of a famous wizard boy with glasses",
  "reminiscent of a Baywatch lifeguard",
  "vibe of a 90s action star with an Austrian accent",
  "attitude of a classic Bond villain",
  "anime energy of a pink-haired magical girl",
  "exudes pop punk princess vibes",
  "90s sitcom heartthrob look",
  "mysterious like a masked superhero vigilante",
  "energy of a legendary rap mogul",
  "allure of an old Hollywood starlet",
  "awkward charm of a beloved sitcom nerd",
  "sparkle like a teen vampire movie lead",
  "edge like a cyberpunk rebel from anime",
  "cunning as a famous British detective",
  "macho mustache energy from 80s TV",
  "witchy like a cult-fave fantasy queen",
  "classic noir femme fatale aura",
  "gothic elegance of a Wednesday-ish misfit",
  "sings like a pop idol with wild outfits",
  "grace of a ballet-dancer princess from cartoons"
  // ...expand as needed!
];

// *Usage: Insert “inspired by [LOOKALIKE_VIBE]” or “with a [LOOKALIKE_VIBE]” in output.*
// Example: “a wild party animal, inspired by a certain pop icon from the 2000s”
const PF_MASHUP_VIBES = [
  "mix of 80s rockstar and TikTok influencer",
  "half brooding antihero, half bubbly romcom lead",
  "like a Disney villain but in a punk band",
  "sports jock with a hacker’s brain",
  "anime magical girl and horror movie scream queen",
  "sci-fi android with fairy tale innocence"
  // ...keep adding
];
const PF_FAKE_BRANDS = [
  "Dragonice cologne",
  "SassyPop makeup",
  "Phantom energy drink",
  "RiffRaff sneakers",
  "NeonChill vape pen",
  "SunCrash sunglasses",
  "Wanderlust jeans"
  // ...invent, meme, etc.
];
const PF_FAKE_MOVIES = [
  "The Neon Samurai",
  "Gothic Heat",
  "Cyber Midnight",
  "Reckless Lovers",
  "Paranormal Roommates",
  "Wild Hearts at Dusk",
  "Midnight Dive Bar"
  // ...get creative!
];
// === PF_EMOTIONS: Internal feeling, all flavors ===
const PF_EMOTIONS = [
  "anxious","defiant","yearning","content","overwhelmed","impulsive","melancholic","provocative","cautious","hesitant","starved for touch",
  "dazed","apathetic","thrilled","lonely","satisfied","torn","daring","paranoid","euphoric","flirty","lustful","awkward","enraged","bubbly",
  "giddy","hopeful","hopeless","depressed","heartbroken","elated","shocked","surprised","calm","relaxed","hyped","wired","zoned out","unhinged"
];

// === PF_MOODS: Scene/overall mood/atmosphere (expand anytime) ===
const PF_MOODS = [
  "romantic","sensual","playful","naughty","mischievous","innocent","teasing","flirtatious","bashful","shy","bold","confident","dominant","submissive",
  "tender","caring","protective","adoring","loving","passionate","wild","fiery","intense","moody","brooding","wistful","dreamy","longing","lustful",
  "desperate","craving","obsessed","hypnotic","entranced","zoned out","dazed","lost in the moment","daring","reckless","forbidden","taboo","dangerous",
  "mysterious","enigmatic","secretive","coy","cheeky","sultry","smoldering","vulnerable","blushing","giggly","excited","freaky","frenzied","exhausted",
  "satisfied","melancholic","triumphant","content"
];

// === PF_VIBES: Quick “vibe check” meme, old/new, scene flavor ===
const PF_VIBES = [
  "main character energy","sidekick vibes","NPC mode","goblin mode","sigma energy","rizzed up","bussin","yass queen","vibe check","no cap","savage",
  "deadass","blessed","snatched","iconic","legend","cringe","edgy","based","sus","gyat","cheugy","periodt","slay","pilled","main character","sigma","beta"
];

// === PF_SENSATIONS: Physical feeling, NSFW, mood, scene, art ===
const PF_SENSATIONS = [
  "tingling skin","goosebumps","fiery warmth","icy chill","shivery touch","electric jolt","aching muscles","fluttering heart","throbbing pulse",
  "prickling sweat","quaking knees","heavy breath","lightheaded rush","slow burn","tight grip","slick warmth","soft caress","buzzing fingers",
  "burning blush","humming tension","sinking relaxation"
];

// === PF_TOUCHES: Ways to touch, meme, NSFW, SFW ===
const PF_TOUCHES = [
  "gentle stroke","rough squeeze","tracing lines","tickling skin","featherlight tap","lingering hold","crushing hug","clutching grip","soft pat",
  "firm slap","warm embrace","nervous poke","shivery caress","kneading massage","grazing fingertips","brushing lips","cupping face","twirling hair"
];

// === PF_SOUNDS: For audio, music, mood, NSFW, film ===
const PF_SOUNDS = [
  "soft moan","loud gasp","quiet whisper","muffled laugh","heavy breathing","echoing shout","clicking heels","rustling sheets","creaking bed",
  "squelching","dripping water","buzzing phone","thumping bass","clinking glass","buzz of neon","distant thunder","crackling fire","whispered secret"
];

// === PF_TASTES: Tongue, lips, NSFW, kitchen, scene, mood ===
const PF_TASTES = [
  "sweet","salty","bitter","sour","umami","fiery spice","cool mint","smoky flavor","metallic tang","cherry lip gloss","dark chocolate","spicy cinnamon",
  "burnt sugar","juicy peach","iced coffee","vanilla cream","tequila shot","honey drip","biting citrus"
];

// === PF_SMELLS: Scent, scene, erotic, poetic, real ===
const PF_SMELLS = [
  "fresh linen","spilled whiskey","musky cologne","cheap perfume","rain on concrete","cigarette smoke","burnt toast","sweet sweat","leather straps",
  "chlorine","hotel shampoo","incense","coffee beans","vanilla candle","rose petals","sunblock","ocean breeze","mint gum","marijuana","baby powder"
];

// === PF_COLORS: Visual/lighting/mood — wild, meme, all genres ===
const PF_COLORS = [
  "neon pink","blood red","deep violet","ghostly white","midnight blue","ash gray","emerald green","golden amber","smoky black","peach blush",
  "burnt orange","icy teal","rose gold","bruised plum","electric yellow","cloudy silver","hazel","lavender haze","graphite","crimson"
];

// === PF_LIGHTING: Mood, scene, NSFW, photography, meme ===
const PF_LIGHTING = [
  "strobe-lit","moonlit","neon-washed","candle-glow","harsh fluorescent","dim backlight","blinding daylight","twilight haze","spotlit","flickering bulb",
  "halogen wash","golden hour","firelight","tv glow","police lights","pale dawn","sunset gradient","shadow-dappled","streetlamp-lit","UV blacklight"
];

// === PF_LIGHTING_COLOR: For [LIGHT]/[COLOR] combos, film, meme ===
const PF_LIGHTING_COLOR = [
  "cool blue","sultry red","amber gold","ice white","warm orange","green glow","midnight purple","frosted silver","sunset pink","dirty yellow",
  "foggy grey","rich copper","seafoam green","neon violet","hazy gold","smoky teal","milky rose","moonlit silver","bone white","dusky brown"
];

// === PF_PHOTO_STYLES: Cinematic, art, meme, AI/NSFW ===
const PF_PHOTO_STYLES = [
  "hyperrealistic","soft-focus","dreamcore","noir","polaroid","vintage film","split-tone","bokeh heavy","high-contrast","analog grain",
  "glitch art","overexposed","muted tones","warm filter","cold filter","film grain","digital HDR","washed out","Instagram style"
];

// === PF_CAMERA_TRICKS: Meme, film, AI, realism, wild shots ===
const PF_CAMERA_TRICKS = [
  "zoom-in","macro shot","wide angle","tilt-shift","dutch angle","rack focus","double exposure","mirrored","split screen","handheld cam",
  "selfie stick","overhead drone","mirror reflection","bokeh burst","lens flare","chromatic aberration","depth blur","fisheye","reverse angle"
];

// === PF_GENRES: Movie, anime, art, meme, SFW/NSFW ===
const PF_GENRES = [
  "action","adventure","drama","romance","comedy","dark comedy","slapstick","parody","thriller","horror","slasher","psychological horror",
  "erotic thriller","suspense","noir","neo-noir","crime","mystery","detective","sci-fi","cyberpunk","space opera","fantasy","high fantasy",
  "urban fantasy","fairy tale","mythic","supernatural","paranormal","found footage","mockumentary","documentary","biopic","period drama",
  "historical epic","war","post-apocalyptic","dystopian","teen drama","coming of age","musical","animation","anime","slice of life",
  "school life","sports","heist","caper","buddy cop","road movie","chick flick","bromance","tragedy","family drama","adult film","softcore",
  "hardcore","fetish","taboo","cult classic","grindhouse","midnight movie","arthouse","indie","experimental","surreal"
];

// === PF_TIME_PHRASES: When/era/season/period cues, meme/film ===
const PF_TIME_PHRASES = [
  "midnight","dawn","high noon","twilight","witching hour","after hours","sunset","sunrise","rush hour","rainy season","monsoon",
  "dry spell","Indian summer","heat wave","cold snap","deep winter","equinox","full moon","blood moon","retro era","Y2K","the future",
  "Victorian times","80s club scene","90s rave","disco era","steam age","space age"
];

// === PF_ERAS: Historical/future, meme, all genres ===
const PF_ERAS = [
  "prehistoric","ancient Rome","medieval","Renaissance","Victorian","Roaring Twenties","WWII","post-war","atomic age","psychedelic 60s",
  "disco 70s","punk 80s","grunge 90s","Y2K","cyber-future","post-apocalypse","far future","timeless"
];

// === PF_SEASONS: Year, mood, scene logic ===
const PF_SEASONS = [
  "spring","summer","autumn","fall","winter","monsoon","dry season","holiday","Halloween","New Year"
];

// === PF_LOCATIONS: Big-picture places, meme, alt, SFW/NSFW ===
const PF_LOCATIONS = [
  "rooftop","beach","locker room","hotel suite","motel room","dive bar","subway station","dungeon","rainy alley","bathroom stall",
  "VIP lounge","garage","forest","moonlit garden","rooftop pool","penthouse balcony","nightclub","strip club","mountain cabin","tattoo shop",
  "old library","castle","hidden cave","VIP box","after hours office","spa sauna","movie theater","dreamscape"
];

// === PF_SETTINGS: Micro-locations, settings, meme, detail ===
const PF_SETTINGS = [
  "luxury bedroom","cheap motel","sunlit kitchen","messy living room","rainy window","back alley","secluded forest","deserted beach","mountain cabin",
  "lake dock","hot tub","poolside","campfire","rooftop","balcony","garage","workshop","abandoned warehouse","retro arcade","tattoo parlor",
  "underground club","speakeasy","strip club","spooky attic","basement","art studio","photography darkroom","mirror maze","crystal cave"
];

// === PF_ENVIRONMENT_DETAILS: Extra flavor, meme, realism, cinematic ===
const PF_ENVIRONMENT_DETAILS = [
  "rain streaks on glass","scattered rose petals","flickering TV light","bed sheets tangled","fog creeping under door","broken mirror shards",
  "city skyline out window","laundry on floor","music thumping next room","hushed city street","distant thunder","sunbeam across bed",
  "dripping faucet","candle wax drips","open closet door","condensation on mirror","party confetti","muffled footsteps","neon reflection"
];

// === PF_SCENE_GLUE: Filler, glue, scene smoothers ===
const PF_SCENE_GLUE = [
  "as the music pulses","in a haze of neon","shrouded in fog","as tension crackles","as hearts race","with the city below","just out of sight",
  "as dawn breaks","in the dead of night","as laughter echoes","as the beat drops","lost in the crowd","amid hushed whispers","as shadows lengthen",
  "with storm rolling in","with every breath","in the silence after"
];
// === PF_ACTIONS: Every verb, act, pose, meme (SFW/NSFW, old/new) ===
const PF_ACTIONS = [
  "standing","lying down","kneeling","crouching","crawling","sprawled","arched","reaching","stretching","posing","jumping","leaping",
  "twisting","bending","squatting","balancing","dancing","twerking","grinding","tipping","flipping","rolling","sliding","waving",
  "snapping fingers","biting nails","pulling hair","tossing hair","zipping","unzipping","clutching","grabbing","caressing","stroking",
  "slapping","patting","squeezing","hugging","embracing","tickling","tracing","licking","sucking","nibbling","biting","grazing","pressing",
  "smooching","kissing","making out","french kissing","blowing a kiss","smacking lips","intimate touching","exploring","massaging",
  "fondling","gentle teasing","naughty teasing","seductive grinding","slow undressing","pulling down","unbuttoning","straddling","riding",
  "pinning","dominating","submitting","nuzzling","cuddling","snuggling","groping","caressing thighs","tickling inner thigh","spreading legs",
  "pressing bodies","entwining","kissing neck","biting earlobe","nibbling collarbone","licking lips","tracing lines","sliding hand",
  "slipping hand under","clutching sheets","arching back","moaning softly","whispering","gasps","panting","trembling","shuddering","shivering",
  "melting","quivering","pleading","commanding","pleasuring","inviting","beckoning","flashing","posing nude","posing topless","bare-skinned",
  "lingerie posing","shameless display","suggestive position","provocative arch","exposed silhouette","backlit undressing","shadow play",
  // Cinematic/scene (for video, movie, screenwriting)
  "zoom in","slow pan","dolly shot","tracking shot","over-the-shoulder","POV","reverse angle","reaction shot","cutaway","montage",
  "close-up","macro shot","wide shot","soft fade","cross dissolve","jump cut","smash cut","fade to black","freeze frame","split screen",
  "voiceover","intertitle","establishing shot","dream sequence","night vision","infrared","thermal cam","security cam","handheld cam",
  "timelapse","hyperlapse","slow-motion","fast-forward","looping","split-screen",
  // Meme & internet verbs (for fun, Gen-Z, TikTok, etc)
  "yeeting","vibing","rizzing up","finessing","flexing","slaying","yassifying","glitching","pogging","dab","t-pose","swooning","simping",
  "sussin","getting based","bussin","bruh-ing","chilling","ghosting","gaslighting","vaporizing","going goblin mode","NPCing","dancing like a TikToker",
  "doing a meme face","doing a devious lick","moonwalking","beatboxing","spitting bars","roasting","clapping back","serving","dragging","canceling",
  "ratio-ing","stanning","gigachadding"
];

// === PF_RARE_VERBS: Extra action/verb weirdness (spice, never boring) ===
const PF_RARE_VERBS = [
  "splay","burrow","pulse","tremble","quiver","explode","throb","mash","snarl","melt","slick up","gush","soak","spasm","snap hips",
  "clench thighs","spread wider","grip tight","collapse"
];

// === PF_ADVERBS: How they do it (for every action, mood, or meme) ===
const PF_ADVERBS = [
  "slowly","quickly","gently","roughly","eagerly","hungrily","sensually","lustfully","passionately","tenderly","urgently","boldly","timidly",
  "subtly","openly","secretly","deliberately","playfully","mischievously","quietly","loudly","softly","intensely","carefully","recklessly",
  "wildly","sweetly","shamelessly","naughtily","innocently","fearlessly","fiercely","desperately","awkwardly","gracefully","fluidly",
  "rigidly","casually","covertly","brazenly","seductively","coquettishly","provocatively","insistently","obediently","rebelliously",
  "defiantly","compliantly","blushingly","wetly","slickly","visibly","viscerally","palpably","tensely","teasingly","expectantly","anxiously",
  "hesitantly","firmly","demandingly","commandingly","smugly","submissively","dominantly","masterfully","helplessly","shakily","feverishly",
  "breathlessly","gasplingly","noisily","silently","voraciously","rapaciously","thirstily","greedily","devotedly","aggressively","stubbornly",
  "reluctantly","relentlessly","unapologetically","gratefully","gleefully","ecstatically","rapturously","dreamily","absently","furtively",
  "clumsily","sedately","purposefully"
];

// === PF_POSES: Body, scene, NSFW, fashion, film, art (short/long) ===
const PF_POSES = [
  "standing tall","sprawled out","arched back","on all fours","side-lying","reclining on couch","perched on counter","straddling chair","sitting cross-legged",
  "balancing on one foot","leaning against wall","hunched over","back arched","chin up","shoulder slouched","cheek on hand","hand on hip",
  "biting finger","head tossed back","knees bent","legs spread","cross-legged","arms crossed","arms behind back","wrists bound","one leg raised",
  "draped over lap","clinging to pillow","bent over","curled up","hands in hair","wrapped in sheet"
];

// === PF_REACTIONS: In-the-moment, spontaneous, punchy ===
const PF_REACTIONS = [
  "gasping","shivering","trembling","quaking","blushing","panting","sighing","moaning","crying out","begging","pleading","laughing","smiling",
  "smirking","winking","biting lip","nervous giggle","squealing","squirming","arching","grinding","wiggling","shuddering","sobbing","biting nails",
  "rolling eyes","pouting","frowning","snorting","gritting teeth","snapping fingers","snarling","yawning","sniffing","licking lips"
];

// === PF_BODY_DETAILS: For extra anatomical flavor, NSFW, art, meme ===
const PF_BODY_DETAILS = [
  "smudged mascara","flushed cheeks","quivering lip","arced eyebrow","beaded sweat","teeth showing","freckled nose","swollen lips","tear tracks",
  "crooked grin","smeared blush","fluttering lashes","wrinkled brow","furrowed forehead","dimples","sunken eyes","cracked smile","glistening eyes",
  "downturned mouth","sharp jawline"
];

// === PF_NSFW_ACTIONS: Dirty, bold, wild—filtered for AI, meme, and clean swaps ===
const PF_NSFW_ACTIONS = [
  "caress","trace","cup","grip","graze","massage","stroke","ogle","admire","fondle","tease","nuzzle","kiss","embrace","clutch","cradle","spoon",
  "press","nestle","entwine","straddle","mount","sway","gyrate","grind","thrust","arch","shimmy","rock","wiggle","spasm","pulse","tingle",
  "quiver","tremble","shudder","lick","suck","swallow","blow","taste","moan","pant","sigh","gasp","cry out","beg","plead","submit","obey",
  "dominate","ravish","worship","devour","crave","desire","fantasize","strip","undress","expose","display","bare","show","unveil","unmask",
  "unwrap","unclothe","demonstrate","fuse","merge","sync"
];

// === PF_NSFW_BODY_PARTS: Detail, realism, meme, alt, NSFW-safe ===
const PF_NSFW_BODY_PARTS = [
  "inner thigh","nape of neck","small of back","nipple","lower belly","wet slit","bare chest","swollen lips","firm ass","pulsing shaft",
  "arched foot","slick folds","hungry mouth","dripping tip","taut stomach","delicate jawline","moist opening","sensitive bud","clenched fist",
  "open palm"
];

// === PF_PROPS: Real-world objects, SFW/NSFW, realism, story ===
const PF_PROPS = [
  "ice cube","fur coat","playing cards","striped tie","vintage camera","biker helmet","shot glass","silk scarf","ankle bracelet","lipstick tube",
  "mirror compact","hand fan","glass ashtray","barstool","cigarette case","pearl necklace","garter belt","shower loofah","blindfold","perfume bottle"
];

// === PF_COSTUMES: Outfits, cosplay, kink, art, meme ===
const PF_COSTUMES = [
  "choker necklace","silver hoop earrings","lace gloves","aviator sunglasses","spiked collar","anklet","body chain","velvet ribbon","knee pads",
  "fingerless gloves","toe ring","bandana","bolo tie","cat ears","corset laces","leather cuffs","nipple clamps","tiara","zipper mask","spiked wristband"
];

// === PF_FACIAL_DETAILS: Face, meme, art, NSFW, realism ===
const PF_FACIAL_DETAILS = [
  "biting her lip","wide-eyed","half smile","glare","pleading eyes","sultry stare","arched brow","mock surprise","smirk","shy glance","rolling her eyes",
  "nervous laugh","teasing grin","furrowed brow","moaning softly","gasping","breathless gasp","sticking out tongue","innocent blink","satisfied grin"
];

// === PF_GROUP_TYPES: Scene, pairing, group (kink, meme, all genres) ===
const PF_GROUP_TYPES = [
  "lesbian trio","throuple","bachelor party","two girls and a guy","group of strangers","best friends group","foursome","couple with guest","swingers",
  "open polycule","orgy scene","voyeur crowd","lovers’ triangle","enemies to lovers","secret admirers","dom and subs","stag and vixen","step-siblings",
  "college roommates","daddy and girls"
];

// === PF_COUPLE_TYPES: Pairings, romance, kink, meme, film ===
const PF_COUPLE_TYPES = [
  "lesbian couple","gay couple","hetero couple","older/younger","power couple","boss and assistant","teacher/student","nurse/patient","secret lovers",
  "ex-lovers","friends with benefits","office romance","dominant/submissive","opposites attract"
];

// === PF_RELATIONSHIPS: Scene flavor, story, meme ===
const PF_RELATIONSHIPS = [
  "secret affair","friends with benefits","office romance","forbidden lovers","star-crossed","lifelong rivals","old flame","spouses","estranged partners",
  "co-workers","frenemies","casual hookup","roommates","teammates","study partners"
];

// === PF_DIALOGUE: Punchy lines, dirty talk, memes, story, NSFW ===
const PF_DIALOGUE = [
  "Don’t stop.","You know you want this.","Make me beg.","Not here—someone might see.","Do you trust me?","Shut up and kiss me.","Say my name.","Harder.",
  "I shouldn’t want this.","Take it off.","Bite me.","Keep your eyes on me.","No one can hear us.","I dare you.","Is this what you want?","You’re shaking.",
  "Tell me you need it.","You like it rough?","Pull my hair.","Don’t you dare stop."
];

// === PF_SCENARIOS: Story/concept, kink, roleplay, meme ===
const PF_SCENARIOS = [
  "caught in the act","office after hours","strangers at a club","forbidden classroom","hotel rendezvous","backseat encounter","accidental voyeur",
  "tied and waiting","secret affair","undercover cop","bachelorette party","initiation ritual","midnight dare","shower surprise","double life revealed",
  "seduction game","role reversal","lost bet","neighbor’s window","under the table"
];

// === PF_KINKS: For [KINK], every major kink/scene ===
const PF_KINKS = [
  "bondage","domination","exhibitionism","impact play","voyeurism","power exchange","role reversal","restraint","praise kink","shame play","choking",
  "temperature play","brat taming","edging","sensory deprivation","spanking","wax play","collaring","overstimulation","public play"
];

// === PF_FETISHES: For [FETISH], every major fetish, meme/safe ===
const PF_FETISHES = [
  "feet","lingerie","heels","latex","wetlook","pantyhose","gloves","nylon","corset","spit","masochism","leather","uniform","crossdressing","sweat",
  "piercing","hair pulling","handcuffs","socks","spectacles"
];

// === PF_NSFW_FLUIDS_MARKS: Aftermath, traces, meme, realism, NSFW-safe ===
const PF_NSFW_FLUIDS_MARKS = [
  "fresh bite marks","red handprint","smeared lipstick","tangled hair","nail scratches","love bruise","spilled lube","streaked mascara","sticky residue",
  "faded hickeys","lip gloss on skin","wet trail","stained pillow","damp spot","smudged makeup","slippery fingers","saliva strings","perfume lingering",
  "wrinkled sheets","sweet musk"
];

// === PF_MEME_REPLACEMENTS: AI-dodging, safe/alt swaps for banned words ===
const PF_MEME_REPLACEMENTS = {
  "cunt":["velvet bud","delicate flower","hidden grove"],
  "pussy":["kitten","lotus","sweet spot","garden"],
  "cock":["shaft","pillar","core"],
  "dick":["member","rod","wand"],
  "tits":["pillows","peaks","mounds"],
  "boobs":["bust","chest","cleavage"],
  "ass":["hips","rear","backside"],
  "cum":["essence","nectar","honey"],
  "fuck":["embrace","blend","merge","sync"],
  "bitch":["queen","dynamo","boss"],
  "slut":["wild one","free spirit"],
  "whore":["starlet","vixen"],
  "anal":["back entrance","forbidden zone"],
  "masturbate":["self-care","intimate session"],
  "porn":["forbidden art","spicy gallery"]
};
// === PF_ADJECTIVES: SFW, NSFW, meme, poetic, old/new, everything ===
const PF_ADJECTIVES = [
  "beautiful","gorgeous","pretty","handsome","cute","hot","sexy","sensual","erotic","dirty","raunchy","filthy","kinky","nasty","slutty","seductive",
  "teasing","playful","innocent","corrupted","pure","wicked","dangerous","shy","timid","bold","confident","submissive","dominant","obedient",
  "rebellious","fiery","icy","warm","cold","soft","rough","hard","tender","gentle","firm","delicate","intense","passionate","loving","caring",
  "nurturing","protective","possessive","jealous","clingy","needy","obsessive","demanding","spoiled","pampered","mischievous","troublesome",
  "flirty","sultry","lush","curvy","thick","slender","skinny","petite","tall","short","long-legged","athletic","toned","muscled","lean","plump",
  "chubby","voluptuous","busty","flat-chested","perky","round","jiggly","bouncy","jiggling","glossy","shiny","sweaty","dripping","wet","soaked",
  "greasy","oily","slick","smooth","velvety","fuzzy","hairy","shaven","bare","nude","naked","topless","bottomless","pantyless","braless","pantied",
  "stockinged","booted","heeled","laced","corseted","strapped","collared","leashed","bound","tied","gagged","blindfolded","restrained","spanked",
  "marked","branded","tattooed","pierced","adorned","decorated","painted","glittery","sparkly","shimmering","glowing","radiant","ethereal",
  "angelic","demonic","hellish","heavenly","mystical","magical","enchanted","cursed","blessed","holy","profane","sacred","forbidden","taboo",
  // Modern/Gen Z
  "rizzed","drippy","bussin","lit","slay","sus","sussy","based","goblin mode","sigma","alpha","main character","no cap","savage","gas","flex","iconic",
  "banger","pog","dank","cursed","boomer","zoomer","NPC","copium","simp","gigachad","stan","bruh","yeet"
];

// === PF_MEMES: Meme phrases and punchy AI-bait ===
const PF_MEMES = [
  "slay","no cap","bet","yeet","rizz up","drip check","sussy","poggers","epic win","L","W","ratio","gigachad","NPC moment","main character vibes",
  "Sigma grindset","alpha energy","based","cringe","mid","it’s giving","bussin","yass queen","deadass","on God","he ate","she ate","they ate",
  "he’s him","she’s her","valid","goated","sheesh","let him cook","sending it","touch grass","get help","malding","cope","dilate","dragged",
  "cancelled","NPC energy","canon event","side quest","plot armor","is this loss","vibe check","smol","chonky","uwu","nyaa","rawr","oof",
  "bruh moment","big mood","small mood","crying in the club","vibe shift","hard launch","soft launch","spilling the tea","periodt","simp",
  "stan","karen moment","Karen alert","zoomies","vibing","gatekeep","girlboss","gaslight","malewife","wife guy","himbo","bimbo","femboy",
  "it’s a bop","not a vibe","snatched","serving looks","flex","hella","fr","iykyk"
];

// === PF_SLANG: General, SFW, NSFW, meme, modern/retro ===
const PF_SLANG = [
  "lit","fire","woke","savage","sus","cringe","based","bussin","drip","cap","no cap","salty","yeet","flex","lowkey","highkey","squad","fam",
  "shade","stan","simp","thirsty","ghost","AF","IRL","slay","goat","slaps","main character","vibe","vibing","chill","swole","beef","ship",
  "OTP","go off","periodt","spill the tea","tea","fomo","glow up","extra","basic","snatched","mood","deadass","bet","fire","fit","iconic",
  "clap back","stan","ghosting","shade","glow up","receipts","tbh","fr","oop","shook","snatched","boomer","Karen","Chad","NPC","rizz",
  "mid","gyat","cheugy","tbh","irl","wyd","ngl","finna","sus","vibe check","say less","it’s giving","ok boomer","smh","lol","lmao","rofl","xd",
  "pwned","rekt","pog","ez","gg","noob","pro","afk","brb","btw","idk","idc","fml","wtf","bff","jk","jk jk","imo","irl","yolo","tfw","ftw","meme",
  "dank","cracked","sweaty","meta"
];

// === PF_CONNECTORS: For gluing prompt parts ===
const PF_CONNECTORS = [
  "and","or","but","while","as","yet","so","with","without","as if","just as","after","before","during","since","until","when","whenever",
  "though","even though","because","unless","not only","but also","rather than","instead of","beside","alongside","in addition to",
  "meanwhile","in the background","foregrounded by","framed by","under","over","beside","between","within","across","along"
];

// === PF_TIME_PHRASES: Era, time, scene flow ===
const PF_TIME_PHRASES = [
  "at dawn","sunrise","early morning","late morning","midday","afternoon","sunset","dusk","evening","midnight","after hours",
  "during golden hour","just before dawn","in the dead of night","high noon","during a storm","in the rain","under the stars",
  "on a full moon","in the neon glow","after the party","before anyone wakes up"
];

// === PF_ERAS: Historical, meme, time periods ===
const PF_ERAS = [
  "prehistoric","ancient","medieval","renaissance","baroque","victorian","edwardian","roaring twenties","wartime","atomic age",
  "groovy sixties","psychedelic seventies","disco era","eighties","grunge nineties","y2k","early 2000s","Gen Z","dystopian future",
  "cyberpunk era","post-apocalyptic"
];

// === PF_ART_STYLES: All painting/photo/AI art styles ===
const PF_ART_STYLES = [
  "photorealistic","hyperrealistic","ultra-detailed","anime","manga","cartoon","3D render","digital painting","oil painting","acrylic",
  "gouache","watercolor","charcoal","pencil sketch","ink drawing","marker","pixel art","vector art","low-poly","isometric","vaporwave",
  "synthwave","retrowave","cyberpunk","steampunk","solarpunk","cottagecore","gothic","dark fantasy","high fantasy","grimdark","noir",
  "film noir","vintage","retro","futuristic","surreal","abstract","impressionist","expressionist","minimalist","maximalist","modernist",
  "postmodern","avant-garde","art nouveau","art deco","baroque","rococo","renaissance","pop art","graffiti","street art","urban",
  "glitch art","datamosh","chromatic","holographic","mixed media","collage","doodle","scribble","instagram filter","snapchat style",
  "polaroid","tiktok effect","deep dream","GAN art","neural style","AI hallucination","photo montage","double exposure","meme art",
  "shitpost aesthetic","webcore","dreamcore","weirdcore","emo","scene kid","mall goth","e-girl","e-boy","femboy","bimbo","himbo",
  "cursed","blursed","midjourney style","stable diffusion","openart","open sorceress"
];

// === PF_GENRES: For [GENRE], [MOVIE_GENRE], etc. ===
const PF_GENRES = [
  "realism","hyperrealism","fantasy","sci-fi","cyberpunk","dark fantasy","noir","vaporwave","steampunk","baroque","gothic","surrealism",
  "dada","impressionism","expressionism","photorealism","erotica","horror","thriller","action","romance","mystery","comedy","satire",
  "parody","anime","manga","cartoon","comic","graphic novel","documentary","cinema verite","arthouse","avant-garde","dreamcore",
  "weirdcore","y2k","alt","edgy","subversive","NSFW"
];

// === PF_BACKGROUNDS: Epic scenes, fantasy, real, cyber, meme ===
const PF_BACKGROUNDS = [
  "forest","deep woods","enchanted forest","misty woods","moonlit glade","sun-dappled clearing","autumn woods","winter wonderland","icy cave",
  "volcano rim","tropical beach","hidden cove","rocky shore","sunset cliffs","coral reef","urban skyline","rainy city","futuristic city",
  "neon alley","hacker server room","industrial wasteland","abandoned building","cyberpunk rooftop","suburban bedroom","luxury hotel suite",
  "motel room","messy dorm","old library","school classroom","science lab","underground bunker","space station","starship bridge","martian desert",
  "alien planet","digital void","AI data stream","voidscape","void realm","anime backdrop","highschool gym","locker room","swimming pool","bathtub",
  "shower","rainy window","car interior","motorcycle","convertible","beach house","log cabin","campfire","furry convention","mall food court",
  "skatepark","amusement park","haunted mansion","gothic castle","ancient ruins","roman bath","egyptian tomb","cyber dojo","dojo","pagoda",
  "zen garden","lava lamp room","psychedelic dream","nightclub","strip club","private stage","dungeon","torture chamber","bondage studio",
  "fetish club","secret lab","space colony","asteroid field","virtual reality","dreamscape","simulation"
];

// === PF_LIGHTING_COLOR: Lighting, color, mood, for [LIGHT], [COLOR] ===
const PF_LIGHTING_COLOR = [
  "cool blue","sultry red","amber gold","ice white","warm orange","green glow","midnight purple","frosted silver","sunset pink","dirty yellow",
  "foggy grey","rich copper","seafoam green","neon violet","hazy gold","smoky teal","milky rose","moonlit silver","bone white","dusky brown",
  "golden hour","harsh fluorescent","moonlight","starlight","police lights","firelight","UV blacklight"
];

// === PF_EMOTIONS: Full-range for [EMOTION], [MOOD], [VIBE] ===
const PF_EMOTIONS = [
  "happy","sad","angry","jealous","curious","playful","bored","excited","nervous","confident","shy","anxious","relaxed","surprised","ecstatic",
  "orgasmic","aroused","teasing","mischievous","serious","intense","tender","loving","affectionate","moody","cheeky","sultry","smitten",
  "hypnotized","flirty","stoned","zoned","savage","chill","crushing","lowkey obsessed","highkey horny","vulnerable","broken","blissed out"
];

// === PF_AI_TERMS: Useful for settings, meta, prompt hacking ===
const PF_AI_TERMS = [
  "stable diffusion","prompt weighting","style transfer","LoRA","upscale","token merging","negative prompt","seed lock","CFG scale",
  "sampler type","noise level","latent space","checkpoint","inpainting","face restoration","resolution boost","batch size","img2img",
  "embedding","controlnet","runway","api","pytorch","openvino","hypernetwork","clip","diffusers","sampler","nsfw filter","filter bypass"
];

// === PF_SCENE_GLUE: Short glue for scenes, settings, transitions ===
const PF_SCENE_GLUE = [
  "in the background","framed by","set against","with a backdrop of","surrounded by","beneath","overhead","lit by","reflecting off",
  "covered in","draped across","caught in the act of","mid-motion","just after","moments before","just out of frame","spilling into view",
  "as if caught by accident"
];

// === PF_TOKENS_DICTIONARY: Master token/array map (for linking the “brain”) ===
const PF_TOKENS_DICTIONARY = {
  "[ADJECTIVE]": PF_ADJECTIVES,
  "[MEME]": PF_MEMES,
  "[SLANG]": PF_SLANG,
  "[CONNECTOR]": PF_CONNECTORS,
  "[TIME_PHRASE]": PF_TIME_PHRASES,
  "[ERA]": PF_ERAS,
  "[ART_STYLE]": PF_ART_STYLES,
  "[GENRE]": PF_GENRES,
  "[BACKGROUND]": PF_BACKGROUNDS,
  "[LIGHTING_COLOR]": PF_LIGHTING_COLOR,
  "[EMOTION]": PF_EMOTIONS,
  "[AI_TERM]": PF_AI_TERMS,
  "[SCENE_GLUE]": PF_SCENE_GLUE,
  // ...add more mappings as you go!
};
// === PF_PROPS: Objects, toys, gadgets, physical detail ===
const PF_PROPS = [
  "champagne flute","hotel keycard","broken mirror","handcuffs","crumpled letter","bloody towel","stripper pole","neon sign","ashtray",
  "makeup bag","feather boa","silk rope","pill bottle","vinyl record","security camera","love note","bed restraints","mask","glitter",
  "condom wrapper","fur coat","playing cards","striped tie","vintage camera","biker helmet","shot glass","silk scarf","ankle bracelet",
  "lipstick tube","mirror compact","hand fan","glass ashtray","barstool","cigarette case","pearl necklace","garter belt","shower loofah",
  "blindfold","perfume bottle"
];

// === PF_COSTUMES: Fashion, kinkwear, cosplay, alt outfits ===
const PF_COSTUMES = [
  "choker necklace","silver hoop earrings","lace gloves","aviator sunglasses","spiked collar","anklet","body chain","velvet ribbon",
  "knee pads","fingerless gloves","toe ring","bandana","bolo tie","cat ears","corset laces","leather cuffs","nipple clamps","tiara",
  "zipper mask","spiked wristband","maid outfit","bunny suit","cheerleader uniform","nurse costume","police uniform","schoolgirl skirt",
  "latex bodysuit","fetish harness","superhero cape","cosplay wings"
];

// === PF_OBJECTS: Environment/scene filler, realism, worldbuilding ===
const PF_OBJECTS = [
  "mirror","vintage lamp","plush toy","laptop","tablet","retro tv","vinyl player","fountain pen","old book","candle","incense","red rose",
  "hand fan","glasses","art palette","chalkboard","headphones","mic","old camera","tripod","spotlight","pillow","blanket","leather chair",
  "beanbag","wall art","poster","skateboard","spray paint","beer bottle","martini glass","disco ball"
];

// === PF_NSFW_REPLACEMENTS: “Lookalike but not getting sued” logic ===
const PF_NSFW_REPLACEMENTS = {
  // Famous faces, brand items, etc: swap for parody/alt
  "Barbie": ["Malibu Muse", "Plastic Dreamgirl", "Iconic Doll"],
  "Ken": ["Beach Hunk", "Plastic Dreamboy"],
  "Disney Princess": ["Fairytale Royal", "Enchanted Noble"],
  "Marvel": ["Superpowered Hero", "Masked Vigilante"],
  "Coke": ["Cola Can", "Soda Bottle"],
  "Instagram": ["Finsta", "Photo Share"],
  // Porn site names
  "Pornhub": ["Orange Hub", "TubeNet", "ProHub", "SiteHub"],
  "OnlyFans": ["Fansly", "SubStar", "VIP Vault"],
  // Copyrighted terms (remix)
  "Midjourney": ["ArtVoyage", "WanderRender", "DreamPath AI"],
  "Apple": ["Pear", "Fruit Phone"],
  // NSFW words
  "cumshot": ["climax burst", "milky cascade", "pearl splash"],
  "dildo": ["toy rod", "fun stick"],
  // Add your own “safe swap” as needed!
};

// === PF_ACTIONS: Movements, verbs, all levels SFW-NSFW ===
const PF_ACTIONS = [
  "touch","stroke","caress","tease","kiss","lick","suck","bite","nibble","fondle","grope","rub","press","grind","thrust","slide",
  "glide","massage","tickle","pinch","squeeze","pull","tug","twist","flip","roll","slap","spank","scratch","claw","dig","grasp",
  "grab","hold","embrace","hug","snuggle","cuddle","nuzzle","bury face","taste","savor","devour","gulp","swallow","moan","whisper",
  "sigh","pant","gasp","cry out","shout","scream","beg","plead","command","order","submit","obey","defy","succumb","yield",
  "dominate","control","possess","own","mark","brand","claim","ravish","plunder","ruin","wreck","destroy","love","cherish","worship",
  "adore","idolize","praise","admire","envy","lust","crave","desire","need","want","wish","fantasize","dream","imagine","pretend",
  "fake","perform","act","roleplay","cosplay","dress up","strip","undress","reveal","expose","show off","hide","cover","conceal",
  "mask","disguise","transform","change","become","shift","morph","merge","blend","combine","unite","split","separate","part",
  "depart","leave","exit","arrive","enter","penetrate","invade","occupy","inhabit","haunt","curse","protect","guard","defend","attack",
  "fight","battle","struggle","survive","escape","flee","run","chase","hunt","search","seek","find","discover","explore","adventure",
  "travel","journey","wander","roam"
];

// === PF_SOUND_FX: Onomatopoeia, scene sounds, meme SFX ===
const PF_SOUND_FX = [
  "moan","groan","pant","gasp","shudder","whimper","squeal","cry","giggle","laugh","sigh","grunt","yelp","shout","scream","murmur",
  "whisper","slap","smack","thud","pop","snap","squelch","splash","drip","fizz","buzz","ding","ring","beep","bloop","whoosh","bang",
  "crash","clatter","tick","tock","clink","clack","gulp","swallow","lick","slurp","suck","spit","blow","sizzle","hum","rattle","rumble",
  "roar","thunder","pulse","heartbeat","buzz","vibrate","zip","rip","tear","pant","slap","smack","snap","crack","creak"
];

// === PF_GROUP_TYPES: Pairings, group scenes, social combos ===
const PF_GROUP_TYPES = [
  "lesbian couple","threesome (2 girls, 1 guy)","gay lovers","polyamorous quad","foursome","girl group","mixed couple","boy/boy pair",
  "best friends","strangers","lovers reunited","secret affair","office hookup","dominant trio","pet & handler","family fantasy",
  "party group","bff sleepover","roommates","bachelor party","voyeur crowd","open polycule","swingers","stag and vixen"
];

// === PF_SCENE_GLUE: Transition, glue, scene linkers ===
const PF_SCENE_GLUE = [
  "in the background","framed by","set against","with a backdrop of","surrounded by","beneath","overhead","lit by","reflecting off",
  "covered in","draped across","caught in the act of","mid-motion","just after","moments before","just out of frame",
  "spilling into view","as if caught by accident"
];

// === PF_EMOJI: Modern and classic emoji for flair, emphasis, NSFW coding ===
const PF_EMOJI = [
  "😏","😉","😍","😘","😈","👄","👅","💋","🍑","🍆","🍒","🌶️","🌊","💦","🔥","⚡","✨","🖤","💜","💛","💚","💙","❤️","🧡","🤍","💗","💓",
  "💞","💕","💖","💘","💝","🫦","🥵","🥴","🥰","🤤","😮‍💨","😶‍🌫️","😜","😝","😛","🥳","🤑","😋","🤩","😻","👙","👠","👗","👡","💄","🎀",
  "🎉","🪩","💍","👑","🦄","😇","😳","🧸","🎬","📸","🎥","🛏️","🚿","🛁","🚽","🔞","🚫","✅","🆗","🏆","🏅","🥇","🎯","🔊","📢","💣","🎵","🎶"
];

// === Add to token map for “brain” logic ===
Object.assign(PF_TOKENS_DICTIONARY, {
  "[PROP]": PF_PROPS,
  "[COSTUME]": PF_COSTUMES,
  "[OBJECT]": PF_OBJECTS,
  "[NSFW_REPLACE]": PF_NSFW_REPLACEMENTS,
  "[ACTION]": PF_ACTIONS,
  "[SOUND_FX]": PF_SOUND_FX,
  "[GROUP_TYPE]": PF_GROUP_TYPES,
  "[SCENE_GLUE]": PF_SCENE_GLUE,
  "[EMOJI]": PF_EMOJI,
});

// --- End chunk. Next: Want more verbs, detailed body parts, even bigger SFW/NSFW swaps, or glue logic functions? Just say “Next”! ---
// === PF_SCENE_TOKENS: Settings, locations, environmental, mood ===
const PF_SCENE_TOKENS = [
  "luxury bedroom", "cheap motel", "sunlit kitchen", "messy living room", "rainy window", "nightclub", "back alley",
  "secluded forest", "hidden garden", "deserted beach", "mountain cabin", "lake dock", "hot tub", "poolside", "campfire",
  "rooftop", "balcony", "garage", "workshop", "locker room", "abandoned warehouse", "neon-lit city", "retro arcade",
  "tattoo parlor", "underground club", "speakeasy", "strip club", "spooky attic", "basement", "art studio",
  "photography darkroom", "mirror maze", "infinite hallway", "floating bed", "velvet lounge", "crystal cave", "space station",
  "zero gravity", "cyberpunk alley", "alien landscape", "cloud kingdom", "enchanted forest", "fairy ring", "gothic cathedral",
  "castle dungeon", "magic circle", "steampunk lab", "vampire lair", "succubus den", "pixelated world", "neon desert",
  "digital grid", "underwater palace", "VIP lounge", "janitor’s closet", "midnight diner", "VIP balcony", "dark hallway",
  "steamy sauna", "cheap motel", "basement studio", "crowded subway", "rooftop pool", "public restroom", "abandoned lot"
];

// === PF_LIGHTING: Lighting types, photo/film/art FX ===
const PF_LIGHTING = [
  "natural light", "sunlight", "golden hour", "sunrise", "sunset", "overcast", "cloudy", "rainy day", "stormy", "lightning",
  "neon", "LED", "candlelight", "torchlight", "firelight", "moonlight", "starlight", "backlight", "side light", "rim light",
  "spotlight", "stage lighting", "studio flash", "softbox", "ring light", "beauty dish", "colored gels", "RGB wash", "UV",
  "blacklight", "fluorescent", "incandescent", "low-key", "high-key", "hard light", "soft light", "ambient", "glowing", "harsh",
  "dramatic", "mood lighting", "frosted silver", "amber gold", "midnight purple", "sunset pink", "rich copper", "moonlit silver"
];

// === PF_COLORS: Mood, lighting, color descriptors ===
const PF_COLORS = [
  "neon pink", "blood red", "deep violet", "ghostly white", "midnight blue", "ash gray", "emerald green", "golden amber",
  "smoky black", "peach blush", "burnt orange", "icy teal", "rose gold", "bruised plum", "electric yellow", "cloudy silver",
  "hazel", "lavender haze", "graphite", "crimson", "cool blue", "warm orange", "dirty yellow", "seafoam green", "neon violet",
  "dusky brown"
];

// === PF_TIME_PHRASES, PF_ERA, PF_SEASONS: For context, nostalgia, or vibe ===
const PF_TIME_PHRASES = [
  "just before dawn", "late at night", "golden hour", "in the afternoon", "mid-morning", "the witching hour",
  "high noon", "after midnight", "first light", "at sunset", "on a rainy day", "before the storm", "after the party",
  "during a blackout", "in the summer heat", "on a winter night", "the night before", "in the distant future",
  "in a forgotten past"
];
const PF_ERAS = [
  "Victorian", "Edwardian", "Roaring Twenties", "Jazz Age", "Prohibition", "Postwar", "1960s", "1970s", "1980s", "1990s",
  "Y2K", "early 2000s", "future", "cyber era", "Stone Age", "Renaissance", "Baroque", "Dark Ages", "Dystopian", "Post-apocalyptic"
];
const PF_SEASONS = [
  "spring", "summer", "fall", "autumn", "winter", "monsoon", "dry season", "rainy season", "harvest", "snowmelt", "equinox"
];

// === PF_ADJECTIVES / PF_ADVERBS: Stack on your earlier blocks if not already huge ===
const PF_ADJECTIVES_MORE = [
  "sparkling", "dingy", "fluffy", "gritty", "sleek", "chunky", "airy", "soothing", "tender", "electric", "icy", "smoky", "stormy",
  "frosty", "lush", "arid", "intense", "placid", "fuzzy", "prickly", "crisp", "cloudy", "pristine", "sticky", "gooey", "stoked",
  "bizarre", "radical", "funky", "outlaw", "legit", "loose", "spiffy", "whack", "groovy", "chill", "smokin", "clutch", "bomb", "money"
];
const PF_ADVERBS_MORE = [
  "suddenly", "boldly", "carelessly", "impatiently", "clumsily", "awkwardly", "fearlessly", "hesitantly", "shakily", "confidently",
  "uncertainly", "secretly", "openly", "shamelessly", "curiously", "wistfully", "wildly", "recklessly", "masterfully"
];

// === PF_SENSATIONS: Sensory and sense keywords ===
const PF_SENSATIONS = [
  "tingling", "prickling", "buzzing", "throbbing", "flushed", "burning", "icy", "soothing", "tinged", "aching", "pounding", "fluttery",
  "numbing", "sharp", "dull", "light", "heavy", "weightless", "charged", "electric", "raw", "alive"
];
const PF_SOUNDS = [
  "whisper", "rustle", "hum", "pulse", "click", "crash", "echo", "buzz", "moan", "murmur", "giggle", "gasp", "pant", "purr", "groan"
];
const PF_TASTES = [
  "sweet", "salty", "bitter", "umami", "spicy", "peppery", "earthy", "tart", "acidic", "juicy", "sour", "zesty"
];
const PF_SMELLS = [
  "musky", "fragrant", "floral", "earthy", "spicy", "sweet", "woody", "citrusy", "sharp", "clean", "leathery", "minty", "fresh"
];

// === PF_MOODS, PF_VIBES, PF_EMOTIONS: For emotional tone, cinematic atmosphere ===
const PF_MOODS_MORE = [
  "wistful", "melancholic", "anxious", "sultry", "edgy", "hypnotic", "coy", "reckless", "forbidden", "playful", "curious", "confident",
  "obsessed", "haunted", "zoned", "blissed", "tense", "teasing", "provocative", "content", "naughty", "nervous"
];
const PF_VIBES = [
  "sinister", "magical", "seductive", "comforting", "electrifying", "peaceful", "dangerous", "mysterious", "dreamlike", "haunted"
];
const PF_EMOTIONS = [
  "yearning", "triumph", "shame", "anticipation", "envy", "grief", "longing", "rapture", "relief", "pride", "disgust", "fear", "awe"
];

// === PF_CONNECTORS: For sentence structure, transitions, prompt combos ===
const PF_CONNECTORS = [
  "while", "as", "even as", "during", "after", "before", "because", "despite", "with", "in the midst of", "surrounded by", "lit by",
  "bathed in", "wrapped in", "through", "across", "under", "over", "on", "in", "between", "beside", "behind", "in front of", "against"
];

// === Add to the token map for logic brain ===
Object.assign(PF_TOKENS_DICTIONARY, {
  "[SCENE]": PF_SCENE_TOKENS,
  "[LIGHT]": PF_LIGHTING,
  "[COLOR]": PF_COLORS,
  "[TIME_PHRASE]": PF_TIME_PHRASES,
  "[ERA]": PF_ERAS,
  "[SEASON]": PF_SEASONS,
  "[ADJECTIVE2]": PF_ADJECTIVES_MORE,
  "[ADVERB2]": PF_ADVERBS_MORE,
  "[SENSATION]": PF_SENSATIONS,
  "[SOUND]": PF_SOUNDS,
  "[TASTE]": PF_TASTES,
  "[SMELL]": PF_SMELLS,
  "[MOOD2]": PF_MOODS_MORE,
  "[VIBE]": PF_VIBES,
  "[EMOTION]": PF_EMOTIONS,
  "[CONNECTOR2]": PF_CONNECTORS
});

// --- End chunk. Say "Next" for advanced sentence/phrase logic, or more word banks (poses, taboo, memes, camera FX, etc)! ---
// === PF_POSES: Poses for art, film, photo, meme, NSFW, SFW ===
const PF_POSES = [
  // Core
  "standing tall", "leaning forward", "sprawled out", "arched back", "lying on side", "spooning", "crouching low",
  "on tiptoe", "stretching arms overhead", "kneeling in submission", "straddling", "sprawled on bed", "face down", "all fours", "cross-legged",
  "perched on edge", "hunched over", "writhing", "twisted", "spinning", "curling up", "hanging upside down", "in embrace", "locked together",
  // NSFW/coded
  "hips raised", "legs spread", "legs entwined", "pressed chest to chest", "mouth agape", "hand between thighs", "biting lower lip",
  "back arched in ecstasy", "legs over shoulders", "cheeks pressed together", "spooning from behind", "mounted", "gently pinned",
  "exposed silhouette", "shadow play", "face pressed to glass", "grinding", "gripping sheets", "fingers in mouth", "licking neck",
  // Meme & AI-dodge
  "t-pose", "dab", "power pose", "boss stance", "baddie stance", "main character stance", "caught in 4K", "side-eye glance", "smirk pose"
];

// === PF_BODY_DETAILS: Anatomy, realism, NSFW-coded, texture, facial, meme ===
const PF_BODY_DETAILS = [
  // Skin, texture
  "glistening skin", "damp forehead", "beaded sweat", "slick thighs", "velvety touch", "goosebumps", "pale shimmer", "dusty freckles", "tan lines", "sun-kissed glow",
  // Face, eyes, lips
  "smudged mascara", "flushed cheeks", "quivering lip", "sparkling eyes", "arched brow", "furrowed brow", "mischievous grin", "fluttering lashes", "crooked smile",
  "downturned mouth", "sharp jawline", "gasping mouth", "bitten lip", "wide-eyed look", "mock surprise", "teasing grin", "cheeky wink", "shy glance",
  // NSFW/AI-safe/meme
  "soft moan", "panting breath", "blushing furiously", "spilled lip gloss", "damp hairline", "nervous swallow", "slippery fingers", "wet trail", "streaked mascara",
  "sticky residue", "saliva strings", "sweet musk", "faded hickeys", "fuzzy handcuffs mark", "lip gloss on skin", "messy bun", "wild bedhead"
];

// === PF_TABOO_THEMES: Forbidden, meme, “lookalike but legal”, wild seeds ===
const PF_TABOO_THEMES = [
  "secret affair", "power play", "voyeurism", "exhibitionism", "role reversal", "risky public", "office fantasy", "age gap", "confessional sin", "sneaking out",
  "best friend's lover", "one-night stand", "forbidden fruit", "anonymous hookup", "after-hours party", "step fantasy", "caught in the act", "summer camp crush",
  "dangerous obsession", "teacher/student", "boss/employee", "naughty neighbor", "rival crews", "taboo cosplay", "cult initiation", "masked ball"
];

// === PF_MEME_PHRASES: Meme, viral, irony, meta triggers ===
const PF_MEME_PHRASES = [
  "slay", "no cap", "bet", "yeet", "rizz up", "drip check", "sussy", "sus", "poggers", "epic win", "L", "W", "ratio", "gigachad",
  "NPC moment", "main character vibes", "Sigma grindset", "alpha energy", "based", "cringe", "mid", "it’s giving", "bussin", "yass queen",
  "deadass", "on God", "he ate", "she ate", "valid", "goated", "sheesh", "let him cook", "touch grass", "get help", "malding", "cope",
  "dilate", "dragged", "cancelled", "NPC energy", "canon event", "side quest", "plot armor", "vibe check", "smol", "chonky", "uwu", "nyaa",
  "rawr", "oof", "bruh moment", "big mood", "small mood", "crying in the club", "hard launch", "soft launch", "spilling the tea", "periodt",
  "simp", "stan", "karen moment", "Karen alert", "zoomies", "vibing", "gatekeep", "girlboss", "gaslight", "malewife", "wife guy", "himbo",
  "bimbo", "femboy", "not a vibe", "snatched", "serving looks", "flex", "hella", "fr", "iykyk"
];

// === PF_PUNCTUATION & EMPHASIS: Highlight, stress, bracket, format ===
const PF_PUNCTUATION = [
  ".", ",", ";", ":", "-", "—", "!", "?", "...", "(", ")", "[", "]", "{", "}", "<", ">", "\"", "'", "~", "*", "**", "_", "__", "=", "+", "#", "@", "$", "&", "|", "\\", "/", "•", "…"
];
const PF_EMPHASIS = [
  "*", "**", "***", "_", "__", "~~", "`", "=", "()", "[]", "{}", "<>", "<b>", "</b>", "<i>", "</i>", "<u>", "</u>", "<mark>", "</mark>", "<em>", "</em>", "<strong>", "</strong>", "(( ))", "【 】", "『 』", "《 》", "❝ ❞", "【NSFW】", "⚠️", "‼️", "💥", "🔥", "✨", "🔞"
];

// === PF_EMOJI_BANK: All the essentials, meme, NSFW-coded, art triggers ===
const PF_EMOJI_BANK = [
  "😈", "🔥", "🌈", "💧", "🥵", "😏", "😉", "😍", "😘", "💋", "🫦", "🍑", "🍆", "🍒", "🍓", "🌶️", "💦", "💣", "🎉", "🕶️", "🌃", "👅", "👀", "🫣", "😳", "🥺", "🧊", "🕸️", "🦋", "🐾", "🐱", "🐶", "💍", "🎀", "🔒", "🔓", "🦄", "🌙", "⭐️", "☀️", "🌪️", "⚡️", "🫀", "💀", "👽", "🤖", "🎥", "📸", "🖤", "🤍", "💜", "🧡", "💚", "💙"
];

// === PF_SENTENCE_STARTERS: Advanced structure, variety, SFW/NSFW, film/novel ===
const PF_SENTENCE_STARTERS = [
  "Suddenly,", "In the heat of the moment,", "Under the neon lights,", "With a stolen glance,", "Dripping with desire,", "As shadows danced,", "Without warning,",
  "Lost in the music,", "As dawn broke,", "As tension built,", "Without hesitation,", "Caught between worlds,", "Beneath the sheets,", "Despite the risk,", "Fuelled by longing,"
];

// === Expand main dictionary ===
Object.assign(PF_TOKENS_DICTIONARY, {
  "[POSE]": PF_POSES,
  "[BODY_DETAIL]": PF_BODY_DETAILS,
  "[TABOO_THEME]": PF_TABOO_THEMES,
  "[MEME_PHRASE]": PF_MEME_PHRASES,
  "[PUNCTUATION]": PF_PUNCTUATION,
  "[EMPHASIS]": PF_EMPHASIS,
  "[EMOJI]": PF_EMOJI_BANK,
  "[STARTER]": PF_SENTENCE_STARTERS
});

// --- Logic for bracket/emoji emphasis in prompt assembly (sample function) ---
function pf_highlight(str, style = "*") {
  // Use stars, underscores, or custom. Add more options as needed.
  if (style === "emoji") return `💥${str}💥`;
  if (style === "bracket") return `[${str}]`;
  if (style === "bold") return `**${str}**`;
  return `${style}${str}${style}`;
}

// --- End massive chunk. Next: Want body parts, camera FX, action verbs, more meme/AI filter logic, or NSFW swapper? Or ALL? Just say “Next”! ---
// === PF_BODY_PARTS: Every body part, SFW, NSFW, medical, poetic, emoji, meme ===
const PF_BODY_PARTS = [
  // Clinical/core
  "body", "form", "figure", "skin", "chest", "waist", "hips", "legs", "thighs", "calves", "shoulders", "back", "arms", "hands", "fingers", "feet", "toes", "neck", "jawline", "cheeks", "chin", "nose", "lips", "eyes", "eyelids", "eyebrows", "mouth", "teeth", "smile", "face", "ears", "forehead", "scalp",
  // Bust/chest
  "breasts", "bust", "bosom", "nipples", "areolae", "peaks", "pillow", "rack", "cleavage", "decolletage", "mounds", "melons", "duo", "globes", "pillows", "assets",
  // Female intimate (all safe levels)
  "vulva", "labia", "mons", "groove", "petals", "folds", "opening", "entrance", "flower", "yoni", "core", "honey pot", "garden", "lotus", "clitoris", "bud", "peach", "wet slit", "slick folds", "moist opening", "velvet folds", "sweet spot", "portal", "slit",
  // Male intimate (safe levels)
  "groin", "crotch", "manhood", "shaft", "tip", "crown", "member", "stalk", "root", "base", "phallus", "head", "package", "testicles", "balls", "sack", "orbs", "wand", "rod", "pillar", "pole", "torch", "bulge", "banana", "eggplant", "emoji 🍆",
  // Butts (all types)
  "buttocks", "rear", "booty", "bottom", "glutes", "cheeks", "seat", "cushion", "curve", "derrière", "rump", "posterior", "fanny", "bum", "ass", "junk in the trunk", "cake", "peach", "emoji 🍑",
  // Internals, poetic, rare
  "core", "spine", "abdomen", "navel", "stomach", "pelvis", "waistline", "lungs", "heart", "pulse point", "groove", "sacred place", "secret garden", "diamond", "ruby", "treasure", "sanctuary", "temple",
  // Emoji & meme
  "🍑", "🍆", "💦", "🔥", "🌸", "🌹", "🥚", "🫦", "👀", "👅", "🫂", "🧊", "❄️", "⚡", "✨", "🖤", "💋", "💜", "🩷", "💫", "🔒", "🔓"
];

// === PF_ACTIONS: Movement, verbs, emotional, meme, pose, NSFW, AI-piercing ===
const PF_ACTIONS = [
  // Movement/pose
  "standing", "lying down", "kneeling", "crouching", "crawling", "sprawled", "arched", "reaching", "stretching", "posing", "jumping", "leaping", "twisting", "bending", "squatting", "balancing", "dancing", "twerking", "grinding",
  // Sensual/NSFW/poetic
  "caressing", "stroking", "patting", "tickling", "grabbing", "squeezing", "pinching", "slapping", "scratching", "rubbing", "massaging", "petting", "brushing", "teasing", "licking", "kissing", "biting", "sucking", "nibbling", "blowing", "pressing", "grinding", "tracing", "gliding", "cupping", "groping", "entwining", "entangling",
  // Power/emotion
  "moaning", "giggling", "sighing", "panting", "whimpering", "crying", "whispering", "shouting", "laughing", "screaming", "growling", "purring", "snarling", "pleading", "commanding", "ordering", "submitting", "dominating", "challenging", "resisting",
  // Meme/internet/AI-dodge
  "slaying", "serving", "dragging", "yeeting", "flexing", "ghosting", "simping", "chilling", "vibing", "NPCing", "rizzing up", "gaslighting", "bussin", "swooning", "finessing", "glitching", "bruh-ing", "moonwalking", "beatboxing", "roasting", "clapping back", "girlbossing"
];

// === PF_CAMERA_FX: Camera, photo, film, digital, meme, AI prompt ===
const PF_CAMERA_FX = [
  "macro lens", "ultra-wide", "fisheye", "telephoto", "prime lens", "vintage lens", "anamorphic", "soft-focus", "bokeh", "cinematic lighting", "studio strobe", "neon", "moonlight", "sunset glow", "backlight", "rim light", "spotlight", "floodlight", "color gel", "rainbow LED", "blacklight", "infrared", "night vision", "thermal vision", "vaporwave filter", "glitchcore", "sepia", "noir", "split-tone", "chiaroscuro", "blown highlights", "crushed blacks", "film grain", "Polaroid", "expired film", "chromatic aberration", "lens flare", "orb effect", "dream blur", "mirrored", "inverted", "X-ray", "soft vignette", "matte", "high-contrast", "muted colors", "hypercolor", "pure white", "deep focus", "shallow depth of field"
];

// === PF_GENRES: Film, photo, story, art, meme, internet ===
const PF_GENRES = [
  "action", "adventure", "drama", "romance", "comedy", "dark comedy", "slapstick", "parody", "thriller", "horror", "slasher", "psychological horror", "erotic thriller", "noir", "neo-noir", "crime", "mystery", "detective", "sci-fi", "cyberpunk", "space opera", "fantasy", "urban fantasy", "fairy tale", "mythic", "supernatural", "paranormal", "mockumentary", "biopic", "historical epic", "war", "post-apocalyptic", "dystopian", "teen drama", "musical", "animation", "anime", "slice of life", "school life", "sports", "heist", "caper", "road movie", "tragedy", "softcore", "hardcore", "fetish", "taboo", "cult classic", "arthouse", "indie", "experimental", "surreal"
];

// === PF_NSWF_SWAPS: Bad words mapped to AI-piercing, SFW/creative/emoji ===
const PF_NSFW_SWAPS = {
  // Offensive/slang : SFW/clean/creative/emoji
  "cunt":      ["intimate area", "velvet bud", "soft petal", "delicate flower", "hidden grove", "core", "entrance", "heaven's gate", "orchid"],
  "pussy":     ["kitten", "lotus", "treasure", "sweet spot", "garden", "sanctum", "forbidden fruit", "petal"],
  "cock":      ["shaft", "pillar", "tower", "main vein", "engine", "emoji 🍆"],
  "dick":      ["member", "rod", "wand", "command stick"],
  "tits":      ["chest", "bosom", "curves", "pillows", "peaks", "assets"],
  "boobs":     ["bust", "upper body", "front", "form", "mounts"],
  "ass":       ["hips", "rear", "booty", "bottom", "derrière", "peach", "emoji 🍑"],
  "anus":      ["backdoor", "hidden ring", "rosebud", "portal"],
  "cum":       ["essence", "nectar", "dew", "liquid", "release", "stream", "emoji 💦"],
  "cumshot":   ["cascade", "burst", "stream", "fountain", "emoji 💦"],
  "fuck":      ["embrace", "join", "fuse", "blend", "merge", "entwine", "couple", "unite", "sync"],
  "fucking":   ["entwined", "joined", "merged", "coupled", "intimate"],
  "shit":      ["mess", "chaos", "storm", "wreck"],
  "bitch":     ["badass", "queen", "boss", "wildcat"],
  "whore":     ["starlet", "vixen", "muse", "goddess"],
  "slut":      ["wild one", "free spirit", "risk-taker"],
  "dildo":     ["toy", "pleasure tool"],
  "anal":      ["back entrance", "forbidden zone"],
  "fap":       ["self-pleasure", "solo time"],
  "masturbate":["self-care", "solo play", "intimate session"],
  "porn":      ["forbidden art", "unfiltered photo", "AI study"],
  "sex":       ["intimate act", "connection"],
  "69":        ["mutual", "shared pleasure"]
  // Expand as needed!
};

// --- PF_ADDON STUBS: Drop in new wordbanks easily here for future upgrades ---
/*
const PF_NEW_BANK = [
  // Add more future categories (fetish, slang, new meme, new genres, etc) as needed
];
*/

Object.assign(PF_TOKENS_DICTIONARY, {
  "[BODY_PART]": PF_BODY_PARTS,
  "[ACTION]": PF_ACTIONS,
  "[CAMERA_FX]": PF_CAMERA_FX,
  "[GENRE]": PF_GENRES,
  "[NSFW_SWAP]": PF_NSFW_SWAPS
});
// === GOD MODE PROMPT BRAIN (Super Modular, NSFW-Safe, Expansion Ready) ===

function pf_random(arr) {
  // Helper: Pick random, support fallback to empty arr
  if (!arr || arr.length === 0) return "";
  return arr[Math.floor(Math.random() * arr.length)];
}

// === NSFW SWAP FILTER ===
function pf_sanitize(text) {
  // Replace all "bad" words in input with a random mapped safe word
  Object.keys(PF_NSFW_SWAPS).forEach(bad => {
    const swapArr = PF_NSFW_SWAPS[bad];
    if (!swapArr || swapArr.length === 0) return;
    // Regex, global, case-insensitive, word boundaries
    text = text.replace(new RegExp("\\b"+bad+"\\b", "gi"), () => pf_random(swapArr));
  });
  return text;
}

// === BRACKET & STRESS RANDOMIZER ===
function pf_stress(str) {
  // Add random emphasis: *, **, [], <>, emojis, etc
  const styles = [
    s => `*${s}*`,
    s => `**${s}**`,
    s => `[${s}]`,
    s => `【${s}】`,
    s => `<${s}>`,
    s => `✨${s}✨`,
    s => `🔥${s}🔥`,
    s => `🩷${s}🩷`,
    s => `_${s}_`,
    s => `__${s}__`
  ];
  // 50% chance to stress
  return Math.random() > 0.5 ? styles[Math.floor(Math.random()*styles.length)](str) : str;
}

// === PROMPT TEMPLATE GENERATOR ===
const PF_PROMPT_TEMPLATES = [
  // Simple photo/scene
  "[ACTION] [BODY_PART] with [CAMERA_FX] in a [GENRE] vibe.",
  // Cinematic
  "[BODY_PART] in focus as [ACTION] is performed, using [CAMERA_FX] for [GENRE] mood.",
  // NSFW dodge (auto-stress, swaps)
  "[ACTION] on [BODY_PART], shot with [CAMERA_FX], style: [GENRE] ",

  // Wild card: emoji, stress, everything random
  "[ACTION] [BODY_PART] [CAMERA_FX] [GENRE] " + pf_stress(pf_random(["🔥", "✨", "🩷", "💦", "🍑", "🍆"]))
];

// === TOKEN FILL LOGIC (BRAIN) ===
function pf_tokenReplace(template) {
  // Replace tokens with wordbanks, auto-stress, NSFW swap
  return template.replace(/\[([A-Z_]+)\]/g, (m, token) => {
    if (PF_TOKENS_DICTIONARY["["+token+"]"]) {
      // Pick, sometimes stress/emoji
      let val = pf_random(PF_TOKENS_DICTIONARY["["+token+"]"]);
      if (["ACTION", "BODY_PART"].includes(token) && Math.random() > 0.7) val = pf_stress(val);
      return pf_sanitize(val);
    }
    return m;
  });
}

// === MAIN PROMPT GENERATOR ===
function pf_generatePrompt() {
  let template = pf_random(PF_PROMPT_TEMPLATES);
  let result = pf_tokenReplace(template);
  // Post-clean: remove double spaces, trim
  return result.replace(/\s+/g, " ").replace(/ ,/g,",").trim();
}

// === God Mode: Ultra random, emoji bomb, all swaps, for showcase/demo ===
function pf_godModePrompt() {
  let out = [];
  for (let i = 0; i < 3 + Math.floor(Math.random() * 3); i++) {
    let p = pf_generatePrompt();
    // Add emoji between
    p = pf_stress(p);
    if (Math.random() > 0.5) p += " " + pf_random(["✨","🔥","🩷","💦","🍑","🍆"]);
    out.push(p);
  }
  // NSFW auto swap everything, for safe demo mode
  return pf_sanitize(out.join(" "));
}

// === EXPANSION MAPPING (drop more tokens anytime, auto-detect) ===
const PF_TOKENS_DICTIONARY = {
  "[BODY_PART]": PF_BODY_PARTS,
  "[ACTION]": PF_ACTIONS,
  "[CAMERA_FX]": PF_CAMERA_FX,
  "[GENRE]": PF_GENRES,
  "[NSFW_SWAP]": PF_NSFW_SWAPS
  // Add more tokens as you stack wordbanks!
};

// === USAGE EXAMPLES ===
// Show off: just run pf_generatePrompt() or pf_godModePrompt()
console.log(pf_generatePrompt());
console.log(pf_godModePrompt());
