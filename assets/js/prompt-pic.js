document.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("body");
  const setting = document.getElementById("setting");
  const pose = document.getElementById("pose");
  const output = document.getElementById("output");
  const copy = document.getElementById("copy");

  document.getElementById("generate").addEventListener("click", () => {
    const prompt = `An ultra-realistic ${body.value} woman in a ${setting.value}, ${pose.value} pose.`;
    output.value = prompt;
  });

  copy.addEventListener("click", () => {
    output.select();
    document.execCommand("copy");
    copy.textContent = "✅ Copied!";
    setTimeout(() => copy.textContent = "📋 Copy", 1500);
  });
});
