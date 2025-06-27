// monster-movie.js

document.addEventListener("DOMContentLoaded", () => {
  const fields = [
    { id: "genre", options: ["Sci-Fi", "Noir", "Erotic Thriller", "Found Footage", "Post-Apocalyptic", "Rom-Com", "Cyberpunk", "Surreal Horror"] },
    { id: "tone", options: ["Gritty", "Satirical", "Dreamlike", "Dark Comedy", "Melancholic", "Unhinged", "Tender", "Psychotic"] },
    { id: "camera", options: ["Handheld POV", "Dolly Tracking", "Security Cam", "Drone Shot", "Over-the-shoulder", "Cinematic Wide Angle", "Surveillance Feed"] },
    { id: "lighting", options: ["Neon Glow", "Low Light Grit", "Soft Dream Fog", "Harsh Spotlight", "Golden Hour", "Cold Blue Hue"] },
    { id: "fx", options: ["VHS Grain", "Cinematic Bloom", "Black & White", "AI Hallucination", "Oversaturated Madness", "Color Bleed"] },
    { id: "plot", options: ["Revenge Loop", "Forbidden Love", "Simulation Escape", "Identity Crisis", "Unstoppable Lust", "Time Warp Spiral"] },
    { id: "dialogue", options: ["Tarantino-esque Banter", "Silent Film Cards", "Voiceover Narration", "Internal Monologue", "Broken AI Scripting"] },
    { id: "cast", options: ["Solo Actress", "Two Girls One Room", "Three Avatars", "Masked Doubles", "Mixed Cast", "Animated Puppets"] },
    { id: "duration", options: ["15 sec teaser", "1 min short", "3 min reel", "10 min loop", "Feature-length concept"] },
    { id: "nsfw", options: ["Disabled", "Enabled"] },
  ];

  fields.forEach(field => {
    const select = document.getElementById(field.id);
    field.options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
  });

  document.getElementById("reroll-prompt").addEventListener("click", generatePrompt);
  document.getElementById("copy-prompt").addEventListener("click", copyPrompt);
});

function generatePrompt() {
  const get = id => document.getElementById(id).value;

  const genre = get("genre");
  const tone = get("tone");
  const camera = get("camera");
  const lighting = get("lighting");
  const fx = get("fx");
  const plot = get("plot");
  const dialogue = get("dialogue");
  const cast = get("cast");
  const duration = get("duration");
  const nsfw = get("nsfw") === "Enabled";

  let prompt = `🎬 A ${tone} ${genre} film shot in ${camera} style with ${lighting} lighting and ${fx} effects. The plot centers on ${plot}, with dialogue in ${dialogue} format. Cast features ${cast}, wrapped in a ${duration} runtime.`;

  if (nsfw) {
    prompt += ` 🔥 This cut includes explicit, taboo themes and raw, uncensored energy.`;
    consoleMsg(">> Forbidden reel unlocked...");
  } else {
    consoleMsg(">> Standard reel compiled. Keep it classy.");
  }

  const applyWatermark = document.getElementById("apply-watermark").checked;
  const watermarkText = document.getElementById("watermark").value.trim();

  if (applyWatermark && watermarkText) {
    prompt += `\n\n🔒 Watermark: ${watermarkText}`;
    consoleMsg(">> Watermark applied.");
  }

  document.getElementById("movie-prompt-output").value = prompt;
}

function copyPrompt() {
  const txt = document.getElementById("movie-prompt-output");
  txt.select();
  txt.setSelectionRange(0, 9999);
  document.execCommand("copy");
  consoleMsg(">> Copied to clipboard. Time to roll.");
}

function consoleMsg(msg) {
  const el = document.getElementById("reactive-msg");
  el.textContent = msg;
}
