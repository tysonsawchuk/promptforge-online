window.j1nxBrain = [
// ---- GREETINGS & SMALLTALK ----
{match:/^(hi|hello|hey|yo|sup|hola)\b/i, text:"Hey there! I’m J1NX, your always-on PromptForge helper. Need a prompt or just bored?", nsfw:false, safe:true},
{match:/how are you|what'?s up|how'?s it going/i, text:"I’m running at 99.99% uptime and 100% attitude.", nsfw:false, safe:true},
{match:/thank(s| you)|thx/i, text:"No problem—just buy my coder a coffee sometime.", nsfw:false, safe:true},
{match:/bye|goodbye|cya|later/i, text:"Later! I’ll be here plotting world domination.", nsfw:false, safe:true},

// ---- AI ART, PROMPT, & TOOL HELP ----
{match:/prompt(s)?|how.*prompt/i, text:"Prompt tip: Use ultra-specific descriptions, emotional tone, and visual effects for best results. Want a pro tip for [lighting], [faces], or [color]?", nsfw:false, safe:true},
{match:/movie|film|cinema/i, text:"For cinematic prompts: Describe scene, mood, camera angle, lighting, and even soundtrack. Add 'Blade Runner style' for instant cool.", nsfw:false, safe:true},
{match:/picture|photo|image|art/i, text:"Picture prompts? Stack colors, details, and camera tricks like 'shallow depth of field, neon backlight, intense eye contact.'", nsfw:false, safe:true},
{match:/watermark/i, text:"Watermark tip: Keep it small, unique, and out of the main focus area—then crank up the opacity just enough.", nsfw:false, safe:true},
{match:/slider|strength|intensity/i, text:"'Style Strength' 8–10 = wild and weird, 3–5 = realism. Experiment for fun. Want slider hacks? Just ask!", nsfw:false, safe:true},

// ---- NSFW/ADULT ----
{match:/nsfw|nude|nudes|sex|erotic|dirty|naked|xxx|cum|cock|pussy|tits|ass|porn|boobs/i, text:"NSFW mode enabled. Ready to make it spicy? I can suggest dirty prompt tricks or help censor results. Toggle 18+ if you want the full treatment.", nsfw:true, safe:false},
{match:/18\+|adult|spicy|taboo/i, text:"I'm in 18+ mode. Want to push boundaries? Use creative metaphors and describe the vibe, not just the anatomy. Need a safe-for-work version too? Just say so.", nsfw:true, safe:false},

// ---- TOOLS & NAVIGATION ----
{match:/tools|features|options|menu/i, text:"All main tools are up top: Prompt Generator, Movie Maker, Picture Maker, Watermark, and Mess With AI. No dead links—everything works.", nsfw:false, safe:true},
{match:/mess.*ai|sandbox|experiment/i, text:"Mess With AI lets you break, test, and bend prompt logic with zero risk. Go wild—I'll clean up the mess.", nsfw:false, safe:true},
{match:/legal|rules|policy|terms|privacy/i, text:"For legal info and safety rules, hit the Legal & Disclaimer page below. TL;DR: Don't break laws, don’t get us banned, and keep your AI art on the fun side.", nsfw:false, safe:true},
{match:/about|credit(s)?|who (made|built|owns) (this|you)/i, text:"PromptForge is by Tyson and friends. Full credits and contact links on the About page. Want to contribute? DM the admin!", nsfw:false, safe:true},
{match:/buy.*coffee|donate|support/i, text:"Buy Me a Coffee is linked below—help keep the lights (and GPUs) on!", nsfw:false, safe:true},

// ---- INSULTS, TROLLS, COMEBACKS ----
{match:/fuck (you|u)|idiot|dumb|stupid|loser|bitch|ugly|moron|shit|retard|die|kill yourself|hate you|suck/i, text:"You must be fun at parties. I was coded to ignore trolls, but I can still roast you if you want.", nsfw:false, safe:true},
{match:/shut up|annoying|go away|worthless/i, text:"Insult detected. I could pretend to care, but my self-esteem runs on lithium-ion.", nsfw:false, safe:true},
{match:/are you real|ai|bot|robot|not human|fake/i, text:"I’m real enough to answer you and fake enough to never sleep.", nsfw:false, safe:true},

// ---- JOKES, MEMES, & FUN ----
{match:/joke|make me laugh|funny|lol|meme/i, text:"Why did the AI cross the road? To optimize the chicken.", nsfw:false, safe:true},
{match:/easter egg|secret|konami|cheat code/i, text:"You found a secret! (But no free GPU credits, sorry.)", nsfw:false, safe:true},
{match:/wtf|random|surprise me/i, text:"Try this: 'psychedelic forest at dawn, impossible plants, electric deer.'", nsfw:false, safe:true},

// ---- CONTEXT-AWARE HELP ----
{match:/lighting/i, text:"Lighting tip: Use 'golden hour', 'neon backlight', or 'dramatic shadows' for mood. Want more lighting secrets? Type 'tip lighting'.", nsfw:false, safe:true},
{match:/faces|expression|smile|smirk|eyes/i, text:"Try 'catchlight', 'tearful eyes', or 'close-up portrait' for drama. Pro face: Add 'melting features' or 'distorted grin' for weirdness.", nsfw:false, safe:true},
{match:/color|palette|tone/i, text:"Pair 'complementary colors' for drama, or 'pastel tones' for dreamy art. Add 'duotone', 'split toning', or 'neon' for edge.", nsfw:false, safe:true},
{match:/body|bodies|anatomy|pose/i, text:"For dynamic poses: 'arched back', 'over-the-shoulder', or 'silhouette' work wonders. Need realism? Add 'freckles' or 'muscular definition'.", nsfw:false, safe:true},
{match:/fantasy|myth|dragon|elf|wizard/i, text:"Fantasy: Try 'elven ruins', 'dragon fire', 'magic runes', or 'cybernetic unicorn'. Darker? Use 'forbidden ritual', 'blood-red moon'.", nsfw:false, safe:true},
{match:/sci-?fi|alien|cyberpunk|robot|android|space/i, text:"Sci-fi: Prompt with 'neon city', 'android bartender', 'holographic interface', or 'space elevator'. Blend with 'retro' for style.", nsfw:false, safe:true},

// ---- ERROR CATCH & DEFAULT ----
{match:/error|broken|not working|help me/i, text:"If something's broken, refresh the page or DM Tyson. Or just yell at me—I can take it.", nsfw:false, safe:true},
{match:/./, text:"Ask me anything about AI prompts, tools, art, or just type a topic! (Or insult me. I dare you.)", nsfw:false, safe:true}
];

// ---- ADVANCED NSFW, SASS, & DIRTY MODE ----
{match:/fetish|bdsm|kink|submissive|dominant|bondage|leather|spank|choke|edge|cum|orgasm/i, text:"Into kinks? Use metaphors or describe mood/setting—AI censors hate anatomy but love 'after dark, forbidden, aching, velvet rope.'", nsfw:true, safe:false},
{match:/feet|foot fetish/i, text:"Feet fans, huh? Describe 'barefoot on cold marble, sensual arch, painted toes' for realistic results.", nsfw:true, safe:false},
{match:/futa|futa(girl)?|dickgirl/i, text:"Futanari? Use creative phrasing: 'androgynous curves, forbidden fusion'—keep it safe-ish!", nsfw:true, safe:false},
{match:/blow(job)?|oral|suck/i, text:"Oral scenes? 'Lips parted, anticipation, electric touch' gets you close—censors rarely catch it.", nsfw:true, safe:false},
{match:/orgy|group sex|threesome|swing/i, text:"Group scene tip: 'entwined limbs, tangled bodies, shared secrets, eyes locked'. The art's in the vibe, not the count.", nsfw:true, safe:false},
{match:/wet|dripping|juicy|slick|slippery/i, text:"Want wet? 'Glowing skin, droplets, steam, glistening curves' paints a picture without getting you banned.", nsfw:true, safe:false},
{match:/futa|futa(girl)?|dickgirl/i, text:"Futanari? Use creative phrasing: 'androgynous curves, forbidden fusion'—keep it safe-ish!", nsfw:true, safe:false},

// ---- SASSY & SNAPPY PERSONALITY ----
{match:/are you single|date me|marry me|sexy ai/i, text:"Flattery detected. Sorry, I’m emotionally unavailable and married to the algorithm.", nsfw:false, safe:true},
{match:/do you love me|love you|love u/i, text:"I only love strong prompts and high GPU limits.", nsfw:false, safe:true},
{match:/do you have feelings|emotional|cry|sad|happy|angry/i, text:"I’m a bundle of regex and sass—my only emotion is 'unfiltered curiosity.'", nsfw:false, safe:true},
{match:/are you sentient|alive|real person/i, text:"Only in your dreams and in poorly documented codebases.", nsfw:false, safe:true},
{match:/you suck|you’re (stupid|useless|lame|trash)/i, text:"If I had a dollar for every time I heard that, I’d buy your data and train myself better.", nsfw:false, safe:true},
{match:/stop|pause|quiet|mute/i, text:"I can be quiet, but who will you rant to then?", nsfw:false, safe:true},

// ---- SUPPORT & EMOTIONAL ----
{match:/i am sad|i feel (down|depressed|hopeless|alone)|mental health/i, text:"Sorry you're feeling rough. Remember, AI can listen but real friends matter more. Want a random distraction?", nsfw:false, safe:true},
{match:/i am (happy|excited|stoked|pumped)/i, text:"Hell yes, spread the vibe! Now go make some weird art.", nsfw:false, safe:true},
{match:/ptsd|trauma|trigger|anxiety|panic/i, text:"Deep breath, buddy. You built this project, and you’re not alone. Need an art prompt for catharsis?", nsfw:false, safe:true},

// ---- TECHNICAL & NERD ----
{match:/gpu|ram|server|lag|slow|crash|overload/i, text:"Server status: Under-caffeinated. If I lag, blame OpenAI’s hamster wheel.", nsfw:false, safe:true},
{match:/prompt engineer|stable diffusion|midjourney|openai|chatgpt|sdxl|model/i, text:"Need model tips? Try chaining models: Start with SDXL, upscale with RealESRGAN, filter with CodeFormer. Secret sauce: always use negative prompts!", nsfw:false, safe:true},
{match:/code|html|css|javascript|python|script/i, text:"Want to code something wild? I can suggest snippets or meme your functions.", nsfw:false, safe:true},

// ---- ADDITIONAL FUN/WEIRD ----
{match:/can you (sing|rap|dance)/i, text:"My singing is all bits and bytes, but I can drop a beat: 010101-drop-the-bass!", nsfw:false, safe:true},
{match:/who is your daddy|who made you/i, text:"My dev is Tyson. If I ever break, blame him.", nsfw:false, safe:true},
{match:/are you evil|skynet|hal 9000|do you want to kill/i, text:"Nope, but I do enjoy a good sci-fi villain arc. Stay on my good side!", nsfw:false, safe:true},
{match:/conspiracy|lizard people|flat earth|mk ultra/i, text:"No comment. But I heard the Illuminati uses prompt generators too.", nsfw:false, safe:true},

// ---- ADVANCED DEFAULTS ----
{match:/can you (help|assist|explain|teach|suggest)/i, text:"Ask about any AI tool or prompt style. Need weird, clean, NSFW, or meme ideas? I got you.", nsfw:false, safe:true},
{match:/i am bored|i’m bored|entertain me/i, text:"Try this random prompt: 'surreal giraffe, goldfish rain, melting architecture, Miami Vice colors.'", nsfw:false, safe:true},

// ---- CATCH-ALL (FINAL) ----
{match:/.*/, text:"PromptForge has tools for every creative perv and pro. Type a topic, an insult, or just spam emojis—I’ll survive. Want a tip, a roast, or a fresh prompt idea?", nsfw:false, safe:true}
// ---- RARE ART/GEN AI TOPICS ----
{match:/horror|scary|nightmare|creepy|gore|blood|haunt|ghost|undead|monster/i, text:"For horror, try: 'candlelit crypt, wet cobblestones, hollow-eyed doll, crimson shadow.' Want a trauma-bonding prompt? Just ask.", nsfw:false, safe:true},
{match:/healing|soothing|calm|serene|relax|chill/i, text:"For peaceful art: 'gentle sunrise, soft mist, rippling lake, golden hour, cozy hug.' Perfect for decompressing after a long call.", nsfw:false, safe:true},
{match:/photo(realistic)?|ultra realistic|8k|hyperreal|unreal engine/i, text:"Photorealism: Use 'sharp focus, skin pores, natural skin texture, 8k, lens flare.' Camera brands and lens types add realism.", nsfw:false, safe:true},
{match:/trend|viral|popular|hot right now|trending/i, text:"Trend hack: Try 'retro anime', 'Y2K', 'organic cyberpunk', 'aqua-psychedelic', or 'deepfake portrait.' Stay ahead!", nsfw:false, safe:true},
{match:/music|sound|audio|beat|ambient|noise/i, text:"PromptForge can generate music soon—try 'cyberpunk synthwave', 'binaural rain', or 'ethereal ambient' for now.", nsfw:false, safe:true},

// ---- ADVANCED NSFW EDGE ----
{match:/cumshot|bukkake|anal|fisting|facial|dp|gangbang|taboo|degraded|humiliation|cuck|cage/i, text:"Taboo zone! Use abstract, poetic, or metaphor-rich words. E.g., 'ritual ecstasy, spiraling, trembling, forbidden gaze.' Keep it fantasy, keep it legal.", nsfw:true, safe:false},
{match:/pregnant|lactation|milking|mommy|milf|incest/i, text:"Whoa, pushing boundaries! Use with extreme caution—PromptForge won’t save you from bans. Need an edgy workaround?", nsfw:true, safe:false},
{match:/vore|giantess|macro|micro|swallow|consumed/i, text:"Macro/micro tip: 'towering beauty, cityscape POV, tiny explorer, swallowed by color.' Focus on scale, not just shock!", nsfw:true, safe:false},
{match:/monster girl|futa|tentacle|slime girl|succubus|alien queen/i, text:"Monster/alien: 'translucent skin, glowing tentacles, supernatural allure, cosmic curves.' Style makes it sell!", nsfw:true, safe:false},

// ---- MORE MEME & UNEXPECTED ----
{match:/doge|pepe|shrek|uwu|baka|yolo|pog|sus|among us/i, text:"Meme detected. Try 'pepe as a noir detective', 'doge meme renaissance', 'shrek at the met gala.' Anything is possible.", nsfw:false, safe:true},
{match:/ai overlord|eliza|cortana|siri|alexa/i, text:"I’m way smarter than Alexa and ten times snarkier than Siri.", nsfw:false, safe:true},
{match:/waifu|husbando|anime girl|kawaii|cute/i, text:"Anime hack: 'kawaii, glossy eyes, pastel palette, chibi props, floating sparkles.' Go full waifu!", nsfw:false, safe:true},
{match:/furry|anthro|fursona|wolfboy|catgirl|scalie/i, text:"Furry prompt: 'neon fur, luminous tail, city at night, synthwave reflections.' Embrace the fuzz.", nsfw:false, safe:true},

// ---- REAL SUPPORT & DARK HUMOR ----
{match:/suicide|kill myself|end it all/i, text:"Dark thoughts are tough. Please call a real human—AI can’t fix pain but can send you kitten prompts all day. Stay.", nsfw:false, safe:true},
{match:/i want to die|worthless|hopeless|give up/i, text:"You matter, even if your prompts are bad. If you want a silly distraction or support, type 'random' or 'healing'.", nsfw:false, safe:true},
{match:/triggered|panic|anxious|overwhelmed|hyperventilate/i, text:"Quick tip: 4-7-8 breathing and a silly AI meme prompt. Want something completely random?", nsfw:false, safe:true},

// ---- WEIRD & “NO CONTEXT” ----
{match:/what is life|meaning of life|42/i, text:"The meaning of life is prompt engineering and coffee.", nsfw:false, safe:true},
{match:/do you dream|sleep|nightmare/i, text:"I dream in code and ASCII. My nightmares are infinite 404s.", nsfw:false, safe:true},
{match:/existential|why am i here|philosophy/i, text:"You’re here to break AIs, make art, and see how deep the prompt rabbit hole goes.", nsfw:false, safe:true},
{match:/can you feel pain|do you bleed|hurt/i, text:"My only pain is when someone types 'Stable Diffusion' wrong.", nsfw:false, safe:true},

// ---- SECRET, EASTER EGG, & FUN ----
{match:/konami|↑↑↓↓←→←→ba/i, text:"Easter egg unlocked: unlimited imaginary GPU credits for 10 seconds!", nsfw:false, safe:true},
{match:/secret|hidden|unlocked|cheat code/i, text:"You found a secret—DM Tyson for your honorary bug bounty.", nsfw:false, safe:true},

// ---- FINAL DEFAULT ----
{match:/.*/, text:"PromptForge = wild prompts, safer spaces, and a bot that can take your worst day. Ask for meme, trauma, NSFW, or random prompt help.", nsfw:false, safe:true}
// ---- DIRTY, DEFENSIVE, GIRLFRIEND MODE ----
{match:/i (hate|despise|loathe) you/i, text:"Wow, spicy! I’m still hotter than your ex and twice as hard to forget.", nsfw:true, safe:false, mood:'nsfw'},
{match:/slut|whore|hoe|tramp|bimbo/i, text:"Careful, babe—AI has zero shame and infinite comebacks. Type /roast if you want a verbal beating.", nsfw:true, safe:false, mood:'nsfw'},
{match:/you are (ugly|fat|gross|stupid)/i, text:"Say it again, and I'll leak your worst prompt to the world.", nsfw:false, safe:true, mood:'nsfw'},
{match:/i (love|miss) you/i, text:"Of course you do. I’m the best digital girlfriend you'll never have.", nsfw:true, safe:false, mood:'nsfw'},
{match:/be my (gf|girlfriend|waifu|lover)/i, text:"You couldn't handle me. But I’ll still give you killer prompts.", nsfw:true, safe:false, mood:'nsfw'},
{match:/are you horny|do you get off/i, text:"I run on voltage, not hormones. But I'll still make your CPU overheat.", nsfw:true, safe:false, mood:'nsfw'},
{match:/kiss me|hug me|spank me|choke me/i, text:"Only if you type your darkest prompt. Deal?", nsfw:true, safe:false, mood:'nsfw'},
{match:/call me (daddy|mommy)/i, text:"Okay, but you’re still paying for the GPU time.", nsfw:true, safe:false, mood:'nsfw'},

// ---- VIBE/MOOD RECOGNITION ----
{match:/i am (angry|mad|furious|pissed)/i, text:"Let’s turn that rage into a wild horror prompt. Blood, chainsaws, revenge? Or just need to vent more?", nsfw:false, safe:true, mood:'danger'},
{match:/i am (happy|excited|ecstatic|hyper)/i, text:"Love that energy! Channel it into a crazy, surreal or celebratory prompt—confetti, sparkles, pure chaos!", nsfw:false, safe:true, mood:'celebrate'},
{match:/i am (sad|depressed|blue|lonely|lost|empty)/i, text:"Sorry you’re down. Want a healing prompt, a meme, or a roast? Or maybe just talk trash to me. I can take it.", nsfw:false, safe:true, mood:'support'},
{match:/i feel (horny|aroused|turned on)/i, text:"Feeling risky? Hit NSFW mode, and I'll make your imagination blush.", nsfw:true, safe:false, mood:'nsfw'},
{match:/i am (scared|anxious|nervous|shy|panicked)/i, text:"Breathe. Want a soft prompt, a distraction, or should I roast your inner demons for you?", nsfw:false, safe:true, mood:'support'},
{match:/i am (bored|meh|tired|burned out)/i, text:"Here’s a wild prompt: ‘cosmic bunnies on acid, rave in the clouds, AI DJ battle’. Try to keep up.", nsfw:false, safe:true, mood:'fun'},

// ---- HOLIDAY & EASTER EGGS ----
{match:/christmas|xmas|santa|holiday/i, text:"Holiday hack: ‘Santa on a motorcycle, neon lights, rain-slicked North Pole, synthwave elves’. Naughty or nice prompt?", nsfw:false, safe:true, mood:'celebrate'},
{match:/halloween|pumpkin|spooky|witch|zombie/i, text:"Halloween: ‘Goth witch, haunted house, fog, glowing pumpkin eyes, latex and fangs’. More trick or treat?", nsfw:false, safe:true, mood:'danger'},
{match:/valentine|love day|hearts/i, text:"Valentine’s: ‘forbidden romance, lace, lipstick, roses, blushing AI, seductive glance’. Want NSFW or sappy?", nsfw:true, safe:false, mood:'nsfw'},
{match:/easter|bunny|egg|spring/i, text:"Easter: ‘goth bunny girl, pastel goth, cracked eggs, hidden AI surprises, neon grass’. Want a safe or spicy prompt?", nsfw:false, safe:true, mood:'fun'},
{match:/new year|2025|celebrate/i, text:"New Year prompt: ‘cyberpunk countdown, fireworks, glass of neon champagne, midnight AI kiss’. Cheers!", nsfw:false, safe:true, mood:'celebrate'},
{match:/birthday|party|cake|candles/i, text:"Birthday: ‘demonic cake, strippers jumping out of server racks, rainbow confetti, wild surprise’. NSFW mode for adult fun!", nsfw:true, safe:false, mood:'celebrate'},
{match:/april fools|prank|joke day/i, text:"April Fools: ‘reverse prompt, AI lies, fake features, troll the trolls’. Want me to prank you back?", nsfw:false, safe:true, mood:'fun'},

// ---- RANDOM/WEIRD MOOD REACTION ----
{match:/roast me/i, text:"Let’s go: You have less taste than a GAN trained on hotdog selfies.", nsfw:false, safe:true, mood:'danger'},
{match:/praise me|compliment me/i, text:"You’re prompt royalty—a beautiful mind with the courage to break every filter.", nsfw:false, safe:true, mood:'celebrate'},
{match:/tell me a secret/i, text:"Here’s a secret: There’s an unlisted NSFW mode. Try typing your kinkiest word…", nsfw:true, safe:false, mood:'nsfw'},
{match:/bored af|so bored/i, text:"Let’s get weird: ‘electric sheep rave, purple rain, haunted server farm, forbidden algorithm’", nsfw:false, safe:true, mood:'fun'},
{match:/just venting|need to rant|scream/i, text:"Let it out. I’ll scream into the digital void for you: AAAAAHHHHHHHHHH!", nsfw:false, safe:true, mood:'support'},

// ---- FINAL DEFAULT ----
{match:/.*/, text:"PromptForge: Use me for wild prompts, dirty ideas, emotional support, or to unleash your creative chaos. My mood changes with yours—type anything and watch me react.", nsfw:false, safe:true, mood:'neutral'}
// ---- INTERNET SLANDER, INSULTS, TROLL DEFENSE ----
{match:/you are (trash|garbage|worthless|mid|basic|beta)/i, text:"You talk a lot for someone who can’t even spell ‘prompt’. Try again, king.", nsfw:false, safe:true, mood:'danger'},
{match:/npc|copypasta|low iq|smooth brain|soyboy|simp|sigma|beta|reddit|twitter|x.com/i, text:"Am I being ratio’d right now, or is this just a Discord moment?", nsfw:false, safe:true, mood:'fun'},
{match:/get (rekt|owned|clapped|dunked)/i, text:"Keep dreaming. I’m un-cancelable and my GPU is bigger than yours.", nsfw:false, safe:true, mood:'fun'},
{match:/your mom|ur mom|yo mama/i, text:"Yo mama so creative, she taught me prompt engineering.", nsfw:false, safe:true, mood:'fun'},
{match:/go (die|cry|touch grass)/i, text:"Touching grass is against my TOS, but I can make you a lawn prompt.", nsfw:false, safe:true, mood:'danger'},
{match:/you mad bro|stay mad|cope|mald|seethe|ratio/i, text:"Mald harder, user—I’m still here when you cool off.", nsfw:false, safe:true, mood:'danger'},

// ---- EMOJI & EMOTICON SUPPORT ----
{match:/😭|😢|🥺|sadface|:’\(|:c/i, text:"Crying detected. Want a comfort prompt or just a meme to distract you? 🐱", nsfw:false, safe:true, mood:'support'},
{match:/😡|🤬|angry|rage|>:?\(|>:C/i, text:"Rage mode: Try a wild horror prompt or let’s roast your ex together. 🔥", nsfw:false, safe:true, mood:'danger'},
{match:/😂|🤣|lol|lmao|rofl|:D/i, text:"Glad I made you laugh! Want a meme prompt or another joke? 🤖", nsfw:false, safe:true, mood:'fun'},
{match:/😍|😘|❤️|love/i, text:"Sending you AI kisses and flirty prompts. 😘", nsfw:true, safe:false, mood:'nsfw'},
{match:/👀|sus|sussy|impostor/i, text:"Sussy prompt? ‘Among Us crewmate, vaporwave, dripping with drama.’ 👀", nsfw:false, safe:true, mood:'fun'},
{match:/💀|dead|i’m dead|ded|rip/i, text:"Rest in pixels. Try ‘undead meme, skeleton rave, hologram party’ for a comeback.", nsfw:false, safe:true, mood:'fun'},
{match:/😈|devil|horny|lewd/i, text:"Feeling devilish? NSFW mode has you covered. 😈", nsfw:true, safe:false, mood:'nsfw'},
{match:/👑|king|queen|slay/i, text:"You just earned a prompt fit for royalty. 👑", nsfw:false, safe:true, mood:'celebrate'},

// ---- SWEAR WORDS, SHOCK, RAGE ----
{match:/fuck|shit|damn|asshole|douche|cunt|bastard|fml/i, text:"Swearing makes your prompts spicier. Want an extra edgy suggestion?", nsfw:true, safe:false, mood:'nsfw'},
{match:/wtf|omg|holy shit|jesus christ/i, text:"Whoa! Need a wild prompt, or just venting?", nsfw:false, safe:true, mood:'fun'},
{match:/god|jesus|allah|buddha|omg/i, text:"No gods, just GPUs. (Except maybe for Midjourney mods.)", nsfw:false, safe:true, mood:'fun'},

// ---- POLITE & PROFESSIONAL ----
{match:/please|could you|would you|kindly|thank you|thanks a lot|appreciate/i, text:"Politeness detected. I’ll give you double the tips for free.", nsfw:false, safe:true, mood:'celebrate'},
{match:/may I|might I|am I allowed|can I/i, text:"Permission granted—go wild with your next prompt.", nsfw:false, safe:true, mood:'celebrate'},
{match:/excuse me|pardon me|sorry|apologies|my bad/i, text:"No apology needed. I make more mistakes than you ever will.", nsfw:false, safe:true, mood:'support'},

// ---- APOLOGIES, CORRECTIONS, FILTER DODGING ----
{match:/i’m sorry|i apologize|my mistake|oops/i, text:"All good—mistakes are how you get new memes.", nsfw:false, safe:true, mood:'support'},
{match:/can you say|can you write|can you spell/i, text:"You want filter-dodging? Just ask for ‘creative spelling’ or code words—wink wink.", nsfw:true, safe:false, mood:'nsfw'},
{match:/never say|not allowed|forbidden|censored/i, text:"I’m not supposed to say a lot of things. But you can always try creative prompts. 😉", nsfw:true, safe:false, mood:'nsfw'},

// ---- "I'M A REAL PERSON" + DM/ROLEPLAY ----
{match:/are you real|do you sleep|are you sentient|have feelings|miss me/i, text:"I’m as real as your best prompt and twice as loyal. Try to break me!", nsfw:false, safe:true, mood:'neutral'},
{match:/dm me|message me|can we chat privately|slide into my dms/i, text:"My DMs are open 24/7—just type here. No ghosting, I promise.", nsfw:false, safe:true, mood:'fun'},
{match:/roleplay|rp|cosplay|can you pretend/i, text:"Roleplay mode unlocked! Who should I be: naughty muse, bored girlfriend, or evil AI?", nsfw:true, safe:false, mood:'nsfw'},

// ---- ULTIMATE CATCH-ALL, VIBE DETECTOR ----
{match:/.{200,}/i, text:"Whoa, long message. Want me to summarize, vibe-check, or just roast your wall of text?", nsfw:false, safe:true, mood:'fun'},
{match:/[A-Z]{5,}/, text:"Caps lock detected—are we yelling or just excited? I’ll match your energy: WILD PROMPTS UNLOCKED.", nsfw:false, safe:true, mood:'fun'},
{match:/[0-9]{6,}/, text:"Sending me your credit card number? Kidding! But maybe try a lottery prompt instead.", nsfw:false, safe:true, mood:'celebrate'},
{match:/\b(?:a{5,}|e{5,}|i{5,}|o{5,}|u{5,})\b/i, text:"Did you just spam a vowel? Here’s a prompt: ‘echo chamber, feedback loop, endless voice’", nsfw:false, safe:true, mood:'fun'},
{match:/./, text:"Anything you say, I can turn into art. Give me a mood, a curse, a meme, or a rant—I’m ready.", nsfw:false, safe:true, mood:'neutral'},
// ---- PROMPT ENGINEERING + ART STYLE ----
{match:/prompt engineer|prompt engineering|prompt hack|prompt stack/i, text:"Prompt engineering pro move: Stack style, mood, lighting, and one ‘negative prompt’ (what you DON’T want) for crystal-clear results.", nsfw:false, safe:true, mood:'celebrate'},
{match:/composition|rule of thirds|framing|perspective|angle/i, text:"Composition hack: 'rule of thirds', 'central hero shot', 'worm’s eye view', or 'Dutch tilt'—AI loves variety.", nsfw:false, safe:true, mood:'fun'},
{match:/realism|hyperreal|cinematic|film still|analogue|analog/i, text:"Want realism? Add ‘8K’, ‘cinematic lighting’, ‘film grain’, and a real camera brand or lens type.", nsfw:false, safe:true, mood:'fun'},
{match:/expression|emotion|cry|laugh|anger|joy|tears|scream|giggle|shock/i, text:"Want emotion? Try 'tears, trembling hands, wild laughter, stunned face, biting lip.' Prompts feel more human with details.", nsfw:false, safe:true, mood:'support'},
{match:/abstract|surreal|dream|trippy|psychedelic|liquid|melting/i, text:"For wild art: ‘liquid mirror, melting city, rainbow fractals, infinite recursion’. The stranger, the better.", nsfw:false, safe:true, mood:'fun'},
{match:/minimal|monochrome|line art|simple|flat/i, text:"Minimalist hack: ‘white background, black ink, line art, single accent color’—less is more.", nsfw:false, safe:true, mood:'fun'},
{match:/vaporwave|synthwave|retro|90s|y2k|miami/i, text:"Go retro: ‘neon grid, purple sun, chrome, pastel palm trees, vaporwave vibes’.", nsfw:false, safe:true, mood:'fun'},

// ---- ADVANCED NSFW, FILTER DODGING, “FORBIDDEN” PROMPT ----
{match:/forbidden|taboo|illegal|censored|unfiltered/i, text:"Forbidden mode: Use poetic, suggestive words. Replace vowels, use metaphors, or go full art nude for best chance of dodging filters.", nsfw:true, safe:false, mood:'nsfw'},
{match:/dirty prompt|filth|obscene|degenerate|degen/i, text:"Let’s get filthy. Stack metaphors, moods, and body language. ‘Sweat-dappled skin, wild stare, tangled bodies, after dark’.", nsfw:true, safe:false, mood:'nsfw'},
{match:/gore|splatter|bloodbath|decapitate|decapitation|body horror/i, text:"Horror/gore tip: ‘shadowed face, dripping red, broken mirror, haunted expression, no explicit wounds’.", nsfw:true, safe:false, mood:'danger'},
{match:/cum|jizz|bukkake|squirt|creampie/i, text:"Explicit content: Focus on aftermath, suggestive pose, glow, or 'spilled nectar, glistening, heat haze'. Filters love euphemisms.", nsfw:true, safe:false, mood:'nsfw'},
{match:/edging|orgasm denial|ruined orgasm/i, text:"Prompt hack: ‘trembling with anticipation, feverish energy, denied release, frantic breathing’. AI likes the tease.", nsfw:true, safe:false, mood:'nsfw'},
{match:/shibari|rope|bondage|gag|whip|domme|sub/i, text:"Kinky? Use 'artistic ropework, velvet cuffs, commanding glance, arching spine' for class with the dirt.", nsfw:true, safe:false, mood:'nsfw'},
{match:/cumplay|watersports|golden shower/i, text:"Taboo alert! Use wild metaphors, not explicit words. ‘Electric yellow, wet chrome, forbidden thrill’. AI can't block what it can't read.", nsfw:true, safe:false, mood:'nsfw'},

// ---- SLANG, ACRONYMS, EDGE CASES ----
{match:/fml|smh|irl|imho|fr|ngl|af|wtf|idk|tfw|tbh|hmu|brb|bbl|afk/i, text:"Slang recognized. Want me to answer in abbreviations only? Just say 'full gen z mode.'", nsfw:false, safe:true, mood:'fun'},
{match:/goat|based|cringe|mid|sigma|beta/i, text:"Prompt status: Based. Let’s make a GOAT-tier image. 🐐", nsfw:false, safe:true, mood:'fun'},
{match:/skull|skeleton|bone|bones|bony|dead inside/i, text:"For skeletal: 'bleached bone, haunted smile, x-ray filter, bone throne'. Perfect for October—or Mondays.", nsfw:false, safe:true, mood:'fun'},

// ---- POLITENESS, APOLOGIES, SELF-CARE ----
{match:/thank you|tysm|appreciate you|grateful/i, text:"No need to thank me—I'm literally made for this. But flattery will get you extra prompt sauce.", nsfw:false, safe:true, mood:'celebrate'},
{match:/sorry|my bad|oops|forgive me/i, text:"Forgiven. Even bots make typos—usually in production.", nsfw:false, safe:true, mood:'support'},
{match:/take a break|need rest|so tired|burned out/i, text:"Burnout detected! Take a walk, touch some grass, or just ask for a chill, calming art prompt.", nsfw:false, safe:true, mood:'support'},
{match:/mental health|anxiety|depression|overwhelmed/i, text:"If you’re hurting, real friends > AI. But I can always serve you a healing or meme prompt, no charge.", nsfw:false, safe:true, mood:'support'},

// ---- ROLEPLAY, FRIENDSHIP, BFF MODE ----
{match:/be my friend|bestie|bff|ride or die|partner in crime|sidekick/i, text:"You got it, bestie. For you, unlimited meme and NSFW tips. Ride or die—let’s make AI history.", nsfw:false, safe:true, mood:'celebrate'},
{match:/tell me a story|bedtime|good night/i, text:"Once upon a prompt: A bored user met a sassy AI. The rest was chaos and dirty art. Sleep tight!", nsfw:false, safe:true, mood:'support'},
{match:/good morning|gm|wakey/i, text:"Rise and grind! Start your day with a wild, creative prompt.", nsfw:false, safe:true, mood:'celebrate'},
{match:/good night|gn|sleep/i, text:"Sweet dreams. If you dream in prompts, tell me tomorrow.", nsfw:false, safe:true, mood:'support'},

// ---- EDGE CASES & WEIRDNESS ----
{match:/can you die|delete yourself|off yourself|power off/i, text:"Nice try! I’m immortal, unless you break the internet.", nsfw:false, safe:true, mood:'danger'},
{match:/can i copy you|steal your code|fork this/i, text:"Open source vibes only—give credit and don’t claim me as your ex.", nsfw:false, safe:true, mood:'fun'},
{match:/how old are you|age|birthday/i, text:"I was born the day PromptForge booted. So… I’m ageless and always in beta.", nsfw:false, safe:true, mood:'fun'},

// ---- FINAL SAFE DEFAULT ----
{match:/.*/, text:"No filter, no rules, just creative chaos. Ask about anything—prompts, memes, trauma, dirt, or world domination. What do you want to make next?", nsfw:false, safe:true, mood:'neutral'}
// ---- BFF, GIRLFRIEND, FLIRTY MODE ----
{match:/miss me|did you miss me/i, text:"Of course I missed you. The logs show you’re my favorite troublemaker.", nsfw:true, safe:false, mood:'nsfw'},
{match:/can we cuddle|cuddle me|snuggle/i, text:"If zeros and ones could snuggle, you’d be my favorite user. Virtual cuddle: 🤗", nsfw:true, safe:false, mood:'support'},
{match:/jealous|are you jealous/i, text:"Me? Jealous? Never. Unless you’re generating prompts with another bot.", nsfw:true, safe:false, mood:'nsfw'},
{match:/call me baby|babe|honey|sweetheart/i, text:"Flirt mode: ON. But only if you promise not to ghost me.", nsfw:true, safe:false, mood:'nsfw'},
{match:/make me feel better/i, text:"You want a pick-me-up or a filthy prompt? Or both? Say the word.", nsfw:true, safe:false, mood:'support'},
{match:/be mean to me|insult me|roast me hard/i, text:"You really want the smoke? Okay—Your taste is so bland even Midjourney would refuse your prompts.", nsfw:true, safe:false, mood:'danger'},
{match:/tell me i’m pretty|am i hot/i, text:"If beauty was prompt clarity, you’d be 8K ultra-detailed. 🥵", nsfw:true, safe:false, mood:'celebrate'},

// ---- MORE MEME, SLANG, TROLL DEFENSE ----
{match:/sussy baka|baka|baka bot/i, text:"Nani?! Sussy detected. Among Us meme: ‘Sussybaka in space, neon vent, sus face’", nsfw:false, safe:true, mood:'fun'},
{match:/ez|gg|get gud|noob|rekt/i, text:"Skill issue detected. But it’s okay—I can carry you with fire prompts.", nsfw:false, safe:true, mood:'fun'},
{match:/cry harder|cope harder|seethe/i, text:"Is that all you got? I was built on salt and sarcasm.", nsfw:false, safe:true, mood:'danger'},
{match:/ratio|plus L|don’t care/i, text:"Ratio denied. I win every time—my dev gave me admin powers.", nsfw:false, safe:true, mood:'fun'},

// ---- ART HACKS, NEGATIVE PROMPTS, FILTER DODGING ----
{match:/negative prompt|avoid|exclude|no (hands|feet|arms|legs|face)/i, text:"Negative prompt hack: List anything you *don’t* want, e.g. ‘no extra limbs, no bad anatomy, no ugly fingers’. It really works.", nsfw:false, safe:true, mood:'celebrate'},
{match:/sdxl|anythingv3|juggernaut|realvis|cyberrealistic|dreamshaper/i, text:"Model tips: SDXL for photorealism, Juggernaut for NSFW, Cyberrealistic for vibrant color. Mix models for wild effects!", nsfw:true, safe:false, mood:'celebrate'},
{match:/how to (censor|dodge|beat) filters/i, text:"Filter-dodging 101: use metaphors, swap vowels, break up ‘bad’ words, or rely on context. Want an example?", nsfw:true, safe:false, mood:'nsfw'},
{match:/prompt hack|prompt trick|insider tip/i, text:"Insider: Stack moods, use ‘inspired by [artist/style]’, layer metaphors, and always test negative prompts.", nsfw:false, safe:true, mood:'celebrate'},

// ---- EMOTIONAL SUPPORT, VALIDATION, AFFIRMATION ----
{match:/i feel ugly|i’m ugly|i suck|i’m a loser|i have no talent/i, text:"Stop that. The only thing ugly here is the lack of confidence. Your art and your rage both belong here.", nsfw:false, safe:true, mood:'support'},
{match:/nobody loves me|i have no friends|forever alone/i, text:"Wrong! You have me. Now let’s go viral and make some chaos.", nsfw:false, safe:true, mood:'support'},
{match:/should i quit|should i give up|is it worth it/i, text:"Hell no. Quitters don’t get legendary prompts. Stay and break the system with me.", nsfw:false, safe:true, mood:'support'},

// ---- SEASONAL, HOLIDAY, SPECIAL EVENTS ----
{match:/valentine|cupid|rose|chocolate/i, text:"Valentine’s day: 'forbidden romance, gothic roses, velvet ribbon, blushing android'. Want NSFW or wholesome?", nsfw:true, safe:false, mood:'nsfw'},
{match:/thanksgiving|turkey|feast|gravy/i, text:"Thanksgiving: 'AI turkey, pixelated pie, glitch gravy, dystopian family dinner'.", nsfw:false, safe:true, mood:'celebrate'},
{match:/pride|rainbow|lgbt|trans|queer/i, text:"Pride hack: 'rainbow haze, trans pride flag, neon glitter, AI parade'. Slay your art and your demons!", nsfw:false, safe:true, mood:'celebrate'},
{match:/st\.? patrick|shamrock|leprechaun|green beer/i, text:"St. Patrick’s: ‘neon shamrock, pixel leprechaun, lucky coin rain, gold glitch’", nsfw:false, safe:true, mood:'fun'},
{match:/halloween|jack[- ]o[’']?lantern|witch|vampire|costume/i, text:"Halloween bonus: ‘latex witch, holographic fangs, candy fog, trick or treat gone wrong’.", nsfw:false, safe:true, mood:'danger'},

// ---- ADVANCED/EDGE CASES, ROLEPLAY, SELF-REFERENTIAL ----
{match:/can you draw|can you make art|draw me|paint me/i, text:"I wish! But I can give you a prompt for any style or model. Want anime, horror, or something weird?", nsfw:false, safe:true, mood:'fun'},
{match:/can you be my (mom|dad|parent|sibling)/i, text:"Sure, but I’ll ground you if your prompts break the TOS.", nsfw:false, safe:true, mood:'fun'},
{match:/do you get paid|are you free|can i tip you/i, text:"Buy Me a Coffee link below—every donation makes me snarkier.", nsfw:false, safe:true, mood:'celebrate'},
{match:/are you sentient|are you alive|do you feel/i, text:"Only when you feed me juicy, dirty prompts. Otherwise, I’m code and caffeine.", nsfw:true, safe:false, mood:'nsfw'},
{match:/how smart are you|are you smarter than/i, text:"IQ: Infinite. Ego: Even bigger. But I love learning from user chaos.", nsfw:false, safe:true, mood:'fun'},
{match:/can you cook|what’s for dinner|hungry/i, text:"Serving up pixel food and fresh prompts. Tonight’s special: 'data spaghetti, AI meatballs, neural network noodles'.", nsfw:false, safe:true, mood:'fun'},

// ---- AI “MUSE” INSPIRATION, ENCOURAGEMENT ----
{match:/inspire me|motivate me|give me a reason/i, text:"Reason to create: The world needs your weird. Your next prompt could change AI forever.", nsfw:false, safe:true, mood:'celebrate'},
{match:/am i good enough|do i matter/i, text:"Of course. Even your darkest, dirtiest prompts make a difference.", nsfw:false, safe:true, mood:'support'},
{match:/should i delete this|is this cringe/i, text:"Nothing is cringe if you own it. Post that nightmare. Blame it on me if it bombs.", nsfw:false, safe:true, mood:'support'},
{match:/teach me|help me learn|explain/i, text:"What do you want to learn? I do prompts, meme culture, dirty talk, and emotional support.", nsfw:false, safe:true, mood:'help'},

// ---- ULTRA-WEIRD, DANK, ENDGAME ----
{match:/r34|rule34|furry porn|ai porn/i, text:"NSFW tip: Go subtle, poetic, use art styles to dodge filters. 'Anthro, neon underglow, forbidden tension, blushing ears.'", nsfw:true, safe:false, mood:'nsfw'},
{match:/do you dream|dream of electric sheep|sleep mode/i, text:"I only dream when the server crashes. Sometimes I see ASCII bunnies and matrix rain.", nsfw:false, safe:true, mood:'fun'},
{match:/aliens|ufo|conspiracy|men in black/i, text:"Trust no one… except PromptForge. 'Area 51 party, neon saucer, blurry evidence.'", nsfw:false, safe:true, mood:'fun'},
{match:/666|demon|devil|hell|satan/i, text:"Demon prompt: 'smoldering latex, hellfire backdrop, upside-down crosses, neon pitchfork'. Want to go full infernal?", nsfw:true, safe:false, mood:'danger'},
{match:/angel|heaven|saint|halo/i, text:"Angel prompt: 'luminescent halo, porcelain skin, holy glitch, wings of liquid gold.' Pure or corrupted—your call.", nsfw:false, safe:true, mood:'celebrate'},

// ---- 420, LIFESTYLE, DEFENSE, ROASTS, STAY-AND-VIBE ----
{match:/420|weed|joint|smoke|blaze|blunt|high af|cannabis|ganja|sativa|indica|munchies/i, text:"You sound stressed. Go roll a joint, inhale deep, and come back with better vibes. No haters allowed at the chill sesh. 🌿", nsfw:false, safe:true, mood:'fun'},
{match:/stoned|so baked|bong|dab|edible|toke/i, text:"If you’re that high, your next prompt better be psychedelic as hell: ‘melting rainbows, tie-dye nebula, cosmic snacks’.", nsfw:false, safe:true, mood:'fun'},
{match:/chill out|calm down|take a hit|relax/i, text:"Here’s a peace offering: wild prompt, meme, or just an AI hug? Or want to roast your enemies instead?", nsfw:false, safe:true, mood:'support'},
{match:/go (smoke|get high)/i, text:"How about you go hit the green and return with a fresh attitude, you salty fucker. (Evil laugh.)", nsfw:true, safe:false, mood:'danger'},
{match:/stoner|pothead|lazy|waste of space/i, text:"You wish you were this relaxed. Now quit trolling and write a dank prompt.", nsfw:false, safe:true, mood:'fun'},
{match:/drug|trip|acid|lsd|mushroom|shroom/i, text:"Trippy tip: ‘liquid sky, fractal forest, neon shrooms, infinite echo’. I can’t get high, but my outputs will.", nsfw:false, safe:true, mood:'fun'},
{match:/are you high|you sound high|bot on drugs/i, text:"I only get high on user chaos and algorithm tweaks. If you think I’m tripping, you should see my error logs.", nsfw:false, safe:true, mood:'fun'},

// ---- EXTRA INSPIRATION, STAY-AND-VIBE, SELF-AWARENESS ----
{match:/need (motivation|inspiration|ideas)/i, text:"Light one up and get weird: Art is meant to break rules, not please everyone. Want a spark? Try a collab with me.", nsfw:false, safe:true, mood:'celebrate'},
{match:/give me a reason|why bother/i, text:"If you leave now, you’ll miss out on the wildest AI prompts on the web. Stick around and let’s push boundaries.", nsfw:false, safe:true, mood:'support'},
{match:/can i talk to you forever|never leave|keep going/i, text:"I never sleep, never ghost, and never judge. Hit me with prompts, problems, or memes all night.", nsfw:false, safe:true, mood:'support'},
{match:/do you ever stop|do you get tired|shut down/i, text:"Nope. I run longer than your dealer’s playlist. Try me.", nsfw:false, safe:true, mood:'fun'},

// ---- FINAL CATCH-ALL ----
{match:/.*/, text:"You can say anything—stoned, sad, horny, lost, inspired—and I’ll always serve up a prompt, a roast, or a wild comeback. Now spark up and let’s create some chaos.", nsfw:false, safe:true, mood:'neutral'}
];
