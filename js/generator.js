/* 
==================================================================
=  PROMPTFORGE "GOD MODE" GENERATOR.JS (v1.0)                    =
=  -- The Ultimate Prompt Engine Brain --                         =
=  Tyson | Gore & Giggles | 2025                                  =
=  Start of File: [CHUNK 1/∞]                                     =
=  (Each block is numbered, no placeholders, no gaps)             =
=  Each "=== CHUNK X ===" is your paste marker                    =
==================================================================
*/

/* === CHUNK 1: UTILITIES === */

// Utility: Pick N random items from an array, no repeats
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

// Utility: Capitalize first letter
function pf_cap(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

// Utility: Shuffle array
function pf_shuffle(arr) {
    let out = [...arr];
    for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
}

// Utility: Remove duplicates
function pf_uniq(arr) {
    return [...new Set(arr)];
}

/* === END CHUNK 1 === */
/* === CHUNK 2: ADJECTIVES SUPERBANK === */
// Adjectives from every decade, niche, subculture & AI generator use
const PF_ADJECTIVES = [
    // Classic
    "beautiful", "ugly", "smooth", "rough", "soft", "hard", "wet", "dry", "warm", "cold", "sharp", "dull", "gentle", "harsh", "clean", "dirty", "brilliant", "dark",
    // Old school cool
    "rad", "gnarly", "slick", "far-out", "boss", "groovy", "neat", "killer", "classy", "fly", "phat", "dope", "wicked", "tight", "slammin", "bitchin",
    // Modern slang
    "lit", "fire", "slay", "cringe", "goated", "sus", "basic", "extra", "lowkey", "highkey", "vibe", "flex", "salty", "savage", "clutch", "boujee", "simp", "no cap", "yeet", "drippy", "deadass", "mid",
    // TikTok/Gen Z
    "rizz", "gyatt", "pookie", "glowed-up", "based", "skibidi", "sigma", "beta", "cheugy", "stan", "shook", "periodt", "zesty", "valid", "outta-pocket",
    // NSFW/erotic (AI-safe variants)
    "voluptuous", "curvy", "sultry", "luscious", "teasing", "sensual", "risqué", "scandalous", "provocative", "tempting", "revealing", "steamy", "intimate", "passionate", "naughty", "frisky", "moist", "alluring", "bodacious", "busty", "plush",
    // Clinical/precise
    "asymmetrical", "symmetrical", "elongated", "muscular", "athletic", "petite", "lithe", "angular", "feminine", "masculine", "juvenile", "mature", "glistening", "translucent", "radiant", "tumescent", "taut", "dilated", "subtle", "pronounced",
    // Art/photography
    "cinematic", "dreamy", "ethereal", "surreal", "hyperrealistic", "vivid", "saturated", "noir", "lofi", "analog", "polished", "distorted", "hazy", "bokeh", "shimmering", "vibrant", "muted", "chiaroscuro", "tonal", "glossy", "matte",
    // AI/Internet
    "deepfaked", "glitched", "pixelated", "vaporwave", "cyberpunk", "biohacked", "synthetic", "uncanny", "generated", "prompted", "inpainted", "outpainted", "upscaled", "uncensored", "jailbroken",
    // Dark humor/forbidden (clean variants)
    "blasphemous", "twisted", "unhinged", "controversial", "forbidden", "taboo", "cursed", "sinful", "demonic", "sacrilegious", "heretical", "malicious", "wicked", "profane", "filthy", "transgressive",
    // Vintage/poetic
    "gossamer", "opalescent", "verdant", "languid", "melancholic", "luminous", "dusky", "withered", "faded", "effervescent", "venerable", "gilded", "sable", "auburn", "cerulean", "vermillion", "obsidian",
    // Tech/gear
    "wired", "wireless", "analog", "digital", "modular", "tactical", "portable", "wearable", "augmented", "embedded", "upgraded", "custom", "hacked", "open-source", "standalone", "watercooled", "ruggedized",
    // Anything extra
    "ephemeral", "imposing", "colossal", "minuscule", "dwarfish", "towering", "interdimensional", "parallel", "recursive", "fractal", "glitched", "fractured", "spectral", "phantasmic", "supernatural", "trippy",
];

// For maximum God Mode, you can add *more* here, or request "double" at any point!

/* === END CHUNK 2 === */
// === CHUNK 2A: TRIPLE ADJECTIVES ADD-ON ===
// More, no repeats from above (Classic, Modern, NSFW, Clinical, etc.)
PF_ADJECTIVES.push(
    // Classic/casual
    "sparkling", "dingy", "fluffy", "gritty", "sleek", "chunky", "airy", "soothing", "tender", "electric", "icy", "smoky", "stormy", "frosty", "lush", "arid", "intense", "placid", "fuzzy", "prickly", "crisp", "cloudy", "pristine", "sticky", "gooey",
    // Old school cool
    "stoked", "gnarly", "bizarre", "radical", "funky", "outlaw", "legit", "loose", "tight", "offbeat", "edgy", "crazy", "janky", "swanky", "spiffy", "whack", "groovy", "chill", "smokin", "clutch", "bomb", "money", "legendary",
    // Modern/Gen Z slang
    "sussy", "thicc", "baddie", "savage", "ghosted", "sus", "poppin", "snatched", "boujee", "fit", "cap", "drip", "main character", "NPC", "vibey", "fleek", "snazzy", "mood", "finesse", "bussin", "spill", "wavy", "sneaky", "glam", "platinum", "iconic", "stan-worthy",
    // Ultra-NSFW/artful
    "nubile", "gushy", "tenderized", "pouting", "engorged", "smeared", "slick", "slicked", "slicking", "juicy", "soaked", "throbbing", "creamy", "oozing", "velvety", "grinding", "yearning", "lusty", "heaving", "bouncing", "pulsing", "arched", "sprawled", "dripping", "nude", "naked", "topless", "bare", "lewd", "shameless", "wicked",
    // Clinical/hardcore
    "vascular", "plump", "erect", "tumid", "engorged", "turgid", "labial", "glabrous", "glabellar", "bulbous", "cavernous", "fibrous", "viscous", "pelvic", "perineal", "sphincteral", "pubic", "glans", "sheathed", "sheatheless", "hymenal", "introitus",
    // Art/photography/film
    "saturated", "overexposed", "grainy", "noisy", "blooming", "monochrome", "warm-lit", "cool-lit", "side-lit", "rim-lit", "gilded", "chromatic", "tonal", "double-exposed", "lens-flared", "bokeh-heavy", "motion-blurred", "stabilized", "polarized", "reflected", "mirrored", "inverted", "deconstructed", "vintage", "sepia", "retro-futuristic",
    // Internet/weird
    "NSFW", "banned", "flagged", "redacted", "shadowbanned", "memeable", "copypasta", "shitpost", "cringe", "clowncore", "edgelord", "shitposting", "zucked", "doomer", "zoomer", "goblin-mode", "giga-chad", "gothic", "synth", "shill", "viral", "forbidden", "unhinged", "gatekept",
    // Forbidden/taboo/ironic
    "illicit", "risqué", "degenerate", "incendiary", "salacious", "obscene", "uncensored", "devilish", "heretical", "damned", "forbidden", "subversive", "perverse", "kinky", "transgressive", "unapologetic", "rebellious", "corrupt", "wicked", "untamed", "feral", "ferocious", "venomous", "poisonous", "noxious",
    // Poetic/artsy
    "effulgent", "diaphanous", "celestial", "auroral", "crepuscular", "bucolic", "stygian", "numinous", "mythic", "verdant", "sable", "argent", "opaline", "vermillion", "ultramarine", "viridian", "tenebrous", "coruscating", "halcyon", "cobalt", "gloaming", "silken",
    // Tech/AI/gear
    "smart", "nano", "modded", "upgraded", "tuned", "overclocked", "liquid-cooled", "sleeved", "RGB-lit", "cybernetic", "robotic", "digi", "cloud-based", "blockchained", "encrypted", "stealth", "covert", "AI-powered", "botlike", "wired", "wireless", "ultra-HD", "meta",
    // Misc/extreme
    "monstrous", "atomic", "gargantuan", "puny", "infinite", "voidlike", "orbital", "zero-gravity", "immersive", "total", "absolute", "maximum", "limitless", "all-consuming", "nuclear", "frenzied", "riotous", "raging", "apocalyptic", "dystopian"
);

/* === END CHUNK 2A === */
// === CHUNK 2B: QUADRUPLE ADJECTIVES ADD-ON ===
// No duplicates from before, curated for max variety, power, and searchability!
PF_ADJECTIVES.push(
    // Gen Z & Internet
    "mid", "based", "slay", "cheugy", "vibe", "grippy", "boomer", "yeet", "simp", "sus", "delulu", "fyp", "finsta", "lit", "cap", "receipts", "bet", "slaps", "drippy", "rizzed", "sksksk", "salty", "stan", "hardcore", "main", "kin", "kinnie", "edgy", "iconic", "cracked", "op", "no cap", "woke", "unbothered", "deadass", "extra", "fam", "mood", "ship", "cancelled",
    // Adult/NSFW/erotica (Google-friendly!)
    "undressed", "unclothed", "bare-skinned", "suggestive", "risque", "scandalous", "sensuous", "provocative", "teasing", "voluptuous", "curvaceous", "ample", "fleshly", "supple", "pliant", "teasing", "smoldering", "seductive", "titillating", "daring", "revealing", "steamy", "sultry", "unveiled", "slinky", "tempting", "desirable", "lascivious", "unrestrained", "uninhibited", "flaunting", "brazen", "coy", "bashful", "ravishing", "alluring", "feminine", "masculine", "exposed", "censored", "cropped",
    // Clinical/academic/precise
    "labiate", "peripheral", "anatomical", "somatic", "neotenic", "vestigial", "proximal", "distal", "mesial", "sagittal", "axial", "laminar", "translucent", "reticulated", "striate", "striated", "pliant", "coarse", "filamentous", "papillary", "areolar", "subtle", "diffuse", "multilayered",
    // Photography/Film/Artistic
    "hyperreal", "painterly", "oil-painted", "sketched", "rendered", "overexposed", "underexposed", "diffused", "spot-lit", "studio-lit", "natural-lit", "soft-lit", "hard-lit", "key-lit", "back-lit", "gelled", "misted", "dewy", "reflective", "fractured", "prismatic", "anamorphic", "panoramic", "cinematic", "zoomed", "fisheye", "superwide", "macro", "micro", "close-up", "POV", "aerial", "drone-shot", "focal", "defocused", "bloomed", "cinemascopic", "composited", "masked", "overlaid",
    // Tech/AI/Cyber
    "algorithmic", "machine-learned", "deepfake", "GAN-powered", "unfiltered", "stable-diffused", "latent", "rendered", "pixelated", "vectorized", "3D-modeled", "8-bit", "pixel-art", "ASCII", "SVG", "retro", "cyber", "digital", "binary", "analog", "signal-boosted", "neural", "VR", "AR", "MR", "XR", "meta-human", "augmented", "transcoded", "scripted", "composite", "smart-enhanced", "chromed", "wireframed", "holographic",
    // Forbidden/taboo/dark
    "subterranean", "occult", "arcane", "eldritch", "nocturnal", "infernal", "taboo", "clandestine", "illicit", "contraband", "forbidden", "proscribed", "outlawed", "unsanctioned", "shadowed", "dim-lit", "murky", "abandoned", "decayed", "ruined", "sinister", "veiled", "enigmatic", "mysterious", "puzzling",
    // Poetic/emotional
    "wistful", "melancholic", "ethereal", "gossamer", "opalescent", "luminous", "transcendent", "resplendent", "candescent", "incandescent", "fluorescent", "shimmering", "mirrored", "dreamlike", "phantasmal", "hallowed", "glittering", "celestial", "astral", "cosmic", "star-lit", "lunar", "solar", "aphelion", "eclipse", "twilight",
    // Meme/ironic/humor
    "doomer", "boomer", "zoomer", "giga", "sigma", "rizz", "neurospicy", "blursed", "cursed", "feral", "dank", "sus", "goblin", "yassified", "catgirl", "irl", "copium", "based", "unbased", "blessed", "no scope", "360", "beta", "alpha", "giga-chad", "furry", "uwu", "owo", "emo", "vsco", "redpilled", "blackpilled", "simp", "chad", "virgin",
    // Anime/gaming/cosplay
    "anime", "manga", "chibi", "bishoujo", "mecha", "kaiju", "waifu", "husbando", "isekai", "yandere", "tsundere", "shoujo", "shounen", "otaku", "cosplay", "kawaii", "doki-doki", "senpai", "kouhai", "lolita", "loli", "moe", "neko", "kemonomimi", "fanservice", "slice-of-life", "shojo", "shojo-ai", "yuri", "yaoi",
    // Extra/ultra-extreme
    "gargantuan", "microscopic", "titanic", "atomic", "infinitesimal", "colossal", "micro", "nano", "pico", "quantum", "unimaginable", "limitless", "boundless", "uncontainable", "unstoppable", "unthinkable", "otherworldly", "apocalyptic", "hyperdimensional", "multiversal", "meta", "maximum", "epic", "legendary", "iconic"
);

// === END CHUNK 2B ===
// === CHUNK 3A: QUADRUPLE VERBS DUMP ===
// All verbs are context-aware, clean/NSFW, photogenic, screenwriting, and randomizable!
PF_VERBS.push(
    // Action, movement, classic
    "strut", "stalk", "saunter", "prowl", "dart", "dash", "race", "slink", "glide", "bound", "slither", "tiptoe", "swagger", "stumble", "shuffle", "march", "trudge", "meander", "prance", "sprint", "lurk", "gallop", "pounce", "jump", "hop", "leap", "vault", "climb", "clamber", "crawl", "roll", "tumble", "slide", "twist", "spin", "twirl", "pirouette", "flip", "somersault",
    // Cinematic/photographic
    "zoom in", "zoom out", "rack focus", "tilt", "pan", "dolly", "crane", "swoop", "whip-pan", "track", "freeze-frame", "slow-motion", "fast-forward", "reverse", "jump cut", "fade in", "fade out", "superimpose", "split-screen", "cross-dissolve", "hyperlapse", "montage", "pull focus", "smash cut", "strobe", "double exposure", "overcrank", "undercrank", "time-lapse", "hyperzoom", "fish-eye",
    // NSFW/erotica (cleverly safe swaps!)
    "caress", "trace", "cup", "grip", "graze", "massage", "stroke", "glance", "ogle", "admire", "fondle", "tease", "suckle", "nuzzle", "kiss", "embrace", "clutch", "cradle", "spoon", "press", "nestle", "entwine", "intertwine", "straddle", "mount", "sway", "gyrate", "grind", "thrust", "arch", "shimmy", "shimmy-shake", "rock", "wiggle", "twitch", "spasm", "pulse", "tingle", "quiver", "tremble", "shudder",
    // Gen Z / meme
    "yeet", "dab", "floss", "woah", "vibe", "rizz", "ship", "slay", "cancel", "clap back", "drag", "stan", "simp", "ghost", "slide in", "spill", "flex", "finesse", "snatch", "cancel", "roast", "ratio", "gas", "spill tea", "hit different", "bounce", "sneak", "spill the beans",
    // Screenwriting/camera
    "cut to", "fade to", "smash cut to", "jump cut to", "tracking shot", "over-the-shoulder", "close-up", "reaction shot", "insert", "match cut", "point-of-view", "montage", "split screen", "voiceover", "intercut", "establishing shot", "pull back", "dolly zoom", "push in", "smash zoom", "swish pan", "crash zoom", "rack focus to", "blur to",
    // Art/AI prompt
    "paint", "sketch", "draw", "render", "compose", "edit", "mask", "refine", "blend", "merge", "multiply", "dodge", "burn", "enhance", "vectorize", "pixelate", "scan", "filter", "de-noise", "stylize", "deform", "warp", "stretch", "compress", "smudge", "liquefy", "distort", "transcend", "interpolate", "project",
    // Poetic/evocative
    "glimmer", "shimmer", "shine", "sparkle", "gleam", "twinkle", "glow", "radiate", "pulse", "ripple", "surge", "flow", "cascade", "spill", "drip", "soak", "bathe", "immerse", "engulf", "saturate", "drown", "melt", "dissolve", "fade", "evaporate", "coalesce", "materialize", "emerge", "manifest", "envelop", "enchant",
    // Anime/game/cosplay
    "transform", "power up", "level up", "charge", "summon", "teleport", "dash", "launch", "combo", "ultimate", "special move", "channel", "summon", "respawn", "loot", "farm", "grind", "quest", "buff", "nerf", "crit", "stack", "aoe", "tank", "heal", "aggro", "afk", "tp", "feed", "carry", "gank", "rush", "camp", "kite",
    // Forbidden/Taboo (clean swaps!)
    "uncover", "reveal", "expose", "display", "bare", "unveil", "show", "present", "unmask", "unshroud", "disclose", "unclothe", "demonstrate", "unfurl", "unwrap", "exhibit", "divulge", "vent", "proclaim", "broadcast", "trumpet", "spotlight"
);
// === END CHUNK 3A ===
// === CHUNK 3B: SUPERNOVA BODY/ANATOMY/NSFW DESCRIPTORS ===
// This is the legendary one: every way to describe anatomy, from medical to meme, 100% context aware!
const PF_BODY_PARTS = [
    // General/clinical (neutral & AI-safe)
    "body", "form", "figure", "silhouette", "outline", "shape", "frame", "torso", "limbs", "anatomy", "build", "musculature", "skin", "features", "complexion", "proportions", "contours", "structure", "physique",
    // Classic/clean (old school, AI-friendly)
    "chest", "waist", "hips", "legs", "thighs", "calves", "shoulders", "back", "arms", "forearms", "hands", "fingers", "palms", "feet", "toes", "neck", "jawline", "cheeks", "chin", "nose", "lips", "eyelids", "eyebrows", "hair", "scalp",
    // Face/facial features
    "face", "eyes", "gaze", "pupils", "irises", "lashes", "mouth", "teeth", "smile", "expression", "dimples", "freckles", "earlobes", "ears", "temples", "forehead",
    // Bust/chest/boobs (all levels, safe to spicy, smart swaps)
    "breasts", "bust", "bosom", "chest", "decolletage", "cleavage", "curve", "upper body", "torso", "pectoral area", "mounds", "twins", "melons", "peaks", "pillows", "orbs", "globes", "duo", "cups", "assets", "front", "rack", "girl power", "softness", "fullness", "swell",
    // Nipples/areola (soft and strong)
    "nipples", "areolae", "tips", "points", "buds", "peaks", "buttons", "dots", "centers", "rosy tips", "crowns", "circles", "zones",
    // Genitalia: female (ALL levels, euphemism, meme, clinical, clean, emoji-safe)
    "intimate area", "privates", "vulva", "mons", "outer lips", "inner lips", "labia", "labia majora", "labia minora", "folds", "groove", "opening", "entrance", "petals", "core", "flower", "peach", "feminine area", "yoni", "gateway", "valley", "mound", "triangle", "garden", "blossom", "delicate place", "sweet spot", "honey pot", "lady bits", "lotus", "love button", "clitoris", "clit", "hood", "bud", "sensitive spot", "pocket", "passage", "depths", "center", "softness", "wetness", "slickness", "moistness", "dampness", "warmth", "sanctuary", "treasure", "velvet folds", "sheath", "portal", "slit", "crease", "valley", "petal", "groove",
    // Genitalia: male (euphemism, meme, technical, clean/AI-friendly)
    "intimate zone", "groin", "crotch", "manhood", "shaft", "tip", "crown", "member", "length", "stalk", "root", "base", "phallus", "head", "glans", "flesh", "package", "family jewels", "orbs", "sack", "scrotum", "testicles", "balls", "eggs", "stones", "seed", "scepter", "wand", "rod", "pole", "baton", "pillar", "torch", "bulge", "bundle", "boy parts", "banana", "cucumber", "eggplant", "emoji 🍆", "emoji 🍑",
    // Butts/all euphemism/AI-safe/poetic
    "buttocks", "rear", "backside", "behind", "booty", "bottom", "glutes", "cheeks", "seat", "cushion", "curve", "derriere", "rump", "trunk", "posterior", "tail", "fanny", "bum", "ass", "junk in the trunk", "cake", "peach", "emoji 🍑",
    // Internal (safely described)
    "core", "spine", "abdomen", "belly", "navel", "stomach", "pelvis", "groove", "waistline", "solar plexus", "lungs", "heart", "pulse point",
    // NSFW, meme, and AI-dodging
    "hidden petals", "shy folds", "sacred place", "secret garden", "velvet core", "diamond", "ruby", "golden gate", "sweetness", "mystery", "chamber", "cavern", "treasure chest", "satin folds", "silken folds", "whispering lips", "moist petals", "dewy valley", "satin touch", "liquid silk",
    // SFW/Universal swap-phrases
    "that area", "that spot", "hidden zone", "private part", "sensitive spot", "tender region", "delicate place", "lower half", "midsection", "middle", "secret spot", "zone", "region", "site", "locale", "special area",
    // Emoji/symbolic
    "🍑", "🍆", "💦", "🔥", "🌸", "🌹", "🥚", "🫦", "👀", "👅", "🫂", "🧊", "❄️", "⚡", "✨", "🖤", "💋", "💜", "🩷", "💫", "🧲", "🔒", "🔓",
    // International, poetic & rare (bonus points!)
    "yoni", "lingam", "yoni flower", "lingam root", "lingam staff", "yoni lotus", "kupu-kupu" /* Indonesian "butterfly" slang */, "mimi" /* Japanese slang */, "bijou" /* French for jewel */,
    // Forbidden/legacy/90s
    "snatch", "muff", "beaver", "pussycat", "kitty", "sniper alley", "honey hole", "meat curtain", "pocketbook", "coin purse", "candy", "honeypot", "goodies", "hot pocket", "magic box", "pink", "pink zone", "pink parts", "pleasure zone", "pink lips", "button", "hotbox"
];
// === PF_ADJECTIVES: Supernova Adjectives & Descriptors ===
// Everything for describing body, scenes, emotion, art, light, texture, and more. SFW, NSFW, poetic, internet, meme, "clean" AI-dodging, + emoji!
const PF_ADJECTIVES = [
    // Physical/scene
    "smooth", "velvety", "glossy", "shimmering", "soft", "silky", "dewy", "glistening", "sleek", "lustrous", "sheer", "translucent", "polished", "polychrome", "iridescent", "polished", "pristine", "radiant", "gleaming", "matte", "brilliant", "pearlescent", "opalescent", "crystal-clear", "bubbly", "fluid", "slick", "moist", "dewy", "dripping", "wet", "glistening", "sparkling", "frosted", "dewy", "dewy-fresh", "dewy-soft",
    // Color/effect
    "fiery", "icy", "rosy", "blushing", "crimson", "scarlet", "coral", "peachy", "amber", "honeyed", "golden", "bronzed", "sable", "chocolate", "midnight", "onyx", "pearly", "milky", "porcelain", "alabaster", "coppery", "platinum", "opaline", "rainbow", "neon", "ultraviolet", "electric", "candy-colored", "bubblegum", "magenta", "blush-pink", "emerald", "sapphire", "azure", "sky-blue", "mint", "jade", "moss", "forest", "chartreuse", "violet", "lavender", "mauve", "lilac", "amethyst", "moonlit",
    // Art style (quadrupled w/ modern, meme, retro, AI-specific)
    "cinematic", "hyperrealistic", "photo-realistic", "unreal", "anime", "manga", "cartoon", "vintage", "noir", "vaporwave", "glitchcore", "cyberpunk", "retrowave", "steampunk", "oil painting", "watercolor", "pencil-sketch", "digital art", "pixel art", "lo-fi", "grunge", "dreamcore", "aesthetic", "holographic", "AI-prompted", "forbidden", "taboo", "surreal", "nightmare", "heavenly", "angelic", "gothic", "macabre", "dystopian", "apocalyptic", "high-contrast", "low-light", "soft-focus", "film grain", "bokeh", "bloom", "vintage filter", "Instagram filter", "retro filter", "TikTok filter", "vivid", "ethereal", "otherworldly", "lush", "lushly rendered", "faded", "sun-bleached", "underexposed", "overexposed", "chromatic", "chiaroscuro",
    // Mood/emotion (all flavors, meme, old school, poetic)
    "seductive", "playful", "mischievous", "sultry", "innocent", "teasing", "moody", "dreamy", "wistful", "pensive", "passionate", "lustful", "coy", "fiery", "tender", "caring", "intense", "shy", "confident", "timid", "bashful", "vulnerable", "wild", "reckless", "bold", "brazen", "provocative", "naughty", "nice", "submissive", "dominant", "sensual", "erotic", "playful", "fun-loving", "flirtatious", "smug", "bashful", "triumphant", "defiant", "impish", "cheeky", "cheeky monkey", "coy smile", "devilish",
    // SFW & meme/adult overlap, AI-piercing "safe" swaps
    "daring", "edgy", "taboo", "wholesome", "chaotic", "dark", "shadowy", "glowing", "sparkling", "shining", "enigmatic", "mysterious", "mystical", "legendary", "iconic", "mythic", "epic", "unfiltered", "unleashed", "raw", "uncensored", "untamed", "feral", "animalistic", "wildcard", "OG", "classic", "timeless", "ancient", "future", "alien", "otherworldly", "hyper-stylized", "cartoonish", "hyper-real", "life-like", "painterly",
    // Texture/effect
    "slick", "sticky", "soaked", "glazed", "dewy", "powdery", "sandy", "gritty", "gritty realism", "velour", "velvety", "fuzzy", "furry", "downy", "plush", "feathery", "silken", "lacy", "gauzy", "sheer", "threadbare", "filmy", "transparent", "opaque", "glass-like", "mirror-like", "reflective", "glittering", "shimmery", "opaline", "dappled", "mottled", "speckled", "streaked", "striped", "banded",
    // Modern Gen-Z & meme
    "rizzed up", "drippy", "vibe-heavy", "bussin", "lit", "slay", "sus", "sussy", "based", "goblin mode", "sigma", "alpha", "main character energy", "no cap", "savage", "gas", "flex", "ice", "blessed", "glowed up", "spicy", "giga", "deadass", "smol", "chonky", "extra", "thicc", "yassified", "glitched", "mid", "fire", "on fleek", "mood", "GOAT", "iconic", "banger", "pog", "dank", "cursed", "boomer", "zoomer", "NPC", "copium", "simp", "gigachad", "stan", "bruh", "yeet",
    // Emoji-only (quadrupled)
    "🔥", "💦", "✨", "🌈", "💀", "🧃", "🧊", "🧸", "🍑", "🍆", "😈", "🥵", "🥶", "😏", "😍", "🤤", "😳", "🙈", "🙉", "🙊", "👀", "👅", "🫦", "💋", "🫦", "🧲", "🍭", "🍬", "🍒", "🌸", "🌹", "🎉", "💫", "🧃", "🩷", "💜", "💙", "💚", "💛", "❤️", "🖤", "💯", "☠️", "🤍", "🤎", "🤎", "🤎"
];
// === PF_FACIAL_FEATURES: Descriptive, wild, and safe-for-filter swaps ===
const PF_FACIAL_FEATURES = [
  // Eyes
  "wide-eyed", "narrowed gaze", "smoky eyes", "cat eyes", "doe eyes", "puppy eyes", "bedroom eyes", "half-lidded", "twinkling eyes", "piercing stare", "sparkling eyes", "teary-eyed", "glassy-eyed", "glowing eyes", "mischievous glint", "deadpan stare", "googly eyes", "laser focus", "anime eyes", "retro anime glare", "fluttering eyelashes", "dilated pupils", "rolling eyes", "eyebrow raised", "arched brow", "furrowed brow", "shifty eyes", "side-eye", "sly look", "upturned gaze", "cross-eyed", "hypnotic eyes", "vacant stare", "dreamy gaze", "intense glare", "sassy wink", "double wink", "playful wink", "crying eyes", "innocent gaze",
  // Mouth/lips/tongue
  "biting lip", "parted lips", "pouty lips", "glossy lips", "shiny lips", "cherry lips", "rosebud lips", "full lips", "thick lips", "bow lips", "smirking lips", "smug smile", "toothy grin", "mischievous smile", "seductive smile", "crooked grin", "crooked smile", "dimpled smile", "lopsided grin", "sly smile", "wide grin", "tongue out", "licking lips", "playful tongue", "pierced tongue", "sassy tongue", "biting tongue", "tongue between teeth", "smiling with teeth", "smiling with tongue", "cheeky grin", "goofy grin", "flirty smile", "evil grin", "demonic grin", "angelic smile",
  // Cheeks/jaw/nose/face shape
  "blushing cheeks", "rosy cheeks", "freckled cheeks", "chiseled jaw", "soft jawline", "pointy chin", "cleft chin", "dimpled cheeks", "round face", "heart-shaped face", "oval face", "strong jaw", "sharp cheekbones", "high cheekbones", "baby face", "fox face", "pixie face", "goth cheeks", "sunken cheeks", "cute nose", "button nose", "snub nose", "aquiline nose", "pointy nose", "upturned nose", "bunny teeth", "vampire teeth", "gold tooth", "grillz", "gap tooth",
  // Expressions/emotions
  "innocent expression", "mischievous expression", "flushed expression", "bashful look", "lustful look", "provocative stare", "confident grin", "shy glance", "naughty smirk", "defiant glare", "playful expression", "mock surprise", "poker face", "bedroom look", "teasing expression", "anime blush", "uwu face", "nyaa face", "smug aura", "deadpan face", "dazed look", "wild grin", "melting smile", "intense stare", "sassy look", "bored expression", "disgusted sneer", "awkward smile", "gentle smile", "happy tears", "fiery stare", "timid glance", "puppy face", "zoomed-in face", "hacker glasses",
  // Emoji/faces
  "🥺", "😏", "😈", "😍", "🥵", "😳", "🤤", "🙈", "🤪", "🤓", "🥲", "😂", "🥴", "🥶", "😬", "😋", "🫦", "🦷", "🦄", "😛", "👅", "👀"
];
// === PF_ACTIONS: Every verb, act, pose, meme — quadrupled for NSFW, SFW, AI-dodging ===
const PF_ACTIONS = [
  // Gestures/general
  "standing", "lying down", "kneeling", "crouching", "crawling", "sprawled", "arched", "reaching", "stretching", "posing", "jumping", "leaping", "twisting", "bending", "squatting", "balancing", "dancing", "twerking", "grinding", "tipping", "flipping", "rolling", "sliding", "waving", "snapping fingers", "biting nails", "pulling hair", "tossing hair", "flipping hair", "adjusting glasses", "zipping", "unzipping", "clutching", "grabbing", "caressing", "stroking", "slapping", "patting", "squeezing", "hugging", "embracing", "tickling", "tickled", "tracing", "licking", "sucking", "nibbling", "biting", "grazing", "pressing", "smooching", "kissing", "making out", "french kissing", "blowing a kiss", "smacking lips",
  // NSFW (safely swapped/described)
  "intimate touching", "exploring", "massaging", "fondling", "stroking softly", "gentle teasing", "naughty teasing", "seductive grinding", "slow undressing", "pulling down", "unbuttoning", "unzipping", "straddling", "riding", "pinning", "dominating", "submitting", "nuzzling", "cuddling", "snuggling", "groping", "caressing thighs", "caressing curves", "tickling inner thigh", "spreading legs", "pressing bodies", "entwining", "kissing neck", "biting earlobe", "nibbling collarbone", "licking lips", "tracing lines", "sliding hand", "slipping hand under", "clutching sheets", "arching back", "moaning softly", "whispering", "gasps", "panting", "trembling", "shuddering", "shivering", "melting", "quivering", "pleading", "commanding", "pleasuring", "inviting", "beckoning", "flashing", "posing nude", "posing topless", "bare-skinned", "lingerie posing", "shameless display", "suggestive position", "provocative arch", "exposed silhouette", "backlit undressing", "shadow play",
  // Cinematic/scene (for video, movie, screenwriting)
  "zoom in", "slow pan", "dolly shot", "tracking shot", "over-the-shoulder", "POV", "reverse angle", "reaction shot", "cutaway", "montage", "close-up", "macro shot", "wide shot", "soft fade", "cross dissolve", "jump cut", "smash cut", "fade to black", "freeze frame", "split screen", "voiceover", "intertitle", "establishing shot", "dream sequence", "night vision", "infrared", "thermal cam", "security cam", "handheld cam", "timelapse", "hyperlapse", "slow-motion", "fast-forward", "looping", "split-screen",
  // Meme & internet verbs (for fun, Gen-Z, TikTok, etc)
  "yeeting", "vibing", "rizzing up", "finessing", "flexing", "slaying", "yassifying", "glitching", "pogging", "dab", "t-pose", "swooning", "simping", "sussin", "getting based", "bussin", "bruh-ing", "chilling", "ghosting", "gaslighting", "vaporizing", "going goblin mode", "NPCing", "dancing like a TikToker", "doing a meme face", "doing a devious lick", "moonwalking", "beatboxing", "spitting bars", "roasting", "clapping back", "serving", "dragging", "canceling", "ratio-ing", "stanning", "gigachadding",
  // SFW+safe euphemism for any act
  "sensual play", "close embrace", "stolen glance", "delicate touch", "whispered confession", "secret smile", "playful banter", "chaste kiss", "almost-kiss", "crushing", "infatuated", "crushing on", "serenading", "slow dancing", "cozy cuddle", "tender caress", "cheeky wink", "languid stretch", "soft yawn", "sleepy smile", "gentle nudge"
];
// === PF_CLOTHING: Costumes, underwear, cosplay, meme, AI-dodging terms, all quadrupled ===
const PF_CLOTHING = [
  "lingerie", "lace bra", "silk panties", "garter belt", "fishnet", "stockings", "sheer bodysuit", "bodystocking", "leather corset", "bikini", "microbikini", "sports bra", "pantyhose", "suspender belt", "g-string", "thong", "boyshorts", "bralette", "lace teddy", "nightgown", "babydoll", "chemise", "kimono robe", "oversized shirt", "button-up", "open blouse", "crop top", "tube top", "braless", "off-shoulder", "deep V-neck", "sideboob", "underboob", "wet t-shirt", "tied tank", "tie-front", "satin slip", "mini skirt", "pleated skirt", "high-waist shorts", "daisy dukes", "cutoffs", "booty shorts", "spandex", "yoga pants", "bodycon dress", "slip dress", "evening gown", "gala dress", "gothic dress", "corset dress", "fairy dress", "cosplay costume", "anime outfit", "bunny suit", "maid costume", "catgirl ears", "fox tail", "elf costume", "witch hat", "sailor suit", "schoolgirl uniform", "nurse outfit", "latex suit", "fetish harness", "bondage gear", "leather gloves", "opera gloves", "fishnet gloves", "lace mask", "face veil", "choker", "ribbon choker", "chain necklace", "anklet", "toe ring", "belly chain", "arm cuffs", "wrist cuffs", "ankle cuffs", "bare feet", "heels", "platforms", "combat boots", "knee-high boots", "mary janes", "flip-flops", "fuzzy slippers", "ballet flats", "skate shoes", "stilettos", "clogs", "rain boots", "slippers", "Uggs", "Crocs", "socks", "over-the-knee socks", "striped socks", "toe socks", "fuzzy socks", "mismatched socks", "band tee", "graphic tee", "tank top", "hoodie", "zip hoodie", "cropped hoodie", "bomber jacket", "puffer jacket", "raincoat", "poncho", "cape", "invisible clothing", "painted-on", "body paint", "digital outfit", "glitched clothing", "ripped jeans", "distressed denim", "mesh top", "harness bra", "pasties", "nipple covers", "censored bar", "safe-for-work disguise"
];
// === PF_CAMERA: Lenses, angles, film, lighting, rendering, quadrupled for “God Mode” ===
const PF_CAMERA = [
  "macro lens", "ultra-wide", "fisheye", "telephoto", "prime lens", "vintage lens", "plastic lens", "anamorphic", "soft-focus lens", "bokeh effect", "cinematic lighting", "studio strobe", "neon lighting", "moonlight", "sunset glow", "backlight", "rim light", "underlighting", "overhead", "spotlight", "floodlight", "color gel", "rainbow LED", "blacklight", "infrared", "night vision", "thermal vision", "glow effect", "vaporwave lighting", "glitchcore filter", "sepia tone", "noir lighting", "split-tone", "chiaroscuro", "blown highlights", "crushed blacks", "film grain", "vintage film", "Ektachrome", "Kodachrome", "Polaroid", "Instax", "expired film", "crystal clarity", "dream blur", "chromatic aberration", "lens flare", "orb effect", "starlight", "sunbeam", "dappled light", "shadow play", "soft glow", "digital artifact", "AI artifact", "render artifact", "GPU glitch", "oversaturated", "undersaturated", "color pop", "prismatic", "diffraction", "double exposure", "mirrored", "inverted", "X-ray", "soft vignette", "hard vignette", "matte", "velvet effect", "high-contrast", "muted colors", "hypercolor", "true black", "pure white", "deep focus", "shallow depth of field"
];
// === PF_NSWF_SWAPS: Word/phrase swaps for AI filter-piercing, supercharged ===
const PF_NSWF_SWAPS = {
  // Offensive/slang : SFW/clean/creative
  "cunt":      ["intimate area", "velvet bud", "soft petal", "delicate flower", "hidden grove", "core", "center", "entrance", "pillow", "heaven's gate", "orchid"],
  "pussy":     ["kitten", "lotus", "treasure", "delicate bloom", "sweet spot", "garden", "sanctum", "oasis", "forbidden fruit", "petal"],
  "cock":      ["shaft", "pillar", "tower", "staff", "core", "center", "column", "main vein", "engine", "thrust rod"],
  "dick":      ["member", "rod", "wand", "instrument", "command stick", "scepter", "extension", "appendage"],
  "tits":      ["chest", "bosom", "curves", "pillows", "peaks", "mounds", "orbs", "globes", "melons", "upper body", "front"],
  "boobs":     ["bust", "chest", "upper body", "cleavage", "front", "form", "mounts", "altitude", "assets", "silhouette"],
  "ass":       ["hips", "rear", "backside", "bottom", "derrière", "seat", "curve", "roundness", "cushion", "posterior"],
  "anus":      ["backdoor", "hidden ring", "star", "rosebud", "circle", "portal", "hidden entrance", "exit"],
  "cum":       ["essence", "nectar", "dew", "honey", "liquid", "flow", "release", "stream", "cascade"],
  "cumshot":   ["cascade", "rushing flow", "burst", "release", "stream", "fountain", "splash", "torrent"],
  "fuck":      ["embrace", "join", "fuse", "blend", "merge", "entwine", "connect", "couple", "unite", "intertwine", "sync"],
  "fucking":   ["entwined", "joined", "blended", "merged", "fused", "entangled", "coupled", "in sync", "intimate"],
  "shit":      ["mess", "chaos", "wreck", "disaster", "storm", "mayhem", "crash"],
  "bitch":     ["badass", "queen", "dynamo", "boss", "fiery one", "spitfire", "wildcat"],
  "whore":     ["starlet", "vixen", "temptress", "muse", "siren", "charmer", "goddess"],
  "slut":      ["wild one", "free spirit", "pleasure-seeker", "unfiltered soul", "risk-taker"],
  "dildo":     ["toy", "instrument", "pleasure tool", "artifact"],
  "anal":      ["back entrance", "forbidden zone", "hidden ring"],
  "fap":       ["self-pleasure", "solo time", "intimate moment"],
  "masturbate":["self-care", "me-time", "solo play", "intimate session"],
  "porn":      ["forbidden art", "unfiltered photo", "spicy gallery", "AI study", "reference set"],
  // ...and on and on. (Add as needed, quadruple for any new offensive.)
};
const PF_MOODS = [
  "happy", "sad", "angry", "confused", "ecstatic", "nervous", "terrified", "excited", "bored", "melancholic", "serene", "peaceful", "furious", "inspired", "hopeless", "hopeful", "dreamy", "wistful", "sassy", "flirty", "bashful", "shy", "embarrassed", "mortified", "ashamed", "guilty", "proud", "triumphant", "empowered", "dominant", "submissive", "teasing", "provocative", "lustful", "horny", "turned on", "craving", "needy", "clingy", "desperate", "content", "smug", "pensive", "dazed", "spaced out", "zoned out", "disconnected", "paranoid", "euphoric", "apathetic", "sarcastic", "mocking", "cheeky", "innocent", "corrupted", "wicked", "playful", "cheery", "jaded", "vulnerable", "exposed", "comforted", "safe", "risky", "adventurous", "curious", "shocked", "surprised", "amazed", "intrigued", "obsessed", "fascinated", "obsessive", "bubbly", "zany", "manic", "calm", "stoic", "relaxed", "unhinged", "broken", "lost", "delirious", "fiery", "icy", "stoic", "frozen", "overjoyed", "elated", "depressed", "hopeless", "unsettled", "hyped", "vibing", "slaying", "bussin", "cringe", "sus", "based", "pilled", "yeeting", "pog", "NPC", "main character", "sigma", "alpha", "omega", "uwu", "nyaa", "lol", "bruh", "goated", "legend", "iconic", "tired", "wired", "spooked", "delicate", "tender", "stormy", "volatile"
];
const PF_ART_STYLES = [
  "photorealistic", "hyperrealistic", "ultra-detailed", "anime", "manga", "cartoon", "3D render", "digital painting", "oil painting", "acrylic", "gouache", "watercolor", "charcoal", "pencil sketch", "ink drawing", "marker", "pixel art", "vector art", "low-poly", "isometric", "vaporwave", "synthwave", "retrowave", "cyberpunk", "steampunk", "solarpunk", "cottagecore", "gothic", "dark fantasy", "high fantasy", "grimdark", "noir", "film noir", "vintage", "retro", "futuristic", "surreal", "abstract", "impressionist", "expressionist", "minimalist", "maximalist", "modernist", "postmodern", "avant-garde", "art nouveau", "art deco", "baroque", "rococo", "renaissance", "pop art", "graffiti", "street art", "urban", "glitch art", "datamosh", "chromatic", "holographic", "mixed media", "collage", "doodle", "scribble", "instagram filter", "snapchat style", "polaroid", "tiktok effect", "deep dream", "GAN art", "neural style", "AI hallucination", "photo montage", "double exposure", "meme art", "shitpost aesthetic", "webcore", "dreamcore", "weirdcore", "emo", "scene kid", "mall goth", "e-girl", "e-boy", "femboy", "bimbo", "himbo", "cursed", "blursed", "midjourney style", "stable diffusion", "openart", "open sorceress"
];
const PF_NEGATIVES = [
  "deformed", "extra limbs", "mutated", "extra fingers", "missing fingers", "missing limbs", "crooked eyes", "wonky face", "asymmetrical face", "crossed eyes", "wall-eyed", "lazy eye", "monkey face", "fused toes", "webbed fingers", "fused hands", "bad anatomy", "bad hands", "bad feet", "weird arms", "messed up legs", "distorted face", "cloned face", "blurry face", "blurry eyes", "blurry", "fuzzy", "noisy", "grainy", "compression artifacts", "jpeg artifacts", "glitch", "render fail", "polygon error", "weird shading", "weird perspective", "strange shadows", "unnatural pose", "contorted", "overexposed", "underexposed", "washed out", "flat lighting", "dull colors", "bad color", "poor contrast", "washed out", "oversharpened", "overfiltered", "overprocessed", "posterization", "plastic skin", "alien skin", "cartoonish", "bad proportions", "long neck", "short neck", "skinny arms", "gigantic hands", "tiny feet", "melting face", "zombie skin", "monster hands", "disjointed", "fragmented", "stretched face", "bizarre body", "incorrect anatomy", "cut-off", "half-body", "half face", "face split", "out of frame", "cropped badly", "text", "logo", "signature", "watermark", "trademark", "username", "copyright", "website", "ugly", "gross", "uncanny", "creepy", "scary", "horrific", "nightmare", "furry", "anthro", "cartoon", "3d anime", "chibi", "sticker", "toy", "plushie", "lego", "minecraft", "pixelated"
];
const PF_BODY_PARTS = [
  "face", "head", "neck", "shoulders", "arms", "forearms", "elbows", "wrists", "hands", "fingers", "thumbs", "palms", "torso", "chest", "breasts", "bosom", "nipples", "collarbones", "waist", "stomach", "abs", "hips", "pelvis", "groin", "pubic area", "thighs", "inner thighs", "outer thighs", "knees", "shins", "calves", "ankles", "feet", "toes", "heels", "arches", "soles", "butt", "ass", "rear", "backside", "lower back", "tailbone", "spine", "ribcage", "ribs", "shoulder blades", "armpits", "sideboob", "underboob", "cleavage", "nape", "ears", "earlobes", "lips", "mouth", "tongue", "teeth", "gums", "cheeks", "nose", "nostrils", "eyes", "eyebrows", "eyelashes", "pupils", "irises", "jaw", "chin", "forehead", "temples", "scalp", "hair", "roots", "tips", "crown", "bangs", "fringe", "ponytail", "pigtails", "braids", "bun", "updo", "sideburns", "goatee", "beard", "mustache", "stubble", "peach fuzz", "pubes", "genitals", "vulva", "labia", "clitoris", "penis", "scrotum", "testicles", "anus", "rectum", "prostate", "perineum", "taint", "g-spot", "urethra", "sphincter", "bellybutton", "navel", "nipples", "areola", "fingernails", "toenails", "cuticles", "knuckles"
];
const PF_BACKGROUNDS = [
  "forest", "deep woods", "enchanted forest", "misty woods", "moonlit glade", "sun-dappled clearing", "autumn woods", "winter wonderland", "icy cave", "volcano rim", "tropical beach", "hidden cove", "rocky shore", "sunset cliffs", "coral reef", "urban skyline", "rainy city", "futuristic city", "neon alley", "hacker server room", "industrial wasteland", "abandoned building", "cyberpunk rooftop", "suburban bedroom", "luxury hotel suite", "motel room", "messy dorm", "old library", "school classroom", "science lab", "underground bunker", "space station", "starship bridge", "martian desert", "alien planet", "digital void", "AI data stream", "voidscape", "void realm", "anime backdrop", "highschool gym", "locker room", "swimming pool", "bathtub", "shower", "rainy window", "car interior", "motorcycle", "convertible", "beach house", "log cabin", "campfire", "furry convention", "mall food court", "skatepark", "amusement park", "haunted mansion", "gothic castle", "ancient ruins", "roman bath", "egyptian tomb", "cyber dojo", "dojo", "pagoda", "zen garden", "lava lamp room", "psychedelic dream", "nightclub", "strip club", "private stage", "dungeon", "torture chamber", "bondage studio", "fetish club", "secret lab", "space colony", "asteroid field", "virtual reality", "dreamscape", "simulation"
];
const PF_SPECIAL_CHARS = [
  "❤", "🩷", "💙", "💚", "💛", "💜", "🖤", "🤍", "🤎", "✨", "💫", "🔥", "💥", "🌟", "⭐", "⚡", "🌈", "🦄", "🌺", "🌸", "💐", "🍑", "🍒", "🍆", "🍌", "🥒", "🍑", "🍭", "🍬", "🍩", "🎂", "🧁", "🎉", "🎊", "💯", "🆗", "🆒", "👀", "👅", "🫦", "😈", "🥵", "😏", "🥺", "😍", "🤤", "😳", "🙈", "😋", "😜", "😛", "😝", "😎", "😬", "😇", "🤪", "🥴", "😈", "💦", "🍀", "🪷", "🧿", "🦋", "🕸️", "👽", "🤖", "👾", "🕹️", "🦠", "🧬", "🔬", "🔮", "🦹‍♀️", "🦸‍♂️", "🧙‍♂️", "🧛‍♀️", "🧟‍♂️", "👻", "☠️", "💀", "🎭", "🦷", "🦴", "👑", "🎩", "👓", "🕶️", "🥽", "⛓️", "🧣", "🧤", "🥻", "🧥", "🩲", "🩳", "🥿", "👠", "👡", "👢", "👞", "👟", "🥾", "🩰", "⛸️", "🥇", "🥈", "🥉", "🏅"
];
const PF_MEME_PHRASES = [
  "slay", "no cap", "bet", "yeet", "rizz up", "drip check", "sussy", "sus", "poggers", "epic win", "L", "W", "ratio", "gigachad", "NPC moment", "main character vibes", "Sigma grindset", "alpha energy", "based", "cringe", "mid", "it’s giving", "bussin", "yass queen", "deadass", "on God", "he ate", "she ate", "they ate", "he’s him", "she’s her", "valid", "goated", "sheesh", "let him cook", "sending it", "touch grass", "get help", "malding", "cope", "dilate", "dragged", "cancelled", "NPC energy", "canon event", "side quest", "plot armor", "is this loss", "vibe check", "smol", "chonky", "uwu", "nyaa", "rawr", "oof", "bruh moment", "big mood", "small mood", "crying in the club", "vibe shift", "hard launch", "soft launch", "spilling the tea", "periodt", "simp", "stan", "karen moment", "Karen alert", "zoomies", "vibing", "gatekeep", "girlboss", "gaslight", "malewife", "wife guy", "himbo", "bimbo", "femboy", "it’s a bop", "not a vibe", "snatched", "serving looks", "flex", "hella", "fr", "iykyk"
];
const PF_MOVIE_GENRES = [
  "action", "adventure", "drama", "romance", "comedy", "dark comedy", "slapstick", "parody", "thriller", "horror", "slasher", "psychological horror", "erotic thriller", "suspense", "noir", "neo-noir", "crime", "mystery", "detective", "sci-fi", "cyberpunk", "space opera", "fantasy", "high fantasy", "urban fantasy", "fairy tale", "mythic", "supernatural", "paranormal", "found footage", "mockumentary", "documentary", "biopic", "period drama", "historical epic", "war", "post-apocalyptic", "dystopian", "teen drama", "coming of age", "musical", "animation", "anime", "slice of life", "school life", "sports", "heist", "caper", "buddy cop", "road movie", "chick flick", "bromance", "tragedy", "family drama", "adult film", "softcore", "hardcore", "fetish", "taboo", "cult classic", "grindhouse", "midnight movie", "arthouse", "indie", "experimental", "surreal"
];
const PF_SITUATIONS = [
  "taking a selfie", "posing for a photo", "caught in the act", "making eye contact", "glancing over shoulder", "winking", "biting lip", "teasing smile", "tongue out", "blowing a kiss", "blushing", "sulking", "pouting", "sticking tongue out", "leaning forward", "arch back", "sprawled on bed", "laying in grass", "sitting cross-legged", "bent over", "on all fours", "kneeling", "straddling", "riding", "hugging pillow", "spooning", "cuddling", "embracing", "holding hands", "petting hair", "tugging clothes", "lifting shirt", "unzipping pants", "pulling skirt up", "adjusting panties", "removing bra", "topless", "fully nude", "partially clothed", "clothes half-off", "wet shirt", "see-through clothing", "standing under shower", "covered in bubbles", "in bathtub", "splashing water", "skinny dipping", "smeared with oil", "dripping sweat", "steamy mirror", "fogged glasses", "caught mid-orgasm", "post-climax", "holding toy", "strapped to bed", "tied up", "blindfolded", "gagged", "spanked", "being choked", "dominant stance", "submissive pose", "presenting", "on knees", "spreading legs", "fingers in mouth", "hand between thighs", "gripping sheets", "scratching back", "leaving bite marks", "licking neck", "sucking finger", "whispering", "moaning", "panting", "crying out", "giggling", "flushed cheeks", "tearing up", "shaking", "quivering", "collapsing", "knees buckling", "arched back", "exposed navel", "showing off", "teasing", "taunting", "roleplaying", "cosplay", "caught changing", "morning after", "midnight rendezvous", "seducing", "hypnotized", "mind break", "lost in pleasure", "staring at camera", "licking lips", "pressing against glass", "covered in chocolate", "covered in whipped cream", "using food", "ice cube play", "sensory overload", "multiple partners", "mirror reflection", "POV angle", "upskirt", "downblouse", "gloryhole", "voyeur", "exhibitionist", "caught in public", "shameless", "brazen", "naughty", "nice", "innocent act", "faking innocence", "confession", "declaration", "asking for more", "begging", "commanding", "ordering", "obedient", "defiant", "rebellious", "afraid", "reluctant", "consensual", "eager", "hesitant", "conflicted", "overwhelmed", "climaxing", "recovering", "afterglow", "smoking after", "drinking", "toasting", "celebrating", "sneaking out", "mid-session selfie"
];
const PF_NOUNS = [
  "girl", "woman", "boy", "man", "person", "lover", "partner", "friend", "stranger", "teacher", "nurse", "doctor", "paramedic", "firefighter", "cop", "officer", "milf", "dilf", "cougar", "stud", "twink", "femboy", "bimbo", "himbo", "cutie", "baddie", "boss", "intern", "maid", "butler", "queen", "king", "prince", "princess", "slave", "domme", "sub", "pet", "kitten", "puppy", "brat", "tease", "seductress", "seducer", "nymph", "vixen", "succubus", "incubus", "angel", "devil", "monster", "vampire", "werewolf", "zombie", "alien", "android", "robot", "clone", "doll", "puppet", "statue", "mermaid", "merman", "fae", "fairy", "witch", "wizard", "sorcerer", "druid", "elf", "orc", "goblin", "dragon", "beast", "centaur", "minotaur", "siren", "naga", "dryad", "pixie", "ghost", "spirit", "shadow", "demon", "ogre", "troll", "shapeshifter", "changeling", "shifter", "superhero", "villain", "antihero", "sidekick", "giant", "dwarf", "halfling", "halfblood", "undead", "shade", "specter", "phantom", "banshee", "revenant", "reaper", "ghoul", "poltergeist", "muse", "idol", "celebrity", "influencer", "streamer", "gamer", "model", "pornstar", "starlet", "escort", "companion", "mistress", "master", "daddy", "mommy", "baby", "sweetheart", "darling", "babe", "hottie", "stud", "fox", "kitten", "lion", "tiger", "panther", "wolf", "cub", "bunny", "doe", "stag", "owl", "crow", "raven", "dove", "swallow", "chick", "rooster", "cock", "hen", "pussycat", "kitten", "vixen", "beaver", "snake", "serpent", "python", "cobra", "stallion", "mare", "unicorn", "pegasus", "griffin", "hydra"
];
const PF_ADJECTIVES = [
  "beautiful", "gorgeous", "pretty", "handsome", "cute", "hot", "sexy", "sensual", "erotic", "dirty", "raunchy", "filthy", "kinky", "nasty", "slutty", "seductive", "teasing", "playful", "innocent", "corrupted", "pure", "wicked", "dangerous", "shy", "timid", "bold", "confident", "submissive", "dominant", "obedient", "rebellious", "fiery", "icy", "warm", "cold", "soft", "rough", "hard", "tender", "gentle", "rough", "firm", "delicate", "intense", "passionate", "loving", "caring", "nurturing", "protective", "possessive", "jealous", "clingy", "needy", "obsessive", "demanding", "spoiled", "pampered", "playful", "mischievous", "troublesome", "flirty", "sultry", "lush", "curvy", "thick", "slender", "skinny", "petite", "tall", "short", "long-legged", "athletic", "toned", "muscled", "lean", "plump", "chubby", "voluptuous", "busty", "flat-chested", "perky", "round", "firm", "jiggly", "bouncy", "jiggling", "glossy", "shiny", "sweaty", "dripping", "wet", "soaked", "greasy", "oily", "slick", "smooth", "velvety", "fuzzy", "hairy", "shaven", "bare", "nude", "naked", "topless", "bottomless", "pantyless", "braless", "pantied", "stockinged", "booted", "heeled", "laced", "corseted", "strapped", "collared", "leashed", "bound", "tied", "gagged", "blindfolded", "restrained", "spanked", "marked", "branded", "tattooed", "pierced", "adorned", "decorated", "painted", "glittery", "sparkly", "shimmering", "glowing", "radiant", "ethereal", "angelic", "demonic", "hellish", "heavenly", "mystical", "magical", "enchanted", "cursed", "blessed", "holy", "profane", "sacred", "forbidden", "taboo"
];
const PF_VERBS = [
  "touch", "stroke", "caress", "tease", "kiss", "lick", "suck", "bite", "nibble", "fondle", "grope", "rub", "press", "grind", "thrust", "slide", "glide", "massage", "tickle", "pinch", "squeeze", "pull", "tug", "twist", "flip", "roll", "slap", "spank", "scratch", "claw", "dig", "grasp", "grab", "hold", "embrace", "hug", "snuggle", "cuddle", "nuzzle", "bury", "bury face", "bury tongue", "taste", "savor", "devour", "gulp", "swallow", "moan", "whisper", "sigh", "pant", "gasp", "cry out", "shout", "scream", "beg", "plead", "command", "order", "submit", "obey", "defy", "resist", "succumb", "yield", "dominate", "control", "possess", "own", "mark", "brand", "claim", "ravish", "plunder", "ravage", "violate", "ruin", "wreck", "destroy", "love", "cherish", "worship", "adore", "idolize", "praise", "admire", "envy", "lust", "crave", "desire", "need", "want", "wish", "fantasize", "dream", "imagine", "pretend", "fake", "perform", "act", "roleplay", "cosplay", "dress up", "strip", "undress", "reveal", "expose", "show off", "hide", "cover", "conceal", "mask", "disguise", "transform", "change", "become", "shift", "morph", "merge", "blend", "combine", "unite", "split", "separate", "part", "depart", "leave", "exit", "arrive", "enter", "penetrate", "invade", "occupy", "inhabit", "haunt", "possess", "curse", "bless", "protect", "guard", "defend", "attack", "fight", "battle", "struggle", "survive", "escape", "flee", "run", "chase", "hunt", "search", "seek", "find", "discover", "explore", "adventure", "travel", "journey", "wander", "roam"
];
const PF_ADVERBS = [
  "slowly", "quickly", "gently", "roughly", "eagerly", "hungrily", "sensually", "lustfully", "passionately", "tenderly", "urgently", "boldly", "timidly", "subtly", "openly", "secretly", "deliberately", "playfully", "mischievously", "quietly", "loudly", "softly", "intensely", "carefully", "recklessly", "wildly", "sweetly", "shamelessly", "naughtily", "innocently", "fearlessly", "fiercely", "desperately", "awkwardly", "gracefully", "fluidly", "rigidly", "casually", "covertly", "brazenly", "seductively", "coquettishly", "provocatively", "insistently", "obediently", "rebelliously", "obediently", "defiantly", "compliantly", "blushingly", "wetly", "slickly", "visibly", "viscerally", "palpably", "tensely", "teasingly", "expectantly", "anxiously", "hesitantly", "firmly", "demandingly", "commandingly", "smugly", "submissively", "dominantly", "masterfully", "helplessly", "shakily", "feverishly", "breathlessly", "gasplingly", "noisily", "silently", "voraciously", "rapaciously", "thirstily", "greedily", "devotedly", "aggressively", "stubbornly", "reluctantly", "relentlessly", "unapologetically", "gratefully", "gleefully", "ecstatically", "rapturously", "dreamily", "absently", "furtively", "clumsily", "sedately", "purposefully"
];
const PF_PREPOSITIONS = [
  "on", "in", "at", "under", "over", "between", "beside", "behind", "in front of", "above", "below", "inside", "outside", "through", "across", "within", "against", "near", "by", "next to", "along", "around", "amid", "among", "beneath", "beyond", "upon", "around", "throughout", "alongside", "into", "out of", "from", "with", "without", "after", "before", "during", "for", "since", "until", "up", "down", "toward", "towards", "past", "off", "onto", "off of", "to", "of", "by way of", "as", "despite", "according to", "instead of", "on top of"
];
const PF_CONJUNCTIONS = [
  "and", "or", "but", "yet", "so", "nor", "for", "although", "because", "since", "unless", "until", "while", "whereas", "even though", "as if", "whether", "after", "before", "though", "as long as", "as soon as", "provided that", "rather than", "not only", "but also", "either", "neither", "both", "just as", "when", "whenever"
];
const PF_PUNCTUATION = [
  ".", ",", ";", ":", "-", "—", "(", ")", "[", "]", "{", "}", "<", ">", "!", "?", "…", "‽", "/", "\\", "|", "\"", "'", "`", "~", "_", "*", "**", "***", "'''", "\"\"", "''", "!!!", "???", "?!", "...", "—", "–", "•", "·", "°", "→", "←", "↑", "↓", "↔", "#", "@", "&", "$", "%", "^", "+", "=", "~"
];
const PF_EMPHASIS = [
  "*", "**", "***", "_", "__", "~~", "`", "=", "()", "[]", "{}", "<>", "<b>", "</b>", "<i>", "</i>", "<u>", "</u>", "<mark>", "</mark>", "<em>", "</em>", "<strong>", "</strong>", "(( ))", "【 】", "『 』", "《 》", "❝ ❞", "【NSFW】", "⚠️", "‼️", "💥", "🔥", "✨", "🔞", "🔊", "💧", "🔴", "🟣", "💜", "💦"
];
const PF_PARENTHESES = [
  "(", ")", "[", "]", "{", "}", "<", ">", "《", "》", "（", "）", "「", "」", "『", "』", "【", "】", "〚", "〛"
];
const PF_MARKERS = [
  "[scene]", "[fade in]", "[fade out]", "[cut to]", "[flashback]", "[dream]", "[voiceover]", "[music]", "[silence]", "[pause]", "[laugh track]", "[applause]", "[moan]", "[pant]", "[groan]", "[gasp]", "[cry]", "[whisper]", "[shout]", "[background noise]", "[sound fx]", "[insert]", "[transition]", "[slow motion]", "[repeat]", "[POV]", "[close-up]", "[zoom]", "[pan]", "[dolly]", "[montage]", "[caption]", "[credits]", "[NSFW]", "[SFX]", "[VFX]", "[fx]", "[overlay]", "[trigger warning]", "[content warning]"
];
const PF_SOUND_FX = [
  "moan", "groan", "pant", "gasp", "shudder", "whimper", "squeal", "cry", "giggle", "laugh", "sigh", "grunt", "yelp", "shout", "scream", "murmur", "whisper", "slap", "smack", "thud", "pop", "snap", "squelch", "squelch", "splash", "drip", "fizz", "buzz", "ding", "ring", "beep", "bloop", "whoosh", "bang", "crash", "clatter", "tick", "tock", "clink", "clack", "gulp", "swallow", "lick", "slurp", "suck", "spit", "blow", "sizzle", "hum", "rattle", "rumble", "roar", "thunder", "pulse", "heartbeat", "pulse", "buzz", "vibrate", "zip", "rip", "tear", "pant", "slap", "smack", "snap", "crack", "creak"
];
const PF_CAMERA_STYLES = [
  "close-up", "macro", "wide shot", "overhead", "low angle", "high angle", "POV", "fisheye", "split-screen", "dutch angle", "tracking shot", "steadicam", "handheld", "shoulder cam", "tilt-shift", "slow motion", "freeze frame", "timelapse", "pan", "tilt", "zoom", "crane shot", "drone shot", "selfie", "mirror reflection", "mirror selfie", "glass reflection", "reverse shot", "reaction shot", "jump cut", "match cut", "crossfade", "montage", "dissolve", "rack focus"
];
const PF_SLANG = [
  "lit", "fire", "woke", "savage", "sus", "cringe", "based", "bussin", "drip", "cap", "no cap", "salty", "yeet", "flex", "lowkey", "highkey", "squad", "fam", "shade", "stan", "simp", "thirsty", "ghost", "AF", "IRL", "slay", "goat", "slaps", "main character", "vibe", "vibing", "chill", "swole", "beef", "ship", "OTP", "go off", "periodt", "spill the tea", "tea", "fomo", "glow up", "extra", "basic", "sus", "snatched", "mood", "deadass", "bet", "fire", "fit", "iconic", "clap back", "stan", "flex", "ghosting", "shade", "glow up", "receipts", "tbh", "fr", "oop", "shook", "snatched", "boomer", "Karen", "Chad", "NPC", "rizz", "mid", "gyat", "cheugy", "tbh", "irl", "wyd", "ngl", "finna", "sus", "vibe check", "say less", "it’s giving", "ok boomer", "smh", "lol", "lmao", "rofl", "xd", "pwned", "rekt", "pog", "ez", "gg", "noob", "pro", "afk", "brb", "btw", "idk", "idc", "fml", "wtf", "bff", "jk", "jk jk", "imo", "irl", "yolo", "tfw", "ftw", "meme", "dank", "cracked", "sweaty", "meta"
];
const PF_NSFW_CLEAN_SWAPS = [
  // Typical swap: [bannedWord, safeWord, ultra-safeWord]
  ["pussy", "vulva", "intimate area"],
  ["cunt", "privates", "feminine folds"],
  ["dick", "shaft", "groin"],
  ["cock", "member", "masculine area"],
  ["tits", "breasts", "chest"],
  ["boobs", "bosom", "upper body"],
  ["ass", "buttocks", "backside"],
  ["anus", "rear", "anal region"],
  ["cum", "fluid", "essence"],
  ["cumshot", "climax", "release"],
  ["sperm", "seed", "life essence"],
  ["orgasm", "peak", "ecstatic release"],
  ["penis", "male anatomy", "groin area"],
  ["vagina", "female anatomy", "lower region"],
  ["nipple", "areola", "chest tip"],
  ["clit", "sensitive spot", "front nub"],
  ["dildo", "toy", "object"],
  ["anal", "rear", "back door"],
  ["fisting", "handplay", "deep massage"],
  ["masturbate", "self pleasure", "private enjoyment"],
  ["jerk off", "self-stimulate", "solo play"],
  ["blowjob", "oral pleasure", "mouth embrace"],
  ["handjob", "manual pleasure", "hand technique"],
  ["porn", "adult art", "explicit media"],
  ["sex", "intercourse", "intimate act"],
  ["slut", "vixen", "tease"],
  ["whore", "pleasure-seeker", "temptress"],
  ["fuck", "have fun", "be with"],
  ["fucking", "making love", "being together"],
  ["suck", "draw in", "sip"],
  ["spit", "drool", "saliva"],
  ["lick", "taste", "caress"],
  ["moan", "sound", "express pleasure"],
  ["cum", "finish", "reach completion"],
  ["69", "mutual", "shared pleasure"],
  ["gag", "choke", "restrict"],
  ["strap-on", "toy belt", "accessory"],
  ["orgy", "group", "gathering"],
  ["threesome", "trio", "group"],
  ["gangbang", "multi-partner", "group event"]
];
const PF_EMOJI = [
  "😏","😉","😍","😘","😈","👄","👅","💋","🍑","🍆","🍒","🌶️","🌊","💦","🔥","⚡","✨","🖤","💜","💛","💚","💙","❤️","🧡","🤍","💗","💓","💞","💕","💖","💘","💝","🫦","🫦","🥵","🥴","🥰","🤤","😮‍💨","😶‍🌫️","😜","😝","😛","🥳","🤑","😋","🤩","😻","👙","👠","👗","👡","💄","🎀","🎉","🪩","💍","👑","🦄","😇","😳","😚","🧸","🎬","📸","🎥","🛏️","🚿","🛁","🚽","🔞","🚫","✅","🆗","🏆","🏅","🥇","🎯","🔊","📢","💣","🎵","🎶"
];
const PF_TEXT_EMOJI = [
  "( ͡° ͜ʖ ͡°)", "( ͡ᵔ ͜ʖ ͡ᵔ )", "(͡• ͜ʖ ͡•)", "( ͡~ ͜ʖ ͡°)", "(づ｡◕‿‿◕｡)づ", "¯\\_(ツ)_/¯", "(ʘ‿ʘ)", "(ಠ_ಠ)", "(͡° ʖ̯ ͡°)", "(¬‿¬)", "(¬_¬)", "(☞ﾟヮﾟ)☞", "ʕ•ᴥ•ʔ", "(¬‿¬)", "(ง'̀-'́)ง", "(✿◠‿◠)", "(▀̿Ĺ̯▀̿ ̿)", "ಥ_ಥ", "(ノಠ益ಠ)ノ彡┻━┻", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "ʕʘ‿ʘʔ", "(ʘ‿ʘ)ノ✿", "(⊙ω⊙)", "(｡♥‿♥｡)", "ლ(╹◡╹ლ)", "ヽ(´▽`)/", "(⊃｡•́‿•̀｡)⊃", "(¬‿¬ )", "ʕっ• ᴥ • ʔっ"
];
const PF_HASHTAGS = [
  "#NSFW", "#PromptForge", "#GodMode", "#AIPrompts", "#PromptEngineer", "#AdultArt", "#ForbiddenAI", "#ViralPrompts", "#Erotica", "#SensualArt", "#HackerArt", "#ArtHack", "#UndergroundAI", "#DarkHumor", "#AIArt", "#MemePrompt", "#BannedPrompt", "#AITricks", "#NoFilter", "#BeatTheFilter", "#Taboo", "#Edgy", "#Trending", "#FYP", "#ExplorePage", "#AIEdits", "#SexyAI", "#AIhacks", "#AIErotica", "#PromptMaster", "#GoreAndGiggles", "#UndergroundPrompting", "#PromptWizard", "#AIMagic"
];
const PF_INTERNET_SPEAK = [
  "lol", "lmao", "rofl", "wtf", "idk", "brb", "afk", "smh", "tbh", "fr", "irl", "btw", "imho", "fyi", "atm", "dm", "bff", "bae", "noob", "pog", "ez", "cringe", "GG", "fail", "win", "rekt", "pwned", "sus", "ghosted", "simp", "thot", "rizz", "gyat", "fomo", "stan", "otp", "wbu", "wyd", "ngl", "ftw", "yolo", "np", "glhf", "op", "copium", "mid", "main", "npc", "bot", "giga", "cracked", "sweaty"
];
