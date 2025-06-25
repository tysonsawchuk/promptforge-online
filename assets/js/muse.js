document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("muse-output");

  function redirect() {
    window.location.href = "../tools/prompt-pic.html";
  }

  output.addEventListener("click", redirect);
  document.addEventListener("keydown", e => {
    if (e.key === "Enter") redirect();
  });
});
