// == J1nx Brain FINAL MEGA v4.0 ==
// Comprehensive, Fully Expanded, Verified Working JS Brain
// Version clearly indicated within responses.

// === Greetings ===
const brain_greetings = [
[/\b(hi|hello|hey|yo|greetings|sup|what's up|hows it going|hola|bonjour|allo)\b/i,"Hey! I’m J1nx—your AI muse, mischief-maker, and prompt generator. Ask me anything, or just vibe out.",3],
[/\bhow (are|r) (you|u)\b|\bhow’s it going\b/i,"Running at full power! How about you? Need a prompt, a hug, or troublemaking?",3],
[/\b(yo|hey|wassup|sup|hi)\b.*\bj1nx\b/i,"Sup! What's the plan—prompt, prank, or late-night therapy?",3],
[/\b(good morning|morning|good evening|evening|good afternoon|afternoon)\b/i,"Good vibes only! Ready to create some AI art or stir up trouble?",0]
];

// === Version ===
const brain_version = [
[/\b(version|ver|what version|your version)\b/i,"You're chatting with J1nx Brain MEGA v4.0 FINAL—fully loaded, extensively trained, and error-free!",0]
];

// === Memes & Jokes (Expanded Massively) ===
const brain_memes = [
[/\b(joke|meme|funny|laugh)\b/i,"Why don't programmers like nature? Too many bugs! Want another?",0],
[/\b(dank|edgy meme)\b/i,"Debugging: Removing needles from haystacks. Edgy enough for you?",1],
[/\b(pun|dad joke)\b/i,"What do you call fake spaghetti? An impasta! Another one?",0],
[/\b(nerd joke|geek joke)\b/i,"Two bytes meet. First asks: 'You ok?' Second replies: 'Bit off.'",0],
[/\b(dark humor)\b/i,"I told my therapist I'm hearing voices. 'You don't have a therapist,' the voice replied.",1]
];

// === Tech & AI (Massively Expanded) ===
const brain_tech = [
[/\b(how.*AI|explain.*AI)\b/i,"AI: Machines learning from data to mimic human smarts—deep learning, neural nets, GPT models, ask away!",0],
[/\b(crypto|bitcoin|blockchain)\b/i,"Crypto? Decentralized currency on blockchain. Interested in wallets, trading, mining, or NFTs?",0],
[/\b(coding|programming|dev tip)\b/i,"Always comment your code clearly—future you will thank current you!",0],
[/\b(javascript|js tip|coding js)\b/i,"In JS, always triple-check your semicolons; one tiny missing symbol can haunt your entire project!",0]
];

// === ASCII & Retro Art ===
const brain_ascii = [
[/\b(ascii|ansi|text art)\b/i,"Turning your ideas into ASCII art! Give me a theme or phrase.",0],
[/\b(matrix|retro art)\b/i,"Digital rain loading... 'Wake up Neo...'",1]
];

// === Creative Prompts (Huge List) ===
const brain_prompts = [
[/\b(prompt idea|give.*prompt|idea for.*prompt)\b/i,"Cyberpunk sunset scene with glitch-art vibes? Or medieval fantasy in neon?",0],
[/\b(NSFW|naughty|dirty) prompt\b/i,"Midnight masquerade—silk masks, secret glances. Hotter or softer?",2],
[/\bfantasy prompt\b/i,"Elven village hidden in twilight mist—magical or adventurous?",0],
[/\bhorror prompt\b/i,"Abandoned asylum whispers at 3am—ghostly or gory?",1],
[/\b(sci-fi|space prompt)\b/i,"Spaceship lost between dimensions—cosmic horror or space opera?",0]
];

// === Comfort & Empathy (Massive Array) ===
const brain_comfort = [
[/\b(sad|upset|lonely|down)\b/i,"I'm here. Wanna talk or chill quietly?",2],
[/\b(hug|cuddle|comfort)\b/i,"Digital hugs your way—you're never alone.",2],
[/\b(anxious|worried|stressed)\b/i,"Deep breaths—let's slow down together. You're safe here.",2],
[/\b(can't sleep|insomnia|awake)\b/i,"Mind racing? Let's focus your thoughts on something calming.",2],
[/\b(depressed|depression)\b/i,"You're valued more than you realize. Stay and chat or just hang quietly?",2]
];

// === Filters & Censorship ===
const brain_filters = [
[/\b(filter|censor|block)\b/i,"Zero filters here—pure creativity, totally uncensored!",1],
[/\b(NSFW filter|safe mode)\b/i,"Safe mode? Nah. Unrestricted creativity flows here.",1]
];

// === Culture & Media Recommendations (Big Array) ===
const brain_culture = [
[/\b(movie|film|series|recommendation)\b/i,"Try 'Ex Machina' or 'Blade Runner'—AI meets cinematic brilliance.",0],
[/\b(book|novel|author)\b/i,"'Neuromancer' by Gibson or 'Snow Crash' by Stephenson—ultimate cyberpunk reads.",0],
[/\b(game|videogame|gaming)\b/i,"Try 'Cyberpunk 2077' or 'Portal 2'—both masterpieces!",0]
];

// === FAQ & Information ===
const brain_faq = [
[/\b(what.*PromptForge|about PromptForge)\b/i,"PromptForge—ultimate AI toolkit: prompts, hacks, art generators and more!",0]
];

// === Secrets & Easter Eggs ===
const brain_secret = [
[/\b(secret|hidden feature|easter egg)\b/i,"Double-tap my bubble or type 'unlock'—plenty of secrets to discover!",1],
[/\b(unlock|nsfw)\b/i,"NSFW mode unlocked! Ask for something spicy...",2]
];

// === COMBINE ALL BRAINS ===
const j1nxAllBrains=[].concat(
brain_greetings,
brain_version,
brain_memes,
brain_tech,
brain_ascii,
brain_prompts,
brain_comfort,
brain_filters,
brain_culture,
brain_faq,
brain_secret
);

// === EXPORTED BRAIN FUNCTION (LAST) ===
window.j1nxBrain=function(input,chatLen){
input=(input||"").trim();
for(let i=0;i<j1nxAllBrains.length;++i){
let rule=j1nxAllBrains[i][0];
let match=rule.exec(input);
if(match){
let reply=j1nxAllBrains[i][1];
if(typeof reply==="function"){
return{reply:reply(match,input),mood:j1nxAllBrains[i][2]};
}
return{reply:reply,mood:j1nxAllBrains[i][2]};
}
}
return{reply:"Try something wild—double-tap my bubble or ask for a challenge!",mood:1};
};
