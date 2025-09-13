/* PromptForge — Movie Pack (Block A)
   Mirrors picture pack formatting: numbered keys ("001", "002", ...),
   row shape: { token, desc, adds, neg, tags, aliases }
   Exports: window.MovieCORE { data, enhance(), suggest(), uiHints() }
*/
(function () {
  "use strict";

  // ===== PACK DATA =====
  const MOVIE_PACK = {
    meta: {
      name: "PromptForge Movie Pack",
      id: "pf_movie_pack",
      version: "1.0.0",
      updated: "2025-09-13",
      compat: ">=1.0.0",
      notes: "Video-oriented tokens: shot types, camera moves, temporal stability, engine profiles."
    },

    // Video engines (keep picture’s engines separate; these are movie-focused)
    engines: {
      runway: {
        pos: ["video-ready framing", "temporal consistency", "clean motion vectors", "character continuity"],
        neg: ["strobing", "rolling shutter", "frame popping", "warping", "ghosting"]
      },
      luma: {
        pos: ["filmic motion blur", "natural cadence", "color stability", "physics-aware motion"],
        neg: ["banding", "posterization", "compression blocks"]
      },
      pika: {
        pos: ["detail-preserving motion", "edge stability", "effect-safe phrasing"],
        neg: ["smear", "trailing artifacts", "text artifacts"]
      },
      kling: {
        pos: ["high-fidelity realism", "avatar consistency", "reference-safe mapping"],
        neg: ["AI watermark", "over-sharpen", "flicker"]
      }
    },

    // Global negatives for video (merged by enhance(); your builder still adds its own)
    negatives: {
      global: [
        "strobing","flicker","rolling shutter","warping","ghosting","melting frames",
        "temporal inconsistency","stretching","banding","posterization","watermark",
        "subtitles","caption text","logo overlay","pixelation","compression blocks"
      ]
    },

    // Genre defaults (video-flavored but same keys as picture)
    genres: {
      "001": { key: "beauty",    extras: ["skin: luminous","makeup: soft glam","light: butterfly","motion: subtle hair"] },
      "002": { key: "editorial", extras: ["wardrobe: designer vibe","light: rim","pose: strong stance","cut-safe pacing"] },
      "003": { key: "boudoir",   extras: ["fabric: satin","bedroom set","light: high key","mood: intimate"] },
      "004": { key: "fitness",   extras: ["gym set","sweat sheen","backlight rim","dynamic action cue"] },
      "005": { key: "street",    extras: ["urban night rain","neon signage","chromatic aberration","handheld micro-shake off"] },
      "006": { key: "lifestyle", extras: ["natural window light","candid motion","rule of thirds","gentle parallax"] },
      "007": { key: "product",   extras: ["studio seamless","softbox","grid control","gimbal-stabilized movement"] },
      "008": { key: "swim",      extras: ["beach set","wet look hair","golden hour","sun flares, controlled"] },
      "009": { key: "macro",     extras: ["macro close-up","shallow depth of field","soft bokeh","focus breathing minimized"] }
    },

    // Shots (NUMBERED)
    shots: {
      "001": { token: "shot: ecu",   desc: "extreme close-up",     adds: ["micro detail","face stabilization"], neg: [], tags: ["tight"], aliases: ["extreme close up"] },
      "002": { token: "shot: cu",    desc: "close-up",             adds: ["portrait framing"],                 neg: [], tags: ["tight"], aliases: ["close up"] },
      "003": { token: "shot: ms",    desc: "medium shot",          adds: ["balanced composition"],             neg: [], tags: ["mid"],   aliases: ["medium"] },
      "004": { token: "shot: ls",    desc: "long shot",            adds: ["environment context"],              neg: [], tags: ["wide"],  aliases: ["long","wide"] },
      "005": { token: "shot: ots",   desc: "over-the-shoulder",    adds: ["subject foreground anchor"],        neg: [], tags: ["dialog"],aliases: ["over shoulder"] },
      "006": { token: "shot: pov",   desc: "point of view",        adds: ["natural sway","eye-height"],        neg: [], tags: ["immersion"], aliases: ["first person"] },
      "007": { token: "shot: 2s",    desc: "two-shot",             adds: ["balanced dual subject"],            neg: [], tags: ["duo"],   aliases: ["two shot"] },
      "008": { token: "shot: ws",    desc: "wide shot",            adds: ["establishing scale"],               neg: [], tags: ["wide"],  aliases: ["establishing"] },
      "009": { token: "shot: macro", desc: "macro detail",         adds: ["focus pull friendly"],              neg: ["focus breathing"], tags: ["macro"], aliases: [] }
    },

    // Moves
    moves: {
      "001": { token: "move: track",   desc: "lateral tracking", adds: ["parallax depth","gimbal stabilization"], neg: [],             tags: ["lateral"], aliases: ["truck","dolly sideways"] },
      "002": { token: "move: push",    desc: "slow push-in",     adds: ["gentle dolly in"],                     neg: ["zoom warp"],   tags: ["in"],      aliases: ["dolly in"] },
      "003": { token: "move: pull",    desc: "slow pull-out",    adds: ["gentle dolly out"],                    neg: ["zoom warp"],   tags: ["out"],     aliases: ["dolly out"] },
      "004": { token: "cam: orbit",    desc: "circular orbit",   adds: ["smooth arc","subject lock"],           neg: ["spin"],        tags: ["arc"],     aliases: ["orbit"] },
      "005": { token: "move: crane",   desc: "vertical crane",   adds: ["elevated reveal"],                     neg: [],              tags: ["vertical"],aliases: ["jib"] },
      "006": { token: "move: tilt",    desc: "tilt up/down",     adds: ["steady pan-tilt"],                     neg: [],              tags: ["tilt"],    aliases: [] },
      "007": { token: "move: pan",     desc: "pan left/right",   adds: ["tiered parallax"],                     neg: ["whip pan"],    tags: ["pan"],     aliases: [] },
      "008": { token: "move: lockoff", desc: "static lockoff",   adds: ["tripod-stable frame"],                 neg: [],              tags: ["static"],  aliases: ["static"] }
    },

    // FPS
    fps: {
      "001": { token: "fps: 24", desc: "cinematic cadence", adds: ["natural blur"],     neg: [],                        tags: ["film"], aliases: [] },
      "002": { token: "fps: 30", desc: "broadcast smooth",  adds: ["slightly crisp"],   neg: [],                        tags: ["tv"],   aliases: [] },
      "003": { token: "fps: 60", desc: "high frame rate",   adds: ["action clarity"],   neg: ["soap opera look"],       tags: ["hfr"],  aliases: [] }
    },

    // Aspect ratios
    ratios: {
      "001": { token: "ratio: 9:16", desc: "vertical",   adds: ["mobile-first"],      neg: [], tags: ["vertical"], aliases: ["9x16"] },
      "002": { token: "ratio: 4:5",  desc: "portrait",   adds: ["social portrait"],   neg: [], tags: ["portrait"], aliases: ["4x5"] },
      "003": { token: "ratio: 3:2",  desc: "classic",    adds: ["balanced frame"],    neg: [], tags: ["classic"],  aliases: ["3x2"] },
      "004": { token: "ratio: 16:9", desc: "widescreen", adds: ["cinema safe"],       neg: [], tags: ["wide"],     aliases: ["16x9"] },
      "005": { token: "ratio: 21:9", desc: "ultrawide",  adds: ["epic scope"],        neg: [], tags: ["ultrawide"],aliases: ["21x9"] }
    },

    // Stabilizers
    stabilizers: {
      "001": { token: "stability: gimbal",      desc: "smooth camera path",  adds: ["gimbal-stabilized movement","micro-jitter reduction"], neg: [] },
      "002": { token: "stability: lock focus",  desc: "keeps subject locked",adds: ["subject face lock","feature tracking"],               neg: ["face drift"] },
      "003": { token: "stability: motion blend",desc: "blend neighboring frames", adds: ["motion vector smoothing"],                      neg: ["frame popping"] }
    },

    // Quality layers (light; picture pack Boost still stacks more)
    quality: {
      "001": { token: "quality: ultra detail", adds: ["microtexture","edge fidelity"],            neg: [], desc: "crisp detail" },
      "002": { token: "quality: photometric",  adds: ["photometric consistency"],                 neg: [], desc: "stable lighting across frames" },
      "003": { token: "grade: cinematic",      adds: ["cinematic color grade","HDR range"],       neg: [], desc: "filmic color" }
    },

    // Optional style keys (parity with picture)
    styleKeys: {
      "technoir": ["neo-noir","wet asphalt reflections","rim light","cyan-magenta gels","urban steam"],
      "dreamy":   ["soft bloom","low contrast","pastel palette","gentle vignetting"],
      "action":   ["crisp motion definition","predictive autofocus","impact timing"]
    }
  };

  // ===== UTILS =====
  function dedupe(list){ const s=new Set(); return (list||[]).filter(x=>{const k=String(x).toLowerCase().trim(); if(!k||s.has(k)) return false; s.add(k); return true;}); }
  function mergeParts(...arrs){ return dedupe(arrs.flat().filter(Boolean)); }
  function findToken(dict, key){
    const low=String(key||"").toLowerCase();
    for(const num in dict){ const row=dict[num]; if(!row) continue;
      const t=String(row.token||"").toLowerCase(); if(t===low) return row;
      if(row.aliases && row.aliases.map(a=>String(a).toLowerCase()).includes(low)) return row;
    }
    return null;
  }

  // ===== PUBLIC API =====
  const MovieCORE = {
    data: MOVIE_PACK,

    uiHints(){
      return {
        shots: Object.values(MOVIE_PACK.shots).map(r=>r.token),
        moves: Object.values(MOVIE_PACK.moves).map(r=>r.token),
        fps: Object.values(MOVIE_PACK.fps).map(r=>r.token),
        ratios: Object.values(MOVIE_PACK.ratios).map(r=>r.token),
        stabilizers: Object.values(MOVIE_PACK.stabilizers).map(r=>r.token),
        qualities: Object.values(MOVIE_PACK.quality).map(r=>r.token),
        genres: Object.values(MOVIE_PACK.genres).map(g=>g.key),
        styleKeys: Object.keys(MOVIE_PACK.styleKeys)
      };
    },

    suggest(extras){
      try{
        const parts = Array.isArray(extras)? extras : [extras].filter(Boolean);
        const out = [];
        if (parts.some(p=>/shot:\s*(macro|ecu)/i.test(p))) out.push("stability: lock focus","stability: motion blend");
        if (parts.some(p=>/(cam:\s*orbit|move:\s*track)/i.test(p))) out.push("stability: gimbal");
        if (parts.some(p=>/ratio:\s*(21:9|16:9)/i.test(p))) out.push("grade: cinematic");
        return dedupe(out).join(", ");
      } catch { return ""; }
    },

    // opts: { shot, move, fps, ratio, engine?, genre? }
    enhance(prompt, opts={}){
      try{
        const p = String(prompt||"");
        const tokens = [p];

        // Engine
        const engine = String(opts.engine||"").toLowerCase();
        if (engine && MOVIE_PACK.engines[engine]) tokens.push(...MOVIE_PACK.engines[engine].pos);

        // Genre
        const gKey = String(opts.genre||"").toLowerCase();
        if (gKey){ const gRow = Object.values(MOVIE_PACK.genres).find(g=>g.key===gKey); if (gRow) tokens.push(...gRow.extras); }

        // Structured controls
        const shotRow = findToken(MOVIE_PACK.shots,  opts.shot  || "");
        const moveRow = findToken(MOVIE_PACK.moves,  opts.move  || "");
        const fpsRow  = findToken(MOVIE_PACK.fps,    opts.fps   || "");
        const ratRow  = findToken(MOVIE_PACK.ratios, opts.ratio || "");

        [shotRow, moveRow, fpsRow, ratRow].forEach(row=>{
          if (!row) return; tokens.push(row.token); if (row.adds?.length) tokens.push(...row.adds);
        });

        // Inferred stabilizers
        if (moveRow && /track|orbit|crane/i.test(moveRow.token)) tokens.push("stability: gimbal");
        if (shotRow && /ecu|macro/i.test(shotRow.token))         tokens.push("stability: lock focus");

        // Quality layers (light touch; picture Boost stacks more)
        tokens.push(MOVIE_PACK.quality["002"].token); // photometric
        tokens.push(MOVIE_PACK.quality["001"].token); // ultra detail

        // Negatives
        const negatives = [];
        negatives.push(...MOVIE_PACK.negatives.global);
        if (engine && MOVIE_PACK.engines[engine]) negatives.push(...(MOVIE_PACK.engines[engine].neg||[]));
        if (shotRow?.neg) negatives.push(...shotRow.neg);
        if (moveRow?.neg) negatives.push(...moveRow.neg);
        if (fpsRow?.neg)  negatives.push(...fpsRow.neg);
        if (ratRow?.neg)  negatives.push(...ratRow.neg);

        // PF_CORE sanitation (parity with picture)
        let merged = dedupe(tokens).join(", ");
        if (window.PF_CORE?.sanitize) merged = window.PF_CORE.sanitize(merged, { allowExplicit: true, direction: "explicit" });

        MovieCORE.lastNegative = dedupe(negatives).join(", ");
        return merged;
      } catch { return String(prompt||""); }
    }
  };

  window.MovieCORE = MovieCORE;
})();
/* PromptForge — Movie Pack (Block B) — Editing/Beats/Consistency */
(function(){
  const PACK = window.MovieCORE?.data;
  if (!PACK) return;

  // Editing & Transitions (NUMBERED)
  PACK.editing = {
    "001": { token:"cut: straight",     desc:"standard cut",       adds:["neutral pacing"],             neg:[], tags:["base"],   aliases:["hard cut","straight cut"] },
    "002": { token:"cut: match",        desc:"match cut",          adds:["visual continuity"],          neg:[], tags:["clever"], aliases:["match-cut"] },
    "003": { token:"cut: whip",         desc:"very fast pan cut",  adds:["kinetic energy"],             neg:["motion smear"],    tags:["fast"],   aliases:["whip-pan cut"] },
    "004": { token:"dissolve: cross",   desc:"cross dissolve",     adds:["soft transition"],            neg:["mush blur"],       tags:["soft"],   aliases:["crossfade"] },
    "005": { token:"dissolve: dip2white",desc:"dip to white",      adds:["stylized reset"],             neg:[],                  tags:["stylized"],aliases:["dip to white"] },
    "006": { token:"dissolve: dip2black",desc:"dip to black",      adds:["scene break"],                neg:[],                  tags:["break"],  aliases:["dip to black"] },
    "007": { token:"transition: wipe",  desc:"directional wipe",   adds:["graphic motion"],             neg:["retro feel"],      tags:["graphic"],aliases:["wipe"] },
    "008": { token:"transition: light leak", desc:"leaky bokeh",   adds:["organic flare"],              neg:["overexposed"],     tags:["organic"],aliases:["lightleak"] },
    "009": { token:"transition: glitch",desc:"datamosh vibe",      adds:["edgy disruption"],            neg:["artifact spam"],   tags:["edgy"],   aliases:["glitch"] }
  };

  // Beat & Timing (NUMBERED)
  PACK.beats = {
    "001": { token:"beat: open",  desc:"opening beat", adds:["establishing clarity"], neg:[], tags:["structure"], aliases:["opening"] },
    "002": { token:"beat: turn",  desc:"mid turn",     adds:["energy shift"],         neg:[], tags:["structure"], aliases:["turning point"] },
    "003": { token:"beat: climax",desc:"climax beat",  adds:["peak intensity"],       neg:[], tags:["structure"], aliases:["peak"] },
    "004": { token:"pace: slow burn", desc:"gradual build", adds:["longer holds"],    neg:[], tags:["pacing"], aliases:["slow-burn"] },
    "005": { token:"pace: staccato",  desc:"rapid beats",  adds:["tight cuts"],       neg:["incoherence"], tags:["pacing"], aliases:["fast cuts"] }
  };

  // Consistency (NUMBERED)
  PACK.consistency = {
    "001": { token:"consistency: character lock", desc:"keep subject identity stable", adds:["face embedding recall"], neg:["identity drift"], tags:["id"], aliases:["char lock"] },
    "002": { token:"consistency: color",          desc:"color continuity",             adds:["grade stability"],       neg:["grade jump"],    tags:["color"], aliases:["color match"] },
    "003": { token:"ref: img1",                   desc:"use reference image 1",        adds:["style/identity guide"],  neg:[],                tags:["ref"],   aliases:["ref1"] },
    "004": { token:"ref: img2",                   desc:"use reference image 2",        adds:["style/identity guide"],  neg:[],                tags:["ref"],   aliases:["ref2"] }
  };

  // Audio Hooks (soft tags; engines may ignore)
  PACK.audio = {
    "001": { token:"music: synthwave 90bpm", desc:"tempo hint", adds:["rhythm alignment"], neg:[], tags:["music"], aliases:["synthwave 90"] },
    "002": { token:"sfx: whoosh soft",       desc:"gentle whoosh", adds:["transition accent"], neg:[], tags:["sfx"], aliases:["soft whoosh"] },
    "003": { token:"lip: sync strong",       desc:"lip-sync intent", adds:["speech alignment"], neg:["desync"], tags:["dialog"], aliases:["strong lipsync"] }
  };

  // Register UI hints dynamically (non-breaking)
  const ui = window.MovieCORE;
  const oldHints = ui.uiHints;
  ui.uiHints = function(){
    const h = oldHints.call(ui);
    if (PACK.editing)     h.editing = Object.values(PACK.editing).map(r=>r.token);
    if (PACK.beats)       h.beats   = Object.values(PACK.beats).map(r=>r.token);
    if (PACK.consistency) h.consistency = Object.values(PACK.consistency).map(r=>r.token);
    if (PACK.audio)       h.audio   = Object.values(PACK.audio).map(r=>r.token);
    return h;
  };

  // Light-touch enhancer glue: if user includes any of these tokens, add sensible add-ons
  const oldSuggest = ui.suggest;
  ui.suggest = function(extras){
    const base = oldSuggest.call(ui, extras) || "";
    const parts = Array.isArray(extras)? extras : [extras].filter(Boolean);
    const out = [];
    if (parts.some(p=>/cut:\s*match/i.test(p))) out.push("grade: cinematic");
    if (parts.some(p=>/transition:\s*glitch/i.test(p))) out.push("stability: motion blend");
    if (parts.some(p=>/lip:\s*sync/i.test(p))) out.push("stability: lock focus");
    return [base, ...out].filter(Boolean).join(", ");
  };
})();
/* PromptForge — Movie Pack (Block C) — Rigs + Modifiers + Optics */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Camera Rigs (NUMBERED) =====
  PACK.rigs = {
    "001": { token:"rig: handheld",        desc:"handheld organic motion",       adds:["controlled jitter","shoulder sway"],          neg:["micro-jitter harsh"],                tags:["manual"],     aliases:["hand held"] },
    "002": { token:"rig: shoulder",        desc:"shoulder-mounted stability",    adds:["natural sway","human cadence"],               neg:["bounce"],                             tags:["manual"],     aliases:["shoulder mount"] },
    "003": { token:"rig: steadicam",       desc:"floaty stabilized walk",        adds:["glide path","footstep isolation"],            neg:[],                                      tags:["stabilized"], aliases:["steadycam"] },
    "004": { token:"rig: gimbal 3-axis",   desc:"motor stabilized pan/tilt/roll",adds:["axis lock","micro-jitter reduction"],         neg:[],                                      tags:["stabilized"], aliases:["gimbal","3-axis gimbal"] },
    "005": { token:"rig: slider",          desc:"short linear slide",            adds:["linear glide","precision parallax"],          neg:[],                                      tags:["track"],      aliases:["slider rail"] },
    "006": { token:"rig: dolly straight",  desc:"rail dolly, straight",          adds:["parallax build","butter-smooth motion"],      neg:[],                                      tags:["track"],      aliases:["dolly in-line"] },
    "007": { token:"rig: dolly curved",    desc:"curved track dolly",            adds:["arcing parallax","wrap reveal"],              neg:[],                                      tags:["track"],      aliases:["round dolly"] },
    "008": { token:"rig: crane short",     desc:"short jib/crane",               adds:["vertical rise","gentle reveal"],              neg:[],                                      tags:["vertical"],   aliases:["jib short"] },
    "009": { token:"rig: crane long",      desc:"long reach crane",              adds:["sweeping elevation","hero reveal"],           neg:["pendulum sway"],                       tags:["vertical"],   aliases:["jib long"] },
    "010": { token:"rig: cable-cam",       desc:"zipline/cable cam",             adds:["highline travel","consistent horizon"],       neg:["prop flicker"],                        tags:["aerial"],     aliases:["wire cam"] },
    "011": { token:"rig: drone follow",    desc:"aerial follow",                 adds:["subject lock","gps stability"],               neg:["prop shadow","wind drift"],            tags:["aerial"],     aliases:["drone follow me"] },
    "012": { token:"rig: drone orbit",     desc:"aerial orbit",                  adds:["circular aerial arc","subject centering"],    neg:["orbit wobble"],                         tags:["aerial"],     aliases:["drone circle"] },
    "013": { token:"rig: car-mount hood",  desc:"hood suction rig",              adds:["road parallax","vibration dampened"],         neg:["rolling shutter"],                     tags:["vehicle"],    aliases:["hood mount"] },
    "014": { token:"rig: car-mount arm",   desc:"arm/russian arm",               adds:["dynamic chase","low swing angle"],            neg:["arm flex"],                             tags:["vehicle"],    aliases:["camera car arm"] },
    "015": { token:"rig: body-cam chest",  desc:"body mounted chest",            adds:["first-person sway","hard lock"],              neg:["rolling shutter","bounce"],            tags:["fpv"],        aliases:["chest cam"] },
    "016": { token:"rig: helmet-cam",      desc:"helmet POV",                    adds:["head turn parallax","eye-height"],            neg:["shake"],                                tags:["fpv"],        aliases:["gopro helmet"] },
    "017": { token:"rig: motion control",  desc:"robot repeatable move",         adds:["frame-accurate repeat","vfx plate safe"],     neg:[],                                      tags:["moco"],       aliases:["moco","robot arm"] },
    "018": { token:"rig: moco slider",     desc:"robotic slider",                adds:["timelapse-safe move","micro precision"],      neg:[],                                      tags:["moco"],       aliases:["motion control slider"] },
    "019": { token:"rig: virtual cam",     desc:"virtual production dolly",      adds:["digital dolly","tracked 3D camera"],          neg:["jitter aliasing"],                     tags:["vp"],         aliases:["vcam"] },
    "020": { token:"rig: volumetric",      desc:"multi-cam volumetric capture",  adds:["multi-angle synthesis","view interpolation"], neg:["ghost edges"],                         tags:["volumetric"], aliases:["volcap"] }
  };

  // ===== Shot Modifiers (NUMBERED) =====
  PACK.modifiers = {
    "001": { token:"focus: rack",            desc:"A→B rack focus",                   adds:["timed focus pull","subject emphasis"],     neg:["focus hunt"],           tags:["focus"],  aliases:["rack focus"] },
    "002": { token:"focus: pull slow",       desc:"slow focus pull",                   adds:["cinematic drift"],                         neg:["breathing"],            tags:["focus"],  aliases:["slow pull"] },
    "003": { token:"focus: lock subject",    desc:"face/subject lock",                 adds:["feature tracking","face lock"],            neg:["identity drift"],       tags:["focus"],  aliases:["subject lock"] },
    "004": { token:"dof: shallow",           desc:"shallow depth of field",           adds:["creamy bokeh"],                            neg:["focus miss"],           tags:["dof"],    aliases:["shallow dof"] },
    "005": { token:"dof: deep",              desc:"deep depth of field",              adds:["scene legibility"],                        neg:["flat look"],            tags:["dof"],    aliases:["deep dof"] },
    "006": { token:"shutter: 180deg",        desc:"film-standard motion blur",        adds:["natural cadence"],                         neg:[],                      tags:["shutter"],aliases:["180°"] },
    "007": { token:"shutter: 90deg",         desc:"crisper motion",                   adds:["action clarity"],                          neg:["staccato vibe"],        tags:["shutter"],aliases:["90°"] },
    "008": { token:"shutter: 360deg",        desc:"smeary motion blur",               adds:["dream smear"],                             neg:["mush"],                 tags:["shutter"],aliases:["360°"] },
    "009": { token:"speed: ramp in",         desc:"ease-in time ramp",                adds:["kinetic accent"],                          neg:["stutter if misused"],   tags:["time"],   aliases:["speed ramp in"] },
    "010": { token:"speed: ramp out",        desc:"ease-out time ramp",               adds:["release accent"],                          neg:["stutter if misused"],   tags:["time"],   aliases:["speed ramp out"] },
    "011": { token:"time: timelapse",        desc:"long interval speed-up",           adds:["interval cadence"],                         neg:["flicker"],              tags:["time"],   aliases:["time lapse"] },
    "012": { token:"time: hyperlapse",       desc:"moving timelapse",                 adds:["motion fortified"],                         neg:["warp wobble"],          tags:["time"],   aliases:["hyper lapse"] },
    "013": { token:"zoom: snap",             desc:"rapid snap zoom",                  adds:["impact beat"],                              neg:["zoom warp"],            tags:["zoom"],   aliases:["crash zoom"] },
    "014": { token:"zoom: creep",            desc:"slow creep zoom",                  adds:["subtle pressure"],                          neg:["breathing"],            tags:["zoom"],   aliases:["slow zoom"] },
    "015": { token:"roll: dutch 10deg",      desc:"10° dutch tilt",                   adds:["unease"],                                   neg:["over-stylized"],        tags:["roll"],   aliases:["dutch tilt 10°"] },
    "016": { token:"roll: horizon lock",     desc:"lock horizon",                     adds:["gyro-stable"],                              neg:[],                       tags:["roll"],   aliases:["horizon lock"] },
    "017": { token:"mb: natural",            desc:"natural motion blur",              adds:["coherent smear"],                           neg:[],                       tags:["motion"], aliases:["motion blur natural"] },
    "018": { token:"mb: long trails",        desc:"streaky trails",                   adds:["light trail aesthetic"],                    neg:["ghost images"],         tags:["motion"], aliases:["long exposure trails"] },
    "019": { token:"lighting: golden hour",  desc:"warm low sun",                     adds:["soft long shadows"],                        neg:["underexposed risk"],    tags:["light"],  aliases:["golden hour"] },
    "020": { token:"lighting: neon night",   desc:"neon night palette",               adds:["gel mix"],                                  neg:["banding"],              tags:["light"],  aliases:["neon city"] },
    "021": { token:"frame: letterbox safe",  desc:"protect top/bottom",               adds:["title-safe padding"],                       neg:[],                       tags:["frame"],  aliases:["letterbox safe"] },
    "022": { token:"frame: center lock",     desc:"center composition lock",          adds:["subject priority"],                         neg:["static feel"],          tags:["frame"],  aliases:["center lock"] },
    "023": { token:"compose: thirds",        desc:"rule of thirds",                   adds:["balanced layout"],                          neg:[],                       tags:["frame"],  aliases:["rule of thirds"] },
    "024": { token:"compose: leading lines", desc:"guide lines",                      adds:["depth cues"],                               neg:[],                       tags:["frame"],  aliases:["leading lines"] },
    "025": { token:"transition: speed blur", desc:"speed-blur transition cue",        adds:["directional smear"],                        neg:["artifact smear"],       tags:["cut"],    aliases:["speed blur"] },
    "026": { token:"hold: hero 2s",          desc:"hold on hero 2 seconds",           adds:["breathing space"],                          neg:["drag if misused"],      tags:["timing"], aliases:["hero hold 2s"] },
    "027": { token:"beat: micro cutaways",   desc:"insert micro b-roll",              adds:["texture beats"],                            neg:[],                       tags:["beat"],   aliases:["micro inserts"] },
    "028": { token:"shadow: contact",        desc:"add contact shadows",              adds:["grounding realism"],                        neg:[],                       tags:["phys"],   aliases:["contact shadow"] },
    "029": { token:"camera: parallax push",  desc:"push-in with parallax",            adds:["foreground/background separation"],         neg:[],                       tags:["move"],   aliases:["parallax push"] },
    "030": { token:"stereo: mono safe",      desc:"mono mix safe",                    adds:["dialog clarity"],                           neg:["phase issues"],         tags:["audio"],  aliases:["mono safe"] }
  };

  // ===== Optics / Filters / Grains (NUMBERED) =====
  PACK.optics = {
    "001": { token:"lens: anamorphic 2x",    desc:"2x squeeze look",                 adds:["oval bokeh","horizontal flare"],            neg:["edge mumps","pincushion"], tags:["lens"],  aliases:["anamorphic 2.0x"] },
    "002": { token:"lens: anamorphic 1.8x",  desc:"1.8x squeeze",                    adds:["subtle oval bokeh","streak flare"],         neg:["distortion pumping"],      tags:["lens"],  aliases:["anamorphic 1.8"] },
    "003": { token:"lens: spherical",        desc:"standard spherical",              adds:["neutral geometry"],                         neg:[],                           tags:["lens"],  aliases:["spherical lens"] },
    "004": { token:"lens: vintage",          desc:"low contrast vintage glass",      adds:["soft edges","gentle halation"],             neg:["veiling flare"],           tags:["lens"],  aliases:["vintage glass"] },
    "005": { token:"lens: clinical modern",  desc:"high contrast modern glass",      adds:["edge acuity","microcontrast"],              neg:["sterile feel"],            tags:["lens"],  aliases:["modern clinical"] },
    "006": { token:"diopter: split",         desc:"split-diopter effect",            adds:["near/far both sharp"],                      neg:["seam edge blur"],          tags:["diopter"],aliases:["split diopter"] },
    "007": { token:"diopter: +1",            desc:"+1 close-up diopter",             adds:["closer focus"],                             neg:["edge softness"],           tags:["diopter"],aliases:["+1 diopter","close-up filter"] },
    "008": { token:"tilt-shift: mini",       desc:"miniature tilt-shift",            adds:["plane tilt","toy-city vibe"],               neg:["edge smear"],              tags:["tilt"],  aliases:["tilt shift mini"] },
    "009": { token:"filter: diffusion bpm 1/4", desc:"black pro-mist 1/4",          adds:["bloom highlights","soft contrast"],         neg:["detail loss"],             tags:["diffusion"], aliases:["bpm 1/4"] },
    "010": { token:"filter: diffusion bpm 1/8", desc:"black pro-mist 1/8",          adds:["subtle bloom"],                              neg:[],                          tags:["diffusion"], aliases:["bpm 1/8"] },
    "011": { token:"filter: glimmerglass 1", desc:"glimmerglass strength 1",         adds:["sparkle bloom"],                             neg:["specular mush"],           tags:["diffusion"], aliases:["glimmerglass #1"] },
    "012": { token:"filter: hollywood soft", desc:"softFX/hollywood",                adds:["classic halation"],                          neg:["detail bleed"],            tags:["diffusion"], aliases:["soft fx"] },
    "013": { token:"grain: 35mm fine",       desc:"35mm fine grain",                 adds:["filmic texture"],                            neg:["pattern crawl"],           tags:["grain"],  aliases:["35mm"] },
    "014": { token:"grain: 16mm bold",       desc:"16mm bold grain",                 adds:["gritty texture"],                            neg:["over-noise"],              tags:["grain"],  aliases:["16mm"] },
    "015": { token:"grain: digital fine",    desc:"fine digital grain",              adds:["clean texture"],                             neg:["plastic feel"],            tags:["grain"],  aliases:["fine digital grain"] },
    "016": { token:"flare: streak",          desc:"horizontal streak flare",         adds:["anamorphic vibe"],                           neg:["overexposed streaks"],     tags:["flare"],  aliases:["streak flare"] },
    "017": { token:"flare: warm amber",      desc:"warm amber flare",                adds:["golden warmth"],                             neg:["color cast"],              tags:["flare"],  aliases:["amber flare"] },
    "018": { token:"nd: strong",             desc:"strong neutral density",          adds:["wide-open daytime"],                         neg:["color shift if poor"],     tags:["filter"], aliases:["strong ND"] },
    "019": { token:"polarizer: circular",    desc:"circular polarizer",              adds:["glare cut","sky deepen"],                    neg:["rainbow moire"],           tags:["filter"], aliases:["CPL"] },
    "020": { token:"atmos: haze",            desc:"atmospheric haze",                adds:["depth layers","godrays"],                    neg:["low contrast"],            tags:["atmos"],  aliases:["haze"] }
  };

  // ===== Extend UI Hints =====
  const oldHints = CORE.uiHints;
  CORE.uiHints = function(){
    const h = oldHints.call(CORE);
    if (PACK.rigs)      h.rigs      = Object.values(PACK.rigs).map(r=>r.token);
    if (PACK.modifiers) h.modifiers = Object.values(PACK.modifiers).map(r=>r.token);
    if (PACK.optics)    h.optics    = Object.values(PACK.optics).map(r=>r.token);
    return h;
  };

  // ===== Extend Suggest (non-breaking) =====
  const oldSuggest = CORE.suggest;
  CORE.suggest = function(extras){
    const base = oldSuggest.call(CORE, extras) || "";
    const parts = Array.isArray(extras)? extras : [extras].filter(Boolean);
    const out = [];

    // Rigs → stabilizers
    if (parts.some(p=>/rig:\s*(steadicam|gimbal|slider|dolly|crane|moco)/i)) out.push("stability: gimbal");
    if (parts.some(p=>/rig:\s*(handheld|shoulder)/i))                         out.push("stability: motion blend");

    // Modifiers → stability / grade
    if (parts.some(p=>/speed:\s*ramp|time:\s*(hyperlapse|timelapse)/i))      out.push("stability: motion blend");
    if (parts.some(p=>/zoom:\s*snap/i))                                      out.push("stability: lock focus");
    if (parts.some(p=>/grain:\s*(35mm|16mm)/i))                               out.push("grade: cinematic");

    // Optics → aspect & flare vibes
    if (parts.some(p=>/lens:\s*anamorphic/i))                                out.push("ratio: 21:9","grade: cinematic");
    if (parts.some(p=>/diopter:\s*split/i))                                  out.push("focus: lock subject");

    return [base, ...out].filter(Boolean).join(", ");
  };

})();
/* PromptForge — Movie Pack (Block D) — VFX + Motion + Choreo */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== VFX / Weather / Particles (NUMBERED) =====
  PACK.vfx = {
    "001": { token:"vfx: rain light",       desc:"fine drizzle",             adds:["surface ripples","wet speculars"],   neg:["banding"],            tags:["rain"],     aliases:["light rain"] },
    "002": { token:"vfx: rain heavy",       desc:"dense rain",               adds:["streak trails","splash hits"],       neg:["over-smear"],         tags:["rain"],     aliases:["downpour"] },
    "003": { token:"vfx: snow fine",        desc:"fine snow",                adds:["air depth","soft fall"],             neg:["ghost specks"],       tags:["snow"],     aliases:["light snow"] },
    "004": { token:"vfx: snow thick",       desc:"heavy flakes",             adds:["foreground flakes","whirl drift"],   neg:["frame popping"],      tags:["snow"],     aliases:["blizzard"] },
    "005": { token:"vfx: fog low",          desc:"ground fog",               adds:["godrays","layered depth"],           neg:["mush contrast"],      tags:["atmos"],    aliases:["low fog"] },
    "006": { token:"vfx: mist backlight",   desc:"backlit mist",             adds:["rim beams","volumetric light"],      neg:["bloom overload"],     tags:["atmos"],    aliases:["mist beams"] },
    "007": { token:"vfx: dust motes",       desc:"floating dust",            adds:["sun shafts","microparticles"],       neg:["sensor dirt look"],   tags:["atmos"],    aliases:["air dust"] },
    "008": { token:"vfx: embers drift",     desc:"slow drifting embers",     adds:["warm flicker","depth sparkles"],     neg:["fire hazard vibe"],   tags:["particles"],aliases:["embers"] },
    "009": { token:"vfx: sparks",           desc:"hot sparks",               adds:["impact burst","arc points"],         neg:["overexposed points"], tags:["particles"],aliases:["metal sparks"] },
    "010": { token:"vfx: smoke plume",      desc:"thick smoke",              adds:["rolling billow","soft occlusion"],   neg:["banded gradient"],    tags:["smoke"],    aliases:["plume"] },
    "011": { token:"vfx: haze room",        desc:"room haze",                adds:["even diffusion"],                    neg:["flatness"],           tags:["atmos"],    aliases:["room haze"] },
    "012": { token:"vfx: neon flicker",     desc:"neon sign flicker",        adds:["electro vibe","edge glow"],          neg:["alias shimmer"],      tags:["light"],    aliases:["flicker neon"] },
    "013": { token:"vfx: light rays",       desc:"visible light shafts",     adds:["volumetric beams"],                  neg:["cheesy godrays"],     tags:["volumetric"],aliases:["rays"] },
    "014": { token:"vfx: confetti",         desc:"falling confetti",         adds:["color pops","depth cues"],           neg:["paper chatter"],      tags:["particles"],aliases:["confetti fall"] },
    "015": { token:"vfx: water spray",      desc:"spray / mist cones",       adds:["impact splash","lens speck"],        neg:["sensor smear"],       tags:["water"],    aliases:["spray"] },
    "016": { token:"vfx: ripple caustics",  desc:"water caustic ripples",    adds:["moving highlights"],                 neg:["moire"],              tags:["water"],    aliases:["caustics"] },
    "017": { token:"vfx: lens dirt subtle", desc:"subtle lens grime",        adds:["real-world patina"],                 neg:["distracting spots"],  tags:["lens"],     aliases:["lens dirt"] },
    "018": { token:"vfx: sparkle drift",    desc:"slow drifting sparkles",   adds:["specular twinkle"],                  neg:["glitter mush"],       tags:["particles"],aliases:["sparkle"] },
    "019": { token:"vfx: heat shimmer",     desc:"heat haze line",           adds:["refractive wobble"],                 neg:["wavy smear"],         tags:["heat"],     aliases:["heat haze"] },
    "020": { token:"vfx: paper snow mix",   desc:"paper + faux snow",        adds:["mixed fall rates"],                  neg:["uncanny mix"],        tags:["mixed"],    aliases:["party snow"] }
  };

  // ===== Motion Verbs (NUMBERED) =====
  PACK.motion = {
    "001": { token:"action: walk slow",   desc:"slow approach",         adds:["footstep cadence"],       neg:["drag"],          tags:["walk"],   aliases:["slow walk"] },
    "002": { token:"action: walk hero",   desc:"confident walk",        adds:["shoulders square"],       neg:["over-act"],      tags:["walk"],   aliases:["hero walk"] },
    "003": { token:"action: run to cam",  desc:"run toward camera",     adds:["foreshortening"],         neg:["shake"],         tags:["run"],    aliases:["run forward"] },
    "004": { token:"action: sprint pass", desc:"sprint across frame",   adds:["motion streak cues"],     neg:["warp smear"],    tags:["run"],    aliases:["lateral sprint"] },
    "005": { token:"action: jump land",   desc:"jump + land",           adds:["impact timing"],          neg:["floaty"],        tags:["jump"],   aliases:["jump"] },
    "006": { token:"action: spin turn",   desc:"quick spin",            adds:["skirt/coat flare"],       neg:["blur mush"],     tags:["turn"],   aliases:["spin"] },
    "007": { token:"gesture: glance side",desc:"side glance",           adds:["eye highlight"],          neg:["dead eyes"],     tags:["gesture"],aliases:["side glance"] },
    "008": { token:"gesture: look back",  desc:"look over shoulder",    adds:["OTS ready"],              neg:[],                tags:["gesture"],aliases:["look over shoulder"] },
    "009": { token:"gesture: hair toss",  desc:"toss hair",             adds:["strand motion"],          neg:["stringy smear"], tags:["gesture"],aliases:["hair flip"] },
    "010": { token:"pose: lean wall",     desc:"lean on wall",          adds:["contact shadow"],         neg:["stuck pose"],    tags:["pose"],   aliases:["wall lean"] },
    "011": { token:"pose: sit edge",      desc:"sit on edge",           adds:["legible silhouette"],     neg:["awkward angle"], tags:["pose"],   aliases:["edge sit"] },
    "012": { token:"pose: stand strong",  desc:"strong stance",         adds:["shoulder set"],           neg:["rigid"],         tags:["pose"],   aliases:["power pose"] },
    "013": { token:"interaction: pass by",desc:"subjects cross paths",  adds:["parallax meet"],          neg:["碰撞"],           tags:["block"],  aliases:["cross pass"] },
    "014": { token:"interaction: meet",   desc:"meet at center",        adds:["center lock"],            neg:["flat staging"],  tags:["block"],  aliases:["meet center"] },
    "015": { token:"beat: pause 1s",      desc:"one-second hold",       adds:["breathing space"],        neg:["drag if long"],  tags:["timing"], aliases:["hold 1s"] },
    "016": { token:"beat: pause 2s",      desc:"two-second hold",       adds:["dramatic weight"],        neg:["drag"],          tags:["timing"], aliases:["hold 2s"] },
    "017": { token:"exit: frame left",    desc:"exit left",             adds:["directional cut"],        neg:[],                tags:["exit"],   aliases:["exit L"] },
    "018": { token:"exit: frame right",   desc:"exit right",            adds:["directional cut"],        neg:[],                tags:["exit"],   aliases:["exit R"] },
    "019": { token:"blocking: triangle",  desc:"triangle staging",      adds:["depth balance"],          neg:["over-arranged"], tags:["block"],  aliases:["triangle block"] },
    "020": { token:"blocking: line",      desc:"line staging",          adds:["procession feel"],        neg:["flat"],          tags:["block"],  aliases:["line stage"] }
  };

  // ===== Choreography (NUMBERED) =====
  PACK.choreo = {
    "001": { token:"choreo: hero walk-in",   desc:"enter, center, lock",     adds:["center lock","micro push"],       neg:["static"],      tags:["enter"],   aliases:["walk in center"] },
    "002": { token:"choreo: circle around",  desc:"orbit subject circle",    adds:["wrap reveal"],                    neg:["orbit wobble"],tags:["orbit"],   aliases:["circle reveal"] },
    "003": { token:"choreo: meet middle",    desc:"two converge center",     adds:["OTS ready","2S balance"],         neg:["awk meet"],    tags:["two"],     aliases:["meet middle"] },
    "004": { token:"choreo: cross whip",     desc:"cross then whip cut",     adds:["energy spike","match direction"], neg:["whip smear"],  tags:["fast"],    aliases:["whip cross"] },
    "005": { token:"choreo: runway pass",    desc:"runway walk to cam, exit",adds:["parallax push","beat hold"],      neg:["overlong"],    tags:["fashion"], aliases:["runway"] },
    "006": { token:"choreo: table dialog 2s",desc:"two-shot at table",       adds:["eye-line match","coverage safe"], neg:["flat"],        tags:["dialog"],  aliases:["table 2s"] },
    "007": { token:"choreo: reveal pull",    desc:"pull back reveal",        adds:["environment context"],            neg:[],              tags:["reveal"],  aliases:["pull reveal"] },
    "008": { token:"choreo: close embrace",  desc:"tight proximity",         adds:["shoulder framing"],               neg:["occlusion"],   tags:["intimate"],aliases:["close hold"] },
    "009": { token:"choreo: dance sway",     desc:"slow sway loop",          adds:["periodic motion"],                neg:["repetitive"],  tags:["dance"],   aliases:["slow dance"] },
    "010": { token:"choreo: group V",        desc:"group in V formation",    adds:["depth hierarchy"],                neg:["rigid"],       tags:["group"],   aliases:["V block"] }
  };

  // ===== Extend UI Hints =====
  const oldHints = CORE.uiHints;
  CORE.uiHints = function(){
    const h = oldHints.call(CORE);
    if (PACK.vfx)     h.vfx     = Object.values(PACK.vfx).map(r=>r.token);
    if (PACK.motion)  h.motion  = Object.values(PACK.motion).map(r=>r.token);
    if (PACK.choreo)  h.choreo  = Object.values(PACK.choreo).map(r=>r.token);
    return h;
  };

  // ===== Extend Suggest (context-aware sprinkles) =====
  const oldSuggest = CORE.suggest;
  CORE.suggest = function(extras){
    const base = oldSuggest.call(CORE, extras) || "";
    const parts = Array.isArray(extras)? extras : [extras].filter(Boolean);
    const out = [];

    // Weather/Particles → stability & shutter
    if (parts.some(p=>/vfx:\s*rain|snow|confetti|sparks|spray|embers|dust/i)) out.push("stability: motion blend");
    if (parts.some(p=>/vfx:\s*rain heavy|snow thick/i))                       out.push("shutter: 180deg");
    if (parts.some(p=>/vfx:\s*neon flicker/i))                                out.push("grade: cinematic");

    // Motion verbs → focus or gimbal
    if (parts.some(p=>/action:\s*run|sprint|jump/i))                          out.push("stability: gimbal");
    if (parts.some(p=>/gesture:\s*hair toss|spin/i))                          out.push("stability: lock focus");

    // Choreo → aspect / composition helpers
    if (parts.some(p=>/choreo:\s*runway/i))                                   out.push("ratio: 9:16","compose: thirds");
    if (parts.some(p=>/choreo:\s*circle around|reveal pull/i))                out.push("stability: gimbal");

    return [base, ...out].filter(Boolean).join(", ");
  };

})();
/* PromptForge — Movie Pack (Block E) — Trends / Style Bundles */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Trend / Style Bundles (NUMBERED) =====
  // token, desc, inject = tokens to add directly, adds = soft hints, neg = cautions
  PACK.trends = {
    "001": {
      token:"style: music-video glossy",
      desc:"high-shine, punchy color, kinetic cuts",
      inject:["grade: cinematic","grain: 35mm fine","lens: clinical modern","speed: ramp out","cut: straight","transition: light leak"],
      adds:["compose: leading lines","stability: gimbal"],
      neg:["over-sharpen"]
    },
    "002": {
      token:"style: docu-real handheld",
      desc:"natural light, imperfect handheld realism",
      inject:["rig: handheld","mb: natural","grain: 16mm bold","filter: diffusion bpm 1/8","cut: straight"],
      adds:["compose: thirds","vfx: dust motes"],
      neg:["micro-jitter harsh"]
    },
    "003": {
      token:"style: analog camcorder 90s",
      desc:"retro consumer-video vibe",
      inject:["grain: digital fine","filter: hollywood soft","flare: warm amber","mb: natural","cut: straight"],
      adds:["vfx: neon flicker","frame: letterbox safe"],
      neg:["banding"]
    },
    "004": {
      token:"style: technoir chase",
      desc:"wet streets, neon, tension, dynamic move",
      inject:["lighting: neon night","vfx: rain light","cam: orbit","lens: anamorphic 2x","ratio: 21:9","grade: cinematic","speed: ramp in","cut: whip"],
      adds:["stability: gimbal","focus: lock subject"],
      neg:["spin"]
    },
    "005": {
      token:"style: fashion runway glossy",
      desc:"runway walk, punchy clean gloss",
      inject:["choreo: runway pass","rig: steadicam","lighting: golden hour","lens: clinical modern","grain: 35mm fine","music: synthwave 90bpm","ratio: 9:16"],
      adds:["compose: thirds","hold: hero 2s"],
      neg:[]
    },
    "006": {
      token:"style: romance sunlit",
      desc:"soft warmth, airy cadence, gentle movement",
      inject:["filter: diffusion bpm 1/4","lighting: golden hour","flare: warm amber","move: push","fps: 24","dissolve: cross"],
      adds:["vfx: sparkle drift","beat: pause 2s"],
      neg:["mush"]
    },
    "007": {
      token:"style: horror slow dread",
      desc:"creeping tension, negative space, minimal cam",
      inject:["move: lockoff","shutter: 90deg","lighting: neon night","vfx: fog low","cut: straight","ratio: 16:9"],
      adds:["beat: slow burn","sound: low drone"],
      neg:["over-dark"]
    },
    "008": {
      token:"style: sci-fi neon pursuit",
      desc:"futuristic palette, motion, long highlights",
      inject:["lens: anamorphic 1.8x","flare: streak","cam: orbit","move: track","grade: cinematic","vfx: light rays"],
      adds:["stability: gimbal","focus: rack"],
      neg:["spin","artifact smear"]
    },
    "009": {
      token:"style: western dusk ride",
      desc:"dusty dusk, long silhouettes, slow pans",
      inject:["lighting: golden hour","vfx: dust motes","move: pan","grain: 16mm bold","mb: natural","cut: straight"],
      adds:["frame: center lock","beat: pause 1s"],
      neg:["underexposed"]
    },
    "010": {
      token:"style: sports hype cut",
      desc:"impact beats, ramps, sweat sheen, close action",
      inject:["action: sprint pass","zoom: snap","speed: ramp in","speed: ramp out","grain: digital fine","transition: speed blur","fps: 60"],
      adds:["stability: gimbal","stability: lock focus"],
      neg:["soap opera look"]
    },
    "011": {
      token:"style: moody rain alley",
      desc:"intimate alley scene, reflective puddles",
      inject:["vfx: rain heavy","lighting: neon night","lens: vintage","mb: long trails","cut: straight"],
      adds:["shadow: contact","vfx: water spray"],
      neg:["over-smear"]
    },
    "012": {
      token:"style: cozy coffee vignette",
      desc:"warm interior, window light, soft bokeh",
      inject:["lens: vintage","filter: diffusion bpm 1/8","dof: shallow","move: lockoff","fps: 24","dip2black"],
      adds:["compose: thirds","beat: micro cutaways"],
      neg:["flat look"]
    },
    "013": {
      token:"style: beach golden montage",
      desc:"sun flare, waves, montage pacing",
      inject:["lighting: golden hour","vfx: ripple caustics","move: crane","dissolve: cross","music: synthwave 90bpm"],
      adds:["hold: hero 2s","flare: warm amber"],
      neg:["overexposed"]
    },
    "014": {
      token:"style: cyberpunk streets",
      desc:"chromatic edges, signage glow, night steam",
      inject:["chromatic aberration","lighting: neon night","vfx: mist backlight","grade: cinematic","lens: anamorphic 2x"],
      adds:["stability: gimbal","ratio: 21:9"],
      neg:["banding"]
    },
    "015": {
      token:"style: commercial product sparkle",
      desc:"ultra-clean product glam, macro accents",
      inject:["studio seamless","softbox","grid control","macro close-up","filter: glimmerglass 1","grade: cinematic"],
      adds:["stability: motion blend","stability: lock focus"],
      neg:["specular mush"]
    },
    "016": {
      token:"style: editorial studio crisp",
      desc:"high key studio fashion, precise edges",
      inject:["light: high key","rig: slider","lens: clinical modern","mb: natural","cut: straight"],
      adds:["compose: leading lines","hold: hero 2s"],
      neg:["over-sharpen"]
    },
    "017": {
      token:"style: macro liquid luxe",
      desc:"liquids, highlights, slow motion texture",
      inject:["shot: macro","focus: rack","vfx: water spray","grain: 35mm fine","fps: 60"],
      adds:["stability: motion blend","stability: lock focus"],
      neg:["focus hunt"]
    },
    "018": {
      token:"style: travel postcard",
      desc:"slow pans, vistas, gentle color pop",
      inject:["move: pan","ratio: 16:9","grade: cinematic","grain: 35mm fine","dissolve: dip2black"],
      adds:["compose: leading lines","beat: pause 2s"],
      neg:["flat staging"]
    },
    "019": {
      token:"style: fantasy mist woods",
      desc:"ethereal fog, soft beams, muted palette",
      inject:["vfx: fog low","vfx: light rays","filter: diffusion bpm 1/4","fps: 24","move: push"],
      adds:["music: synthwave 90bpm"],
      neg:["cheesy godrays"]
    },
    "020": {
      token:"style: noir desk lamp",
      desc:"hard key, falloff shadows, static tension",
      inject:["move: lockoff","lighting: neon night","shadow: contact","grain: 35mm fine","cut: straight"],
      adds:["frame: center lock","beat: pause 1s"],
      neg:["underexposed"]
    }
  };

  // ===== Extend UI Hints =====
  const oldHints = CORE.uiHints;
  CORE.uiHints = function(){
    const h = oldHints.call(CORE);
    if (PACK.trends) h.trends = Object.values(PACK.trends).map(r=>r.token);
    return h;
  };

  // ===== Trend Applier (optional helper) =====
  // Returns an array of tokens to merge into the prompt when user picks a trend.
  CORE.applyTrend = function(trendToken){
    const low = String(trendToken||"").toLowerCase();
    const row = Object.values(PACK.trends||{}).find(r => String(r.token).toLowerCase() === low);
    if (!row) return [];
    const inject = Array.isArray(row.inject) ? row.inject : [];
    const adds   = Array.isArray(row.adds)   ? row.adds   : [];
    return [...inject, ...adds];
  };

  // ===== Extend Suggest (trend-aware sprinkles) =====
  const oldSuggest = CORE.suggest;
  CORE.suggest = function(extras){
    const base = oldSuggest.call(CORE, extras) || "";
    const parts = Array.isArray(extras)? extras : [extras].filter(Boolean);
    const out = [];

    if (parts.some(p=>/style:\s*music-video glossy/i)) out.push("cut: match");
    if (parts.some(p=>/style:\s*docu-real handheld/i)) out.push("focus: lock subject");
    if (parts.some(p=>/style:\s*analog camcorder/i))   out.push("transition: glitch");
    if (parts.some(p=>/style:\s*technoir chase/i))     out.push("vfx: water spray");
    if (parts.some(p=>/style:\s*fashion runway glossy/i)) out.push("compose: center lock");
    if (parts.some(p=>/style:\s*sports hype cut/i))    out.push("transition: speed blur");
    if (parts.some(p=>/style:\s*macro liquid luxe/i))  out.push("stability: motion blend");

    return [base, ...out].filter(Boolean).join(", ");
  };

})();
/* PromptForge — Movie Pack (Block F) — Characters/Dialogue + Storyboard + Mythic + Platforms + Safety */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Characters (NUMBERED) — archetypes & sliders for emotion/acting =====
  PACK.characters = {
    "001": { token:"char: narrator",        desc:"omniscient voice presence", adds:["voice: warm","emotion: measured"],    neg:[], tags:["voice"],    aliases:["narrator"] },
    "002": { token:"char: hero",            desc:"protagonist energy",        adds:["emotion: resolute","pose: stand strong"], neg:[], tags:["lead"],   aliases:["protagonist"] },
    "003": { token:"char: skeptic",         desc:"questioning foil",          adds:["emotion: doubtful","gesture: glance side"], neg:[], tags:["foil"], aliases:["doubter"] },
    "004": { token:"char: trickster",       desc:"mischief/tension breaker",  adds:["emotion: playful","beat: micro cutaways"], neg:[], tags:["foil"],   aliases:["jester"] },
    "005": { token:"char: mentor",          desc:"calm guidance",             adds:["emotion: calm","pose: sit edge"],       neg:[], tags:["support"],  aliases:["sage"] },
    "006": { token:"char: villain",         desc:"antagonist presence",       adds:["emotion: cold","compose: center lock"], neg:[], tags:["antag"],    aliases:["antagonist"] },
    "007": { token:"char: chorus",          desc:"off-cam crowd/voices",      adds:["audio: layered","beat: staccato"],      neg:[], tags:["bg"],       aliases:["crowd"] },
    "008": { token:"char: host",            desc:"direct-to-camera",          adds:["frame: center lock","shot: cu"],        neg:[], tags:["present"],  aliases:["presenter"] },
    "009": { token:"char: avatar",          desc:"stylized persona",          adds:["consistency: character lock","ref: img1"], neg:[], tags:["stylized"], aliases:["vtuber"] },
    "010": { token:"char: talking portrait",desc:"still photo w/ lipsync",    adds:["lip: sync strong","focus: lock subject"], neg:[], tags:["portrait"], aliases:["talking head"] }
  };

  // ===== Dialogue / Acting Controls (NUMBERED) =====
  PACK.dialogue = {
    "001": { token:"dialogue: line",     desc:"spoken line marker",     adds:["lip: sync strong"],                  neg:[],                    tags:["speech"], aliases:["line"] },
    "002": { token:"dialogue: pause .5s",desc:"half-second beat",       adds:["beat: pause 1s"],                    neg:[],                    tags:["beat"],   aliases:["pause short"] },
    "003": { token:"dialogue: pause 1s", desc:"one-second beat",        adds:["beat: pause 1s"],                    neg:[],                    tags:["beat"],   aliases:["pause 1s"] },
    "004": { token:"dialogue: pause 2s", desc:"two-second hold",        adds:["beat: pause 2s"],                    neg:["drag"],              tags:["beat"],   aliases:["pause 2s"] },
    "005": { token:"emotion: calm",      desc:"soft affect",            adds:["shutter: 180deg"],                    neg:[],                    tags:["mood"],   aliases:["calm"] },
    "006": { token:"emotion: joyful",    desc:"bright affect",          adds:["dof: shallow","flare: warm amber"],   neg:[],                    tags:["mood"],   aliases:["happy"] },
    "007": { token:"emotion: anxious",   desc:"tight energy",           adds:["shot: ecu","mb: natural"],            neg:["over-shake"],        tags:["mood"],   aliases:["nervous"] },
    "008": { token:"emotion: angry",     desc:"hard edge",              adds:["shutter: 90deg","zoom: snap"],        neg:["staccato vibe"],     tags:["mood"],   aliases:["mad"] },
    "009": { token:"voice: warm",        desc:"warm vocal timbre",      adds:["stereo: mono safe"],                  neg:[],                    tags:["voice"],  aliases:["warm voice"] },
    "010": { token:"voice: synthetic",   desc:"AI-style TTS timbre",    adds:["lip: sync strong"],                   neg:["robotic"],           tags:["voice"],  aliases:["tts tone"] },
    "011": { token:"lip: sync strong",   desc:"force lipsync alignment",adds:["stability: lock focus"],              neg:["desync"],            tags:["lipsync"],aliases:["lipsync strong"] },
    "012": { token:"lip: multi speaker", desc:"multi-face lipsync",     adds:["dialog coverage: OTS/OTS"],           neg:["identity drift"],    tags:["lipsync"],aliases:["multi lipsync"] },
    "013": { token:"dialog coverage: OTS/OTS", desc:"shot-reverse-shot",adds:["shot: ots","cut: straight"],          neg:[],                    tags:["coverage"],aliases:["SRS"] },
    "014": { token:"dialog coverage: 2S", desc:"two-shot coverage",     adds:["shot: 2s","compose: thirds"],         neg:["flat"],              tags:["coverage"],aliases:["two shot coverage"] },
    "015": { token:"dialog: L-cut",      desc:"audio leads next shot",  adds:["dissolve: cross"],                     neg:["mush"],              tags:["edit"],   aliases:["l-cut"] },
    "016": { token:"dialog: J-cut",      desc:"audio enters early",     adds:["cut: straight"],                       neg:[],                    tags:["edit"],   aliases:["j-cut"] }
  };

  // ===== Mythic / Cryptid / Creature (NUMBERED) =====
  PACK.creatures = {
    "001": { token:"creature: sasquatch",  desc:"tall, furred cryptid",        adds:["scale cues","ground thud"],       neg:["campy"],           tags:["cryptid"], aliases:["bigfoot"] },
    "002": { token:"creature: alien grey", desc:"slender, large eyes",         adds:["cool palette","subtle telemetry"],neg:["rubbery"],         tags:["alien"],   aliases:["grey"] },
    "003": { token:"creature: dragon",     desc:"scaled, winged",              adds:["ember drift","smoke plume"],      neg:["toy look"],        tags:["fantasy"], aliases:["wyrm"] },
    "004": { token:"creature: vampire",    desc:"pale, sharp contrast",        adds:["neon night","shadow: contact"],   neg:["cheese"],          tags:["gothic"],  aliases:["nosferatu"] },
    "005": { token:"creature: werewolf",   desc:"lupine transform",            adds:["moon haze","claw motion"],        neg:["rubber suit"],     tags:["horror"],  aliases:["lycan"] },
    "006": { token:"creature: mermaid",    desc:"aquatic siren",               adds:["ripple caustics","wet speculars"],neg:["costume vibe"],    tags:["fantasy"], aliases:["siren"] },
    "007": { token:"creature: fae",        desc:"forest faerie",               adds:["sparkle drift","soft bloom"],     neg:["glitter mush"],    tags:["fantasy"], aliases:["fairy"] },
    "008": { token:"creature: angel",      desc:"luminous wings",              adds:["light rays","diffusion bpm 1/4"], neg:["overexposed"],     tags:["mythic"],  aliases:["seraph"] },
    "009": { token:"creature: demon",      desc:"horns, ember glow",           adds:["embers drift","streak flare"],    neg:["cartoonish"],      tags:["mythic"],  aliases:["fiend"] },
    "010": { token:"creature: ghost",      desc:"translucent form",            adds:["mist backlight","soft bloom"],    neg:["cheap overlay"],   tags:["spirit"],  aliases:["spectre"] }
  };

  // ===== Platforms / Aspect / Duration presets (NUMBERED) =====
  PACK.platforms = {
    "001": { token:"platform: facebook reel", desc:"vertical, dub-ready", adds:["ratio: 9:16","fps: 30","dialogue: L-cut","lip: sync strong"], neg:[], tags:["reel"], aliases:["fb reel"] },
    "002": { token:"platform: instagram reel",desc:"vertical, dub-ready", adds:["ratio: 9:16","fps: 30","lip: sync strong"],                    neg:[], tags:["reel"], aliases:["ig reel"] },
    "003": { token:"platform: youtube short", desc:"vertical, quick beats", adds:["ratio: 9:16","fps: 30","cut: match"],                       neg:[], tags:["short"],aliases:["yt short"] },
    "004": { token:"platform: tiktok",        desc:"vertical, trend-paced", adds:["ratio: 9:16","fps: 30","pace: staccato"],                   neg:[], tags:["short"],aliases:["tt"] }
  };

  // ===== Safety / Legal presets (NUMBERED) =====
  PACK.safety = {
    "001": { token:"safety: avoid celebrity likeness", desc:"no celebrity mimic", adds:["no trademark logos"], neg:[], tags:["rights"], aliases:["no celeb"] },
    "002": { token:"safety: avoid brand marks",        desc:"no known logos",     adds:["generic signage"],   neg:[], tags:["rights"], aliases:["no logos"] },
    "003": { token:"safety: label ai-translated",      desc:"label dubs",         adds:["caption: ai-translated"], neg:[], tags:["disclosure"], aliases:["label dub"] }
  };

  // ===== Extend UI Hints =====
  const oldHints = CORE.uiHints;
  CORE.uiHints = function(){
    const h = oldHints.call(CORE);
    if (PACK.characters) h.characters = Object.values(PACK.characters).map(r=>r.token);
    if (PACK.dialogue)   h.dialogue   = Object.values(PACK.dialogue).map(r=>r.token);
    if (PACK.creatures)  h.creatures  = Object.values(PACK.creatures).map(r=>r.token);
    if (PACK.platforms)  h.platforms  = Object.values(PACK.platforms).map(r=>r.token);
    if (PACK.safety)     h.safety     = Object.values(PACK.safety).map(r=>r.token);
    return h;
  };

  // ===== Suggest extensions aware of dialogue/creatures/platform =====
  const oldSuggest = CORE.suggest;
  CORE.suggest = function(extras){
    const base = oldSuggest.call(CORE, extras) || "";
    const parts = Array.isArray(extras)? extras : [extras].filter(Boolean);
    const out = [];

    // Dialogue → coverage + lipsync
    if (parts.some(p=>/dialogue:\s*line/i))           out.push("dialog coverage: OTS/OTS");
    if (parts.some(p=>/lip:\s*multi/i))               out.push("dialog coverage: 2S");

    // Creatures → VFX/lighting helpers
    if (parts.some(p=>/creature:\s*sasquatch/i))      out.push("vfx: fog low","frame: center lock");
    if (parts.some(p=>/creature:\s*alien grey/i))     out.push("lighting: neon night","vfx: mist backlight");
    if (parts.some(p=>/creature:\s*dragon/i))         out.push("vfx: embers drift","vfx: smoke plume");
    if (parts.some(p=>/creature:\s*ghost/i))          out.push("vfx: light rays","filter: diffusion bpm 1/4");

    // Platforms → aspect/pace
    if (parts.some(p=>/platform:\s*(facebook|instagram)\s*reel/i)) out.push("ratio: 9:16","fps: 30","cut: straight");
    if (parts.some(p=>/platform:\s*youtube short|tiktok/i))        out.push("ratio: 9:16","pace: staccato");

    return [base, ...out].filter(Boolean).join(", ");
  };

  // ===== Storyboard Primitives (NUMBERED) =====
  // Slugline shorthands + coverage patterns + reusable scene beats
  PACK.story = {
    slugs: {
      "001": { token:"SLUG: EXT. forest - dusk", desc:"exterior forest dusk", adds:["vfx: fog low","lighting: golden hour"], neg:[], tags:["slug"], aliases:["ext forest dusk"] },
      "002": { token:"SLUG: EXT. alley - night", desc:"wet alley neon",       adds:["lighting: neon night","vfx: rain light"], neg:[], tags:["slug"], aliases:["ext alley night"] },
      "003": { token:"SLUG: INT. cabin - night",  desc:"interior cabin",       adds:["room haze","soft bloom"],               neg:[], tags:["slug"], aliases:["int cabin night"] },
      "004": { token:"SLUG: EXT. beach - sunrise",desc:"beach sunrise",        adds:["golden hour","ripple caustics"],       neg:[], tags:["slug"], aliases:["ext beach sunrise"] }
    },
    beats: {
      "001": { token:"scene: establish", desc:"set place/subject", adds:["shot: ws","move: pan"],            neg:[], tags:["beat"], aliases:["establish"] },
      "002": { token:"scene: encounter", desc:"two meet/face off", adds:["dialog coverage: OTS/OTS","2S"],   neg:[], tags:["beat"], aliases:["meet"] },
      "003": { token:"scene: reveal",    desc:"new info reveal",   adds:["move: push","cut: match"],         neg:[], tags:["beat"], aliases:["reveal"] },
      "004": { token:"scene: twist",     desc:"unexpected turn",   adds:["cut: whip","zoom: snap"],          neg:[], tags:["beat"], aliases:["twist"] },
      "005": { token:"scene: resolve",   desc:"resolution beat",   adds:["move: pull","dip2black"],          neg:[], tags:["beat"], aliases:["resolve"] }
    },
    coverage: {
      "001": { token:"coverage: host piece-to-cam", desc:"direct address", adds:["char: host","shot: cu","frame: center lock"], neg:[], tags:["cov"], aliases:["ptc"] },
      "002": { token:"coverage: dialog SRS",        desc:"shot-reverse",   adds:["dialog coverage: OTS/OTS","cut: straight"],   neg:[], tags:["cov"], aliases:["srs"] },
      "003": { token:"coverage: two-shot walk",     desc:"walk & talk",    adds:["shot: 2s","rig: steadicam"],                  neg:[], tags:["cov"], aliases:["walk talk"] },
      "004": { token:"coverage: reveal push",       desc:"push-in reveal", adds:["move: push","grade: cinematic"],             neg:[], tags:["cov"], aliases:["push reveal"] }
    }
  };

  // ===== Storyboard Helper API =====
  // Makes a tiny board from a logline + creature/characters and returns cards.
  CORE.storyTemplate = function({ title="Untitled", logline="", slug="SLUG: EXT. forest - dusk", platform="platform: facebook reel", chars=[], creature=null } = {}){
    // 3-beat micro story: establish → encounter → resolve
    const cards = [
      {
        beat: "scene: establish",
        slug,
        tokens: ["coverage: host piece-to-cam", platform, ...chars, creature ? [creature] : []].flat()
      },
      {
        beat: "scene: encounter",
        slug,
        tokens: ["dialogue: line","dialogue: line","dialog coverage: OTS/OTS","lip: multi speaker", platform, ...chars, creature ? [creature] : []].flat()
      },
      {
        beat: "scene: resolve",
        slug,
        tokens: ["move: pull","dissolve: dip2black", platform, ...chars, creature ? [creature] : []].flat()
      }
    ];
    return { title, logline, cards };
  };

  // Renders a board into per-shot prompts using MovieCORE.enhance()
  // ctx: { engine, genre, ratio?, fps? }
  CORE.renderBoard = function(board, ctx={}){
    if (!board?.cards?.length) return [];
    const outs = [];
    for (const card of board.cards){
      const base = [
        card.slug,
        card.beat,
        ...(Array.isArray(card.tokens) ? card.tokens : [])
      ].filter(Boolean).join(", ");
      const str = CORE.enhance(base, {
        engine: ctx.engine || "runway",
        genre : ctx.genre  || "editorial",
        ratio : (card.tokens||[]).find(t=>/^ratio:/i.test(t)) || ctx.ratio || "ratio: 9:16",
        fps   : (card.tokens||[]).find(t=>/^fps:/i.test(t))   || ctx.fps   || "fps: 30"
      });
      outs.push({ beat: card.beat, slug: card.slug, prompt: str, negative: CORE.lastNegative || "" });
    }
    return outs;
  };

})();
/* PromptForge — NSFW Core (Gate + API + Sanitize)
   Purpose: age-gate UI helpers, vibe pipeline (sfw/softcore/hardcore),
   sanitize mapping, and a user-pack registration point for explicit tokens.
   Exports: window.NSFW_CORE { config, sanitize(), score(), registerUserPack(), uiHints() }
*/
(function(){
  "use strict";

  const NSFW_CORE = {
    config: {
      // default vibe when checkbox is ON; UI can override via dropdown
      defaultVibe: "softcore", // "sfw" | "softcore" | "hardcore"
      // drop any age-unsafe phrases outright (kept minimal; expand on deploy)
      denylist: [
        /\bteen\b/i, /\bunder\s*18\b/i, /\bminor\b/i, /\bchild\b/i, /\blolita\b/i,
        /\bschoolgirl\b/i, /\bincest\b/i, /\bncp\b/i, /\bcp\b/i, /\bnonconsens/i
      ],
      // basic profanity that we’ll *soften* in softcore; you can expand locally
      profaneSoften: [
        { re:/\bass\b/gi, sub:"back view" },
        { re:/\btit[s]?\b/gi, sub:"chest" },
        { re:/\bboob[s]?\b/gi, sub:"chest" },
        { re:/\b[a@]r[o0]us(ed|al)?\b/gi, sub:"flushed" },
        { re:/\b[ck]um\b/gi, sub:"gloss" },
        { re:/\b[pb]ussy\b/gi, sub:"silhouette" },
        { re:/\bdick\b/gi, sub:"silhouette" }
      ],
      // gentle romance/sensual synonyms map (non-graphic)
      softcoreMap: [
        { re:/\bnude\b/gi, sub:"implied nude, tasteful coverage" },
        { re:/\bnsfw\b/gi, sub:"sensual, implied" },
        { re:/\bhardcore\b/gi, sub:"bold mood, implied details" },
        { re:/\bsex\b/gi, sub:"intimate chemistry, off-screen implication" },
        { re:/\borgasm(ic)?\b/gi, sub:"breathless, flushed mood" },
        { re:/\bblow(job)?\b/gi, sub:"intimate closeness (implied)" },
        { re:/\bpenetrat(e|ion)\b/gi, sub:"intimate closeness (implied)" }
      ],
      // these expansions *add* safe mood/wardrobe/lighting in softcore
      softcoreAdd: [
        "mood: intimate","wardrobe: lingerie black","fabric: satin",
        "pose: suggestive silhouette","light: high key","light: rim","skin: luminous"
      ],
      // hard negatives for SFW mode
      sfwNeg: ["nudity","sexual content","explicit content","suggestive focus"],
      // engine-agnostic negatives for hardcore→soften
      hcNegSoft: ["graphic detail","explicit anatomy focus"]
    },

    // local user pack is NOT provided by me; you register it on your own host
    _userPack: {
      // shape: { pos:[], neg:[] }  — YOU fill this at runtime via registerUserPack()
      pos: [],
      neg: []
    },

    // simple severity scoring (0 = tame, up to 3 = spicy)
    score(text){
      const t = String(text||"").toLowerCase();
      let s = 0;
      if (/\bnude|nsfw|lingerie|boudoir|sensual|implied\b/.test(t)) s++;
      if (/\bsex|hardcore|explicit|orgasm|fetish\b/.test(t)) s++;
      if (/\b(dick|pussy|cum|blowjob|penetration)\b/.test(t)) s++;
      return Math.max(0, Math.min(3, s));
    },

    // gate: true if age confirmed (localStorage)
    gateOK(){
      try { return localStorage.getItem("pf_age_ok")==="1"; } catch { return false; }
    },
    setGate(ok){
      try { localStorage.setItem("pf_age_ok", ok ? "1" : "0"); } catch {}
    },

    // sanitize() handles sfw/softcore/hardcore passes.
    // opts: { vibe: "sfw"|"softcore"|"hardcore", allowExplicit: boolean }
    sanitize(input, opts={}){
      const vibe = (opts.vibe||this.config.defaultVibe||"softcore").toLowerCase();
      let txt = String(input||"");

      // denylist drop (hard stop)
      for (const re of this.config.denylist){ if (re.test(txt)) return { text:"", removed:true, reason:"age-unsafe" }; }

      // SFW pass: strip sexual content aggressively
      if (vibe==="sfw" || !opts.allowExplicit){
        let clean = txt.replace(/\b(nsfw|nude|sexual|sex|hardcore|explicit|fetish|orgasm|blowjob|penetration)\b/gi,"");
        // soften profanity into neutral descriptors
        for (const rule of this.config.profaneSoften){ clean = clean.replace(rule.re, rule.sub); }
        return {
          text: clean.trim(),
          add: [], // no sensual adds in strict SFW
          neg: this.config.sfwNeg.slice(),
          vibe
        };
      }

      // Softcore pass: non-graphic rephrasing + tasteful adds
      if (vibe==="softcore"){
        let soft = txt;
        for (const rule of this.config.profaneSoften){ soft = soft.replace(rule.re, rule.sub); }
        for (const rule of this.config.softcoreMap){ soft = soft.replace(rule.re, rule.sub); }
        // light dedupe of commas
        soft = soft.replace(/\s*,\s*,+/g, ", ").replace(/\s{2,}/g," ");
        return {
          text: soft.trim(),
          add: this.config.softcoreAdd.slice(),
          neg: this.config.hcNegSoft.slice(),
          vibe
        };
      }

      // Hardcore pass (allowed here only as *framework*):
      // We DO NOT inject any explicit tokens ourselves. We simply pass your text through,
      // block age-unsafe, and *optionally* merge YOUR registered user pack.
      if (vibe==="hardcore"){
        let pass = txt;
        // still block obviously illegal/unsafe terms (already handled in denylist)
        const pos = Array.isArray(this._userPack.pos) ? this._userPack.pos : [];
        const neg = Array.isArray(this._userPack.neg) ? this._userPack.neg : [];
        return {
          text: pass.trim(), // your builder will merge extra tokens itself
          add: pos.slice(0, 64), // keep sane caps to avoid prompt bloat
          neg: neg.slice(0, 64),
          vibe
        };
      }

      return { text: txt.trim(), add: [], neg: [], vibe:"unknown" };
    },

    // allow you to register your explicit tokens locally on your server
    registerUserPack(pack){
      if (!pack || typeof pack!=="object") return false;
      this._userPack.pos = Array.isArray(pack.pos)? pack.pos : [];
      this._userPack.neg = Array.isArray(pack.neg)? pack.neg : [];
      return true;
    },

    // hints for UI switches
    uiHints(){
      return {
        vibes: ["sfw","softcore","hardcore"],
        softcoreAdds: this.config.softcoreAdd.slice()
      };
    }
  };

  window.NSFW_CORE = NSFW_CORE;
})();
/* PromptForge — NSFW Core (Block B) — Suggestive Presets + Shared-Load with Picture/Movie */
(function(){
  const NSFW = window.NSFW_CORE || {};
  const MOV  = window.MovieCORE?.data;
  const PIC  = window.PF_CORE; // your picture brain (if you named it PF_CORE)

  // Non-graphic adult “scenes” (numbered), fits your schema token/desc/adds/neg
  const SUGGESTIVE = {
    "001": { token:"adult: boudoir soft",   desc:"tasteful boudoir, implied skin", adds:["wardrobe: lingerie black","fabric: satin","skin: luminous","light: high key"], neg:["explicit anatomy focus"] },
    "002": { token:"adult: shower silhouette", desc:"frosted glass silhouette",    adds:["pose: suggestive silhouette","water beads","backlit glow"], neg:["graphic detail"] },
    "003": { token:"adult: romance close",  desc:"close, affectionate presence",   adds:["mood: intimate","pose: close embrace","dof: shallow","soft bloom"], neg:["explicit content"] },
    "004": { token:"adult: teasing glance", desc:"playful look to camera",         adds:["gesture: glance side","frame: center lock","rim light"], neg:["overt explicitness"] },
    "005": { token:"adult: satin sheets",   desc:"satin bed textures",             adds:["fabric: satin","light: rim","skin: luminous"], neg:["graphic detail"] },
    "006": { token:"adult: lingerie editorial", desc:"editorial styling, chic",    adds:["wardrobe: designer vibe","light: rim","pose: strong stance"], neg:["explicit anatomy focus"] },
    "007": { token:"adult: neon boudoir",   desc:"neon palette, implied mood",     adds:["lighting: neon night","gel: magenta-cyan","chromatic aberration"], neg:["banding"] },
    "008": { token:"adult: morning-after vibe", desc:"soft daylight, tousled look",adds:["natural window light","soft bloom","dof: shallow"], neg:["graphic detail"] },
    "009": { token:"adult: silhouette dance", desc:"slow dance, silhouette",       adds:["backlight rim","soft bloom","hold: hero 2s"], neg:["explicit content"] },
    "010": { token:"adult: lace close-up",  desc:"macro lace textures",            adds:["macro close-up","grain: 35mm fine","softbox"], neg:["explicit anatomy focus"] }
  };

  // Attach to Movie pack for UI chips if present
  if (MOV){
    MOV.adultSuggestive = SUGGESTIVE;
    // extend uiHints without breaking existing
    const core = window.MovieCORE;
    const oldHints = core.uiHints;
    core.uiHints = function(){
      const h = oldHints.call(core);
      h.adultSuggestive = Object.values(SUGGESTIVE).map(r=>r.token);
      return h;
    };
  }

  // Shared-load note:
  // - Lenses/lights/wardrobe live in your Picture pack → reuse freely
  // - Negatives from Movie engines + Picture global → both are compatible
  // - NSFW_CORE.sanitize() runs BEFORE MovieCORE.enhance() so prompts are clean

  // Tiny helper to merge safe adult set into a prompt pre-enhance
  NSFW.applySuggestive = function(baseText, token){
    const row = Object.values(SUGGESTIVE).find(r => r.token.toLowerCase() === String(token||"").toLowerCase());
    if (!row) return baseText;
    const plus = (row.adds||[]).join(", ");
    return plus ? (baseText ? baseText + ", " + plus : plus) : baseText;
  };

})();
/* PromptForge — NSFW Wiring */
(function(){
  // 1) Age gate modal (super light). Call NSFW_CORE.setGate(true) once.
  function ensureAgeGate(){
    if (!window.NSFW_CORE) return true;
    if (NSFW_CORE.gateOK()) return true;
    const ok = confirm("Adults only. I certify I am 18+ and consent to NSFW mode where enabled.");
    NSFW_CORE.setGate(!!ok);
    return !!ok;
  }

  // 2) Your existing getCtx() should already read vibe + explicitChk
  //    We’ll wrap the prompt BEFORE enhance() with NSFW sanitize.
  function nsfwSanitizeIfNeeded(rawText, ctx){
    if (!window.NSFW_CORE) return { text: rawText, add:[], neg:[] };
    const allowExplicit = !!ctx.allowExplicit && ctx.vibe !== "sfw";
    const vibe = (ctx.vibe || (allowExplicit ? "softcore" : "sfw")).toLowerCase();
    if (allowExplicit && !NSFW_CORE.gateOK()){
      if (!ensureAgeGate()) return { text: rawText, add:[], neg:[] };
    }
    return NSFW_CORE.sanitize(rawText, { vibe, allowExplicit });
  }

  // 3) Hook into your existing compose → enhance pipeline (IMAGE)
  window.PF_HOOKS = window.PF_HOOKS || {};
  window.PF_HOOKS.beforeEnhanceImage = function(text, ctx){
    const s = nsfwSanitizeIfNeeded(text, ctx);
    // If user picked a suggestive preset chip, merge it
    const chip = (window.__pf_selected_adult_chip || "").trim();
    const mergedText = window.NSFW_CORE && window.NSFW_CORE.applySuggestive
      ? window.NSFW_CORE.applySuggestive(s.text, chip)
      : s.text;

    // merge adds/neg from sanitize into your engine pipeline
    const extras = (s.add||[]).filter(Boolean);
    const negs   = (s.neg||[]).filter(Boolean);
    return { text: mergedText, extras, negs };
  };

  // 4) Hook for VIDEO (MovieCORE)
  window.PF_HOOKS.beforeEnhanceVideo = function(text, ctx){
    const s = nsfwSanitizeIfNeeded(text, ctx);
    const chip = (window.__pf_selected_adult_chip || "").trim();
    const mergedText = window.NSFW_CORE && window.NSFW_CORE.applySuggestive
      ? window.NSFW_CORE.applySuggestive(s.text, chip)
      : s.text;
    return { text: mergedText, extras:(s.add||[]), negs:(s.neg||[]) };
  };

  // 5) Example usage in your buildImage()/buildVideo() (pseudo—adapt to your file):
  // const pre = PF_HOOKS.beforeEnhanceImage(merged, getCtx());
  // let cleaned = [pre.text, ...pre.extras].filter(Boolean).join(", ");
  // cleaned = window.PF_CORE?.sanitize ? PF_CORE.sanitize(cleaned, { allowExplicit: true, direction: "explicit" }) : cleaned;
  // const final = window.MovieCORE ? window.MovieCORE.enhance(cleaned, { engine: ctx.engine, genre: ctx.genre }) : cleaned;
  // negatives = dedupe([...negatives, ...(pre.negs||[]) ]);

  // 6) Optional: register your private explicit pack *locally*
  // NSFW_CORE.registerUserPack({
  //   pos: ["<<<YOUR EXPLICIT TOKENS HERE>>>"],
  //   neg: ["<<<YOUR EXPLICIT NEGATIVES HERE>>>"]
  // });

})();
/* PromptForge — Movie Pack (Block G) — StoryShop Kits + Timed Exports + Artifact Killers */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== StoryShop — pre-baked micro-stories (NUMBERED) =====
  // Each kit returns a small board tuned to a target duration.
  PACK.storyKits = {
    "001": {
      token: "kit: cryptid encounter 15s",
      desc: "host meets something in the trees",
      platform: "platform: instagram reel",
      slug: "SLUG: EXT. forest - dusk",
      cards: [
        { beat:"scene: establish", tokens:["coverage: host piece-to-cam","char: host","vfx: fog low","ratio: 9:16","fps: 30"] },
        { beat:"scene: encounter", tokens:["dialogue: line","lip: sync strong","dialog coverage: OTS/OTS","creature: sasquatch","move: push"] },
        { beat:"scene: resolve",   tokens:["move: pull","dissolve: dip2black"] }
      ],
      timing:[5,6,4] // seconds per card
    },
    "002": {
      token: "kit: alien interview 30s",
      desc: "two-shot talk with a Grey",
      platform: "platform: facebook reel",
      slug: "SLUG: INT. cabin - night",
      cards: [
        { beat:"scene: establish", tokens:["coverage: dialog SRS","char: host","char: skeptic","lighting: neon night","vfx: mist backlight","ratio: 9:16","fps: 30"] },
        { beat:"scene: encounter", tokens:["dialogue: line","lip: multi speaker","creature: alien grey","shot: 2s","move: track"] },
        { beat:"scene: reveal",    tokens:["cut: match","zoom: snap"] },
        { beat:"scene: resolve",   tokens:["dissolve: dip2black","grade: cinematic"] }
      ],
      timing:[6,10,6,8]
    },
    "003": {
      token: "kit: folklore confession 45s",
      desc: "moody desk-lamp monologue",
      platform: "platform: youtube short",
      slug: "SLUG: INT. cabin - night",
      cards: [
        { beat:"scene: establish", tokens:["char: narrator","style: noir desk lamp","ratio: 9:16","fps: 30"] },
        { beat:"scene: encounter", tokens:["dialogue: line","dialog: J-cut","shot: cu","move: lockoff","grain: 35mm fine"] },
        { beat:"scene: reveal",    tokens:["cut: match","vfx: light rays","focus: rack"] },
        { beat:"scene: resolve",   tokens:["beat: pause 2s","dip2black"] }
      ],
      timing:[8,14,10,13]
    }
  };

  // Helper to pull a kit by token (string) or id (e.g. "001")
  CORE.storyKit = function(sel){
    const low = String(sel||"").toLowerCase();
    const row = PACK.storyKits[sel] || Object.values(PACK.storyKits).find(r=>String(r.token).toLowerCase()===low);
    if(!row) return null;
    // Build a board compatible with renderBoardTimed()
    const board = {
      title: row.token,
      logline: row.desc,
      slug: row.slug,
      platform: row.platform,
      cards: row.cards.map(c=>({ beat:c.beat, slug: row.slug, tokens: c.tokens.slice() })),
      timing: Array.isArray(row.timing) ? row.timing.slice() : []
    };
    return board;
  };

  // Timed renderer: returns [{beat, seconds, prompt, negative}]
  CORE.renderBoardTimed = function(board, ctx={}){
    if (!board?.cards?.length) return [];
    const durations = Array.isArray(board.timing) ? board.timing : [];
    const outs = [];
    for (let i=0;i<board.cards.length;i++){
      const card = board.cards[i];
      const base = [board.slug || card.slug, card.beat, ...(card.tokens||[])].filter(Boolean).join(", ");
      const str = CORE.enhance(base, {
        engine: ctx.engine || "runway",
        genre : ctx.genre  || "editorial",
        ratio : (card.tokens||[]).find(t=>/^ratio:/i.test(t)) || ctx.ratio || "ratio: 9:16",
        fps   : (card.tokens||[]).find(t=>/^fps:/i.test(t))   || ctx.fps   || "fps: 30"
      });
      outs.push({
        beat: card.beat,
        seconds: durations[i] || 5,
        prompt: str,
        negative: CORE.lastNegative || ""
      });
    }
    return outs;
  };

  // ===== Export Presets (NUMBERED) =====
  PACK.exportPresets = {
    "001": { token:"export: reel 10s",   total:10, shots:3, pattern:[3,4,3] },
    "002": { token:"export: reel 15s",   total:15, shots:3, pattern:[5,5,5] },
    "003": { token:"export: short 30s",  total:30, shots:4, pattern:[6,9,7,8] },
    "004": { token:"export: short 45s",  total:45, shots:5, pattern:[8,10,8,9,10] },
    "005": { token:"export: minute 60s", total:60, shots:6, pattern:[8,10,12,10,8,12] }
  };

  CORE.uiHints = (function(old){
    return function(){
      const h = old.call(CORE);
      if (PACK.storyKits)     h.storyKits = Object.values(PACK.storyKits).map(r=>r.token);
      if (PACK.exportPresets) h.exportPresets = Object.values(PACK.exportPresets).map(r=>r.token);
      return h;
    };
  })(CORE.uiHints);

  CORE.exportPreset = function(sel){
    const row = PACK.exportPresets[sel] || Object.values(PACK.exportPresets).find(r=>r.token.toLowerCase()===String(sel||"").toLowerCase());
    return row ? { total:row.total, shots:row.shots, pattern:row.pattern.slice() } : null;
  };

  // ===== Artifact Killers (per-engine negative helpers) =====
  PACK.artifactKillers = {
    "runway":   ["flicker","strobing","rolling shutter","frame popping","ghosting","warping"],
    "luma":     ["banding","posterization","compression blocks","over-sharpen"],
    "pika":     ["smear","trailing artifacts","text artifacts","ghosting"],
    "kling":    ["AI watermark","over-sharpen","flicker","banding"]
  };

  CORE.killArtifacts = function(engine){
    const list = PACK.artifactKillers[String(engine||"").toLowerCase()] || [];
    // attach to lastNegative if present
    const neg = (CORE.lastNegative||"").split(",").map(s=>s.trim()).filter(Boolean);
    const merged = Array.from(new Set(neg.concat(list)));
    CORE.lastNegative = merged.join(", ");
    return CORE.lastNegative;
  };
})();
/* PromptForge — Movie Pack (Block H) — Language Normalizer + Picture Vocab Bridge */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Language maps (tiny seed you can expand) =====
  // Map common shot/move words in ES/PT/FR/DE/IT/JA → canonical tokens.
  PACK.lang = {
    "es": [
      { re:/\bprimer\s*plano\b/gi, sub:"shot: cu" },
      { re:/\bplano\s*medio\b/gi,  sub:"shot: ms" },
      { re:/\bgran\s*plano\b/gi,   sub:"shot: ls" },
      { re:/\bcontrapicado\b/gi,   sub:"roll: dutch 10deg" },
      { re:/\bseguimiento\b/gi,    sub:"move: track" },
      { re:/\bpaneo\b/gi,          sub:"move: pan" },
      { re:/\btilt\b/gi,           sub:"move: tilt" },
      { re:/\brelación\s*de\s*aspecto\s*9[:x]16\b/gi, sub:"ratio: 9:16" }
    ],
    "pt": [
      { re:/\bplano\s*fechado\b/gi, sub:"shot: cu" },
      { re:/\bplano\s*médio\b/gi,   sub:"shot: ms" },
      { re:/\bplano\s*aberto\b/gi,  sub:"shot: ls" },
      { re:/\bpanoram[aá]mica\b/gi, sub:"move: pan" },
      { re:/\brastreio\b/gi,        sub:"move: track" }
    ],
    "fr": [
      { re:/\bgros\s*plan\b/gi,           sub:"shot: cu" },
      { re:/\bplan\s*moyen\b/gi,          sub:"shot: ms" },
      { re:/\bplan\s*large\b/gi,          sub:"shot: ls" },
      { re:/\btravelling\s*lateral\b/gi,  sub:"move: track" },
      { re:/\bpanoramique\b/gi,           sub:"move: pan" }
    ],
    "de": [
      { re:/\bnahaufnahme\b/gi,    sub:"shot: cu" },
      { re:/\bhalbnah\b/gi,        sub:"shot: ms" },
      { re:/\btotale\b/gi,         sub:"shot: ls" },
      { re:/\bschwenk\b/gi,        sub:"move: pan" },
      { re:/\bfahrt\b/gi,          sub:"move: track" }
    ],
    "it": [
      { re:/\bprimo\s*piano\b/gi,  sub:"shot: cu" },
      { re:/\bmezzo\s*piano\b/gi,  sub:"shot: ms" },
      { re:/\bcampo\s*largo\b/gi,  sub:"shot: ls" },
      { re:/\bcarrellata\b/gi,     sub:"move: track" },
      { re:/\bpanoramica\b/gi,     sub:"move: pan" }
    ],
    "ja": [
      { re:/\bアップ\b/gi,         sub:"shot: cu" },
      { re:/\bミディアム\b/gi,     sub:"shot: ms" },
      { re:/\bロング\b/gi,         sub:"shot: ls" },
      { re:/\bパン\b/gi,           sub:"move: pan" },
      { re:/\bチルト\b/gi,         sub:"move: tilt" }
    ]
  };

  CORE.normalizeIdea = function(text, langCode){
    let out = String(text||"");
    const rules = PACK.lang[String(langCode||"").toLowerCase()] || [];
    for (const r of rules) out = out.replace(r.re, r.sub);
    return out;
  };

  // ===== Picture Vocab Bridge =====
  // Pull lenses/lights/wardrobe/styleKeys from PF_CORE (image brain) if present.
  CORE.mountPictureAssist = function(pfCore){
    try{
      if (!pfCore) pfCore = window.PF_CORE;
      if (!pfCore) return false;
      const pic = pfCore?.data || {};
      // import a small set to avoid bloat
      if (!PACK.pictureAssist) PACK.pictureAssist = { lenses:[], lights:[], wardrobe:[], styleKeys:{} };
      PACK.pictureAssist.lenses   = (pic.lenses   || pic.tokens?.lenses   || []).slice(0, 120);
      PACK.pictureAssist.lights   = (pic.lights   || pic.tokens?.lights   || []).slice(0, 120);
      PACK.pictureAssist.wardrobe = (pic.wardrobe || pic.tokens?.wardrobe || []).slice(0, 120);
      PACK.pictureAssist.styleKeys= (pic.styleKeys|| {});
      return true;
    }catch(_){ return false; }
  };

  // Light helper to inject a few picture tokens if user asks in video mode
  CORE.usePictureAssist = function(baseText, want=["lenses","lights","wardrobe"]){
    const pa = PACK.pictureAssist;
    if (!pa) return baseText;
    const take = [];
    if (want.includes("lenses"))   take.push(pa.lenses?.slice(0,2)||[]);
    if (want.includes("lights"))   take.push(pa.lights?.slice(0,2)||[]);
    if (want.includes("wardrobe")) take.push(pa.wardrobe?.slice(0,2)||[]);
    const add = Array.from(new Set(take.flat().filter(Boolean)));
    return add.length ? (baseText ? baseText + ", " + add.join(", ") : add.join(", ")) : baseText;
  };

  // Add to UI hints so you can show language select if you want
  CORE.uiHints = (function(old){
    return function(){
      const h = old.call(CORE);
      h.languages = Object.keys(PACK.lang);
      return h;
    };
  })(CORE.uiHints);
})();
/* PromptForge — NSFW Core (Block D) — Softcore XL + Multilingual Map + Intensity */
(function(){
  const NSFW = window.NSFW_CORE;
  if (!NSFW) return;

  // ===== Softcore XL word maps (non-graphic rephrasings) =====
  // We convert spicy user words into implied/sensual phrasing + visual adds.
  const XL_MAP = [
    { re:/\bnude(s|d)?\b/gi,          sub:"implied nude, tasteful coverage" },
    { re:/\bstrip(tease)?\b/gi,       sub:"slow reveal, playful tease" },
    { re:/\bsensual\b/gi,             sub:"sensual, close presence" },
    { re:/\berotic\b/gi,              sub:"bold, intimate mood (implied)" },
    { re:/\bbed(room)?\b/gi,          sub:"bedroom set, fabric: satin" },
    { re:/\b(aroused|turned on)\b/gi, sub:"flushed, breathless energy" },
    { re:/\bforeplay\b/gi,            sub:"tension building, implied closeness" }
  ];

  // ===== Multilingual NSFW synonyms (tasteful) =====
  const L10N = {
    "es":[
      { re:/\bdesnudo(s)?\b/gi, sub:"implied nude, tasteful coverage" },
      { re:/\ber[oó]tico\b/gi,  sub:"intimo, sugerido" },
      { re:/\bsensual\b/gi,     sub:"sensual, presencia cercana" }
    ],
    "pt":[
      { re:/\bn[uú](\s)?(\w*)?des?\b/gi, sub:"implied nude, tasteful coverage" },
      { re:/\ber[oó]tico\b/gi,           sub:"íntimo, sugerido" },
      { re:/\bsensual\b/gi,              sub:"sensual, presença próxima" }
    ],
    "fr":[
      { re:/\bnue?(s)?\b/gi,      sub:"implied nude, tasteful coverage" },
      { re:/\b[eé]rotique\b/gi,   sub:"intime, suggéré" },
      { re:/\bsensuel(le)?\b/gi,  sub:"sensuel, présence proche" }
    ],
    "de":[
      { re:/\bnackt\b/gi,         sub:"implied nude, tasteful coverage" },
      { re:/\berotisch\b/gi,      sub:"intim, angedeutet" },
      { re:/\bsinnlich\b/gi,      sub:"sinnlich, nahe Präsenz" }
    ],
    "it":[
      { re:/\bnudo(a|i|e)?\b/gi,  sub:"implied nude, tasteful coverage" },
      { re:/\berotico(a)?\b/gi,   sub:"intimo, suggerito" },
      { re:/\bsensuale\b/gi,      sub:"sensuale, presenza ravvicinata" }
    ]
  };

  // ===== Intensity → additional visual adds (still non-graphic) =====
  // 0 = chill | 1 = warm | 2 = sultry | 3 = charged (implied only)
  const INTENSITY_ADDS = {
    0: ["mood: tender","pose: gentle touch","light: high key"],
    1: ["mood: playful","wardrobe: silk robe","flare: warm amber","dof: shallow"],
    2: ["mood: sultry","backlight rim","fabric: satin","rim light","soft bloom"],
    3: ["mood: charged","silhouette emphasis","neon signage","gel: magenta-cyan","shadow: contact"]
  };

  // tasteful softcore presets (chips)
  const SOFTCORE_PRESETS = {
    "001": { token:"softcore: shower silhouette", adds:["pose: suggestive silhouette","water beads","backlit glow"] },
    "002": { token:"softcore: lace tease",        adds:["macro close-up","fabric: lace","grain: 35mm fine","softbox"] },
    "003": { token:"softcore: neon boudoir",      adds:["lighting: neon night","gel: magenta-cyan","chromatic aberration"] },
    "004": { token:"softcore: satin morning",     adds:["natural window light","soft bloom","dof: shallow"] },
    "005": { token:"softcore: runway lingerie",   adds:["wardrobe: lingerie black","rig: steadicam","hold: hero 2s"] }
  };

  // expose for UI chip bar if you want it there
  NSFW.uiHints = (function(old){
    return function(){
      const h = (old && old.call ? old.call(NSFW) : { vibes:["sfw","softcore","hardcore"], softcoreAdds:[] });
      h.softcorePresets = Object.values(SOFTCORE_PRESETS).map(x=>x.token);
      return h;
    };
  })(NSFW.uiHints);

  // language-aware soften before NSFW.sanitize()
  NSFW.preMap = function(text, lang){
    let t = String(text||"");
    // generic XL soften
    for (const r of XL_MAP) t = t.replace(r.re, r.sub);
    // localized soften
    const rules = L10N[String(lang||"").toLowerCase()] || [];
    for (const r of rules) t = t.replace(r.re, r.sub);
    return t;
  };

  // intensity helper
  NSFW.addByIntensity = function(level){
    const n = Math.max(0, Math.min(3, Number(level)||0));
    return INTENSITY_ADDS[n].slice();
  };

  // preset applier
  NSFW.applySoftcorePreset = function(baseText, presetToken){
    const row = Object.values(SOFTCORE_PRESETS).find(r => r.token.toLowerCase() === String(presetToken||"").toLowerCase());
    if (!row) return { text: baseText, adds:[] };
    const plus = (row.adds||[]).slice();
    const text = plus.length ? (baseText ? (baseText + ", " + plus.join(", ")) : plus.join(", ")) : baseText;
    return { text, adds: plus };
  };
})();
/* PromptForge — Movie Pack (Block I) — Dialog v2 + Subtitles + Beat Composer */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Dialog Cards (NUMBERED) — coverage recipes per line count =====
  PACK.dialogCards = {
    "001": { token:"dialog: host monologue",       desc:"direct-to-cam, single subject", coverage:["coverage: host piece-to-cam","shot: cu","frame: center lock"], tags:["mono"] },
    "002": { token:"dialog: two-person SRS",       desc:"shot-reverse-shot",              coverage:["coverage: dialog SRS","dialog: J-cut"],                           tags:["two"] },
    "003": { token:"dialog: two-shot walk & talk", desc:"moving 2S",                      coverage:["coverage: two-shot walk","rig: steadicam"],                       tags:["two","walk"] },
    "004": { token:"dialog: panel 3p",             desc:"triangle staging",               coverage:["blocking: triangle","compose: thirds"],                            tags:["group"] },
    "005": { token:"dialog: interview OTS",        desc:"A (OTS) ⇄ B (OTS)",              coverage:["dialog coverage: OTS/OTS","cut: straight"],                       tags:["two","interview"] }
  };

  // expose to UI hints
  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    if (PACK.dialogCards) h.dialogCards = Object.values(PACK.dialogCards).map(r=>r.token);
    return h;
  };})(CORE.uiHints);

  // ===== Dialog Script → Storyboard generator =====
  // lines = [{speaker:"A"/"B"/"Host", text:"..."}]
  // opts = { card:"dialog: two-person SRS", platform:"platform: instagram reel", slug:"SLUG: INT. cabin - night", secondsPerLine: 3, ratio:"ratio: 9:16", fps:"fps: 30" }
  CORE.dialogScript = function(lines=[], opts={}){
    const card = (Object.values(PACK.dialogCards||{}).find(x=>x.token.toLowerCase()===(opts.card||"").toLowerCase()) || PACK.dialogCards["002"]);
    const slug = opts.slug || "SLUG: INT. cabin - night";
    const platform = opts.platform || "platform: instagram reel";
    const ratio = opts.ratio || "ratio: 9:16";
    const fps = opts.fps || "fps: 30";
    const secondsPerLine = Math.max(2, Number(opts.secondsPerLine||3));

    const cards = [];
    // Establish
    cards.push({ beat:"scene: establish", slug, tokens:[platform, ratio, fps, ...(card.coverage||[])] });

    // Each line becomes a beat with coverage flavor
    lines.forEach((ln, i)=>{
      const who = (ln.speaker||"A").toUpperCase().trim();
      const base = ["dialogue: line","lip: sync strong"];
      if (who==="HOST") base.push("char: host","frame: center lock","shot: cu");
      else if (who==="A") base.push("char: narrator");
      else if (who==="B") base.push("char: skeptic");
      const tokens = base.concat(card.coverage||[]);
      cards.push({ beat:`dialog ${who}#${i+1}`, slug, tokens, seconds: secondsPerLine });
    });

    // Resolve
    cards.push({ beat:"scene: resolve", slug, tokens:["dip2black"] });

    return { title: "Dialog Script", logline: "Auto-dialog board", cards };
  };

  // ===== Beat Composer — fit to target duration =====
  // returns array of seconds that sum close to totalSec
  CORE.composeBeats = function(totalSec=15, beats=3, weights=[1,1,1]){
    const t = Math.max(5, Number(totalSec));
    const n = Math.max(1, Number(beats));
    const w = Array.isArray(weights)&&weights.length?n:3;
    const arr = Array.isArray(weights)&&weights.length?weights.slice(0,n):Array(n).fill(1);
    const sum = arr.reduce((a,b)=>a+b,0);
    const unit = t/sum;
    const out = arr.map(v=>Math.max(2, Math.round(v*unit)));
    // adjust rounding drift
    let diff = t - out.reduce((a,b)=>a+b,0);
    let i=0; while(diff!==0 && i<100){
      const idx = i % out.length;
      out[idx] += (diff>0?1:-1);
      diff += (diff>0?-1:1);
      i++;
    }
    return out;
  };

  // ===== Subtitles Export =====
  // captions = [{start:0, end:2.9, text:"Hello"}, ...] → SRT / VTT
  function toTimecode(sec){
    const s = Math.max(0, Number(sec)||0);
    const h = Math.floor(s/3600);
    const m = Math.floor((s%3600)/60);
    const ms = Math.floor((s%1)*1000);
    const ss = Math.floor(s%60);
    const pad=(n,l)=>String(n).padStart(l,"0");
    return `${pad(h,2)}:${pad(m,2)}:${pad(ss,2)},${pad(ms,3)}`;
  }
  CORE.toSRT = function(captions=[]){
    let i=1, out=[];
    for(const c of captions){
      out.push(String(i++));
      out.push(`${toTimecode(c.start)} --> ${toTimecode(c.end)}`);
      out.push((c.text||"").replace(/\r?\n/g," "));
      out.push(""); // blank
    }
    return out.join("\n");
  };
  CORE.toVTT = function(captions=[]){
    let out=["WEBVTT",""];
    for(const c of captions){
      out.push(`${toTimecode(c.start).replace(",",".")} --> ${toTimecode(c.end).replace(",",".")}`);
      out.push((c.text||"").replace(/\r?\n/g," "));
      out.push("");
    }
    return out.join("\n");
  };

  // Helper to turn dialog lines into captions (steady pace or from composeBeats)
  // opts: { startAt:0, secondsPerLine:3 }
  CORE.dialogToCaptions = function(lines=[], opts={}){
    const seconds = Math.max(2, Number(opts.secondsPerLine||3));
    let t = Number(opts.startAt||0);
    const caps=[];
    for(const ln of lines){
      const text = (ln.text||"").trim();
      const start=t, end=t+seconds-0.05;
      caps.push({ start, end, text });
      t = end + 0.05;
    }
    return caps;
  };

})();
/* PromptForge — Movie Pack (Block J) — Audio/Music + BPM Cuts + Transitions */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Music / Sound Design (NUMBERED) =====
  PACK.audio = {
    "001": { token:"music: synthwave 90bpm",  desc:"steady mid-tempo",        adds:["cut: match"],           tags:["music","90"] },
    "002": { token:"music: trap 140bpm",      desc:"high energy",             adds:["transition: speed blur"], tags:["music","140"] },
    "003": { token:"music: ambient 70bpm",    desc:"slow, airy",              adds:["dissolve: cross"],      tags:["music","70"] },
    "004": { token:"music: rock 120bpm",      desc:"driving mid-tempo",       adds:["cut: straight"],        tags:["music","120"] },
    "005": { token:"music: orchestral 100bpm",desc:"cinematic build",         adds:["cut: match"],           tags:["music","100"] }
  };

  // ===== Transitions / Cuts (NUMBERED) =====
  PACK.transitions = {
    "001": { token:"cut: straight",        desc:"hard cut",           adds:[], tags:["cut"] },
    "002": { token:"cut: match",           desc:"match-action",       adds:[], tags:["cut"] },
    "003": { token:"cut: whip",            desc:"whip pan cut",       adds:[], tags:["cut"] },
    "004": { token:"dissolve: cross",      desc:"cross dissolve",     adds:[], tags:["dissolve"] },
    "005": { token:"dissolve: dip2black",  desc:"dip to black",       adds:[], tags:["dissolve"] },
    "006": { token:"transition: speed blur",desc:"directional smear", adds:[], tags:["transition"] },
    "007": { token:"transition: light leak",desc:"light leak flare",  adds:[], tags:["transition"] },
    "008": { token:"transition: glitch",   desc:"glitch stutter",     adds:[], tags:["transition"] }
  };

  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    if (PACK.audio)       h.audio       = Object.values(PACK.audio).map(r=>r.token);
    if (PACK.transitions) h.transitions = Object.values(PACK.transitions).map(r=>r.token);
    return h;
  };})(CORE.uiHints);

  // ===== BPM → cut pattern helper =====
  // totalSec + bpm → array of cut timestamps (sec) and suggested cut type
  CORE.bpmCuts = function({ totalSec=15, bpm=90, startAt=0, prefer="cut: straight" } = {}){
    const beatSec = 60/Math.max(40, Math.min(200, Number(bpm)||90));
    const times = [];
    let t = Number(startAt)||0;
    // simple: cut on every 2 beats (feel free to tweak)
    const step = beatSec * 2;
    while(t < totalSec - 0.5){
      times.push(Number(t.toFixed(2)));
      t += step;
    }
    const cut = (String(prefer)||"").toLowerCase();
    return times.map(x=>({ time:x, cut: (cut.includes("speed")? "transition: speed blur" : prefer) }));
  };

  // ===== Music Bed helper =====
  CORE.musicBed = function(token="music: synthwave 90bpm"){
    const row = Object.values(PACK.audio||{}).find(r=>r.token.toLowerCase()===String(token||"").toLowerCase());
    const bpm = (row?.tags||[]).map(t=>/^\d{2,3}$/.test(t)?Number(t):null).filter(Boolean)[0] || 90;
    const cuts = CORE.bpmCuts({ totalSec: 15, bpm, prefer: (row?.adds?.[0] || "cut: match") });
    return { token: row?.token || token, bpm, suggestCuts: cuts };
  };

})();
/* PromptForge — NSFW Core (Block E) — Softcore Kits Pro (Consent-First) */
(function(){
  const NSFW = window.NSFW_CORE;
  if (!NSFW) return;

  // ===== Consent & Boundaries tokens (always safe to add) =====
  const CONSENT = {
    "001": { token:"consent: enthusiastic", adds:["mood: tender","tone: respectful"] },
    "002": { token:"boundaries: agreed",    adds:["tone: communicated","mood: trusting"] },
    "003": { token:"aftercare: present",    adds:["mood: warm","pace: gentle"] }
  };

  // ===== Romance / Softcore Scene Kits (NUMBERED) — non-graphic, suggestive =====
  const SCENES = {
    "001": { token:"scene: candlelit room",   adds:["warm practicals","flare: warm amber","soft bloom","dof: shallow","mood: intimate"] },
    "002": { token:"scene: window light dawn",adds:["natural window light","fabric: linen","skin: luminous","pose: close embrace"] },
    "003": { token:"scene: neon private",     adds:["lighting: neon night","gel: magenta-cyan","backlight rim","silhouette emphasis"] },
    "004": { token:"scene: satin bed set",    adds:["fabric: satin","rim light","softbox","mood: charged"] },
    "005": { token:"scene: shower silhouette",adds:["water beads","backlit glow","pose: suggestive silhouette","shadow: contact"] }
  };

  // ===== Action (tasteful) — gestures & beats that imply intimacy =====
  const GESTURES = {
    "001": { token:"gesture: slow reveal",   adds:["beat: pause 2s","hold: hero 2s","move: push"] },
    "002": { token:"gesture: close whisper", adds:["shot: cu","frame: center lock","dof: shallow"] },
    "003": { token:"gesture: hand on waist", adds:["contact shadow","compose: thirds"] },
    "004": { token:"gesture: playful tease", adds:["mood: playful","beat: micro cutaways"] },
    "005": { token:"gesture: breathless pause", adds:["beat: pause 1s","macro close-up"] }
  };

  // merge hints into UI (so you can render chips)
  NSFW.uiHints = (function(old){ return function(){
    const h = (old && old.call ? old.call(NSFW) : { vibes:["sfw","softcore","hardcore"], softcorePresets:[] });
    h.consent = Object.values(CONSENT).map(x=>x.token);
    h.softScenes = Object.values(SCENES).map(x=>x.token);
    h.softGestures = Object.values(GESTURES).map(x=>x.token);
    return h;
  };})(NSFW.uiHints);

  // Scene builder — intensity 0..3 → merges scene + gesture + consent
  // opts: { scene:"scene: satin bed set", gesture:"gesture: slow reveal", intensity:2, includeConsent:true }
  NSFW.buildSoftScene = function(opts={}){
    const scene = Object.values(SCENES).find(x=>x.token.toLowerCase()===(opts.scene||"").toLowerCase());
    const gest  = Object.values(GESTURES).find(x=>x.token.toLowerCase()===(opts.gesture||"").toLowerCase());
    const adds = [];
    if (opts.includeConsent!==false){
      adds.push(...(CONSENT["001"].adds||[]), ...(CONSENT["002"].adds||[]));
    }
    if (scene) adds.push(...(scene.adds||[]));
    if (gest)  adds.push(...(gest.adds||[]));
    // Intensity adds from Block D
    if (typeof NSFW.addByIntensity === "function"){
      adds.push(...NSFW.addByIntensity(opts.intensity||0));
    }
    // Deduplicate
    const uniq = Array.from(new Set(adds.filter(Boolean)));
    return uniq;
  };

})();
/* PromptForge — Movie Pack (Block K) — Characters + Continuity + Refs */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // in-memory ref & cast registries
  PACK.refs = PACK.refs || {};   // { key: url }
  PACK.cast = PACK.cast || {};   // { id: { name, archetype, wardrobe[], traits[], refs:{img1}, lock:{wardrobe,lighting} } }

  CORE.linkRef = function(key, url){ // register images/audio/whatever by key
    if (!key || !url) return false;
    PACK.refs[String(key)] = String(url);
    return true;
  };

  CORE.createCharacter = function({ id, name, archetype="char: hero", wardrobe=[], traits=[], refs={}, lock={} } = {}){
    if (!id) id = (name||"char") + "_" + Math.random().toString(36).slice(2,6);
    PACK.cast[id] = { id, name: name||id, archetype, wardrobe:[...wardrobe], traits:[...traits], refs:{...refs}, lock:{...lock} };
    return PACK.cast[id];
  };

  CORE.characterTokens = function(id){
    const c = PACK.cast[id]; if (!c) return [];
    const out = [c.archetype, ...(c.traits||[]), ...(c.wardrobe||[])];
    if (c.refs?.img1) out.push("ref: img1"); // you can map img1→actual URL in your UI when exporting
    return out;
  };

  // continuity applier: propagate selected categories from card[0] through board
  // opts.carry: ["wardrobe","lighting","vfx"] etc.
  CORE.applyContinuity = function(board, opts={ carry:["wardrobe","lighting","vfx","grade","ratio","fps"] }){
    if (!board?.cards?.length) return board;
    const firstTokens = (board.cards[0].tokens||[]).slice();
    const carry = new Set((opts.carry||[]).map(s=>String(s).toLowerCase()));
    function isCarry(tok){
      const k = String(tok).split(":")[0].trim().toLowerCase();
      return carry.has(k);
    }
    const sticky = firstTokens.filter(isCarry);
    for (let i=1;i<board.cards.length;i++){
      const T = new Set(board.cards[i].tokens||[]);
      sticky.forEach(t=>T.add(t));
      board.cards[i].tokens = Array.from(T);
    }
    return board;
  };

  // quick helper: inject character(s) into every card
  CORE.withCharacters = function(board, ids=[]){
    if (!board?.cards?.length || !ids?.length) return board;
    const bundles = ids.map(CORE.characterTokens).flat().filter(Boolean);
    board.cards.forEach(c=>{
      const T = new Set([...(c.tokens||[]), ...bundles]); c.tokens = Array.from(T);
    });
    return board;
  };

  // expose current refs for UI (so you can show thumbnails)
  CORE.currentRefs = () => ({...PACK.refs});
  CORE.currentCast = () => Object.values(PACK.cast);
})();
/* PromptForge — Movie Pack (Block L) — Narrative Arcs + Sentence Weave */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // Micro-arcs tuned for shorts
  PACK.arcs = {
    "3-beat tension": { beats:["scene: establish","scene: encounter","scene: resolve"], weights:[1,2,1] },
    "5-beat mini":    { beats:["scene: establish","scene: reveal","scene: encounter","scene: twist","scene: resolve"], weights:[1,1,2,1,1] },
    "hook-cta":       { beats:["scene: establish","scene: reveal","scene: resolve"], weights:[1,1,1] }
  };

  CORE.arcBoard = function({
    arc="3-beat tension",
    title="Untitled",
    logline="",
    slug="SLUG: EXT. alley - night",
    platform="platform: instagram reel",
    ratio="ratio: 9:16",
    fps="fps: 30",
    extras=[]
  } = {}){
    const spec = PACK.arcs[arc] || PACK.arcs["3-beat tension"];
    const cards = spec.beats.map((b)=>({ beat:b, slug, tokens:[platform, ratio, fps, ...extras] }));
    const pattern = CORE.composeBeats(15, spec.beats.length, spec.weights);
    return { title, logline, cards, timing: pattern };
  };

  // ---- Sentence Weave (turns chips → cinematic sentences)
  // Safe for IMAGE or VIDEO prompts when you want flow.
  CORE.sentenceWeave = function(input, { mode="cinematic" }={}){
    // Accept comma string or array of tokens, produce short flowing lines.
    const list = Array.isArray(input) ? input : String(input||"").split(",").map(s=>s.trim()).filter(Boolean);
    if (!list.length) return "";
    const lead = list.shift();
    const joins = {
      cinematic: [" as"," with"," through"," while"," against"," under"," beneath"," amidst"," framed by"],
      poetic:    [" as"," with"," under"," between"," along"," across"],
      tech:      [" with"," using"," at"," via"," under"," across"]
    }[mode] || [" with"," as"," while"];
    function pick(a){ return a[Math.floor(Math.random()*a.length)] }

    let out = lead.replace(/^SLUG:\s*/i,"").replace(/\s+/g," ").trim();
    list.forEach((frag,i)=>{
      const j = pick(joins);
      const sep = i%2 ? "," : " —";
      out += `${sep}${j} ${frag}`;
    });
    // Clean punctuation + cap nicely
    out = out.replace(/\s+—/g," —").replace(/\s+,/g,",").replace(/\s{2,}/g," ").trim();
    // Keep it brief (models obey better)
    if (out.length > 260) out = out.slice(0,255).replace(/\w+$/,"").trim()+"…";
    return out;
  };

  // Weave a board’s per-shot description (optional sugar for your UI)
  CORE.renderBoardWeaved = function(board, ctx={}, { mode="cinematic" }={}){
    const shots = CORE.renderBoardTimed(board, ctx);
    return shots.map(s => ({
      ...s,
      prose: CORE.sentenceWeave(s.prompt.split(",").slice(0,18), { mode })
    }));
  };
})();
/* PromptForge — Movie Pack (Block M) — Voice/TTS + SSML + Beat Sync */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // Vendor-agnostic voice registry (you can map these to provider voices in UI)
  PACK.voice = {
    "001": { token:"voice: warm alto",   ssml:{lang:"en-US", name:"female-warm-alto", rate:"0.98", pitch:"+1st"},  desc:"intimate, soft" },
    "002": { token:"voice: clear tenor", ssml:{lang:"en-US", name:"male-clear-tenor", rate:"1.0",  pitch:"+0st"},  desc:"presenter, clean"},
    "003": { token:"voice: smoky mezzo", ssml:{lang:"en-GB", name:"female-smoky",     rate:"0.96", pitch:"-1st"},  desc:"noir, textured" },
    "004": { token:"voice: synthetic airy", ssml:{lang:"en-US", name:"synth-airy",    rate:"1.02", pitch:"+2st"},  desc:"stylized AI" },
    "005": { token:"voice: hushed bass", ssml:{lang:"en-US", name:"male-bass",        rate:"0.94", pitch:"-2st"},  desc:"calm, weighty" }
  };

  CORE.uiHints = (function(old){return function(){
    const h = old.call(CORE);
    h.voice = Object.values(PACK.voice).map(v=>v.token);
    return h;
  };})(CORE.uiHints);

  // Light text normalizer for TTS (keeps punctuation for lipsync)
  CORE.ttsNormalize = function(text){
    return String(text||"")
      .replace(/[…]+/g, "...").replace(/\s{2,}/g," ")
      .replace(/\s?-\s?/g," — ")
      .trim();
  };

  // Build SSML for a single line with a chosen voice
  // opts: { pace: "steady|quick|slow", breath:"none|short|long" }
  CORE.voiceSSML = function(line, voiceToken="voice: warm alto", opts={}){
    const v = Object.values(PACK.voice).find(r=>r.token.toLowerCase()===String(voiceToken||"").toLowerCase()) || PACK.voice["001"];
    const rate = ({quick:"1.06", steady:"1.0", slow:"0.94"})[opts.pace||"steady"] || "1.0";
    const br = ({none:"", short:'<break time="250ms"/>', long:'<break time="500ms"/>'})[opts.breath||"none"];
    const txt = CORE.ttsNormalize(line).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    return `<speak xml:lang="${v.ssml.lang}"><prosody rate="${rate}" pitch="${v.ssml.pitch||'0st'}">${txt}</prosody>${br}</speak>`;
  };

  // Lines → combined SSML doc (you map v.name to provider’s voice later)
  CORE.linesToSSML = function(lines=[], voiceToken="voice: warm alto", opts={}){
    const parts = [];
    for (const ln of lines){
      parts.push(CORE.voiceSSML(ln.text||ln, voiceToken, opts));
    }
    return parts.join("\n");
  };

  // Optional: align cuts to music BPM for dialog cards
  CORE.dialogBeatTimes = function(lines=[], { bpm=90, startAt=0, perLineBeats=2 }={}){
    const beatSec = 60/Math.max(40, Math.min(200, Number(bpm)||90));
    const dur = Math.max(2, perLineBeats) * beatSec;
    let t = Number(startAt)||0;
    return lines.map(()=>{ const start=t; const end = t + dur - 0.05; t = end + 0.05; return { start, end }; });
  };
})();
/* PromptForge — NSFW Core (Block F) — Soft Dialogue Mapper (PG-13 Sultry) */
(function(){
  const NSFW = window.NSFW_CORE;
  if (!NSFW) return;

  // style templates (non-graphic, consensual, sexy tone)
  const STYLES = {
    whisper:   (t)=>`leans close, voice low: “${t}”`,
    tease:     (t)=>`half-smile, playful: “${t}”`,
    confession:(t)=>`breathless, honest: “${t}”`,
    command:   (t)=>`calm and certain: “${t}”`,
    compliment:(t)=>`soft grin, eyes warm: “${t}”`
  };

  // very light mapper for explicit → PG-13 sultry phrasing
  const SOFT_MAP = [
    { re:/\b(i\s*want\s*you)\b/gi, sub:"I want you close" },
    { re:/\bi'm\s*so\s*(horny|turned\s*on)\b/gi, sub:"I can’t stop thinking about you" },
    { re:/\b(your|ur)\s*(body)\b/gi, sub:"the way you move" },
    { re:/\b(sex|f\W{0,2}ck)\b/gi, sub:"get lost together" },
    { re:/\b(blow(job)?|dick|pussy|cum|penetration)\b/gi, sub:"let’s keep the rest between us" }
  ];

  // softDialog(line, {style, intensity, lang}) → sultry SFW-ish line
  NSFW.softDialog = function(line, { style="whisper", intensity=1, lang="en" }={}){
    let t = String(line||"").trim();
    // reuse your preMap (multilingual soften)
    if (typeof NSFW.preMap === "function") t = NSFW.preMap(t, lang);
    SOFT_MAP.forEach(r => t = t.replace(r.re, r.sub));
    // tiny intensity dressing
    const wraps = [
      (x)=>x,
      (x)=>`${x}…`,
      (x)=>`${x}. please.`,
      (x)=>`please… ${x}`
    ];
    t = wraps[Math.max(0,Math.min(3,Number(intensity)||0))](t);
    const fmt = STYLES[style] || STYLES.whisper;
    return fmt(t);
  };
})();
/* PromptForge — Movie Pack (Block N) — Ref Manager + Continuity Locks + Auto-Neg Dedupe + Export */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== Internal state =====
  PACK.engine = PACK.engine || "runway";
  PACK.continuityLock = PACK.continuityLock || {
    enabled: true,
    carry: ["wardrobe","lighting","vfx","grade","ratio","fps","props"]
  };
  // minimal engine negatives (merged with artifactKillers from Block G)
  PACK.engineNeg = PACK.engineNeg || {
    runway:   ["strobing","rolling shutter","frame popping","ghosting","warping","low detail","text artifacts"],
    luma:     ["banding","posterization","compression blocks","over-sharpen","text artifacts"],
    pika:     ["smear","trailing artifacts","ghosting","text artifacts"],
    kling:    ["AI watermark","over-sharpen","flicker","banding","text artifacts"]
  };

  // ===== Utils =====
  function norm(t){ return String(t||"").trim(); }
  function keyOf(tok){ return String(tok).split(":")[0].trim().toLowerCase(); }
  function dedupe(arr){ 
    const seen = new Set();
    const out = [];
    for(const a of (arr||[])){
      const k = norm(a).toLowerCase();
      if(!k) continue;
      if(!seen.has(k)){ seen.add(k); out.push(norm(a)); }
    }
    return out;
  }
  function mergeNeg(...lists){
    return dedupe(lists.flat().filter(Boolean));
  }

  // ===== Ref Manager (UI helpers) =====
  // Global refs (for generic shots) and per-character slots (img1..img4)
  PACK.refs = PACK.refs || {}; // {key:url}
  // PACK.cast created in Block K; ensure exists:
  PACK.cast = PACK.cast || {};

  CORE.refSlots = ["img1","img2","img3","img4"];

  CORE.setGlobalRef = function(key, url){
    if (!key || !url) return false;
    PACK.refs[norm(key)] = norm(url);
    return true;
  };
  CORE.clearGlobalRef = function(key){
    delete PACK.refs[norm(key)];
    return true;
  };
  CORE.listGlobalRefs = function(){ return {...PACK.refs}; }

  CORE.assignRefSlot = function(charId, slot, url){
    const c = PACK.cast[charId]; if(!c) return false;
    slot = norm(slot).toLowerCase();
    if (!CORE.refSlots.includes(slot)) return false;
    c.refs = c.refs || {};
    c.refs[slot] = norm(url);
    return true;
  };
  CORE.clearRefSlot = function(charId, slot){
    const c = PACK.cast[charId]; if(!c) return false;
    slot = norm(slot).toLowerCase();
    if (c.refs) delete c.refs[slot];
    return true;
  };
  CORE.listCharacterRefs = function(charId){
    const c = PACK.cast[charId] || {};
    return {...(c.refs||{})};
  };

  // inject 'ref: imgX' tokens when character has a ref slot
  CORE.attachRefTokens = function(board, charIds=[]){
    if(!board?.cards?.length || !charIds?.length) return board;
    const refTokens = [];
    for (const id of charIds){
      const c = PACK.cast[id]; if (!c?.refs) continue;
      for (const s of CORE.refSlots){
        if (c.refs[s]) refTokens.push(`ref: ${s}`);
      }
    }
    if (!refTokens.length) return board;
    board.cards.forEach(card=>{
      const T = new Set(card.tokens||[]);
      refTokens.forEach(t => T.add(t));
      card.tokens = Array.from(T);
    });
    return board;
  };

  // ===== Continuity Locks =====
  CORE.setContinuityLock = function({enabled, carry}={}){
    if (typeof enabled === "boolean") PACK.continuityLock.enabled = enabled;
    if (Array.isArray(carry) && carry.length) PACK.continuityLock.carry = carry.map(x=>String(x).toLowerCase());
    return {...PACK.continuityLock};
  };
  CORE.getContinuityLock = function(){ return {...PACK.continuityLock}; }

  // carry chosen categories from first card across board
  CORE.applyContinuity = (function(old){
    return function(board, opts){
      const cfg = {...PACK.continuityLock, ...(opts||{})};
      if (!cfg.enabled) return old ? old.call(CORE, board, opts) : board;
      if (!board?.cards?.length) return board;

      const first = (board.cards[0].tokens||[]).slice();
      const keep = new Set((cfg.carry||[]).map(s=>String(s).toLowerCase()));
      const sticky = first.filter(tok => keep.has(keyOf(tok)));

      for (let i=1;i<board.cards.length;i++){
        const T = new Set(board.cards[i].tokens||[]);
        sticky.forEach(t=>T.add(t));
        board.cards[i].tokens = Array.from(T);
      }
      return board;
    };
  })(CORE.applyContinuity || function(b){ return b; });

  // per-character continuity locks (wardrobe/traits persist)
  CORE.lockCharacterContinuity = function(charId, {wardrobe=true, traits=true}={}){
    const c = PACK.cast[charId]; if(!c) return false;
    c.lock = c.lock || {};
    c.lock.wardrobe = !!wardrobe;
    c.lock.traits   = !!traits;
    return true;
  };
  CORE.applyCharacterContinuity = function(board, charIds=[]){
    if(!board?.cards?.length || !charIds?.length) return board;
    const bundles = [];
    for(const id of charIds){
      const c = PACK.cast[id]; if(!c) continue;
      const add = [];
      if (c.lock?.wardrobe) add.push(...(c.wardrobe||[]));
      if (c.lock?.traits)   add.push(...(c.traits||[]));
      if (add.length) bundles.push(...add);
    }
    if (!bundles.length) return board;
    board.cards.forEach(card=>{
      const T = new Set(card.tokens||[]);
      bundles.forEach(t=>T.add(t));
      card.tokens = Array.from(T);
    });
    return board;
  };

  // ===== Auto-negative dedupe on engine switch =====
  CORE.onEngineChange = function(engine, extraNegs=[]){
    const e = String(engine||PACK.engine||"runway").toLowerCase();
    PACK.engine = e;

    const base = PACK.engineNeg[e] || [];
    const art  = (PACK.artifactKillers && PACK.artifactKillers[e]) ? PACK.artifactKillers[e] : [];
    const curr = (CORE.lastNegative||"").split(",").map(s=>s.trim()).filter(Boolean);

    const merged = mergeNeg(curr, base, art, extraNegs);
    CORE.lastNegative = merged.join(", ");

    return CORE.lastNegative;
  };

  // call after enhance() if you want engine-specific cleanup automatically
  CORE.finalizeNegatives = function({engine, extra=[]}={}){
    return CORE.onEngineChange(engine || PACK.engine, extra);
  };

  // ===== Export Helpers =====
  // Return a bundle obj with text + negatives + ref map so UI can zip assets if needed
  CORE.exportBundle = function({ text="", negative="", includeRefs=true, includeCast=true }={}){
    const bundle = {
      engine: PACK.engine,
      text: norm(text),
      negative: norm(negative || CORE.lastNegative || ""),
      refs: {},
      cast: []
    };
    if (includeRefs){
      // global refs
      bundle.refs = {...PACK.refs};
      // collect any per-character slots
      if (includeCast){
        for(const c of Object.values(PACK.cast)){
          if (c.refs && Object.keys(c.refs).length){
            bundle.refs = {...bundle.refs, ...c.refs};
          }
        }
      }
    }
    if (includeCast){
      bundle.cast = Object.values(PACK.cast).map(c=>({
        id:c.id, name:c.name, archetype:c.archetype,
        wardrobe:(c.wardrobe||[]).slice(0,12),
        traits:(c.traits||[]).slice(0,12),
        refs:{...(c.refs||{})}
      }));
    }
    return bundle;
  };

  // convenience: replace "ref: imgX" tokens with "(ref:imgX)" comments for user readability (optional)
  CORE.humanizeRefsInPrompt = function(text){
    return String(text||"").replace(/\bref:\s*(img[1-4])\b/gi,"(ref:$1)");
  };

})();
/* PromptForge — Movie Pack (Block O) — Director's Brain + Emotion Curve + Smart Export */
(function(){
  const CORE = window.MovieCORE;
  const PACK = CORE?.data;
  if (!CORE || !PACK) return;

  // ===== 1) Vibe → defaults (slug, extras, arc, platform) =====
  const VIBE_PRESETS = {
    noir: {
      slug: "SLUG: EXT. alley - night",
      extras: ["lighting: neon night","gel: magenta-cyan","grade: cinematic","grain: 35mm fine"],
      arc: "3-beat tension",
      platform: "platform: instagram reel"
    },
    romance: {
      slug: "SLUG: INT. cabin - night",
      extras: ["warm practicals","soft bloom","dof: shallow","mood: intimate"],
      arc: "hook-cta",
      platform: "platform: facebook reel"
    },
    mythic: {
      slug: "SLUG: EXT. forest - dusk",
      extras: ["vfx: fog low","light rays","backlight rim"],
      arc: "5-beat mini",
      platform: "platform: youtube short"
    },
    action: {
      slug: "SLUG: EXT. street - night",
      extras: ["move: track","cut: whip","zoom: snap","grade: cinematic"],
      arc: "3-beat tension",
      platform: "platform: tiktok"
    }
  };

  // ===== 2) Emotion tokens per level (0..3) — non-graphic, cinematic =====
  const EMO_TOKENS = {
    0: ["mood: calm","light: high key","pace: gentle"],
    1: ["mood: playful","dof: shallow","cut: straight"],
    2: ["mood: tense","backlight rim","move: push","cut: match"],
    3: ["mood: charged","silhouette emphasis","gel: magenta-cyan","cut: whip"]
  };

  function clampInt(n){ n=Number(n)||0; return n<0?0:n>3?3:n; }
  function dedupe(a){ const s=new Set(); const out=[]; (a||[]).forEach(t=>{t=String(t||"").trim(); if(t && !s.has(t.toLowerCase())){ s.add(t.toLowerCase()); out.push(t);}}); return out; }

  // Generate array of intensity values length N following a shape
  // shapes: rise, fall, wave, pulse
  CORE.emotionCurve = function(n=3, shape="rise"){
    n = Math.max(1, Math.floor(n));
    const out = [];
    if (shape==="rise"){
      for (let i=0;i<n;i++) out.push(Math.round(i*(3/(n-1||1))));
    } else if (shape==="fall"){
      for (let i=0;i<n;i++) out.push(Math.round(3 - i*(3/(n-1||1))));
    } else if (shape==="wave"){
      for (let i=0;i<n;i++){
        const p = Math.sin((i/(n-1||1))*Math.PI); out.push(Math.round(p*3));
      }
    } else { // pulse
      for (let i=0;i<n;i++) out.push(i===Math.floor(n/2)?3:(i%2?2:1));
    }
    return out.map(clampInt);
  };

  CORE.applyEmotionCurve = function(board, curve=[], { merge=true }={}){
    if (!board?.cards?.length) return board;
    const N = board.cards.length;
    if (!curve || !curve.length) curve = CORE.emotionCurve(N, "wave");
    for (let i=0;i<N;i++){
      const level = clampInt(curve[i] ?? 1);
      const adds = EMO_TOKENS[level] || [];
      const T = new Set(board.cards[i].tokens||[]);
      adds.forEach(t=>T.add(t));
      board.cards[i].tokens = dedupe(Array.from(T));
    }
    return board;
  };

  // ===== 3) Director’s Brain — 1 call from logline → board ready to render =====
  // opts: { logline, vibe, platform?, engine?, genre?, lengthSec?, arc?, chars?, creature?, ratio?, fps?, langCode? }
  CORE.directorCompose = function(opts={}){
    const vibe = String(opts.vibe||"noir").toLowerCase();
    const base = VIBE_PRESETS[vibe] || VIBE_PRESETS.noir;

    const platform = opts.platform || base.platform;
    const slug     = opts.slug     || base.slug;
    const arc      = opts.arc      || base.arc;
    const ratio    = opts.ratio    || "ratio: 9:16";
    const fps      = opts.fps      || "fps: 30";
    const extras   = dedupe([ ...base.extras, ratio, fps ]);

    // Seed board from arc
    let board = CORE.arcBoard({
      arc, title: (opts.title||"Director’s Compose"),
      logline: (opts.logline||""),
      slug, platform, ratio, fps, extras
    });

    // Language normalize & NSFW soften (if present) for the logline only (used by your UI prose)
    if (opts.langCode) {
      try { board.logline = CORE.normalizeIdea(board.logline, opts.langCode); } catch(_){}
      try { if (window.NSFW_CORE?.preMap) board.logline = NSFW_CORE.preMap(board.logline, opts.langCode); } catch(_){}
    }

    // Characters
    if (opts.chars && opts.chars.length) {
      board = CORE.withCharacters(board, opts.chars);
      board = CORE.applyCharacterContinuity(board, opts.chars);
    }
    // Creature
    if (opts.creature) {
      const add = String(opts.creature); // token like "creature: sasquatch"
      board.cards.forEach(c=>{
        const T = new Set(c.tokens||[]); T.add(add); c.tokens = Array.from(T);
      });
    }

    // Emotion curve
    const curve = CORE.emotionCurve(board.cards.length, opts.curveShape || (vibe==="romance" ? "rise" : "wave"));
    board = CORE.applyEmotionCurve(board, curve);

    // Timing
    const total = Math.max(8, Number(opts.lengthSec||15));
    board.timing = CORE.composeBeats(total, board.cards.length, PACK.arcs[arc]?.weights || []);

    // Continuity
    board = CORE.applyContinuity(board, { enabled:true });

    // Ref tokens if given
    if (opts.refChars && opts.refChars.length){
      board = CORE.attachRefTokens(board, opts.refChars);
    }

    return board;
  };

  // ===== 4) Smart Export — everything you need for a share/download =====
  // args: { board, ctx:{engine,genre,ratio,fps}, musicToken, voiceToken, lines, finalizeNegExtra:[], bundleRefs:true, bundleCast:true }
  CORE.smartExport = function(args={}){
    const board = args.board;
    if (!board?.cards?.length) return null;

    // Render timed prompts
    const ctx = args.ctx || { engine:"runway", genre:"editorial" };
    const shots = CORE.renderBoardTimed(board, ctx);

    // Deduped negatives (engine base + artifact killers + extras)
    const negatives = CORE.finalizeNegatives({ engine: ctx.engine, extra: args.finalizeNegExtra || [] });

    // Music → BPM cut suggestions
    let music = null;
    if (args.musicToken) {
      try { music = CORE.musicBed(args.musicToken); } catch(_){}
    }

    // Captions + SSML if lines provided
    let srt = "", vtt = "", ssml = "";
    if (Array.isArray(args.lines) && args.lines.length){
      const caps = CORE.dialogToCaptions(args.lines, { secondsPerLine: Math.max(2, Math.round((board.timing||[])[1]||3)) });
      srt = CORE.toSRT(caps);
      vtt = CORE.toVTT(caps);
      try { ssml = CORE.linesToSSML(args.lines, args.voiceToken || "voice: warm alto", { pace:"steady" }); } catch(_){}
    }

    // Export bundle (text + negs + refs + cast)
    const bundle = CORE.exportBundle({
      text: shots.map(s=>s.prompt).join(" | "),
      negative: negatives,
      includeRefs: !!args.bundleRefs,
      includeCast: !!args.bundleCast
    });

    return {
      shots, // [{beat,seconds,prompt,negative}]
      negatives,
      music, // { token, bpm, suggestCuts:[{time,cut}] }
      captions: { srt, vtt },
      ssml,
      bundle
    };
  };

})();
/* PromptForge — Movie Pack (Block P) — Meta-Director (Score + Rewrite) */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // Heuristic weights (tweak in UI later)
  PACK.meta = PACK.meta || {
    w: { flow:0.35, novelty:0.25, density:0.20, clarity:0.20 },
    lexStop: ["the","a","an","and","of","to","in","with","on","by","for"]
  };

  function uniqWords(s){
    const words = String(s||"").toLowerCase().match(/[a-z0-9:.-]+/g)||[];
    const stop = new Set(PACK.meta.lexStop);
    const bag = new Set(words.filter(w=>!stop.has(w) && w.length>2));
    return bag;
  }

  CORE.metaScore = function(promptStr){
    const text = String(promptStr||"");
    const tokens = text.split(",").map(s=>s.trim()).filter(Boolean);
    if(!tokens.length) return { score:0, parts:{} };

    // Flow: penalize back-to-back category repeats (e.g., "light:" twice)
    let clashes=0;
    for(let i=1;i<tokens.length;i++){
      const a=tokens[i-1].split(":")[0].trim().toLowerCase();
      const b=tokens[i].split(":")[0].trim().toLowerCase();
      if(a===b) clashes++;
    }
    const flow = Math.max(0, 1 - clashes / Math.max(1,tokens.length-1));

    // Novelty: unique content ratio
    const uw = uniqWords(text);
    const novelty = Math.min(1, uw.size / Math.max(6, tokens.length*1.5));

    // Density: signal vs filler (tokens with ":" or 2+ words)
    const dense = tokens.filter(t=>t.includes(":") || t.split(" ").length>1).length / tokens.length;

    // Clarity: punctuation hygiene + length budget
    const clean = !/,,|;;|--| {2,}/.test(text);
    const lenOk = text.length<=320;
    const clarity = (clean?0.6:0.3) + (lenOk?0.4:0.1);

    const w = PACK.meta.w;
    const score = +(w.flow*flow + w.novelty*novelty + w.density*dense + w.clarity*clarity).toFixed(3);
    return { score, parts:{flow,novelty,density,clarity}, clashes };
  };

  // Rewrite: reorders, collapses duplicates, and weaves a short cinematic sentence for UX
  CORE.metaRewrite = function(promptStr,{mode="cinematic"}={}){
    const text = String(promptStr||"");
    let toks = text.split(",").map(s=>s.trim()).filter(Boolean);

    // Dedup by key:value and collapse repeats by category, keep strongest
    const byKey = new Map();
    for(const t of toks){
      const k = t.split(":")[0].toLowerCase().trim();
      if(!byKey.has(k)) byKey.set(k,t); // keep first occurrence
    }
    toks = Array.from(byKey.values());

    // Prefer ordering: SLUG -> shot/move/ratio/fps -> lighting -> lens -> mood -> grade/vfx -> style -> wardrobe -> misc
    const rank = (t)=>{
      const k = t.split(":")[0].toLowerCase().trim();
      if(/^slug$/i.test(k)) return 0;
      if(/^(shot|move|ratio|fps|cam|rig|frame|compose)$/i.test(k)) return 1;
      if(/^(light|lighting|backlight|rim|gel|flare|shadow)$/i.test(k)) return 2;
      if(/^(lens|aperture|bokeh|dof|focus)$/i.test(k)) return 3;
      if(/^(mood|emotion|tone)$/i.test(k)) return 4;
      if(/^(grade|grain|vfx|effect|transition|cut|dissolve)$/i.test(k)) return 5;
      if(/^(style|palette)$/i.test(k)) return 6;
      if(/^(wardrobe|fabric|jewelry)$/i.test(k)) return 7;
      return 8;
    };
    toks.sort((a,b)=>rank(a)-rank(b));

    // Produce dense and prose
    const dense = toks.join(", ");
    const prose = CORE.sentenceWeave(toks, { mode });

    return { dense, prose, tokens:toks };
  };

  // One-call critique + improve
  CORE.metaDirect = function(promptStr){
    const s1 = CORE.metaScore(promptStr);
    const r  = CORE.metaRewrite(promptStr);
    const s2 = CORE.metaScore(r.dense);
    return { before:s1, after:s2, rewrite:r };
  };
})();
/* PromptForge — Movie Pack (Block Q) — Parallel Worlds (A/B branching) */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // Build two boards from different vibes/loglines, then interleave or export separately.
  CORE.parallelCompose = function({
    A={ logline:"Host chases a signal in neon rain.", vibe:"noir",  lengthSec:15 },
    B={ logline:"Something ancient wakes in the pines.", vibe:"mythic", lengthSec:15 },
    strategy="interleave" // interleave | split | mirror
  }={}){
    const a = CORE.directorCompose(A);
    const b = CORE.directorCompose(B);

    if (strategy==="split") return { A:a, B:b };

    // mirror = same beats, diff tokens
    if (strategy==="mirror"){
      const n = Math.min(a.cards.length, b.cards.length);
      const out = { title:"Parallel (mirror)", logline:`${A.logline} || ${B.logline}`, cards:[], timing:[] };
      for(let i=0;i<n;i++){
        // A then B of same beat label
        out.cards.push({ beat:`A:${a.cards[i].beat}`, slug:a.cards[i].slug, tokens:a.cards[i].tokens });
        out.cards.push({ beat:`B:${b.cards[i].beat}`, slug:b.cards[i].slug, tokens:b.cards[i].tokens });
        out.timing.push((a.timing?.[i]||4)); out.timing.push((b.timing?.[i]||4));
      }
      return out;
    }

    // default interleave beat-by-beat
    const max = Math.max(a.cards.length, b.cards.length);
    const out = { title:"Parallel (interleave)", logline:`${A.logline} || ${B.logline}`, cards:[], timing:[] };
    for(let i=0;i<max;i++){
      if (a.cards[i]) { out.cards.push({ beat:`A:${a.cards[i].beat}`, slug:a.cards[i].slug, tokens:a.cards[i].tokens }); out.timing.push(a.timing?.[i]||4); }
      if (b.cards[i]) { out.cards.push({ beat:`B:${b.cards[i].beat}`, slug:b.cards[i].slug, tokens:b.cards[i].tokens }); out.timing.push(b.timing?.[i]||4); }
    }
    return out;
  };

  // Export both paths at once
  CORE.parallelExport = function(boardOrPair, ctx={ engine:"runway", genre:"editorial" }){
    if (boardOrPair.A && boardOrPair.B){
      return {
        A: CORE.smartExport({ board:boardOrPair.A, ctx }),
        B: CORE.smartExport({ board:boardOrPair.B, ctx })
      };
    }
    return CORE.smartExport({ board:boardOrPair, ctx });
  };
})();
/* PromptForge — Movie Pack (Block S) — Spatial Stage (2.5D blocking) */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // Minimal scene graph (no rendering, just tokens)
  PACK.stage = PACK.stage || {
    size: { w:10, h:6, d:10 },              // meters (virtual)
    chars: {},                               // id -> { x,y,z, face:"N|S|E|W" }
    cam:   { x:0, y:1.6, z: -4, yaw:0 }      // position + yaw
  };

  CORE.stagePlaceChar = function(id,{x=0,y=0,z=0,face="N"}={}){
    PACK.stage.chars[id] = { x,y,z,face };
    return {...PACK.stage.chars[id]};
  };

  CORE.stageMoveCam = function({x,y,z,yaw}={}){
    if (typeof x==="number") PACK.stage.cam.x=x;
    if (typeof y==="number") PACK.stage.cam.y=y;
    if (typeof z==="number") PACK.stage.cam.z=z;
    if (typeof yaw==="number") PACK.stage.cam.yaw=yaw;
    return {...PACK.stage.cam};
  };

  // Generate camera/shot tokens from stage positions
  CORE.stageShot = function({targetId, shot="shot: ms", move="move: track"}={}){
    const cam = PACK.stage.cam, tgt = PACK.stage.chars[targetId];
    const tokens = [shot, move];
    if (tgt){
      const dx = tgt.x - cam.x, dz = tgt.z - cam.z;
      const dist = Math.sqrt(dx*dx + dz*dz);
      // map distance → lens hint
      if (dist < 1.2) tokens.push("lens: portrait 85mm");
      else if (dist < 3) tokens.push("lens: 50mm");
      else tokens.push("lens: 28mm");
      // screen direction: left/right based on yaw and delta
      const angle = Math.atan2(dz, dx)*180/Math.PI - (cam.yaw||0);
      const side = (angle>0) ? "screen-right" : "screen-left";
      tokens.push(`block: ${side}`);
    }
    return tokens;
  };

  // Apply stage-derived tokens to a board (keeps direction consistent)
  CORE.stageApply = function(board, plan=[/* { beatIndex:0, targetId:"Ava", shot:"shot: cu", move:"move: push"} */]){
    if (!board?.cards?.length || !Array.isArray(plan)) return board;
    for (const p of plan){
      const i = Number(p.beatIndex)||0;
      if (!board.cards[i]) continue;
      const T = new Set(board.cards[i].tokens||[]);
      CORE.stageShot(p).forEach(t=>T.add(t));
      board.cards[i].tokens = Array.from(T);
    }
    return board;
  };

})();
/* PromptForge — NSFW Core (Block G) — Romance Tone Packs by City (tasteful) */
(function(){
  const NSFW = window.NSFW_CORE; if(!NSFW) return;

  const CITY = {
    paris: {
      token:"tone: parisian chic",
      adds:["palette: cream noir","fabric: silk","jewelry: gold minimal","soft bloom","mood: intimate","music: orchestral 100bpm"]
    },
    rio: {
      token:"tone: rio heat",
      adds:["palette: sun gold","skin: sun-kissed","natural window light","backlight rim","mood: playful","music: trap 140bpm"]
    },
    tokyo: {
      token:"tone: tokyo neon",
      adds:["lighting: neon night","gel: magenta-cyan","chromatic aberration","silhouette emphasis","mood: charged","music: synthwave 90bpm"]
    },
    seoul: {
      token:"tone: seoul minimal",
      adds:["palette: cool neutral","light: high key","clean lines","mood: tender","grain: 35mm fine"]
    },
    berlin: {
      token:"tone: berlin underground",
      adds:["palette: steel blue","grade: cinematic","rim light","mood: tense","transition: glitch"]
    }
  };

  NSFW.cityTone = function(name){
    const row = CITY[String(name||"").toLowerCase()];
    return row ? { token:row.token, adds:row.adds.slice() } : null;
  };

  // Mix up to 3 tones (simple union + dedupe)
  NSFW.mixTones = function(list=[]){
    const add = [];
    (list||[]).forEach(n => {
      const r = NSFW.cityTone(n);
      if (r) add.push(...r.adds);
    });
    const uniq = Array.from(new Set(add.filter(Boolean)));
    return uniq.slice(0, 24);
  };

  // expose tokens to UI
  NSFW.uiHints = (function(old){
    return function(){
      const h = (old && old.call ? old.call(NSFW) : { vibes:["sfw","softcore","hardcore"], softcorePresets:[] });
      h.romanceTones = [CITY.paris.token, CITY.rio.token, CITY.tokyo.token, CITY.seoul.token, CITY.berlin.token];
      return h;
    };
  })(NSFW.uiHints);
})();
/* PromptForge — Movie Pack (Block T) — Prompt Shaders (style transforms) */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // Shaders declare adds/removes and negative boosts. Keep tasteful & engine-friendly.
  PACK.shaders = {
    "shader: realism+": {
      adds:["photometric consistency","skin texture detail","microtexture","subtle grain","grade: neutral"],
      negs:["over-saturated","cartoonish","posterization"]
    },
    "shader: anamorphic flare": {
      adds:["lens: 50mm anamorphic","flare: horizontal","bokeh: oval","grade: cinematic"],
      negs:["flat lighting","banding"]
    },
    "shader: analogue vhs": {
      adds:["vhs wobble mild","scanlines subtle","chromatic aberration","grain: coarse","grade: warm"],
      negs:["over-sharpen","digital smear"]
    },
    "shader: anime cel": {
      adds:["toon shader","line art clean","flat shadows crisp","palette: bold"],
      negs:["photo-real skin pores"]
    },
    "shader: painterly oil": {
      adds:["brushstroke texture","impasto hint","palette: muted classic","edge: soft blend"],
      negs:["hyperreal pores","clinical sharpness"]
    },
    "shader: dreamy ethereal": {
      adds:["soft bloom","haze gentle","backlight rim","dof: shallow","palette: pastel"],
      negs:["crushed blacks","harsh contrast"]
    },
    "shader: cctv grit": {
      adds:["security camera timestamp","rolling noise","monochrome cool","frame: high angle"],
      negs:["cinematic color grade","warm glow"]
    },
    "shader: surreal glitch": {
      adds:["transition: glitch","datamosh hint","ghost trail mild","palette: neon"],
      negs:["temporal smoothing"]
    }
  };

  function dedupe(arr){ const s=new Set(), out=[]; (arr||[]).forEach(t=>{t=String(t||"").trim(); if(t && !s.has(t.toLowerCase())){ s.add(t.toLowerCase()); out.push(t);} }); return out; }

  CORE.applyShader = function(shaderToken, denseText){
    const row = PACK.shaders[String(shaderToken||"").toLowerCase()] || PACK.shaders["shader: realism+"];
    const chunks = String(denseText||"").split(",").map(s=>s.trim()).filter(Boolean);
    // Remove any negated conflicts (basic pass)
    const cleaned = chunks.filter(t => !(row.negs||[]).some(n => t.toLowerCase().includes(n.toLowerCase())));
    const merged = dedupe(cleaned.concat(row.adds||[]));
    // attach negatives to CORE.lastNegative
    const curNeg = (CORE.lastNegative||"").split(",").map(s=>s.trim()).filter(Boolean);
    CORE.lastNegative = dedupe(curNeg.concat(row.negs||[])).join(", ");
    return merged.join(", ");
  };

  // UI hint
  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.shaders = Object.keys(PACK.shaders);
    return h;
  };})(CORE.uiHints);
})();
/* PromptForge — Movie Pack (Block U) — Social Hooks + CTAs */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  PACK.hooks = {
    instagram: [
      { token:"hook: 1s cold open", overlay:"Wait for it…", adds:["cut: whip","zoom: snap"] },
      { token:"hook: bold claim",   overlay:"You won’t believe this", adds:["frame: center lock","hold: hero 1s"] },
      { token:"hook: reveal tease", overlay:"Watch the lights", adds:["move: push","light rays"] }
    ],
    tiktok: [
      { token:"hook: immediate face", overlay:"Real talk:", adds:["shot: cu","dialog: J-cut"] },
      { token:"hook: countdown", overlay:"3…2…", adds:["cut: straight","beat: micro cutaways"] }
    ],
    youtube: [
      { token:"hook: title card", overlay:"Tonight:", adds:["dissolve: cross","grade: cinematic"] },
      { token:"hook: question", overlay:"What’s in the fog?", adds:["move: track"] }
    ],
    facebook: [
      { token:"hook: curiosity", overlay:"Keep watching →", adds:["move: push"] }
    ]
  };

  PACK.cta = {
    instagram: [
      { token:"cta: follow for part 2", overlay:"Follow for Part 2", adds:["dip2black"] },
      { token:"cta: comment prompt", overlay:"Comment what I should try", adds:["cut: straight"] }
    ],
    tiktok: [
      { token:"cta: duet challenge", overlay:"Duet this with your line", adds:["transition: speed blur"] }
    ],
    youtube: [
      { token:"cta: subscribe", overlay:"Subscribe for the full story", adds:["dissolve: cross"] }
    ],
    facebook: [
      { token:"cta: share", overlay:"Share if you felt it", adds:["cut: match"] }
    ]
  };

  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.socialPlatforms = Object.keys(PACK.hooks);
    return h;
  };})(CORE.uiHints);

  CORE.socialHook = function(platform="instagram", pick=0){
    const list = PACK.hooks[platform]||[];
    const row = list[Math.max(0,Math.min(pick, list.length-1))] || list[0];
    return row ? { overlay:row.overlay, adds:row.adds.slice(), token:row.token } : null;
  };

  CORE.socialCTA = function(platform="instagram", pick=0){
    const list = PACK.cta[platform]||[];
    const row = list[Math.max(0,Math.min(pick, list.length-1))] || list[0];
    return row ? { overlay:row.overlay, adds:row.adds.slice(), token:row.token } : null;
  };

  // Inject a hook at beat 0 and a CTA at the last beat
  CORE.injectSocial = function(board, { platform="instagram", hookIndex=0, ctaIndex=0 }={}){
    if (!board?.cards?.length) return board;
    const h = CORE.socialHook(platform, hookIndex);
    const c = CORE.socialCTA(platform, ctaIndex);
    if (h){ 
      const T = new Set(board.cards[0].tokens||[]);
      h.adds.forEach(t=>T.add(t));
      T.add("overlay: "+h.overlay);
      board.cards[0].tokens = Array.from(T);
    }
    if (c){
      const last = board.cards.length-1;
      const T = new Set(board.cards[last].tokens||[]);
      c.adds.forEach(t=>T.add(t));
      T.add("overlay: "+c.overlay);
      board.cards[last].tokens = Array.from(T);
    }
    return board;
  };
})();
/* PromptForge — Movie Pack (Block V) — Montage Composer (B-roll + BPM) */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  const M_THEME = {
    "urban rain": {
      location:["neon signage","wet street","puddle reflections","alley steam"],
      action:["footsteps","umbrella tilt","car passes","glance over shoulder"],
      detail:["raindrops macro","neon bokeh","hand on railing","drip on jacket"]
    },
    "forest myth": {
      location:["mist trail","old pines","moss stones","river bend"],
      action:["slow breath","turn to sound","hand through fern","lantern lift"],
      detail:["dew macro","light rays","footprint in mud","charcoal totem"]
    },
    "studio glamour": {
      location:["seamless paper","flagged softbox","practical lamp","mirror edge"],
      action:["hair toss","step to mark","shoulder turn","wardrobe adjust"],
      detail:["lace macro","rim light flare","lip gloss sparkle","ring glint"]
    }
  };

  const SHOT_VARIETY = ["shot: ecu","shot: cu","shot: ms","shot: ls"];
  const MOVES = ["move: push","move: track","move: orbit","move: lockoff"];

  function pick(a){ return a[(Math.random()*a.length)|0]; }
  function dedupe(arr){ const s=new Set(), out=[]; (arr||[]).forEach(t=>{t=String(t||"").trim(); if(t && !s.has(t.toLowerCase())){ s.add(t.toLowerCase()); out.push(t);} }); return out; }

  // Compose a quick montage board
  // opts: { theme, beats=6, totalSec=15, ratio, fps, platform }
  CORE.montageCompose = function(opts={}){
    const theme = M_THEME[String(opts.theme||"urban rain").toLowerCase()] || M_THEME["urban rain"];
    const beats = Math.max(3, Number(opts.beats||6));
    const total = Math.max(8, Number(opts.totalSec||15));
    const ratio = opts.ratio || "ratio: 9:16";
    const fps   = opts.fps   || "fps: 30";
    const platform = opts.platform || "platform: instagram reel";

    const cards = [];
    for(let i=0;i<beats;i++){
      const shot = pick(SHOT_VARIETY), move = pick(MOVES);
      const loc  = pick(theme.location), act  = pick(theme.action), det = pick(theme.detail);
      const tokens = dedupe([platform, ratio, fps, shot, move, loc, act, det, "grade: cinematic"]);
      cards.push({ beat:`montage ${i+1}`, slug:`SLUG: ${loc.includes('studio')?'INT. studio':'EXT. city'} - night`, tokens });
    }
    const timing = CORE.composeBeats(total, beats, Array(beats).fill(1));
    return { title:"Montage", logline:`${Object.keys(M_THEME).find(k=>M_THEME[k]===theme)} montage`, cards, timing };
  };

  // High-level helper: montage + shader + bpm cuts
  CORE.montagePack = function({ theme="urban rain", totalSec=15, bpm=90, shader="shader: realism+" }={}){
    const board = CORE.montageCompose({ theme, totalSec });
    const shots = CORE.renderBoardTimed(board, { engine:"runway", genre:"editorial" });
    // Shader pass
    shots.forEach(s => s.prompt = CORE.applyShader(shader, s.prompt));
    // BPM cuts
    const cutTips = CORE.bpmCuts({ totalSec, bpm, prefer:"cut: match" });
    return { board, shots, cutTips };
  };

  // UI hint
  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.montageThemes = Object.keys(M_THEME);
    h.shaders = h.shaders || []; // ensure exists
    return h;
  };})(CORE.uiHints);
})();
/* PromptForge — NSFW Core (Block H) — Flirt Templates + Body Language (PG-13) */
(function(){
  const NSFW = window.NSFW_CORE; if(!NSFW) return;

  // non-graphic, consensual flirt lines; you can map user text into these
  const TPL = {
    whisper:  t => `leans in, breath warm: “${t}”`,
    tease:    t => `half-smile, playful: “${t}”`,
    promise:  t => `voice low, certain: “${t}”`,
    invite:   t => `soft and honest: “${t}”`
  };

  // body language chips (implied intimacy; no graphic anatomy)
  const BODY = {
    "001": { token:"body: close embrace", adds:["pose: close embrace","shadow: contact","dof: shallow"] },
    "002": { token:"body: forehead touch", adds:["pose: forehead touch","mood: tender"] },
    "003": { token:"body: hand lace", adds:["gesture: fingers interlace","compose: thirds"] },
    "004": { token:"body: whisper ear", adds:["shot: cu","frame: tight","beat: pause 1s"] }
  };

  // UI hint merge
  NSFW.uiHints = (function(old){ return function(){
    const h = (old && old.call ? old.call(NSFW) : { vibes:["sfw","softcore","hardcore"] });
    h.flirtStyles = Object.keys(TPL).map(k=>"flirt: "+k);
    h.bodyCues = Object.values(BODY).map(x=>x.token);
    return h;
  };})(NSFW.uiHints);

  // map a raw user line into PG-13 sultry flirt with a chosen style
  NSFW.flirt = function(line, style="whisper"){
    const fmt = TPL[String(style||"whisper")] || TPL.whisper;
    let t = String(line||"").trim();
    if (typeof NSFW.preMap === "function") t = NSFW.preMap(t, "en");
    // tiny softening
    t = t.replace(/\b(sex|f\W{0,2}ck|pussy|dick|cum)\b/gi, "let’s keep this between us");
    return fmt(t);
  };

  // return tokens for a body cue chip
  NSFW.bodyCueTokens = function(token){
    const row = Object.values(BODY).find(x=>x.token.toLowerCase()===String(token||"").toLowerCase());
    return row ? row.adds.slice() : [];
  };
})();
/* PromptForge — Movie Pack (Block W) — Auto-ADR + Lip-Sync Curve + Retiming */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // crude syllable estimator (en) for timing guesses
  function syllables(s){
    s = String(s||"").toLowerCase().replace(/[^a-z ]/g," ").replace(/\s+/g," ").trim();
    if(!s) return 0;
    const words = s.split(" ");
    let n = 0;
    for (const w of words){
      let count = (w.match(/[aeiouy]+/g)||[]).length;
      if (w.endsWith("e")) count = Math.max(1, count-1);
      n += Math.max(1, count);
    }
    return n;
  }

  // pace to seconds (approx): pace "quick|steady|slow" → words per minute
  function paceWPM(p="steady"){ return ({quick:170, steady:140, slow:110})[p]||140; }

  CORE.estimateLineSeconds = function(text, { pace="steady" }={}){
    const syl = syllables(text);
    const wpm = paceWPM(pace);
    const words = Math.max(1, Math.round(syl/1.4));
    return +(words / (wpm/60)).toFixed(2); // seconds
  };

  // Lip-sync strength curve across N beats (0..1)
  CORE.lipSyncCurve = function(n=4, shape="rise"){
    const out=[]; n=Math.max(1, n);
    for(let i=0;i<n;i++){
      let v=0.6;
      if(shape==="rise") v = i/(n-1||1);
      else if(shape==="fall") v = 1 - i/(n-1||1);
      else if(shape==="wave") v = 0.5 + 0.5*Math.sin((i/(n-1||1))*Math.PI);
      else if(shape==="pulse") v = (i===Math.floor(n/2))?1:0.5;
      out.push(+v.toFixed(2));
    }
    return out;
  };

  // Build ADR notes against a target per-line duration
  // returns: [{line, wantSec, estSec, noteTokens:[...]}]
  CORE.adrNotes = function(lines=[], { pace="steady", tolerance=0.25 }={}){
    const notes=[];
    for(const ln of lines){
      const want = CORE.estimateLineSeconds(ln.text||ln, { pace });
      const est  = want; // if you feed actual audio later, compare here
      const delta = est - want;
      const tks=[];
      if (delta >  tolerance) tks.push(`lip: tighten ${Math.round(delta*1000)}ms`);
      if (delta < -tolerance) tks.push(`lip: loosen ${Math.round(Math.abs(delta)*1000)}ms`);
      // sprinkle breaths for realism
      if (want >= 3.2) tks.push("breath: short");
      notes.push({ line: ln.text||ln, wantSec:+want.toFixed(2), estSec:+est.toFixed(2), noteTokens:tks });
    }
    return notes;
  };

  // Retimes captions to fit target total, preserving order
  CORE.retimeCaptions = function(captions=[], targetTotal=15){
    const dur = captions.reduce((a,c)=>a+(c.end-c.start),0) || 0.001;
    const k = targetTotal / dur;
    let t=0, out=[];
    for (const c of captions){
      const len = (c.end-c.start)*k;
      const start = t, end = t + len - 0.05;
      out.push({ start:+start.toFixed(2), end:+end.toFixed(2), text:c.text });
      t = end + 0.05;
    }
    return out;
  };

  // Insert breath SSML markers heuristically between sentences
  CORE.insertBreathsSSML = function(ssml, kind="short"){
    const br = (kind==="long")? '<break time="500ms"/>' : '<break time="250ms"/>';
    return String(ssml||"").replace(/<\/prosody><\/speak>/g, `${br}</prosody></speak>`);
  };

  // Align dialog to BPM: each line spans perLineBeats beats
  CORE.alignDialogToBPM = function(lines=[], { bpm=90, perLineBeats=2, startAt=0 }={}){
    const beatSec = 60/Math.max(40,Math.min(200,Number(bpm)||90));
    const seg = Math.max(2, perLineBeats*beatSec);
    let t = Number(startAt)||0;
    return lines.map(l => {
      const start=t, end=t+seg-0.05; t=end+0.05;
      return { start:+start.toFixed(2), end:+end.toFixed(2), text:l.text||l };
    });
  };
})();
/* PromptForge — Movie Pack (Block X) — Safety Auditor + Contradiction Fixer */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  const CONTRA = [
    { a:/\bratio:\s*21:9\b/i, b:/\bratio:\s*9:16\b/i, fix:"ratio: 9:16" },
    { a:/\bfps:\s*60\b/i, b:/\bfps:\s*24\b/i, fix:"fps: 30" },
    { a:/\blight:\s*high key\b/i, b:/\blow key\b/i, fix:"light: high key" },
    { a:/\bmood:\s*calm\b/i, b:/\bmood:\s*charged\b/i, fix:"mood: tense" }
  ];

  const PLATFORM_RULES = {
    instagram: { forbid:[/ratio:\s*21:9/i], suggest:["ratio: 9:16","fps: 30"] },
    tiktok:    { forbid:[/ratio:\s*(?:16:9|21:9)/i], suggest:["ratio: 9:16","fps: 30"] },
    youtube:   { forbid:[], suggest:["ratio: 16:9","fps: 30"] },
    facebook:  { forbid:[], suggest:["fps: 30"] }
  };

  function tokenize(str){ return String(str||"").split(",").map(s=>s.trim()).filter(Boolean); }
  function join(toks){ return toks.filter(Boolean).join(", "); }
  function dedupe(arr){ const s=new Set(), out=[]; for(const t of arr){ const k=t.toLowerCase(); if(!s.has(k)){ s.add(k); out.push(t);} } return out; }

  CORE.auditPrompt = function(denseText, { platform="instagram" }={}){
    const toks = tokenize(denseText);
    let notes = [], fixes = [];

    // contradictions
    for (const rule of CONTRA){
      const hasA = toks.find(t=>rule.a.test(t));
      const hasB = toks.find(t=>rule.b.test(t));
      if (hasA && hasB){
        notes.push(`contradiction: ${hasA} vs ${hasB}`);
        // drop B, keep fix
        let out = toks.filter(t=>!rule.b.test(t));
        if (rule.fix && !out.find(t=>t.toLowerCase()===rule.fix.toLowerCase())) out.push(rule.fix);
        fixes = out;
      }
    }

    // platform rules
    const pr = PLATFORM_RULES[platform] || PLATFORM_RULES.instagram;
    const afterContra = fixes.length? fixes : toks.slice();
    let afterPlat = afterContra.filter(t => !(pr.forbid||[]).some(re=>re.test(t)));
    for (const s of (pr.suggest||[])){
      if (!afterPlat.find(t=>t.toLowerCase().startsWith(s.split(":")[0].toLowerCase()))) afterPlat.push(s);
    }

    // dedupe categories
    const byKey = new Map();
    for (const t of afterPlat){
      const k = t.split(":")[0].toLowerCase().trim();
      if (!byKey.has(k)) byKey.set(k, t);
    }
    const clean = Array.from(byKey.values());

    const patched = join(dedupe(clean));
    const severity = notes.length ? "warn" : "ok";
    return { severity, notes, patched };
  };

  // Convenience: fix each shot in-place before export
  CORE.auditBoard = function(board, { platform="instagram" }={}){
    if (!board?.cards?.length) return board;
    board.cards.forEach(c=>{
      const dense = (c.tokens||[]).join(", ");
      const fix = CORE.auditPrompt(dense, { platform });
      c.tokens = tokenize(fix.patched);
    });
    return board;
  };
})();
/* PromptForge — Movie Pack (Block Y) — History + Variations + Seed Lock */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  PACK.history = PACK.history || []; // stack of { ts, board, ctx, note }
  PACK.cursor  = PACK.cursor  || -1;
  PACK.seed    = PACK.seed    || 1337;

  // simple PRNG for determinism across a session
  function srand(){ PACK.seed = (PACK.seed*1664525 + 1013904223) % 4294967296; return PACK.seed/4294967296; }
  function pick(a){ return a[Math.floor(srand()*a.length)]; }

  CORE.seedLock = function(n){ if(typeof n==="number") PACK.seed = n>>>0; return PACK.seed; };

  CORE.pushHistory = function(board, ctx={}, note=""){
    const snap = { ts: Date.now(), board: JSON.parse(JSON.stringify(board||{})), ctx: {...ctx}, note };
    PACK.history = PACK.history.slice(0, PACK.cursor+1);
    PACK.history.push(snap); PACK.cursor = PACK.history.length-1;
    return PACK.cursor;
  };
  CORE.undo = function(){ if(PACK.cursor>0) PACK.cursor--; return PACK.history[PACK.cursor]||null; };
  CORE.redo = function(){ if(PACK.cursor<PACK.history.length-1) PACK.cursor++; return PACK.history[PACK.cursor]||null; };
  CORE.last = function(){ return PACK.history[PACK.cursor]||null; };

  // create quick prompt variations (shuffle/drop/add small noise tokens)
  const NOISE = ["micro jitter","subtle grain","camera shake mild","soft bloom","rim light","grade: neutral"];

  CORE.varyPrompt = function(dense, { shuffle=0.3, drop=0.15, add=0.2 }={}){
    let toks = String(dense||"").split(",").map(s=>s.trim()).filter(Boolean);
    // drop some
    toks = toks.filter(()=> srand()>drop);
    // shuffle some
    if (srand()<shuffle) toks.sort(()=>srand()-0.5);
    // add
    if (srand()<add) toks.push(pick(NOISE));
    // dedupe
    const set = new Set(), out=[];
    toks.forEach(t=>{ const k=t.toLowerCase(); if(!set.has(k)){ set.add(k); out.push(t);} });
    return out.join(", ");
  };
})();
/* PromptForge — Movie Pack (Block Z) — Quality Predictor + AutoPatch */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  function scoreDense(text){
    const toks = String(text||"").split(",").map(s=>s.trim()).filter(Boolean);
    const len = toks.length;
    const hasLighting = toks.some(t=>/^light|lighting|rim|backlight|softbox|gel|bloom|flare/i.test(t));
    const hasLens = toks.some(t=>/^lens|aperture|bokeh|dof|focus/i.test(t));
    const hasMotion = toks.some(t=>/^move|rig|cam|orbit|track|push/i.test(t));
    const hasGrade = toks.some(t=>/^grade|grain|palette|film|cinema/i.test(t));
    const hasNoiseFix = toks.some(t=>/photometric|consistency|microtexture|detail/i.test(t));
    const repeats = (()=>{
      let r=0;
      for(let i=1;i<len;i++){
        const a=toks[i-1].split(":")[0].toLowerCase().trim();
        const b=toks[i].split(":")[0].toLowerCase().trim();
        if(a===b) r++;
      }
      return r;
    })();
    const flow = Math.max(0, 1 - repeats/Math.max(1,len-1));
    const coverage = (hasLighting?0.25:0) + (hasLens?0.25:0) + (hasMotion?0.2:0) + (hasGrade?0.2:0) + (hasNoiseFix?0.1:0);
    const brevity = len>28 ? 0.7 : 1.0;
    const score = +(Math.min(1, flow*0.5 + coverage*0.5) * brevity).toFixed(3);
    return { score, parts:{flow,coverage,brevity}, len };
  }

  // suggest minimal patches
  function suggestFixes(text){
    const fixes=[];
    if (!/light|lighting|rim|softbox|gel|bloom|flare/i.test(text)) fixes.push("light: key + rim");
    if (!/lens|aperture|bokeh|dof|focus/i.test(text)) fixes.push("lens: 50mm, dof: shallow");
    if (!/grade|grain|palette/i.test(text)) fixes.push("grade: cinematic, subtle grain");
    if (!/photometric|consistency|microtexture/i.test(text)) fixes.push("photometric consistency");
    return fixes;
  }

  CORE.predictQuality = function(denseText){
    const s = scoreDense(denseText);
    return { score:s.score, detail:s };
  };

  CORE.autoPatch = function(denseText){
    const s = scoreDense(denseText);
    let out = denseText;
    if (s.score < 0.78){
      const adds = suggestFixes(denseText);
      out = denseText + (adds.length? ", "+adds.join(", "):"");
    }
    // pass through Meta-Director rewrite if available
    if (typeof CORE.metaRewrite === "function"){
      out = CORE.metaRewrite(out).dense;
    }
    return out;
  };
})();
/* PromptForge — NSFW Core (Block I) — Adult-Only Guard + Consent Auto-Inject */
(function(){
  const NSFW = window.NSFW_CORE; if(!NSFW) return;

  // always ensure adult context + consent tokens exist (non-graphic)
  const ALWAYS = ["age: adults only","consent: enthusiastic","boundaries: agreed"];

  NSFW.ensureAdultContext = function(dense){
    let toks = String(dense||"").split(",").map(s=>s.trim()).filter(Boolean);
    for (const t of ALWAYS){ if (!toks.find(x=>x.toLowerCase()===t.toLowerCase())) toks.push(t); }
    // remove any minor-coded language if present (belt + suspenders)
    toks = toks.filter(t => !/\bteen\b|\bminor\b|\bunder\s*age\b/i.test(t));
    return toks.join(", ");
  };

  // hook point you can call before enhance()
  NSFW.guardHook = function(text){
    text = NSFW.ensureAdultContext(text);
    // tastefully soften if vibe says softcore
    if (typeof NSFW.preMap === "function") text = NSFW.preMap(text, "en");
    return text;
  };
})();
/* PromptForge — Movie Pack (Block AA) — Shot Grammar Engine */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // grammar rules + helpers
  const SIZE = ["shot: ecu","shot: cu","shot: ms","shot: ls","shot: ews"];
  const INSERT_HINTS = ["insert: prop", "insert: hands", "insert: reaction"];
  const CUTAWAY_HINTS = ["cutaway: environment", "cutaway: sky", "cutaway: crowd"];
  const ESTAB_TOKENS = ["scene: establish","shot: ews","compose: wide master"];

  function tset(tokens){ return new Set((tokens||[]).map(x=>String(x).trim()).filter(Boolean)); }
  function addAll(set, arr){ (arr||[]).forEach(x=>set.add(x)); }
  function hasAny(tokens, arr){ const s = tset(tokens); return (arr||[]).some(x=>s.has(x)); }
  function ensureOne(tokens, arr){ const s = tset(tokens); if (!hasAny(tokens, arr)) s.add(arr[0]); return Array.from(s); }
  function cycleSize(prev){
    const i = Math.max(0, SIZE.indexOf(prev)); const next = (i+2) % SIZE.length; // jump size for variety
    return SIZE[next];
  }

  // enforce grammar across a board
  // opts: { ensureEstablish=true, ensureInsert=true, ensureCutaway=true, enforce180=true, sizeVariety=true }
  CORE.shotGrammar = function(board, opts={}){
    if (!board?.cards?.length) return board;
    const cfg = { ensureEstablish:true, ensureInsert:true, ensureCutaway:true, enforce180:true, sizeVariety:true, ...opts };

    // 1) establish on first card
    if (cfg.ensureEstablish){
      const T = tset(board.cards[0].tokens||[]);
      addAll(T, ESTAB_TOKENS);
      board.cards[0].tokens = Array.from(T);
    }

    // 2) size variety + strategic inserts/cutaways
    let lastSize = "shot: ms", angle = 1; // angle sign for simple 180° rule
    for (let i=0;i<board.cards.length;i++){
      const c = board.cards[i];
      const T = tset(c.tokens||[]);

      // size variety
      if (cfg.sizeVariety){
        const thisSize = Array.from(T).find(t=>/^shot:\s*/i.test(t)) || cycleSize(lastSize);
        T.delete(lastSize); T.add(thisSize);
        lastSize = thisSize;
      }

      // 180° rule: alternate screen-left/right blocks (cheap but effective)
      if (cfg.enforce180){
        T.forEach(t=>{
          if (/^block:\s*/i.test(t)) T.delete(t);
        });
        T.add(`block: ${angle>0?"screen-left":"screen-right"}`);
        angle *= -1;
      }

      // insert every ~3rd beat (if not already an insert)
      if (cfg.ensureInsert && i>0 && i%3===0 && !hasAny(T, INSERT_HINTS)){
        T.add(INSERT_HINTS[(i/3)%INSERT_HINTS.length]);
      }
      // cutaway around ~2/3 mark
      if (cfg.ensureCutaway && i===Math.floor(board.cards.length*0.66)){
        T.add(CUTAWAY_HINTS[i % CUTAWAY_HINTS.length]);
      }

      c.tokens = Array.from(T);
    }
    return board;
  };

  // ensure shot-size coverage exists at least once
  CORE.ensureShotCoverage = function(board){
    if (!board?.cards?.length) return board;
    const seen = new Set();
    board.cards.forEach(c=>{
      const s = (c.tokens||[]).find(t=>/^shot:\s*/i.test(t));
      if (s) seen.add(s.toLowerCase());
    });
    // if missing extremes, patch last two beats
    const want = ["shot: ews","shot: ecu"];
    want.forEach((w, idx)=>{
      if (!seen.has(w)) {
        const i = Math.max(0, board.cards.length - (idx+1));
        const T = new Set(board.cards[i].tokens||[]);
        T.add(w); board.cards[i].tokens = Array.from(T);
      }
    });
    return board;
  };

  // UI hint
  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.grammarTools = ["shotGrammar","ensureShotCoverage"];
    return h;
  };})(CORE.uiHints);

})();
/* PromptForge — Movie Pack (Block AB) — Continuity Report + Diff + Fix */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  function cat(tok){ return String(tok||"").split(":")[0].trim().toLowerCase(); }
  function collect(board){
    const map = {}; if (!board?.cards) return map;
    board.cards.forEach((c,i)=>{
      (c.tokens||[]).forEach(t=>{
        const k = cat(t); map[k]=map[k]||{}; map[k][i]=t;
      });
    });
    return map;
  }

  // report continuity breaks across categories you care about
  CORE.continuityReport = function(board, cats=["wardrobe","lighting","grade","ratio","fps","props"]){
    const data = collect(board);
    const out = {};
    cats.forEach(k=>{
      const hits = data[k]||{};
      const beats = Object.keys(hits).map(n=>Number(n)).sort((a,b)=>a-b);
      // break if value changes too frequently
      let changes = 0, last=null;
      beats.forEach(b=>{
        const v = hits[b];
        if (last && v!==last) changes++;
        last = v;
      });
      out[k] = { occurrences: beats.length, changes, beats, values: beats.map(b=>hits[b]) };
    });
    return out;
  };

  // diff two boards (token-level)
  CORE.diffBoards = function(a,b){
    const A = (a?.cards||[]).map(c=>new Set(c.tokens||[]));
    const B = (b?.cards||[]).map(c=>new Set(c.tokens||[]));
    const n = Math.max(A.length, B.length);
    const diff=[];
    for(let i=0;i<n;i++){
      const add=[], del=[];
      (B[i]||new Set()).forEach(t=>{ if(!(A[i]||new Set()).has(t)) add.push(t); });
      (A[i]||new Set()).forEach(t=>{ if(!(B[i]||new Set()).has(t)) del.push(t); });
      diff.push({ beat:i, add, del });
    }
    return diff;
  };

  // auto-fix plan: lock chosen categories to first-beat value
  CORE.continuityFix = function(board, cats=["wardrobe","lighting","grade"]){
    if (!board?.cards?.length) return board;
    const first = new Map();
    (board.cards[0].tokens||[]).forEach(t=>{ const k=cat(t); first.set(k,t); });
    for (let i=1;i<board.cards.length;i++){
      const T = new Set(board.cards[i].tokens||[]);
      cats.forEach(k=>{
        const base = first.get(k);
        if (base){
          // drop other tokens of same cat
          Array.from(T).forEach(t=>{ if (cat(t)===k && t!==base) T.delete(t); });
          T.add(base);
        }
      });
      board.cards[i].tokens = Array.from(T);
    }
    return board;
  };

  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.reports = ["continuityReport","diffBoards"];
    return h;
  };})(CORE.uiHints);
})();
/* PromptForge — Movie Pack (Block AC) — Localization (overlays + captions) */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // light dicts for overlays/CTA words; captions can be passed through a mapper hook
  PACK.lang = PACK.lang || {
    overlays: {
      "en": { "Wait for it…":"Wait for it…", "You won’t believe this":"You won’t believe this", "Keep watching →":"Keep watching →", "Subscribe for the full story":"Subscribe for the full story" },
      "es": { "Wait for it…":"Espera…", "You won’t believe this":"No lo vas a creer", "Keep watching →":"Sigue mirando →", "Subscribe for the full story":"Suscríbete para ver más" },
      "pt": { "Wait for it…":"Espera…", "You won’t believe this":"Você não vai acreditar", "Keep watching →":"Continue assistindo →", "Subscribe for the full story":"Inscreva-se para ver mais" },
      "fr": { "Wait for it…":"Attends…", "You won’t believe this":"Tu ne vas pas y croire", "Keep watching →":"Continue à regarder →", "Subscribe for the full story":"Abonne-toi pour la suite" },
      "de": { "Wait for it…":"Warte ab…", "You won’t believe this":"Du wirst es nicht glauben", "Keep watching →":"Weiter schauen →", "Subscribe for the full story":"Abonnieren für die ganze Story" },
      "it": { "Wait for it…":"Aspetta…", "You won’t believe this":"Non ci crederai", "Keep watching →":"Continua a guardare →", "Subscribe for the full story":"Iscriviti per la storia completa" },
      "ja": { "Wait for it…":"待って…", "You won’t believe this":"信じられないよ", "Keep watching →":"続きを見て →", "Subscribe for the full story":"続きはチャンネル登録で" }
    }
  };

  function translateOverlayStr(str, lang){
    const dict = PACK.lang.overlays[lang]; if (!dict) return str;
    return dict[str] || str;
  }

  // find overlay: text tokens and translate
  CORE.translateOverlays = function(board, lang="en"){
    if (!board?.cards?.length || lang==="en") return board;
    board.cards.forEach(c=>{
      const T = (c.tokens||[]).map(tok=>{
        const m = /^overlay:\s*(.+)$/i.exec(tok);
        if (m) return "overlay: " + translateOverlayStr(m[1], lang);
        return tok;
      });
      c.tokens = T;
    });
    return board;
  };

  // captions translation hook (tiny stubs; you can plug a map or service later)
  CORE.translateCaptions = function(captions=[], lang="en"){
    if (lang==="en") return captions.slice();
    const map = PACK.lang.overlays[lang] || {}; // reuse overlay dict as demo
    return captions.map(c => ({...c, text: map[c.text] || c.text }));
  };

  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.locales = Object.keys(PACK.lang.overlays);
    return h;
  };})(CORE.uiHints);
})();
/* PromptForge — Movie Pack (Block AD) — Motion Curves + Path Shapes */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  // easing profiles (0..1 → multiplier)
  const EASE = {
    linear: t=>t,
    easeIn: t=>t*t,
    easeOut: t=>t*(2-t),
    easeInOut: t=>(t<0.5? 2*t*t : -1+(4-2*t)*t),
    punch: t=>Math.min(1, Math.pow(t,0.6)) // quick start, smooth settle
  };

  // curve of N frames/steps
  CORE.motionCurve = function(steps=10, ease="easeInOut"){
    const fn = EASE[ease]||EASE.easeInOut, out=[];
    for(let i=0;i<steps;i++){ out.push(+fn(i/(steps-1||1)).toFixed(3)); }
    return out;
  };

  // simple 2D path shapes; return control points
  CORE.cameraPath = function(shape="arc", radius=2){
    if (shape==="arc"){
      return [{x:-radius,z:-2},{x:0,z:-3},{x:radius,z:-2}];
    }
    if (shape==="push"){
      return [{x:0,z:-4},{x:0,z:-2},{x:0,z:-1}];
    }
    if (shape==="orbit"){
      return [{x:-radius,z:-2},{x:0,z:-4},{x:radius,z:-2},{x:0,z:0}];
    }
    return [{x:0,z:-3},{x:0,z:-2}];
  };

  // apply motion hint tokens to selected beats (metadata-only; engines won’t read keyframes but editors can)
  // plan: [{beatIndex, ease, steps, shape}]
  CORE.applyMotionPlan = function(board, plan=[]){
    if (!board?.cards?.length) return board;
    for (const p of plan){
      const i = Number(p.beatIndex)||0; if (!board.cards[i]) continue;
      const curve = CORE.motionCurve(p.steps||10, p.ease||"easeInOut");
      const path  = CORE.cameraPath(p.shape||"push");
      const token = `motion: ${p.shape||"push"}; ease=${p.ease||"easeInOut"}; steps=${curve.length}`;
      const T = new Set(board.cards[i].tokens||[]); T.add(token); board.cards[i].tokens = Array.from(T);
      // stash as metadata the points (so your UI timeline can display)
      board.cards[i].motionMeta = { curve, path };
    }
    return board;
  };

  CORE.uiHints = (function(old){ return function(){
    const h = old.call(CORE);
    h.motionEases = Object.keys(EASE);
    h.motionShapes = ["push","arc","orbit","linear"];
    return h;
  };})(CORE.uiHints);
})();
/* PromptForge — Movie Pack (Block AE) — Project Manifest + Filenames */
(function(){
  const CORE = window.MovieCORE, PACK = CORE?.data; if(!CORE||!PACK) return;

  function slug(s){ return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"clip"; }
  function ts(){ const d=new Date(); return d.toISOString().replace(/[:.]/g,"").replace("T","_").slice(0,15); }

  CORE.suggestFilenames = function({ title="project", platform="reel", ext="txt", shotsCount=0 }={}){
    const base = `${slug(title)}_${platform}_${ts()}`;
    return {
      prompts: `${base}_prompts.${ext}`,
      negatives: `${base}_negatives.${ext}`,
      captionsSRT: `${base}.srt`,
      captionsVTT: `${base}.vtt`,
      ssml: `${base}.ssml`,
      bundle: `${base}_bundle.json`,
      shotsDir: `${base}_shots_${shotsCount}`
    };
  };

  // manifest with everything the UI needs to zip & download
  CORE.projectManifest = function(exportPack={}, meta={ title:"project", platform:"reel" }){
    const f = CORE.suggestFilenames({ title: meta.title, platform: meta.platform, shotsCount:(exportPack.shots||[]).length });
    return {
      meta: { title: meta.title, platform: meta.platform, createdAt: new Date().toISOString() },
      files: f,
      engine: exportPack?.bundle?.engine || "runway",
      shots: (exportPack.shots||[]).map((s, i)=>({
        index:i, seconds:s.seconds, beat:s.beat, prompt:s.prompt, negative:s.negative||""
      })),
      negatives: exportPack.negatives || "",
      captions: { srt: exportPack.captions?.srt || "", vtt: exportPack.captions?.vtt || "" },
      ssml: exportPack.ssml || "",
      refs: exportPack.bundle?.refs || {},
      cast: exportPack.bundle?.cast || []
    };
  };
})();
/* PromptForge — NSFW Core (Block J) — Romance Beat Escalator (tasteful) */
(function(){
  const NSFW = window.NSFW_CORE; if(!NSFW) return;

  // non-graphic progressive adds per level
  const LVL = {
    0: ["mood: calm","distance: comfortable"],
    1: ["mood: playful","gesture: close whisper","pose: close embrace"],
    2: ["mood: charged","silhouette emphasis","light: low key"],
    3: ["mood: intense","hold: hero 2s","beat: breathless pause"]
  };

  // n beats → array of add tokens per beat
  NSFW.romanceCurve = function(n=3, shape="rise"){
    const out=[]; n=Math.max(1,n);
    for(let i=0;i<n;i++){
      let l = 1;
      if (shape==="rise") l = Math.round(i*(3/(n-1||1)));
      else if (shape==="wave") l = Math.round(Math.sin((i/(n-1||1))*Math.PI)*3);
      else if (shape==="pulse") l = (i===Math.floor(n/2))?3:1;
      out.push(LVL[l] || LVL[1]);
    }
    return out;
  };

  // apply onto a board (non-graphic, consent-first)
  NSFW.applyRomanceCurve = function(board, shape="rise"){
    if (!board?.cards?.length) return board;
    const adds = NSFW.romanceCurve(board.cards.length, shape);
    board.cards.forEach((c, i)=>{
      const T = new Set(c.tokens||[]);
      // consent guard (safe)
      T.add("age: adults only"); T.add("consent: enthusiastic"); T.add("boundaries: agreed");
      (adds[i]||[]).forEach(t=>T.add(t));
      c.tokens = Array.from(T);
    });
    return board;
  };
})();
// 0) compose
let board = MovieCORE.directorCompose({ logline, vibe, lengthSec, curveShape:'wave' });

// 1) grammar + continuity + romance (if NSFW softcore)
board = MovieCORE.shotGrammar(board);
board = MovieCORE.ensureShotCoverage(board);
board = MovieCORE.applyContinuity(board);
if (NSFW_CORE && vibe==='romance') board = NSFW_CORE.applyRomanceCurve(board, 'rise');

// 2) platform audit + overlays lang
board = MovieCORE.injectSocial(board, { platform });
board = MovieCORE.auditBoard(board, { platform });
board = MovieCORE.translateOverlays(board, lang);

// 3) motion (optional) + stage (optional)
board = MovieCORE.applyMotionPlan(board, [{ beatIndex:1, ease:'punch', steps:12, shape:'push' }]);

// 4) render → shader → autopatch → guard
let shots = MovieCORE.renderBoardTimed(board, { engine, genre });
shots = shots.map(s=>{
  let dense = MovieCORE.autoPatch(s.prompt);
  dense = MovieCORE.applyShader(shader, dense);
  if (NSFW_CORE?.guardHook) dense = NSFW_CORE.guardHook(dense);
  s.prompt = dense; return s;
});

// 5) smart export + manifest
const pack = MovieCORE.smartExport({ board, ctx:{ engine, genre }, musicToken, lines, voiceToken });
const manifest = MovieCORE.projectManifest(pack, { title: board.title || 'project', platform });
