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
