// Universal PromptForge Monster Brains Engine
let BRAINS = null;
let PROMPT_MODE = "image"; // or "movie"

function loadBrainsJSON(jsonPath, cb) {
  fetch(jsonPath)
    .then(resp => resp.json())
    .then(data => { BRAINS = data; cb(); })
    .catch(() => {
      alert("Brains data not found!");
    });
}

// Build dropdowns dynamically
function renderDropdowns() {
  const wrap = document.getElementById("brainsDropdowns");
  wrap.innerHTML = "";
  BRAINS.categories.forEach(cat => {
    let sec = document.createElement("div");
    sec.className = "inspire-section";
    sec.innerHTML = `<span class="inspire-label">${cat.name}:</span>`;
    let d = document.createElement("div");
    d.className = "inspire-dropdown";
    d.id = "drop_" + cat.id;
    cat.options.forEach(opt => {
      let btn = document.createElement("span");
      btn.textContent = opt;
      btn.className = "inspire-opt";
      btn.onclick = function() { btn.classList.toggle("selected"); };
      d.appendChild(btn);
    });
    sec.appendChild(d);
    wrap.appendChild(sec);
  });
}

// Helper: collect all selected values per dropdown
function getSelected(cat_id) {
  return Array.from(document.getElementById("drop_" + cat_id).querySelectorAll(".inspire-opt.selected")).map(x => x.textContent);
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function generateMonsterPrompt() {
  // 1. Pull a template at random
  const tmplArr = BRAINS.templates[PROMPT_MODE] || BRAINS.templates["image"];
  let template = pick(tmplArr);

  // 2. Build pool of replacements
  let vals = {};
  BRAINS.categories.forEach(cat => {
    let v = getSelected(cat.id);
    vals[cat.id] = v.length ? pick(v) : pick(cat.options);
  });

  // 3. User input box
  const kw = document.getElementById("userKeywords").value.trim();
  vals["keywords"] = kw ? (pick(BRAINS.glue) + " " + kw) : "";

  // 4. Do the replacement
  let out = template
    .replace(/{persona}/g, vals["age"] || "unknown")
    .replace(/{setting}/g, vals["setting"])
    .replace(/{mood}/g, vals["mood"])
    .replace(/{action}/g, vals["action"])
    .replace(/{style}/g, vals["style"])
    .replace(/{nsfw}/g, vals["nsfw"])
    .replace(/{keywords}/g, vals["keywords"]);

  document.getElementById("outputArea").innerText = out.trim();
  rollJ1NX();
}

function rerollPrompt() { generateMonsterPrompt(); }
function copyPrompt() {
  const out = document.getElementById('outputArea').innerText;
  if (!out) return;
  navigator.clipboard.writeText(out);
  alert("Prompt copied!");
}
function rollJ1NX() {
  document.getElementById('j1nxReact').innerText = pick(BRAINS.j1nx);
}

// Auto-run after JSON loads
function brainsReady() {
  renderDropdowns();
  generateMonsterPrompt();
}
