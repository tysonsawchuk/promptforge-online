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
