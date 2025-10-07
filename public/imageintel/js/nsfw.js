// ImageIntel Pro Lab — nsfw.js
// Thin wrapper around nsfwjs (if present). Safe to disable.
// Place at: public/imageintel/js/nsfw.js

let _model = null;

export async function ensureNSFW(){
  if(typeof window.nsfwjs === 'undefined'){ return null; }
  if(_model) return _model;
  // nsfwjs loads a MobileNet by default from CDN; can swap to local later
  _model = await window.nsfwjs.load();
  return _model;
}

export async function classifyNSFW(imgEl, {enabled=true, topk=3}={}){
  if(!enabled){ return { safe:true, results:[] }; }
  const model = await ensureNSFW();
  if(!model){ return { safe:true, results:[], note:'nsfwjs not loaded' }; }
  const preds = await model.classify(imgEl, topk);
  // Compute a simple safety score
  const flags = ['Hentai','Porn','Sexy'];
  const score = preds.filter(p=>flags.includes(p.className)).reduce((s,p)=>s+p.probability,0);
  return { safe: score < 0.35, score: +score.toFixed(3), results: preds };
}
