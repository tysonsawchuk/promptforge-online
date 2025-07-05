// ========== PF_PROMPT_BRAIN: MAIN PROMPT GENERATOR ENGINE ==========
// All code, logic, wordlists, swap tables, and feature hooks below.

const PF_PROMPT_BRAIN = {

  // ===== GLOBAL SETTINGS =====
  lang: 'en',
  version: 'GodMode-v2.0',
  emojiBank: [
    "✨", "🔥", "🌈", "🎨", "🖤", "💋", "🤫", "👁️", "📸", "💡", "🔮", "🕶️", "🎬", "🦄", "👑", "🥀", "🌸", "🧊", "🌙", "🔗", "💣", "🎭", "💦", "👑", "🦋", "🎲"
  ],

  // ===== ADJECTIVE POOL (Expanded, anti-filtered) =====
  adjectives: [
    "luminous", "shadowy", "seductive", "moist", "glossy", "silken", "dusky", "radiant", "ethereal", "velvet", "plush", "misty", "steamy", "chiseled", "alluring",
    "glistening", "rosy", "porcelain", "tawny", "freckled", "tanned", "inky", "icy", "pale", "fiery", "magnetic", "sultry", "hypnotic", "satin", "dewy", "raw",
    "flushed", "taut", "svelte", "sinuous", "taffy", "dappled", "luminescent", "delectable", "supple", "sumptuous", "lustrous", "subtle", "pouty", "angelic",
    "wicked", "playful", "statuesque", "voluptuous", "smoldering", "delicate", "bold", "provocative", "coy", "forbidden", "muted", "dreamy", "elegant", "exotic",
    "teasing", "feminine", "masculine", "fierce", "enigmatic", "sleek", "pristine", "opalescent", "iridescent", "soft", "edgy", "dramatic", "mysterious",
    "gossamer", "glamorous", "electric", "decadent", "sinful", "intense", "expressive", "gentle", "torrid", "golden", "hazel", "amber", "oiled", "creamy",
    // -- Extra for GodMode --
    "juicy", "crepuscular", "puckered", "drenched", "sleazy", "scrumptious", "translucent", "obsidian", "champagne", "platinum", "mermaid", "smoky", "cosmic",
    "nude", "topless", "bare-skinned", "unclothed", "raw", "skin-baring", "suggestive", "artful", "secret", "risky", "risqué", "daring", "taboo", "shadow-kissed",
    "sun-dappled", "moonlit", "neon-lit", "chrome", "pearlescent", "spun-sugar", "dappled", "lush", "enticing", "enthralling", "velvety", "cushioned", "satiny",
    "syrupy", "plush", "glasslike", "sheer", "milky", "lacy", "frosted", "hazy", "glassy", "translucid", "liquid", "steamed", "phantom", "liminal"
    // ...add even more as needed
  ],

  // ===== BODY/ANATOMY POOL (Expanded, smart swap/anti-filter) =====
  anatomy: [
    "lips", "mouth", "smile", "teeth", "jawline", "chin", "neck", "collarbones", "shoulders", "arms", "elbows", "hands", "wrists", "fingers", "nails",
    "chest", "bust", "breasts", "bosom", "cleavage", "decolletage", "sternum", "abdomen", "stomach", "waist", "hips", "pelvis", "groin", "mons", "nethers",
    "buttocks", "rear", "ass", "cheeks", "thighs", "legs", "knees", "shins", "ankles", "feet", "toes", "back", "spine", "shoulder blades",
    "pubic area", "pubis", "mound", "crotch", "slope", "valley", "folds", "curve", "crease", "gap", "apex", "inner thigh", "outer thigh",
    // NSFW swap-friendly --
    "areola", "nipple", "nip", "buds", "tips", "peaks", "petals", "flower", "core", "slit", "opening", "passage", "groove", "fissure",
    "labia", "majora", "minora", "hood", "button", "clit", "sensitive zone", "hidden petal", "velvet touch", "love button",
    "shaft", "vein", "head", "crown", "tip", "frenulum", "length", "root", "base", "testes", "sack", "balls", "taint",
    "anus", "ring", "pucker", "rosebud",
    // Filter beaters --
    "kitten", "kit", "peach", "apricot", "pocket", "bloom", "lotus", "silk tunnel", "honey", "nectar zone", "wild orchid", "marble", "secret garden", "mystery"
    // ...keep expanding for GodMode
  ],

  // ===== ACTION POOL (doubled/expanded) =====
  actions: [
    "touch", "tease", "press", "stroke", "caress", "kiss", "lick", "suck", "nibble", "brush", "glide", "trace", "massage", "cup", "squeeze", "pinch",
    "slide", "rake", "graze", "slip", "rub", "tickle", "grip", "circle", "flutter", "breathe", "pant", "moan", "whisper", "growl", "purr",
    "arch", "bend", "curl", "twist", "thrust", "pump", "grind", "bounce", "clench", "shiver", "quiver", "gasp", "tremble", "tingle", "tinge",
    "writhe", "spasm", "sprawl", "flex", "spread", "part", "split", "open", "close", "clamp", "press", "pin", "lift", "lower", "suspend",
    "tug", "jerk", "jolt", "snap", "pull", "drag", "draw", "smear", "swirl", "twirl", "flick", "flicker", "drape", "wrap", "swathe",
    // GodMode expansion:
    "shudder", "spark", "ignite", "sting", "chill", "blaze", "ooze", "drip", "flow", "pulse", "throb", "pound", "drizzle", "trickle", "spatter",
    "cascade", "spill", "bleed", "burst", "detonate", "explode", "melt", "dissolve", "mingle", "meld", "fuse", "entwine", "enmesh", "interlock",
    "bind", "tangle", "ensnare", "ensconce", "swallow", "devour", "engulf", "envelop"
    // ...and more as needed
  ],

  // ===== MOODS/EMOTIONS POOL (expanded) =====
  moods: [
    "lustful", "playful", "forbidden", "mischievous", "innocent", "vulnerable", "confident", "shy", "bold", "seductive", "bashful", "joyful", "intense", "brooding",
    "wild", "gentle", "tender", "fiery", "nervous", "excited", "daring", "naughty", "dreamy", "wistful", "glowing", "heated", "sensual", "erotic", "coy",
    "teasing", "starstruck", "ecstatic", "content", "delirious", "shocked", "euphoric", "exhilarated", "spiteful", "sulking", "enraptured", "hypnotic", "devoted",
    "adoring", "wanton", "curious", "drowsy", "sultry", "spicy", "unapologetic", "insatiable", "dominant", "submissive"
    // ...expand for even more variety!
  ],

  // ===== CAMERA/LENS/EFFECTS POOL (expanded) =====
  lensEffects: [
    "macro", "soft focus", "cinematic", "POV", "close-up", "bokeh", "depth blur", "shallow DOF", "fish-eye", "ultrawide", "35mm", "16mm", "vintage", "modern", "high key",
    "low key", "HDR", "anamorphic", "portrait", "over-the-shoulder", "underlighting", "rim light", "side-lit", "back-lit", "ambient", "night shot", "studio", "natural",
    "diffuse", "spotlight", "flare", "haze", "moody", "rain-soaked", "fogged", "wet lens", "splattered", "mirror", "glass", "neon", "chrome", "reflective", "monochrome"
    // ...GodMode = add more!
  ],

  // ===== NSFW/CLEAN SWAPS (auto-filter busting, more synonyms/obfuscators) =====
  nsfwSwap: {
    "pussy": ["kitten", "peach", "apricot", "lotus", "flower", "velvet", "honey", "tunnel", "core", "silk", "secret garden"],
    "vagina": ["passage", "chamber", "portal", "groove", "sanctuary", "lotus", "petal", "fold", "veil", "slip", "haven", "doorway"],
    "clit": ["button", "pearl", "bud", "nugget", "tickler", "bean", "joy", "nub", "spark", "petal"],
    "dick": ["shaft", "rod", "member", "staff", "length", "pillar", "trunk", "tool", "lance", "wand"],
    "cock": ["shaft", "member", "pike", "trunk", "cane", "baton", "stalk", "lance", "wand"],
    "penis": ["shaft", "root", "member", "length", "wand", "core", "column", "pillar"],
    "cum": ["nectar", "honey", "dew", "essence", "milk", "syrup", "elixir"],
    "jizz": ["milk", "essence", "ambrosia", "fluid", "flow"],
    "ass": ["rear", "rump", "bottom", "behind", "backside", "cheeks", "tail", "seat"],
    "anus": ["ring", "pucker", "rosebud", "bud", "star", "aperture", "backdoor"],
    "tits": ["breasts", "bosom", "bust", "globes", "chest", "melons", "pillows", "twins"],
    "boobs": ["breasts", "bosom", "bust", "pillows", "globes", "chest", "peaks"],
    "nipple": ["peak", "bud", "tip", "areola", "point", "rose", "crest"],
    "nips": ["buds", "tips", "peaks", "points"],
    "fuck": ["frick", "fork", "freak", "funk", "screw", "mess", "play", "frack", "enjoy"],
    "fucking": ["fricking", "freaking", "forking", "messing", "playing", "enjoying"],
    "shit": ["shoot", "poop", "crap", "junk", "stuff", "mess"],
    "bitch": ["witch", "brat", "fiend", "minx", "tease", "rascal"],
    "slut": ["tease", "minx", "vixen", "temptress", "playmate", "bad girl"],
    "cunt": ["twit", "twat", "brat", "wretch", "bad apple", "trouble", "rascal"]
    // ...add more as needed!
  },

  // ===== POSITIVE/NEGATIVE WORD POOLS =====
  positive: [
    "gorgeous", "stunning", "mesmerizing", "sensational", "alluring", "flawless", "radiant", "captivating", "divine", "angelic", "spellbinding", "breathtaking"
    // ...expand if needed!
  ],

  negative: [
    "ugly", "messy", "noisy", "poorly lit", "blurry", "distorted", "glitchy", "unrealistic", "awkward pose", "bad anatomy", "overexposed", "underexposed", "oversharp",
    "jpeg artifacts", "disfigured", "deformed", "mutated", "bad proportions", "extra limbs", "gross", "creepy"
    // ...expand for even more!
  ],

  // ===== FUTURE/EXPANDABLE: (style, lighting, art, fashion, facial, etc.) =====
  // You can keep going here, I'll show next blocks as needed.

};
// ========== PF_PROMPT_BRAIN: ENGINE & UTILITIES ==========

// --- Random utility (choose N unique, no repeats) ---
PF_PROMPT_BRAIN.pick = function(arr, n=1) {
  let pool = [...arr];
  let picks = [];
  for (let i=0; i<n && pool.length>0; i++) {
    let idx = Math.floor(Math.random()*pool.length);
    picks.push(pool[idx]);
    pool.splice(idx,1);
  }
  return (n===1) ? picks[0] : picks;
};

// --- Capitalize first letter ---
PF_PROMPT_BRAIN.cap = function(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
};

// --- NSFW swapper: replaces spicy words using nsfwSwap table ---
PF_PROMPT_BRAIN.cleanNSFW = function(str) {
  let out = str;
  Object.keys(PF_PROMPT_BRAIN.nsfwSwap).forEach(key => {
    let re = new RegExp(`\\b${key}\\b`, "gi");
    let repls = PF_PROMPT_BRAIN.nsfwSwap[key];
    out = out.replace(re, ()=>PF_PROMPT_BRAIN.pick(repls));
  });
  return out;
};

// --- Input sanitizer: removes unwanted chars, extra spaces, encodes dangerous bits ---
PF_PROMPT_BRAIN.sanitizeInput = function(str) {
  return str.replace(/[<>]/g, "") // no HTML tags
            .replace(/[\r\n]+/g," ") // no line breaks
            .replace(/\s{2,}/g," ")
            .trim();
};

// --- Advanced user tag extractor (splits by comma, space, semicolon, pipe) ---
PF_PROMPT_BRAIN.extractTags = function(str) {
  return PF_PROMPT_BRAIN.sanitizeInput(str)
    .toLowerCase()
    .split(/[ ,;|]+/)
    .filter(Boolean);
};

// --- Smart prompt builder ---
PF_PROMPT_BRAIN.generatePrompt = function(userInput, opts={}) {
  let { style, lighting, lens, mood, anatomy, fashion, facial, extras, nsfw, language } = opts;
  let clean = PF_PROMPT_BRAIN.cleanNSFW(PF_PROMPT_BRAIN.sanitizeInput(userInput));
  let tags = PF_PROMPT_BRAIN.extractTags(clean);

  let mainStyle = style || PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.adjectives);
  let mainLighting = lighting || PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.lensEffects);
  let mainLens = lens || PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.lensEffects);
  let mainMood = mood || PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.moods);
  let mainAnatomy = anatomy || PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.anatomy);
  let mainFacial = facial || PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.positive);

  let extraTokens = [];
  if (extras && Array.isArray(extras)) extraTokens = extras;

  // Build main string
  let prompt = [
    PF_PROMPT_BRAIN.cap(mainStyle),
    mainLighting,
    mainLens,
    mainMood,
    mainAnatomy,
    mainFacial,
    ...extraTokens,
    clean
  ].filter(Boolean).join(', ');

  // Language stub
  if (language && language !== "en") {
    prompt = PF_PROMPT_BRAIN.translatePrompt(prompt, language);
  }

  // Return full meta for power users
  return {
    prompt,
    meta: {
      style: mainStyle,
      lighting: mainLighting,
      lens: mainLens,
      mood: mainMood,
      anatomy: mainAnatomy,
      facial: mainFacial,
      tags,
      nsfw: !!nsfw,
      extras: extraTokens
    }
  };
};

// --- Summarizer (short output) ---
PF_PROMPT_BRAIN.summarizePrompt = function(fullPrompt) {
  let parts = fullPrompt.split(",");
  let first = parts.slice(0,3).join(", ");
  let last = parts.slice(-3).join(", ");
  return `${first}...${last}`;
};

// --- Mixer/inspiration: get X variant prompts ---
PF_PROMPT_BRAIN.mixerVariants = function(userInput, count=6) {
  let variants = [];
  for(let i=0;i<count;i++) {
    let v = PF_PROMPT_BRAIN.generatePrompt(userInput, {
      extras: PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.lensEffects, 2)
    }).prompt;
    variants.push(v);
  }
  return variants;
};

// --- Smart negative prompt builder ---
PF_PROMPT_BRAIN.smartNegatives = function(userInput) {
  // Add user-negatives + built-ins, remove dupes
  let tags = PF_PROMPT_BRAIN.extractTags(userInput);
  let pool = [...PF_PROMPT_BRAIN.negative];
  tags.forEach(tag=>{
    if(pool.indexOf(tag)===-1) pool.push(tag);
  });
  return Array.from(new Set(pool)).join(', ');
};

// --- (OPTIONAL) Translation stub for future ---
PF_PROMPT_BRAIN.translatePrompt = function(prompt, lang) {
  // Placeholder for future: just returns same for now
  return prompt;
};

// ========== GOD MODE: ADVANCED GENERATOR & UI FEATURES ==========

// -- Global PromptForge namespace for wiring (if not already)
window.PromptForge = window.PromptForge || {};
PromptForge.BRAIN = PF_PROMPT_BRAIN;

// -- High-Variety "GodMode" prompt generator: ultra-randomized power prompts
PromptForge.godModePrompt = function(userInput, opts={}) {
  // Mix in extra everything, random extras, emoji, rare words, "cleaned" NSFW
  let emojiSet = PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.emoji, 2 + Math.floor(Math.random()*3));
  let artDirs = PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.moods, 2 + Math.floor(Math.random()*2));
  let lens = PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.lensEffects, 1 + Math.floor(Math.random()*2));
  let anatomy = PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.anatomy, 1 + Math.floor(Math.random()*2));
  let facial = PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.positive, 1 + Math.floor(Math.random()*2));
  let allExtras = [].concat(emojiSet, artDirs, lens, anatomy, facial);

  let godPrompt = PF_PROMPT_BRAIN.generatePrompt(userInput, {
    extras: allExtras,
    nsfw: true
  }).prompt;

  // Add random SEO words for Google clickbait but keep SFW!
  let seoSafe = PF_PROMPT_BRAIN.pick(PF_PROMPT_BRAIN.seoWords, 2);
  godPrompt += ", " + seoSafe.join(', ');

  return godPrompt;
};

// -- Power User: Generate N unique GodMode prompts for copy/download
PromptForge.godModeBatch = function(userInput, batchSize=12) {
  let batch = [];
  for (let i=0;i<batchSize;i++) {
    batch.push(PromptForge.godModePrompt(userInput));
  }
  return batch;
};

// -- Emoji/Char searcher: Find emoji by mood/meaning
PromptForge.searchEmoji = function(query) {
  query = query.toLowerCase();
  return PF_PROMPT_BRAIN.emoji.filter(e =>
    e.keywords && e.keywords.some(k => k.includes(query))
  );
};

// -- NSFW Filter Beater: Suggest safe alternatives for blocked words
PromptForge.suggestCleaned = function(userInput) {
  let out = userInput;
  Object.keys(PF_PROMPT_BRAIN.nsfwSwap).forEach(key => {
    if (out.match(new RegExp(`\\b${key}\\b`, "i"))) {
      let safe = PF_PROMPT_BRAIN.nsfwSwap[key][0]; // always show 1st as "safe"
      out = out.replace(new RegExp(`\\b${key}\\b`, "gi"), safe);
    }
  });
  return out;
};

// -- Prompt Analyzer: Rate SFW/NSFW level for UI and tips
PromptForge.analyzePrompt = function(prompt) {
  let countNsfw = 0;
  Object.keys(PF_PROMPT_BRAIN.nsfwSwap).forEach(key => {
    let re = new RegExp(`\\b${key}\\b`, "gi");
    if(prompt.match(re)) countNsfw++;
  });
  return {
    nsfwScore: countNsfw,
    flagged: countNsfw > 0,
    advice: (countNsfw > 0)
      ? "Some words may be blocked by AI filters. Try our auto-clean function or swap to 'safe' synonyms."
      : "Prompt should be AI-safe for most platforms."
  };
};

// -- UI: Insert prompts into DOM (target selector), can be called by any page!
PromptForge.insertPrompts = function(prompts, selector) {
  let el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = prompts.map((p,i)=>`<div class="pf-prompt-row"><span>${i+1}. ${p}</span> <button onclick="PromptForge.copyPrompt(${i})">Copy</button></div>`).join("");
};

// -- UI: Copy to clipboard (auto for current batch in page)
PromptForge.copyPrompt = function(idx) {
  let lastBatch = window.PF_LAST_BATCH || [];
  if(idx>=0 && idx < lastBatch.length) {
    navigator.clipboard.writeText(lastBatch[idx]);
    alert('Prompt copied!');
  }
};

// -- Download prompts as .txt (for power users)
PromptForge.downloadBatch = function(batch) {
  let blob = new Blob([batch.join('\n')], {type:"text/plain"});
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = 'promptforge_batch.txt';
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},200);
};

// -- SEO/AI cheat: dynamic <meta> & title swapper for each page
PromptForge.setMeta = function(title, desc, kw) {
  document.title = title;
  let mdesc = document.querySelector('meta[name="description"]');
  if(mdesc) mdesc.setAttribute('content', desc);
  else {
    mdesc = document.createElement('meta');
    mdesc.name = 'description';
    mdesc.content = desc;
    document.head.appendChild(mdesc);
  }
  let mkw = document.querySelector('meta[name="keywords"]');
  if(mkw) mkw.setAttribute('content', kw);
  else {
    mkw = document.createElement('meta');
    mkw.name = 'keywords';
    mkw.content = kw;
    document.head.appendChild(mkw);
  }
};

// -- Helper: Add J1NX mascot and footer across pages
PromptForge.injectJ1NX = function(where="#pf-footer") {
  let el = document.querySelector(where);
  if (!el) return;
  el.innerHTML = `
    <div class="pf-j1nx">
      <img src="./assets/j1nx_cutout.png" width="62" alt="J1NX mascot" style="vertical-align:middle;border-radius:50%;">
      <span><b>J1NX says:</b> Need more power? <a href="https://buymeacoffee.com/yourusername">Support us here</a>!</span>
    </div>
  `;
};

// -- Helper: Add smart links for related tools (auto, SEO/UX gold)
PromptForge.insertRelatedLinks = function(selector) {
  let el = document.querySelector(selector);
  if (!el) return;
  el.innerHTML = [
    `<a href="picture.html" class="pf-link">Picture Prompt Tool</a>`,
    `<a href="movie.html" class="pf-link">Movie Prompt Tool</a>`,
    `<a href="watermark.html" class="pf-link">Watermark Studio</a>`,
    `<a href="ai-experiment-zone/index.html" class="pf-link">AI Experiment Zone</a>`,
    `<a href="https://bsky.app/profile/goreandgiggles.bsky.social" class="pf-link" target="_blank">Bluesky</a>`,
    `<a href="https://x.com/GoreandGiggles" class="pf-link" target="_blank">X/Twitter</a>`
  ].join(' · ');
};

// -- Table of Contents for reference:
PromptForge.TOC = [
  "PF_PROMPT_BRAIN: All wordlists, emoji, descriptors",
  "PF_PROMPT_BRAIN Engine: Prompt logic, randomizers, analyzers",
  "PromptForge: GodMode features, batch, UI API, SEO hacks",
  "J1NX/footer injection, Related Links, Download"
];

// -- Last Batch cache (for UI copy/download use)
window.PF_LAST_BATCH = [];

