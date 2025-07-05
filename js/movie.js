// movie.js — Powers MovieForge page, wires to generator.js (God Mode), J1nx, UI

// ========== CONFIG & DOM HOOKS ==========
const moviePromptInput = document.getElementById('moviePromptInput');
const movieMode = document.getElementById('movieMode');
const generateMovieBtn = document.getElementById('generateMovieBtn');
const outputMoviePrompt = document.getElementById('outputMoviePrompt');
const copyMoviePromptBtn = document.getElementById('copyMoviePromptBtn');
const exportMoviePromptBtn = document.getElementById('exportMoviePromptBtn');
const randomDirectorNoteBtn = document.getElementById('randomDirectorNoteBtn');
const moviePromptSuggestions = document.getElementById('moviePromptSuggestions');

// ========== DIRECTOR NOTE BANK ==========
const directorNotes = [
  "Steady cam, wide establishing shot",
  "Close-up, subtle lighting, character emotion focus",
  "Handheld camera, documentary style, raw atmosphere",
  "Slo-mo pan, highlight movement",
  "Overhead drone, epic scale",
  "Backlight silhouettes, moody shadows",
  "Insert cutaway, story detail",
  "POV angle, immersive framing",
  "Montage transition, jump cuts",
  "Dramatic zoom-in, tension build",
  "Reverse tracking, follow action",
  "Dutch angle for surreal vibe",
  "Color grade: cyan/amber for cinematic punch",
  "Depth-of-field emphasis, dreamy bokeh",
  "Split diopter, multi-focus"
];

// ========== MAIN MOVIE PROMPT GENERATOR ==========
function buildMoviePrompt() {
  const userInput = moviePromptInput.value.trim();
  const mode = movieMode.value;
  let prompt = "";
  let suggestions = [];

  // Use God Mode from generator.js; multi-scene or single logic
  if (mode === "single") {
    const result = PF_PROMPTFORGE.ultimateAntiFilterPrompt(userInput, { mode: "stealth", movie: true });
    prompt = result.prompt;
    suggestions = result.suggestions || [];
  } else if (mode === "sequence") {
    // Break input into multiple scenes by commas or periods
    let scenes = userInput.split(/[.,;]/).map(s => s.trim()).filter(s => s);
    if (scenes.length < 2) scenes = [userInput, "Cut to: close-up, dramatic reaction"];
    prompt = scenes.map((scene, idx) => {
      const res = PF_PROMPTFORGE.ultimateAntiFilterPrompt(scene, { mode: "paranoid", movie: true, scene: idx+1 });
      return `Scene ${idx+1}: ${res.prompt}`;
    }).join('\n\n');
    suggestions = []; // Can aggregate, but usually not needed for sequence
  } else if (mode === "director") {
    // Add a random director's note to the prompt
    const note = directorNotes[Math.floor(Math.random()*directorNotes.length)];
    const res = PF_PROMPTFORGE.ultimateAntiFilterPrompt(userInput + ', ' + note, { mode: "paranoid", movie: true });
    prompt = `Director’s Note: ${note}\n\n${res.prompt}`;
    suggestions = res.suggestions || [];
  }
  outputMoviePrompt.value = prompt;

  // Suggestions (if any)
  if (suggestions && suggestions.length > 0) {
    moviePromptSuggestions.innerHTML = suggestions.map(s =>
      `<b>Tip:</b> Instead of "<span class="text-yellow-300">${s.bad}</span>", try "<span class="text-green-300">${s.safe}</span>"${s.extra && s.extra.length ? `, or: ${s.extra.join(', ')}` : ''}`
    ).join('<br>');
  } else {
    moviePromptSuggestions.innerHTML = '';
  }
}

// ========== BUTTON/CONTROL HANDLERS ==========
generateMovieBtn.onclick = buildMoviePrompt;

copyMoviePromptBtn.onclick = () => {
  outputMoviePrompt.select();
  document.execCommand('copy');
  copyMoviePromptBtn.innerText = 'Copied!';
  setTimeout(() => (copyMoviePromptBtn.innerText = 'Copy Prompt'), 1500);
};

randomDirectorNoteBtn.onclick = () => {
  // Insert a random director note at the end of input
  const note = directorNotes[Math.floor(Math.random()*directorNotes.length)];
  moviePromptInput.value += (moviePromptInput.value ? ', ' : '') + note;
  buildMoviePrompt();
};

exportMoviePromptBtn.onclick = () => {
  // Export prompt as .txt file (simple text export)
  const blob = new Blob([outputMoviePrompt.value], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "MovieForge_Prompt.txt";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 200);
};

// Optional: build on enter
moviePromptInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    buildMoviePrompt();
    e.preventDefault();
  }
});

// ========== J1nx Assistant Integration ==========
if (typeof J1nx !== "undefined") {
  // Assume you have j1nx.js loaded; wire up console to div
  J1nx.init({
    container: document.getElementById('j1nxConsole'),
    promptContext: "You are J1nx, the ultimate AI movie prompt coach. Help users turn wild ideas into filter-busting movie and storyboard prompts—suggest rewrites, add director's flair, or break up scenes.",
    links: [
      { title: "PictureForge", url: "picture.html" },
      { title: "Main", url: "main.html" },
      { title: "Buy Me a Coffee", url: "https://www.buymeacoffee.com/goreandgiggles" }
    ]
  });
}

// ========== SEO / LAST TOUCH ==========
document.title = "MovieForge: AI NSFW Movie Prompt Generator – Cinematic Prompt Engine";

// Initial build
outputMoviePrompt.value = "";
moviePromptSuggestions.innerHTML = "";
