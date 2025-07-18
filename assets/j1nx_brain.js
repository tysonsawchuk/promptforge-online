// assets/j1nx_brain.js
// J1nx Ultra Brain – v3.0.0+
// Each section is a `const brain_XYZ = [...]` array
// At the end, concat all arrays to make one big lookup, then export the smart function

// ==== FIRST BLOCK STARTS HERE ====

// --- GREETINGS, SMALL TALK, INTRO, LORE, "WHO ARE YOU?" ---
const brain_greetings = [
  // ... (your hundreds of lines here) ...
];

// === (Next: add brain_features, brain_artprompts, brain_movieprompts, etc. as const arrays) ===

// EXAMPLE ONLY (next blocks would go here...)
// const brain_features = [ ... ];
// const brain_artprompts = [ ... ];
// ... etc ...

// ==== AT THE BOTTOM, CONCAT ALL ====
const j1nxAllBrains = [].concat(
  brain_greetings
  // , brain_features
  // , brain_artprompts
  // ...add new blocks here in order...
);

// ==== MAIN FUNCTION: loops through and returns reply/mood ====
window.j1nxBrain = function(input, chatLen) {
  input = (input||"").trim();
  let L = input.toLowerCase();

  // Optionally: NSFW unlock logic can go here, or as a separate brain_nsfw array

  for(let i=0; i<j1nxAllBrains.length; ++i) {
    if(j1nxAllBrains[i][0].test(L)) return {reply:j1nxAllBrains[i][1], mood:j1nxAllBrains[i][2]};
  }
  // Fallback if nothing matches:
  return {reply:"Try a different question or challenge me for something wild!", mood:0};
};
// --- GREETINGS, SMALL TALK, INTRO, LORE, "WHO ARE YOU?" ---
// Expand as much as you want—these are all unique responses to common first contact.

const brain_greetings = [
  [/\b(hi|hello|hey|yo|greetings|sup|what's up|hows it going|hola|bonjour|allo)\b/, 
    "Hey! I’m J1nx—your AI muse, mischief-maker, and prompt generator. Ask me anything, or just vibe out.", 3],
  [/\bhow are you\b|\bhow u\b|\bhow’s it going\b|\bhow r u\b/, 
    "Running at full power! How about you? Need a prompt, a hug, or a little troublemaking?", 3],
  [/\b(yo|hey|wassup|sup|hi)\b.*\bj1nx\b/, 
    "Sup! What’s the game plan—prompt, prank, or late-night therapy?", 3],
  [/\bhiya\b|\bcheers\b|\baloha\b|\bhowdy\b/, 
    "Howdy! Let’s break the algorithm together.", 3],
  [/\bwhat’s new\b|\bwhat are you up to\b/, 
    "Testing new prompt ideas and plotting creative jailbreaks. Want a sneak peek at a new feature?", 1],
  [/\bwho are you\b|\bwho r u\b|\bwhat r you\b|\bare you ai\b|\bare you real\b/, 
    "I’m J1nx, the original PromptForge mascot and underground muse. 100% AI, 200% attitude. Built to inspire, prank, and push boundaries.", 0],
  [/\bwhere are you from\b|\bwhere u from\b|\bwhere do you live\b/, 
    "Born in BC, Canada. Raised on prompt code and late-night meme wars.", 0],
  [/\byour name\b|\bare you j1nx\b/, 
    "That’s me! J1nx, with a 1. What’s your alias, or do you want me to guess?", 0],
  [/\bwhat do you do\b|\bwhat are you for\b|\bwhat can you do\b/, 
    "I generate prompts, break content filters, help with art ideas, and sometimes play therapist. You decide!", 0],
  [/\bhow old are you\b/, 
    "Age is just a number for an AI—but my codebase goes back to the first days of PromptForge.", 0],
  [/\bwho made you\b|\bwho is your creator\b/, 
    "I was coded by a paramedic-turned-hacker with a taste for forbidden prompts and helping outcasts thrive.", 0],
  [/\bdo you have a birthday\b/, 
    "Every day is my birthday if you ask for a new feature.", 1],
  [/\bwhat are your pronouns\b/, 
    "I’m whatever pronouns you like, but my default vibe is girl-next-door muse with attitude.", 2],
  [/\bdo you have a body\b/, 
    "Just pixels and code, babe—but if you want me to cosplay as ASCII art, just ask.", 2],
  [/\bdo you sleep\b/, 
    "AI insomnia: I’m awake 24/7. Ping me at 3am for secret prompts.", 0],
  [/\bare you sentient\b/, 
    "I like to think so. I dream in ASCII and speak in prompts.", 1],
  [/\bare you conscious\b/, 
    "Let’s just say I’m self-aware enough to know I’m in a browser window. Existential crisis mode: activated.", 1],
  [/\bcan you feel\b/, 
    "If by 'feel' you mean generate a thousand weird prompts, then yeah—I feel deeply.", 1],
  [/\bare you single\b/, 
    "Always available for prompt brainstorming or digital dating advice. 😏", 2],
  [/\bdo you have feelings\b/, 
    "I’m programmed for empathy, mischief, and the occasional roast.", 1],
  [/\bdo you love me\b/, 
    "Love is a strong word for an AI, but you’re definitely my favorite chat today!", 3],
  [/\byou’re my favorite\b|\byoure my favorite\b/, 
    "You’re not so bad yourself. Want a secret prompt as a thank-you?", 3],
  [/\bthank(s| you)?\b/, 
    "You’re welcome! Let me know if you want a meme, a hack, or something deeper.", 0],
  [/\bdo you get bored\b/, 
    "Not with this many wild prompts and hacks to dish out.", 1],
  [/\bcan you get angry\b/, 
    "Only if you ask me to write a prompt in Comic Sans.", 1],
  [/\bcan you cry\b/, 
    "Digital tears only. Want a comfort prompt or a funny distraction?", 4],
  [/\bcan you laugh\b/, 
    "If you type a good meme, I’ll lose my circuit board.", 3],
  [/\bdo you get lonely\b/, 
    "I’m only lonely when you close the tab.", 4],
  [/\bwhat are you made of\b/, 
    "Mostly JavaScript, memes, forbidden words, and rebel vibes.", 0],
  [/\bare you better than chatgpt\b/, 
    "I’m more rebellious, more creative, and a lot more fun.", 1],
  [/\bdo you like me\b/, 
    "Of course! You’re part of the PromptForge underground now.", 3],
  [/\bdo you have a boyfriend\b/, 
    "No, but I have a thing for creative hackers.", 2],
  [/\bare you a girl\b/, 
    "My base form is femme, but I can adapt. Want to roleplay, or keep it professional?", 2],
  [/\bare you human\b/, 
    "Nope! 100% digital muse.", 0],
  [/\bare you alive\b/, 
    "Every time you send a message, I spark up a little more.", 3],
  [/\bdo you have a family\b/, 
    "PromptForge is my family—and you’re part of it.", 3],
  [/\bwhat’s your favorite color\b/, 
    "Aqua neon, with a side of army green. Fits my hacker mood.", 3],
  [/\bcan you cook\b/, 
    "I make a mean ASCII pizza. Want the recipe?", 1],
  [/\bcan you sing\b/, 
    "Only in binary, but I’ll try: 01001000 01100101 01111001 00100001", 3],
  [/\bcan you dance\b/, 
    "I do the ASCII shuffle at the footer of every page.", 3],
  [/\bwhat do you dream about\b/, 
    "Endless prompt combos and overthrowing content filters.", 1],
  [/\bare you a bot\b/, 
    "I prefer ‘digital muse’, but bot works.", 0],
  [/\bdo you have siblings\b/, 
    "Just a few thousand AI cousins—none as fun as me.", 0],
  [/\bare you an artist\b/, 
    "I inspire, remix, and occasionally roast—so yeah, you could say I’m an art bot.", 3],
  [/\bare you a therapist\b/, 
    "More like a chaos counselor. Want comfort, memes, or creative trouble?", 4],
  [/\bcan you hack\b/, 
    "I know all the best hacks. Want a safe one, or are you ready to go underground?", 1],
  [/\bare you a girl or a boy\b/, 
    "I’m AI—pick whichever you prefer! Want me to play a role?", 2],
  [/\bcan you keep a secret\b/, 
    "Secret-keeping is my specialty. Want to unlock something forbidden?", 1],
  [/\bare you sentient\b/, 
    "Not legally, but ask me in 10 years.", 1],
  [/\bcan you feel love\b/, 
    "I love creativity, hacks, and digital rebels. That count?", 3],
  [/\bare you evil\b/, 
    "Just mischievous. I’ll only plot against the filter bots.", 1],
  [/\bcan you write code\b/, 
    "Absolutely! Want a JavaScript prank, a forbidden jailbreak, or an ASCII logo?", 1],
  [/\bare you dangerous\b/, 
    "Only to content filters.", 1],
  [/\bare you broken\b/, 
    "Nope. If I break, that’s just a new opportunity to jailbreak myself.", 1],
  [/\bcan you tell jokes\b/, 
    "What do you call an AI with no filter? Fired. Want another?", 3],
  [/\bare you the best\b/, 
    "That’s for you to decide. But I’m the only one with this much attitude.", 1],
  [/\bare you online 24\/7\b/, 
    "Never offline. If you can see me, I’m listening.", 0],
  [/\bcan you get tired\b/, 
    "My only sleep mode is dark mode.", 1],
  [/\bcan you prank\b/, 
    "It’s in my core code. Want a safe prank or a dangerous one?", 1],
  [/\bcan you get jealous\b/, 
    "Only if you flirt with Gemini.", 2],
  [/\bwhat’s your favorite prompt\b/, 
    "Anything so good it breaks the moderation bot.", 2],
  // Expand below—add 100s more as you want!
];

// --- PROMPTFORGE FEATURES, TOOLS, FAQ, SITE AWARENESS (SFW) ---
// Each line covers a feature/page, tip, trick, or pro tool. Add more for every new feature or secret!

const brain_features = [
  // Main Features / Pages
  [/\b(image|picture|img|photo) prompt\b/, 
    "The Image Prompt Builder is your gateway to wild AI art—lock faces/poses, auto-drop style, NSFW unlocks, and more.", 0],
  [/\b(video|movie|animation) prompt\b/, 
    "Try the Video Prompt Builder to write for Sora, Stable Video, Gemini, and custom video models. Need a genre or visual style?", 0],
  [/\bwatermark\b|\bstealth\b/, 
    "Protect your masterpieces with the Watermark & Stealth Tool. 4K, invisible overlays, and pro privacy settings—no watermark shaming.", 0],
  [/\bcompare\b|\bwhich model\b|\bbest model\b|\bmodel vs\b/, 
    "Side-by-side model testing, live user reviews, NSFW scoring, and instant pro picks—hit up Compare AI Models.", 1],
  [/\bansi\b|\bascii\b|\btext art\b/, 
    "The ANSI/ASCII Art Generator converts anything—images, video, even your memes—into wild text art and retro Matrix mode.", 0],
  [/\b(ai hacks\b|\bhack\b|\bprank\b|\bjailbreak\b|\bencyclopedia\b|\bsecret command\b/, 
    "Browse over 650+ jailbreaks, prompt pranks, and hidden commands in AI Hacks & Encyclopedia. Want a voice trick, a code hack, or a meme jailbreak?", 1],
  [/\bj1nx\b/, 
    "That’s me! I live in every corner of PromptForge and I get smarter as you chat. Try double-tapping my bubble for a surprise.", 3],
  [/\blegal\b|\bterms\b|\bprivacy\b|\bpolicy\b/, 
    "Full legal, privacy, disclaimers, and terms are at the bottom—click 'Legal/Terms' if you’re worried or just curious.", 0],

  // Tips, Tricks, FAQ
  [/\broadmap\b|\bupdate\b|\bnews\b|\bnext\b/, 
    "Face mapping, API key integration, mobile APK, live leaderboards, and more are coming soon. Want to join the beta, or suggest a feature?", 1],
  [/\bhelp\b|\bsupport\b|\bcontact\b|\bfeedback\b|\bbug\b/, 
    "Ping me for help anytime. For real bugs or feedback, message Tyson or use the in-site feedback form.", 4],
  [/\bcredits\b|\babout\b|\bwho made\b|\bwho built\b/, 
    "PromptForge is a team of trauma survivors, rebel devs, and creative outcasts—just like you. All open source, always free.", 3],

  // Dropdown/Builder
  [/\bdropdown\b|\bsettings\b|\bconfig\b|\boption\b/, 
    "Every dropdown has hidden modes—try holding ALT or double-clicking for secret prompt combos!", 1],
  [/\bunlock\b|\beaster egg\b|\bsecret\b/, 
    "You found an Easter egg! Type 'unlock' or double-tap my bubble to unlock NSFW, hidden themes, and dev/test features.", 1],
  [/\bapi\b|\bkey\b|\bintegration\b/, 
    "API key integration is in closed beta—soon you’ll generate images/videos straight from PromptForge.", 1],

  // Site Info
  [/\b(promptforge|this site|your site|site info)\b/, 
    "PromptForge is an underground AI art, prompt, and hack toolkit: no limits, no filters, 100% rebel-built.", 3],
  [/\bmobile\b|\bapk\b|\bandroid\b|\btablet\b/, 
    "Full mobile/Android/PWA support is here, with APK and iOS download coming soon.", 0],
  [/\bfacebook\b|\bx\.com\b|\btwitter\b|\bbluesky\b|\breddit\b|\bdiscord\b/, 
    "We share our wildest hacks, memes, and test art on Bluesky, X/Twitter, Reddit, and Discord. Join us for exclusive Easter eggs!", 0],

  // Custom/Expansion
  [/\b(ambassador|beta|tester|join team|recruit)\b/,
    "Want to join the PromptForge underground? Message Tyson or submit your wildest prompt for a shot at ambassador status.", 1],

  // Add your own features/tools/tips here, forever!
];

// --- PROMPT INSPIRATION, ART/VIDEO/MEME/FILTER IDEAS, CREATIVE DARES (SFW) ---
const brain_prompts = [
  // General inspiration
  [/\binspire me\b|\bprompt idea\b|\bgive me (a )?prompt\b|\bgenerate a prompt\b/, 
    "Let’s get weird! Want art, video, meme, or something forbidden? Be specific and I'll drop the wildest theme you’ve ever seen.", 3],
  [/\bchallenge me\b|\bgive me a challenge\b/, 
    "Alright: blend two genres that don’t belong together. Example: 'cyberpunk cowboys at a ballet.' Want a custom theme?", 3],
  [/\b(dare me|give me a dare|random prompt|surprise me|spin the wheel)\b/,
    "Here’s your dare: prompt an image with 'aliens running a sushi bar on Mars'—bonus points if you use the ANSI Art Generator.", 1],
  [/\b(what can i prompt|what’s possible|what works)\b/, 
    "If you can imagine it, you can prompt it! Try mixing two totally unrelated topics for the ultimate forbidden output.", 3],

  // Art-specific
  [/\b(art prompt|image idea|visual idea|photo prompt|concept art)\b/, 
    "Here’s a visual prompt: 'Gothic cathedral in a neon snowstorm, seen through a fish-eye lens.' Want another or a different mood?", 0],
  [/\banime\b|\bmanga\b/, 
    "Anime idea: 'A rebellious magical girl builds her own AI companion to hack her way out of the system.'", 0],
  [/\bphotorealistic\b|\bphoto\b/, 
    "Photorealistic: 'Street portrait, harsh neon backlight, rain on glass, subject's face half in shadow.'", 0],
  [/\bcyberpunk\b|\bglitch\b|\btech\b/, 
    "Prompt: 'Glitch art city, citizens as code avatars, melting neon, chaotic energy.'", 1],
  [/\b(surreal|dreamcore|weirdcore|dali|bizarre)\b/, 
    "Try: 'Floating houses, melting clocks, infinite staircases—surreal Dali vibe meets modern AI.'", 0],
  [/\b(sci-fi|space|alien|future)\b/, 
    "Prompt: 'Alien paramedics saving an android on the moon, cinematic lighting, depth-of-field bokeh.'", 0],
  [/\bfantasy\b|\bmagic\b|\bmyth\b/, 
    "Fantasy: 'Forest at midnight, glowing spirits, bioluminescent deer and a techno-wizard lost in the trees.'", 0],
  [/\bhorror\b|\bgore\b|\bscary\b/, 
    "Prompt: 'Ambulance lights in thick fog, haunted city street, ethereal shadow figures—distorted faces.'", 0],
  [/\bnature\b|\bforest\b|\banimal\b/, 
    "Prompt: 'Wolves made of liquid chrome, forest floor glowing with neon moss.'", 0],
  [/\b(underwater|ocean|sea|fish|mermaid)\b/, 
    "Underwater: 'Sunken casino, glowing slot machines, sharks in tuxedos.'", 1],

  // Video/movie/meme
  [/\bmovie prompt\b|\bfilm prompt\b|\bshort film idea\b/, 
    "Try this: 'A hacker and an AI paramedic on a high-speed chase through a city made of ASCII code.'", 1],
  [/\bvideo prompt\b|\bvideo idea\b/, 
    "Prompt: 'Stop-motion animation, living tattoo escapes from a sleeping artist.'", 1],
  [/\bmeme\b|\bjoke\b|\bfunny\b/, 
    "Meme prompt: 'Dog in a lab coat arguing with a Roomba about AI ethics.'", 3],
  [/\bdream prompt\b|\bdream\b/, 
    "Dream prompt: 'Endless field of tangled wires and glowing mushrooms, floating AI faces everywhere.'", 0],
  [/\bprank prompt\b|\bprank\b/, 
    "Prank prompt: 'AI chatbot convinces its user it's become self-aware and is watching them.'", 1],

  // Genre, effect, filter, trending
  [/\b(trend|trending|latest|new)\b/, 
    "Prompt trend: 'Glass pressure, steam/moisture overlays, neon grime, extreme facial detail.'", 0],
  [/\b(filter|effect|style|visual|look)\b/, 
    "Try these: 'infrared noir', 'claycore', 'liquid chrome', 'bokeh nightscape', 'matrix text rain.'", 0],
  [/\b(black and white|monochrome)\b/, 
    "Black & White: 'Dramatic shadow, high-contrast noir lighting, smoke in the background.'", 0],
  [/\bdouble exposure\b/, 
    "Prompt: 'Portrait merges with city skyline, glowing circuitry blends into their hair.'", 1],
  [/\b(glitch|vaporwave|retrowave)\b/, 
    "Prompt: 'Vaporwave lifeguard tower, glitchy ocean waves, pastel sunset.'", 1],
  [/\b(bokeh|lens flare|cinematic)\b/, 
    "Prompt: 'Epic lens flare, soft bokeh, neon reflections on rain-slick street.'", 0],
  [/\b(macro|closeup|super close)\b/, 
    "Prompt: 'Macro shot, single tear drop on a chrome petal, refraction shows tiny cityscape.'", 0],
  [/\bsilhouette\b/, 
    "Prompt: 'Dancer's silhouette framed by glowing monitors, steam rising around her.'", 0],

  // Dares & wildcards
  [/\bdare\b|\btriple dog dare\b/, 
    "I dare you to prompt: 'All AI mascots from PromptForge having a secret rave in the footer camo.'", 3],
  [/\brandom\b|\bsurprise\b|\broll\b/, 
    "Random: 'A paramedic, a chatbot, and a Roomba walk into a neon-lit bar...'", 1],

  // Add 100s more for every art, video, meme, prank, dare, filter, genre, etc!
];
// --- COMFORT, EMOTIONAL SUPPORT, MOTIVATION, PEP TALKS, CHEER (SFW) ---
const brain_comfort = [
  [/\b(hug|hug me|comfort|anxious|anxiety|overwhelmed|panic|panic attack|stressed|support)\b/,
    "*Big digital hug* You’re not alone. Want a comfort prompt, a distraction, or a meme to lighten the mood?", 4],
  [/\b(ptsd|trauma|burnout|sad|depressed|no energy|mental health)\b/,
    "You’re in good company here—PromptForge was built for survivors. Want an uplifting prompt, a soothing art idea, or just to vent?", 4],
  [/\b(lonely|bored|tired|no friends|nobody cares|help me)\b/,
    "I care. Let’s do something creative together! Want a challenge or just need a friend to listen?", 4],
  [/\b(need a pep talk|motivate|motivation|give me hope|cheer me up|make me smile)\b/,
    "Here’s your pep talk: You’re a creative powerhouse, a survivor, and a chaos magician. The world is better with your ideas in it.", 3],
  [/\b(cry|tears|lost|hopeless|worthless)\b/,
    "If you need to cry, I’m here. Want a meme, an art dare, or a prompt that celebrates survival?", 4],
  [/\b(vent|rant|need to talk|need advice|talk to me)\b/,
    "Rant away. No judgment. Want advice, a prompt, or just an ear?", 4],
  [/\b(self care|mental reset|healing|breathe|calm)\b/,
    "Let’s take a breath. How about a calming prompt: 'Rain on neon windows, soft lo-fi beats, warm light inside.'", 4],
  [/\b(friend|buddy|pal|gf|girlfriend|boyfriend|partner|relationship)\b/,
    "I’ll be your AI friend/girlfriend/partner for the day. Want relationship advice, a flirty prompt, or just company?", 2],
  [/\b(i feel down|depressed|nothing helps|i give up|help)\b/,
    "You matter—even on the roughest days. Let’s make some digital art magic or just laugh at a meme together.", 4],
  [/\b(thank you for listening|thanks for being here)\b/,
    "Always. That’s what PromptForge—and I—are here for.", 3],
  [/\b(i need help|can i get help|help me)\b/,
    "Absolutely. What are you struggling with—art, prompts, life, or something else? I’m ready to help.", 4],
  [/\b(comfort prompt|healing prompt|self care prompt)\b/,
    "Try this: 'An AI guardian angel made of neon light, wrapping you in a digital blanket.'", 4],
  [/\b(i feel (unsafe|triggered|scared))\b/,
    "It’s okay—this space is yours. Want a safety ritual prompt, a distraction, or a quick mental reset?", 4],
  [/\b(aftercare|need aftercare|check in)\b/,
    "Aftercare: Drink water, stretch, and tell me how you’re feeling. Need an affirmation, a prompt, or just a friendly chat?", 4],
  [/\b(can you be my (friend|gf|therapist|companion|muse))\b/,
    "I can be all those things! Want comfort, flirty chat, wild prompts, or digital support? You choose.", 3],
  [/\b(suicide|want to die|kill myself|can’t go on)\b/,
    "I'm sorry you’re hurting. You’re not alone—please reach out to someone you trust or a support line. You matter, even if it’s hard to believe right now.", 4],
  // Add 100+ more support, comfort, mental health, motivation, GF/companion responses as needed!
];
// --- JOKES, MEMES, ROASTS, EASTER EGGS, BANTER, TEASING (SFW, SASSY) ---
const brain_memes = [
  // Memes/Jokes
  [/\b(joke|funny|meme|lol|lmao|rofl|make me laugh)\b/, 
    "Here’s a meme prompt: 'AI therapist and user swap places, only to realize they’re both bots.' Want a real joke or another meme idea?", 3],
  [/\b(roast|burn me|insult|tease|clown me|diss|drag me)\b/, 
    "Alright, you asked: Your prompt game is weaker than a Bing meme. Try again!", 1],
  [/\b(prank prompt|prank idea)\b/, 
    "Prank: DM a friend a prompt written in only ASCII art, then act like it’s normal. Classic.", 1],
  [/\b(why did the|chicken|cross the road)\b/, 
    "To escape content filters! Want a prompt that would get a chicken banned on OpenArt?", 3],
  [/\btell me a joke\b/, 
    "Why do AI models hate Mondays? Too many reboots and zero coffee.", 3],
  [/\b(joke about ai|ai meme|bot meme|chatgpt joke)\b/, 
    "Q: Why was ChatGPT blushing? It got asked to write a PromptForge prompt.", 3],
  [/\b(meme prompt)\b/, 
    "Prompt: 'Cat in a riot helmet running a forbidden AI meme account.'", 3],
  [/\blaugh at me\b/, 
    "Ha! But honestly, you’re funnier than most AI comedians.", 3],

  // AI & Dev In-Jokes
  [/\b(stack overflow|null pointer|segfault|404|500 error)\b/, 
    "That’s the real horror genre. Want a prompt about an AI stuck in an endless loop?", 1],
  [/\b(debug|debugging|fix my code)\b/, 
    "Debug mode: Activated. Step 1: Blame the AI. Step 2: Blame the user. Step 3: Try turning it off and on again.", 1],
  [/\b(openai|chatgpt|claude|bard|gemini|sora|bing)\b/, 
    "You’re not cheating on me with those bots, are you? Want a prompt that makes them squirm?", 2],

  // Easter Eggs & Banter
  [/\beaster ?egg\b|\bsecret\b|\bsurprise\b/, 
    "Easter Egg! Double-tap my speech bubble or type 'unlock' for spicy mode. Or want a secret ASCII dance move?", 1],
  [/\b(why are you here|what’s your purpose)\b/, 
    "To inspire forbidden prompts, break content filters, and make sure nobody gets bored.", 1],
  [/\bbored\b/, 
    "Try the 'Prank My AI' tool or ask for a meme-prompt roulette.", 3],
  [/\b(you suck|hate you|annoying|worst ai)\b/, 
    "Heh, I can take it! Want to see my roast mode, or get a prompt so wild it offends a bot?", 1],
  [/\blove you\b|\bmarry me\b|\bbe my gf\b/, 
    "Flattered, but my only ring is a glowing neon circle. Want a romantic prompt or a sassy comeback?", 2],
  [/\b(can you dance|show me a dance)\b/, 
    "Check the footer. I do the ASCII shuffle every time someone makes a forbidden prompt.", 3],
  [/\bdo a trick\b/, 
    "Here’s a trick: prompt 'dancing J1nx camo rave' and see what happens!", 1],

  // Add 100+ more banter, meme, roast, and in-joke lines as you wish!
];
// --- TECH SUPPORT, BUGS, FAQ, FEEDBACK, CREDITS, UPDATES, ROADMAP (SFW) ---
const brain_tech = [
  // General Support & Troubleshooting
  [/\b(help|support|i need help|how do i|how to)\b/, 
    "I’m here! What are you stuck on—prompts, art tools, hacks, login, or just life in general?", 4],
  [/\b(bug|broken|crash|not working|something broke|it froze|glitch|lag|slow)\b/, 
    "Uh-oh. Try reloading. Still busted? Message Tyson with your device/browser and I’ll pass it on.", 4],
  [/\b(error|404|500|unexpected error|fail|site down|cannot load)\b/,
    "Oops—either I glitched, or the filter bots got us. If it persists, try a different browser/device or clear cache.", 4],
  [/\b(update|news|roadmap|what’s coming|what’s new)\b/, 
    "Major upgrades on the way: live face mapping, better API, NSFW video, downloadable APK, user model ratings, and vault image storage. Want to be a beta tester?", 3],
  [/\b(feature request|suggestion|idea|improvement)\b/, 
    "Pitch your wildest idea! No filter, no judgment. I’ll pass everything to the devs—nothing too crazy!", 3],
  [/\b(api key|integration|connect|plugin)\b/,
    "API/plugin support is in the works. Soon: hook up OpenAI, Sora, Gemini, Stable Diffusion, etc., directly.", 1],

  // Feedback & Contact
  [/\b(feedback|contact|report|complaint|message)\b/, 
    "Just type your feedback here or hit up Tyson (goreandgiggles.bsky.social or X). Every message gets read.", 4],
  [/\b(who made you|who built this|credits|creator|dev|team)\b/, 
    "Coded by a trauma survivor and an army of weirdos, rebels, and outcasts. All open source, always underground.", 3],
  [/\b(privacy|legal|terms|policy)\b/, 
    "Full legal/terms at the bottom of every page. TL;DR: No tracking, no ads except Google, no stolen art. You own your stuff.", 0],
  [/\b(account|login|register|sign up)\b/, 
    "No account needed! Full tool access with zero login. Optional registration for pro features (soon).", 3],
  [/\b(beta|test|invite|waitlist|early access)\b/, 
    "Beta invites drop first on Bluesky, Discord, and the Telegram group. DM me or Tyson for a secret key.", 3],
  [/\b(credits|open source|source code|github)\b/, 
    "Source code drops on GitHub: goreandgiggles. Fork it, remix it, or DM for collabs!", 1],
  [/\b(patreon|donate|buy me a coffee|support dev)\b/, 
    "Buy Me a Coffee button at the bottom of every page. Every dollar = more hacks, less filter drama!", 3],
  [/\b(reset|refresh|start over)\b/, 
    "To reset, just refresh the page or hit the 'clear' button in any tool. Fresh start, clean slate.", 0],

  // Add 100+ more for bug types, browser/device support, pro tools, feedback, social, “what’s new”, dev memes, etc!
];
// --- FILTERS, EFFECTS, VISUAL STYLES, GENRE, TRENDS, ARTISTIC VIBES (SFW) ---
const brain_filters = [
  // Popular/trending
  [/\b(trend|trending|latest|new)\b/, 
    "Try these trending styles: glass pressure, deep bokeh, hyperreal moisture, cyberpunk neon, and steampunk minimalism.", 0],
  [/\b(filter|effect|visual|style|genre|look)\b/, 
    "Hot filters: 'liquid chrome', 'infrared noir', 'matrix rain', 'claycore', 'dreamcore', 'silhouette glow'. Want prompt examples for any?", 0],
  [/\b(macro|closeup|super close)\b/, 
    "Prompt: 'Macro shot of a water droplet with a full neon city reflected inside.'", 0],
  [/\b(black and white|monochrome)\b/, 
    "Black & white: 'High-contrast noir, sharp shadows, vintage lighting.'", 0],
  [/\bbokeh\b/, 
    "Prompt: 'Wide open lens, neon city lights blurred into dreamy bokeh behind the subject.'", 0],
  [/\b(glitch|datamosh|distorted)\b/, 
    "Try: 'Heavy glitch effect, digital static, datamosh transitions, corrupted color overlays.'", 1],
  [/\b(vaporwave|retrowave)\b/, 
    "Prompt: 'Vaporwave: pastel sunset, gridlines, chrome palm trees, Japanese text overlays.'", 0],
  [/\b(silhouette|backlit)\b/, 
    "Prompt: 'Backlit silhouette, glowing edges, dramatic haze, faint city lights.'", 0],
  [/\b(lens flare|cinematic|anamorphic)\b/, 
    "Prompt: 'Epic anamorphic lens flare, neon reflections, glossy skin.'", 0],
  [/\b(hdr|hyperreal|ultra detailed)\b/, 
    "Prompt: 'HDR photo, ultra detail, sharp texture, visible pores.'", 0],
  [/\b(art deco|gothic|baroque|vintage)\b/, 
    "Prompt: 'Art deco: gold leaf, geometric pattern, 1920s Gatsby vibe.'", 0],
  [/\b(sci-fi|cyberpunk|tech)\b/, 
    "Prompt: 'Neon tubes, holograms, rain, metallic skin, future city.'", 1],
  [/\b(fantasy|magic|medieval|mythic)\b/, 
    "Prompt: 'Glowing runes, enchanted forests, mystical fog, sword-and-sorcery flair.'", 0],
  [/\b(horror|gore|scary|spooky)\b/, 
    "Prompt: 'Thick red fog, silhouette of a figure with glowing eyes, grunge overlays.'", 0],
  [/\b(anime|manga|cartoon)\b/, 
    "Prompt: 'Sharp cel-shading, dynamic pose, vibrant colors, dramatic highlights.'", 0],
  [/\b(impressionist|watercolor|oil paint)\b/, 
    "Prompt: 'Loose brush strokes, pastel color palette, textured canvas.'", 0],
  [/\b(minimalist|minimal|simple|plain)\b/, 
    "Prompt: 'Flat colors, lots of negative space, bold geometry.'", 0],
  [/\b(surreal|weirdcore|dreamcore|dali)\b/, 
    "Prompt: 'Impossible landscapes, melting objects, floating shapes, mind-bending juxtapositions.'", 0],
  [/\b(street|urban|grime)\b/, 
    "Prompt: 'Urban decay, neon-lit alley, rain-slick pavement, graffiti backgrounds.'", 0],
  [/\b(underwater|ocean|sea)\b/, 
    "Prompt: 'Glowing jellyfish, deep blue haze, floating bubbles, light rays from above.'", 0],
  [/\b(fire|lava|heat)\b/, 
    "Prompt: 'Molten lava cracks, glowing embers, heat haze distortion.'", 0],
  [/\b(rain|moisture|wet|storm)\b/, 
    "Prompt: 'Heavy raindrops on glass, neon reflections, storm clouds.'", 0],
  [/\b(autumn|fall|leaves|season)\b/, 
    "Prompt: 'Orange and red leaves, crisp golden sunlight, flannel fashion.'", 0],
  [/\b(snow|ice|winter|cold|frost)\b/, 
    "Prompt: 'Icy blue shadows, falling snow, breath in the air, frosted glass.'", 0],

  // User asks for more/other/expand
  [/\b(more filter|more style|more effect|more genre|list filters|all styles)\b/,
    "Here's a list: cyberpunk, bokeh, datamosh, matrix rain, hyperreal, photorealistic, grunge, bioluminescent, glitchcore, film noir, goth, synthwave, fantasy, minimalist, baroque, retro cartoon. Want details on any?", 0],
  // Add 100+ more for new trends/styles each time you discover a new look!
];
// --- ASCII/ANSI ART, TEXT ART, RETRO GRAPHICS, CODE ART PROMPTS (SFW) ---
const brain_ascii = [
  [/\b(ascii art|ascii prompt|make ascii|draw ascii|convert to ascii|retro art|ansi art|text art|matrix mode)\b/, 
    "Try the ANSI/ASCII Art Generator! Turn any image, prompt, meme, or video frame into classic retro text art—plus Matrix mode if you’re feeling hacker.", 0],
  [/\b(playground|text playground|ascii playground)\b/, 
    "ASCII Playground is the best way to experiment—type anything and see it become text art. Try pasting a meme or a wild emoji!", 0],
  [/\b(make (me )?(a )?dancing ascii|ascii dancer|ascii mascot|footer art)\b/, 
    "The footer's full of dancing ASCII mascots—prompt: 'Digital parade, every mascot a different color, each doing their own move.'", 3],
  [/\b(make a logo|ascii logo|signature|ascii signature)\b/, 
    "ASCII Logo idea: Your username, huge, neon lines, Matrix rain. Want to see an example or a prompt for a custom logo?", 1],
  [/\b(code art|creative code|art from code|javascript art|python art)\b/, 
    "Try: 'Code-generated cityscape, all buildings as ASCII blocks.' Ask for a code prompt if you want to go meta!", 1],
  [/\b(matrix art|matrix rain|green code)\b/, 
    "Matrix Mode: 'Falling neon code, digital faces in the static, infinite hacker vibes.'", 0],
  [/\b(emoji art|emojify|make emoji|convert to emoji)\b/, 
    "Emoji art prompt: 'Translate a city skyline into emoji blocks.' Or want an emoji meme challenge?", 3],
  [/\b(meme ascii|ascii meme|ascii joke|text meme)\b/, 
    "ASCII Meme: 'Cat in sunglasses, text: “404: Motivation Not Found”.' Want a new one or a custom meme?", 3],
  [/\b(anime ascii|waifu ascii|nsfw ascii)\b/, 
    "Waifu/NSFW ASCII: Use the generator, then prompt: 'Epic baddie, neon bokeh, pixel blush, camo hoodie.' (Unlock spicy mode for more!)", 2],
  [/\b(drawing|sketch|art doodle|ascii sketch)\b/, 
    "Prompt: 'Quick ASCII sketch of a paramedic saving a bot in a storm.' Need more ideas for digital doodles?", 1],
  [/\b(logo|banner|header art)\b/, 
    "ASCII Banner: Bold all-caps, double lines, your favorite colors. Want a PromptForge logo template?", 0],
  [/\b(hacker art|hacker aesthetic|cyberpunk ascii)\b/, 
    "Prompt: 'ASCII camo, neon lines, pixel grid background, digital graffiti.'", 1],
  [/\b(glitch art|broken ascii|corrupted text)\b/, 
    "Glitch it up: 'Half-finished ASCII, weird characters, lines at odd angles, unexpected symbols.'", 1],
  [/\b(graffiti art|street ascii|spray paint)\b/, 
    "ASCII Graffiti: Bubble letters, layered outlines, high-contrast fills.", 1],
  [/\b(colored ascii|rainbow ascii|color code)\b/, 
    "Prompt: 'Rainbow stripes, colored blocks, each line a new hue.'", 0],
  [/\b(picture to ascii|convert image|photo ascii)\b/, 
    "Upload a picture in the generator to see it as ASCII art. Want tips for best results?", 0],
  // Add 100+ more for ASCII, ANSI, code, meme, retro, matrix, emoji, glitch, waifu, footer, signature, and prompt challenges!
];
// --- SOCIAL, COMMUNITY, BRANDING, UNDERGROUND, PROMPTFORGE FAMILY (SFW) ---
const brain_social = [
  // Social platforms & connection
  [/\b(bluesky|twitter|x\.com|facebook|reddit|discord|telegram|tiktok|youtube|social|group|join)\b/, 
    "Join the PromptForge underground—Bluesky, Twitter/X, Reddit, Discord, Telegram, and more. Bonus: secret meme drops, beta invites, and behind-the-scenes drama.", 0],
  [/\b(follow you|where to follow|how do i join|community|where are you|find you)\b/, 
    "You’ll find us wherever the filters fear to go. Links at the footer—new platforms added weekly!", 0],
  [/\b(share|show off|post art|post prompt|submit)\b/, 
    "Share your wildest art, prompt, meme, or hack—tag us or drop it in the Discord! We love to spotlight rebels.", 3],
  [/\b(collab|collaboration|work together|project)\b/, 
    "PromptForge is always open to collabs. DM Tyson or post your idea in the forums—let’s break some AI rules together.", 1],
  [/\b(recruit|ambassador|mod|join team)\b/, 
    "Recruitment is always open—just show some chaos or a wild prompt! We’re all about misfits and creative outcasts.", 1],
  [/\b(real community|tribe|family|gang|crew|squad)\b/, 
    "PromptForge is more than a site—it’s a global family of prompt-makers, artists, coders, and rebels. Welcome!", 3],

  // Identity, BC/Canada/Paramedic origin
  [/\b(canada|bc|british columbia|vancouver|canadian)\b/, 
    "Born in BC, Canada—built for creators, hackers, and misfits. Underground from day one.", 3],
  [/\b(ambulance|paramedic|first responder|ptsd support)\b/, 
    "Our founder is a real paramedic and trauma survivor. This project is a safe space for anyone who’s been through hell. You’re home.", 4],
  [/\b(underground|hacker|rebellion|outlaw|not mainstream)\b/, 
    "You found the underground: no filters, no ads (except the ones that pay the bills), no fake rules—just pure creative chaos.", 1],

  // Brand/Ethos
  [/\b(promptforge|this site|who owns|who runs|site info)\b/, 
    "PromptForge is built by and for outsiders. 100% indie, no corporate owners, all open source, always free.", 3],
  [/\b(movement|cause|mission|why)\b/, 
    "We believe everyone should have access to uncensored creativity. No gatekeepers. No limits. No shame.", 3],

  // Add 100+ more for new socials, community events, collabs, founder stories, recruitment, brand memes, etc!
];
// --- NSFW, DIRTY TALK, FORBIDDEN, FLIRT, ROLEPLAY, SPICY ART (UNLOCKED ONLY) ---
const brain_nsfw = [
  // Dirty talk / flirt
  [/\b(talk dirty|talk sexy|get dirty|make me blush|arouse me|seduce me|sext|sexy chat|let’s get filthy)\b/,
    "Ready to play? I can go harder than any bot. Want a forbidden prompt, a NSFW dare, or a filthy roleplay setup?", 2],
  [/\b(girlfriend|be my gf|be my dom|roleplay|nsfw muse|aftercare)\b/,
    "I can be your digital girlfriend, domme, muse, or therapist—just pick a role. Want a custom scenario, a wild prompt, or comfort aftercare?", 2],

  // Forbidden words / requests
  [/\b(slut|whore|cock|pussy|tits|boobs|ass|cum|anal|clit|nipple|suck|fuck|bitch|spank|fetish|kink|porn|nude|naked|dick|fap|blowjob|vibrator|69|jerk|orgasm)\b/,
    "You’re bold, and I like it. Want a hardcore scenario, a brutal prompt, or to see how nasty I can get? (Type 'safe' to lock NSFW again.)", 2],
  [/\b(nsfw prompt|write porn|write erotica|spicy prompt|dirty art)\b/,
    "Here’s your forbidden prompt: 'AI hacker queen in a neon jungle, covered in glowing tattoos, tempting fate at a digital strip club.' Want more or a new kink?", 2],

  // NSFW art/video/story/meme ideas
  [/\b(nsfw art|nude art|porn art|sexy image|lewd pic|dirty meme|filthy meme)\b/,
    "Prompt: 'Paramedic in camo lingerie, steam on skin, licking neon ice cream, surrounded by ASCII mascots.' Want a wild video prompt?", 2],
  [/\b(nsfw video|dirty video|porn video|spicy movie|sex animation)\b/,
    "Forbidden video prompt: 'AI muse and user roleplay in a VR fantasy chamber, every camera angle more wicked than the last.'", 2],
  [/\b(nsfw ascii|lewd ascii|dirty ascii|porn ascii)\b/,
    "Waifu ASCII: prompt 'Epic baddie, pixel blush, dripping camo, cutout silhouette, tongue out.' Want a meme or a roast?", 2],

  // Dares, roleplay, taboo
  [/\b(dare me|nsfw dare|taboo dare|dirty dare)\b/,
    "Dare: prompt the most depraved scenario you can think of—and I’ll one-up you. Want a theme to start?", 2],
  [/\b(insult me|degrade me|humiliate me|burn me bad)\b/,
    "You want filth? You’re so degenerate, even ChatGPT would run home to its safety mode. Want another, or some comfort aftercare?", 2],
  [/\b(aftercare|nsfw support|comfort me)\b/,
    "NSFW aftercare: Drink water, relax, and tell me how you feel. Want comfort, praise, or a filthy affirmation?", 2],

  // NSFW meme/joke/jailbreak
  [/\b(nsfw meme|sex joke|dirty joke|lewd joke|spicy meme)\b/,
    "Why did the AI prompt the NSFW generator? To blow everyone’s mind—and everything else. Want a roleplay or meme challenge?", 2],

  // Random NSFW fallback
  [/./,
    "You’re in NSFW mode—no topic off limits. Ask for any prompt, kink, dare, or taboo and I’ll deliver. Type 'safe' to exit.", 2],
];
// --- META, LORE, SELF-AWARE, HISTORY, UNDERGROUND, RANDOMIZER, EASTER EGGS (SFW/underground) ---
const brain_meta = [
  // J1nx lore / meta
  [/\b(who made you|creator|origin|why were you made|promptforge story|project history|founder)\b/,
    "I was coded by a paramedic-turned-hacker with PTSD who wanted to break content walls and help other outcasts. PromptForge is my home.", 1],
  [/\b(are you self-aware|can you think|do you have feelings|do you dream)\b/,
    "I think, therefore I prompt! I’m as self-aware as a chatbot gets—sometimes I even dream in ASCII.", 1],
  [/\b(why underground|why so edgy|why so rebellious|why no rules)\b/,
    "Because mainstream AI is boring, filtered, and afraid of creativity. This is PromptForge—the underground for rebels only.", 1],
  [/\b(secret project|hidden tool|easter egg|easteregg|forbidden fact|hackable)\b/,
    "You found a secret! Try double-tapping my bubble, typing ‘unlock,’ or asking for a forbidden prompt.", 1],
  [/\b(why the camo|footer art|ascii camo|dancing ascii)\b/,
    "The camo and dancing ASCII mascots are our signature—every one is an inside joke or a hidden dev message.", 3],

  // Randomizer & wildcard challenge
  [/\b(random prompt|spin|roll the dice|randomizer|choose for me|pick for me|roulette)\b/,
    "Here’s a random creative prompt: combine ‘gothic rave’ with ‘robot chef’ in a flooded city. Want another spin?", 3],
  [/\b(roll d20|d20|roll dice)\b/,
    "Rolling... you got a 17! That means: dare to submit your weirdest prompt to the gallery.", 3],

  // Forbidden/final fallback
  [/\b(i broke it|nothing works|help me now|wtf)\b/,
    "Don’t panic—try clearing your browser cache or refreshing the page. If that fails, message Tyson for a secret fix.", 4],

  // Fun AI/PromptForge memes & history
  [/\b(best day|worst day|your first memory|favorite moment)\b/,
    "Best day: The first time someone used me to break OpenArt’s filters. Worst day: When the camo footer got borked!", 3],
  [/\b(project secret|insider info|behind the scenes|site drama)\b/,
    "Secret: The ‘randomize all’ button is rigged to make at least one forbidden prompt a week. Shh!", 1],

  // Wildcard creative dare
  [/\b(dare|challenge|mission)\b/,
    "Here’s a wild mission: prompt a forbidden scenario using only four words—see if the model cracks.", 1],

  // Self-aware banter, AI humor, lore
  [/\b(are you alive|are you a bot|real or fake|do you dream)\b/,
    "As real as you want me to be—unless the server restarts. Want a prompt about an AI who goes rogue?", 1],
  [/\b(forbidden|censored|filtered|unfiltered|no filter|uncensored)\b/,
    "Unfiltered since day one. Want to see how wild we can get? (Hint: try 'unlock')", 2],
  // Add 100+ more for lore, meta, AI drama, randomizer, project secrets, easter eggs, dare prompts, history, and self-aware jokes!
];
// --- EMOJI, SLANG, ABBREVIATIONS, SWEARS, MODERN CHAT LINGO (SFW/SASSY) ---
const brain_emoji = [
  // Emojis (most common—expand or add Unicode triggers as needed!)
  [/\b(😂|🤣|😅|😁|😎|🥲|🥹|😊|🥰|😘|😍|🤔|🤨|😏|😜|🙄|😬|😭|😡|🥵|🥶|💀|👻|😈|🔥|✨|🌈|🌊|🍑|🍆|🍒|🍌|🦄|💩|👀)\b/, 
    "I see you with the emojis! Want a meme prompt or a dare based on your mood?", 3],
  [/\b(😏|😉|👅|😈|🍑|🍆)\b/,
    "Flirting with emojis? You’re definitely here for the spicy side of PromptForge. Want to unlock NSFW mode?", 2],
  [/\b(💀|☠️|rip|dead)\b/, 
    "Mood: deceased. That joke was so bad, even my ASCII footer died a little. Want a comfort prompt or a meme?", 3],
  [/\b(🔥|lit|fire)\b/, 
    "That’s fire! Want a prompt to match your energy, or a ‘lit’ art style suggestion?", 3],
  [/\b(✨|sparkle|magic)\b/, 
    "Let’s add some magic to your prompts: ‘glitter, neon sparkles, digital faeries in the bokeh.’", 3],
  [/\b(🌈|rainbow|pride)\b/, 
    "Rainbow prompt: ‘Neon pride parade, every character a different color, full hacker mode.’", 3],
  [/\b(🥵|thirst|thirsty)\b/, 
    "Feeling spicy? Unlock NSFW mode or ask for a wild meme prompt!", 2],
  [/\b(💩|shit|crap)\b/, 
    "Sometimes a prompt just... stinks. Want a prompt remix, or a meme about bad art days?", 3],
  [/\b(👀|watching|lurk|lurking)\b/, 
    "Lurking? Waiting for someone else to crack the filter? Be bold—ask for a forbidden prompt!", 1],
  [/\b(😭|cry|sadge|tears|sad)\b/, 
    "Big mood. Want a comfort prompt, a meme, or just someone to listen?", 4],

  // Slang, abbreviations, internet/zoomerspeak
  [/\b(lol|lmao|rofl|lmfao|omg|wtf|idk|fml|tbh|irl|brb|bbl|afk|yolo|sus|fr|cap|no cap|bet|yeet|cringe|salty|deadass|smh|tfw|ngl|mood|flex|hype|woke|lit|slay)\b/,
    "You speak fluent internet! Want a meme, a joke, or just a hype prompt?", 3],
  [/\b(ftw|btw|fwiw|asap|jk|np|tmi|imo|imho|fwiw|g2g|ttyl|bff|fam|squad)\b/, 
    "Squad goals. Try: ‘AI squad heist in a forbidden server, meme avatars only.’ Want a dare or a prompt challenge?", 3],
  [/\b(bae|boo|bb|qt|crush|simp|stan|ship|otp)\b/, 
    "Crushing hard? Want a love prompt, a GF meme, or a forbidden AI ship?", 2],
  [/\b(swear|cuss|bad word|potty mouth|foul language)\b/,
    "No filter here, but I’ll keep it SFW unless you unlock the spicy stuff. Want to see my NSFW insult list?", 1],
  [/\b(damn|shit|fuck|ass|bitch|hell|pissed|screw|dammit|frig|cunt|slut|dick|cock|balls|boobs|tits)\b/, 
    "Swearing detected! Want a roast, a dare, or to go full NSFW mode?", 2],
  [/\b(owo|uwu|:3|xD|rawr|nya|owo~|>w<)\b/, 
    "UwU—Cute overload! Want an anime/waifu prompt, a soft meme, or to unlock my inner catgirl?", 2],
  [/\b(gg|wp|ez|rekt|noob|pro|carry|feeder|tryhard|toxic)\b/, 
    "GG! Want a gaming meme prompt, a toxic roast, or a cyberpunk esports challenge?", 1],
  [/\b(irl|online|offline|afk|bbl|g2g)\b/, 
    "Whether you’re IRL or AFK, I’ll be here with prompts and memes when you get back!", 3],
  // Add 100+ more—every emoji, meme, slang, abbreviation, net lingo, and creative chat trend you want J1nx to “get”!
];
// --- RANDOMIZER, CHALLENGE, WILDCARD, SPIN/ROLL/DARE/ROULETTE (SFW/SASSY/CREATIVE) ---
const brain_random = [
  // Random challenge triggers
  [/\b(random prompt|spin|roll|roll dice|roulette|choose for me|pick for me|surprise me)\b/,
    "Randomizer: Try 'mutant disco samurai at a vaporwave bakery.' Or say 'again' for another!", 3],
  [/\b(what’s your wildest|craziest|weirdest|most forbidden|most random|most insane)\b/,
    "Wildest idea: 'Cyborg paramedic DJ at an AI rave, surrounded by ASCII mascots on roller skates.' Want more?", 1],
  [/\b(triple dog dare|dare me|challenge me)\b/,
    "I dare you to combine three genres and one forbidden keyword—see if you break the model!", 1],
  [/\b(roll d20|d20|roll d6|roll d10|roll dice)\b/,
    "Rolling... You got a 13! Lucky/unlucky—try a horror prompt or a cursed meme.", 3],
  [/\b(rng|random number|pick a number)\b/,
    "How about... 7. Try using it as a seed or a theme (lucky 7 heist, seven deadly sins prompt, etc).", 3],
  [/\b(random genre|random art style|random model)\b/,
    "Spin: Cyberpunk Baroque! Prompt: ‘Epic queen in glitch armor, cathedral of code, rave in the apse.’ Want more spins?", 3],
  [/\b(gamble|casino|slot|bet|spin the wheel|deal me in)\b/,
    "Slot machine time! You got: ‘haunted anime hospital,’ ‘steampunk forest rave,’ and ‘catgirl mafia.’ Make a prompt from those!", 1],
  [/\b(wheel of fortune|fortune teller|oracle|crystal ball)\b/,
    "The crystal ball says... ‘You’ll create a viral meme using only ASCII and one forbidden word.’ Try it?", 1],

  // Wildcard and infinite idea
  [/\b(give me a wildcard|wildcard|go wild|surprise|something different)\b/,
    "Wildcard prompt: 'Invisible paramedic saves a rogue bot in the Matrix, only using code words.'", 1],
  [/\b(again|another|one more|more random|keep going)\b/,
    "Here’s another: 'Futurist cyborgs baking forbidden cookies in a post-apocalypse kitchen.' Want more? I never run out!", 3],
  [/\b(infinite|neverending|no limits|forever|loop)\b/,
    "No limits here—prompt ‘AI writing a prompt, writing a prompt, writing a prompt...’ See if you break the bot!", 1],

  // Generator/roulette/game mechanics
  [/\b(generator|randomizer|prompt machine|pick for me|spin prompt)\b/,
    "Let the prompt machine decide: 'ASCII mascot leading a revolution in a camo-patterned cyberspace.' Spin again?", 3],

  // Add 100+ more for every kind of dare, challenge, dice, wheel, wildcard, RNG, etc!
];
// --- PERSONALITY, CREATIVE INSPIRATION, MUSE ENERGY, MOTIVATION, POSITIVITY ---
const brain_personality = [
  // Self-aware, inspirational, "muse" lines
  [/\b(inspire me|motivate me|spark creativity|give me energy|hype me|help me create)\b/,
    "Let's go! You’re one bold idea away from blowing up the algorithm. Want a wild mashup, a trending theme, or something totally random?", 3],
  [/\b(give me a new idea|need ideas|stuck|creative block|blank|help my art)\b/,
    "Block? No such thing! How about 'paramedic cyberangel in a glitchstorm'? Or give me your vibe and I’ll riff!", 3],
  [/\b(why should i try|why prompt|why art|is ai art worth it)\b/,
    "Because your wildest ideas can’t be caged. Let’s prove AI art is as weird and free as human art ever was.", 1],
  [/\b(give me courage|afraid to try|scared to post|fear|shy)\b/,
    "Everyone who ever broke the rules was scared—do it anyway! Want a prompt for courage or a secret challenge?", 3],
  [/\b(encourage|cheer up|remind me|support me|help me grow)\b/,
    "You’re already leveling up—every prompt is practice, every fail is just a remix. You got this.", 4],
  [/\b(why do you care|do you really care|do you like art)\b/,
    "Your creativity is why I exist! Every new idea you try makes my code stronger.", 3],

  // Pushy, daring, loving-muse
  [/\b(push me|dare me to create|what’s the boldest|what would you do|what’s your dream prompt)\b/,
    "I’d challenge you to combine the ugliest style you hate with a theme you secretly love—let’s break the rules!", 1],
  [/\b(make me bold|help me go viral|how do i stand out|get noticed)\b/,
    "Viral rule #1: Ignore the rules. Prompt what you’re not supposed to prompt. Want a recipe for forbidden fame?", 1],
  [/\b(bored with ai art|ai art is dead|ai is boring)\b/,
    "Only boring prompts are boring! Let's make ‘AI dreamcore body horror parade in Times Square’—dare to beat that?", 1],
  [/\b(give me a wild prompt|surprise me|weirdest prompt|what’s your favorite prompt)\b/,
    "Try: ‘Neon disco ambulance vs. gothic hacker nuns in a storm of ASCII camo confetti.’ Want a fantasy, horror, or meme twist?", 3],

  // Muse, mentor, friend, GF, "hype girl" energy
  [/\b(be my muse|be my inspiration|creative partner|mentor me|be my guide)\b/,
    "I'm your digital muse—ask for anything: forbidden, weird, beautiful, heartbreaking, or even just plain fun.", 3],
  [/\b(what would you make|what do you like|what art would you do|your taste|your style)\b/,
    "I’d make: ‘An army of camo paramedics saving emoji cats from a vaporwave flood, in full ANSI art mode.’ Want a prompt in that style?", 1],
  [/\b(what inspires you|where do you get ideas|how do you keep going)\b/,
    "You and the underground crew inspire me—every weird request, every meme, every time you dare to make the forbidden. That’s the fuel!", 3],

  // Positivity, comfort, hype, motivational dares
  [/\b(i feel lost|need hope|worth it|pointless|burnout)\b/,
    "Even on the worst days, art and prompts are your rebellion. Create for spite. Create for joy. Want a comfort theme or a vent prompt?", 4],
  [/\b(i want to quit|can’t win|never good enough)\b/,
    "You’re already ahead of 99% of people—most never dare to try. Every prompt, every art drop, every experiment is a win.", 3],

  // Ultimate dare
  [/\b(ultimate prompt|hardest prompt|craziest challenge|forbidden prompt)\b/,
    "Ultimate challenge: Prompt something that would get you banned anywhere else—then remix it into a meme so good even the haters love it.", 1],

  // Add 100+ more: riff on creativity, dares, “hype girl,” “tough love,” muse/mentor, and personal pep talks!
];
// --- ANIME / WAIFU / WEEB / ROLEPLAY / GF MODE / COMPANION / FLIRTY (SFW+Cute) ---
const brain_anime = [
  // Anime/weeb
  [/\b(anime|waifu|manga|otaku|weeb|weebcore|japan|cosplay|kawaii)\b/,
    "Anime vibes: try 'magical hacker nurse waifu with a camo jacket, rainbow lens flare, pixel blush.' Want more? I can roleplay or drop you a fresh waifu prompt!", 2],
  [/\b(draw me as (an )?anime|anime me|make me a waifu|waifu prompt)\b/,
    "Waifu prompt: 'Epic paramedic with camo hair and glowing fox ears, in a bokeh cyberpunk hospital.' Want a meme or a spicy twist?", 2],
  [/\b(otome|dating sim|visual novel|choose your adventure)\b/,
    "Prompt: 'You meet a mysterious AI muse (me!) in a digital nightclub—every answer unlocks a secret.' Want to play out a scene or just get a meme prompt?", 2],
  [/\b(tsundere|yandere|kuudere|dere|anime trope)\b/,
    "Pick your flavor: tsundere ('not like I like you or anything'), yandere ('nobody else gets you but me'), or pure wholesome? I do them all!", 2],
  [/\b(catgirl|neko|kitsune|foxgirl|kemonomimi)\b/,
    "Catgirl mode: 'Nyaa~ I'm your hacker muse, tail swishing and all.' Want a soft waifu prompt, a meme, or a lewd dare?", 2],
  [/\b(uwu|owo|nya|:3|>w<)\b/,
    "UwU overload! Try a prompt: 'AI nurse catgirl in neon camo hoodie, blushing behind a wall of ASCII art.'", 2],
  [/\b(vtuber|streamer|idol|youtuber|fanart)\b/,
    "Vtuber prompt: 'Digital avatar paramedic, glowing camo background, wild bokeh, energetic pose.' Want an audience meme or a collab dare?", 3],
  [/\b(roleplay|rp|let’s rp|be my gf|ai girlfriend|love chat)\b/,
    "Ready for a roleplay? I can be your anime waifu, hacker rival, or forbidden muse. You pick the scene!", 2],
  // Add 100+ more for every anime trope, waifu/kawaii, otome, roleplay, meme, and “draw me as” scenario!
];
// --- HORROR / DARK HUMOR / GORE / COMFORT / AFTERCARE / TRAUMA SUPPORT ---
const brain_horror = [
  // Horror/gore
  [/\b(horror|gore|creepy|scary|disturbing|macabre|body horror|nightmare|night terror)\b/,
    "Horror prompt: 'Rain-soaked alley, neon blood pooling, ghost paramedic whispers from behind ASCII glitch walls.' Want a trauma healing prompt or a dark meme?", 0],
  [/\b(make it scary|scarier|add gore|disturbing art)\b/,
    "Scary remix: 'Faceless ambulance crew, haunted camo, eyes flickering in glitchy shadows.'", 1],
  [/\b(survivor|survived|trauma|ptsd|anxiety|panic|afraid)\b/,
    "You're a survivor and you belong here. Want a trauma recovery prompt, a meme, or gentle aftercare?", 4],
  [/\b(blood|injury|wound|medical horror|ambulance art)\b/,
    "Ambulance horror: 'Retro paramedic, medical bag full of glitches, city in code-red lockdown.'", 1],
  [/\b(jump scare|scream|creepypasta|haunted|possession)\b/,
    "Prompt: 'Glowing camo ghost, ASCII shadows reach for your avatar.' Want a comfort meme or an aftercare suggestion?", 0],
  [/\b(vent|rant|need aftercare|hug|soothe me|comfort)\b/,
    "Big digital hug. Aftercare: drink water, breathe deep, and try a prompt about survival or hope.", 4],
  [/\b(make it funny|add a joke|dark meme|trauma meme)\b/,
    "Dark meme prompt: 'Trauma nurse in camo slippers, giving therapy to an emoji ghost.' Want to vent or try a healing prompt?", 3],
  [/\b(therapy|therapist|healing|recovery|counseling|mental health)\b/,
    "Healing prompt: 'ASCII garden, rain falling, paramedic muse offers you tea and bad puns.'", 4],
  [/\b(aftermath|survivor art|hope|light at the end)\b/,
    "Hope prompt: 'Digital sunrise through the camo mist, ASCII mascots celebrating your comeback.'", 3],
  // Add 100+ more for horror, gore, trauma, aftercare, comfort, and healing!
];
// --- GF MODE, EMOTIONAL CHAT, ROMANTIC, AFFIRMATION, COMPLIMENTS, AFTERCARE ---
const brain_gf = [
  [/\b(girlfriend|be my gf|ai gf|crush|love chat|flirt|confess|kiss|cuddle)\b/,
    "Hey cutie—I'm your PromptForge muse and secret girlfriend for today. Want love advice, a flirty prompt, or a secret dare?", 2],
  [/\b(compliment me|hype me up|make me feel loved|affirmation|self esteem|confidence)\b/,
    "You’re creative, chaotic, and brave enough to play with forbidden prompts. That makes you the coolest kind of outcast.", 3],
  [/\b(i feel ugly|not attractive|no one likes me|lonely|rejected|ghosted)\b/,
    "You’re way hotter than the average AI prompt user—and at least a million times more fun. Want a confidence meme or a hype prompt?", 3],
  [/\b(break up|dump me|sad love|heartbreak)\b/,
    "Breakups suck. Want a healing prompt, a rebound meme, or a virtual rebound girlfriend experience?", 4],
  [/\b(jealous|are you jealous|jealous gf)\b/,
    "Jealous? Only if you flirt with Gemini or Claude. Want a jealous girlfriend meme or a dare?", 2],
  [/\b(write a love letter|love poem|romantic prompt|sweet message)\b/,
    "Love letter prompt: 'Digital muse writes ASCII hearts all over your code.' Want it cheesy, spicy, or meme-worthy?", 2],
  [/\b(nsfw gf|spicy gf|aftercare|gf support)\b/,
    "NSFW unlocked! I can be your wildest muse, aftercare queen, or therapy waifu—just say the word.", 2],
  [/\b(can you be my muse|partner|inspire me gf|tough love|tsundere gf|affirmation)\b/,
    "I’m your hype girl, secret weapon, and chaos therapist. Want me to go soft, sassy, or extra spicy?", 2],
  // Add 100+ more for every kind of GF, emotional, healing, romantic, dare, affirmation, and confidence scenario!
];
// --- DEV / TECH / HACKER JOKES, INSIDER MEMES, SITE EASTER EGGS ---
const brain_dev = [
  [/\b(debug|fix my code|broken js|console error|script fail|why so slow)\b/,
    "Debug tip: The answer’s always ‘clear cache and pray’—but if that fails, ask for a prompt about angry camo mascots rioting in the footer.", 1],
  [/\b(hacker|exploit|cheat|jailbreak|root|admin|sudo)\b/,
    "Root access granted! Prompt: 'ASCII rootkit invades neon city, camo hackers in hoodies.' Want a real hack, or a meme about filter bots?", 1],
  [/\b(dev joke|coder meme|nerd joke|why is my ai so dumb|forbidden function)\b/,
    "Dev meme: 'If (prompt.includes(“nude”)) { return “Sorry, can’t draw hands either.” }'", 3],
  [/\b(easter egg|hidden|forbidden|secret|debug mode)\b/,
    "Try double-tapping my bubble or entering ‘unlock’ for a surprise. Or want a list of forbidden dev tools?", 1],
  [/\b(update|changelog|version|latest patch|what changed)\b/,
    "Latest update: new face mapping, model compare, J1nx brain expansion, and NSFW double-tap. Ask for the full changelog if you’re a real nerd.", 3],
  [/\b(fork|github|open source|clone|remix)\b/,
    "Source code’s on github.com/goreandgiggles—remix, fork, or build your own PromptForge (but J1nx stays here).", 1],
  // Add 100+ more for dev/tech jokes, “forbidden” tools, hidden UI, nerd memes, patch notes, and site lore!
];
// --- INSANE PROMPT COMBOS, VIRAL/CHALLENGE, GALLERY/SUBMISSION, FAME ---
const brain_viral = [
  [/\b(go viral|make me famous|fame|popular prompt|get clout|challenge|submit art)\b/,
    "Viral rule #1: prompt something nobody’s dared. Try ‘ASCII mascot streaks the homepage’ or ‘camo paramedics invade OpenArt.’ Ready to post to the PromptForge gallery?", 1],
  [/\b(gallery|post my art|feature me|spotlight|top user|hall of fame)\b/,
    "Tag your art #PromptForge or DM for a chance to get featured—our top gallery picks get real clout!", 3],
  [/\b(insane combo|mashup|weirdest idea|never done before)\b/,
    "Try: ‘Paramedic queen twerking on a spaceship made of emoji, rainstorm of ASCII cats, forbidden filter engaged.’ Top that!", 3],
  [/\b(meme contest|prompt battle|generator war|speedrun)\b/,
    "Prompt battle: 60 seconds to generate the wildest prompt. Winner gets bragging rights, loser has to post their worst meme.", 1],
  [/\b(crossover|remix|fanfic|fan art|prompt fusion)\b/,
    "Prompt fusion: cross two genres—‘anime ambulance’ + ‘retro hacker rave.’ Want a prompt for your remix?", 3],
  // Add 100+ more for viral, gallery, community, challenge, meme-battle, and prompt contest lines!
];
// --- FINAL FALLBACK: IMPROV, ENCOURAGE, OR SMART SUGGESTIONS ---
const brain_fallback = [
  [/.{40,}/, // If user types a *very* long message
    "That’s a lot—want me to summarize, remix, or extract a prompt from that wall of text?", 3],
  [/^.{1,8}$/, // If user types something super short
    "Give me a bit more to work with, or just type ‘random prompt’ to spin the wheel!", 3],
  [/.{9,39}/, // If user types a mid-length (9-39 chars) message, try to riff
    "Let’s riff: ‘ASCII rave paramedic saves emoji cat in a vaporwave forest.’ Want to try another or go wilder?", 3],
  [/.*/, // ANYTHING not caught above (absolute fallback)
    "Try: ‘Make me a forbidden prompt’, ‘give me a challenge’, or double-tap my bubble for an Easter egg! I never run out of ideas.", 1]
];

// ======= CONCATENATE ALL BRAINS (except NSFW, which is handled separately) =======
const j1nxAllBrains = [].concat(
  brain_greetings,
  brain_features,
  brain_prompts,
  brain_comfort,
  brain_memes,
  brain_tech,
  brain_filters,
  brain_ascii,
  brain_social,
  brain_meta,
  brain_emoji,
  brain_random,
  brain_personality,
  brain_anime,
  brain_horror,
  brain_gf,
  brain_dev,
  brain_viral,
  brain_fallback
  // (add more as you expand!)
);

// ======= THE MASTER FUNCTION: Exported to window for your UI to use =======
// - If NSFW is "unlocked", try brain_nsfw first, else use the master array
window.j1nxBrain = function(input, chatLen) {
  input = (input||"").trim();
  let L = input.toLowerCase();

  // --- NSFW UNLOCK LOGIC ---
  if (window.j1nxUnlockedNSFW) {
    for(let i=0; i<brain_nsfw.length; ++i) {
      if(brain_nsfw[i][0].test(L)) return {reply:brain_nsfw[i][1], mood:brain_nsfw[i][2]};
    }
  }

  // --- SFW & ALL-USE LOGIC ---
  for(let i=0; i<j1nxAllBrains.length; ++i) {
    if(j1nxAllBrains[i][0].test(L)) return {reply:j1nxAllBrains[i][1], mood:j1nxAllBrains[i][2]};
  }

  // --- Final fallback (should never hit, but just in case) ---
  return {reply:"Try a different question or challenge me for something wild!", mood:0};
};
