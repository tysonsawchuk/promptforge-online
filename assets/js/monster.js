const themes = {
  erotic: [
    "💋 (Whispers of silk, candlelight, and bare skin)",
    "🔥 (Hands pressed against glass in the rain)",
    "🍑 (Latex, lips, and unspoken tension)"
  ],
  grotesque: [
    "🧠 (Dripping fangs, soft moaning, stitched skin)",
    "🩸 (Wires in flesh, smiling too wide)",
    "🪓 (Flesh merged with metal, moaning circuits)"
  ],
  cinematic: [
    "🎬 (Close-up: trembling breath in amber haze)",
    "🌌 (Slow zoom as bodies collapse in neon ruins)",
    "📽 (Backlit silhouette framed in fire)"
  ]
};

const promptBox = document.getElementById("monsterPrompt");
const themeSelect = document.getElementById("themeSelect");
const rerollBtn = document.getElementById("rerollBtn");
const copyBtn = document.getElementById("copyBtn");
const copiedMsg = document.getElementById("copiedMsg");

function generatePrompt() {
  const theme = themeSelect.value;
  if (!theme || !themes[theme]) {
    promptBox.value = "⚠️ Please select a theme first.";
    return;
  }
  const choices = themes[theme];
  const output = choices[Math.floor(Math.random() * choices.length)];
  promptBox.value = output;
}

rerollBtn.addEventListener("click", generatePrompt);

copyBtn.addEventListener("click", () => {
  promptBox.select();
  document.execCommand("copy");
  copiedMsg.style.display = "inline";
  setTimeout(() => copiedMsg.style.display = "none", 2000);
});
