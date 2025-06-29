// Simple font loader (optional: load Google Fonts as needed)
(function loadFonts() {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Pacifico&family=Roboto&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
})();

// Canvas core vars
const canvas = document.getElementById('wmCanvas');
const ctx = canvas.getContext('2d');
let baseImage = null, watermarkArt = null;

// Watermark elements for drag/resize (array for future stacking)
let elements = [
  { type: 'text', value: '', x: 260, y: 350, font: 'Share Tech Mono', size: 32, color: '#fff7b3', opacity: 0.9, dragging: false, offsetX:0, offsetY:0 },
  { type: 'art', img: null, x: 400, y: 300, width: 80, height: 80, dragging: false, offsetX:0, offsetY:0 },
  { type: 'draw', path: [], enabled: false }
];

// Load image to watermark
document.getElementById('imgInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    baseImage = new Image();
    baseImage.onload = redraw;
    baseImage.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// Load watermark art
document.getElementById('wmArtInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    elements[1].img = new Image();
    elements[1].img.onload = function() {
      elements[1].width = Math.min(120, elements[1].img.width);
      elements[1].height = Math.min(120, elements[1].img.height);
      redraw();
    };
    elements[1].img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
});

// Text controls
document.getElementById('wmText').addEventListener('input', function(e) {
  elements[0].value = e.target.value;
  redraw();
});
document.getElementById('wmFont').addEventListener('change', function(e) {
  elements[0].font = e.target.value;
  redraw();
});
document.getElementById('wmSize').addEventListener('input', function(e) {
  elements[0].size = +e.target.value;
  redraw();
});
document.getElementById('wmColor').addEventListener('input', function(e) {
  elements[0].color = e.target.value;
  redraw();
});
document.getElementById('wmOpacity').addEventListener('input', function(e) {
  elements[0].opacity = +e.target.value/100;
  redraw();
});

// Drawing/signature toggle
let drawing = false;
function toggleDraw() {
  elements[2].enabled = !elements[2].enabled;
  if (elements[2].enabled) {
    alert('Drawing/signature mode: Use your mouse or finger to sign. Click button again to exit.');
  }
}
function clearDraw() {
  elements[2].path = [];
  redraw();
}

// Canvas interactions: drag & draw
let dragIdx = -1, dragStartX = 0, dragStartY = 0;
canvas.addEventListener('mousedown', startDragOrDraw);
canvas.addEventListener('touchstart', startDragOrDraw, { passive: false });
canvas.addEventListener('mousemove', dragOrDraw);
canvas.addEventListener('touchmove', dragOrDraw, { passive: false });
canvas.addEventListener('mouseup', endDragOrDraw);
canvas.addEventListener('mouseleave', endDragOrDraw);
canvas.addEventListener('touchend', endDragOrDraw);

function startDragOrDraw(e) {
  const rect = canvas.getBoundingClientRect();
  let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  // If drawing mode
  if (elements[2].enabled) {
    drawing = true;
    elements[2].path.push([{x, y}]);
    return;
  }
  // Drag watermark elements (text/art)
  dragIdx = hitTest(x, y);
  if (dragIdx >= 0) {
    elements[dragIdx].dragging = true;
    elements[dragIdx].offsetX = x - elements[dragIdx].x;
    elements[dragIdx].offsetY = y - elements[dragIdx].y;
    dragStartX = x; dragStartY = y;
  }
}
function dragOrDraw(e) {
  if (drawing && elements[2].enabled) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    if (elements[2].path.length) {
      elements[2].path[elements[2].path.length-1].push({x, y});
      redraw();
    }
    return;
  }
  if (dragIdx >= 0 && elements[dragIdx].dragging) {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    let y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    elements[dragIdx].x = x - elements[dragIdx].offsetX;
    elements[dragIdx].y = y - elements[dragIdx].offsetY;
    redraw();
  }
}
function endDragOrDraw(e) {
  if (drawing) { drawing = false; }
  for (let i=0; i<elements.length-1; ++i) elements[i].dragging = false;
  dragIdx = -1;
}
// Hit test for draggable watermark elements (reverse order)
function hitTest(x, y) {
  // Art first, then text (can adjust order)
  if (elements[1].img && x > elements[1].x && x < elements[1].x+elements[1].width && y > elements[1].y && y < elements[1].y+elements[1].height)
    return 1;
  if (elements[0].value) {
    ctx.save();
    ctx.font = `${elements[0].size}px "${elements[0].font}"`;
    let width = ctx.measureText(elements[0].value).width;
    ctx.restore();
    if (x > elements[0].x && x < elements[0].x+width && y > elements[0].y-elements[0].size && y < elements[0].y)
      return 0;
  }
  return -1;
}

// Main redraw function
function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // Draw base image (if any)
  if (baseImage) ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  else {
    ctx.fillStyle = "#191929";
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }
  // Draw watermark art
  if (elements[1].img) {
    ctx.globalAlpha = 0.7;
    ctx.drawImage(elements[1].img, elements[1].x, elements[1].y, elements[1].width, elements[1].height);
    ctx.globalAlpha = 1.0;
  }
  // Draw text watermark
  if (elements[0].value) {
    ctx.save();
    ctx.globalAlpha = elements[0].opacity;
    ctx.font = `${elements[0].size}px "${elements[0].font}"`;
    ctx.fillStyle = elements[0].color;
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 7;
    ctx.fillText(elements[0].value, elements[0].x, elements[0].y);
    ctx.restore();
  }
  // Draw signature/drawing
  if (elements[2].path.length) {
    ctx.save();
    ctx.strokeStyle = "#ffd900";
    ctx.lineWidth = 2.4;
    ctx.shadowColor = "#fffa84";
    ctx.shadowBlur = 3;
    for (let stroke of elements[2].path) {
      ctx.beginPath();
      for (let i=0; i<stroke.length; ++i) {
        if (i === 0) ctx.moveTo(stroke[i].x, stroke[i].y);
        else ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }
}
// Export image or watermark
function exportImage(full=true) {
  if (full) {
    // Download composite image with watermark(s)
    const link = document.createElement('a');
    link.download = "watermarked_image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } else {
    // Download watermark only (clear base first)
    ctx.save();
    let imgData = ctx.getImageData(0,0,canvas.width,canvas.height);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // Draw just art, text, signature
    if (elements[1].img) ctx.drawImage(elements[1].img, elements[1].x, elements[1].y, elements[1].width, elements[1].height);
    if (elements[0].value) {
      ctx.globalAlpha = elements[0].opacity;
      ctx.font = `${elements[0].size}px "${elements[0].font}"`;
      ctx.fillStyle = elements[0].color;
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 7;
      ctx.fillText(elements[0].value, elements[0].x, elements[0].y);
      ctx.globalAlpha = 1.0;
    }
    if (elements[2].path.length) {
      ctx.save();
      ctx.strokeStyle = "#ffd900";
      ctx.lineWidth = 2.4;
      ctx.shadowColor = "#fffa84";
      ctx.shadowBlur = 3;
      for (let stroke of elements[2].path) {
        ctx.beginPath();
        for (let i=0; i<stroke.length; ++i) {
          if (i === 0) ctx.moveTo(stroke[i].x, stroke[i].y);
          else ctx.lineTo(stroke[i].x, stroke[i].y);
        }
        ctx.stroke();
      }
      ctx.restore();
    }
    const link = document.createElement('a');
    link.download = "my_watermark.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    // Restore canvas
    ctx.putImageData(imgData,0,0);
    ctx.restore();
    redraw();
  }
}

// Redraw on load
window.onload = redraw;
