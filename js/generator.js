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

