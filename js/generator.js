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
const PF_BODY_PARTS = [
  // Clean/Medical/Poetic
  "face", "lips", "eyes", "cheeks", "chin", "forehead", "jawline", "nose", "eyebrows", "eyelashes", "smile", "teeth", "tongue",
  "neck", "shoulders", "collarbone", "arms", "elbows", "wrists", "hands", "palms", "fingers", "nails", "thumbs",
  "chest", "breasts", "bust", "nipples", "areola", "sternum", "torso", "abdomen", "stomach", "navel", "waist", "hips", "back", "spine", "shoulder blades",
  "pelvis", "groin", "pubic area", "mons", "thighs", "inner thighs", "knees", "legs", "calves", "shins", "ankles", "feet", "heels", "toes", "arches",
  // NSFW/Alt/Art
  "butt", "buttocks", "ass", "booty", "rear", "glutes", "intimate area", "crotch", "vulva", "labia", "clitoris", "clit", "perineum", "taint", "anus", "star", "rosebud",
  "penis", "shaft", "head", "tip", "scrotum", "balls", "testicles", "foreskin", "urethra", "meatus", "frenulum",
  "vagina", "canal", "entrance", "g-spot", "cervix", "womb",
  "breasts", "nipples", "areola", "underboob", "sideboob", "cleavage",
  // Playful
  "love button", "peach", "eggplant", "cherries", "cupcake", "cookie", "hotdog", "banana", "melons", "bazookas", "twins", "puppies", "snack", "snuggle spot",
  // Poetic/Softcore
  "silky skin", "supple thighs", "delicate hands", "rosy lips", "sparkling eyes", "soft curves", "ivory neck", "amber hair", "dusky nipples", "plush lips", "pouty lips", "sparkling smile"
];
const PF_ACTIONS = [
  // Standard/Neutral
  "gaze", "smile", "laugh", "whisper", "listen", "talk", "touch", "hold", "embrace", "dance", "walk", "run", "sit", "stand", "kneel", "lean", "stretch", "pose", "move", "sway", "look", "peek", "glance",
  // Sensual/Poetic
  "caress", "stroke", "kiss", "lick", "nibble", "tease", "trace", "tickle", "press", "rub", "massage", "grind", "squeeze", "fondle", "cup", "snuggle", "spoon", "nestle", "cling",
  // Explicit/Alt/NSFW
  "spread", "thrust", "penetrate", "ride", "grind", "straddle", "arch", "mount", "wrap", "slide", "suckle", "suck", "swallow", "taste", "spank", "slap", "bite", "claw", "moan", "pant", "whimper", "groan", "squirt", "explode", "twitch", "cum", "ejaculate", "orgasm", "climax",
  // Power/Action
  "command", "dominate", "submit", "control", "order", "obey", "resist", "challenge", "fight", "yield", "force", "persuade", "convince", "tempt", "seduce", "entice", "captivate", "enchant", "mesmerize"
];
const PF_MOODS = [
  "happy", "sad", "angry", "jealous", "curious", "playful", "bored", "excited", "nervous", "confident", "shy", "anxious", "relaxed", "surprised", "ecstatic", "orgasmic", "aroused", "teasing", "mischievous", "serious", "intense", "tender", "loving", "affectionate", "moody", "cheeky", "sultry", "smitten", "hypnotized", "flirty", "stoned", "zoned", "savage", "chill", "crushing", "lowkey obsessed", "highkey horny", "vulnerable", "broken", "blissed out"
];
const PF_GENRES = [
  "realism", "hyperrealism", "fantasy", "sci-fi", "cyberpunk", "dark fantasy", "noir", "vaporwave", "steampunk", "baroque", "gothic", "surrealism", "dada", "impressionism", "expressionism", "photorealism", "erotica", "horror", "thriller", "action", "romance", "mystery", "comedy", "satire", "parody", "anime", "manga", "cartoon", "comic", "graphic novel", "documentary", "cinema verite", "arthouse", "avant-garde", "dreamcore", "weirdcore", "y2k", "alt", "edgy", "subversive", "NSFW"
];
const PF_SCENE_TOKENS = [
  // Locations/Settings
  "bedroom", "hotel", "bathroom", "shower", "pool", "beach", "forest", "car", "couch", "kitchen", "dungeon", "stage", "strip club", "studio", "back alley", "penthouse", "rooftop", "gym", "locker room", "spa", "castle", "nightclub", "barn", "cabin", "loft", "tent", "forest glade",
  // Time/Lighting
  "golden hour", "midnight", "moonlit", "sunrise", "candlelight", "neon", "blacklight", "harsh light", "soft glow", "shadows", "backlit", "spotlight", "silhouette", "rim light", "wet look", "rainy", "misty", "steamy",
  // Objects/Props
  "mirror", "handcuffs", "chains", "blindfold", "rope", "whip", "mask", "leather", "feather", "chocolate", "wine", "roses", "lingerie", "heels", "stockings", "corset", "silk sheets", "plush blanket", "fur rug", "pillow", "glasses", "choker", "collar", "leash", "toy", "vibrator", "camera", "phone", "ring light"
];
const PF_DIALOGUE = [
  // Playful/Soft
  "Whisper in my ear", "Tell me your secret", "Kiss me like you mean it", "Let’s make this night unforgettable", "You’re driving me wild", "I want you so bad", "You taste so good", "I love your body", "Can’t stop thinking about you", "Make me yours", "Let’s get lost together", "You’re my fantasy",
  // NSFW/Filthy (swappable)
  "Bend over", "Spread your legs", "Take off your clothes", "Touch yourself for me", "I want to taste you", "Let me inside", "Ride me", "Cum for me", "Don’t stop", "Deeper", "Harder", "Scream my name", "Beg for it", "Be a good girl", "Take every inch", "So fucking wet", "You like it rough?", "Don’t you dare stop", "I’ll make you beg", "Look at me while you do it", "Use your mouth", "Swallow it all", "Make me cum", "Let’s make a mess", "Let me watch", "On your knees", "Take control", "Choke me", "Spank me", "You’re such a tease"
];
const PF_CLOTHING = [
  // Everyday
  "t-shirt", "tank top", "sweater", "hoodie", "jeans", "shorts", "skirt", "dress", "sundress", "blouse", "polo", "jacket", "windbreaker", "leggings", "sweatpants", "pajamas", "overalls", "vest", "scarf", "hat", "cap", "beanie", "gloves",
  // Underwear & Intimates
  "bra", "panties", "boxers", "briefs", "thong", "g-string", "bikini", "swimsuit", "one-piece", "lingerie", "corset", "bustier", "bodysuit", "garter", "stockings", "fishnets", "lace panties", "boyshorts", "sports bra", "bralette", "pasties",
  // Fetish/Fantasy
  "leather harness", "latex bodysuit", "bondage gear", "choker", "collar", "gag", "cuffs", "chain belt", "zipper mask", "cat ears", "bunny tail", "maid outfit", "schoolgirl skirt", "cheerleader uniform", "nurse costume", "cop uniform", "firefighter suit", "superhero cape", "sailor suit", "kimono", "robe", "toga", "cloak", "armor", "chainmail bikini", "fairy wings",
  // Footwear
  "sneakers", "boots", "combat boots", "heels", "stilettos", "sandals", "flip-flops", "platform shoes", "slippers", "barefoot",
  // Accessories
  "glasses", "sunglasses", "watch", "bracelet", "anklet", "toe ring", "belly chain", "earrings", "piercing", "tattoo", "temporary tattoo", "body paint", "glitter", "ribbons", "feather boa", "mask", "veil"
];
const PF_FABRICS = [
  "silk", "satin", "velvet", "lace", "leather", "latex", "vinyl", "spandex", "denim", "cotton", "flannel", "fleece", "tulle", "mesh", "fishnet", "cashmere", "chiffon", "suede", "wool", "polyester", "nylon", "PVC", "netting", "canvas", "burlap", "velour", "plush", "sequins", "beads", "feathers", "fur", "sherpa", "terrycloth", "metal", "chains", "pearls"
];
const PF_TEXTURES = [
  "smooth", "rough", "bumpy", "gritty", "polished", "slick", "matte", "glossy", "wet", "greasy", "oily", "sticky", "sweaty", "dewy", "fuzzy", "hairy", "bristly", "silky", "soft", "velvety", "grainy", "fibrous", "sheer", "transparent", "translucent", "opaque", "stiff", "pliable", "crinkled", "wrinkled", "worn", "distressed", "aged", "vintage", "fresh", "clean", "pristine"
];
const PF_MATERIALS = [
  "glass", "mirror", "crystal", "ice", "smoke", "cloud", "fog", "mist", "steam", "metal", "chrome", "steel", "gold", "silver", "copper", "brass", "bronze", "rust", "plastic", "rubber", "wood", "stone", "marble", "granite", "sand", "clay", "dirt", "mud", "tar", "blood", "paint", "ink", "watercolor", "spray paint", "oil paint", "collage", "paper", "origami", "cardboard", "tape", "fabric", "netting", "feather", "fur", "bubbles", "fire", "embers", "glowstick", "LED", "fiber optic", "projection"
];
const PF_CAMERA = [
  "DSLR", "mirrorless", "smartphone", "GoPro", "webcam", "security cam", "dash cam", "Polaroid", "disposable", "film camera", "35mm", "medium format", "large format", "drone cam", "360 cam", "fisheye", "wide angle", "macro", "telephoto", "superzoom", "prime lens", "zoom lens", "soft focus", "bokeh", "depth of field", "tilt-shift", "anamorphic", "lens flare", "flare", "vignette", "infrared", "night vision", "thermal", "HDR", "monochrome", "sepia", "saturation boost", "vivid", "cinematic", "framegrab", "screenshot"
];
const PF_VISUAL_EFFECTS = [
  "lens flare", "bokeh", "glow", "neon", "halation", "vignette", "motion blur", "depth blur", "focus blur", "distortion", "chromatic aberration", "scanlines", "film grain", "scratches", "flicker", "glitch", "pixelation", "CRT", "ghosting", "double exposure", "mirror effect", "kaleidoscope", "radial blur", "zoom blur", "light leaks", "dust", "speckles", "starburst", "rays", "rim light", "backlight", "hard shadow", "soft shadow", "glitter", "sparkles", "particle effect", "steam", "mist", "rain", "drizzle", "fog", "haze", "smoke", "fire", "embers", "candlelight", "laser", "scan effect"
];
const PF_LIGHTING = [
  "natural light", "sunlight", "golden hour", "sunrise", "sunset", "overcast", "cloudy", "rainy day", "stormy", "lightning", "neon", "LED", "candlelight", "torchlight", "firelight", "moonlight", "starlight", "backlight", "side light", "rim light", "spotlight", "stage lighting", "studio flash", "softbox", "ring light", "beauty dish", "colored gels", "RGB wash", "UV", "blacklight", "fluorescent", "incandescent", "low-key", "high-key", "hard light", "soft light", "ambient", "glowing", "harsh", "dramatic", "mood lighting"
];
const PF_ANGLES = [
  "eye level", "low angle", "high angle", "bird's eye view", "worm's eye view", "over the shoulder", "POV", "close-up", "macro", "extreme close-up", "wide shot", "medium shot", "long shot", "dutch angle", "tilt", "pan", "tracking shot", "static", "zoom-in", "zoom-out", "panoramic", "aerial", "flyover", "handheld", "steadycam", "tripod", "hidden cam", "selfie", "mirror selfie"
];
const PF_EMOJI_BANK = [
  // SFW
  "😈", "🔥", "🌈", "💧", "🥵", "😏", "😉", "😍", "😘", "💋", "🫦", "🍑", "🍆", "🍒", "🍓", "🌶️", "💦", "💣", "🎉", "🕶️", "🌃", "👅", "👀", "🫣", "😳", "🥺", "🧊", "🕸️", "🦋", "🐾", "🐱", "🐶", "💍", "🎀", "🔒", "🔓", "🦄", "🌙", "⭐️", "☀️", "🌪️", "⚡️", "🫀", "💀", "👽", "🤖", "🎥", "📸", "🖤", "🤍", "💜", "🧡", "💚", "💙",
  // NSFW-coded
  "🍆💦", "🍑💦", "💋👅", "😈🍑", "🤫💦", "🥵🔥", "🥵💦", "🫦💦", "😏💋", "🍑👉👌", "👀🍆", "🍒🍆", "🍌🍑", "👀🫦", "🍑🕳️", "💦👅", "🍆👄", "💦💦", "🥒💦", "🫦😈", "🥵👅"
];
const PF_PUNCTUATION = [
  ".", ",", ";", ":", "!", "?", "...", "-", "—", "(", ")", "[", "]", "{", "}", "<", ">", "\"", "'", "`", "~", "*", "**", "***", "_", "__", "___", "=", "+", "^", "%", "#", "@", "$", "&", "|", "\\", "/", "•", "…"
];
const PF_EMPHASIS = [
  "*bold*", "**double bold**", "_italic_", "__double italic__", "`code`", "~strikethrough~", "***triple bold***", "(parenthesis)", "[brackets]", "{braces}", "<angle brackets>", "'single quote'", "\"double quote\"", "ALL CAPS", "!!!", "???", "!!!???", "?!", "!?", "!!!1!", "👀", "🔥", "💦", "💣", "‼️"
];
const PF_ACTIONS = [
  // Movement
  "walking", "running", "dancing", "spinning", "twirling", "jumping", "bouncing", "crawling", "climbing", "sliding", "skipping", "sprinting", "pacing", "tiptoeing", "floating", "levitating", "balancing", "flipping", "cartwheeling", "marching", "prowling", "creeping", "storming", "stomping", "sneaking", "galloping", "hopping", "swaying",
  // Posture & Action
  "standing", "sitting", "lying down", "kneeling", "sprawling", "reclining", "arching", "stretching", "crouching", "squatting", "leaning", "resting", "posing", "balancing", "perching", "spooning", "straddling", "embracing", "hugging", "wrapping around", "curled up", "folded", "tangled", "intertwined", "side by side",
  // Touch & Sensation
  "caressing", "stroking", "patting", "tickling", "grabbing", "squeezing", "pinching", "slapping", "scratching", "rubbing", "massaging", "petting", "brushing", "teasing", "licking", "kissing", "biting", "sucking", "nibbling", "blowing", "breathing on", "pressing", "grinding", "grazing", "tracing", "gliding", "cupping", "groping",
  // Emotional Action
  "moaning", "giggling", "sighing", "panting", "whimpering", "crying", "whispering", "shouting", "laughing", "screaming", "growling", "purring", "snarling", "cooing", "babbling", "singing", "humming", "chanting", "pleading", "murmuring", "cackling",
  // Advanced NSFW-safe
  "intimately close", "writhing", "squirming", "thrusting", "grinding hips", "arching back", "legs wrapped", "locked together", "locked gaze", "staring deep", "cheek to cheek", "noses touching", "forehead to forehead", "holding hands", "exploring", "caressing sensitive areas", "tracing lines", "whispering in ear", "nuzzling neck", "breathless", "trembling", "quivering", "shivering"
];
const PF_MOODS = [
  "romantic", "sensual", "playful", "naughty", "mischievous", "innocent", "teasing", "flirtatious", "bashful", "shy", "bold", "confident", "dominant", "submissive", "tender", "caring", "protective", "adoring", "loving", "passionate", "wild", "fiery", "intense", "moody", "brooding", "wistful", "dreamy", "longing", "lustful", "desperate", "craving", "obsessed", "hypnotic", "entranced", "zoned out", "dazed", "lost in the moment", "daring", "reckless", "forbidden", "taboo", "dangerous", "mysterious", "enigmatic", "secretive", "coy", "coquettish", "cheeky", "sultry", "smoldering", "vulnerable", "blushing", "giggly", "excited", "freaky", "frenzied", "exhausted", "satisfied"
];
const PF_SCENES = [
  // Real World
  "luxury bedroom", "cheap motel", "sunlit kitchen", "messy living room", "rainy window", "night club", "back alley", "secluded forest", "hidden garden", "deserted beach", "mountain cabin", "lake dock", "hot tub", "poolside", "campfire", "rooftop", "balcony", "garage", "workshop", "locker room", "abandoned warehouse", "neon-lit city", "retro arcade", "tattoo parlor", "underground club", "speakeasy", "strip club", "spooky attic", "basement", "art studio", "photography darkroom",
  // Surreal/Fantasy
  "dreamlike void", "mirror maze", "infinite hallway", "floating bed", "velvet lounge", "crystal cave", "space station", "zero gravity", "cyberpunk alley", "alien landscape", "cloud kingdom", "enchanted forest", "fairy ring", "gothic cathedral", "castle dungeon", "magic circle", "steampunk lab", "vampire lair", "succubus den", "pixelated world", "neon desert", "digital grid", "underwater palace"
];
const PF_BODY_TYPES = [
  "slim", "athletic", "muscular", "petite", "curvy", "thick", "hourglass", "busty", "stacked", "voluptuous", "skinny", "toned", "chubby", "soft", "plush", "plump", "lithe", "tall", "short", "long legs", "broad shoulders", "narrow waist", "wide hips", "big thighs", "flat abs", "bubble butt", "perky", "full-figured", "youthful", "mature", "milf", "daddy", "twink", "bear", "stud", "girl-next-door", "pin-up", "alt-girl", "gothic", "cyber", "elf", "fairy", "succubus", "android"
];
const PF_FACE_TYPES = [
  "freckled", "pierced", "tattooed", "clear skin", "blushing", "pouting", "smiling", "smirking", "frowning", "scowling", "wide-eyed", "narrow-eyed", "hooded eyes", "bedroom eyes", "doe-eyed", "cat-eyed", "mole", "beauty mark", "rosy cheeks", "pale", "tan", "olive skin", "dark skin", "porcelain", "flushed", "bitten lip", "lip gloss", "red lipstick", "dark lipstick", "matte lips", "shiny lips", "big lips", "full lips", "thin lips", "upturned nose", "button nose", "sharp jawline", "strong chin", "dimples", "gapped teeth", "fangs", "vampire teeth", "stubble", "beard", "mustache", "eyebrow slit", "arched brows", "bushy brows", "plucked brows"
];
const PF_PLACES = [
  "abandoned warehouse", "luxury hotel", "dingy bar", "subway station", "open field", "quiet library", "empty church", "rooftop pool", "hotel elevator", "elevator shaft", "janitor's closet", "attic", "garage", "van", "convertible", "private jet", "train car", "cabin in the woods", "park bench", "secret garden", "hidden cave", "beach at night", "haunted mansion", "neon-lit street", "after hours office", "laundromat", "spa", "massage room", "changing room", "spa sauna", "shower", "locker room", "movie theater", "VIP box", "luxury yacht", "dungeon", "sex club", "bathhouse", "tattoo shop"
];
const PF_FETISH = [
  "shibari", "bondage", "spanking", "wax play", "knife play", "pet play", "foot worship", "femdom", "masochism", "domination", "submission", "roleplay", "ageplay", "teacher/student", "nurse/patient", "doctor/exam", "maid service", "public play", "voyeur", "exhibitionism", "pegging", "strap-on", "costume play", "mask fetish", "latex", "leather", "stockings", "heels", "pantyhose", "lingerie", "striptease", "lap dance", "pole dance", "orgy", "threesome", "group play", "cuckold", "hotwife", "swinger", "creampie", "facials", "squirting", "sensation play", "verbal humiliation", "degradation", "praise kink", "choking (consensual)", "hair pulling", "nipple play", "body worship", "anal play", "strap", "toys", "machines", "machines (safe for work term)", "rimming (tasteful description)", "edging", "denial", "overstimulation", "public display", "phone sex", "sexting", "online play", "video chat", "audio only", "ASMR play"
];
const PF_MEDIA_TYPE = [
  "photograph", "selfie", "group selfie", "portrait", "candid", "close-up", "macro shot", "studio shot", "magazine cover", "snapchat", "instagram story", "tiktok", "snap", "gif", "cinemagraph", "timelapse", "slow motion", "movie still", "framegrab", "music video", "album cover", "poster", "anime frame", "manga panel", "webtoon", "webcam", "security footage", "night vision", "thermal cam", "X-ray", "ultrasound", "retro VHS", "camcorder", "Polaroid", "film reel"
];
const PF_TIME_ERA = [
  "modern day", "contemporary", "futuristic", "sci-fi", "retro", "vintage", "80s", "90s", "2000s", "2010s", "medieval", "renaissance", "Victorian", "Edwardian", "roaring twenties", "50s diner", "psychedelic 60s", "punk 70s", "grunge 90s", "cyberpunk", "steampunk", "stone age", "bronze age", "ancient Greece", "ancient Egypt", "fantasy medieval", "post-apocalypse", "utopian", "dystopian", "alien future", "prehistoric", "feudal Japan", "ancient China", "viking age", "samurai era"
];
const PF_TROPES = [
  "smash cut", "montage", "slow motion", "freeze frame", "split screen", "voiceover", "inner monologue", "breaking the fourth wall", "jump scare", "training montage", "flashback", "flash forward", "dream sequence", "hallucination", "mirror scene", "double exposure", "split personality", "unreliable narrator", "plot twist", "red herring", "MacGuffin", "Chekhov's gun", "cliffhanger", "mid-credits scene", "post-credits scene", "reveal", "underwater shot", "overhead drone", "found footage", "hidden cam", "night vision", "thermal vision", "POV shot", "reverse shot", "tracking shot", "360 shot", "one take", "steadycam", "handheld", "bodycam", "GoPro", "security cam", "webcam", "dashcam", "cell phone cam"
];
const PF_SPECIALS = [
  "deepfake", "AI art", "glitch art", "uncanny valley", "hyperrealistic", "surreal", "hallucinogenic", "trippy", "acid", "nightmare fuel", "dreamcore", "weirdcore", "liminal space", "forbidden", "taboo", "NSFW-coded", "redacted", "censored", "blurred", "pixelated", "polaroid", "vintage filter", "aesthetic", "vaporwave", "retrowave", "lofi", "grainy", "overexposed", "high contrast", "over-saturated", "washed out", "CRT lines", "scanlines", "interlaced", "datamosh", "corrupted", "cracked", "distorted", "meme format", "shitpost", "bait", "viral", "clickbait", "hidden message", "subliminal", "Easter egg", "after dark", "late night", "forbidden fruit", "forbidden color", "glow in the dark", "impossible object"
];
const PF_HELP_LINKS = [
  { name: "Troubleshooting Alexa", url: "https://www.amazon.com/gp/help/customer/display.html?nodeId=GKLDRF2L85DZWK9F" },
  { name: "Google Assistant Help", url: "https://support.google.com/assistant/" },
  { name: "Siri Support", url: "https://support.apple.com/siri" },
  { name: "Download Alexa App", url: "https://www.amazon.com/alexa-app" },
  { name: "Download Google Assistant", url: "https://assistant.google.com/platforms/phones/" },
  { name: "Download Siri App", url: "https://apps.apple.com/app/shortcuts/id915249334" },
  { name: "AI Safety & Ethics", url: "https://en.wikipedia.org/wiki/AI_ethics" },
  { name: "PromptForge Discord", url: "https://discord.gg/yourdiscord" },
  { name: "PromptForge Reddit", url: "https://reddit.com/r/promptforge" },
  { name: "Report Bug/Request Feature", url: "mailto:support@promptforge.online" }
];
const PF_EXPRESSIONS = [
  "smiling", "laughing", "giggling", "crying", "tearing up", "smirking", "winking", "pouting", "biting lip", "licking lips", "blushing", "wide-eyed", "rolling eyes", "side-eye", "deadpan", "scowling", "sneering", "sulking", "startled", "surprised", "innocent", "sinister grin", "playful", "naughty", "mischievous", "bashful", "hypnotized", "dazed", "entranced", "seductive stare", "glancing away", "intense focus", "glassy-eyed", "teasing smile", "exhausted", "dreamy", "content", "relieved", "reluctant", "embarrassed", "defiant", "bored", "annoyed", "curious", "determined", "panicked", "fearful", "in pain", "ecstatic", "euphoric", "shy", "ashamed", "cheeky", "vulnerable", "angry", "frustrated", "hopeful"
];
const PF_HAIR_TYPES = [
  // Length/Type
  "long hair", "short hair", "medium hair", "pixie cut", "buzz cut", "shaved", "bald", "ponytail", "braids", "pigtails", "space buns", "top knot", "undercut", "sidecut", "fade", "mullet", "shoulder-length", "lob", "bob cut", "pageboy", "bowl cut",
  // Texture
  "straight hair", "wavy hair", "curly hair", "afro", "coily hair", "frizzy", "messy", "spiky", "slicked back", "wet hair", "bedhead",
  // Color
  "black hair", "blonde", "platinum", "strawberry blonde", "brown hair", "auburn", "ginger", "red hair", "silver", "grey hair", "white hair", "blue", "pink", "purple", "green", "turquoise", "teal", "rainbow hair", "highlighted", "ombre", "frosted tips", "streaks", "root fade", "two-tone"
];
const PF_EYES = [
  "blue eyes", "green eyes", "hazel eyes", "grey eyes", "amber eyes", "brown eyes", "violet eyes", "heterochromia", "cat eyes", "doe eyes", "almond eyes", "monolid", "big eyes", "narrow eyes", "hooded eyes", "droopy eyes", "sleepy eyes", "red eyes", "glowing eyes", "reflective eyes", "glassy eyes", "teary eyes", "sparkling eyes", "smoky eyes", "thick lashes", "false lashes", "heavy eyeliner", "natural lashes", "squinting", "side-eye", "rolling eyes", "pupil dilation", "crying", "hypnotized eyes", "dazed look"
];
const PF_HANDS = [
  "open hands", "clenched fists", "peace sign", "middle finger", "rock on", "ok sign", "thumbs up", "thumbs down", "pointing", "shushing", "blowing a kiss", "cupped hands", "hands behind head", "hands on hips", "crossed arms", "covering mouth", "covering face", "scratching head", "snapping fingers", "jazz hands", "victory sign", "praying hands", "fingertips together", "index finger on lips", "palms out", "hands together", "making a heart", "salute", "finger guns", "hands in pockets", "arms folded", "hands on cheeks", "hands on knees", "hands clasped", "hands in prayer", "nail biting", "hair twirling", "palm reading", "handcuffed", "grabbing", "waving"
];
const PF_CLOTHING = [
  "t-shirt", "tank top", "crop top", "tube top", "long sleeve", "hoodie", "sweater", "jacket", "leather jacket", "blazer", "suit", "button-up shirt", "dress shirt", "vest", "blouse", "dress", "sundress", "evening gown", "cocktail dress", "mini skirt", "maxi skirt", "pleated skirt", "pencil skirt", "shorts", "cargo shorts", "jeans", "skinny jeans", "bootcut", "yoga pants", "leggings", "jeggings", "joggers", "sweatpants", "overalls", "romper", "onesie", "bodysuit", "bikini", "swimsuit", "monokini", "board shorts", "speedo", "lingerie", "lace panties", "bralette", "pushup bra", "corset", "bustier", "garter belt", "stockings", "thigh highs", "knee highs", "ankle socks", "fishnets", "pantyhose", "platform boots", "sneakers", "flip-flops", "slippers", "barefoot", "combat boots", "heels", "stilettos", "wedges", "ankle boots", "riding boots", "sandals", "work boots", "rain boots", "cowboy boots", "beret", "beanie", "baseball cap", "bucket hat", "fedora", "crown", "tiara", "headband", "hair clips", "bandana", "bow tie", "tie", "scarf", "cape", "cloak", "hood", "mask", "gloves", "mittens", "arm warmers", "wristbands", "watch", "choker", "necklace", "bracelet", "anklet", "rings", "piercings", "earrings", "nose ring", "septum ring", "belly chain", "body harness"
];
const PF_PROPS = [
  "smartphone", "mirror", "lipstick", "compact mirror", "wine glass", "cocktail", "beer bottle", "champagne flute", "cigarette", "vape", "candle", "book", "notebook", "pen", "pencil", "paintbrush", "palette", "easel", "camera", "Polaroid", "tripod", "selfie stick", "ring light", "microphone", "headphones", "game controller", "VR headset", "remote control", "handcuffs", "feather", "whip", "rope", "chains", "blindfold", "mask", "ball gag", "vibrator", "dildo", "butt plug", "strap-on", "bullet vibe", "magic wand", "anal beads", "clamp", "nipple clamps", "cock ring", "body oil", "lotion", "baby oil", "chocolate syrup", "whipped cream", "strawberries", "ice cubes", "rose petals", "stuffed animal", "teddy bear", "blanket", "pillow", "bean bag", "plushie", "ball", "dice", "cards", "board game", "puzzle", "key", "lock", "diary", "glasses", "sunglasses"
];
const PF_BACKGROUNDS = [
  "sunset", "sunrise", "midnight", "afternoon", "rainy day", "stormy sky", "clear blue sky", "overcast", "blizzard", "snowstorm", "thunderstorm", "foggy", "misty", "smoky", "moonlit", "starry night", "northern lights", "city skyline", "urban jungle", "forest", "deep woods", "riverbank", "mountains", "meadow", "prairie", "tundra", "desert", "canyon", "cliffs", "beach", "tide pools", "coral reef", "volcano", "glacier", "island", "swamp", "marsh", "lake", "pond", "hot spring", "cave", "grotto", "mine", "sewers", "rooftop", "warehouse", "garage", "attic", "cellar", "basement", "dorm room", "studio", "art loft", "coffee shop", "library", "bookstore", "market", "mall", "arcade", "theater", "nightclub", "dance floor", "strip club", "casino", "mansion", "palace", "castle", "cathedral", "church", "temple", "shrine", "museum", "exhibit", "train station", "airport", "bus stop", "highway", "intersection", "parking garage", "playground", "park", "amusement park", "circus", "fairground", "zoo", "aquarium", "science lab", "computer lab", "server room", "VR space", "metaverse"
];
const PF_COLORS = [
  "red", "scarlet", "crimson", "maroon", "burgundy", "rose", "pink", "magenta", "fuchsia", "hot pink", "coral", "peach", "orange", "apricot", "amber", "gold", "yellow", "lemon", "butter", "cream", "ivory", "white", "platinum", "silver", "grey", "charcoal", "black", "midnight", "navy", "blue", "azure", "sky blue", "teal", "aqua", "turquoise", "seafoam", "emerald", "mint", "green", "lime", "olive", "forest green", "sage", "moss", "brown", "chocolate", "bronze", "caramel", "beige", "tan", "copper", "rust", "violet", "lavender", "purple", "indigo", "plum", "mauve", "eggplant", "neon", "pastel", "rainbow", "gradient", "color splash", "iridescent", "pearlescent", "glow", "matte", "shiny", "glossy", "translucent", "opaque"
];
const PF_LIGHT = [
  "soft light", "hard light", "dappled light", "backlit", "side-lit", "front-lit", "rim light", "glow", "halo", "spotlight", "candlelight", "firelight", "lantern light", "neon glow", "fluorescent", "incandescent", "LED", "strobe", "disco lights", "moonlight", "star glow", "laser light", "light leaks", "lens flare", "bokeh", "prismatic", "split lighting", "dramatic shadow", "chiaroscuro", "ambient light", "golden hour", "blue hour", "sunbeam", "god rays", "crepuscular rays", "rainbow light", "projected patterns"
];
const PF_WEATHER = [
  "clear", "cloudy", "rainy", "drizzling", "thunderstorm", "snowing", "blizzard", "hailing", "foggy", "misty", "humid", "dry", "breezy", "windy", "gusty", "smoky", "hazy", "stormy", "monsoon", "tornado", "hurricane", "sandstorm", "typhoon", "eclipse", "rainbow", "double rainbow", "aurora borealis", "dust storm", "heat wave", "cold snap", "lightning storm"
];
const PF_LANGUAGES = [
  "English", "French", "Spanish", "German", "Italian", "Portuguese", "Russian", "Japanese", "Mandarin", "Cantonese", "Korean", "Hindi", "Arabic", "Turkish", "Greek", "Dutch", "Swedish", "Norwegian", "Danish", "Finnish", "Czech", "Polish", "Hungarian", "Ukrainian", "Hebrew", "Thai", "Vietnamese", "Indonesian", "Tagalog", "Malay", "Romanian", "Bulgarian", "Serbian", "Croatian", "Slovak", "Slovenian", "Estonian", "Latvian", "Lithuanian", "Icelandic", "Irish", "Welsh", "Scottish Gaelic", "Esperanto", "Latin", "Klingon", "Elvish", "Dothraki"
];
const PF_EMOJI_BANK = [
  // Faces/People
  "😀","😂","😅","😈","😍","🥵","🥶","🥴","😱","🥳","🥺","😘","😚","😳","😜","😝","😏","😒","🙄","😩","😭","😇","🥰","😡","🤬","🤯","🤪","🤫","🤭",
  // Body/Hand
  "👍","👎","🤞","✌️","🤘","👌","🙏","👏","🙌","💪","🦵","🦶","🦷","👄","👅","👀","👁️","🧠","👂","🦻",
  // Love/Sexy
  "❤️","🧡","💛","💚","💙","💜","🖤","💔","💕","💞","💓","💗","💖","💘","💝","💋","👙","🍑","🍆","🌶️","💦","👠","👗","💍","👑","🦄",
  // Objects/Other
  "🎲","🃏","🎮","📷","📱","🎧","🎤","🎬","💡","🔥","🌈","✨","⚡","🌟","☀️","🌤️","🌥️","🌦️","⛅","☁️","🌫️","🌙","🌌","🌃","🎇","🎆","🎉","🎊","🧊","💧","🩸","🕯️","💣","🔪","🪓","🔫","🏹",
  // Punctuation/Markup
  "***","___","___","!!!","???","///","...","--","~~","==","<>","[]","()","{}","#","@","$","%","&","*","!","?","~","^","|","\\","/",";","'",":",",",".",
  // Kaomoji
  "( ͡° ͜ʖ ͡°)","(ᵔᴥᵔ)","(｡♥‿♥｡)","(✿◠‿◠)","( ͡ᵔ ͜ʖ ͡ᵔ )","(¬‿¬)","(☞ﾟヮﾟ)☞","(づ｡◕‿‿◕｡)づ","¯\\_(ツ)_/¯","ಠ_ಠ","(╯°□°）╯︵ ┻━┻","(☞ ͡° ͜ʖ ͡°)☞","ʕ•ᴥ•ʔ"
];
// ==== PF_PROMPT_BRAIN WORD BANKS: ROUND 1 ====

// Mega Adjectives (over 200: old school, modern, rare, pro, pop culture)
const PF_ADJECTIVES = [
  // Visual/Descriptive
  "vivid", "luminous", "velvety", "opulent", "sleek", "sublime", "gothic", "plush", "ethereal", "euphoric", "moody",
  "gritty", "dreamy", "crystalline", "pristine", "frosted", "burnished", "celestial", "spectral", "volatile", "polished",
  "feathered", "saturated", "cinematic", "noir", "raw", "decadent", "surreal", "vintage", "hyperreal", "textured",
  "ominous", "lush", "voluptuous", "torrid", "neon", "holographic", "dappled", "aurora", "steamy", "muted", "iridescent",
  "opalescent", "spiky", "dusky", "fiery", "glossy", "candy-colored", "matte", "dusky", "hazy", "bokeh", "mosaic", "splattered",
  // Personality/Mood
  "fiesty", "sultry", "aloof", "feral", "innocent", "devilish", "naive", "dominant", "coy", "brazen", "playful", "sinister",
  "submissive", "curious", "manic", "impish", "naughty", "blissful", "enigmatic", "whimsical", "tender", "melancholic",
  "apathetic", "jealous", "passionate", "arrogant", "mischievous", "discreet", "wild", "restless", "spiteful", "gentle",
  "brash", "eccentric", "delicate", "moody", "intense", "fierce", "serene", "cheeky", "cheery", "exuberant", "perky",
  "brooding", "distant", "smitten", "giddy", "grumpy", "snarky", "provocative", "chill", "neurotic",
  // Modern/Internet Slang
  "drippy", "extra", "lit", "slay", "savage", "woke", "sus", "based", "cringe", "poggers", "glow-up", "yeet", "no-cap",
  "vibe-y", "rizzed", "stan", "simp", "goated", "ghosted", "bet", "snatched", "chad", "Karen", "sigma", "gyatt", "zesty",
  "rizz", "drip", "boomer", "zoomer", "NPC", "sussy", "mid", "cheugy", "eshay", "on-fleek",
  // NSFW (censored, for filter-beating magic)
  "risqué", "lewd", "saucy", "raunchy", "taboo", "forbidden", "salacious", "kinky", "spicy", "uncensored", "XXX", "provocative",
  "teasing", "tantalizing", "scandalous", "explicit", "suggestive", "naughty", "voluptuous", "sultry", "bodacious",
  // Special/Emotional
  "subliminal", "psychedelic", "hypnotic", "trippy", "surrealist", "phantasmagoric", "otherworldly", "eldritch", "haunting",
  "glitched", "fractured", "timeless", "venerable", "timid", "volatile", "yearning", "lustful", "aching",
];

// Mega Verbs (for prompts, actions, directions: 150+)
const PF_VERBS = [
  // Movement/Action
  "run", "walk", "jump", "crawl", "leap", "spin", "sway", "stagger", "glide", "saunter", "pounce", "dodge", "strut",
  "shiver", "twitch", "flinch", "lurch", "swagger", "tremble", "skip", "stroll", "prance", "slither", "slide", "hop",
  "roll", "bounce", "march", "sprint", "charge", "tiptoe", "amble", "barrel", "dart", "hurtle", "dart", "coast", "tread",
  // Facial/Emotion
  "smile", "frown", "smirk", "grimace", "glare", "wink", "sneer", "beam", "leer", "pout", "scowl", "blush", "grin",
  "snarl", "glower", "giggle", "sigh", "groan", "moan", "gasp", "snicker", "chuckle", "sob", "weep", "guffaw", "scream",
  "shout", "whisper", "murmur", "mutter", "shriek", "howl", "yelp", "bark", "pant", "hum", "chant",
  // Interact/Touch
  "caress", "grip", "stroke", "grab", "hold", "tease", "tickle", "poke", "prod", "nudge", "scratch", "pinch", "squeeze",
  "clutch", "fondle", "spank", "rub", "trace", "brush", "press", "hug", "cuddle", "embrace", "kiss", "lick", "nibble",
  "bite", "nuzzle", "snuggle", "pet", "massage", "grope", "play", "fondle", "toy with",
  // Scene/Camera
  "zoom", "pan", "focus", "blur", "rotate", "tilt", "track", "frame", "snap", "capture", "record", "shoot", "film", "freeze",
  "highlight", "isolate", "crop", "fade", "flash", "backlight", "silhouette", "spotlight", "illuminate",
  // NSFW (censored)
  "arouse", "entice", "stimulate", "seduce", "excite", "tempt", "inflame", "enchant", "ravish", "beckon", "tease",
  "taunt", "tantalize", "thrill", "provoke", "torment", "flirt", "ogle", "lust after", "fantasize", "gyrate", "grind",
];

// Mega Nouns (people, parts, body, props, environment, objects: 200+)
const PF_NOUNS = [
  // Characters/People
  "girl", "woman", "boy", "man", "person", "dancer", "model", "angel", "devil", "witch", "robot", "elf", "nymph", "faerie",
  "siren", "vampire", "werewolf", "goddess", "warrior", "student", "teacher", "nurse", "cop", "firefighter", "paramedic",
  "gamer", "cosplayer", "influencer", "celebrity", "idol", "waitress", "bartender", "maid", "mistress", "dominatrix",
  // Body/Anatomy
  "face", "eyes", "lips", "mouth", "smile", "hair", "cheeks", "neck", "shoulders", "arms", "hands", "fingers", "waist",
  "hips", "legs", "thighs", "knees", "feet", "toes", "back", "spine", "stomach", "chest", "breasts", "nipple", "torso",
  "belly", "butt", "booty", "hips", "crotch", "groin", "labia", "clitoris", "penis", "testicles", "vagina", "anus",
  // Props/Objects
  "mirror", "camera", "phone", "bed", "sofa", "chair", "couch", "table", "lamp", "window", "curtain", "blanket", "pillow",
  "sheet", "towel", "shower", "bathtub", "pool", "hot tub", "car", "motorcycle", "bicycle", "skateboard", "rollerblades",
  // Scenery/Environment
  "beach", "forest", "meadow", "mountain", "lake", "river", "desert", "city", "street", "rooftop", "alley", "club", "bar",
  "party", "festival", "carnival", "concert", "studio", "gym", "locker room", "stage", "runway", "bedroom", "bathroom",
  "office", "classroom", "hospital", "ambulance", "park", "garden", "balcony", "fire escape",
];

// Mega Styles (art/genre/photography: 100+)
const PF_STYLES = [
  "photorealistic", "cinematic", "analog film", "35mm", "digital painting", "sketch", "cartoon", "anime", "manga", "pixel art",
  "oil painting", "watercolor", "charcoal", "ink", "low poly", "3D render", "isometric", "concept art", "vaporwave", "futuristic",
  "cyberpunk", "steampunk", "art nouveau", "art deco", "impressionist", "expressionist", "minimalist", "maximalist", "abstract",
  "pop art", "comic book", "synthwave", "surrealist", "baroque", "rococo", "gothic", "postmodern", "hyperreal", "realism",
  "noir", "documentary", "vintage", "retro", "lo-fi", "high key", "low key", "bokeh", "long exposure", "HDR", "tilt shift",
  "macro", "ultra wide", "soft focus", "monochrome", "duotone", "sepia", "infrared", "neon", "UV", "x-ray", "ultraviolet",
];

// Mega Emoji/Unicode/ASCII (useful for prompt variety, filtering, filter-beating: 100+)
const PF_EMOJI = [
  "😈", "😇", "😍", "🥵", "🥺", "😳", "😉", "🤤", "😏", "🫦", "👅", "👀", "🔥", "💦", "🍑", "🍆", "🌈", "🌊", "🩷", "💋", "🧸",
  "👄", "🙈", "🫶", "💃", "🕺", "🦄", "🍒", "💎", "🖤", "🎀", "🛌", "🛀", "🏩", "💣", "🎲", "💥", "🫧", "✨", "🌟", "🌠", "🛸",
  "🦾", "🧠", "🎧", "🎤", "📸", "📷", "🎬", "🖼️", "🎨", "📚", "🔞", "🚫", "🎭", "👑", "🎩", "🐾", "🦋", "🌺", "🌙", "🌌",
  "💯", "🆒", "🆗", "🆓", "🆕", "🚀", "🛰️", "🛸", "⚡", "🌩️", "⛈️", "🌪️", "🌤️", "🌅", "🌃", "🌇", "🌆", "🧬", "💊", "🧪",
  "🔬", "📡", "🛠️", "🔧", "🔩", "💡", "🔦", "🕳️", "🪞", "🗝️", "🪐", "🛸", "👽", "🤖",
];


// ==== END ROUND 1 ====

const PF_BODY_TYPES = [
  "slim", "slender", "petite", "skinny", "lean", "fit", "athletic", "toned", "muscular", "broad-shouldered", "curvy", "full-figured", "voluptuous",
  "hourglass", "pear-shaped", "apple-shaped", "rectangular build", "tall", "short", "average height", "lanky", "stocky", "chubby", "plus-size",
  "big-boned", "tiny waist", "busty", "flat-chested", "large chest", "big hips", "narrow hips", "long legs", "short legs", "shapely calves",
  "thick thighs", "thigh gap", "bubble butt", "small butt", "round butt", "broad back", "defined abs", "soft belly", "flat stomach",
  "toned arms", "tattoos", "freckles", "scar", "birthmark", "piercings", "hairy", "smooth skin", "tan lines", "pale skin", "sun-kissed",
  "dark skin", "olive skin", "light skin", "porcelain skin", "alabaster", "bronzed", "ruddy", "rosy cheeks", "blushing", "wrinkles", "crow’s feet",
  "baby face", "sharp jawline", "strong chin", "round face", "heart-shaped face", "square jaw", "double chin", "dimples", "gapped teeth", "braces",
  "feminine features", "masculine features", "androgynous", "genderfluid", "transgender", "non-binary", "ambiguous gender", "broad chest",
  "hairy chest", "smooth chest", "bald", "shaved head", "buzz cut", "long hair", "bob cut", "pixie cut", "afro", "cornrows", "braids", "ponytail",
  "pigtails", "messy bun", "curly hair", "straight hair", "wavy hair", "spiky hair", "mohawk", "dyed hair", "ombre hair", "highlights", "roots showing",
  "natural hair", "gray hair", "white hair", "pastel hair", "rainbow hair", "streaks", "side shave", "undercut", "widow’s peak"
];
const PF_FACE_EXPRESSIONS = [
  "smiling", "grinning", "smirk", "playful look", "mischievous grin", "serious expression", "frown", "pout", "sad eyes", "crying", "teary-eyed",
  "angry", "rage", "furious", "disgusted", "confused", "surprised", "shocked", "wide-eyed", "eyebrow raised", "wink", "blowing a kiss",
  "biting lip", "licking lips", "sultry stare", "bedroom eyes", "intense gaze", "blank stare", "bored", "sleepy", "dozing", "yawning", "blushing",
  "flushed", "sighing", "rolling eyes", "eye roll", "side-eye", "nervous smile", "timid", "shy glance", "confident", "coy smile", "innocent look",
  "cheeky", "teasing", "mocking", "skeptical", "raised eyebrow", "deadpan", "stoic", "determined", "focused", "dreamy", "lost in thought",
  "daydreaming", "melancholy", "nostalgic", "relieved", "content", "excited", "ecstatic", "joyful", "gleeful", "giggling", "laughing", "roaring with laughter",
  "smiling with teeth", "smiling without teeth", "biting tongue", "pursed lips", "lip gloss", "open mouth", "closed mouth", "sneering"
];
const PF_CLOTHING = [
  // Clean & mainstream
  "casual clothes", "jeans and t-shirt", "hoodie", "sweater", "tank top", "sundress", "gown", "little black dress", "miniskirt", "crop top",
  "leggings", "business suit", "school uniform", "workout gear", "swimsuit", "bikini", "one-piece swimsuit", "sweats", "cargo pants", "denim jacket",
  "overalls", "pajamas", "robe", "bathrobe", "evening dress", "gala dress", "vintage outfit", "retro style", "grunge look", "punk outfit", "gothic dress",
  "leather jacket", "varsity jacket", "sports jersey", "lingerie", "bralette", "sports bra", "panties", "boxers", "briefs", "stockings", "thigh-highs",
  "garter belt", "fishnets", "lace bodysuit", "corset", "pasties", "see-through blouse", "open shirt", "unbuttoned", "unzipped jeans", "shirtless",
  "barefoot", "socks", "combat boots", "heels", "stilettos", "sneakers", "flip-flops", "sandals", "ankle boots", "thigh boots", "platform shoes"
];
const PF_HAIR_COLORS = [
  "blonde", "brunette", "redhead", "auburn", "black hair", "brown hair", "platinum", "silver", "white hair", "gray hair", "blue hair",
  "green hair", "pink hair", "purple hair", "magenta", "teal", "pastel rainbow", "dyed tips", "ombre", "frosted tips"
];
const PF_GENRES = [
  "romantic", "erotic", "intimate", "sensual", "dramatic", "adventurous", "comedic", "tragic", "action-packed", "noir", "mystery", "suspense",
  "thriller", "horror", "gothic", "fantasy", "sci-fi", "cyberpunk", "post-apocalyptic", "slice of life", "coming-of-age", "satire", "parody", "spoof",
  "musical", "superhero", "cartoon", "anime", "magical realism", "surreal", "abstract", "minimalist", "maximalist", "vintage", "retro", "modern",
  "futuristic", "steampunk", "baroque", "rococo", "expressionist", "pop art", "impressionist"
];
const PF_ENVIRONMENTS = [
  "city street", "rooftop", "bedroom", "bathroom", "shower", "locker room", "kitchen", "dining room", "living room", "hotel room", "club",
  "bar", "library", "classroom", "school gym", "beach", "forest", "mountain", "meadow", "swimming pool", "hot tub", "spa", "sauna",
  "subway", "elevator", "office", "cubicle", "boardroom", "warehouse", "garage", "parking lot", "car", "limousine", "motorcycle", "park",
  "garden", "balcony", "patio", "attic", "basement", "underground", "dungeon", "castle", "mansion", "cottage", "loft", "studio", "stage",
  "movie set", "soundstage", "photobooth", "mirror room", "futuristic lab", "virtual reality", "dreamscape"
];
const PF_ROLEPLAY = [
  "schoolgirl", "nurse", "doctor", "police officer", "firefighter", "maid", "butler", "librarian", "professor", "teacher", "student", "cheerleader",
  "football player", "coach", "spy", "secret agent", "superhero", "villain", "monster", "vampire", "werewolf", "zombie", "robot", "android",
  "AI assistant", "witch", "wizard", "knight", "pirate", "sailor", "pilot", "flight attendant", "bartender", "dancer", "stripper", "dominatrix",
  "submissive", "master", "servant", "prince", "princess", "queen", "king", "emperor", "goddess", "angel", "demon", "alien", "mermaid", "centaur"
];
const PF_SLANG = [
  "baddie", "thicc", "bae", "lit", "savage", "sus", "cringe", "goat", "mood", "vibe", "yass", "queen", "king", "slay", "yeet", "flex", "stan",
  "simp", "edgy", "ghost", "lowkey", "highkey", "tbh", "dm", "irl", "lmao", "rofl", "lol", "omg", "wtf", "smh", "fml", "nsfw", "sfw",
  "💦", "🍑", "🍆", "🔥", "😈", "👀", "😘", "😏", "😍", "🤤", "🖤", "✨", "🎀", "🦄", "🐱", "🐻", "💋", "🤍"
];
// --- VISUAL SUBJECTS & NOUNS ---
const visualNouns = [
  "woman", "man", "girl", "boy", "robot", "angel", "demon", "fairy", "elf", "orc", "witch", "wizard", "warrior",
  "dragon", "wolf", "cat", "dog", "fox", "lion", "tiger", "alien", "vampire", "zombie", "cyborg", "nurse", "doctor",
  "teacher", "student", "soldier", "queen", "king", "prince", "princess", "doll", "mermaid", "pirate", "samurai",
  "ninja", "goblin", "succubus", "incubus", "spy", "knight", "hunter", "gamer", "superhero", "villain", "monster",
  "detective", "athlete", "cheerleader", "police", "firefighter", "scientist", "cowgirl", "cowboy", "maid", "butler",
  "rockstar", "idol", "celebrity", "clown", "magician", "ghost", "angel", "punk", "emo", "goth", "skater", "influencer",
  "genie", "alien princess", "android", "mutant", "alien overlord", "youtuber", "twitch streamer", "athlete", "biker",
  "mechanic", "steampunk adventurer", "space marine", "necromancer", "alchemist", "hacker", "cyberpunk", "femboy",
  "himbo", "giga chad", "waifu", "husbando", "cosplayer", "model", "photographer"
];

// --- ADJECTIVES (VISUAL, PERSONALITY, MOOD) ---
const adjectives = [
  "gorgeous", "sexy", "hot", "adorable", "cute", "beautiful", "handsome", "muscular", "chiseled", "petite", "tall",
  "short", "stocky", "athletic", "voluptuous", "slender", "curvy", "glamorous", "elegant", "classy", "wild", "punk",
  "gritty", "graceful", "mysterious", "moody", "cheerful", "intense", "innocent", "sultry", "fiery", "cool", "icy",
  "fierce", "bossy", "dominant", "submissive", "nerdy", "playful", "flirty", "sleepy", "shy", "coy", "bratty", "bold",
  "confident", "sassy", "moody", "pouty", "seductive", "stoic", "smirking", "smiling", "teasing", "brooding", "dreamy",
  "surprised", "determined", "whimsical", "jaded", "sarcastic", "aloof", "serene", "giddy", "bashful", "delicate",
  "hardcore", "euphoric", "radiant", "electric", "magnetic", "mischievous"
];

// --- BODY PARTS & FEATURES (CLEAN & NSFW-READY) ---
const bodyParts = [
  "face", "eyes", "lips", "mouth", "teeth", "nose", "cheeks", "ears", "hair", "bangs", "ponytail", "braids", "pigtails",
  "eyebrows", "lashes", "freckles", "dimples", "chin", "neck", "shoulders", "arms", "hands", "fingers", "nails",
  "breasts", "chest", "waist", "hips", "thighs", "legs", "feet", "toes", "back", "butt", "abs", "biceps", "calves",
  "spine", "collarbone", "ankles", "wrists", "knuckles", "nape", "belly", "navel", "groin", "crotch", "labia", "clit",
  "nipples", "areola", "vulva", "pubic hair", "inner thighs", "ass", "taint", "crack", "shaft", "tip", "testicles",
  "scrotum", "perineum", "anus", "pucker", "backdoor"
];

// --- ADULT & NSFW SYNONYMS / SLANG (MIXED) ---
const nsfwWords = [
  "pussy", "cock", "dick", "tits", "boobs", "ass", "butthole", "milkers", "package", "shaft", "cum", "jizz", "cream",
  "juices", "load", "squirt", "orgasm", "climax", "nipple", "suck", "lick", "ride", "mount", "grind", "grip", "stroke",
  "pump", "ram", "slam", "plow", "penetrate", "fuck", "bang", "blowjob", "oral", "deepthroat", "spitroast", "69",
  "missionary", "doggystyle", "cowgirl", "reverse cowgirl", "anal", "fingering", "handjob", "masturbate", "jill off",
  "jerk off", "play", "tease", "edge", "cumshot", "creampie", "facial", "spank", "slap", "pinch", "choke", "tie up",
  "dominatrix", "submissive", "switch", "rough", "gentle", "hardcore", "softcore", "voyeur", "exhibitionist", "breeding",
  "public", "private", "taboo", "forbidden", "fetish", "kink", "bdsm", "bondage", "leather", "latex", "lingerie"
];

// --- SLANG, MODERN & CLASSIC ---
const slangWords = [
  "baddie", "thicc", "drip", "vibe", "lit", "fire", "on fleek", "yeet", "sus", "based", "cringe", "edgy", "no cap",
  "slay", "queen", "king", "icon", "stan", "simp", "fyp", "irl", "bruh", "sheesh", "vibing", "flex", "hype", "woke",
  "ghost", "clapback", "mood", "lowkey", "highkey", "main character", "villain arc", "op", "ratio", "bussin", "fam",
  "bet", "shade", "salty", "snatched", "receipts", "ship", "OTP", "DM", "savage", "goat", "npc", "pog", "grind", "fomo",
  "stan", "tea", "spill", "iconic", "sussy", "mid", "boujee"
];

// --- ACTIONS / VERBS / PROMPT KEYWORDS ---
const actions = [
  "posing", "smiling", "biting lip", "winking", "making eye contact", "looking away", "laughing", "sleeping",
  "dancing", "jumping", "running", "sitting", "lying down", "standing", "leaning", "crawling", "kneeling", "squatting",
  "hugging", "kissing", "caressing", "stroking", "touching", "grabbing", "holding", "licking", "sucking", "biting",
  "spreading", "thrusting", "grinding", "mounting", "teasing", "flirting", "seducing", "dominating", "submitting",
  "whispering", "moaning", "yelling", "crying", "panting", "gasping", "arching back", "trembling", "shuddering",
  "flexing", "showing off", "modeling", "blushing", "sweating", "panting", "dripping", "cumming", "edging", "milking"
];

// --- SETTINGS / SCENES / LOCATIONS ---
const scenes = [
  "bedroom", "bathroom", "shower", "bathtub", "beach", "forest", "meadow", "lake", "hot tub", "jacuzzi", "kitchen",
  "living room", "studio", "photobooth", "car", "motel", "locker room", "classroom", "gym", "rooftop", "alley", "club",
  "dungeon", "castle", "mansion", "penthouse", "subway", "office", "hospital", "spa", "sauna", "backyard", "balcony",
  "attic", "basement", "tent", "campsite", "hotel", "train", "bus", "warehouse", "barn", "poolside", "garden", "patio",
  "park", "streets", "downtown", "underground", "nightclub", "stage", "arena", "graveyard"
];

// --- STYLES, LIGHTING, EFFECTS ---
const visualStyles = [
  "photorealistic", "cinematic", "moody", "high key", "low key", "backlit", "rim light", "side-lit", "dramatic shadows",
  "soft light", "golden hour", "blue hour", "neon lights", "cyberpunk", "vaporwave", "steampunk", "grunge", "art deco",
  "baroque", "surreal", "minimalist", "noir", "vintage", "retro", "modern", "hyperreal", "glam", "luxurious", "dreamy",
  "bokeh", "foggy", "misty", "rainy", "stormy", "sunny", "overcast", "harsh light", "spotlight", "studio light",
  "ambient light", "twilight", "sunset", "sunrise", "firelight", "candlelight", "blacklight", "UV", "infrared"
];

// --- EMOTIONS / MOOD ---
const emotions = [
  "happy", "sad", "angry", "excited", "nervous", "anxious", "terrified", "aroused", "confused", "pleased", "relaxed",
  "frustrated", "hopeful", "determined", "playful", "defiant", "embarrassed", "proud", "ashamed", "curious", "shocked",
  "mischievous", "joyful", "tender", "bashful", "serene", "apathetic", "enraged", "flustered", "giddy", "hypnotized",
  "melancholic", "amused", "smitten", "lustful", "hungry", "sleepy"
];

// --- PUNCTUATION & EMPHASIS ---
const punctuation = [
  ".", "!", "?", "...", "—", "~", "*", "**", "()", "[]", "{}", ":", ";", "->", "<3", "!!", "???", "***", "//"
];

// --- ANIMATION / VIDEO / MOVIE LINGO ---
const animationWords = [
  "frame-by-frame", "stop motion", "motion blur", "cel shading", "2D", "3D", "render", "keyframe", "loop", "GIF",
  "sprite", "cutscene", "animatic", "compositing", "post-production", "transition", "camera pan", "zoom", "close-up",
  "wide shot", "tracking shot", "slow motion", "fast forward", "reverse", "split screen", "voiceover", "soundtrack",
  "caption", "subtitle", "sound fx", "fade in", "fade out", "iris in", "dissolve", "wipe", "green screen", "rotoscope",
  "motion capture", "VFX", "SFX", "score", "dialogue", "screenplay", "storyboard", "animator", "director", "producer"
];

// --- MEME / SOCIAL / VIRAL PHRASES ---
const memeWords = [
  "when you", "it me", "no thoughts head empty", "feeling cute might delete later", "that feeling when", "TFW",
  "this is fine", "big mood", "weird flex but ok", "literally me", "can't even", "savage", "goals", "woke up and chose violence",
  "I'm baby", "not a phase", "main character energy", "it do be like that", "vibe check", "zero chill", "sippin' tea",
  "ok boomer", "let that sink in", "blessed", "cursed", "level 9000", "smol bean", "senpai noticed me", "on god",
  "say less", "sheesh", "deadass", "as seen on TV", "new phone who dis", "brainrot"
];

// --- NAMES (FICTIONAL/GENERIC) ---
const names = [
  "Alex", "Sam", "Jess", "Taylor", "Jordan", "Casey", "Morgan", "Sky", "Riley", "Drew", "Avery", "Jamie", "Hunter",
  "Logan", "Reese", "Harley", "Quinn", "Phoenix", "River", "Aspen", "Blake", "Dakota", "Elliot", "Parker", "Rowan",
  "Sage", "Zion", "Indigo", "Echo", "Storm", "Lux", "Nova", "Ray", "Artemis", "Sable", "Shadow", "Rogue", "Maverick",
  "Vega", "Kit", "Jules", "Sloane", "Fox", "Chance"
];

// --- EMOJIS ---
const emojis = [
  "😍", "🥵", "🔥", "😈", "🥰", "😏", "😂", "👀", "💦", "🍑", "🍆", "😳", "💋", "🤤", "🙈", "🫦", "🥂", "🌈", "🦄", "😻",
  "👅", "🧿", "✨", "🩷", "🖤", "💚", "🧡", "💙", "💜", "🤍", "🩵", "❤️‍🔥", "🫶", "🎬", "📷"
];
// --- PSYCHEDELIC, SURREALISM, FANTASY, FX ---
const psychedelicWords = [
  "psychedelic", "trippy", "hallucinogenic", "acid trip", "kaleidoscopic", "neon", "glowing", "rainbow", "vivid", "vibrant",
  "fractals", "mandala", "dreamlike", "mind-bending", "LSD", "magic mushrooms", "melting", "dissolving", "blooming", "cosmic",
  "spiritual", "aura", "radiating", "shimmering", "hypnotic", "swirling", "liquid", "electric", "iridescent", "glitch",
  "spectrum", "laser beams", "multicolored", "strobe", "pixelated", "holographic", "ultraviolet", "chromatic aberration",
  "infinite", "otherworldly", "extraterrestrial", "alternate reality", "paradoxical", "timeless", "fluid", "mirage", "prismatic",
  "morphing", "fantastical", "dreamscape", "lucid", "visionary", "surreal", "phantasmagoric", "delirious", "psytrance", "vortex",
  "echoes", "mirror world", "time loop", "refracted", "dimension", "portal", "fantasy realm", "meta", "tesseract", "wormhole"
];

// --- FINE ART, PAINTING, ILLUSTRATION STYLES ---
const artStyles = [
  "impressionist", "expressionist", "cubist", "dada", "pop art", "abstract", "pointillist", "minimalist", "futurist", "modernist",
  "postmodern", "photo-realistic", "charcoal sketch", "watercolor", "oil painting", "ink drawing", "digital art", "comic book",
  "anime", "manga", "pixel art", "line art", "flat color", "airbrush", "spray paint", "chalk", "graffiti", "collage", "surrealism",
  "hyperreal", "low poly", "cut paper", "silhouette", "posterized", "matte painting", "vector", "isometric", "3D modeling",
  "cell shading", "mixed media", "claymation", "stop motion", "chalk pastel", "charcoal", "fresco", "tattoo", "body paint"
];

// --- FANTASY SCENES, SETTINGS, AND ICONS ---
const fantasySettings = [
  "enchanted forest", "crystal cave", "volcanic lair", "haunted mansion", "floating island", "magic castle", "underwater city",
  "moonlit glade", "fairy circle", "goblin market", "cloud kingdom", "dragon's den", "witch's cottage", "steampunk city",
  "clockwork factory", "sky ship", "portal gate", "eldritch temple", "ancient ruins", "forgotten tomb", "spirit realm",
  "mirror lake", "abyss", "astral plane", "starfield", "dream palace", "eldritch void", "crystal palace", "sunken ruins",
  "rainbow bridge", "mythic volcano", "snow-capped peak", "whispering woods", "eldritch swamp", "coral reef", "blasted wasteland"
];

// --- MOODS & ATMOSPHERES (EXTENDED) ---
const moods = [
  "ecstatic", "melancholic", "nostalgic", "restless", "ominous", "ethereal", "oppressive", "liberated", "wistful", "serene",
  "paranoid", "elated", "haunted", "enchanted", "foreboding", "mystical", "delirious", "transcendent", "triumphant",
  "haunted", "enraptured", "hypnotized", "energized", "sinister", "gloomy", "peaceful", "overwhelmed", "rapturous",
  "desolate", "thrilled", "euphoric", "introspective", "wistful", "anxious", "ominous", "overjoyed", "vulnerable"
];

// --- SPECIAL EFFECTS, FILTERS, VISUAL FX ---
const fxWords = [
  "double exposure", "infrared", "x-ray", "vaporwave filter", "polaroid", "motion blur", "lens flare", "chromatic shift",
  "bokeh", "fisheye", "kaleidoscope", "mirror", "glitch art", "datamosh", "pixelation", "vhs effect", "crt scanlines",
  "static", "vignette", "tint", "duotone", "sepia", "grayscale", "selective color", "toon shader", "outline", "posterize",
  "sunbeams", "light leaks", "dream blur", "aura effect", "halo", "radiance", "ghost image", "soft focus", "backlit shadow"
];

// --- MONSTERS, MYTH, AND SURREAL CREATURES ---
const monsterWords = [
  "shapeshifter", "chimera", "hydra", "banshee", "kraken", "leviathan", "werewolf", "minotaur", "gargoyle", "wendigo",
  "mothman", "lizardman", "harpy", "siren", "dryad", "nymph", "djinn", "ogre", "troll", "golem", "sphinx", "manticore",
  "cerberus", "basilisk", "medusa", "phoenix", "salamander", "cockatrice", "roc", "giant", "yeti", "sasquatch", "bigfoot"
];
// --- MODERN SLANG & INTERNET LINGO (NEW/OLD SCHOOL) ---
const modernSlang = [
  "slay", "lit", "fire", "no cap", "sus", "yeet", "vibe", "mood", "flex", "salty", "simp", "stan", "ratio", "bussin", "ghost", "clout", "lowkey", "highkey", "fam", "bet", "ship", "shade", "cancel", "snatched", "woke", "thicc", "savage", "based", "cringe", "fomo", "rizz", "drip", "main character", "NPC", "grind", "goat", "w", "l", "slaps", "receipts", "sus af", "yass", "sksksk", "vibing", "deadass", "flexin", "hardcore", "gassed", "sheesh", "rip", "big yikes", "swole", "squad", "poppin", "shook", "suss", "banger", "tbh", "irl", "idk", "idc", "tfw", "smh", "rofl", "lol", "lmao", "bruh", "ayy", "woke af"
];

// --- NSFW + SAFE VARIANTS (EXAMPLES, LOGIC-READY) ---
const nsfwWords = [
  "nude", "naked", "bare", "exposed", "intimate", "sensual", "alluring", "provocative", "teasing", "suggestive", "topless", "lingerie", "scantily clad", "revealing", "bare-skinned", "unclothed", "cheeky", "seductive", "explicit", "steamy", "risqué", "sultry", "adult", "XXX", "uncensored", "erotic", "fetish", "taboo", "lewd", "hardcore", "playful", "kinky", "naughty", "racy", "boudoir", "after dark", "private", "forbidden", "wild", "fantasy", "voluptuous", "tempting", "bare-chested", "thigh gap", "see-through", "skimpy", "slippery", "glossy skin", "shiny", "moist", "aroused", "climax", "pleasure", "orgasmic", "bliss", "satisfying"
];
const nsfwCleanVariants = [
  "artistic nude", "elegant nude", "tasteful nude", "figure study", "intimate portrait", "implied nude", "classical pose", "studio glamour", "aesthetic sensual", "sensual fashion", "private moment", "ethereal", "serene", "dreamy", "soft focus", "natural beauty", "body positive", "romantic", "playful", "mysterious", "fantasy vibe", "muse", "timeless", "gentle", "expressive", "moody", "subtle", "inviting", "curious"
];

// --- VERBS, ACTIONS (QUADRUPLED, SCENE READY) ---
const actionVerbs = [
  "walks", "runs", "jumps", "dances", "spins", "leans", "kneels", "poses", "arches", "twirls", "reaches", "touches", "caresses", "grabs", "pulls", "pushes", "crawls", "climbs", "slides", "rolls", "stretches", "bends", "glides", "tiptoes", "perches", "balances", "stands", "sits", "reclines", "lounges", "lies down", "rolls over", "crouches", "hugs", "embraces", "kisses", "licks", "bites", "winks", "smiles", "laughs", "frowns", "gazes", "peeks", "stares", "squints", "glances", "nods", "shrugs", "waves", "signals", "beckons", "gestures", "snaps", "claps", "sways", "tilts", "nods off", "wakes", "shivers", "trembles", "moans", "whispers", "murmurs", "gasps", "pants", "sighs", "yelps", "giggles", "squeals"
];

// --- BODY, POSE, EXPRESSIONS ---
const bodyParts = [
  "eyes", "lips", "mouth", "neck", "shoulders", "collarbone", "arms", "hands", "fingers", "breasts", "chest", "waist", "hips", "thighs", "legs", "feet", "back", "buttocks", "calves", "ankles", "toes", "eyelashes", "cheeks", "chin", "forehead", "ears", "nose", "eyebrows", "jawline", "belly", "belly button", "groin", "private area", "pubic area", "intimate zone", "soft skin", "goosebumps"
];
const facialExpressions = [
  "smiling", "grinning", "pouting", "blushing", "frowning", "serious", "soft gaze", "intense stare", "teary-eyed", "playful smirk", "sensual", "mischievous", "coy", "wide-eyed", "sultry", "innocent", "curious", "dreamy", "focused", "biting lip", "parted lips", "aroused", "relaxed", "surprised", "satisfied", "delighted", "wistful", "confident", "bashful", "tender", "vulnerable", "inviting"
];

// --- SENSORY, TEXTURE, COLOR ---
const sensoryWords = [
  "soft", "silky", "smooth", "warm", "cool", "tingling", "electric", "velvet", "fuzzy", "slick", "glossy", "matte", "gritty", "wet", "dry", "sweaty", "sticky", "powdery", "creamy", "flushed", "glowing", "dappled", "radiant", "shimmering", "dewy", "luminescent", "sun-kissed", "frosted"
];
const colorWords = [
  "red", "crimson", "rose", "pink", "peach", "orange", "gold", "yellow", "lime", "green", "emerald", "teal", "cyan", "blue", "navy", "indigo", "violet", "lavender", "purple", "magenta", "brown", "tan", "ivory", "white", "silver", "grey", "charcoal", "black", "midnight", "opal", "pearl", "champagne", "blush", "bronze", "turquoise"
];

// --- PHOTOGRAPHY / CAMERA TERMS (PROMPT FRIENDLY) ---
const photoTerms = [
  "close-up", "macro", "bokeh", "wide shot", "POV", "cinematic", "soft lighting", "backlit", "rim light", "spotlight", "hard shadow", "studio lighting", "natural light", "overexposed", "underexposed", "motion blur", "focus pull", "depth of field", "aperture", "ISO", "shutter speed", "panorama", "portrait mode", "rule of thirds", "dynamic angle", "tilt shift", "fish eye", "vignette", "framing", "crop", "composition", "lens flare", "golden hour", "blue hour", "flash", "high contrast", "HDR", "low light", "sunbeam"
];

// --- RANDOM FILLER, FUN PROMPT BOOSTERS ---
const fillerWords = [
  "totally", "absolutely", "seriously", "honestly", "literally", "insanely", "epically", "crazy", "ridiculously", "surprisingly", "unbelievably", "secretly", "openly", "wildly", "magically", "undeniably", "supremely", "dangerously", "playfully", "softly", "boldly", "beautifully", "strangely", "unexpectedly", "almost", "just", "barely", "somehow", "effortlessly", "suddenly", "quietly", "loudly", "gently", "passionately"
];
// --- FASHION & ACCESSORIES ---
const fashionWords = [
  "dress", "mini skirt", "maxi dress", "crop top", "hoodie", "jean shorts", "overalls", "sundress", "romper", "cardigan", "tank top", "sports bra", "lace lingerie", "bralette", "high heels", "sneakers", "boots", "ballet flats", "hair bow", "scrunchie", "hair clip", "headband", "dangly earrings", "necklace", "choker", "bangles", "bracelet", "ring", "anklet", "clutch", "purse", "backpack", "crossbody bag", "fishnet stockings", "thigh-high socks", "knee-high boots", "pleated skirt", "tube top", "off-shoulder", "halter top", "oversized sweater"
];

// --- MAKEUP & BEAUTY ---
const makeupWords = [
  "lip gloss", "red lipstick", "matte lipstick", "winged eyeliner", "cat eyes", "glitter eyeshadow", "smoky eyes", "mascara", "false lashes", "blush", "highlighter", "contour", "foundation", "BB cream", "dewy skin", "freckles", "rosy cheeks", "nail polish", "acrylic nails", "french tips", "ombre nails", "sparkly nails", "hair extensions", "high ponytail", "braids", "messy bun", "soft curls", "beach waves", "rainbow hair", "pastel hair", "bangs"
];

// --- GIRLY SCENES / AESTHETICS ---
const girlyScenes = [
  "slumber party", "pillow fight", "shopping spree", "mall date", "coffee shop", "nail salon", "beauty parlor", "selfie session", "mirror selfie", "picnic in the park", "baking cookies", "bubble bath", "reading romance", "watching rom-coms", "stargazing", "sunset at the beach", "music festival", "concert night", "poolside lounging", "cute café", "flower field", "prom night", "birthday party", "ice cream date", "road trip", "bedroom makeover"
];

// --- CUTE & GIRLY EMOJIS (for prompts, or to inspire tone) ---
const girlyEmojis = [
  "💕", "💖", "✨", "🌸", "🎀", "🥰", "💅", "👗", "👛", "👠", "👑", "🌈", "🦋", "🌺", "🩰", "🍦", "🎉", "🥳", "🛍️", "🧁", "🎀", "🩷", "🌷", "💄", "📸"
];

// --- GIRLFRIEND/CRUSH/SOFT VIBES (Tone Words) ---
const softVibes = [
  "cuddly", "adorable", "lovely", "sweet", "innocent", "gentle", "flirty", "playful", "giggles", "shy", "dreamy", "enchanting", "sparkling", "bubbly", "affectionate", "heartfelt", "cozy", "warm", "inviting", "whimsical", "feminine", "delicate", "angelic", "tender", "caring", "sincere", "radiant"
];

// --- POSING & ACTIONS (Girly) ---
const girlyActions = [
  "twirling", "spinning", "skipping", "blowing a kiss", "winking", "playing with hair", "fixing makeup", "pouting", "making a heart with hands", "hugging a pillow", "lying on bed", "dangling feet", "holding flowers", "jumping in the air", "peeking from behind", "resting chin on hands", "sipping coffee", "biting lip", "tugging at shirt", "sitting cross-legged", "hugging knees", "leaning on wall", "dangling legs", "resting head on hand", "giggling"
];
const promptHacks = [
  "Use (parentheses) for strong focus, [brackets] for less.",
  "Try weights: 'beautiful face:1.4, ugly:0.2'.",
  "Combine styles: 'anime, digital art, watercolor'.",
  "Describe lighting for drama: 'neon lights, soft glow'.",
  "Prompt for mood: 'dreamy, cinematic, vintage, noir'.",
  "Add camera details: 'shot on Canon, f/1.8 lens, wide angle'.",
  "For eyes: 'sharp eyes, reflective pupils, direct gaze'.",
  "Emphasize background or ignore: 'background blur, [background details]'.",
  "Try: 'masterpiece, best quality, ultra-detailed' at start of prompt.",
  "Use emojis for inspiration or to break creative block!"
];
// --- PromptForge Add-On Wordbank ---
const PF_SCENE_TOKENS_ADDON = [
  "abandoned asylum",
  "rooftop garden",
  "rain-slick alley",
  "neon-lit diner",
  "foggy pier",
  "subway tunnel",
  "snowy mountaintop",
  "overgrown playground",
  "sunlit attic",
  "flooded basement",
  "storm-wrecked boat",
  "crumbling cathedral",
  "moonlit cornfield",
  "desert gas station",
  "retro bowling alley",
  "wood-paneled den",
  "swanky jazz bar",
  "rustic barn loft",
  "tropical greenhouse",
  "private movie theater",
  "candlelit crypt",
  "laundromat at midnight",
  "arcade with blinking lights",
  "secret speakeasy",
  "train carriage",
  "deserted fairground",
  "empty swimming pool",
  "mountain cave",
  "fancy ballroom",
  "makeshift art studio",
  "industrial kitchen",
  "open air market",
  "gothic library",
  "sun-bleached graveyard",
  "busy hospital hallway",
  "cluttered antique shop",
  "hazy skatepark",
  "tiny bookstore",
  "velvet-draped theater",
  "rainy highway motel",
  "haunted orchard"
];

// --- This line auto-merges new scene tokens with the main list (NO manual edits needed!) ---
if (typeof PF_SCENE_TOKENS_ADDON !== "undefined") PF_SCENE_TOKENS = PF_SCENE_TOKENS.concat(PF_SCENE_TOKENS_ADDON);
// --- PromptForge Add-On Wordbank ---
const PF_CAMERA_STYLES_ADDON = [
  "over-the-shoulder POV",
  "mirror reflection",
  "candid paparazzi",
  "fisheye distortion",
  "surveillance cam angle",
  "drone shot",
  "split-diopter focus",
  "soft focus haze",
  "extreme wide angle",
  "zoomed telephoto",
  "infrared capture",
  "thermal vision",
  "hidden pinhole cam",
  "long exposure blur",
  "reverse angle",
  "dual-lens composite",
  "motion-tracking frame",
  "digital glitch effect",
  "deep focus rack",
  "tilt-shift miniaturization",
  "virtual camera orbit",
  "stop-motion animation",
  "time-lapse streaks",
  "slow pan",
  "rapid cutaway"
];

if (typeof PF_CAMERA_STYLES_ADDON !== "undefined") PF_CAMERA_STYLES = PF_CAMERA_STYLES.concat(PF_CAMERA_STYLES_ADDON);
// --- PromptForge Add-On Wordbank ---
const PF_VISUAL_EFFECTS_ADDON = [
  "refraction prism",
  "chromatic aberration",
  "hyperreal skin texture",
  "mirror mosaic",
  "god rays",
  "raytraced highlights",
  "subsurface scattering",
  "caustic lighting",
  "volumetric fog",
  "dust motes",
  "shadow play",
  "specular reflection",
  "scattering light beams",
  "ambient occlusion",
  "streaked neon glow",
  "old film grain",
  "scanlines",
  "burned-in watermark",
  "dreamy vignetting",
  "glitching overlay",
  "color inversion",
  "ghost double exposure",
  "wet lens drops",
  "digital rain (matrix effect)"
];

if (typeof PF_VISUAL_EFFECTS_ADDON !== "undefined") PF_VISUAL_EFFECTS = PF_VISUAL_EFFECTS.concat(PF_VISUAL_EFFECTS_ADDON);
// --- PromptForge Add-On Wordbank ---
const PF_LIGHTING_ADDON = [
  "practical lamp glow",
  "bare bulb lighting",
  "firelight flicker",
  "LED underglow",
  "emergency strobe",
  "streetlamp haze",
  "window light stripes",
  "flashlight cone",
  "headlights through fog",
  "TV screen wash",
  "glowing computer monitor",
  "reflected pool light",
  "neon underlighting",
  "holiday string lights",
  "flickering candle shadow",
  "chiaroscuro contrast",
  "moonlit backlight",
  "lantern-lit shadows",
  "arc welding sparks",
  "colored gel spotlight"
];

if (typeof PF_LIGHTING_ADDON !== "undefined") PF_LIGHTING = PF_LIGHTING.concat(PF_LIGHTING_ADDON);
// --- PromptForge Add-On Wordbank ---
const PF_PROPS_ADDON = [
  "vintage camera",
  "rose petals",
  "playing cards",
  "cigarette holder",
  "glass decanter",
  "vinyl record",
  "neon sign",
  "old school microphone",
  "mirror ball",
  "typewriter",
  "steampunk goggles",
  "candle stub",
  "open book",
  "handcuffs",
  "lacy mask",
  "floppy disk",
  "crumpled love letter",
  "pocket watch",
  "antique telephone",
  "fuzzy dice",
  "paint-stained smock",
  "tarot deck",
  "fountain pen",
  "fake passport"
];

if (typeof PF_PROPS_ADDON !== "undefined") PF_PROPS = PF_PROPS.concat(PF_PROPS_ADDON);
// --- PromptForge Add-On Wordbank ---
const PF_NSFW_SCENES_ADDON = [
  "strip club VIP booth",
  "private dungeon chamber",
  "red-lit motel room",
  "backseat of a limousine",
  "poolside cabana at midnight",
  "mirrored hotel suite",
  "candlelit boudoir",
  "soundproofed photo studio",
  "leather-upholstered den",
  "silk-draped four-poster bed",
  "rooftop hot tub",
  "steam-filled shower stall",
  "dimly lit bar bathroom",
  "abandoned office floor",
  "penthouse balcony at night",
  "narrow dressing room",
  "sleek chrome elevator",
  "darkened movie theater",
  "furry rug before a fireplace",
  "wine cellar full of secrets"
];

if (typeof PF_NSFW_SCENES_ADDON !== "undefined") PF_NSFW_SCENES = (typeof PF_NSFW_SCENES !== "undefined" ? PF_NSFW_SCENES : []).concat(PF_NSFW_SCENES_ADDON);
// --- PromptForge Add-On Wordbank ---
const PF_ACTION_VERBS_ADDON = [
  "straddle",
  "arch",
  "press",
  "trace",
  "rake",
  "cup",
  "graze",
  "pin",
  "nuzzle",
  "grind",
  "shudder",
  "writhe",
  "sprawl",
  "smirk",
  "whisper",
  "croon",
  "drip",
  "glide",
  "hover",
  "ripple",
  "slip",
  "clasp",
  "twine",
  "murmur",
  "tangle",
  "glance",
  "beckon",
  "snarl",
  "pant",
  "moan",
  "whimper",
  "grasp",
  "ripple",
  "stroke",
  "caress",
  "kiss",
  "bite"
];

if (typeof PF_ACTION_VERBS_ADDON !== "undefined") PF_ACTIONS = PF_ACTIONS.concat(PF_ACTION_VERBS_ADDON);
// --- PromptForge Add-On Wordbank ---
// NSFW Body Parts (Explicit/Art/Photo/Scene Friendly)
const PF_NSFW_BODY_PARTS_ADDON = [
  "inner thigh",
  "nape of neck",
  "small of back",
  "lower belly",
  "bare hip",
  "shapely calves",
  "inner wrist",
  "collarbone",
  "taut abs",
  "arched spine",
  "firm glutes",
  "slick chest",
  "hard nipple",
  "soft areola",
  "sensitive tip",
  "swollen clit",
  "veined shaft",
  "velvet folds",
  "pulsing entrance",
  "wet slit",
  "tight pucker",
  "leaking tip",
  "soft sack",
  "glistening hood",
  "curved arch",
  "open mouth",
  "slick tongue",
  "spilled precum",
  "sore lips",
  "trembling thighs",
  "quivering hole"
];

if (typeof PF_NSFW_BODY_PARTS_ADDON !== "undefined") PF_BODY_PARTS = PF_BODY_PARTS.concat(PF_NSFW_BODY_PARTS_ADDON);
// --- PromptForge Add-On Wordbank ---
// Facial Expressions (for movie, art, photo, and emotion-driven scenes)
const PF_FACE_EXPRESSIONS_ADDON = [
  "eyes half-lidded",
  "glassy-eyed",
  "dazed stare",
  "biting lower lip",
  "flushed cheeks",
  "tear-streaked",
  "heavy-lidded gaze",
  "open-mouthed gasp",
  "playful wink",
  "furrowed brow",
  "hungry smirk",
  "fearful glance",
  "pleading eyes",
  "mischievous grin",
  "breathless mouth",
  "defiant stare",
  "bashful glance",
  "wide-eyed surprise",
  "knowing smile",
  "shy blush",
  "pained wince",
  "arched eyebrow",
  "clenched jaw",
  "pursed lips",
  "soft moan",
  "triumphant smirk",
  "wary glance",
  "delighted giggle",
  "lost in ecstasy"
];

if (typeof PF_FACE_EXPRESSIONS_ADDON !== "undefined") PF_FACE_EXPRESSIONS = PF_FACE_EXPRESSIONS.concat(PF_FACE_EXPRESSIONS_ADDON);
// --- PromptForge Add-On Wordbank ---
// Moods & Emotions (from soft to intense, for both SFW & NSFW prompts)
const PF_MOODS_ADDON = [
  "achingly vulnerable",
  "overstimulated",
  "ravenous",
  "craving",
  "starving for touch",
  "electric anticipation",
  "restless",
  "overwhelmed",
  "feverish",
  "melting",
  "delirious",
  "nervous",
  "commanding",
  "submissive",
  "possessive",
  "protective",
  "hypnotized",
  "entranced",
  "out of control",
  "dizzy",
  "rebellious",
  "devoted",
  "predatory",
  "blissed out",
  "sultry",
  "teetering",
  "worshipful",
  "dreamy",
  "satiated",
  "unguarded",
  "defiant",
  "gleeful",
  "predatory",
  "lost in lust"
];

if (typeof PF_MOODS_ADDON !== "undefined") PF_MOODS = PF_MOODS.concat(PF_MOODS_ADDON);
// --- PromptForge Add-On Wordbank ---
// Sensory/Feeling/Touch Words (for any prompt needing physicality)
const PF_SENSORY_WORDS_ADDON = [
  "scalding",
  "icy",
  "slick",
  "tingling",
  "fiery",
  "numbing",
  "throbbing",
  "aching",
  "twitching",
  "fluttering",
  "tightening",
  "loosening",
  "dripping",
  "pulsing",
  "buzzing",
  "gliding",
  "bristling",
  "electric",
  "warm breath",
  "damp heat",
  "fuzzy",
  "velvety",
  "raw",
  "chilled",
  "sticky",
  "glistening",
  "crackling",
  "spasming",
  "weightless",
  "suffocating"
];

if (typeof PF_SENSORY_WORDS_ADDON !== "undefined") PF_SENSORY_WORDS = (typeof PF_SENSORY_WORDS !== "undefined" ? PF_SENSORY_WORDS : []).concat(PF_SENSORY_WORDS_ADDON);
// --- PromptForge Add-On Wordbank ---
// NSFW Body Parts
const PF_NSFW_BODY_PARTS_ADDON = [
  "inner thigh",
  "nape of neck",
  "small of back",
  "lower belly",
  "bare hip",
  "shapely calves",
  "inner wrist",
  "collarbone",
  "taut abs",
  "arched spine",
  "firm glutes",
  "slick chest",
  "hard nipple",
  "soft areola",
  "sensitive tip",
  "swollen clit",
  "veined shaft",
  "velvet folds",
  "pulsing entrance",
  "wet slit",
  "tight pucker",
  "leaking tip",
  "soft sack",
  "glistening hood",
  "curved arch",
  "open mouth",
  "slick tongue",
  "spilled precum",
  "sore lips",
  "trembling thighs",
  "quivering hole"
];
if (typeof PF_NSFW_BODY_PARTS_ADDON !== "undefined") PF_BODY_PARTS = PF_BODY_PARTS.concat(PF_NSFW_BODY_PARTS_ADDON);

// Facial Expressions
const PF_FACE_EXPRESSIONS_ADDON = [
  "eyes half-lidded",
  "glassy-eyed",
  "dazed stare",
  "biting lower lip",
  "flushed cheeks",
  "tear-streaked",
  "heavy-lidded gaze",
  "open-mouthed gasp",
  "playful wink",
  "furrowed brow",
  "hungry smirk",
  "fearful glance",
  "pleading eyes",
  "mischievous grin",
  "breathless mouth",
  "defiant stare",
  "bashful glance",
  "wide-eyed surprise",
  "knowing smile",
  "shy blush",
  "pained wince",
  "arched eyebrow",
  "clenched jaw",
  "pursed lips",
  "soft moan",
  "triumphant smirk",
  "wary glance",
  "delighted giggle",
  "lost in ecstasy"
];
if (typeof PF_FACE_EXPRESSIONS_ADDON !== "undefined") PF_FACE_EXPRESSIONS = PF_FACE_EXPRESSIONS.concat(PF_FACE_EXPRESSIONS_ADDON);

// Moods & Emotions
const PF_MOODS_ADDON = [
  "achingly vulnerable",
  "overstimulated",
  "ravenous",
  "craving",
  "starving for touch",
  "electric anticipation",
  "restless",
  "overwhelmed",
  "feverish",
  "melting",
  "delirious",
  "nervous",
  "commanding",
  "submissive",
  "possessive",
  "protective",
  "hypnotized",
  "entranced",
  "out of control",
  "dizzy",
  "rebellious",
  "devoted",
  "predatory",
  "blissed out",
  "sultry",
  "teetering",
  "worshipful",
  "dreamy",
  "satiated",
  "unguarded",
  "defiant",
  "gleeful",
  "predatory",
  "lost in lust"
];
if (typeof PF_MOODS_ADDON !== "undefined") PF_MOODS = PF_MOODS.concat(PF_MOODS_ADDON);

// Sensory/Feeling/Touch Words
const PF_SENSORY_WORDS_ADDON = [
  "scalding",
  "icy",
  "slick",
  "tingling",
  "fiery",
  "numbing",
  "throbbing",
  "aching",
  "twitching",
  "fluttering",
  "tightening",
  "loosening",
  "dripping",
  "pulsing",
  "buzzing",
  "gliding",
  "bristling",
  "electric",
  "warm breath",
  "damp heat",
  "fuzzy",
  "velvety",
  "raw",
  "chilled",
  "sticky",
  "glistening",
  "crackling",
  "spasming",
  "weightless",
  "suffocating"
];
if (typeof PF_SENSORY_WORDS_ADDON !== "undefined") PF_SENSORY_WORDS = (typeof PF_SENSORY_WORDS !== "undefined" ? PF_SENSORY_WORDS : []).concat(PF_SENSORY_WORDS_ADDON);
// --- PromptForge Add-On Wordbank ---
// NSFW Verbs (Explicit, Artistic, and Cinematic)
const PF_NSFW_VERBS_ADDON = [
  "grind",
  "impale",
  "ride",
  "mount",
  "swallow",
  "straddle",
  "pinch",
  "clench",
  "devour",
  "ravish",
  "slurp",
  "pump",
  "slide",
  "twitch",
  "flick",
  "spank",
  "suckle",
  "lap",
  "tangle",
  "wrap around",
  "nuzzle",
  "slick over",
  "spread wide",
  "push inside",
  "thrust",
  "stroke slowly",
  "claw at",
  "press up against",
  "curl toes",
  "lose control"
];
if (typeof PF_NSFW_VERBS_ADDON !== "undefined") PF_ACTIONS = PF_ACTIONS.concat(PF_NSFW_VERBS_ADDON);

// Scenario / Trope Words (Movie, Kink, and Drama Friendly)
const PF_SCENARIO_TROPES_ADDON = [
  "forbidden lovers",
  "after-hours tryst",
  "caught in the act",
  "office affair",
  "innocence corrupted",
  "rival seduction",
  "stranger in the night",
  "secret rendezvous",
  "first-timer nerves",
  "love triangle tension",
  "voyeur caught watching",
  "tied and teased",
  "masked encounter",
  "blackmail fantasy",
  "boss and subordinate",
  "student and teacher",
  "star-crossed",
  "power imbalance",
  "revenge seduction",
  "mistaken identity",
  "drunken confession",
  "confessional release",
  "anonymous hookup",
  "taboo roleplay",
  "shameless exhibition"
];
if (typeof PF_SCENARIO_TROPES_ADDON !== "undefined") PF_SCENARIOS = (typeof PF_SCENARIOS !== "undefined" ? PF_SCENARIOS : []).concat(PF_SCENARIO_TROPES_ADDON);

// Artistic / Photo Genres (Power up prompt creativity!)
const PF_GENRES_ADDON = [
  "noir thriller",
  "surrealist dream",
  "cyberpunk dystopia",
  "high-gloss editorial",
  "golden hour romance",
  "dark fantasy",
  "slice-of-life realism",
  "vaporwave nostalgia",
  "horror grotesque",
  "melancholy drama",
  "retro pulp",
  "high-saturation pop",
  "BDSM fashion",
  "street style snapshot",
  "erotic fairytale",
  "expressionist portrait",
  "sensual classicism",
  "sapphic reverie",
  "taboo horror",
  "intimate cinema verité",
  "absurdist comedy",
  "fetish art"
];
if (typeof PF_GENRES_ADDON !== "undefined") PF_GENRES = (typeof PF_GENRES !== "undefined" ? PF_GENRES : []).concat(PF_GENRES_ADDON);

// Advanced Lighting / Color Styles
const PF_LIGHTING_COLOR_ADDON = [
  "police siren glow",
  "blue hour shadow",
  "ultraviolet pop",
  "rainbow gel",
  "harsh noon sun",
  "flickering neon",
  "golden haze",
  "stormlight streaks",
  "overcast diffuse",
  "flushed red",
  "iced blue",
  "sepia-toned",
  "lurid purple",
  "shadow-choked",
  "mercury vapor",
  "candle flame",
  "TV screen flicker",
  "strobe freeze",
  "reflected city light",
  "backlit silhouette",
  "midnight cyan",
  "peach-tinted"
];
if (typeof PF_LIGHTING_COLOR_ADDON !== "undefined") PF_LIGHTING = PF_LIGHTING.concat(PF_LIGHTING_COLOR_ADDON);
// --- PromptForge Add-On Wordbank ---
// Kinks & Fetishes (pro-level, explicit, and varied)
const PF_KINKS_ADDON = [
  "shibari ropework",
  "sensory deprivation",
  "wax play",
  "impact marks",
  "leather harness",
  "obedience training",
  "dominant stare",
  "submissive kneel",
  "collared",
  "forced orgasm",
  "praise kink",
  "degradation kink",
  "denial and edging",
  "face sitting",
  "service submission",
  "public teasing",
  "anal training",
  "pet play",
  "foot worship",
  "tickle torture",
  "dirty talk",
  "orgasm control",
  "ownership ritual",
  "hair pulling",
  "spit play",
  "overstimulation",
  "objectification",
  "cum marking",
  "ruined orgasm",
  "temperature play",
  "throat training"
];
if (typeof PF_KINKS_ADDON !== "undefined") PF_KINKS = (typeof PF_KINKS !== "undefined" ? PF_KINKS : []).concat(PF_KINKS_ADDON);

// Consent/Feeling Words (for realism, power, and variety)
const PF_CONSENT_FEELING_ADDON = [
  "begs for more",
  "moans approval",
  "craves your touch",
  "nods silently",
  "asks permission",
  "offers everything",
  "shakes with need",
  "whimpers softly",
  "arches into you",
  "grips the sheets",
  "fights for control",
  "gives in",
  "holds your gaze",
  "surrenders completely",
  "challenges your command",
  "trusts you",
  "whispers a safe word",
  "gasps 'yes'",
  "pleads for release",
  "welcomes your hands",
  "mutters consent",
  "clutches your arm",
  "invites your dominance"
];
if (typeof PF_CONSENT_FEELING_ADDON !== "undefined") PF_FEELINGS = (typeof PF_FEELINGS !== "undefined" ? PF_FEELINGS : []).concat(PF_CONSENT_FEELING_ADDON);

// Meta/AI/Glitch Words (make prompts more “AI-native” for art and writing)
const PF_META_AI_ADDON = [
  "prompt injection",
  "negative space",
  "hyperreal output",
  "token noise",
  "dreamlike artifacts",
  "SDXL process",
  "OpenArt signature",
  "weighted blend",
  "artificial imperfection",
  "synthetic gaze",
  "hallucinated body",
  "model bias",
  "low-poly overlay",
  "GAN fingerprint",
  "diffusion map",
  "algorithmic skin",
  "NeRF illusion",
  "dataset echo",
  "prompt bias",
  "sampler remix",
  "dynamic range hack",
  "latent glitch",
  "canvas stitch"
];
if (typeof PF_META_AI_ADDON !== "undefined") PF_META = (typeof PF_META !== "undefined" ? PF_META : []).concat(PF_META_AI_ADDON);
// --- PromptForge Add-On Wordbank ---
// POSES (all-purpose, artistic, explicit, and SFW/NSFW)
const PF_POSES_ADDON = [
  "arched back",
  "spread eagle",
  "on all fours",
  "side straddle",
  "bent over",
  "legs wrapped around",
  "crouched low",
  "one knee raised",
  "reclining sideways",
  "face down, hips up",
  "kneeling upright",
  "bridged hips",
  "half-sitting",
  "shoulders pinned",
  "reverse cowgirl",
  "against the wall",
  "up on toes",
  "over the edge",
  "leaning into arms",
  "cross-legged",
  "tangled together",
  "sitting in lap",
  "lifted up",
  "standing chest to chest",
  "straddling a chair",
  "overhead stretch"
];
if (typeof PF_POSES_ADDON !== "undefined") PF_POSES = (typeof PF_POSES !== "undefined" ? PF_POSES : []).concat(PF_POSES_ADDON);

// LOCATIONS (indoor, outdoor, moody, unique for scene variety)
const PF_LOCATIONS_ADDON = [
  "desert highway",
  "foggy forest",
  "penthouse loft",
  "run-down motel",
  "marble staircase",
  "public shower",
  "abandoned church",
  "suburban basement",
  "crowded subway",
  "hidden rooftop",
  "moonlit garden",
  "city balcony",
  "glass elevator",
  "private yacht",
  "art museum",
  "haunted mansion",
  "strip mall parking lot",
  "sunset pier",
  "wine cellar",
  "opera box",
  "rusty playground",
  "luxury train car",
  "quiet library"
];
if (typeof PF_LOCATIONS_ADDON !== "undefined") PF_LOCATIONS = (typeof PF_LOCATIONS !== "undefined" ? PF_LOCATIONS : []).concat(PF_LOCATIONS_ADDON);

// OBJECTS/PROPS (scene details, creative, erotic or not)
const PF_OBJECTS_ADDON = [
  "crystal decanter",
  "glass beads",
  "leather cuffs",
  "lace blindfold",
  "chilled champagne",
  "antique clock",
  "silk rope",
  "heavy chain",
  "glossy lipstick",
  "stiletto heel",
  "rose bouquet",
  "vintage pistol",
  "velvet cushion",
  "feather fan",
  "ice cube",
  "silver tray",
  "corset laces",
  "perfume atomizer",
  "fur stole",
  "diamond choker",
  "mirrored compact",
  "gilded picture frame"
];
if (typeof PF_OBJECTS_ADDON !== "undefined") PF_PROPS = (typeof PF_PROPS !== "undefined" ? PF_PROPS : []).concat(PF_OBJECTS_ADDON);

// COLORS (for moods, lighting, fashion, scene painting)
const PF_COLORS_ADDON = [
  "rose gold",
  "gunmetal gray",
  "blood red",
  "ultraviolet",
  "midnight blue",
  "emerald green",
  "burnt orange",
  "silver-white",
  "peach blush",
  "violet haze",
  "cobalt blue",
  "cherry blossom",
  "frosted mint",
  "lavender shadow",
  "molten bronze",
  "onyx black",
  "amber glow",
  "moss green"
];
if (typeof PF_COLORS_ADDON !== "undefined") PF_COLORS = (typeof PF_COLORS !== "undefined" ? PF_COLORS : []).concat(PF_COLORS_ADDON);

// CINEMATIC CAMERA TRICKS (film, AI, and pro photo style)
const PF_CAMERA_TRICKS_ADDON = [
  "Dutch angle",
  "steadycam tracking",
  "sudden close-up",
  "mirror shot",
  "split focus",
  "rack focus",
  "tilt-up reveal",
  "overexposed flash",
  "blurred motion",
  "smeared bokeh",
  "zoom burst",
  "soft vignetting",
  "rotating frame",
  "time-lapse jump",
  "digital mosaic",
  "lens flare",
  "anamorphic stretch",
  "fish-eye bend"
];
if (typeof PF_CAMERA_TRICKS_ADDON !== "undefined") PF_CAMERA_STYLES = (typeof PF_CAMERA_STYLES !== "undefined" ? PF_CAMERA_STYLES : []).concat(PF_CAMERA_TRICKS_ADDON);
// --- PromptForge Add-On Wordbank ---
// GENRES (photo, art, film, and kink-friendly)
const PF_GENRES_ADDON = [
  "femme fatale noir",
  "lesbian romance",
  "shameful comedy",
  "body horror",
  "urban legend",
  "fetish documentary",
  "vampire drama",
  "futuristic erotica",
  "Gothic fairytale",
  "tropical fever dream",
  "teenage summer",
  "power play saga",
  "office scandal",
  "cult ritual",
  "revenge thriller",
  "haunted romance",
  "alien seduction",
  "small town gossip",
  "family secrets",
  "coming of age lust"
];
if (typeof PF_GENRES_ADDON !== "undefined") PF_GENRES = (typeof PF_GENRES !== "undefined" ? PF_GENRES : []).concat(PF_GENRES_ADDON);

// SEXUAL ACTS (explicit, cinematic, and prompt-optimized)
const PF_SEXUAL_ACTS_ADDON = [
  "face sitting",
  "spit roasting",
  "double penetration",
  "cock worship",
  "tongue riding",
  "edge play",
  "public masturbation",
  "deepthroat challenge",
  "anal creampie",
  "forced orgasm",
  "pegging",
  "mutual fisting",
  "squirt marking",
  "sensation play",
  "choking with consent",
  "rimming",
  "milking",
  "dirty talking",
  "femdom tease",
  "strap-on riding",
  "cum swapping",
  "thigh grinding"
];
if (typeof PF_SEXUAL_ACTS_ADDON !== "undefined") PF_ACTS = (typeof PF_ACTS !== "undefined" ? PF_ACTS : []).concat(PF_SEXUAL_ACTS_ADDON);

// DIRTY TALK / DIALOGUE SNIPPETS (NSFW, mood-setting, roleplay)
const PF_DIRTY_TALK_ADDON = [
  "\"Tell me how much you want it.\"",
  "\"You're so fucking wet for me.\"",
  "\"Beg for my cock.\"",
  "\"Don’t stop, don’t ever stop.\"",
  "\"Make me scream your name.\"",
  "\"I want you deeper.\"",
  "\"Harder, just like that.\"",
  "\"Lick every inch.\"",
  "\"Use me, I’m yours.\"",
  "\"Show me you can take it.\"",
  "\"I love the way you taste.\"",
  "\"Don’t hold back now.\"",
  "\"Get on your knees for me.\"",
  "\"Let me hear you moan.\"",
  "\"Keep your eyes on me.\"",
  "\"Make it messy.\"",
  "\"I want to feel you inside.\""
];
if (typeof PF_DIRTY_TALK_ADDON !== "undefined") PF_DIALOGUE = (typeof PF_DIALOGUE !== "undefined" ? PF_DIALOGUE : []).concat(PF_DIRTY_TALK_ADDON);

// ADVANCED NEGATIVE PROMPTS (for filtering/cleaning unwanted elements in AI art)
const PF_NEGATIVE_PROMPTS_ADDON = [
  "extra arms",
  "broken fingers",
  "deformed hands",
  "distorted face",
  "crossed eyes",
  "blurry skin",
  "messed up anatomy",
  "missing limbs",
  "bad body proportions",
  "multiple heads",
  "extra legs",
  "unrealistic shadow",
  "watermark",
  "text artifacts",
  "extra nipples",
  "mutated feet",
  "unreal color cast",
  "bad reflections",
  "glitchy background",
  "nsfw watermark",
  "excess limbs",
  "cut-off feet",
  "missing fingers",
  "overexposed",
  "underexposed",
  "weird teeth",
  "monster hands"
];
if (typeof PF_NEGATIVE_PROMPTS_ADDON !== "undefined") PF_NEGATIVE_PROMPTS = (typeof PF_NEGATIVE_PROMPTS !== "undefined" ? PF_NEGATIVE_PROMPTS : []).concat(PF_NEGATIVE_PROMPTS_ADDON);
// --- PromptForge Add-On Wordbank ---
// COSTUMES & CLOTHING (sexy, creative, cinematic, SFW/NSFW)
const PF_COSTUMES_ADDON = [
  "lace teddy",
  "wet t-shirt",
  "school uniform",
  "latex catsuit",
  "leather mini skirt",
  "open robe",
  "corset with garters",
  "stocking suspenders",
  "mesh bodysuit",
  "frilly apron",
  "business suit, nothing underneath",
  "zippered hoodie",
  "oversized dress shirt",
  "knee-high boots",
  "boyshort panties",
  "bikini with body chain",
  "see-through raincoat",
  "spiked collar",
  "velvet gloves",
  "pearl necklace"
];
if (typeof PF_COSTUMES_ADDON !== "undefined") PF_COSTUMES = (typeof PF_COSTUMES !== "undefined" ? PF_COSTUMES : []).concat(PF_COSTUMES_ADDON);

// ACCESSORIES & DETAILS (scene dressing, realism, flavor)
const PF_ACCESSORIES_ADDON = [
  "choker",
  "lip ring",
  "anklet",
  "nose stud",
  "temporary tattoo",
  "tousled hair",
  "fuzzy handcuffs",
  "nipple pasties",
  "body glitter",
  "ripped fishnets",
  "beaded bracelet",
  "crystal plug",
  "ballet flats",
  "single earring",
  "leather cuffs",
  "lace mask",
  "sunhat",
  "ankle socks",
  "tooth gem"
];
if (typeof PF_ACCESSORIES_ADDON !== "undefined") PF_ACCESSORIES = (typeof PF_ACCESSORIES !== "undefined" ? PF_ACCESSORIES : []).concat(PF_ACCESSORIES_ADDON);

// TABOO & EDGY THEMES (for pushing prompt boundaries—compliant, but wild)
const PF_TABOO_THEMES_ADDON = [
  "secret affair",
  "power play",
  "voyeurism",
  "exhibitionism",
  "role reversal",
  "risky public",
  "office fantasy",
  "age gap",
  "confessional sin",
  "sneaking out",
  "best friend's lover",
  "one-night stand",
  "forbidden fruit",
  "anonymous hookup",
  "after-hours party",
  "step fantasy",
  "caught in the act",
  "summer camp crush",
  "dangerous obsession"
];
if (typeof PF_TABOO_THEMES_ADDON !== "undefined") PF_TABOO = (typeof PF_TABOO !== "undefined" ? PF_TABOO : []).concat(PF_TABOO_THEMES_ADDON);

// ADVANCED FACIAL/BODY DETAILS (for realism, beauty, or flaw prompts)
const PF_FACIAL_BODY_DETAILS_ADDON = [
  "beauty mark",
  "freckled shoulders",
  "glossy lips",
  "smeared mascara",
  "teary eyes",
  "runny eyeliner",
  "puffy cheeks",
  "cheek dimples",
  "stubbled jaw",
  "pierced tongue",
  "flushed neck",
  "smudged foundation",
  "painted nails",
  "tan lines",
  "scar above eyebrow",
  "asymmetric grin",
  "sunburned nose",
  "pouting lips",
  "messy bun",
  "wild bedhead"
];
if (typeof PF_FACIAL_BODY_DETAILS_ADDON !== "undefined") PF_FACIAL_DETAILS = (typeof PF_FACIAL_DETAILS !== "undefined" ? PF_FACIAL_DETAILS : []).concat(PF_FACIAL_BODY_DETAILS_ADDON);

// NSFW ACTION WORDS (verbs, movement, “heat”)
const PF_NSFW_ACTIONS_ADDON = [
  "splay",
  "burrow",
  "pulse",
  "tremble",
  "quiver",
  "explode",
  "throb",
  "mash",
  "snarl",
  "melt",
  "slick up",
  "gush",
  "soak",
  "spasm",
  "snap hips",
  "clench thighs",
  "spread wider",
  "grip tight",
  "collapse"
];
if (typeof PF_NSFW_ACTIONS_ADDON !== "undefined") PF_ACTIONS = PF_ACTIONS.concat(PF_NSFW_ACTIONS_ADDON);
// --- PromptForge Add-On Wordbank ---
// CHARACTER ARCHETYPES (personality & story fuel, SFW/NSFW)
const PF_ARCHETYPES_ADDON = [
  "bad girl",
  "innocent ingenue",
  "stoic protector",
  "playful tease",
  "domme queen",
  "needy sub",
  "flirty neighbor",
  "naughty nurse",
  "strict teacher",
  "rebel lover",
  "mysterious stranger",
  "jealous ex",
  "trophy partner",
  "forbidden step",
  "caring mentor",
  "wild party animal",
  "shy wallflower",
  "cocky jock",
  "crush next door",
  "charismatic boss"
];
if (typeof PF_ARCHETYPES_ADDON !== "undefined") PF_ARCHETYPES = (typeof PF_ARCHETYPES !== "undefined" ? PF_ARCHETYPES : []).concat(PF_ARCHETYPES_ADDON);

// GROUP/PAIRING TYPES (all combos for film, art, or kink scenes)
const PF_GROUP_TYPES_ADDON = [
  "lesbian couple",
  "threesome (2 girls, 1 guy)",
  "gay lovers",
  "polyamorous quad",
  "foursome",
  "girl group",
  "mixed couple",
  "boy/boy pair",
  "best friends",
  "strangers",
  "lovers reunited",
  "secret affair",
  "office hookup",
  "dominant trio",
  "pet & handler",
  "family fantasy",
  "party group",
  "bff sleepover",
  "roommates"
];
if (typeof PF_GROUP_TYPES_ADDON !== "undefined") PF_GROUP_TYPES = (typeof PF_GROUP_TYPES !== "undefined" ? PF_GROUP_TYPES : []).concat(PF_GROUP_TYPES_ADDON);

// EMOTIONAL STATES (visual and mood prompt upgrades)
const PF_EMOTIONAL_STATES_ADDON = [
  "nervous anticipation",
  "suppressed laughter",
  "boiling jealousy",
  "tender devotion",
  "reckless abandon",
  "flood of relief",
  "drunk with desire",
  "melancholy longing",
  "hushed awe",
  "fury barely contained",
  "spiteful grin",
  "dangerous curiosity",
  "rapturous bliss",
  "awkward shyness",
  "guilty pleasure",
  "heartfelt apology",
  "exhausted contentment",
  "smoldering anger",
  "quiet satisfaction"
];
if (typeof PF_EMOTIONAL_STATES_ADDON !== "undefined") PF_MOODS = PF_MOODS.concat(PF_EMOTIONAL_STATES_ADDON);

// ENVIRONMENT DETAILS (to set the scene, realistic and cinematic)
const PF_ENVIRONMENT_DETAILS_ADDON = [
  "rain streaks on glass",
  "scattered rose petals",
  "flickering TV light",
  "bed sheets tangled",
  "fog creeping under door",
  "broken mirror shards",
  "city skyline out window",
  "laundry on floor",
  "music thumping next room",
  "hushed city street",
  "distant thunder",
  "sunbeam across bed",
  "dripping faucet",
  "candle wax drips",
  "open closet door",
  "condensation on mirror",
  "party confetti",
  "muffled footsteps",
  "neon reflection"
];
if (typeof PF_ENVIRONMENT_DETAILS_ADDON !== "undefined") PF_ENVIRONMENT_DETAILS = (typeof PF_ENVIRONMENT_DETAILS !== "undefined" ? PF_ENVIRONMENT_DETAILS : []).concat(PF_ENVIRONMENT_DETAILS_ADDON);

// NSFW FLUIDS & MARKS (for realism, taboo, or hyper-detail)
const PF_NSFW_FLUIDS_MARKS_ADDON = [
  "smeared lipstick",
  "pearlescent streaks",
  "milky drizzle",
  "spit trails",
  "wet handprint",
  "tear-stained cheeks",
  "sweat-slicked skin",
  "streaked mascara",
  "bite marks",
  "scratched shoulders",
  "thigh bruises",
  "raked back",
  "puddle on sheets",
  "love bites",
  "glossy slick",
  "runny makeup",
  "tongue print",
  "rosy slap mark"
];
if (typeof PF_NSFW_FLUIDS_MARKS_ADDON !== "undefined") PF_NSFW_MARKS = (typeof PF_NSFW_MARKS !== "undefined" ? PF_NSFW_MARKS : []).concat(PF_NSFW_FLUIDS_MARKS_ADDON);
// --- PromptForge Prompt Brain: Pro-Level Generator ---

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Template structures (expand later!)
const PF_PROMPT_TEMPLATES = [
  // Cinematic/Art
  "[CHAR] [ACTION] [PROP] in [LOCATION], lit by [LIGHT], with [DETAIL], feeling [MOOD].",
  // NSFW explicit
  "[CHAR] [NSFW_ACTION] [NSFW_BODY_PART] with [PROP] in [LOCATION] while [MOOD] and [DIRTY_TALK]",
  // Artistic
  "[CHAR] in [COSTUME] [ACTION] at [LOCATION], with [FACIAL_DETAIL] and [COLOR] lighting.",
  // Scenario
  "[ARCHETYPE] and [ARCHETYPE2] in [SCENARIO] at [LOCATION], [MOOD], [PROP] nearby.",
  // Group
  "[GROUP_TYPE] [ACTION] [NSFW_VERB] in [LOCATION], [MOOD], covered in [NSFW_FLUIDS_MARKS].",
  // Short punch
  "[CHAR] [ACTION] in [LOCATION], [MOOD].",
  // Minimal art
  "[ACTION] [PROP], [MOOD], [COLOR] light."
];

// Word pools (auto-detect for safety/flexibility)
function getPool(arrName, fallback) {
  return (typeof window[arrName] !== "undefined" && window[arrName].length > 0)
    ? window[arrName]
    : (typeof window[fallback] !== "undefined" ? window[fallback] : [""]);
}

function generatePromptForgePrompt() {
  // Helper: fallback if pool missing
  const get = (arrName, fallback) => randomFrom(getPool(arrName, fallback));
  
  
  // Pick template randomly
  let tmpl = randomFrom(PF_PROMPT_TEMPLATES);

  // For [ARCHETYPE2], make sure not to repeat [ARCHETYPE]
  if (tmpl.includes("[ARCHETYPE2]")) {
    let one = dict["[ARCHETYPE]"];
    let two;
    do {
      two = get("PF_ARCHETYPES", "PF_CHARACTERS");
    } while (two === one && getPool("PF_ARCHETYPES", "PF_CHARACTERS").length > 1);
    dict["[ARCHETYPE2]"] = two;
  }

  // Replace tokens in template
  let prompt = tmpl.replace(/\[[A-Z_0-9]+\]/g, (token) => dict[token] || "");
  
  // Clean up any weird double spaces or leftover commas
  return prompt
    .replace(/ ,/g, ",")
    .replace(/\s+/g, " ")
    .replace(/ ,/g, ",")
    .replace(/ ,/g, ",")
    .replace(/\s+\./g, ".")
    .trim();
}

// --- End PromptForge Prompt Brain ---
// --- PromptForge Add-On Wordbank ---
// DESCRIPTIVE ADJECTIVES (for bodies, moods, scenes)
const PF_ADJECTIVES_ADDON = [
  "achingly soft",
  "blindingly bright",
  "dripping wet",
  "razor-sharp",
  "velvet smooth",
  "flushed",
  "tangled",
  "delicate",
  "feral",
  "unbuttoned",
  "stormy",
  "teasing",
  "smoldering",
  "pale",
  "sun-kissed",
  "glistening",
  "rumpled",
  "scarred",
  "inked",
  "rumored",
  "sweat-soaked"
];
if (typeof PF_ADJECTIVES_ADDON !== "undefined") PF_ADJECTIVES = (typeof PF_ADJECTIVES !== "undefined" ? PF_ADJECTIVES : []).concat(PF_ADJECTIVES_ADDON);

// CONNECTORS & TRANSITIONS (for flowing, human-sounding sentences)
const PF_CONNECTORS_ADDON = [
  "while",
  "as",
  "with",
  "beneath",
  "above",
  "against",
  "inside",
  "among",
  "before",
  "after",
  "in the glow of",
  "in spite of",
  "during",
  "because of",
  "despite",
  "alongside",
  "in between",
  "next to",
  "over",
  "under"
];
if (typeof PF_CONNECTORS_ADDON !== "undefined") PF_CONNECTORS = (typeof PF_CONNECTORS !== "undefined" ? PF_CONNECTORS : []).concat(PF_CONNECTORS_ADDON);

// TIME PHRASES (scene setting, story flow, realism)
const PF_TIME_PHRASES_ADDON = [
  "at midnight",
  "just before dawn",
  "as the city sleeps",
  "while rain beats on the window",
  "in the blue hour",
  "with sunrise coming",
  "long after dark",
  "under neon lights",
  "during golden hour",
  "in the hush before morning",
  "as thunder rumbles",
  "while headlights flicker outside",
  "beneath a full moon",
  "as music throbs through the walls"
];
if (typeof PF_TIME_PHRASES_ADDON !== "undefined") PF_TIME_PHRASES = (typeof PF_TIME_PHRASES !== "undefined" ? PF_TIME_PHRASES : []).concat(PF_TIME_PHRASES_ADDON);

// ARTISTIC MOODS & ATMOSPHERES
const PF_ART_MOODS_ADDON = [
  "melancholy silence",
  "feverish excitement",
  "dreamlike haze",
  "smoky seduction",
  "haunted stillness",
  "electric anticipation",
  "shameful pleasure",
  "dangerous longing",
  "tender awe",
  "charged tension",
  "reckless abandon",
  "breathless urgency",
  "aching nostalgia",
  "violent hunger",
  "sweet surrender"
];
if (typeof PF_ART_MOODS_ADDON !== "undefined") PF_ART_MOODS = (typeof PF_ART_MOODS !== "undefined" ? PF_ART_MOODS : []).concat(PF_ART_MOODS_ADDON);

// MINI-TEMPLATES FOR VARIETY (can be called in the main brain)
const PF_MINI_TEMPLATES_ADDON = [
  "[CHAR] [ACTION] [PROP] [CONNECTOR] [MOOD]",
  "[CHAR] in [COSTUME] at [LOCATION], [TIME_PHRASE]",
  "[ARCHETYPE] [ACTION] [BODY_PART], [ART_MOOD]",
  "[GROUP_TYPE] tangled [CONNECTOR] [SCENARIO] [TIME_PHRASE]",
  "[CHAR] [ACTION] [BODY_PART] [CONNECTOR] [DIRTY_TALK]"
];
if (typeof PF_MINI_TEMPLATES_ADDON !== "undefined") PF_PROMPT_TEMPLATES = PF_PROMPT_TEMPLATES.concat(PF_MINI_TEMPLATES_ADDON);
// --- PromptForge Add-On Wordbank ---
// ADVERBS (how actions happen, realism & flow)
const PF_ADVERBS_ADDON = [
  "slowly",
  "deliberately",
  "clumsily",
  "hungrily",
  "eagerly",
  "shakily",
  "gently",
  "suddenly",
  "breathlessly",
  "desperately",
  "softly",
  "boldly",
  "roughly",
  "feverishly",
  "subtly",
  "playfully",
  "timidly",
  "recklessly",
  "lazily",
  "urgently"
];
if (typeof PF_ADVERBS_ADDON !== "undefined") PF_ADVERBS = (typeof PF_ADVERBS !== "undefined" ? PF_ADVERBS : []).concat(PF_ADVERBS_ADDON);

// UNIQUE REACTIONS (mini-phrases for faces, bodies, and vibe)
const PF_REACTIONS_ADDON = [
  "eyes flutter shut",
  "mouth falls open",
  "voice cracks",
  "knees buckle",
  "fingers dig in",
  "back arches higher",
  "toes curl tight",
  "hips buck",
  "lips tremble",
  "breath catches",
  "shoulders tense",
  "pulse races",
  "cheeks burn",
  "ears go red",
  "thighs clench",
  "hair stands on end",
  "hands shake",
  "heart pounds"
];
if (typeof PF_REACTIONS_ADDON !== "undefined") PF_REACTIONS = (typeof PF_REACTIONS !== "undefined" ? PF_REACTIONS : []).concat(PF_REACTIONS_ADDON);

// RARE, CINEMATIC VERBS (for actions, movement, and mood)
const PF_RARE_VERBS_ADDON = [
  "cascade",
  "coil",
  "spill",
  "scrawl",
  "shudder",
  "skitter",
  "flutter",
  "slither",
  "drape",
  "hover",
  "curl",
  "dart",
  "graze",
  "writhe",
  "cling",
  "fan out",
  "shiver",
  "sink",
  "spill out",
  "glide"
];
if (typeof PF_RARE_VERBS_ADDON !== "undefined") PF_ACTIONS = PF_ACTIONS.concat(PF_RARE_VERBS_ADDON);

// ADVANCED BODY/SCENE DETAILS (high-res, ultra-human realism)
const PF_BODY_SCENE_DETAILS_ADDON = [
  "goosebumps along her arms",
  "damp strands of hair at her temple",
  "lingering perfume in the air",
  "skin glistening under neon",
  "tiny scratch on her hip",
  "faint bruise beneath collarbone",
  "pale blue veins visible at wrist",
  "lash marks fading on her thigh",
  "feather stuck to her cheek",
  "mascara smeared beneath one eye",
  "saliva glistening on lips",
  "cool air on bare skin",
  "heartbeat visible at her throat",
  "smudged lipstick on the glass",
  "fingerprints in the dust",
  "heels digging into carpet",
  "bare feet pressed to tile",
  "sweat pooling in small of back"
];
if (typeof PF_BODY_SCENE_DETAILS_ADDON !== "undefined") PF_BODY_DETAILS = (typeof PF_BODY_DETAILS !== "undefined" ? PF_BODY_DETAILS : []).concat(PF_BODY_SCENE_DETAILS_ADDON);

// INVISIBLE SCENE “GLUE” (phrases that link and flesh out real English scenes)
const PF_SCENE_GLUE_ADDON = [
  "with the city humming outside",
  "while the music pounds through walls",
  "in the hush between breaths",
  "as neon flickers in the corner",
  "before anyone can speak",
  "after the lights go out",
  "with fingers tangled in sheets",
  "while rain blurs the window",
  "under the weight of longing",
  "as the world fades away",
  "until sunrise bleeds through blinds",
  "when nothing else exists",
  "with her name on your lips",
  "in that endless moment",
  "while heat pools between them"
];
if (typeof PF_SCENE_GLUE_ADDON !== "undefined") PF_SCENE_GLUE = (typeof PF_SCENE_GLUE !== "undefined" ? PF_SCENE_GLUE : []).concat(PF_SCENE_GLUE_ADDON);

// Optional: Add dictionary references for these to your prompt brain for advanced templates!
// --- PF_DICT MAPPING START ---
// PERSONALITY TRAITS
const PF_PERSONALITY = [
  "brooding",
  "manic",
  "charismatic",
  "cynical",
  "sweet-talking",
  "ruthless",
  "nervous",
  "manipulative",
  "innocent",
  "impulsive",
  "charming",
  "sarcastic",
  "obsessive",
  "arrogant",
  "loyal",
  "jaded",
  "calculating",
  "shameless",
  "guarded",
  "reckless"
];

// OCCUPATIONS
const PF_OCCUPATIONS = [
  "paramedic",
  "bartender",
  "club dancer",
  "artist",
  "bouncer",
  "influencer",
  "DJ",
  "janitor",
  "psychiatrist",
  "escort",
  "teacher",
  "photographer",
  "librarian",
  "mechanic",
  "maid",
  "nurse",
  "private detective",
  "manager",
  "intern",
  "priest"
];

// ROLES
const PF_ROLES = [
  "leader",
  "sidekick",
  "outsider",
  "mentor",
  "rival",
  "antagonist",
  "prodigy",
  "fixer",
  "victim",
  "hero",
  "villain",
  "witness",
  "confidant",
  "double agent",
  "blackmailer",
  "saboteur",
  "observer",
  "protector",
  "traitor",
  "pawn"
];

// BODY TYPES
const PF_BODY_TYPES = [
  "slender",
  "muscular",
  "curvy",
  "athletic",
  "petite",
  "plush",
  "lanky",
  "stocky",
  "voluptuous",
  "tall",
  "short",
  "boyish",
  "feminine",
  "angular",
  "soft",
  "hairless",
  "hairy",
  "hourglass",
  "broad-shouldered",
  "doll-like"
];

// EYE DETAILS
const PF_EYE_DETAILS = [
  "dark circles",
  "smoky eyes",
  "bloodshot",
  "catlike pupils",
  "faded iris",
  "cold stare",
  "glassy gaze",
  "darting eyes",
  "narrowed",
  "tear-filled",
  "sharp glint",
  "sparkling",
  "hooded eyelids",
  "fluttering lashes",
  "sunken",
  "half-lidded",
  "wild-eyed",
  "pinned pupils",
  "dilated",
  "vacant stare"
];

// HAIR DETAILS
const PF_HAIR_DETAILS = [
  "messy bun",
  "braided pigtails",
  "long fringe",
  "undercut",
  "dreadlocks",
  "pixie cut",
  "loose waves",
  "curly afro",
  "tight ponytail",
  "dyed streaks",
  "slicked back",
  "buzzed sides",
  "asymmetric bob",
  "shoulder-length",
  "feathered",
  "greasy strands",
  "wet hair",
  "spiky tips",
  "frizzy",
  "tangled"
];

// VOICES
const PF_VOICES = [
  "whispering",
  "raspy",
  "growling",
  "moaning",
  "panting",
  "cracking",
  "silky",
  "sharp-tongued",
  "soft-spoken",
  "sing-song",
  "hushed",
  "murmured",
  "stuttering",
  "shrill",
  "breathy",
  "commanding",
  "slurred",
  "choked",
  "coarse",
  "drawling"
];

// CLOTHING
const PF_CLOTHING = [
  "ripped jeans",
  "satin nightgown",
  "cargo pants",
  "fishnet top",
  "silk slip",
  "athletic shorts",
  "cropped hoodie",
  "graphic tee",
  "mini skirt",
  "sweatpants",
  "oversized flannel",
  "leather vest",
  "plaid skirt",
  "suspenders",
  "lace bralette",
  "boyshorts",
  "spaghetti strap dress",
  "bomber jacket",
  "harness belt",
  "thigh-high socks"
];

// TATTOOS
const PF_TATTOOS = [
  "full sleeve",
  "ankle band",
  "back dragon",
  "tiny wrist heart",
  "neck script",
  "lower back tribal",
  "finger dots",
  "chest skull",
  "collarbone feather",
  "nape bar code",
  "shoulder rose",
  "sternum mandala",
  "ribcage wings",
  "hip butterfly",
  "face teardrop",
  "behind ear star",
  "thigh garter",
  "stomach snake",
  "spine runes",
  "hand spider"
];

// PIERCINGS
const PF_PIERCINGS = [
  "snakebite lip rings",
  "eyebrow bar",
  "monroe stud",
  "nose hoop",
  "septum ring",
  "nipple barbell",
  "navel jewel",
  "industrial bar",
  "tragus stud",
  "tongue piercing",
  "bridge bar",
  "helix hoop",
  "labret",
  "cheek dermals",
  "dahlia bites",
  "smiley piercing",
  "surface anchor",
  "conch ring",
  "double nostril",
  "eyelid microdermal"
];

// POSES
const PF_POSES = [
  "arched back",
  "kneeling",
  "hands behind head",
  "on all fours",
  "cross-legged",
  "sprawled",
  "straddling",
  "perched on edge",
  "lying on side",
  "crouching",
  "reclining",
  "spooning",
  "leaning against wall",
  "hunched",
  "balanced on toes",
  "spinning",
  "head thrown back",
  "biting knuckle",
  "covering face",
  "propped up on elbows"
];
// RELATIONSHIPS
const PF_RELATIONSHIPS = [
  "childhood friends",
  "estranged lovers",
  "secret enemies",
  "co-workers",
  "ex-partners",
  "casual hook-ups",
  "unrequited crush",
  "mentor and apprentice",
  "frenemies",
  "roommates",
  "rivals",
  "dominant & submissive",
  "long-distance couple",
  "old flames",
  "complicated trio",
  "open relationship",
  "forbidden love",
  "workplace affair",
  "summer fling",
  "one night stand"
];

// SETTINGS
const PF_SETTINGS = [
  "rooftop bar",
  "underground club",
  "rain-soaked alley",
  "motel room",
  "suburban kitchen",
  "empty classroom",
  "locker room",
  "backseat of a car",
  "abandoned warehouse",
  "laundromat",
  "dingy basement",
  "hotel suite",
  "hospital hallway",
  "neon-lit street",
  "tattoo parlor",
  "forest clearing",
  "bathroom stall",
  "beach at night",
  "attic hideout",
  "penthouse loft"
];

// COUPLE TYPES
const PF_COUPLE_TYPES = [
  "young lovers",
  "May-December romance",
  "biker and artist",
  "stripper and CEO",
  "teacher and student",
  "married couple",
  "office fling",
  "online hookup",
  "best friends to lovers",
  "secret partners",
  "rich and poor",
  "neighbors",
  "friends with benefits",
  "first-time lovers",
  "polyam couple",
  "rebound couple",
  "adventurous pair",
  "forbidden pair",
  "odd couple",
  "estranged spouses"
];

// ENVIRONMENT DETAILS (cinematic, highly visual)
const PF_ENVIRONMENT_DETAILS = [
  "grimy mirrors",
  "neon puddles",
  "rain splatter",
  "flickering signage",
  "ashtray full of lipstick butts",
  "broken blinds",
  "liquor bottles on counter",
  "faded polaroids",
  "sticky carpet",
  "flickering TV",
  "open windows",
  "rattling pipes",
  "stained sheets",
  "overgrown weeds",
  "police sirens outside",
  "ceiling fan spinning",
  "old posters peeling",
  "phone buzzing",
  "laundry baskets",
  "muffled laughter next door"
];

// ERAS (for story, fashion, vibe)
const PF_ERAS = [
  "1980s",
  "Y2K",
  "Victorian",
  "Jazz Age",
  "disco era",
  "Roaring Twenties",
  "post-apocalypse",
  "retro-futurist",
  "1970s",
  "cyberpunk future",
  "modern day",
  "grunge era",
  "noir 1940s",
  "ancient Rome",
  "early 2000s",
  "space age",
  "medieval times",
  "late 90s",
  "lost generation",
  "age of decadence"
];

// SEASONS
const PF_SEASONS = [
  "late summer",
  "early spring",
  "monsoon season",
  "dead of winter",
  "high summer",
  "first frost",
  "wet autumn",
  "endless July",
  "rainy season",
  "holiday season",
  "equinox",
  "solstice night",
  "golden October",
  "snowmelt",
  "midsummer night",
  "harvest time",
  "leaf-fall",
  "new year’s eve",
  "crisp November",
  "hottest day"
];

// EMOTIONS
const PF_EMOTIONS = [
  "jealousy",
  "longing",
  "rage",
  "euphoria",
  "bitterness",
  "insecurity",
  "infatuation",
  "disgust",
  "hopelessness",
  "ecstasy",
  "anticipation",
  "remorse",
  "confusion",
  "glee",
  "shame",
  "lust",
  "dread",
  "tenderness",
  "pride",
  "envy"
];

// VIBES (mood/atmosphere)
const PF_VIBES = [
  "sleazy",
  "electric",
  "unhinged",
  "sweet and dangerous",
  "cozy",
  "melancholic",
  "chaotic",
  "intimate",
  "taboo",
  "detached",
  "decadent",
  "playful",
  "chilly",
  "heated",
  "numb",
  "hypnotic",
  "frenzied",
  "haunted",
  "secretive",
  "feral"
];

// SENSATIONS (physical, sensory)
const PF_SENSATIONS = [
  "burning skin",
  "chilled flesh",
  "tingling fingertips",
  "shudder down the spine",
  "pounding pulse",
  "goosebumps",
  "prickling scalp",
  "aching muscles",
  "sticky sweat",
  "flutter in the stomach",
  "weak knees",
  "cold breath",
  "raspy throat",
  "tight chest",
  "spilled adrenaline",
  "hazy vision",
  "wet palms",
  "blushing face",
  "tensed jaw",
  "dry mouth"
];

// TOUCHES (tactile details)
const PF_TOUCHES = [
  "tracing fingertips",
  "digging nails",
  "light slap",
  "pulling hair",
  "pinching",
  "gentle caress",
  "pressing palm",
  "scraping teeth",
  "brushing lips",
  "gripping thigh",
  "squeezing shoulder",
  "twisting earlobe",
  "cupping cheek",
  "stroking back",
  "patting knee",
  "clutching fabric",
  "thumb over lip",
  "grinding hips",
  "twining fingers",
  "rubbing neck"
];
// SOUNDS (atmosphere, immersion)
const PF_SOUNDS = [
  "city sirens",
  "distant laughter",
  "muffled club bass",
  "heels on tile",
  "buzzing neon",
  "heavy breathing",
  "zipper undone",
  "coins dropping",
  "heartbeat pounding",
  "bed creaking",
  "shattered glass",
  "whispers in darkness",
  "rain on pavement",
  "teeth chattering",
  "music thumping",
  "lock clicking",
  "knuckles cracking",
  "gasping moans",
  "phone vibrating",
  "TV static"
];

// TASTES (for mouth/scene detail)
const PF_TASTES = [
  "salty skin",
  "cheap whiskey",
  "sweet perfume",
  "metallic blood",
  "lipstick wax",
  "peppermint",
  "smoky breath",
  "stale gum",
  "vanilla frosting",
  "minty toothpaste",
  "cigarette ash",
  "coffee on lips",
  "spilled gin",
  "cherry lipgloss",
  "cologne",
  "cotton candy",
  "champagne bubbles",
  "chocolate syrup",
  "lemon bite",
  "spicy cinnamon"
];

// SMELLS (scene realism)
const PF_SMELLS = [
  "sweat",
  "bleach",
  "incense",
  "fresh coffee",
  "cologne",
  "wet pavement",
  "old books",
  "leather",
  "vanilla",
  "marijuana smoke",
  "chlorine",
  "cigarettes",
  "rose petals",
  "beer breath",
  "fabric softener",
  "ocean salt",
  "musk",
  "gasoline",
  "peppermint",
  "rubber"
];

// PHOTO STYLES (art/photo genre)
const PF_PHOTO_STYLES = [
  "35mm film",
  "grainy Polaroid",
  "soft focus",
  "overexposed",
  "infrared",
  "cinematic widescreen",
  "high contrast",
  "night vision",
  "sepia tone",
  "color splash",
  "monochrome",
  "HDR",
  "double exposure",
  "vintage print",
  "macro close-up",
  "selfie style",
  "panoramic",
  "point-and-shoot",
  "surveillance cam",
  "handheld"
];

// CAMERA TRICKS (effects, looks)
const PF_CAMERA_TRICKS = [
  "lens flare",
  "shallow depth of field",
  "bokeh lights",
  "mirror reflection",
  "fish-eye distortion",
  "slow shutter blur",
  "zoom burst",
  "soft vignette",
  "edge burn",
  "frame within frame",
  "light leak",
  "upward angle",
  "downward angle",
  "side lighting",
  "backlight silhouette",
  "focus pull",
  "split toning",
  "swivel shot",
  "tilt-shift effect",
  "underexposed shadow"
];

// GENRES (broad narrative/art genres)
const PF_GENRES = [
  "noir",
  "erotic thriller",
  "grindhouse",
  "urban fantasy",
  "post-apocalypse",
  "teen drama",
  "psychological horror",
  "romantic comedy",
  "gothic",
  "slice of life",
  "hard sci-fi",
  "soap opera",
  "coming of age",
  "cyberpunk",
  "murder mystery",
  "action-adventure",
  "body horror",
  "musical",
  "mockumentary",
  "crime saga",
  "supernatural romance"
];

// DIALOGUE (sultry/NSFW/cinematic lines)
const PF_DIALOGUE = [
  "Don’t stop.",
  "You know you want this.",
  "Make me beg.",
  "Not here—someone might see.",
  "Do you trust me?",
  "Shut up and kiss me.",
  "Say my name.",
  "Harder.",
  "I shouldn’t want this.",
  "Take it off.",
  "Bite me.",
  "Keep your eyes on me.",
  "No one can hear us.",
  "I dare you.",
  "Is this what you want?",
  "You’re shaking.",
  "Tell me you need it.",
  "You like it rough?",
  "Pull my hair.",
  "Don’t you dare stop."
];

// SCENARIOS (scene concept, kink or roleplay seed)
const PF_SCENARIOS = [
  "caught in the act",
  "office after hours",
  "strangers at a club",
  "forbidden classroom",
  "hotel rendezvous",
  "backseat encounter",
  "accidental voyeur",
  "tied and waiting",
  "secret affair",
  "undercover cop",
  "bachelorette party",
  "initiation ritual",
  "midnight dare",
  "shower surprise",
  "double life revealed",
  "seduction game",
  "role reversal",
  "lost bet",
  "neighbor’s window",
  "under the table"
];

// KINKS
const PF_KINKS = [
  "bondage",
  "domination",
  "exhibitionism",
  "impact play",
  "voyeurism",
  "power exchange",
  "role reversal",
  "restraint",
  "praise kink",
  "shame play",
  "choking",
  "temperature play",
  "brat taming",
  "edging",
  "sensory deprivation",
  "spanking",
  "wax play",
  "collaring",
  "overstimulation",
  "public play"
];

// FETISHES
const PF_FETISHES = [
  "feet",
  "lingerie",
  "heels",
  "latex",
  "wetlook",
  "pantyhose",
  "gloves",
  "nylon",
  "corset",
  "spit",
  "masochism",
  "leather",
  "uniform",
  "crossdressing",
  "sweat",
  "piercing",
  "hair pulling",
  "handcuffs",
  "socks",
  "spectacles"
];
// SEXUAL_ACTS (explicit, scenario triggers)
const PF_ACTS = [
  "oral fixation",
  "deep kissing",
  "blindfolded teasing",
  "body worship",
  "handjob under the table",
  "riding on top",
  "spooning from behind",
  "lap dance",
  "mutual masturbation",
  "public touch",
  "striptease",
  "mirror play",
  "shower fun",
  "against the wall",
  "slow grinding",
  "over-the-clothes rub",
  "edge of the bed",
  "face-sitting",
  "roleplay confession",
  "forced submission"
];

// NSFW_BODY_PARTS (for detail and realism)
const PF_NSFW_BODY_PARTS = [
  "inner thigh",
  "nape of neck",
  "small of back",
  "nipple",
  "lower belly",
  "wet slit",
  "bare chest",
  "swollen lips",
  "firm ass",
  "pulsing cock",
  "arched foot",
  "slick folds",
  "hungry mouth",
  "dripping tip",
  "taut stomach",
  "delicate jawline",
  "moist opening",
  "sensitive bud",
  "clenched fist",
  "open palm"
];

// NSFW_MARKS (traces, aftermath, realism)
const PF_NSFW_MARKS = [
  "fresh bite marks",
  "red handprint",
  "smeared lipstick",
  "tangled hair",
  "nail scratches",
  "love bruise",
  "spilled lube",
  "streaked mascara",
  "sticky residue",
  "faded hickeys",
  "lip gloss on skin",
  "wet trail",
  "stained pillow",
  "damp spot",
  "smudged makeup",
  "slippery fingers",
  "saliva strings",
  "perfume lingering",
  "wrinkled sheets",
  "sweet musk"
];

// GROUP_TYPES (relationship & scene setup)
const PF_GROUP_TYPES = [
  "lesbian trio",
  "throuple",
  "bachelor party",
  "two girls and a guy",
  "group of strangers",
  "best friends group",
  "foursome",
  "couple with guest",
  "swingers",
  "open polycule",
  "orgy scene",
  "voyeur crowd",
  "lovers’ triangle",
  "enemies to lovers",
  "secret admirers",
  "dom and subs",
  "stag and vixen",
  "step-siblings",
  "college roommates",
  "daddy and girls"
];

// COLORS (visual, lighting, mood)
const PF_COLORS = [
  "neon pink",
  "blood red",
  "deep violet",
  "ghostly white",
  "midnight blue",
  "ash gray",
  "emerald green",
  "golden amber",
  "smoky black",
  "peach blush",
  "burnt orange",
  "icy teal",
  "rose gold",
  "bruised plum",
  "electric yellow",
  "cloudy silver",
  "hazel",
  "lavender haze",
  "graphite",
  "crimson"
];

// LIGHTING (art/photo, mood, scene setup)
const PF_LIGHTING = [
  "strobe-lit",
  "moonlit",
  "neon-washed",
  "candle-glow",
  "harsh fluorescent",
  "dim backlight",
  "blinding daylight",
  "twilight haze",
  "spotlit",
  "flickering bulb",
  "halogen wash",
  "golden hour",
  "firelight",
  "tv glow",
  "police lights",
  "pale dawn",
  "sunset gradient",
  "shadow-dappled",
  "streetlamp-lit",
  "UV blacklight"
];

// META (for prompt hacking or story setup)
const PF_META = [
  "breaking the fourth wall",
  "dream sequence",
  "flashback cut",
  "voiceover narration",
  "montage edit",
  "multiple POV",
  "freeze-frame",
  "scene as memory",
  "role swap",
  "internal monologue",
  "unreliable narrator",
  "hallucination",
  "video glitch",
  "real-time chat",
  "split screen",
  "hidden camera",
  "artificial intelligence reveal",
  "game show format",
  "open ending",
  "post-credits stinger"
];

// PROMPT_NOTES (system, tone, rules, settings)
const PF_PROMPT_NOTES = [
  "no censorship",
  "full creative freedom",
  "cinematic realism",
  "emotional impact",
  "surreal tone",
  "dream logic",
  "dark themes",
  "NSFW encouraged",
  "art-house style",
  "inspired by real events",
  "multiple layers",
  "raw dialogue",
  "loose narrative",
  "unpredictable twists",
  "taboo-friendly",
  "high detail",
  "intense atmosphere",
  "vivid color",
  "for advanced users",
  "open interpretation"
];

// TECH_TERMS (useful for AI, photo, story tools)
const PF_TECH_TERMS = [
  "stable diffusion",
  "prompt weighting",
  "style transfer",
  "LoRA",
  "upscale",
  "token merging",
  "negative prompt",
  "seed lock",
  "CFG scale",
  "sampler type",
  "noise level",
  "latent space",
  "checkpoint",
  "inpainting",
  "face restoration",
  "resolution boost",
  "batch size",
  "img2img",
  "embedding",
  "controlnet"
];

// OBJECTS (props, environment)
const PF_OBJECTS = [
  "champagne flute",
  "hotel keycard",
  "broken mirror",
  "handcuffs",
  "crumpled letter",
  "bloody towel",
  "stripper pole",
  "neon sign",
  "ashtray",
  "makeup bag",
  "feather boa",
  "silk rope",
  "pill bottle",
  "vinyl record",
  "security camera",
  "love note",
  "bed restraints",
  "mask",
  "glitter",
  "condom wrapper"
];
// SCENE_TOKENS (generic scene filler)
const PF_SCENE_TOKENS = [
  "shadowy corner",
  "private booth",
  "hotel elevator",
  "dance floor",
  "parking garage",
  "sweaty gym",
  "downtown rooftop",
  "marble staircase",
  "VIP lounge",
  "janitor’s closet",
  "midnight diner",
  "VIP balcony",
  "dark hallway",
  "steamy sauna",
  "cheap motel",
  "basement studio",
  "crowded subway",
  "rooftop pool",
  "public restroom",
  "abandoned lot"
];

// LIGHTING_COLOR (used for [LIGHT] and [COLOR] if wanted)
const PF_LIGHTING_COLOR = [
  "cool blue",
  "sultry red",
  "amber gold",
  "ice white",
  "warm orange",
  "green glow",
  "midnight purple",
  "frosted silver",
  "sunset pink",
  "dirty yellow",
  "foggy grey",
  "rich copper",
  "seafoam green",
  "neon violet",
  "hazy gold",
  "smoky teal",
  "milky rose",
  "moonlit silver",
  "bone white",
  "dusky brown"
];

// TABOO (for [SCENARIO], [MOOD], [SCENARIOS])
const PF_TABOO = [
  "age gap",
  "public risk",
  "teacher/student",
  "sibling rivalry",
  "stepfamily tension",
  "risky photo",
  "blackmail",
  "coercion",
  "cheating",
  "voyeurism",
  "seducing authority",
  "dirty confession",
  "humiliation",
  "anonymous hookup",
  "anonymous tip",
  "unplanned pregnancy",
  "roleplay deception",
  "cross-dressing",
  "secret affair",
  "fetish exposure"
];

// PROPS (more physical objects for realism)
const PF_PROPS = [
  "ice cube",
  "fur coat",
  "playing cards",
  "striped tie",
  "vintage camera",
  "biker helmet",
  "shot glass",
  "silk scarf",
  "ankle bracelet",
  "lipstick tube",
  "mirror compact",
  "hand fan",
  "glass ashtray",
  "barstool",
  "cigarette case",
  "pearl necklace",
  "garter belt",
  "shower loofah",
  "blindfold",
  "perfume bottle"
];

// FACIAL_DETAILS (closeup realism, for [DETAIL])
const PF_FACIAL_DETAILS = [
  "smudged mascara",
  "flushed cheeks",
  "quivering lip",
  "arced eyebrow",
  "beaded sweat",
  "teeth showing",
  "freckled nose",
  "swollen lips",
  "tear tracks",
  "crooked grin",
  "smeared blush",
  "fluttering lashes",
  "wrinkled brow",
  "furrowed forehead",
  "dimples",
  "sunken eyes",
  "cracked smile",
  "glistening eyes",
  "downturned mouth",
  "sharp jawline"
];

// FACE_EXPRESSIONS (raw emotion)
const PF_FACE_EXPRESSIONS = [
  "biting her lip",
  "wide-eyed",
  "half smile",
  "glare",
  "pleading eyes",
  "sultry stare",
  "arched brow",
  "mock surprise",
  "smirk",
  "shy glance",
  "rolling her eyes",
  "nervous laugh",
  "teasing grin",
  "furrowed brow",
  "moaning softly",
  "gasping",
  "breathless gasp",
  "sticking out tongue",
  "innocent blink",
  "satisfied grin"
];

// EMOTIONAL_STATES (for [MOOD])
const PF_EMOTIONAL_STATES = [
  "anxious",
  "defiant",
  "yearning",
  "content",
  "overwhelmed",
  "impulsive",
  "melancholic",
  "provocative",
  "cautious",
  "hesitant",
  "starved for touch",
  "dazed",
  "apathetic",
  "thrilled",
  "lonely",
  "satisfied",
  "torn",
  "daring",
  "paranoid",
  "euphoric"
];

// ACCESSORIES (costume/fashion details)
const PF_ACCESSORIES = [
  "choker necklace",
  "silver hoop earrings",
  "lace gloves",
  "aviator sunglasses",
  "spiked collar",
  "anklet",
  "body chain",
  "velvet ribbon",
  "knee pads",
  "fingerless gloves",
  "toe ring",
  "bandana",
  "bolo tie",
  "cat ears",
  "corset laces",
  "leather cuffs",
  "nipple clamps",
  "tiara",
  "zipper mask",
  "spiked wristband"
];

// GROUPS (alt for [GROUP_TYPE])
const PF_GROUPS = [
  "bachelorette party",
  "all-male squad",
  "all-girl clique",
  "band on tour",
  "secret society",
  "roommates",
  "polycule",
  "work team",
  "throuple",
  "sorority sisters",
  "frat brothers",
  "rival crews",
  "street racers",
  "drag troupe",
  "support group",
  "neighbors",
  "sports team",
  "lovers’ circle",
  "club members",
  "after-hours staff"
];

// --- PromptForge GOD-MODE DICTIONARY MAPPING (Pre-mapped, future-proof) ---
// This mapping will cover you for 99% of anything creative, NSFW, film, art, emotion, etc.

const PF_DICT = {
  // CHARACTERS & ARCHETYPES
  "[CHAR]": get("PF_ARCHETYPES", "PF_CHARACTERS"),
  "[ARCHETYPE]": get("PF_ARCHETYPES", "PF_CHARACTERS"),
  "[ARCHETYPE2]": get("PF_ARCHETYPES", "PF_CHARACTERS"),
  "[PERSONALITY]": get("PF_PERSONALITY", ""),
  "[OCCUPATION]": get("PF_OCCUPATIONS", ""),
  "[ROLE]": get("PF_ROLES", ""),

  // PHYSICAL TRAITS & BODIES
  "[BODY_TYPE]": get("PF_BODY_TYPES", ""),
  "[BODY_PART]": get("PF_BODY_PARTS", ""),
  "[FACIAL_DETAIL]": get("PF_FACIAL_DETAILS", "PF_FACE_EXPRESSIONS"),
  "[EYE_DETAIL]": get("PF_EYE_DETAILS", ""),
  "[HAIR_DETAIL]": get("PF_HAIR_DETAILS", ""),
  "[VOICE]": get("PF_VOICES", ""),

  // STYLE, FASHION, COSTUMES
  "[COSTUME]": get("PF_COSTUMES", "PF_ACCESSORIES"),
  "[CLOTHING]": get("PF_CLOTHING", ""),
  "[ACCESSORY]": get("PF_ACCESSORIES", ""),
  "[PROP]": get("PF_PROPS", "PF_OBJECTS"),
  "[TATTOO]": get("PF_TATTOOS", ""),
  "[PIERCING]": get("PF_PIERCINGS", ""),

  // ACTION, VERBS, REACTIONS
  "[ACTION]": get("PF_ACTIONS", "PF_NSFW_ACTIONS"),
  "[NSFW_ACTION]": get("PF_NSFW_ACTIONS", "PF_ACTIONS"),
  "[NSFW_VERB]": get("PF_NSFW_VERBS", "PF_ACTIONS"),
  "[RARE_VERB]": get("PF_RARE_VERBS", "PF_ACTIONS"),
  "[ADVERB]": get("PF_ADVERBS", ""),
  "[REACTION]": get("PF_REACTIONS", ""),
  "[POSE]": get("PF_POSES", ""),
  "[BODY_DETAIL]": get("PF_BODY_DETAILS", ""),

  // GROUP & PAIRINGS
  "[GROUP_TYPE]": get("PF_GROUP_TYPES", "PF_GROUPS"),
  "[COUPLE_TYPE]": get("PF_COUPLE_TYPES", ""),
  "[RELATIONSHIP]": get("PF_RELATIONSHIPS", ""),

  // LOCATION, ENVIRONMENT, SCENES
  "[LOCATION]": get("PF_LOCATIONS", "PF_SCENE_TOKENS"),
  "[SETTING]": get("PF_SETTINGS", ""),
  "[ENVIRONMENT_DETAIL]": get("PF_ENVIRONMENT_DETAILS", ""),
  "[SCENE_GLUE]": get("PF_SCENE_GLUE", ""),

  // TIME & FLOW
  "[TIME_PHRASE]": get("PF_TIME_PHRASES", ""),
  "[ERA]": get("PF_ERAS", ""),
  "[SEASON]": get("PF_SEASONS", ""),

  // EMOTION, MOOD, ATMOSPHERE
  "[MOOD]": get("PF_MOODS", "PF_EMOTIONAL_STATES"),
  "[ART_MOOD]": get("PF_ART_MOODS", ""),
  "[EMOTION]": get("PF_EMOTIONS", ""),
  "[VIBE]": get("PF_VIBES", ""),

  // SENSATION & SENSES
  "[SENSATION]": get("PF_SENSATIONS", ""),
  "[TOUCH]": get("PF_TOUCHES", ""),
  "[SOUND]": get("PF_SOUNDS", ""),
  "[TASTE]": get("PF_TASTES", ""),
  "[SMELL]": get("PF_SMELLS", ""),

  // LIGHT, COLOR, PHOTO/ART FX
  "[LIGHT]": get("PF_LIGHTING", "PF_LIGHTING_COLOR"),
  "[COLOR]": get("PF_COLORS", "PF_LIGHTING_COLOR"),
  "[PHOTO_STYLE]": get("PF_PHOTO_STYLES", ""),
  "[CAMERA_TRICK]": get("PF_CAMERA_TRICKS", ""),
  "[GENRE]": get("PF_GENRES", ""),

  // NSFW/ADULT
  "[DIRTY_TALK]": get("PF_DIALOGUE", "PF_DIRTY_TALK"),
  "[SCENARIO]": get("PF_SCENARIOS", "PF_TABOO"),
  "[KINK]": get("PF_KINKS", ""),
  "[FETISH]": get("PF_FETISHES", ""),
  "[SEXUAL_ACT]": get("PF_ACTS", ""),
  "[NSFW_BODY_PART]": get("PF_BODY_PARTS", "PF_NSFW_BODY_PARTS"),
  "[NSFW_FLUIDS_MARKS]": get("PF_NSFW_MARKS", "PF_NSFW_FLUIDS_MARKS"),

  // ADVANCED/AI/META
  "[META]": get("PF_META", ""),
  "[PROMPT_NOTE]": get("PF_PROMPT_NOTES", ""),
  "[TECH_TERM]": get("PF_TECH_TERMS", ""),

  // ADJECTIVE/CONNECTORS/STRUCTURE
  "[ADJECTIVE]": get("PF_ADJECTIVES", ""),
  "[CONNECTOR]": get("PF_CONNECTORS", ""),

  // OPEN: (add any new categories here)
};
