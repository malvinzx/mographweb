(()=>{
const $=s=>document.querySelector(s),C=CFG,au=$('#au'),app=$('#app'),stage=$('#stage'),intro=$('#intro'),cv=$('#fx'),g=cv.getContext('2d');
au.src=C.audio;
const an=(el,kf,o)=>el.animate(kf,{duration:1000,easing:'cubic-bezier(.16,1,.3,1)',fill:'both',...o});
// ---- parse LRC
const L=[];LRC.split('\n').forEach(r=>{const m=r.match(/^\[(\d+):(\d+\.\d+)\](.*)/);if(m)L.push({t:+m[1]*60+ +m[2],x:m[3].trim()})});
L.push({t:192,x:'Bleachers'});
let dl=C.delay;try{dl=parseFloat(localStorage.getItem('dl'))||C.delay}catch(e){}

// ---- efek masuk tiap klip (c=huruf, w=kata, t=baris, D=durasi ms)
const FX={
rise:c=>c.forEach((s,i)=>an(s,[{transform:'translateY(90%) rotate(12deg)',opacity:0},{transform:'none',opacity:1}],{duration:900,delay:i*32})),
blur:(c,w)=>w.forEach((s,i)=>an(s,[{transform:'scale(2.8)',filter:'blur(24px)',opacity:0},{transform:'none',filter:'blur(0)',opacity:1}],{duration:1100,delay:i*150})),
flip:(c,w)=>w.forEach((s,i)=>an(s,[{transform:'perspective(600px) rotateX(-95deg) translateY(40%)',opacity:0},{transform:'none',opacity:1}],{duration:1000,delay:i*140})),
split:(c,w)=>w.forEach((s,i)=>an(s,[{transform:`translateX(${i%2?'':'-'}70vw) skewX(${i%2?'-':''}35deg)`,opacity:0},{transform:'none',opacity:1}],{duration:1000,delay:i*110})),
wave:c=>c.forEach((s,i)=>{an(s,[{opacity:0},{opacity:1}],{duration:700,delay:i*30});an(s,[{transform:'translateY(-.12em)'},{transform:'translateY(.12em)'}],{duration:1400,delay:i*90,direction:'alternate',iterations:Infinity,easing:'ease-in-out'})}),
glitch:(c,w,t)=>{an(t,[{transform:'translateX(-4%) skewX(20deg)',opacity:0,clipPath:'inset(40% 0 40% 0)'},{transform:'translateX(3%)',opacity:1,clipPath:'inset(0 0 60% 0)'},{transform:'translateX(-2%)',clipPath:'inset(50% 0 0 0)'},{transform:'none',clipPath:'inset(0)'}],{duration:600,easing:'steps(7)'});t.classList.add('gl')},
outline:c=>c.forEach((s,i)=>an(s,[{color:'transparent',transform:'scale(1.5)',opacity:0},{color:'transparent',transform:'none',opacity:1,offset:.5},{color:'#fff',opacity:1}],{duration:1700,delay:i*40})),
flicker:(c,w,t)=>an(t,[{opacity:0},{opacity:1,offset:.08},{opacity:.1,offset:.14},{opacity:1,offset:.2},{opacity:.3,offset:.26},{opacity:1,offset:.34},{opacity:.8,offset:.6},{opacity:1}],{duration:1700,easing:'linear'}),
burn:(c,w,t)=>{an(t,[{letterSpacing:'.5em',opacity:0,filter:'blur(12px)'},{letterSpacing:'0em',opacity:1,filter:'blur(0)'}],{duration:1800});c.forEach((s,i)=>an(s,[{color:'#fff'},{color:'#ff5a36',textShadow:'0 0 30px #ff5a36'}],{duration:1500,delay:300+i*50}))},
slam:(c,w)=>w.forEach((s,i)=>an(s,[{transform:'scale(7)',opacity:0},{transform:'scale(.92)',opacity:1,offset:.55},{transform:'none',opacity:1}],{duration:700,delay:i*230,easing:'cubic-bezier(.7,0,.2,1)'})),
gold:(c,w,t)=>{an(t,[{transform:'translateY(40px) scale(.9)',opacity:0},{transform:'none',opacity:1}],{duration:1200});w.forEach((s,i)=>an(s,[{backgroundPosition:'200% 0'},{backgroundPosition:'-100% 0'}],{duration:3200,delay:i*120,iterations:Infinity,easing:'linear'}))},
ring:(c,w,t,D)=>{const n=w.length,R=Math.min(innerWidth*.3,360);t.parentNode.style.perspective='900px';w.forEach((s,i)=>s.style.transform=`translate(-50%,-50%) rotateY(${i*360/n}deg) translateZ(${R}px)`);an(t,[{transform:'rotateY(-140deg) scale(.6)',opacity:0},{transform:'rotateY(0) scale(1)',opacity:1,offset:.25},{transform:'rotateY(-200deg)',opacity:1}],{duration:D+1500,easing:'ease-out'})},
call:(c,w,t,D)=>an(t,[{transform:'scale(1.8)',opacity:0,letterSpacing:'.2em'},{transform:'scale(1)',opacity:1,letterSpacing:'0em',offset:.3},{transform:'scale(.55)',opacity:.35}],{duration:D+1000,easing:'ease-out'}),
slow:c=>c.forEach((s,i)=>an(s,[{opacity:0,filter:'blur(10px)',transform:'translateY(-30%)'},{opacity:1,filter:'blur(0)',transform:'none'}],{duration:1400,delay:i*70}))
};
const CYC=['rise','blur','flip','split','glitch','outline','wave'];
const R=[[/merry christmas|not yours/i,'slam'],[/flicker|street ?light|uptight/i,'flicker'],[/burn/i,'burn'],[/golden|magic/i,'gold'],[/carousel|ticket|gaze/i,'ring'],[/call me/i,'call'],[/died slow/i,'slow'],[/haunted/i,'wave']];
const pick=(x,i)=>{for(const[r,k]of R)if(r.test(x))return k;return CYC[i%CYC.length]};

function fit(t){if(t.classList.contains('v-ring'))return;let f=parseFloat(getComputedStyle(t).fontSize),n=0;while((t.scrollWidth>t.clientWidth+1||t.offsetHeight>innerHeight*.6)&&n++<14){f*=.9;t.style.fontSize=f+'px'}}
const mk=(tag,cls)=>{const e=document.createElement(tag);e.className=cls;return e};

const far=$('#far'),near=$('#near'),lamp=$('.lamp');
const ID={flick:[[{opacity:.25},{opacity:.6,offset:.1},{opacity:.1,offset:.16},{opacity:.6,offset:.3},{opacity:.4,offset:.6},{opacity:.6}],{duration:1800,easing:'linear'}],spin:[[{transform:'rotate(0)'},{transform:'rotate(360deg)'}],{duration:14000,easing:'linear'}],sway:[[{transform:'rotate(-6deg)'},{transform:'rotate(6deg)'}],{duration:2600,direction:'alternate',easing:'ease-in-out'}],pulse:[[{transform:'scale(1)'},{transform:'scale(1.1)'}],{duration:800,direction:'alternate',easing:'ease-in-out'}],bob:[[{transform:'translateY(-4%)'},{transform:'translateY(4%)'}],{duration:2200,direction:'alternate',easing:'ease-in-out'}]};
function ob(n,s,j){const[d0,id]=OB[n],e=mk('div','ob');
 e.innerHTML=`<svg viewBox="0 0 100 100">${d0.replace(/<(path|circle|rect)/g,'<$1 pathLength="1"')}</svg>`;e.style.width=s;
 const v=e.firstChild;v.querySelectorAll('path,circle,rect').forEach((p,q)=>an(p,[{strokeDashoffset:1},{strokeDashoffset:0}],{duration:1500,delay:j*150+q*90,easing:'ease-out'}));
 an(v,[{opacity:0,transform:'scale(.7) translateY(10%)'},{opacity:1,transform:'none'}],{duration:1400,delay:j*150});
 const[kf,o]=ID[id];an(e,kf,{iterations:Infinity,delay:j*200,...o});return e}
function objs(x,i,c){
 const o=OM.find(m=>m[0].test(x)),n=o?o[1]:[['star','figure','clock'][i%3],'star'],fo=mk('div','grp'),no=mk('div','grp');
 c.g=[fo,no];far.append(fo);near.append(no);
 const a=ob(n[0],'clamp(150px,36vw,440px)',0);a.style.left=i%2?'4%':'auto';a.style.right=i%2?'auto':'4%';fo.append(a);
 for(let j=0;j<3;j++){const b=ob(n[1],'clamp(44px,9vw,110px)',j+1);b.classList.add('mini');b.style.left=(j%2?66+Math.random()*22:4+Math.random()*20)+'%';b.style.top=(8+Math.random()*72)+'%';no.append(b)}}
// ---- kamera halus (pegas) + parallax
const K={x:0,y:0,z:1,r:0},T={x:0,y:0,z:1,r:0},S={k:3.5,e:0,d:1000},Q=['x','y','z','r'];let sh=0,lt=performance.now(),B=[];
const ez=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
function shot(n,d){const s=SH[n];S.a=s.a;S.b=s.b;S.e=0;S.d=d;S.k=n==6?9:3.5;Q.forEach((q,j)=>T[q]=s.a[j])}
function camStep(now){const dt=Math.min((now-lt)/1000,.05);lt=now;
 if(S.a){if(playing)S.e+=dt*1000;const e=ez(Math.min(S.e/S.d,1));Q.forEach((q,j)=>T[q]=S.a[j]+(S.b[j]-S.a[j])*e)}
 const k=1-Math.exp(-dt*S.k);for(const q of Q)K[q]+=(T[q]-K[q])*k;
 sh*=Math.exp(-dt*5);const X=K.x*innerWidth+Math.sin(now/22)*sh*14,Y=K.y*innerHeight+Math.cos(now/17)*sh*14;
 const f=q=>`translate(${X*q}px,${Y*q}px) rotate(${K.r*q}deg) scale(${1+(K.z-1)*q})`;
 stage.style.transform=f(1);far.style.transform=f(.5);near.style.transform=f(1.7);lamp.style.transform=f(.25)}
// ---- efek per lirik
const flash=(c,a,ms)=>{const f=$('#flash');f.style.background=c;an(f,[{opacity:0},{opacity:a,offset:.12},{opacity:0}],{duration:ms,easing:'ease-out'})};
const EFN={f:()=>flash(col,.35,700),s:()=>{sh=1},b:()=>{for(let i=0;i<40;i++){const a=Math.random()*6.28,v=2+Math.random()*6;B.push({x:cv.width/2,y:cv.height/2,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1})}},d:()=>flash('#000',.6,2200)};
function build(k,i){
 const x=L[k].x,D=Math.min(Math.max((L[k+1]?L[k+1].t:L[k].t+4)-L[k].t,1.5),7)*1000,v=pick(x,i);
 const c=mk('div','clip'),m=mk('div','cam'),t=mk('div','t v-'+v),gh=mk('b','ghost'),rg=mk('u','ring'),br=mk('s','bar');
 const W=x.split(' ').map(w=>{const s=mk('span','w');s.innerHTML=[...w].map(h=>`<i>${h}</i>`).join('');t.append(s,' ');return s});
 gh.textContent=x.split(' ').sort((a,b)=>b.length-a.length)[0].replace(/[^\w']/g,'');
 br.style.top=(15+(i*37)%70)+'%';br.style.transformOrigin=i%2?'0 50%':'100% 50%';
 m.append(gh,rg,br,t);c.append(m);stage.append(c);fit(t);
 FX[v]([...t.querySelectorAll('i')],W,t,D);
 objs(x,i,c);shot(SM[v]??[0,1,2,3,4,5,7][i%7],D+800);for(const[r,f]of EF)if(r.test(x)){[...f].forEach(h=>EFN[h]());break}
 an(gh,[{transform:'translateX(10%)',opacity:0},{opacity:.1,offset:.2},{transform:'translateX(-10%)',opacity:.06}],{duration:D+1500,easing:'linear'});
 an(rg,[{transform:'translate(-50%,-50%) scale(0)',opacity:.7},{transform:'translate(-50%,-50%) scale(1.15)',opacity:0}],{duration:1600});
 an(br,[{transform:'scaleX(0)',opacity:1},{transform:'scaleX(1)',opacity:1,offset:.5},{transform:'scaleX(1)',opacity:0}],{duration:1400});
}
const XS=[{transform:'translateY(-12vh)'},{transform:'scale(1.3)'},{transform:'scale(.8) rotate(-3deg)'},{transform:'translateX(10vw) skewX(-8deg)'}];
const leave=(c,i)=>{c.classList.add('out');[c,...(c.g||[])].forEach(e=>{an(e,[{opacity:1,filter:'blur(0)'},{opacity:0,filter:'blur(16px)',...XS[i%4]}],{duration:700,easing:'ease-in'}).onfinish=()=>e.remove()})};
const show=k=>{stage.querySelectorAll('.clip:not(.out)').forEach(c=>leave(c,k));if(k>=0&&L[k].x)build(k,k)};

// ---- partikel: salju turun / bara naik
let P=[],up=0,upT=0,col='#cfe3ff';
const sp=()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:Math.random()*2.2+.6,v:Math.random()*.6+.3,p:Math.random()*6.28});
function size(){cv.width=innerWidth;cv.height=innerHeight;const n=Math.round(innerWidth/13);while(P.length<n)P.push(sp());P.length=n}
function draw(){g.clearRect(0,0,cv.width,cv.height);up+=(upT-up)*.02;g.fillStyle=col;
 for(const p of P){p.p+=.01;p.y+=p.v*(1-2*up)*1.4;p.x+=Math.sin(p.p)*.5+up*.3;if(p.y>cv.height+5)p.y=-5;if(p.y<-5)p.y=cv.height+5;g.globalAlpha=.25+.5*Math.abs(Math.sin(p.p*(1+up*3)));g.beginPath();g.arc(p.x,p.y,p.r*(1+up),0,6.283);g.fill()}
 for(let i=B.length;i--;){const b=B[i];b.x+=b.vx;b.y+=b.vy;b.vy+=.08;b.vx*=.985;b.l-=.012;if(b.l<=0){B.splice(i,1);continue}g.globalAlpha=b.l;g.fillRect(b.x,b.y,3,3)}}

// ---- jam & kontrol
let playing=false,t0=0,off=0,useAu=false,cur=-2,sc=-1,idle;
const clock=()=>useAu?au.currentTime:off+(playing?(performance.now()-t0)/1000:0);
const ui=()=>{document.body.classList.toggle('playing',playing);$('#pp').textContent=playing?'❚❚ Jeda':'▶ Putar'};
async function play(){const c=clock();try{au.currentTime=c;await au.play();useAu=true}catch(e){useAu=false;off=c}t0=performance.now();playing=true;ui()}
function pause(){if(useAu)au.pause();else off=clock();playing=false;ui()}
function seek(r){const T=Math.max(0,Math.min(r,1))*C.end;if(useAu)au.currentTime=T;else{off=T;t0=performance.now()}cur=-2}
function setDl(v){dl=Math.round(v*10)/10;$('#dv').textContent=(dl>0?'+':'')+dl.toFixed(1)+'s';try{localStorage.setItem('dl',dl)}catch(e){}cur=-2}
function finish(){pause();off=0;if(useAu)au.currentTime=0;cur=-2;sc=-1;show(-1);S.a=0;Object.assign(T,{x:0,y:0,z:1,r:0});$('#go').textContent='↻ Putar lagi';intro.classList.remove('off')}
function upd(){
 const T=clock(),t=T-dl;let k=-1;while(k+1<L.length&&L[k+1].t<=t)k++;
 if(k!==cur){cur=k;show(k)}
 let s=0;C.scenes.forEach((x,i)=>{if(t>=x[0])s=i});
 if(s!==sc){sc=s;const x=C.scenes[s];app.style.setProperty('--a',x[1]);app.style.setProperty('--b',x[2]);app.style.setProperty('--c',x[3]);col=x[3];upT=x[4]}
 $('#bar').style.transform=`scaleX(${Math.min(T/C.end,1)})`;
 if(T>=C.end)finish();
}
const frame=n=>{draw();camStep(n||performance.now());if(playing)upd();requestAnimationFrame(frame)};

$('#go').onclick=()=>{intro.classList.add('off');play()};
$('#pp').onclick=()=>playing?pause():play();
$('#rs').onclick=()=>{seek(0);playing||play()};
$('#dm').onclick=()=>setDl(dl-.1);$('#dp').onclick=()=>setDl(dl+.1);
$('#fs').onclick=()=>document.fullscreenElement?document.exitFullscreen():app.requestFullscreen&&app.requestFullscreen();
$('#mf').onchange=e=>{const f=e.target.files[0];if(!f)return;if(playing)pause();au.src=URL.createObjectURL(f);useAu=false;off=0;seek(0)};
$('#prog').onclick=e=>{const r=e.currentTarget.getBoundingClientRect();seek((e.clientX-r.left)/r.width)};
document.addEventListener('click',e=>e.target.blur&&e.target.blur());
addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();(intro.classList.contains('off')?$('#pp'):$('#go')).click()}if(e.code==='ArrowLeft')setDl(dl-.1);if(e.code==='ArrowRight')setDl(dl+.1)});
const wake=()=>{document.body.classList.remove('idle');clearTimeout(idle);idle=setTimeout(()=>document.body.classList.add('idle'),2600)};
['pointermove','pointerdown','keydown'].forEach(e=>addEventListener(e,wake));
addEventListener('resize',size);
size();setDl(dl);wake();frame();
})();
