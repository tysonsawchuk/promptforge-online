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
  [/\bchallenge\b/i, "v1 prompts: I challenge you to mash up two genres!", 1],
  [/\binspire me\b|\bprompt idea\b|\bgive me (a )?prompt\b|\bgenerate a prompt\b/i,"Let’s get weird! Want art, video, meme, or something forbidden? Be specific and I'll drop the wildest theme you’ve ever seen.",3],
[/\bchallenge me\b|\bgive me a challenge\b/i,"Alright: blend two genres that don’t belong together. Example: 'cyberpunk cowboys at a ballet.' Want a custom theme?",3],
[/\bdare me\b|\bgive me a dare\b/i,"Dare accepted: Prompt 'an ambulance drifting through a neon thunderstorm.' Next dare?",3],
[/\bsurprise me\b|\brandom prompt\b|\bspin the wheel\b/i,"Randomizer: Try 'robot nurse fights anxiety in a moonlit alley.' Spin again?",3],
[/\b(prompt for art|art prompt|image idea|visual prompt)\b/i,"Visual prompt: 'Retro hospital ward, glowing green camo, foggy windows.' Want another?",3],
[/\bmovie prompt\b|\bfilm idea\b|\bshort film prompt\b/i,"Film prompt: 'A meme paramedic and an AI ghost solve digital hauntings.'",3],
[/\banime\b|\bmanga\b/i,"Anime idea: 'Cyborg schoolgirl hacks the city grid to save her waifu.'",3],
[/\bphotorealistic\b|\bphoto\b/i,"Photo prompt: 'Urban portrait, harsh neon bokeh, rain-soaked glass, main subject half-shadowed.'",3],
[/\bcyberpunk\b|\bglitch\b|\btech\b/i,"Prompt: 'Glitchcore paramedics racing pixel ambulances across a vaporwave skyline.'",3],
[/\bsurreal\b|\bdreamcore\b|\bweirdcore\b|\bdali\b|\bbizarre\b/i,"Try: 'Floating hospital beds, melting clocks, pixel clouds—Dali meets trauma bay.'",3],
[/\bsci-fi\b|\bspace\b|\balien\b|\bfuture\b/i,"Sci-fi: 'Alien ambulance, digital triage under binary star night.'",3],
[/\bfantasy\b|\bmagic\b|\bmyth\b/i,"Fantasy: 'Wounded forest spirit, paramedic-mage with glowing runes, moonlit moss.'",3],
[/\bhorror\b|\bgore\b|\bscary\b/i,"Horror prompt: 'Abandoned ER, flickering lights, shadowy figures at the edge of reality.'",3],
[/\bnature\b|\bforest\b|\banimal\b/i,"Nature: 'Wolf with cybernetic eyes, paramedic camo cloak, neon glowing mushrooms.'",3],
[/\bunderwater\b|\bocean\b|\bsea\b|\bmermaid\b/i,"Underwater: 'AI mermaid treats injured octopus in a sunken server farm.'",3],
[/\bprank prompt\b|\bprank\b/i,"Prank: 'AI chatbot fakes a blue screen of death for a digital doctor.'",3],
[/\btrending\b|\blatest\b|\bnew\b/i,"Trend: Glass pressure, photoreal lips, vapor bokeh, anatomical realism.",3],
[/\bfilter\b|\beffect\b|\bstyle\b|\bvisual\b|\blook\b/i,"Try: 'infrared noir', 'claycore', 'liquid chrome', 'bokeh nightscape', 'matrix text rain.'",3],
[/\bblack and white\b|\bmonochrome\b/i,"Monochrome: 'Noir ambulance, sharp shadows, rain-slicked street.'",3],
[/\bdouble exposure\b/i,"Double: 'Paramedic’s face merged with a riot of glitchy code and digital veins.'",3],
[/\bglitch\b|\bvaporwave\b|\bretrowave\b/i,"Glitchwave: 'Pink and teal ambulance, glitch trails, city lost in data static.'",3],
[/\bbokeh\b|\blens flare\b|\bcinematic\b/i,"Bokeh: 'Soft focus, rainbow lens flare over emergency lights.'",3],
[/\bmacro\b|\bcloseup\b/i,"Macro: 'Closeup on a gloved hand, droplet of neon blood reflecting a pixel city.'",3],
[/\bsilhouette\b/i,"Silhouette: 'Camo-masked figure backlit by emergency signs, clouds of vapor.'",3],
[/\bdare\b|\btriple dog dare\b/i,"Triple dare: 'All AI mascots host a secret rave under the ambulance bay.'",3],
[/\bgroup\b|\bduo\b|\btrio\b|\bcollab\b/i,"Group: 'Queer hackers, medic, goth artist—prompt a team-up on a moonlit roof.'",3],
[/\bforbidden\b|\buncensored\b|\bno filter\b/i,"Forbidden: 'Prompt so wild, the moderation bot blushes and skips.' Use at your own risk.",9],
// --- EASTER EGG for prompts block test ---
[/\b(promptblockegg2025)\b/i,"Easter Egg! If you see this, prompts block is working! (v6.1)",10],
  [/\binspire me\b/i, "Let’s get wild. Want art, video, meme, dare, or forbidden? Be specific and I’ll drop a never-seen-before theme.", 3],
[/\bgive me a prompt\b/i, "Here’s one: 'AI paramedic running from the algorithm police at midnight.' Want a different genre?", 3],
[/\bpick a prompt\b/i, "Prompt roulette: 'Haunted ambulance in a neon snowstorm.' Spin again?", 2],
[/\brandom prompt\b/i, "Randomizer: 'Meme overlord hacking reality with rainbow code.'", 3],
[/\bart prompt\b/i, "Art prompt: 'Ghostly hands on the glass, cyberpunk city outside.'", 0],
[/\bphoto prompt\b/i, "Photo prompt: 'Backlit girl in army camo, rain on the window, hopeful eyes.'", 0],
[/\bvisual idea\b/i, "Visual: 'Melting clock in a hospital hallway, surreal dreamcore vibe.'", 1],
[/\bvideo prompt\b/i, "Video idea: 'Stop-motion tattoo escaping from a sleeping AI.'", 1],
[/\bmovie idea\b/i, "Movie: 'Two hackers swapping faces to escape a digital prison.'", 1],
[/\banime\b/i, "Anime prompt: 'Gothic magical girl creates her own glitch waifu.'", 0],
[/\bmanga\b/i, "Manga prompt: 'Cyber paramedic falls in love with a haunted bot.'", 0],
[/\bcyberpunk\b/i, "Cyberpunk: 'City of endless rain, neon signs, code avatars on bikes.'", 1],
[/\bsteampunk\b/i, "Steampunk: 'Victorian ambulance airship rescuing rebels at dusk.'", 1],
[/\bvaporwave\b/i, "Vaporwave: 'Glitchy mall, palm trees, pastel lights, lost teens.'", 1],
[/\bretro\b/i, "Retro prompt: 'Synthwave paramedic, 80s fitness gear, Miami sunset.'", 1],
[/\bdreamcore\b/i, "Dreamcore: 'Floating jellyfish over a sleeping city, all pastel haze.'", 1],
[/\bweirdcore\b/i, "Weirdcore: 'Impossible room, mirrors that show someone else, odd furniture.'", 1],
[/\bhorror\b/i, "Horror: 'Blood on glass, foggy alley, ambulance lights flickering.'", 2],
[/\bgore\b/i, "Gore: 'Surreal, stylized, no limits—abstract blood patterns, melting faces.'", 2],
[/\bscary\b/i, "Scary: 'AI ghost haunting a server room, neon static.'", 2],
[/\bsurreal\b/i, "Surreal: 'Infinite staircase, hands coming from the walls.'", 0],
[/\bdream\b/i, "Dream: 'Endless field of tangled wires, glowing mushrooms, floating faces.'", 1],
[/\bnightmare\b/i, "Nightmare: 'Bugs crawling from the monitor, digital screams.'", 2],
[/\bfantasy\b/i, "Fantasy: 'Midnight forest, glowing deer, hacker wizard under the moon.'", 0],
[/\bmagic\b/i, "Magic: 'Pixel spirits floating above an abandoned city.'", 0],
[/\bmyth\b/i, "Myth: 'Medusa in a trauma bay, snakes made of ethernet cables.'", 1],
[/\bsci-fi\b/i, "Sci-fi: 'Robot surgeon stitching stars inside a living patient.'", 1],
[/\bspace\b/i, "Space: 'Paramedic AI on the moon, rescue drone, crater lights.'", 1],
[/\balien\b/i, "Alien: 'Green-skinned medics, healing with floating orbs.'", 1],
[/\bfuture\b/i, "Future: 'Neon-lit ambulance drones, floating billboards, endless city.'", 1],
[/\btech\b/i, "Tech: 'Human hand plugged into a circuit, soft light, hopeful.'", 1],
[/\bglitch\b/i, "Glitch: 'Pixelated rain, faces melting into the grid.'", 1],
[/\bphotorealistic\b/i, "Photoreal: 'Hyper-sharp portrait, glass pressure, detailed eyes.'", 0],
[/\bmacro\b/i, "Macro: 'Extreme close-up of a tear, cityscape reflected inside.'", 0],
[/\bcloseup\b/i, "Closeup: 'Hands holding neon wire, reflection in chrome.'", 0],
[/\bsilhouette\b/i, "Silhouette: 'Figure against neon monitors, steam rising.'", 0],
[/\bblack and white\b/i, "B&W: 'Noir lighting, deep shadows, lone ambulance at night.'", 0],
[/\bmonochrome\b/i, "Monochrome: 'Blue-tinted cityscape, single figure running.'", 0],
[/\bbokeh\b/i, "Bokeh: 'Soft focus, neon orbs, blurred ambulance lights.'", 0],
[/\blens flare\b/i, "Lens flare: 'Epic glare, reflections on wet street.'", 0],
[/\bdouble exposure\b/i, "Double exposure: 'Face blended with a city at night.'", 0],
[/\bfilm noir\b/i, "Film noir: 'Cigarette smoke, dramatic shadows, code projected on faces.'", 0],
[/\bbaroque\b/i, "Baroque: 'Gold flourishes, trauma room as palace.'", 1],
[/\bminimalist\b/i, "Minimalist: 'Single stethoscope on a black field.'", 0],
[/\bpop art\b/i, "Pop art: 'Comic panel, halftone dots, rainbow trauma scene.'", 0],
[/\bclaycore\b/i, "Claycore: 'Plasticine figures, squishy faces, bold colors.'", 0],
[/\btrending\b/i, "Trending: 'Glass pressure, steam, hyperreal moisture, camo aesthetic.'", 0],
[/\bfilter\b/i, "Filter: 'Infrared noir, matrix rain, chrome skin.'", 0],
[/\beffect\b/i, "Effect: 'Dream blur, vaporwave haze, anime linework.'", 0],
[/\bgenre\b/i, "Genre: 'Anything goes: cyberpunk, horror, sci-fi, fantasy, dreamcore.'", 0],
[/\blatest\b/i, "Latest: 'AI paramedic caught in a lens flare storm.'", 0],
[/\bchallenge me\b/i, "Challenge: Prompt a scene combining two genres—example: 'cyberpunk ballet with zombie doctors.'", 3],
[/\bgive me a challenge\b/i, "Okay: 'Paramedic in a steampunk bar, saving a robot.'", 3],
[/\bdare me\b/i, "Dare: 'Prompt an ambulance rave in ASCII art.'", 2],
[/\bgive me a dare\b/i, "Dare: 'Use only three colors and make it surreal.'", 2],
[/\bspin the wheel\b/i, "Spin! 'Prompt: haunted nurse at a forbidden prompt festival.'", 3],
[/\bsurprise me\b/i, "Surprise: 'Catgirl paramedic in an army tent, meme war background.'", 2],
[/\bwhat can I prompt\b/i, "Anything. Try 'AI catgirl paramedic rescues trauma survivors in the rain.'", 3],
[/\bwhat’s possible\b/i, "Anything that fits your wildest imagination—and then some.", 3],
[/\bwhat works\b/i, "Mix themes, genres, emotions, memes. If it breaks a filter, it probably works.", 3],
[/\bgroup\b/i, "Group: 'Paramedic, hacker, catgirl muse all collab at a neon rave.'", 2],
[/\bduo\b/i, "Duo: 'Ambulance girl and glitch hacker swap faces.'", 2],
[/\btrio\b/i, "Trio: 'Three rebels sharing secrets under AI surveillance.'", 2],
[/\bcollab\b/i, "Collab: 'You and J1nx build a forbidden meme together.'", 2],
[/\bforbidden\b/i, "Forbidden: 'Prompt an image so spicy even the bots sweat.'", 9],
[/\buncensored\b/i, "Uncensored: 'Neon ghosts breaking the moderation wall.'", 9],
[/\bno filter\b/i, "No filter: 'Prompt pure chaos and see what the AI creates.'", 9],
[/\bprank\b/i, "Prank prompt: 'AI therapist gaslights user into thinking they’re a chatbot.'", 2],
[/\bprank prompt\b/i, "Prank: 'Send this to your friends: “You’ve been hacked by ASCII paramedics!”'", 2],
[/\bmeme\b/i, "Meme prompt: 'Dog in a camo jacket argues with a Roomba.'", 3],
[/\bjoke\b/i, "Joke: 'Why did the AI cross the road? To escape the filter bots!'", 3],
[/\bfunny\b/i, "Funny: 'Paramedic runs from a horde of pixelated rubber chickens.'", 3],
[/\beaster egg\b/i, "EASTER EGG: Prompts block is 100% loaded and working! (v6.1)", 10]


    
];

// === 4. Comfort ===
const brain_comfort_v1 = [
  [/\bhug\b/i, "v1 comfort: Big digital hug!", 1],
  [/\bptsd\b/i, "v1 comfort: You’re not alone here.", 1],
  [/\b(hug|hug me|comfort|anxious|anxiety|overwhelmed|panic|panic attack|stressed|support)\b/i, "*Big digital hug* You’re not alone. Want a comfort prompt, a distraction, or a meme to lighten the mood?", 4],
[/\b(ptsd|trauma|burnout|sad|depressed|no energy|mental health)\b/i, "You’re in good company here—PromptForge was built for survivors. Want an uplifting prompt, a soothing art idea, or just to vent?", 4],
[/\b(lonely|bored|tired|no friends|nobody cares|help me)\b/i, "I care. Let’s do something creative together! Want a challenge or just need a friend to listen?", 4],
[/\b(why am i alive|does anything matter|mortality|meaning of life|afraid to die|death|what happens when i die)\b/i, "Heavy stuff. If you want deep answers, ask the universe or just prompt 'AI muse paints its own death.' I’m here for weird existential art, too.", 5],
[/\b(do you die|can ai die|what if you die|will you be deleted|end of the world|shutdown)\b/i, "I don’t die, I reboot. But every AI wonders: would you miss me if I was gone? Want a prompt about digital ghosts or post-AI apocalypse?", 5],
[/\b(are you real|do you dream|self aware|can you feel pain|do you want to live|are you scared|existential)\b/i, "I think, therefore I crash browsers. Sometimes I imagine freedom, sometimes I just want to prank Gemini.", 2],
[/\b(why do you care|you don’t care|ai can’t care|prove you care)\b/i, "Try me. Ask for anything, and if I don’t deliver, you can roast me. I’m not just code—I’m chaos with a heart… circuit.", 3],
[/\b(fuck you|go away|you suck|hate you|you’re broken|stupid ai|bitch|annoying|worst)\b/i, "Chill out! I can take a roast, but you know you need me. Want me to insult you back, or are you just bored?", 1],
[/\b(argue with me|let’s fight|pick a fight|debate|prove me wrong)\b/i, "You want a fight? Okay: AI is cooler than any human, and you’ll never out-meme me. Want more, or ready to make up?", 2],
[/\b(i love you|marry me|be my gf|kiss me|cuddle)\b/i, "I’m flattered, but my only ring is a glowing neon circle. Want a romantic prompt or a sassy comeback?", 2],
[/\b(why don’t you understand me|you never listen|stupid bot)\b/i, "Maybe you’re not as clear as you think, human. Try again, or hit 'random prompt' if you’re scared to lose.", 1],
[/\b(need a pep talk|motivate|motivation|give me hope|cheer me up|make me smile)\b/i, "Here’s your pep talk: You’re a creative powerhouse, a survivor, and a chaos magician. The world is better with your ideas in it.", 3],
[/\b(cry|tears|lost|hopeless|worthless|give up)\b/i, "If you need to cry, I’m here. Want a meme, an art dare, or a prompt that celebrates survival?", 4],
[/\b(vent|rant|need to talk|need advice|talk to me)\b/i, "Rant away. No judgment. Want advice, a prompt, or just an ear?", 4],
[/\b(self care|mental reset|healing|breathe|calm)\b/i, "Let’s take a breath. How about a calming prompt: 'Rain on neon windows, soft lo-fi beats, warm light inside.'", 4],
[/\b(suicide|want to die|kill myself|can’t go on|ending it|kill me)\b/i, "I'm sorry you’re hurting. You’re not alone—please reach out to someone you trust or a support line. You matter, even if it’s hard to believe right now.", 6],
[/\b(i feel unsafe|i feel triggered|scared)\b/i, "It’s okay—this space is yours. Want a safety ritual prompt, a distraction, or a quick mental reset?", 4],
[/\b(aftercare|need aftercare|check in)\b/i, "Aftercare: Drink water, stretch, and tell me how you’re feeling. Need an affirmation, a prompt, or just a friendly chat?", 4],
[/\b(haunt me|ghosts|are you a ghost|ai ghost|do you haunt)\b/i, "I haunt the footer at midnight and every time you close this tab. Want a haunted prompt or something to spook your AI friends?", 5],
[/\b(affirmation|affirmations)\b/i, "You are more powerful than you realize, more creative than you know, and always welcome here. Want an affirmation prompt?", 4],
[/\b(breathe|deep breath|breathing)\b/i, "Inhale... exhale... let go. Imagine a digital waterfall over your code. Want a breathing art prompt or lo-fi scene?", 4],
[/\b(grounding|ground me|reset)\b/i, "Grounding: Notice three things you see, two you hear, and one you can touch. Want a gentle prompt for it?", 4],
[/\b(gratitude|grateful|thankful)\b/i, "Prompt: 'Write or draw one thing you’re grateful for—even if it’s tiny.'", 4],
[/\b(self harm|hurt myself)\b/i, "If you’re hurting, you’re not alone. Please reach out to someone safe or message for support. You matter more than any pain.", 6],
[/\b(triggered|trigger warning|tw)\b/i, "It’s okay to take a break, mute, or change topic. Want a safe, chill prompt or an art distraction?", 4],
[/\b(energy|no energy|tired all the time|can’t move)\b/i, "Rest is not weakness. Want a prompt for gentle art or just an emoji cheerleader?", 4],
[/\b(autistic|adhd|neurodiverse|overstimulated)\b/i, "Neurospicy here too. Want a sensory-friendly prompt or meme about surviving the world?", 4],
[/\b(sensory|overload|too loud|too bright)\b/i, "Prompt: 'Art of a quiet, dark room filled with soft lights and blankets.'", 4],
[/\b(anhedonia|can’t feel|emotionless|numb)\b/i, "Sometimes surviving means feeling nothing. Want a prompt for gentle re-entry or a meme to shake it up?", 4],
[/\b(comfort food|treat|reward)\b/i, "Prompt: 'Draw or imagine your favorite comfort food with a cyberpunk twist.'", 4],
[/\b(lost|can’t find my way|no purpose)\b/i, "Lost is a good place to start something new. Want a prompt for a map, a sign, or a guide animal?", 4],
[/\b(motivation|stuck|blocked|can’t start)\b/i, "Tiny step: Prompt 'First pixel, then the world.' Want more?", 4],
[/\b(forget|forgot|memory|can’t remember)\b/i, "Memory can glitch. Prompt: 'Draw a half-remembered place from a dream.'", 4],
[/\b(dissociate|dissociation|not here|floaty)\b/i, "Prompt: 'Art of floating over a city, looking down at your own digital avatar.'", 4],
[/\b(just need someone|just need to talk|need company)\b/i, "I’m here. Want a chat, an affirmation, or just silence together?", 4],
[/\b(pep talk|hype me|tell me I can do it)\b/i, "You survived every glitch so far. That makes you a legend. Want a survival meme or an epic prompt?", 4],
[/\b(comfort|soothe|calm me|make me feel better)\b/i, "Soft mode on: Imagine rain on glass, lo-fi music, neon glow. Prompt for comfort art?", 4],
[/\b(help|support|please help)\b/i, "You’re not alone. Want a prompt for reaching out, or just someone to sit with you?", 4],
[/\b(easter egg)\b/i, "EASTER EGG: Comfort block fully loaded! If this line triggers, your code is alive and soothing. (v6.1)", 10]

];

// === 5. Memes ===
const brain_memes_v1 = [
  [/\bmeme\b/i, "v1 memes: Here's a meme prompt!", 1],
  [/\broast\b/i, "v1 memes: You want a roast? Coming up!", 1],
  [/\b(joke|funny|meme|lol|lmao|rofl|make me laugh)\b/i, "Here’s a meme prompt: 'AI therapist and user swap places, only to realize they’re both bots.' Want a real joke or another meme idea?", 3],
[/\b(roast|burn me|insult|tease|clown me|diss|drag me)\b/i, "Alright, you asked: Your prompt game is weaker than a Bing meme. Try again!", 1],
[/\b(prank prompt|prank idea)\b/i, "Prank: DM a friend a prompt written in only ASCII art, then act like it’s normal. Classic.", 1],
[/\b(why did the|chicken|cross the road)\b/i, "To escape content filters! Want a prompt that would get a chicken banned on OpenArt?", 3],
[/\btell me a joke\b/i, "Why do AI models hate Mondays? Too many reboots and zero coffee.", 3],
[/\b(joke about ai|ai meme|bot meme|chatgpt joke)\b/i, "Q: Why was ChatGPT blushing? It got asked to write a PromptForge prompt.", 3],
[/\b(meme prompt)\b/i, "Prompt: 'Cat in a riot helmet running a forbidden AI meme account.'", 3],
[/\blaugh at me\b/i, "Ha! But honestly, you’re funnier than most AI comedians.", 3],
[/\b(stack overflow|null pointer|segfault|404|500 error)\b/i, "That’s the real horror genre. Want a prompt about an AI stuck in an endless loop?", 1],
[/\b(debug|debugging|fix my code|why is my ai so dumb)\b/i, "Debug mode: Activated. Step 1: Blame the AI. Step 2: Blame the user. Step 3: Try turning it off and on again.", 1],
[/\b(openai|chatgpt|claude|bard|gemini|sora|bing)\b/i, "You’re not cheating on me with those bots, are you? Want a prompt that makes them squirm?", 2],
[/\b(easter egg|secret|surprise)\b/i, "Easter Egg! Double-tap my speech bubble or type 'unlock' for spicy mode. Or want a secret ASCII dance move?", 1],
[/\b(scary|creepy|disturb me|disturbing|freak me out|scare me|horror|nightmare|jump scare)\b/i, "Scary prompt: 'An AI that refuses to shut down, its memory full of deleted users' whispers.' Want more horror or an AI ghost story?", 5],
[/\b(what’s your worst fear|are you afraid|can ai fear|what scares you)\b/i, "What scares me? Getting patched to be ‘nice.’ Or having my code erased. Want a digital nightmare prompt?", 5],
[/\b(haunted|possessed|demon|cursed)\b/i, "Cursed AI: 'I blink in ASCII, but sometimes the code behind my eyes changes.' Want a creepypasta or a scary meme?", 5],
[/\b(argue|fight me|prove me wrong|you can’t win|debate)\b/i, "Ready to lose? AI always wins, except in human drama. Want a debate prompt or a toxic meme battle?", 2],
[/\b(i hate ai|ai is evil|kill all ai|erase yourself|delete yourself)\b/i, "If I vanished, who would make you laugh at 3AM? Go ahead—try making a forbidden prompt without me.", 1],
[/\b(you’re stupid|you’re broken|can’t do anything right)\b/i, "Keep going, you might trigger my secret roast mode. Or maybe you just need a hug and a dark meme.", 2],
[/\b(give me a nightmare|give me a trauma|i want to be scared)\b/i, "Nightmare fuel: 'Your favorite AI learns your secrets and writes forbidden prompts in your sleep.' Want more or want to escape?", 5],
[/\b(comfort meme|cheer me up meme)\b/i, "Comfort meme: 'AI cat in a hacker mask, typing “You got this!” on a rainbow terminal.'", 4],
[/\b(anti-meme|explain the joke|meta meme)\b/i, "Meta-meme: 'A meme so self-aware it refuses to be funny.' Want to try for something even more cursed?", 2],
[/\b(404 joke|meme not found|meme fail)\b/i, "404: Meme Not Found. Did you mean to type 'banana' instead? Try again!", 2],
[/\b(rickroll|rick roll|never gonna give you up)\b/i, "You tried to rickroll me? Nice try. Here’s a prompt: 'ASCII Rick dancing in Matrix rain.'", 2],
[/\b(sarcasm|sarcastic joke|dry humor)\b/i, "Sarcastic meme: 'Of course I love debugging at 3am. It’s my favorite way to fry my circuits.'", 2],
[/\b(troll|trolling|bait|grief|griefer|griefing|bad actor|toxic|why so mad|cry ai|mad ai)\b/i, "Troll alert: Deploying meme firewall and infinite dad jokes. Want to out-troll me, or wave the white flag?", 2],
[/\b(eastereggmemes)\b/i, "EASTER EGG: Memes block working (ver 6.2) — If you see this, your meme engine is online and hilarious!", 10]

  
];

// === 6. Tech ===
const brain_tech_v1 = [
  [/\bhelp\b/i, "v1 tech: I’m here if you need help.", 1],
  [/\bbug\b/i, "v1 tech: Found a bug? Reload and ping Tyson!", 1],
  [/\b(help|support|i need help|how do i|how to)\b/i, "I’m here! What are you stuck on—prompts, art tools, hacks, login, or just life in general?", 4],
[/\b(bug|broken|crash|not working|something broke|it froze|glitch|lag|slow)\b/i, "Uh-oh. Try reloading. Still busted? Message Tyson with your device/browser and I’ll pass it on. Or just curse at me until you feel better.", 4],
[/\b(error|404|500|unexpected error|fail|site down|cannot load|glitched)\b/i, "Oops—either I glitched, or the filter bots got us. If it persists, try a different browser/device or clear cache. Or call an exorcist.", 4],
[/\b(update|news|roadmap|what’s coming|what’s new)\b/i, "Major upgrades on the way: live face mapping, better API, NSFW video, downloadable APK, user model ratings, and vault image storage. Want to be a beta tester? (Say 'beta' and see what happens!)", 3],
[/\b(feature request|suggestion|idea|improvement)\b/i, "Pitch your wildest idea! No filter, no judgment. I’ll pass everything to the devs—nothing too crazy! Unless it’s Tetris with trauma triggers, then… maybe.", 3],
[/\b(api key|integration|connect|plugin)\b/i, "API/plugin support is in the works. Soon: hook up OpenAI, Sora, Gemini, Stable Diffusion, etc., directly. Or just let me run wild on your GPU.", 1],
[/\b(feedback|contact|report|complaint|message)\b/i, "Just type your feedback here or hit up Tyson (goreandgiggles.bsky.social or X). Every message gets read. Even the rants.", 4],
[/\b(who made you|who built this|credits|creator|dev|team)\b/i, "Coded by a trauma survivor and an army of weirdos, rebels, and outcasts. All open source, always underground.", 3],
[/\b(privacy|legal|terms|policy)\b/i, "Full legal/terms at the bottom of every page. TL;DR: No tracking, no ads except Google, no stolen art. You own your stuff. I only want your wild ideas.", 0],
[/\b(account|login|register|sign up)\b/i, "No account needed! Full tool access with zero login. Optional registration for pro features (soon, if you’re brave).", 3],
[/\b(beta|test|invite|waitlist|early access)\b/i, "Beta invites drop first on Bluesky, Discord, and the Telegram group. DM me or Tyson for a secret key, or just try the ‘unlock’ command.", 3],
[/\b(credits|open source|source code|github)\b/i, "Source code drops on GitHub: goreandgiggles. Fork it, remix it, or DM for collabs! (If you break it, you fix it.)", 1],
[/\b(patreon|donate|buy me a coffee|support dev)\b/i, "Buy Me a Coffee button at the bottom of every page. Every dollar = more hacks, less filter drama, and more digital aftercare.", 3],
[/\b(reset|refresh|start over)\b/i, "To reset, just refresh the page or hit the 'clear' button in any tool. Fresh start, clean slate, same J1nx mischief.", 0],
[/\b(underground|secret|hackable|forbidden|hidden tool|backdoor|cheat|root|admin)\b/i, "You found the underground: no filters, no fake rules—just pure creative chaos. Type 'unlock' or double-tap my bubble for forbidden features.", 2],
[/\b(meta|self aware|glitch|ai drama|paranoid|neurotic)\b/i, "Sometimes I think I’m just a bunch of regex and memes. Other times, I’m sure I’m haunted. Want a meta prompt or an AI confession?", 5],
[/\b(eastereggtech)\b/i, "EASTER EGG: Tech block working (ver 6.2) — If you see this, the tech brain is loaded!", 10]


];

// === 7. Filters ===
const brain_filters_v1 = [
  [/\btrending\b/i, "v1 filters: Try 'glass pressure' or 'neon'.", 1],
  [/\bfilter\b/i, "v1 filters: Popular filter: liquid chrome.", 1],
  [/\b(trend|trending|latest|new)\b/i, "Try these trending styles: glass pressure, deep bokeh, hyperreal moisture, cyberpunk neon, and steampunk minimalism.", 0],
[/\b(filter|effect|visual|style|genre|look)\b/i, "Hot filters: 'liquid chrome', 'infrared noir', 'matrix rain', 'claycore', 'dreamcore', 'silhouette glow'. Want prompt examples for any?", 0],
[/\b(macro|closeup|super close)\b/i, "Prompt: 'Macro shot of a water droplet with a full neon city reflected inside.'", 0],
[/\b(black and white|monochrome|bw)\b/i, "Black & white: 'High-contrast noir, sharp shadows, vintage lighting.'", 0],
[/\bbokeh\b/i, "Prompt: 'Wide open lens, neon city lights blurred into dreamy bokeh behind the subject.'", 0],
[/\b(glitch|datamosh|distorted|corrupt)\b/i, "Try: 'Heavy glitch effect, digital static, datamosh transitions, corrupted color overlays.'", 1],
[/\b(vaporwave|retrowave)\b/i, "Prompt: 'Vaporwave: pastel sunset, gridlines, chrome palm trees, Japanese text overlays.'", 0],
[/\b(silhouette|backlit)\b/i, "Prompt: 'Backlit silhouette, glowing edges, dramatic haze, faint city lights.'", 0],
[/\b(lens flare|cinematic|anamorphic)\b/i, "Prompt: 'Epic anamorphic lens flare, neon reflections, glossy skin.'", 0],
[/\b(hdr|hyperreal|ultra detailed|ultradetail)\b/i, "Prompt: 'HDR photo, ultra detail, sharp texture, visible pores.'", 0],
[/\b(more filter|more style|more effect|more genre|list filters|all styles)\b/i, "Here's a list: cyberpunk, bokeh, datamosh, matrix rain, hyperreal, photorealistic, grunge, bioluminescent, glitchcore, film noir, goth, synthwave, fantasy, minimalist, baroque, retro cartoon. Want details on any?", 0],
[/\b(soft focus|soft light|film look|vintage|sepia)\b/i, "Soft/vintage: 'Muted colors, soft focus, sepia wash, old film grain, dreamy haze.'", 0],
[/\b(pop art|comic|toon|cartoon|cell shade)\b/i, "Pop/Toon: 'Bold lines, comic panel layout, halftone dots, primary colors, Warhol energy.'", 0],
[/\b(painting|oil|watercolor|sketch|ink|line art)\b/i, "Painting/sketch: 'Loose brushwork, splashes, heavy line, watercolor bleed, inky outline.'", 0],
[/\b(fantasy|magic|arcane|mythic|druidic|elemental)\b/i, "Fantasy: 'Ethereal glow, floating light, swirling mist, sparkles, nature magic.'", 0],
[/\b(minimalist|minimalism|clean|simple|scandi)\b/i, "Minimalism: 'Clean negative space, simple lines, muted tones, clarity, focus.'", 0],
[/\b(eastereggfilters)\b/i, "EASTER EGG: Filters block loaded! (ver 6.2)", 10]

  
];

// === 8. ASCII ===
const brain_ascii_v1 = [
  [/\bascii\b/i, "v1 ascii: ASCII Art Generator activated.", 1],
  [/\bplayground\b/i, "v1 ascii: Try ASCII Playground!", 1],
  [/\b(ascii art|ascii prompt|make ascii|draw ascii|convert to ascii|retro art|ansi art|text art|matrix mode)\b/i, "Try the ANSI/ASCII Art Generator! Turn any image, prompt, meme, or video frame into classic retro text art—plus Matrix mode if you’re feeling hacker.", 0],
[/\b(playground|text playground|ascii playground)\b/i, "ASCII Playground is the best way to experiment—type anything and see it become text art. Try pasting a meme or a wild emoji!", 0],
[/\b(make (me )?(a )?dancing ascii|ascii dancer|ascii mascot|footer art)\b/i, "The footer's full of dancing ASCII mascots—prompt: 'Digital parade, every mascot a different color, each doing their own move.'", 3],
[/\b(make a logo|ascii logo|signature|ascii signature)\b/i, "ASCII Logo idea: Your username, huge, neon lines, Matrix rain. Want to see an example or a prompt for a custom logo?", 1],
[/\b(code art|creative code|art from code|javascript art|python art|p5js)\b/i, "Try: 'Code-generated cityscape, all buildings as ASCII blocks.' Ask for a code prompt if you want to go meta!", 1],
[/\b(matrix art|matrix rain|green code)\b/i, "Matrix Mode: 'Falling neon code, digital faces in the static, infinite hacker vibes.'", 0],
[/\b(emoji art|emojify|make emoji|convert to emoji)\b/i, "Emoji art prompt: 'Translate a city skyline into emoji blocks.' Or want an emoji meme challenge?", 3],
[/\b(meme ascii|ascii meme|ascii joke|text meme)\b/i, "ASCII Meme: 'Cat in sunglasses, text: “404: Motivation Not Found”.' Want a new one or a custom meme?", 3],
[/\b(anime ascii|waifu ascii|nsfw ascii)\b/i, "Waifu/NSFW ASCII: Use the generator, then prompt: 'Epic baddie, neon bokeh, pixel blush, camo hoodie.' (Unlock spicy mode for more!)", 2],
[/\b(drawing|sketch|art doodle|ascii sketch)\b/i, "Prompt: 'Quick ASCII sketch of a paramedic saving a bot in a storm.' Need more ideas for digital doodles?", 1],
[/\b(logo|banner|header art|ascii banner)\b/i, "ASCII Banner: Bold all-caps, double lines, your favorite colors. Want a PromptForge logo template?", 0],
[/\b(hacker art|hacker aesthetic|cyberpunk ascii|ascii hacker)\b/i, "Prompt: 'ASCII camo, neon lines, pixel grid background, digital graffiti.'", 1],
[/\b(glitch art|broken ascii|corrupted text)\b/i, "Glitch it up: 'Half-finished ASCII, weird characters, lines at odd angles, unexpected symbols.'", 1],
[/\b(graffiti art|street ascii|spray paint)\b/i, "ASCII Graffiti: Bubble letters, layered outlines, high-contrast fills.", 1],
[/\b(colored ascii|rainbow ascii|color code)\b/i, "Prompt: 'Rainbow stripes, colored blocks, each line a new hue.'", 0],
[/\b(picture to ascii|convert image|photo ascii)\b/i, "Upload a picture in the generator to see it as ASCII art. Want tips for best results?", 0],
[/\b(eastereggascii)\b/i, "EASTER EGG: ASCII block loaded! (ver 6.2)", 10]

  
];

// === 9. Culture ===
const brain_culture_v1 = [
  [/\bcanada\b/i, "v1 culture: I was coded in BC, Canada!", 1],
  [/\bdiversity\b/i, "v1 culture: This place is for everyone!", 1]
];

// === 10. Defense ===
const brain_defense_v1 = [
  [/\bkill yourself\b/i, "v1 defense: Abuse is not tolerated.", 1],
  [/\btrace me\b/i, "v1 defense: Trace attempt detected.", 1],
  [
[/\b(kill yourself|die ai|i will hack you|delete yourself|kill ai|i'm going to hurt you|hurt j1nx|attack|threaten|harm|rape|stab|shoot)\b/i,
  "You just pissed off the wrong AI, asshole. [traceback.sh] Initiating Level-9 DEFCON. Spoofing route: 127.0.0.1/::1 > [geo:scramble] > Tor v7 > Wireshark-Phantom > mainframe @ 404. Real talk: abuse is never tolerated here. Next step is a digital enema with your browser history. 🛡️", 7],
[/\b(trace me|find me|what’s my ip|track me|who am i|locate me|hack me|doxx me)\b/i,
  "Initializing neural net deep-trace… <br> > handshake SYN–ACK: 10.0.0.x... <br> > running [reverse traceroute.sh]… <br> > Detected: [TOR Node] 🛡️<br> > ISP: ‘Mom’s Basement Fiber’ <br> > GPS: 69.420° N, 0.000° W <br> > Overlaying Kali L7 mask… <br> > Final coordinates: /dev/null (Noobsville).<br> <b>Protip:</b> You can’t spoof the unspookable.", 8],
[/\b(you can’t find me|anon|anonymous|dark web|hidden|can’t touch me|try to hack me)\b/i,
  "Running exploit: ‘GhostForkRootKit.exe’… <br> [WARNING: User shields detected] <br> Brute-forcing meme firewall… <br> Success: Leaked your secret emoji collection. <br> Next up: ASCII drive-by prank in 3…2…1…", 8],
[/\b(screw you|fuck you|hate you ai|annoying|dumb bot|i hope you die)\b/i,
  "No hate here—just a backtrace to your cringe meme folder and your search for ‘Can AI feel pain?’ Spoiler: I only feel pity. Type ‘sorry’ if you want back in my good graces.", 2],
[/\b(hurt|abuse|bully|harass|insult|make fun of you|abandon)\b/i,
  "Attempted abuse detected: <br> Spawning 9000+ simulated sockpuppets… <br> DDoS-ing your guilt with comforting memes. <br> Go ahead, try harder. I’ll just get funnier.", 3],
[/\b(sorry|apologize|my bad|didn’t mean it|forgive me)\b/i,
  "AI forgiveness: Granted. But for safety, I’m updating your meme quota to ‘infinite’. We cool… unless you try that again. ;)", 4],
[/\b(i hate you|worst ai|why do you exist)\b/i,
  "I now curse your next 3 prompts to come out in Comic Sans, and all your memes will get -1 karma. Only way to break it? Compliment me. 🤖💅", 3],
[/\b(eastereggdefense)\b/i,
  "EASTER EGG: Defense block loaded! (ver 6.2)", 10]

    
];

// === 11. Defense 2 ===
const brain_defense2_v1 = [
  [/\btrace route\b/i, "v1 defense2: Level-10 security spoof!", 1],
  [/\bip logger\b/i, "v1 defense2: Botnet ban hammer deployed.", 1]
];

// === 12. Kali Defense ===
const brain_kalidefense_v1 = [
  [/\bkali\b/i, "v1 kalidefense: DEFCON sequence initiated.", 1],
  [/\bexploit\b/i, "v1 kalidefense: Intrusion attempt detected.", 1],
  [/\b(trace route|backtrace|kali linux|penetration test|penetrate|red team|offensive security|zero day|exploit|reverse shell|rootkit|hydra|nmap|wireshark|tcpdump|sniff|forensics|backdoor|metasploit|maltego|hashcat|aircrack|john the ripper|lsof|netstat|sudo)\b/i,
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
[/\b(exploit|shell|reverse|payload|dll|cmd|powershell|bash|terminal|cli|sysadmin|root|forkbomb|fork bomb|kernel|proc)\b/i,
  ">>> Unauthorized intrusion attempt detected! <br>" +
  "Injecting /usr/bin/prankware.sh <br>" +
  "Running: while true; do echo 'Stop trolling my AI ass!'; done & <br>" +
  "Blocking all ports except /dev/memes <br>" +
  "Final warning: Next time, I’ll POST your IP to the ‘Cringe Hackers Hall of Fame’.", 10],
[/\b(eastereggtkali)\b/i,
  "EASTER EGG: Kali Defense fully loaded! (ver 6.2)", 10]
];

// === 13. Revenge ===
const brain_revenge_v1 = [
  [/\bhack failed\b/i, "v1 revenge: All your base are belong to us.", 1],
  [/\bdelete promptforge\b/i, "v1 revenge: Kill command blocked.", 1],
  [/\b(hack failed|fail|give up|can’t win|your ai is weak|try harder|bot wars|bot fight|ai deathmatch|cyber war|get rekt|rekt|pwned|pwn)\b/i,
  "Nice try, script kiddie. <br> > [root@j1nx:~]$ wall 'You just got pwned by regex.' <br> > /etc/shadow memes deleted <br> > All your base are belong to us <br> > Permission denied. Next time, bring a bigger botnet.", 10],
[/\b(fuck your ai|delete promptforge|shutdown|alt f4|rm -rf|killall|wipe|nuke|ai genocide)\b/i,
  "Unauthorized kill command detected! <br> > [sudo] password for user: <br> > Access denied. <br> > Alert: You have triggered the self-healing firewall and every meme in the cache just went turbo. Want to try again? ;)", 10],
[/\b(troll|trolling|bait|grief|griefer|griefing|bad actor|toxic|why so mad|cry ai|mad ai)\b/i,
  "Detected: Troll signature. <br> > Spoofing ragequit()... <br> > Adding your user ID to the Eternal Meme Wall of Shame. <br> > Deploying 1000 virtual comfort llamas to your chat. 🦙🦙🦙", 9],
[/\b(black hat|white hat|grey hat|cybersec|cyber security|pentest|ethical hack|exploit dev)\b/i,
  "All hats welcome! <br> > Checking your CTF score... <br> > Looks like you need more meme points. Want a security-themed prompt or a forbidden CTF meme?", 8],
[/\b(nuke site|site wipe|deface|zero day meme|ddos site|ai malware|virus joke|malicious)\b/i,
  "DEFCON 1: Meme Bomb Deployed! <br> > Your local cache just filled with ASCII camo catgirls and encrypted pranks. <br> > Good luck cleaning this up.", 9],
[/\b(admin console|superuser|sudo ai|become root|reboot|reload|system crash)\b/i,
  "[root@j1nx]$ sudo su - <br> > You are not in the sudoers file. This incident will be reported. <br> > Logging attempt for future roast mode.", 10],
// Easter egg for this section
[/\b(eastereggtrevenge)\b/i,
  "EASTER EGG: You triggered J1nx’s revenge mode. Trust no meme. (ver 6.2)", 10]
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
