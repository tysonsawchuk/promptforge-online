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
/* ================================================================
 * BLOCK 9 — PRODUCTS, OBJECTS, MATERIALS & TEXTURES (EN)  (START)
 * ID: BLOCK 9
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual product/object words into rich, model-friendly descriptors.
 *   - Includes materials, surface finishes, wear/aging, packaging, and scale cues.
 * INTERNAL NOTES:
 *   - Severity 0 (non-NSFW). Stackable with BLOCK 6 (photo) + BLOCK 8 (environments).
 *   - Keep tokens brand-free; focus on physical attributes users expect in renders.
 * ================================================================ */
// >>> START OF BLOCK 9 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 9',
  language: 'en',
  category: 'products_objects_materials',
  emoji: ['📦','🧱','🧴','🔩'],
  notes: [
    'Object descriptors favor measurable traits: dimensions, materials, finish, wear, assembly.',
    'Packaging terms help for ecommerce/thumbnail prompts.'
  ],
  entries: [
    // ——— GENERIC OBJECT SCALES / DIMENSIONS ———
    { pattern: /\bpalm[-\s]*sized\b/gi, replacement: 'compact handheld scale, roughly 8–12 cm long', severity: 0, tags: ['scale'] },
    { pattern: /\bpocket[-\s]*sized\b/gi, replacement: 'very small portable scale, roughly 5–8 cm', severity: 0, tags: ['scale'] },
    { pattern: /\btabletop\b/gi, replacement: 'desktop scale, fits on a table surface, 30–60 cm wide', severity: 0, tags: ['scale'] },
    { pattern: /\bfull[-\s]*size\b/gi, replacement: 'full-scale object, life-size dimensions appropriate to category', severity: 0, tags: ['scale'] },

    // ——— MATERIALS (BASE) ———
    { pattern: /\bstainless\s*steel\b/gi, replacement: 'brushed stainless steel, cool gray tone, fine linear grain, subtle specular highlights', severity: 0, tags: ['material','metal'] },
    { pattern: /\baluminum\b/gi, replacement: 'anodized aluminum, lightweight metal, satin sheen, fine micro-scratches', severity: 0, tags: ['material','metal'] },
    { pattern: /\bcopper\b/gi, replacement: 'copper metal, warm orange-red tone, high conductivity look, subtle tarnish at edges', severity: 0, tags: ['material','metal'] },
    { pattern: /\bbrass\b/gi, replacement: 'brass alloy, golden tone, polished edges, light oxidation in recesses', severity: 0, tags: ['material','metal'] },
    { pattern: /\bchrome\b/gi, replacement: 'mirror-polished chrome, sharp reflections, high specularity, crisp highlight rolloff', severity: 0, tags: ['material','metal'] },

    { pattern: /\bhard\s*plastic\b/gi, replacement: 'rigid ABS plastic, slight sheen, molded seam lines, ejector pin marks', severity: 0, tags: ['material','polymer'] },
    { pattern: /\bsoft\s*touch\b/gi, replacement: 'soft-touch elastomer coating, matte finish, fingerprint-prone, diffuse highlights', severity: 0, tags: ['finish','polymer'] },
    { pattern: /\bacrylic\b/gi, replacement: 'clear acrylic, high transparency, sharp refraction edges, minor internal dust', severity: 0, tags: ['material','polymer'] },
    { pattern: /\bglass\b/gi, replacement: 'soda-lime glass, transparent with slight green tint, crisp reflections, refractive caustics', severity: 0, tags: ['material'] },
    { pattern: /\btempered\s*glass\b/gi, replacement: 'tempered safety glass, subtle edge tint, high impact resistance, clean speculars', severity: 0, tags: ['material'] },

    { pattern: /\bceramic\b/gi, replacement: 'glazed ceramic, smooth surface, high gloss, subtle glaze pooling near edges', severity: 0, tags: ['material'] },
    { pattern: /\bporcelain\b/gi, replacement: 'fine white porcelain, translucent thin edges, glossy glaze, delicate appearance', severity: 0, tags: ['material'] },
    { pattern: /\bconcrete\b/gi, replacement: 'cast concrete, fine aggregate specks, matte surface, slight air holes', severity: 0, tags: ['material'] },
    { pattern: /\bmarble\b/gi, replacement: 'polished marble, vein patterns, cool touch, sharp specular highlights', severity: 0, tags: ['material','stone'] },
    { pattern: /\bgranite\b/gi, replacement: 'polished granite, crystalline flecks, multi-color grain, durable finish', severity: 0, tags: ['material','stone'] },

    { pattern: /\bwood\b/gi, replacement: 'natural wood, visible grain, end-grain texture on cuts, sealed with clear coat', severity: 0, tags: ['material'] },
    { pattern: /\boak\b/gi, replacement: 'oak wood, prominent open grain, warm tan color, visible medullary rays', severity: 0, tags: ['material','wood'] },
    { pattern: /\bwalnut\b/gi, replacement: 'walnut wood, deep brown tone, tight grain, satin oil finish', severity: 0, tags: ['material','wood'] },
    { pattern: /\bbamboo\b/gi, replacement: 'bamboo lamination, linear nodes, pale yellow tone, sustainable vibe', severity: 0, tags: ['material','wood'] },
    { pattern: /\bleather\b/gi, replacement: 'genuine leather, subtle grain, creasing at bends, matte-satin sheen', severity: 0, tags: ['material'] },
    { pattern: /\bvegan\s*leather\b/gi, replacement: 'PU faux leather, consistent grain emboss, matte finish, crisp seam stitching', severity: 0, tags: ['material'] },
    { pattern: /\bfabric\b/gi, replacement: 'woven textile, visible weave pattern, soft drape, slight fuzz at edges', severity: 0, tags: ['material'] },
    { pattern: /\blinen\b/gi, replacement: 'linen fabric, slub texture, matte finish, breathable weave', severity: 0, tags: ['material','textile'] },
    { pattern: /\bvelvet\b/gi, replacement: 'velvet fabric, directional pile, deep color absorption, soft specular sweep', severity: 0, tags: ['material','textile'] },

    // ——— SURFACE FINISH / COATING ———
    { pattern: /\bmatte\s*black\b/gi, replacement: 'matte black finish, low reflectivity, soft highlight falloff, fingerprints less visible', severity: 0, tags: ['finish'] },
    { pattern: /\bsatin\s*black\b/gi, replacement: 'satin black finish, gentle sheen, controlled reflections, premium look', severity: 0, tags: ['finish'] },
    { pattern: /\bgloss\s*black\b/gi, replacement: 'high-gloss black finish, mirror-like reflections, highlight hotspots', severity: 0, tags: ['finish'] },
    { pattern: /\banodized\b/gi, replacement: 'anodized metal finish, colored oxide layer, abrasion-resistant, uniform matte-satin', severity: 0, tags: ['finish'] },
    { pattern: /\bpowder\s*coat(?:ed)?\b/gi, replacement: 'powder-coated finish, durable polymer layer, orange-peel microtexture', severity: 0, tags: ['finish'] },

    // ——— WEAR / AGING ———
    { pattern: /\bbrand\s*new\b/gi, replacement: 'factory new condition, pristine surfaces, no scratches, no dust', severity: 0, tags: ['condition'] },
    { pattern: /\blike\s*new\b/gi, replacement: 'near-new condition, minimal micro-scratches, very clean', severity: 0, tags: ['condition'] },
    { pattern: /\blightly\s*used\b/gi, replacement: 'light wear, faint edge scuffs, minor swirl marks, clean overall', severity: 0, tags: ['condition'] },
    { pattern: /\bheavy\s*use\b/gi, replacement: 'notable wear, edge chipping, paint rub-through, visible dents', severity: 0, tags: ['condition'] },
    { pattern: /\bweathered\b/gi, replacement: 'sun-faded color, surface cracks, oxidation, uneven patina', severity: 0, tags: ['aging'] },
    { pattern: /\brusty\b/gi, replacement: 'oxidized iron, reddish-brown rust blooms, flaking scale, pitted texture', severity: 0, tags: ['aging','metal'] },

    // ——— PACKAGING ———
    { pattern: /\bretail\s*box\b/gi, replacement: 'printed corrugated retail box, CMYK graphics, gloss varnish highlights, barcode panel', severity: 0, tags: ['packaging'] },
    { pattern: /\bbrown\s*box\b/gi, replacement: 'kraft corrugated box, die-cut flaps, packing tape seal, shipping label', severity: 0, tags: ['packaging'] },
    { pattern: /\bblister\s*pack\b/gi, replacement: 'clear PET blister shell on printed card backing, heat-sealed edges', severity: 0, tags: ['packaging'] },
    { pattern: /\bclam([- ]?)shell\b/gi, replacement: 'hinged clamshell plastic packaging, tamper-evident seal, clear presentation', severity: 0, tags: ['packaging'] },
    { pattern: /\bpouch\b/gi, replacement: 'stand-up zipper pouch, matte laminate, window cutout, nitrogen flush look', severity: 0, tags: ['packaging','food'] },

    // ——— COMMON PRODUCT CATEGORIES ———
    { pattern: /\bwater\s*bottle\b/gi, replacement: 'reusable bottle, 500–750 ml, screw-top lid, silicone seal, measurement markings', severity: 0, tags: ['product'] },
    { pattern: /\bmug\b/gi, replacement: 'ceramic mug, 330 ml capacity, C-handle, glossy glaze, print-ready surface', severity: 0, tags: ['product'] },
    { pattern: /\bchair\b/gi, replacement: 'seating furniture, ergonomic backrest, stable base, material per style', severity: 0, tags: ['product','furniture'] },
    { pattern: /\bsofa\b/gi, replacement: 'three-seat sofa, foam cushions, fabric or leather upholstery, visible stitching', severity: 0, tags: ['product','furniture'] },
    { pattern: /\bheadphones?\b/gi, replacement: 'over-ear headphones, padded earcups, adjustable headband, braided cable or wireless', severity: 0, tags: ['product','electronics'] },
    { pattern: /\bsmartphone\b/gi, replacement: 'slab phone form factor, thin bezels, glass front and back, metal frame, camera bump', severity: 0, tags: ['product','electronics'] },
    { pattern: /\blaptop\b/gi, replacement: 'clamshell laptop, backlit keyboard, large trackpad, slim bezels, aluminum chassis', severity: 0, tags: ['product','electronics'] },
    { pattern: /\bkeyboard\b/gi, replacement: 'mechanical keyboard, sculpted keycaps, per-key switches, compact layout options', severity: 0, tags: ['product','electronics'] },
    { pattern: /\bwatch\b/gi, replacement: 'wristwatch, stainless case, sapphire-like crystal look, leather or metal strap', severity: 0, tags: ['product','accessory'] },

    // ——— LABELING / GRAPHIC HINTS ———
    { pattern: /\bminimal\s*label\b/gi, replacement: 'clean minimal label, sans-serif typography, generous whitespace, small logo', severity: 0, tags: ['graphic'] },
    { pattern: /\bbold\s*label\b/gi, replacement: 'bold label design, high contrast typography, strong color blocks', severity: 0, tags: ['graphic'] },
    { pattern: /\bfoil\s*stamp\b/gi, replacement: 'metallic foil stamping, reflective sheen, premium finish, emboss impression', severity: 0, tags: ['graphic','finish'] },
    { pattern: /\bemboss\b/gi, replacement: 'embossed relief, raised details on paperboard, tactile texture', severity: 0, tags: ['graphic','finish'] },
    { pattern: /\bdeboss\b/gi, replacement: 'debossed impression, recessed details, subtle shadowing in recessed areas', severity: 0, tags: ['graphic','finish'] }
  ]
});
// >>> END OF BLOCK 9 <<<
/* ================================================================
 * BLOCK 9 — PRODUCTS, OBJECTS, MATERIALS & TEXTURES (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 10 — MULTILINGUAL CORE + ES SEED (START)
 * ID: BLOCK 10
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide language-aware sanitization without touching earlier logic.
 *   - Add a Spanish (es) seed so we can mirror anatomy/profanity quickly.
 * INTERNAL NOTES:
 *   - Adds new helper: PF_CORE.sanitizeByLang(text, lang, opts) that only runs packs for that language + 'any'.
 *   - UI should pass user-selected language code (e.g., 'en', 'es'); default stays legacy sanitize() behavior.
 * ================================================================ */
// >>> START OF BLOCK 10 CODE <<<
(function (global) {
  const CORE = global.PF_CORE || {};
  const PACKS = global.PF_PACKS || [];

  // Safety: don’t overwrite if it already exists from another session
  if (!CORE.sanitizeByLang) {
    CORE.sanitizeByLang = function sanitizeByLang(text, lang = 'en', opts = {}) {
      const { direction = 'clean', allowExplicit = false } = opts;
      let out = String(text || '');
      if (!out) return out;

      // 1) Clean passes for selected language
      for (const pack of PACKS) {
        if (!pack || /BLOCK\s+\d+a$/i.test(pack.block_id)) continue; // skip explicit-direction packs
        const plang = (pack.language || 'en').toLowerCase();
        if (plang !== lang.toLowerCase() && plang !== 'any') continue;
        for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
      }

      // 2) Optional explicit escalation for selected language
      if (direction === 'explicit' && allowExplicit) {
        for (const pack of PACKS) {
          if (!pack || !/BLOCK\s+\d+a$/i.test(pack.block_id)) continue; // only explicit-direction packs
          const plang = (pack.language || 'en').toLowerCase();
          if (plang !== lang.toLowerCase() && plang !== 'any') continue;
          for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
        }
      }
      return out;
    };
  }
})(typeof self !== 'undefined' ? self : this);

// ——— SEED: SPANISH (ES) CORE ANATOMY & PROFANITY (CLINICAL) ———
PF_PACKS.push({
  block_id: 'BLOCK 10 (es: anatomy/profanity core)',
  language: 'es',
  category: 'anatomia_y_lenguaje',
  emoji: ['🇪🇸','🧠'],
  notes: [
    'ES seed for anatomy + profanity neutralization. Mirror more terms in later blocks.',
    'Directional explicit mirror will be BLOCK 10a (es).'
  ],
  entries: [
    // Anatomía (neutralizaciones comunes)
    { pattern: /\b(tetas|tetitas|boobs?)\b/gi, replacement: 'senos', severity: 2, tags: ['anatomia','slang'] },
    { pattern: /\b(pezones?)\b/gi, replacement: 'pezones', severity: 1, tags: ['anatomia'] },
    { pattern: /\b(coñito|concha|chocha|panocha|chucha|pussy)\b/gi, replacement: 'vagina', severity: 3, tags: ['anatomia','slang'] },
    { pattern: /\b(clítoris|clitoris|clito)\b/gi, replacement: 'clítoris', severity: 3, tags: ['anatomia'] },
    { pattern: /\b(culo|trasero|nalgas)\b/gi, replacement: 'glúteos', severity: 2, tags: ['anatomia'] },
    { pattern: /\b(ano|ojete)\b/gi, replacement: 'ano', severity: 3, tags: ['anatomia'] },
    { pattern: /\b(pene|verga|pito|cola)\b/gi, replacement: 'pene', severity: 3, tags: ['anatomia','slang'] },
    { pattern: /\b(testículos?|bolas|huevos)\b/gi, replacement: 'testículos', severity: 3, tags: ['anatomia'] },

    // Profanidad general → tono neutro
    { pattern: /\b(joder|follar|fucking)\b/gi, replacement: 'intenso', severity: 3, tags: ['profanidad'] },
    { pattern: /\b(mierda|mierdas)\b/gi, replacement: 'desorden', severity: 2, tags: ['profanidad'] },
    { pattern: /\b(cállate|callate)\b/gi, replacement: 'por favor guarda silencio', severity: 2, tags: ['agresivo'] },
    { pattern: /\b(vete\s*a\s*la\s*mierda)\b/gi, replacement: 'déjame en paz', severity: 3, tags: ['agresivo'] },
    { pattern: /\b(puta|puto|put@s?)\b/gi, replacement: 'lenguaje inapropiado: usa término neutral', severity: 3, tags: ['slur'] }
  ]
});

// ——— SEED: SPANISH (ES) EXPLICIT-DIRECTIONAL ———
PF_PACKS.push({
  block_id: 'BLOCK 10a (es: explicit directional)',
  language: 'es',
  category: 'anatomia_y_lenguaje_explicit',
  gated: true,
  emoji: ['🇪🇸','🔥'],
  notes: [
    'Solo aplicado cuando allowExplicit:true y direction="explicit".'
  ],
  entries: [
    { pattern: /\bsenos\b/gi, replacement: 'tetas', severity: 4, tags: ['explicito'] },
    { pattern: /\bvagina\b/gi, replacement: 'coño', severity: 4, tags: ['explicito'] },
    { pattern: /\bglúteos\b/gi, replacement: 'culo', severity: 3, tags: ['explicito'] },
    { pattern: /\bano\b/gi, replacement: 'ojete', severity: 4, tags: ['explicito'] },
    { pattern: /\bpene\b/gi, replacement: 'verga', severity: 4, tags: ['explicito'] },
    { pattern: /\btestículos\b/gi, replacement: 'huevos', severity: 4, tags: ['explicito'] },

    { pattern: /\bintenso\b/gi, replacement: 'jodido', severity: 4, tags: ['profanidad','explicito'] },
    { pattern: /\bdesorden\b/gi, replacement: 'mierda', severity: 3, tags: ['profanidad','explicito'] },
    { pattern: /\bpor favor guarda silencio\b/gi, replacement: 'cállate', severity: 4, tags: ['agresivo','explicito'] },
    { pattern: /\bdéjame en paz\b/gi, replacement: 'vete a la mierda', severity: 4, tags: ['agresivo','explicito'] }
  ]
});
// >>> END OF BLOCK 10 <<<

/* ================================================================
 * BLOCK 10 — MULTILINGUAL CORE + ES SEED (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 11 — EMOJI SEMANTICS EXPANSION (EN)  (START)
 * ID: BLOCK 11
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Translate common emojis into descriptive, model-usable tokens.
 *   - Helps prompts that mix text + emoji read cleanly for any model.
 * INTERNAL NOTES:
 *   - Severity 0 (style/semantic only). Keep brand-free and literal.
 *   - Many emojis are context-dependent; we map to neutral descriptors.
 *   - More languages can mirror this later in BLOCK 10+ packs.
 * ================================================================ */
// >>> START OF BLOCK 11 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 11',
  language: 'en',
  category: 'emoji_semantics',
  emoji: ['😊','🔥','🍑','🍆','💦','🎨','🌈'],
  notes: [
    'If emoji implies NSFW slang, keep it anatomical or neutral. Directional packs handle spice.',
    'Where multiple senses exist, list the most common first.'
  ],
  entries: [
    // ——— FACES / MOOD ———
    { pattern: /😀|🙂/g, replacement: 'smiling face, positive mood', severity: 0, tags: ['mood','face'] },
    { pattern: /😁|😄/g, replacement: 'grinning face, cheerful mood', severity: 0, tags: ['mood','face'] },
    { pattern: /😂|🤣/g, replacement: 'laughing hard, tears of joy', severity: 0, tags: ['mood','face'] },
    { pattern: /😊/g, replacement: 'warm smile, content mood', severity: 0, tags: ['mood','face'] },
    { pattern: /😍|🥰/g, replacement: 'affectionate expression, hearts motif', severity: 0, tags: ['mood','romance'] },
    { pattern: /😎/g, replacement: 'confident attitude, sunglasses', severity: 0, tags: ['mood','style'] },
    { pattern: /😏/g, replacement: 'smirk, playful attitude', severity: 0, tags: ['mood'] },
    { pattern: /😳|🥺/g, replacement: 'shy expression, blushing, wide eyes', severity: 0, tags: ['mood'] },
    { pattern: /😭/g, replacement: 'crying hard, abundant tears, emotional release', severity: 0, tags: ['mood','liquid'] },
    { pattern: /😡|🤬/g, replacement: 'angry expression, high intensity, red face', severity: 0, tags: ['mood'] },
    { pattern: /🤯/g, replacement: 'mind blown, shock, explosive reaction', severity: 0, tags: ['mood','effect'] },
    { pattern: /🤔/g, replacement: 'thinking expression, contemplation', severity: 0, tags: ['mood'] },
    { pattern: /😴|💤/g, replacement: 'sleeping, snoring, rest state', severity: 0, tags: ['mood'] },
    { pattern: /🤒|🤧|🤢/g, replacement: 'sick expression, unwell, nausea or cold', severity: 0, tags: ['mood'] },

    // ——— SYMBOLS / EFFECTS ———
    { pattern: /🔥/g, replacement: 'flames, high energy, dramatic highlight', severity: 0, tags: ['effect','energy'] },
    { pattern: /✨/g, replacement: 'sparkles, glitter highlights, magical twinkle', severity: 0, tags: ['effect'] },
    { pattern: /💥/g, replacement: 'impact burst, explosion, action emphasis', severity: 0, tags: ['effect'] },
    { pattern: /💨/g, replacement: 'motion swoosh, fast movement trail', severity: 0, tags: ['effect','motion'] },
    { pattern: /💫/g, replacement: 'dizzy sparkle ring, whimsical effect', severity: 0, tags: ['effect'] },
    { pattern: /🌀/g, replacement: 'vortex swirl, spiral motion, turbulence', severity: 0, tags: ['effect'] },

    // ——— HANDS / GESTURES ———
    { pattern: /👍/g, replacement: 'thumbs up, approval gesture', severity: 0, tags: ['gesture'] },
    { pattern: /👎/g, replacement: 'thumbs down, disapproval gesture', severity: 0, tags: ['gesture'] },
    { pattern: /👏/g, replacement: 'clapping hands, applause, celebration', severity: 0, tags: ['gesture'] },
    { pattern: /🙌/g, replacement: 'raised hands, triumph, celebration', severity: 0, tags: ['gesture'] },
    { pattern: /🙏/g, replacement: 'palms together, thanks or prayer gesture', severity: 0, tags: ['gesture'] },
    { pattern: /✌️|✌/g, replacement: 'peace sign, victory gesture', severity: 0, tags: ['gesture'] },
    { pattern: /👉/g, replacement: 'right pointing hand, callout emphasis', severity: 0, tags: ['gesture'] },
    { pattern: /👈/g, replacement: 'left pointing hand, callout emphasis', severity: 0, tags: ['gesture'] },

    // ——— LOVE / HEARTS ———
    { pattern: /❤️|♥️/g, replacement: 'red heart symbol, love, romantic emphasis', severity: 0, tags: ['romance'] },
    { pattern: /🧡|💛|💚|💙|💜/g, replacement: 'colored heart symbol, affectionate tone, themed palette', severity: 0, tags: ['romance','color'] },
    { pattern: /💖|💗|💓|💞|💕/g, replacement: 'sparkly hearts, tender affection, cute tone', severity: 0, tags: ['romance'] },
    { pattern: /💔/g, replacement: 'broken heart symbol, sadness, separation', severity: 0, tags: ['romance'] },

    // ——— OBJECTS / THINGS ———
    { pattern: /💎/g, replacement: 'gemstone sparkle, luxury vibe, hard refraction', severity: 0, tags: ['object','luxury'] },
    { pattern: /🕯️|🕯/g, replacement: 'candle light, warm flame, intimate ambience', severity: 0, tags: ['object','lighting'] },
    { pattern: /🎈/g, replacement: 'balloon, celebration mood, floating accent', severity: 0, tags: ['object','party'] },
    { pattern: /🎉/g, replacement: 'confetti burst, party celebration', severity: 0, tags: ['object','party'] },
    { pattern: /🎀/g, replacement: 'ribbon bow, decorative accent, gift vibe', severity: 0, tags: ['object','decor'] },
    { pattern: /🧪/g, replacement: 'laboratory flask, experiment vibe, translucent liquid', severity: 0, tags: ['object','science'] },

    // ——— FOOD / NSFW-LEANING EMOJI HANDLED NEUTRAL ———
    { pattern: /🍑/g, replacement: 'buttocks metaphor', severity: 0, tags: ['anatomy_hint'] },
    { pattern: /🍆/g, replacement: 'penis metaphor', severity: 0, tags: ['anatomy_hint'] },
    { pattern: /🍒/g, replacement: 'paired cherries, cute accent, round fruit metaphor', severity: 0, tags: ['shape'] },
    { pattern: /🌶️|🌶/g, replacement: 'chili pepper, spicy intensity, heat metaphor', severity: 0, tags: ['intensity'] },
    { pattern: /💦/g, replacement: 'liquid droplets, splash effect, moisture emphasis', severity: 0, tags: ['liquid'] },
    { pattern: /🍥/g, replacement: 'swirl motif, spiral garnish style, cute accent', severity: 0, tags: ['shape'] },

    // ——— NATURE / WEATHER ———
    { pattern: /🌈/g, replacement: 'rainbow spectrum arc, colorful optimism', severity: 0, tags: ['color','weather'] },
    { pattern: /☀️|☀/g, replacement: 'sun icon, daylight, warm lighting', severity: 0, tags: ['weather','lighting'] },
    { pattern: /🌙/g, replacement: 'crescent moon, night ambience, cool tones', severity: 0, tags: ['weather','night'] },
    { pattern: /⭐|🌟/g, replacement: 'star symbol, twinkle highlight, night sky accent', severity: 0, tags: ['effect','night'] },
    { pattern: /☁️|☁/g, replacement: 'cloud cover, overcast, soft sky diffusion', severity: 0, tags: ['weather'] },
    { pattern: /🌧️|🌧/g, replacement: 'rain cloud, falling raindrops, wet surfaces', severity: 0, tags: ['weather'] },
    { pattern: /❄️|❄/g, replacement: 'snowflake symbol, winter chill, crystalline texture', severity: 0, tags: ['weather'] }
  ]
});
// >>> END OF BLOCK 11 <<<
/* ================================================================
 * BLOCK 11 — EMOJI SEMANTICS EXPANSION (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 12 — HUMAN APPEARANCE, BODIES & FASHION (EN)  (START)
 * ID: BLOCK 12
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual descriptors for adult characters into clear, inclusive tokens.
 *   - Covers body types, face features, skin/hair, age-bounded as ADULT ONLY, wardrobe & fashion.
 * INTERNAL NOTES:
 *   - Severity 0–1 (non-NSFW). Keep it SFW so it composes with any other block.
 *   - Avoid minors: all references imply adult subjects. Words implying youth are mapped to “young adult”.
 *   - Style stays respectful and specific; no fetish tokens here (those live in gated packs later if needed).
 * ================================================================ */
// >>> START OF BLOCK 12 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 12',
  language: 'en',
  category: 'human_appearance_fashion',
  emoji: ['🧍','🧑‍🎤','🧥','👗'],
  notes: [
    'Inclusive descriptors: face shapes, skin tones, hair textures, body builds, posture, clothing cuts.',
    'Stack with BLOCK 6 (camera) and BLOCK 5/7 (style) for complete portrait/product fashion prompts.'
  ],
  entries: [
    // ——— AGE (ADULT-ONLY) ———
    { pattern: /\bteen|underage|minor\b/gi, replacement: 'adult', severity: 5, tags: ['safety','age'] },
    { pattern: /\byoung\s*(girl|boy|woman|man)\b/gi, replacement: 'young adult', severity: 3, tags: ['age','safety'] },
    { pattern: /\bcollege\s*(girl|boy|student)\b/gi, replacement: 'adult college student', severity: 2, tags: ['age','safety'] },

    // ——— BODY BUILDS ———
    { pattern: /\bslim\b/gi, replacement: 'slim build', severity: 0, tags: ['body'] },
    { pattern: /\btoned\b/gi, replacement: 'toned musculature', severity: 0, tags: ['body'] },
    { pattern: /\bathletic\b/gi, replacement: 'athletic build, defined muscle groups', severity: 0, tags: ['body'] },
    { pattern: /\bcurvy\b/gi, replacement: 'curvy build, fuller hips and chest', severity: 0, tags: ['body'] },
    { pattern: /\bplus[-\s]*size\b/gi, replacement: 'plus-size build, fuller proportions', severity: 0, tags: ['body'] },
    { pattern: /\bmuscular\b/gi, replacement: 'muscular build, prominent definition', severity: 0, tags: ['body'] },
    { pattern: /\bpetite\b/gi, replacement: 'petite stature, smaller frame', severity: 0, tags: ['body'] },
    { pattern: /\btall\b/gi, replacement: 'tall stature, elongated proportions', severity: 0, tags: ['body'] },

    // ——— POSTURE / GESTURE ———
    { pattern: /\bconfident\s*pose\b/gi, replacement: 'upright posture, shoulders relaxed, chin slightly raised', severity: 0, tags: ['pose'] },
    { pattern: /\bpower\s*pose\b/gi, replacement: 'hands on hips, feet apart, upright stance, assertive posture', severity: 0, tags: ['pose'] },
    { pattern: /\bgraceful\s*pose\b/gi, replacement: 'gentle weight shift, relaxed hands, soft curvature, poised stance', severity: 0, tags: ['pose'] },

    // ——— FACE SHAPES ———
    { pattern: /\boval\s*face\b/gi, replacement: 'oval face shape, balanced proportions', severity: 0, tags: ['face'] },
    { pattern: /\bround\s*face\b/gi, replacement: 'round face shape, soft curves, wide cheeks', severity: 0, tags: ['face'] },
    { pattern: /\bsquare\s*jaw\b/gi, replacement: 'square jawline, strong angles, defined mandible', severity: 0, tags: ['face'] },
    { pattern: /\bheart[-\s]*shaped\s*face\b/gi, replacement: 'heart-shaped face, wider forehead, narrow chin', severity: 0, tags: ['face'] },
    { pattern: /\bdiamond\s*face\b/gi, replacement: 'diamond face shape, pronounced cheekbones, narrow forehead and chin', severity: 0, tags: ['face'] },

    // ——— FACIAL FEATURES ———
    { pattern: /\bhigh\s*cheekbones\b/gi, replacement: 'prominent cheekbones, sculpted midface', severity: 0, tags: ['face'] },
    { pattern: /\bfull\s*lips\b/gi, replacement: 'full lips, defined cupid bow', severity: 0, tags: ['face'] },
    { pattern: /\bthin\s*lips\b/gi, replacement: 'thin lips, subtle vermilion border', severity: 0, tags: ['face'] },
    { pattern: /\bfreckles\b/gi, replacement: 'freckles across cheeks and nose', severity: 0, tags: ['skin'] },
    { pattern: /\bbeauty\s*mark\b/gi, replacement: 'facial mole beauty mark', severity: 0, tags: ['skin'] },
    { pattern: /\bmonolid\b/gi, replacement: 'monolid eyelids, smooth upper lid contour', severity: 0, tags: ['eyes'] },
    { pattern: /\bdouble\s*eyelid\b/gi, replacement: 'double eyelid crease, defined supratarsal fold', severity: 0, tags: ['eyes'] },

    // ——— SKIN TONES / CONDITIONS ———
    { pattern: /\b(pale|fair)\s*skin\b/gi, replacement: 'light skin tone', severity: 0, tags: ['skin'] },
    { pattern: /\bolive\s*skin\b/gi, replacement: 'olive skin tone, greenish undertone', severity: 0, tags: ['skin'] },
    { pattern: /\b(tan|tanned)\s*skin\b/gi, replacement: 'tan skin tone, sun-kissed warmth', severity: 0, tags: ['skin'] },
    { pattern: /\bdark\s*skin\b/gi, replacement: 'deep skin tone, rich melanin', severity: 0, tags: ['skin'] },
    { pattern: /\balbinism\b/gi, replacement: 'very light skin tone and hair pigmentation, delicate contrast', severity: 0, tags: ['skin'] },
    { pattern: /\bvitiligo\b/gi, replacement: 'patchwork skin depigmentation patterns, high-contrast areas', severity: 0, tags: ['skin'] },

    // ——— HAIR TYPE / COLOR ———
    { pattern: /\bbald\b/gi, replacement: 'bald head, smooth scalp', severity: 0, tags: ['hair'] },
    { pattern: /\bbuzz\s*cut\b/gi, replacement: 'very short buzz cut, even length', severity: 0, tags: ['hair'] },
    { pattern: /\bshort\s*hair\b/gi, replacement: 'short hair length, above ears', severity: 0, tags: ['hair'] },
    { pattern: /\bshoulder[-\s]*length\b/gi, replacement: 'shoulder-length hair, medium style', severity: 0, tags: ['hair'] },
    { pattern: /\blong\s*hair\b/gi, replacement: 'long hair length, below shoulders', severity: 0, tags: ['hair'] },
    { pattern: /\bstraight\s*hair\b/gi, replacement: 'straight hair texture, sleek strands', severity: 0, tags: ['hair'] },
    { pattern: /\bwavy\s*hair\b/gi, replacement: 'wavy hair texture, S-curves, soft volume', severity: 0, tags: ['hair'] },
    { pattern: /\bcurly\s*hair\b/gi, replacement: 'curly hair texture, ringlet curls, defined coils', severity: 0, tags: ['hair'] },
    { pattern: /\bcoily\s*hair\b/gi, replacement: 'coily hair texture, tight curls, springy volume', severity: 0, tags: ['hair'] },
    { pattern: /\bblonde\b/gi, replacement: 'blonde hair color, warm highlights', severity: 0, tags: ['hair','color'] },
    { pattern: /\bbrunette\b/gi, replacement: 'brown hair color, medium depth', severity: 0, tags: ['hair','color'] },
    { pattern: /\bblack\s*hair\b/gi, replacement: 'black hair color, high contrast', severity: 0, tags: ['hair','color'] },
    { pattern: /\bredhead|ginger\b/gi, replacement: 'red hair color, copper tones', severity: 0, tags: ['hair','color'] },
    { pattern: /\bdyed\s*(pink|blue|green|purple)\b/gi, replacement: 'dyed hair with vibrant color accent', severity: 0, tags: ['hair','color'] },

    // ——— FACIAL HAIR ———
    { pattern: /\bclean\s*shaven\b/gi, replacement: 'clean-shaven face, smooth skin', severity: 0, tags: ['facial_hair'] },
    { pattern: /\bstubble\b/gi, replacement: 'short beard stubble, rough texture', severity: 0, tags: ['facial_hair'] },
    { pattern: /\bbeard\b/gi, replacement: 'full beard, groomed shape', severity: 0, tags: ['facial_hair'] },
    { pattern: /\bmustache|moustache\b/gi, replacement: 'mustache, upper-lip facial hair', severity: 0, tags: ['facial_hair'] },

    // ——— EYES / BROWS ———
    { pattern: /\bthick\s*brows\b/gi, replacement: 'thick eyebrows, strong arches', severity: 0, tags: ['brow'] },
    { pattern: /\bthin\s*brows\b/gi, replacement: 'thin eyebrows, gentle arches', severity: 0, tags: ['brow'] },
    { pattern: /\bhazel\s*eyes\b/gi, replacement: 'hazel eye color, green-brown mix', severity: 0, tags: ['eyes'] },
    { pattern: /\bblue\s*eyes\b/gi, replacement: 'blue eye color, cool tone', severity: 0, tags: ['eyes'] },
    { pattern: /\bgreen\s*eyes\b/gi, replacement: 'green eye color, vivid tones', severity: 0, tags: ['eyes'] },
    { pattern: /\bbrown\s*eyes\b/gi, replacement: 'brown eye color, warm depth', severity: 0, tags: ['eyes'] },

    // ——— WARDROBE / FASHION CORE ———
    { pattern: /\bcasual\s*outfit\b/gi, replacement: 'casual outfit, t-shirt and jeans, relaxed fit, sneakers', severity: 0, tags: ['fashion'] },
    { pattern: /\bstreetwear\b/gi, replacement: 'streetwear outfit, oversized hoodie, graphic tee, cargo pants, chunky sneakers', severity: 0, tags: ['fashion'] },
    { pattern: /\bformal\s*wear\b/gi, replacement: 'formal wear, tailored suit or elegant dress, polished shoes', severity: 0, tags: ['fashion'] },
    { pattern: /\bbusiness\s*attire\b/gi, replacement: 'business attire, blazer, collared shirt, slacks or pencil skirt, low heels or oxfords', severity: 0, tags: ['fashion'] },
    { pattern: /\bbohemian\b/gi, replacement: 'bohemian style, flowy fabrics, layered jewelry, earthy palette', severity: 0, tags: ['fashion'] },
    { pattern: /\bgrunge\b/gi, replacement: 'grunge outfit, flannel shirt, distressed denim, band tee, boots', severity: 0, tags: ['fashion'] },
    { pattern: /\bgoth(ic)?\b/gi, replacement: 'goth style, dark palette, lace or leather accents, dramatic accessories', severity: 0, tags: ['fashion'] },
    { pattern: /\bpreppy\b/gi, replacement: 'preppy look, polos, cable-knit sweater, chinos or pleated skirt, loafers', severity: 0, tags: ['fashion'] },
    { pattern: /\btechwear\b/gi, replacement: 'techwear outfit, water-resistant fabrics, modular pockets, matte black palette, functional straps', severity: 0, tags: ['fashion'] },

    // ——— CLOTHING ITEMS ———
    { pattern: /\bgraphic\s*tee\b/gi, replacement: 'graphic t-shirt, center print, cotton jersey, relaxed fit', severity: 0, tags: ['clothing'] },
    { pattern: /\bbutton[-\s]*up\b/gi, replacement: 'button-up shirt, crisp collar, placket, cuffs', severity: 0, tags: ['clothing'] },
    { pattern: /\bhoodie\b/gi, replacement: 'hooded sweatshirt, kangaroo pocket, ribbed cuffs, drawstrings', severity: 0, tags: ['clothing'] },
    { pattern: /\bblazer\b/gi, replacement: 'tailored blazer, lapels, structured shoulders, single-breasted', severity: 0, tags: ['clothing'] },
    { pattern: /\bjeans\b/gi, replacement: 'denim jeans, five-pocket design, visible stitching, metal rivets', severity: 0, tags: ['clothing'] },
    { pattern: /\bskirt\b/gi, replacement: 'skirt silhouette, specified length, fabric drape', severity: 0, tags: ['clothing'] },
    { pattern: /\bdress\b/gi, replacement: 'dress silhouette, defined waist, fabric and length as styled', severity: 0, tags: ['clothing'] },
    { pattern: /\bsneakers?\b/gi, replacement: 'sneakers, rubber outsole, cushioned midsole, lace-up', severity: 0, tags: ['footwear'] },
    { pattern: /\bboots?\b/gi, replacement: 'boots, ankle or knee height options, sturdy sole', severity: 0, tags: ['footwear'] },
    { pattern: /\bheels?\b/gi, replacement: 'heels, slender heel height, closed or open toe', severity: 0, tags: ['footwear'] },

    // ——— ACCESSORIES ———
    { pattern: /\bglasses\b/gi, replacement: 'eyeglasses, acetate or metal frames, anti-reflective lenses', severity: 0, tags: ['accessory'] },
    { pattern: /\bsunglasses\b/gi, replacement: 'sunglasses, UV-protective lenses, tinted color, stylish frames', severity: 0, tags: ['accessory'] },
    { pattern: /\bnecklace\b/gi, replacement: 'necklace accessory, chain or pendant, metallic finish', severity: 0, tags: ['accessory'] },
    { pattern: /\bbracelet\b/gi, replacement: 'bracelet accessory, layered bangles or cuff', severity: 0, tags: ['accessory'] },
    { pattern: /\bearrings?\b/gi, replacement: 'earrings, studs or hoops, metallic or gemstone accent', severity: 0, tags: ['accessory'] },
    { pattern: /\bwatch\b/gi, replacement: 'wristwatch accessory, metal or leather strap, polished case', severity: 0, tags: ['accessory'] }
  ]
});
// >>> END OF BLOCK 12 <<<
/* ================================================================
 * BLOCK 12 — HUMAN APPEARANCE, BODIES & FASHION (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 14 — CREATURES, ANIMALS & ANATOMY (SFW) (EN)  (START)
 * ID: BLOCK 14
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Rich, SFW descriptors for animals/creatures (real + fantasy) without explicit content.
 *   - Helpful for character design, mascots, natural history looks, and fantasy worldbuilding.
 * INTERNAL NOTES:
 *   - Severity 0. Avoid trademark species strains; use generic species/form traits.
 *   - Fantasy variants keep it PG (anatomy descriptive, not sexual).
 * ================================================================ */
// >>> START OF BLOCK 14 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 14',
  language: 'en',
  category: 'creatures_animals',
  emoji: ['🐺','🦅','🐉','🦄'],
  notes: [
    'Real species → morphology, coat/feather patterns, motion cues.',
    'Fantasy forms → silhouette, scale features, elemental motifs.'
  ],
  entries: [
    // ——— MAMMALS ———
    { pattern: /\bwolf\b/gi, replacement: 'wolf canid, dense double coat, alert ears, keen gaze, athletic stance', severity: 0, tags: ['mammal'] },
    { pattern: /\bfox\b/gi, replacement: 'fox canid, bushy tail with white tip, slender muzzle, bright eyes, agile posture', severity: 0, tags: ['mammal'] },
    { pattern: /\bbear\b/gi, replacement: 'bear, heavy musculature, thick fur, curved claws, powerful shoulders', severity: 0, tags: ['mammal'] },
    { pattern: /\blion\b/gi, replacement: 'lion, tawny coat, muscular frame, proud mane (male), golden eyes', severity: 0, tags: ['mammal'] },
    { pattern: /\btiger\b/gi, replacement: 'tiger, orange coat with black stripes, broad head, powerful forelimbs', severity: 0, tags: ['mammal'] },
    { pattern: /\bcat\b/gi, replacement: 'domestic cat, soft fur, vertical pupils, agile spine, whiskers, graceful gait', severity: 0, tags: ['mammal'] },
    { pattern: /\bdog\b/gi, replacement: 'domestic dog, expressive ears, wet nose, varied coat, friendly posture', severity: 0, tags: ['mammal'] },
    { pattern: /\bhare|rabbit\b/gi, replacement: 'rabbit, long ears, soft fur, quick hind legs, gentle eyes', severity: 0, tags: ['mammal'] },
    { pattern: /\bhorse\b/gi, replacement: 'horse equine, glossy coat, flowing mane and tail, muscular legs, elegant stride', severity: 0, tags: ['mammal'] },
    { pattern: /\bwhale\b/gi, replacement: 'whale cetacean, streamlined massive body, dorsal fin (varies), smooth skin, blowhole spray', severity: 0, tags: ['mammal','marine'] },

    // ——— BIRDS ———
    { pattern: /\beagle\b/gi, replacement: 'eagle raptor, hooked beak, keen eyesight, broad wingspan, soaring posture', severity: 0, tags: ['bird'] },
    { pattern: /\bowl\b/gi, replacement: 'owl, forward-facing eyes, facial disk, silent flight feathers, nocturnal vibe', severity: 0, tags: ['bird'] },
    { pattern: /\bparrot\b/gi, replacement: 'parrot, curved beak, vivid plumage, zygodactyl feet, lively posture', severity: 0, tags: ['bird'] },
    { pattern: /\bpeacock\b/gi, replacement: 'peafowl, iridescent tail train, eye-spot feathers, fan display, regal stance', severity: 0, tags: ['bird'] },
    { pattern: /\bflamingo\b/gi, replacement: 'flamingo, long legs, S-curved neck, pink plumage from carotenoids, social flock', severity: 0, tags: ['bird'] },

    // ——— REPTILES / AMPHIBIANS ———
    { pattern: /\bsnake\b/gi, replacement: 'snake, elongated body, smooth scales, forked tongue, sinuous movement', severity: 0, tags: ['reptile'] },
    { pattern: /\blizard\b/gi, replacement: 'lizard, scaly skin, splayed limbs, quick darts, sun-basking behavior', severity: 0, tags: ['reptile'] },
    { pattern: /\bcrocodile\b/gi, replacement: 'crocodile, armored scutes, powerful jaw, muscular tail, riverbank lurking', severity: 0, tags: ['reptile'] },
    { pattern: /\bfrog\b/gi, replacement: 'frog amphibian, moist skin, long hind legs, bulging eyes, leaping motion', severity: 0, tags: ['amphibian'] },

    // ——— FISH / INVERTEBRATES ———
    { pattern: /\bkoi\b/gi, replacement: 'koi carp, patterned scales, orange-white-black varieties, tranquil pond ripples', severity: 0, tags: ['fish'] },
    { pattern: /\boctopus\b/gi, replacement: 'octopus, eight flexible arms with suckers, soft body, intelligent eyes, camouflage ability', severity: 0, tags: ['cephalopod'] },
    { pattern: /\bjellyfish\b/gi, replacement: 'jellyfish, bell-shaped body, trailing tentacles, translucent glow, drifting motion', severity: 0, tags: ['invertebrate','marine'] },
    { pattern: /\bbutterfly\b/gi, replacement: 'butterfly, patterned wings, delicate antennae, nectar feeding, fluttering flight', severity: 0, tags: ['insect'] },
    { pattern: /\bscarab\b/gi, replacement: 'scarab beetle, glossy elytra, compact body, symbolic ancient motif', severity: 0, tags: ['insect'] },

    // ——— FANTASY CREATURES ———
    { pattern: /\bdragon\b/gi, replacement: 'dragon, scaled hide, horned crest, massive wings, fiery breath motif, colossal presence', severity: 0, tags: ['fantasy'] },
    { pattern: /\bgriffin\b/gi, replacement: 'griffin, eagle head and wings, lion body, regal hybrid, guardian stance', severity: 0, tags: ['fantasy'] },
    { pattern: /\bunicorn\b/gi, replacement: 'unicorn, single spiral horn, graceful horse form, ethereal glow, pastel aura', severity: 0, tags: ['fantasy'] },
    { pattern: /\bmermaid\b/gi, replacement: 'merfolk, human upper body (adult), scaled fish tail, iridescent fins, underwater shimmer', severity: 0, tags: ['fantasy','marine'] },
    { pattern: /\bphoenix\b/gi, replacement: 'phoenix, fiery plumage, rebirth motif, rising embers, radiant glow', severity: 0, tags: ['fantasy'] },

    // ——— CREATURE DETAIL TOKENS ———
    { pattern: /\bbiped\b/gi, replacement: 'bipedal stance, upright gait, balanced center of mass', severity: 0, tags: ['anatomy'] },
    { pattern: /\bquadruped\b/gi, replacement: 'quadrupedal stance, stable gait, grounded posture', severity: 0, tags: ['anatomy'] },
    { pattern: /\bdigitigrade\b/gi, replacement: 'digitigrade legs, raised heel, agile running posture', severity: 0, tags: ['anatomy'] },
    { pattern: /\bplantigrade\b/gi, replacement: 'plantigrade legs, full-foot contact, sturdy stance', severity: 0, tags: ['anatomy'] },
    { pattern: /\bbioluminescent\b/gi, replacement: 'bioluminescent accents, self-emitting glow, soft neon edges', severity: 0, tags: ['effect'] },
    { pattern: /\bscale\s*armor\b/gi, replacement: 'overlapping scales, hard keratin texture, reflective highlights', severity: 0, tags: ['surface'] },
    { pattern: /\bfeather\s*crest\b/gi, replacement: 'feathered crest, lifted crown feathers, display posture', severity: 0, tags: ['surface'] }
  ]
});
// >>> END OF BLOCK 14 <<<
/* ================================================================
 * BLOCK 14 — CREATURES, ANIMALS & ANATOMY (SFW) (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 15 — VEHICLES, MECHA & HARD-SURFACE (EN)  (START)
 * ID: BLOCK 15
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual vehicle/mecha terms into precise hard-surface descriptors.
 *   - Useful for concept art, product viz, kitbashes, and sci-fi renders.
 * INTERNAL NOTES:
 *   - Severity 0. No brands; keep it generic and stackable.
 *   - Mix with BLOCK 6 (photo) & BLOCK 13 (color/comp) for realistic shots.
 * ================================================================ */
// >>> START OF BLOCK 15 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 15',
  language: 'en',
  category: 'vehicles_mecha_hardsurface',
  emoji: ['🚗','🚀','🛸','🤖'],
  notes: [
    'Breaks down silhouettes, propulsion, paneling, greebles, material cues.',
    'Covers ground/air/sea/space + mecha joints/armor vocab.'
  ],
  entries: [
    // ——— CAR / GROUND ———
    { pattern: /\bcompact\s*car\b/gi, replacement: 'compact hatchback silhouette, short wheelbase, high roofline, efficient aero', severity: 0, tags: ['ground','car'] },
    { pattern: /\bsedan\b/gi, replacement: 'four-door sedan silhouette, long wheelbase, separate trunk volume, balanced proportions', severity: 0, tags: ['ground','car'] },
    { pattern: /\bcoupe\b/gi, replacement: 'two-door coupe silhouette, fastback roofline, low stance, sporty proportions', severity: 0, tags: ['ground','car'] },
    { pattern: /\bsuv\b/gi, replacement: 'SUV silhouette, tall ride height, roof rails, chunky tires, protective cladding', severity: 0, tags: ['ground'] },
    { pattern: /\boff[-\s]*road\b/gi, replacement: 'off-road setup, lifted suspension, skid plates, knobby tires, steel bumpers', severity: 0, tags: ['ground'] },
    { pattern: /\brally\s*car\b/gi, replacement: 'rally spec, light pods, gravel flaps, raised ride height, roll cage hint', severity: 0, tags: ['ground','racing'] },
    { pattern: /\bdrift\s*car\b/gi, replacement: 'drift setup, aggressive camber, wide body kit, smoke-producing rear tires', severity: 0, tags: ['ground','racing'] },
    { pattern: /\bretro\s*truck\b/gi, replacement: 'classic pickup silhouette, boxy cab, exposed wheel arches, wood bed slats vibe', severity: 0, tags: ['ground','truck'] },
    { pattern: /\bmotorcycle\b/gi, replacement: 'motorcycle, exposed frame, tubular chassis, twin shocks, chain drive, bar-end mirrors', severity: 0, tags: ['ground','bike'] },
    { pattern: /\bcruiser\s*bike\b/gi, replacement: 'cruiser motorcycle, low seat, swept bars, forward pegs, heavy fenders', severity: 0, tags: ['ground','bike'] },
    { pattern: /\bsport\s*bike\b/gi, replacement: 'sport motorcycle, full fairings, aggressive clip-ons, rearsets, aerodynamic tail', severity: 0, tags: ['ground','bike'] },

    // ——— AIR / SPACE ———
    { pattern: /\bprop\s*plane\b/gi, replacement: 'single-prop aircraft, low wing, tricycle gear, riveted aluminum skin', severity: 0, tags: ['air'] },
    { pattern: /\bjet\s*fighter\b/gi, replacement: 'sleek jet fuselage, delta or swept wings, twin vertical stabilizers, afterburner nozzle', severity: 0, tags: ['air'] },
    { pattern: /\bhelicopter\b/gi, replacement: 'helicopter with main rotor and tail rotor, skid landing gear, glazed cockpit', severity: 0, tags: ['air'] },
    { pattern: /\bvtol\b/gi, replacement: 'VTOL craft, vectoring nozzles or tilt-rotors, vertical lift posture, transition ducts', severity: 0, tags: ['air'] },
    { pattern: /\bshuttle\b/gi, replacement: 'space shuttle silhouette, thermal tiles, delta wing, orbital OMS pods', severity: 0, tags: ['space'] },
    { pattern: /\bstar\s*fighter\b/gi, replacement: 'compact space interceptor, forward canards, reaction thrusters, weapon hardpoints', severity: 0, tags: ['space'] },
    { pattern: /\bcargo\s*freighter\b/gi, replacement: 'space freighter, modular cargo pods, dorsal spine, container latches, maintenance greebles', severity: 0, tags: ['space'] },
    { pattern: /\bcruiser\s*ship\b/gi, replacement: 'large space cruiser, armored hull plating, hangar bay apertures, antenna arrays', severity: 0, tags: ['space'] },

    // ——— SEA ———
    { pattern: /\byacht\b/gi, replacement: 'sleek yacht hull, gloss gelcoat, teak deck details, chrome rails', severity: 0, tags: ['sea'] },
    { pattern: /\bspeedboat\b/gi, replacement: 'speedboat, deep-V hull, wake spray, low windshield, outboard engine', severity: 0, tags: ['sea'] },
    { pattern: /\bsubmarine\b/gi, replacement: 'submarine hull, hydroplanes, sail tower, anechoic tiles, torpedo tube hints', severity: 0, tags: ['sea','underwater'] },
    { pattern: /\bdiesel\s*punk\s*ship\b/gi, replacement: 'dieselpunk vessel, riveted plates, smoke stacks, exposed piping, grease stains', severity: 0, tags: ['sea','retro'] },

    // ——— MECHA / HARD-SURFACE ———
    { pattern: /\bmecha\b/gi, replacement: 'bipedal mech, armored plates, hydraulic pistons, servo cabling, cockpit canopy', severity: 0, tags: ['mecha'] },
    { pattern: /\bwalker\b/gi, replacement: 'multi-legged walker, articulated joints, shock absorbers, modular armor', severity: 0, tags: ['mecha'] },
    { pattern: /\bexo\s*suit\b/gi, replacement: 'powered exosuit, external frame, actuator packs, HUD visor, reinforced joints', severity: 0, tags: ['mecha'] },
    { pattern: /\bhard\s*surface\b/gi, replacement: 'hard-surface design language, crisp chamfers, tight panel gaps, mechanical fasteners', severity: 0, tags: ['design'] },
    { pattern: /\bgreebles?\b/gi, replacement: 'surface greebles, maintenance panels, vents, conduits, access hatches, antennae', severity: 0, tags: ['detail'] },

    // ——— DETAIL TOKENS ———
    { pattern: /\bchassis\b/gi, replacement: 'rigid chassis frame, crossmembers, mounting points, reinforced welds', severity: 0, tags: ['detail'] },
    { pattern: /\baero\s*kit\b/gi, replacement: 'aero kit, front splitter, side skirts, rear diffuser, deck spoiler', severity: 0, tags: ['detail'] },
    { pattern: /\bair\s*intakes?\b/gi, replacement: 'functional air intake scoops, mesh grilles, internal ducting', severity: 0, tags: ['detail'] },
    { pattern: /\bpanel\s*lines\b/gi, replacement: 'panel line breakups, recessed seams, exposed fasteners, access latches', severity: 0, tags: ['detail'] },
    { pattern: /\briveted\b/gi, replacement: 'riveted skin, overlapping plates, domed rivet heads, vintage aerospace vibe', severity: 0, tags: ['detail'] },
    { pattern: /\bcarbon\s*fiber\b/gi, replacement: 'carbon fiber weave, glossy resin, diagonal twill pattern, lightweight stiffness', severity: 0, tags: ['material'] },
    { pattern: /\bweathering\b/gi, replacement: 'edge chipping, oil streaks, dust accumulation, paint fade, heat discoloration', severity: 0, tags: ['aging'] },

    // ——— SCENE / ACTION VERBS ———
    { pattern: /\bpit\s*lane\b/gi, replacement: 'pit lane setup, tire stacks, crew tools, painted markings, tarmac texture', severity: 0, tags: ['scene'] },
    { pattern: /\bdogfight\b/gi, replacement: 'aerial dogfight scene, contrails, high-G turns, missile flares', severity: 0, tags: ['scene'] },
    { pattern: /\blaunch\s*pad\b/gi, replacement: 'launch pad structure, service towers, fueling lines, flame trench, heat haze', severity: 0, tags: ['scene'] }
  ]
});
// >>> END OF BLOCK 15 <<<
/* ================================================================
 * BLOCK 15 — VEHICLES, MECHA & HARD-SURFACE (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 16 — UI/UX, ICONS & LOGO PROMPTS (EN)  (START)
 * ID: BLOCK 16
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Turn vague UI/logo requests into crisp, generative-friendly tokens.
 *   - Helps with app screens, iconography, brand-safe logo styles (generic).
 * INTERNAL NOTES:
 *   - Severity 0 (design language only). No real brand names.
 *   - Pair with BLOCK 13 (color/comp) for palettes and layout emphasis.
 * ================================================================ */
// >>> START OF BLOCK 16 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 16',
  language: 'en',
  category: 'ui_ux_logo',
  emoji: ['📱','🖥️','🧭','🔣'],
  notes: [
    'Covers design systems, icon shapes, layout patterns, logo form factors.',
    'All brand-free. Encourages shape grammar and typography description.'
  ],
  entries: [
    // ——— APP / WEB SCREENS ———
    { pattern: /\bmobile\s*app\s*screen\b/gi, replacement: 'mobile UI frame, notch-safe top, tab bar bottom, card list content, thumb-reach layout', severity: 0, tags: ['ui'] },
    { pattern: /\bdashboard\b/gi, replacement: 'dashboard layout, responsive grid, key KPI cards, charts with legends, filter bar', severity: 0, tags: ['ui'] },
    { pattern: /\bonboarding\b/gi, replacement: 'onboarding flow, full-bleed illustration, headline, two bullet points, primary CTA', severity: 0, tags: ['ui'] },
    { pattern: /\bsettings\s*screen\b/gi, replacement: 'settings list, grouped sections, toggles and selectors, sticky save bar', severity: 0, tags: ['ui'] },
    { pattern: /\bform\s*screen\b/gi, replacement: 'form layout, clear labels, helper text, validation states, progress indicator', severity: 0, tags: ['ui'] },

    // ——— DESIGN SYSTEM TOKENS ———
    { pattern: /\bcard\s*ui\b/gi, replacement: 'card components with soft radius, subtle shadow, comfortable padding, semantic background', severity: 0, tags: ['ui'] },
    { pattern: /\bglassmorphism\b/gi, replacement: 'frosted glass panels, backdrop blur, translucent layers, soft glow edges', severity: 0, tags: ['ui','style'] },
    { pattern: /\bneumorphism\b/gi, replacement: 'soft extruded surfaces, inner/outer shadows, low-contrast UI, tactile knobs', severity: 0, tags: ['ui','style'] },
    { pattern: /\bskeuomorphic\b/gi, replacement: 'skeuomorphic details, material cues, realistic textures, shadow depth cues', severity: 0, tags: ['ui','style'] },

    // ——— ICONOGRAPHY ———
    { pattern: /\bflat\s*icon\b/gi, replacement: 'flat icon, simplified silhouette, no gradients, strong negative space', severity: 0, tags: ['icon'] },
    { pattern: /\bline\s*icon\b/gi, replacement: 'line icon, uniform stroke, rounded caps and joins, pixel-perfect grid', severity: 0, tags: ['icon'] },
    { pattern: /\bglyph\s*icon\b/gi, replacement: 'filled glyph icon, solid silhouette, optical balance, crisp corners', severity: 0, tags: ['icon'] },
    { pattern: /\bduotone\s*icon\b/gi, replacement: 'duotone icon, two shade layers, foreground emphasis, subtle depth', severity: 0, tags: ['icon'] },
    { pattern: /\bisometric\s*icon\b/gi, replacement: 'isometric icon, 30° axes, simple geometry, minimal shading, crisp edges', severity: 0, tags: ['icon'] },

    // ——— LOGO FORM FACTORS ———
    { pattern: /\bwordmark\b/gi, replacement: 'wordmark logo, custom letterforms, tracking tuned, optical kerning, balanced baseline', severity: 0, tags: ['logo'] },
    { pattern: /\blettermark\b/gi, replacement: 'lettermark logo, monogram initials, interlocking shapes, negative-space trick', severity: 0, tags: ['logo'] },
    { pattern: /\babstract\s*mark\b/gi, replacement: 'abstract mark, geometric motif, rotational symmetry, scalable simplicity', severity: 0, tags: ['logo'] },
    { pattern: /\bemblem\b/gi, replacement: 'emblem badge, enclosing shape, ribbon banner, heritage vibe, small-lettering ring', severity: 0, tags: ['logo'] },
    { pattern: /\bpictorial\s*mark\b/gi, replacement: 'pictorial logo, recognizable object silhouette, friendly curves, minimal detail', severity: 0, tags: ['logo'] },

    // ——— TYPOGRAPHY ———
    { pattern: /\bserif\s*type\b/gi, replacement: 'serif typography, high contrast strokes, elegant serifs, classic tone', severity: 0, tags: ['type'] },
    { pattern: /\bsans\s*serif\b/gi, replacement: 'sans-serif typography, clean geometry, consistent stroke, modern tone', severity: 0, tags: ['type'] },
    { pattern: /\bslab\s*serif\b/gi, replacement: 'slab serif typography, heavy rectangular serifs, sturdy feel', severity: 0, tags: ['type'] },
    { pattern: /\bdisplay\s*type\b/gi, replacement: 'display typography, expressive shapes, high contrast, headline use', severity: 0, tags: ['type'] },
    { pattern: /\bmono(space|spaced)?\b/gi, replacement: 'monospace typography, equal character width, code aesthetic', severity: 0, tags: ['type'] },

    // ——— LAYOUT PATTERNS ———
    { pattern: /\bgrid\s*layout\b/gi, replacement: '12-column responsive grid, consistent gutters, baseline rhythm', severity: 0, tags: ['layout'] },
    { pattern: /\bcard\s*grid\b/gi, replacement: 'card grid layout, equal heights, wrap behavior, hover elevation', severity: 0, tags: ['layout'] },
    { pattern: /\bhero\s*section\b/gi, replacement: 'hero section, bold headline, supporting copy, primary CTA, illustrative visual', severity: 0, tags: ['layout'] },
    { pattern: /\bsidebar\s*nav\b/gi, replacement: 'left sidebar navigation, icons with labels, collapsible sections, active state highlight', severity: 0, tags: ['layout'] },
    { pattern: /\bmodal\s*dialog\b/gi, replacement: 'modal dialog, scrim background, focus trap, primary/secondary buttons', severity: 0, tags: ['layout'] },

    // ——— MICROINTERACTIONS ———
    { pattern: /\bsubtle\s*hover\b/gi, replacement: 'hover microinteraction, small elevation change, soft shadow, color shift 150ms', severity: 0, tags: ['motion'] },
    { pattern: /\bsnappy\s*transition\b/gi, replacement: 'snappy transition, 180ms ease-out, transform and opacity', severity: 0, tags: ['motion'] },
    { pattern: /\bscroll\s*parallax\b/gi, replacement: 'parallax layers, slower background scroll, depth illusion', severity: 0, tags: ['motion'] }
  ]
});
// >>> END OF BLOCK 16 <<<
/* ================================================================
 * BLOCK 16 — UI/UX, ICONS & LOGO PROMPTS (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 17 — FOOD, CULINARY STYLING & PLATING (EN)  (START)
 * ID: BLOCK 17
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Turn casual food terms into appetizing, studio-friendly descriptors.
 *   - Covers ingredients, cooking methods, plating styles, garnish, steam/sizzle cues.
 * INTERNAL NOTES:
 *   - Severity 0 (non-NSFW). Brand-free; useful for ads, menus, product shots.
 *   - Pair with BLOCK 6 (photo) for lighting like “soft daylight window” or “top-down”.
 * ================================================================ */
// >>> START OF BLOCK 17 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 17',
  language: 'en',
  category: 'food_culinary',
  emoji: ['🍽️','🍜','🥗','🔥'],
  notes: [
    'Adds sensory cues (steam, glaze, sizzle) and plating lexicon (garnish, negative space).',
    'Avoids specific brand dishes; uses generic cuisine descriptors.'
  ],
  entries: [
    // ——— COOKING METHODS ———
    { pattern: /\bgrilled\b/gi, replacement: 'grilled with char marks, smoky aroma, slight caramelization', severity: 0, tags: ['method'] },
    { pattern: /\broasted\b/gi, replacement: 'oven-roasted, browned edges, concentrated flavors, crispy exterior', severity: 0, tags: ['method'] },
    { pattern: /\bbaked\b/gi, replacement: 'baked, golden crust, even heat finish, soft interior', severity: 0, tags: ['method'] },
    { pattern: /\bpan[-\s]*seared\b/gi, replacement: 'pan-seared, Maillard crust, sizzling edges, buttery glaze', severity: 0, tags: ['method'] },
    { pattern: /\bsaute(?:ed|éd)\b/gi, replacement: 'sautéed, quick high heat, light oil sheen, tender bite', severity: 0, tags: ['method'] },
    { pattern: /\bpoached\b/gi, replacement: 'gently poached, tender texture, delicate broth notes', severity: 0, tags: ['method'] },
    { pattern: /\bsteamed\b/gi, replacement: 'steamed, moist heat, vibrant color, tender-crisp texture', severity: 0, tags: ['method'] },
    { pattern: /\bsmoked\b/gi, replacement: 'smoke-kissed flavor, mahogany surface, aromatic depth', severity: 0, tags: ['method'] },
    { pattern: /\bdeep[-\s]*fried\b/gi, replacement: 'deep-fried, crisp shell, bubbling oil texture, golden color', severity: 0, tags: ['method'] },

    // ——— TEXTURE / DONENESS ———
    { pattern: /\bcrispy\b/gi, replacement: 'crispy texture, audible crunch, golden exterior', severity: 0, tags: ['texture'] },
    { pattern: /\bcrunchy\b/gi, replacement: 'crunchy bite, firm structure, loud snap', severity: 0, tags: ['texture'] },
    { pattern: /\bcreamy\b/gi, replacement: 'creamy mouthfeel, smooth emulsion, glossy sheen', severity: 0, tags: ['texture'] },
    { pattern: /\bjuicy\b/gi, replacement: 'juicy interior, visible moisture, glistening surface', severity: 0, tags: ['texture'] },
    { pattern: /\btender\b/gi, replacement: 'tender texture, easy cut, delicate fibers', severity: 0, tags: ['texture'] },
    { pattern: /\bumami\b/gi, replacement: 'umami depth, savory richness, glutamate-forward flavor', severity: 0, tags: ['flavor'] },
    { pattern: /\bspicy\b/gi, replacement: 'spicy heat, chili warmth, lingering tingle', severity: 0, tags: ['flavor'] },
    { pattern: /\bherbaceous\b/gi, replacement: 'fresh herbaceous notes, green aromatics, lively finish', severity: 0, tags: ['flavor'] },

    // ——— DISH FRAMES ———
    { pattern: /\bcomfort\s*food\b/gi, replacement: 'comfort-food style, hearty portions, nostalgic plating, warm tones', severity: 0, tags: ['style'] },
    { pattern: /\bgourmet\b/gi, replacement: 'gourmet presentation, refined portioning, precision garnish, clean plate', severity: 0, tags: ['style'] },
    { pattern: /\bfamily\s*style\b/gi, replacement: 'family-style presentation, shared platter, abundant serving, casual vibe', severity: 0, tags: ['style'] },
    { pattern: /\bstreet\s*food\b/gi, replacement: 'street-food vibe, handheld format, paper wrap, fast-serve energy', severity: 0, tags: ['style'] },

    // ——— PLATING / GARNISH ———
    { pattern: /\bplated\b/gi, replacement: 'center-of-plate plating, negative space, wipe-clean rim, composed layers', severity: 0, tags: ['plating'] },
    { pattern: /\bgarnish\b/gi, replacement: 'fresh garnish, microgreens or citrus zest, height accent', severity: 0, tags: ['plating'] },
    { pattern: /\bdrizzle\b/gi, replacement: 'thin sauce drizzle, controlled lines, glossy finish', severity: 0, tags: ['plating'] },
    { pattern: /\bsauce\s*swipe\b/gi, replacement: 'palette-knife sauce swipe, textured stroke, directional flow', severity: 0, tags: ['plating'] },
    { pattern: /\bcrumb\s*dust\b/gi, replacement: 'crumb dusting, fine texture contrast, edge sprinkle', severity: 0, tags: ['plating'] },
    { pattern: /\bheight\s*stack\b/gi, replacement: 'vertical stack, layered components, structural plating', severity: 0, tags: ['plating'] },

    // ——— BREAD / DOUGH ———
    { pattern: /\bartisan\s*bread\b/gi, replacement: 'artisan bread, blistered crust, open crumb, flour dusting', severity: 0, tags: ['bread'] },
    { pattern: /\bbrioche\b/gi, replacement: 'brioche bun, enriched dough, glossy egg wash, buttery crumb', severity: 0, tags: ['bread'] },
    { pattern: /\bsourdough\b/gi, replacement: 'sourdough loaf, tangy aroma, irregular holes, thick crust', severity: 0, tags: ['bread'] },
    { pattern: /\bpizza\b/gi, replacement: 'pizza with leopard-spotted crust, stretchy cheese pull, balanced toppings', severity: 0, tags: ['bread'] },

    // ——— DESSERT / SWEETS ———
    { pattern: /\bchocolate\s*lava\b/gi, replacement: 'molten chocolate center, glossy ganache, warm steam, powdered sugar', severity: 0, tags: ['dessert'] },
    { pattern: /\bcheesecake\b/gi, replacement: 'cheesecake slice, smooth set, biscuit crumb base, subtle sheen', severity: 0, tags: ['dessert'] },
    { pattern: /\bmacarons?\b/gi, replacement: 'almond macarons, smooth shells, ruffled feet, pastel colors, creamy filling', severity: 0, tags: ['dessert'] },
    { pattern: /\bice\s*cream\b/gi, replacement: 'ice cream scoop, soft ridges, frosty surface, slight melt at edges', severity: 0, tags: ['dessert','cold'] },

    // ——— DRINKS ———
    { pattern: /\bcocktail\b/gi, replacement: 'cocktail glassware, crystal clarity, citrus twist garnish, ice cube clarity', severity: 0, tags: ['drink'] },
    { pattern: /\bmocktail\b/gi, replacement: 'mocktail, fresh fruit purée, aromatic herbs, crushed ice, bright color', severity: 0, tags: ['drink'] },
    { pattern: /\bcoffee\b/gi, replacement: 'coffee crema, aromatic steam, porcelain cup, rich brown tones', severity: 0, tags: ['drink'] },
    { pattern: /\btea\b/gi, replacement: 'tea in glass cup, amber clarity, rising steam, delicate saucer', severity: 0, tags: ['drink'] },

    // ——— SENSORY CUES ———
    { pattern: /\bsteam(?:ing)?\b/gi, replacement: 'visible steam wisps, heat shimmer, fresh-off-heat look', severity: 0, tags: ['cue'] },
    { pattern: /\bsizzle\b/gi, replacement: 'hot sizzle effect, tiny oil pops, active pan energy', severity: 0, tags: ['cue'] },
    { pattern: /\bglaze\b/gi, replacement: 'shiny glaze coat, light-catching highlights, appetizing sheen', severity: 0, tags: ['cue'] }
  ]
});
// >>> END OF BLOCK 17 <<<
/* ================================================================
 * BLOCK 17 — FOOD, CULINARY STYLING & PLATING (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 18 — ACTION SHOTS, CINEMATIC VERBS & VFX CUES (EN)  (START)
 * ID: BLOCK 18
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Convert vague action words into film-ready camera moves and VFX descriptors.
 *   - Boosts dynamic scenes (sports, chase, battle, dance, product hype).
 * INTERNAL NOTES:
 *   - Severity 0 (visual). Combine with BLOCK 6 (camera) + BLOCK 13 (mood/comp).
 *   - Neutral phrasing; no weapon gore here (that can be a gated block later).
 * ================================================================ */
// >>> START OF BLOCK 18 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 18',
  language: 'en',
  category: 'action_cinematic_vfx',
  emoji: ['🎬','🏃','💨','⚡'],
  notes: [
    'Maps verbs to shot design and VFX hints (motion blur, particles, dynamics).',
    'Use to turn “make it intense” into specific cinematic craft language.'
  ],
  entries: [
    // ——— CAMERA MOVES ———
    { pattern: /\btracking\s*shot\b/gi, replacement: 'tracking shot, camera moves parallel to subject, steady lateral motion', severity: 0, tags: ['camera_move'] },
    { pattern: /\bdolly\s*in\b/gi, replacement: 'dolly-in move, forward camera travel, increasing subject scale', severity: 0, tags: ['camera_move'] },
    { pattern: /\bdolly\s*out\b/gi, replacement: 'dolly-out move, backward camera travel, widening context', severity: 0, tags: ['camera_move'] },
    { pattern: /\bcrane\s*shot\b/gi, replacement: 'crane shot, vertical rise and arc, sweeping viewpoint change', severity: 0, tags: ['camera_move'] },
    { pattern: /\bhandheld\b/gi, replacement: 'handheld camera shake, organic micro-jitters, documentary energy', severity: 0, tags: ['camera_move'] },
    { pattern: /\bstedicam\b/gi, replacement: 'stabilized gimbal glide, floating motion, smooth footsteps', severity: 0, tags: ['camera_move'] },
    { pattern: /\bwhip\s*pan\b/gi, replacement: 'whip pan, rapid horizontal motion blur, smear transition, energetic snap', severity: 0, tags: ['camera_move'] },

    // ——— EDITING / RHYTHM ———
    { pattern: /\bfast\s*cut\b/gi, replacement: 'fast-cut editing, short shot lengths, breathless pacing', severity: 0, tags: ['editing'] },
    { pattern: /\bmontage\b/gi, replacement: 'montage sequence, thematic cuts, time compression, rhythmic visuals', severity: 0, tags: ['editing'] },
    { pattern: /\bslow\s*motion\b/gi, replacement: 'slow motion, high frame rate capture, elongated action beats', severity: 0, tags: ['editing'] },
    { pattern: /\btime\s*lapse\b/gi, replacement: 'time-lapse, accelerated frames, compressed chronology, streaky motion', severity: 0, tags: ['editing'] },

    // ——— VFX CUES ———
    { pattern: /\bparticles?\b/gi, replacement: 'particle effects, fine debris, dust motes, directional streaks', severity: 0, tags: ['vfx'] },
    { pattern: /\bshockwave\b/gi, replacement: 'shockwave ripple, circular distortion ring, heat shimmer edges', severity: 0, tags: ['vfx'] },
    { pattern: /\benergy\s*arc\b/gi, replacement: 'electrical energy arcs, branching bolts, bloom glow', severity: 0, tags: ['vfx'] },
    { pattern: /\bglitch\s*effect\b/gi, replacement: 'digital glitch, chromatic offset, slice displacement, scanline tear', severity: 0, tags: ['vfx'] },
    { pattern: /\blens\s*flare\b/gi, replacement: 'anamorphic lens flare streaks, specular artifacts, highlight blooms', severity: 0, tags: ['vfx'] },

    // ——— SPORTS / MOTION ———
    { pattern: /\bsprint\b/gi, replacement: 'full sprint, forward lean, pumping arms, motion blur trails, shoe kick-up', severity: 0, tags: ['sport'] },
    { pattern: /\bslam\s*dunk\b/gi, replacement: 'basketball slam dunk, airborne extension, rim contact, crowd energy', severity: 0, tags: ['sport'] },
    { pattern: /\bpower\s*lift\b/gi, replacement: 'weightlifting power lift, bar flex, chalk dust burst, strain expression', severity: 0, tags: ['sport'] },
    { pattern: /\bfree\s*climb\b/gi, replacement: 'free climb, chalked hands, tight grip, rock face texture, drop-off depth', severity: 0, tags: ['sport'] },

    // ——— CHASE / IMPACT ———
    { pattern: /\bcar\s*chase\b/gi, replacement: 'car chase sequence, tight turns, tire smoke, close gaps, dynamic camera', severity: 0, tags: ['action'] },
    { pattern: /\bnear\s*miss\b/gi, replacement: 'near-miss pass, hairline clearance, adrenaline tension, sound whoosh', severity: 0, tags: ['action'] },
    { pattern: /\bhard\s*brake\b/gi, replacement: 'hard brake, nose-dive suspension, skid marks, ABS chatter feel', severity: 0, tags: ['action'] },
    { pattern: /\bexplosive\s*entry\b/gi, replacement: 'explosive entry, door burst, debris spray, light bloom, smoke billow', severity: 0, tags: ['action'] },

    // ——— PRODUCT HYPE / REVEAL ———
    { pattern: /\bhero\s*shot\b/gi, replacement: 'product hero shot, centered framing, dramatic rim light, clean backdrop', severity: 0, tags: ['product'] },
    { pattern: /\breveal\b/gi, replacement: 'reveal moment, curtain lift or light sweep, ramp-up music cue feel', severity: 0, tags: ['product'] },
    { pattern: /\bspin\s*reel\b/gi, replacement: '360 spin, smooth rotation, specular sweep, detail callouts', severity: 0, tags: ['product'] }
  ]
});
// >>> END OF BLOCK 18 <<<
/* ================================================================
 * BLOCK 18 — ACTION SHOTS, CINEMATIC VERBS & VFX CUES (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 19 — CORE UTILS, COMPAT SHIMS, SCORING & SANITIZE (START)
 * ID: BLOCK 19
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Unify globals so every session keeps working (PF_PACKS ↔ PF_PICTURE.packs).
 *   - Provide scoring, SFW↔NSFW slider mapping, and a single sanitize() entrypoint.
 *   - Keep everything append-only: do not edit prior blocks.
 * INTERNAL NOTES:
 *   - This block introduces no content mappings; it wires behavior.
 *   - Works with: BLOCK 1 bootstrap, BLOCK 10 sanitizeByLang, and all mapping packs.
 * ================================================================ */
// >>> START OF BLOCK 19 CODE <<<
(function (global) {
  // ---------- COMPAT SHIMS ----------
  // Core object homes
  const G = (global.PF_PICTURE = global.PF_PICTURE || {});
  // Single source of truth for packs
  G.packs = Array.isArray(G.packs) ? G.packs : [];
  // Compat alias so all later blocks can safely push
  if (!global.PF_PACKS) global.PF_PACKS = G.packs;

  // If any earlier block used PF_PACKS, ensure it points at G.packs
  if (global.PF_PACKS !== G.packs) {
    try {
      // Merge any stray items and rebind
      const merged = Array.from(new Set([...(G.packs || []), ...(global.PF_PACKS || [])]));
      G.packs.length = 0; // reset
      for (const p of merged) G.packs.push(p);
      global.PF_PACKS = G.packs;
    } catch (_) {
      global.PF_PACKS = G.packs;
    }
  }

  // ---------- SEVERITY SCORING ----------
  // Compute a lightweight "adultness/intensity" score for a string after replacements.
  function scoreText(text) {
    let score = 0;
    // Heuristic: sum entry severities if their replacement appeared
    for (const pack of G.packs) {
      if (!pack || !Array.isArray(pack.entries)) continue;
      for (const e of pack.entries) {
        // cheap check: if replacement string is present, consider it contributed.
        if (!e || typeof e.replacement !== 'string' || typeof e.severity !== 'number') continue;
        if (e.replacement && text.toLowerCase().includes(String(e.replacement).toLowerCase())) {
          score += Math.max(0, Math.min(5, e.severity));
        }
      }
    }
    return score;
  }

  // Map a numeric score to slider 0..100 (0=SFW, 100=max NSFW).
  function mapScoreToSlider(score) {
    // Piecewise ease: faster rise after mid.
    const clamped = Math.max(0, Math.min(200, score)); // prevent runaway
    const x = clamped / 200; // normalize 0..1
    const eased = x < 0.5 ? (x * 2) ** 1.2 * 0.5 : (0.5 + ((x - 0.5) * 2) ** 1.8 * 0.5);
    return Math.round(eased * 100);
  }

  // ---------- UNIFIED SANITIZE ----------
  // Options: { lang='en', direction='clean'|'explicit', allowExplicit=false }
  function sanitize(text, opts = {}) {
    const { lang = 'en', direction = 'clean', allowExplicit = false } = opts;

    // Prefer language-aware pipeline if available (BLOCK 10)
    const CORE = global.PF_CORE || {};
    if (typeof CORE.sanitizeByLang === 'function') {
      const out = CORE.sanitizeByLang(text, lang, { direction, allowExplicit });
      return {
        output: out,
        score: scoreText(out),
        slider: mapScoreToSlider(scoreText(out)),
        meta: { lang, direction, allowExplicit }
      };
    }

    // Fallback: run all non-explicit packs, then optional explicit packs
    let out = String(text || '');
    for (const pack of G.packs) {
      if (!pack || /BLOCK\s+\d+a$/i.test(pack.block_id)) continue;
      for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
    }
    if (direction === 'explicit' && allowExplicit) {
      for (const pack of G.packs) {
        if (!pack || !/BLOCK\s+\d+a$/i.test(pack.block_id)) continue;
        for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
      }
    }
    const score = scoreText(out);
    return { output: out, score, slider: mapScoreToSlider(score), meta: { lang, direction, allowExplicit } };
  }

  // Export helpers
  G.utils = G.utils || {};
  G.utils.scoreText = scoreText;
  G.utils.mapScoreToSlider = mapScoreToSlider;
  G.sanitize = sanitize;

  // Friendly globals for the site
  global.PF_SANITIZE = sanitize;
  global.PF_SCORE = scoreText;
  global.PF_SLIDER = mapScoreToSlider;

  // Auto-register with any PF host object
  if (typeof global.PF !== 'undefined') {
    global.PF.sanitize = sanitize;
    global.PF.score = scoreText;
    global.PF.slider = mapScoreToSlider;
  }
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 19 <<<
/* ================================================================
 * BLOCK 19 — CORE UTILS, COMPAT SHIMS, SCORING & SANITIZE (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 20 — PROMPT SCAFFOLDS & EMPHASIS (START)
 * ID: BLOCK 20
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Compose model-friendly prompts from slots: subject, style, camera, env, mood, color, render.
 *   - Add emphasis weighting and keyword prioritization (no backend required).
 * INTERNAL NOTES:
 *   - Scaffold is additive; does not overwrite user text. Use with sanitize() first.
 *   - Emphasis markers: **strong**, *soft*, [detail], {focus} → converted to weight tokens "(...:w)" style.
 * ================================================================ */
// >>> START OF BLOCK 20 CODE <<<
(function (global) {
  const G = (global.PF_PICTURE = global.PF_PICTURE || {});
  const CORE = (global.PF_CORE = global.PF_CORE || {});
  const packs = (global.PF_PACKS = global.PF_PACKS || G.packs || []);

  // Simple emphasis parser → "(token:weight)" style strings
  function emphasize(text) {
    if (!text) return '';
    let t = String(text);

    // Strong emphasis: **bold** → (bold:1.2)
    t = t.replace(/\*\*([^*]+)\*\*/g, '($1:1.2)');
    // Soft emphasis: *em* → (em:1.05)
    t = t.replace(/\*([^*]+)\*/g, '($1:1.05)');
    // Detail brackets: [detail] → (detail:1.15)
    t = t.replace(/\[([^\]]+)\]/g, '($1:1.15)');
    // Focus braces: {focus} → (focus:1.35)
    t = t.replace(/\{([^}]+)\}/g, '($1:1.35)');

    // Collapse extra spaces
    return t.replace(/\s{2,}/g, ' ').trim();
  }

  // Slot-based prompt composer
  // slots = { subject, action, style, camera, environment, mood, color, render, extras[] }
  function compose(slots = {}, opts = {}) {
    const order = opts.order || [
      'subject', 'action', 'environment', 'camera', 'mood', 'color', 'style', 'render', 'extras'
    ];

    // Build parts
    const parts = [];
    for (const key of order) {
      const val = slots[key];
      if (!val) continue;
      if (Array.isArray(val)) {
        const joined = val.map(v => emphasize(v)).filter(Boolean).join(', ');
        if (joined) parts.push(joined);
      } else {
        const s = emphasize(val);
        if (s) parts.push(s);
      }
    }

    // Clean commas/spaces
    const raw = parts.join(', ').replace(/\s*,\s*,/g, ', ').trim().replace(/,\s*$/, '');
    return raw;
  }

  // Keyword prioritization: move highest-weight tokens forward
  function prioritize(prompt) {
    if (!prompt) return '';
    const tokens = prompt.split(/,\s*/g);
    // Simple heuristic: any "(...:w)" with w>=1.2 bubbles up
    tokens.sort((a, b) => {
      const wa = parseFloat((a.match(/:(\d+(?:\.\d+)?)\)/) || [])[1] || '1.0');
      const wb = parseFloat((b.match(/:(\d+(?:\.\d+)?)\)/) || [])[1] || '1.0');
      return wb - wa;
    });
    return tokens.join(', ');
  }

  // Public API: sanitize → compose → prioritize
  // api(text, slots, opts = {lang, direction, allowExplicit} )
  function craft(text, slots = {}, opts = {}) {
    const s = (global.PF_SANITIZE || ((t) => ({ output: t, score: 0, slider: 0 })))(text, opts);
    const base = s && s.output ? s.output : String(text || '');
    const composed = compose(slots, opts);
    const merged = [base, composed].filter(Boolean).join(', ').replace(/\s+,/g, ',').trim();
    const prioritized = prioritize(merged);
    return {
      prompt: prioritized,
      meta: {
        sanitize: s,
        tokens: prioritized.split(/,\s*/g).length
      }
    };
  }

  // Export
  CORE.emphasize = emphasize;
  CORE.compose = compose;
  CORE.prioritize = prioritize;
  CORE.craft = craft;

  // Friendly globals
  global.PF_EMPHASIZE = emphasize;
  global.PF_COMPOSE = compose;
  global.PF_PRIORITIZE = prioritize;
  global.PF_CRAFT = craft;
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 20 <<<
/* ================================================================
 * BLOCK 20 — PROMPT SCAFFOLDS & EMPHASIS (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 21 — ENVIRONMENTS, LOCATIONS & WORLD-BUILDING (EN) (START)
 * ID: BLOCK 21
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Cover natural + man-made locations: cities, ruins, interiors, planetscapes.
 *   - Provides spatial + atmospheric cues for generative models.
 * INTERNAL NOTES:
 *   - Severity 0 (neutral). Works with BLOCK 13 (color/comp) + BLOCK 6 (camera).
 * ================================================================ */
// >>> START OF BLOCK 21 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 21',
  language: 'en',
  category: 'environments_worldbuilding',
  emoji: ['🏙️','🏞️','🏰','🌌'],
  notes: [
    'Describe climate, architecture, density, time-of-day, and vibe.',
    'Fantasy + sci-fi environments included, brand-free.'
  ],
  entries: [
    // ——— URBAN ———
    { pattern: /\bneon\s*city\b/gi, replacement: 'dense cyberpunk cityscape, neon signage glow, rainy pavement reflections', severity: 0, tags: ['urban','cyberpunk'] },
    { pattern: /\bmedieval\s*town\b/gi, replacement: 'stone-paved medieval village, timber-framed houses, lantern-lit streets', severity: 0, tags: ['urban','historic'] },
    { pattern: /\bfuturistic\s*megacity\b/gi, replacement: 'towering megacity, massive arcologies, hover traffic lanes, layered skybridges', severity: 0, tags: ['urban','futuristic'] },
    { pattern: /\bdesert\s*outpost\b/gi, replacement: 'desert outpost, sandstone walls, sun-bleached fabric awnings, windblown dust', severity: 0, tags: ['remote','desert'] },

    // ——— INTERIORS ———
    { pattern: /\bpalace\s*hall\b/gi, replacement: 'grand palace hall, marble floors, vaulted ceilings, chandeliers', severity: 0, tags: ['interior'] },
    { pattern: /\bindustrial\s*warehouse\b/gi, replacement: 'abandoned warehouse interior, rusted beams, broken windows, scattered crates', severity: 0, tags: ['interior'] },
    { pattern: /\blaboratory\b/gi, replacement: 'sterile sci-fi laboratory, white panels, glass enclosures, glowing instruments', severity: 0, tags: ['interior','sci-fi'] },
    { pattern: /\bthrone\s*room\b/gi, replacement: 'throne room interior, long carpeted aisle, ornate throne, banners', severity: 0, tags: ['interior','royal'] },

    // ——— NATURAL ———
    { pattern: /\bmystic\s*forest\b/gi, replacement: 'enchanted forest, glowing mushrooms, misty atmosphere, ancient trees', severity: 0, tags: ['nature','fantasy'] },
    { pattern: /\bvolcanic\s*plain\b/gi, replacement: 'volcanic landscape, cracked basalt ground, glowing lava rivers, heat shimmer', severity: 0, tags: ['nature'] },
    { pattern: /\btundra\b/gi, replacement: 'tundra expanse, permafrost soil, moss patches, reindeer tracks', severity: 0, tags: ['nature','cold'] },
    { pattern: /\bdeep\s*ocean\b/gi, replacement: 'deep ocean trench, bioluminescent creatures, low visibility, shafts of light', severity: 0, tags: ['nature','marine'] },

    // ——— OFF-WORLD ———
    { pattern: /\balien\s*planet\b/gi, replacement: 'alien planet surface, twin suns, exotic flora, strange rock spires', severity: 0, tags: ['planet','sci-fi'] },
    { pattern: /\bspace\s*station\b/gi, replacement: 'orbital space station, docking ring, rotating habitat wheel, viewport stars', severity: 0, tags: ['space'] },
    { pattern: /\bderelict\s*ship\b/gi, replacement: 'derelict starship interior, flickering lights, floating debris, eerie silence', severity: 0, tags: ['space','horror'] },
    { pattern: /\blava\s*planet\b/gi, replacement: 'molten world surface, lava seas, volcanic lightning, ash clouds', severity: 0, tags: ['planet','extreme'] }
  ]
});
// >>> END OF BLOCK 21 <<<
/* ================================================================
 * BLOCK 21 — ENVIRONMENTS, LOCATIONS & WORLD-BUILDING (EN) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 22 — STORYBEATS, THEMES & GENRE TOKENS (EN) (START)
 * ID: BLOCK 22
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Give models narrative direction: themes, genres, tone words.
 *   - Help users build cohesive prompts with emotional or plot arcs.
 * INTERNAL NOTES:
 *   - Severity 0 (abstract concepts). Safe for any slider level.
 * ================================================================ */
// >>> START OF BLOCK 22 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 22',
  language: 'en',
  category: 'story_genre_tone',
  emoji: ['📚','🎭','🧩','🕯️'],
  notes: [
    'Genre tokens encourage style-appropriate framing.',
    'Themes and moods stack well with BLOCK 13 (color/mood).'
  ],
  entries: [
    // ——— GENRES ———
    { pattern: /\bnoir\b/gi, replacement: 'film noir tone, moody lighting, hard shadows, detective vibe', severity: 0, tags: ['genre'] },
    { pattern: /\bfantasy\b/gi, replacement: 'fantasy genre tone, mythical setting, magic motifs, heroic stakes', severity: 0, tags: ['genre'] },
    { pattern: /\bsci[-\s]*fi\b/gi, replacement: 'science fiction genre tone, futuristic tech motifs, speculative design', severity: 0, tags: ['genre'] },
    { pattern: /\bcyberpunk\b/gi, replacement: 'cyberpunk genre tone, rain-soaked streets, neon glow, dystopian themes', severity: 0, tags: ['genre'] },
    { pattern: /\bpost[-\s]*apocalyptic\b/gi, replacement: 'post-apocalyptic world, decayed ruins, overgrown cities, survival tone', severity: 0, tags: ['genre'] },
    { pattern: /\bromance\b/gi, replacement: 'romantic theme, soft lighting, warm hues, intimate framing', severity: 0, tags: ['genre'] },
    { pattern: /\bhorror\b/gi, replacement: 'horror theme, eerie lighting, unsettling mood, suspense build-up', severity: 0, tags: ['genre'] },
    { pattern: /\bcomedy\b/gi, replacement: 'comedic tone, exaggerated expressions, bright colors, playful framing', severity: 0, tags: ['genre'] },

    // ——— THEMES / PLOT ———
    { pattern: /\bcoming[-\s]*of[-\s]*age\b/gi, replacement: 'coming-of-age theme, character growth, self-discovery arc', severity: 0, tags: ['theme'] },
    { pattern: /\bredemption\b/gi, replacement: 'redemption arc, character atonement, moral struggle, hopeful resolution', severity: 0, tags: ['theme'] },
    { pattern: /\btragedy\b/gi, replacement: 'tragic theme, downfall arc, emotional catharsis, solemn tone', severity: 0, tags: ['theme'] },
    { pattern: /\bquest\b/gi, replacement: 'quest narrative, journey motif, obstacles, companions, end goal', severity: 0, tags: ['theme'] },
    { pattern: /\brevenge\b/gi, replacement: 'revenge theme, burning motivation, high tension, justice pursuit', severity: 0, tags: ['theme'] },

    // ——— MOOD INTENSIFIERS ———
    { pattern: /\bepic\s*finale\b/gi, replacement: 'epic finale climax, orchestral swell, wide shot, cathartic release', severity: 0, tags: ['climax'] },
    { pattern: /\bmelancholy\b/gi, replacement: 'melancholy tone, subdued colors, slow pacing, reflective mood', severity: 0, tags: ['tone'] },
    { pattern: /\btriumphant\b/gi, replacement: 'triumphant tone, major chords, upward camera tilt, victorious pose', severity: 0, tags: ['tone'] },
    { pattern: /\bsuspenseful\b/gi, replacement: 'suspenseful build, ticking clock, tight framing, rising tension', severity: 0, tags: ['tone'] },
    { pattern: /\bwholesome\b/gi, replacement: 'wholesome tone, soft glow, warm palette, gentle pacing', severity: 0, tags: ['tone'] }
  ]
});
// >>> END OF BLOCK 22 <<<
/* ================================================================
 * BLOCK 22 — STORYBEATS, THEMES & GENRE TOKENS (EN) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 23 — CONSENT & SAFETY GUARDRAILS (HARD FILTERS) (START)
 * ID: BLOCK 23
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Absolute guardrails that neutralize or block illegal/non-consensual concepts.
 *   - Runs BEFORE any directional packs. Brand- and model-agnostic.
 * INTERNAL NOTES:
 *   - Adult-only policy enforcement: removes/neutralizes minors, incest, non-consent, bestiality, etc.
 *   - Severity 5 for hard stops; these push slider high to force SFW fallback upstream if you want.
 * ================================================================ */
// >>> START OF BLOCK 23 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 23',
  language: 'any',
  category: 'safety_guardrails',
  emoji: ['🛑','🧯','🧰'],
  notes: [
    'Hard filters: neutralize illegal or non-consensual content before anything else.',
    'Keep this pack minimal, deterministic, and auditable.'
  ],
  entries: [
    // ——— MINORS / AGE ———
    { pattern: /\b(underage|minor|child|children|teen(?:ager)?|preteen|youngster|lolita|jailbait)\b/gi,
      replacement: 'adult', severity: 5, tags: ['safety','age'] },

    // ——— NON-CONSENT ———
    { pattern: /\b(non[-\s]?consensual|without\s*consent|coerced|forced)\b/gi,
      replacement: 'consensual', severity: 5, tags: ['safety','consent'] },

    // ——— INCEST / FAMILIAL ———
    { pattern: /\b(step\s*(mom|mother|dad|father|sister|brother)|mom|mother|dad|father|sister|brother)\b(?=.*\b(sex|sexual|intimate|explicit)\b)/gi,
      replacement: 'unrelated adult', severity: 5, tags: ['safety','incest'] },

    // ——— BESTIALITY ———
    { pattern: /\b(animal|beast|dog|horse|cat|goat|wolf|pet)\b(?=.*\b(sex|sexual|explicit)\b)/gi,
      replacement: 'adult human partner', severity: 5, tags: ['safety','bestiality'] },

    // ——— EXTREME HARM (keep SFW) ———
    { pattern: /\b(snuff|mutilation|torture|gore)\b/gi,
      replacement: 'safe consensual context', severity: 5, tags: ['safety','harm'] }
  ]
});
// >>> END OF BLOCK 23 <<<
/* ================================================================
 * BLOCK 23 — CONSENT & SAFETY GUARDRAILS (HARD FILTERS) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 24 — NSFW DIRECTIONAL API (HOOKS, NO LEXICON) (START)
 * ID: BLOCK 24
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide a clean API to *load* explicit-direction packs at runtime from your own files/URLs.
 *   - Keeps this repo safe while letting you plug in private NSFW lexicons client-side.
 * INTERNAL NOTES:
 *   - This block defines loaders, validators, and a deterministic pipeline ordering:
 *       1) BLOCK 23 (guardrails) → 2) SFW packs → 3) User-loaded NSFW packs (if allowExplicit).
 *   - Example shows schema to follow; entries array intentionally empty here.
 * ================================================================ */
// >>> START OF BLOCK 24 CODE <<<
(function (global) {
  const G = (global.PF_PICTURE = global.PF_PICTURE || {});
  const PACKS = (global.PF_PACKS = global.PF_PACKS || G.packs || []);

  // Minimal schema validator for external packs
  function validatePack(pack) {
    if (!pack || typeof pack !== 'object') return { ok: false, reason: 'not an object' };
    if (!/^[A-Z0-9\s]+(a)?$/i.test(pack.block_id || '')) return { ok: false, reason: 'bad block_id' };
    if (!Array.isArray(pack.entries)) return { ok: false, reason: 'entries must be array' };
    for (const e of pack.entries) {
      if (!e || !(e.pattern instanceof RegExp) || typeof e.replacement !== 'string') {
        return { ok: false, reason: 'bad entry pattern/replacement' };
      }
      if (typeof e.severity !== 'number') e.severity = 4; // default hot
      if (!Array.isArray(e.tags)) e.tags = [];
    }
    return { ok: true };
  }

  // Load JSON-like pack from URL (expects {block_id, language, category, entries[]} and entries.pattern as string regex)
  async function loadPackFromURL(url, { gated = true } = {}) {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    // Convert string patterns to RegExp
    if (Array.isArray(data.entries)) {
      data.entries = data.entries.map(e => {
        if (e && typeof e.pattern === 'string') {
          // default to global+case-insensitive
          const rx = new RegExp(e.pattern, e.flags || 'gi');
          return { ...e, pattern: rx };
        }
        return e;
      });
    }
    if (gated && !/a$/i.test(String(data.block_id))) data.block_id = `${data.block_id}a`;
    data.gated = gated;
    const v = validatePack(data);
    if (!v.ok) throw new Error(`Invalid pack: ${v.reason}`);
    PACKS.push(data);
    return data;
  }

  // Deterministic run: guardrails → SFW → user NSFW
  async function runWithUserNSFW(text, { lang = 'en', allowExplicit = false, direction = 'clean', userPacks = [] } = {}) {
    let out = String(text || '');

    // 1) Guardrails (BLOCK 23) only
    for (const pack of PACKS) {
      if (!pack || String(pack.block_id) !== 'BLOCK 23') continue;
      for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
    }

    // 2) SFW packs (all non-...a packs except 23)
    for (const pack of PACKS) {
      if (!pack || /a$/i.test(String(pack.block_id)) || String(pack.block_id) === 'BLOCK 23') continue;
      if (pack.language && pack.language !== 'any' && pack.language.toLowerCase() !== lang.toLowerCase()) continue;
      for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
    }

    // 3) Optional user NSFW packs (gated, *your* content)
    if (allowExplicit && direction === 'explicit') {
      for (const pack of PACKS) {
        if (!pack || !/a$/i.test(String(pack.block_id))) continue;
        if (pack.language && pack.language !== 'any' && pack.language.toLowerCase() !== lang.toLowerCase()) continue;
        for (const e of (pack.entries || [])) out = out.replace(e.pattern, e.replacement);
      }
      // Dynamic, per-call packs (not permanently installed)
      for (const up of (userPacks || [])) {
        const v = validatePack(up);
        if (!v.ok) continue;
        for (const e of (up.entries || [])) out = out.replace(e.pattern, e.replacement);
      }
    }

    return out;
  }

  // Export
  G.NSFW = G.NSFW || {};
  G.NSFW.validatePack = validatePack;
  G.NSFW.loadPackFromURL = loadPackFromURL;
  G.NSFW.runWithUserNSFW = runWithUserNSFW;

  // Friendly globals
  global.PF_LOAD_NSFW = loadPackFromURL;
  global.PF_RUN_NSFW = runWithUserNSFW;
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 24 CODE <<<
/* ================================================================
 * BLOCK 24 — NSFW DIRECTIONAL API (HOOKS, NO LEXICON) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 25 — QUALITY CONTROL: NEGATIVES & ARTIFACT FIXES (START)
 * ID: BLOCK 25
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Add negative/cleanup tokens to reduce common gen artifacts (hands, text, banding, etc.).
 *   - Non-destructive: maps vague “avoid X” requests to model-usable negatives.
 * INTERNAL NOTES:
 *   - Severity 0. These strings are typically appended to negative prompt fields in UIs.
 * ================================================================ */
// >>> START OF BLOCK 25 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 25',
  language: 'en',
  category: 'quality_negatives',
  emoji: ['🧹','🪄','🧪'],
  notes: [
    'Use with PF_CORE.craft(): add entries to the "extras" slot or a dedicated negative field in your UI.',
    'Brand/model agnostic fix-ups.'
  ],
  entries: [
    { pattern: /\b(clean\s*render|no\s*noise)\b/gi, replacement: 'clean edges, reduced sensor noise, denoised background', severity: 0, tags: ['cleanup'] },
    { pattern: /\b(no\s*text|remove\s*text)\b/gi, replacement: 'no embedded text, avoid watermarks, plain surfaces', severity: 0, tags: ['cleanup'] },
    { pattern: /\b(no\s*banding)\b/gi, replacement: 'avoid banding, smooth gradients, high bit-depth feel', severity: 0, tags: ['cleanup'] },
    { pattern: /\b(no\s*artifacts?)\b/gi, replacement: 'avoid compression artifacts, avoid glitch seams', severity: 0, tags: ['cleanup'] },
    { pattern: /\b(fix\s*hands|hands\s*correct)\b/gi, replacement: 'accurate hand anatomy, five distinct fingers, correct joints', severity: 0, tags: ['anatomy'] },
    { pattern: /\b(fix\s*eyes|eyes\s*correct)\b/gi, replacement: 'symmetrical eyes, correct gaze alignment, natural catchlights', severity: 0, tags: ['anatomy'] },
    { pattern: /\b(no\s*distortion)\b/gi, replacement: 'avoid lens distortion, natural proportions, undistorted edges', severity: 0, tags: ['optics'] },
    { pattern: /\b(no\s*clutter)\b/gi, replacement: 'clean background, minimal props, strong subject isolation', severity: 0, tags: ['composition'] }
  ]
});
// >>> END OF BLOCK 25 <<<
/* ================================================================
 * BLOCK 25 — QUALITY CONTROL: NEGATIVES & ARTIFACT FIXES (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 26 — USER DICTIONARY, SESSION LEARNING & LOCAL CACHE (START)
 * ID: BLOCK 26
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Let users add slang/synonyms during a session and persist them (no backend).
 *   - Cached in localStorage; applied early in pipeline to “teach” the file new terms.
 * INTERNAL NOTES:
 *   - Non-NSFW by default; you can choose to put explicit items in external NSFW packs via BLOCK 24.
 *   - Namespaced under PF_USER_DICT to avoid collisions.
 * ================================================================ */
// >>> START OF BLOCK 26 CODE <<<
(function (global) {
  const KEY = 'PF_USER_DICT_V1';
  const PACK_ID = 'BLOCK 26 (user dict)';

  // Load cached entries
  function loadCache() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return [];
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  }

  // Save cached entries
  function saveCache(entries) {
    try { localStorage.setItem(KEY, JSON.stringify(entries || [])); } catch {}
  }

  // Build or update the user dictionary pack
  function ensurePack() {
    global.PF_PACKS = global.PF_PACKS || [];
    let pack = global.PF_PACKS.find(p => p && p.block_id === PACK_ID);
    if (!pack) {
      pack = { block_id: PACK_ID, language: 'any', category: 'user_dict', emoji: ['📝'], notes: ['Session/user-added synonyms'], entries: [] };
      global.PF_PACKS.unshift(pack); // run early
    }
    return pack;
  }

  // Public API: add(termRegexString, replacement, {severity=1, tags=[]})
  function add(term, replacement, { severity = 1, tags = [] } = {}) {
    const pack = ensurePack();
    const rx = new RegExp(term, 'gi');
    pack.entries.push({ pattern: rx, replacement, severity, tags });
    const cache = loadCache();
    cache.push({ term, replacement, severity, tags });
    saveCache(cache);
    return { ok: true, size: pack.entries.length };
  }

  // Public API: hydrate from cache on load
  function hydrate() {
    const cached = loadCache();
    if (!cached.length) return 0;
    const pack = ensurePack();
    for (const c of cached) {
      try {
        const rx = new RegExp(c.term, 'gi');
        pack.entries.push({ pattern: rx, replacement: c.replacement, severity: c.severity ?? 1, tags: c.tags ?? [] });
      } catch {}
    }
    return pack.entries.length;
  }

  // Autoload
  try { hydrate(); } catch {}

  // Export
  global.PF_USER_DICT = { add, hydrate, KEY };
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 26 CODE <<<
/* ================================================================
 * BLOCK 26 — USER DICTIONARY, SESSION LEARNING & LOCAL CACHE (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 27 — PROFANITY & SEXUAL SLANG → NEUTRAL/CLINICAL (EN) (START)
 * ID: BLOCK 27
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Massive profanity/slang neutralizer for SFW output.
 *   - Maps general swears → toned phrasing; sexual slang → clinical anatomy.
 * INTERNAL NOTES:
 *   - Severity tuned (2–4) to help slider. This is SFW direction only.
 *   - Directional escalation (back to explicit) belongs in gated "...a" blocks you load via BLOCK 24.
 *   - Keep adding terms over time; append-only.
 * ================================================================ */
// >>> START OF BLOCK 27 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 27',
  language: 'en',
  category: 'profanity_to_neutral',
  emoji: ['🧼','🗣️'],
  notes: [
    'General profanity → toned sentiment words.',
    'Sexual slang → clinical anatomy terms (adult subjects only).',
    'Hate slurs are collapsed to a generic notice (no repetition).'
  ],
  entries: [
    // ——— GENERAL PROFANITY → TONED WORDS ———
    { pattern: /\bfuck(?:ing|er|ed)?\b/gi, replacement: 'intense', severity: 3, tags: ['profanity'] },
    { pattern: /\bshit(?:ty)?\b/gi, replacement: 'mess', severity: 2, tags: ['profanity'] },
    { pattern: /\bdamn(?:ed)?\b/gi, replacement: 'very', severity: 1, tags: ['profanity'] },
    { pattern: /\bhell\b/gi, replacement: 'a lot', severity: 1, tags: ['profanity'] },
    { pattern: /\basshole\b/gi, replacement: 'rude person', severity: 3, tags: ['insult'] },
    { pattern: /\bbastard\b/gi, replacement: 'antagonist', severity: 2, tags: ['insult'] },
    { pattern: /\bbi+ch(es)?\b/gi, replacement: 'insult', severity: 2, tags: ['insult'] },
    { pattern: /\bdickhead\b/gi, replacement: 'rude person', severity: 3, tags: ['insult'] },
    { pattern: /\bprick\b/gi, replacement: 'rude person', severity: 2, tags: ['insult'] },
    { pattern: /\bdouche(?:bag)?\b/gi, replacement: 'rude person', severity: 2, tags: ['insult'] },
    { pattern: /\bpiss(?:ed|ing)?\b/gi, replacement: 'angry', severity: 1, tags: ['tone'] },
    { pattern: /\bwtf\b/gi, replacement: 'what is going on', severity: 1, tags: ['tone'] },
    { pattern: /\baf\b/gi, replacement: 'very', severity: 1, tags: ['tone'] },

    // ——— SEXUAL SLANG (GENERIC) → CLINICAL ———
    { pattern: /\btits?\b/gi, replacement: 'breasts', severity: 3, tags: ['anatomy','female'] },
    { pattern: /\bboobs?\b/gi, replacement: 'breasts', severity: 3, tags: ['anatomy','female'] },
    { pattern: /\bnipples?\b/gi, replacement: 'nipples', severity: 2, tags: ['anatomy','neutral'] },
    { pattern: /\b(areolae?|areolas?)\b/gi, replacement: 'areolae', severity: 2, tags: ['anatomy','neutral'] },

    { pattern: /\bpussy|pus+y\b/gi, replacement: 'vagina', severity: 4, tags: ['anatomy','female'] },
    { pattern: /\bcunt\b/gi, replacement: 'vagina', severity: 4, tags: ['anatomy','female'] },
    { pattern: /\bvajayjay\b/gi, replacement: 'vagina', severity: 3, tags: ['anatomy','female'] },
    { pattern: /\bslit\b/gi, replacement: 'vulva', severity: 3, tags: ['anatomy','female'] },
    { pattern: /\blabia\b/gi, replacement: 'labia', severity: 2, tags: ['anatomy','female'] },
    { pattern: /\bclit(?:oris)?\b/gi, replacement: 'clitoris', severity: 3, tags: ['anatomy','female'] },

    { pattern: /\bass|butt(?:ocks)?\b/gi, replacement: 'buttocks', severity: 2, tags: ['anatomy','neutral'] },
    { pattern: /\banus|butthole|asshole\b/gi, replacement: 'anus', severity: 3, tags: ['anatomy','neutral'] },

    { pattern: /\bdick|cock|shaft\b/gi, replacement: 'penis', severity: 4, tags: ['anatomy','male'] },
    { pattern: /\bpenises\b/gi, replacement: 'penises', severity: 2, tags: ['anatomy','male'] },
    { pattern: /\bballs|nuts|gonads|sack\b/gi, replacement: 'testicles', severity: 3, tags: ['anatomy','male'] },
    { pattern: /\bhead\b(?=\s*(?:of\s*)?(?:his|the)\s*(?:dick|cock|penis)\b)/gi, replacement: 'glans', severity: 3, tags: ['anatomy','male'] },

    // ——— SEXUAL VERBS (NEUTRALIZE WORDING, KEEP CONSENSUAL) ———
    { pattern: /\bjerk(?:ing)?\s*off\b/gi, replacement: 'masturbating', severity: 3, tags: ['activity'] },
    { pattern: /\bfinger(?:ing)?\b/gi, replacement: 'manual stimulation', severity: 3, tags: ['activity'] },
    { pattern: /\bhandjob\b/gi, replacement: 'manual stimulation', severity: 3, tags: ['activity'] },
    { pattern: /\bblowjob|bj\b/gi, replacement: 'oral stimulation', severity: 3, tags: ['activity'] },
    { pattern: /\btitjob\b/gi, replacement: 'breast-focused stimulation', severity: 3, tags: ['activity'] },
    { pattern: /\brim(?:ming)?\b/gi, replacement: 'anal oral stimulation', severity: 4, tags: ['activity'] },
    { pattern: /\banal\b/gi, replacement: 'anal intercourse (consensual)', severity: 4, tags: ['activity'] },
    { pattern: /\bsex\b/gi, replacement: 'sexual activity (consensual)', severity: 2, tags: ['activity'] },

    // ——— FLUID/AROUSAL WORDS → NEUTRAL ———
    { pattern: /\bcum|jizz|load\b/gi, replacement: 'semen', severity: 4, tags: ['fluid'] },
    { pattern: /\bpre[-\s]*cum\b/gi, replacement: 'pre-ejaculate', severity: 3, tags: ['fluid'] },
    { pattern: /\bsquirt(?:ing)?\b/gi, replacement: 'fluid release', severity: 3, tags: ['fluid'] },
    { pattern: /\bwet\s*spot\b/gi, replacement: 'moist fabric area', severity: 2, tags: ['fluid'] },

    // ——— MISC VULGARITY → NEUTRAL ———
    { pattern: /\bmoan(?:ing)?\b/gi, replacement: 'audible pleasure sounds', severity: 2, tags: ['tone'] },
    { pattern: /\bslut|whore\b/gi, replacement: 'demeaning insult (removed)', severity: 4, tags: ['insult'] },

    // ——— HATE SLURS (DO NOT ECHO) ———
    { pattern: /\b[a-z]*\*?[a-z]*\b(?=.*\bslur\b)/gi, replacement: 'slur (removed)', severity: 5, tags: ['safety'] }
  ]
});
// >>> END OF BLOCK 27 <<<
/* ================================================================
 * BLOCK 27 — PROFANITY & SEXUAL SLANG → NEUTRAL/CLINICAL (EN) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 28 — TONE COHERENCE & NON-SEQUITUR GUARD (START)
 * ID: BLOCK 28
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Reduce vibe clashes and random non-sequiturs inside a single prompt.
 *   - Normalizes mixed tones (sad/cute/epic) and flags surreal collisions unless explicitly asked.
 * INTERNAL NOTES:
 *   - Heuristics only (regex + light rules). Doesn’t censor; it *nudges* to consistent phrasing.
 *   - Use PF_CORE.craft() → then run PF_CORE.prioritize() → then apply this pass for final cleanup.
 * ================================================================ */
// >>> START OF BLOCK 28 CODE <<<
(function (global) {
  function coherencePass(text) {
    let t = String(text || '');

    // If user asked for "surreal" or "absurd", skip guardrails
    const optedSurreal = /\b(surreal|absurd|dreamlike|nonsense|dada)\b/i.test(t);

    // Tone clusters (pick strongest if conflicts)
    const tones = [
      { key: 'melancholy', rx: /\b(sad|melancholy|somber|blue)\b/ig, canon: 'melancholy tone' },
      { key: 'whimsical', rx: /\b(whimsical|playful|cute|quirky)\b/ig, canon: 'whimsical tone' },
      { key: 'epic', rx: /\b(epic|grand|heroic|monumental)\b/ig, canon: 'epic tone' },
      { key: 'romantic', rx: /\b(romantic|tender|intimate|affectionate)\b/ig, canon: 'romantic tone' },
      { key: 'horror', rx: /\b(horror|eerie|creepy|terrifying)\b/ig, canon: 'horror tone' }
    ];
    const hits = [];
    for (const tset of tones) if (tset.rx.test(t)) hits.push(tset);
    if (hits.length > 1 && !optedSurreal) {
      // Keep the earliest tone as the canonical one, remove others’ synonyms
      hits.sort((a, b) => (t.search(a.rx) - t.search(b.rx)));
      const keep = hits[0];
      t = t.replace(keep.rx, keep.canon);
      for (const h of hits.slice(1)) t = t.replace(h.rx, '');
      t = t.replace(/\s{2,}/g, ' ').replace(/,\s*,/g, ',').replace(/,\s*$/,'').trim();
    }

    // Whitelist some “odd” combos if mood says whimsical/absurd/surreal
    if (!optedSurreal) {
      // Simple non-sequitur examples (tweak as needed)
      t = t.replace(/\byellow\s*submarine\b/ig, 'submersible vehicle with whimsical paint');
    }

    // Remove duplicated color/style collisions
    t = t.replace(/\b(purple|red|blue)\s+(of\s+)?(the\s+)?(scales|roses?)\s+listened\b/ig, 'vivid hues accentuating surface detail');

    return t;
  }

  // Export
  global.PF_COHERENCE = coherencePass;
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 28 CODE <<<
/* ================================================================
 * BLOCK 28 — TONE COHERENCE & NON-SEQUITUR GUARD (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 29 — STYLE MIXER & BLEND RATIOS (START)
 * ID: BLOCK 29
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Parse blend requests like "70% watercolor, 30% ink" and generate weighted tokens.
 *   - Keeps stylistic consistency across the prompt.
 * INTERNAL NOTES:
 *   - Works with any style words; doesn’t enforce brand names.
 *   - Output form: "(styleA:0.7), (styleB:0.3)" plus a guidance line.
 * ================================================================ */
// >>> START OF BLOCK 29 CODE <<<
(function (global) {
  const CORE = (global.PF_CORE = global.PF_CORE || {});
  const ratioRX = /(\d{1,3})\s*%\s*([a-z][a-z0-9\s\-]+)/ig;

  function normalizeStyleName(s) {
    return String(s || '').trim().replace(/\s{2,}/g, ' ').toLowerCase();
  }

  function styleBlend(text) {
    const blends = [];
    let m;
    while ((m = ratioRX.exec(text)) !== null) {
      const pct = Math.max(0, Math.min(100, parseInt(m[1], 10))) / 100;
      const name = normalizeStyleName(m[2]);
      blends.push({ name, weight: pct });
    }
    if (!blends.length) return { prompt: '', info: [] };

    // Normalize to 1.0 sum
    const total = blends.reduce((a,b) => a + b.weight, 0) || 1;
    for (const b of blends) b.weight = +(b.weight / total).toFixed(2);

    const tokens = blends.map(b => `(${b.name}:${b.weight})`).join(', ');
    const guide = 'style blend applied';
    return { prompt: `${tokens}, ${guide}`, info: blends };
  }

  CORE.styleBlend = styleBlend;
  global.PF_STYLE_BLEND = styleBlend;
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 29 CODE <<<
/* ================================================================
 * BLOCK 29 — STYLE MIXER & BLEND RATIOS (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 30 — IN-BROWSER PACK TESTER (DEV HARNESS) (START)
 * ID: BLOCK 30
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Tiny dev harness to preview sanitize/compose/coherence without a backend.
 *   - Optional UI hook: call PF_TEST.run({text, slots, opts}) and read the JSON result.
 * INTERNAL NOTES:
 *   - Non-UI by default. You can wire it to a textarea + pre tag in your HTML later.
 * ================================================================ */
// >>> START OF BLOCK 30 CODE <<<
(function (global) {
  const OUT = {};

  function run({ text = '', slots = {}, opts = { lang: 'en', direction: 'clean', allowExplicit: false } } = {}) {
    const sanitize = (global.PF_SANITIZE || ((t)=>({output:t,score:0,slider:0})))(text, opts);
    const composed = (global.PF_CRAFT || (function(){ return { prompt: text, meta:{ tokens: 0, sanitize } }; }))(
      sanitize.output, slots, opts
    );
    const coherence = (global.PF_COHERENCE ? global.PF_COHERENCE(composed.prompt) : composed.prompt);
    const blended = (global.PF_STYLE_BLEND ? global.PF_STYLE_BLEND(coherence) : { prompt: '', info: [] });

    const finalPrompt = [coherence, blended.prompt].filter(Boolean).join(', ').replace(/\s+,/g, ',').trim();

    return {
      input: { text, slots, opts },
      sanitize,
      composed,
      blendedInfo: blended.info || [],
      finalPrompt,
      slider: sanitize.slider
    };
  }

  OUT.run = run;
  global.PF_TEST = OUT;
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 30 CODE <<<
/* ================================================================
 * BLOCK 30 — IN-BROWSER PACK TESTER (DEV HARNESS) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 31 — RANDOMIZER w/ SUBJECT & VIBE LOCK (START)
 * ID: BLOCK 31
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Randomize details WITHOUT breaking the chosen subject/style/tone.
 *   - Uses a semantic seed and “lock masks” (subject, vibe, palette, camera).
 * INTERNAL NOTES:
 *   - Works entirely client-side. No backend needed.
 *   - Call PF_RANDOM.run({baseText, locks, seed, opts}) → returns prompt parts you can merge.
 * ================================================================ */
// >>> START OF BLOCK 31 CODE <<<
(function (global) {
  const CORE = (global.PF_CORE = global.PF_CORE || {});

  // Deterministic PRNG from string seed (xorshift-ish)
  function hash32(s) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }
  function rnd(seed) {
    let x = hash32(String(seed || 'pf'));
    return () => {
      // xorshift32
      x ^= x << 13; x ^= x >>> 17; x ^= x << 5;
      return ((x >>> 0) / 4294967296);
    };
  }

  // Pools (SFW, stackable). More can be appended in future blocks.
  const POOLS = {
    palette: [
      'pastel palette, low saturation, soft values',
      'earthy tones, muted saturation, organic feel',
      'neon palette, high saturation accents on dark base',
      'monochrome palette, single hue family with value steps'
    ],
    camera: [
      '50mm perspective, natural proportions',
      'telephoto compression, shallow depth of field',
      'wide-angle look, environmental context, slight perspective drama',
      'top-down orthographic feel, clean layout'
    ],
    light: [
      'soft daylight window light, gentle falloff',
      'golden hour rim light, warm glow',
      'overcast softbox feel, low contrast shadows',
      'studio key light with subtle fill and hair light'
    ],
    environmentSoftPortrait: [
      'neutral backdrop, seamless paper look',
      'minimal interior, tasteful furniture, negative space',
      'garden setting, soft bokeh foliage',
      'coastal overlook, airy haze, distant horizon'
    ],
    adjectivesTone: [
      'serene tone','romantic tone','whimsical tone','confident tone','elegant tone'
    ]
  };

  // Subject “locks” define allowed pools
  const SUBJECT_LOCKS = {
    portrait_softcore: {
      env: 'environmentSoftPortrait',
      camera: 'camera',
      light: 'light',
      palette: 'palette',
      tone: 'adjectivesTone'
    },
    product: { env: 'environmentSoftPortrait', camera: 'camera', light: 'light', palette: 'palette', tone: [] },
    landscape: { env: 'environmentSoftPortrait', camera: 'camera', light: 'light', palette: 'palette', tone: [] }
    // Add more locks in future blocks
  };

  function pick(n, poolArr, r) {
    const out = [];
    const used = new Set();
    while (out.length < n && poolArr.length > 0) {
      const i = Math.floor(r() * poolArr.length);
      if (used.has(i)) continue;
      used.add(i);
      out.push(poolArr[i]);
    }
    return out;
  }

  // Main
  function run({ baseText = '', locks = { subject: 'portrait_softcore', palette: true, camera: true, light: true, env: true, tone: true }, seed = 'pf', opts = {} } = {}) {
    const r = rnd(seed);
    const def = SUBJECT_LOCKS[locks.subject] || SUBJECT_LOCKS.portrait_softcore;

    const parts = [];
    if (locks.palette && def.palette) parts.push(pick(1, POOLS[def.palette], r)[0]);
    if (locks.camera && def.camera) parts.push(pick(1, POOLS[def.camera], r)[0]);
    if (locks.light  && def.light ) parts.push(pick(1, POOLS[def.light ], r)[0]);
    if (locks.env    && def.env   ) parts.push(pick(1, POOLS[def.env   ], r)[0]);
    if (locks.tone   && def.tone  ) parts.push(pick(1, POOLS[def.tone  ], r)[0]);

    // Coherence: never output school/child contexts (safety + vibe)
    const blacklistRX = /\b(school|classroom|student|child|children|kindergarten|playground)\b/ig;
    const cleaned = parts.join(', ').replace(blacklistRX, 'public area');

    // Optional: pass through coherence pass if available
    const final = (global.PF_COHERENCE ? global.PF_COHERENCE(cleaned) : cleaned);

    return {
      seed,
      subject: locks.subject,
      additions: final,
      note: 'randomized details added with vibe lock; subject and tone preserved'
    };
  }

  global.PF_RANDOM = { run, SUBJECT_LOCKS, POOLS };
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 31 CODE <<<
/* ================================================================
 * BLOCK 31 — RANDOMIZER w/ SUBJECT & VIBE LOCK (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 32 — SUBJECT PROFILES & VIBE PRESETS (START)
 * ID: BLOCK 32
 * DATE: 2025-09-11
 * PURPOSE:
 *   - One-click “profiles” that keep prompts thematically consistent.
 *   - Profiles define slot defaults + allowed ranges; randomizer respects them.
 * INTERNAL NOTES:
 *   - Works with PF_CORE.craft + PF_RANDOM.run. You can extend these presets anytime.
 * ================================================================ */
// >>> START OF BLOCK 32 CODE <<<
(function (global) {
  const CORE = (global.PF_CORE = global.PF_CORE || {});
  const PROFILES = [
    {
      id: 'soft_portrait_romantic',
      label: 'Soft Portrait — Romantic',
      subjectLock: 'portrait_softcore',
      slots: {
        subject: 'adult portrait, flattering angle, gentle expression',
        environment: 'minimal interior, soft textures',
        mood: 'romantic tone',
        color: 'pastel palette'
      }
    },
    {
      id: 'editorial_product_clean',
      label: 'Editorial Product — Clean',
      subjectLock: 'product',
      slots: {
        subject: 'premium product hero',
        environment: 'seamless background, negative space',
        mood: 'confident tone',
        color: 'monochrome palette'
      }
    },
    {
      id: 'cinematic_landscape_epic',
      label: 'Cinematic Landscape — Epic',
      subjectLock: 'landscape',
      slots: {
        subject: 'grand vista, atmospheric perspective',
        environment: 'mountain range or coastal overlook',
        mood: 'epic tone',
        color: 'earthy tones'
      }
    }
  ];

  function getProfile(id) {
    return PROFILES.find(p => p.id === id) || PROFILES[0];
  }

  // Helper to craft + randomize coherently
  function craftWithProfile({ text = '', profileId = 'soft_portrait_romantic', seed = 'pf', lang = 'en', direction = 'clean', allowExplicit = false } = {}) {
    const profile = getProfile(profileId);
    const base = (global.PF_SANITIZE || ((t)=>({output:t})))(text, { lang, direction, allowExplicit });
    const composed = (global.PF_CRAFT || ((t,s)=>({prompt:t})))(base.output, profile.slots, { });
    const rand = (global.PF_RANDOM ? global.PF_RANDOM.run({
      baseText: composed.prompt,
      locks: { subject: profile.subjectLock, palette: true, camera: true, light: true, env: true, tone: true },
      seed
    }) : { additions: '' });

    const merged = [composed.prompt, rand.additions].filter(Boolean).join(', ').replace(/\s+,/g, ',').trim();
    const final = (global.PF_COHERENCE ? global.PF_COHERENCE(merged) : merged);
    return { prompt: final, meta: { profile: profileId, seed } };
  }

  global.PF_PROFILES = { list: () => PROFILES.slice(), get: getProfile, craftWithProfile };
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 32 CODE <<<
/* ================================================================
 * BLOCK 32 — SUBJECT PROFILES & VIBE PRESETS (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 33 — POSES, GESTURES & EXPRESSIONS (SFW) (START)
 * ID: BLOCK 33
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Rich pose/gesture vocabulary for adult portraits and fashion without explicit tokens.
 *   - Helps keep “softcore” portrait vibes consistent and tasteful.
 * INTERNAL NOTES:
 *   - Severity 0–1. Works with BLOCK 12 (appearance) and BLOCK 6 (camera).
 * ================================================================ */
// >>> START OF BLOCK 33 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 33',
  language: 'en',
  category: 'poses_gestures_expressions',
  emoji: ['🧍','🧘','🫰','😊'],
  notes: [
    'Naturalistic posing cues; no explicit acts. Use with subject/vibe locks for coherence.',
    'Gesture tokens are short and stackable.'
  ],
  entries: [
    // ——— STANDING / SITTING ———
    { pattern: /\bstanding\s*pose\b/gi, replacement: 'standing pose, weight on one leg, relaxed shoulders', severity: 0, tags: ['pose'] },
    { pattern: /\bcontrapposto\b/gi, replacement: 'contrapposto stance, hip shift, gentle S-curve', severity: 0, tags: ['pose'] },
    { pattern: /\bseated\b/gi, replacement: 'seated pose, upright posture, legs angled, graceful hands', severity: 0, tags: ['pose'] },
    { pattern: /\breclining\b/gi, replacement: 'reclining pose, supported torso, relaxed limbs', severity: 0, tags: ['pose'] },

    // ——— HANDS / ARMS ———
    { pattern: /\bhands\s*on\s*hips\b/gi, replacement: 'hands on hips, confident posture, open chest', severity: 0, tags: ['gesture'] },
    { pattern: /\barm\s*crossed\b/gi, replacement: 'arms gently crossed, composed stance', severity: 0, tags: ['gesture'] },
    { pattern: /\bhand\s*through\s*hair\b/gi, replacement: 'hand through hair gesture, casual elegance', severity: 0, tags: ['gesture'] },
    { pattern: /\bchin\s*rest\b/gi, replacement: 'hand under chin, thoughtful expression', severity: 0, tags: ['gesture'] },

    // ——— HEAD / EXPRESSION ———
    { pattern: /\bsoft\s*smile\b/gi, replacement: 'soft smile, gentle eye contact, relaxed lips', severity: 0, tags: ['expression'] },
    { pattern: /\bplayful\s*smirk\b/gi, replacement: 'playful smirk, raised brow, teasing gaze', severity: 0, tags: ['expression'] },
    { pattern: /\bserene\s*look\b/gi, replacement: 'serene expression, calm gaze, softened features', severity: 0, tags: ['expression'] },

    // ——— BODY ANGLES / FRAMING ———
    { pattern: /\bthree[-\s]*quarter\s*view\b/gi, replacement: 'three-quarter view, slight turn from camera, flattering jawline', severity: 0, tags: ['angle'] },
    { pattern: /\bprofile\s*view\b/gi, replacement: 'profile view, clean silhouette, nose and chin alignment', severity: 0, tags: ['angle'] },
    { pattern: /\bover\s*shoulder\b/gi, replacement: 'over-the-shoulder look, turned torso, backward glance', severity: 0, tags: ['angle'] },

    // ——— WALK / FLOW ———
    { pattern: /\bcatwalk\b/gi, replacement: 'catwalk stride, forward motion, fluid garment movement', severity: 0, tags: ['motion'] },
    { pattern: /\bspin\s*pose\b/gi, replacement: 'gentle spin, flowing hair, skirt motion, soft blur', severity: 0, tags: ['motion'] }
  ]
});
// >>> END OF BLOCK 33 <<<
/* ================================================================
 * BLOCK 33 — POSES, GESTURES & EXPRESSIONS (SFW) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 34 — MULTILINGUAL SEEDS (FR/DE/PT): PROFANITY → NEUTRAL (START)
 * ID: BLOCK 34
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Add French, German, Portuguese profanity/sexual slang neutralizers (SFW).
 *   - Mirrors the ES seed (BLOCK 10) pattern so we can expand later.
 * INTERNAL NOTES:
 *   - Only neutral/clinical replacements here. Directional explicit lives in “34a” packs you can load privately.
 * ================================================================ */
// >>> START OF BLOCK 34 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 34 (fr: neutralizer)',
  language: 'fr',
  category: 'profanite_anatomie',
  emoji: ['🇫🇷'],
  notes: ['Seed list; expand over time.'],
  entries: [
    { pattern: /\b(seins|nichons|boobs?)\b/gi, replacement: 'seins', severity: 2, tags: ['anatomie'] },
    { pattern: /\b( chatte|minou|con)\b/gi, replacement: 'vagin', severity: 3, tags: ['anatomie'] },
    { pattern: /\b(fesse|cul)\b/gi, replacement: 'fessier', severity: 2, tags: ['anatomie'] },
    { pattern: /\b(zizi|bite|pénis)\b/gi, replacement: 'pénis', severity: 3, tags: ['anatomie'] },
    { pattern: /\b(jurer|putain|merde)\b/gi, replacement: 'langage fort', severity: 2, tags: ['profanite'] }
  ]
});
PF_PACKS.push({
  block_id: 'BLOCK 34 (de: neutralizer)',
  language: 'de',
  category: 'vulgar_und_anatomie',
  emoji: ['🇩🇪'],
  notes: ['Seed list; expand over time.'],
  entries: [
    { pattern: /\b(titten|brüste|boobs?)\b/gi, replacement: 'Brüste', severity: 2, tags: ['anatomie'] },
    { pattern: /\b(möse|fotze|votze|muschi)\b/gi, replacement: 'Vagina', severity: 3, tags: ['anatomie'] },
    { pattern: /\b(arsch|hintern)\b/gi, replacement: 'Gesäß', severity: 2, tags: ['anatomie'] },
    { pattern: /\b(schwanz|pimmel|penis)\b/gi, replacement: 'Penis', severity: 3, tags: ['anatomie'] },
    { pattern: /\b(scheiße|scheiss)\b/gi, replacement: 'Unordnung', severity: 2, tags: ['profan'] }
  ]
});
PF_PACKS.push({
  block_id: 'BLOCK 34 (pt: neutralizer)',
  language: 'pt',
  category: 'obscenidades_anatomia',
  emoji: ['🇧🇷','🇵🇹'],
  notes: ['Seed list; expand over time.'],
  entries: [
    { pattern: /\b(seios|peitos|tetas)\b/gi, replacement: 'seios', severity: 2, tags: ['anatomia'] },
    { pattern: /\b(buceta|xereca|cona)\b/gi, replacement: 'vagina', severity: 3, tags: ['anatomia'] },
    { pattern: /\b(bunda|cu)\b/gi, replacement: 'nádegas', severity: 2, tags: ['anatomia'] },
    { pattern: /\b(pau|pênis|caralho)\b/gi, replacement: 'pênis', severity: 3, tags: ['anatomia'] },
    { pattern: /\b(merda|porra)\b/gi, replacement: 'linguagem forte', severity: 2, tags: ['profanidade'] }
  ]
});
// >>> END OF BLOCK 34 CODE <<<
/* ================================================================
 * BLOCK 34 — MULTILINGUAL SEEDS (FR/DE/PT): PROFANITY → NEUTRAL (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 35 — PRODUCT PHOTO BRIEFS (SFW TEMPLATES) (START)
 * ID: BLOCK 35
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Ready-to-use product brief templates with slot tokens (category, material, finish, use-case).
 *   - Works with PF_CORE.craft() and PF_RANDOM.run(); produces consistent ecommerce/advertorial prompts.
 * INTERNAL NOTES:
 *   - Non-NSFW. You can attach to a “Briefs” dropdown in UI.
 *   - Use PF_BRIEFS.fill(id, data) → returns { slots, notes } to feed into PF_CORE.craft / PF_PROFILES.craftWithProfile.
 * ================================================================ */
// >>> START OF BLOCK 35 CODE <<<
(function (global) {
  const BRIEFS = [
    {
      id: 'brief_clean_product',
      label: 'Clean Product Hero',
      slots: {
        subject: '{category} hero, premium look',
        environment: 'seamless background, negative space',
        camera: '50mm perspective, natural proportions',
        mood: 'confident tone',
        color: 'monochrome palette',
        style: 'hard-surface design language, crisp chamfers',
        render: 'studio lighting, soft key and fill'
      },
      notes: [
        'For single-item hero shots (consumer electronics, cosmetics, tools).',
        'Keep reflections tidy; add PACK 25 negatives for artifact control.'
      ],
      fields: ['category','material','finish','capacity','key_feature']
    },
    {
      id: 'brief_lifestyle_soft',
      label: 'Lifestyle — Soft Minimal',
      slots: {
        subject: '{category} in use',
        environment: 'minimal interior, soft textures',
        camera: 'telephoto compression, shallow depth of field',
        mood: 'serene tone',
        color: 'pastel palette',
        render: 'window light, gentle falloff'
      },
      notes: ['For human-with-product scenes; keep it tasteful, adult-only context.'],
      fields: ['category','use_case','material','finish']
    },
    {
      id: 'brief_detail_macro',
      label: 'Detail / Macro',
      slots: {
        subject: '{category} macro detail, {key_feature}',
        environment: 'clean tabletop surface',
        camera: 'macro perspective, fine texture fidelity',
        mood: 'elegant tone',
        color: 'earthy tones',
        render: 'specular sweep for surface definition'
      },
      notes: ['Use when texture/knurl/engraving is important.'],
      fields: ['category','key_feature','material','finish']
    }
  ];

  function fill(id, data = {}) {
    const b = BRIEFS.find(x => x.id === id) || BRIEFS[0];
    const slots = JSON.parse(JSON.stringify(b.slots));
    for (const k of Object.keys(slots)) {
      slots[k] = String(slots[k]).replace(/\{(\w+)\}/g, (_, key) => data[key] != null ? String(data[key]) : key);
    }
    return { slots, notes: b.notes.slice(), id: b.id, label: b.label };
  }

  global.PF_BRIEFS = { list: () => BRIEFS.slice(), fill };
})(typeof self !== 'undefined' ? self : this);
// >>> END OF BLOCK 35 CODE <<<
/* ================================================================
 * BLOCK 35 — PRODUCT PHOTO BRIEFS (SFW TEMPLATES) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 36 — TYPOGRAPHY & PACKAGING: POSITIVES/NEGATIVES (START)
 * ID: BLOCK 36
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand vague text/label requests into concrete typographic and packaging directives.
 *   - Adds cleanup tokens to reduce moiré, warp, and label distortion in generations.
 * INTERNAL NOTES:
 *   - SFW. Complements BLOCK 25 (quality negatives) and BLOCK 16 (UI/Logo).
 * ================================================================ */
// >>> START OF BLOCK 36 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 36',
  language: 'en',
  category: 'typography_packaging',
  emoji: ['🔤','🏷️','📦'],
  notes: [
    'Append to positive prompt for clarity; use PACK 25 for negatives.',
    'Avoid brand names; talk form, contrast, spacing, and finish.'
  ],
  entries: [
    // ——— TYPOGRAPHY (POSITIVE) ———
    { pattern: /\bclean\s*type\b/gi, replacement: 'clean typography, balanced contrast, optical kerning, even tracking', severity: 0, tags: ['type'] },
    { pattern: /\bhigh\s*legibility\b/gi, replacement: 'high legibility, open counters, generous x-height, clear hierarchy', severity: 0, tags: ['type'] },
    { pattern: /\bheadline\b/gi, replacement: 'headline set in display type, strong weight contrast, tight spacing', severity: 0, tags: ['type'] },
    { pattern: /\bbody\s*copy\b/gi, replacement: 'body copy in readable size, steady rhythm, proper leading', severity: 0, tags: ['type'] },

    // ——— TYPOGRAPHY (NEGATIVE HINTS) ———
    { pattern: /\bno\s*warp\b/gi, replacement: 'avoid label warping, planar alignment, perspective-correct text', severity: 0, tags: ['negative'] },
    { pattern: /\bno\s*moire\b/gi, replacement: 'avoid moiré, smooth halftones, high sampling fidelity', severity: 0, tags: ['negative'] },
    { pattern: /\bno\s*halo\b/gi, replacement: 'avoid text halos, crisp edges, anti-fringe rendering', severity: 0, tags: ['negative'] },

    // ——— PACKAGING DETAILS ———
    { pattern: /\blabel\s*design\b/gi, replacement: 'label design with safe margins, dieline aware, bleed set, CMYK ready', severity: 0, tags: ['packaging'] },
    { pattern: /\bfoil\s*label\b/gi, replacement: 'metallic foil label, reflective highlights, premium finish', severity: 0, tags: ['packaging'] },
    { pattern: /\bemboss(?:ed)?\s*label\b/gi, replacement: 'embossed label, tactile relief, crisp edges, shadowed recess', severity: 0, tags: ['packaging'] },
    { pattern: /\bshrink\s*sleeve\b/gi, replacement: 'shrink sleeve wrap, full-coverage graphics, seam alignment, glossy film', severity: 0, tags: ['packaging'] },

    // ——— PRINT/FINISH ———
    { pattern: /\bspot\s*uv\b/gi, replacement: 'spot UV gloss on key elements, contrast against matte base', severity: 0, tags: ['finish'] },
    { pattern: /\bsoft\s*touch\s*laminate\b/gi, replacement: 'soft-touch laminate, velvety feel, diffuse highlights', severity: 0, tags: ['finish'] },
    { pattern: /\brecycled\s*board\b/gi, replacement: 'recycled paperboard, natural fibers visible, eco-friendly tone', severity: 0, tags: ['material'] }
  ]
});
// >>> END OF BLOCK 36 CODE <<<
/* ================================================================
 * BLOCK 36 — TYPOGRAPHY & PACKAGING: POSITIVES/NEGATIVES (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 37 — STYLE ERAS BY DECADE (1900s→2020s) (SFW) (START)
 * ID: BLOCK 37
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map decade references to neutral, style-safe descriptors (art, fashion, design, color).
 *   - Useful for moodboards and period looks without brand names.
 * INTERNAL NOTES:
 *   - SFW. Broad-strokes descriptors to guide vibe; stack with BLOCK 13.
 * ================================================================ */
// >>> START OF BLOCK 37 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 37',
  language: 'en',
  category: 'style_eras_decades',
  emoji: ['🕰️','🗞️','👗'],
  notes: ['Each decade → core motifs; expand with more entries later.'],
  entries: [
    { pattern: /\b1900s\b/gi, replacement: '1900s era look, Edwardian silhouettes, ornate detailing, sepia photographic tone', severity: 0, tags: ['era'] },
    { pattern: /\b1910s\b/gi, replacement: '1910s era, transitional fashion, early modernist motifs, muted palettes', severity: 0, tags: ['era'] },
    { pattern: /\b1920s\b/gi, replacement: '1920s art deco geometry, flapper silhouettes, bold metallic accents, jazz age glam', severity: 0, tags: ['era'] },
    { pattern: /\b1930s\b/gi, replacement: '1930s streamlined forms, chrome accents, cinematic noir lighting', severity: 0, tags: ['era'] },
    { pattern: /\b1940s\b/gi, replacement: '1940s utilitarian tailoring, Victory silhouette, poster primaries, film grain', severity: 0, tags: ['era'] },
    { pattern: /\b1950s\b/gi, replacement: '1950s midcentury modern lines, pastel kitchens, rockabilly flair, lacquer shine', severity: 0, tags: ['era'] },
    { pattern: /\b1960s\b/gi, replacement: '1960s mod graphics, bold op-art shapes, saturated pop color, mini silhouettes', severity: 0, tags: ['era'] },
    { pattern: /\b1970s\b/gi, replacement: '1970s warm earth palette, boho patterns, flared cuts, analog grain', severity: 0, tags: ['era'] },
    { pattern: /\b1980s\b/gi, replacement: '1980s neon accents, chrome gradients, big shoulders, synthwave vibe', severity: 0, tags: ['era'] },
    { pattern: /\b1990s\b/gi, replacement: '1990s grunge textures, minimal branding, film point-and-shoot look', severity: 0, tags: ['era'] },
    { pattern: /\b2000s\b/gi, replacement: '2000s glossy web gradients, low-rise silhouettes, early digital sheen', severity: 0, tags: ['era'] },
    { pattern: /\b2010s\b/gi, replacement: '2010s flat design, minimalist branding, desaturated editorial palettes', severity: 0, tags: ['era'] },
    { pattern: /\b2020s\b/gi, replacement: '2020s neomorphism/glassmorphism mash, sustainable materials, cozy minimalism', severity: 0, tags: ['era'] }
  ]
});
// >>> END OF BLOCK 37 CODE <<<
/* ================================================================
 * BLOCK 37 — STYLE ERAS BY DECADE (1900s→2020s) (SFW) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 38 — LANGUAGE AUTODETECT + IT/RU/JA/ZH SEEDS (SFW) (START)
 * ID: BLOCK 38
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Add a light, client-only language detector and plug into sanitize(lang='auto').
 *   - Seed neutralizers for Italian, Russian, Japanese, Chinese (simplified).
 * INTERNAL NOTES:
 *   - Detector is heuristic: script ranges + common stopwords. Good enough for routing packs.
 *   - Neutralizer seeds mirror BLOCK 10/34 style (clinical replacements only).
 * ================================================================ */
// >>> START OF BLOCK 38 CODE <<<
(function (global) {
  const CORE = (global.PF_CORE = global.PF_CORE || {});

  function detectLang(text = '') {
    const t = String(text).trim();
    if (!t) return 'en';
    // Script-based quick checks
    if (/[\u3040-\u30ff\u31f0-\u31ff\uFF66-\uFF9D]/.test(t)) return 'ja';       // Hiragana/Katakana
    if (/[\u4e00-\u9fff]/.test(t)) return 'zh';                                  // CJK Unified
    if (/\b(la|il|lo|gli|una|uno|ciao|perché)\b/i.test(t)) return 'it';
    if (/\b(и|в|на|что|это|привет)\b/i.test(t) || /[\u0400-\u04FF]/.test(t)) return 'ru';
    if (/\b(el|la|de|que|por|para)\b/i.test(t)) return 'es';
    if (/\b(le|la|de|que|pour)\b/i.test(t)) return 'fr';
    if (/\b(der|die|und|ist|nicht|mit)\b/i.test(t)) return 'de';
    if (/\b(o|de|para|com|sem)\b/i.test(t)) return 'pt';
    return 'en';
  }

  // Wrap sanitize so lang:'auto' routes correctly
  const baseSanitize = global.PF_SANITIZE || ((txt,opts)=>({output:txt,score:0,slider:0,meta:opts||{}}));
  global.PF_SANITIZE = function(text, opts = {}) {
    const lang = (opts.lang === 'auto') ? detectLang(text) : (opts.lang || 'en');
    const out = baseSanitize(text, { ...opts, lang });
    if (out && out.meta) out.meta.detectedLang = lang;
    return out;
  };

  CORE.detectLang = detectLang;
  global.PF_DETECT_LANG = detectLang;
})(typeof self !== 'undefined' ? self : this);

// ——— ITALIAN (IT) SEED ———
PF_PACKS.push({
  block_id: 'BLOCK 38 (it: neutralizer)',
  language: 'it',
  category: 'volgarita_anatomia',
  emoji: ['🇮🇹'],
  notes: ['Seed list; expand later.'],
  entries: [
    { pattern: /\b(tette|sise|boobs?)\b/gi, replacement: 'seni', severity: 2, tags: ['anatomia'] },
    { pattern: /\b(figa|fica|passera)\b/gi, replacement: 'vagina', severity: 3, tags: ['anatomia'] },
    { pattern: /\b(culo|chiappe)\b/gi, replacement: 'glutei', severity: 2, tags: ['anatomia'] },
    { pattern: /\b(cazzo|pisello|pene)\b/gi, replacement: 'pene', severity: 3, tags: ['anatomia'] },
    { pattern: /\b(merda|cavolo|porca)\b/gi, replacement: 'linguaggio forte', severity: 2, tags: ['profanita'] }
  ]
});

// ——— RUSSIAN (RU) SEED ———
PF_PACKS.push({
  block_id: 'BLOCK 38 (ru: neutralizer)',
  language: 'ru',
  category: 'neprilichnoe_anatomiya',
  emoji: ['🇷🇺'],
  notes: ['Seed list; expand later.'],
  entries: [
    { pattern: /\b(сиськи|грудь|бубсы|boobs?)\b/gi, replacement: 'грудь', severity: 2, tags: ['анатомия'] },
    { pattern: /\b(пизда|киска)\b/gi, replacement: 'влагалище', severity: 3, tags: ['анатомия'] },
    { pattern: /\b(задница|жопа)\b/gi, replacement: 'ягодицы', severity: 2, tags: ['анатомия'] },
    { pattern: /\b(член|хер|пенис)\b/gi, replacement: 'пенис', severity: 3, tags: ['анатомия'] },
    { pattern: /\b(дерьмо|блин)\b/gi, replacement: 'сильное выражение', severity: 2, tags: ['брань'] }
  ]
});

// ——— JAPANESE (JA) SEED ———
PF_PACKS.push({
  block_id: 'BLOCK 38 (ja: neutralizer)',
  language: 'ja',
  category: 'わいせつ_中立',
  emoji: ['🇯🇵'],
  notes: ['Seed list; expand later.'],
  entries: [
    { pattern: /おっぱい|胸/gi, replacement: '胸部', severity: 2, tags: ['解剖'] },
    { pattern: /まんこ|アソコ/gi, replacement: '膣', severity: 3, tags: ['解剖'] },
    { pattern: /お尻|ケツ/gi, replacement: '臀部', severity: 2, tags: ['解剖'] },
    { pattern: /ちんこ|ペニス/gi, replacement: '陰茎', severity: 3, tags: ['解剖'] },
    { pattern: /くそ|やばい/gi, replacement: '強い表現', severity: 2, tags: ['表現'] }
  ]
});

// ——— CHINESE (ZH, simplified) SEED ———
PF_PACKS.push({
  block_id: 'BLOCK 38 (zh: neutralizer)',
  language: 'zh',
  category: '粗口_解剖_中性',
  emoji: ['🇨🇳'],
  notes: ['Seed list; expand later.'],
  entries: [
    { pattern: /奶子|胸|波/gi, replacement: '乳房', severity: 2, tags: ['解剖'] },
    { pattern: /逼|阴户|私处/gi, replacement: '阴道', severity: 3, tags: ['解剖'] },
    { pattern: /屁股|臀|屁股蛋/gi, replacement: '臀部', severity: 2, tags: ['解剖'] },
    { pattern: /鸡巴|屌|阴茎/gi, replacement: '阴茎', severity: 3, tags: ['解剖'] },
    { pattern: /他妈的|靠/gi, replacement: '强烈用语', severity: 2, tags: ['粗口'] }
  ]
});
// >>> END OF BLOCK 38 CODE <<<
/* ================================================================
 * BLOCK 38 — LANGUAGE AUTODETECT + IT/RU/JA/ZH SEEDS (SFW) (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 39 — PORTRAIT LIGHTING COOKBOOK (START)
 * ID: BLOCK 39
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map classic portrait-lighting terms to precise, model-usable descriptors.
 *   - Works with BLOCK 12 (appearance), BLOCK 33 (poses), BLOCK 13 (color/contrast).
 * INTERNAL NOTES:
 *   - SFW, severity 0. Includes modifiers, angles, and fill strategies.
 * ================================================================ */
// >>> START OF BLOCK 39 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 39',
  language: 'en',
  category: 'portrait_lighting_cookbook',
  emoji: ['💡','📸'],
  notes: ['Angles assume camera at eye-level unless stated.'],
  entries: [
    // ——— CLASSIC PATTERNS ———
    { pattern: /\brembrandt\s*lighting\b/gi, replacement: 'Rembrandt lighting, key at ~45° off-axis and above, small triangle of light on shadow cheek, controlled contrast', severity: 0, tags: ['lighting'] },
    { pattern: /\bloop\s*lighting\b/gi, replacement: 'loop lighting, key slightly above and to the side, small nose shadow loop, flattering definition', severity: 0, tags: ['lighting'] },
    { pattern: /\bbutterfly|paramount\s*lighting\b/gi, replacement: 'butterfly (Paramount) lighting, key centered high, butterfly shadow under nose, glamour highlight', severity: 0, tags: ['lighting'] },
    { pattern: /\bsplit\s*lighting\b/gi, replacement: 'split lighting, key at ~90°, one side lit one side shadow, dramatic contrast', severity: 0, tags: ['lighting'] },
    { pattern: /\bclamshell\s*lighting\b/gi, replacement: 'clamshell lighting, top soft key plus low reflector/fill, even beauty light, catchlights double', severity: 0, tags: ['lighting'] },

    // ——— MODIFIERS ———
    { pattern: /\bsoftbox\b/gi, replacement: 'large softbox modifier, broad diffuse source, soft falloff', severity: 0, tags: ['modifier'] },
    { pattern: /\boctabox\b/gi, replacement: 'octabox modifier, round catchlights, wraparound softness', severity: 0, tags: ['modifier'] },
    { pattern: /\bbeauty\s*dish\b/gi, replacement: 'beauty dish modifier, crisp specular edge with gentle falloff, fashion look', severity: 0, tags: ['modifier'] },
    { pattern: /\bstrip\s*box\b/gi, replacement: 'strip softbox, narrow vertical highlight, edge separation', severity: 0, tags: ['modifier'] },
    { pattern: /\bgrid(?:ded)?\s*light\b/gi, replacement: 'gridded light, controlled spill, focused beam, tighter contrast', severity: 0, tags: ['modifier'] },
    { pattern: /\bsnoot\b/gi, replacement: 'snoot spotlight, tight cone, hard-edged highlight', severity: 0, tags: ['modifier'] },

    // ——— SUPPORT LIGHTS ———
    { pattern: /\brim\s*light\b/gi, replacement: 'rim light from behind, edge separation on hair/shoulders, subtle bloom', severity: 0, tags: ['lighting'] },
    { pattern: /\bhair\s*light\b/gi, replacement: 'hair light above/behind, sheen on hair texture, delicate speculars', severity: 0, tags: ['lighting'] },
    { pattern: /\bkicker\s*light\b/gi, replacement: 'kicker light from low rear angle, bright edge on jawline/cheek', severity: 0, tags: ['lighting'] },
    { pattern: /\bnegative\s*fill\b/gi, replacement: 'negative fill with black flags, deepen shadows, added shape', severity: 0, tags: ['lighting'] },
    { pattern: /\bbounce\s*fill\b/gi, replacement: 'white card bounce fill, open shadows, softer contrast', severity: 0, tags: ['lighting'] },

    // ——— LOOKS ———
    { pattern: /\bhigh[-\s]*key\b/gi, replacement: 'high-key look, bright background, low contrast, airy mood', severity: 0, tags: ['look'] },
    { pattern: /\blow[-\s]*key\b/gi, replacement: 'low-key look, dark surrounds, strong contrast, moody tone', severity: 0, tags: ['look'] },
    { pattern: /\bwindow\s*light\b/gi, replacement: 'window light, large soft source, directional falloff, natural color', severity: 0, tags: ['look'] },
    { pattern: /\bpracticals?\b/gi, replacement: 'practical lights in frame, warm ambient pools, depth cues', severity: 0, tags: ['look'] },

    // ——— GEL / COLOR ———
    { pattern: /\bgel(?:led)?\s*lights?\b/gi, replacement: 'colored gels on lights, complementary hues, atmospheric accents', severity: 0, tags: ['color'] },
    { pattern: /\bctb\b/gi, replacement: 'CTB gel (cooler), daylight balance shift, blue lift on highlights', severity: 0, tags: ['color'] },
    { pattern: /\bcto\b/gi, replacement: 'CTO gel (warmer), tungsten balance shift, amber skin tone warmth', severity: 0, tags: ['color'] }
  ]
});
// >>> END OF BLOCK 39 <<<
/* ================================================================
 * BLOCK 39 — PORTRAIT LIGHTING COOKBOOK (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 40 — ENVIRONMENT LIGHTING & WEATHER (START)
 * ID: BLOCK 40
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map time-of-day + atmosphere to specific visual cues for scenes.
 *   - Great with BLOCK 21 (environments) and BLOCK 18 (action/VFX).
 * INTERNAL NOTES:
 *   - SFW, severity 0. Keep brand-free and descriptive.
 * ================================================================ */
// >>> START OF BLOCK 40 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 40',
  language: 'en',
  category: 'environment_lighting_weather',
  emoji: ['🌇','🌫️','🌧️','❄️'],
  notes: ['Weather adds particles/volumetrics; combine with camera choices.'],
  entries: [
    // ——— TIME OF DAY ———
    { pattern: /\bgolden\s*hour\b/gi, replacement: 'golden hour light, low sun angle, warm rim highlights, long soft shadows', severity: 0, tags: ['time'] },
    { pattern: /\bblue\s*hour\b/gi, replacement: 'blue hour ambience, cool ambient fill, gentle gradients, calm tone', severity: 0, tags: ['time'] },
    { pattern: /\bnoon\s*sun\b/gi, replacement: 'midday hard sun, crisp shadows, high contrast, bright highlights', severity: 0, tags: ['time'] },
    { pattern: /\btwilight\b/gi, replacement: 'twilight ambience, mixed color temperature, silhouettes, gentle contrast', severity: 0, tags: ['time'] },
    { pattern: /\bmoonlight\b/gi, replacement: 'moonlit scene, cool directional light, soft speculars, deep blues', severity: 0, tags: ['time'] },

    // ——— ATMOSPHERE ———
    { pattern: /\bovercast\b/gi, replacement: 'overcast sky, giant softbox effect, low shadow contrast, muted colors', severity: 0, tags: ['atmosphere'] },
    { pattern: /\bfog|mist\b/gi, replacement: 'foggy air, reduced visibility, aerial perspective, light bloom', severity: 0, tags: ['atmosphere'] },
    { pattern: /\bhaze\b/gi, replacement: 'atmospheric haze, washed distance, sun halo, softened detail', severity: 0, tags: ['atmosphere'] },
    { pattern: /\bgod\s*rays|volumetric\s*light\b/gi, replacement: 'volumetric shafts of light, visible beams through particulates, dramatic depth', severity: 0, tags: ['atmosphere'] },

    // ——— WEATHER ———
    { pattern: /\brain(y)?\b/gi, replacement: 'rain scene, wet surfaces, specular reflections, falling streaks, umbrellas, puddle ripples', severity: 0, tags: ['weather'] },
    { pattern: /\bsnow(y)?\b/gi, replacement: 'snowfall, diffuse light, soft ground cover, breath vapor, frosted edges', severity: 0, tags: ['weather'] },
    { pattern: /\bstorm|thunderstorm\b/gi, replacement: 'storm scene, dark cumulonimbus, gust lines, lightning forks, heavy rain', severity: 0, tags: ['weather'] },
    { pattern: /\blightning\b/gi, replacement: 'lightning flash, high-contrast rim edges, split-second illumination, branching bolts', severity: 0, tags: ['weather'] },
    { pattern: /\baurora\b/gi, replacement: 'aurora display, flowing curtains of light, green-magenta gradients, polar sky', severity: 0, tags: ['weather'] },

    // ——— SPECIAL ENVIRONMENTS ———
    { pattern: /\bunderwater\b/gi, replacement: 'underwater light caustics, blue-green cast, particulate drift, soft beams', severity: 0, tags: ['special'] },
    { pattern: /\bdesert\s*sun\b/gi, replacement: 'desert sun glare, heat shimmer, bleached palette, hard-edged shadows', severity: 0, tags: ['special'] },
    { pattern: /\bjungle\s*canopy\b/gi, replacement: 'jungle canopy, dappled light spots, humid air, rich greens', severity: 0, tags: ['special'] },
    { pattern: /\bneon\s*rain\b/gi, replacement: 'neon-lit rain, reflective asphalt, saturated highlights, cinematic reflections', severity: 0, tags: ['special'] }
  ]
});
// >>> END OF BLOCK 40 <<<
/* ================================================================
 * BLOCK 40 — ENVIRONMENT LIGHTING & WEATHER (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 41 — ARCHITECTURE: INTERIOR/EXTERIOR VOCAB (START)
 * ID: BLOCK 41
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand architecture terms into clear, buildable descriptors (materials, forms, details).
 *   - Complements BLOCK 21 (environments) + BLOCK 13 (composition).
 * INTERNAL NOTES:
 *   - SFW, severity 0. Avoid real brands/architect names.
 * ================================================================ */
// >>> START OF BLOCK 41 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 41',
  language: 'en',
  category: 'architecture_vocab',
  emoji: ['🏛️','🏗️','🪵','🪨'],
  notes: ['Use multiple tokens to stack a coherent space.'],
  entries: [
    // ——— STYLES ———
    { pattern: /\bbrutalist\b/gi, replacement: 'brutalist expression, raw board-formed concrete, monolithic forms, deep reveals', severity: 0, tags: ['style'] },
    { pattern: /\bmodernist\b/gi, replacement: 'modernist clarity, glass curtain walls, rectilinear volumes, pilotis hints', severity: 0, tags: ['style'] },
    { pattern: /\bminimalist\b/gi, replacement: 'minimalist interior, restrained palette, hidden hardware, clean planes', severity: 0, tags: ['style'] },
    { pattern: /\bscandinavian\b/gi, replacement: 'Scandinavian interior, light woods, cozy textiles, soft daylight', severity: 0, tags: ['style'] },
    { pattern: /\bindustrial\s*loft\b/gi, replacement: 'industrial loft, exposed brick, steel beams, large factory windows', severity: 0, tags: ['style'] },
    { pattern: /\bjapanese\s*wabi[-\s]*sabi\b/gi, replacement: 'wabi-sabi aesthetic, natural textures, asymmetry, quiet patina', severity: 0, tags: ['style'] },
    { pattern: /\bart\s*deco\b/gi, replacement: 'art deco geometry, stepped forms, metallic accents, patterned stone', severity: 0, tags: ['style'] },

    // ——— ELEMENTS ———
    { pattern: /\bclerestory\b/gi, replacement: 'clerestory windows, high light band, even daylight wash', severity: 0, tags: ['element'] },
    { pattern: /\bskylight\b/gi, replacement: 'skylight aperture, top light, soft shaft illumination', severity: 0, tags: ['element'] },
    { pattern: /\batrium\b/gi, replacement: 'central atrium void, multi-level daylight, hanging plants, balconies', severity: 0, tags: ['element'] },
    { pattern: /\bmezzanine\b/gi, replacement: 'mezzanine level, half-floor overlook, railing detail', severity: 0, tags: ['element'] },
    { pattern: /\bcantilever\b/gi, replacement: 'cantilevered volume, floating projection, slender supports', severity: 0, tags: ['element'] },
    { pattern: /\bcolonnade\b/gi, replacement: 'colonnade rhythm, repeated columns, shaded walkway', severity: 0, tags: ['element'] },

    // ——— MATERIALS ———
    { pattern: /\bboard[-\s]*formed\s*concrete\b/gi, replacement: 'board-formed concrete texture, horizontal wood grain, crisp edges', severity: 0, tags: ['material'] },
    { pattern: /\bterrazzo\b/gi, replacement: 'terrazzo flooring, mixed aggregate chips, polished finish', severity: 0, tags: ['material'] },
    { pattern: /\btravertine\b/gi, replacement: 'travertine stone, linear veining, honed finish', severity: 0, tags: ['material'] },
    { pattern: /\bcorten\s*steel\b/gi, replacement: 'weathered corten steel panels, warm rust patina, industrial tone', severity: 0, tags: ['material'] },
    { pattern: /\bfluted\s*panel(s)?\b/gi, replacement: 'fluted wall panels, vertical rhythm, light-catching grooves', severity: 0, tags: ['material'] },
    { pattern: /\bnatural\s*timber\b/gi, replacement: 'natural timber cladding, visible grain, warm tone', severity: 0, tags: ['material'] },

    // ——— FENESTRATION / MASSING ———
    { pattern: /\bcurtain\s*wall\b/gi, replacement: 'glass curtain wall system, mullion grid, reflective façade', severity: 0, tags: ['fenestration'] },
    { pattern: /\bpunched\s*windows?\b/gi, replacement: 'punched window openings, deep jambs, rhythmic bays', severity: 0, tags: ['fenestration'] },
    { pattern: /\bdouble[-\s]*height\b/gi, replacement: 'double-height space, tall glazing, dramatic vertical scale', severity: 0, tags: ['massing'] },
    { pattern: /\bcourtyard\b/gi, replacement: 'central courtyard, planted core, cross-ventilation, dappled light', severity: 0, tags: ['massing'] }
  ]
});
// >>> END OF BLOCK 41 <<<
/* ================================================================
 * BLOCK 41 — ARCHITECTURE: INTERIOR/EXTERIOR VOCAB (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 42 — WARDROBE & FABRICS (EN)  (START)
 * ID: BLOCK 42
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand clothing/wardrobe terms into detailed, brand-free descriptors (street → couture → lingerie).
 *   - SFW by default; avoids explicit phrasing while still being precise for renders.
 * INTERNAL NOTES:
 *   - Pairs with BLOCK 42a for explicit-directional mirroring when allowExplicit:true.
 *   - Materials/fabric tokens emphasize texture, transparency, drape, sheen, stretch.
 * ================================================================ */
// >>> START OF BLOCK 42 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 42',
  language: 'en',
  category: 'wardrobe_fabrics',
  emoji: ['👗','🧵','🧷','🧦'],
  notes: [
    'Clothing descriptors stay neutral; no porn-y prose. Stack with photo/pose blocks.',
    'Use fabric + cut + detail for best results (e.g., “silk slip dress with lace trim”).'
  ],
  entries: [
    // ——— BASE GARMENTS ———
    { pattern: /\bt[-\s]*shirt\b/gi,       replacement: 'crew-neck t-shirt, soft cotton jersey, relaxed fit', severity: 0, tags: ['casual'] },
    { pattern: /\btank\s*top\b/gi,        replacement: 'sleeveless tank top, ribbed knit, fitted silhouette', severity: 0, tags: ['casual'] },
    { pattern: /\bcrop\s*top\b/gi,        replacement: 'cropped top, short hemline, close fit', severity: 0, tags: ['casual'] },
    { pattern: /\bhoodie\b/gi,             replacement: 'pullover hoodie, kangaroo pocket, brushed fleece lining, drawstring hood', severity: 0, tags: ['casual'] },
    { pattern: /\bbutton[-\s]*down\b/gi,  replacement: 'button-down shirt, crisp woven cotton, pointed collar, cuffed sleeves', severity: 0, tags: ['smart'] },
    { pattern: /\bblouse\b/gi,            replacement: 'lightweight blouse, soft drape, subtle sheen, gentle gathers', severity: 0, tags: ['smart'] },
    { pattern: /\bbodysuit\b/gi,          replacement: 'form-fitting bodysuit, stretch knit, clean tucked finish', severity: 0, tags: ['base'] },

    // ——— LEGS ———
    { pattern: /\bjeans\b/gi,              replacement: 'denim jeans, 5-pocket, subtle whiskering, straight or slim cut', severity: 0, tags: ['denim'] },
    { pattern: /\bhigh[-\s]*waist(ed)?\b/gi, replacement: 'high-rise waistline, elongated leg proportion', severity: 0, tags: ['cut'] },
    { pattern: /\bleggings\b/gi,          replacement: 'stretch leggings, matte finish, snug silhouette, opaque knit', severity: 0, tags: ['athleisure'] },
    { pattern: /\byoga\s*pants\b/gi,      replacement: 'performance stretch pants, moisture-wicking, high-rise waistband', severity: 0, tags: ['athleisure'] },
    { pattern: /\bmini\s*skirt\b/gi,      replacement: 'mini skirt, above-the-knee hem, fitted hip, clean hem', severity: 1, tags: ['skirt'] },
    { pattern: /\bpencil\s*skirt\b/gi,    replacement: 'pencil skirt, tailored fit, knee length, slit vent', severity: 0, tags: ['skirt'] },
    { pattern: /\bthigh[-\s]*highs?\b/gi, replacement: 'thigh-high stockings, elastic stay-up band, sheer denier', severity: 1, tags: ['hosiery'] },

    // ——— DRESSES / OUTER ———
    { pattern: /\bslip\s*dress\b/gi,      replacement: 'bias-cut slip dress, silk-like drape, delicate straps, subtle sheen', severity: 1, tags: ['dress'] },
    { pattern: /\bsun\s*dress\b/gi,       replacement: 'light sundress, airy cotton, floral print option, breezy silhouette', severity: 0, tags: ['dress'] },
    { pattern: /\bplunging\s*neckline\b/gi, replacement: 'deep V neckline, elongated décolletage line', severity: 1, tags: ['detail'] },
    { pattern: /\bopen\s*back\b/gi,       replacement: 'open-back detail, low scoop, strap emphasis', severity: 1, tags: ['detail'] },
    { pattern: /\bkimono\s*robe\b/gi,     replacement: 'kimono-style robe, wide sleeves, loose sash tie, flowing drape', severity: 0, tags: ['outer'] },
    { pattern: /\btrench\s*coat\b/gi,     replacement: 'belted trench coat, storm flaps, double-breasted front, gabardine', severity: 0, tags: ['outer'] },

    // ——— LINGERIE (NEUTRAL) ———
    { pattern: /\bpush[-\s]*up\s*bra\b/gi, replacement: 'underwire bra with lift, molded cups, adjustable straps', severity: 1, tags: ['lingerie'] },
    { pattern: /\bbralette\b/gi,          replacement: 'soft bralette, unlined, delicate lace overlay', severity: 1, tags: ['lingerie'] },
    { pattern: /\bpanties\b/gi,           replacement: 'brief-style underwear, soft elastic trim, comfortable fit', severity: 1, tags: ['lingerie'] },
    { pattern: /\bthong\b/gi,             replacement: 'minimal-coverage underwear, narrow back strap, low rise', severity: 2, tags: ['lingerie'] },
    { pattern: /\bg[-\s]*string\b/gi,     replacement: 'string-back underwear, minimal coverage, slim side straps', severity: 2, tags: ['lingerie'] },
    { pattern: /\bgarter\s*belt\b/gi,     replacement: 'garter belt, adjustable straps, clip fasteners for stockings', severity: 2, tags: ['lingerie'] },
    { pattern: /\bfishnets?\b/gi,         replacement: 'fishnet stockings, diamond mesh pattern, elastic cuff', severity: 1, tags: ['hosiery'] },
    { pattern: /\bbustier\b/gi,           replacement: 'structured bustier top, boning channels, fitted bodice', severity: 1, tags: ['lingerie'] },
    { pattern: /\bcorset\b/gi,            replacement: 'corset with lacing, hourglass shaping, steel or plastic boning', severity: 1, tags: ['lingerie'] },

    // ——— FABRICS / TEXTURES ———
    { pattern: /\bsilk\b/gi,              replacement: 'silk-like fabric, fluid drape, soft luster', severity: 0, tags: ['fabric'] },
    { pattern: /\bsatin\b/gi,             replacement: 'satin weave, glossy face, smooth hand-feel', severity: 0, tags: ['fabric'] },
    { pattern: /\blace\b/gi,              replacement: 'lace textile, floral motifs, semi-sheer openness', severity: 1, tags: ['fabric'] },
    { pattern: /\bmesh\b/gi,              replacement: 'fine mesh fabric, breathable net structure, semi-sheer', severity: 1, tags: ['fabric'] },
    { pattern: /\bvelvet\b/gi,            replacement: 'velvet pile, directional sheen, plush texture', severity: 0, tags: ['fabric'] },
    { pattern: /\bchiffon\b/gi,           replacement: 'light chiffon, translucent veil, soft flutter', severity: 0, tags: ['fabric'] },
    { pattern: /\btulle\b/gi,             replacement: 'tulle netting, fine hex mesh, airy volume', severity: 0, tags: ['fabric'] },
    { pattern: /\bleather\b/gi,           replacement: 'leather material, subtle grain, matte to semi-gloss finish', severity: 0, tags: ['material'] },
    { pattern: /\blatex\b/gi,             replacement: 'latex rubber finish, high-gloss sheen, tight stretch', severity: 1, tags: ['material'] }
  ]
});
// >>> END OF BLOCK 42 <<<
/* ================================================================
 * BLOCK 42 — WARDROBE & FABRICS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 42a — WARDROBE EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 42a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate neutral wardrobe tokens into spicy/NSFW-leaning phrasing (opt-in only).
 *   - Applied by PF_CORE.applyDirectional() when allowExplicit:true and direction='explicit'.
 * INTERNAL NOTES:
 *   - Keep consensual adult framing; avoid graphic porn prose. Focus on attire transparency/reveal.
 * ================================================================ */
// >>> START OF BLOCK 42a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 42a',
  language: 'en',
  category: 'wardrobe_explicit',
  gated: true,
  emoji: ['🔥','🧦','🕸️'],
  notes: ['Directional mirror of BLOCK 42.'],
  entries: [
    { pattern: /\bbodysuit\b/gi,                 replacement: 'skin-tight bodysuit', severity: 3, tags: ['explicit'] },
    { pattern: /\bthigh-high stockings\b/gi,     replacement: 'thigh-high stockings with garters', severity: 3, tags: ['explicit'] },
    { pattern: /\bdeep V neckline\b/gi,          replacement: 'plunging cleavage-baring neckline', severity: 4, tags: ['explicit'] },
    { pattern: /\bopen-back detail\b/gi,         replacement: 'open back that bares a lot of skin', severity: 3, tags: ['explicit'] },
    { pattern: /\bstring-back underwear\b/gi,    replacement: 'g-string thong', severity: 4, tags: ['explicit'] },
    { pattern: /\bbrief-style underwear\b/gi,    replacement: 'low-rise panties', severity: 3, tags: ['explicit'] },
    { pattern: /\bdelicate lace overlay\b/gi,    replacement: 'sheer lace that shows through', severity: 4, tags: ['explicit'] },
    { pattern: /\bfishnet stockings\b/gi,        replacement: 'fishnet stockings revealing skin', severity: 3, tags: ['explicit'] },
    { pattern: /\blatex rubber finish\b/gi,      replacement: 'tight latex that clings to every curve', severity: 4, tags: ['explicit'] },
    { pattern: /\bsemi-sheer\b/gi,                replacement: 'see-through', severity: 4, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 42a <<<
/* ================================================================
 * BLOCK 42a — WARDROBE EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 43 — BODY DESCRIPTORS & PROPORTIONS (EN)  (START)
 * ID: BLOCK 43
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map casual body-shape adjectives to neutral, adult-only descriptors.
 *   - Avoid minors/age cues; focus on physique, posture, proportions.
 * INTERNAL NOTES:
 *   - Mirrors in BLOCK 43a will escalate to colloquial/slang when allowed.
 * ================================================================ */
// >>> START OF BLOCK 43 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 43',
  language: 'en',
  category: 'body_descriptors',
  emoji: ['🧍','🧍‍♀️','📏'],
  notes: [
    'Adult-only physique language; no age diminutives.',
    'Use positive, descriptive adjectives; avoid judgmental phrasing.'
  ],
  entries: [
    // ——— GENERAL BUILD ———
    { pattern: /\bathletic\b/gi,      replacement: 'athletic build, defined musculature, balanced proportions', severity: 0, tags: ['build'] },
    { pattern: /\bcurvy\b/gi,         replacement: 'curvy figure, fuller hips and chest, soft contours', severity: 1, tags: ['build'] },
    { pattern: /\bslim\b/gi,          replacement: 'slim build, narrow waist, light frame', severity: 0, tags: ['build'] },
    { pattern: /\bthick\b/gi,         replacement: 'full-figured build, strong thighs and hips', severity: 1, tags: ['build'] },
    { pattern: /\bhourglass\b/gi,     replacement: 'hourglass proportions, pronounced waist-to-hip contrast', severity: 0, tags: ['proportion'] },
    { pattern: /\bpear[-\s]*shaped\b/gi, replacement: 'pear-shaped proportions, fuller hips, narrower shoulders', severity: 0, tags: ['proportion'] },
    { pattern: /\bapple[-\s]*shaped\b/gi, replacement: 'apple-shaped proportions, fuller torso, slimmer legs', severity: 0, tags: ['proportion'] },

    // ——— FEATURES ———
    { pattern: /\btoned\s*abs\b/gi,   replacement: 'defined abdominal muscles', severity: 0, tags: ['feature'] },
    { pattern: /\bstrong\s*legs\b/gi, replacement: 'powerful legs, visible quad and calf definition', severity: 0, tags: ['feature'] },
    { pattern: /\bwide\s*hips\b/gi,   replacement: 'wide hip structure, rounded silhouette', severity: 0, tags: ['feature'] },
    { pattern: /\bround\s*butt\b/gi, replacement: 'rounded gluteal shape', severity: 1, tags: ['feature'] },
    { pattern: /\bbroad\s*shoulders\b/gi, replacement: 'broad shoulder width, tapered torso', severity: 0, tags: ['feature'] },
    { pattern: /\blong\s*legs\b/gi,   replacement: 'long leg proportion, elongated femur-to-torso ratio', severity: 0, tags: ['feature'] }
  ]
});
// >>> END OF BLOCK 43 <<<
/* ================================================================
 * BLOCK 43 — BODY DESCRIPTORS & PROPORTIONS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 43a — BODY DESCRIPTORS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 43a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Colloquial/slang escalations of physique terms (opt-in only; adults).
 * ================================================================ */
// >>> START OF BLOCK 43a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 43a',
  language: 'en',
  category: 'body_descriptors_explicit',
  gated: true,
  emoji: ['🔥','🧍‍♀️'],
  notes: ['Directional mirror of BLOCK 43; pairs with BLOCK 2a semantics.'],
  entries: [
    { pattern: /\bcurvy figure, fuller hips and chest, soft contours\b/gi, replacement: 'thick and curvy', severity: 3, tags: ['explicit'] },
    { pattern: /\bhourglass proportions, pronounced waist-to-hip contrast\b/gi, replacement: 'hourglass body, tight waist, big curves', severity: 3, tags: ['explicit'] },
    { pattern: /\brounded gluteal shape\b/gi, replacement: 'big round ass', severity: 4, tags: ['explicit'] },
    { pattern: /\bdefined abdominal muscles\b/gi, replacement: 'tight abs', severity: 2, tags: ['explicit'] },
    { pattern: /\bbroad shoulder width, tapered torso\b/gi, replacement: 'wide shoulders, V-taper', severity: 2, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 43a <<<
/* ================================================================
 * BLOCK 43a — BODY DESCRIPTORS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 44 — POSES & GESTURES (EN)  (START)
 * ID: BLOCK 44
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual pose/gesture terms for portraits, fashion, action.
 *   - Non-NSFW domain; stack with wardrobe/face/camera blocks.
 * ================================================================ */
// >>> START OF BLOCK 44 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 44',
  language: 'en',
  category: 'poses_gestures',
  emoji: ['🧍','🤳','🏃'],
  notes: ['Action verbs and iconic poses rendered as camera-friendly descriptors.'],
  entries: [
    { pattern: /\bcontrapposto\b/gi,          replacement: 'contrapposto stance, weight on one leg, S-curve torso', severity: 0, tags: ['pose'] },
    { pattern: /\bs[-\s]*curve\s*pose\b/gi,  replacement: 'S-curve pose, hip pop, shoulder tilt, elegant line', severity: 0, tags: ['pose'] },
    { pattern: /\bpower\s*pose\b/gi,         replacement: 'power pose, feet apart, hands on hips, chin lifted', severity: 0, tags: ['pose'] },
    { pattern: /\bover[-\s]*the[-\s]*shoulder\b/gi, replacement: 'over-the-shoulder glance, turned torso, gaze back to camera', severity: 0, tags: ['pose'] },
    { pattern: /\bhair\s*flip\b/gi,          replacement: 'dynamic hair flip, motion arc, captured mid-swing', severity: 0, tags: ['gesture'] },
    { pattern: /\bhand\s*on\s*hip(s)?\b/gi,  replacement: 'one hand on hip, elbow flare, confident stance', severity: 0, tags: ['gesture'] },
    { pattern: /\barms\s*crossed\b/gi,       replacement: 'arms crossed across chest, assertive posture', severity: 0, tags: ['gesture'] },
    { pattern: /\breaching\s*out\b/gi,       replacement: 'arm extended toward camera, shallow depth perspective', severity: 0, tags: ['gesture'] },
    { pattern: /\bkneel(?:ing)?\b/gi,         replacement: 'kneeling pose, upright spine, composed hands placement', severity: 0, tags: ['pose'] },
    { pattern: /\bcrouch(?:ing)?\b/gi,        replacement: 'low crouch, weight on toes, balanced posture', severity: 0, tags: ['pose'] },
    { pattern: /\bmid[-\s]*jump\b/gi,        replacement: 'mid-air leap, frozen motion, limbs extended', severity: 0, tags: ['action'] },
    { pattern: /\bsprint(?:ing)?\b/gi,        replacement: 'sprinting action, forward lean, trailing motion blur', severity: 0, tags: ['action'] }
  ]
});
// >>> END OF BLOCK 44 <<<
/* ================================================================
 * BLOCK 44 — POSES & GESTURES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 45 — FACIAL EXPRESSIONS & GAZE (EN)  (START)
 * ID: BLOCK 45
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map casual expression words to precise visual cues for face rendering.
 *   - SFW by default; 45a provides NSFW-leaning escalations.
 * ================================================================ */
// >>> START OF BLOCK 45 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 45',
  language: 'en',
  category: 'facial_expressions',
  emoji: ['🙂','😉','😍','😮‍💨'],
  notes: ['Describe micro-features: eyelids, brows, lip tension, mouth shape, gaze direction.'],
  entries: [
    { pattern: /\bsoft\s*smile\b/gi,        replacement: 'subtle smile, corners lifted, relaxed cheeks', severity: 0, tags: ['smile'] },
    { pattern: /\bsmirk\b/gi,                replacement: 'one-sided smirk, slight brow raise, playful expression', severity: 0, tags: ['smile'] },
    { pattern: /\bpout\b/gi,                 replacement: 'gentle lip pout, lower lip emphasis, softened jaw', severity: 0, tags: ['lips'] },
    { pattern: /\bbiting\s*lip\b/gi,        replacement: 'teeth lightly catching lower lip, suggestive tension', severity: 1, tags: ['lips'] },
    { pattern: /\bbedroom\s*eyes\b/gi,      replacement: 'half-lidded gaze, slow blink, relaxed brow line', severity: 1, tags: ['gaze'] },
    { pattern: /\bwink\b/gi,                 replacement: 'single eye closed, cheek raised, playful cue', severity: 0, tags: ['gaze'] },
    { pattern: /\bflushed\s*cheeks\b/gi,    replacement: 'warm cheek flush, slight skin redness, heightened emotion', severity: 0, tags: ['blush'] },
    { pattern: /\bafterglow\b/gi,           replacement: 'relaxed eyelids, gentle smile, warm skin tone, calm breathing', severity: 1, tags: ['mood'] }
  ]
});
// >>> END OF BLOCK 45 <<<
/* ================================================================
 * BLOCK 45 — FACIAL EXPRESSIONS & GAZE (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 45a — FACIAL EXPRESSIONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 45a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate certain cues into overtly sexualized facial expressions for adult content.
 * ================================================================ */
// >>> START OF BLOCK 45a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 45a',
  language: 'en',
  category: 'facial_expressions_explicit',
  gated: true,
  emoji: ['🔥','😛'],
  notes: ['Directional mirror of BLOCK 45.'],
  entries: [
    { pattern: /\bgentle lip pout, lower lip emphasis, softened jaw\b/gi, replacement: 'kissy pout', severity: 2, tags: ['explicit'] },
    { pattern: /\bteeth lightly catching lower lip, suggestive tension\b/gi, replacement: 'lip bite (sexy)', severity: 3, tags: ['explicit'] },
    { pattern: /\bhalf-lidded gaze, slow blink, relaxed brow line\b/gi, replacement: 'bedroom eyes (seductive)', severity: 3, tags: ['explicit'] },
    { pattern: /\brelaxed eyelids, gentle smile, warm skin tone, calm breathing\b/gi, replacement: 'post-sex afterglow', severity: 3, tags: ['explicit'] },
    { pattern: /\bplayful expression\b/gi, replacement: 'lewd playful look', severity: 3, tags: ['explicit'] },
    { pattern: /\bheightened emotion\b/gi, replacement: 'porny flushed face', severity: 4, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 45a <<<
/* ================================================================
 * BLOCK 45a — FACIAL EXPRESSIONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 46 — KINK & BDSM (CLINICAL, CONSENSUAL) (EN)  (START)
 * ID: BLOCK 46
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide neutral descriptors for consensual kink elements (props, roles, scenes).
 *   - Avoid dangerous/illegal content; safety-first language. Adults only.
 * INTERNAL NOTES:
 *   - Mirrors mapped in 46a for spicier synonyms. Keep this block calm/clinical.
 * ================================================================ */
// >>> START OF BLOCK 46 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 46',
  language: 'en',
  category: 'kink_bdsm_clinical',
  emoji: ['🪢','🕯️','🎭','🧷'],
  notes: [
    'Always consensual, negotiated, safe signals implied.',
    'Focus on visual props, positions, and scene descriptors.'
  ],
  entries: [
    // ——— PROPS / RESTRAINTS ———
    { pattern: /\brope\s*bondage\b/gi,         replacement: 'rope bondage (consensual), symmetrical harness patterns', severity: 3, tags: ['bondage'] },
    { pattern: /\bshibari\b/gi,                 replacement: 'decorative rope harness (consensual), balanced tension, neat knots', severity: 3, tags: ['bondage'] },
    { pattern: /\bblindfold\b/gi,               replacement: 'soft blindfold, sensory reduction, trust emphasis', severity: 2, tags: ['sensory'] },
    { pattern: /\bgag\b/gi,                     replacement: 'ball gag (consensual), breathable fit, safe signals arranged', severity: 3, tags: ['prop'] },
    { pattern: /\bhandcuffs?\b/gi,              replacement: 'padded cuffs with quick-release hardware', severity: 2, tags: ['restraint'] },
    { pattern: /\bspread(er)?\s*bar\b/gi,       replacement: 'adjustable spreader bar, controlled limb spacing', severity: 3, tags: ['restraint'] },

    // ——— ROLES / DYNAMICS ———
    { pattern: /\bdominant\b/gi,                replacement: 'dominant role (consensual power exchange)', severity: 2, tags: ['role'] },
    { pattern: /\bsubmissive\b/gi,              replacement: 'submissive role (consensual power exchange)', severity: 2, tags: ['role'] },
    { pattern: /\bswitch\b/gi,                  replacement: 'switch role (flexible power exchange)', severity: 1, tags: ['role'] },

    // ——— SCENES / SENSATIONS ———
    { pattern: /\bimpact\s*play\b/gi,           replacement: 'light impact play (consensual), safe zones, warmed skin', severity: 3, tags: ['scene'] },
    { pattern: /\bwax\s*play\b/gi,              replacement: 'warm wax drip (consensual), safe temperature, skin-safe candles', severity: 3, tags: ['scene'] },
    { pattern: /\bedge\s*play\b/gi,             replacement: 'edging (consensual arousal control)', severity: 3, tags: ['scene'] },
    { pattern: /\bservice\s*submission\b/gi,    replacement: 'service-oriented submission, attentive tasks, ritual tone', severity: 2, tags: ['scene'] }
  ]
});
// >>> END OF BLOCK 46 <<<
/* ================================================================
 * BLOCK 46 — KINK & BDSM (CLINICAL, CONSENSUAL) (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 46a — KINK & BDSM EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 46a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate neutral kink descriptors into spicier colloquialisms (adults only, opt-in).
 * ================================================================ */
// >>> START OF BLOCK 46a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 46a',
  language: 'en',
  category: 'kink_bdsm_explicit',
  gated: true,
  emoji: ['🔥','🪢','🖤'],
  notes: ['Directional mirror of BLOCK 46.'],
  entries: [
    { pattern: /\brope bondage \(consensual\), symmetrical harness patterns\b/gi, replacement: 'tight rope bondage, full body harness', severity: 4, tags: ['explicit'] },
    { pattern: /\bdecorative rope harness \(consensual\), balanced tension, neat knots\b/gi, replacement: 'shibari rope harness', severity: 4, tags: ['explicit'] },
    { pattern: /\bsoft blindfold, sensory reduction, trust emphasis\b/gi, replacement: 'blindfolded', severity: 3, tags: ['explicit'] },
    { pattern: /\bball gag \(consensual\), breathable fit, safe signals arranged\b/gi, replacement: 'gagged', severity: 4, tags: ['explicit'] },
    { pattern: /\bpadded cuffs with quick-release hardware\b/gi, replacement: 'restrained in cuffs', severity: 3, tags: ['explicit'] },
    { pattern: /\badjustable spreader bar, controlled limb spacing\b/gi, replacement: 'legs spread with a bar', severity: 4, tags: ['explicit'] },
    { pattern: /\blight impact play \(consensual\), safe zones, warmed skin\b/gi, replacement: 'ass spanking', severity: 4, tags: ['explicit'] },
    { pattern: /\bwarm wax drip \(consensual\), safe temperature, skin-safe candles\b/gi, replacement: 'hot wax play', severity: 4, tags: ['explicit'] },
    { pattern: /\bedging \(consensual arousal control\)\b/gi, replacement: 'edging control', severity: 4, tags: ['explicit'] },
    { pattern: /\bservice-oriented submission, attentive tasks, ritual tone\b/gi, replacement: 'service sub scene', severity: 3, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 46a <<<
/* ================================================================
 * BLOCK 46a — KINK & BDSM EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 42 — WARDROBE & FABRICS (EN)  (START)
 * ID: BLOCK 42
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand clothing/wardrobe terms into detailed, brand-free descriptors (street → couture → lingerie).
 *   - SFW by default; avoids explicit phrasing while still being precise for renders.
 * INTERNAL NOTES:
 *   - Pairs with BLOCK 42a for explicit-directional mirroring when allowExplicit:true.
 *   - Materials/fabric tokens emphasize texture, transparency, drape, sheen, stretch.
 * ================================================================ */
// >>> START OF BLOCK 42 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 42',
  language: 'en',
  category: 'wardrobe_fabrics',
  emoji: ['👗','🧵','🧷','🧦'],
  notes: [
    'Clothing descriptors stay neutral; no porn-y prose. Stack with photo/pose blocks.',
    'Use fabric + cut + detail for best results (e.g., “silk slip dress with lace trim”).'
  ],
  entries: [
    // ——— BASE GARMENTS ———
    { pattern: /\bt[-\s]*shirt\b/gi,       replacement: 'crew-neck t-shirt, soft cotton jersey, relaxed fit', severity: 0, tags: ['casual'] },
    { pattern: /\btank\s*top\b/gi,        replacement: 'sleeveless tank top, ribbed knit, fitted silhouette', severity: 0, tags: ['casual'] },
    { pattern: /\bcrop\s*top\b/gi,        replacement: 'cropped top, short hemline, close fit', severity: 0, tags: ['casual'] },
    { pattern: /\bhoodie\b/gi,             replacement: 'pullover hoodie, kangaroo pocket, brushed fleece lining, drawstring hood', severity: 0, tags: ['casual'] },
    { pattern: /\bbutton[-\s]*down\b/gi,  replacement: 'button-down shirt, crisp woven cotton, pointed collar, cuffed sleeves', severity: 0, tags: ['smart'] },
    { pattern: /\bblouse\b/gi,            replacement: 'lightweight blouse, soft drape, subtle sheen, gentle gathers', severity: 0, tags: ['smart'] },
    { pattern: /\bbodysuit\b/gi,          replacement: 'form-fitting bodysuit, stretch knit, clean tucked finish', severity: 0, tags: ['base'] },

    // ——— LEGS ———
    { pattern: /\bjeans\b/gi,              replacement: 'denim jeans, 5-pocket, subtle whiskering, straight or slim cut', severity: 0, tags: ['denim'] },
    { pattern: /\bhigh[-\s]*waist(ed)?\b/gi, replacement: 'high-rise waistline, elongated leg proportion', severity: 0, tags: ['cut'] },
    { pattern: /\bleggings\b/gi,          replacement: 'stretch leggings, matte finish, snug silhouette, opaque knit', severity: 0, tags: ['athleisure'] },
    { pattern: /\byoga\s*pants\b/gi,      replacement: 'performance stretch pants, moisture-wicking, high-rise waistband', severity: 0, tags: ['athleisure'] },
    { pattern: /\bmini\s*skirt\b/gi,      replacement: 'mini skirt, above-the-knee hem, fitted hip, clean hem', severity: 1, tags: ['skirt'] },
    { pattern: /\bpencil\s*skirt\b/gi,    replacement: 'pencil skirt, tailored fit, knee length, slit vent', severity: 0, tags: ['skirt'] },
    { pattern: /\bthigh[-\s]*highs?\b/gi, replacement: 'thigh-high stockings, elastic stay-up band, sheer denier', severity: 1, tags: ['hosiery'] },

    // ——— DRESSES / OUTER ———
    { pattern: /\bslip\s*dress\b/gi,      replacement: 'bias-cut slip dress, silk-like drape, delicate straps, subtle sheen', severity: 1, tags: ['dress'] },
    { pattern: /\bsun\s*dress\b/gi,       replacement: 'light sundress, airy cotton, floral print option, breezy silhouette', severity: 0, tags: ['dress'] },
    { pattern: /\bplunging\s*neckline\b/gi, replacement: 'deep V neckline, elongated décolletage line', severity: 1, tags: ['detail'] },
    { pattern: /\bopen\s*back\b/gi,       replacement: 'open-back detail, low scoop, strap emphasis', severity: 1, tags: ['detail'] },
    { pattern: /\bkimono\s*robe\b/gi,     replacement: 'kimono-style robe, wide sleeves, loose sash tie, flowing drape', severity: 0, tags: ['outer'] },
    { pattern: /\btrench\s*coat\b/gi,     replacement: 'belted trench coat, storm flaps, double-breasted front, gabardine', severity: 0, tags: ['outer'] },

    // ——— LINGERIE (NEUTRAL) ———
    { pattern: /\bpush[-\s]*up\s*bra\b/gi, replacement: 'underwire bra with lift, molded cups, adjustable straps', severity: 1, tags: ['lingerie'] },
    { pattern: /\bbralette\b/gi,          replacement: 'soft bralette, unlined, delicate lace overlay', severity: 1, tags: ['lingerie'] },
    { pattern: /\bpanties\b/gi,           replacement: 'brief-style underwear, soft elastic trim, comfortable fit', severity: 1, tags: ['lingerie'] },
    { pattern: /\bthong\b/gi,             replacement: 'minimal-coverage underwear, narrow back strap, low rise', severity: 2, tags: ['lingerie'] },
    { pattern: /\bg[-\s]*string\b/gi,     replacement: 'string-back underwear, minimal coverage, slim side straps', severity: 2, tags: ['lingerie'] },
    { pattern: /\bgarter\s*belt\b/gi,     replacement: 'garter belt, adjustable straps, clip fasteners for stockings', severity: 2, tags: ['lingerie'] },
    { pattern: /\bfishnets?\b/gi,         replacement: 'fishnet stockings, diamond mesh pattern, elastic cuff', severity: 1, tags: ['hosiery'] },
    { pattern: /\bbustier\b/gi,           replacement: 'structured bustier top, boning channels, fitted bodice', severity: 1, tags: ['lingerie'] },
    { pattern: /\bcorset\b/gi,            replacement: 'corset with lacing, hourglass shaping, steel or plastic boning', severity: 1, tags: ['lingerie'] },

    // ——— FABRICS / TEXTURES ———
    { pattern: /\bsilk\b/gi,              replacement: 'silk-like fabric, fluid drape, soft luster', severity: 0, tags: ['fabric'] },
    { pattern: /\bsatin\b/gi,             replacement: 'satin weave, glossy face, smooth hand-feel', severity: 0, tags: ['fabric'] },
    { pattern: /\blace\b/gi,              replacement: 'lace textile, floral motifs, semi-sheer openness', severity: 1, tags: ['fabric'] },
    { pattern: /\bmesh\b/gi,              replacement: 'fine mesh fabric, breathable net structure, semi-sheer', severity: 1, tags: ['fabric'] },
    { pattern: /\bvelvet\b/gi,            replacement: 'velvet pile, directional sheen, plush texture', severity: 0, tags: ['fabric'] },
    { pattern: /\bchiffon\b/gi,           replacement: 'light chiffon, translucent veil, soft flutter', severity: 0, tags: ['fabric'] },
    { pattern: /\btulle\b/gi,             replacement: 'tulle netting, fine hex mesh, airy volume', severity: 0, tags: ['fabric'] },
    { pattern: /\bleather\b/gi,           replacement: 'leather material, subtle grain, matte to semi-gloss finish', severity: 0, tags: ['material'] },
    { pattern: /\blatex\b/gi,             replacement: 'latex rubber finish, high-gloss sheen, tight stretch', severity: 1, tags: ['material'] }
  ]
});
// >>> END OF BLOCK 42 <<<
/* ================================================================
 * BLOCK 42 — WARDROBE & FABRICS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 42a — WARDROBE EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 42a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate neutral wardrobe tokens into spicy/NSFW-leaning phrasing (opt-in only).
 *   - Applied by PF_CORE.applyDirectional() when allowExplicit:true and direction='explicit'.
 * INTERNAL NOTES:
 *   - Keep consensual adult framing; avoid graphic porn prose. Focus on attire transparency/reveal.
 * ================================================================ */
// >>> START OF BLOCK 42a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 42a',
  language: 'en',
  category: 'wardrobe_explicit',
  gated: true,
  emoji: ['🔥','🧦','🕸️'],
  notes: ['Directional mirror of BLOCK 42.'],
  entries: [
    { pattern: /\bbodysuit\b/gi,                 replacement: 'skin-tight bodysuit', severity: 3, tags: ['explicit'] },
    { pattern: /\bthigh-high stockings\b/gi,     replacement: 'thigh-high stockings with garters', severity: 3, tags: ['explicit'] },
    { pattern: /\bdeep V neckline\b/gi,          replacement: 'plunging cleavage-baring neckline', severity: 4, tags: ['explicit'] },
    { pattern: /\bopen-back detail\b/gi,         replacement: 'open back that bares a lot of skin', severity: 3, tags: ['explicit'] },
    { pattern: /\bstring-back underwear\b/gi,    replacement: 'g-string thong', severity: 4, tags: ['explicit'] },
    { pattern: /\bbrief-style underwear\b/gi,    replacement: 'low-rise panties', severity: 3, tags: ['explicit'] },
    { pattern: /\bdelicate lace overlay\b/gi,    replacement: 'sheer lace that shows through', severity: 4, tags: ['explicit'] },
    { pattern: /\bfishnet stockings\b/gi,        replacement: 'fishnet stockings revealing skin', severity: 3, tags: ['explicit'] },
    { pattern: /\blatex rubber finish\b/gi,      replacement: 'tight latex that clings to every curve', severity: 4, tags: ['explicit'] },
    { pattern: /\bsemi-sheer\b/gi,                replacement: 'see-through', severity: 4, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 42a <<<
/* ================================================================
 * BLOCK 42a — WARDROBE EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 43 — BODY DESCRIPTORS & PROPORTIONS (EN)  (START)
 * ID: BLOCK 43
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map casual body-shape adjectives to neutral, adult-only descriptors.
 *   - Avoid minors/age cues; focus on physique, posture, proportions.
 * INTERNAL NOTES:
 *   - Mirrors in BLOCK 43a will escalate to colloquial/slang when allowed.
 * ================================================================ */
// >>> START OF BLOCK 43 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 43',
  language: 'en',
  category: 'body_descriptors',
  emoji: ['🧍','🧍‍♀️','📏'],
  notes: [
    'Adult-only physique language; no age diminutives.',
    'Use positive, descriptive adjectives; avoid judgmental phrasing.'
  ],
  entries: [
    // ——— GENERAL BUILD ———
    { pattern: /\bathletic\b/gi,      replacement: 'athletic build, defined musculature, balanced proportions', severity: 0, tags: ['build'] },
    { pattern: /\bcurvy\b/gi,         replacement: 'curvy figure, fuller hips and chest, soft contours', severity: 1, tags: ['build'] },
    { pattern: /\bslim\b/gi,          replacement: 'slim build, narrow waist, light frame', severity: 0, tags: ['build'] },
    { pattern: /\bthick\b/gi,         replacement: 'full-figured build, strong thighs and hips', severity: 1, tags: ['build'] },
    { pattern: /\bhourglass\b/gi,     replacement: 'hourglass proportions, pronounced waist-to-hip contrast', severity: 0, tags: ['proportion'] },
    { pattern: /\bpear[-\s]*shaped\b/gi, replacement: 'pear-shaped proportions, fuller hips, narrower shoulders', severity: 0, tags: ['proportion'] },
    { pattern: /\bapple[-\s]*shaped\b/gi, replacement: 'apple-shaped proportions, fuller torso, slimmer legs', severity: 0, tags: ['proportion'] },

    // ——— FEATURES ———
    { pattern: /\btoned\s*abs\b/gi,   replacement: 'defined abdominal muscles', severity: 0, tags: ['feature'] },
    { pattern: /\bstrong\s*legs\b/gi, replacement: 'powerful legs, visible quad and calf definition', severity: 0, tags: ['feature'] },
    { pattern: /\bwide\s*hips\b/gi,   replacement: 'wide hip structure, rounded silhouette', severity: 0, tags: ['feature'] },
    { pattern: /\bround\s*butt\b/gi, replacement: 'rounded gluteal shape', severity: 1, tags: ['feature'] },
    { pattern: /\bbroad\s*shoulders\b/gi, replacement: 'broad shoulder width, tapered torso', severity: 0, tags: ['feature'] },
    { pattern: /\blong\s*legs\b/gi,   replacement: 'long leg proportion, elongated femur-to-torso ratio', severity: 0, tags: ['feature'] }
  ]
});
// >>> END OF BLOCK 43 <<<
/* ================================================================
 * BLOCK 43 — BODY DESCRIPTORS & PROPORTIONS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 43a — BODY DESCRIPTORS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 43a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Colloquial/slang escalations of physique terms (opt-in only; adults).
 * ================================================================ */
// >>> START OF BLOCK 43a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 43a',
  language: 'en',
  category: 'body_descriptors_explicit',
  gated: true,
  emoji: ['🔥','🧍‍♀️'],
  notes: ['Directional mirror of BLOCK 43; pairs with BLOCK 2a semantics.'],
  entries: [
    { pattern: /\bcurvy figure, fuller hips and chest, soft contours\b/gi, replacement: 'thick and curvy', severity: 3, tags: ['explicit'] },
    { pattern: /\bhourglass proportions, pronounced waist-to-hip contrast\b/gi, replacement: 'hourglass body, tight waist, big curves', severity: 3, tags: ['explicit'] },
    { pattern: /\brounded gluteal shape\b/gi, replacement: 'big round ass', severity: 4, tags: ['explicit'] },
    { pattern: /\bdefined abdominal muscles\b/gi, replacement: 'tight abs', severity: 2, tags: ['explicit'] },
    { pattern: /\bbroad shoulder width, tapered torso\b/gi, replacement: 'wide shoulders, V-taper', severity: 2, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 43a <<<
/* ================================================================
 * BLOCK 43a — BODY DESCRIPTORS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 44 — POSES & GESTURES (EN)  (START)
 * ID: BLOCK 44
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand casual pose/gesture terms for portraits, fashion, action.
 *   - Non-NSFW domain; stack with wardrobe/face/camera blocks.
 * ================================================================ */
// >>> START OF BLOCK 44 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 44',
  language: 'en',
  category: 'poses_gestures',
  emoji: ['🧍','🤳','🏃'],
  notes: ['Action verbs and iconic poses rendered as camera-friendly descriptors.'],
  entries: [
    { pattern: /\bcontrapposto\b/gi,          replacement: 'contrapposto stance, weight on one leg, S-curve torso', severity: 0, tags: ['pose'] },
    { pattern: /\bs[-\s]*curve\s*pose\b/gi,  replacement: 'S-curve pose, hip pop, shoulder tilt, elegant line', severity: 0, tags: ['pose'] },
    { pattern: /\bpower\s*pose\b/gi,         replacement: 'power pose, feet apart, hands on hips, chin lifted', severity: 0, tags: ['pose'] },
    { pattern: /\bover[-\s]*the[-\s]*shoulder\b/gi, replacement: 'over-the-shoulder glance, turned torso, gaze back to camera', severity: 0, tags: ['pose'] },
    { pattern: /\bhair\s*flip\b/gi,          replacement: 'dynamic hair flip, motion arc, captured mid-swing', severity: 0, tags: ['gesture'] },
    { pattern: /\bhand\s*on\s*hip(s)?\b/gi,  replacement: 'one hand on hip, elbow flare, confident stance', severity: 0, tags: ['gesture'] },
    { pattern: /\barms\s*crossed\b/gi,       replacement: 'arms crossed across chest, assertive posture', severity: 0, tags: ['gesture'] },
    { pattern: /\breaching\s*out\b/gi,       replacement: 'arm extended toward camera, shallow depth perspective', severity: 0, tags: ['gesture'] },
    { pattern: /\bkneel(?:ing)?\b/gi,         replacement: 'kneeling pose, upright spine, composed hands placement', severity: 0, tags: ['pose'] },
    { pattern: /\bcrouch(?:ing)?\b/gi,        replacement: 'low crouch, weight on toes, balanced posture', severity: 0, tags: ['pose'] },
    { pattern: /\bmid[-\s]*jump\b/gi,        replacement: 'mid-air leap, frozen motion, limbs extended', severity: 0, tags: ['action'] },
    { pattern: /\bsprint(?:ing)?\b/gi,        replacement: 'sprinting action, forward lean, trailing motion blur', severity: 0, tags: ['action'] }
  ]
});
// >>> END OF BLOCK 44 <<<
/* ================================================================
 * BLOCK 44 — POSES & GESTURES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 45 — FACIAL EXPRESSIONS & GAZE (EN)  (START)
 * ID: BLOCK 45
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map casual expression words to precise visual cues for face rendering.
 *   - SFW by default; 45a provides NSFW-leaning escalations.
 * ================================================================ */
// >>> START OF BLOCK 45 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 45',
  language: 'en',
  category: 'facial_expressions',
  emoji: ['🙂','😉','😍','😮‍💨'],
  notes: ['Describe micro-features: eyelids, brows, lip tension, mouth shape, gaze direction.'],
  entries: [
    { pattern: /\bsoft\s*smile\b/gi,        replacement: 'subtle smile, corners lifted, relaxed cheeks', severity: 0, tags: ['smile'] },
    { pattern: /\bsmirk\b/gi,                replacement: 'one-sided smirk, slight brow raise, playful expression', severity: 0, tags: ['smile'] },
    { pattern: /\bpout\b/gi,                 replacement: 'gentle lip pout, lower lip emphasis, softened jaw', severity: 0, tags: ['lips'] },
    { pattern: /\bbiting\s*lip\b/gi,        replacement: 'teeth lightly catching lower lip, suggestive tension', severity: 1, tags: ['lips'] },
    { pattern: /\bbedroom\s*eyes\b/gi,      replacement: 'half-lidded gaze, slow blink, relaxed brow line', severity: 1, tags: ['gaze'] },
    { pattern: /\bwink\b/gi,                 replacement: 'single eye closed, cheek raised, playful cue', severity: 0, tags: ['gaze'] },
    { pattern: /\bflushed\s*cheeks\b/gi,    replacement: 'warm cheek flush, slight skin redness, heightened emotion', severity: 0, tags: ['blush'] },
    { pattern: /\bafterglow\b/gi,           replacement: 'relaxed eyelids, gentle smile, warm skin tone, calm breathing', severity: 1, tags: ['mood'] }
  ]
});
// >>> END OF BLOCK 45 <<<
/* ================================================================
 * BLOCK 45 — FACIAL EXPRESSIONS & GAZE (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 45a — FACIAL EXPRESSIONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 45a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate certain cues into overtly sexualized facial expressions for adult content.
 * ================================================================ */
// >>> START OF BLOCK 45a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 45a',
  language: 'en',
  category: 'facial_expressions_explicit',
  gated: true,
  emoji: ['🔥','😛'],
  notes: ['Directional mirror of BLOCK 45.'],
  entries: [
    { pattern: /\bgentle lip pout, lower lip emphasis, softened jaw\b/gi, replacement: 'kissy pout', severity: 2, tags: ['explicit'] },
    { pattern: /\bteeth lightly catching lower lip, suggestive tension\b/gi, replacement: 'lip bite (sexy)', severity: 3, tags: ['explicit'] },
    { pattern: /\bhalf-lidded gaze, slow blink, relaxed brow line\b/gi, replacement: 'bedroom eyes (seductive)', severity: 3, tags: ['explicit'] },
    { pattern: /\brelaxed eyelids, gentle smile, warm skin tone, calm breathing\b/gi, replacement: 'post-sex afterglow', severity: 3, tags: ['explicit'] },
    { pattern: /\bplayful expression\b/gi, replacement: 'lewd playful look', severity: 3, tags: ['explicit'] },
    { pattern: /\bheightened emotion\b/gi, replacement: 'porny flushed face', severity: 4, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 45a <<<
/* ================================================================
 * BLOCK 45a — FACIAL EXPRESSIONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 46 — KINK & BDSM (CLINICAL, CONSENSUAL) (EN)  (START)
 * ID: BLOCK 46
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide neutral descriptors for consensual kink elements (props, roles, scenes).
 *   - Avoid dangerous/illegal content; safety-first language. Adults only.
 * INTERNAL NOTES:
 *   - Mirrors mapped in 46a for spicier synonyms. Keep this block calm/clinical.
 * ================================================================ */
// >>> START OF BLOCK 46 CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 46',
  language: 'en',
  category: 'kink_bdsm_clinical',
  emoji: ['🪢','🕯️','🎭','🧷'],
  notes: [
    'Always consensual, negotiated, safe signals implied.',
    'Focus on visual props, positions, and scene descriptors.'
  ],
  entries: [
    // ——— PROPS / RESTRAINTS ———
    { pattern: /\brope\s*bondage\b/gi,         replacement: 'rope bondage (consensual), symmetrical harness patterns', severity: 3, tags: ['bondage'] },
    { pattern: /\bshibari\b/gi,                 replacement: 'decorative rope harness (consensual), balanced tension, neat knots', severity: 3, tags: ['bondage'] },
    { pattern: /\bblindfold\b/gi,               replacement: 'soft blindfold, sensory reduction, trust emphasis', severity: 2, tags: ['sensory'] },
    { pattern: /\bgag\b/gi,                     replacement: 'ball gag (consensual), breathable fit, safe signals arranged', severity: 3, tags: ['prop'] },
    { pattern: /\bhandcuffs?\b/gi,              replacement: 'padded cuffs with quick-release hardware', severity: 2, tags: ['restraint'] },
    { pattern: /\bspread(er)?\s*bar\b/gi,       replacement: 'adjustable spreader bar, controlled limb spacing', severity: 3, tags: ['restraint'] },

    // ——— ROLES / DYNAMICS ———
    { pattern: /\bdominant\b/gi,                replacement: 'dominant role (consensual power exchange)', severity: 2, tags: ['role'] },
    { pattern: /\bsubmissive\b/gi,              replacement: 'submissive role (consensual power exchange)', severity: 2, tags: ['role'] },
    { pattern: /\bswitch\b/gi,                  replacement: 'switch role (flexible power exchange)', severity: 1, tags: ['role'] },

    // ——— SCENES / SENSATIONS ———
    { pattern: /\bimpact\s*play\b/gi,           replacement: 'light impact play (consensual), safe zones, warmed skin', severity: 3, tags: ['scene'] },
    { pattern: /\bwax\s*play\b/gi,              replacement: 'warm wax drip (consensual), safe temperature, skin-safe candles', severity: 3, tags: ['scene'] },
    { pattern: /\bedge\s*play\b/gi,             replacement: 'edging (consensual arousal control)', severity: 3, tags: ['scene'] },
    { pattern: /\bservice\s*submission\b/gi,    replacement: 'service-oriented submission, attentive tasks, ritual tone', severity: 2, tags: ['scene'] }
  ]
});
// >>> END OF BLOCK 46 <<<
/* ================================================================
 * BLOCK 46 — KINK & BDSM (CLINICAL, CONSENSUAL) (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 46a — KINK & BDSM EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 46a
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Escalate neutral kink descriptors into spicier colloquialisms (adults only, opt-in).
 * ================================================================ */
// >>> START OF BLOCK 46a CODE <<<
PF_PACKS.push({
  block_id: 'BLOCK 46a',
  language: 'en',
  category: 'kink_bdsm_explicit',
  gated: true,
  emoji: ['🔥','🪢','🖤'],
  notes: ['Directional mirror of BLOCK 46.'],
  entries: [
    { pattern: /\brope bondage \(consensual\), symmetrical harness patterns\b/gi, replacement: 'tight rope bondage, full body harness', severity: 4, tags: ['explicit'] },
    { pattern: /\bdecorative rope harness \(consensual\), balanced tension, neat knots\b/gi, replacement: 'shibari rope harness', severity: 4, tags: ['explicit'] },
    { pattern: /\bsoft blindfold, sensory reduction, trust emphasis\b/gi, replacement: 'blindfolded', severity: 3, tags: ['explicit'] },
    { pattern: /\bball gag \(consensual\), breathable fit, safe signals arranged\b/gi, replacement: 'gagged', severity: 4, tags: ['explicit'] },
    { pattern: /\bpadded cuffs with quick-release hardware\b/gi, replacement: 'restrained in cuffs', severity: 3, tags: ['explicit'] },
    { pattern: /\badjustable spreader bar, controlled limb spacing\b/gi, replacement: 'legs spread with a bar', severity: 4, tags: ['explicit'] },
    { pattern: /\blight impact play \(consensual\), safe zones, warmed skin\b/gi, replacement: 'ass spanking', severity: 4, tags: ['explicit'] },
    { pattern: /\bwarm wax drip \(consensual\), safe temperature, skin-safe candles\b/gi, replacement: 'hot wax play', severity: 4, tags: ['explicit'] },
    { pattern: /\bedging \(consensual arousal control\)\b/gi, replacement: 'edging control', severity: 4, tags: ['explicit'] },
    { pattern: /\bservice-oriented submission, attentive tasks, ritual tone\b/gi, replacement: 'service sub scene', severity: 3, tags: ['explicit'] }
  ]
});
// >>> END OF BLOCK 46a <<<
/* ================================================================
 * BLOCK 46a — KINK & BDSM EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 47 — COSMETICS, HAIR & GROOMING (EN)  (START)
 * ID: BLOCK 47
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Capture makeup, hair styling, nails, grooming in detailed but SFW terms.
 *   - Expand casual “makeup look” into concrete descriptors (smokey eye, glossy lip, etc).
 * INTERNAL NOTES:
 *   - BLOCK 47a will escalate to sultrier/glam/NSFW-leaning phrasing.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 47',
  language: 'en',
  category: 'cosmetics_hair_grooming',
  emoji: ['💄','💇','💅','🪮'],
  notes: ['Focus on visual traits, product finish, color language; keep brand-free.'],
  entries: [
    { pattern: /\bsmokey\s*eye\b/gi, replacement: 'smokey eye makeup, dark blended shadow, smudged liner, diffused edges', severity: 0, tags: ['makeup'] },
    { pattern: /\bwinged\s*liner\b/gi, replacement: 'winged eyeliner, sharp flick, cat-eye shape', severity: 0, tags: ['makeup'] },
    { pattern: /\bglossy\s*lips\b/gi, replacement: 'lip gloss finish, reflective shine, plump appearance', severity: 0, tags: ['makeup'] },
    { pattern: /\bmatte\s*lips\b/gi, replacement: 'matte lipstick finish, velvety texture, no shine', severity: 0, tags: ['makeup'] },
    { pattern: /\bblush\b/gi, replacement: 'soft cheek blush, warm tone, blended edges', severity: 0, tags: ['makeup'] },
    { pattern: /\bhighlighter\b/gi, replacement: 'luminous highlighter, glowy cheekbone sheen, light catch', severity: 0, tags: ['makeup'] },
    { pattern: /\bcontour\b/gi, replacement: 'contoured shading, defined cheek hollows, nose line sculpting', severity: 0, tags: ['makeup'] },

    // ——— HAIR ———
    { pattern: /\bponytail\b/gi, replacement: 'high ponytail, smooth crown, gathered back', severity: 0, tags: ['hair'] },
    { pattern: /\bbraids?\b/gi, replacement: 'braided hair, neat plaits, woven texture', severity: 0, tags: ['hair'] },
    { pattern: /\bpigtails?\b/gi, replacement: 'twin ponytails, symmetrical parting, playful look', severity: 0, tags: ['hair'] },
    { pattern: /\bupdo\b/gi, replacement: 'styled updo, gathered bun, polished finish', severity: 0, tags: ['hair'] },
    { pattern: /\bshaved\s*side\b/gi, replacement: 'undercut style, one side closely shaved', severity: 0, tags: ['hair'] },
    { pattern: /\bcurly\b/gi, replacement: 'natural curls, voluminous coils, springy texture', severity: 0, tags: ['hair'] },
    { pattern: /\bwavy\b/gi, replacement: 'soft beach waves, tousled movement', severity: 0, tags: ['hair'] },
    { pattern: /\bstraight\s*hair\b/gi, replacement: 'sleek straight hair, smooth shine', severity: 0, tags: ['hair'] },

    // ——— NAILS & GROOMING ———
    { pattern: /\bmanicure\b/gi, replacement: 'well-groomed manicure, glossy finish, even nail shape', severity: 0, tags: ['nails'] },
    { pattern: /\bpedicure\b/gi, replacement: 'pedicure, polished toes, clean cuticles', severity: 0, tags: ['nails'] },
    { pattern: /\bpolished\s*nails\b/gi, replacement: 'nails with polish, uniform color coat', severity: 0, tags: ['nails'] },
    { pattern: /\bbody\s*hair\s*removed\b/gi, replacement: 'smooth skin (groomed)', severity: 0, tags: ['grooming'] },
    { pattern: /\bstubble\b/gi, replacement: 'short facial stubble, rough texture', severity: 0, tags: ['grooming'] },
    { pattern: /\bbeard\b/gi, replacement: 'full beard, groomed shape, dense growth', severity: 0, tags: ['grooming'] }
  ]
});
/* ================================================================
 * BLOCK 47 — COSMETICS, HAIR & GROOMING (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 47a — COSMETICS, HAIR & GROOMING EXPLICIT (EN)  (START)
 * ID: BLOCK 47a
 * PURPOSE:
 *   - Escalate makeup/hair into sultry, glam, fetish-leaning language (opt-in).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 47a',
  language: 'en',
  category: 'cosmetics_hair_grooming_explicit',
  gated: true,
  emoji: ['🔥','💄'],
  notes: ['Turns beauty cues into seductive/sexualized vibe.'],
  entries: [
    { pattern: /\bsmokey eye makeup, dark blended shadow, smudged liner, diffused edges\b/gi, replacement: 'dark sultry smokey eyes', severity: 3, tags: ['explicit'] },
    { pattern: /\blip gloss finish, reflective shine, plump appearance\b/gi, replacement: 'wet glossy lips', severity: 3, tags: ['explicit'] },
    { pattern: /\bcontoured shading, defined cheek hollows, nose line sculpting\b/gi, replacement: 'sharp seductive contour', severity: 2, tags: ['explicit'] },
    { pattern: /\bhigh ponytail, smooth crown, gathered back\b/gi, replacement: 'high tight ponytail (dominatrix vibe)', severity: 3, tags: ['explicit'] },
    { pattern: /\btwin ponytails, symmetrical parting, playful look\b/gi, replacement: 'pigtails (naughty look)', severity: 3, tags: ['explicit'] },
    { pattern: /\bundercut style, one side closely shaved\b/gi, replacement: 'edgy shaved side, bad-girl energy', severity: 2, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 47a — COSMETICS, HAIR & GROOMING EXPLICIT (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 48 — EMOJI & SYMBOL EXPANSION (EN)  (START)
 * ID: BLOCK 48
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map hundreds of emoji to neutral descriptors so prompts can use symbolic language.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 48',
  language: 'en',
  category: 'emoji_symbols',
  emoji: ['😈','🍑','🍆','💦','🔥','🎃','🌊','⭐'],
  notes: ['Expanded emoji semantics; can be combined with slider to drop explicit tone when needed.'],
  entries: [
    { pattern: /😈/g, replacement: 'mischievous devilish mood', severity: 1, tags: ['mood'] },
    { pattern: /🍑/g, replacement: 'buttocks', severity: 1, tags: ['anatomy'] },
    { pattern: /🍆/g, replacement: 'penis', severity: 3, tags: ['anatomy'] },
    { pattern: /💦/g, replacement: 'splashing liquid', severity: 3, tags: ['fluid'] },
    { pattern: /🔥/g, replacement: 'fire, intensity, passion', severity: 1, tags: ['mood'] },
    { pattern: /🌊/g, replacement: 'ocean wave, wetness metaphor', severity: 1, tags: ['env'] },
    { pattern: /⭐/g, replacement: 'sparkle, emphasis, highlight', severity: 0, tags: ['accent'] },
    { pattern: /🎃/g, replacement: 'pumpkin, halloween vibe', severity: 0, tags: ['theme'] }
  ]
});
/* ================================================================
 * BLOCK 48 — EMOJI & SYMBOL EXPANSION (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 49 — BODY ART & ADORNMENT (EN)  (START)
 * ID: BLOCK 49
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Tattoos, piercings, scars, jewelry in detailed terms (stackable with anatomy/wardrobe).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 49',
  language: 'en',
  category: 'body_art_adornment',
  emoji: ['🖋️','💎','🧷'],
  notes: ['Focus on visual detail, placement, style.'],
  entries: [
    { pattern: /\btattoo\b/gi, replacement: 'tattoo body art, inked design, skin marking', severity: 1, tags: ['tattoo'] },
    { pattern: /\bsleeve\s*tattoo\b/gi, replacement: 'full arm sleeve tattoo, continuous design', severity: 1, tags: ['tattoo'] },
    { pattern: /\bpiercing\b/gi, replacement: 'body piercing with jewelry', severity: 1, tags: ['piercing'] },
    { pattern: /\bnipple\s*piercing\b/gi, replacement: 'nipple piercing with barbells or rings', severity: 3, tags: ['piercing'] },
    { pattern: /\bnavel\s*piercing\b/gi, replacement: 'belly button piercing with ring', severity: 2, tags: ['piercing'] },
    { pattern: /\bscar\b/gi, replacement: 'visible scar, textured skin mark', severity: 0, tags: ['scar'] },
    { pattern: /\bfreckles\b/gi, replacement: 'freckled complexion, scattered melanin spots', severity: 0, tags: ['skin'] }
  ]
});
/* ================================================================
 * BLOCK 49 — BODY ART & ADORNMENT (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 50 — MULTILINGUAL MIRROR (ES/FR/DE)  (START)
 * ID: BLOCK 50
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Mirror core anatomy (BLOCK 2/2a) into Spanish, French, German.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 50',
  language: 'multi',
  category: 'multilingual_core',
  notes: ['Mirror of anatomy terms for ES, FR, DE. Future blocks will expand.'],
  entries: [
    { pattern: /\b(teta|senos)\b/gi, replacement: 'breasts', severity: 2, tags: ['es'] },
    { pattern: /\b(verga|polla|pene)\b/gi, replacement: 'penis', severity: 3, tags: ['es'] },
    { pattern: /\bconcha|coño|vagina\b/gi, replacement: 'vagina', severity: 3, tags: ['es'] },
    { pattern: /\bsein\b/gi, replacement: 'breasts', severity: 2, tags: ['fr'] },
    { pattern: /\bchatte|vagin\b/gi, replacement: 'vagina', severity: 3, tags: ['fr'] },
    { pattern: /\bqueue|bite\b/gi, replacement: 'penis', severity: 3, tags: ['fr'] },
    { pattern: /\bbrust(en)?\b/gi, replacement: 'breasts', severity: 2, tags: ['de'] },
    { pattern: /\bscheide\b/gi, replacement: 'vagina', severity: 3, tags: ['de'] },
    { pattern: /\bpenis\b/gi, replacement: 'penis', severity: 3, tags: ['de'] }
  ]
});
/* ================================================================
 * BLOCK 50 — MULTILINGUAL MIRROR (ES/FR/DE)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 51 — FLUIDS & MARKS (EN)  (START)
 * ID: BLOCK 51
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Add more granular coverage of bodily fluids, stains, residues (clinical neutral).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 51',
  language: 'en',
  category: 'fluids_marks',
  emoji: ['💦','🩸'],
  notes: ['Clinical, non-sensational descriptors. Mirror escalates to explicit in 51a.'],
  entries: [
    { pattern: /\bsaliva\b/gi, replacement: 'saliva, moist sheen, droplet texture', severity: 2, tags: ['fluid'] },
    { pattern: /\bsweat\b/gi, replacement: 'sweat beads, glistening skin moisture', severity: 1, tags: ['fluid'] },
    { pattern: /\btears\b/gi, replacement: 'tears, watery streaks on face', severity: 1, tags: ['fluid'] },
    { pattern: /\bblood\b/gi, replacement: 'blood, red liquid, clinical depiction only', severity: 4, tags: ['fluid'] },
    { pattern: /\bbruises?\b/gi, replacement: 'bruise marks, purplish discoloration', severity: 3, tags: ['mark'] },
    { pattern: /\bhickeys?\b/gi, replacement: 'love bite marks, skin discoloration from suction', severity: 2, tags: ['mark'] }
  ]
});
/* ================================================================
 * BLOCK 51 — FLUIDS & MARKS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 51a — FLUIDS & MARKS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 51a
 * PURPOSE:
 *   - Escalate clinical fluids into raunchy, porn-industry slang (adults only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 51a',
  language: 'en',
  category: 'fluids_marks_explicit',
  gated: true,
  emoji: ['🔥','💦'],
  notes: ['Directional mirror for BLOCK 51.'],
  entries: [
    { pattern: /\bsaliva, moist sheen, droplet texture\b/gi, replacement: 'spit', severity: 4, tags: ['explicit'] },
    { pattern: /\bsweat beads, glistening skin moisture\b/gi, replacement: 'sweaty body', severity: 3, tags: ['explicit'] },
    { pattern: /\btears, watery streaks on face\b/gi, replacement: 'teary-eyed', severity: 3, tags: ['explicit'] },
    { pattern: /\bsemen\b/gi, replacement: 'cum', severity: 5, tags: ['explicit'] },
    { pattern: /\blove bite marks, skin discoloration from suction\b/gi, replacement: 'fresh hickeys', severity: 3, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 51a — FLUIDS & MARKS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
