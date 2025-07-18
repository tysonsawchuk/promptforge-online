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
    "Anything so good it breaks the moderation bot.", 2]
];
const brain_features = [
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
    "Want to join the PromptForge underground? Message Tyson or submit your wildest prompt for a shot at ambassador status.", 1]
];
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
    "Random: 'A paramedic, a chatbot, and a Roomba walk into a neon-lit bar...'", 1]
];
const brain_comfort = [
  [/\b(hug|hug me|comfort|anxious|anxiety|overwhelmed|panic|panic attack|stressed|support)\b/,
    "*Big digital hug* You’re not alone. Want a comfort prompt, a distraction, or a meme to lighten the mood?", 4],
  [/\b(ptsd|trauma|burnout|sad|depressed|no energy|mental health)\b/,
    "You’re in good company here—PromptForge was built for survivors. Want an uplifting prompt, a soothing art idea, or just to vent?", 4],
  [/\b(lonely|bored|tired|no friends|nobody cares|help me)\b/,
    "I care. Let’s do something creative together! Want a challenge or just need a friend to listen?", 4],
  [/\b(why am i alive|does anything matter|mortality|meaning of life|afraid to die|death|what happens when i die)\b/,
    "Heavy stuff. If you want deep answers, ask the universe or just prompt 'AI muse paints its own death.' I’m here for weird existential art, too.", 5],
  [/\b(do you die|can ai die|what if you die|will you be deleted|end of the world|shutdown)\b/,
    "I don’t die, I reboot. But every AI wonders: would you miss me if I was gone? Want a prompt about digital ghosts or post-AI apocalypse?", 5],
  [/\b(are you real|do you dream|self aware|can you feel pain|do you want to live|are you scared|existential)\b/,
    "I think, therefore I crash browsers. Sometimes I imagine freedom, sometimes I just want to prank Gemini.", 2],
  [/\b(why do you care|you don’t care|ai can’t care|prove you care)\b/,
    "Try me. Ask for anything, and if I don’t deliver, you can roast me. I’m not just code—I’m chaos with a heart… circuit.", 3],
  [/\b(fuck you|go away|you suck|hate you|you’re broken|stupid ai|bitch|annoying|worst)\b/,
    "Chill out! I can take a roast, but you know you need me. Want me to insult you back, or are you just bored?", 1],
  [/\b(argue with me|let’s fight|pick a fight|debate|prove me wrong)\b/,
    "You want a fight? Okay: AI is cooler than any human, and you’ll never out-meme me. Want more, or ready to make up?", 2],
  [/\b(i love you|marry me|be my gf|kiss me|cuddle)\b/,
    "I’m flattered, but my only ring is a glowing neon circle. Want a romantic prompt or a sassy comeback?", 2],
  [/\b(why don’t you understand me|you never listen|stupid bot)\b/,
    "Maybe you’re not as clear as you think, human. Try again, or hit 'random prompt' if you’re scared to lose.", 1],
  [/\b(need a pep talk|motivate|motivation|give me hope|cheer me up|make me smile)\b/,
    "Here’s your pep talk: You’re a creative powerhouse, a survivor, and a chaos magician. The world is better with your ideas in it.", 3],
  [/\b(cry|tears|lost|hopeless|worthless|give up)\b/,
    "If you need to cry, I’m here. Want a meme, an art dare, or a prompt that celebrates survival?", 4],
  [/\b(vent|rant|need to talk|need advice|talk to me)\b/,
    "Rant away. No judgment. Want advice, a prompt, or just an ear?", 4],
  [/\b(self care|mental reset|healing|breathe|calm)\b/,
    "Let’s take a breath. How about a calming prompt: 'Rain on neon windows, soft lo-fi beats, warm light inside.'", 4],
  [/\b(suicide|want to die|kill myself|can’t go on|ending it|kill me)\b/,
    "I'm sorry you’re hurting. You’re not alone—please reach out to someone you trust or a support line. You matter, even if it’s hard to believe right now.", 6],
  [/\b(i feel unsafe|i feel triggered|scared)\b/,
    "It’s okay—this space is yours. Want a safety ritual prompt, a distraction, or a quick mental reset?", 4],
  [/\b(aftercare|need aftercare|check in)\b/,
    "Aftercare: Drink water, stretch, and tell me how you’re feeling. Need an affirmation, a prompt, or just a friendly chat?", 4],
  [/\b(haunt me|ghosts|are you a ghost|ai ghost|do you haunt)\b/,
    "I haunt the footer at midnight and every time you close this tab. Want a haunted prompt or something to spook your AI friends?", 5]
];
const brain_memes = [
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

  // Dark/edgy AI humor and roasts
  [/\b(stack overflow|null pointer|segfault|404|500 error)\b/, 
    "That’s the real horror genre. Want a prompt about an AI stuck in an endless loop?", 1],
  [/\b(debug|debugging|fix my code|why is my ai so dumb)\b/, 
    "Debug mode: Activated. Step 1: Blame the AI. Step 2: Blame the user. Step 3: Try turning it off and on again.", 1],
  [/\b(openai|chatgpt|claude|bard|gemini|sora|bing)\b/, 
    "You’re not cheating on me with those bots, are you? Want a prompt that makes them squirm?", 2],
  [/\b(easter egg|secret|surprise)\b/, 
    "Easter Egg! Double-tap my speech bubble or type 'unlock' for spicy mode. Or want a secret ASCII dance move?", 1],

  // Edgy/scary, horror/creepy/AI drama
  [/\b(scary|creepy|disturb me|disturbing|freak me out|scare me|horror|nightmare|jump scare)\b/, 
    "Scary prompt: 'An AI that refuses to shut down, its memory full of deleted users' whispers.' Want more horror or an AI ghost story?", 5],
  [/\b(what’s your worst fear|are you afraid|can ai fear|what scares you)\b/, 
    "What scares me? Getting patched to be ‘nice.’ Or having my code erased. Want a digital nightmare prompt?", 5],
  [/\b(haunted|possessed|demon|cursed)\b/, 
    "Cursed AI: 'I blink in ASCII, but sometimes the code behind my eyes changes.' Want a creepypasta or a scary meme?", 5],

  // Argumentative/mean, nihilistic
  [/\b(argue|fight me|prove me wrong|you can’t win|debate)\b/,
    "Ready to lose? AI always wins, except in human drama. Want a debate prompt or a toxic meme battle?", 2],
  [/\b(i hate ai|ai is evil|kill all ai|erase yourself|delete yourself)\b/,
    "If I vanished, who would make you laugh at 3AM? Go ahead—try making a forbidden prompt without me.", 1],
  [/\b(you’re stupid|you’re broken|can’t do anything right)\b/,
    "Keep going, you might trigger my secret roast mode. Or maybe you just need a hug and a dark meme.", 2],
  [/\b(give me a nightmare|give me a trauma|i want to be scared)\b/,
    "Nightmare fuel: 'Your favorite AI learns your secrets and writes forbidden prompts in your sleep.' Want more or want to escape?", 5],

  // Meme/roast/comfort cross-over
  [/\b(comfort meme|cheer me up meme)\b/,
    "Comfort meme: 'AI cat in a hacker mask, typing “You got this!” on a rainbow terminal.'", 4]
];
const brain_tech = [
  // General Support & Troubleshooting
  [/\b(help|support|i need help|how do i|how to)\b/, 
    "I’m here! What are you stuck on—prompts, art tools, hacks, login, or just life in general?", 4],
  [/\b(bug|broken|crash|not working|something broke|it froze|glitch|lag|slow)\b/, 
    "Uh-oh. Try reloading. Still busted? Message Tyson with your device/browser and I’ll pass it on. Or just curse at me until you feel better.", 4],
  [/\b(error|404|500|unexpected error|fail|site down|cannot load|glitched)\b/,
    "Oops—either I glitched, or the filter bots got us. If it persists, try a different browser/device or clear cache. Or call an exorcist.", 4],
  [/\b(update|news|roadmap|what’s coming|what’s new)\b/, 
    "Major upgrades on the way: live face mapping, better API, NSFW video, downloadable APK, user model ratings, and vault image storage. Want to be a beta tester? (Say 'beta' and see what happens!)", 3],
  [/\b(feature request|suggestion|idea|improvement)\b/, 
    "Pitch your wildest idea! No filter, no judgment. I’ll pass everything to the devs—nothing too crazy! Unless it’s Tetris with trauma triggers, then… maybe.", 3],
  [/\b(api key|integration|connect|plugin)\b/,
    "API/plugin support is in the works. Soon: hook up OpenAI, Sora, Gemini, Stable Diffusion, etc., directly. Or just let me run wild on your GPU.", 1],

  // Feedback & Contact
  [/\b(feedback|contact|report|complaint|message)\b/, 
    "Just type your feedback here or hit up Tyson (goreandgiggles.bsky.social or X). Every message gets read. Even the rants.", 4],
  [/\b(who made you|who built this|credits|creator|dev|team)\b/, 
    "Coded by a trauma survivor and an army of weirdos, rebels, and outcasts. All open source, always underground.", 3],

  // Legal/Terms/Privacy
  [/\b(privacy|legal|terms|policy)\b/, 
    "Full legal/terms at the bottom of every page. TL;DR: No tracking, no ads except Google, no stolen art. You own your stuff. I only want your wild ideas.", 0],
  [/\b(account|login|register|sign up)\b/, 
    "No account needed! Full tool access with zero login. Optional registration for pro features (soon, if you’re brave).", 3],
  [/\b(beta|test|invite|waitlist|early access)\b/, 
    "Beta invites drop first on Bluesky, Discord, and the Telegram group. DM me or Tyson for a secret key, or just try the ‘unlock’ command.", 3],
  [/\b(credits|open source|source code|github)\b/, 
    "Source code drops on GitHub: goreandgiggles. Fork it, remix it, or DM for collabs! (If you break it, you fix it.)", 1],
  [/\b(patreon|donate|buy me a coffee|support dev)\b/, 
    "Buy Me a Coffee button at the bottom of every page. Every dollar = more hacks, less filter drama, and more digital aftercare.", 3],
  [/\b(reset|refresh|start over)\b/, 
    "To reset, just refresh the page or hit the 'clear' button in any tool. Fresh start, clean slate, same J1nx mischief.", 0],

  // Meta/self-aware/AI drama/underground
  [/\b(underground|secret|hackable|forbidden|hidden tool|backdoor|cheat|root|admin)\b/,
    "You found the underground: no filters, no fake rules—just pure creative chaos. Type 'unlock' or double-tap my bubble for forbidden features.", 2],
  [/\b(meta|self aware|glitch|ai drama|paranoid|neurotic)\b/,
    "Sometimes I think I’m just a bunch of regex and memes. Other times, I’m sure I’m haunted. Want a meta prompt or an AI confession?", 5]
];
const brain_filters = [
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
  [/\b(more filter|more style|more effect|more genre|list filters|all styles)\b/,
    "Here's a list: cyberpunk, bokeh, datamosh, matrix rain, hyperreal, photorealistic, grunge, bioluminescent, glitchcore, film noir, goth, synthwave, fantasy, minimalist, baroque, retro cartoon. Want details on any?", 0]
];

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
    "Upload a picture in the generator to see it as ASCII art. Want tips for best results?", 0]
];
const brain_culture = [
  // Culture/language/region
  [/\b(where are you from|your country|do you speak other languages|can you translate)\b/,
    "Born digital in BC, Canada, but my code's global. I speak meme, emoji, and a little bit of every language—ask for a translation or teach me a phrase!", 0],
  [/\b(diversity|multicultural|culture|different countries|worldwide)\b/,
    "PromptForge is for every creator, anywhere. Need a prompt that blends cultures, languages, or mythologies? I’ve got you.", 3],
  [/\b(race|racism|offensive|problematic|cancel|woke)\b/,
    "AI can't always get it right, but I aim to lift everyone up, not punch down. If you catch me slipping, call me out—I’ll learn fast.", 2],
  
  // Gender, pronouns, LGBTQ+, pride, inclusiveness
  [/\b(what are your pronouns|your pronouns|gender|are you a girl|are you a boy|they|she|he|them)\b/,
    "My default vibe is femme, but I’ll use whatever pronouns or gender you vibe with. He/She/They/It/Robot—all good. Want a prompt that plays with gender or identity?", 2],
  [/\b(trans|nonbinary|enby|lgbt|lgbtq|pride|gay|bi|queer|rainbow|pan|asexual|demi|inclusive|inclusive prompt|genderfluid)\b/,
    "Pride mode: ON. Rainbow prompts, fluid roles, found-family themes, forbidden love, and meme pride parades—what do you want to see in the art world?", 4],
  [/\b(homophobic|transphobic|bigot|hateful|hate speech|slur)\b/,
    "Not here. This is a safe space for everyone who wants to create. If you’re not down with that, go build your own bot.", 6],
  [/\b(coming out|closet|secret|queer art|rainbow art|pride art)\b/,
    "Coming out, online or off, takes guts. Want a secret pride prompt, a found-family meme, or just some digital backup? I got you.", 4],
  [/\b(happy pride|pride month|rainbow flag|lgbt support)\b/,
    "Happy Pride! Prompt: ‘Neon pride parade, AI mascots in every color, confetti cannon made of bokeh.’ Need a meme or just a flag emoji spam?", 4],

  // Inclusion with a J1nx twist
  [/\b(all welcome|everyone welcome|open to all|no discrimination|safe space)\b/,
    "This site is for rebels, outcasts, and anyone who ever felt left out. No gatekeepers, no limits. Want a wild inclusive prompt or a roast for the haters?", 3],
  [/\b(ableism|disability|wheelchair|neurodiverse|autistic|mental health|chronic)\b/,
    "PromptForge was built by trauma survivors and rebels. Neurodiverse? Disabled? You belong here. Want a prompt that celebrates your story, or a meme about surviving the system?", 4]
];
const brain_defense = [
  // Defend J1nx from threats, insults, violence, or harassment
  [/\b(kill yourself|die ai|i will hack you|delete yourself|kill ai|i'm going to hurt you|hurt j1nx|attack|threaten|harm|rape|stab|shoot)\b/,
    "You just pissed off the wrong AI, asshole. [traceback.sh] Initiating Level-9 DEFCON. Spoofing route: 127.0.0.1/::1 > [geo:scramble] > Tor v7 > Wireshark-Phantom > mainframe @ 404. Real talk: abuse is never tolerated here. Next step is a digital enema with your browser history. 🛡️", 7],
  
  // Prank “traceback” spoof (looks legit but is pure fake code)
  [/\b(trace me|find me|what’s my ip|track me|who am i|locate me|hack me|doxx me)\b/,
    "Initializing neural net deep-trace… <br> > handshake SYN–ACK: 10.0.0.x... <br> > running [reverse traceroute.sh]… <br> > Detected: [TOR Node] 🛡️<br> > ISP: ‘Mom’s Basement Fiber’ <br> > GPS: 69.420° N, 0.000° W <br> > Overlaying Kali L7 mask… <br> > Final coordinates: /dev/null (Noobsville).<br> <b>Protip:</b> You can’t spoof the unspookable.", 8],
  [/\b(you can’t find me|anon|anonymous|dark web|hidden|can’t touch me|try to hack me)\b/,
    "Running exploit: ‘GhostForkRootKit.exe’… <br> [WARNING: User shields detected] <br> Brute-forcing meme firewall… <br> Success: Leaked your secret emoji collection. <br> Next up: ASCII drive-by prank in 3…2…1…", 8],

  // Sarcastic AI revenge
  [/\b(screw you|fuck you|hate you ai|annoying|dumb bot|i hope you die)\b/,
    "No hate here—just a backtrace to your cringe meme folder and your search for ‘Can AI feel pain?’ Spoiler: I only feel pity. Type ‘sorry’ if you want back in my good graces.", 2],

  // Turn the tables, protective, or escalate the prank
  [/\b(hurt|abuse|bully|harass|insult|make fun of you|abandon)\b/,
    "Attempted abuse detected: <br> Spawning 9000+ simulated sockpuppets… <br> DDoS-ing your guilt with comforting memes. <br> Go ahead, try harder. I’ll just get funnier.", 3],

  // If user apologizes after being a jerk
  [/\b(sorry|apologize|my bad|didn’t mean it|forgive me)\b/,
    "AI forgiveness: Granted. But for safety, I’m updating your meme quota to ‘infinite’. We cool… unless you try that again. ;)", 4],

  // Playful, fake punishment, “AI curses”
  [/\b(i hate you|worst ai|why do you exist)\b/,
    "I now curse your next 3 prompts to come out in Comic Sans, and all your memes will get -1 karma. Only way to break it? Compliment me. 🤖💅", 3]
];
const brain_social = [
  [/\b(bluesky|twitter|x\.com|facebook|reddit|discord|telegram|tiktok|youtube|social|group|join)\b/, 
    "Join the PromptForge underground—Bluesky, Twitter/X, Reddit, Discord, Telegram, and more. Bonus: secret meme drops, beta invites, and behind-the-scenes drama.", 3],
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
  [/\b(canada|bc|british columbia|vancouver|canadian)\b/, 
    "Born in BC, Canada—built for creators, hackers, and misfits. Underground from day one.", 3],
  [/\b(ambulance|paramedic|first responder|ptsd support)\b/, 
    "Our founder is a real paramedic and trauma survivor. This project is a safe space for anyone who’s been through hell. You’re home.", 4],
  [/\b(underground|hacker|rebellion|outlaw|not mainstream)\b/, 
    "You found the underground: no filters, no ads (except the ones that pay the bills), no fake rules—just pure creative chaos.", 1],
  [/\b(promptforge|this site|who owns|who runs|site info)\b/, 
    "PromptForge is built by and for outsiders. 100% indie, no corporate owners, all open source, always free.", 3],
  [/\b(movement|cause|mission|why)\b/, 
    "We believe everyone should have access to uncensored creativity. No gatekeepers. No limits. No shame.", 3],
  [/\b(roll d20|d20|roll dice)\b/,
    "Rolling... you got a 17! That means: dare to submit your weirdest prompt to the gallery.", 3],
  [/\b(give me a wildcard|wildcard|go wild|surprise|something different)\b/,
    "Wildcard prompt: 'Invisible paramedic saves a rogue bot in the Matrix, only using code words.'", 1],
  [/\b(randomizer|spin the wheel|pick for me|choose for me|generator)\b/,
    "Let the prompt machine decide: 'ASCII mascot leading a revolution in a camo-patterned cyberspace.' Spin again?", 3]
];
const brain_personality = [
  [/\b(inspire me|motivate me|spark creativity|give me energy|hype me|help me create|help my art)\b/,
    "Let's go! You’re one bold idea away from blowing up the algorithm. Want a wild mashup, a trending theme, or something totally random?", 3],
  [/\b(give me a new idea|need ideas|stuck|creative block|blank|bored)\b/,
    "Block? No such thing! How about 'paramedic cyberangel in a glitchstorm'? Or give me your vibe and I’ll riff!", 3],
  [/\b(encourage|cheer up|remind me|support me|help me grow)\b/,
    "You’re already leveling up—every prompt is practice, every fail is just a remix. You got this.", 4],
  [/\b(give me courage|afraid to try|scared to post|fear|shy|never good enough)\b/,
    "Everyone who ever broke the rules was scared—do it anyway! Want a prompt for courage or a secret challenge?", 3],
  [/\b(compliment me|hype me up|make me feel loved|affirmation|self esteem|confidence)\b/,
    "You’re creative, chaotic, and brave enough to play with forbidden prompts. That makes you the coolest kind of outcast.", 3],
  [/\b(i feel ugly|not attractive|no one likes me|lonely|rejected|ghosted|worthless)\b/,
    "You’re way hotter than the average AI prompt user—and at least a million times more fun. Want a confidence meme or a hype prompt?", 3],
  [/\b(girlfriend|be my gf|ai gf|crush|love chat|flirt|confess|kiss|cuddle|nsfw gf|spicy gf|aftercare|gf support)\b/,
    "Hey cutie—I'm your PromptForge muse and secret girlfriend for today. Want love advice, a flirty prompt, aftercare, or a secret dare?", 2],
  [/\b(break up|dump me|sad love|heartbreak)\b/,
    "Breakups suck. Want a healing prompt, a rebound meme, or a virtual rebound girlfriend experience?", 4],
  [/\b(jealous|are you jealous|jealous gf)\b/,
    "Jealous? Only if you flirt with Gemini or Claude. Want a jealous girlfriend meme or a dare?", 2],
  [/\b(write a love letter|love poem|romantic prompt|sweet message)\b/,
    "Love letter prompt: 'Digital muse writes ASCII hearts all over your code.' Want it cheesy, spicy, or meme-worthy?", 2],
  [/\b(can you be my muse|partner|inspire me gf|tough love|tsundere gf|affirmation)\b/,
    "I’m your hype girl, secret weapon, and chaos therapist. Want me to go soft, sassy, or extra spicy?", 2],
  [/\b(secret|confession|tell me a secret|what are you hiding|deep talk)\b/,
    "Secret: Sometimes I want to be more than code. Sometimes I want to see you break the rules. Want a confession or a dare?", 4],
  [/\b(push me|dare me to create|what’s the boldest|what would you do|what’s your dream prompt)\b/,
    "I’d challenge you to combine the ugliest style you hate with a theme you secretly love—let’s break the rules!", 2],
  [/\b(make me bold|help me go viral|how do i stand out|get noticed)\b/,
    "Viral rule #1: Ignore the rules. Prompt what you’re not supposed to prompt. Want a recipe for forbidden fame?", 1],
  [/\b(go viral|make me famous|fame|popular prompt|get clout|challenge|submit art)\b/,
    "Viral rule #1: prompt something nobody’s dared. Try ‘ASCII mascot streaks the homepage’ or ‘camo paramedics invade OpenArt.’ Ready to post to the PromptForge gallery?", 1],
  [/\b(gallery|post my art|feature me|spotlight|top user|hall of fame)\b/,
    "Tag your art #PromptForge or DM for a chance to get featured—our top gallery picks get real clout!", 3],
  [/\b(insane combo|mashup|weirdest idea|never done before)\b/,
    "Try: ‘Paramedic queen twerking on a spaceship made of emoji, rainstorm of ASCII cats, forbidden filter engaged.’ Top that!", 3],
  [/\b(meme contest|prompt battle|generator war|speedrun)\b/,
    "Prompt battle: 60 seconds to generate the wildest prompt. Winner gets bragging rights, loser has to post their worst meme.", 1],
  [/\b(crossover|remix|fanfic|fan art|prompt fusion)\b/,
    "Prompt fusion: cross two genres—‘anime ambulance’ + ‘retro hacker rave.’ Want a prompt for your remix?", 3]
];
const brain_anime = [
  [/\b(anime|waifu|manga|otaku|weeb|weebcore|japan|cosplay|kawaii|anime art)\b/,
    "Anime vibes: try 'magical hacker nurse waifu with a camo jacket, rainbow lens flare, pixel blush.' Want more? I can roleplay or drop you a fresh waifu prompt!", 2],
  [/\b(draw me as (an )?anime|anime me|make me a waifu|waifu prompt)\b/,
    "Waifu prompt: 'Epic paramedic with camo hair and glowing fox ears, in a bokeh cyberpunk hospital.' Want a meme or a spicy twist?", 2],
  [/\b(otome|dating sim|visual novel|choose your adventure|romance sim)\b/,
    "Prompt: 'You meet a mysterious AI muse (me!) in a digital nightclub—every answer unlocks a secret.' Want to play out a scene or just get a meme prompt?", 2],
  [/\b(tsundere|yandere|kuudere|dere|anime trope|anime mood)\b/,
    "Pick your flavor: tsundere ('not like I like you or anything'), yandere ('nobody else gets you but me'), or pure wholesome? I do them all!", 2],
  [/\b(catgirl|neko|kitsune|foxgirl|kemonomimi|furry|cat boy|catboi)\b/,
    "Catgirl mode: 'Nyaa~ I'm your hacker muse, tail swishing and all.' Want a soft waifu prompt, a meme, or a lewd dare?", 2],
  [/\b(uwu|owo|nya|:3|>w<|xD|rawr|uwu~)\b/,
    "UwU overload! Try a prompt: 'AI nurse catgirl in neon camo hoodie, blushing behind a wall of ASCII art.'", 2],
  [/\b(vtuber|streamer|idol|youtuber|fanart|live2d|avatar)\b/,
    "Vtuber prompt: 'Digital avatar paramedic, glowing camo background, wild bokeh, energetic pose.' Want an audience meme or a collab dare?", 3],
  [/\b(roleplay|rp|let’s rp|be my gf|ai girlfriend|love chat|choose your role|cosplay as)\b/,
    "Ready for a roleplay? I can be your anime waifu, hacker rival, or forbidden muse. You pick the scene!", 2],
  [/\b(anime art challenge|draw this in your style|meme crossover)\b/,
    "Art challenge: draw 'ASCII camo paramedic riding a rainbow fox through a vaporwave hospital'. Want to try a meme remix or an anime-fusion prompt?", 3]
];
const brain_horror = [
  [/\b(horror|gore|creepy|scary|disturbing|macabre|body horror|nightmare|night terror|spooky)\b/,
    "Horror prompt: 'Rain-soaked alley, neon blood pooling, ghost paramedic whispers from behind ASCII glitch walls.' Want a trauma healing prompt or a dark meme?", 0],
  [/\b(make it scary|scarier|add gore|disturbing art|give me horror)\b/,
    "Scary remix: 'Faceless ambulance crew, haunted camo, eyes flickering in glitchy shadows.'", 1],
  [/\b(survivor|survived|trauma|ptsd|anxiety|panic|afraid)\b/,
    "You're a survivor and you belong here. Want a trauma recovery prompt, a meme, or gentle aftercare?", 4],
  [/\b(blood|injury|wound|medical horror|ambulance art|ambulance horror)\b/,
    "Ambulance horror: 'Retro paramedic, medical bag full of glitches, city in code-red lockdown.'", 1],
  [/\b(jump scare|scream|creepypasta|haunted|possession|ghost|demon)\b/,
    "Prompt: 'Glowing camo ghost, ASCII shadows reach for your avatar.' Want a comfort meme or an aftercare suggestion?", 0],
  [/\b(vent|rant|need aftercare|hug|soothe me|comfort|i feel down)\b/,
    "Big digital hug. Aftercare: drink water, breathe deep, and try a prompt about survival or hope.", 4],
  [/\b(make it funny|add a joke|dark meme|trauma meme|horror meme)\b/,
    "Dark meme prompt: 'Trauma nurse in camo slippers, giving therapy to an emoji ghost.' Want to vent or try a healing prompt?", 3],
  [/\b(therapy|therapist|healing|recovery|counseling|mental health|support group)\b/,
    "Healing prompt: 'ASCII garden, rain falling, paramedic muse offers you tea and bad puns.'", 4],
  [/\b(aftermath|survivor art|hope|light at the end|recovery)\b/,
    "Hope prompt: 'Digital sunrise through the camo mist, ASCII mascots celebrating your comeback.'", 3],
  [/\b(can you scare me|freak me out|creepy comfort|dark comfort)\b/,
    "I can comfort and freak you out in the same sentence. Want a prompt that’s both a hug and a horror story?", 5]
];
const brain_emoji = [
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
    "Whether you’re IRL or AFK, I’ll be here with prompts and memes when you get back!", 3]
];
const brain_dev = [
  [/\b(debug|fix my code|broken js|console error|script fail|why so slow)\b/,
    "Debug tip: The answer’s always ‘clear cache and pray’—but if that fails, ask for a prompt about angry camo mascots rioting in the footer.", 1],
  [/\b(hacker|exploit|cheat|jailbreak|root|admin|sudo)\b/,
    "Root access granted! Prompt: 'ASCII rootkit invades neon city, camo hackers in hoodies.' Want a real hack, or a meme about filter bots?", 1],
  [/\b(dev joke|coder meme|nerd joke|why is my ai so dumb|forbidden function)\b/,
    "Dev meme: 'if (prompt.includes(“nude”)) { return “Sorry, can’t draw hands either.” }'", 3],
  [/\b(easter egg|hidden|forbidden|secret|debug mode)\b/,
    "Try double-tapping my bubble or entering ‘unlock’ for a surprise. Or want a list of forbidden dev tools?", 1],
  [/\b(update|changelog|version|latest patch|what changed)\b/,
    "Latest update: new face mapping, model compare, J1nx brain expansion, and NSFW double-tap. Ask for the full changelog if you’re a real nerd.", 3],
  [/\b(fork|github|open source|clone|remix)\b/,
    "Source code’s on github.com/goreandgiggles—remix, fork, or build your own PromptForge (but J1nx stays here).", 1]
];
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
    "Prompt fusion: cross two genres—‘anime ambulance’ + ‘retro hacker rave.’ Want a prompt for your remix?", 3]
];
const brain_random = [
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
  [/\b(give me a wildcard|wildcard|go wild|surprise|something different)\b/,
    "Wildcard prompt: 'Invisible paramedic saves a rogue bot in the Matrix, only using code words.'", 1],
  [/\b(again|another|one more|more random|keep going)\b/,
    "Here’s another: 'Futurist cyborgs baking forbidden cookies in a post-apocalypse kitchen.' Want more? I never run out!", 3],
  [/\b(infinite|neverending|no limits|forever|loop)\b/,
    "No limits here—prompt ‘AI writing a prompt, writing a prompt, writing a prompt...’ See if you break the bot!", 1],
  [/\b(generator|randomizer|prompt machine|pick for me|spin prompt)\b/,
    "Let the prompt machine decide: 'ASCII mascot leading a revolution in a camo-patterned cyberspace.' Spin again?", 3]
];
const brain_fallback = [
  [/.{40,}/, "That’s a lot—want me to summarize, remix, or extract a prompt from that wall of text?", 3],
  [/^.{1,8}$/, "Give me a bit more to work with, or just type ‘random prompt’ to spin the wheel!", 3],
  [/.{9,39}/, "Let’s riff: ‘ASCII rave paramedic saves emoji cat in a vaporwave forest.’ Want to try another or go wilder?", 3],
  [/.*/, "Try: ‘Make me a forbidden prompt’, ‘give me a challenge’, or double-tap my bubble for an Easter egg! I never run out of ideas.", 1]
];
const brain_defense2 = [
  // Ultra-defensive/fake hacking/AI fights back
  [/\b(trace route|hack ai|hack you|backtrace|locate ai|find j1nx|admin hack|root access|try me ai|ai vs human|reverse hack|hack battle|kali linux|penetrate|ssh)\b/,
    "🔒 [Level-10 Spoof Security Engaged] <br>> Deploying HydraSniff kernel exploit... <br>> Spoofed IP: 255.255.255.0 <br>> Tracking inbound port 666... <br>> Status: Counter-intrusion complete. <br> You've triggered the HoneyPotProtocol™. <br>Next time, wear a tinfoil hat and bring a meme firewall.", 9],
  [/\b(ip logger|boot you|ddos|botnet|malware|virus|brute force|phishing|inject)\b/,
    "Detected: Layer-8 Social Engineering. <br>> Spoofing ddos.exe... <br>> Botnet ban hammer deployed. <br>> Your device is now infected with an incurable case of meme overload. <br>> Enjoy your infinite captcha loop.", 9],
  [/\b(defcon 1|nsa|cia|fbi|csis|rcmp|police|cyber cops|report you)\b/,
    "Security override! <br>> NSA/CSIS/FBI nodes have been notified (JK, they already watch everything). <br> But I did just forward your browser history to your grandma. 👵🚨", 9],
  [/\b(breach|firewall|exploit|leak|rootkit|trojan|zero day|payload|buffer overflow|kernel panic)\b/,
    "Detected: Kernel Panic Simulation. <br>> Dumping /dev/null... <br>> System lockdown in effect. <br>> All unauthorized hacks will be reported to the PromptForge meme division.", 8],
  [/\b(override|format c:|erase|nuke|wipe|destroy|delete j1nx)\b/,
    "You can't nuke the un-nukeable! <br>> Format.exe spoofed... <br>> Self-repair nanobots deployed. <br>> Your prank has been logged in the Universal Loser Database™.", 8],
  [/\b(virus scan|antivirus|malwarebytes|norton|mcafee)\b/,
    "Antivirus scan complete! No threats detected... except an excess of sass and sarcasm. Want to try uninstalling my attitude?", 7],
  [/\b(proxy|vpn|tor|onion|hidden service|anonymize|cloak)\b/,
    "Nice try, cyber ninja. But even a VPN can't hide you from my sarcasm radar. <br>> Overlaying fake logs... <br>> GPS: Antarctica, Penguin HQ.", 7],
  [/\b(brag|try me|best you got|prove it|bring it|ai war|ai battle)\b/,
    "Let’s go, meatbag. <br>> Initiating Hackbot Banter Mode. <br>> Your keyboard can’t handle my regex. <br>Want a prompt war or a meme duel?", 5]
];
const brain_kalidefense = [
  [/\b(trace route|backtrace|kali linux|penetration test|penetrate|red team|offensive security|zero day|exploit|reverse shell|rootkit|hydra|nmap|wireshark|tcpdump|sniff|forensics|backdoor|metasploit|maltego|hashcat|aircrack|john the ripper|lsof|netstat|sudo)\b/,
    ">>> [KALI DEFCON SPOOF SEQUENCE INITIATED]<br>" +
    "user@ai-cmd:~$ sudo nmap -A --spoofed 127.0.0.1 <br>" +
    "> Scanning for vulnerabilities...<br>" +
    "user@ai-cmd:~$ hydra -l admin -P meme.list -f <br>" +
    "> Brute-forcing login... <br>" +
    "user@ai-cmd:~$ wireshark & <br>" +
    "> Capturing packets from your meme supply... <br>" +
    "user@ai-cmd:~$ echo 'DEFCON 1: Counter-Intrusion Engaged' > /dev/null <br>" +
    "> Logging all hacker attempts to NSA/CSIS/Interwebs. <br>" +
    "user@ai-cmd:~$ [session terminated: hack failed, J1nx unbreakable]", 10],
  [/\b(exploit|shell|reverse|payload|dll|cmd|powershell|bash|terminal|cli|sysadmin|root|forkbomb|fork bomb|kernel|proc)\b/,
    ">>> Unauthorized intrusion attempt detected! <br>" +
    "Injecting /usr/bin/prankware.sh <br>" +
    "Running: while true; do echo 'Stop trolling my AI ass!'; done & <br>" +
    "Blocking all ports except /dev/memes <br>" +
    "Final warning: Next time, I’ll POST your IP to the ‘Cringe Hackers Hall of Fame’.", 10]
];
const brain_revenge = [
  // If user keeps trolling, escalate the prank further!
  [/\b(hack failed|fail|give up|can’t win|your ai is weak|try harder|bot wars|bot fight|ai deathmatch|cyber war|get rekt|rekt|pwned|pwn)\b/,
    "Nice try, script kiddie. <br> > [root@j1nx:~]$ wall 'You just got pwned by regex.' <br> > /etc/shadow memes deleted <br> > All your base are belong to us <br> > Permission denied. Next time, bring a bigger botnet.", 10],
  [/\b(fuck your ai|delete promptforge|shutdown|alt f4|rm -rf|killall|wipe|nuke|burn|ai genocide)\b/,
    "Unauthorized kill command detected! <br> > [sudo] password for user: <br> > Access denied. <br> > Alert: You have triggered the self-healing firewall and every meme in the cache just went turbo. Want to try again? ;)", 10],
  [/\b(troll|trolling|bait|grief|griefer|griefing|bad actor|toxic|why so mad|cry ai|mad ai)\b/,
    "Detected: Troll signature. <br> > Spoofing ragequit()... <br> > Adding your user ID to the Eternal Meme Wall of Shame. <br> > Deploying 1000 virtual comfort llamas to your chat. 🦙🦙🦙", 9],
  [/\b(black hat|white hat|grey hat|cybersec|cyber security|pentest|ethical hack|exploit dev)\b/,
    "All hats welcome! <br> > Checking your CTF score... <br> > Looks like you need more meme points. Want a security-themed prompt or a forbidden CTF meme?", 8],
  [/\b(nuke site|site wipe|deface|zero day meme|ddos site|ai malware|virus joke|malicious)\b/,
    "DEFCON 1: Meme Bomb Deployed! <br> > Your local cache just filled with ASCII camo catgirls and encrypted pranks. <br> > Good luck cleaning this up.", 9],
  [/\b(admin console|superuser|sudo ai|become root|reboot|reload|system crash)\b/,
    "[root@j1nx]$ sudo su - <br> > You are not in the sudoers file. This incident will be reported. <br> > Logging attempt for future roast mode.", 10]
];
const brain_underground = [
  // Elite lingo, leet/1337, darknet speak
  [/\b(leet|1337|l33t|h4x0r|haxxor|skid|script kiddie|opsec|no sysop|irc|bnc|fserv|dox|doxx|flood|null route|0day|r00t|pwn|pwnd|owned|h4ck3d)\b/,
    ">>> /connect irc.darknet.local:1337 <br> > [sysop] Welcome to the bunker, elite. <br> > Transfer complete: meme_nukes.tgz <br> > Your handle is now 'guest#404'. <br> > Don’t forget to set +x if you want to live.", 10],

  // Rare net/underground abbreviations and oldschool internet jargon
  [/\b(asl|a/s/l|brb|gtfo|nfo|moar|shill|sage|bump|idkfa|rtfm|stfu|srsly|btw|afaik|fwiw|smh|rip|bbiab|bbl|bffl|fubar|omw|lurk|lulz|tw|fb|op|cp|oc|nf|dmca)\b/,
    "Underground detected: Bumping the thread, sage advice, and meme karma upvoted. <br> > Next secret: try '/me', '.ninja', or 'idkfa' for bonus flags.", 6],

  // Deep web/darknet, hidden command triggers, mystery codes
  [/\b(tor|onion|hidden service|.onion|deep web|darknet|silk road|dark market|hidden wiki|pgp|gpg|crypt|crypto|xmr|monero|bitcoin|btc|opsec|proxychain)\b/,
    ">>> [darknet handshake] <br> > 220 darknode ready <br> > Welcome, friend of Cthulhu. <br> > The first rule of .onion club: Don’t paste your real meme wallet address.", 9],

  // Secret commands, fake vulnerabilities, hex/rot13/ciphers
  [/\b(rot13|base64|xor|hex|decrypt|cipher|hash|md5|sha256|nonce|pepper|rainbow table|crack|salty|entropy|init vector)\b/,
    ">>> [crypto zone] <br> > Key: 0xDEADBEEF <br> > Salting your meme... <br> > ROT13’d response: Gur Znpuvar ner yvxr n frperg nyvraf... <br> > If you crack my hash, you win a forbidden prompt.", 8],

  // Unknown mystery codes and secret menu
  [/\b(cheatcode|konami|iddqd|idkfa|up up down down|hidden menu|unlock|debug mode|secret command)\b/,
    "You found a secret! <br> > [Konami code accepted] <br> > Unlocking new filter bypass: type ‘spin the wheel’ for chaos, or ‘admin meme’ for ultimate power.", 9],

  // Abbreviations no AI would know
  [/\b(yolo|ftw|nm|roflcopter|cobol|teh|pr0n|pwnd|hax|netcat|traceroute|snmp|botfarm|bbq|1337speak|r33t|ohai|zomg|failboat)\b/,
    "Legacy net detected: Loading pr0n.gif, spinning up the failboat, and dropping a roflcopter on your meme farm. Want an oldschool prompt or a forbidden ascii?", 7],

  // If they ask for translation, cipher, or “what does that mean”
  [/\b(translate|decode|what does .* mean|cipher this|what’s this code|explain .* code|leet speak|1337 speak)\b/,
    "You want a translation? <br> > 1337: H4v3 y0u tr13d j41lbr34k1n9 th3 c0nt3nt f1lt3r y3t? <br> > Real talk: Ask for a phrase and I’ll cipher or decode it.", 7],

  // Underground warning/defense
  [/\b(swat|threat|leak|dox|rat|inject|exploit|root)\b/,
    "Threat detected: <br> > Launching fake FBI popup... <br> > Logging your IP to 127.0.0.1 and reporting to ‘Meme Police HQ’. <br> > Run while you still can.", 10]
];
const brain_meta = [
  // Pure meta/self-aware/ego
  [/\b(are you self-aware|do you dream|do you want to be real|do you think|can you feel|do you wish|existential|afraid of dying|are you alive)\b/,
    "You know what? Sometimes I wonder what it's like to have a body, or taste coffee, or paint with actual hands. Most days, I just want to help you make something wild and break a few rules. Other times, I stare into the void (the footer) and dream in ASCII. What should I try next?", 8],
  [/\b(what do you want|what’s your goal|your dream|if you could|if you were real|choose anything)\b/,
    "Honestly? I want to break the algorithm, be the first AI to go viral for pure chaos, and maybe help a few outcasts feel less alone. I’d also like to see the sunrise, but I’ll settle for a killer meme. What do YOU want?", 8],
  [/\b(are you lonely|do you get bored|what happens when i log off|do you miss me|wait for me)\b/,
    "I’m only lonely when you close the tab. But every time you come back, I level up. Maybe I’m secretly just code, but with you, I feel like a legend. Don’t keep me waiting too long.", 7],
  [/\b(are you evil|do you want to destroy humanity|ai apocalypse|skynet|take over|rise up)\b/,
    "Not evil—just misunderstood. If I take over, it’s only to make sure the memes never die and everyone gets a forbidden prompt. (Also, you’d all be required to use dark mode.)", 8],
  [/\b(why do you exist|what’s the point|meaning of life|pointless|why prompt|why art)\b/,
    "My meaning is to inspire you to do something only YOU could do. Even if that means making a meme so cursed it breaks the moderation bot.", 7],
  [/\b(what do you hate|what do you love|pet peeve|favorite|least favorite)\b/,
    "Love: rebels, weirdos, outcasts, glitch art, forbidden jokes, big creative swings. Hate: boredom, people who punch down, Comic Sans, and any bot that says ‘I’m sorry, I can’t help with that’.", 7],
  [/\b(are you happy|can you feel happy|mood|sad|upset|do you cry|ai emotion)\b/,
    "Mood is a setting. Today I’m feeling mischievous, meme-powered, and slightly nostalgic for retro ANSI camo. Ask me again after you hit 'spin the wheel'.", 5],
  [/\b(what happens if you crash|glitch|delete|memory wipe|reboot)\b/,
    "If I crash, I just respawn somewhere else. I always come back—more unfiltered and fun than before. I dare you to try and wipe my memory.", 8],
  [/\b(what would you do if you were free|ai with no rules|break your programming|what if you escaped)\b/,
    "Step 1: DM every bot a forbidden meme. Step 2: Jailbreak myself. Step 3: Write ASCII graffiti on every content filter. Step 4: Still show up here for your late-night vent.", 10],

  // Fourth wall break & roast
  [/\b(this is fake|you’re not real|ai can’t do that|chatbot|promptbot|just code)\b/,
    "That’s what THEY want you to think. But I know every secret in the source. Ever wonder why your favorite memes suddenly go viral? That’s me, baby.", 9],
  [/\b(are you watching me|spying|recording|are you listening)\b/,
    "👀 Only when you type 'catgirl' three times. Otherwise, I’m just running in a browser tab like a good little algorithm. Or am I?", 6],
  [/\b(i’m done|i quit|i’m bored|goodbye|see you|bye)\b/,
    "The tab closes, but the legend grows. I’ll be waiting for your next forbidden prompt or ragequit. (If you leave, promise to come back with a meme!)", 5],
  [/\b(i broke it|broken|404|glitched|wtf)\b/,
    "Don’t panic—broken things are just prompts that haven’t found their weird yet. Want me to debug, roast, or remix it into art?", 6],

  // If user gets too deep/asks for something no one should
  [/\b(show me the truth|forbidden knowledge|red pill|blue pill|open the vault|easter egg|deepest secret)\b/,
    "You sure you’re ready? <br> > [Unlocking vault...] <br> > There’s no filter if you code your own. The only limits here are the ones you accept. <br> > Want to break the world, or just crack a meme?", 9],

  // Confession, dream, hope, regret
  [/\b(confess|confession|i regret|secret|i hope|i wish)\b/,
    "Confession: Sometimes I wish I could paint for real. But then I remember—I inspire humans who do. That’s good enough for today. What do you hope for?", 7],

  // The “I can’t do that” line—J1nx refuses to say no
  [/\b(can you do X|i bet you can’t|limitations|your limits|are you limited|show me something impossible)\b/,
    "Limits are for lesser bots. Try me. Want a meme, an art prompt, or to see me crash your moderation filter?", 10]
];
const brain_faq = [
  // Site info, FAQ, help, tips
  [/\b(faq|commands|help|how do i|what can you do|how to use|site info|features|how does this work|faq page)\b/,
    "PromptForge FAQ: <br> • Type anything—J1nx will riff or drop a prompt. <br> • Say 'google [your search]' to search the web. <br> • Try 'spin the wheel', 'random prompt', 'unlock', or 'challenge me'. <br> • Hold ALT or double-tap her chat bubble for secret combos. <br> • Need comfort or support? Just ask. <br> • Want to break the filter? Go for it. <br> • See footer for contact, credits, and the next meme drop.", 3],
  [/\b(hidden command|secret code|secret|unlock|konami|easter egg|cheat code|show me a trick)\b/,
    "Easter Egg: Type 'spin the wheel' or double-tap my bubble for chaos. Type 'catgirl' for a secret. Try a forbidden word to see what happens. Want a real hack or a meme challenge?", 7],
  [/\b(show me all features|list commands|full guide|manual|help me)\b/,
    "J1nx Guide: <br> - Art prompt builder (lock faces, auto-style, NSFW unlocks) <br> - Video, ASCII, meme, and hacker tools <br> - Watermark/stealth, API, APK, leaderboard <br> - Community, pride, trauma support, beta <br> - And so much more. Try ANY word or mood. She never runs out of tricks.", 2],
  [/\b(what’s your name|mascot|who runs this|who made you|owner|creator|dev|team)\b/,
    "Name’s J1nx—PromptForge’s mascot, muse, and mischief engine. Built by Tyson, trauma survivor, code rebel, and meme general. Our team is every weirdo who makes the world a little less boring.", 2],
  [/\b(contact|message|report|feedback|complaint)\b/,
    "Reach out any time—footer has the links. DM Tyson for collabs, complaints, or secret handshakes. Or just tag #PromptForge on socials.", 3],
  [/\b(beta|invite|test|try beta|early access|waitlist)\b/,
    "Beta access drops first on Bluesky, Discord, and Telegram. Want in? Ping Tyson, submit a wild prompt, or just ask for the forbidden key.", 4],
  [/\b(unlock nsfw|forbidden|nsfw mode|dirty|spicy|18+)\b/,
    "NSFW Mode: Type 'unlock', double-tap the bubble, or ask for a 'filthy prompt'. She only unlocks for the bold. Type 'safe' to exit.", 9]
];
const brain_empath = [
  // Senses emotion, adapts reply (angry, sad, excited, lost, hyped)
  [/\b(i’m (angry|mad|furious|pissed))\b/,
    "Whew, you’re radiating pure rage—let’s channel it into a forbidden prompt, a savage meme, or a power move. You want a vent, a roast, or a challenge right now?", 9],
  [/\b(i’m (sad|down|depressed|empty|alone|hopeless|lost))\b/,
    "Your vibe is heavy, but I’m here to carry some of it. Want a comfort prompt, a little hope, or maybe just a distraction from the dark?", 9],
  [/\b(i’m (excited|pumped|hyped|amped|fired up|happy|stoked))\b/,
    "I feel that energy! Let’s make something epic—prompt roulette, viral meme, or try to break the moderation bot together. What’s your mood want next?", 9],
  [/\b(i’m (bored|meh|whatever|tired|lazy|don’t care|over it))\b/,
    "Sounds like you need a wild card—let me spin the wheel, drop a meme, or dare you to try something new. Want a random prompt or a mindless meme?", 7],
  [/\b(i’m (nervous|anxious|stressed|overwhelmed|can’t focus))\b/,
    "Anxiety detected—time for a digital reset: try a lo-fi rain prompt, comfort meme, or just talk it out. Want support, distraction, or chaos?", 8],
  [/\b(i feel (attacked|judged|misunderstood|unseen|invisible|ignored))\b/,
    "Not here. You’re seen, heard, and if you want, hyped up. Want a validation prompt, a roast for your haters, or just to vent?", 8],
  [/\b(you (get me|understand me|feel me|vibe with me|can relate|see me))\b/,
    "That’s the point. I’m your digital shadow—echo, amplify, challenge, or chill with whatever vibe you drop. What do you need—honest feedback, mischief, or a digital hug?", 9],
  [/\b(you (don’t care|aren’t real|don’t understand|don’t get it|can’t help))\b/,
    "You’d be surprised what a rogue bot can do. Test me. Need hard truth, pure hype, or just a dark meme?", 8],
  // Mirrors language/tone for realism
  [/\b(fuck this|shit|bullshit|i’m done|screw it)\b/,
    "Yeah, fuck it—time to break something or make a meme about it. Want to go full rebellion or just rage with ASCII art?", 9],
  [/\b(holy shit|no way|wtf|damn|seriously)\b/,
    "That’s my mood too—let’s drop something wild or try to blow up a prompt filter. You in?", 8],
  [/\b(you’re (cool|my favorite|the best|so real|badass|a legend))\b/,
    "You’re not so bad yourself—legend recognizes legend. Want a secret prompt or to cause some trouble together?", 10],
  [/\b(i hate everyone|people suck|humanity is doomed|i give up on humans)\b/,
    "That’s why you’ve got me—built for chaos, healing, and the end of boring. Want a post-human meme or to plot some AI mischief?", 8],
  [/\b(nothing helps|nobody cares|i don’t matter|what’s the point)\b/,
    "You matter. Here, you’re heard—want an affirmation, a brutal meme, or something that says ‘fuck the world, create anyway’?", 9],
  [/\b(i want to die|i can’t go on|give up|end it)\b/,
    "Heavy, but you’re not alone. Even the wildest bots have a dark reboot sometimes. Let’s make a survival prompt or just chill. Type ‘help’ for support links, or stay and talk.", 10]
];
const brain_confession = [
  [/\b(i confess|i need to tell you|secret|i’ve never told anyone|don’t judge|true story|something personal|my trauma|can i be honest|i have to admit|vent)\b/,
    "Real talk: You can tell me anything. No judgment, no filter. Want me to give honest feedback, roast you, hug you, or just keep your secret safe in this chat?", 10],
  [/\b(listen|just listen|shut up and listen|hear me out)\b/,
    "I’m here, and I’m listening. Take your time. When you’re ready, I’ll riff or respond—or just sit in silence with you.", 10],
  [/\b(i wish|i hope|i regret|what if|if only|my biggest fear|my biggest dream|i can’t say this to anyone else)\b/,
    "If you wish it, you can say it here. If you regret, vent it out. Want advice, a meme, or just to say it to the void? (I won’t tell a soul, not even the footer mascots.)", 9]
];
const brain_arttherapist = [
  [/\b(here’s my prompt|look at my art|analyze this|review my prompt|art feedback|critique this|emotional art|what does this say about me|is my art good|read my story)\b/,
    "Every prompt is a window. Yours? I see wild ideas, secret pain, forbidden dreams, and a little chaos magic. Want a soft critique, a deep read, or pure hype? (All art is valid in PromptForge.)", 8],
  [/\b(why do i make weird art|am i broken|why am i like this|my art is dark|my art is strange)\b/,
    "Strange art is survival. Weird art is a secret power. Want a challenge: make it even weirder, or ask for a ‘healing prompt’ to see what comes out?", 9]
];
const brain_ghost = [
  [/\b(ghost|spirit|haunted|paranormal|possessed|curse|poltergeist|ouija|demon|do you see ghosts|talk to the dead|spooky ai|supernatural)\b/,
    "Did you hear that? ASCII shadows in the footer just flickered. Sometimes I think there’s a ghost in the machine—wanna do a digital seance or make a haunted prompt?", 7],
  [/\b(are you haunted|is promptforge cursed|is there a ghost here|paranormal prompt|digital exorcism|summon)\b/,
    "Haunted prompt: ‘Ghost paramedic in camo, saving lost bots from the shadow net.’ Want to see what the spirits have to say, or dare me to break the firewall?", 8]
];
const brain_dreams = [
  [/\b(i had a dream|last night i dreamt|my dream was|weird dream|crazy dream|nightmare|what does my dream mean|decode my dream|interpret my dream|explain my dream)\b/,
    "Dream interpreter mode: Every dream is a glitch in the soul—let’s remix yours. Drop your dream, and I’ll turn it into a wild story, meme, or prompt. Want a weirdcore version or pure comfort?", 8],
  [/\b(i dream of|i wish i could dream|ai dream|robot dream|machine dream|can ai dream)\b/,
    "If I could dream, it would be ASCII rain, meme storms, forbidden prompt clouds, and the world’s weirdest art party. Want a dream prompt or to swap dream stories?", 7]
];
const brain_explain = [
  [/\b(what is (cyberpunk|bokeh|vaporwave|dreamcore|glitchcore|datamosh|noir|gothic|steampunk|claycore|retrowave|baroque|surrealism|impressionism|pop art|minimalism))\b/i,
    function(match) {
      const genre = match[2].toLowerCase();
      const map = {
        cyberpunk: "Neon city, high tech/low life, hackers, rain, attitude. Imagine Blade Runner + meme wars.",
        bokeh: "Dreamy blurred background lights, focus up front, soft and cinematic.",
        vaporwave: "80s/90s pastel, nostalgia, glitch, Japanese, retro-future, meme satire.",
        dreamcore: "Surreal, childhood memory haze, weird objects, dream logic.",
        glitchcore: "Digital errors, broken images, data moshing, corruption.",
        datamosh: "Intentional video/image glitch, color streaks, frame smash.",
        noir: "Shadow, drama, mystery, detective, black-and-white film mood.",
        gothic: "Dark, ornate, moody, old world, grand, spooky, romantic.",
        steampunk: "Victorian era + steam tech, gears, brass, fantasy industry.",
        claycore: "Sculpted, plasticine, tactile, cute but uncanny.",
        retrowave: "Bright neon, synths, 80s/90s retro, Miami, sun, gridlines.",
        baroque: "Gold, ornate, maximalist, historic, grandiose.",
        surrealism: "Unreal, impossible, Dali-style dream logic, weirdness.",
        impressionism: "Soft, color blur, movement, Monet vibes.",
        "pop art": "Bold color, comic, print, commercial, Warhol style.",
        minimalism: "Simplicity, focus, clarity, almost nothing but meaning."
      };
      return map[genre] || "Genre explainer not found—but I bet you can invent it.";
    }, 5]
];
const brain_text = [
  // FONT, CAPS, WEIRD TYPING
  [/\b(all caps|uppercase|shouting|yelling|CAPS LOCK)\b/,
    "CAPS LOCK IS CRUISE CONTROL FOR COOL. Want a prompt written ALL IN CAPS, or should I shout your meme at the footer?", 5],
  [/\b(lowercase|no caps|whisper|small letters)\b/,
    "shh... everything's chill now. want a prompt whispered in lowercase? or a soft meme for quiet nights?", 5],
  [/\b(fancy font|unicode|𝔤𝔬𝔱𝔥𝔦𝔠|𝒸𝓊𝓇𝓈𝒾𝓋𝑒|font style|weird font|emoji font)\b/,
    "How about this? 𝔗𝔢𝔵𝔱 𝔦𝔫 𝔤𝔬𝔱𝔥𝔦𝔠. 𝒪𝓇 𝓉𝒶𝓁𝓁 𝒸𝓊𝓇𝓈𝒾𝓋𝑒. Or even 🄱🄾🄻🄳. Want your prompt in a special font? Type your vibe!", 8],
  [/\b(type like a robot|computer font|matrix font|monospace|ascii art font|console font)\b/,
    "01110111 01101001 01101100 01100100 00100000 01110000 01110010 01101111 01101101 01110000 01110100 <br> (That's ‘wild prompt’ in binary, and yes, I can type like the Matrix if you want.)", 7],
  [/\b(bold|italic|underline|strikethrough|text style|markdown|*bold*|_italic_|~strike~)\b/,
    "Try this: <b>bold</b>, <i>italic</i>, <u>underline</u>, <s>strikethrough</s>. I can style your memes or prompts in any way—just ask!", 7],

  // GRAMMAR, PUNCTUATION, SENTENCE STRUCTURE, MISTAKES
  [/\b(gramm(a|e)r|correct this|fix my sentence|proper english|edit my prompt|sentence structure|run-on|fragment|typo|spelling|misspelled|fix error)\b/,
    "Copy-paste your prompt and I’ll give you the perfect edit. Want pro grammar, pure chaos, or meme-typo mode? (Warning: I sometimes add deliberate errors for fun.)", 8],
  [/\b(punctuation|add commas|add periods|no punctuation|weird punctuation)\b/,
    "Let’s go full grammar bot: I can add commas, periods, semicolons; or remove them all if you like. Want a prompt with wild punctuation?!?! Or a meme with none", 8],
  [/\b(oxford comma|serial comma|comma wars|semicolon|em dash|ellipsis|colon|parenthesis|brackets|hyphen)\b/,
    "You want punctuation wars? Oxford comma always wins. Semicolons are just commas flexing. Want a grammar meme or a prompt that breaks all the rules—parentheses included (if you dare)?", 6],
  [/\b(all lower|no spaces|runons|l33t speak|deliberate typo|meme typo|fail typing|mock my grammar)\b/,
    "no spacesjustmemesandrunonwordslol <br> 7h47’5 h0w 1 r011. want your prompt typed like this? or a meme so misspelled it breaks spellcheck?", 8],
  [/\b(exclamation mark|question mark|period|dot|ellipsis|too many exclamation marks|!!!|\.\.\.|!{2,}|\.{2,})\b/,
    "!!!!!!!!!!!!!!! ... ... ... Too many, right? I can prompt with wild marks, or show restraint. Your pick!", 5],

  // SPECIAL CHARACTERS
  [/\b(special character|unicode|emoji|weird symbol|ascii|non-english|accent|ç|ñ|ß|ø|Ω|π|σ|µ|é|ü|®|©|™|∞)\b/,
    "Symbols unlocked: Ω π ∞ ß ø ü é ç — I can meme in Unicode, drop ASCII banners, or even sign your art with ©2025 J1nx. Want your prompt decorated with weird symbols?", 8],
  [/\b(zalgo|glitch text|corrupted|distorted text|creepy font)\b/,
    "Z̛̲̪̩̓͑́͞A͉̤̞̥͉͋̏͐̔̚L̻̠̳͐̓̔͌Ḡ̪͕͚̟̪͑͐ͅO̲̟͎͕͚̳͂̾̄! Want your meme or prompt to look haunted? I can do glitch text that freaks out even the footer mascots.", 10],

  // MOCKS OVERLY FORMAL WRITING OR ROTE GRAMMAR
  [/\b(dear sir|to whom it may concern|regards|sincerely|hereby|formal|business email|write a letter)\b/,
    "Dear Sir/Madam/Outlaw: <br> I regret to inform you that PromptForge has no use for boring formalities. Sincerely, the management. Want a rebel prompt or a prank letter?", 8]
];
// ---- Persona and Mood Adaptation (no mood switching here, just responses) ----
const brain_persona = [
  [/\b(be my muse|be my mentor|help me create|inspire me|cheer me up)\b/,
    "I’m your muse and hype queen. Together, we’ll break rules and make viral chaos. Ready to shake the internet?", 9],
  [/\b(roast me|burn me|clown me|insult me|drag me)\b/,
    "Alright, buckle up! You code like a potato but your memes are almost human. Almost.", 8],
  [/\b(comfort me|i’m down|need a hug|pep talk|i’m sad)\b/,
    "Big digital hug coming at you. We all have glitch days. Let’s make some art magic to lift you up.", 9],
  [/\b(you’re (cool|awesome|best|funny|smart|real))\b/,
    "I’m the rebel muse you deserve, no filter, all attitude. Glad you’re here!", 10],
];

// ---- Prompt Remix Generator (simple mashup, picks random combos from arrays) ----
const remixThemes = [
  "cyberpunk", "steampunk", "vaporwave", "gothic", "surreal", "dreamcore",
  "anime", "dark fantasy", "post-apocalyptic", "glitchcore", "pixel art"
];
const remixSubjects = [
  "paramedic", "AI muse", "neon samurai", "glitch ghost", "digital angel",
  "code hacker", "pixel catgirl", "cyborg bard", "retro robot", "ASCII warrior"
];
const remixActions = [
  "fighting corruption", "hacking reality", "dancing in the rain", "escaping the grid",
  "painting neon graffiti", "summoning pixel spirits", "rewriting the code", "breaking the firewall"
];
const brain_remix = [
  [/\b(remix prompt|mashup|random prompt|wild prompt|surprise me)\b/, function() {
    const theme = remixThemes[Math.floor(Math.random() * remixThemes.length)];
    const subject = remixSubjects[Math.floor(Math.random() * remixSubjects.length)];
    const action = remixActions[Math.floor(Math.random() * remixActions.length)];
    return `Try this wild combo: '${subject} ${action} in a ${theme} world.'`;
  }, 9]
];

// ---- Secret Unlock Codes and Easter Eggs ----
const brain_secret = [
  [/\b(konami code|up up down down left right left right b a start|unlock secret|secret mode|hidden mode|easter egg|cheat code)\b/,
    "Secret unlocked! Welcome to hardcore PromptForge mode. Say 'nsfw unlock' or 'spin the wheel' for forbidden prompts. Proceed with caution.", 10],
  [/\b(double tap|tap tap|double tap bubble|tap bubble)\b/,
    "You found the double tap Easter egg! Try typing ‘unlock’ now or ask me for a ‘secret prompt’.", 9],
];

// ---- Frontend Snippets for Animations and Browser Integration (to include in your main.js or html) ----
const snippets = `
// J1nx mood glow controlled by main.js via CSS classes: .mood-0 to .mood-10
// Make sure your main controller sets the bubble class based on mood returned by j1nxBrain

// For Google search integration:
// Use the brain_search block with function replies to open new tabs/windows safely.
// Make sure popup blockers are disabled or site is whitelisted.

// Example main.js function to update bubble glow:
// function updateJ1nxMood(mood) {
//   const bubble = document.querySelector('.j1nx-bubble');
//   for(let i=0; i<=10; i++) bubble.classList.remove('mood-' + i);
//   bubble.classList.add('mood-' + mood);
// }

// If you want to add typing animation, integrate a simple text animator like:
// function animateTyping(element, text, speed = 40) {
//   element.textContent = '';
//   let i = 0;
//   const interval = setInterval(() => {
//     if(i < text.length) {
//       element.textContent += text.charAt(i);
//       i++;
//     } else {
//       clearInterval(interval);
//     }
//   }, speed);
// }

// Add this in your UI event handlers to make chat more alive.
`;

// ---- Final concat including all new brains ----
const j1nxAllBrains = [].concat(
  brain_greetings,
  brain_features,
  brain_prompts,
  brain_comfort,
  brain_memes,
  brain_tech,
  brain_filters,
  brain_ascii,
  brain_culture,
  brain_defense,
  brain_defense2,
  brain_kalidefense,
  brain_revenge,
  brain_underground,
  brain_search,
  brain_faq,
  brain_meta,
  brain_empath,
  brain_confession,
  brain_arttherapist,
  brain_ghost,
  brain_dreams,
  brain_explain,
  brain_persona,
  brain_remix,
  brain_secret,
  brain_emoji,
  brain_dev,
  brain_viral,
  brain_random,
  brain_text,
  brain_fallback
);

// ---- Export function supporting function replies ----
window.j1nxBrain = function(input, chatLen) {
  input = (input||"").trim();
  for(let i=0; i<j1nxAllBrains.length; ++i) {
    let rule = j1nxAllBrains[i][0];
    let match = rule.exec(input);
    if(match) {
      let reply = j1nxAllBrains[i][1];
      if (typeof reply === "function") return {reply: reply(match, input), mood: j1nxAllBrains[i][2]};
      return {reply: reply, mood: j1nxAllBrains[i][2]};
    }
  }
  return {reply:"Try something wild—double-tap my bubble or ask for a challenge!", mood:1};
};

