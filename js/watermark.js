// === PromptForge Watermark Studio - watermark.js ===
// © 2025 Gore & Giggles | All logic, no placeholders, mobile-first, undo/redo, instant export

const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// ---- LAYER ENGINE ----
let layers = [], activeLayer = null, undoStack = [], redoStack = [];
let baseImage = null, baseWidth = 820, baseHeight = 560, dragging = false;
const canvas = $("#studio-canvas"), ctx = canvas.getContext("2d");
const layersPanel = $("#layersList"), controlsBar = $("#layerControls");
let lastPointer = {x:0, y:0}, lastDist = 0, lastAngle = 0, multiTouch = false;

// --- Fonts & Presets ---
const FONT_LIST = [
  "Share Tech Mono", "Roboto", "Montserrat", "Bangers", "Lobster", "Permanent Marker", "Oswald", "Anton", "Lato"
];

// ---- MAIN ----
window.onload = function() {
  updateCanvas();
  updateLayerPanel();
  canvas.addEventListener('pointerdown', pointerDown);
  canvas.addEventListener('pointermove', pointerMove);
  canvas.addEventListener('pointerup', pointerUp);
  canvas.addEventListener('pointerleave', pointerUp);
  canvas.addEventListener('wheel', canvasZoom, {passive:false});
  canvas.addEventListener('dblclick', editLayerText);
  canvas.addEventListener('touchstart', e=>e.preventDefault(), {passive:false});
  document.addEventListener('keydown', keyShortcuts);
  $(".stage").ondragover = e=>e.preventDefault();
  $(".stage").ondrop = dropImage;
};

// ---- LAYER OBJECTS ----
function addTextLayer() {
  let text = prompt("Watermark text?", "PromptForge");
  if(!text) return;
  pushUndo();
  layers.push({
    type: 'text',
    text,
    x: baseWidth/2, y: baseHeight/2,
    size: 56,
    font: FONT_LIST[0],
    color: "#ffe400",
    shadow: false,
    opacity: 0.88,
    rotation: 0,
    locked: false,
    hidden: false
  });
  setActiveLayer(layers.length-1);
}
function addLogoLayer() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/png,image/jpeg,image/webp';
  input.onchange = e => {
    let file = e.target.files[0];
    if(!file) return;
    let img = new Image();
    img.onload = function() {
      pushUndo();
      layers.push({
        type: 'image',
        img,
        name: file.name,
        x: baseWidth/2, y: baseHeight/2,
        width: Math.min(img.width, baseWidth/3),
        height: Math.min(img.height, baseHeight/3),
        opacity: 1,
        rotation: 0,
        locked: false,
        hidden: false
      });
      setActiveLayer(layers.length-1);
    };
    img.src = URL.createObjectURL(file);
  };
  input.click();
}
function addSVG() {
  let input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/svg+xml';
  input.onchange = e => {
    let file = e.target.files[0];
    if(!file) return;
    let reader = new FileReader();
    reader.onload = function(evt) {
      let svgStr = evt.target.result;
      let img = new Image();
      img.onload = function() {
        pushUndo();
        layers.push({
          type: 'image',
          img,
          name: file.name,
          x: baseWidth/2, y: baseHeight/2,
          width: Math.min(img.width, baseWidth/2),
          height: Math.min(img.height, baseHeight/2),
          opacity: 1,
          rotation: 0,
          locked: false,
          hidden: false
        });
        setActiveLayer(layers.length-1);
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgStr);
    };
    reader.readAsText(file);
  };
  input.click();
}
function dropImage(e) {
  e.preventDefault();
  let file = e.dataTransfer.files[0];
  if(!file) return;
  if(file.type.match(/^image\/svg/)) return addSVG();
  let img = new Image();
  img.onload = function() {
    if(!baseImage) {
      setBaseImage(img);
    } else {
      pushUndo();
      layers.push({
        type: 'image',
        img,
        name: file.name,
        x: baseWidth/2, y: baseHeight/2,
        width: Math.min(img.width, baseWidth/2),
        height: Math.min(img.height, baseHeight/2),
        opacity: 1,
        rotation: 0,
        locked: false,
        hidden: false
      });
      setActiveLayer(layers.length-1);
    }
  };
  img.src = URL.createObjectURL(file);
}

// ---- BASE IMAGE / CANVAS ----
function setBaseImage(img) {
  baseImage = img;
  baseWidth = img.width; baseHeight = img.height;
  canvas.width = baseWidth; canvas.height = baseHeight;
  pushUndo();
  updateCanvas();
}
function updateCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(baseImage) ctx.drawImage(baseImage,0,0,baseWidth,baseHeight);
  layers.forEach((ly,i)=>{
    if(ly.hidden) return;
    ctx.save();
    ctx.globalAlpha = ly.opacity ?? 1;
    ctx.translate(ly.x,ly.y);
    ctx.rotate(ly.rotation||0);
    if(ly.type==='text') {
      ctx.font = `${ly.size||56}px "${ly.font||FONT_LIST[0]}"`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if(ly.shadow) {
        ctx.shadowColor = "#000a";
        ctx.shadowBlur = 8;
      }
      ctx.fillStyle = ly.color||"#fff";
      ctx.fillText(ly.text, 0, 0);
      ctx.shadowBlur = 0;
    }
    if(ly.type==='image' && ly.img) {
      ctx.drawImage(ly.img, -ly.width/2, -ly.height/2, ly.width, ly.height);
    }
    ctx.restore();
    // If selected, draw outline
    if(i===activeLayer) {
      ctx.save();
      ctx.translate(ly.x,ly.y);
      ctx.rotate(ly.rotation||0);
      ctx.strokeStyle = "#ffe400";
      ctx.lineWidth = 2;
      ctx.setLineDash([8,7]);
      if(ly.type==='text') {
        let w = ctx.measureText(ly.text).width+32, h = (ly.size||56)+20;
        ctx.strokeRect(-w/2,-h/2,w,h);
      }
      if(ly.type==='image' && ly.img) {
        ctx.strokeRect(-ly.width/2,-ly.height/2,ly.width,ly.height);
      }
      ctx.setLineDash([]);
      ctx.restore();
    }
  });
}

// ---- LAYER PANEL ----
function updateLayerPanel() {
  layersPanel.innerHTML = '';
  layers.forEach((ly,i)=>{
    let row = document.createElement('div');
    row.className = 'layer-row'+(i===activeLayer?' selected':'');
    row.onclick = ()=>setActiveLayer(i);
    let name = ly.type==='text' ? `Text: "${ly.text.substr(0,18)}"` : (ly.name?ly.name:`${ly.type} Layer`);
    let html = `<span class="layer-name">${name}</span>
    <span class="layer-btns">
      <button title="Show/Hide" onclick="event.stopPropagation();toggleHide(${i})">${ly.hidden?'👁‍🗨':'👁'}</button>
      <button title="Lock" onclick="event.stopPropagation();toggleLock(${i})">${ly.locked?'🔒':'🔓'}</button>
      <button title="Duplicate" onclick="event.stopPropagation();duplicateLayer(${i})">⎘</button>
      <button title="Delete" onclick="event.stopPropagation();deleteLayer(${i})">🗑️</button>
    </span>`;
    row.innerHTML = html;
    layersPanel.appendChild(row);
  });
}

// ---- LAYER ACTIONS ----
function setActiveLayer(i) {
  activeLayer = i;
  updateLayerPanel();
  showLayerControls(i);
}
function toggleHide(i) { pushUndo(); layers[i].hidden = !layers[i].hidden; updateLayerPanel(); updateCanvas(); }
function toggleLock(i) { pushUndo(); layers[i].locked = !layers[i].locked; updateLayerPanel(); }
function deleteLayer(i) { pushUndo(); layers.splice(i,1); if(activeLayer>=layers.length) activeLayer=layers.length-1; updateLayerPanel(); updateCanvas(); }
function duplicateLayer(i) {
  pushUndo();
  let ly = JSON.parse(JSON.stringify(layers[i]));
  // Deep copy image if exists
  if(ly.type==='image' && layers[i].img){
    let orig = layers[i].img;
    let img = new Image();
    img.src = orig.src;
    ly.img = img;
  }
  ly.x += 25; ly.y += 25;
  layers.splice(i+1,0,ly);
  setActiveLayer(i+1);
  updateCanvas();
}
function showLayerControls(i) {
  controlsBar.innerHTML = '';
  if(i==null || !layers[i]) return;
  let ly = layers[i], c='';
  if(ly.type==='text') {
    c+=`<label>Text <input type="text" value="${ly.text.replace(/"/g,'&quot;')}" oninput="editProp(${i},'text',this.value)"></label>`;
    c+=`<label>Font <select onchange="editProp(${i},'font',this.value)">${FONT_LIST.map(f=>`<option${ly.font===f?' selected':''}>${f}</option>`)}</select></label>`;
    c+=`<label>Size <input type="number" value="${ly.size}" min="10" max="260" step="2" oninput="editProp(${i},'size',parseInt(this.value))"></label>`;
    c+=`<label>Color <input type="color" value="${ly.color}" oninput="editProp(${i},'color',this.value)"></label>`;
    c+=`<label>Opacity <input type="range" min="0" max="1" step="0.01" value="${ly.opacity}" oninput="editProp(${i},'opacity',parseFloat(this.value))"></label>`;
    c+=`<label>Shadow <input type="checkbox" ${ly.shadow?'checked':''} onchange="editProp(${i},'shadow',this.checked)"></label>`;
    c+=`<label>Rotation <input type="number" value="${(ly.rotation*180/Math.PI).toFixed(1)}" step="1" min="-180" max="180" oninput="editProp(${i},'rotation',parseFloat(this.value)*Math.PI/180)"></label>`;
  } else if(ly.type==='image') {
    c+=`<label>Width <input type="number" value="${ly.width}" min="10" max="${baseWidth}" step="1" oninput="editProp(${i},'width',parseInt(this.value))"></label>`;
    c+=`<label>Height <input type="number" value="${ly.height}" min="10" max="${baseHeight}" step="1" oninput="editProp(${i},'height',parseInt(this.value))"></label>`;
    c+=`<label>Opacity <input type="range" min="0" max="1" step="0.01" value="${ly.opacity}" oninput="editProp(${i},'opacity',parseFloat(this.value))"></label>`;
    c+=`<label>Rotation <input type="number" value="${(ly.rotation*180/Math.PI).toFixed(1)}" step="1" min="-180" max="180" oninput="editProp(${i},'rotation',parseFloat(this.value)*Math.PI/180)"></label>`;
  }
  controlsBar.innerHTML = c;
}
function editProp(i, prop, val) {
  pushUndo();
  layers[i][prop] = val;
  updateCanvas();
}
function editLayerText(e) {
  let idx = activeLayer;
  if(idx==null || layers[idx].type!=='text') return;
  let t = prompt("Edit text:", layers[idx].text);
  if(t!==null) { pushUndo(); layers[idx].text = t; updateCanvas(); updateLayerPanel(); }
}

// ---- INTERACTION: DRAG, RESIZE, ROTATE ----
function pointerDown(e) {
  if(activeLayer==null || layers[activeLayer].locked) return;
  let ly = layers[activeLayer];
  dragging = true;
  lastPointer = getPointerPos(e);
  lastDist = 0; lastAngle = 0; multiTouch = false;
  if(e.pointerType==='touch' && e.touches && e.touches.length===2) {
    multiTouch = true;
    let p1 = getPointerPos(e.touches[0]), p2 = getPointerPos(e.touches[1]);
    lastDist = getDist(p1,p2);
    lastAngle = getAngle(p1,p2);
  }
  canvas.setPointerCapture(e.pointerId);
}
function pointerMove(e) {
  if(!dragging || activeLayer==null || layers[activeLayer].locked) return;
  let ly = layers[activeLayer];
  let p = getPointerPos(e);
  if(multiTouch && e.touches && e.touches.length===2) {
    let p1 = getPointerPos(e.touches[0]), p2 = getPointerPos(e.touches[1]);
    let newDist = getDist(p1,p2), scale = newDist/lastDist;
    let newAngle = getAngle(p1,p2), deltaAngle = newAngle-lastAngle;
    ly.width *= scale; ly.height *= scale;
    ly.rotation += deltaAngle;
    lastDist = newDist; lastAngle = newAngle;
  } else {
    ly.x += p.x - lastPointer.x;
    ly.y += p.y - lastPointer.y;
    lastPointer = p;
  }
  updateCanvas();
}
function pointerUp(e) { dragging = false; multiTouch = false; }

// Helpers
function getPointerPos(e) {
  if(e.touches && e.touches[0]) {
    let rect = canvas.getBoundingClientRect();
    return {x: e.touches[0].clientX-rect.left, y: e.touches[0].clientY-rect.top};
  } else {
    let rect = canvas.getBoundingClientRect();
    return {x: e.clientX-rect.left, y: e.clientY-rect.top};
  }
}
function getDist(p1,p2){ return Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2);}
function getAngle(p1,p2){ return Math.atan2(p2.y-p1.y, p2.x-p1.x);}

// Zoom canvas (Ctrl + wheel)
function canvasZoom(e) {
  if(!e.ctrlKey) return;
  e.preventDefault();
  if(activeLayer==null) return;
  let ly = layers[activeLayer];
  let f = e.deltaY<0 ? 1.1 : 0.91;
  if(ly.type==='text') ly.size = Math.max(12, Math.min(260, ly.size*f));
  if(ly.type==='image') {
    ly.width = Math.max(12, Math.min(baseWidth, ly.width*f));
    ly.height = Math.max(12, Math.min(baseHeight, ly.height*f));
  }
  updateCanvas();
}

// ---- UNDO / REDO ----
function pushUndo() {
  undoStack.push(JSON.stringify({layers, baseImage:null}));
  redoStack = [];
}
function undo() {
  if(!undoStack.length) return;
  redoStack.push(JSON.stringify({layers, baseImage:null}));
  let state = JSON.parse(undoStack.pop());
  layers = state.layers;
  updateLayerPanel(); updateCanvas();
}
function redo() {
  if(!redoStack.length) return;
  undoStack.push(JSON.stringify({layers, baseImage:null}));
  let state = JSON.parse(redoStack.pop());
  layers = state.layers;
  updateLayerPanel(); updateCanvas();
}

// ---- HOTKEYS ----
function keyShortcuts(e) {
  if(e.ctrlKey && e.key==='z') { undo(); }
  if(e.ctrlKey && e.key==='y') { redo(); }
  if(e.key==='Delete' && activeLayer!=null) { deleteLayer(activeLayer); }
  if(e.key==='d' && activeLayer!=null) { duplicateLayer(activeLayer); }
  if(e.key==='ArrowLeft' && activeLayer!=null) { layers[activeLayer].x -= 4; updateCanvas(); }
  if(e.key==='ArrowRight' && activeLayer!=null) { layers[activeLayer].x += 4; updateCanvas(); }
  if(e.key==='ArrowUp' && activeLayer!=null) { layers[activeLayer].y -= 4; updateCanvas(); }
  if(e.key==='ArrowDown' && activeLayer!=null) { layers[activeLayer].y += 4; updateCanvas(); }
}

// ---- EXPORT ----
function downloadStudio() {
  updateCanvas();
  let link = document.createElement('a');
  link.download = 'watermarked.png';
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// ---- PRELOAD BASE IMAGE (for direct upload) ----
window.addEventListener('paste', e=>{
  let items = (e.clipboardData||window.clipboardData).items;
  for(let item of items) {
    if(item.type.indexOf("image")!==-1) {
      let file = item.getAsFile(), img = new Image();
      img.onload = ()=>setBaseImage(img);
      img.src = URL.createObjectURL(file);
      break;
    }
  }
});

// ---- INIT FONT LOADING ----
document.fonts && FONT_LIST.forEach(f=>{
  let font = new FontFace(f, `url(https://fonts.googleapis.com/css?family=${encodeURIComponent(f)})`);
  font.load();
});

// ---- HELPERS: For API/future plugins ----
window.PromptForgeWatermark = {
  addTextLayer, addLogoLayer, addSVG, setBaseImage, downloadStudio,
  getLayers: ()=>layers, setLayers: l=>{layers=l;updateLayerPanel();updateCanvas();},
  undo, redo
};
