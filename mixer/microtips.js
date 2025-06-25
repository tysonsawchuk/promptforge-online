document.addEventListener("DOMContentLoaded", () => {
  const tips = {
    theme: "Pick a genre that sets the visual and narrative tone. Example: 'cyberpunk' gives neon and tech vibes.",
    modifier: "Choose an emotional or stylistic overlay. Example: 'mysterious' adds suspense or moodiness.",
    custom: "Type your own keywords here to customize the final result — like a unique concept, character, or setting."
  };

  for (const id in tips) {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("focus", () => showTip(id));
      el.addEventListener("blur", hideTip);
    }
  }

  function showTip(id) {
    let tooltip = document.getElementById("microtip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "microtip";
      tooltip.style.position = "fixed";
      tooltip.style.bottom = "10px";
      tooltip.style.right = "10px";
      tooltip.style.background = "#111";
      tooltip.style.color = "#0ff";
      tooltip.style.padding = "0.5rem";
      tooltip.style.border = "1px solid #0ff";
      tooltip.style.maxWidth = "300px";
      tooltip.style.fontSize = "0.85rem";
      document.body.appendChild(tooltip);
    }
    tooltip.textContent = tips[id];
    tooltip.style.display = "block";
  }

  function hideTip() {
    const tooltip = document.getElementById("microtip");
    if (tooltip) tooltip.style.display = "none";
  }
});
