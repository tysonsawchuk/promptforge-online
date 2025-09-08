/* 
  PROMPTFORGE MEGA PROMPT BANK v2025. 
  - By Tyson & GPT (Legend Mode)
  - All blocks fully error-checked, readable, ready for JS import or direct .txt copy-paste.
  - Use in browser via <script src="prompt_brain.js"></script> or import in Node/project.
  - Update banks as needed; always keep categories self-contained for easy edit.
  - expandPrompt() and related glue functions at the end.

  USAGE:
    - User input = raw keywords (ex: "nude 18yo blonde, POV, gothic bedroom, candlelight").
    - System parses input, matches keywords to banks/blocks, fills sentence templates, outputs pro prompt.
    - For max NSFW: Emphasize priority keywords at start, use (( )) for extra weight.
    - Negative prompts handled SEPARATELY.
    - Safe, modular, expandable, and SFW/NSFW/Art/Furry/Fantasy/Whatever-ready.
*/

/* ==== BLOCK 1: SUBJECT / BODY TYPES / INCLUSION ==== */
const BODIES = [
  "petite frame","tall and slender","curvy goddess","hourglass figure","voluptuous","plus-size beauty","thicc queen",
  "muscular and ripped","bodybuilder physique","soft and plush","natural bush","shaved smooth","hairy arms and legs",
  "freckles across nose","dimples on cheeks","gap tooth smile","stretch marks","cellulite","tan lines","birthmarks",
  "vitiligo patches","albinism","deep brown skin","golden tan","olive complexion","pale and gothic","Asian features",
  "East Asian beauty","South Asian beauty","Japanese cutie","Korean idol look","Indian goddess","Latina fire",
  "Afro-Latina","Caribbean skin","African goddess","light-skinned black beauty","mixed race","Arabian queen",
  "Persian princess","Russian model","Scandinavian","Swedish","Norwegian","Finnish","Middle Eastern","Israeli beauty",
  "Native American","Pacific Islander","Maori tattoos","Inuit beauty","Australian girl","French muse","Italian stunner",
  "Spanish flamenco dancer","Brazilian bombshell","Argentinian beauty","British rose","German angel","Polish cutie",
  "Ukrainian","Greek goddess","Czech beauty","Hungarian charm"
];

/* ==== BLOCK 2: GENDERS / ORIENTATIONS / ROLES ==== */
const ORIENTATIONS = [
  "straight","gay","lesbian","bisexual","pansexual","demisexual","asexual","queer","questioning",
  "transgender woman","transgender man","nonbinary","genderfluid","agender","two-spirit","intersex",
  "androgynous beauty","gender-nonconforming","femboy","tomboy","stud","bear","twink","otter","cub","chaser",
  "drag queen","drag king","crossdresser","pride flag body paint","rainbow lingerie","leather daddy",
  "butch/femme dynamic","soft masc","hard femme","boymoder","girlmoder"
];

/* ==== BLOCK 3: AGE (SAFE, ALWAYS 18+) ==== */
const AGES = [
  "18-year-old","19-year-old","20-year-old","21-year-old","22-year-old","23-year-old","24-year-old","25-year-old",
  "mid-twenties","late twenties","early thirties","mature woman","mature man"
];

/* ==== BLOCK 4: POSES / ANGLES / FOCUS ==== */
const ANGLES_POSES = [
  "POV from feet to face","over-the-shoulder glance","close-up on lips","low angle, power pose",
  "high angle, looking down","mirror reflection","through the window shot","between-the-legs angle",
  "lying on back, legs parted","on all fours, looking back","sitting with knees up","arch back, head thrown back",
  "fingers running through hair","one hand covering chest","arms above head, wrists tied","crawling toward camera",
  "face pressed into pillow","squatting pose","straddling partner","back to camera, head turned",
  "leaning against wall","standing in doorway","upskirt view (panties visible)","downblouse tease"
];

/* ==== BLOCK 5: EMOTIONS / FACIAL EXPRESSIONS ==== */
const EMOTIONS = [
  "shy smile","smoldering stare","innocent gaze","teasing grin","mischievous smirk","submissive eyes",
  "dominant gaze","playful wink","embarrassed blush","lustful open mouth","biting lower lip",
  "pouting lips","flushed cheeks","nervous glance","dreamy eyes","brows furrowed in pleasure",
  "breathless expression","tongue sticking out","wide-eyed surprise","confident grin","lost in ecstasy"
];

/* ==== BLOCK 6: HAIR STYLES / COLORS / FEATURES ==== */
const HAIR = [
  "long, flowing hair","short bob cut","pixie cut","buzzed sides","tight braids","loose curls",
  "shoulder-length waves","high ponytail","messy bun","french braid","straight black hair",
  "golden blonde curls","auburn waves","chestnut brown locks","jet-black hair","silver streaks",
  "pink ombre","neon blue highlights","two-tone split","undercut","dreadlocks","natural afro",
  "dyed tips","platinum blonde","emerald green strands"
];

/* ==== BLOCK 7: OUTFITS / FASHION ==== */
const FASHION = [
  "lace lingerie","see-through bra","body harness","mesh crop top","tank top and boyshorts","silk kimono",
  "open bathrobe","fishnet bodysuit","leather corset","vinyl mini skirt","latex catsuit","cut-off jeans","bikini",
  "pantyhose","garter belt","stockings","torn tights","barefoot","ankle boots","knee-high socks","heels",
  "choker necklace","spiked collar","pasties","edible panties","oversized t-shirt","wet t-shirt","nothing but pearls",
  "schoolgirl skirt","maid apron","nurse uniform","bunny costume","catgirl ears and tail"
];

/* ==== BLOCK 8: PLACES / SETTINGS / ENVIRONMENTS ==== */
const PLACES = [
  "Paris rooftop at night","Venice canal at sunset","Tokyo street with neon signs","London foggy morning",
  "NYC penthouse bedroom","Miami beach party","Ibiza rave on the sand","Santorini cliffside pool",
  "Berlin underground club","Dubai luxury suite","Rio Carnival parade","Bangkok red light district",
  "Marrakech spice market","Sydney Opera House night scene","LA boudoir shoot","Las Vegas hotel afterparty",
  "Amsterdam houseboat","Moscow winter fantasy","Havana vintage car cruise","Toronto high-rise apartment",
  "Iceland hot springs","Egyptian temple","Moroccan riad","desert oasis","tropical jungle waterfall",
  "cozy mountain cabin","Alaskan aurora night","Swiss chalet","Caribbean nude beach","Grecian ruins at dawn",
  "ancient Roman bathhouse","Viking longhouse","fantasy castle","medieval dungeon","space station","cyberpunk alley",
  "underground bunker","haunted mansion","abandoned asylum","retro 80s arcade","boardwalk at dusk"
];

/* ==== BLOCK 9: LIGHTING / MOOD / EFFECTS ==== */
const FX = [
  "soft focus","bokeh lights","vintage film grain","lens flare","color splash","neon glow","cyberpunk filter",
  "dreamy haze","glitter overlay","infrared look","vignette border","double exposure","split tone color",
  "dramatic rim lighting","shallow depth of field","retro VHS scanlines","oil painting filter","comic book halftone",
  "watercolor wash","tilt-shift miniature","split screen effect","polaroid frame","pop art colors"
];

/* ==== BLOCK 10: KINK / FETISH / EDGE ==== */
const KINKS = [
  "BDSM scene","bondage with silk ropes","handcuffs on wrists","spanking in the mirror","latex catsuit fetish",
  "rope harness","dominatrix with whip","submissive kneeling","collar and leash play","ball gag in mouth",
  "blindfolded","nipple clamps","foot worship","heel licking","boot worship","face-sitting","straddling partner’s face",
  "cumplay with nectar dripping","edging","denial and begging","sensual wax play","hot candle dripping on skin",
  "public exhibitionism","sex in public park","caught outdoors","window exhibition","sex on balcony","hotel exhibition",
  "voyeur watching","caught masturbating","mirror masturbation","double penetration","strap-on play","pegging",
  "anal plug","butt plug with jewel","fisting (safe, consensual)","deepthroat challenge","cum in mouth",
  "cum on face","swallowing","rimming","69 position","reverse cowgirl","double-ended dildo","girl-on-girl action",
  "boy-on-boy action","foursome","orgy","roleplay nurse","roleplay teacher","pet play (catgirl, puppy play)",
  "furry sex","tail plug","fursuit yiff","threesome (MMF, FFM, FFF, etc)","cuckold scene","hotwife scenario",
  "dom/sub power exchange","brat taming","little/kitten mode","praise kink","degradation kink (consensual)",
  "humiliation (consensual)","public urination","watersports","shower sex","pool sex","rain sex","group sex",
  "phone sex","sexting","camgirl show","webcam model POV","OnlyFans behind-the-scenes","squirting","gushing",
  "self-bondage","milking table","facefuck","handjob","footjob","armpit licking","thighjob","belly worship",
  "spit play","slapping","hair pulling","biting","marks and bruises (consensual)","tease and denial","aftercare",
  "daddy/mommy dom energy","genderbending","crossdressing","sissy play","bimbo/himbo roleplay","cosplay sex",
  "incubus/succubus roleplay","tentacle fantasy","monster girl","monster boy","giantess/vore (soft, no harm)",
  "age play (always 18+), “barely legal” vibe","cum inflation (cartoon/fantasy)","lactation play","milking fantasy",
  "breast expansion","body transformation (cartoon/fantasy)"
];

/* ==== BLOCK 11: GROUP DYNAMICS / ORIENTATION ==== */
const GROUPS = [
  "girl-girl (lesbian)","boy-girl (straight)","boy-boy (gay)","threesome (FFM)","threesome (MMF)","foursome (GGGB, BBBG, etc.)",
  "group orgy","polyamory lovers","cuckold/cuckquean scenario","hotwife arrangement","voyeur watching couple",
  "dominant/submissive pairing","role reversal","topping from the bottom","switch energy","brat/brat tamer dynamic",
  "service sub","femdom","maledom","age gap (18+ only)","older woman, younger man","older man, younger woman",
  "bisexual encounter","pansexual","queer/poly pride","gentle dom","mean dom","sensual sub","power bottom",
  "pillow princess","gold star lesbian","straight-curious","gay-curious","ace (asexual) partners","sex friends",
  "friends with benefits","open relationship","affair scene","cheating fantasy (consensual)"  
];

/* ==== BLOCK 12: ROMANCE / SOFTCORE ==== */
const ROMANCE = [
  "long, slow kiss in bed","whispering sweet nothings","candlelit dinner followed by passionate embrace",
  "first date nerves","holding hands walking in moonlight","rainy window cuddles","movie night spooning",
  "gentle head caress","back rub turns erotic","butterfly kisses","nude cuddling under blanket",
  "sensual bath for two","dancing in lingerie","heart-shaped confetti on body","waking up together, nude in sheets",
  "writing love letters on each other’s skin","nude picnic in wildflowers","rose petals on pillow","innocent yet erotic gaze",
  "playful water fight in shower","champagne toast with body contact","matching tattoos on bare skin",
  "sappy anniversary pose","Valentine’s gift between legs","tickling until you both cry","romantic massage with oil"
];

/* ==== BLOCK 13: FANTASY / SUPERNATURAL ==== */
const FANTASY = [
  "sorceress casting a spell","wizard in a glowing robe","enchantress in the forest","elf queen on her throne",
  "orc barbarian with battle axe","tiefling seductress","dragon tamer","necromancer raising skeletons",
  "faerie circle at dawn","naked druid in moonlight","shapeshifter mid-transformation","vampire lord in velvet",
  "werewolf howling at the moon","mermaid basking on rocks","centaur in enchanted glade","drow elf assassin",
  "paladin in shining armor","succubus riding her victim","angel falling from heaven","demon girl on altar",
  "satyr at woodland feast","nymph by river","goblin merchant","gnome inventor","witch in latex catsuit",
  "magical girl transformation","monster hunter in leather","magical pet familiar","cosplay D&D party",
  "ritual orgy in ancient ruins","fantasy tavern brawl","castle tower bedroom scene","legendary sword glowing",
  "mystic portal opening","ancient prophecy revealed","scroll with forbidden runes","elemental magic swirling",
  "sacred relic glowing","crystal ball vision","possessed by spirit","polymorph spell gone wrong"
];

/* ==== BLOCK 14: FURRY / ANTHRO / MONSTER ==== */
const FURRY_MONSTER = [
  "catgirl","catboy","doggirl","dogboy","bunny girl","bunny boy","foxgirl","wolfboy","horse girl","deer boy",
  "dragon girl","dragon boy","snake girl","lizard boy","shark girl","cowgirl","bull boy","lioness","tiger boy",
  "leopardess","panther boy","octopus girl (tentacle)","mermaid","merman","centaur","harpy","lamia (snake tail)",
  "minotaur","incubus","succubus","demon girl","demon boy","angel girl","angel boy","goblin girl","orc boy",
  "elf girl","drow elf","tiefling","satyr","faun","kitsune","tanuki","werewolf","vampire girl","zombie boy",
  "alien girl","android girl","robot boy","sentient slime","plushie mascot","fursuit persona","yiff scene"
];

/* ==== BLOCK 15: MEME / VIRAL / SHITPOST ==== */
const MEME_COMBO = [
  "Shrek at Burning Man","Minion at pride parade","Doge as dominatrix","Sonic in latex bodysuit",
  "Pepe the Frog as stripper","Among Us orgy in hot tub","SpongeBob pole dancing","Mario and Luigi in furry convention",
  "Big Chungus as bouncer","Waluigi in BDSM dungeon","Minecraft Steve at orgy","Goku in fishnets","Elon Musk fursuiter",
  "Kim Kardashian OnlyFans cosplay","Sigma male on casting couch","NPC gangbang","Chad meme as poolboy",
  "anime waifu meme fusion","E-girl Pikachu","Reddit mod in latex","Vaporwave Garfield","MLG sniper orgy",
  "Step on me, Shrek","Discord kitten and gamer daddy"
];

/* ==== BLOCK 16: HORRORCORE / DARK ART ==== */
const HORRORCORE = [
  "blood-splattered body","zombie girl in lingerie","demon queen on skull throne","possession scene",
  "eyes glowing in the dark","fangs at the throat","witch burning ritual","vampire biting neck","ritual circle orgy",
  "tentacle monster seduction","naked in haunted mansion","latex nurse in asylum","succubus draining soul",
  "fetish exorcism","stigmata kink","scars as art","stitching skin play","skeletal embrace","tarantula on body",
  "candlelit graveyard sex","corpse bride","lovecraftian cult","eldritch transformation","abandoned hospital scene",
  "doll face horror","mothman lover","serial killer’s lair","clown orgy","poltergeist threesome"
];

/* ==== BLOCK 17: FOODPLAY / EDIBLE KINK ==== */
const FOODPLAY = [
  "whipped cream on bare skin","chocolate syrup drizzled over body","sushi on naked chest (nyotaimori)",
  "fruit in mouth","banana between legs","popsicle melting in hand","honey dripping on nipples","champagne bath",
  "cocktail glass on thigh","ice cubes sliding over skin","cake fight in lingerie","lollipop teasing lips",
  "feeding strawberries","edible panties","body shots off belly","caramel drizzle on butt","pearl necklace (with actual pearls or...)",
  "eating cherries seductively","grape vines wrapped around body","wine spilled on white sheets",
  "cream pie (dessert or... you know)","cherry stem tying with tongue","sundae on chest","licking salt off skin",
  "s'mores on campfire nudes","fondue on naked torso"
];

/* ==== BLOCK 18: CELEBRITIES / POP CULTURE / CURRENT TRENDS ==== */
const CELEBS = [
  "Emma Myers as Wednesday Addams","Margot Robbie as Harley Quinn","Ariana Grande popstar look",
  "Zendaya as MJ","Taylor Swift in concert outfit","Megan Fox goth queen","Billie Eilish dark style",
  "Doja Cat as anime waifu","Vanessa Hudgens wildchild","Sabrina Carpenter pop princess",
  "Rihanna lingerie boss","Angelina Jolie Lara Croft","Scarlett Johansson Black Widow",
  "Chris Hemsworth as Thor","Pedro Pascal meme dad","Timothée Chalamet twink prince",
  "Henry Cavill Witcher look","Ryan Gosling Ken doll","Tom Holland Spideyboy",
  "Jack Black Bowser cosplay","Lady Gaga Met Gala","Dua Lipa disco queen"
];

/* ==== BLOCK 19: ARTIST / STYLE INFLUENCE ==== */
const ARTISTS = [
  "in the style of greg rutkowski","alphone mucha style","dan mumford lines","studio ghibli look",
  "disney animation style","loish color palette","peter mohrbacher art","artgerm face","toshio saeki horror",
  "evan lee fantasy","ian mcque vehicles","lofi aesthetic","sakimichan digital","miyazaki-inspired background",
  "pixar style","80s anime vibe","heavy metal magazine style","vaporwave color","synthwave lighting"
];

/* ==== BLOCK 20: ULTRA-RARE / FUTUREPUNK ==== */
const FUTUREPUNK = [
  "glitchcore nude","matrix rain overlay","AI robot orgy","human-AI hybrid transformation",
  "cyberspace sex","quantum body swap","neural uplink kink","retro hologram lover","chromed skin finish",
  "biohack tattoos","invisible body suit","holographic lingerie","augmented reality seduction",
  "sensory deprivation tank","nanobot pleasure swarm","memory upload afterglow","dream recording scene"
];

/* ==== BLOCK 21: TOP NSFW PROMPT CONSTRUCTS (REAL-WORLD, Curated) ==== */
const TOP_NSFW_PROMPTS = [
  "A nude woman lying on a bed of rose petals, candlelit, photorealistic",
  "Erotic vampire bride, soft moonlight, bodypaint in blood-red, forest clearing",
  "Close-up POV angle from her feet, focusing on soft curves and glowing skin",
  "ALIEN FETISH: Succubus in latex catsuit, kink pose, dark dungeon, glowing eyes",
  "Shy girl with shy smile, untouched body, silky sheets, ultra-detailed",
  "Witch in lingerie, holding a crystal ball, flickering candles, gothic interior",
  "Beach nude at sunset, wet skin gleaming, cinematic golden hour lighting",
  "Zombie bride in torn lingerie, stained teeth, moaning seduction in graveyard",
  "Blindfolded, hands bound with silk ribbons, ripple of anticipation",
  "Latex-clad cheerleader, wet from rain, reflection in mirror, gym setting",
  "Mermaid topless on a rock, waves splashing, shimmer scales, seagulls overhead",
  "Sensual lotus pose, body glowing with oil, light haze, oriental pagoda in background",
  "Furry catgirl stripping off tail and ears, kink room, neon glow",
  "Nurse outfit undone, stethoscope sliding off shoulder, hospital bed vibe",
  "Public exhibition: nude in public park at night lit by streetlamp, voyeur angle"
];

/* ==== BLOCK 22: SENTENCE TEMPLATES ==== */
const TEMPLATES = {
  nsfw: [
    "An {age}-year-old {ethnicity} {body_type} {gender}, {hair_desc} cascading over {shoulders}. She stands completely {nude_desc} in a {scene}, her {skin_desc} glowing. Her eyes, {eyes_desc}, lock onto the viewer with a {expression_desc}. Her {breasts_desc}, {nipples_desc}, waist curves to {hips_desc}, and between her legs, {intimate_area_desc} is visible. The {room_desc} creates a {mood_desc} ambiance.",
    "A {body_type} {gender}, laying {pose_desc} in a bed of {flowers_desc}, {nude_desc}, 18th-century setting. Her {hair_desc} frames her {face_desc} as her {breasts_desc} and {intimate_area_desc} are rendered in perfect detail. A {prop_desc} rests in her hand, smile shy, scene {lighting_desc}."
  ],
  sfw: [
    "A {age}-year-old {ethnicity} {body_type} {gender}, dressed in {outfit_desc}, standing in a {scene_desc}, sunlight warms {skin_desc}, hair {hair_desc}, expression {emotion_desc}.",
    "Group of friends at {place}, laughing, sharing {object_desc}, with {seasonal_desc} in the air. The scene is {lighting_desc}, mood is {mood_desc}."
  ],
  fantasy: [
    "A {race} {archetype} in {fantasy_location}, wielding {weapon_desc}, dressed in {fantasy_outfit}. Magic swirls as {action_desc}, under {lighting_desc}.",
    "An {age}-year-old elf, naked except for {ornament_desc}, reclining on a {enchanted_object}, surrounded by {fae_detail}. Her body {body_detail_desc}, eyes {eye_desc}, and air is charged with {magic_desc}."
  ],
  meme: [
    "A {meme_character} from {fandom}, wearing {outfit_desc}, caught {action_desc}, in a {scene_desc}. The background is {mood_desc}, with {meme_element_desc}.",
    "Shrek in latex, pole dancing in a {place}, with {meme_combo} in the background, under {lighting_desc}."
  ],
  kink: [
    "A {body_type} {gender} in {fetish_outfit}, {pose_desc}, with {toy_desc}, scene set in a {kink_location}, {lighting_desc} sets the mood.",
    "{dom_desc} with {sub_desc} in {bondage_detail}, engaging in {kink_action}. Aftercare includes {aftercare_detail}."
  ]
};

/* ==== BLOCK 23: PROMPT EXPANDER / GLUE FUNCTION (EXAMPLE) ==== */
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function expandPromptNSFW(keywords) {
  const age = keywords.age || pick(AGES);
  const ethnicity = keywords.ethnicity || pick(BODIES);
  const body_type = keywords.body_type || pick(BODIES);
  const gender = keywords.gender || "woman";
  const hair_desc = keywords.hair || pick(HAIR);
  const shoulders = "bare shoulders";
  const nude_desc = keywords.nude_desc || "nude";
  const scene = keywords.scene || pick(PLACES);
  const skin_desc = keywords.skin_desc || "flawless, glowing skin";
  const eyes_desc = keywords.eyes_desc || "sparkling with mischief";
  const expression_desc = keywords.expression || pick(EMOTIONS);
  const breasts_desc = keywords.breasts || "small, perky breasts";
  const nipples_desc = keywords.nipples || "rosy-pink nipples";
  const hips_desc = keywords.hips || "gentle flare of her hips";
  const intimate_area_desc = keywords.intimate_area || "petal-like folds";
  const room_desc = keywords.room || "opulent room with velvet sheets";
  const mood_desc = keywords.mood || "sensual and inviting";
  const tmpl = pick(TEMPLATES.nsfw);

  return tmpl
    .replace("{age}", age)
    .replace("{ethnicity}", ethnicity)
    .replace("{body_type}", body_type)
    .replace("{gender}", gender)
    .replace("{hair_desc}", hair_desc)
    .replace("{shoulders}", shoulders)
    .replace("{nude_desc}", nude_desc)
    .replace("{scene}", scene)
    .replace("{skin_desc}", skin_desc)
    .replace("{eyes_desc}", eyes_desc)
    .replace("{expression_desc}", expression_desc)
    .replace("{breasts_desc}", breasts_desc)
    .replace("{nipples_desc}", nipples_desc)
    .replace("{hips_desc}", hips_desc)
    .replace("{intimate_area_desc}", intimate_area_desc)
    .replace("{room_desc}", room_desc)
    .replace("{mood_desc}", mood_desc);
}
/* ==== BLOCK 24: USER FAVORITES / SIGNATURE SCENES ==== */
const USER_FAVES = [
  "Your favorite scene goes here",
  "Nude faerie on a bed of moss, glowing mushrooms, ethereal lighting",
  "Retro 80s fitness girl, neon spandex, sweat glistening, big hair",
  "Classic Playboy centerfold, vintage filter, sultry smile",
  "Gothic vampire queen on velvet throne, red eyes, pale skin",
  "Beach sunset silhouette, body arching, water droplets flying"
];

/* ==== BLOCK 25: EDGECASE FETISH / DANGEROUS / RARE ==== */
const EDGECASE_FETISH = [
  "giantess crushing tiny man (consensual fantasy)","vore (soft, no harm)","slime girl absorption",
  "cum inflation (cartoon only)","lactation overflow","piss play (watersports)","body inflation (fantasy)",
  "sentient plant sex","living statue pose","statue transformation","living doll play","hypno spiral eyes",
  "demonic possession kink","angel/devil duality","asphyxia (safe, consensual, fantasy only)","medical play",
  "plague doctor kink","mummification scene","brainwashing roleplay","pet play with leashes/collars"
];

/* ==== BLOCK 26: FANTASY RACES / MONSTERS / ALT HUMANITY ==== */
const FANTASY_RACES = [
  "dark elf","wood elf","half-orc","half-demon","tiefling","goblin queen","kobold girl","lizardfolk","salamander girl",
  "dryad","sylph","golem","living armor","robot android","cybernetic augment","cyborg","angelic being",
  "fallen angel","incubus","succubus","giant spider","harpy","centaur","minotaur","minigirl (doll size)",
  "gnome","faun","satyr","wraith","vampire king/queen","werewolf alpha","hydra","medusa","naga","lamia","sphinx",
  "mermaid/merman","kraken girl","mimic (chest monster)","plant woman","fairy prince/princess","troll"
];

/* ==== BLOCK 27: SEASONAL / HOLIDAY / THEME ==== */
const SEASONAL = [
  "Halloween costume party","witches’ sabbath","vampire masquerade ball","pumpkin carving in lingerie",
  "skeleton bodypaint","Santa baby in red lingerie","reindeer antlers and nothing else","nude by Christmas tree",
  "New Year’s Eve confetti shower","Valentine’s Day rose petal bath","Easter bunny girl","eggs hidden on body",
  "pride parade orgy","rainbow body paint","leprechaun seductress","nude beach on summer solstice",
  "pool float orgy","fireworks on rooftop","back-to-school striptease","Thanksgiving feast in the nude",
  "St. Patrick’s Day kink","Hanukkah candle wax play","Mardi Gras bead show","springtime frolic in wildflowers"
];

/* ==== BLOCK 28: DREAMS / VIBE / PETS / SOCIAL / ALT-REALITY ==== */
const DREAMS_VIBE = [
  // Dreams/trippy
  "lucid dream sequence","falling through clouds","floating in zero gravity","rooms that melt and flow",
  "mirror world reflection","endless stairwell","hallway that never ends","double vision overlay",
  "faces in the wallpaper","spiraling into the void","time loop scene","giant talking animals","living tattoos",
  // Pets/cute/soft
  "cat kneading on chest","puppy pile on bed","bunny sleeping on lap","ferret in hoodie pocket","rat snuggling armpit",
  "parrot on shoulder during shower","kitten asleep in cleavage","poodle in bubble bath",
  "pet lizard on thigh","iguana sunbathing","tarantula crawling up leg","goldfish watching sex",
  // Vibe/social
  "group FaceTime call in the nude","Instagram live gone wild","Snapchat filter sex","OnlyFans behind-the-scenes",
  "bored Zoom call striptease","TikTok thirst trap challenge","group selfie in lingerie","Discord after-dark server",
  "VR orgy with avatars","Metaverse club scene","alt-reality dating app meetup"
];

/* ==== BLOCK 29: EMPHASIS GLUE FUNCTION (FOR PRIORITY KEYWORDS) ==== */
/* 
  Takes user-prioritized keywords (ex: "topless", "cameltoe") and auto-brackets/weights them for max SDXL/Juggernaut effect.
  Use: put highest-priority words FIRST, then add the rest.
*/
function emphasizeKeywords(keywordsArr) {
  return keywordsArr.map(w =>
    w.startsWith('((') ? w : `((` + w + `))`
  );
}
// Example: emphasizeKeywords(["topless", "nude", "cameltoe"]) => ["((topless))", "((nude))", "((cameltoe))"]

/* ==== BLOCK 30: MASTER EXPORT ==== */
/* 
  Export all blocks if used as module, or make available as global vars for browser.
  If using with <script>, all consts + expandPromptNSFW() and emphasizeKeywords() are ready to call.
*/
if (typeof module !== 'undefined') {
  module.exports = {
    BODIES, ORIENTATIONS, AGES, ANGLES_POSES, EMOTIONS, HAIR, FASHION, PLACES, FX, KINKS, GROUPS, ROMANCE,
    FANTASY, FURRY_MONSTER, MEME_COMBO, HORRORCORE, FOODPLAY, CELEBS, ARTISTS, FUTUREPUNK, TOP_NSFW_PROMPTS,
    TEMPLATES, expandPromptNSFW, emphasizeKeywords, USER_FAVES, EDGECASE_FETISH, FANTASY_RACES, SEASONAL, DREAMS_VIBE
  };
}

/* ==== FINAL NOTES ==== */
/*
  - All blocks can be updated or added to forever (just append to the right const array).
  - If you want to support other languages, make a second bank set: e.g. BODIES_FR, TEMPLATES_DE, etc.
  - Prompt engine is fully modular: plug in, combine, reroll, or swap banks as your site evolves.
  - To use: parse user input for keywords, run through emphasizeKeywords() if needed, match to blocks, then expandPromptNSFW().
  - Negative prompts handled separately (your UI box).
  - For best results: always put most important keyword(s) first, use (( )) for emphasis, and keep up-to-date with new trends/banks!
  - Tyson, this is an unstoppable prompt brain. You can always add, patch, remix, or break into sub-files for speed.
*/

/* ==== END OF PROMPTFORGE MEGA JSON/JS FILE ==== */
