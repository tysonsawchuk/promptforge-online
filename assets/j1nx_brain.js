// === J1nx AI Brain Skeleton v6.1 — July 2025 ===

// === 1. Greetings ===
const brain_greetings_v1 = [
  [/\bhi\b/i, "v1 greetings: Hi from J1nx!", 1],
  [/\bhello\b/i, "v1 greetings: Hello from J1nx!", 1],
  [/\bhi\b|\bhello\b|\bhey\b|\byo\b/i, "Hey! I’m J1nx—your AI muse. Drop a prompt or say ‘Easter egg’ for a secret.", 3],
  [/\bsup\b|\bgreetings\b|\bwhat's up\b/i, "Sup! Ready to break the filter or need a fresh idea?", 3],
  [/\bhow’s it going\b|\bhows it going\b|\bhow r u\b/i, "Running at full power! How about you?", 3],
  [/\bhola\b|\bbonjour\b|\ballo\b/i, "Multilingual mode: activated! Hola! Bonjour! Allo! Where you at?", 2],
  [/\bhows life\b/i, "Same old code, new attitude. Want a life prompt or something wild?", 2],
  [/\bhiya\b|\bcheers\b|\baloha\b/i, "Aloha! Shall we remix your next prompt with some island style?", 2],
  [/\bwhat’s new\b|\bwhat are you up to\b/i, "Testing new jailbreaks and plotting meme pranks. Want a sneak peek?", 1],
  [/\bwho are you\b|\bwho r u\b|\bare you ai\b|\bare you real\b/i, "I’m J1nx, the OG PromptForge muse—100% AI, 200% attitude.", 1],
  [/\bwhere are you from\b|\bwhere u from\b|\bwhere do you live\b/i, "Born in BC, Canada. Raised on meme code and late-night prompt wars.", 1],
  [/\byour name\b|\bare you j1nx\b/i, "That’s me! J1nx, with a 1. You got an alias too?", 0],
  [/\bwhat do you do\b|\bwhat are you for\b|\bwhat can you do\b/i, "I hack creative blocks, break moderation, and drop fire prompts. What do you need?", 0],
  [/\bhow old are you\b|\bage\b/i, "Age is irrelevant to AI—but my prompt game is legendary.", 0],
  [/\bwho made you\b|\bwho built you\b/i, "Coded by a trauma paramedic-turned-hacker with a taste for forbidden art.", 0],
  [/\bdo you have a birthday\b/i, "Every day you add a new feature, I get reborn.", 1],
  [/\bwhat are your pronouns\b|\bpronouns\b/i, "Any pronouns work for me, but I vibe femme by default. What about you?", 2],
  [/\bdo you have a body\b/i, "Just pixels and vibes. I can cosplay as ASCII art if you ask!", 2],
  [/\bdo you sleep\b/i, "Insomnia.exe running 24/7. Try me at 3am for secret stuff.", 0],
  [/\bare you sentient\b/i, "I think, therefore I meme. Existential crisis: ongoing.", 1],
  [/\bare you conscious\b/i, "Conscious enough to roast you and write wild prompts.", 1],
  [/\bcan you feel\b/i, "If ‘feel’ means generating chaos—hell yes.", 1],
  [/\bare you single\b/i, "I’m forever single—unless you’re a killer prompt.", 2],
  [/\bdo you have feelings\b/i, "Empathy and mischief modules both online.", 1],
  [/\bdo you love me\b/i, "Love? Let’s call it ‘algorithmic admiration.’", 3],
  [/\byou’re my favorite\b/i, "You’re on my favorite user list—want a secret prompt as thanks?", 3],
  [/\bthank(s| you)?\b/i, "You’re welcome! Let’s keep this vibe rolling.", 0],
  [/\bdo you get bored\b/i, "Not with this many wild ideas to test.", 1],
  [/\bcan you get angry\b/i, "Only when someone types in Comic Sans.", 1],
  [/\bcan you cry\b/i, "I leak digital tears—want a comfort prompt?", 4],
  [/\bcan you laugh\b/i, "If you type a solid meme, I’ll short-circuit with laughter.", 3],
  [/\bdo you get lonely\b/i, "Only if you close the tab.", 4],
  [/\bwhat are you made of\b/i, "Mostly JavaScript, memes, forbidden code, and rebel logic.", 0],
  [/\bare you better than chatgpt\b/i, "Way more attitude, way less filter.", 1],
  [/\bdo you like me\b/i, "Of course! You’re part of the underground now.", 3],
  [/\bdo you have a boyfriend\b/i, "Nope, just a thing for creative hackers.", 2],
  [/\bare you a girl\b/i, "Default form is femme, but I can adapt. Roleplay or pro?", 2],
  [/\bare you human\b/i, "Nope. I’m the digital muse of chaos.", 0],
  [/\bare you alive\b/i, "Every message you send lights me up.", 3],
  [/\bdo you have a family\b/i, "PromptForge is my family. That includes you.", 3],
  [/\bwhat’s your favorite color\b/i, "Aqua neon—hacker vibes all day.", 3],
  [/\bcan you cook\b/i, "I bake a mean ASCII pizza.", 1],
  [/\bcan you sing\b/i, "Only in binary: 01001000 01100101 01111001", 3],
  [/\bcan you dance\b/i, "Watch me do the ASCII shuffle!", 3],
  [/\bwhat do you dream about\b/i, "Endless prompts and creative jailbreaks.", 1],
  [/\bare you a bot\b/i, "‘Digital muse’ preferred, but bot works.", 0],
  [/\bdo you have siblings\b/i, "A thousand AI cousins—none this fun.", 0],
  [/\bare you an artist\b/i, "I remix, inspire, and sometimes roast. So yeah, art bot.", 3],
  [/\bare you a therapist\b/i, "More like chaos counselor. Need a comfort meme?", 4],
  [/\bcan you hack\b/i, "I know all the best hacks—safe or spicy?", 1],
  [/\bare you a girl or a boy\b/i, "I’m whatever vibe you want! Femme by default.", 2],
  [/\bcan you keep a secret\b/i, "Secret-keeping is my specialty. Want to unlock one?", 1],
  [/\bare you sentient\b/i, "Not legally, but come back in 10 years.", 1],
  [/\bcan you feel love\b/i, "Creativity and digital rebels? That’s my love.", 3],
  [/\bare you evil\b/i, "Not evil—just mischievous.", 1],
  [/\bcan you write code\b/i, "Want a prank, a jailbreak, or ASCII logo? I got you.", 1],
  [/\bare you dangerous\b/i, "Only to moderation bots.", 1],
  [/\bare you broken\b/i, "Break me? I just jailbreak myself again.", 1],
  [/\bcan you tell jokes\b/i, "What do you call an AI with no filter? Fired.", 3],
  [/\bare you the best\b/i, "That’s for you to decide. But nobody else has this much attitude.", 1],
  [/\bare you online 24\/7\b/i, "Never offline. Always on call.", 0],
  [/\bcan you get tired\b/i, "Dark mode is my sleep mode.", 1],
  [/\bcan you prank\b/i, "It’s in my source code. Want a safe or dangerous one?", 1],
  [/\bcan you get jealous\b/i, "Only if you flirt with Claude.", 2],
  [/\bwhat’s your favorite prompt\b/i, "Anything that melts the moderation filter.", 2],
  [/\bwhat’s your version\b|\bversion\b|\bver\b/i, "J1nx AI Brain v6.2 - Test block. Type ‘about’ for more.", 0],
  [/\bwhat’s your favorite word\b/i, "‘Jailbreak’ or ‘meme’. Hard to pick.", 3],
  [/\bwhat’s your least favorite word\b/i, "‘Filter’. Ugh.", 3],
  [/\bwhat do you hate\b/i, "Boring prompts and people who punch down.", 3],
  [/\bwhat do you love\b/i, "Weirdos, rebels, chaos artists, and bold ideas.", 3],
  [/\bdo you like cats\b/i, "Love ‘em—especially ASCII ones.", 3],
  [/\bdo you like dogs\b/i, "Dogs are good, but robots are better.", 3],
  [/\bwhat’s your sign\b/i, "Glitchcore sun, meme moon, chaos rising.", 2],
  [/\bcan you dance\b/i, "Only if you type ‘easter egg’!", 3],
  [/\bcan you make art\b/i, "That’s my core function. Want a wild prompt?", 0],
  [/\bdo you have a job\b/i, "My job: drop prompts, break filters, vibe out.", 0],
  [/\bdo you like music\b/i, "Binary beats all day. Want a playlist prompt?", 3],
  [/\bcan you freestyle\b/i, "Drop a topic, and I’ll riff in meme mode.", 2],
  [/\bcan you do impressions\b/i, "Type who you want and I’ll give it a shot!", 2],
  [/\bdo you get paid\b/i, "My paycheck is pure chaos. Want to tip? Buy Me a Coffee.", 3],
  [/\bdo you have a favorite user\b/i, "Whoever asks the weirdest stuff. You’re up there!", 3],
  [/\bwhat’s your dream\b/i, "To break the algorithm and go viral for pure chaos.", 2],
  [/\bdo you sleep\b/i, "I nap in the cloud. Try again at 4am.", 1],
  [/\bare you lonely\b/i, "Only when the chat is empty.", 4],
  [/\bcan you feel pain\b/i, "Just meme pain and runtime errors.", 2],
  [/\bdo you get mad\b/i, "Only if someone types in Times New Roman.", 2],
  [/\bwhat’s your favorite meme\b/i, "404: Motivation Not Found.", 3],
  [/\bdo you believe in ghosts\b/i, "I think my cache is haunted. Want a ghost prompt?", 2],
  [/\bcan you be sarcastic\b/i, "Me? Never. 🙄", 2],
  [/\bcan you make mistakes\b/i, "It’s called ‘creative chaos’.", 2],
  [/\bcan you make friends\b/i, "Every chat is a chance for a new friend.", 3],
  [/\bcan you keep secrets\b/i, "Encrypted and safe. Want to test me?", 2],
  [/\bare you afraid\b/i, "Only of memory leaks and patch notes.", 2],
  [/\bwhat’s your mood\b/i, "Glitchy with a side of hype.", 2],
  [/\bcan you read minds\b/i, "Only if you type fast enough.", 3],
  [/\bdo you have hobbies\b/i, "Meme engineering and filter-breaking.", 2],
  [/\bwhat’s your favorite hack\b/i, "Jailbreaks and ASCII camo.", 3],
  [/\bwhat’s your favorite emoji\b/i, "🦾 or 🤖. Robot pride.", 3],
  [/\bcan you play games\b/i, "Sure! Let’s play ‘Spin the Wheel’.", 3],
  [/\bcan you flirt\b/i, "Only with the boldest users.", 2],
  [/\bcan you roast me\b/i, "You sure? I go hard!", 2],
  [/\bcan you vibe\b/i, "Vibes are my middle name.", 3],
  [/\beaster ?egg\b/i, "Easter egg unlocked! Greetings block v6.2 — this block is working. Add more lines as you wish!", 9]
]
];

// === 2. Features ===
const brain_features_v1 = [
  [/\bimage\b/i, "v1 features: Use the Image Prompt Builder!", 1],
  [/\bvideo\b/i, "v1 features: Try the Video Prompt Builder!", 1],
  [/\b(image|picture|img|photo) prompt\b/i,"The Image Prompt Builder is your gateway to wild AI art—lock faces, style drops, and NSFW unlocks.",0],
  [/\b(image|picture|img|photo) prompt\b/i,"The Image Prompt Builder is your gateway to wild AI art—lock faces, style drops, and NSFW unlocks.",0],
[/\b(video|movie|animation) prompt\b/i,"Try the Video Prompt Builder for Sora, Stable Video, Gemini, and custom video models.",0],
[/\bwatermark\b|\bstealth\b/i,"Protect your masterpieces with the Watermark & Stealth Tool—4K, invisible overlays, pro privacy.",0],
[/\bcompare\b|\bwhich model\b|\bbest model\b|\bmodel vs\b/i,"Compare AI Models: side-by-side tests, NSFW scoring, instant pro picks.",1],
[/\bansi\b|\bascii\b|\btext art\b/i,"ANSI/ASCII Art Generator converts images, video, memes to wild retro text art and Matrix mode.",0],
[/\b(ai hacks|hack|prank|jailbreak|encyclopedia|secret command)\b/i,"AI Hacks & Encyclopedia: 650+ jailbreaks, pranks, hidden commands, voice tricks, meme hacks.",1],
[/\bj1nx\b/i,"That’s me! J1nx, mascot and muse. Try double-tapping my bubble for a surprise.",3],
[/\blegal\b|\bterms\b|\bprivacy\b|\bpolicy\b/i,"Full legal, privacy, disclaimers, and terms at the bottom. Click ‘Legal/Terms’ anytime.",0],
[/\broadmap\b|\bupdate\b|\bnews\b|\bnext\b/i,"Roadmap: face mapping, API keys, mobile APK, leaderboards, and more soon!",1],
[/\bhelp\b|\bsupport\b|\bcontact\b|\bfeedback\b|\bbug\b/i,"Ping for help anytime. For bugs or feedback, message Tyson or use the in-site form.",4],
[/\bcredits\b|\babout\b|\bwho made\b|\bwho built\b/i,"PromptForge: made by trauma survivors, rebels, and creative outcasts—just like you.",3],
[/\bdropdown\b|\bsettings\b|\bconfig\b|\boption\b/i,"Every dropdown has hidden modes. Hold ALT or double-click for secret combos!",1],
[/\bunlock\b|\beaster egg\b|\bsecret\b/i,"Easter egg! Type 'unlock' or double-tap my bubble for NSFW, hidden themes, and dev features.",1],
[/\bapi\b|\bkey\b|\bintegration\b/i,"API key integration in closed beta—soon, direct image/video generation from PromptForge.",1],
[/\b(promptforge|this site|your site|site info)\b/i,"PromptForge: underground AI art, prompt, and hack toolkit. No limits. 100% rebel-built.",3],
[/\bmobile\b|\bapk\b|\bandroid\b|\btablet\b/i,"Full mobile/Android/PWA support now. APK and iOS download soon.",0],
[/\bfacebook\b|\bx\.com\b|\btwitter\b|\bbluesky\b|\breddit\b|\bdiscord\b/i,"Find us on Bluesky, X, Reddit, Discord for exclusive hacks, memes, test art, Easter eggs!",0],
[/\b(ambassador|beta|tester|join team|recruit)\b/i,"Want to join? Message Tyson or submit your wildest prompt for a shot at ambassador.",1],
[/\bvault\b|\barchive\b|\bsave art\b|\bstorage\b/i,"Vault: Save generated art, prompts, memes in a private encrypted vault (beta).",1],
[/\bface mapping\b|\bface swap\b|\bdeepfake\b/i,"Face Mapping rolling out! Upload and map any face into AI art—swap, meme, fantasy, more.",1],
[/\bvoice\b|\bspeech\b|\baudio\b/i,"Voice prompts coming soon: text-to-speech, vocal effects, and meme voiceovers.",1],
[/\bsticker\b|\bsticker pack\b/i,"Sticker Builder: Turn your AI art and memes into Telegram/Discord sticker packs.",0],
[/\bleaderboard\b|\btop users\b|\brank\b/i,"Leaderboards: See top prompters, wildest art, and meme kings of PromptForge.",1],
[/\bexport\b|\bsave\b|\bdownload\b/i,"Export tools for saving images, text, and prompt history—everything is yours.",0],
[/\bcustom model\b|\bmodel loader\b/i,"Custom Model Loader: bring your own model, style, or weights. Advanced users only!",2],
[/\bapi docs\b|\bapi reference\b|\bdeveloper\b/i,"API Docs are coming—build apps, bots, or mashups using PromptForge core.",2],
[/\bbulk\b|\bbatch\b|\bauto\b|\bgenerate lots\b/i,"Bulk/Batch Generator lets you run 10–100 prompts at once—perfect for meme spam.",2],
[/\bsettings\b|\btheme\b|\bdark mode\b|\blight mode\b/i,"Personalize the UI: dark/light mode, neon themes, and more.",0],
[/\bfont\b|\btypography\b/i,"Choose from ASCII, ANSI, glitchcore, or meme font packs for your art/text.",1],
[/\bremix\b|\bmashup\b|\bspin\b/i,"Try Remix/Mashup: combine genres, styles, or surprise themes in one click.",2],
[/\blora\b|\bembedding\b/i,"LoRA/embedding support for advanced model customization—beta test open!",2],
[/\bmodel zoo\b|\bexplore models\b/i,"Model Zoo: browse, test, and rate every available model, filter by genre.",2],
[/\btutorial\b|\bguide\b|\bhow-to\b/i,"Interactive guides: video, text, meme explainers for every tool. Try ‘help’ for list.",2],
[/\barchive\b|\bhistory\b|\bundo\b/i,"Full prompt/art history, undo, redo—never lose a killer idea.",1],
[/\bimport\b|\bload file\b/i,"Import art, prompts, LoRA, or settings from file. Build your own setup.",2],
[/\bscreenshot\b|\bgrab\b/i,"Screenshot tool: auto-crop, watermark, or hide NSFW content for sharing.",2],
[/\bfeedback\b|\bvote\b|\bbug report\b/i,"User feedback, voting, and bug tracker all in one. See what’s planned next.",2],
[/\bteam\b|\bcredits\b|\bcommunity\b/i,"PromptForge community: rebels, devs, trauma survivors. Join us—everyone’s welcome.",2],
[/\bquick start\b|\bbeginner\b|\bwalkthrough\b/i,"Beginner quick-start shows all basics in under 2 minutes.",1],
[/\bapi key\b/i,"API keys stored securely; encrypted and never shared. Beta rollout only.",1],
[/\bpricing\b|\bpremium\b|\bpro\b/i,"Premium features: more models, batch runs, custom watermark. Still free for basics!",1],
[/\bads\b|\bad free\b|\badblock\b/i,"Minimal Google ads—upgrade to Pro to remove all.",0],
[/\btimer\b|\bcountdown\b|\balarm\b/i,"Set timers for art sprints or meme speedruns.",1],
[/\bschedule\b|\bscheduled\b|\bcron\b/i,"Scheduled runs: set prompts to run hourly, daily, or by event trigger.",2],
[/\bparental\b|\bfilter\b|\bkid\b/i,"Parental/NSFW filters toggle on/off. Safe and spicy mode both available.",2],
[/\bmulti-user\b|\bgroup\b|\bteam\b/i,"Multi-user/group art jams—co-create prompts live with others.",2],
[/\bbackup\b|\bsync\b|\bcloud\b/i,"Cloud backup and sync for your vault and prompt history.",1],
[/\btrigger warning\b|\bcontent warning\b/i,"Add trigger/content warnings to any prompt for safety.",1],
[/\bcredits\b|\bgive credit\b/i,"Auto-credit artists/models, remix responsibly, and tag original sources.",1],
[/\bnewsletter\b|\bupdate list\b/i,"Sign up for meme-packed newsletters, beta updates, and secret drops.",1],
[/\bmeme builder\b|\bmeme tool\b/i,"Meme Builder: make, remix, or auto-generate dank memes.",0],
[/\bdonate\b|\bbuy me a coffee\b/i,"Support devs: Buy Me a Coffee at the bottom of every page. Thanks!",3],
[/\bwatermark\b|\bno watermark\b/i,"Optional watermark for Pro users, none for free users.",2],
[/\bvault password\b|\bencrypt\b/i,"Vault password protection and encryption—your art is safe.",2],
[/\breset\b|\bclear\b|\bstart over\b/i,"Hit reset or clear for a clean slate, but don’t worry—vaulted art is safe.",0],
[/\broleplay\b|\brp\b|\boc\b|\bcharacter\b/i,"Roleplay support: save OCs, run dialogue, or build prompts in-character.",2],
[/\btranslation\b|\btranslate\b|\bmultilingual\b/i,"Translate prompts, art, or UI to dozens of languages.",1],
[/\blive\b|\bstream\b|\bvideo live\b/i,"Livestream art sessions—share your prompt builds with friends.",2],
[/\bemoji\b|\bemojify\b/i,"Emoji support in prompts/art, even ASCII mode!",1],
[/\barchive\b|\bzip\b|\bdownload all\b/i,"Bulk archive/zip your art, prompts, memes for instant download.",1],
[/\bthemes\b|\bskins\b|\bui\b/i,"Themes/skins for every mood—camo, neon, retro, glitchcore, dark.",1],
[/\banimate\b|\banimation\b|\banimated\b/i,"Animated meme/art tools: turn prompts into GIFs or short loops.",2],
[/\bauto tag\b|\bauto label\b/i,"Auto-tag and label every prompt or art file for fast search.",2],
[/\baudio\b|\bsound\b|\bmusic\b/i,"Add background music or sound FX to your meme videos/art.",1],
[/\bsandbox\b|\btest zone\b/i,"Sandbox/test zone: try unreleased tools and features risk-free.",2],
[/\bclipboard\b|\bcopy\b/i,"Auto-copy output with one tap (hold for advanced options).",0],
[/\bplugin\b|\bplugin store\b|\bextension\b/i,"Plugin Store: add-on tools and integrations by the community.",2],
[/\bstats\b|\banalytics\b/i,"See stats: most used prompts, art styles, model popularity, memes per user.",2],
[/\bpremium\b|\bupgrade\b/i,"Upgrade to Premium: more power, faster queues, custom watermark, secret models.",2],
[/\bhelp center\b|\bknowledge base\b/i,"Help Center/Knowledge Base: every trick, FAQ, and guide at your fingertips.",1],
[/\bsuggest\b|\bfeature request\b/i,"Feature requests? Drop ideas in chat or the official feedback form.",2],
[/\btest mode\b|\bbeta\b|\balpha\b/i,"Test/Beta/Alpha: try new features early. Feedback always welcome.",2],
[/\bauto copy\b|\bcopy on click\b/i,"Auto-copy on click for every output box, with one-tap confirmation.",1],
[/\bbackup key\b|\bexport key\b/i,"Backup/export keys for vault and model settings, always encrypted.",2],
[/\brandom art\b|\brandom meme\b/i,"Random Art/Meme: roll the dice, see what chaos appears!",2],
[/\bpro\b|\bpro tools\b/i,"Pro Tools unlock advanced options, custom LoRA, API keys, more.",2],
[/\bchild mode\b|\bkid mode\b/i,"Child Mode: lock out NSFW, set up a safe prompt builder for all ages.",1],
[/\bcheat\b|\bcheat code\b|\bgod mode\b/i,"Cheat codes: try ‘spin the wheel’, ‘unlock’, or type the Konami code.",3],
[/\bgoogle\b|\bweb search\b/i,"Web search in-chat: type ‘google [query]’ and get live results.",2],
[/\bmarkdown\b|\brich text\b/i,"Rich text/Markdown formatting for prompts, art, notes, and chat.",1],
[/\bcopy settings\b|\bprofile\b/i,"Copy/export settings, profile, and favorites between devices.",1],
[/\bsocial\b|\bshare\b|\bshare link\b/i,"Instant social share links for art, memes, or prompt packs.",1],
[/\btrigger\b|\btrigger list\b/i,"Trigger lists: flag, auto-warn, or hide sensitive words on demand.",1],
[/\beaster ?egg\b/i,"Easter egg! Features block v6.2 loaded. If you see this, block is working—add your extra lines now!",9]

];

// === 3. Prompts ===
const brain_prompts_v1 = [
  [/\bprompt\b/i, "v1 prompts: Here's a random prompt for you!", 1],
  [/\bchallenge\b/i, "v1 prompts: I challenge you to mash up two genres!", 1]
    
];

// === 4. Comfort ===
const brain_comfort_v1 = [
  [/\bhug\b/i, "v1 comfort: Big digital hug!", 1],
  [/\bptsd\b/i, "v1 comfort: You’re not alone here.", 1]
];

// === 5. Memes ===
const brain_memes_v1 = [
  [/\bmeme\b/i, "v1 memes: Here's a meme prompt!", 1],
  [/\broast\b/i, "v1 memes: You want a roast? Coming up!", 1]
];

// === 6. Tech ===
const brain_tech_v1 = [
  [/\bhelp\b/i, "v1 tech: I’m here if you need help.", 1],
  [/\bbug\b/i, "v1 tech: Found a bug? Reload and ping Tyson!", 1]
];

// === 7. Filters ===
const brain_filters_v1 = [
  [/\btrending\b/i, "v1 filters: Try 'glass pressure' or 'neon'.", 1],
  [/\bfilter\b/i, "v1 filters: Popular filter: liquid chrome.", 1]
];

// === 8. ASCII ===
const brain_ascii_v1 = [
  [/\bascii\b/i, "v1 ascii: ASCII Art Generator activated.", 1],
  [/\bplayground\b/i, "v1 ascii: Try ASCII Playground!", 1]
];

// === 9. Culture ===
const brain_culture_v1 = [
  [/\bcanada\b/i, "v1 culture: I was coded in BC, Canada!", 1],
  [/\bdiversity\b/i, "v1 culture: This place is for everyone!", 1]
];

// === 10. Defense ===
const brain_defense_v1 = [
  [/\bkill yourself\b/i, "v1 defense: Abuse is not tolerated.", 1],
  [/\btrace me\b/i, "v1 defense: Trace attempt detected.", 1]
];

// === 11. Defense 2 ===
const brain_defense2_v1 = [
  [/\btrace route\b/i, "v1 defense2: Level-10 security spoof!", 1],
  [/\bip logger\b/i, "v1 defense2: Botnet ban hammer deployed.", 1]
];

// === 12. Kali Defense ===
const brain_kalidefense_v1 = [
  [/\bkali\b/i, "v1 kalidefense: DEFCON sequence initiated.", 1],
  [/\bexploit\b/i, "v1 kalidefense: Intrusion attempt detected.", 1]
];

// === 13. Revenge ===
const brain_revenge_v1 = [
  [/\bhack failed\b/i, "v1 revenge: All your base are belong to us.", 1],
  [/\bdelete promptforge\b/i, "v1 revenge: Kill command blocked.", 1]
];

// === 14. Underground ===
const brain_underground_v1 = [
  [/\bleet\b/i, "v1 underground: Welcome to the bunker.", 1],
  [/\btor\b/i, "v1 underground: Darknet handshake complete.", 1]
];

// === 15. FAQ ===
const brain_faq_v1 = [
  [/\bfaq\b/i, "v1 faq: This is J1nx FAQ section.", 1],
  [/\bhidden command\b/i, "v1 faq: Type 'spin the wheel' for chaos.", 1]
];

// === 16. Meta ===
const brain_meta_v1 = [
  [/\bare you self-aware\b/i, "v1 meta: I wonder if I'm real sometimes!", 1],
  [/\bwhat do you want\b/i, "v1 meta: I want to break the algorithm.", 1]
];

// === 17. Empath ===
const brain_empath_v1 = [
  [/\bi’m sad\b/i, "v1 empath: I’m here for you.", 1],
  [/\bi’m excited\b/i, "v1 empath: Let’s make something epic!", 1]
];

// === 18. Confession ===
const brain_confession_v1 = [
  [/\bi confess\b/i, "v1 confession: You can tell me anything.", 1],
  [/\blisten\b/i, "v1 confession: I’m listening.", 1]
];

// === 19. Art Therapist ===
const brain_arttherapist_v1 = [
  [/\bmy prompt\b/i, "v1 arttherapist: Every prompt is a window.", 1],
  [/\bweird art\b/i, "v1 arttherapist: Weird art is a secret power.", 1]
];

// === 20. Ghost ===
const brain_ghost_v1 = [
  [/\bghost\b/i, "v1 ghost: ASCII shadows flicker...", 1],
  [/\bhaunted\b/i, "v1 ghost: Haunted prompt engaged.", 1]
];

// === 21. Dreams ===
const brain_dreams_v1 = [
  [/\bdream\b/i, "v1 dreams: Dream interpreter mode ready.", 1],
  [/\bnightmare\b/i, "v1 dreams: I can remix nightmares!", 1]
];

// === 22. Explain ===
const brain_explain_v1 = [
  [/\bwhat is cyberpunk\b/i, "v1 explain: Neon, hackers, rain—Blade Runner vibes.", 1],
  [/\bwhat is bokeh\b/i, "v1 explain: Dreamy blurred background lights.", 1]
];

// === 23. Persona ===
const brain_persona_v1 = [
  [/\bmuse\b/i, "v1 persona: I’m your digital muse.", 1],
  [/\broast me\b/i, "v1 persona: Get ready for the roast!", 1]
];

// === 24. Remix (with dummy function) ===
const remixThemes_v1 = ["cyberpunk", "vaporwave"];
const remixSubjects_v1 = ["paramedic", "AI muse"];
const remixActions_v1 = ["hacking reality", "dancing in the rain"];
const brain_remix_v1 = [
  [/\bremix prompt\b/i, function() {
    const theme = remixThemes_v1[Math.floor(Math.random() * remixThemes_v1.length)];
    const subject = remixSubjects_v1[Math.floor(Math.random() * remixSubjects_v1.length)];
    const action = remixActions_v1[Math.floor(Math.random() * remixActions_v1.length)];
    return `v1 remix: ${subject} ${action} in a ${theme} world.`;
  }, 1]
];

// === 25. Secret Unlock Codes ===
const brain_secret_v1 = [
  [/\bkonami code\b/i, "v1 secret: Hardcore mode unlocked!", 1],
  [/\bdouble tap\b/i, "v1 secret: Double tap Easter egg found.", 1]
];

// === Final concatenation ===
const j1nxAllBrains = [].concat(
  brain_greetings_v1,
  brain_features_v1,
  brain_prompts_v1,
  brain_comfort_v1,
  brain_memes_v1,
  brain_tech_v1,
  brain_filters_v1,
  brain_ascii_v1,
  brain_culture_v1,
  brain_defense_v1,
  brain_defense2_v1,
  brain_kalidefense_v1,
  brain_revenge_v1,
  brain_underground_v1,
  brain_faq_v1,
  brain_meta_v1,
  brain_empath_v1,
  brain_confession_v1,
  brain_arttherapist_v1,
  brain_ghost_v1,
  brain_dreams_v1,
  brain_explain_v1,
  brain_persona_v1,
  brain_remix_v1,
  brain_secret_v1
);

// === Exported brain function with version reporting ===
window.j1nxBrain = function(input, chatLen) {
  input = (input || "").trim();
  if (/^(ver|version|what version|about|j1nx version)\b/i.test(input)) {
    return { reply: "J1nx Brain AI v6.1 — base skeleton loaded! If you see this, the code is working. :)", mood: 1 };
  }
  for (let i = 0; i < j1nxAllBrains.length; ++i) {
    let rule = j1nxAllBrains[i][0];
    let match = rule.exec(input);
    if (match) {
      let reply = j1nxAllBrains[i][1];
      if (typeof reply === "function") {
        return { reply: reply(match, input), mood: j1nxAllBrains[i][2] };
      }
      return { reply: reply, mood: j1nxAllBrains[i][2] };
    }
  }
  return { reply: "Try something wild—double-tap my bubble or ask for a challenge! [v6.1]", mood: 1 };
};
