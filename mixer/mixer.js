function generate() {
  const category = document.getElementById("category").value;
  const emotion = document.getElementById("emotion").value;
  const setting = document.getElementById("setting").value;
  const custom = document.getElementById("custom").value.trim();

  let prompt = `A ${emotion} ${category} scene set in a ${setting}`;
  if (custom !== "") {
    prompt += `, with ${custom}`;
  }

  document.getElementById("output").innerText = prompt;
}
