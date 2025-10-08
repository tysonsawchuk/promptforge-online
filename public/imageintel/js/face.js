// public/imageintel/js/face.js
// MediaPipe FaceLandmarker overlay — draws dense landmarks + eyes/iris, computes angles.
let FACE = null;


const IDX = {
NOSE_TIP: 1,
LEFT_EYE_OUT: 33, RIGHT_EYE_OUT: 263,
LEFT_EYE_UP: 159, LEFT_EYE_LOW: 145,
RIGHT_EYE_UP: 386, RIGHT_EYE_LOW: 374,
MOUTH_CENTER: 13,
IRIS_L_CENTER: 468, IRIS_R_CENTER: 473,
IRIS_L_RIM: [469,470,471,472], IRIS_R_RIM: [474,475,476,477],
FACE_OVAL: [10,338,297,332,284,251,389,356,454,323,361,288,397,365,379,378,400,377,152,148,176,149,150,136,172,58,132,93,234,127,162,21,54,103,67,109] // outline
};


function toPx(p, W, H){ return { x: (p.x<=1? p.x*W : p.x), y: (p.y<=1? p.y*H : p.y) }; }


export async function ensureFace(mp, fsr, diagRow){
if (FACE) return FACE;
try {
FACE = await mp.FaceLandmarker.createFromOptions(fsr, {
baseOptions:{ modelAssetPath:'https://storage.googleapis.com/mediapipe-assets/face_landmarker.task' },
runningMode:'IMAGE', numFaces:1,
outputFaceBlendshapes:false, outputFacialTransformationMatrixes:false
});
diagRow && diagRow('FaceLandmarker', true, 'ready');
} catch(e){ diagRow && diagRow('FaceLandmarker', false, e.message); throw e; }
return FACE;
}


function drawPolyline(ctx, pts, W, H){
ctx.beginPath();
pts.forEach((i,k)=>{ const p=toPx(i,W,H); if(k===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y); });
ctx.stroke();
}


function drawIris(ctx, center, rim, W, H){
const c = toPx(center, W, H);
const r = rim.map(p=>toPx(p,W,H));
const rx = Math.hypot(r[0].x-c.x, r[0].y-c.y);
ctx.beginPath(); ctx.arc(c.x,c.y,rx||1.5,0,Math.PI*2); ctx.stroke();
}


function faceAngles(L){
if(!L||!L[0]) return {yaw:0,pitch:0,roll:0,tag:null,eye:null};
const P=L[0];
const eyeL=P[IDX.LEFT_EYE_OUT], eyeR=P[IDX.RIGHT_EYE_OUT];
const nose=P[IDX.NOSE_TIP], mouth=P[IDX.MOUTH_CENTER];
const midX=(eyeL.x+eyeR.x)/2, midY=(eyeL.y+eyeR.y)/2;
const roll = Math.atan2( (eyeR.y-eyeL.y), (eyeR.x-eyeL.x) )*180/Math.PI;
const yawRaw = (nose.x-midX); // -left +right
const yaw = yawRaw*180; // heuristic scale
const pitch = ((nose.y-midY)-(mouth.y-midY))*120;
const tag = Math.abs(yawRaw)>0.45? 'profile' : Math.abs(yawRaw)>0.22? '3/4' : 'frontal';
const ipd = Math.hypot(eyeR.x-eyeL.x, eyeR.y-eyeL.y) || 1;
const openL = Math.abs(P[IDX.LEFT_EYE_UP].y - P[IDX.LEFT_EYE_LOW].y)/ipd;
const openR = Math.abs(P[IDX.RIGHT_EYE_UP].y - P[IDX.RIGHT_EYE_LOW].y)/ipd;
const openness = (openL+openR)/2;
const eye = openness>0.08? 'eyes open' : 'eyes likely closed';
return {yaw, pitch, roll, tag, eye};
}


export async function runFace(ctx, img, {enabled=true}={}){
ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
if(!enabled || !img?.naturalWidth) return { tag:null };
const W=ctx.canvas.width, H=ctx.canvas.height;
const res = await FACE.detect(img);
const L = res.faceLandmarks;
if(!L||!L[0]) return { tag:null };
const P=L[0];
ctx.lineWidth=1.5; ctx.strokeStyle='rgba(0,255,209,.85)'; ctx.fillStyle='rgba(0,255,209,.9)';
// dense points (gives "mesh" look without heavy tesselation array)
for(let i=0;i<P.length;i++){ const p=toPx(P[i],W,H); ctx.beginPath(); ctx.arc(p.x,p.y,1.6,0,Math.PI*2); ctx.fill(); }
// face oval
drawPolyline(ctx, IDX.FACE_OVAL.map(i=>toPx(P[i],W,H)), W, H);
// eyes + irises
drawIris(ctx, P[IDX.IRIS_L_CENTER], IDX.IRIS_L_RIM.map(i=>P[i]), W, H);
drawIris(ctx, P[IDX.IRIS_R_CENTER], IDX.IRIS_R_RIM.map(i=>P[i]), W, H);
const ang = faceAngles(L);
return { tag: ang.tag, angles: ang, eye: ang.eye };
}
