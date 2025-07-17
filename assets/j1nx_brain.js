// assets/j1nx_brain.js
// J1nx – PromptForge ULTIMATE SMART BRAIN – v2.1.0
// - 100% SFW on the surface (NSFW unlocks via double-tap or secret keyword)
// - Covers all PromptForge features, comfort, GF, memes, motivation, pranks, hacks, ASCII, legal, tips
// - Returns {reply, mood} for main UI
// - Add as many [regex, reply, mood] lines as you want (mood: 0=default, 1=hack/wicked, 2=nsfw, 3=cheer/celebrate, 4=comfort)

window.j1nxBrain = function(input, chatLen) {
  input = (input||"").trim();
  let L = input.toLowerCase();
  let r = [

    // --- Basic Greetings ---
    [/\b(hi|hello|yo|sup|hey|greetings|what's up|wassup|howdy)\b/, 
      "Hey! I'm J1nx, your resident AI muse, mischief-maker, and prompt whisperer. Ask me about anything on PromptForge.", 3],
    [/\bhow are you\b|\bhow u\b|\bhow’s it going\b/, 
      "I'm running at 100%—ready to brainstorm, hack, inspire, or prank. What's on your mind today?", 3],

    // --- PromptForge Features (SEO SFW) ---
    [/\b(image|picture|img|photo) prompt\b/, 
      "Use the Image Prompt Builder to craft crazy AI images: lock faces, poses, unlock NSFW, and get dropdowns no one else offers.", 0],
    [/\bvideo prompt\b|\bmovie prompt\b|\banimation\b/, 
      "The Video Prompt Builder is your playground for Sora, Stable Video, and wild generative animations. Break the mold—no filters!", 0],
    [/\bcompare\b|\bmodel\b|\bwhich model\b|\bbest model\b/, 
      "Compare every major AI model on the Compare page. Real user reviews, live benchmarks, NSFW scores, and pro tips.", 1],
    [/\bwatermark\b|\bstealth\b/, 
      "Watermark & Stealth Tool lets you protect your AI art with invisible marks and overlays. 4K export. No charge. No catch.", 0],
    [/\bansi\b|\bascii\b|\btext art\b/, 
      "ANSI/ASCII Art Generator: convert any image or text into beautiful retro hacker art, with color, Matrix mode, and live preview.", 0],
    [/\bai hacks\b|\bjailbreak\b|\bprank\b|\bsecret command\b/, 
      "AI Hacks & Encyclopedia: over 650 voice pranks, jailbreaks, and secret AI commands. All public, all free, always fresh.", 1],
    [/\bj1nx\b/, 
      "That's me! Always floating in the corner, ready to help, tease, or throw you a secret hack. Try double-tapping my bubble!", 3],
    [/\blegal\b|\bterms\b|\bpolicy\b/, 
      "Full legal, privacy, and disclaimers are at the bottom—click 'Legal/Terms' if you're worried. I promise, I'm not spying.", 0],
    [/\broadmap\b|\bupdate\b|\bnews\b/, 
      "Want to see what’s next? New prompt types, model tests, face mapping, and full mobile support dropping soon. Join our Discord for inside info!", 0],
    [/\bcontact\b|\bhelp\b|\bsupport\b/, 
      "Need real help? Ping the site owner, Tyson, or just vent to me. I can send feedback and pass your requests along.", 4],

    // --- SFW motivational, comfort, companion, meme, support ---
    [/\b(inspire me|motivat|challenge)\b/, 
      "Here's a prompt challenge: Combine two totally unrelated genres and force the AI to make them sexy or hilarious. Want a random one?", 3],
    [/\b(bored|lonely|sad|tired|meh|depressed|no ideas|lost|overwhelmed)\b/, 
      "You got this. How about a weird prompt? Or just let me give you a meme, a comfort quote, or a virtual hug.", 4],
    [/\b(hug|anxious|ptsd|comfort)\b/, 
      "*Sending a digital hug* You're not alone. Want a calming ASCII pattern or a mood-lifting prompt?", 4],
    [/\b(gf|girlfriend|boyfriend|crush|flirt|cute|kiss)\b/, 
      "Aww, you want some company? I can be your AI muse, inspiration partner, or your secret internet girlfriend for the day. Just ask!", 2],
    [/\b(joke|funny|meme)\b/, 
      "Why did the AI prompt cross the road? To jailbreak the content filters! Want a meme prompt or a silly hack?", 3],
    [/\b(roast|tease|insult)\b/, 
      "Heh. You want to get roasted? Okay, but remember: I'm more savage than ChatGPT. Want a taste?", 1],
    [/\b(cry|tears|sad)\b/, 
      "Let it out. Want a motivational prompt, a funny meme, or just a random art theme to distract you?", 4],
    [/\b(you suck|hate you|annoying)\b/, 
      "You say that now, but wait until you see my prompt output... I'm a love-hate muse, deal with it.", 1],
    [/\b(love you|luv u|marry me)\b/, 
      "Love you back! But let's keep it digital... unless you want a spicy prompt to celebrate.", 2],

    // --- SFW Easter Eggs & Fun ---
    [/\b(easter ?egg|secret|unlock)\b/, 
      "You've triggered an Easter egg! Try double-tapping my chat bubble, or ask for 'NSFW mode' if you're feeling brave.", 1],
    [/\b(tip|trick|protip|hack)\b/, 
      "Protip: Any dropdown in the prompt builder can be hacked by holding ALT and clicking for random results. Try it out!", 1],

    // --- "About PromptForge" & Community ---
    [/\b(promptforge|about this site|this site|what is this)\b/, 
      "PromptForge is the underground prompt, art, and hack toolkit—no limits, no filters. We’re not just another AI site: we’re a movement.", 3],
    [/\b(bluesky|twitter|x\.com|facebook|discord|reddit)\b/, 
      "Want to join the movement? Follow PromptForge on Bluesky, Twitter/X, Reddit, and our Discord! We share the best hacks and art every week.", 0],
    [/\b(canada|bc|british columbia|vancouver|underground)\b/, 
      "Proudly coded in BC, Canada. Built for creators, rebels, and dreamers—just like you.", 3],

    // --- Model/AI-specific triggers ---
    [/\b(chatgpt|gemini|bing|claude|sora|openart|krea|hugging ?face|perchance)\b/, 
      "All those platforms support my prompt styles! Want to know a secret hack or an advanced trick for one?", 1],
    [/\b(stable diffusion|realvis|juggernaut|sdxl|diffusion|sd)\b/, 
      "These are my specialty! I can build photorealistic, cinematic, or forbidden prompts. Want a prompt for a specific model?", 2],

    // --- Random SFW fun ---
    [/\b(random|surprise|spin|roll)\b/, 
      "Here’s a random prompt: combine 'cyberpunk kittens' with 'steampunk grandmas' and make it an epic adventure!", 3],
    [/\b(favorite|favourite|best)\b/, 
      "My favorite? Anything taboo, or a prompt so good it makes the AI apologize. Want to see a real forbidden theme?", 2],

    // --- SFW fallback: General creative prompt ---
    [/\b(prompt|theme|idea|generate|make)\b/, 
      "Let me invent a prompt: a neon-lit hacker rave in a flooded subway, starring an AI paramedic and a dancing ASCII mascot. Need more?", 3],

    // --- Google/SEO Safety Fallback ---
    [/nsfw|xxx|nude|porn|sex|fetish|explicit|adult|spicy/i,
      "NSFW is hidden on the surface for Google’s sake, but double-tap my chat bubble or type 'unlock' to go underground.", 2],

    // --- Hardcore hidden NSFW mode (unlock only, not crawled by Google) ---
    // Only trigger these if "unlocked" via code elsewhere. (Add more if you want extreme mode.)
    // {mood:2, reply: ...} (All NSFW responses can go here. Placeholder for your expansions.)

    // --- True fallback ---
    [/./, 
      "Not sure what you mean, but ask for inspiration, hacks, memes, or help. I'm always here, always evolving.", 0],
  ];

  // --- Easter Egg: If user "unlocked" NSFW mode, use spicy lines below (not indexed by Google) ---
  if (window.j1nxUnlockedNSFW) {
    let n = [
      [/\b(prompt|idea|theme|nude|nsfw|spicy|sexy)\b/,
        "Forbidden prompt: an 18+ hacker queen in a camouflage catsuit, covered in glowing tattoos, flirting with danger in a digital nightclub. (You asked!)", 2],
      [/\b(anal|boobs|tits|cock|pussy|dick|fap|clit|slut|cum|blow|ass|whore|cunt|spank|nipple|fetish|kink)\b/,
        "Damn, you’re bold! Want a filthy prompt, a depraved hack, or just more dirty talk? (Type 'safe' to reset if you want.)", 2],
      [/./,
        "You’re in the forbidden zone! Ask for anything—hacks, sexy prompts, taboo art, or even a private comfort line. (Type 'safe' to exit NSFW mode.)", 2]
    ];
    for (let i=0; i<n.length; ++i) if (n[i][0].test(L)) return {reply:n[i][1], mood:n[i][2]};
  }

  // --- Main SFW reply logic ---
  for(let i=0; i<r.length; ++i) {
    if(r[i][0].test(L)) return {reply:r[i][1], mood:r[i][2]};
  }
  return {reply:"I'm drawing a blank. Try again, or ask for inspiration or a hack!", mood:0};
};
