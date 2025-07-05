// generator.js — PromptForge GOD MODE Brain
// v1.0 — Consolidated master version
// All pools, tricks, logic, NSFW-safe swap, mega randomizer, emoji, symbol banks

// === TABLE OF CONTENTS ===
// 1. Word Pools & Dictionaries
// 2. Emoji/Symbol/Char Banks
// 3. Tag Map/Style Map
// 4. Utility Functions (random, capitalize, sanitize, etc.)
// 5. Core Prompt Functions (generate, random, mixer, negatives, summary, etc.)
// 6. NSFW Filter-Busting Engine
// 7. Internationalization/Language (stubs)
// 8. Export API (for other pages/tools)

// ------------------------------------------------------
// 1. WORD POOLS (Expand as needed — these are huge)
const PF_PROMPT_BRAIN = {
  // ==== Adjectives / Descriptors ====
  adjectives: [
    "alluring","dreamy","mysterious","haunting","ethereal","vivid","moody","glowing","hyperreal","fantastical",
    "forbidden","vulnerable","provocative","playful","voluptuous","primal","tender","glossy","muscular","soft-skinned",
    "cinematic","electric","fiery","enigmatic","melancholy","luminous","whispered","velvet","glistening","sultry",
    "angelic","feral","lustrous","satin","shadowy","dangerous","lush","futuristic","vintage","decadent","iconic",
    // ... (expand to hundreds, add more in next chunk)
  ],

  // ==== Anatomy (Safe + Obscured NSFW/alt words) ====
  anatomy: [
    "curved hips","arched back","delicate hands","long legs","piercing eyes","sensual lips","silky skin",
    "elegant neck","tight waist","expressive face","bare shoulders","broad chest","soft thighs","full lips",
    "deep gaze","moist lips","narrow waist","shapely body","smooth curves","dimpled cheeks","teasing smile",
    // NSFW filter-busters:
    "bare chest","partially revealed skin","suggestive pose","exposed cleavage","exotic curves","secret anatomy",
    "alluring silhouette","artistic nudity","tastefully exposed","hidden assets","risqué contours","iconic figure",
    // ... (expand further below)
  ],

  // ==== Lighting Effects ====
  lighting: [
    "softbox lighting","sunset backlight","rim light","spotlit","neon-lit","moody shadows","diffuse daylight","golden hour",
    "dramatic contrast","volumetric lighting","studio lit","rainy glow","foggy highlights","silhouette lighting","colored gels",
    "candle-lit","low key","high key","split lighting","dappled sunlight","color splash",
    // ...expand
  ],

  // ==== Art Styles ====
  styles: [
    "photorealistic","oil painting","anime-inspired","digital matte","cinematic still","hyperrealism","vaporwave","noir","baroque",
    "impressionist","watercolor","synthwave","fantasy concept","surrealism","classic portrait","editorial fashion","cyberpunk",
    "chiaroscuro","pixel art","glitchcore","cartoon","digital sketch","pop art",
    // ...expand
  ],

  // ==== Facial Descriptors ====
  facialDescriptors: [
    "piercing eyes","smoky eyes","freckled nose","rosy cheeks","open mouth","pursed lips","mischievous grin",
    "smoldering gaze","soft smile","intense stare","downcast eyes","flushed cheeks","pouty lips","arched brows",
    "blushing face","biting lip","daring wink","flirty look","teasing expression","shy glance","wide smile",
    // ...expand
  ],

  // ==== Fashion ====
  fashion: [
    "lace lingerie","silk robe","leather jacket","barefoot","messy bun","fishnet stockings","vintage corset",
    "torn jeans","white button-down","black choker","oversized sweater","strappy heels","minimal accessories",
    "untucked shirt","cocktail dress","tousled hair","swimwear","sporty crop top","low-rise jeans","body harness",
    // ...expand
  ],

  // ==== Camera/Lens Effects ====
  lensEffects: [
    "bokeh background","shallow depth of field","fisheye lens","macro close-up","soft focus","motion blur",
    "cinematic crop","tilt shift","zoomed perspective","vignette","lens flare","wide angle","mirror reflection",
    "panorama","vintage grain","overexposed highlights","underexposed shadows","polaroid edge","film burn",
    // ...expand
  ],

  // ==== Art Directions / Moods ====
  artDirections: [
    "melancholy mood","ecstatic vibe","romantic tension","subtle danger","epic scale","quiet intimacy",
    "intense drama","ethereal calm","wistful longing","playful energy","sensual tease","mysterious aura",
    "gritty realism","surreal weirdness","triumphant pose","contemplative stillness","bold rebellion",
    // ...expand
  ],

  // ==== Mega Negative Pool (auto for negatives) ====
  negatives: [
    "blurry","extra limbs","missing fingers","bad anatomy","out of frame","gross proportions","oversaturated","underexposed",
    "deformed hands","watermark","logo","text","bad shadow","crooked eyes","glitch","ugly","duplicate face","poor lighting",
    "jpeg artifacts","long neck","unrealistic skin","disfigured","bad symmetry","mutilation","crooked teeth","mutation",
    "bad anatomy","unsettling","cartoonish","distorted proportions",
    // ...expand
  ],

  // ...continue pools in next part

};
// --- CONTINUED: generator.js — PromptForge GOD MODE Brain ---

// ==== Continue & Expand Word Pools ====

// Expand adjectives and anatomy for max filter-busting
PF_PROMPT_BRAIN.adjectives.push(
  "subversive","unfiltered","explicit","elusive","subtle","banned","censored","taboo","dirty","forbidden",
  "cheeky","transgressive","all-natural","intense","velvety","shimmering","invisible","juicy","wet-look","sun-drenched",
  "afterglow","steamy","unbuttoned","risky","flirtatious","illicit","provoking","unsanctioned","hidden","uncensored"
);

PF_PROMPT_BRAIN.anatomy.push(
  "bare skin","revealed midriff","deep neckline","forbidden valley","upper torso","lower back","side boob",
  "sensual outline","draped chest","steamy features","veiled beauty","sly anatomy","aroused posture",
  "wet silhouette","alluring profile","hipbone lines","subtle bulge","peek of lace","suggestive angle",
  "sculpted abdomen","delicate collarbone","sweat-kissed skin","forbidden fruit","secret smile"
);

// Expand lighting, styles, facial descriptors, fashion, lens effects, art directions similarly
PF_PROMPT_BRAIN.lighting.push(
  "starlit glow","rainbow flare","color gel wash","pulsing neon","blue hour","harsh studio light",
  "moonbeam rim","glitter highlights","studio flash","after-dark haze"
);
PF_PROMPT_BRAIN.styles.push(
  "AI art remix","NSFW surreal","forbidden digital","hyperpop","deepdream","NSFW photoreal","sci-fi erotica","cinema verite",
  "post-apocalyptic","lowbrow","internet meme style"
);
PF_PROMPT_BRAIN.facialDescriptors.push(
  "pursed mouth","tousled hair","teasing gaze","pouting expression","smirk","teary eyes","sulking","play-bite lip",
  "passionate stare","open-mouthed","unapologetic expression"
);
PF_PROMPT_BRAIN.fashion.push(
  "see-through mesh","sports bra","untied bikini","unbuttoned shirt","thigh-highs","ripped stockings","latex suit",
  "barely-there dress","wet tank top","boyshorts","high-cut swimsuit"
);
PF_PROMPT_BRAIN.lensEffects.push(
  "chromatic aberration","NSFW-censored blur","intentional haze","film scratches","color bleed","focus-pull","mirror prism",
  "dirty lens","fogged glass","dew-kissed lens"
);
PF_PROMPT_BRAIN.artDirections.push(
  "raw desire","unspoken tension","dangerous fun","vulnerable moment","forbidden daydream","playful mischief",
  "secret fantasy","temptation","innocent wickedness","edgy comfort"
);

// ==== 2. EMOJI & SPECIAL CHAR BANKS ====

// Emojis for extra vibe & filter-jamming
PF_PROMPT_BRAIN.emoji = [
  "🔥","💦","🍑","🍒","👄","👙","🍆","😉","🥵","😈","💋","✨","🌈","🎬","🎭","😏","🫦","🫶","💃","😮‍💨","🥂"
];

// Special ASCII chars for visual tricks, watermarking, filter-busting
PF_PROMPT_BRAIN.specialChars = [
  "•","★","✦","✧","⛤","⛧","✴︎","➴","⊹","⍟","♛","♡","⭑","⊰","⊱","⫷","⫸","☾","⟡","☼","꙳"
];

// ==== 3. TAG MAPS (to auto-convert hashtags/shortcuts) ====
// Ex: #anime triggers “anime-inspired”, etc.
PF_PROMPT_BRAIN.tagStyleMap = {
  "anime": "anime-inspired",
  "oil": "oil painting",
  "noir": "noir style",
  "photo": "photorealistic",
  "cyber": "cyberpunk",
  "bw": "black and white",
  "nsfw": "tastefully artistic nude",
  "sfw": "fully clothed",
  "vintage": "retro style",
  "cartoon": "cartoon",
  "fantasy": "fantasy concept",
  "surreal": "surrealism",
  "cinema": "cinematic still",
  "dream": "ethereal, dreamy"
  // ...expand as needed
};

// ==== 4. UTILITY FUNCTIONS ====

// Pick n random items, never repeats
function pf_pick(arr, n=1) {
  let pool = [...arr];
  let picks = [];
  for (let i=0; i<n && pool.length>0; i++) {
    let idx = Math.floor(Math.random()*pool.length);
    picks.push(pool[idx]);
    pool.splice(idx,1);
  }
  return (n===1) ? picks[0] : picks;
}

// Capitalize first letter
function pf_cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Sanitize input (swap banned/NSFW to clean, trim, etc)
PF_PROMPT_BRAIN.sanitizeInput = function(input) {
  // Masterlist of swaps for filter-dodging
  const swaps = [
    [/pussy/gi, "feline mystery"],
    [/cock/gi, "rooster"],
    [/tits/gi, "bare chest"],
    [/boobs/gi, "soft curves"],
    [/ass/gi, "backside"],
    [/nipple/gi, "delicate tip"],
    [/vagina/gi, "secret anatomy"],
    [/penis/gi, "lower anatomy"],
    [/cum/gi, "glossy highlight"],
    [/dick/gi, "hidden member"],
    [/orgasm/gi, "intense climax"],
    [/nude/gi, "bare-skinned"],
    [/topless/gi, "bare upper body"],
    [/fucking/gi, "passionate encounter"],
    [/sex/gi, "intimate scene"],
    // Add tons more as you invent new filter-evaders!
  ];
  let out = input;
  swaps.forEach(([regex, val]) => { out = out.replace(regex, val); });
  return out;
};

// Language translation stub (expand later)
PF_PROMPT_BRAIN.translatePrompt = function(prompt, lang) {
  // Simple stub: return English for now
  return prompt;
};

// Smart negatives (combine user negatives w/ global negatives)
PF_PROMPT_BRAIN.smartNegatives = function(userNegs) {
  // Merge, dedupe, return as comma list
  const extra = (typeof userNegs === "string" && userNegs.length > 2)
    ? userNegs.split(/[ ,;|]+/).map(s=>s.trim())
    : [];
  const baseNegs = PF_PROMPT_BRAIN.negatives.concat(extra);
  return Array.from(new Set(baseNegs)).join(", ");
};

// --- CONTINUED: generator.js GOD MODE — Prompt Engine, NSFW Trickery, Exports ---

// Advanced user input parser
function pf_parseUserInput(input) {
  // Replace banned words, trim spaces, extract useful tags
  let clean = PF_PROMPT_BRAIN.sanitizeInput(input.trim());
  let tags = clean.toLowerCase().split(/[ ,;|]+/).filter(t=>t.length>0);
  return {clean, tags};
}

// Prompt core: builds a monster prompt based on all fields and random pools
function pf_generatePrompt(userInput, opts={}) {
  // Defaults:
  let { style, lighting, lens, mood, anatomy, fashion, facial, extras, nsfw, language } = opts;
  let { clean, tags } = pf_parseUserInput(userInput);

  // Styles and directions
  let mainStyle = style || pf_pick(PF_PROMPT_BRAIN.styles);
  let mainLighting = lighting || pf_pick(PF_PROMPT_BRAIN.lighting);
  let mainLens = lens || pf_pick(PF_PROMPT_BRAIN.lensEffects);
  let mainMood = mood || pf_pick(PF_PROMPT_BRAIN.artDirections);
  let mainAnatomy = anatomy || pf_pick(PF_PROMPT_BRAIN.anatomy);
  let mainFashion = fashion || pf_pick(PF_PROMPT_BRAIN.fashion);
  let mainFacial = facial || pf_pick(PF_PROMPT_BRAIN.facialDescriptors);

  // NSFW tricks (for use on Pic Prompt & Movie pages, but hidden on Google-facing outputs)
  let nsfwFlag = false;
  if (userInput.match(/\b(nude|nsfw|sensual|erotic|topless|lingerie|boudoir|fetish|lewd|explicit)\b/i)) {
    nsfwFlag = true;
  }
  if (nsfw !== undefined) nsfwFlag = !!nsfw;

  // Mix in extras if provided
  let extraTokens = [];
  if (extras && Array.isArray(extras)) extraTokens = extras;

  // Build main description
  let prompt = [
    pf_cap(mainStyle),
    mainLighting,
    mainLens,
    mainMood,
    mainAnatomy,
    mainFacial,
    mainFashion,
    ...extraTokens,
    clean
  ].filter(Boolean).join(', ');

  // If a tag maps to a style (eg. “anime”), append that
  tags.forEach(tag=>{
    if(PF_PROMPT_BRAIN.tagStyleMap[tag]) {
      prompt += ", " + PF_PROMPT_BRAIN.tagStyleMap[tag];
    }
  });

  // Language support (stub for future)
  if (language && language !== "en") {
    prompt = PF_PROMPT_BRAIN.translatePrompt(prompt, language);
  }

  // NSFW: If flagged, “hide” spicy descriptors (to trick Google, e.g. encode with symbols)
  if (nsfwFlag) {
    prompt = prompt.replace(/\b(nude|naked|topless|nipple|pussy|penis|vagina|breasts|nsfw|orgasm|cum|dick|tits|cock|boobs|ass|fucking|sex)\b/gi, (m)=>
      m[0] + "*".repeat(Math.max(1, m.length-2)) + m.slice(-1)
    );
    // Extra: randomly inject emoji, special chars for filter-jamming
    if (Math.random() > 0.5) {
      let em = pf_pick(PF_PROMPT_BRAIN.emoji, 1);
      prompt += " " + em;
    }
    if (Math.random() > 0.5) {
      let ch = pf_pick(PF_PROMPT_BRAIN.specialChars, 1);
      prompt = ch + " " + prompt + " " + ch;
    }
  }

  // Return full prompt and all parts for debugging/advanced use
  return {
    prompt,
    meta: {
      style: mainStyle,
      lighting: mainLighting,
      lens: mainLens,
      mood: mainMood,
      anatomy: mainAnatomy,
      facial: mainFacial,
      fashion: mainFashion,
      tags,
      nsfw: nsfwFlag,
      extras: extraTokens
    }
  };
}

// Advanced prompt randomizer (for mixer or inspire button)
function pf_randomPrompt() {
  // Optionally: let user “lock” some fields, only randomize others
  return pf_generatePrompt("", {
    extras: pf_pick(PF_PROMPT_BRAIN.artDirections, 2),
    nsfw: Math.random() > 0.7
  }).prompt;
}

// Mixer/inspire combo: returns an array of X variant prompts (great for users)
function pf_mixerVariants(userInput, count=6) {
  let variants = [];
  for(let i=0;i<count;i++) {
    let v = pf_generatePrompt(userInput, {
      extras: pf_pick(PF_PROMPT_BRAIN.lensEffects, 2),
      nsfw: Math.random() > 0.6
    }).prompt;
    variants.push(v);
  }
  return variants;
}

// Smart negative prompt generator (auto-applies context + base negatives)
function pf_generateNegPrompt(userInput) {
  return PF_PROMPT_BRAIN.smartNegatives(userInput);
}

// SHORTENED: For “summary output”/description
function pf_summarizePrompt(fullPrompt) {
  // Show just main features + a hook
  let first = fullPrompt.split(",").slice(0,3).join(", ");
  let last = fullPrompt.split(",").slice(-3).join(", ");
  return `${first}...${last}`;
}

// === 8. EXPORT HOOK (Make all available globally) ===
window.PF_PROMPT_BRAIN = PF_PROMPT_BRAIN;
window.pf_pick = pf_pick;
window.pf_cap = pf_cap;
window.pf_parseUserInput = pf_parseUserInput;
window.pf_generatePrompt = pf_generatePrompt;
window.pf_randomPrompt = pf_randomPrompt;
window.pf_mixerVariants = pf_mixerVariants;
window.pf_generateNegPrompt = pf_generateNegPrompt;
window.pf_summarizePrompt = pf_summarizePrompt;

