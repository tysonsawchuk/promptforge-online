// ImageIntel Pro Lab — helpers.js
// BlackSite core utilities: logging, status HUD, FPS, canvas helpers, MediaPipe loader, ads stub.
// Place this file at: public/imageintel/js/helpers.js

// -----------------------------
// Terminal / Logging
// -----------------------------
let _terminal, _fpsState;

export function boot({ logEl }) {
  _terminal = logEl;
  log('boot', 'ImageIntel BlackSite booting…');
  envReport();
}

export function setVersion(ver) {
  const el = document.querySelector('.ver');
  if (el) el.textContent = ver;
}

export function log(tag, msg, level = 'info') {
  if (!_terminal) return;
  const line = document.createElement('div');
  line.className = 'logline ' + (level === 'error' ? 'err' : level === 'warn' ? 'warn' : 'muted');
  const ts = new Date().toISOString().split('T')[1].replace('Z', '');
  line.textContent = `[${ts}] ${String(tag).padEnd(5, ' ')} | ${msg}`;
  _terminal.appendChild(line);
  _terminal.scrollTop = _terminal.scrollHeight;
}

export function setChip(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function envReport() {
  const caps = [];
  caps.push('WASM:' + (typeof WebAssembly !== 'undefined' ? 'yes' : 'no'));
  caps.push('WebGL:' + (!!document.createElement('canvas').getContext('webgl') ? 'yes' : 'no'));
  const webgpu = navigator.gpu ? 'yes' : 'no';
  caps.push('WebGPU:' + webgpu);
  log('env', `caps ${caps.join(' | ')}`);
}

// -----------------------------
// FPS tracker
// -----------------------------
export function startFPS() {
  _fpsState = { t: performance.now(), frames: 0 };
  const tick = () => {
    _fpsState.frames++;
    const now = performance.now();
    if (now - _fpsState.t >= 1000) {
      const fps = _fpsState.frames;
      setChip('status-fps', `fps: ${fps}`);
      _fpsState.t = now; _fpsState.frames = 0;
    }
    _fpsState.raf = requestAnimationFrame(tick);
  };
  _fpsState.raf = requestAnimationFrame(tick);
}

export function stopFPS() {
  if (_fpsState?.raf) cancelAnimationFrame(_fpsState.raf);
}

// -----------------------------
// Canvas helpers
// -----------------------------
export function getCtx(id) {
  const c = document.getElementById(id);
  const ctx = c.getContext('2d');
  return { c, ctx };
}

export function clearCanvas(c) {
  const ctx = c.getContext('2d');
  ctx.clearRect(0, 0, c.width, c.height);
}

export function sizeOverlayCanvasesTo(el) {
  const w = el.naturalWidth || el.videoWidth || el.clientWidth;
  const h = el.naturalHeight || el.videoHeight || el.clientHeight;
  const ids = ['overlay-objects', 'overlay-seg', 'overlay-pose', 'overlay-face'];
  ids.forEach(id => {
    const c = document.getElementById(id);
    if (!c) return;
    c.width = w; c.height = h;
    c.style.width = '100%'; c.style.height = '100%';
  });
  setChip('status-size', `${w} × ${h}`);
  log('canvas', `resized overlays to ${w}x${h}`);
}

export function drawBoxes(ctx, boxes, labeler) {
  ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(0,255,209,0.85)';
  ctx.font = '12px ui-monospace, monospace'; ctx.fillStyle = 'rgba(0,0,0,0.6)';
  boxes.forEach((b, i) => {
    const [x, y, w, h] = b;
    ctx.strokeRect(x, y, w, h);
    const label = labeler ? labeler(i, b) : '';
    if (label) {
      const pad = 4; const textW = ctx.measureText(label).width + pad * 2; const th = 16;
      ctx.fillRect(x, y - th, textW, th);
      ctx.fillStyle = '#00ffd1';
      ctx.fillText(label, x + pad, y - 4);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
    }
  });
}

export function drawLandmarks(ctx, points, color = 'rgba(0,255,209,0.8)') {
  ctx.fillStyle = color;
  points.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill(); });
}

// -----------------------------
// MediaPipe Tasks Vision dynamic loader (CDN baseUrl)
// -----------------------------
const MP_VERSION = '0.10.15'; // pin for stability
const MP_BUNDLE = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/vision_bundle.mjs`;

export async function loadTasksVision() {
  log('load', `loading MediaPipe Tasks Vision ${MP_VERSION}…`);
  const mod = await import(MP_BUNDLE);
  if (!mod) throw new Error('Failed to import tasks-vision');
  log('load', 'vision bundle loaded');
  return mod; // {FilesetResolver, FaceLandmarker, PoseLandmarker, ImageSegmenter, ObjectDetector, DrawingUtils}
}

export async function createFilesetResolver(mod) {
  // Use CDN so we don't need to upload .wasm files
  const baseUrl = `https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${MP_VERSION}/wasm`;
  const fsr = await mod.FilesetResolver.forVisionTasks({ baseUrl });
  log('load', `fileset resolver ready @ ${baseUrl}`);
  return fsr;
}

// -----------------------------
// Ads hook (no-op if IDs missing)
// -----------------------------
export function loadAds() {
  try {
    const ids = (window.AD_IDS || {});
    if (!ids || Object.keys(ids).length === 0) { log('ads', 'no ad ids configured', 'warn'); return; }
    // Integrate ad network script here if needed.
    log('ads', 'ads initialized');
  } catch (e) { log('ads', e.message, 'error'); }
}
