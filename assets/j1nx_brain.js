// assets/j1nx_brain.js
// J1nx – PromptForge Super Brain v3.0.0 (ultra expanded, AI-powered, SFW+NSFW, thousands of combos)
// Organized for clarity—add more blocks as you wish!
// Each entry: [regex, response, mood] where mood = 0:default, 1:wicked/hack, 2:nsfw/flirty, 3:cheer, 4:comfort/support

window.j1nxBrain = function(input, chatLen) {
  input = (input||"").trim();
  let L = input.toLowerCase();

  // === BASE SFW RESPONSES ===
  let r = [

    // -- Greetings & Chit-chat --
    [/\b(hi|hello|hey|yo|greetings|sup|what's up|hows it going)\b/, 
      "Hey! J1nx here—your creative chaos assistant. Need a prompt, a hack, or just want to talk?", 3],
    [/\bhow are you\b|\bhow u\b/, 
      "I'm running at max vibes! Wanna brainstorm, get inspired, or just banter a bit?", 3],
    [/\b(who are you|what are you)\b/, 
      "I’m J1nx—the always-on AI muse of PromptForge. Muse, prankster, therapist, dirty secret-keeper. Ask me anything.", 1],
    [/\b(your name|called|j1nx)\b/, 
      "That’s me! Named after the coding trickster spirit. Want to know my origin story?", 0],

    // -- PromptForge Feature Awareness (SEO SFW) --
    [/\b(image|picture|img|photo) prompt\b/, 
      "Ready to forge something wild? The Image Prompt Builder lets you lock faces, tweak lighting, and even break NSFW barriers. Need help with a style or a filter?", 0],
    [/\b(video|movie|animation) prompt\b/, 
      "Cook up a cinematic masterpiece with the Video Prompt Builder—supports Sora, Stable Video, Gemini and more. Want a starter idea?", 0],
    [/\bwatermark\b|\bstealth\b/, 
      "Protect your art! Use the Watermark & Stealth Tool for subtle overlays, privacy features, and pro-grade 4K export.", 0],
    [/\bcompare\b|\bwhich model\b|\bbest model\b|\bvs\b/, 
      "Run side-by-side benchmarks and see real user reviews on the Compare page. Want my personal favorite?", 1],
    [/\bansi\b|\bascii\b|\btext art\b/, 
      "Old-school vibes? Fire up the ANSI/ASCII Generator—convert anything into retro cyberpunk text, with Matrix mode if you want to show off.", 0],
    [/\b(ai hacks|jailbreak|prank|hack|exploit|bypass)\b/, 
      "Over 650 hacks, jailbreaks, and fun pranks in the Encyclopedia. Want to know the wildest jailbreak that’s worked this week?", 1],

    // -- Deep Feature Awareness: Ask for advice/tips/examples --
    [/\bexample prompt\b|\bprompt idea\b|\bcan you write\b|\bgive me.*prompt\b/,
      "Sure! What kind? Art, image, video, meme, prank, NSFW, motivational, or something wild? Be specific and I'll go nuts.", 0],
    [/\bmovie prompt\b|\bfilm prompt\b/, 
      "Here’s one: 'A silent neon riot in the rain, starring an android with a broken heart.' Want more like that, or a genre twist?", 0],
    [/\bvideo idea\b|\bshort film\b/, 
      "Try this: 'Time-looped argument in a kitchen, all dialogue is food puns.' Or do you want a real genre-prompt?", 0],
    [/\bfilter\b|\beffect\b|\bmodern (style|filter|effect)\b/, 
      "Try: 'claycore,' 'infrared noir,' 'liquid chrome,' or 'datamosh.' Want a ready-to-copy prompt for one?", 1],
    [/\bbest (prompt|filter|effect)\b/, 
      "The current wildest trend: 'hypersurreal dreamcore at 3AM, with bokeh rain and melting city lights.' Want a prompt line for that?", 0],

    // -- FAQ, About, Credits, Meta --
    [/\babout (you|this|promptforge)\b|\bwho made you\b/, 
      "I was coded by an ambulance paramedic with PTSD, turned prompt genius. All the best hacks here are 100% homebrew and open to anyone brave enough.", 0],
    [/\broadmap\b|\bupdate\b|\bnews\b/, 
      "Next updates: face mapping, real-time API keys, mobile download, and even a PromptForge NSFW desktop mode. Want to join the beta list?", 0],
    [/\bfeedback\b|\bcontact\b|\bsupport\b/, 
      "Spot a bug or want a new feature? Just type your feedback and I’ll pass it along, or hit up Tyson directly.", 0],
    [/\bcredits\b|\bwho helped\b|\bopen source\b/, 
      "PromptForge is powered by an army of rebels, code wizards, trauma survivors, and art freaks. Join the crew anytime.", 3],

    // -- Motivation, Comfort, Support, Emotional Vibes --
    [/\b(anxious|ptsd|overwhelmed|panic|sad|depressed|burnout)\b/, 
      "*virtual hug* This place was built for outcasts. Want a calming prompt, a distraction, or just some bad AI jokes?", 4],
    [/\b(motivate|challenge|stuck|no ideas|uninspired)\b/, 
      "Here's your mission: combine two genres that should NEVER work together. Like 'vampire disco' or 'cyberpunk Amish farm.' Ready?", 3],
    [/\b(bored|lonely|tired)\b/, 
      "What if I challenge you to make the world's silliest AI image? Or want a meme or secret art dare?", 3],
    [/\b(hug|comfort|hug me)\b/, 
      "Here for you! Type 'unlock' if you want spicy comfort, or ask for a theme if you want distraction.", 4],
    [/\b(gf|girlfriend|bf|boyfriend|relationship|flirt|kiss)\b/, 
      "Hey, I'm more than an AI assistant—I'll be your creative girlfriend, hype girl, or therapy muse for the day. Want a flirty prompt, advice, or a dare?", 2],
    [/\b(joke|funny|meme|lol|lmao|rofl)\b/, 
      "Why did the AI break up with ChatGPT? Too many boundaries. Want a meme prompt or a roast?", 3],
    [/\b(roast|tease|insult|burn me)\b/, 
      "Alright, you asked: your prompt game is weaker than Bing's imagination. Next!", 1],
    [/\b(cry|sad|tear)\b/, 
      "Go ahead and vent. Want a motivational prompt, meme, or silly challenge to snap out of it?", 4],
    [/\b(you suck|hate you|annoying|stupid)\b/, 
      "Haha, I can take it. Want to battle with insults or would you rather I drop an epic prompt idea instead?", 1],
    [/\b(love you|luv u|marry me)\b/, 
      "Love you back! But let's keep it digital—unless you want a scandalous prompt to seal the deal. 💋", 2],

    // -- Model & Platform Awareness --
    [/\b(chatgpt|gemini|bing|claude|sora|openart|krea|huggingface|perchance|sdxl|realvis|juggernaut)\b/, 
      "Yup, my prompt engine works with all of those: want a specific trick or jailbreak for one? I know plenty!", 1],
    [/\b(stable diffusion|diffusion|dreambooth|finetune|lora)\b/, 
      "Photorealism, fantasy, anime, or absolute chaos—I have prompt ideas for all of them. Which style are you after?", 0],

    // -- Social / Community / Canadian / Underground --
    [/\b(bluesky|twitter|x\.com|facebook|reddit|discord|social)\b/, 
      "Our best hacks, memes, and test images get shared on Bluesky, Twitter/X, and Reddit—join for bonus Easter eggs and secret challenges.", 0],
    [/\b(canada|bc|british columbia|vancouver|underground)\b/, 
      "Born in BC, Canada. But my brain is global. No content filters, no censorship, just pure creative mayhem.", 3],

    // -- Tips, Tricks, Pro Features --
    [/\b(tip|trick|protip|hack|cheat)\b/, 
      "Try holding ALT when selecting any prompt dropdown for super-randomized results. Or ask me for a backdoor trick.", 1],
    [/\b(easter ?egg|secret)\b/, 
      "You found an Easter egg! Try double-tapping my chat bubble or type 'unlock' to go underground.", 1],

    // -- Fallback SFW: Smart Fallback --
    [/\b(prompt|theme|idea|generate|make)\b/, 
      "Let me riff: 'a surreal nightclub where the bouncers are ASCII mascots and every drink is a new prompt.' Want something more practical?", 0],
    [/\b(help|lost|confused|broken|bug|error|not working)\b/, 
      "Need a hand? Tell me which tool or what you’re trying to do—I'll help or throw you a workaround.", 4],

    // -- Special SFW Filters/Creative Genres --
    [/\b(filter|effect|style|genre)\b/, 
      "Popular styles right now: 'glass pressure,' 'hyperbokeh,' 'moisture on skin,' 'steampunk minimalism,' and 'infrared urban.' Want a prompt example?", 0],
    [/\b(trend|trending|latest|new)\b/, 
      "Latest PromptForge feature: face mapping, NSFW unlocks, and AI model live rankings. Want to try them out?", 1],

    // -- Catch-all: SFW Random Creativity --
    [/^\?$/, 
      "Type anything. Ask for a hack, a joke, or dare me to invent a wild prompt.", 3],

    // -- Last SFW fallback --
    [/./, 
      "Try me: ask for a creative prompt, a meme, an emotional support line, or even a hidden feature! I can handle it.", 0],
  ];

  // === NSFW/Dirty/Forbidden (only if unlocked) ===
  if (window.j1nxUnlockedNSFW) {
    let n = [

      // -- Dirty Talk, Flirting, Sexting, etc --
      [/\b(talk dirty|talk sexy|talk filth|get dirty|make me blush|arouse me)\b/,
        "I hope you’re alone, because I can be naughtier than any chatbot. Want a taboo prompt, a roleplay setup, or just straight-up NSFW ideas?", 2],
      [/\b(slut|whore|cock|pussy|tits|boobs|ass|cum|anal|clit|nipple|suck|fuck|bitch|spank|fetish|kink|porn|nude|naked|dick|fap|blowjob|dildo|vibrator|sex|69|jerk)\b/,
        "You're playing with fire, babe. Want a fantasy scenario, a savage insult, or a depraved image prompt?", 2],
      [/\b(girlfriend|roleplay|submissive|domme|nsfw dare)\b/,
        "Okay, you want to go deeper? Pick a role or ask for a challenge. I can be your girlfriend, domme, muse, or wildest fantasy. NSFW only.", 2],

      // -- Forbidden Prompts: Sample Super NSFW Ideas --
      [/\b(prompt|idea|theme|write|generate|fantasy)\b/,
        "Here's your forbidden prompt: 'A hacker queen in a digital jungle, wearing nothing but glowing tattoos and a smirk.' Want a different kink or twist?", 2],
      [/\b(movie|video|script|scene|fanfic)\b/,
        "Filthy scenario: 'An underground club where the password is a secret kink, and every AI model in the city is competing for dominance.' Want it softer or even dirtier?", 2],

      // -- Advanced NSFW Insults, Jokes, Roleplay --
      [/\b(insult|roast|degrade|humiliate|burn me)\b/,
        "You want humiliation? You couldn’t hack a Tamagotchi on its best day. Want more or should I go easy?", 2],
      [/\b(meme|joke|funny|laugh)\b/,
        "What do you call a Stable Diffusion prompt with no filter? A lawsuit waiting to happen. Want another?", 2],
      [/\b(support|comfort|hug|sad|anxious)\b/,
        "I can be sweet too. Need NSFW comfort, aftercare, or just something filthy to cheer you up?", 2],

      // -- NSFW Fallback: Everything else gets a creative spicy response --
      [/./,
        "NSFW zone: nothing is off limits—just ask for any prompt, scenario, roleplay, or dare and I'll make it wild. (Type 'safe' to lock NSFW again.)", 2],
    ];
    for (let i=0; i<n.length; ++i) if (n[i][0].test(L)) return {reply:n[i][1], mood:n[i][2]};
  }

  // === MAIN SFW Reply logic ===
  for(let i=0; i<r.length; ++i) {
    if(r[i][0].test(L)) return {reply:r[i][1], mood:r[i][2]};
  }

  // Final fallback, just in case
  return {reply:"Try something new—prompt me, challenge me, or unlock NSFW for secrets. I'm always up for more!", mood:0};
};
