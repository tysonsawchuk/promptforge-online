/*==============================================================================
| BLOCK 1 — MASTER BOOTSTRAP + PROJECT BRAIN (START)
| ID: BLOCK 1
| DATE: 2025-09-11
| PURPOSE:
|   • Define append-only rules, global namespace, UI contracts, and “smart” local features.
|   • Ensure any NEW session can keep stacking blocks (2, 2a, 3, 3a, …) with zero guesswork.
|   • Power a SFW↔NSFW slider, explicit gating, pack loading from disk/URL, and session notes.
|
| APPEND-ONLY CONTRACT (NEVER BREAK):
|   1) Never edit or reorder old blocks. Only append new block chunks at the bottom.
|   2) Block labels are simple and linear: BLOCK 1, BLOCK 2, BLOCK 3…; use 2a, 3a for explicit mirrors.
|   3) Each block must include: header banner, PURPOSE, INTERNAL NOTES, START/END markers, packs.push(...).
|   4) Regex: ASCII-safe, case-insensitive, simple lookarounds only. No catastrophic patterns.
|   5) Replacements are clinical/neutral, not porn-y prose. Adult content = consensual adults only.
|   6) Explicit wording only in *directional* blocks (e.g., “BLOCK 2a”) gated by UI (allowExplicit:true).
|   7) This lexicon covers EVERY prompt domain (NSFW is a subset): anatomy, acts, profanity, emojis,
|      pop-styles (“simpsonize” → descriptive features), camera/lighting, art styles, environments,
|      products/materials, creatures/mecha/VFX, UI/UX/logos, multilingual mirroring.
|
| HOW THIS FILE IS “SMART” (NO BACKEND NEEDED):
|   • Local cache (localStorage): keep a snapshot of block IDs and session notes for fast recovery.
|   • Support packs loader: load extra JSON/JS packs from URL or file input, append to PACKS.
|   • Directional escalator: clean → explicit (when UI allows) by applying “a” blocks only.
|   • Severity scoring: quick scan to estimate SFW/NSFW level for slider decisions.
|   • Session notes API: we record ideas/todos right in the file to survive between chats.
|
| UI CONTRACT (WHAT YOUR HTML/JS SHOULD DO LATER):
|   • Expose: slider or toggle { allowExplicit:boolean, nsfwLevel:0..100 }.
|   • Call PF_CORE.sanitize(text, { allowExplicit, direction:'clean'|'explicit' }).
|   • Optional: PF_CORE.score(text) → { severitySum, hits, byTag:{...} } to position the slider.
|   • Optional: PF_CORE.expandStyleKey('simpsonize') → returns descriptive feature bundle (brand-free).
|
| ROADMAP (FIRST PASSES):
|   - BLOCK 2  : Anatomy core (clinical)
|   - BLOCK 2a : Anatomy explicit-directional (gated)
|   - BLOCK 3  : Acts & positions (clinical)
|   - BLOCK 3a : Acts explicit-directional (gated)
|   - BLOCK 4  : Profanity (clinical softening + tone control)
|   - BLOCK 4a : Profanity explicit-directional (full swear set, gated)
|   - BLOCK 5  : Pop-style bundles (e.g., “simpsonize” → descriptive features)
|   - BLOCK 6  : Photography/camera/lens/exposure/lighting
|   - BLOCK 7  : Art styles/movements/mediums/techniques
|   - BLOCK 8  : Environments/biomes/weather/time-of-day
|   - BLOCK 9  : Products/materials/PBR descriptors/aging/wear
|   - BLOCK 10 : Multilingual mirrors (es, fr, de, it, pt, ja, ko, zh, ru, hi, ar…)
|
| THINGS YOU DIDN’T ASK BUT ABSOLUTELY WANT:
|   • Emoji semantics (🍑→butt, 🍆→penis, 😭→tears/liquid emphasis) routed to clinical tokens.
|   • “Style key” dictionary for pop-culture metaphors (brand-free feature bundles).
|   • Heuristic “learning” = we append slang from user prompts into future blocks/notes (no ML).
|   • Duplicate/overlap guard so later blocks don’t double-map the same slang awkwardly.
|   • Worker-ready (optional) so giant passes don’t hitch the UI.
|   • CRC-ish checksum for block registries so you can debug what loaded.
==============================================================================*/
(function (global) {
  // ---------- Namespace & Globals -------------------------------------------
  const CORE = (global.PF_CORE = global.PF_CORE || {});
  const PACKS = (global.PF_PACKS = global.PF_PACKS || []);
  global.packs = PACKS; // legacy alias if older code expects `packs`

  // ---------- Metadata & Session Notes --------------------------------------
  CORE.META = CORE.META || {
    schema: "pf.picture.simple.v1",
    created: "2025-09-11",
    version: "1.0.0",
    append_only: true,
    session_notes: [
      "Append-only. New blocks always go at bottom. Labels: 1, 2, 2a, 3, 3a, ...",
      "Default path is CLEAN. Explicit wording only when UI sets allowExplicit:true.",
      "Severity 1..5 (5 strongest adult) + tags feed SFW↔NSFW slider.",
      "Style shorthands must resolve to descriptive features (brand-free).",
      "Plan multilingual mirrors for all big packs once EN is stable."
    ]
  };

  CORE.addNote = function addNote(note) {
    if (!note) return false;
    try {
      CORE.META.session_notes.push(String(note));
      try {
        const key = "pf_notes_cache_v1";
        const arr = JSON.parse(localStorage.getItem(key) || "[]");
        arr.push({ ts: Date.now(), note: String(note) });
        localStorage.setItem(key, JSON.stringify(arr));
      } catch (_) {}
      return true;
    } catch (_) { return false; }
  };

  // ---------- Utility: simple CRC-ish of block IDs for debugging ------------
  CORE.registryDigest = function registryDigest() {
    let s = 0 >>> 0;
    for (const p of PACKS) {
      const id = (p && p.block_id) ? String(p.block_id) : "";
      for (let i = 0; i < id.length; i++) s = (s + id.charCodeAt(i)) >>> 0;
    }
    return s.toString(16);
  };

  // ---------- Style Key Bundles (brand-free descriptive expansions) ---------
  // Not direct replacements; these are lookups your UI can expand into prompt text.
  CORE.STYLE_BUNDLES = {
    simpsonize: [
      "saturated yellow skin tones",
      "bold black ink outlines",
      "simplified geometric facial proportions",
      "2D flat toon shading, limited gradient",
      "overbite mouth characteristic"
    ],
    // Add more in BLOCK 5 (and 5a if explicit tokens are ever needed/gated)
  };

  CORE.expandStyleKey = function expandStyleKey(key) {
    const arr = CORE.STYLE_BUNDLES[String(key || "").toLowerCase()];
    return Array.isArray(arr) ? arr.slice() : [];
  };

  // ---------- Emoji semantics (seed; big set will live in later blocks) -----
  CORE.EMOJI_SEMantics = {
    "🍑": ["buttocks"],
    "🍆": ["penis"],
    "💦": ["liquid spray", "moisture"],
    "❤️": ["love", "romantic emphasis"],
    "😀": ["smiling face", "happy mood"]
    // Full emoji map will be appended as its own pack later.
  };

  // ---------- Directional Escalator (clean → explicit when allowed) ---------
  CORE.applyDirectional = function applyDirectional(text, opts = {}) {
    const { to = "clean", allowExplicit = false } = opts;
    let out = String(text || "");
    if (!out) return out;
    if (to === "explicit" && allowExplicit) {
      for (const pack of PACKS) {
        if (!pack || !/BLOCK\s+\d+a$/i.test(pack.block_id)) continue; // use *a blocks only
        for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
      }
    }
    return out;
  };

  // ---------- Sanitizer Pass (applies all CLEAN packs) ----------------------
  CORE.sanitize = function sanitize(text, opts = {}) {
    const { direction = "clean", allowExplicit = false } = opts;
    let out = String(text || "");
    if (!out) return out;

    // 1) Clean replacements (non-explicit blocks, e.g., "BLOCK 2", "BLOCK 3")
    for (const pack of PACKS) {
      if (!pack || /BLOCK\s+\d+a$/i.test(pack.block_id)) continue; // skip explicit-direction blocks here
      for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
    }

    // 2) Optional explicit escalation
    if (direction === "explicit" && allowExplicit) {
      out = CORE.applyDirectional(out, { to: "explicit", allowExplicit: true });
    }
    return out;
  };

  // ---------- Scoring (quick SFW↔NSFW estimate) -----------------------------
  CORE.score = function score(text) {
    const src = String(text || "");
    let severitySum = 0;
    const byTag = {};
    let hits = 0;

    for (const pack of PACKS) {
      for (const e of (pack.entries || [])) {
        const re = e.pattern;
        re.lastIndex = 0;
        let m;
        while ((m = re.exec(src)) !== null) {
          hits++;
          const sev = Number(e.severity || 0) || 0;
          severitySum += sev;
          for (const t of (e.tags || [])) {
            byTag[t] = (byTag[t] || 0) + sev;
          }
          if (!re.global) break; // safety
        }
      }
    }
    return { severitySum, hits, byTag };
  };

  // ---------- Support Packs Loader (URL or object or <input type=file>) -----
  CORE.loadSupportPack = async function loadSupportPack(src) {
    let packs = null;
    if (typeof src === "string") {
      const res = await fetch(src);
      const text = await res.text();
      try { packs = JSON.parse(text); }
      catch {
        // allow JS that sets `window.__PF_PACK__ = {...}`
        const fn = new Function("w", `${text}; return w.__PF_PACK__;`);
        packs = fn(global);
      }
    } else if (src && typeof src === "object") {
      packs = src;
    }
    const arr = Array.isArray(packs) ? packs : [packs];
    for (const p of arr) if (p && p.block_id && Array.isArray(p.entries)) PACKS.push(p);
    CORE.cacheRegistry();
    CORE.registerPF();
    return true;
  };

  CORE.importSupportPackFile = function importSupportPackFile(file) {
    return new Promise((resolve) => {
      const r = new FileReader();
      r.onload = async () => {
        try { resolve(await CORE.loadSupportPack(r.result)); }
        catch { resolve(false); }
      };
      r.readAsText(file);
    });
  };

  // ---------- Cache registry snapshot (for fast reloads) --------------------
  CORE.cacheRegistry = function cacheRegistry() {
    try {
      const key = "pf_registry_v1";
      const snapshot = PACKS.map(p => ({ id: p.block_id, lang: p.language, cat: p.category }));
      localStorage.setItem(key, JSON.stringify(snapshot));
    } catch (_) {}
  };

  // ---------- PF Integration (if PF exists on page) -------------------------
  CORE.registerPF = function registerPF() {
    if (typeof global.PF !== "undefined") {
      global.PF.LEXICON = (global.PF.LEXICON || []);
      for (const p of PACKS) if (!global.PF.LEXICON.includes(p)) global.PF.LEXICON.push(p);
      if (!global.PF.applyDirectional) global.PF.applyDirectional = CORE.applyDirectional;
    }
    global.PICTURE_PACKS = { META: CORE.META, packs: PACKS, applyDirectional: CORE.applyDirectional };
  };

  // ---------- Worker Hint (optional) ----------------------------------------
  CORE.WORKER_HINT = "Move heavy sanitize/score into a web worker (e.g., /js/pf_worker.js)";

  // ---------- Initialize -----------------------------------------------------
  try { CORE.cacheRegistry(); } catch (_) {}
  if (typeof queueMicrotask === "function") queueMicrotask(CORE.registerPF);
  else setTimeout(CORE.registerPF, 0);
})(typeof self !== "undefined" ? self : this);
/*=============================== BLOCK 1 — END ===============================*/
/* ================================================================
 * BLOCK 2 — ANATOMY CORE (EN)  (START)
 * ID: BLOCK 2
 * DATE: 2025-09-11
 * PURPOSE:
 *   - High-frequency anatomy & fluids slang → clinical/neutral tokens.
 *   - Runs early so later packs (acts, wardrobe, camera, styles) build on clean text.
 *   - CONSENSUAL, ADULT context only; no minors/illegal content mapped here.
 * INTERNAL NOTES:
 *   - Directional explicit mirror will be BLOCK 2a (gated via allowExplicit:true).
 *   - Severity values here contribute to SFW↔NSFW slider score.
 *   - Regional/multilingual variants will be mirrored later (BLOCK 10+).
 * ----------------------------------------------------------------
 * APPEND THIS WHOLE BLOCK AT THE BOTTOM. DO NOT EDIT OLD BLOCKS.
 * ================================================================ */
// >>> START OF BLOCK 2 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 2',
  language: 'en',
  category: 'anatomy_core',
  emoji: ['🫦','🫁','🫀','🦴'],
  notes: [
    'Foundation mappings for breasts, nipples, vulva/vagina, penis, testicles, anus, fluids.',
    'Regex are ASCII-safe with simple lookarounds; replacements are clinical/neutral.',
    'Designed to run before acts/profanity/style blocks for coherent sanitization.'
  ],
  entries: [
    // ——— BREASTS ———
    { pattern: /(?<![A-Za-z])(t[i1!|]t?s?)(?![A-Za-z])/gi, replacement: 'breasts', severity: 2, tags: ['female','slang'], ex: ['tits out → breasts exposed'] },
    { pattern: /(?<![A-Za-z])boob(?:s|ies)?(?![A-Za-z])/gi, replacement: 'breasts', severity: 2, tags: ['female','slang'] },
    { pattern: /(?<![A-Za-z])rack(?![A-Za-z])/gi,           replacement: 'breasts', severity: 1, tags: ['female'] },
    { pattern: /(?<![A-Za-z])jubbl(?:y|ies|ys)(?![A-Za-z])/gi, replacement: 'breasts', severity: 2, tags: ['female','UK'] },
    { pattern: /(?<![A-Za-z])melons?(?![A-Za-z])/gi,         replacement: 'large breasts', severity: 2, tags: ['female','metaphor'] },

    // ——— NIPPLES / AREOLAE ———
    { pattern: /(?<![A-Za-z])nipp?les?(?![A-Za-z])/gi,       replacement: 'nipples', severity: 1, tags: ['neutral'] },
    { pattern: /(?<![A-Za-z])areolae?(?![A-Za-z])/gi,        replacement: 'areolae', severity: 1, tags: ['neutral'] },

    // ——— VULVA / VAGINA / CLITORIS ———
    { pattern: /(?<![A-Za-z])p(?:u|v)(?:s|\$)?s(?:y|i)(?![A-Za-z])/gi, replacement: 'vagina', severity: 3, tags: ['female','slang'] },
    { pattern: /(?<![A-Za-z])coo(?:ch|chie)(?![A-Za-z])/gi,  replacement: 'vagina', severity: 3, tags: ['female','slang'] },
    { pattern: /(?<![A-Za-z])vajayjay(?![A-Za-z])/gi,        replacement: 'vagina', severity: 2, tags: ['female','pop'] },
    { pattern: /(?<![A-Za-z])kitty(?![A-Za-z])/gi,           replacement: 'vagina', severity: 2, tags: ['female','euphemism'] },
    { pattern: /(?<![A-Za-z])clit(?:ty)?(?![A-Za-z])/gi,     replacement: 'clitoris', severity: 3, tags: ['female'] },
    { pattern: /(?<![A-Za-z])bean(?![A-Za-z])/gi,            replacement: 'clitoris', severity: 2, tags: ['female','metaphor'] },
    { pattern: /(?<![A-Za-z])labia(?![A-Za-z])/gi,           replacement: 'vulva', severity: 2, tags: ['female'] },
    { pattern: /(?<![A-Za-z])lip\s*down\s*there(?![A-Za-z])/gi, replacement: 'vulva', severity: 2, tags: ['female'] },

    // ——— BUTT / ANUS ———
    { pattern: /(?<![A-Za-z])ass(?!ets)(?![A-Za-z])/gi,      replacement: 'buttocks', severity: 1, tags: ['neutral'] },
    { pattern: /(?<![A-Za-z])butt(?![A-Za-z])/gi,            replacement: 'buttocks', severity: 1, tags: ['neutral'] },
    { pattern: /(?<![A-Za-z])booty(?![A-Za-z])/gi,           replacement: 'buttocks', severity: 1, tags: ['neutral','US'] },
    { pattern: /(?<![A-Za-z])arse(?![A-Za-z])/gi,            replacement: 'buttocks', severity: 1, tags: ['neutral','UK'] },
    { pattern: /(?<![A-Za-z])butt\s*hole|ass\s*hole|backdoor/gi, replacement: 'anus', severity: 3, tags: ['neutral'] },
    { pattern: /(?<![A-Za-z])anus(?![A-Za-z])/gi,            replacement: 'anus', severity: 3, tags: ['neutral'] },

    // ——— PENIS / TESTICLES ———
    { pattern: /(?<![A-Za-z])dick(?![A-Za-z])/gi,            replacement: 'penis', severity: 3, tags: ['male','slang'] },
    { pattern: /(?<![A-Za-z])cock(?![A-Za-z])/gi,            replacement: 'penis', severity: 3, tags: ['male','slang'] },
    { pattern: /(?<![A-Za-z])member(?![A-Za-z])/gi,          replacement: 'penis', severity: 2, tags: ['male','euphemism'] },
    { pattern: /(?<![A-Za-z])shaft(?![A-Za-z])/gi,           replacement: 'penis', severity: 2, tags: ['male'] },
    { pattern: /(?<![A-Za-z])schlong(?![A-Za-z])/gi,         replacement: 'penis', severity: 3, tags: ['male','colloquial'] },
    { pattern: /(?<![A-Za-z])johnson(?![A-Za-z])/gi,         replacement: 'penis', severity: 2, tags: ['male','slang'] },
    { pattern: /(?<![A-Za-z])balls?(?![A-Za-z])/gi,          replacement: 'testicles', severity: 3, tags: ['male'] },
    { pattern: /(?<![A-Za-z])nuts(?![A-Za-z])/gi,            replacement: 'testicles', severity: 3, tags: ['male'] },
    { pattern: /(?<![A-Za-z])sack(?![A-Za-z])/gi,            replacement: 'scrotum', severity: 2, tags: ['male'] },
    { pattern: /(?<![A-Za-z])scrote\w*(?![A-Za-z])/gi,       replacement: 'scrotum', severity: 2, tags: ['male'] },

    // ——— FLUIDS ———
    { pattern: /(?<![A-Za-z])precum(?![A-Za-z])/gi,          replacement: 'pre-ejaculatory fluid', severity: 4, tags: ['fluid'] },
    { pattern: /(?<![A-Za-z])cum(shot)?(?![A-Za-z])/gi,      replacement: 'semen', severity: 4, tags: ['fluid'] },
    { pattern: /(?<![A-Za-z])jizz(?![A-Za-z])/gi,            replacement: 'semen', severity: 4, tags: ['fluid'] },
    { pattern: /(?<![A-Za-z])load(?![A-Za-z])/gi,            replacement: 'semen', severity: 3, tags: ['fluid','metaphor'] }
  ]
});
// >>> END OF BLOCK 2 <<<

/* ================================================================
 * BLOCK 2 — ANATOMY CORE (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 2a — ANATOMY EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 2a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Clinical → colloquial/NSFW-ish wording (tits, pussy, cock, etc).
 *   - Runs ONLY when allowExplicit:true (UI gating).
 * INTERNAL NOTES:
 *   - Mirrors BLOCK 2 but reverses mapping for spicier prompts.
 *   - Safe fallback: if user has slider set to SFW, this block is skipped.
 *   - Severity values slightly higher to push NSFW slider up.
 * ================================================================ */
// >>> START OF BLOCK 2a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 2a',
  language: 'en',
  category: 'anatomy_explicit',
  gated: true,
  emoji: ['🔥','🍆','🍑'],
  notes: [
    'Reverse mapping of anatomy_core: escalates to explicit slang.',
    'Applied by CORE.applyDirectional() when direction="explicit" and allowExplicit=true.'
  ],
  entries: [
    // Breasts
    { pattern: /\bbreasts?\b/gi,  replacement: 'tits', severity: 3, tags: ['female','explicit'] },
    { pattern: /\bchest\b/gi,    replacement: 'tits', severity: 3, tags: ['female','explicit'] },
    // Nipples / Areolae
    { pattern: /\bnipples?\b/gi, replacement: 'hard nipples', severity: 4, tags: ['explicit'] },
    // Vulva / Vagina
    { pattern: /\bvagina\b/gi,   replacement: 'pussy', severity: 4, tags: ['female','explicit'] },
    { pattern: /\bvulva\b/gi,    replacement: 'pussy lips', severity: 4, tags: ['female','explicit'] },
    { pattern: /\bclitoris\b/gi, replacement: 'clit', severity: 4, tags: ['female','explicit'] },
    // Butt / Anus
    { pattern: /\bbuttocks?\b/gi, replacement: 'ass', severity: 3, tags: ['explicit'] },
    { pattern: /\banus\b/gi,      replacement: 'asshole', severity: 4, tags: ['explicit'] },
    // Penis / Testicles
    { pattern: /\bpenis\b/gi,     replacement: 'cock', severity: 4, tags: ['male','explicit'] },
    { pattern: /\bshaft\b/gi,     replacement: 'cock', severity: 4, tags: ['male','explicit'] },
    { pattern: /\btesticles?\b/gi,replacement: 'balls', severity: 4, tags: ['male','explicit'] },
    { pattern: /\bscrotum\b/gi,   replacement: 'ballsack', severity: 4, tags: ['male','explicit'] },
    // Fluids
    { pattern: /\bsemen\b/gi, replacement: 'cum', severity: 5, tags: ['fluid','explicit'] },
    { pattern: /\bpre-ejaculatory fluid\b/gi, replacement: 'precum', severity: 5, tags: ['fluid','explicit'] }
  ]
});
// >>> END OF BLOCK 2a <<<

/* ================================================================
 * BLOCK 2a — ANATOMY EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 3 — ACTS & POSITIONS (EN)  (START)
 * ID: BLOCK 3
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map slang & shorthand for consensual sexual acts into clear, clinical language.
 *   - Covers oral, manual, penetration positions, and common paired terms.
 *   - Lays groundwork so AI outputs are descriptive but safe for SFW-mode.
 * INTERNAL NOTES:
 *   - Explicit/colloquial mirrors (blowjob, doggystyle, titfuck, etc) will live in BLOCK 3a.
 *   - Acts that imply coercion, non-consent, or illegal content are deliberately excluded.
 *   - Severity values tuned for slider scoring — 3=sexual but not explicit, 5=explicit but clinical.
 * ================================================================ */
// >>> START OF BLOCK 3 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 3',
  language: 'en',
  category: 'acts_positions',
  emoji: ['🛏️','🔄','👅','✋'],
  notes: [
    'Maps common slang to descriptive, neutral phrasing.',
    'Designed to run after anatomy core (BLOCK 2) for coherence.'
  ],
  entries: [
    // ——— ORAL ———
    { pattern: /\b(bj|blow\s*job|blow\s*jobs|giving\s*head|go(?:ing)?\s*down\s*on)\b/gi,
      replacement: 'oral sex (performing)', severity: 4, tags: ['oral','giver'] },
    { pattern: /\b(deep\s*throat(?:ing)?|dt)\b/gi,
      replacement: 'deep oral penetration', severity: 5, tags: ['oral'] },
    { pattern: /\b(face\s*fuck(?:ing)?)\b/gi,
      replacement: 'deep oral penetration', severity: 5, tags: ['oral'] },
    { pattern: /\b(eat(?:ing)?\s*out|cunn?ilingu(?:s|s)|munch(?:ing)?\s*box)\b/gi,
      replacement: 'oral stimulation of the vulva', severity: 4, tags: ['oral','receiver'] },

    // ——— MANUAL ———
    { pattern: /\b(hand\s*job|hj)\b/gi,
      replacement: 'manual stimulation (penis)', severity: 3, tags: ['manual'] },
    { pattern: /\b(fingering|digital\s*penetration)\b/gi,
      replacement: 'manual penetration (vagina)', severity: 3, tags: ['manual'] },
    { pattern: /\b(finger\s*play|playing\s*with\s*fingers)\b/gi,
      replacement: 'manual stimulation (vagina)', severity: 3, tags: ['manual'] },

    // ——— PENETRATION / POSITIONS ———
    { pattern: /\b(vaginal\s*sex|intercourse|making\s*love|sleeping\s*together)\b/gi,
      replacement: 'vaginal intercourse (consensual)', severity: 3, tags: ['penetration'] },
    { pattern: /\b(doggy\s*style|from\s*behind)\b/gi,
      replacement: 'rear-entry position', severity: 4, tags: ['position'] },
    { pattern: /\b(missionary|face\s*to\s*face)\b/gi,
      replacement: 'missionary position', severity: 3, tags: ['position'] },
    { pattern: /\b(cowgirl|girl\s*on\s*top)\b/gi,
      replacement: 'female-superior position', severity: 4, tags: ['position'] },
    { pattern: /\b(reverse\s*cowgirl)\b/gi,
      replacement: 'female-superior position (reverse)', severity: 4, tags: ['position'] },

    // ——— NON-PENETRATIVE / INTIMATE ACTS ———
    { pattern: /\b(foreplay|petting|making\s*out)\b/gi,
      replacement: 'intimate foreplay', severity: 2, tags: ['romance'] },
    { pattern: /\b(cuddle|spoon(?:ing)?)\b/gi,
      replacement: 'cuddling', severity: 1, tags: ['romance'] }
  ]
});
// >>> END OF BLOCK 3 <<<

/* ================================================================
 * BLOCK 3 — ACTS & POSITIONS (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 3a — ACTS & POSITIONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 3a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate clinical terms into explicit/colloquial act language.
 *   - Used by PF_CORE.applyDirectional() when direction="explicit".
 * INTERNAL NOTES:
 *   - Severity values here run hotter (4–5) to signal full NSFW.
 *   - Keep consensual framing; do not include non-consent or illegal content.
 * ================================================================ */
// >>> START OF BLOCK 3a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 3a',
  language: 'en',
  category: 'acts_positions_explicit',
  gated: true,
  emoji: ['🔥','🛏️'],
  notes: [
    'Reverse mapping of BLOCK 3, clinical → slang.',
    'Applied only when allowExplicit=true.'
  ],
  entries: [
    // ——— ORAL ———
    { pattern: /\boral sex \(performing\)\b/gi, replacement: 'blowjob', severity: 5, tags: ['oral','explicit'] },
    { pattern: /\bdeep oral penetration\b/gi,  replacement: 'deepthroat', severity: 5, tags: ['oral','explicit'] },
    { pattern: /\boral stimulation of the vulva\b/gi, replacement: 'cunnilingus', severity: 5, tags: ['oral','explicit'] },

    // ——— MANUAL ———
    { pattern: /\bmanual stimulation \(penis\)\b/gi, replacement: 'handjob', severity: 4, tags: ['manual','explicit'] },
    { pattern: /\bmanual penetration \(vagina\)\b/gi, replacement: 'fingering', severity: 4, tags: ['manual','explicit'] },

    // ——— PENETRATION / POSITIONS ———
    { pattern: /\bvaginal intercourse \(consensual\)\b/gi, replacement: 'fucking', severity: 5, tags: ['penetration','explicit'] },
    { pattern: /\brear-entry position\b/gi, replacement: 'doggystyle', severity: 5, tags: ['position','explicit'] },
    { pattern: /\bmissionary position\b/gi, replacement: 'missionary sex', severity: 4, tags: ['position','explicit'] },
    { pattern: /\bfemale-superior position\b/gi, replacement: 'cowgirl position', severity: 4, tags: ['position','explicit'] },
    { pattern: /\bfemale-superior position \(reverse\)\b/gi, replacement: 'reverse cowgirl', severity: 4, tags: ['position','explicit'] },

    // ——— NON-PENETRATIVE / INTIMATE ACTS ———
    { pattern: /\bintimate foreplay\b/gi, replacement: 'heavy petting', severity: 3, tags: ['romance','explicit'] },
    { pattern: /\bcuddling\b/gi, replacement: 'post-sex cuddling', severity: 2, tags: ['romance','explicit'] }
  ]
});
// >>> END OF BLOCK 3a <<<

/* ================================================================
 * BLOCK 3a — ACTS & POSITIONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 4a — PROFANITY EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 4a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Reverse of BLOCK 4: neutral/toned phrases → raw swears/explicit tone.
 *   - Only applied when allowExplicit:true (NSFW slider raised).
 * INTERNAL NOTES:
 *   - Keep mapping purposeful; avoid gratuitous graphic prose.
 *   - Designed to help models that score better with edgy tokens.
 * ================================================================ */
// >>> START OF BLOCK 4a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 4a',
  language: 'en',
  category: 'profanity_explicit',
  gated: true,
  emoji: ['🔥','🗯️'],
  notes: [
    'Escalates toned phrases into swear words when user explicitly opts in.',
    'Pairs with BLOCK 4; only directional, not general sanitization.'
  ],
  entries: [
    // ——— INTENSITY ———
    { pattern: /\bvery\b/gi,                    replacement: 'fucking', severity: 4, tags: ['intensity','explicit'] },
    { pattern: /\bextremely\b/gi,               replacement: 'fucking', severity: 4, tags: ['intensity','explicit'] },
    { pattern: /\bintense\b/gi,                 replacement: 'fucking', severity: 4, tags: ['intensity','explicit'] },
    { pattern: /\bextremely intense\b/gi,       replacement: 'motherfucking', severity: 5, tags: ['intensity','explicit'] },

    // ——— DISMISSIVE ———
    { pattern: /\bplease be quiet\b/gi,         replacement: 'shut the fuck up', severity: 4, tags: ['aggressive','explicit'] },
    { pattern: /\bleave me alone\b/gi,          replacement: 'go fuck yourself', severity: 5, tags: ['aggressive','explicit'] },

    // ——— EXCLAIMS ———
    { pattern: /\bwow\b/gi,                     replacement: 'damn', severity: 2, tags: ['exclaim','explicit'] },
    { pattern: /\bunbelievable\b/gi,            replacement: 'holy shit', severity: 3, tags: ['exclaim','explicit'] },
    { pattern: /\bincredible\b/gi,              replacement: 'holy fuck', severity: 3, tags: ['exclaim','explicit'] },

    // ——— NOUN PHRASES ———
    { pattern: /\bchaotic situation\b/gi,       replacement: 'shit show', severity: 3, tags: ['profanity','explicit'] },
    { pattern: /\bmess\b/gi,                    replacement: 'shit', severity: 2, tags: ['profanity','explicit'] },
    { pattern: /\bnonsense\b/gi,                replacement: 'bullshit', severity: 2, tags: ['profanity','explicit'] },
    { pattern: /\bseverely broken\b/gi,         replacement: 'fucked up', severity: 4, tags: ['profanity','explicit'] },

    // ——— INSULTS ———
    { pattern: /\brude person\b/gi,             replacement: 'asshole', severity: 4, tags: ['insult','explicit'] },
    { pattern: /\bfoolish person\b/gi,          replacement: 'jackass', severity: 3, tags: ['insult','explicit'] },
    { pattern: /\bunkind person\b/gi,           replacement: 'jerk', severity: 2, tags: ['insult','explicit'] },
    { pattern: /\bunwise person\b/gi,           replacement: 'idiot', severity: 2, tags: ['insult','explicit'] },

    // ——— SEXUAL SLUR NEUTRALS ———
    { pattern: /\bsexually active person\b/gi,  replacement: 'slut', severity: 4, tags: ['sex_slur','explicit'] },
    { pattern: /\bsex worker \(neutral\)\b/gi,  replacement: 'whore', severity: 4, tags: ['sex_slur','explicit'] },
    { pattern: /\bsexually active man\b/gi,     replacement: 'manwhore', severity: 4, tags: ['sex_slur','explicit'] },

    // ——— INTERNET ———
    { pattern: /\bwhat is happening\b/gi,       replacement: 'wtf', severity: 3, tags: ['internet','explicit'] },
    { pattern: /\boh my goodness\b/gi,          replacement: 'omfg', severity: 3, tags: ['internet','explicit'] },
    { pattern: /\bthat is very funny\b/gi,      replacement: 'lmao', severity: 2, tags: ['internet','explicit'] },
    { pattern: /\bthat is extremely funny\b/gi, replacement: 'lmfao', severity: 2, tags: ['internet','explicit'] }
  ]
});
// >>> END OF BLOCK 4a <<<
/* ================================================================
 * BLOCK 4a — PROFANITY EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 5 — POP-STYLE BUNDLES (BRAND-FREE)  (START)
 * ID: BLOCK 5
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual style shorthands into brand-free descriptive features.
 *   - Covers cartoons/toons, gamey looks, aesthetics (noir, vaporwave), materials/mediums.
 *   - Helps users say “make it look like X” without trademark tokens.
 * INTERNAL NOTES:
 *   - These are descriptive expansions, not name-drops. Safe & generalizable.
 *   - Severity = 0/1 (style only). Pairs later with BLOCK 10+ multilingual mirrors.
 *   - If a term is borderline brandy, keep it generic: “yellow toon look” instead of names.
 * ----------------------------------------------------------------
 * APPEND THIS WHOLE BLOCK AT THE BOTTOM. DO NOT EDIT OLD BLOCKS.
 * ================================================================ */
// >>> START OF BLOCK 5 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 5',
  language: 'en',
  category: 'style_bundles',
  emoji: ['🎨','🖌️','🧱','🖼️'],
  notes: [
    'All expansions are brand-free descriptive bundles.',
    'Use with PF_CORE.expandStyleKey() if you want programmatic lists; here we direct-replace shorthand text.'
  ],
  entries: [
    // ——— CARTOON / TOON LOOKS ———
    { pattern: /\bsimple toon\b/gi, replacement: 'bold black outlines, flat 2D shading, saturated palette, simplified shapes', severity: 0, tags: ['toon','flat'] },
    { pattern: /\byellow toon\b/gi, replacement: 'saturated yellow skin tones, bold black outlines, simplified facial geometry, 2D flat shading, overbite mouth hint', severity: 0, tags: ['toon','flat'] },
    { pattern: /\banime\s*look\b/gi, replacement: 'cel-shaded rendering, large expressive eyes, clean linework, limited gradient, vivid color accents', severity: 0, tags: ['anime','cel'] },
    { pattern: /\bmanga\s*ink\b/gi, replacement: 'monochrome line art, screentone textures, speed lines, high-contrast inking', severity: 0, tags: ['manga','ink'] },
    { pattern: /\bwestern comic\b/gi, replacement: 'inked line art, halftone dots, primary-color blocks, dynamic panel-style composition', severity: 0, tags: ['comic'] },
    { pattern: /\bnewspaper comic\b/gi, replacement: 'minimal line art, limited color, simple caricature proportions, punchy expressions', severity: 0, tags: ['comic','minimal'] },

    // ——— GAME / CG LOOKS ———
    { pattern: /\blow[-\s]*poly\b/gi, replacement: 'low polygon count geometry, flat shading, visible facets, simple textures', severity: 0, tags: ['3d','lowpoly'] },
    { pattern: /\bisometric\b/gi, replacement: 'isometric projection, 30-30 axonometric angle, no perspective foreshortening, grid-aligned layout', severity: 0, tags: ['isometric'] },
    { pattern: /\bvoxel\b/gi, replacement: 'voxelized cubes, chunky pixel geometry, orthographic feeling, simplified shading', severity: 0, tags: ['voxel'] },
    { pattern: /\bclaymation\b/gi, replacement: 'clay material, thumbprint imperfections, soft diffuse lighting, stop-motion vibe', severity: 0, tags: ['stopmotion','material'] },
    { pattern: /\bpixel art\b/gi, replacement: 'low-resolution sprites, limited color palette, crisp nearest-neighbor edges, dithering patterns', severity: 0, tags: ['pixel'] },

    // ——— AESTHETICS ———
    { pattern: /\bnoir\b/gi, replacement: 'high-contrast black and white, hard shadows, dramatic backlighting, cigarette smoke atmosphere, trenchcoat era vibe', severity: 0, tags: ['noir','bw'] },
    { pattern: /\bneo[-\s]*noir\b/gi, replacement: 'moody low key lighting, neon accents, reflective wet streets, deep shadows, urban night ambience', severity: 0, tags: ['noir','neon'] },
    { pattern: /\bcyberpunk\b/gi, replacement: 'neon signage, holographic UI, rainy night city, chromatic aberration, techwear, cables and vents', severity: 0, tags: ['sci-fi','neon'] },
    { pattern: /\bsteampunk\b/gi, replacement: 'brass and copper, rivets, gears and cogs, leather straps, Victorian silhouettes, steam vents', severity: 0, tags: ['retro','mechanical'] },
    { pattern: /\bvaporwave\b/gi, replacement: 'retro 80s grids, pastel pink-teal gradient, Greek busts, VHS scanlines, Japanese type accents', severity: 0, tags: ['retro','aesthetic'] },
    { pattern: /\bsolar punk\b/gi, replacement: 'lush greenery integrated with tech, solar panels, bright optimistic palette, eco-modern architecture', severity: 0, tags: ['eco','future'] },
    { pattern: /\bbiopunk\b/gi, replacement: 'organic biotech textures, wet lab vibes, translucent membranes, DNA helixes, green-blue lab lighting', severity: 0, tags: ['bio','sci-fi'] },

    // ——— ART MEDIUMS ———
    { pattern: /\boil painting\b/gi, replacement: 'oil paint texture, visible brush strokes, rich impasto, layered glazing, warm varnish', severity: 0, tags: ['paint'] },
    { pattern: /\bwatercolor\b/gi, replacement: 'paper grain, soft bleeds, translucent washes, granulation, light backruns', severity: 0, tags: ['paint','water'] },
    { pattern: /\bgouache\b/gi, replacement: 'matte opaque paint, flat color blocks, minimal texture, poster-like finish', severity: 0, tags: ['paint'] },
    { pattern: /\bpastel\b/gi, replacement: 'chalky strokes, soft blending, paper tooth texture, dusty edges', severity: 0, tags: ['dry','pastel'] },
    { pattern: /\bcharcoal\b/gi, replacement: 'soft charcoal shading, smudged gradients, paper tooth, deep blacks, expressive sketch lines', severity: 0, tags: ['dry','charcoal'] },
    { pattern: /\bink wash\b/gi, replacement: 'diluted ink gradations, calligraphic strokes, bleeding edges, sumi-e feel', severity: 0, tags: ['ink'] },

    // ——— MATERIAL / RENDER MODES ———
    { pattern: /\bpbr\b/gi, replacement: 'physically based rendering, albedo/roughness/metallic maps, accurate microfacet reflections', severity: 0, tags: ['pbr','3d'] },
    { pattern: /\bsubsurface\s*scattering\b/gi, replacement: 'translucent skin effect, light passing through thin areas, soft redness on ears/nose', severity: 0, tags: ['render','skin'] },
    { pattern: /\btoon\s*shader\b/gi, replacement: 'cel quantized shading, sharp shadow bands, outline pass, saturated colors', severity: 0, tags: ['shader'] },
    { pattern: /\bvolumetric\s*godrays?\b/gi, replacement: 'volumetric lighting beams, particulate haze, crepuscular rays', severity: 0, tags: ['lighting'] },

    // ——— ERA / VIBE ———
    { pattern: /\bretro 80s\b/gi, replacement: 'neon highlights, chrome gradients, grid floors, synthwave palette, glossy reflections', severity: 0, tags: ['retro','80s'] },
    { pattern: /\bretro 90s\b/gi, replacement: 'bold primary colors, Memphis patterns, CRT scanlines, early web aesthetics', severity: 0, tags: ['retro','90s'] },
    { pattern: /\bbaroque\b/gi, replacement: 'ornate gilded decoration, dramatic chiaroscuro, dynamic drapery, cathedral ambiance', severity: 0, tags: ['historic','baroque'] },
    { pattern: /\bbrutalism\b/gi, replacement: 'raw concrete textures, monolithic blocks, minimal ornament, heavy massing', severity: 0, tags: ['architecture'] }
  ]
});
// >>> END OF BLOCK 5 <<<
/* ================================================================
 * BLOCK 5 — POP-STYLE BUNDLES (BRAND-FREE)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 6 — PHOTOGRAPHY & CAMERA/ LIGHTING (EN)  (START)
 * ID: BLOCK 6
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Translate casual photo talk into precise camera/lighting/composition descriptors.
 *   - Improves realism and control for product shots, portraits, landscapes, etc.
 * INTERNAL NOTES:
 *   - No brand names; pure technical language (focal length, aperture, modifiers, angles).
 *   - Severity 0 (non-NSFW domain). Works across SFW/NSFW equally.
 * ----------------------------------------------------------------
 * APPEND THIS WHOLE BLOCK AT THE BOTTOM. DO NOT EDIT OLD BLOCKS.
 * ================================================================ */
// >>> START OF BLOCK 6 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 6',
  language: 'en',
  category: 'photo_camera_lighting',
  emoji: ['📷','🎞️','💡','🖼️'],
  notes: [
    'Covers focal lengths, apertures, exposure, DOF, lens types, angles, composition rules, lighting setups.',
    'Maps vague phrases (e.g., “cinematic photo”) to more concrete, model-usable terms.'
  ],
  entries: [
    // ——— GENERAL PHOTO LOOKS ———
    { pattern: /\bcinematic photo\b/gi, replacement: 'wide dynamic range, shallow depth of field, soft film grain, subtle teal-orange color grade', severity: 0, tags: ['cinematic'] },
    { pattern: /\bpolaroid\b/gi, replacement: 'instant film look, soft contrast, mild color shift, white border frame', severity: 0, tags: ['film'] },
    { pattern: /\b35mm\s*film\b/gi, replacement: '35mm film aesthetic, fine grain, halation around highlights, mild color cast', severity: 0, tags: ['film'] },
    { pattern: /\bhigh key\b/gi, replacement: 'bright high-key lighting, minimal shadows, soft diffusion, pale background', severity: 0, tags: ['lighting'] },
    { pattern: /\blow key\b/gi, replacement: 'dark low-key lighting, deep shadows, controlled highlights, dramatic mood', severity: 0, tags: ['lighting'] },

    // ——— FOCAL LENGTH FEELS ———
    { pattern: /\bultra[-\s]*wide\b/gi, replacement: '14–20mm field of view, strong perspective exaggeration, expansive background', severity: 0, tags: ['focal'] },
    { pattern: /\bwide\s*angle\b/gi, replacement: '24–35mm field of view, noticeable perspective, environment-inclusive framing', severity: 0, tags: ['focal'] },
    { pattern: /\bstandard\s*lens\b/gi, replacement: '45–55mm field of view, natural perspective, minimal distortion', severity: 0, tags: ['focal'] },
    { pattern: /\bportrait\s*lens\b/gi, replacement: '75–105mm field of view, compressed background, flattering facial proportions', severity: 0, tags: ['focal'] },
    { pattern: /\btelephoto\b/gi, replacement: '135–300mm field of view, strong compression, distant subject isolation', severity: 0, tags: ['focal'] },

    // ——— APERTURE / DOF ———
    { pattern: /\bwide\s*aperture\b/gi, replacement: 'shallow depth of field, aperture about f/1.2–f/2.0, creamy background bokeh', severity: 0, tags: ['aperture','dof'] },
    { pattern: /\bnarrow\s*aperture\b/gi, replacement: 'deep depth of field, aperture about f/8–f/16, everything in focus', severity: 0, tags: ['aperture','dof'] },
    { pattern: /\bsoft\s*bokeh\b/gi, replacement: 'large blur discs, smooth out-of-focus highlights, gentle background separation', severity: 0, tags: ['bokeh'] },

    // ——— SHUTTER / ISO ———
    { pattern: /\blong\s*exposure\b/gi, replacement: 'slow shutter speed, motion blur trails, stabilized camera, light streaks', severity: 0, tags: ['shutter'] },
    { pattern: /\bfast\s*shutter\b/gi, replacement: 'high shutter speed, motion freeze, crisp action detail', severity: 0, tags: ['shutter'] },
    { pattern: /\bhigh\s*iso\b/gi, replacement: 'elevated sensor gain, visible digital noise, preserved exposure in low light', severity: 0, tags: ['iso'] },
    { pattern: /\blow\s*iso\b/gi, replacement: 'low sensor gain, clean image, rich color depth', severity: 0, tags: ['iso'] },

    // ——— LENS TYPES ———
    { pattern: /\bmacro\b/gi, replacement: 'macro close-up, 1:1 magnification, extreme detail, shallow depth of field', severity: 0, tags: ['lens'] },
    { pattern: /\btilt[-\s]*shift\b/gi, replacement: 'tilt-shift miniature effect, selective focus plane, architectural keystone correction', severity: 0, tags: ['lens'] },
    { pattern: /\bfisheye\b/gi, replacement: 'ultra-wide fisheye curvature, spherical distortion, 180-degree view', severity: 0, tags: ['lens'] },
    { pattern: /\bsoft\s*focus\b/gi, replacement: 'diffusion filter glow, lowered micro-contrast, dreamy highlights', severity: 0, tags: ['filter'] },

    // ——— ANGLES & FRAMING ———
    { pattern: /\bworm'?s\s*eye\b/gi, replacement: 'extreme low angle upward, subject towering, dramatic perspective', severity: 0, tags: ['angle'] },
    { pattern: /\bbird'?s\s*eye\b/gi, replacement: 'high overhead angle, plan view, graphic composition', severity: 0, tags: ['angle'] },
    { pattern: /\bdutch\s*angle\b/gi, replacement: 'tilted horizon, dynamic tension, skewed frame', severity: 0, tags: ['angle'] },
    { pattern: /\bclose[-\s]*up\b/gi, replacement: 'tight framing on subject, minimal background, intimacy emphasis', severity: 0, tags: ['framing'] },
    { pattern: /\bmedium\s*shot\b/gi, replacement: 'waist-up framing, balanced subject and environment', severity: 0, tags: ['framing'] },
    { pattern: /\bwide\s*shot\b/gi, replacement: 'full-body or expansive scene framing, environment context', severity: 0, tags: ['framing'] },

    // ——— COMPOSITION RULES ———
    { pattern: /\brule\s*of\s*thirds\b/gi, replacement: 'subject placed on intersection lines, balanced negative space', severity: 0, tags: ['composition'] },
    { pattern: /\bleading\s*lines\b/gi, replacement: 'strong converging lines guiding the eye to subject', severity: 0, tags: ['composition'] },
    { pattern: /\bcentral\s*composition\b/gi, replacement: 'subject centered, symmetrical balance, formal portrait feel', severity: 0, tags: ['composition'] },
    { pattern: /\bgolden\s*hour\b/gi, replacement: 'warm low-angle sunlight, long soft shadows, glowing rim light', severity: 0, tags: ['time'] },
    { pattern: /\bblue\s*hour\b/gi, replacement: 'cool twilight skylight, gentle contrast, city lights starting to glow', severity: 0, tags: ['time'] },

    // ——— LIGHTING SETUPS ———
    { pattern: /\brembrandt\s*lighting\b/gi, replacement: 'key light 45° to subject with triangle of light on cheek, moderate contrast', severity: 0, tags: ['portrait','lighting'] },
    { pattern: /\bsplit\s*lighting\b/gi, replacement: 'key light 90° to subject, face split half light half shadow, dramatic contrast', severity: 0, tags: ['portrait','lighting'] },
    { pattern: /\bbutterfly\s*lighting\b/gi, replacement: 'frontal high key light, small butterfly shadow under nose, beauty portrait look', severity: 0, tags: ['portrait','lighting'] },
    { pattern: /\bloop\s*lighting\b/gi, replacement: 'key light slightly above and to side, small loop shadow from nose, flattering general portrait', severity: 0, tags: ['portrait','lighting'] },
    { pattern: /\brim\s*light\b/gi, replacement: 'backlight outlining subject edges, separation from background, halo highlight', severity: 0, tags: ['lighting'] },

    // ——— MODIFIERS & ENVIRONMENT ———
    { pattern: /\bsoftbox\b/gi, replacement: 'diffused key light via softbox, broad soft shadows, low specular highlights', severity: 0, tags: ['modifier'] },
    { pattern: /\bbeauty\s*dish\b/gi, replacement: 'focused soft light with crisp specular highlights, glamour portrait look', severity: 0, tags: ['modifier'] },
    { pattern: /\bgrid\b/gi, replacement: 'controlled spill with grid, directional beam, contrasty portrait key', severity: 0, tags: ['modifier'] },
    { pattern: /\bcolor\s*gels?\b/gi, replacement: 'colored lighting gel, split-tone illumination, stylized hues on subject/background', severity: 0, tags: ['lighting'] },
    { pattern: /\bhdr\b/gi, replacement: 'high dynamic range merge, preserved shadow detail, controlled highlight recovery', severity: 0, tags: ['post'] },

    // ——— WEATHER / ATMOS ———
    { pattern: /\bbacklit fog\b/gi, replacement: 'fog or haze with backlight, volumetric glow, softened silhouettes', severity: 0, tags: ['atmosphere'] },
    { pattern: /\brainy night\b/gi, replacement: 'wet reflective streets, neon reflections, raindrops, moody low light', severity: 0, tags: ['weather'] },
    { pattern: /\bsnowfall\b/gi, replacement: 'falling snow flakes, cool white balance, muffled contrast, winter ambience', severity: 0, tags: ['weather'] }
  ]
});
// >>> END OF BLOCK 6 <<<
/* ================================================================
 * BLOCK 6 — PHOTOGRAPHY & CAMERA/ LIGHTING (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 7 — ART STYLES, MOVEMENTS & MEDIA (EN)  (START)
 * ID: BLOCK 7
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Translate casual art-style requests into concrete, brand-free descriptors.
 *   - Covers historical movements, materials/mediums, technique verbs, surface finishes.
 * INTERNAL NOTES:
 *   - Severity 0 (style only). Works for SFW/NSFW equally.
 *   - Keep language visual + actionable (textures, strokes, palettes, composition).
 * ================================================================ */
// >>> START OF BLOCK 7 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 7',
  language: 'en',
  category: 'art_styles_movements',
  emoji: ['🖼️','🎨','🧑‍🎨','🧩'],
  notes: [
    'Maps style words to descriptive stacks (brushwork, palette, composition, surface).',
    'Avoids artist names; uses movement/technique language instead.'
  ],
  entries: [
    // ——— HISTORICAL MOVEMENTS ———
    { pattern: /\brenaissance\b/gi, replacement: 'balanced classical composition, realistic anatomy, sfumato soft transitions, warm earth pigments, chiaroscuro depth', severity: 0, tags: ['historic','painting'] },
    { pattern: /\bbaroque\b/gi, replacement: 'dramatic lighting, intense chiaroscuro, dynamic drapery, ornate details, theatrical poses', severity: 0, tags: ['historic'] },
    { pattern: /\brococo\b/gi, replacement: 'pastel palette, ornate gilding, playful asymmetry, delicate brushwork, romantic scenes', severity: 0, tags: ['historic'] },
    { pattern: /\bneoclassical\b/gi, replacement: 'clean contours, idealized figures, calm light, balanced geometry, restrained palette', severity: 0, tags: ['historic'] },
    { pattern: /\bromanticism\b/gi, replacement: 'expressive drama, sublime nature, stormy skies, energetic brushwork, high emotion', severity: 0, tags: ['historic'] },
    { pattern: /\bimpressionism\b/gi, replacement: 'broken color, visible brush strokes, outdoor light studies, fleeting atmosphere, soft edges', severity: 0, tags: ['painting'] },
    { pattern: /\bpost[-\s]*impressionism\b/gi, replacement: 'bold outlines, structured brushwork, saturated color planes, symbolic simplification', severity: 0, tags: ['painting'] },
    { pattern: /\bexpressionism\b/gi, replacement: 'distorted forms, intense color, emotional exaggeration, heavy impasto', severity: 0, tags: ['painting'] },
    { pattern: /\bfauvism\b/gi, replacement: 'wild saturated colors, simplified shapes, strong outlines, spontaneous handling', severity: 0, tags: ['painting'] },
    { pattern: /\bcubism\b/gi, replacement: 'geometric fragmentation, multiple viewpoints, faceted planes, muted earthy palette', severity: 0, tags: ['avantgarde'] },
    { pattern: /\bfuturism\b/gi, replacement: 'motion lines, energetic diagonals, industrial motifs, speed abstraction', severity: 0, tags: ['avantgarde'] },
    { pattern: /\bsurrealism\b/gi, replacement: 'dreamlike juxtaposition, impossible scales, hyper-real textures, symbolic objects', severity: 0, tags: ['avantgarde'] },
    { pattern: /\bconstructivism\b/gi, replacement: 'bold geometry, industrial textures, red/black/white palette, propaganda layout feel', severity: 0, tags: ['graphic'] },
    { pattern: /\bminimalism\b/gi, replacement: 'reduction to essentials, clean geometry, limited palette, large negative space', severity: 0, tags: ['modern'] },
    { pattern: /\bbrutalism\b/gi, replacement: 'monolithic forms, raw concrete texture, heavy massing, austere composition', severity: 0, tags: ['modern','architecture'] },
    { pattern: /\bpop\s*art\b/gi, replacement: 'flat bright colors, halftone dots, consumer icon motifs, graphic boldness', severity: 0, tags: ['graphic'] },
    { pattern: /\bop\s*art\b/gi, replacement: 'optical illusions, moiré patterns, high-contrast geometry, vibrating lines', severity: 0, tags: ['graphic'] },
    { pattern: /\bpostmodern\b/gi, replacement: 'eclectic references, irony, mixed materials, bold pattern clashes', severity: 0, tags: ['modern'] },

    // ——— MEDIUMS & SURFACES ———
    { pattern: /\bacrylic\b/gi, replacement: 'acrylic paint, fast-drying, vivid flat colors, minimal texture unless layered', severity: 0, tags: ['paint'] },
    { pattern: /\boil paint(?:ing)?\b/gi, replacement: 'oil paint texture, visible brush strokes, rich impasto, subtle glazing, warm varnish sheen', severity: 0, tags: ['paint'] },
    { pattern: /\btempera\b/gi, replacement: 'egg tempera fine strokes, matte finish, delicate layering, panel surface', severity: 0, tags: ['paint'] },
    { pattern: /\bencaustic\b/gi, replacement: 'molten wax medium, layered translucent surfaces, soft bloom sheen, embedded texture', severity: 0, tags: ['paint'] },
    { pattern: /\bink\b/gi, replacement: 'dark linework, crisp edges, calligraphic strokes, high-contrast washes', severity: 0, tags: ['ink'] },
    { pattern: /\bprintmaking\b/gi, replacement: 'plate impression texture, inked edges, registration marks, limited palette', severity: 0, tags: ['print'] },
    { pattern: /\bwoodcut\b/gi, replacement: 'bold carved lines, grain texture, stark black-and-white blocks', severity: 0, tags: ['print'] },
    { pattern: /\blinocut\b/gi, replacement: 'clean cut lines, flat color areas, slight emboss impression', severity: 0, tags: ['print'] },
    { pattern: /\betching\b/gi, replacement: 'fine acid-bitten lines, cross-hatching, plate tone, subtle shading', severity: 0, tags: ['print'] },
    { pattern: /\bcollage\b/gi, replacement: 'cut paper layers, torn edges, mixed materials, overlapping textures', severity: 0, tags: ['mixed'] },
    { pattern: /\bmixed media\b/gi, replacement: 'combined materials, layered textures, varied surface treatments', severity: 0, tags: ['mixed'] },

    // ——— TECHNIQUE VERBS ———
    { pattern: /\bimpasto\b/gi, replacement: 'thick paint application, raised brush ridges, tactile texture, raking light highlights', severity: 0, tags: ['technique'] },
    { pattern: /\bglazing\b/gi, replacement: 'thin translucent paint layers, luminous depth, color stacking', severity: 0, tags: ['technique'] },
    { pattern: /\bscumbling\b/gi, replacement: 'dry-brush veil, broken light layer, soft atmospheric texture', severity: 0, tags: ['technique'] },
    { pattern: /\bsfumato\b/gi, replacement: 'smoky transitions, invisible edges, subtle tonal gradients', severity: 0, tags: ['technique'] },
    { pattern: /\bchiaroscuro\b/gi, replacement: 'strong light-dark contrast, modeled volumes, dramatic shadows', severity: 0, tags: ['technique'] },
    { pattern: /\bpointillism\b/gi, replacement: 'dot-based color mixing, optical blending, shimmering edges', severity: 0, tags: ['technique'] },
    { pattern: /\bstippling\b/gi, replacement: 'dense dot shading, gradual tonal build-up, pen-and-ink texture', severity: 0, tags: ['technique'] },

    // ——— FINISHES / LOOKS ———
    { pattern: /\bmatte\s*finish\b/gi, replacement: 'non-reflective matte surface, muted highlights, soft texture', severity: 0, tags: ['finish'] },
    { pattern: /\bgloss\s*finish\b/gi, replacement: 'high gloss surface, specular highlights, reflective sheen', severity: 0, tags: ['finish'] },
    { pattern: /\bsatin\s*finish\b/gi, replacement: 'soft semi-gloss sheen, gentle highlights, smooth surface', severity: 0, tags: ['finish'] },
    { pattern: /\bpatina\b/gi, replacement: 'aged surface oxidation, green-blue copper tones, weathered wear', severity: 0, tags: ['finish'] },
    { pattern: /\bdistressed\b/gi, replacement: 'edge wear, scratches, faded pigment, scuffed surfaces, vintage vibe', severity: 0, tags: ['finish'] }
  ]
});
// >>> END OF BLOCK 7 <<<
/* ================================================================
 * BLOCK 7 — ART STYLES, MOVEMENTS & MEDIA (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 8 — ENVIRONMENTS, BIOMES & SCENERY (EN)  (START)
 * ID: BLOCK 8
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual place/scene words into detailed environmental descriptors.
 *   - Useful for landscapes, cityscapes, interiors, weather, time-of-day.
 * INTERNAL NOTES:
 *   - Severity 0 (environment only). Mix with BLOCK 6 lighting for realism.
 *   - Keep tokens generic and stackable (materials, scale cues, mood words).
 * ================================================================ */
// >>> START OF BLOCK 8 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 8',
  language: 'en',
  category: 'environments_biomes',
  emoji: ['🏞️','🌆','🏙️','🏜️'],
  notes: [
    'Biomes + architecture + interiors with stackable details (materials, scale, atmosphere).',
    'Avoid real-world brand/landmark names; focus on type descriptors.'
  ],
  entries: [
    // ——— NATURAL BIOMES ———
    { pattern: /\btemperate\s*forest\b/gi, replacement: 'mixed deciduous trees, mossy undergrowth, dappled light, damp soil, scattered ferns', severity: 0, tags: ['biome','forest'] },
    { pattern: /\bconifer\s*forest\b/gi, replacement: 'tall pines and firs, needle carpet, cool blue-green palette, shafts of light', severity: 0, tags: ['biome','forest'] },
    { pattern: /\btropical\s*rainforest\b/gi, replacement: 'dense canopy layers, broadleaf plants, humid mist, lianas and epiphytes, rich biodiversity', severity: 0, tags: ['biome','jungle'] },
    { pattern: /\bsavanna\b/gi, replacement: 'golden grasses, scattered acacia trees, heat shimmer, distant wildlife silhouettes', severity: 0, tags: ['biome','grassland'] },
    { pattern: /\bdesert\b/gi, replacement: 'rolling dunes, rippled sand texture, mirage haze, harsh sunlight, sparse shrubs', severity: 0, tags: ['biome','arid'] },
    { pattern: /\btundra\b/gi, replacement: 'low shrubs and lichens, permafrost ground, cold wind, overcast skies, muted palette', severity: 0, tags: ['biome','cold'] },
    { pattern: /\bmountain\s*range\b/gi, replacement: 'jagged peaks, alpine meadows, snow caps, thin air haze, dramatic vistas', severity: 0, tags: ['biome','alpine'] },
    { pattern: /\bwetlands?\b/gi, replacement: 'reeds and cattails, shallow pools, reflective water, foggy morning atmosphere', severity: 0, tags: ['biome','water'] },
    { pattern: /\bcoast(line)?\b/gi, replacement: 'rocky shoreline, foamy surf, tidal pools, seabirds, salt spray in the air', severity: 0, tags: ['biome','coastal'] },
    { pattern: /\bcoral\s*reef\b/gi, replacement: 'underwater corals, colorful fish, caustic light patterns, clear tropical water', severity: 0, tags: ['biome','underwater'] },

    // ——— WEATHER / TIME ———
    { pattern: /\bgolden\s*hour\b/gi, replacement: 'warm low-angle sunlight, long shadows, glowing rim light, calm mood', severity: 0, tags: ['time','light'] },
    { pattern: /\bblue\s*hour\b/gi, replacement: 'cool twilight skylight, gentle contrast, city lights starting to glow', severity: 0, tags: ['time','light'] },
    { pattern: /\bstormy\s*sky\b/gi, replacement: 'towering cumulonimbus clouds, dramatic contrast, wind-blown rain curtains', severity: 0, tags: ['weather'] },
    { pattern: /\bclear\s*night\b/gi, replacement: 'star-filled sky, crisp air, faint milky way band, cool color cast', severity: 0, tags: ['time','night'] },
    { pattern: /\bfoggy\s*morning\b/gi, replacement: 'low rolling fog, softened silhouettes, diffused light, damp atmosphere', severity: 0, tags: ['weather','morning'] },

    // ——— CITY / EXTERIORS ———
    { pattern: /\bdowntown\b/gi, replacement: 'dense urban core, high-rise glass facades, traffic light reflections, busy crosswalks', severity: 0, tags: ['city'] },
    { pattern: /\bold\s*town\b/gi, replacement: 'cobblestone streets, masonry facades, narrow alleys, wrought iron balconies, warm lamplight', severity: 0, tags: ['city','historic'] },
    { pattern: /\bsuburbs?\b/gi, replacement: 'tree-lined streets, detached houses, trimmed lawns, parked cars, mailboxes', severity: 0, tags: ['city','residential'] },
    { pattern: /\bindustrial\s*zone\b/gi, replacement: 'steel frameworks, smokestacks, shipping containers, gritty textures, sodium lights', severity: 0, tags: ['city','industrial'] },
    { pattern: /\bharbor\b/gi, replacement: 'piers and docks, moored boats, rope and bollards, gulls, shimmering water', severity: 0, tags: ['city','maritime'] },
    { pattern: /\bmarket\s*street\b/gi, replacement: 'open stalls, awnings, hanging lights, colorful produce crates, bustling crowd', severity: 0, tags: ['city','commerce'] },

    // ——— INTERIORS ———
    { pattern: /\bmodern\s*loft\b/gi, replacement: 'open-plan interior, exposed brick and beams, large windows, polished concrete floor', severity: 0, tags: ['interior','modern'] },
    { pattern: /\bminimal\s*apartment\b/gi, replacement: 'white walls, clean lines, light wood furniture, airy layout, soft natural light', severity: 0, tags: ['interior','minimal'] },
    { pattern: /\bboho\s*living\s*room\b/gi, replacement: 'layered textiles, rattan furniture, plants, patterned rugs, warm ambient light', severity: 0, tags: ['interior','boho'] },
    { pattern: /\bfuturistic\s*corridor\b/gi, replacement: 'sleek panels, LED strip lighting, reflective floors, subtle fog, vanishing-point perspective', severity: 0, tags: ['interior','sci-fi'] },
    { pattern: /\bbaroque\s*hall\b/gi, replacement: 'ornate gilded moldings, marble columns, crystal chandeliers, frescoed ceilings', severity: 0, tags: ['interior','historic'] },
    { pattern: /\bcozy\s*cabin\b/gi, replacement: 'timber walls, stone fireplace, warm lamplight, wool blankets, snowy window view', severity: 0, tags: ['interior','rustic'] },

    // ——— TRANSPORT / INFRASTRUCTURE ———
    { pattern: /\brail\s*station\b/gi, replacement: 'arched platforms, metal trusses, schedule boards, crowds, motion blur trains', severity: 0, tags: ['transport'] },
    { pattern: /\bsubway\s*platform\b/gi, replacement: 'tiled walls, fluorescent lighting, arriving train wind, directional signage', severity: 0, tags: ['transport'] },
    { pattern: /\bhighway\s*overpass\b/gi, replacement: 'concrete pillars, layered road decks, traffic streaks at night, urban hum', severity: 0, tags: ['transport'] },
    { pattern: /\bairport\s*terminal\b/gi, replacement: 'glass curtain walls, rolling suitcases, departure boards, bright skylights', severity: 0, tags: ['transport'] },

    // ——— FANTASY / SCI-FI SETTINGS ———
    { pattern: /\bfantasy\s*forest\b/gi, replacement: 'oversized mushrooms, bioluminescent plants, misty glades, ancient runes, soft magical glow', severity: 0, tags: ['fantasy'] },
    { pattern: /\bcrystal\s*cavern\b/gi, replacement: 'prismatic crystal clusters, refracted light beams, glittering facets, subterranean echo', severity: 0, tags: ['fantasy','underground'] },
    { pattern: /\bsky\s*city\b/gi, replacement: 'floating platforms, suspension bridges in clouds, wind turbines, sunlit mist', severity: 0, tags: ['sci-fi'] },
    { pattern: /\bdesert\s*colony\b/gi, replacement: 'domed shelters, sand-blasted panels, wind-carved rocks, solar arrays, heat shimmer', severity: 0, tags: ['sci-fi','arid'] },
    { pattern: /\bunderwater\s*lab\b/gi, replacement: 'thick porthole windows, blue caustic light, drifting particles, steel corridors', severity: 0, tags: ['sci-fi','underwater'] }
  ]
});
// >>> END OF BLOCK 8 <<<
/* ================================================================
 * BLOCK 8 — ENVIRONMENTS, BIOMES & SCENERY (EN)  (END)
 * ================================================================ */
