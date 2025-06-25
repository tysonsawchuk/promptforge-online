document.addEventListener("DOMContentLoaded", () => {
  const emotion = document.getElementById("emotion");
  const action = document.getElementById("action");
  const scene = document.getElementById("scene");
  const duration = document.getElementById("duration");
  const timeLabel = document.getElementById("time-label");
  const output = document.getElementById("output");
  const copy = document.getElementById("copy");

  duration.addEventListener("input", () => {
    timeLabel.textContent = `${duration.value}s`;
  });

  document.getElementById("generate").addEventListener("click", () => {
    const prompt = `A ${duration.value}-second video of a ${emotion.value.toLowerCase()} character ${action.value.toLowerCase()} in a ${scene.value.toLowerCase()} setting.`;
    output.value = prompt;
  });

  copy.addEventListener("click", () => {
    output.select();
    document.execCommand("copy");
    copy.textContent = "✅ Copied!";
    setTimeout(() => copy.textContent = "📋 Copy", 1500);
  });
});
