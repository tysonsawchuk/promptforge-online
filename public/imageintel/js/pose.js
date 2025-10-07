// ImageIntel Pro Lab — pose.js
// MediaPipe PoseLandmarker (IMAGE mode) with draw utilities for skeleton + landmarks.
// Uses CDN Tasks Vision (no local WASM needed).

const MP_VERSION = '0.10.15';
let pose = null;
let drawingUtils = null;

function log(msg){
  const t = document.getElementById('terminal');
  if(!t) return;
  const line = document.createElement('div');
  const ts = new Date().toISOString().split('T')[1].replace('Z','');
  line.className = 'muted';
  line.textContent = `[${ts}] pose  | ${msg}`;
  t.appendChild(line);
  t.scrollTop = t.scrollHeight;
}

function sizeOverlaysTo(el){
  const w = el.naturalWidth||el.clientWidth, h = el.naturalHeight||el.clientHeight;
  ['overlay-objects','overlay-seg','overlay-pose','overlay-face'].forEach(id=>{
    const c=document.getElementById(id); if(!c) return;
    c.width=w; c.height=h; c.style.width='100%'; c.style.height='100%';
  });
  const chip = document.getElementById('status-size');
  if(chip) chip.textContent = `${w} × ${h}`;
}

async function ensurePose(){
  if(pose) return pose;
  const mod = await import(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/vision_bundle.mjs`);
  const fsr = await mod.FilesetResolver.forVisionTasks({
    baseUrl: `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`
  });
  // lightweight drawing utils
  drawingUtils = new mod.DrawingUtils(document.createElement('canvas').getContext('2d'));
  pose = await mod.PoseLandmarker.createFromOptions(fsr, {
    baseOptions: {
      // Google-hosted models: full or lite — choose lite for speed
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-assets/pose_landmarker_lite.task'
    },
    runningMode: 'IMAGE',
    numPoses: 1,
    minPoseDetectionConfidence: 0.3,
    minPosePresenceConfidence: 0.3,
    minTrackingConfidence: 0.3,
    outputSegmentationMasks: false
  });
  const mchip = document.getElementById('status-models');
  if(mchip) mchip.textContent = 'models: object, pose';
  log('pose model ready');
  const d=document.getElementById('diag'); if(d){
    const row=document.createElement('div');
    row.innerHTML=`<span class="ok">✔</span> <b>PoseLandmarker</b> — <span class="muted">ready</span>`;
    d.appendChild(row);
  }
  return pose;
}

// draw skeleton using landmark connections from MediaPipe
const EDGES = [
  // arms
  [11,13],[13,15],[12,14],[14,16],
  // shoulders-hips
  [11,12],[11,23],[12,24],[23,24],
  // legs
  [23,25],[25,27],[24,26],[26,28],
  // feet
  [27,29],[29,31],[28,30],[30,32]
];

function drawPose(ctx, landmarks){
  if(!landmarks || landmarks.length===0) return;
  const pts = landmarks[0]; // first (primary) person
  // lines
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(0,255,209,0.85)';
  ctx.beginPath();
  EDGES.forEach(([a,b])=>{
    const p = pts[a], q = pts[b];
    if(!p || !q) return;
    ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
  });
  ctx.stroke();
  // points
  ctx.fillStyle = 'rgba(0,255,209,0.9)';
  pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, Math.PI*2); ctx.fill(); });
}

export async function poseOnImage(imgEl){
  if(!imgEl?.naturalWidth) { log('no image'); return null; }
  await ensurePose();
  sizeOverlaysTo(imgEl);
  const ctx = document.getElementById('overlay-pose').getContext('2d');
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

  const res = pose.detect(imgEl); // {landmarks: Array<Array<{x,y,z,visibility}>>}
  drawPose(ctx, res.landmarks);

  // basic pose angle readout (shoulder line and hip tilt)
  let poseText = '—';
  if(res.landmarks && res.landmarks[0]){
    const L = res.landmarks[0];
    const line = (a,b)=>Math.atan2(L[b].y - L[a].y, L[b].x - L[a].x) * 180/Math.PI;
    const shoulder = Math.round(line(11,12));
    const hip = Math.round(line(23,24));
    poseText = `shoulder ${shoulder}°, hip ${hip}°`;
  }
  const k = document.getElementById('kpi-pose'); if(k) k.textContent = `Pose: ${poseText}`;
  log('pose drawn');
  return res;
}
