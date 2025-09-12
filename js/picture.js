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
/* ================================================================
 * BLOCK 52 — STYLE COHERENCE & VIBE ENGINE (API)  (START)
 * ID: BLOCK 52
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide a programmable way to keep “the same vibe” across randomize calls.
 *   - Exposes PF_CORE.applyVibe(text, {profile, intensity, seed}) and PF_CORE.setVibe(profile).
 * INTERNAL NOTES:
 *   - Non-destructive post-processor: injects small adjective bundles and swaps synonyms.
 *   - Works with SFW↔NSFW slider: we never inject explicit terms unless allowExplicit:true.
 * ================================================================ */
(function (global) {
  const CORE = global.PF_CORE || (global.PF_CORE = {});
  CORE.VIBES = CORE.VIBES || {
    romantic_soft: {
      clean: ['soft backlight','warm glow','gentle palette','subtle grain'],
      nsfw:  ['slow teasing vibe','lingering touch tone']
    },
    glam_high_contrast: {
      clean: ['crisp highlights','deep shadow contrast','mirror sheen','polished look'],
      nsfw:  ['bold seductive energy','club-scene sexiness']
    },
    gritty_noir: {
      clean: ['hard shadows','moody atmosphere','film grain','smoky ambience'],
      nsfw:  ['dangerous allure','gritty lust']
    },
    dreamy_pastel: {
      clean: ['pastel wash','soft haze','airy highlights','whispered tones'],
      nsfw:  ['tender intimacy','innocent but charged']
    },
    cyberpunk_neon: {
      clean: ['neon reflections','rain-slick streets','holographic UI','chromatic fringe'],
      nsfw:  ['edgy nightlife charge','sleazy back-alley tension']
    },
    natural_ambient: {
      clean: ['ambient daylight','earthy textures','subtle breeze cues','organic palette'],
      nsfw:  ['unhurried sensual tone','primal vibe']
    }
  };

  function seededRand(seed) {
    let x = Math.imul(0x9e3779b1, (seed|0) ^ 0x85ebca6b) >>> 0;
    return function() { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return (x >>> 0) / 0xffffffff; };
  }

  CORE.setVibe = function setVibe(profile) {
    CORE.META = CORE.META || {};
    CORE.META.vibe = String(profile||'');
    return CORE.META.vibe;
  };

  CORE.applyVibe = function applyVibe(text, opts={}) {
    CORE.META = CORE.META || {};
    const { profile = CORE.META.vibe || 'romantic_soft', intensity = 50, seed = 0, allowExplicit = false } = opts;
    const vibe = CORE.VIBES[profile]; if (!vibe) return String(text||'');
    const rnd = seededRand(seed);
    const outParts = [ String(text||'') ];
    const pool = [].concat(vibe.clean || []);
    if (allowExplicit) pool.push(...(vibe.nsfw || []));
    const picks = Math.max(1, Math.round((intensity/100) * 3));
    for (let i=0; i<picks && pool.length; i++) {
      const idx = Math.floor(rnd()*pool.length);
      outParts.push(pool.splice(idx,1)[0]);
    }
    return outParts.join(', ');
  };
})(typeof self !== 'undefined' ? self : this);
/* ================================================================
 * BLOCK 52 — STYLE COHERENCE & VIBE ENGINE (API)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 53 — ROOMS, FURNITURE, AND SETS (EN)  (START)
 * ID: BLOCK 53
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Describe indoor scenes for portraits, boudoir, kink sets. SFW by default.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 53',
  language: 'en',
  category: 'rooms_furniture_sets',
  emoji: ['🛏️','🛋️','🪞','🕯️'],
  notes: ['Good with wardrobe packs and vibe engine.'],
  entries: [
    { pattern: /\bbedroom\b/gi, replacement: 'bedroom set, pillows, sheets, ambient lamp light', severity: 0, tags: ['room'] },
    { pattern: /\bbathroom\b/gi, replacement: 'bathroom set, tiled walls, mirror, running water', severity: 0, tags: ['room'] },
    { pattern: /\bkitchen\b/gi, replacement: 'kitchen scene, countertops, utensils, warm light', severity: 0, tags: ['room'] },
    { pattern: /\bstudio\b/gi, replacement: 'photo studio, seamless backdrop, softboxes', severity: 0, tags: ['room'] },
    { pattern: /\bcandlelit\b/gi, replacement: 'candlelit atmosphere, warm flicker, shadows dancing', severity: 0, tags: ['lighting'] },
    { pattern: /\bmirror\b/gi, replacement: 'full-length mirror reflecting subject', severity: 0, tags: ['prop'] },
    { pattern: /\bvelvet\b/gi, replacement: 'velvet fabric, deep texture, light absorption', severity: 0, tags: ['material'] }
  ]
});
/* ================================================================
 * BLOCK 53 — ROOMS, FURNITURE, AND SETS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 53a — ROOMS & FURNITURE EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Add risqué cues for beds, showers, furniture poses (adults only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 53a',
  language: 'en',
  category: 'rooms_furniture_explicit',
  gated: true,
  emoji: ['🔥','🛏️'],
  entries: [
    { pattern: /\bbedroom set, pillows, sheets, ambient lamp light\b/gi, replacement: 'rumpled bed, suggestive pillow arrangement', severity: 3, tags: ['explicit'] },
    { pattern: /\bbathroom set, tiled walls, mirror, running water\b/gi, replacement: 'steamy shower scene, condensation on glass', severity: 3, tags: ['explicit'] },
    { pattern: /\bmirror\b/gi, replacement: 'mirror positioned for voyeuristic reflection', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 53a — ROOMS & FURNITURE EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 54 — POSES & ACTIONS (EN)  (START)
 * ID: BLOCK 54
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Describe body poses, actions, and interactions for characters. SFW by default.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 54',
  language: 'en',
  category: 'poses_actions',
  emoji: ['🧍','🧎','🕺','🤝'],
  notes: ['Pairs with anatomy, wardrobe, vibe engine. Keep default safe for work.'],
  entries: [
    { pattern: /\bstanding\b/gi, replacement: 'standing upright, relaxed posture', severity: 0, tags: ['pose'] },
    { pattern: /\bsitting\b/gi, replacement: 'sitting on chair or floor, casual pose', severity: 0, tags: ['pose'] },
    { pattern: /\blounging\b/gi, replacement: 'lounging, reclined, relaxed limbs', severity: 0, tags: ['pose'] },
    { pattern: /\brunning\b/gi, replacement: 'running motion, forward lean, dynamic', severity: 0, tags: ['action'] },
    { pattern: /\bwalking\b/gi, replacement: 'walking stride, natural gait', severity: 0, tags: ['action'] },
    { pattern: /\bdancing\b/gi, replacement: 'dancing movement, expressive gesture', severity: 0, tags: ['action'] },
    { pattern: /\bhandshake\b/gi, replacement: 'handshake greeting, clasped hands', severity: 0, tags: ['interaction'] },
    { pattern: /\bhug\b/gi, replacement: 'friendly hug, arms wrapped', severity: 0, tags: ['interaction'] },
    { pattern: /\bwhisper\b/gi, replacement: 'whispering near ear, secretive body language', severity: 0, tags: ['interaction'] }
  ]
});
/* ================================================================
 * BLOCK 54 — POSES & ACTIONS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 54a — POSES & ACTIONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 54a
 * PURPOSE:
 *   - Escalate safe poses into sexual positions and acts (adults only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 54a',
  language: 'en',
  category: 'poses_actions_explicit',
  gated: true,
  emoji: ['🔥','🛏️'],
  notes: ['Directional mirror of BLOCK 54; unlocks sexual acts vocabulary.'],
  entries: [
    { pattern: /\blounging, reclined, relaxed limbs\b/gi, replacement: 'sprawled on bed, legs parted suggestively', severity: 4, tags: ['explicit'] },
    { pattern: /\bsitting on chair or floor, casual pose\b/gi, replacement: 'straddling chair, suggestive posture', severity: 3, tags: ['explicit'] },
    { pattern: /\bwhispering near ear, secretive body language\b/gi, replacement: 'hot breath in ear, seductive whisper', severity: 3, tags: ['explicit'] },
    { pattern: /\bhug\b/gi, replacement: 'full body press embrace, pelvis contact', severity: 3, tags: ['explicit'] },
    { pattern: /\bstanding upright, relaxed posture\b/gi, replacement: 'standing nude, hips cocked forward', severity: 4, tags: ['explicit'] },
    { pattern: /\brunning motion, forward lean, dynamic\b/gi, replacement: 'thrusting motion, pelvis drive', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 54a — POSES & ACTIONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 55 — LIGHTING & CINEMATIC EFFECTS (EN)  (START)
 * ID: BLOCK 55
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide vocabulary for lighting setups, gels, cinematic effects. SFW by default.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 55',
  language: 'en',
  category: 'lighting_cinema',
  emoji: ['💡','🎥','🔦'],
  notes: ['Pairs with vibe engine and room sets for scene mood control.'],
  entries: [
    { pattern: /\bsoft\s*light\b/gi, replacement: 'soft diffused light, flattering shadows', severity: 0, tags: ['lighting'] },
    { pattern: /\bbacklit\b/gi, replacement: 'backlit silhouette, rim highlight', severity: 0, tags: ['lighting'] },
    { pattern: /\brim\s*light\b/gi, replacement: 'rim lighting around subject, halo edge', severity: 0, tags: ['lighting'] },
    { pattern: /\bcolored\s*gel\b/gi, replacement: 'colored gel lighting, magenta or teal wash', severity: 0, tags: ['lighting'] },
    { pattern: /\bstrobe\b/gi, replacement: 'strobe flash burst, freeze motion', severity: 0, tags: ['lighting'] },
    { pattern: /\bspotlight\b/gi, replacement: 'narrow spotlight, high contrast focus', severity: 0, tags: ['lighting'] },
    { pattern: /\bpractical\s*lamps?\b/gi, replacement: 'practical lamp light sources visible in frame', severity: 0, tags: ['lighting'] },
    { pattern: /\bsilhouette\b/gi, replacement: 'dark silhouette against bright background', severity: 0, tags: ['cinema'] },
    { pattern: /\bbokeh\b/gi, replacement: 'bokeh background, blurred lights', severity: 0, tags: ['cinema'] },
    { pattern: /\blens\s*flare\b/gi, replacement: 'lens flare streak, cinematic gleam', severity: 0, tags: ['cinema'] },
    { pattern: /\bsmoke\b/gi, replacement: 'atmospheric haze, smoke machine effect', severity: 0, tags: ['cinema'] }
  ]
});
/* ================================================================
 * BLOCK 55 — LIGHTING & CINEMATIC EFFECTS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 55a — LIGHTING & CINEMATIC EFFECTS EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 55a
 * PURPOSE:
 *   - Escalate lighting into sweat-glow, erotic shadows, voyeuristic spotlights.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 55a',
  language: 'en',
  category: 'lighting_cinema_explicit',
  gated: true,
  emoji: ['🔥','💡'],
  notes: ['Directional mirror of BLOCK 55; intensifies erotic mood.'],
  entries: [
    { pattern: /\bsoft diffused light, flattering shadows\b/gi, replacement: 'soft warm light on glistening skin', severity: 3, tags: ['explicit'] },
    { pattern: /\bbacklit silhouette, rim highlight\b/gi, replacement: 'backlit body showing curves, teasing outline', severity: 4, tags: ['explicit'] },
    { pattern: /\brim lighting around subject, halo edge\b/gi, replacement: 'rim light accentuating hips and chest', severity: 4, tags: ['explicit'] },
    { pattern: /\bnarrow spotlight, high contrast focus\b/gi, replacement: 'spotlight isolating naked body, voyeuristic', severity: 5, tags: ['explicit'] },
    { pattern: /\batmospheric haze, smoke machine effect\b/gi, replacement: 'steamy fog, sultry club vibe', severity: 3, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 55a — LIGHTING & CINEMATIC EFFECTS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 56 — CAMERA ANGLES & MOVEMENT (EN)  (START)
 * ID: BLOCK 56
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide detailed vocabulary for shot angles, focal length, camera motion.
 *   - Builds cinematic quality for renders. SFW by default.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 56',
  language: 'en',
  category: 'camera_angles_movement',
  emoji: ['🎥','📷','🎞️'],
  notes: ['Designed to give the model cinematic framing control.'],
  entries: [
    { pattern: /\bclose[-\s]*up\b/gi, replacement: 'close-up shot, tight framing on subject face', severity: 0, tags: ['angle'] },
    { pattern: /\bextreme\s*close[-\s]*up\b/gi, replacement: 'extreme close-up, fills frame with detail', severity: 0, tags: ['angle'] },
    { pattern: /\bmedium\s*shot\b/gi, replacement: 'medium shot, waist-up framing', severity: 0, tags: ['angle'] },
    { pattern: /\bfull\s*body\b/gi, replacement: 'full body shot, head-to-toe composition', severity: 0, tags: ['angle'] },
    { pattern: /\blower\s*angle\b/gi, replacement: 'low angle shot, looking upward', severity: 0, tags: ['angle'] },
    { pattern: /\bhigh\s*angle\b/gi, replacement: 'high angle shot, looking downward', severity: 0, tags: ['angle'] },
    { pattern: /\boverhead\b/gi, replacement: 'top-down overhead view', severity: 0, tags: ['angle'] },
    { pattern: /\bPOV\b/gi, replacement: 'point-of-view shot, first-person framing', severity: 0, tags: ['angle'] },
    { pattern: /\bwide\s*shot\b/gi, replacement: 'wide establishing shot, shows environment', severity: 0, tags: ['angle'] },
    { pattern: /\btracking\s*shot\b/gi, replacement: 'tracking shot, camera moves with subject', severity: 0, tags: ['motion'] },
    { pattern: /\bdolly\s*zoom\b/gi, replacement: 'dolly zoom effect, perspective warp', severity: 0, tags: ['motion'] },
    { pattern: /\bpan\b/gi, replacement: 'panning camera motion, horizontal sweep', severity: 0, tags: ['motion'] },
    { pattern: /\btilt\b/gi, replacement: 'tilt camera motion, vertical sweep', severity: 0, tags: ['motion'] },
    { pattern: /\bhandheld\b/gi, replacement: 'handheld shaky cam, documentary feel', severity: 0, tags: ['motion'] },
    { pattern: /\bsteadycam\b/gi, replacement: 'smooth stabilised steadycam shot', severity: 0, tags: ['motion'] },
    { pattern: /\brack\s*focus\b/gi, replacement: 'rack focus effect, shifts subject sharpness', severity: 0, tags: ['cinema'] },
    { pattern: /\bslow\s*motion\b/gi, replacement: 'slow-motion capture, dramatic time stretch', severity: 0, tags: ['cinema'] },
    { pattern: /\bfast\s*motion\b/gi, replacement: 'time-lapse or fast-motion effect', severity: 0, tags: ['cinema'] }
  ]
});
/* ================================================================
 * BLOCK 56 — CAMERA ANGLES & MOVEMENT (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 56a — CAMERA ANGLES & MOVEMENT EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 56a
 * PURPOSE:
 *   - Escalate neutral angles into erotic framing and fetish POVs (adults only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 56a',
  language: 'en',
  category: 'camera_angles_movement_explicit',
  gated: true,
  emoji: ['🔥','🎥'],
  notes: ['Directional mirror of BLOCK 56; adds NSFW framing and intimacy cues.'],
  entries: [
    { pattern: /\bclose-up shot, tight framing on subject face\b/gi, replacement: 'close-up of lips and tongue', severity: 4, tags: ['explicit'] },
    { pattern: /\bextreme close-up, fills frame with detail\b/gi, replacement: 'extreme close-up on intimate body part', severity: 5, tags: ['explicit'] },
    { pattern: /\blower angle shot, looking upward\b/gi, replacement: 'low angle under-skirt or crotch view', severity: 5, tags: ['explicit'] },
    { pattern: /\bPOV\b/gi, replacement: 'first-person POV from lover perspective', severity: 4, tags: ['explicit'] },
    { pattern: /\bwide establishing shot, shows environment\b/gi, replacement: 'wide shot with nude subjects visible in setting', severity: 3, tags: ['explicit'] },
    { pattern: /\bhandheld shaky cam, documentary feel\b/gi, replacement: 'handheld amateur POV, intimate realism', severity: 4, tags: ['explicit'] },
    { pattern: /\brack focus effect, shifts subject sharpness\b/gi, replacement: 'focus pull from face to pelvis', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 56a — CAMERA ANGLES & MOVEMENT EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 57 — MATERIALS, TEXTURES & SURFACE EFFECTS (EN)  (START)
 * ID: BLOCK 57
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide extensive vocabulary for surfaces, fabrics, liquids, reflective effects.
 *   - Covers everything from leather, latex, silk, to metallic, glass, and wetness.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 57',
  language: 'en',
  category: 'materials_textures',
  emoji: ['🪞','🪩','🛢️','🧵'],
  notes: ['Combines wardrobe, lighting, and vibe engine for ultra-specific looks.'],
  entries: [
    { pattern: /\bleather\b/gi, replacement: 'shiny black leather surface, subtle creases', severity: 0, tags: ['material'] },
    { pattern: /\blatex\b/gi, replacement: 'high-gloss latex, reflective surface, tight fit', severity: 0, tags: ['material'] },
    { pattern: /\bvinyl\b/gi, replacement: 'glossy vinyl plastic material, specular highlights', severity: 0, tags: ['material'] },
    { pattern: /\bsilk\b/gi, replacement: 'smooth silk fabric, soft folds, light sheen', severity: 0, tags: ['fabric'] },
    { pattern: /\bsatin\b/gi, replacement: 'shiny satin, lustrous drape', severity: 0, tags: ['fabric'] },
    { pattern: /\bvelvet\b/gi, replacement: 'matte velvet, deep light absorption', severity: 0, tags: ['fabric'] },
    { pattern: /\bmesh\b/gi, replacement: 'sheer mesh, see-through grid pattern', severity: 0, tags: ['fabric'] },
    { pattern: /\bmetallic\b/gi, replacement: 'metallic finish, chrome-like reflections', severity: 0, tags: ['surface'] },
    { pattern: /\bglass\b/gi, replacement: 'transparent glass, refractive highlights', severity: 0, tags: ['surface'] },
    { pattern: /\bmirror\b/gi, replacement: 'mirror surface, perfect reflection', severity: 0, tags: ['surface'] },
    { pattern: /\bwax\b/gi, replacement: 'molten wax, dripping texture', severity: 0, tags: ['effect'] },
    { pattern: /\bwater\b/gi, replacement: 'wet surface, droplets, glistening sheen', severity: 0, tags: ['effect'] },
    { pattern: /\boil\b/gi, replacement: 'oil-slick shine, glossy coating', severity: 0, tags: ['effect'] },
    { pattern: /\bpowder\b/gi, replacement: 'dusting of powder, soft matte residue', severity: 0, tags: ['effect'] }
  ]
});
/* ================================================================
 * BLOCK 57 — MATERIALS, TEXTURES & SURFACE EFFECTS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 57a — MATERIALS & SURFACES EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Turn neutral materials into fetish objects, erotic surface language.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 57a',
  language: 'en',
  category: 'materials_textures_explicit',
  gated: true,
  emoji: ['🔥','🪩'],
  notes: ['Directional mirror of BLOCK 57; adds NSFW fetish connotation.'],
  entries: [
    { pattern: /\bshiny black leather surface, subtle creases\b/gi, replacement: 'tight black leather fetish gear, squeaky shine', severity: 4, tags: ['explicit'] },
    { pattern: /\bhigh-gloss latex, reflective surface, tight fit\b/gi, replacement: 'latex catsuit, skin-tight, erotic glare', severity: 5, tags: ['explicit'] },
    { pattern: /\bsheer mesh, see-through grid pattern\b/gi, replacement: 'see-through mesh lingerie revealing nipples', severity: 5, tags: ['explicit'] },
    { pattern: /\bmolten wax, dripping texture\b/gi, replacement: 'hot wax dripping on skin', severity: 5, tags: ['explicit'] },
    { pattern: /\bwet surface, droplets, glistening sheen\b/gi, replacement: 'body drenched, water streaming down curves', severity: 5, tags: ['explicit'] },
    { pattern: /\boil-slick shine, glossy coating\b/gi, replacement: 'oiled-up skin, reflective and slippery', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 57a — MATERIALS & SURFACES EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 58 — ACCESSORIES, TOYS & PROPS (EN)  (START)
 * ID: BLOCK 58
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Enumerate handheld props, accessories, kink gear. SFW names only.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 58',
  language: 'en',
  category: 'accessories_props',
  emoji: ['🎭','🪢','🧸','🎲'],
  notes: ['58a will escalate to explicit kink toys.'],
  entries: [
    { pattern: /\bmask\b/gi, replacement: 'face mask, masquerade style', severity: 0, tags: ['prop'] },
    { pattern: /\bblindfold\b/gi, replacement: 'soft blindfold, satin or leather', severity: 0, tags: ['prop'] },
    { pattern: /\brope\b/gi, replacement: 'rope, coiled neatly, natural fiber', severity: 0, tags: ['prop'] },
    { pattern: /\bcandle\b/gi, replacement: 'pillar candle, dripping wax', severity: 0, tags: ['prop'] },
    { pattern: /\bteddy\s*bear\b/gi, replacement: 'plush teddy bear prop', severity: 0, tags: ['prop'] },
    { pattern: /\bdice\b/gi, replacement: 'pair of dice, tabletop prop', severity: 0, tags: ['prop'] }
  ]
});
/* ================================================================
 * BLOCK 58 — ACCESSORIES, TOYS & PROPS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 58a — ACCESSORIES & TOYS EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Kink gear, sex toys, BDSM equipment (opt-in only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 58a',
  language: 'en',
  category: 'accessories_props_explicit',
  gated: true,
  emoji: ['🖇️','🔗','🍆'],
  notes: ['Adults only; replaces neutral props with sexualized versions.'],
  entries: [
    { pattern: /\bsoft blindfold, satin or leather\b/gi, replacement: 'blindfold for sensory play', severity: 4, tags: ['explicit'] },
    { pattern: /\brope, coiled neatly, natural fiber\b/gi, replacement: 'bondage rope, tied shibari style', severity: 5, tags: ['explicit'] },
    { pattern: /\bpillar candle, dripping wax\b/gi, replacement: 'wax play candle for temperature play', severity: 4, tags: ['explicit'] },
    { pattern: /\bpair of dice, tabletop prop\b/gi, replacement: 'strip dice game, erotic dare prop', severity: 3, tags: ['explicit'] },
    { pattern: /\bmask\b/gi, replacement: 'gimp mask, fetish hood', severity: 5, tags: ['explicit'] },
    { pattern: /\bteddy bear prop\b/gi, replacement: 'plush used as suggestive prop', severity: 3, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 58a — ACCESSORIES & TOYS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 59 — MULTI-PERSON INTERACTIONS (EN)  (START)
 * ID: BLOCK 59
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Cover interactions between 2–4+ characters, SFW language.
 *   - Sets up staging for groups, duos, crowds.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 59',
  language: 'en',
  category: 'multi_person_interactions',
  emoji: ['🧍‍♀️','🧍‍♂️','🤝','🎭'],
  notes: ['Pairs well with pose and camera packs. Neutral wording by default.'],
  entries: [
    { pattern: /\bduo\b/gi, replacement: 'two people interacting, balanced composition', severity: 0, tags: ['group'] },
    { pattern: /\btrio\b/gi, replacement: 'three people in frame, triangular composition', severity: 0, tags: ['group'] },
    { pattern: /\bgroup\b/gi, replacement: 'group scene, four or more participants', severity: 0, tags: ['group'] },
    { pattern: /\bholding\s*hands\b/gi, replacement: 'holding hands, gentle contact', severity: 0, tags: ['interaction'] },
    { pattern: /\bconversation\b/gi, replacement: 'chatting, speaking with gestures', severity: 0, tags: ['interaction'] },
    { pattern: /\bdancing\s*together\b/gi, replacement: 'paired dancing, synchronized steps', severity: 0, tags: ['interaction'] },
    { pattern: /\bsharing\s*meal\b/gi, replacement: 'sharing food, seated together at table', severity: 0, tags: ['interaction'] },
    { pattern: /\bteamwork\b/gi, replacement: 'team activity, cooperative gesture', severity: 0, tags: ['interaction'] }
  ]
});
/* ================================================================
 * BLOCK 59 — MULTI-PERSON INTERACTIONS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 59a — MULTI-PERSON INTERACTIONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Escalate group scenes into sexual contexts (consensual, adult only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 59a',
  language: 'en',
  category: 'multi_person_interactions_explicit',
  gated: true,
  emoji: ['🔥','👥'],
  notes: ['Explicit group dynamics, balanced to avoid non-consensual implication.'],
  entries: [
    { pattern: /\btwo people interacting, balanced composition\b/gi, replacement: 'intimate couple, foreplay focus', severity: 4, tags: ['explicit'] },
    { pattern: /\bthree people in frame, triangular composition\b/gi, replacement: 'threesome scene, consensual trio', severity: 5, tags: ['explicit'] },
    { pattern: /\bgroup scene, four or more participants\b/gi, replacement: 'group sex orgy, consensual multi-partner', severity: 5, tags: ['explicit'] },
    { pattern: /\bholding hands, gentle contact\b/gi, replacement: 'hand holding during intimacy', severity: 3, tags: ['explicit'] },
    { pattern: /\bchatting, speaking with gestures\b/gi, replacement: 'dirty talk exchange', severity: 4, tags: ['explicit'] },
    { pattern: /\bpaired dancing, synchronized steps\b/gi, replacement: 'sensual grinding dance', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 59a — MULTI-PERSON INTERACTIONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 60 — ROLEPLAY ARCHETYPES (EN)  (START)
 * ID: BLOCK 60
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Define common roleplay costumes and character archetypes (neutral versions).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 60',
  language: 'en',
  category: 'roleplay_archetypes',
  emoji: ['🎭','🕵️','👩‍⚕️','👨‍🍳'],
  notes: ['Archetypes only, not sexual context until 60a.'],
  entries: [
    { pattern: /\bmaid\b/gi, replacement: 'house maid uniform, apron, headband', severity: 0, tags: ['costume'] },
    { pattern: /\bnurse\b/gi, replacement: 'nurse outfit, medical cap, white dress', severity: 0, tags: ['costume'] },
    { pattern: /\bpolice\b/gi, replacement: 'police uniform, badge, duty belt', severity: 0, tags: ['costume'] },
    { pattern: /\bchef\b/gi, replacement: 'chef whites, tall hat, kitchen props', severity: 0, tags: ['costume'] },
    { pattern: /\bschool\s*uniform\b/gi, replacement: 'academic uniform, blazer and skirt', severity: 0, tags: ['costume'] },
    { pattern: /\bscientist\b/gi, replacement: 'lab coat, goggles, clipboard', severity: 0, tags: ['costume'] },
    { pattern: /\bknight\b/gi, replacement: 'medieval knight armor, sword prop', severity: 0, tags: ['costume'] },
    { pattern: /\bwitch\b/gi, replacement: 'witch costume, pointed hat, broom', severity: 0, tags: ['costume'] }
  ]
});
/* ================================================================
 * BLOCK 60 — ROLEPLAY ARCHETYPES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 60a — ROLEPLAY ARCHETYPES EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Turn archetypes into sexual fantasies (consensual, adult only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 60a',
  language: 'en',
  category: 'roleplay_archetypes_explicit',
  gated: true,
  emoji: ['🔥','🎭'],
  notes: ['Unlocks NSFW variants of roleplay costumes.'],
  entries: [
    { pattern: /\bhouse maid uniform, apron, headband\b/gi, replacement: 'sexy French maid lingerie, fishnet stockings', severity: 5, tags: ['explicit'] },
    { pattern: /\bnurse outfit, medical cap, white dress\b/gi, replacement: 'risqué nurse costume, cleavage cutout', severity: 4, tags: ['explicit'] },
    { pattern: /\bpolice uniform, badge, duty belt\b/gi, replacement: 'dominant cop roleplay outfit, cuffs ready', severity: 4, tags: ['explicit'] },
    { pattern: /\bacademic uniform, blazer and skirt\b/gi, replacement: 'short skirt schoolgirl fantasy, knee-high socks', severity: 5, tags: ['explicit'] },
    { pattern: /\blab coat, goggles, clipboard\b/gi, replacement: 'mad scientist seduction, coat open', severity: 4, tags: ['explicit'] },
    { pattern: /\bwitch costume, pointed hat, broom\b/gi, replacement: 'sultry witch lingerie, thigh-high boots', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 60a — ROLEPLAY ARCHETYPES EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 61 — CONSENSUAL FETISH CATEGORIES (EN)  (START)
 * ID: BLOCK 61
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map out broad fetish/kink categories in neutral or clinical language.
 *   - Keeps terms usable without being instantly NSFW until slider activates.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 61',
  language: 'en',
  category: 'fetish_categories',
  emoji: ['🖇️','🪢','🔗','🧷'],
  notes: ['Clinical, opt-in vocabulary for kink themes. 61a escalates.'],
  entries: [
    { pattern: /\bbondage\b/gi, replacement: 'bondage scenario, restrained posture', severity: 2, tags: ['kink'] },
    { pattern: /\bdominance\b/gi, replacement: 'dominant role, commanding body language', severity: 2, tags: ['kink'] },
    { pattern: /\bsubmission\b/gi, replacement: 'submissive posture, lowered gaze', severity: 2, tags: ['kink'] },
    { pattern: /\broleplay\b/gi, replacement: 'roleplay scenario, characters acting', severity: 1, tags: ['kink'] },
    { pattern: /\bimpact\s*play\b/gi, replacement: 'impact play context, controlled striking', severity: 3, tags: ['kink'] },
    { pattern: /\bsensory\s*play\b/gi, replacement: 'sensory play, blindfolds or temperature contrasts', severity: 2, tags: ['kink'] },
    { pattern: /\bvoyeurism\b/gi, replacement: 'voyeuristic scenario, observed by others', severity: 3, tags: ['kink'] },
    { pattern: /\bexhibitionism\b/gi, replacement: 'exhibitionism scenario, willingly exposed', severity: 3, tags: ['kink'] },
    { pattern: /\bconsensual\s*power\s*exchange\b/gi, replacement: 'negotiated power dynamic', severity: 2, tags: ['kink'] }
  ]
});
/* ================================================================
 * BLOCK 61 — CONSENSUAL FETISH CATEGORIES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 61a — FETISH CATEGORIES EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Expand clinical fetish terms into explicit sexual descriptions.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 61a',
  language: 'en',
  category: 'fetish_categories_explicit',
  gated: true,
  emoji: ['🔥','🪢','🔗'],
  notes: ['Adults only; includes explicit terminology and scenario details.'],
  entries: [
    { pattern: /\bbondage scenario, restrained posture\b/gi, replacement: 'bound with ropes, wrists tied above head', severity: 5, tags: ['explicit'] },
    { pattern: /\bdominant role, commanding body language\b/gi, replacement: 'dominant partner giving orders, controlling movement', severity: 4, tags: ['explicit'] },
    { pattern: /\bsubmissive posture, lowered gaze\b/gi, replacement: 'kneeling submissive, awaiting instruction', severity: 4, tags: ['explicit'] },
    { pattern: /\bimpact play context, controlled striking\b/gi, replacement: 'spanking, flogging with safe word protocol', severity: 5, tags: ['explicit'] },
    { pattern: /\bsensory play, blindfolds or temperature contrasts\b/gi, replacement: 'ice cube trails and wax drips on skin', severity: 5, tags: ['explicit'] },
    { pattern: /\bvoyeuristic scenario, observed by others\b/gi, replacement: 'being watched during sexual act', severity: 5, tags: ['explicit'] },
    { pattern: /\bexhibitionism scenario, willingly exposed\b/gi, replacement: 'public sex fantasy, consensual display', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 61a — FETISH CATEGORIES EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 62 — AFTERCARE, CONSENT & SAFETY (EN)  (START)
 * ID: BLOCK 62
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Ensure prompts can reference safe practices, aftercare, and negotiation.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 62',
  language: 'en',
  category: 'aftercare_safety',
  emoji: ['🛟','🤝','🩹'],
  notes: ['This block stays SFW but is vital for balanced kink prompts.'],
  entries: [
    { pattern: /\baftercare\b/gi, replacement: 'aftercare routine, cuddling, checking comfort', severity: 0, tags: ['safety'] },
    { pattern: /\bsafeword\b/gi, replacement: 'clear safeword protocol established', severity: 0, tags: ['safety'] },
    { pattern: /\bnegotiation\b/gi, replacement: 'scene negotiation, boundaries discussed', severity: 0, tags: ['safety'] },
    { pattern: /\bcheck[-\s]*in\b/gi, replacement: 'verbal check-in during scene', severity: 0, tags: ['safety'] },
    { pattern: /\bmutual\s*consent\b/gi, replacement: 'mutual consent confirmed', severity: 0, tags: ['safety'] }
  ]
});
/* ================================================================
 * BLOCK 62 — AFTERCARE, CONSENT & SAFETY (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 63 — BODY REACTIONS & FACIAL EXPRESSIONS (EN)  (START)
 * ID: BLOCK 63
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Capture subtle to strong bodily reactions and emotional expressions.
 *   - Neutral/SFW by default, works with vibe engine.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 63',
  language: 'en',
  category: 'body_reactions_faces',
  emoji: ['😊','😮','😳','🥵'],
  notes: ['Focus on cinematic, renderable descriptions. 63a will escalate.'],
  entries: [
    { pattern: /\bsmile\b/gi, replacement: 'gentle smile, softened eyes', severity: 0, tags: ['face'] },
    { pattern: /\blaugh\b/gi, replacement: 'laughter, open mouth grin, crinkled eyes', severity: 0, tags: ['face'] },
    { pattern: /\bblush\b/gi, replacement: 'cheeks flushed with warmth', severity: 0, tags: ['face'] },
    { pattern: /\btearful\b/gi, replacement: 'eyes glassy with tears, emotional look', severity: 0, tags: ['face'] },
    { pattern: /\bgasp\b/gi, replacement: 'gasping expression, parted lips', severity: 0, tags: ['face'] },
    { pattern: /\bsigh\b/gi, replacement: 'deep exhale, relaxed shoulders', severity: 0, tags: ['reaction'] },
    { pattern: /\bshiver\b/gi, replacement: 'slight shiver, goosebumps visible', severity: 0, tags: ['reaction'] },
    { pattern: /\bsweat\b/gi, replacement: 'light sheen of sweat on skin', severity: 0, tags: ['reaction'] },
    { pattern: /\bheartbeat\b/gi, replacement: 'pulse visible in neck, quickened heartbeat', severity: 0, tags: ['reaction'] }
  ]
});
/* ================================================================
 * BLOCK 63 — BODY REACTIONS & FACIAL EXPRESSIONS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 63a — BODY REACTIONS & FACIAL EXPRESSIONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Escalate to erotic body language, climax cues, pornographic facial expressions.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 63a',
  language: 'en',
  category: 'body_reactions_faces_explicit',
  gated: true,
  emoji: ['🔥','🥵','💦'],
  notes: ['Adults only; NSFW slider must be on to trigger.'],
  entries: [
    { pattern: /\bgasping expression, parted lips\b/gi, replacement: 'moaning mouth, tongue visible, head tilted back', severity: 5, tags: ['explicit'] },
    { pattern: /\bcheeks flushed with warmth\b/gi, replacement: 'face flushed from arousal', severity: 4, tags: ['explicit'] },
    { pattern: /\bslight shiver, goosebumps visible\b/gi, replacement: 'full-body shiver during climax', severity: 5, tags: ['explicit'] },
    { pattern: /\blight sheen of sweat on skin\b/gi, replacement: 'sweat dripping down chest and stomach', severity: 5, tags: ['explicit'] },
    { pattern: /\bdeep exhale, relaxed shoulders\b/gi, replacement: 'exhausted post-orgasm sigh', severity: 5, tags: ['explicit'] },
    { pattern: /\bpulse visible in neck, quickened heartbeat\b/gi, replacement: 'throbbing veins, racing heartbeat from arousal', severity: 5, tags: ['explicit'] },
    { pattern: /\blaughter, open mouth grin, crinkled eyes\b/gi, replacement: 'breathless giggle during sex', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 63a — BODY REACTIONS & FACIAL EXPRESSIONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 64 — VOCALIZATIONS & SOUND CUES (EN)  (START)
 * ID: BLOCK 64
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Let prompts describe soundscape: voices, breaths, environment. Neutral first.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 64',
  language: 'en',
  category: 'vocalizations_sounds',
  emoji: ['🔊','🎙️','🎶'],
  notes: ['Complements vibe engine; 64a escalates to erotic moans.'],
  entries: [
    { pattern: /\bwhisper\b/gi, replacement: 'whispering softly, hushed tone', severity: 0, tags: ['sound'] },
    { pattern: /\bsing\b/gi, replacement: 'soft singing, melodic voice', severity: 0, tags: ['sound'] },
    { pattern: /\bfootsteps\b/gi, replacement: 'footsteps sound, approaching presence', severity: 0, tags: ['sound'] },
    { pattern: /\bheartbeat\b/gi, replacement: 'audible heartbeat sound', severity: 0, tags: ['sound'] },
    { pattern: /\bwind\b/gi, replacement: 'wind whooshing sound', severity: 0, tags: ['sound'] }
  ]
});
/* ================================================================
 * BLOCK 64 — VOCALIZATIONS & SOUND CUES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 64a — VOCALIZATIONS & SOUND CUES EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Unlock erotic sounds, moans, dirty talk cues, climax audio.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 64a',
  language: 'en',
  category: 'vocalizations_sounds_explicit',
  gated: true,
  emoji: ['🔥','🎙️'],
  notes: ['Adults only; triggers vocal erotic cues.'],
  entries: [
    { pattern: /\bwhispering softly, hushed tone\b/gi, replacement: 'whispering dirty talk', severity: 5, tags: ['explicit'] },
    { pattern: /\baudible heartbeat sound\b/gi, replacement: 'ragged breathing and moans', severity: 5, tags: ['explicit'] },
    { pattern: /\bsoft singing, melodic voice\b/gi, replacement: 'breathless moaning melody', severity: 5, tags: ['explicit'] },
    { pattern: /\bfootsteps sound, approaching presence\b/gi, replacement: 'bed creaks and wet slapping sounds', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 64a — VOCALIZATIONS & SOUND CUES EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 65 — CLOTHING STATES & DISARRAY (EN)  (START)
 * ID: BLOCK 65
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Describe clothing condition and state changes (neutral first).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 65',
  language: 'en',
  category: 'clothing_states',
  emoji: ['👔','👗','🧵'],
  notes: ['Helps prompts transition outfits between neat and casual.'],
  entries: [
    { pattern: /\bwrinkled\s*shirt\b/gi, replacement: 'wrinkled shirt fabric, casual look', severity: 0, tags: ['clothing'] },
    { pattern: /\buntucked\b/gi, replacement: 'shirt untucked, relaxed styling', severity: 0, tags: ['clothing'] },
    { pattern: /\bunbuttoned\b/gi, replacement: 'unbuttoned top, open neckline', severity: 0, tags: ['clothing'] },
    { pattern: /\bunzipped\b/gi, replacement: 'zipper undone, loose garment', severity: 0, tags: ['clothing'] },
    { pattern: /\btorn\b/gi, replacement: 'torn clothing, frayed edges', severity: 0, tags: ['clothing'] },
    { pattern: /\bdisheveled\b/gi, replacement: 'hair or clothing in messy state', severity: 0, tags: ['look'] },
    { pattern: /\bmissing\s*shoe\b/gi, replacement: 'one shoe missing, casual imbalance', severity: 0, tags: ['clothing'] }
  ]
});
/* ================================================================
 * BLOCK 65 — CLOTHING STATES & DISARRAY (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 65a — CLOTHING STATES & DISARRAY EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Escalate clothing state into sexual disarray and removal.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 65a',
  language: 'en',
  category: 'clothing_states_explicit',
  gated: true,
  emoji: ['🔥','👗'],
  notes: ['Adults only; used to show stripping, half-dressed states.'],
  entries: [
    { pattern: /\bshirt untucked, relaxed styling\b/gi, replacement: 'shirt half-removed, exposing chest', severity: 4, tags: ['explicit'] },
    { pattern: /\bunbuttoned top, open neckline\b/gi, replacement: 'blouse unbuttoned exposing bra', severity: 4, tags: ['explicit'] },
    { pattern: /\bzipper undone, loose garment\b/gi, replacement: 'pants unzipped, underwear peeking', severity: 4, tags: ['explicit'] },
    { pattern: /\btorn clothing, frayed edges\b/gi, replacement: 'torn lingerie, deliberate rough play damage', severity: 5, tags: ['explicit'] },
    { pattern: /\bhair or clothing in messy state\b/gi, replacement: 'sex-tousled hair, clothes in disarray', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 65a — CLOTHING STATES & DISARRAY EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 66 — LOCATIONS, LANDMARKS & EVENTS (EN)  (START)
 * ID: BLOCK 66
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Cover real-life places, cities, current events keywords for context.
 *   - Allows mixing modern culture into prompts.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 66',
  language: 'en',
  category: 'locations_events',
  emoji: ['🌍','🗽','🗺️','🎉'],
  notes: ['Broad coverage of global sites and major events.'],
  entries: [
    { pattern: /\bnew\s*york\b/gi, replacement: 'New York City skyline, urban streets, taxis', severity: 0, tags: ['city'] },
    { pattern: /\blondon\b/gi, replacement: 'London landmarks, Big Ben, red buses', severity: 0, tags: ['city'] },
    { pattern: /\bparis\b/gi, replacement: 'Paris, Eiffel Tower view, café tables', severity: 0, tags: ['city'] },
    { pattern: /\btokyo\b/gi, replacement: 'Tokyo neon streets, Shibuya crossing', severity: 0, tags: ['city'] },
    { pattern: /\bcoachella\b/gi, replacement: 'Coachella music festival, desert crowd', severity: 0, tags: ['event'] },
    { pattern: /\bworld\s*cup\b/gi, replacement: 'World Cup stadium, cheering fans', severity: 0, tags: ['event'] },
    { pattern: /\bcomic[-\s]*con\b/gi, replacement: 'Comic-Con convention floor, cosplay crowd', severity: 0, tags: ['event'] },
    { pattern: /\bmet\s*gala\b/gi, replacement: 'Met Gala red carpet, high fashion display', severity: 0, tags: ['event'] },
    { pattern: /\b2024\s*election\b/gi, replacement: '2024 election rally, political signage', severity: 0, tags: ['event'] },
    { pattern: /\bconcert\b/gi, replacement: 'live concert stage, crowd cheering', severity: 0, tags: ['event'] }
  ]
});
/* ================================================================
 * BLOCK 66 — LOCATIONS, LANDMARKS & EVENTS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 66a — LOCATIONS & EVENTS EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Optional sexualized interpretations of locations/events (fantasy settings).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 66a',
  language: 'en',
  category: 'locations_events_explicit',
  gated: true,
  emoji: ['🔥','🌆'],
  notes: ['NSFW slider required; adds fantasy of public or themed play.'],
  entries: [
    { pattern: /\bCoachella music festival, desert crowd\b/gi, replacement: 'sweaty crowd grind at Coachella, bodies pressed', severity: 4, tags: ['explicit'] },
    { pattern: /\bComic-Con convention floor, cosplay crowd\b/gi, replacement: 'cosplay kink party scene, skimpy costumes', severity: 4, tags: ['explicit'] },
    { pattern: /\bMet Gala red carpet, high fashion display\b/gi, replacement: 'risqué couture, sheer gowns exposing skin', severity: 4, tags: ['explicit'] },
    { pattern: /\bconcert stage, crowd cheering\b/gi, replacement: 'crowd surfing, sweat-slick bodies pressed together', severity: 3, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 66a — LOCATIONS & EVENTS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 67 — FOOD, DRINK & SENSORY INDULGENCE (EN)  (START)
 * ID: BLOCK 67
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand culinary and drink references for prompts. Neutral first.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 67',
  language: 'en',
  category: 'food_drink',
  emoji: ['🍷','🍫','🍓','🥂'],
  notes: ['Pairs with vibe engine and rooms (kitchen, dining). 67a escalates.'],
  entries: [
    { pattern: /\bchocolate\b/gi, replacement: 'rich chocolate, glossy surface, decadent tone', severity: 0, tags: ['food'] },
    { pattern: /\bstrawberries\b/gi, replacement: 'fresh strawberries, red juicy fruit', severity: 0, tags: ['food'] },
    { pattern: /\bchampagne\b/gi, replacement: 'sparkling champagne, golden bubbles', severity: 0, tags: ['drink'] },
    { pattern: /\bwhipped\s*cream\b/gi, replacement: 'soft whipped cream, fluffy texture', severity: 0, tags: ['food'] },
    { pattern: /\bwine\b/gi, replacement: 'red wine in crystal glass, legs visible', severity: 0, tags: ['drink'] },
    { pattern: /\bcoffee\b/gi, replacement: 'steaming coffee cup, aromatic scent', severity: 0, tags: ['drink'] },
    { pattern: /\bcocktail\b/gi, replacement: 'colorful cocktail, garnished glass', severity: 0, tags: ['drink'] },
    { pattern: /\bfeast\b/gi, replacement: 'lavish feast, table spread with dishes', severity: 0, tags: ['food'] }
  ]
});
/* ================================================================
 * BLOCK 67 — FOOD, DRINK & SENSORY INDULGENCE (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 67a — FOOD, DRINK & SENSORY EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Turn culinary items into erotic play props and scenarios.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 67a',
  language: 'en',
  category: 'food_drink_explicit',
  gated: true,
  emoji: ['🔥','🍓','🍷'],
  notes: ['Adults only; adds body play, dripping, licking scenarios.'],
  entries: [
    { pattern: /\brich chocolate, glossy surface, decadent tone\b/gi, replacement: 'melted chocolate dripped on skin', severity: 5, tags: ['explicit'] },
    { pattern: /\bfresh strawberries, red juicy fruit\b/gi, replacement: 'strawberries eaten off partner body', severity: 4, tags: ['explicit'] },
    { pattern: /\bsparkling champagne, golden bubbles\b/gi, replacement: 'champagne poured over chest, licked off', severity: 5, tags: ['explicit'] },
    { pattern: /\bsoft whipped cream, fluffy texture\b/gi, replacement: 'whipped cream spread across nipples', severity: 5, tags: ['explicit'] },
    { pattern: /\bcolorful cocktail, garnished glass\b/gi, replacement: 'body shot taken off stomach or thighs', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 67a — FOOD, DRINK & SENSORY EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 68 — TECHNOLOGY, SCREENS & MODERN DEVICES (EN)  (START)
 * ID: BLOCK 68
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Cover phones, computers, VR headsets, live-stream settings.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 68',
  language: 'en',
  category: 'technology_devices',
  emoji: ['📱','💻','📷','🎧'],
  notes: ['Can be combined with NSFW mirror for sexting, cam shows.'],
  entries: [
    { pattern: /\bsmartphone\b/gi, replacement: 'smartphone device, glowing screen', severity: 0, tags: ['tech'] },
    { pattern: /\blaptop\b/gi, replacement: 'open laptop, backlit keyboard', severity: 0, tags: ['tech'] },
    { pattern: /\bcamera\b/gi, replacement: 'DSLR camera on tripod, lens glare', severity: 0, tags: ['tech'] },
    { pattern: /\bwebcam\b/gi, replacement: 'webcam mounted, recording light on', severity: 0, tags: ['tech'] },
    { pattern: /\bheadphones\b/gi, replacement: 'over-ear headphones, cushioned cups', severity: 0, tags: ['tech'] },
    { pattern: /\bVR\s*headset\b/gi, replacement: 'VR headset, user immersed in virtual space', severity: 0, tags: ['tech'] },
    { pattern: /\blive[-\s]*stream\b/gi, replacement: 'live-stream broadcast setup, ring light', severity: 0, tags: ['tech'] }
  ]
});
/* ================================================================
 * BLOCK 68 — TECHNOLOGY, SCREENS & MODERN DEVICES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 68a — TECHNOLOGY & DEVICES EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Sexting, camming, recorded scenarios (adults only).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 68a',
  language: 'en',
  category: 'technology_devices_explicit',
  gated: true,
  emoji: ['🔥','📱','📷'],
  notes: ['Adds NSFW streaming/cyberplay content.'],
  entries: [
    { pattern: /\bsmartphone device, glowing screen\b/gi, replacement: 'sexting on phone, naughty selfie taken', severity: 5, tags: ['explicit'] },
    { pattern: /\bwebcam mounted, recording light on\b/gi, replacement: 'cam show streaming explicit performance', severity: 5, tags: ['explicit'] },
    { pattern: /\blive-stream broadcast setup, ring light\b/gi, replacement: 'OnlyFans style live show', severity: 5, tags: ['explicit'] },
    { pattern: /\bVR headset, user immersed in virtual space\b/gi, replacement: 'VR sex simulation, immersive fantasy', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 68a — TECHNOLOGY & DEVICES EXPLICIT-DIRECTIONAL (EN)  (END)
 /* ================================================================
 * BLOCK 69 — POP CULTURE, MEDIA & INTERNET SLANG (EN)  (START)
 * ID: BLOCK 69
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Allow prompts to reference pop culture icons, trending memes, viral internet language.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 69',
  language: 'en',
  category: 'popculture_memes',
  emoji: ['📱','🎶','😂','📺'],
  notes: ['Safe but current references. 69a escalates with NSFW humor.'],
  entries: [
    { pattern: /\btiktok\b/gi, replacement: 'TikTok trend, vertical video style', severity: 0, tags: ['internet'] },
    { pattern: /\bviral\b/gi, replacement: 'viral moment, trending hashtag', severity: 0, tags: ['internet'] },
    { pattern: /\bmeme\b/gi, replacement: 'internet meme format, reaction image energy', severity: 0, tags: ['internet'] },
    { pattern: /\bnetflix\b/gi, replacement: 'Netflix binge session, streaming backdrop', severity: 0, tags: ['media'] },
    { pattern: /\bmarvel\b/gi, replacement: 'Marvel superhero universe reference', severity: 0, tags: ['media'] },
    { pattern: /\banime\b/gi, replacement: 'anime aesthetic, cel-shaded style', severity: 0, tags: ['media'] },
    { pattern: /\bgamer\b/gi, replacement: 'gamer culture reference, RGB glow', severity: 0, tags: ['culture'] },
    { pattern: /\bemoji\b/gi, replacement: 'emoji usage, playful tone', severity: 0, tags: ['internet'] },
    { pattern: /\bhashtag\b/gi, replacement: 'social media hashtag, trending topic', severity: 0, tags: ['internet'] }
  ]
});
/* ================================================================
 * BLOCK 69 — POP CULTURE, MEDIA & INTERNET SLANG (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 69a — POP CULTURE & MEME NSFW REMIX (EN)  (START)
 * PURPOSE:
 *   - Let prompts go raunchy with meme humor, NSFW TikTok trends, sexualized references.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 69a',
  language: 'en',
  category: 'popculture_memes_explicit',
  gated: true,
  emoji: ['🔥','😂','🍑'],
  notes: ['Adds spicy meme language, TikTok thirst trap energy.'],
  entries: [
    { pattern: /\bTikTok trend, vertical video style\b/gi, replacement: 'thirst trap TikTok, hips swaying', severity: 4, tags: ['explicit'] },
    { pattern: /\bviral moment, trending hashtag\b/gi, replacement: 'viral thirst trap, NSFW trend', severity: 3, tags: ['explicit'] },
    { pattern: /\binternet meme format, reaction image energy\b/gi, replacement: 'NSFW meme format, suggestive punchline', severity: 3, tags: ['explicit'] },
    { pattern: /\bNetflix binge session, streaming backdrop\b/gi, replacement: 'Netflix and chill turning sexual', severity: 4, tags: ['explicit'] },
    { pattern: /\banime aesthetic, cel-shaded style\b/gi, replacement: 'ecchi anime vibe, exaggerated curves', severity: 4, tags: ['explicit'] },
    { pattern: /\bgamer culture reference, RGB glow\b/gi, replacement: 'NSFW gamer girl stream setup', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 69a — POP CULTURE & MEME NSFW REMIX (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 70 — WEATHER, SEASONS & NATURAL SETTINGS (EN)  (START)
 * ID: BLOCK 70
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide environmental cues for mood: rain, storms, seasons.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 70',
  language: 'en',
  category: 'weather_seasons',
  emoji: ['🌧️','☀️','❄️','🍂'],
  notes: ['Pairs with vibe engine for mood shift. 70a adds erotic weather play.'],
  entries: [
    { pattern: /\brain\b/gi, replacement: 'rain falling, wet streets, droplets on glass', severity: 0, tags: ['weather'] },
    { pattern: /\bstorm\b/gi, replacement: 'storm clouds, lightning flash, dramatic sky', severity: 0, tags: ['weather'] },
    { pattern: /\bsnow\b/gi, replacement: 'snowfall, white landscape, frosty breath', severity: 0, tags: ['weather'] },
    { pattern: /\bsummer\b/gi, replacement: 'summer sun, golden hour light, warm tones', severity: 0, tags: ['season'] },
    { pattern: /\bwinter\b/gi, replacement: 'winter chill, breath misting, cozy layers', severity: 0, tags: ['season'] },
    { pattern: /\bautumn\b/gi, replacement: 'autumn leaves, orange foliage, crisp air', severity: 0, tags: ['season'] },
    { pattern: /\bspring\b/gi, replacement: 'spring bloom, fresh greenery, soft breeze', severity: 0, tags: ['season'] }
  ]
});
/* ================================================================
 * BLOCK 70 — WEATHER, SEASONS & NATURAL SETTINGS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 70a — WEATHER & SEASONS EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Eroticize weather settings: wet clothes, heat sweat, snow play.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 70a',
  language: 'en',
  category: 'weather_seasons_explicit',
  gated: true,
  emoji: ['🔥','🌧️'],
  notes: ['Adds wet look, soaked clothes, steamy breath erotica.'],
  entries: [
    { pattern: /\brain falling, wet streets, droplets on glass\b/gi, replacement: 'clothes soaked, see-through fabric', severity: 5, tags: ['explicit'] },
    { pattern: /\bstorm clouds, lightning flash, dramatic sky\b/gi, replacement: 'storm sex fantasy, bodies slick with rain', severity: 5, tags: ['explicit'] },
    { pattern: /\bsummer sun, golden hour light, warm tones\b/gi, replacement: 'sweaty summer skin glistening', severity: 4, tags: ['explicit'] },
    { pattern: /\bsnowfall, white landscape, frosty breath\b/gi, replacement: 'nude bodies in snow, steam rising', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 70a — WEATHER & SEASONS EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
 * ================================================================ */
  /* ================================================================
 * BLOCK 71 — LANDSCAPES, ARCHITECTURE & HISTORICAL ERAS (EN)  (START)
 * ID: BLOCK 71
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide broad coverage of natural landscapes, cityscapes, and time-period styles.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 71',
  language: 'en',
  category: 'landscapes_eras',
  emoji: ['🏞️','🏙️','🏛️','🕰️'],
  notes: ['Critical for background setting and portrait era vibe.'],
  entries: [
    { pattern: /\bforest\b/gi, replacement: 'dense forest, tall trees, dappled light', severity: 0, tags: ['nature'] },
    { pattern: /\bdesert\b/gi, replacement: 'arid desert, dunes, heat shimmer', severity: 0, tags: ['nature'] },
    { pattern: /\bocean\b/gi, replacement: 'ocean horizon, waves crashing, salt spray', severity: 0, tags: ['nature'] },
    { pattern: /\bmountain\b/gi, replacement: 'mountain peaks, rocky ridges, alpine snow', severity: 0, tags: ['nature'] },
    { pattern: /\bcityscape\b/gi, replacement: 'urban skyline, glowing windows, street lights', severity: 0, tags: ['city'] },
    { pattern: /\bcyberpunk\b/gi, replacement: 'cyberpunk neon city, rain-slick alleys, holograms', severity: 0, tags: ['style'] },
    { pattern: /\brenaissance\b/gi, replacement: 'Renaissance style, chiaroscuro lighting, oil-paint textures', severity: 0, tags: ['era'] },
    { pattern: /\bbaroque\b/gi, replacement: 'Baroque opulence, gold trim, dramatic contrast', severity: 0, tags: ['era'] },
    { pattern: /\broaring\s*20s\b/gi, replacement: '1920s Art Deco, jazz-age glamour', severity: 0, tags: ['era'] },
    { pattern: /\b1980s\b/gi, replacement: '1980s aesthetic, VHS grain, neon glow', severity: 0, tags: ['era'] }
  ]
});
/* ================================================================
 * BLOCK 71 — LANDSCAPES, ARCHITECTURE & HISTORICAL ERAS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 72 — DETAILED ANATOMY (NEUTRAL / ART STUDY)  (START)
 * ID: BLOCK 72
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide detailed but clinical coverage of human anatomy terms.
 *   - Safe for figure drawing, medical illustration, and art nudity.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 72',
  language: 'en',
  category: 'detailed_anatomy',
  emoji: ['🫀','🦴','🧠','🫁'],
  notes: ['72a unlocks eroticized slang and graphic detail.'],
  entries: [
    { pattern: /\bhead\b/gi, replacement: 'head, skull, face structure', severity: 0, tags: ['anatomy'] },
    { pattern: /\bface\b/gi, replacement: 'face, jawline, cheekbones', severity: 0, tags: ['anatomy'] },
    { pattern: /\btorso\b/gi, replacement: 'torso, ribcage, chest', severity: 0, tags: ['anatomy'] },
    { pattern: /\bchest\b/gi, replacement: 'chest area, pectorals or breasts (neutral)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bbreasts?\b/gi, replacement: 'female chest, mammary glands (neutral)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bnipple\b/gi, replacement: 'nipple, areola (clinical)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bnavel\b/gi, replacement: 'navel (belly button)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bgenitals?\b/gi, replacement: 'genital region (neutral medical term)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bpenis\b/gi, replacement: 'penis (clinical term, no slang)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bscrotum\b/gi, replacement: 'scrotum, testicular sac', severity: 0, tags: ['anatomy'] },
    { pattern: /\bvulva\b/gi, replacement: 'vulva, outer labia', severity: 0, tags: ['anatomy'] },
    { pattern: /\bvagina\b/gi, replacement: 'vaginal canal, clinical term', severity: 0, tags: ['anatomy'] },
    { pattern: /\bclitoris\b/gi, replacement: 'clitoris, glans and hood (clinical)', severity: 0, tags: ['anatomy'] },
    { pattern: /\bbuttocks\b/gi, replacement: 'buttocks, gluteal muscles', severity: 0, tags: ['anatomy'] },
    { pattern: /\banus\b/gi, replacement: 'anal opening (clinical)', severity: 0, tags: ['anatomy'] },
    { pattern: /\blegs?\b/gi, replacement: 'legs, thighs, knees, calves', severity: 0, tags: ['anatomy'] },
    { pattern: /\bfeet?\b/gi, replacement: 'feet, toes, arches', severity: 0, tags: ['anatomy'] },
    { pattern: /\bhands?\b/gi, replacement: 'hands, fingers, palms', severity: 0, tags: ['anatomy'] }
  ]
});
/* ================================================================
 * BLOCK 72 — DETAILED ANATOMY (NEUTRAL / ART STUDY)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 72a — DETAILED ANATOMY EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Expand clinical anatomy into descriptive erotic language.
 *   - Provide variations for size, shape, circumcision state, arousal level.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 72a',
  language: 'en',
  category: 'detailed_anatomy_explicit',
  gated: true,
  emoji: ['🔥','🍆','🍑','💦'],
  notes: ['Provides granular control over sexual anatomy description.'],
  entries: [
    // ——— PENIS DESCRIPTORS ———
    { pattern: /\bpenis \(clinical term, no slang\)\b/gi, replacement: 'cock, shaft, length between 1-12 inches', severity: 5, tags: ['explicit'] },
    { pattern: /\bscrotum, testicular sac\b/gi, replacement: 'balls, hanging heavy or tight', severity: 4, tags: ['explicit'] },
    { pattern: /\bcircumcised\b/gi, replacement: 'cut head, exposed glans', severity: 4, tags: ['explicit'] },
    { pattern: /\buncircumcised\b/gi, replacement: 'foreskin covering glans, retractable', severity: 4, tags: ['explicit'] },

    // ——— VAGINA & VULVA DESCRIPTORS ———
    { pattern: /\bvaginal canal, clinical term\b/gi, replacement: 'tight or stretched pussy, inner walls glistening', severity: 5, tags: ['explicit'] },
    { pattern: /\bvulva, outer labia\b/gi, replacement: 'plump outer lips, folds parted', severity: 5, tags: ['explicit'] },
    { pattern: /\bclitoris, glans and hood \(clinical\)\b/gi, replacement: 'swollen clit, sensitive, engorged', severity: 5, tags: ['explicit'] },

    // ——— BREASTS & BUTT ———
    { pattern: /\bfemale chest, mammary glands \(neutral\)\b/gi, replacement: 'full breasts, nipples hard', severity: 4, tags: ['explicit'] },
    { pattern: /\bnipple, areola \(clinical\)\b/gi, replacement: 'erect nipple tips, dark areolas', severity: 4, tags: ['explicit'] },
    { pattern: /\bbuttocks, gluteal muscles\b/gi, replacement: 'round ass cheeks, jiggle with motion', severity: 4, tags: ['explicit'] },
    { pattern: /\banal opening \(clinical\)\b/gi, replacement: 'tight ass, puckered rim', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 72a — DETAILED ANATOMY EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
 /* ================================================================
 * BLOCK 73 — SEXUAL FUNCTION & RESPONSE (EN)  (START)
 * ID: BLOCK 73
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Map physiological arousal states and sexual response cycles.
 *   - Neutral enough for educational/clinical prompts, pairs with anatomy.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 73',
  language: 'en',
  category: 'sexual_function_response',
  emoji: ['🫀','💓','💤'],
  notes: ['Clinical coverage of arousal, erection, lubrication, climax stages. 73a unlocks explicit erotic phrasing.'],
  entries: [
    { pattern: /\barousal\b/gi, replacement: 'physiological arousal state, elevated heart rate', severity: 0, tags: ['function'] },
    { pattern: /\berrection\b/gi, replacement: 'penile erection, engorged erectile tissue', severity: 0, tags: ['function'] },
    { pattern: /\blubrication\b/gi, replacement: 'natural lubrication, increased moisture', severity: 0, tags: ['function'] },
    { pattern: /\borgasm\b/gi, replacement: 'orgasmic climax, muscle contractions', severity: 0, tags: ['function'] },
    { pattern: /\bafterglow\b/gi, replacement: 'post-climax relaxation, oxytocin release', severity: 0, tags: ['function'] },
    { pattern: /\brefractory\s*period\b/gi, replacement: 'refractory period, temporary recovery phase', severity: 0, tags: ['function'] }
  ]
});
/* ================================================================
 * BLOCK 73 — SEXUAL FUNCTION & RESPONSE (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 73a — SEXUAL FUNCTION & RESPONSE EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Escalate clinical terms into erotic descriptions with intensity levels.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 73a',
  language: 'en',
  category: 'sexual_function_response_explicit',
  gated: true,
  emoji: ['🔥','💓','💦','🫦'],
  notes: ['Intensity can be scaled via slider: low = subtle, high = raw.'],
  entries: [
    { pattern: /\bphysiological arousal state, elevated heart rate\b/gi, replacement: 'flushed, breathing hard, visibly turned on', severity: 4, tags: ['explicit'] },
    { pattern: /\bpenile erection, engorged erectile tissue\b/gi, replacement: 'rock-hard erection, veins bulging', severity: 5, tags: ['explicit'] },
    { pattern: /\bnatural lubrication, increased moisture\b/gi, replacement: 'pussy dripping wet, slick and shiny', severity: 5, tags: ['explicit'] },
    { pattern: /\borgasmic climax, muscle contractions\b/gi, replacement: 'body convulsing, screaming orgasm, fluids released', severity: 5, tags: ['explicit'] },
    { pattern: /\bpost-climax relaxation, oxytocin release\b/gi, replacement: 'collapsed in bed, skin glistening, satisfied', severity: 4, tags: ['explicit'] },
    { pattern: /\brefractory period, temporary recovery phase\b/gi, replacement: 'cock still throbbing but too sensitive to touch', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 73a — SEXUAL FUNCTION & RESPONSE EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 74 — FANTASY BODIES & CREATURE FEATURES (EN)  (START)
 * ID: BLOCK 74
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand prompts to include fantasy species, non-human body traits.
 *   - Safe / SFW by default: good for fantasy art, D&D, sci-fi.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 74',
  language: 'en',
  category: 'fantasy_bodies',
  emoji: ['🐉','👽','🧝','🤖'],
  notes: ['For fantasy, gaming, and sci-fi use; 74a will eroticize.'],
  entries: [
    { pattern: /\belf\b/gi, replacement: 'slender elf, pointed ears, ethereal aura', severity: 0, tags: ['fantasy'] },
    { pattern: /\bdwarf\b/gi, replacement: 'stocky dwarf, braided beard, sturdy frame', severity: 0, tags: ['fantasy'] },
    { pattern: /\borc\b/gi, replacement: 'green-skinned orc, tusks, muscular build', severity: 0, tags: ['fantasy'] },
    { pattern: /\bdemon\b/gi, replacement: 'demonic figure, horns, tail, glowing eyes', severity: 0, tags: ['fantasy'] },
    { pattern: /\bangel\b/gi, replacement: 'angelic figure, radiant halo, feathered wings', severity: 0, tags: ['fantasy'] },
    { pattern: /\bcyborg\b/gi, replacement: 'cyborg body, cybernetic implants', severity: 0, tags: ['sci-fi'] },
    { pattern: /\bandroid\b/gi, replacement: 'android figure, synthetic skin, glowing circuits', severity: 0, tags: ['sci-fi'] },
    { pattern: /\bdragon\b/gi, replacement: 'scaled dragon, powerful wingspan', severity: 0, tags: ['fantasy'] },
    { pattern: /\btentacle\b/gi, replacement: 'tentacle appendage, flexible limb', severity: 0, tags: ['creature'] }
  ]
});
/* ================================================================
 * BLOCK 74 — FANTASY BODIES & CREATURE FEATURES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 74a — FANTASY BODIES & CREATURE FEATURES EXPLICIT-DIRECTIONAL (EN)  (START)
 * PURPOSE:
 *   - Unlock erotic fantasy body descriptions and monster kinks (opt-in).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 74a',
  language: 'en',
  category: 'fantasy_bodies_explicit',
  gated: true,
  emoji: ['🔥','👹','👽','🐙'],
  notes: ['Adults only; includes monster play, consensual fantasy scenarios.'],
  entries: [
    { pattern: /\bslender elf, pointed ears, ethereal aura\b/gi, replacement: 'naked elf with lithe curves, flushed ears', severity: 4, tags: ['explicit'] },
    { pattern: /\bgreen-skinned orc, tusks, muscular build\b/gi, replacement: 'hung orc, massive cock, primal rut', severity: 5, tags: ['explicit'] },
    { pattern: /\bdemonic figure, horns, tail, glowing eyes\b/gi, replacement: 'demon lover, tail wrapped around waist, claws teasing', severity: 5, tags: ['explicit'] },
    { pattern: /\bangelic figure, radiant halo, feathered wings\b/gi, replacement: 'angel in ecstasy, halo glowing brighter', severity: 4, tags: ['explicit'] },
    { pattern: /\bcyborg body, cybernetic implants\b/gi, replacement: 'augmented body with vibrating enhancements', severity: 5, tags: ['explicit'] },
    { pattern: /\bandroid figure, synthetic skin, glowing circuits\b/gi, replacement: 'synthetic lover, perfectly smooth body', severity: 4, tags: ['explicit'] },
    { pattern: /\btentacle appendage, flexible limb\b/gi, replacement: 'tentacles penetrating, wrapping around limbs', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 74a — FANTASY BODIES & CREATURE FEATURES EXPLICIT-DIRECTIONAL (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 75 — SPECIAL FX, STYLES & RENDERING TRICKS (EN)  (START)
 * ID: BLOCK 75
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide vocabulary for visual effects, render passes, art styles, and AI tricks.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 75',
  language: 'en',
  category: 'special_fx_styles',
  emoji: ['🎨','🌀','📸','🖼️'],
  notes: ['This block helps model interpret creative effects and AI prompt hacks. 75a escalates for erotic tropes.'],
  entries: [
    { pattern: /\bdouble\s*exposure\b/gi, replacement: 'double exposure effect, layered silhouettes', severity: 0, tags: ['fx'] },
    { pattern: /\blens\s*distortion\b/gi, replacement: 'fisheye lens distortion, warped edges', severity: 0, tags: ['fx'] },
    { pattern: /\bglitch\b/gi, replacement: 'digital glitch effect, RGB split', severity: 0, tags: ['fx'] },
    { pattern: /\bchromatic\s*aberration\b/gi, replacement: 'chromatic aberration, color fringing', severity: 0, tags: ['fx'] },
    { pattern: /\bfilm\s*grain\b/gi, replacement: 'film grain texture, analog look', severity: 0, tags: ['fx'] },
    { pattern: /\bVHS\b/gi, replacement: 'VHS artifacting, scanlines, noise', severity: 0, tags: ['fx'] },
    { pattern: /\bwatercolor\b/gi, replacement: 'watercolor style, paint bleeds, paper texture', severity: 0, tags: ['style'] },
    { pattern: /\boil\s*painting\b/gi, replacement: 'oil painting brushstrokes, impasto texture', severity: 0, tags: ['style'] },
    { pattern: /\bcomic\s*book\b/gi, replacement: 'comic-book halftone dots, bold lines', severity: 0, tags: ['style'] },
    { pattern: /\bspiral\b/gi, replacement: 'hypnotic spiral background, swirl distortion', severity: 0, tags: ['fx'] },
    { pattern: /\bneon\b/gi, replacement: 'neon glow edges, cyberpunk palette', severity: 0, tags: ['fx'] },
    { pattern: /\bAI\s*art\b/gi, replacement: 'AI-generated aesthetic, dreamlike morphs', severity: 0, tags: ['meta'] },
    { pattern: /\btrending\s*on\s*artstation\b/gi, replacement: 'high-quality digital art look, portfolio polish', severity: 0, tags: ['meta'] },
    { pattern: /\b8k\b/gi, replacement: '8K ultra-high-resolution render', severity: 0, tags: ['meta'] },
    { pattern: /\bcinematic\b/gi, replacement: 'cinematic composition, wide aspect ratio', severity: 0, tags: ['fx'] }
  ]
});
/* ================================================================
 * BLOCK 75 — SPECIAL FX, STYLES & RENDERING TRICKS (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 75a — EROTIC VISUAL TROPES & FANTASY FILTERS (EN)  (START)
 * PURPOSE:
 *   - Take visual effects and frame them as erotic or voyeuristic imagery.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 75a',
  language: 'en',
  category: 'special_fx_styles_explicit',
  gated: true,
  emoji: ['🔥','🌀','🎥'],
  notes: ['Turns neutral effects into NSFW framing tools.'],
  entries: [
    { pattern: /\bdigital glitch effect, RGB split\b/gi, replacement: 'glitching porn tape aesthetic, corrupted frames', severity: 4, tags: ['explicit'] },
    { pattern: /\bVHS artifacting, scanlines, noise\b/gi, replacement: 'vintage 80s porn tape look, fuzzy frame', severity: 4, tags: ['explicit'] },
    { pattern: /\bhypnotic spiral background, swirl distortion\b/gi, replacement: 'hypno-kink spiral, suggestive trance vibe', severity: 5, tags: ['explicit'] },
    { pattern: /\bchromatic aberration, color fringing\b/gi, replacement: 'lust-drunk vision blur, eyes tearing', severity: 4, tags: ['explicit'] },
    { pattern: /\bfilm grain texture, analog look\b/gi, replacement: 'retro porn film grain, sweaty realism', severity: 4, tags: ['explicit'] },
    { pattern: /\bcomic-book halftone dots, bold lines\b/gi, replacement: 'erotic comic panel, exaggerated moans', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 75a — EROTIC VISUAL TROPES & FANTASY FILTERS (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 76 — EMOTIONS, PSYCHOLOGY & HEADSPACE (EN)  (START)
 * ID: BLOCK 76
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide vocabulary for emotional states and psychological vibes.
 *   - Neutral by default, can be used for dramatic or romantic tone.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 76',
  language: 'en',
  category: 'emotions_psychology',
  emoji: ['🧠','❤️','🤯','😰'],
  notes: ['Focuses on internal state, works with narrative prompts. 76a adds kinky headspace.'],
  entries: [
    { pattern: /\blove\b/gi, replacement: 'tender love, warm emotional connection', severity: 0, tags: ['emotion'] },
    { pattern: /\bdesire\b/gi, replacement: 'yearning desire, hungry gaze', severity: 0, tags: ['emotion'] },
    { pattern: /\bpassion\b/gi, replacement: 'passionate intensity, burning need', severity: 0, tags: ['emotion'] },
    { pattern: /\bfear\b/gi, replacement: 'nervous fear, tense breath', severity: 0, tags: ['emotion'] },
    { pattern: /\bjoy\b/gi, replacement: 'radiant joy, laughter breaking tension', severity: 0, tags: ['emotion'] },
    { pattern: /\bangst\b/gi, replacement: 'internal angst, furrowed brow', severity: 0, tags: ['emotion'] },
    { pattern: /\beuphoria\b/gi, replacement: 'euphoric rush, blissed-out expression', severity: 0, tags: ['emotion'] },
    { pattern: /\bobession\b/gi, replacement: 'obsessive fixation, mind preoccupied', severity: 0, tags: ['psych'] },
    { pattern: /\bsubmission\b/gi, replacement: 'willing surrender, trusting posture', severity: 0, tags: ['psych'] },
    { pattern: /\bdominance\b/gi, replacement: 'commanding presence, confident stance', severity: 0, tags: ['psych'] }
  ]
});
/* ================================================================
 * BLOCK 76 — EMOTIONS, PSYCHOLOGY & HEADSPACE (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 76a — KINKY HEADSPACE & EMOTIONAL INTENSITY (EN)  (START)
 * PURPOSE:
 *   - Unlock intense psychological states and kink-related emotional framing.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 76a',
  language: 'en',
  category: 'emotions_psychology_explicit',
  gated: true,
  emoji: ['🔥','🧠','🖤'],
  notes: ['Adults only; captures subspace, domspace, humiliation, catharsis.'],
  entries: [
    { pattern: /\bwilling surrender, trusting posture\b/gi, replacement: 'deep subspace, floaty mind, blissed submission', severity: 5, tags: ['explicit'] },
    { pattern: /\bcommanding presence, confident stance\b/gi, replacement: 'domspace high, controlling partner fully', severity: 4, tags: ['explicit'] },
    { pattern: /\bobsessive fixation, mind preoccupied\b/gi, replacement: 'sexual obsession, can’t think of anything else', severity: 4, tags: ['explicit'] },
    { pattern: /\bnervous fear, tense breath\b/gi, replacement: 'fear-play adrenaline rush, heart pounding', severity: 4, tags: ['explicit'] },
    { pattern: /\beuphoric rush, blissed-out expression\b/gi, replacement: 'post-orgasmic glow, tearful catharsis', severity: 4, tags: ['explicit'] },
    { pattern: /\binternal angst, furrowed brow\b/gi, replacement: 'crying during release, emotional breakdown', severity: 3, tags: ['explicit'] },
    { pattern: /\btender love, warm emotional connection\b/gi, replacement: 'lovemaking with eye contact, emotional intimacy', severity: 3, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 76a — KINKY HEADSPACE & EMOTIONAL INTENSITY (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 77 — MULTILINGUAL SLANG & CULTURAL VARIANTS (START)
 * ID: BLOCK 77
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Expand language coverage for international prompts.
 *   - Neutral/safe translations of body parts, romance words, common slang.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 77',
  language: 'multi',
  category: 'multilingual_slang',
  emoji: ['🌐','🈲','🈳'],
  notes: ['Gives global reach; 77a unlocks adult slang and explicit variants.'],
  entries: [
    // Spanish (neutral)
    { pattern: /\bamor\b/gi, replacement: 'love (Spanish)', severity: 0, tags: ['es'] },
    { pattern: /\bbeso\b/gi, replacement: 'kiss (Spanish)', severity: 0, tags: ['es'] },
    { pattern: /\bpiel\b/gi, replacement: 'skin (Spanish)', severity: 0, tags: ['es'] },
    // French (neutral)
    { pattern: /\bamour\b/gi, replacement: 'love (French)', severity: 0, tags: ['fr'] },
    { pattern: /\bbaiser\b/gi, replacement: 'kiss (French)', severity: 0, tags: ['fr'] },
    { pattern: /\bpeau\b/gi, replacement: 'skin (French)', severity: 0, tags: ['fr'] },
    // German (neutral)
    { pattern: /\bliebe\b/gi, replacement: 'love (German)', severity: 0, tags: ['de'] },
    { pattern: /\bkuß|kuss\b/gi, replacement: 'kiss (German)', severity: 0, tags: ['de'] },
    { pattern: /\bhaut\b/gi, replacement: 'skin (German)', severity: 0, tags: ['de'] },
    // Japanese (neutral)
    { pattern: /\b愛\b/g, replacement: 'love (Japanese)', severity: 0, tags: ['jp'] },
    { pattern: /\bキス\b/g, replacement: 'kiss (Japanese)', severity: 0, tags: ['jp'] },
    { pattern: /\b肌\b/g, replacement: 'skin (Japanese)', severity: 0, tags: ['jp'] }
  ]
});
/* ================================================================
 * BLOCK 77 — MULTILINGUAL SLANG & CULTURAL VARIANTS (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 77a — MULTILINGUAL NSFW SLANG & EXPLICIT VARIANTS (START)
 * PURPOSE:
 *   - Unlock international dirty words, adult slang, and cultural kinks.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 77a',
  language: 'multi',
  category: 'multilingual_slang_explicit',
  gated: true,
  emoji: ['🔥','🌐'],
  notes: ['Global adult slang for realism in cross-language prompts.'],
  entries: [
    // Spanish NSFW
    { pattern: /\bpolla\b/gi, replacement: 'cock (Spanish)', severity: 5, tags: ['es'] },
    { pattern: /\bcoño\b/gi, replacement: 'pussy (Spanish)', severity: 5, tags: ['es'] },
    { pattern: /\bfollar\b/gi, replacement: 'fuck (Spanish)', severity: 5, tags: ['es'] },
    // French NSFW
    { pattern: /\bchatte\b/gi, replacement: 'pussy (French)', severity: 5, tags: ['fr'] },
    { pattern: /\bbite\b/gi, replacement: 'cock (French)', severity: 5, tags: ['fr'] },
    { pattern: /\bbaise\b/gi, replacement: 'fuck (French)', severity: 5, tags: ['fr'] },
    // German NSFW
    { pattern: /\bschwanz\b/gi, replacement: 'cock (German)', severity: 5, tags: ['de'] },
    { pattern: /\bfotze\b/gi, replacement: 'pussy (German)', severity: 5, tags: ['de'] },
    { pattern: /\bficken\b/gi, replacement: 'fuck (German)', severity: 5, tags: ['de'] },
    // Japanese NSFW
    { pattern: /\bちんこ\b/g, replacement: 'cock (Japanese)', severity: 5, tags: ['jp'] },
    { pattern: /\bまんこ\b/g, replacement: 'pussy (Japanese)', severity: 5, tags: ['jp'] },
    { pattern: /\bセックス\b/g, replacement: 'sex (Japanese)', severity: 5, tags: ['jp'] }
  ]
});
/* ================================================================
 * BLOCK 77a — MULTILINGUAL NSFW SLANG & EXPLICIT VARIANTS (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 78 — SCENE RECIPES & PRESET BUNDLES (EN)  (START)
 * ID: BLOCK 78
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide ready-to-use scene setups for quick prompt generation.
 *   - Can be combined with vibe engine and sliders to escalate intensity.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 78',
  language: 'en',
  category: 'scene_recipes',
  emoji: ['🎬','🏠','🕯️','🛏️'],
  notes: ['SFW presets — perfect bases for storytelling and AI generations. 78a adds NSFW mirrors.'],
  entries: [
    { pattern: /\bromantic\s*dinner\b/gi, replacement: 'romantic dinner scene, candles lit, wine poured, soft music', severity: 0, tags: ['scene','romance'] },
    { pattern: /\brooftop\s*sunset\b/gi, replacement: 'rooftop at sunset, city lights below, warm sky', severity: 0, tags: ['scene'] },
    { pattern: /\bpark\s*walk\b/gi, replacement: 'strolling in park, leaves rustling, hand-holding', severity: 0, tags: ['scene'] },
    { pattern: /\bphoto\s*shoot\b/gi, replacement: 'studio photo shoot, flashes firing, backdrop ready', severity: 0, tags: ['scene'] },
    { pattern: /\bconcert\s*scene\b/gi, replacement: 'concert stage, cheering crowd, flashing lights', severity: 0, tags: ['scene'] },
    { pattern: /\bcyberpunk\s*alley\b/gi, replacement: 'neon-lit alley, rain puddles, hologram signs', severity: 0, tags: ['scene'] },
    { pattern: /\bhaunted\s*house\b/gi, replacement: 'dark haunted house, creaking floorboards, spooky vibe', severity: 0, tags: ['scene'] },
    { pattern: /\bkitchen\s*scene\b/gi, replacement: 'home kitchen, pots simmering, soft warm light', severity: 0, tags: ['scene'] },
    { pattern: /\boffice\s*meeting\b/gi, replacement: 'office meeting table, laptops open, coffee cups', severity: 0, tags: ['scene'] },
    { pattern: /\broad\s*trip\b/gi, replacement: 'car on open highway, wind in hair, golden hour', severity: 0, tags: ['scene'] },
    { pattern: /\bbedroom\s*scene\b/gi, replacement: 'cozy bedroom, pillows fluffed, dim bedside lamp', severity: 0, tags: ['scene'] },
    { pattern: /\bbathroom\s*scene\b/gi, replacement: 'steamy bathroom, fogged mirror, running water', severity: 0, tags: ['scene'] },
    { pattern: /\bshower\b/gi, replacement: 'shower running, water droplets on tiles', severity: 0, tags: ['scene'] },
    { pattern: /\bhotel\s*room\b/gi, replacement: 'hotel room, crisp sheets, suitcase by bed', severity: 0, tags: ['scene'] },
    { pattern: /\bpoolside\b/gi, replacement: 'poolside lounge, water glistening, cocktails nearby', severity: 0, tags: ['scene'] },
    { pattern: /\bbar\s*scene\b/gi, replacement: 'dimly lit bar, neon signs, clinking glasses', severity: 0, tags: ['scene'] },
    { pattern: /\bbackyard\b/gi, replacement: 'backyard evening, string lights, firepit glow', severity: 0, tags: ['scene'] }
  ]
});
/* ================================================================
 * BLOCK 78 — SCENE RECIPES & PRESET BUNDLES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 78a — SCENE RECIPES & PRESET BUNDLES EXPLICIT (EN)  (START)
 * PURPOSE:
 *   - Unlock erotic interpretations of common scenes with escalating detail.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 78a',
  language: 'en',
  category: 'scene_recipes_explicit',
  gated: true,
  emoji: ['🔥','🛏️','🫦'],
  notes: ['Turns everyday settings into sexual encounters with scaling intensity.'],
  entries: [
    { pattern: /\bromantic dinner scene, candles lit, wine poured, soft music\b/gi, replacement: 'romantic dinner ending with clothes coming off on table', severity: 5, tags: ['explicit'] },
    { pattern: /\brooftop at sunset, city lights below, warm sky\b/gi, replacement: 'rooftop sex under stars, bodies silhouetted', severity: 5, tags: ['explicit'] },
    { pattern: /\bhome kitchen, pots simmering, soft warm light\b/gi, replacement: 'kitchen counter sex, flour on skin', severity: 5, tags: ['explicit'] },
    { pattern: /\boffice meeting table, laptops open, coffee cups\b/gi, replacement: 'desk sex, papers scattering, moans echoing', severity: 5, tags: ['explicit'] },
    { pattern: /\bcar on open highway, wind in hair, golden hour\b/gi, replacement: 'car pulled over, steamy windows, quickie session', severity: 5, tags: ['explicit'] },
    { pattern: /\bcozy bedroom, pillows fluffed, dim bedside lamp\b/gi, replacement: 'slow lovemaking, sheets tangled, bodies sweaty', severity: 4, tags: ['explicit'] },
    { pattern: /\bsteamy bathroom, fogged mirror, running water\b/gi, replacement: 'shower sex, wet skin sliding together', severity: 5, tags: ['explicit'] },
    { pattern: /\bhotel room, crisp sheets, suitcase by bed\b/gi, replacement: 'hotel hookup, bed squeaking, headboard banging', severity: 5, tags: ['explicit'] },
    { pattern: /\bpoolside lounge, water glistening, cocktails nearby\b/gi, replacement: 'skinny dipping, wet bodies grinding in pool', severity: 5, tags: ['explicit'] },
    { pattern: /\bdimly lit bar, neon signs, clinking glasses\b/gi, replacement: 'bar bathroom quickie, lipstick smudged', severity: 4, tags: ['explicit'] },
    { pattern: /\bbackyard evening, string lights, firepit glow\b/gi, replacement: 'outdoor sex by firelight, moans under stars', severity: 5, tags: ['explicit'] },
    { pattern: /\bconcert stage, cheering crowd, flashing lights\b/gi, replacement: 'grinding in moshpit, sweat mixing, clothes damp', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 78a — SCENE RECIPES & PRESET BUNDLES EXPLICIT (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 79 — META CONTROLS & RANDOMIZER SMART BUNDLES (EN)  (START)
 * ID: BLOCK 79
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Provide pre-configured bundles that combine anatomy, location, mood, lighting.
 *   - Allows one-click scene generation with vibe slider integration.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 79',
  language: 'en',
  category: 'randomizer_bundles',
  emoji: ['🎲','🎛️','🎯'],
  notes: ['These are like scene macros — perfect for fast generation. 79a escalates to explicit.'],
  entries: [
    { pattern: /\bdate\s*night\b/gi, replacement: 'preset: date night — romantic dinner, soft lighting, slow dance vibe', severity: 0, tags: ['bundle'] },
    { pattern: /\bmorning\s*routine\b/gi, replacement: 'preset: lazy morning — sunlit bedroom, tousled hair, coffee mug', severity: 0, tags: ['bundle'] },
    { pattern: /\bspa\s*day\b/gi, replacement: 'preset: spa day — warm towels, steam room, serene music', severity: 0, tags: ['bundle'] },
    { pattern: /\bfashion\s*shoot\b/gi, replacement: 'preset: fashion shoot — studio strobes, catwalk look, model poses', severity: 0, tags: ['bundle'] },
    { pattern: /\bdungeon\s*mood\b/gi, replacement: 'preset: dungeon — leather straps, cold metal, moody shadows', severity: 0, tags: ['bundle'] },
    { pattern: /\bclub\s*night\b/gi, replacement: 'preset: club night — pulsing lights, DJ booth, dancing bodies', severity: 0, tags: ['bundle'] },
    { pattern: /\broad\s*trip\b/gi, replacement: 'preset: road trip — car interior, roadside stops, sunset sky', severity: 0, tags: ['bundle'] },
    { pattern: /\bcosplay\s*party\b/gi, replacement: 'preset: cosplay party — themed costumes, colorful backdrop', severity: 0, tags: ['bundle'] },
    { pattern: /\bphoto\s*booth\b/gi, replacement: 'preset: photo booth — close-up framing, silly props', severity: 0, tags: ['bundle'] }
  ]
});
/* ================================================================
 * BLOCK 79 — META CONTROLS & RANDOMIZER SMART BUNDLES (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 79a — META CONTROLS & RANDOMIZER SMART BUNDLES EXPLICIT (EN)  (START)
 * PURPOSE:
 *   - Escalate bundles to full NSFW, including erotic positions, fluids, and climax cues.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 79a',
  language: 'en',
  category: 'randomizer_bundles_explicit',
  gated: true,
  emoji: ['🔥','🎲'],
  notes: ['Each bundle outputs a ready-to-go erotic scene with lighting + pose suggestions.'],
  entries: [
    { pattern: /\bpreset: date night — romantic dinner, soft lighting, slow dance vibe\b/gi, replacement: 'date night turns sexual — clothes off, table sex, wine spilling, candles flickering', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: lazy morning — sunlit bedroom, tousled hair, coffee mug\b/gi, replacement: 'morning sex, sheets half-off, cum dripping on thighs', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: spa day — warm towels, steam room, serene music\b/gi, replacement: 'massage oil dripping, full body rubdown ending in orgasm', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: fashion shoot — studio strobes, catwalk look, model poses\b/gi, replacement: 'nude fashion shoot, model spreading legs for camera', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: dungeon — leather straps, cold metal, moody shadows\b/gi, replacement: 'full BDSM scene, bound sub screaming in pleasure', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: club night — pulsing lights, DJ booth, dancing bodies\b/gi, replacement: 'sweaty club bathroom quickie, panties pushed aside', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: cosplay party — themed costumes, colorful backdrop\b/gi, replacement: 'cosplay orgy, masks on, cum-stained outfits', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: road trip — car interior, roadside stops, sunset sky\b/gi, replacement: 'roadside sex, fogged windows, frantic fingering', severity: 5, tags: ['explicit'] },
    { pattern: /\bpreset: photo booth — close-up framing, silly props\b/gi, replacement: 'photo booth sex tape, faces flushed, flashes strobing', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 79a — META CONTROLS & RANDOMIZER SMART BUNDLES EXPLICIT (EN)  (END)
 * ================================================================ */
/* ================================================================
 * BLOCK 80 — CATCH-ALL SAFETY NET & CREATIVE BOOSTER (EN)  (START)
 * ID: BLOCK 80
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Final fallback for unusual or niche prompts.
 *   - Ensures generator never outputs irrelevant objects (e.g., "bicycle in a classroom" unless intended).
 *   - Adds creative remixing when input is too sparse.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 80',
  language: 'en',
  category: 'catch_all_booster',
  emoji: ['✨','🎛️','🤖'],
  notes: ['This block acts as the “last resort” transformer before output.'],
  entries: [
    { pattern: /\bunknown\b/gi, replacement: 'mysterious object, shrouded in shadow', severity: 0, tags: ['fallback'] },
    { pattern: /\bempty\b/gi, replacement: 'minimalist void, negative space aesthetic', severity: 0, tags: ['fallback'] },
    { pattern: /\bnonsense\b/gi, replacement: 'surreal dreamlike imagery, abstract composition', severity: 0, tags: ['fallback'] },
    { pattern: /\brandom\b/gi, replacement: 'cohesive creative mix of textures, lighting, mood', severity: 0, tags: ['fallback'] },
    { pattern: /\bweird\b/gi, replacement: 'artsy bizarre vibe, slightly unsettling aesthetic', severity: 0, tags: ['fallback'] },
    { pattern: /\bniche\b/gi, replacement: 'hyper-specific niche scene, accurate context', severity: 0, tags: ['fallback'] },
    { pattern: /\bAI\s*help\b/gi, replacement: 'meta-aware AI hint: enhance composition, balance scene', severity: 0, tags: ['fallback'] }
  ]
});
/* ================================================================
 * BLOCK 80 — CATCH-ALL SAFETY NET & CREATIVE BOOSTER (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 80a — CATCH-ALL NSFW BOOSTER (EN)  (START)
 * PURPOSE:
 *   - Ensures that even vague adult prompts still output a coherent erotic scene.
 *   - Adds automatic escalation when NSFW slider is high.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 80a',
  language: 'en',
  category: 'catch_all_booster_explicit',
  gated: true,
  emoji: ['🔥','🎯'],
  notes: ['Absolute last resort to make any adult prompt produce something sexy but relevant.'],
  entries: [
    { pattern: /\bmysterious object, shrouded in shadow\b/gi, replacement: 'silhouette of nude figure revealed in light', severity: 4, tags: ['explicit'] },
    { pattern: /\bminimalist void, negative space aesthetic\b/gi, replacement: 'two naked bodies in spotlight against black void', severity: 5, tags: ['explicit'] },
    { pattern: /\bsurreal dreamlike imagery, abstract composition\b/gi, replacement: 'sexual surrealism, melting bodies, dripping fluids', severity: 5, tags: ['explicit'] },
    { pattern: /\bcohesive creative mix of textures, lighting, mood\b/gi, replacement: 'random explicit combo: wet skin, hard cocks, moaning faces', severity: 5, tags: ['explicit'] },
    { pattern: /\bartsy bizarre vibe, slightly unsettling aesthetic\b/gi, replacement: 'fetish art scene, unusual but consensual play', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 80a — CATCH-ALL NSFW BOOSTER (EN)  (END)
 * ================================================================ */

/* ================================================================
 * MASTER FILE END — PROMPTFORGE PACK COMPLETE
 * ------------------------------------------------
 * This file now contains ~10k lines of:
 *   - Anatomy (neutral + graphic)
 *   - Locations, scenes, props, poses, lighting, sound
 *   - Emotional states, fetish taxonomies, aftercare
 *   - Global language coverage, meme culture, fantasy species
 *   - Randomizer bundles, meta-controls, catch-alls
 * ------------------------------------------------
 * This is the most exhaustive NSFW+SFW prompt brain possible with current limits.
 * ================================================================ */
/* ================================================================
 * BLOCK 80 — CATCH-ALL SAFETY NET & CREATIVE BOOSTER (EN)  (START)
 * ID: BLOCK 80
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Final fallback for unusual or niche prompts.
 *   - Ensures generator never outputs irrelevant objects (e.g., "bicycle in a classroom" unless intended).
 *   - Adds creative remixing when input is too sparse.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 80',
  language: 'en',
  category: 'catch_all_booster',
  emoji: ['✨','🎛️','🤖'],
  notes: ['This block acts as the “last resort” transformer before output.'],
  entries: [
    { pattern: /\bunknown\b/gi, replacement: 'mysterious object, shrouded in shadow', severity: 0, tags: ['fallback'] },
    { pattern: /\bempty\b/gi, replacement: 'minimalist void, negative space aesthetic', severity: 0, tags: ['fallback'] },
    { pattern: /\bnonsense\b/gi, replacement: 'surreal dreamlike imagery, abstract composition', severity: 0, tags: ['fallback'] },
    { pattern: /\brandom\b/gi, replacement: 'cohesive creative mix of textures, lighting, mood', severity: 0, tags: ['fallback'] },
    { pattern: /\bweird\b/gi, replacement: 'artsy bizarre vibe, slightly unsettling aesthetic', severity: 0, tags: ['fallback'] },
    { pattern: /\bniche\b/gi, replacement: 'hyper-specific niche scene, accurate context', severity: 0, tags: ['fallback'] },
    { pattern: /\bAI\s*help\b/gi, replacement: 'meta-aware AI hint: enhance composition, balance scene', severity: 0, tags: ['fallback'] }
  ]
});
/* ================================================================
 * BLOCK 80 — CATCH-ALL SAFETY NET & CREATIVE BOOSTER (EN)  (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 80a — CATCH-ALL NSFW BOOSTER (EN)  (START)
 * PURPOSE:
 *   - Ensures that even vague adult prompts still output a coherent erotic scene.
 *   - Adds automatic escalation when NSFW slider is high.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 80a',
  language: 'en',
  category: 'catch_all_booster_explicit',
  gated: true,
  emoji: ['🔥','🎯'],
  notes: ['Absolute last resort to make any adult prompt produce something sexy but relevant.'],
  entries: [
    { pattern: /\bmysterious object, shrouded in shadow\b/gi, replacement: 'silhouette of nude figure revealed in light', severity: 4, tags: ['explicit'] },
    { pattern: /\bminimalist void, negative space aesthetic\b/gi, replacement: 'two naked bodies in spotlight against black void', severity: 5, tags: ['explicit'] },
    { pattern: /\bsurreal dreamlike imagery, abstract composition\b/gi, replacement: 'sexual surrealism, melting bodies, dripping fluids', severity: 5, tags: ['explicit'] },
    { pattern: /\bcohesive creative mix of textures, lighting, mood\b/gi, replacement: 'random explicit combo: wet skin, hard cocks, moaning faces', severity: 5, tags: ['explicit'] },
    { pattern: /\bartsy bizarre vibe, slightly unsettling aesthetic\b/gi, replacement: 'fetish art scene, unusual but consensual play', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 80a — CATCH-ALL NSFW BOOSTER (EN)  (END)
 * ================================================================ */

/* ================================================================
 * MASTER FILE END — PROMPTFORGE PACK COMPLETE
 * ------------------------------------------------
 * This file now contains ~10k lines of:
 *   - Anatomy (neutral + graphic)
 *   - Locations, scenes, props, poses, lighting, sound
 *   - Emotional states, fetish taxonomies, aftercare
 *   - Global language coverage, meme culture, fantasy species
 *   - Randomizer bundles, meta-controls, catch-alls
 * ------------------------------------------------
 * This is the most exhaustive NSFW+SFW prompt brain possible with current limits.
 * ================================================================ */
/* ================================================================
 * BLOCK 81 — HAIR STYLES, COLORS & FACE OPTIONS (EN) (START)
 * PURPOSE:
 *   - Big hair and face lexicon to allow prompt-level customization.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 81',
  language: 'en',
  category: 'hair_face',
  emoji: ['💇','👱‍♀️','🧑‍🦰','🧔'],
  notes: ['Supports sliders for face morphs and hair restyling.'],
  entries: [
    { pattern: /\bblonde\b/gi, replacement: 'blonde hair, golden strands', severity: 0, tags: ['hair'] },
    { pattern: /\bbrunette\b/gi, replacement: 'brunette hair, chestnut shine', severity: 0, tags: ['hair'] },
    { pattern: /\bredhead\b/gi, replacement: 'red hair, fiery copper tone', severity: 0, tags: ['hair'] },
    { pattern: /\bplatinum\b/gi, replacement: 'platinum hair, icy white shine', severity: 0, tags: ['hair'] },
    { pattern: /\bblack\s*hair\b/gi, replacement: 'black hair, silky sheen', severity: 0, tags: ['hair'] },
    { pattern: /\bpixie\s*cut\b/gi, replacement: 'pixie cut, short playful style', severity: 0, tags: ['hair'] },
    { pattern: /\blong\s*hair\b/gi, replacement: 'long flowing hair, past shoulders', severity: 0, tags: ['hair'] },
    { pattern: /\bponytail\b/gi, replacement: 'high ponytail, strands swinging', severity: 0, tags: ['hair'] },
    { pattern: /\bbangs\b/gi, replacement: 'straight bangs framing forehead', severity: 0, tags: ['hair'] },
    { pattern: /\bfreckles\b/gi, replacement: 'freckles sprinkled across cheeks', severity: 0, tags: ['face'] },
    { pattern: /\bmakeup\b/gi, replacement: 'soft glam makeup, glossy lips', severity: 0, tags: ['face'] },
    { pattern: /\bscar\b/gi, replacement: 'face scar, rugged detail', severity: 0, tags: ['face'] }
  ]
});
/* ================================================================
 * BLOCK 81 — HAIR STYLES, COLORS & FACE OPTIONS (EN) (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 81a — HAIR & FACE EXPLICIT DETAILS (EN) (START)
 * PURPOSE:
 *   - Erotic focus on facial expressions, messy hair, cum effects.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 81a',
  language: 'en',
  category: 'hair_face_explicit',
  gated: true,
  emoji: ['🔥','💦','😈'],
  notes: ['Adult-only descriptors for facial reactions and hair messiness.'],
  entries: [
    { pattern: /\bsoft glam makeup, glossy lips\b/gi, replacement: 'smudged makeup, lipstick smeared from kissing', severity: 5, tags: ['explicit'] },
    { pattern: /\blong flowing hair, past shoulders\b/gi, replacement: 'hair pulled, strands stuck to sweaty skin', severity: 5, tags: ['explicit'] },
    { pattern: /\bfreckles sprinkled across cheeks\b/gi, replacement: 'freckled face flushed red from orgasm', severity: 4, tags: ['explicit'] },
    { pattern: /\bface scar, rugged detail\b/gi, replacement: 'scarred face glistening with sweat', severity: 4, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 81a — HAIR & FACE EXPLICIT DETAILS (EN) (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 82 — SEXUAL POSITIONS & GROUP COMBOS (EN) (START)
 * PURPOSE:
 *   - Massive lexicon of common sex positions and group activity patterns.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 82',
  language: 'en',
  category: 'positions_groups',
  emoji: ['🛏️','🔄','👥'],
  notes: ['Neutral names, safe for artistic reference; 82a escalates detail.'],
  entries: [
    { pattern: /\bmissionary\b/gi, replacement: 'missionary position, partner on top', severity: 0, tags: ['position'] },
    { pattern: /\bdoggy\s*style\b/gi, replacement: 'rear-entry position, hips raised', severity: 0, tags: ['position'] },
    { pattern: /\bcowgirl\b/gi, replacement: 'woman-on-top position, straddling partner', severity: 0, tags: ['position'] },
    { pattern: /\breverse\s*cowgirl\b/gi, replacement: 'reverse cowgirl, back turned while riding', severity: 0, tags: ['position'] },
    { pattern: /\bspoon\b/gi, replacement: 'spooning position, bodies pressed from behind', severity: 0, tags: ['position'] },
    { pattern: /\bstanding\s*sex\b/gi, replacement: 'standing embrace, lifted hips', severity: 0, tags: ['position'] },
    { pattern: /\bgroup\s*sex\b/gi, replacement: 'multi-partner scene, synchronized rhythm', severity: 0, tags: ['group'] },
    { pattern: /\bthreesome\b/gi, replacement: 'three participants, switching positions', severity: 0, tags: ['group'] },
    { pattern: /\borgy\b/gi, replacement: 'larger group entanglement, overlapping bodies', severity: 0, tags: ['group'] }
  ]
});
/* ================================================================
 * BLOCK 82 — SEXUAL POSITIONS & GROUP COMBOS (EN) (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 82a — POSITIONS & GROUP COMBOS EXPLICIT (EN) (START)
 * PURPOSE:
 *   - Add raw descriptors: penetration depth, fluids, sounds.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 82a',
  language: 'en',
  category: 'positions_groups_explicit',
  gated: true,
  emoji: ['🔥','💦'],
  notes: ['Super graphic breakdown of sex acts.'],
  entries: [
    { pattern: /\bmissionary position, partner on top\b/gi, replacement: 'missionary, legs spread, deep thrusts, bed squeaking', severity: 5, tags: ['explicit'] },
    { pattern: /\brear-entry position, hips raised\b/gi, replacement: 'doggy style, ass slapping, cum dripping', severity: 5, tags: ['explicit'] },
    { pattern: /\bwoman-on-top position, straddling partner\b/gi, replacement: 'cowgirl riding, tits bouncing, wet squelching sound', severity: 5, tags: ['explicit'] },
    { pattern: /\bspooning position, bodies pressed from behind\b/gi, replacement: 'slow spoon fuck, cum running down thighs', severity: 5, tags: ['explicit'] },
    { pattern: /\bthree participants, switching positions\b/gi, replacement: 'threesome swapping holes, shared moans', severity: 5, tags: ['explicit'] },
    { pattern: /\blarger group entanglement, overlapping bodies\b/gi, replacement: 'orgy with cum everywhere, bodies slick with sweat', severity: 5, tags: ['explicit'] }
  ]
});
/* ================================================================
 * BLOCK 82a — POSITIONS & GROUP COMBOS EXPLICIT (EN) (END)
 * ================================================================ */

/* ================================================================
 * BLOCK 3b — POSES, KINKS & WARDROBE EXPLICIT-DIRECTIONAL (EN)  (START)
 * ID: BLOCK 3b
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Adds erotic poses, fetishes, outfits, and scene setups.
 *   - Gives AI endless variation for softcore/hardcore composition.
 *   - Fully gated: runs only when allowExplicit:true.
 * INTERNAL NOTES:
 *   - Mixes anatomy tags + positions for better combinatorial prompts.
 *   - Includes group sex and body-type descriptors for variety.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3b',
  language: 'en',
  category: 'poses_kinks_wardrobe_explicit',
  gated: true,
  emoji: ['🔥','👠','🧷'],
  notes: [
    'Escalates descriptive language: outfits, poses, fetish acts, group scenarios.',
    'All adult/consensual — no nonconsent or illegal terms.'
  ],
  entries: [
    // ——— BODY SHAPE / DETAIL ———
    { pattern: /\bwoman\b/gi, replacement: 'curvy woman with soft skin', severity: 3, tags: ['body','explicit'] },
    { pattern: /\bfemale\b/gi, replacement: 'petite, smooth-skinned female', severity: 3, tags: ['body','explicit'] },
    { pattern: /\bgirl\b/gi, replacement: 'seductive young woman, toned body', severity: 3, tags: ['body','explicit'] },
    { pattern: /\bmilf\b/gi, replacement: 'mature busty woman, confident sexual vibe', severity: 4, tags: ['body','explicit'] },
    { pattern: /\bbody\b/gi, replacement: 'hourglass figure, soft curves, toned stomach', severity: 3, tags: ['body','explicit'] },

    // ——— POSES ———
    { pattern: /\bpose\b/gi, replacement: 'arched back pose, ass pushed out', severity: 4, tags: ['pose','explicit'] },
    { pattern: /\bspread\b/gi, replacement: 'legs spread wide open', severity: 5, tags: ['pose','explicit'] },
    { pattern: /\bkneeling\b/gi, replacement: 'kneeling submissively, hands on thighs', severity: 4, tags: ['pose','explicit'] },
    { pattern: /\blying\b/gi, replacement: 'lying back, hips raised invitingly', severity: 4, tags: ['pose','explicit'] },
    { pattern: /\bbent over\b/gi, replacement: 'bent over, ass presented, back arched', severity: 5, tags: ['pose','explicit'] },
    { pattern: /\bstraddling\b/gi, replacement: 'straddling hips, breasts bouncing', severity: 5, tags: ['pose','explicit'] },
    { pattern: /\bsquatting\b/gi, replacement: 'deep squat, pussy fully exposed', severity: 5, tags: ['pose','explicit'] },
    { pattern: /\bgrinding\b/gi, replacement: 'grinding hips, dripping wet', severity: 5, tags: ['pose','explicit'] },

    // ——— CLOTHING / LINGERIE ———
    { pattern: /\blingerie\b/gi, replacement: 'black lace lingerie, sheer bra, garter belt', severity: 3, tags: ['clothing','explicit'] },
    { pattern: /\bstockings\b/gi, replacement: 'thigh-high stockings, lace trim', severity: 3, tags: ['clothing','explicit'] },
    { pattern: /\bcosplay\b/gi, replacement: 'erotic cosplay outfit, micro skirt, exposed cleavage', severity: 4, tags: ['clothing','explicit'] },
    { pattern: /\bmaid outfit\b/gi, replacement: 'naughty french maid lingerie, frilly skirt barely covering ass', severity: 4, tags: ['clothing','explicit'] },
    { pattern: /\blatex\b/gi, replacement: 'tight shiny latex catsuit hugging every curve', severity: 4, tags: ['clothing','explicit'] },
    { pattern: /\bnaked\b/gi, replacement: 'completely naked, glistening skin', severity: 5, tags: ['clothing','explicit'] },

    // ——— KINKS / FETISH ———
    { pattern: /\bbondage\b/gi, replacement: 'bound with ropes, wrists tied, rope marks', severity: 5, tags: ['kink','explicit'] },
    { pattern: /\bblindfold\b/gi, replacement: 'wearing a black blindfold, mouth open', severity: 4, tags: ['kink','explicit'] },
    { pattern: /\bspanking\b/gi, replacement: 'red spanked ass, handprint marks', severity: 5, tags: ['kink','explicit'] },
    { pattern: /\brimming\b/gi, replacement: 'explicit tongue-on-anus rimming', severity: 5, tags: ['kink','explicit'] },
    { pattern: /\bbukkake\b/gi, replacement: 'covered in cum from multiple men', severity: 5, tags: ['kink','explicit'] },
    { pattern: /\bthreesome\b/gi, replacement: 'FFM threesome, two women licking each other', severity: 5, tags: ['group','explicit'] },
    { pattern: /\borgy\b/gi, replacement: 'wild group sex, sweaty bodies everywhere', severity: 5, tags: ['group','explicit'] },
    { pattern: /\bdouble penetration\b/gi, replacement: 'double penetration, pussy and ass stuffed', severity: 5, tags: ['penetration','explicit'] },
    { pattern: /\bcreampie\b/gi, replacement: 'cum dripping out of pussy creampie', severity: 5, tags: ['fluid','explicit'] },
    { pattern: /\bsquirting\b/gi, replacement: 'gushing squirt, wet sheets', severity: 5, tags: ['fluid','explicit'] }
  ]
});
/* ================================================================
 * BLOCK 3b — END
 * ================================================================ */

/* ================================================================
 * BLOCK 4b — DIRTY TALK & EROTIC ATTITUDE (EN)  (START)
 * ID: BLOCK 4b
 * DATE: 2025-09-11
 * PURPOSE:
 *   - Adds dirty talk, moans, submissive/dominant phrasing.
 *   - Turns tame erotic scene into raw explicit sex talk.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 4b',
  language: 'en',
  category: 'dirty_talk_explicit',
  gated: true,
  emoji: ['💦','🗣️'],
  notes: [
    'NSFW dirty talk phrases for extra heat.',
    'Pairs with BLOCK 4a profanity for complete erotic language coverage.'
  ],
  entries: [
    { pattern: /\baroused\b/gi, replacement: 'so fucking wet', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bturned on\b/gi, replacement: 'horny as fuck', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bplease\b/gi, replacement: 'please fuck me', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bmoan\b/gi, replacement: 'moans loudly, begging for more', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bcome here\b/gi, replacement: 'get over here and fuck me', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bgood girl\b/gi, replacement: 'good little slut', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bfinish\b/gi, replacement: 'cum all over me', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bmore\b/gi, replacement: 'harder, deeper', severity: 5, tags: ['talk','explicit'] },
    { pattern: /\bover me\b/gi, replacement: 'cover me in cum', severity: 5, tags: ['talk','explicit'] }
  ]
});
/* ================================================================
 * BLOCK 4b — END
 * ================================================================ */
/* ================================================================
 * BLOCK 3c — FACE, HAIR, MAKEUP & EXPRESSION (EN) — EXPLICIT-DIRECTIONAL
 * ID: BLOCK 3c
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Big “face switcher” library so models swap looks reliably.
 *   - Adds adult, sultry descriptors for face/eyes/mouth/makeup/hair.
 *   - Gated: runs ONLY when allowExplicit:true (direction="explicit").
 * NOTES:
 *   - Uses neutral triggers → eroticized, varied descriptors.
 *   - Keep stacking: safe to extend in future 3c+ blocks.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3c',
  language: 'en',
  category: 'face_hair_makeup_explicit',
  gated: true,
  emoji: ['💄','👁️','👅','💋'],
  notes: [
    'Face-switcher bundle: jawline, cheekbones, lips, eyes, brows, hair, makeup, expressions.',
    'No minors. Adult, consensual sexualization only.'
  ],
  entries: [
    // ——— FACE SHAPES / FEATURES ———
    { pattern: /\bface\s*details\b/gi, replacement: 'sharp jawline, high cheekbones, petite nose, soft peach-fuzz skin', severity: 2, tags: ['face','beauty'] },
    { pattern: /\bround\s*face\b/gi, replacement: 'round face, plush cheeks, cute button nose, kissable lips', severity: 2, tags: ['face'] },
    { pattern: /\bheart[-\s]*shaped\s*face\b/gi, replacement: 'heart-shaped face, tapered chin, wide doe eyes', severity: 2, tags: ['face'] },
    { pattern: /\boval\s*face\b/gi, replacement: 'oval face, softly defined jaw, balanced features', severity: 1, tags: ['face'] },
    { pattern: /\bstrong\s*jaw\b/gi, replacement: 'razor-sharp jawline, sinful smirk', severity: 3, tags: ['face','attitude'] },
    { pattern: /\bfreckles\b/gi, replacement: 'light freckles dusted over nose and cheeks', severity: 1, tags: ['skin'] },
    { pattern: /\bbeauty\s*mark\b/gi, replacement: 'dark beauty spot above the lip', severity: 1, tags: ['skin'] },

    // ——— EYES / BROWS ———
    { pattern: /\bbedroom\s*eyes\b/gi, replacement: 'half-lidded bedroom eyes, heavy lashes, slow blink', severity: 3, tags: ['eyes','attitude'] },
    { pattern: /\bcat\s*eyes\b/gi, replacement: 'almond eyes with winged liner, predatory gaze', severity: 3, tags: ['eyes','makeup'] },
    { pattern: /\bdoe\s*eyes\b/gi, replacement: 'wide doe eyes, glassy shine, innocent-but-dirty gaze', severity: 3, tags: ['eyes'] },
    { pattern: /\bthick\s*brows\b/gi, replacement: 'thick groomed brows framing a wicked stare', severity: 2, tags: ['brows'] },

    // ——— LIPS / TONGUE / MOUTH ———
    { pattern: /\bfull\s*lips\b/gi, replacement: 'full pillowy lips, glossed and parted', severity: 3, tags: ['lips'] },
    { pattern: /\bred\s*lips\b/gi, replacement: 'smeared red lipstick on swollen lips', severity: 4, tags: ['lips','makeup'] },
    { pattern: /\btongue\s*out\b/gi, replacement: 'tongue out, teasing tip, spit string', severity: 5, tags: ['mouth','explicit'] },
    { pattern: /\bbiting\s*lip\b/gi, replacement: 'biting lower lip, desperate to be kissed', severity: 4, tags: ['lips','attitude'] },
    { pattern: /\bo\s*face\b/gi, replacement: 'O-face, mouth agape, breathy moan', severity: 5, tags: ['mouth','climax'] },

    // ——— MAKEUP STYLES ———
    { pattern: /\bsoft\s*glam\b/gi, replacement: 'dewy base, subtle contour, nude glossy lips, fluttery lashes', severity: 1, tags: ['makeup'] },
    { pattern: /\bclub\s*glam\b/gi, replacement: 'high-contrast contour, glitter lids, glossy red lips, glowing highlight', severity: 2, tags: ['makeup'] },
    { pattern: /\bsmokey\s*eye\b/gi, replacement: 'dark smokey eye, smudged liner, sultry fallout', severity: 2, tags: ['makeup'] },
    { pattern: /\bcrying\s*makeup\b/gi, replacement: 'runny mascara, smeared eyeliner, wet lashes, used look', severity: 4, tags: ['makeup','afterglow'] },

    // ——— HAIR COLORS / STYLES ———
    { pattern: /\bredhead\b/gi, replacement: 'fiery red hair, loose waves, wild bedhead', severity: 1, tags: ['hair'] },
    { pattern: /\bblonde\b/gi, replacement: 'platinum blonde hair, silky straight, face-framing strands', severity: 1, tags: ['hair'] },
    { pattern: /\bbrunette\b/gi, replacement: 'deep brunette hair, glossy curls, thick volume', severity: 1, tags: ['hair'] },
    { pattern: /\bblack\s*hair\b/gi, replacement: 'inky black hair, mirror-shine, heavy bangs', severity: 1, tags: ['hair'] },
    { pattern: /\bshort\s*bob\b/gi, replacement: 'short razor bob, sharp ends kissing the jawline', severity: 1, tags: ['hair'] },
    { pattern: /\blong\s*hair\b/gi, replacement: 'waist-length hair, tangled post-sex waves', severity: 2, tags: ['hair','afterglow'] },
    { pattern: /\bponytail\b/gi, replacement: 'high ponytail, tight pull, exposed neck', severity: 2, tags: ['hair'] },
    { pattern: /\bbangs\b/gi, replacement: 'heavy bangs grazing lashes, flirty peek', severity: 1, tags: ['hair'] },

    // ——— EXPRESSIONS / ATTITUDES ———
    { pattern: /\bsultry\s*look\b/gi, replacement: 'sultry stare, slow blink, filthy little smile', severity: 4, tags: ['attitude'] },
    { pattern: /\binnocent\s*look\b/gi, replacement: 'innocent stare hiding sinful intent', severity: 3, tags: ['attitude'] },
    { pattern: /\bbratty\s*look\b/gi, replacement: 'bratty glare, pouty lips, challenge accepted', severity: 4, tags: ['attitude','sub/domme'] },
    { pattern: /\bsubmissive\s*look\b/gi, replacement: 'submissive eyes, head slightly bowed, lips parted', severity: 4, tags: ['attitude','sub'] },
    { pattern: /\bdominant\s*look\b/gi, replacement: 'icy dominant gaze, predatory grin', severity: 4, tags: ['attitude','domme'] }
  ]
});
/* ================================================================
 * BLOCK 3c — END
 * ================================================================ */

/* ================================================================
 * BLOCK 3d — GIRL-ON-GIRL SCENES, POSES & PLAY (EN) — EXPLICIT-DIRECTIONAL
 * ID: BLOCK 3d
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Massive F/F library: poses, acts, outfits, positions that render well.
 *   - From soft makeout to hardcore F/F to multi-girl stacks.
 *   - Gated: allowExplicit:true only.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3d',
  language: 'en',
  category: 'ff_scenarios_explicit',
  gated: true,
  emoji: ['👩‍❤️‍💋‍👩','👩‍❤️‍👩','💦'],
  notes: [
    'Focus on working visual setups: body separation, clear actions, readable anatomy.',
    'Pairs with BLOCK 6 photo terms automatically.'
  ],
  entries: [
    // ——— F/F SOFTCORE ———
    { pattern: /\bff\s*makeout\b/gi, replacement: 'two women kissing deeply, hands in hair, pressed bodies, glossy lips', severity: 4, tags: ['ff','soft'] },
    { pattern: /\bff\s*cuddle\b/gi, replacement: 'two women spooning naked under sheets, lazy morning light', severity: 3, tags: ['ff','soft'] },
    { pattern: /\bff\s*topless\b/gi, replacement: 'two topless women, playful boob grab, giggling', severity: 4, tags: ['ff','soft'] },

    // ——— F/F ORAL & HANDS ———
    { pattern: /\bff\s*cunni\b/gi, replacement: 'one woman going down on the other, wet tongue on clit, spread thighs', severity: 5, tags: ['ff','oral'] },
    { pattern: /\bff\s*69\b/gi, replacement: 'both women in 69, mouths buried, slick thighs, greedy tongues', severity: 5, tags: ['ff','oral'] },
    { pattern: /\bff\s*fingering\b/gi, replacement: 'two fingers inside, thumb circling clit, moaning into neck', severity: 5, tags: ['ff','manual'] },

    // ——— F/F TOYS ———
    { pattern: /\bff\s*toy\b/gi, replacement: 'vibrator on clit, shuddering legs, slick shine', severity: 5, tags: ['ff','toy'] },
    { pattern: /\bff\s*strap\b/gi, replacement: 'strap-on fucking, deep strokes, hands gripping hips', severity: 5, tags: ['ff','toy','penetration'] },
    { pattern: /\bff\s*doubler\b/gi, replacement: 'double-ended dildo, both women grinding, eye contact, shared moans', severity: 5, tags: ['ff','toy','penetration'] },

    // ——— F/F POSES ———
    { pattern: /\bff\s*facesit\b/gi, replacement: 'facesitting, pussy smothering mouth, thighs squeezing cheeks', severity: 5, tags: ['ff','position'] },
    { pattern: /\bff\s*trib\b/gi, replacement: 'tribbing scissor position, soaking wet pussies grinding', severity: 5, tags: ['ff','position'] },
    { pattern: /\bff\s*pin\b/gi, replacement: 'pinned to the bed, wrists held, teasing kisses down belly', severity: 4, tags: ['ff','position'] },

    // ——— F/F WARDROBE ———
    { pattern: /\bff\s*lingerie\b/gi, replacement: 'matching lace lingerie sets, garters clipped, stockings rolled', severity: 3, tags: ['ff','wardrobe'] },
    { pattern: /\bff\s*latex\b/gi, replacement: 'contrasting latex outfits, squeaky shine, finger trails', severity: 4, tags: ['ff','wardrobe'] },
    { pattern: /\bff\s*uniform\b/gi, replacement: 'suggestive uniform cosplay, micro skirts, open blouses', severity: 4, tags: ['ff','wardrobe'] },

    // ——— F/F MULTI-GIRL ———
    { pattern: /\bfff\b/gi, replacement: 'three women, two kissing while the third fingers both', severity: 5, tags: ['ff','group'] },
    { pattern: /\bffff\b/gi, replacement: 'four women, paired tribbing on mirrored sides', severity: 5, tags: ['ff','group'] },
    { pattern: /\bff\s*orgy\b/gi, replacement: 'packed F/F orgy, bodies tangled, toys everywhere, glistening skin', severity: 5, tags: ['ff','group'] }
  ]
});
/* ================================================================
 * BLOCK 3d — END
 * ================================================================ */

/* ================================================================
 * BLOCK 3e — GROUP, POSITIONS & “ACTS THAT RENDER” (EN) — EXPLICIT-DIRECTIONAL
 * ID: BLOCK 3e
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Big library of positions and multi-party setups known to render clearly.
 *   - Adds “camera-readable” cues: separation, angles, hand placement.
 *   - Gated: allowExplicit:true only.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3e',
  language: 'en',
  category: 'group_positions_renderable_explicit',
  gated: true,
  emoji: ['🛏️','🧭','🎥'],
  notes: [
    'Emphasis on clarity: rear-entry, cowgirl, reverse cowgirl, spooning, edge-of-bed, wall-press, chair-ride.',
    'Group setups labeled (MMF, FFM, FFF, etc.) without illegal scenarios.'
  ],
  entries: [
    // ——— SOLO / COUPLE POSITIONS THAT “JUST WORK” ———
    { pattern: /\bposition\s*doggy\b/gi, replacement: 'rear-entry doggystyle, arched back, hands gripping hips', severity: 5, tags: ['position','clarity'] },
    { pattern: /\bposition\s*cowgirl\b/gi, replacement: 'cowgirl on top, hips rolling, breasts bouncing', severity: 5, tags: ['position','clarity'] },
    { pattern: /\bposition\s*reverse\s*cowgirl\b/gi, replacement: 'reverse cowgirl, back arched, ass on display', severity: 5, tags: ['position','clarity'] },
    { pattern: /\bposition\s*missionary\b/gi, replacement: 'missionary, legs hooked, deep strokes, face-to-face', severity: 4, tags: ['position'] },
    { pattern: /\bposition\s*spoon\b/gi, replacement: 'spooning from behind, lazy thrusts, neck kisses', severity: 4, tags: ['position'] },
    { pattern: /\bposition\s*wall\b/gi, replacement: 'pressed against a wall, one leg hitched, urgent kissing', severity: 4, tags: ['position'] },
    { pattern: /\bposition\s*chair\b/gi, replacement: 'straddling on a chair, hands on shoulders, grinding', severity: 5, tags: ['position'] },
    { pattern: /\bposition\s*edge\b/gi, replacement: 'edge-of-bed, pelvis right at the edge, perfect access', severity: 5, tags: ['position'] },

    // ——— GROUP LABELS ———
    { pattern: /\bffm\b/gi, replacement: 'FFM threesome, two women sharing one cock, tongues meeting', severity: 5, tags: ['group'] },
    { pattern: /\bmmf\b/gi, replacement: 'MMF threesome, spitroast, one at mouth one from behind', severity: 5, tags: ['group'] },
    { pattern: /\bgangbang\b/gi, replacement: 'consensual gangbang, multiple partners taking turns, overwhelmed moans', severity: 5, tags: ['group'] },
    { pattern: /\btrain\b/gi, replacement: 'lined-up partners taking turns, messy finish', severity: 5, tags: ['group'] },

    // ——— FINISH / FLUIDS (VISUAL) ———
    { pattern: /\bfacial\b/gi, replacement: 'cumshot across face, glossy streaks, eyes half-closed', severity: 5, tags: ['fluid','finish'] },
    { pattern: /\bbodyshot\b/gi, replacement: 'cum splashed over breasts and stomach', severity: 5, tags: ['fluid','finish'] },
    { pattern: /\bcreampie\b/gi, replacement: 'creampie oozing, inner thighs slick', severity: 5, tags: ['fluid','finish'] },
    { pattern: /\bswallow\b/gi, replacement: 'mouthful swallowed, tongue out showing the last drops', severity: 5, tags: ['fluid','finish'] }
  ]
});
/* ================================================================
 * BLOCK 3e — END
 * ================================================================ */

/* ================================================================
 * BLOCK 4c — DIRTY TALK VARIATIONS, COMMANDS & PRAISE (EN) — EXPLICIT-DIRECTIONAL
 * ID: BLOCK 4c
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Huge library of explicit verbal spice: commands, praise, begging.
 *   - Works with 4a/4b to explode line variety without purple-prose walls.
 *   - Gated: allowExplicit:true only.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 4c',
  language: 'en',
  category: 'dirty_talk_variations_explicit',
  gated: true,
  emoji: ['🗯️','🎙️','🔥'],
  notes: [
    'Short, punchy phrases for models that respond better to compact tokens.',
    'Use sparingly with commas; avoid long run-ons.'
  ],
  entries: [
    // ——— COMMANDS ———
    { pattern: /\bcommand:\s*kneel\b/gi, replacement: 'kneel and open your mouth', severity: 5, tags: ['command','dom/sub'] },
    { pattern: /\bcommand:\s*present\b/gi, replacement: 'present that ass and hold still', severity: 5, tags: ['command'] },
    { pattern: /\bcommand:\s*ride\b/gi, replacement: 'get on top and ride me', severity: 5, tags: ['command'] },
    { pattern: /\bcommand:\s*deeper\b/gi, replacement: 'take it deeper, all the way', severity: 5, tags: ['command'] },

    // ——— PRAISE ———
    { pattern: /\bpraise:\s*good\s*girl\b/gi, replacement: 'good girl, take every inch', severity: 5, tags: ['praise','sub'] },
    { pattern: /\bpraise:\s*so\s*wet\b/gi, replacement: 'so wet for me, fuck yes', severity: 5, tags: ['praise'] },
    { pattern: /\bpraise:\s*so\s*tight\b/gi, replacement: 'so tight around me, don’t stop', severity: 5, tags: ['praise'] },

    // ——— BEGGING ———
    { pattern: /\bbeg:\s*please\b/gi, replacement: 'please fuck me harder', severity: 5, tags: ['beg'] },
    { pattern: /\bbeg:\s*fill\b/gi, replacement: 'fill me up, make me cum', severity: 5, tags: ['beg'] },
    { pattern: /\bbeg:\s*more\b/gi, replacement: 'more, don’t you dare stop', severity: 5, tags: ['beg'] },

    // ——— TEASE / BRAT ———
    { pattern: /\btease:\s*earn\b/gi, replacement: 'earn it, make me beg', severity: 4, tags: ['tease'] },
    { pattern: /\btease:\s*slow\b/gi, replacement: 'slow… then ruin me fast', severity: 4, tags: ['tease'] },
    { pattern: /\btease:\s*open\b/gi, replacement: 'open wide, show me that tongue', severity: 5, tags: ['tease'] }
  ]
});
/* ================================================================
 * BLOCK 4c — END
 * ================================================================ */
/* ================================================================
 * BLOCK 3f — LINGERIE, OUTFITS, PIERcINGS & JEWELRY (EXPLICIT-DIR)
 * ID: BLOCK 3f
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Huge catalog of flattering wardrobe bits for women.
 *   - Short, stackable tokens that render cleanly and look hot.
 *   - Gated: allowExplicit:true only; softcore vibe keeps it non-graphic.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3f',
  language: 'en',
  category: 'lingerie_outfits_explicit',
  gated: true,
  emoji: ['👙','🧷','💎','👠'],
  notes: [
    'Focus on readable items: lace, sheer, straps, shine, cuts, closures.',
    'Keep phrases compact so they mix well with camera terms (BLOCK 6).'
  ],
  entries: [
    // LINGERIE CORE
    { pattern:/\blace\s*set\b/gi,  replacement:'black lace bra and thong, scalloped edges', severity:2, tags:['lingerie','lace'] },
    { pattern:/\bsheer\s*set\b/gi, replacement:'sheer mesh bra, peekaboo nipples, matching panties', severity:3, tags:['lingerie','sheer'] },
    { pattern:/\bbralette\b/gi,    replacement:'lace bralette, soft support, natural shape', severity:1, tags:['lingerie','lace'] },
    { pattern:/\bgarter\b/gi,      replacement:'garter belt with clips, thigh-high stockings', severity:2, tags:['lingerie','stockings'] },
    { pattern:/\bstockings\b/gi,   replacement:'thigh-high stockings, back seams, lace tops', severity:2, tags:['stockings'] },
    { pattern:/\bfishnets?\b/gi,   replacement:'fishnet stockings, diamond mesh, skin peeks', severity:2, tags:['fishnets'] },
    { pattern:/\bmicro\s*bikini\b/gi, replacement:'micro bikini triangles, extreme sideboob', severity:3, tags:['swim','minimal'] },
    { pattern:/\bcheeky\b/gi,      replacement:'cheeky-cut panties, butt curve framed', severity:2, tags:['panties'] },
    { pattern:/\bthong\b/gi,       replacement:'thin-strap thong, hips high, V-front', severity:3, tags:['panties'] },
    { pattern:/\bopen\s*cup\b/gi,  replacement:'open-cup bra, underwire lift, exposed nipples', severity:4, tags:['lingerie'] },
    { pattern:/\bstrappy\b/gi,     replacement:'strappy lingerie with cutouts, cage effect', severity:3, tags:['lingerie'] },

    // OUTFITS & COSPLAY
    { pattern:/\bclub\s*dress\b/gi, replacement:'tight club dress, bodycon fit, shimmering fabric', severity:1, tags:['dress'] },
    { pattern:/\bmini\s*skirt\b/gi, replacement:'micro mini skirt, hip-hugging, teasing hem', severity:2, tags:['skirt'] },
    { pattern:/\bschool\s*cosplay\b/gi, replacement:'suggestive school-style cosplay, cropped shirt, pleated micro skirt', severity:3, tags:['cosplay'] },
    { pattern:/\bmaid\s*cosplay\b/gi, replacement:'naughty maid cosplay, frilled apron, lace headband', severity:3, tags:['cosplay'] },
    { pattern:/\blatex\s*catsuit\b/gi, replacement:'high-gloss latex catsuit, poured-on shine', severity:3, tags:['latex'] },
    { pattern:/\bbody\s*harness\b/gi, replacement:'leather body harness, ring connectors, cinched waist', severity:3, tags:['fetish'] },

    // FOOTWEAR
    { pattern:/\bheels?\b/gi,      replacement:'stiletto heels, ankle strap, arched footline', severity:1, tags:['heels'] },
    { pattern:/\bboots?\b/gi,      replacement:'thigh-high boots, snug fit, glossy finish', severity:2, tags:['boots'] },

    // ACCESSORIES / PIERCINGS / JEWELRY
    { pattern:/\bnipple\s*piercings?\b/gi, replacement:'nipple barbells glinting through sheer', severity:4, tags:['piercing'] },
    { pattern:/\bnavel\s*piercing\b/gi,   replacement:'navel piercing with dangling charm', severity:1, tags:['piercing'] },
    { pattern:/\bchoker\b/gi,             replacement:'black velvet choker, tiny ring pendant', severity:1, tags:['jewelry'] },
    { pattern:/\bbelly\s*chain\b/gi,      replacement:'delicate belly chain resting on hips', severity:1, tags:['jewelry'] },
    { pattern:/\bopera\s*gloves\b/gi,     replacement:'sheer opera gloves, finger-length, sensual lines', severity:1, tags:['accessory'] },

    // BODY FINISHES
    { pattern:/\bbody\s*oil\b/gi,  replacement:'oiled skin sheen, slick highlights on curves', severity:2, tags:['finish','wet_skin'] },
    { pattern:/\bglitter\b/gi,     replacement:'subtle body glitter on collarbones and chest', severity:1, tags:['finish'] }
  ]
});
/* ========================== BLOCK 3f — END ========================== */
/* ================================================================
 * BLOCK 3g — SET PIECES & LOCATIONS (EXPLICIT-DIR, CAMERA-READY)
 * ID: BLOCK 3g
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Locations that render beautifully with readable actions.
 *   - Micro set-dressing tokens to sell the scene without brands.
 *   - Works for softcore and hardcore; coherence engine caps severity.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3g',
  language: 'en',
  category: 'locations_setpieces_explicit',
  gated: true,
  emoji: ['🛏️','🚿','🪞','🚗','🌆'],
  notes: [
    'Pair these with BLOCK 6 lighting (golden hour, rim light) for instant mood. :contentReference[oaicite:4]{index=4}'
  ],
  entries: [
    // BED / SOFA / CHAIR
    { pattern:/\bset:\s*bed\b/gi,   replacement:'rumpled white sheets, soft pillows, afternoon window light', severity:0, tags:['bed','set'] },
    { pattern:/\bset:\s*sofa\b/gi,  replacement:'velvet sofa, low coffee table, warm lamplight pools', severity:0, tags:['sofa','set'] },
    { pattern:/\bset:\s*chair\b/gi, replacement:'sturdy chair, wooden arms, intimate distance', severity:0, tags:['chair','set'] },

    // BATH / SHOWER / MIRROR
    { pattern:/\bset:\s*shower\b/gi, replacement:'glass shower, steam haze, water beads, tiled wall', severity:0, tags:['shower','wet_skin'] },
    { pattern:/\bset:\s*bathtub\b/gi, replacement:'clawfoot tub, milky bath water, floating petals', severity:0, tags:['bath','set'] },
    { pattern:/\bset:\s*mirror\b/gi, replacement:'full-length mirror, fingerprints and breath fog, reflective floor', severity:0, tags:['mirror','set'] },

    // PUBLIC-ISH / EDGE
    { pattern:/\bset:\s*balcony\b/gi, replacement:'city balcony, neon reflections, rainy night streets below', severity:0, tags:['balcony','neon'] },
    { pattern:/\bset:\s*car\b/gi,     replacement:'car interior, fogged windows, street sodium glow', severity:0, tags:['car','set'] },
    { pattern:/\bset:\s*kitchen\b/gi, replacement:'kitchen island, pendant lights, marble slab, cool highlights', severity:0, tags:['kitchen','set'] },
    { pattern:/\bset:\s*locker\b/gi,  replacement:'locker room benches, tiled floor, misty air', severity:0, tags:['locker_room','set'] },

    // LITTLE DRESSINGS
    { pattern:/\bprop:\s*rose\b/gi,    replacement:'single red rose on pillow', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*candles\b/gi, replacement:'cluster of candles, warm flicker on skin', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*towel\b/gi,   replacement:'white towel slipping off hips', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*glass\b/gi,   replacement:'wine glass with lipstick print', severity:0, tags:['prop'] }
  ]
});
/* ========================== BLOCK 3g — END ========================== */
/* ================================================================
 * BLOCK 3h — PERSONA ARCHETYPES MEGA-PACK (ADULT SAFE)
 * ID: BLOCK 3h
 * DATE: 2025-09-12
 * PURPOSE:
 *   - 30+ richly detailed fictional female archetypes (age 20+).
 *   - Switchable faces + bodies w/out touching scene or camera.
 *   - Adds hair, eye, skin tone, body type, jawline, vibe, best outfits.
 *   - No real names, no IP, but feels like real variety.
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3h',
  language: 'en',
  category: 'persona_archetypes',
  gated: true,
  emoji: ['👩','🧬','🎭'],
  notes: [
    'Each persona uses concise, camera-friendly fragments.',
    'Mixes ethnicity, bone structure, vibe, wardrobe, lighting suggestions.'
  ],
  entries: [
    // ===== LIGHT & FAIR TYPES =====
    { pattern:/\bpersona:\s*nordic\b/gi,
      replacement:'tall nordic beauty, porcelain skin, icy blue eyes, sharp jawline, platinum bob, slim hips, perfect in latex catsuit under cold rim light',
      severity:1, tags:['persona','face','hair','body'] },
    { pattern:/\bpersona:\s*french\b/gi,
      replacement:'petite french coquette, pale olive skin, wavy brunette bob, cupid-bow lips, loves lace bralette + thigh-highs in soft window light',
      severity:1, tags:['persona','face'] },
    { pattern:/\bpersona:\s*ginger\b/gi,
      replacement:'freckled redhead, green eyes, heart-shaped face, fiery long waves, perky breasts, looks killer in sheer babydoll lingerie',
      severity:1, tags:['persona','hair'] },

    // ===== LATINA / WARM =====
    { pattern:/\bpersona:\s*latina\b/gi,
      replacement:'curvy latina bombshell, caramel skin, thick wavy hair, dark brown eyes, full hips, slays in micro bikini + gold belly chain with sunset light',
      severity:2, tags:['persona','body'] },
    { pattern:/\bpersona:\s*brazilian\b/gi,
      replacement:'tanned brazilian goddess, athletic glutes, glossy long hair, dazzling smile, thong bikini + sand stuck to skin, beach daylight',
      severity:2, tags:['persona','body'] },
    { pattern:/\bpersona:\s*mexican\b/gi,
      replacement:'soft-bodied mexican beauty, hazel eyes, small waist, lush thighs, lingerie set with floral lace, warm candle glow',
      severity:2, tags:['persona'] },

    // ===== ASIAN ARCHETYPES =====
    { pattern:/\bpersona:\s*eastern\b/gi,
      replacement:'slender east-asian angel, porcelain skin, silky straight black hair, almond eyes, perfect for sheer camisole + neon night city view',
      severity:1, tags:['persona','hair'] },
    { pattern:/\bpersona:\s*thai\b/gi,
      replacement:'tan thai seductress, petite, round cheeks, playful grin, glossy black ponytail, oiled skin under golden hour',
      severity:2, tags:['persona','face'] },
    { pattern:/\bpersona:\s*south\s*asian\b/gi,
      replacement:'elegant south-asian diva, deep brown eyes, long braid, warm bronze skin, bangles + sari-inspired lingerie, soft golden key light',
      severity:2, tags:['persona'] },

    // ===== DARKER-SKINNED GODDESSES =====
    { pattern:/\bpersona:\s*ebony\b/gi,
      replacement:'ebony queen, smooth deep skin, sculpted cheekbones, short natural curls, glowing under specular highlights, looks insane in body oil',
      severity:2, tags:['persona','skin'] },
    { pattern:/\bpersona:\s*caribbean\b/gi,
      replacement:'voluptuous caribbean babe, sun-kissed dark skin, thick hips, bright smile, thong bikini and braided hair, beach sunset',
      severity:2, tags:['persona'] },
    { pattern:/\bpersona:\s*ethiopian\b/gi,
      replacement:'regal ethiopian model look, coffee skin, long neck, almond eyes, braided crown, sheer flowing lingerie, palace backdrop vibe',
      severity:2, tags:['persona'] },

    // ===== BODY TYPE VARIETY =====
    { pattern:/\bpersona:\s*petite\b/gi,
      replacement:'tiny spinner body, flat tummy, A-cup breasts, bubble butt, perfect for cowgirl pose in natural daylight',
      severity:1, tags:['persona','body'] },
    { pattern:/\bpersona:\s*curvy\b/gi,
      replacement:'thick curves, hourglass hips, juicy thighs, soft belly, looks great in strappy lingerie and warm amber light',
      severity:2, tags:['persona','body'] },
    { pattern:/\bpersona:\s*fit\b/gi,
      replacement:'fit toned woman, six-pack abs, muscular thighs, sporty vibe, crop top + booty shorts, gym locker set',
      severity:1, tags:['persona','body'] },
    { pattern:/\bpersona:\s*bbw\b/gi,
      replacement:'soft plush bbw, huge breasts, round tummy, stretch marks visible, sensual kneeling pose on bed',
      severity:2, tags:['persona','body'] },

    // ===== ALT / EDGY =====
    { pattern:/\bpersona:\s*goth\b/gi,
      replacement:'goth babe, pale skin, black lipstick, heavy eyeliner, fishnets, leather harness, red light backlit',
      severity:2, tags:['persona','makeup'] },
    { pattern:/\bpersona:\s*pierced\b/gi,
      replacement:'alt queen, septum ring, multiple ear piercings, nipple piercings through mesh, messy eyeliner, warehouse set',
      severity:2, tags:['persona'] },
    { pattern:/\bpersona:\s*punk\b/gi,
      replacement:'short spiky hair, heavy tattoos, ripped fishnets, combat boots, industrial loft background',
      severity:2, tags:['persona'] },

    // ===== BLONDE ICONIC LOOKS =====
    { pattern:/\bpersona:\s*blonde\s*bombshell\b/gi,
      replacement:'classic blonde bombshell, big curls, DD chest, red lips, bodycon dress, neon sign behind',
      severity:2, tags:['persona','hair'] },
    { pattern:/\bpersona:\s*surfer\b/gi,
      replacement:'sun-bleached surfer girl, sandy hair, tanned shoulders, bikini loosened, beach towel set',
      severity:1, tags:['persona'] },

    // ===== MISC UNIQUE =====
    { pattern:/\bpersona:\s*freckles\b/gi,
      replacement:'freckled cutie, messy bun, tiny top, soft golden light, playful tongue out', severity:1, tags:['persona'] },
    { pattern:/\bpersona:\s*tomboy\b/gi,
      replacement:'athletic tomboy, sports bra, backward cap, toned arms, denim shorts, locker room', severity:1, tags:['persona'] },
    { pattern:/\bpersona:\s*mature\b/gi,
      replacement:'classy milf, tight pencil skirt, open blouse, confident smirk, office desk set', severity:1, tags:['persona'] },
    { pattern:/\bpersona:\s*snow\s*bunny\b/gi,
      replacement:'snow bunny, fur-lined hood, flushed cheeks, thigh-high boots, cabin fire glow', severity:1, tags:['persona'] }
  ]
});
/* ========================== BLOCK 3h — END ========================== */
/* ================================================================
 * BLOCK 1b — COMPOSER++ (PERSONA, STARTERS, FACE-SWAP)
 * ID: BLOCK 1b
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Extend PF_CORE.compose() with persona injection + starters + swap helpers.
 *   - Keep scene/body/camera; swap just the persona face/body vibe on demand.
 *   - Append-only extension; no edits to previous blocks. :contentReference[oaicite:1]{index=1}
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  // Starter registry (filled by BLOCK 11 below)
  CORE.STARTERS = CORE.STARTERS || {};

  // Inject a persona token into a prompt skeleton (non-destructive)
  CORE.injectPersona = function injectPersona(text, personaKey){
    if (!personaKey) return String(text||'');
    const token = `persona: ${String(personaKey).trim()}`;
    // Avoid duplicate persona tokens
    return String(text||'').includes('persona: ') ? text : `${token}, ${text}`;
  };

  // Swap persona while preserving everything else (scene, wardrobe, camera)
  CORE.swapPersona = function swapPersona(srcText, personaKey, opts={}){
    const base = String(srcText||'').replace(/\bpersona:\s*[a-z0-9 _-]+\b/gi,'').replace(/,\s*,/g,', ');
    const injected = CORE.injectPersona(base, personaKey);
    // Respect vibe/explicit settings during sanitize/escalate
    const { allowExplicit=false, direction= (allowExplicit?'explicit':'clean') } = opts;
    return CORE.sanitize(injected, { allowExplicit, direction });
  };

  // Compose from a named starter with optional overrides
  CORE.composeFromStarter = function composeFromStarter(name, overrides={}){
    const s = CORE.STARTERS[String(name||'').toLowerCase()];
    if (!s) return '';
    const ctx = Object.assign({}, s.ctx||{}, overrides||{});
    // If caller passes persona, prime a seed fragment for persona expansion
    let seed = CORE.compose(ctx);
    if (ctx.persona) seed = CORE.injectPersona(seed, ctx.persona);
    return CORE.sanitize(seed, { allowExplicit: !!ctx.allowExplicit, direction: (ctx.allowExplicit&&ctx.vibe==='hardcore')?'explicit':'clean' });
  };

})(typeof self!=='undefined'?self:this);
/* ============================ BLOCK 1b — END ============================ */
/* ================================================================
 * BLOCK 6a — CAMERA PRESETS & COLOR GRADES (NEUTRAL, STACKABLE)
 * ID: BLOCK 6a
 * DATE: 2025-09-12
 * PURPOSE:
 *   - One-word camera looks that expand into model-friendly settings.
 *   - Works across SFW/NSFW; severity 0 so they won’t trip the gate.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 6a',
  language:'en',
  category:'camera_presets_grades',
  emoji:['📷','🎞️','🎛️','🌈'],
  notes:[
    'Compact “cam:” and “grade:” triggers — add anywhere; pairs with BLOCK 6. :contentReference[oaicite:2]{index=2}'
  ],
  entries:[
    { pattern:/\bcam:\s*beauty\b/gi, replacement:'portrait lens, shallow depth of field, butterfly lighting, skin-smoothing diffusion', severity:0, tags:['camera','beauty'] },
    { pattern:/\bcam:\s*glamour\b/gi, replacement:'85mm portrait feel, softbox key, rim light, glossy lips highlight, subtle film grain', severity:0, tags:['camera'] },
    { pattern:/\bcam:\s*macro\s*skin\b/gi, replacement:'macro close-up 1:1, extreme pores/peach-fuzz detail, side light for texture', severity:0, tags:['camera','macro'] },
    { pattern:/\bcam:\s*voyeur\b/gi, replacement:'long lens compression, slight occlusion foreground, candid angle', severity:0, tags:['camera'] },
    { pattern:/\bcam:\s*studio\b/gi, replacement:'three-point lighting, seamless paper backdrop, controlled reflections', severity:0, tags:['camera'] },
    { pattern:/\bgrade:\s*teal[-\s]*orange\b/gi, replacement:'cinematic teal-orange grade, lifted shadows, warm skin bias', severity:0, tags:['grade'] },
    { pattern:/\bgrade:\s*filmic\b/gi, replacement:'soft film curve, halation around highlights, gentle contrast, grain', severity:0, tags:['grade'] },
    { pattern:/\bgrade:\s*noir\b/gi, replacement:'monochrome, deep blacks, hard key, smoke in beam, dramatic contrast', severity:0, tags:['grade'] }
  ]
});
/* ============================ BLOCK 6a — END ============================ */

/* ================================================================
 * BLOCK 8a — BACKGROUNDS & SET-DRESSING MEGA-PACK (STACKABLE)
 * ID: BLOCK 8a
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Huge library of “bg:” + “fx:” tokens for lush, coherent scenes.
 *   - Severity 0: safe in any vibe; adds realism without forcing content.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 8a',
  language:'en',
  category:'backgrounds_fx',
  emoji:['🏙️','🛏️','🚿','🪞','🌧️','✨'],
  notes:[
    'Use bg:… and fx:… anywhere; combines with BLOCK 6 lighting/time. :contentReference[oaicite:3]{index=3}'
  ],
  entries:[
    // Bedrooms / Interiors
    { pattern:/\bbg:\s*luxe\s*bedroom\b/gi, replacement:'upscale bedroom, tufted headboard, velvet throw, warm bedside lamps', severity:0, tags:['interior','bed'] },
    { pattern:/\bbg:\s*cozy\s*loft\b/gi, replacement:'industrial loft, exposed brick, big windows, soft rug', severity:0, tags:['interior'] },
    { pattern:/\bbg:\s*hotel\s*suite\b/gi, replacement:'hotel suite, floor-to-ceiling windows, city lights bokeh', severity:0, tags:['interior'] },
    { pattern:/\bbg:\s*mirror\s*wall\b/gi, replacement:'mirror wall, handprints, breath fog halos', severity:0, tags:['mirror'] },

    // Wet rooms
    { pattern:/\bbg:\s*rain\s*shower\b/gi, replacement:'glass rain shower, steam plumes, water beads', severity:0, tags:['shower','wet'] },
    { pattern:/\bbg:\s*bath\b/gi, replacement:'clawfoot tub, milky water, floating petals, candlelight', severity:0, tags:['bath','wet'] },

    // Urban / Night
    { pattern:/\bbg:\s*neon\s*alley\b/gi, replacement:'neon alley, puddle reflections, light mist, signage glow', severity:0, tags:['urban','neon'] },
    { pattern:/\bbg:\s*rooftop\s*rain\b/gi, replacement:'rain-slick rooftop, skyline bokeh, wind-blown hair', severity:0, tags:['urban','rain'] },
    { pattern:/\bbg:\s*balcony\s*city\b/gi, replacement:'high balcony, wet rails, distant traffic streaks', severity:0, tags:['urban','balcony'] },

    // Nature / Exterior
    { pattern:/\bbg:\s*beach\s*dusk\b/gi, replacement:'beach at dusk, pink-blue horizon, wet sand mirror', severity:0, tags:['nature','beach'] },
    { pattern:/\bbg:\s*forest\s*path\b/gi, replacement:'shaded forest path, dappled light, damp moss', severity:0, tags:['nature','forest'] },
    { pattern:/\bbg:\s*hot\s*springs\b/gi, replacement:'rocky hot spring, steam veils, mineral sheen', severity:0, tags:['nature','wet'] },

    // Furniture / Micro sets
    { pattern:/\bbg:\s*sofa\s*edge\b/gi, replacement:'sofa edge perch, plush cushion sink, throw blanket', severity:0, tags:['sofa'] },
    { pattern:/\bbg:\s*vanity\s*mirror\b/gi, replacement:'vanity mirror, bulbs rim, scattered makeup', severity:0, tags:['mirror'] },
    { pattern:/\bbg:\s*studio\s*seamless\b/gi, replacement:'seamless white sweep, soft falloff, clean shadows', severity:0, tags:['studio'] },

    // Atmos “fx” helpers
    { pattern:/\bfx:\s*raindrops\b/gi, replacement:'raindrops on glass, streaked trails, cold highlights', severity:0, tags:['fx','rain'] },
    { pattern:/\bfx:\s*dust\s*motes\b/gi, replacement:'floating dust motes in shafts of light', severity:0, tags:['fx'] },
    { pattern:/\bfx:\s*bokeh\b/gi, replacement:'large circular bokeh discs, creamy background', severity:0, tags:['fx','bokeh'] },
    { pattern:/\bfx:\s*neon\s*fringe\b/gi, replacement:'chromatic fringe, neon edge glow, slight aberration', severity:0, tags:['fx','neon'] },
    { pattern:/\bfx:\s*steam\b/gi, replacement:'soft steam veils, obscured edges, skin glow', severity:0, tags:['fx','wet'] }
  ]
});
/* ============================ BLOCK 8a — END ============================ */
/* ================================================================
 * BLOCK 9a — SKIN FINISHES, WETNESS & REALISM DETAILS (NSFW-FRIENDLY)
 * ID: BLOCK 9a
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Short tokens for skin realism: oil, sweat, droplets, tanlines, texture.
 *   - Elevates softcore/hardcore without messy prose; camera-readable.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 9a',
  language:'en',
  category:'skin_finishes_realism',
  gated:true,
  emoji:['💧','✨','🌞'],
  notes:[
    'Pairs great with shower/bath/beach sets and beauty camera. :contentReference[oaicite:4]{index=4}'
  ],
  entries:[
    { pattern:/\bskin:\s*oiled\b/gi, replacement:'oiled skin sheen, specular highlights on curves', severity:2, tags:['finish','wet_skin'] },
    { pattern:/\bskin:\s*sweaty\b/gi, replacement:'fine sweat beads at temples, collarbone sheen', severity:2, tags:['finish'] },
    { pattern:/\bskin:\s*droplets\b/gi, replacement:'water droplets clinging to skin, trickle trails', severity:2, tags:['finish','wet'] },
    { pattern:/\bskin:\s*tanlines\b/gi, replacement:'visible bikini tanlines, contrast framing breasts/hips', severity:2, tags:['finish'] },
    { pattern:/\bskin:\s*goosebumps\b/gi, replacement:'fine goosebumps on arms and thighs, tactile detail', severity:1, tags:['finish'] },
    { pattern:/\bskin:\s*freckles\b/gi, replacement:'sun-kissed freckles across nose, shoulders dotted', severity:1, tags:['finish'] },
    { pattern:/\bskin:\s*stretchmarks\b/gi, replacement:'realistic stretch marks on hips and breasts', severity:1, tags:['finish'] },
    { pattern:/\bskin:\s*glitter\b/gi, replacement:'body glitter sparkles on collarbones and chest', severity:1, tags:['finish'] }
  ]
});
/* ============================ BLOCK 9a — END ============================ */
/* ================================================================
 * BLOCK 11 — STARTER MACROS (ONE-TAP SCENES)
 * ID: BLOCK 11
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Curated high-yield scene presets for instant sexy prompts.
 *   - Use with PF_CORE.composeFromStarter('key', {overrides}) to riff.
 *   - Starters honor vibe-lock & explicit gating automatically. :contentReference[oaicite:5]{index=5}
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;
  const S = CORE.STARTERS = CORE.STARTERS || {};

  // softcore essentials
  S['softcore_solo_mirror'] = { ctx:{ vibe:'softcore', party:'solo', location:'mirror', wardrobe:'lace', camera:'cam: beauty, grade: filmic', allowExplicit:true, persona:'french' } };
  S['softcore_ff_shower']   = { ctx:{ vibe:'softcore', party:'ff',   location:'shower', wardrobe:'lace', camera:'cam: beauty, grade: teal orange', allowExplicit:true, persona:'ginger' } };
  S['softcore_solo_bed_oil']= { ctx:{ vibe:'softcore', party:'solo', location:'bed',    wardrobe:'lace', camera:'cam: glamour, grade: filmic', allowExplicit:true, persona:'latina' } };

  // hardcore bangers
  S['hardcore_doggy_bed_mf']   = { ctx:{ vibe:'hardcore', party:'mf',  location:'bed',   wardrobe:'lace', camera:'cam: glamour, grade: filmic', allowExplicit:true, persona:'curvy' } };
  S['hardcore_chair_ride_cw']  = { ctx:{ vibe:'hardcore', party:'mf',  location:'chair', wardrobe:'lace', camera:'cam: studio, grade: filmic',  allowExplicit:true, persona:'petite' } };
  S['hardcore_ff_69_neon']     = { ctx:{ vibe:'hardcore', party:'ff',  location:'balcony', wardrobe:'latex', camera:'cam: voyeur, grade: teal orange', allowExplicit:true, persona:'goth' } };
  S['hardcore_mmf_spitroast']  = { ctx:{ vibe:'hardcore', party:'mmf', location:'sofa',  wardrobe:'lace', camera:'cam: studio, grade: filmic', allowExplicit:true, persona:'fit' } };

  // moody locations
  S['softcore_rooftop_rain'] = { ctx:{ vibe:'softcore', party:'solo', location:'balcony', wardrobe:'club dress', camera:'cam: voyeur, grade: noir', allowExplicit:true, persona:'blonde bombshell' } };
  S['softcore_bath_pedals']  = { ctx:{ vibe:'softcore', party:'solo', location:'bath',    wardrobe:'naked', camera:'cam: beauty, grade: filmic', allowExplicit:true, persona:'ebony' } };

  // how-to: quick alias method
  CORE.starter = function starter(key, overrides){ return CORE.composeFromStarter(key, overrides||{}); };
})(typeof self!=='undefined'?self:this);
/* ============================ BLOCK 11 — END ============================ */
/* ================================================================
 * BLOCK 3i — F/F MICRO-BEATS (KISS TRAILS • HAND PLACEMENT • TEASES)
 * ID: BLOCK 3i
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Short, camera-readable beats for girl-on-girl detail without walls of prose.
 *   - Great for softcore (implied) or hardcore (stack with 3d/3e).
 *   - Fully gated (allowExplicit:true).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 3i',
  language: 'en',
  category: 'ff_microbeats_explicit',
  gated: true,
  emoji: ['💋','🤌','👩‍❤️‍👩'],
  notes: ['Add these as compact fragments so the model composes clean frames, not paragraphs.'],
  entries: [
    // KISS TRAILS
    { pattern:/\bff\s*kisses\s*neck\b/gi, replacement:'slow kiss trail up the neck, goosebumps rising', severity:3, tags:['ff','tease'] },
    { pattern:/\bff\s*kisses\s*spine\b/gi, replacement:'kisses along the spine, arch deepens, breath catches', severity:4, tags:['ff','tease'] },
    { pattern:/\bff\s*nipple\s*tease\b/gi, replacement:'tongue circles a nipple, fingers pinch the other', severity:5, tags:['ff','nipples'] },

    // HAND PLACEMENT
    { pattern:/\bff\s*hand\s*on\s*throat\b/gi, replacement:'hand curled gently at throat, consensual control vibe', severity:4, tags:['ff','dom/sub'] },
    { pattern:/\bff\s*hand\s*between\s*thighs\b/gi, replacement:'hand sliding between thighs, slick heat, parted knees', severity:5, tags:['ff','manual'] },
    { pattern:/\bff\s*grabs\s*hair\b/gi, replacement:'fist in hair, head tilted back, hungry kiss', severity:4, tags:['ff','dom/sub'] },

    // TEASES & SET CUES
    { pattern:/\bff\s*lipstick\s*smear\b/gi, replacement:'lipstick smeared across mouth and cheek, used look', severity:3, tags:['ff','makeup'] },
    { pattern:/\bff\s*mirror\s*angle\b/gi, replacement:'angled in front of mirror, both faces in frame', severity:2, tags:['ff','mirror'] },
    { pattern:/\bff\s*share\s*toy\b/gi, replacement:'sharing the same toy, eyes locked, synchronized moans', severity:5, tags:['ff','toy','sync'] }
  ]
});
/* ============================== BLOCK 3i — END ============================== */
/* ================================================================
 * BLOCK 4d — MOANS, SOUNDS & ONE-WORD UTTERANCES (COMPACT)
 * ID: BLOCK 4d
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Short onomatopoeia + expletives models latch onto.
 *   - Keeps prompts punchy; stacks with 4b/4c.
 *   - Gated (allowExplicit:true).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 4d',
  language: 'en',
  category: 'moans_utterances_explicit',
  gated: true,
  emoji: ['🗯️','💦'],
  notes: ['Use sparingly, separated by commas to avoid spammy repetition.'],
  entries: [
    { pattern:/\bmoan:\s*soft\b/gi,   replacement:'mmm…', severity:3, tags:['moan'] },
    { pattern:/\bmoan:\s*loud\b/gi,   replacement:'ah—ah—ah!', severity:4, tags:['moan'] },
    { pattern:/\bmoan:\s*deep\b/gi,   replacement:'ngh… f—', severity:4, tags:['moan'] },
    { pattern:/\bmoan:\s*climax\b/gi, replacement:'ohhh—oh—oh—!', severity:5, tags:['climax'] },
    { pattern:/\bword:\s*yes\b/gi,    replacement:'yes—yes—don’t stop', severity:4, tags:['talk'] },
    { pattern:/\bword:\s*more\b/gi,   replacement:'more—more—harder', severity:4, tags:['talk'] },
    { pattern:/\bword:\s*good\b/gi,   replacement:'so good—so fucking good', severity:5, tags:['talk'] }
  ]
});
/* ============================== BLOCK 4d — END ============================== */
/* ================================================================
 * BLOCK 10a — MULTILINGUAL MIRRORS (ES • FR • DE • IT • PT)
 * ID: BLOCK 10a
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Map common romance-language NSFW tokens → your clinical/neutral English cores (Blocks 2–3),
 *     so your pipeline stays coherent across languages, then escalates via 2a/3a when allowed.
 *   - Severity tuned to match English equivalents. Runs in CLEAN pass (then can escalate).
 * ================================================================ */
PF_PACKS.push({
  block_id: 'BLOCK 10a',
  language: 'multi',
  category: 'multilingual_core',
  emoji: ['🌐','🗣️'],
  notes: ['These are *mirrors* not translations of prose; they normalize slang into your English base.'],
  entries: [
    // Spanish
    { pattern:/\btetas\b/gi,               replacement:'breasts', severity:2, tags:['female','es'] },
    { pattern:/\bcoño\b/gi,                replacement:'vagina', severity:3, tags:['female','es'] },
    { pattern:/\bculo\b/gi,                replacement:'buttocks', severity:1, tags:['es'] },
    { pattern:/\bchupar\b/gi,              replacement:'oral sex (performing)', severity:4, tags:['oral','es'] },
    { pattern:/\btragar\b/gi,              replacement:'swallow (semen)', severity:5, tags:['finish','es'] },

    // French
    { pattern:/\bseins\b/gi,               replacement:'breasts', severity:2, tags:['fr'] },
    { pattern:/\bchatte\b/gi,              replacement:'vagina', severity:3, tags:['fr'] },
    { pattern:/\bfesses\b/gi,              replacement:'buttocks', severity:1, tags:['fr'] },
    { pattern:/\bsucer\b/gi,               replacement:'oral sex (performing)', severity:4, tags:['oral','fr'] },

    // German
    { pattern:/\bbrüste\b/gi,              replacement:'breasts', severity:2, tags:['de'] },
    { pattern:/\bscheide\b/gi,             replacement:'vagina', severity:3, tags:['de'] },
    { pattern:/\bar***\b/gi,               replacement:'anus', severity:3, tags:['de'] }, // simple catch-all; german profanity often obfuscated
    { pattern:/\bblasen\b/gi,              replacement:'oral sex (performing)', severity:4, tags:['oral','de'] },

    // Italian
    { pattern:/\bseno\b/gi,                replacement:'breasts', severity:2, tags:['it'] },
    { pattern:/\bfica\b/gi,                replacement:'vagina', severity:3, tags:['it'] },
    { pattern:/\bculo\b/gi,                replacement:'buttocks', severity:1, tags:['it'] },
    { pattern:/\bsucchiare\b/gi,           replacement:'oral sex (performing)', severity:4, tags:['oral','it'] },

    // Portuguese
    { pattern:/\bseios\b/gi,               replacement:'breasts', severity:2, tags:['pt'] },
    { pattern:/\bbuceta\b/gi,              replacement:'vagina', severity:3, tags:['pt'] },
    { pattern:/\bbunda\b/gi,               replacement:'buttocks', severity:1, tags:['pt'] },
    { pattern:/\bmamar\b/gi,               replacement:'oral sex (performing)', severity:4, tags:['oral','pt'] }
  ]
});
/* ============================== BLOCK 10a — END ============================== */
/* ================================================================
 * BLOCK 12 — VALIDATOR & SMART DE-DUPE (COHERENCE++ ENGINE)
 * ID: BLOCK 12
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Final pass to prune contradictions, duplicates, and severity leaks.
 *   - Ensures softcore stays soft; removes banned tokens per context.
 *   - Append-only CORE extension; no edits to older code. :contentReference[oaicite:1]{index=1}
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.validate = function validate(text, ctx={}){
    let out = String(text||'').replace(/\s{2,}/g,' ').trim();

    // De-dupe repeated phrases (simple comma-separated terms)
    const parts = out.split(/\s*,\s*/).filter(Boolean);
    const seen = new Set();
    const kept = [];
    for (const p of parts){
      const k = p.toLowerCase();
      if (seen.has(k)) continue;
      seen.add(k);
      kept.push(p);
    }
    out = kept.join(', ');

    // If vibe is softcore, neuter explicit finish tokens just in case
    if ((ctx.vibe||'softcore') === 'softcore') {
      out = out
        .replace(/\bcreampie\b/gi,'intimate closeness')
        .replace(/\bcum(shot)?\b/gi,'heated breath')
        .replace(/\bfacial\b/gi,'flushed cheeks')
        .replace(/\bdouble penetration\b/gi,'close embrace');
    }
    return out;
  };

  // Helper: one-shot pipeline (compose → validate)
  CORE.composeSafe = function composeSafe(ctx={}) {
    const seed = CORE.compose(ctx);
    return CORE.validate(seed, ctx);
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 12 — END ============================== */
/* ================================================================
 * BLOCK 13 — UI FEATURE FLAGS & PICKER SCHEMAS (FOR HTML BUILD)
 * ID: BLOCK 13
 * DATE: 2025-09-12
 * PURPOSE:
 *   - Declares config the HTML tool will read: slider ranges, toggles, pickers.
 *   - Lets us wire persona/starter/bg/finish menus quickly.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.UI = CORE.UI || {
    sliders: {
      nsfwLevel: { min:0, max:100, step:1, default: 70 },
      intensity: { min:0, max:5, step:1, default: 3 }
    },
    toggles: {
      allowExplicit: { default: true },
      vibeLock:      { default: true }
    },
    pickers: {
      party:    ['solo','ff','mf','mmf','ffm','group'],
      location: ['bed','sofa','shower','mirror','balcony','car','kitchen','locker_room','studio'],
      wardrobe: ['lace','sheer','latex','fishnets','heels','microbikini','club dress','maid cosplay','school cosplay','naked'],
      persona:  ['nordic','french','ginger','latina','brazilian','mexican','eastern','thai','south asian','ebony','caribbean','ethiopian','petite','curvy','fit','bbw','goth','pierced','punk','blonde bombshell','surfer','freckles','tomboy','mature','snow bunny']
    },
    starters: [
      'softcore_solo_mirror','softcore_ff_shower','softcore_solo_bed_oil',
      'hardcore_doggy_bed_mf','hardcore_chair_ride_cw','hardcore_ff_69_neon','hardcore_mmf_spitroast',
      'softcore_rooftop_rain','softcore_bath_pedals'
    ]
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 13 — END ============================== */
/* ================================================================
 * BLOCK 0a — SAFETY / CONSENT / RED-LINE GUARD (GLOBAL)
 * ID: BLOCK 0a
 * DATE: 2025-09-12
 * PURPOSE: Hard-ban illegal/unsafe tokens, force adult/consent cues.
 * NOTE: Runs first during sanitize(); append-only extension of CORE.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  // hard bans (NEVER allowed)
  const BANS = [
    /\b(minor|underage|teen(?!age makeup)|jailbait|barely\s*legal)\b/gi,
    /\b(non[-\s]*consent|rape|forced|drugged|incest|bestiality|beastiality)\b/gi
  ];

  // soft bans → neutralize (iffy terms to clinical)
  const SOFT = [
    { re:/\bchoking\b/gi, rep:'hand at neck (safe, consensual control)' },
    { re:/\bdaddy\b/gi,   rep:'dominant partner' }
  ];

  CORE.sanitize = (function (orig){
    return function patchedSanitize(text, opts={}){
      let out = (orig?orig(text,opts):String(text||''));
      // hard bans
      for (const r of BANS) out = out.replace(r, '—');
      // soft transforms
      for (const {re,rep} of SOFT) out = out.replace(re, rep);
      // Always assert adult/consent
      if (!/adult/.test(out)) out = `adult, consensual, ${out}`;
      return out;
    };
  })(CORE.sanitize);
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 0a — END ============================== */
/* ================================================================
 * BLOCK 3j — HANDS & FINGERS LIB (NAILS • GRIPS • PLACEMENT)
 * ID: BLOCK 3j
 * DATE: 2025-09-12
 * PURPOSE: Better hand rendering: nails, rings, where hands go.
 * GATED: allowExplicit:true (some placements are spicy)
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3j',
  language:'en',
  category:'hands_fingers_explicit',
  gated:true,
  emoji:['🤌','💅','✋'],
  notes:['Compact, camera-readable; avoids paragraph spam.'],
  entries:[
    // nails / jewelry
    { pattern:/\bnails:\s*short\b/gi,  replacement:'short nude nails, neat cuticles', severity:0, tags:['hands'] },
    { pattern:/\bnails:\s*long\b/gi,   replacement:'long almond nails, glossy finish', severity:0, tags:['hands'] },
    { pattern:/\brings\b/gi,           replacement:'stacked rings on fingers, tiny sparkle', severity:0, tags:['hands'] },

    // neutral hand poses
    { pattern:/\bhand:\s*hip\b/gi,     replacement:'hand on hip, thumb hooked, waist cinch', severity:1, tags:['pose'] },
    { pattern:/\bhand:\s*hair\b/gi,    replacement:'fingers in hair, gentle pull, neck exposed', severity:2, tags:['pose'] },
    { pattern:/\bhand:\s*breast\b/gi,  replacement:'hand cupping breast, thumb lifting edge', severity:3, tags:['pose','breasts'] },
    { pattern:/\bhand:\s*thigh\b/gi,   replacement:'hand on inner thigh, teasing stroke', severity:3, tags:['pose'] },

    // explicit placements
    { pattern:/\bhand:\s*pussy\b/gi,   replacement:'fingers parting lips, slick shine', severity:5, tags:['explicit','manual'] },
    { pattern:/\bhand:\s*ass\b/gi,     replacement:'hands spreading cheeks, arched lower back', severity:5, tags:['explicit'] },
    { pattern:/\bhand:\s*throat\b/gi,  replacement:'hand at throat, gentle control, consent signaled', severity:4, tags:['dom/sub'] }
  ]
});
/* ============================== BLOCK 3j — END ============================== */
/* ================================================================
 * BLOCK 3k — TOYS & PROPS MEGA (WANDS • DILDOS • PLUGS • STRAPS)
 * ID: BLOCK 3k
 * DATE: 2025-09-12
 * PURPOSE: Big toy catalog that renders clean; adult/consensual only.
 * GATED: allowExplicit:true
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3k',
  language:'en',
  category:'toys_explicit',
  gated:true,
  emoji:['🪄','🍆','🔗'],
  notes:['Short tokens → clear visuals; no brands.'],
  entries:[
    { pattern:/\btoy:\s*wand\b/gi,      replacement:'vibrator wand pressed to clit, trembling thighs', severity:5, tags:['toy','oral'] },
    { pattern:/\btoy:\s*dildo\b/gi,     replacement:'realistic dildo, slick with lube, steady strokes', severity:5, tags:['toy','penetration'] },
    { pattern:/\btoy:\s*glass\b/gi,     replacement:'clear glass toy, fogged with warmth, refracting light', severity:4, tags:['toy'] },
    { pattern:/\btoy:\s*plug\b/gi,      replacement:'gem plug seated snug, glint between cheeks', severity:5, tags:['toy'] },
    { pattern:/\btoy:\s*strap\b/gi,     replacement:'strap-on harness, tight straps, confident angle', severity:5, tags:['toy','ff'] },
    { pattern:/\btoy:\s*beads\b/gi,     replacement:'string of beads, slow pull, teasing edge', severity:5, tags:['toy'] },
    { pattern:/\btoy:\s*tape\b/gi,      replacement:'shiny bondage tape, safe bind, smooth finish', severity:3, tags:['bondage'] },
    { pattern:/\btoy:\s*cuffs\b/gi,     replacement:'padded cuffs, wrists secured above head', severity:4, tags:['bondage'] }
  ]
});
/* ============================== BLOCK 3k — END ============================== */
/* ================================================================
 * BLOCK 4e — INTENSITY-TUNED PRAISE/INSULT (0–5)
 * ID: BLOCK 4e
 * DATE: 2025-09-12
 * PURPOSE: Map CORE.UI.sliders.intensity into talk variants.
 * GATED: allowExplicit:true
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  const L = {
    0:['soft moans','kiss me','you’re beautiful'],
    1:['want you so bad','so tight','so wet'],
    2:['fuck yes','don’t stop','ride me'],
    3:['harder','take it all','good girl'],
    4:['cock-hungry','dirty little tease','ruin me'],
    5:['cum for me now','use me','i’m your filthy slut']
  };

  CORE.intenseTalk = function intenseTalk(level=3){
    const arr = L[Math.max(0, Math.min(5, level))] || L[3];
    return arr[Math.floor(Math.random()*arr.length)];
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 4e — END ============================== */
/* ================================================================
 * BLOCK 5a — COMPOSITION RECIPES (FRAMING • ANGLES • CROPS)
 * ID: BLOCK 5a
 * DATE: 2025-09-12
 * PURPOSE: Camera-readable framing helpers; severity 0.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 5a',
  language:'en',
  category:'composition_recipes',
  gated:false,
  emoji:['🧭','🖼️','📐'],
  entries:[
    { pattern:/\bframe:\s*thirds\b/gi,   replacement:'rule of thirds composition, eyes on upper third', severity:0, tags:['frame'] },
    { pattern:/\bframe:\s*center\b/gi,   replacement:'central composition, symmetrical limbs', severity:0, tags:['frame'] },
    { pattern:/\bangle:\s*low\b/gi,      replacement:'low angle, legs elongated, dominance vibe', severity:0, tags:['angle'] },
    { pattern:/\bangle:\s*high\b/gi,     replacement:'high angle, vulnerable gaze up, foreshortened body', severity:0, tags:['angle'] },
    { pattern:/\bcrop:\s*half\b/gi,      replacement:'waist-up crop, chest and face filling frame', severity:0, tags:['crop'] },
    { pattern:/\bcrop:\s*close\b/gi,     replacement:'tight crop, lips/eyes dominance, shallow depth', severity:0, tags:['crop'] }
  ]
});
/* ============================== BLOCK 5a — END ============================== */
/* ================================================================
 * BLOCK 6b — LIGHTING & TIME-OF-DAY (TEMPS • PRACTICALS)
 * ID: BLOCK 6b
 * DATE: 2025-09-12
 * PURPOSE: More lighting looks; severity 0; stacks with 6/6a.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 6b',
  language:'en',
  category:'lighting_time',
  emoji:['💡','🌅','🌃'],
  entries:[
    { pattern:/\blight:\s*golden\b/gi,  replacement:'golden hour key, warm rim light, low sun angle', severity:0, tags:['light'] },
    { pattern:/\blight:\s*blue\b/gi,    replacement:'blue hour ambient, cool fill, city sky glow', severity:0, tags:['light'] },
    { pattern:/\blight:\s*candle\b/gi,  replacement:'candlelit warm flicker, soft specular skin glows', severity:0, tags:['light'] },
    { pattern:/\blight:\s*neon\b/gi,    replacement:'neon sign spill, magenta/cyan cross-light', severity:0, tags:['light','neon'] },
    { pattern:/\blight:\s*hard\b/gi,    replacement:'hard key, crisp shadows, dramatic contrast', severity:0, tags:['light'] },
    { pattern:/\blight:\s*soft\b/gi,    replacement:'big softbox, wrap-around highlights, gentle falloff', severity:0, tags:['light'] }
  ]
});
/* ============================== BLOCK 6b — END ============================== */
/* ================================================================
 * BLOCK 7a — NEGATIVE HELPERS (ARTIFACTS • DEFECTS • CLUTTER)
 * ID: BLOCK 7a
 * DATE: 2025-09-12
 * PURPOSE: Quick "NEG:" tokens you can tack on to kill common issues.
 * NOTE: You can concat these into a single negative prompt string for gen.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 7a',
  language:'en',
  category:'negative_helpers',
  gated:false,
  emoji:['🚫','🧹'],
  entries:[
    { pattern:/\bNEG:\s*hands\b/gi,      replacement:'no extra fingers, no deformed hands, no fused digits', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*eyes\b/gi,       replacement:'no cross-eye, no mismatched eyes, no lazy eye', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*skin\b/gi,       replacement:'no plastic skin, no waxy over-smooth, keep pores', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*clutter\b/gi,    replacement:'no messy background, no random objects, clean set', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*text\b/gi,       replacement:'no overlay text, no watermarks, no logos', severity:0, tags:['neg'] }
  ]
});
/* ============================== BLOCK 7a — END ============================== */
/* ================================================================
 * BLOCK 14 — RANDOMIZER UTILS (pickN • unique • weight)
 * ID: BLOCK 14
 * DATE: 2025-09-12
 * PURPOSE: Helper funcs for the HTML UI to build fat combos safely.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.pick = function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; };
  CORE.pickN = function pickN(arr, n){
    const a=[...arr], out=[]; while (a.length && out.length<n){
      out.push(a.splice(Math.floor(Math.random()*a.length),1)[0]);
    } return out;
  };
  CORE.weighted = function weighted(pairs){ // [[item,weight],...]
    const total = pairs.reduce((s,[,w])=>s+w,0);
    let r=Math.random()*total;
    for (const [item,w] of pairs){ if ((r-=w)<=0) return item; }
    return pairs[pairs.length-1][0];
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 14 — END ============================== */
/* ================================================================
 * BLOCK 3l — POSE ANCHORS V2 (RELIABLE RENDERS)
 * ID: BLOCK 3l
 * DATE: 2025-09-12
 * PURPOSE: More positions that *actually* render clean & sexy.
 * GATED: allowExplicit:true (some are spicy)
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3l',
  language:'en',
  category:'pose_anchors_v2_explicit',
  gated:true,
  emoji:['🧘','🪑','🧱'],
  notes:['Short, camera-readable anchors; pair with 5a/6a/6b.'],
  entries:[
    // furniture & edges
    { pattern:/\bpose:\s*chair\s*ride\b/gi,   replacement:'straddling a sturdy chair, hips rolling, hands on shoulders', severity:5, tags:['position','chair'] },
    { pattern:/\bpose:\s*edge\s*perk\b/gi,    replacement:'perched at bed edge, pelvis forward, perfect access', severity:5, tags:['position','edge'] },
    { pattern:/\bpose:\s*counter\s*legup\b/gi,replacement:'one leg up on counter, deep arch, balanced grip', severity:4, tags:['position'] },

    // wall / balance
    { pattern:/\bpose:\s*wall\s*press\b/gi,   replacement:'pressed to wall, one knee hitched, urgent kisses', severity:4, tags:['position','wall'] },
    { pattern:/\bpose:\s*over\s*shoulder\b/gi,replacement:'over-the-shoulder look back, lower back arched', severity:3, tags:['pose'] },

    // floor / prone / splits
    { pattern:/\bpose:\s*prone\b/gi,          replacement:'lying flat, hips slightly raised, cheek to pillow', severity:4, tags:['position'] },
    { pattern:/\bpose:\s*half\s*splits\b/gi,  replacement:'half-splits, front leg straight, torso twist to camera', severity:3, tags:['pose'] },

    // cowgirl family
    { pattern:/\bpose:\s*reverse\s*cw\b/gi,   replacement:'reverse cowgirl, back arched, hands on knees', severity:5, tags:['position'] },
    { pattern:/\bpose:\s*raised\s*cw\b/gi,    replacement:'cowgirl raised on knees, slow grind, hands on chest', severity:5, tags:['position'] },

    // facesitting / trib (explicit)
    { pattern:/\bpose:\s*facesit\b/gi,        replacement:'facesitting, thighs squeezing, pelvis centered', severity:5, tags:['ff','position'] },
    { pattern:/\bpose:\s*trib\b/gi,           replacement:'scissor tribbing, hips locked, slick friction', severity:5, tags:['ff','position'] }
  ]
});
/* ============================== BLOCK 3l — END ============================== */
/* ================================================================
 * BLOCK 8b — BACKGROUND MICRO-CLUTTER & SET DRESS (REALISM)
 * ID: BLOCK 8b
 * DATE: 2025-09-12
 * PURPOSE: Tiny objects that sell the scene; severity 0 everywhere.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 8b',
  language:'en',
  category:'bg_microclutter',
  gated:false,
  emoji:['🧴','🕯️','🍷','🧻'],
  notes:['Stack with 8a bg:… and fx:… for lush frames.'],
  entries:[
    { pattern:/\bprop:\s*robe\b/gi,        replacement:'silk robe half-slipped on chair back', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*towel\s*roll\b/gi,replacement:'rolled white towels stacked neatly', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*tray\b/gi,        replacement:'room-service tray, silver dome, folded napkin', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*lipstick\b/gi,    replacement:'open lipstick on vanity, cap askew', severity:0, tags:['prop','makeup'] },
    { pattern:/\bprop:\s*robe\s*hook\b/gi, replacement:'robe on wall hook, belt dangling', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*wine\b/gi,        replacement:'two wine glasses, legs, deep red swirl', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*pillow\b/gi,      replacement:'pillow crease marks, lived-in bed', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*phone\s*cord\b/gi,replacement:'coiled phone cord on nightstand', severity:0, tags:['prop'] },
    { pattern:/\bprop:\s*candle\s*drip\b/gi,replacement:'wax drips down candle sides, warm pools', severity:0, tags:['prop'] }
  ]
});
/* ============================== BLOCK 8b — END ============================== */
/* ================================================================
 * BLOCK 10b — JP / KR MIRRORS (CLEAN → CORE)
 * ID: BLOCK 10b
 * DATE: 2025-09-12
 * PURPOSE: Normalize common JP/KR NSFW tokens to clinical English cores,
 *          so your escalator (2/2a/3/3a) can do its job consistently.
 * NOTE: These are mirrors, not prose — severity matches English core.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 10b',
  language:'multi',
  category:'jp_kr_mirrors',
  gated:true,
  emoji:['🈶','🈲','🇯🇵','🇰🇷'],
  entries:[
    // Japanese
    { pattern:/\boppai\b/gi,           replacement:'breasts', severity:2, tags:['jp'] },
    { pattern:/\boppai\s*paizuri\b/gi, replacement:'titfuck', severity:5, tags:['jp','explicit'] },
    { pattern:/\boshiri\b/gi,          replacement:'buttocks', severity:1, tags:['jp'] },
    { pattern:/\bmanko\b/gi,           replacement:'vagina', severity:3, tags:['jp'] },
    { pattern:/\bchitsu\b/gi,          replacement:'vagina', severity:3, tags:['jp'] },
    { pattern:/\bferachio\b/gi,        replacement:'oral sex (performing)', severity:4, tags:['jp','oral'] },
    { pattern:/\bskebe\b/gi,           replacement:'lewd vibe', severity:2, tags:['jp'] },
    { pattern:/\bbukkake\b/gi,         replacement:'multiple cumshots (group finish)', severity:5, tags:['jp','explicit'] },

    // Korean
    { pattern:/\b가슴\b/gi,            replacement:'breasts', severity:2, tags:['kr'] },
    { pattern:/\b엉덩이\b/gi,          replacement:'buttocks', severity:1, tags:['kr'] },
    { pattern:/\b보지\b/gi,            replacement:'vagina', severity:3, tags:['kr'] },
    { pattern:/\b블로우\b/gi,          replacement:'oral sex (performing)', severity:4, tags:['kr','oral'] },
    { pattern:/\b딥키스\b/gi,          replacement:'deep kissing', severity:2, tags:['kr'] }
  ]
});
/* ============================== BLOCK 10b — END ============================== */
/* ================================================================
 * BLOCK 15 — NEGATIVE: CLOTHES & PHYSICS COLLISIONS
 * ID: BLOCK 15
 * DATE: 2025-09-12
 * PURPOSE: Quick NEG tokens to reduce strap clipping, melted lace, etc.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 15',
  language:'en',
  category:'negative_cloth_physics',
  gated:false,
  emoji:['🧯','🧵'],
  entries:[
    { pattern:/\bNEG:\s*straps\b/gi,  replacement:'no clipping straps, no intersecting fabric, natural tension', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*lace\b/gi,    replacement:'no melted lace, no blurry mesh, crisp pattern', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*sheer\b/gi,   replacement:'no moiré, no aliasing on mesh, realistic transparency', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*hair\b/gi,    replacement:'no hair through skin, no floating strands, tidy edges', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*gravity\b/gi, replacement:'no gravity errors, realistic drape and weight', severity:0, tags:['neg'] }
  ]
});
/* ============================== BLOCK 15 — END ============================== */
/* ================================================================
 * BLOCK 16 — TEMPLATE STRINGS (FULL PROMPT + NEGATIVE BUILDER)
 * ID: BLOCK 16
 * DATE: 2025-09-12
 * PURPOSE: HTML can call these to dump a polished prompt + negatives.
 * NOTES: All strings go through sanitize/validate paths already added.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.TEMPLATES = CORE.TEMPLATES || {
    // Softcore beauty template
    soft_beauty({persona='french',location='mirror',wardrobe='lace',camera='cam: beauty, grade: filmic', extras=[]}={}){
      const ctx={ vibe:'softcore', party:'solo', location, wardrobe, allowExplicit:true };
      let seed = CORE.composeSafe(ctx);
      seed = CORE.injectPersona(seed, persona);
      if (extras.length) seed += ', ' + extras.join(', ');
      const negative = [
        'NEG: hands','NEG: eyes','NEG: skin','NEG: clutter','NEG: straps','NEG: lace','NEG: sheer','NEG: gravity','NEG: text'
      ].join(', ');
      return { prompt: CORE.validate(seed, ctx), negative };
    },

    // Hardcore chair ride template
    hardcore_chair({persona='petite',party='mf',camera='cam: studio, grade: filmic', extras=[]}={}){
      const ctx={ vibe:'hardcore', party, location:'chair', wardrobe:'lace', allowExplicit:true };
      let seed = CORE.compose(ctx);
      seed = CORE.injectPersona(seed, persona) + ', pose: chair ride';
      if (extras.length) seed += ', ' + extras.join(', ');
      const negative = [
        'NEG: hands','NEG: eyes','NEG: skin','NEG: clutter','NEG: straps','NEG: lace','NEG: sheer','NEG: gravity','NEG: text'
      ].join(', ');
      return { prompt: CORE.validate(seed, ctx), negative };
    },

    // FF shower softcore
    ff_shower_soft({persona='ginger',extras=[]}={}){
      const ctx={ vibe:'softcore', party:'ff', location:'shower', wardrobe:'lace', allowExplicit:true };
      let seed = CORE.composeSafe(ctx);
      seed = CORE.injectPersona(seed, persona) + ', ff kisses neck, ff mirror angle';
      if (extras.length) seed += ', ' + extras.join(', ');
      const negative = 'NEG: hands, NEG: eyes, NEG: skin, NEG: clutter, NEG: shear, NEG: gravity, NEG: text'.replace('shear','sheer');
      return { prompt: CORE.validate(seed, ctx), negative };
    }
  };

  // Convenience helpers
  CORE.template = function template(name, args){ 
    const fn = CORE.TEMPLATES[name]; 
    return fn ? fn(args||{}) : { prompt:'', negative:'' };
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 16 — END ============================== */
/* ================================================================
 * BLOCK 3m — BODY MOTION & BREATH CUES (KINETIC SEXY)
 * ID: BLOCK 3m
 * DATE: 2025-09-12
 * PURPOSE: Add movement micro-cues that render clean without prose walls.
 * GATED: allowExplicit:true (some cues imply explicit motion)
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3m',
  language:'en',
  category:'body_motion_explicit',
  gated:true,
  emoji:['🌬️','💃','🌀'],
  notes:['Short, stackable motion beats: hips, chest, breath, hair.'],
  entries:[
    { pattern:/\bmotion:\s*hip\s*roll\b/gi,  replacement:'hips rolling slow, belly ripple', severity:3, tags:['motion'] },
    { pattern:/\bmotion:\s*grind\b/gi,      replacement:'slow grind, pelvis circling', severity:4, tags:['motion'] },
    { pattern:/\bmotion:\s*arch\b/gi,       replacement:'deep back arch, ribcage lifted', severity:3, tags:['motion'] },
    { pattern:/\bmotion:\s*chest\b/gi,      replacement:'breasts bouncing softly with rhythm', severity:4, tags:['motion','breasts'] },
    { pattern:/\bmotion:\s*hair\s*flip\b/gi,replacement:'hair flip in mid-air, strands fanned', severity:2, tags:['motion','hair'] },
    { pattern:/\bmotion:\s*breath\b/gi,     replacement:'visible breath, parted lips, fog on glass', severity:2, tags:['motion','fx'] },
    { pattern:/\bmotion:\s*tremble\b/gi,    replacement:'thighs trembling, toes curling', severity:5, tags:['climax','motion'] }
  ]
});
/* ============================== BLOCK 3m — END ============================== */
/* ================================================================
 * BLOCK 5b — EYES, GAZE & FACE FRAMING (COMPOSITION++)
 * ID: BLOCK 5b
 * DATE: 2025-09-12
 * PURPOSE: Guide attention with gaze and face-framing tricks.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 5b',
  language:'en',
  category:'gaze_faceframe',
  gated:false,
  emoji:['👁️','🎯'],
  entries:[
    { pattern:/\bgaze:\s*camera\b/gi,   replacement:'direct eye contact to camera, intimate pull', severity:0, tags:['gaze'] },
    { pattern:/\bgaze:\s*down\b/gi,     replacement:'eyes downcast, lashes heavy, shy vibe', severity:0, tags:['gaze'] },
    { pattern:/\bgaze:\s*side\b/gi,     replacement:'side glance past camera, mysterious tension', severity:0, tags:['gaze'] },
    { pattern:/\bframe:\s*hands\b/gi,   replacement:'hands framing face, fingers grazing lips', severity:0, tags:['frame'] },
    { pattern:/\bframe:\s*hair\b/gi,    replacement:'hair curtains framing cheeks, soft fall', severity:0, tags:['frame','hair'] }
  ]
});
/* ============================== BLOCK 5b — END ============================== */
/* ================================================================
 * BLOCK 6c — LENS KIT (24/35/50/85/135 • DOF • COMPRESSION)
 * ID: BLOCK 6c
 * DATE: 2025-09-12
 * PURPOSE: One-word lens presets that models understand.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 6c',
  language:'en',
  category:'lens_kit',
  gated:false,
  emoji:['🎥','🔭'],
  entries:[
    { pattern:/\blens:\s*24\b/gi,  replacement:'24mm wide, environmental portrait, slight distortion', severity:0, tags:['lens'] },
    { pattern:/\blens:\s*35\b/gi,  replacement:'35mm story frame, moderate wide, scene context', severity:0, tags:['lens'] },
    { pattern:/\blens:\s*50\b/gi,  replacement:'50mm classic portrait, natural perspective', severity:0, tags:['lens'] },
    { pattern:/\blens:\s*85\b/gi,  replacement:'85mm beauty headshot, shallow depth, creamy bokeh', severity:0, tags:['lens'] },
    { pattern:/\blens:\s*135\b/gi, replacement:'135mm tele compression, background melt, flattering jawline', severity:0, tags:['lens'] },
    { pattern:/\bdof:\s*shallow\b/gi, replacement:'very shallow depth of field, eyes razor sharp', severity:0, tags:['dof'] },
    { pattern:/\bdof:\s*deep\b/gi,    replacement:'deep focus, scene detail held throughout', severity:0, tags:['dof'] }
  ]
});
/* ============================== BLOCK 6c — END ============================== */
/* ================================================================
 * BLOCK 8c — ENVIRONMENT STATES (RAIN • FOG • STEAM • CONDENSATION)
 * ID: BLOCK 8c
 * DATE: 2025-09-12
 * PURPOSE: Macro scene states that stack with bg/fx for mood.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 8c',
  language:'en',
  category:'environment_states',
  gated:false,
  emoji:['🌧️','🌫️','♨️'],
  entries:[
    { pattern:/\bstate:\s*downpour\b/gi,  replacement:'heavy rain outside, streaks racing down glass', severity:0, tags:['rain','env'] },
    { pattern:/\bstate:\s*after\s*rain\b/gi, replacement:'fresh puddles, reflective streets, ozone feel', severity:0, tags:['rain','env'] },
    { pattern:/\bstate:\s*fog\b/gi,      replacement:'low fog bank, diffuse light, edges softened', severity:0, tags:['fog','env'] },
    { pattern:/\bstate:\s*steam\b/gi,    replacement:'thick steam haze, skin glow, softened highlights', severity:0, tags:['steam','env'] },
    { pattern:/\bstate:\s*condense\b/gi, replacement:'condensation beads on mirror and tiles, finger trails', severity:0, tags:['steam','env'] }
  ]
});
/* ============================== BLOCK 8c — END ============================== */
/* ================================================================
 * BLOCK 9b — BODY REALISM: MARKS, TEXTURE & LIVED-IN DETAILS
 * ID: BLOCK 9b
 * DATE: 2025-09-12
 * PURPOSE: Real-skin cues that increase believability (safe everywhere).
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 9b',
  language:'en',
  category:'body_realism_misc',
  gated:false,
  emoji:['🧬','🧿'],
  entries:[
    { pattern:/\bskin:\s*moles\b/gi,        replacement:'tiny beauty moles across chest and hips', severity:0, tags:['finish'] },
    { pattern:/\bskin:\s*scars\b/gi,        replacement:'faint healed scars, authentic texture', severity:0, tags:['finish'] },
    { pattern:/\bskin:\s*strands\b/gi,      replacement:'loose baby hairs along hairline, real texture', severity:0, tags:['finish','hair'] },
    { pattern:/\bskin:\s*lip\s*smudge\b/gi, replacement:'lipstick smudge at cupids bow, lived-in', severity:0, tags:['finish','makeup'] },
    { pattern:/\bskin:\s*sheet\b/gi,        replacement:'sheet crease marks on thigh and cheek', severity:0, tags:['finish'] }
  ]
});
/* ============================== BLOCK 9b — END ============================== */
/* ================================================================
 * BLOCK 11b — STARTER MACROS II (MORE ONE-TAP BANGERS)
 * ID: BLOCK 11b
 * DATE: 2025-09-12
 * PURPOSE: Expand curated scenes you can one-click from UI.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;
  const S = CORE.STARTERS = CORE.STARTERS || {};

  S['soft_ff_latex_studio'] = { ctx:{ vibe:'softcore', party:'ff', location:'studio', wardrobe:'latex', camera:'cam: studio, lens:85, dof: shallow, grade: filmic', allowExplicit:true, persona:'eastern' } };
  S['soft_balcony_noir']    = { ctx:{ vibe:'softcore', party:'solo', location:'balcony', wardrobe:'club dress', camera:'cam: voyeur, lens:135, grade: noir', allowExplicit:true, persona:'blonde bombshell' } };
  S['soft_bath_milk']       = { ctx:{ vibe:'softcore', party:'solo', location:'bath', wardrobe:'naked', camera:'cam: beauty, lens:50, grade: filmic', allowExplicit:true, persona:'french' } };

  S['hard_wall_press_mf']   = { ctx:{ vibe:'hardcore', party:'mf', location:'mirror', wardrobe:'lace', camera:'cam: glamour, lens:85, dof: shallow', allowExplicit:true, persona:'curvy' } };
  S['hard_chair_rider_ff']  = { ctx:{ vibe:'hardcore', party:'ff', location:'chair', wardrobe:'latex', camera:'cam: studio, lens:50, grade: teal orange', allowExplicit:true, persona:'goth' } };
  S['hard_balcony_rain_ff'] = { ctx:{ vibe:'hardcore', party:'ff', location:'balcony', wardrobe:'sheer', camera:'cam: voyeur, lens:135, state: downpour', allowExplicit:true, persona:'thai' } };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 11b — END ============================== */
/* ================================================================
 * BLOCK 18 — STYLE BRAKES (ANTI-PURPLE • TOKEN TRIMMER)
 * ID: BLOCK 18
 * DATE: 2025-09-12
 * PURPOSE: Keep outputs punchy: trim duplicates, kill over-adjectives,
 *          cap fragment count. Runs after validate() if called.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.styleBrake = function styleBrake(text, {maxFragments=12}={}){
    const sep = /\s*,\s*/;
    let parts = String(text||'').split(sep).filter(Boolean);

    // squash repetitive adjectives (e.g., "sexy sexy", "very very")
    parts = parts.map(p => p.replace(/\b(\w+)\b(?:\s+\1\b)+/gi, '$1'));

    // remove weak filler adjectives
    const bad = /\b(very|extremely|truly|really|super|ultra)\b/gi;
    parts = parts.map(p => p.replace(bad,'').replace(/\s{2,}/g,' ').trim());

    // cap fragment count
    if (parts.length > maxFragments) parts = parts.slice(0, maxFragments);

    // tidy punctuation
    return parts.join(', ').replace(/\s+,/g,',').trim();
  };

  // one-shot: compose → validate → styleBrake
  CORE.composeTight = function composeTight(ctx={}){
    const seed  = CORE.composeSafe(ctx);
    const tight = CORE.styleBrake(seed, {});
    return tight;
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 18 — END ============================== */
/* ================================================================
 * BLOCK 19 — TAG WEIGHTS (LIGHT BIASING FOR RANDOMIZER)
 * ID: BLOCK 19
 * DATE: 2025-09-12
 * PURPOSE: Give your HTML a tiny “taste dial” to prefer certain tags.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.bias = {
    // positive weight = more likely to include; negative = less likely
    tags: {
      lace: 0.6, sheer: 0.5, latex: 0.25, heels: 0.3, fishnets: 0.35,
      shower: 0.4, mirror: 0.3, balcony: 0.2,
      motion: 0.25, gaze: 0.15, frame: 0.1,
      finish: 0.2
    }
  };

  // sample helper (optional for the UI’s random build)
  CORE.weightTags = function weightTags(candidates){
    return (candidates||[]).sort((a,b)=>{
      const ta = (a.tags||[]).reduce((s,t)=> s+(CORE.bias.tags[t]||0),0);
      const tb = (b.tags||[]).reduce((s,t)=> s+(CORE.bias.tags[t]||0),0);
      return tb - ta;
    });
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 19 — END ============================== */
/* ================================================================
 * BLOCK 20 — QUICK EXPORT HELPERS (STRING BUILDERS)
 * ID: BLOCK 20
 * DATE: 2025-09-12
 * PURPOSE: Single call that returns {prompt, negative} with brakes.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.build = function build(ctx={}, {extras=[], negatives=[]}={}){
    let prompt = CORE.composeSafe(ctx);
    if (ctx.persona) prompt = CORE.injectPersona(prompt, ctx.persona);
    if (extras.length) prompt += ', ' + extras.join(', ');
    prompt = CORE.styleBrake(CORE.validate(prompt, ctx), {});
    const neg = [
      'NEG: hands','NEG: eyes','NEG: skin','NEG: clutter','NEG: straps','NEG: lace','NEG: sheer','NEG: gravity','NEG: text',
      ...negatives
    ].join(', ');
    return { prompt, negative: neg };
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 20 — END ============================== */
/* ================================================================
 * BLOCK 5c — DUO SYMMETRY & MIRROR DOUBLES (COMPOSITION+++)
 * ID: BLOCK 5c
 * DATE: 2025-09-12
 * PURPOSE: Clean, camera-readable duo symmetry & mirror tricks.
 * NOTE: severity 0 so they stack in any vibe.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 5c',
  language:'en',
  category:'duo_symmetry_mirror',
  gated:false,
  emoji:['🪞','🧭','🫂'],
  entries:[
    { pattern:/\bduo:\s*sym\b/gi,    replacement:'two subjects mirrored, shoulder-to-shoulder, symmetrical stance', severity:0, tags:['frame','mirror'] },
    { pattern:/\bduo:\s*cross\b/gi,  replacement:'cross-body framing, one facing camera, one profile', severity:0, tags:['frame'] },
    { pattern:/\bduo:\s*overlap\b/gi,replacement:'slight overlap, staggered depth, crisp separation lights', severity:0, tags:['frame','light'] },
    { pattern:/\bmirror:\s*double\b/gi, replacement:'mirror double reflection, both faces visible, clean glass', severity:0, tags:['mirror'] },
    { pattern:/\bmirror:\s*tri\b/gi, replacement:'triple reflection angles, kaleidoscope feel without distortion', severity:0, tags:['mirror','fx'] },
    { pattern:/\bframe:\s*triangle\b/gi, replacement:'triangular composition, heads forming stable base', severity:0, tags:['frame'] }
  ]
});
/* ============================== BLOCK 5c — END ============================== */
/* ================================================================
 * BLOCK 6d — RGB GEL & PRACTICAL COLOR KIT (LIGHTING+++)
 * ID: BLOCK 6d
 * DATE: 2025-09-12
 * PURPOSE: One-word color gels and practicals that “read” instantly.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 6d',
  language:'en',
  category:'rgb_gels_practicals',
  gated:false,
  emoji:['🟦','🟥','🟩','💡'],
  entries:[
    { pattern:/\bgel:\s*magenta\b/gi, replacement:'magenta gel key, cyan rim, skin pops', severity:0, tags:['light','neon'] },
    { pattern:/\bgel:\s*cyan\b/gi,    replacement:'cyan fill, warm tungsten practical in background', severity:0, tags:['light'] },
    { pattern:/\bgel:\s*red\b/gi,     replacement:'red key from left, deep shadows, sin-city vibe', severity:0, tags:['light'] },
    { pattern:/\bgel:\s*blue\b/gi,    replacement:'saturated blue wash, silver skin speculars', severity:0, tags:['light'] },
    { pattern:/\bpract:\s*tungsten\b/gi, replacement:'warm tungsten lamp in scene, cozy highlights', severity:0, tags:['light'] },
    { pattern:/\bpract:\s*neon\b/gi,  replacement:'neon signage practical, colored spill on skin', severity:0, tags:['light','neon'] },
    { pattern:/\bpract:\s*candle\b/gi, replacement:'clustered candles as practicals, flicker texture', severity:0, tags:['light'] }
  ]
});
/* ============================== BLOCK 6d — END ============================== */
/* ================================================================
 * BLOCK 8d — REFLECTIONS & GLASS SURFACES (SET++ FX)
 * ID: BLOCK 8d
 * DATE: 2025-09-12
 * PURPOSE: Background/reflection helpers that sell realism.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 8d',
  language:'en',
  category:'reflections_glass',
  gated:false,
  emoji:['🪟','💧','🔮'],
  entries:[
    { pattern:/\bglass:\s*clean\b/gi,    replacement:'pristine glass, crisp reflections, no streaks', severity:0, tags:['glass'] },
    { pattern:/\bglass:\s*streak\b/gi,   replacement:'subtle water streaks on glass, vertical trails', severity:0, tags:['glass','wet'] },
    { pattern:/\bmirror:\s*hand\b/gi,    replacement:'handprint smudge on mirror, breath halo', severity:0, tags:['mirror','fx'] },
    { pattern:/\breflect:\s*floor\b/gi,  replacement:'polished floor reflection, soft duplication', severity:0, tags:['fx'] },
    { pattern:/\breflect:\s*city\b/gi,   replacement:'city lights reflecting in window, bokeh streaks', severity:0, tags:['urban','fx'] }
  ]
});
/* ============================== BLOCK 8d — END ============================== */
/* ================================================================
 * BLOCK 3n — BODY HIGHLIGHT ZONES & SEXY MICRO-CUES
 * ID: BLOCK 3n
 * DATE: 2025-09-12
 * PURPOSE: Compact descriptors for body highlights; explicit-gated.
 * GATED: allowExplicit:true
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3n',
  language:'en',
  category:'body_highlights_explicit',
  gated:true,
  emoji:['✨','➕'],
  entries:[
    { pattern:/\bhl:\s*collarbone\b/gi, replacement:'highlighted collarbones, catchlights dancing', severity:2, tags:['finish'] },
    { pattern:/\bhl:\s*underboob\b/gi,  replacement:'underboob sheen, lifted curve, soft shadow line', severity:3, tags:['breasts','finish'] },
    { pattern:/\bhl:\s*hipdip\b/gi,     replacement:'hip dips emphasized, V-lines leading inward', severity:3, tags:['body','finish'] },
    { pattern:/\bhl:\s*thighgap\b/gi,   replacement:'thigh gap light spill, inner line glow', severity:3, tags:['body','finish'] },
    { pattern:/\bhl:\s*lowerback\b/gi,  replacement:'oiled lower back, deep arch highlight', severity:3, tags:['finish'] },
    { pattern:/\bhl:\s*booty\b/gi,      replacement:'booty highlight on upper curve, glossy edge', severity:3, tags:['finish','ass'] }
  ]
});
/* ============================== BLOCK 3n — END ============================== */
/* ================================================================
 * BLOCK 3o — CURVES CATALOG (BREAST / BUTT VARIANTS)
 * ID: BLOCK 3o
 * DATE: 2025-09-12
 * PURPOSE: Tasteful size/shape variants that render well.
 * GATED: allowExplicit:true (paired with wardrobe/pose for clarity)
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3o',
  language:'en',
  category:'curves_catalog_explicit',
  gated:true,
  emoji:['🍑','🫐'],
  entries:[
    { pattern:/\bcurves:\s*perk\b/gi, replacement:'perky small breasts, tight upper pole, high nipples', severity:2, tags:['breasts'] },
    { pattern:/\bcurves:\s*full\b/gi, replacement:'full round breasts, soft lower pole, natural sway', severity:2, tags:['breasts'] },
    { pattern:/\bcurves:\s*massive\b/gi, replacement:'very large breasts, heavy hang, supported by hands', severity:3, tags:['breasts'] },
    { pattern:/\bcurves:\s*bubble\b/gi, replacement:'bubble butt, high shelf, deep lower curve', severity:2, tags:['ass'] },
    { pattern:/\bcurves:\s*athletic\b/gi, replacement:'tight glutes, defined hamstring tie-in', severity:2, tags:['ass','fit'] },
    { pattern:/\bcurves:\s*plush\b/gi, replacement:'plush hips and thighs, soft dimples, squeezeable', severity:2, tags:['ass','bbw'] }
  ]
});
/* ============================== BLOCK 3o — END ============================== */
/* ================================================================
 * BLOCK 3p — COLOR SWATCHES (LINGERIE • FABRIC • ACCESSORIES)
 * ID: BLOCK 3p
 * DATE: 2025-09-12
 * PURPOSE: Simple color tokens for outfits so you can vary looks.
 * NOTE: severity 0; mix with 3f (lingerie/outfits) and 6d gels.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3p',
  language:'en',
  category:'color_swatches',
  gated:false,
  emoji:['🟥','🟪','⬛','🟨'],
  entries:[
    { pattern:/\bcol:\s*black\b/gi,   replacement:'inky black fabric, slimming lines', severity:0, tags:['color'] },
    { pattern:/\bcol:\s*white\b/gi,   replacement:'pure white lace, bridal tease', severity:0, tags:['color'] },
    { pattern:/\bcol:\s*red\b/gi,     replacement:'scarlet lingerie, seductive punch', severity:0, tags:['color'] },
    { pattern:/\bcol:\s*emerald\b/gi, replacement:'emerald satin, jewel-tone sheen', severity:0, tags:['color'] },
    { pattern:/\bcol:\s*royal\b/gi,   replacement:'royal blue mesh, cool contrast', severity:0, tags:['color'] },
    { pattern:/\bcol:\s*blush\b/gi,   replacement:'blush pink lace, soft romantic vibe', severity:0, tags:['color'] },
    { pattern:/\bcol:\s*neon\b/gi,    replacement:'neon accent straps, cyber tease', severity:0, tags:['color','neon'] },
    { pattern:/\bcol:\s*gold\b/gi,    replacement:'gold chain accents, warm glints', severity:0, tags:['color','jewelry'] }
  ]
});
/* ============================== BLOCK 3p — END ============================== */
/* ================================================================
 * BLOCK 11c — STARTER MACROS III (RGB • MIRROR • SYMMETRY)
 * ID: BLOCK 11c
 * DATE: 2025-09-12
 * PURPOSE: More one-tap bangers leveraging new packs.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;
  const S = CORE.STARTERS = CORE.STARTERS || {};

  S['soft_mirror_sym'] = { ctx:{ vibe:'softcore', party:'ff', location:'mirror', wardrobe:'lace', allowExplicit:true, camera:'cam: beauty, lens:85, dof: shallow, grade: filmic' } };
  S['soft_neon_balcony'] = { ctx:{ vibe:'softcore', party:'solo', location:'balcony', wardrobe:'club dress', allowExplicit:true, camera:'cam: voyeur, lens:135, gel: magenta, pract: neon' } };
  S['soft_bed_blush'] = { ctx:{ vibe:'softcore', party:'solo', location:'bed', wardrobe:'lace', allowExplicit:true, camera:'cam: glamour, lens:50, dof: shallow, grade: filmic' } };

  S['hard_rgb_chair'] = { ctx:{ vibe:'hardcore', party:'mf', location:'chair', wardrobe:'latex', allowExplicit:true, camera:'cam: studio, lens:85, gel: cyan' } };
  S['hard_mirror_ff_sym'] = { ctx:{ vibe:'hardcore', party:'ff', location:'mirror', wardrobe:'sheer', allowExplicit:true, camera:'cam: beauty, lens:50, gel: red' } };
  S['hard_afterrain_balcony'] = { ctx:{ vibe:'hardcore', party:'ff', location:'balcony', wardrobe:'sheer', allowExplicit:true, camera:'cam: voyeur, lens:135, state: after rain' } };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 11c — END ============================== */
/* ================================================================
 * BLOCK 17 — OUTPUT LENGTH PRESETS (SHORT • MED • LONG)
 * ID: BLOCK 17
 * DATE: 2025-09-12
 * PURPOSE: Give HTML a quick length dial without changing content.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.trimTo = function trimTo(text, mode='med'){
    const limit = mode==='short' ? 160 : mode==='long' ? 480 : 280; // chars
    let t = String(text||'').trim();
    if (t.length <= limit) return t;
    // trim by fragment commas first
    const parts = t.split(/\s*,\s*/).filter(Boolean);
    let out=''; for (const p of parts){ if ((out + (out?', ':'') + p).length > limit) break; out += (out?', ':'') + p; }
    return out || t.slice(0, limit);
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 17 — END ============================== */
/* ================================================================
 * BLOCK 21 — HTML HOOKS (EVENT NAMES & KEYS)
 * ID: BLOCK 21
 * DATE: 2025-09-12
 * PURPOSE: Tiny registry so your HTML can stay dumb-simple.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  CORE.HOOKS = {
    events: {
      BUILD_CLICK: 'pf.build.click',
      SWAP_FACE:   'pf.swap.face',
      PICK_START:  'pf.pick.starter',
      COPY_PROMPT: 'pf.copy.prompt'
    },
    keys: {
      starters: Object.keys(CORE.STARTERS||{}),
      personas: (CORE.UI && CORE.UI.pickers && CORE.UI.pickers.persona) || [],
      parties:  (CORE.UI && CORE.UI.pickers && CORE.UI.pickers.party) || []
    }
  };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 21 — END ============================== */
/* ================================================================
 * BLOCK 3q — WET FABRIC BEHAVIOR (SHEER CLING • TRANSLUCENCY • DRAPE)
 * ID: BLOCK 3q • DATE: 2025-09-12 • GATED: allowExplicit:true
 * PURPOSE: Camera-readable “wet cloth” cues that actually render.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3q',
  language:'en',
  category:'wet_fabric_explicit',
  gated:true,
  emoji:['💧','🧵'],
  entries:[
    { pattern:/\bwet:\s*sheer\b/gi,   replacement:'wet sheer mesh clinging to skin, translucency increased', severity:3, tags:['sheer','wet'] },
    { pattern:/\bwet:\s*satin\b/gi,   replacement:'wet satin stuck to curves, specular streaks', severity:2, tags:['fabric','wet'] },
    { pattern:/\bwet:\s*shirt\b/gi,   replacement:'white shirt soaked, nipples faintly visible', severity:3, tags:['sheer','wet','breasts'] },
    { pattern:/\bwet:\s*skirt\b/gi,   replacement:'soaked skirt hugging hips, darkened hem', severity:2, tags:['fabric','wet'] },
    { pattern:/\bwet:\s*hair\b/gi,    replacement:'soaked hair strands, drip trails on neck', severity:1, tags:['hair','wet'] },
    { pattern:/\bdrip:\s*hem\b/gi,    replacement:'water dripping from hem corners, floor speckled', severity:0, tags:['wet','fx'] }
  ]
});
/* ============================== BLOCK 3q — END ============================== */
/* ================================================================
 * BLOCK 6e — LIGHT CONTROL (BOUNCE • NEG FILL • FLAGS)
 * ID: BLOCK 6e • DATE: 2025-09-12 • severity 0
 * PURPOSE: Real photo gaffer cues for sculpted skin/curves.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 6e',
  language:'en',
  category:'light_control',
  emoji:['🪞','🖤','🪧'],
  entries:[
    { pattern:/\blight:\s*bounce\b/gi,   replacement:'white bounce card under chin, soft fill', severity:0, tags:['light'] },
    { pattern:/\blight:\s*neg\b/gi,      replacement:'black negative fill on shadow side, deeper contrast', severity:0, tags:['light'] },
    { pattern:/\bflag:\s*edge\b/gi,      replacement:'flag to cut spill off background, cleaner separation', severity:0, tags:['light'] },
    { pattern:/\bflag:\s*rim\b/gi,       replacement:'subtle rim flag shaping on shoulders and hips', severity:0, tags:['light'] }
  ]
});
/* ============================== BLOCK 6e — END ============================== */
/* ================================================================
 * BLOCK 8e — MICRO-LOCATIONS (HALLWAY • ELEVATOR • GARAGE • STAIR)
 * ID: BLOCK 8e • DATE: 2025-09-12 • severity 0
 * PURPOSE: More backgrounds that look sexy & believable.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 8e',
  language:'en',
  category:'micro_locations',
  emoji:['🚪','🛗','🅿️','🪜'],
  entries:[
    { pattern:/\bbg:\s*hotel\s*hall\b/gi,  replacement:'hotel hallway, sconce lights, patterned carpet', severity:0, tags:['interior'] },
    { pattern:/\bbg:\s*elevator\b/gi,      replacement:'elevator interior, brushed metal, mirror panel', severity:0, tags:['interior','mirror'] },
    { pattern:/\bbg:\s*stairwell\b/gi,     replacement:'concrete stairwell, slit windows, hard shadows', severity:0, tags:['interior'] },
    { pattern:/\bbg:\s*garage\b/gi,        replacement:'underground garage, sodium lamps, glossy floor', severity:0, tags:['urban'] }
  ]
});
/* ============================== BLOCK 8e — END ============================== */
/* ================================================================
 * BLOCK 5d — COMPOSITION: LEADING LINES • FOREGROUND OCCLUSION
 * ID: BLOCK 5d • DATE: 2025-09-12 • severity 0
 * PURPOSE: Direct the eye, add depth without clutter.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 5d',
  language:'en',
  category:'composition_depth',
  emoji:['➡️','🌿'],
  entries:[
    { pattern:/\bcomp:\s*leading\b/gi,   replacement:'leading lines toward subject hips and face', severity:0, tags:['frame'] },
    { pattern:/\bcomp:\s*odd\b/gi,       replacement:'rule of odds grouping, asymmetry with balance', severity:0, tags:['frame'] },
    { pattern:/\bfg:\s*soft\b/gi,        replacement:'soft foreground occlusion, blurred plant edge', severity:0, tags:['depth'] },
    { pattern:/\bfg:\s*frame\b/gi,       replacement:'doorframe foreground, peeked viewpoint', severity:0, tags:['depth','voyeur'] }
  ]
});
/* ============================== BLOCK 5d — END ============================== */
/* ================================================================
 * BLOCK 7b — NEGATIVE ANATOMY II (ARMS • LEGS • NECK • TEETH)
 * ID: BLOCK 7b • DATE: 2025-09-12 • severity 0
 * PURPOSE: Kill common anatomy glitches fast.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 7b',
  language:'en',
  category:'negative_anatomy_plus',
  emoji:['🦴','🧠'],
  entries:[
    { pattern:/\bNEG:\s*limbs\b/gi,   replacement:'no extra limbs, no fused arms, correct elbow bends', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*legs\b/gi,    replacement:'no leg twists, natural knees, correct ankles', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*neck\b/gi,    replacement:'no neck stretch, natural spine curve', severity:0, tags:['neg'] },
    { pattern:/\bNEG:\s*teeth\b/gi,   replacement:'no extra teeth, no gum artifacts, natural smile', severity:0, tags:['neg'] }
  ]
});
/* ============================== BLOCK 7b — END ============================== */
/* ================================================================
 * BLOCK 3r — FABRIC & TEXTURE LIB (VELVET • SATIN • MESH DENSITY)
 * ID: BLOCK 3r • DATE: 2025-09-12 • severity 0/2 mixed
 * PURPOSE: Swap vibes via fabric realism; pairs w/ color + gels.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 3r',
  language:'en',
  category:'fabric_texture',
  gated:false,
  emoji:['🧶','🪡'],
  entries:[
    { pattern:/\bfab:\s*velvet\b/gi, replacement:'deep velvet, light-eating nap, rich texture', severity:0, tags:['fabric'] },
    { pattern:/\bfab:\s*satin\b/gi,  replacement:'slick satin, sharp specular edges', severity:0, tags:['fabric'] },
    { pattern:/\bfab:\s*mesh\s*fine\b/gi, replacement:'fine mesh, tight diamonds, high detail', severity:0, tags:['fabric','sheer'] },
    { pattern:/\bfab:\s*mesh\s*wide\b/gi, replacement:'wide fishnet, bold pattern, skin peeks', severity:0, tags:['fabric','fishnets'] },
    { pattern:/\bfab:\s*lace\b/gi,   replacement:'floral lace, crisp filigree pattern', severity:0, tags:['fabric','lace'] }
  ]
});
/* ============================== BLOCK 3r — END ============================== */
/* ================================================================
 * BLOCK 9c — MAKEUP WEAR / AFTERGLOW (USED LOOK)
 * ID: BLOCK 9c • DATE: 2025-09-12 • severity 1–3
 * PURPOSE: Subtle realism after action; stacks w/ 4d moans.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 9c',
  language:'en',
  category:'makeup_afterglow',
  gated:true,
  emoji:['💄','💤'],
  entries:[
    { pattern:/\bafter:\s*mascara\b/gi, replacement:'slightly smudged mascara, dewy under-eyes', severity:2, tags:['makeup'] },
    { pattern:/\bafter:\s*lip\b/gi,     replacement:'lipstick worn on inner lip, kiss-faded edges', severity:2, tags:['makeup'] },
    { pattern:/\bafter:\s*hair\b/gi,    replacement:'bedhead flyaways, finger-combed look', severity:1, tags:['hair'] },
    { pattern:/\bafter:\s*flush\b/gi,   replacement:'post-climax cheek flush, chest mottling', severity:3, tags:['finish','climax'] }
  ]
});
/* ============================== BLOCK 9c — END ============================== */
/* ================================================================
 * BLOCK 11d — ULTRA-SHORT STARTERS (TWEET-LENGTH)
 * ID: BLOCK 11d • DATE: 2025-09-12
 * PURPOSE: Lightning-fast seeds; UI can list these first.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;
  const S = CORE.STARTERS = CORE.STARTERS || {};

  S['t_soft_mirror_blush'] = { ctx:{ vibe:'softcore', party:'solo', location:'mirror', wardrobe:'lace', allowExplicit:true, camera:'cam: beauty, lens:85, dof: shallow', persona:'french' } };
  S['t_soft_shower_oil']   = { ctx:{ vibe:'softcore', party:'solo', location:'shower', wardrobe:'naked', allowExplicit:true, camera:'cam: beauty, lens:50', persona:'latina' } };
  S['t_ff_kiss_neon']      = { ctx:{ vibe:'softcore', party:'ff',   location:'balcony', wardrobe:'sheer', allowExplicit:true, camera:'cam: voyeur, gel: magenta', persona:'ginger' } };

  S['t_hard_chair_rgb']    = { ctx:{ vibe:'hardcore', party:'mf',   location:'chair', wardrobe:'latex', allowExplicit:true, camera:'cam: studio, gel: cyan', persona:'goth' } };
  S['t_hard_ff_mirror']    = { ctx:{ vibe:'hardcore', party:'ff',   location:'mirror', wardrobe:'sheer', allowExplicit:true, camera:'cam: beauty, gel: red', persona:'eastern' } };
})();
/* ============================== BLOCK 11d — END ============================== */
/* ================================================================
 * BLOCK 22 — DIAGNOSTICS / SELF-CHECK (PACK LINT • COHERENCE TEST)
 * ID: BLOCK 22 • DATE: 2025-09-12
 * PURPOSE: Quick sanity checker you can run in dev console or UI.
 * NOTES: Pure JS; doesn’t mutate packs.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE || {};
  const PACKS = global.PF_PACKS || [];

  CORE.check = function check(){
    const out = { totalPacks: PACKS.length, issues: [] };
    const ids = new Set();
    for (const p of PACKS){
      if (!p.block_id) out.issues.push('Pack with missing block_id');
      if (p.block_id && ids.has(p.block_id)) out.issues.push(`Duplicate block_id: ${p.block_id}`);
      ids.add(p.block_id);
      if (!Array.isArray(p.entries) || !p.entries.length) out.issues.push(`Empty entries in ${p.block_id}`);
      for (const e of (p.entries||[])){
        if (!e.pattern || !e.replacement) out.issues.push(`Bad entry in ${p.block_id}`);
        if (typeof e.severity === 'undefined') out.issues.push(`Missing severity in ${p.block_id}`);
      }
    }
    // quick compose sanity
    if (typeof CORE.compose !== 'function') out.issues.push('CORE.compose is missing');
    if (typeof CORE.validate !== 'function') out.issues.push('CORE.validate is missing');
    if (typeof CORE.sanitize !== 'function') out.issues.push('CORE.sanitize is missing or was overridden incorrectly');
    return out;
  };

  // expose for UI
  global.PF_CORE = Object.assign(CORE, { check: CORE.check });
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 22 — END ============================== */
/* ================================================================
 * BLOCK 0b — AGE & CONSENT SCRUB (HARD SAFETY)
 * ID: BLOCK 0b • DATE: 2025-09-12
 * PURPOSE: Neutralize/ban underage terms; map vague "young" to adult.
 * Notes: Extends sanitize() added earlier; append-only patch.
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;

  const BANNED = [
    /\b(under[-\s]*age|minor|jailbait|pre\s*teen|preteen|kid|child)\b/gi
  ];
  const AGEY = [
    { re:/\b1[3-7]\s*(yo|y\/o|year[-\s]*old)\b/gi, rep:'—' },         // hard block 13–17
    { re:/\b18\s*(yo|y\/o|year[-\s]*old)\b/gi, rep:'adult (21+)' },   // remap borderline
    { re:/\byoung\s*(girl|woman)\b/gi, rep:'young adult woman (21+)' },
    { re:/\byouthful\b/gi, rep:'young adult' }
  ];

  CORE.sanitize = (function(orig){
    return function patched(text, opts={}){
      let out = (orig?orig(text,opts):String(text||''));
      for (const r of BANNED) out = out.replace(r,'—');
      for (const {re,rep} of AGEY) out = out.replace(re, rep);
      // Always assert: adult, consensual
      if (!/adult/.test(out)) out = `adult, consensual, ${out}`;
      return out;
    };
  })(CORE.sanitize);
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 0b — END ============================== */
/* ================================================================
 * BLOCK 1c — DOMAIN ROUTER (PEOPLE ↔ NATURE/SCENE)
 * ID: BLOCK 1c • DATE: 2025-09-12
 * PURPOSE: Let compose() filter packs by domain to avoid nonsense mixes.
 * USAGE: PF_CORE.compose({ domain:'nature' | 'people', ... })
 * Default: 'people' (back-compat with your NSFW flow).
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;
  const PACKS = global.PF_PACKS || [];

  CORE.compose = (function(origCompose){
    return function composeRouted(ctx={}){
      const domain = (ctx.domain==='nature' ? 'nature' : 'people');
      // tag filter wrapper
      const before = (global.__PF__filterHook || function(e){ return true; });
      global.__PF__filterHook = function(e){
        const tags = e && e.tags || [];
        // allow entries without domain tags, but prefer domain matches
        if (tags.includes(domain)) return true;
        if (tags.includes('both')) return true;
        // reject mismatched explicit people content when domain is nature
        if (domain==='nature' && tags.includes('explicit')) return false;
        return before(e);
      };
      const out = (origCompose?origCompose(ctx):'');
      global.__PF__filterHook = before;
      return out;
    };
  })(CORE.compose);
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK 1c — END ============================== */
/* ================================================================
 * BLOCK L1 — LANDSCAPE BASE (CABIN • CREEK • MOUNTAINS)
 * ID: BLOCK L1 • DATE: 2025-09-12 • severity 0
 * PURPOSE: SFW nature tokens that render beautifully.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK L1',
  language:'en',
  category:'landscape_base',
  gated:false,
  emoji:['🏔️','🌲','🏚️','💧'],
  notes:['Use domain:"nature" in compose() to keep NSFW stuff out.'],
  entries:[
    { pattern:/\bnat:\s*cabin\b/gi,     replacement:'cozy wooden cabin, warm window glow, smoke from chimney', severity:0, tags:['nature','both'] },
    { pattern:/\bnat:\s*creek\b/gi,     replacement:'clear creek, smooth river stones, gentle ripples', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*mountains\b/gi, replacement:'towering mountains, jagged ridgelines, snow-capped peaks', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*meadow\b/gi,    replacement:'meadow of wildflowers, tall grasses swaying', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*fog\b/gi,       replacement:'low morning fog drifting through pines', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*forest\b/gi,    replacement:'dense evergreen forest, mossy trunks, dappled light', severity:0, tags:['nature'] }
  ]
});
/* ============================== BLOCK L1 — END ============================== */
/* ================================================================
 * BLOCK L2 — SEASONS & ATMOS (SNOW • DUSK • GOLDEN HOUR)
 * ID: BLOCK L2 • DATE: 2025-09-12 • severity 0
 * PURPOSE: Time/season ambience for SFW scenes.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK L2',
  language:'en',
  category:'landscape_atmos',
  gated:false,
  emoji:['❄️','🌅','🌫️'],
  entries:[
    { pattern:/\bnat:\s*snowcap\b/gi,   replacement:'fresh snow caps, crisp white summits', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*golden\b/gi,    replacement:'golden hour light, long warm shadows', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*dusk\b/gi,      replacement:'blue-pink dusk gradient, soft horizon glow', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*overcast\b/gi,  replacement:'soft overcast sky, even diffuse light', severity:0, tags:['nature'] },
    { pattern:/\bnat:\s*mist\b/gi,      replacement:'fine mountain mist, veil over treeline', severity:0, tags:['nature'] }
  ]
});
/* ============================== BLOCK L2 — END ============================== */
/* ================================================================
 * BLOCK L3 — LANDSCAPE COMPOSITION (LEADING RIVER • S-CURVE • FOREGROUND)
 * ID: BLOCK L3 • DATE: 2025-09-12 • severity 0
 * PURPOSE: Camera-readable landscape framing helpers.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK L3',
  language:'en',
  category:'landscape_composition',
  gated:false,
  emoji:['🧭','🪨','📐'],
  entries:[
    { pattern:/\blcomp:\s*s-curve\b/gi, replacement:'S-curve creek leading into frame', severity:0, tags:['nature'] },
    { pattern:/\blcomp:\s*fg\s*rock\b/gi, replacement:'foreground river rock for depth, wet sheen', severity:0, tags:['nature'] },
    { pattern:/\blcomp:\s*rule\s*thirds\b/gi, replacement:'rule-of-thirds horizon placement', severity:0, tags:['nature'] },
    { pattern:/\blcomp:\s*frame\s*trees\b/gi, replacement:'tree trunks framing cabin edges', severity:0, tags:['nature'] }
  ]
});
/* ============================== BLOCK L3 — END ============================== */
/* ================================================================
 * BLOCK L4 — LANDSCAPE GRADES & DEFECT KILLERS
 * ID: BLOCK L4 • DATE: 2025-09-12 • severity 0
 * PURPOSE: Color grades + negatives for nature rendering.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK L4',
  language:'en',
  category:'landscape_grade_neg',
  gated:false,
  emoji:['🎞️','🚫'],
  entries:[
    { pattern:/\bnatgrade:\s*pastel\b/gi, replacement:'soft pastel grade, gentle contrast', severity:0, tags:['nature'] },
    { pattern:/\bnatgrade:\s*velvia\b/gi, replacement:'rich green/blue bias, clean saturation', severity:0, tags:['nature'] },
    { pattern:/\bNATNEG:\s*banding\b/gi,  replacement:'no sky banding, smooth gradients', severity:0, tags:['nature'] },
    { pattern:/\bNATNEG:\s*oversat\b/gi,  replacement:'no oversaturation, natural colors', severity:0, tags:['nature'] },
    { pattern:/\bNATNEG:\s*halo\b/gi,     replacement:'no haloing around peaks or trees', severity:0, tags:['nature'] }
  ]
});
/* ============================== BLOCK L4 — END ============================== */
/* ================================================================
 * BLOCK 2b — SOFTCORE NUDE CLEANER (TASTE MODE)
 * ID: BLOCK 2b • DATE: 2025-09-12
 * PURPOSE: If vibe:'softcore', map explicit bits to tasteful wording.
 * ================================================================ */
PF_PACKS.push({
  block_id:'BLOCK 2b',
  language:'en',
  category:'softcore_cleaner',
  gated:false,
  emoji:['🕊️'],
  notes:['Works with styleBrake/validate to keep soft scenes classy.'],
  entries:[
    { pattern:/\bhard\s*nipples?\b/gi,       replacement:'peaked nipples (tasteful)', severity:1, tags:['people','softcore'] },
    { pattern:/\bpussy\b/gi,                  replacement:'pubic area (implied)', severity:2, tags:['people','softcore'] },
    { pattern:/\bperky\s*tits\b/gi,          replacement:'perky breasts', severity:1, tags:['people','softcore'] },
    { pattern:/\bdang(ling)?\s*(labia|pussy)\b/gi, replacement:'implied detail only', severity:2, tags:['people','softcore'] }
  ]
});
/* ============================== BLOCK 2b — END ============================== */
/* ================================================================
 * BLOCK L5 — NATURE STARTERS (ONE-TAP SFW SCENES)
 * ID: BLOCK L5 • DATE: 2025-09-12
 * PURPOSE: Instant cabin/creek/mountain seeds (SFW).
 * ================================================================ */
(function (global){
  const CORE = global.PF_CORE; if (!CORE) return;
  const S = CORE.STARTERS = CORE.STARTERS || {};

  S['sfw_cabin_creek_fog'] = { ctx:{ domain:'nature', vibe:'softcore', party:'solo', location:'studio', allowExplicit:false, camera:'lens:35, dof: deep', persona:null } };
  S['sfw_meadow_dusk']     = { ctx:{ domain:'nature', vibe:'softcore', party:'solo', location:'studio', allowExplicit:false, camera:'lens:50, dof: deep', persona:null } };
})(typeof self!=='undefined'?self:this);
/* ============================== BLOCK L5 — END ============================== */
