const sample = document.getElementById("sample-img");
const watermark = document.getElementById("watermark");
const upload = document.getElementById("upload");
const position = document.getElementById("position");

upload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = event => {
    watermark.src = event.target.result;
  };
  reader.readAsDataURL(file);
});

position.addEventListener("change", () => updatePosition());
watermark.onload = () => updatePosition();

function updatePosition() {
  const pos = position.value;
  const styles = {
    top: "", bottom: "", left: "", right: "", transform: ""
  };

  switch (pos) {
    case "top-left":
      styles.top = "10px"; styles.left = "10px";
      break;
    case "top-right":
      styles.top = "10px"; styles.right = "10px";
      break;
    case "center":
      styles.top = "50%"; styles.left = "50%";
      styles.transform = "translate(-50%, -50%)";
      break;
    case "bottom-left":
      styles.bottom = "10px"; styles.left = "10px";
      break;
    case "bottom-right":
      styles.bottom = "10px"; styles.right = "10px";
      break;
  }

  Object.assign(watermark.style, styles);
}
