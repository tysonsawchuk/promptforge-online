let themes = {};
const promptBox = document.getElementById("monsterPrompt");
const themeSelect = document.getElementById("themeSelect");
const rerollBtn = document.getElementById("rerollBtn");
const copyBtn = document.getElementById("copyBtn");
const copiedMsg = document.getElementById("copiedMsg");

// Load JSON data from external file
fetch("/assets/data/themes.json")
  .then(res => res.json())
  .then(data => {
    themes = data;
  })
  .catch(err => {
    console.error("Failed to load prompt data:", err);
    promptBox.value = "⚠️ Error loading prompt data.";
  });

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
