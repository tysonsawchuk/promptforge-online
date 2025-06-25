document.addEventListener("DOMContentLoaded", () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const output = document.getElementById("terminal-output");

  async function bootSequence() {
    await delay(4000); // Delay after "boot"
    output.innerText += "\n[OK] Launching interface...";
    await delay(2000);
    window.location.href = "muse/j1nx.html"; // or "tools/prompt-pic.html"
  }

  bootSequence();
});
