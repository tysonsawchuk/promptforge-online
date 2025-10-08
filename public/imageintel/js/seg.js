// public/imageintel/js/seg.js
// MediaPipe ImageSegmenter (selfie/person) — draws alpha person mask + stats.
let SEG = null;


export async function ensureSeg(mp, fsr, diagRow){
if(SEG) return SEG;
try{
SEG = await mp.ImageSegmenter.createFromOptions(fsr, {
baseOptions:{ modelAssetPath:'https://storage.googleapis.com/mediapipe-assets/selfie_segmenter.tflite' },
runningMode:'IMAGE', outputCategoryMask:true
});
diagRow && diagRow('ImageSegmenter', true, 'ready');
}catch(e){ diagRow && diagRow('ImageSegmenter', false, e.message); throw e; }
return SEG;
}


export async function runSeg(ctx, img, {enabled=true, opacity=0.35}={}){
ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
if(!enabled || !img?.naturalWidth) return {isolated:false};
const W=ctx.canvas.width, H=ctx.canvas.height;
const res = await SEG.segment(img);
if(!res?.categoryMask) return {isolated:false};
const mask = res.categoryMask.getAsFloat32Array();
const out = ctx.createImageData(W,H);
const data = out.data;
let minX=W, minY=H, maxX=0, maxY=0, count=0;
for(let i=0,px=0;i<mask.length;i++,px+=4){
const v = mask[i];
if(v>0.5){
const y = Math.floor(i/W), x = i - y*W;
if(x<minX) minX=x; if(x>maxX) maxX=x; if(y<minY) minY=y; if(y>maxY) maxY=y; count++;
data[px] = 0; data[px+1] = 255; data[px+2] = 209; data[px+3] = Math.min(255, v*255*opacity);
} else {
data[px+3] = 0;
}
}
ctx.putImageData(out,0,0);
const bbox = (count>0)? [minX,minY, Math.max(0,maxX-minX), Math.max(0,maxY-minY)] : [0,0,0,0];
return { isolated: count>W*H*0.02, bbox, areaPx: count, heightPx: bbox[3] };
}
