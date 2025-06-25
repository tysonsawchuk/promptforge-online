// microhelp.js — Tiny helper buttons for UI guidance

document.addEventListener("DOMContentLoaded", () => {
  const helpPoints = document.querySelectorAll("[data-help]");

  helpPoints.forEach(point => {
    const hint = point.getAttribute("data-help");
    const helpBtn = document.createElement("span");
    helpBtn.textContent = "ⓘ";
    helpBtn.style.cssText = `
      display: inline-block;
      margin-left: 6px;
      cursor: help;
      color: #0ff;
      background-color: #022;
      border-radius: 50%;
      padding: 1px 6px;
      font-size: 0.75em;
    `;

    const tooltip = document.createElement("div");
    tooltip.textContent = hint;
    tooltip.style.cssText = `
      position: absolute;
      background-color: #011;
      color: #0ff;
      border: 1px solid #044;
      padding: 6px;
      font-size: 0.75em;
      border-radius: 4px;
      max-width: 200px;
      display: none;
      z-index: 9999;
    `;

    document.body.appendChild(tooltip);

    helpBtn.addEventListener("mouseenter", e => {
      tooltip.style.left = e.pageX + 10 + "px";
      tooltip.style.top = e.pageY + 10 + "px";
      tooltip.style.display = "block";
    });

    helpBtn.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
    });

    point.appendChild(helpBtn);
  });
});
