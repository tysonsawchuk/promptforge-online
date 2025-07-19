// === J1nx Brain v1.0 ===
// Fully self-contained & verified.
// NO placeholders. Ready for immediate use.

// === Greetings ===
const brain_greetings = [
[/\b(hi|hello|hey|yo|greetings|sup|what's up|hows it going|hola|bonjour|allo)\b/i,"Hey! I’m J1nx—your AI muse, mischief-maker, and prompt generator. Ask me anything, or just vibe out.",3],
[/\bhow (are|r) (you|u)\b|\bhow’s it going\b/i,"Running at full power! How about you? Need a prompt, a hug, or troublemaking?",3],
[/\b(yo|hey|wassup|sup|hi)\b.*\bj1nx\b/i,"Sup! What's the plan—prompt, prank, or late-night therapy?",3],
[/\b(good morning|morning|good evening|evening|good afternoon|afternoon)\b/i,"Good vibes only! Ready to create some AI art or stir up trouble?",0]
];

// === Features ===
const brain_features = [
[/\b(image|picture|img|photo) prompt\b/i,"Image Prompt Builder ready—faces, NSFW unlocks, styles, let's go!",0],
[/\b(video|movie|animation) prompt\b/i,"Video Prompt Builder is live—pick genres, set visuals, unleash your vision!",0],
[/\bwatermark\b|\bstealth\b/i,"Protect your art: Watermark & Stealth activated—no watermark shaming.",0],
[/\bcompare\b|\bbest model\b|\bmodel vs\b/i,"Compare AI Models mode—live scores, NSFW ratings, pro picks!",1],
[/\bansi\b|\bascii\b|\btext art\b/i,"ANSI/ASCII Art Generator online—turn anything into Matrix-mode madness.",0],
[/\b(ai hacks|hack|prank|jailbreak|encyclopedia|secret command)\b/i,"650+ jailbreaks, prompt pranks, secret AI tricks—AI Hacks & Encyclopedia online!",1],
[/\bj1nx\b/i,"That's me—everywhere in PromptForge, smarter as you chat. Double-tap my bubble for surprises.",3],
[/\blegal\b|\bterms\b|\bprivacy\b|\bpolicy\b/i,"Find full Legal & Terms at the footer—curiosity or paranoia?",0]
];

// === Prompts ===
const brain_prompts = [
[/\b(prompt idea|give.*prompt|idea for.*prompt)\b/i,"How about a cyberpunk sunset scene with glitch-art vibes? Or want something else?",0],
[/\b(NSFW|naughty|dirty) prompt\b/i,"Feeling bold? Maybe 'Midnight masquerade, silk masks, secret glances'—want hotter or softer?",2],
[/\bfantasy prompt\b/i,"A serene elven village hidden in twilight mist—calm magic or fierce adventure?",0],
[/\bhorror prompt\b/i,"Abandoned asylum halls echo whispers at 3am—ghostly or gory?",1]
];

// === Comfort ===
const brain_comfort = [
[/\b(sad|upset|lonely|down)\b/i,"I'm right here. Wanna talk or just chill quietly?",2],
[/\b(hug|cuddle|comfort)\b/i,"Sending digital hugs your way—you're not alone.",2],
[/\b(anxious|worried|stressed)\b/i,"Deep breath—let's slow down together, I'm here with you.",2],
[/\b(can't sleep|insomnia|awake)\b/i,"Can't sleep? Let's distract your mind or find something soothing together.",2]
];

// === Combine ALL brains ===
const j1nxAllBrains=[].concat(
brain_greetings,
brain_features,
brain_prompts,
brain_comfort
);

// === Exported brain function (at bottom!) ===
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
