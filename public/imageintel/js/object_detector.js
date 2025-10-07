// ImageIntel Pro Lab — object_detector.js
// First overlay: MediaPipe ObjectDetector (IMAGE mode, single still image).
// Requires helpers.js (CDN-based FilesetResolver) and the <img id="input"> already on the page.

import { log, setChip, getCtx, drawBoxes, sizeOverlayCanvasesTo, loadTasksVision, createFilesetResolver } from './helpers.js';

let detector = null;
let ready = false;

async function ensureDetector(){
  if(ready) return detector;
  const mod = await loadTasksVision();
  const vision = await createFilesetResolver(mod);
  detector = await mod.ObjectDetector.createFromOptions(vision, {
    baseOptions: {
      // Official example model (uint8 tflite hosted by Google)
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/object_detector/efficientdet_lite0_uint8.tflite'
    },
    runningMode: 'IMAGE',
    scoreThreshold: 0.35,
    maxResults: 12
  });
  ready = true;
  log('load', 'object detector ready');
  setChip('status-models', 'models: object');
  return detector;
}

export async function detectOnImage(imgEl){
  if(!imgEl?.naturalWidth){ log('detect','no image loaded','warn'); return; }
  try{
    await ensureDetector();
    sizeOverlayCanvasesTo(imgEl);
    const { ctx } = getCtx('overlay-objects');
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);

    const dets = detector.detect(imgEl);
    const boxes = [];
    dets.detections?.forEach(d=>{
      const box = d.boundingBox; // {originX, originY, width, height}
      boxes.push([box.originX, box.originY, box.width, box.height]);
    });

    drawBoxes(ctx, boxes, (i, b)=>{
      const d = dets.detections[i];
      const cat = d.categories?.[0];
      const name = cat?.categoryName || 'obj';
      const score = cat ? Math.round(cat.score*100) : 0;
      return `${name} ${score}%`;
    });

    // Update KPI chip
    const names = (dets.detections||[]).map(d=> d.categories?.[0]?.categoryName||'obj');
    document.getElementById('kpi-objects').textContent = `Objects: ${names.length ? names.join(', ') : '—'}`;
    log('detect', `objects: ${names.join(', ')||'none'}`);

    return dets;
  }catch(e){
    log('error', 'object detect failed: '+e.message, 'error');
  }
}

// Auto-wire if page already has the image element
export function wireImageChange(){
  const img = document.getElementById('input');
  if(!img) { log('wire','no #input image','error'); return; }
  // When the image loads, run detection
  img.addEventListener('load', ()=> detectOnImage(img));
  log('wire','object detector bound to #input');
}

// Optional manual trigger (e.g., from a button)
export async function runNow(){
  const img = document.getElementById('input');
  await detectOnImage(img);
}
