(function(){
var C = window.GAME_CONFIG;
if(!C) return;

// === STYLES ===
var fonts = {
  gold: "https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Philosopher&display=swap",
  modern: "https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap",
  soft: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap",
  neon: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap"
};
var bodyFonts = {gold:"'Philosopher',sans-serif",modern:"'Inter',sans-serif",soft:"'Nunito',sans-serif",neon:"'Orbitron',sans-serif"};
var btnCSS = {
  gold:{btn:"display:block;width:100%;padding:15px;margin:10px 0;background:#111;border:1px solid #d4af37;font-family:'Cinzel Decorative',cursive;font-size:18px;cursor:pointer;transition:0.3s;",hover:"background:#fcc201;color:#000;"},
  modern:{btn:"display:block;width:100%;padding:16px;margin:10px 0;background:#fff;border:none;font-family:'Inter',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:0.3s;border-radius:4px;text-transform:uppercase;letter-spacing:2px;",hover:"background:#e0e0e0;color:#000;"},
  soft:{btn:"display:block;width:100%;padding:16px;margin:10px 0;background:rgba(255,255,255,0.15);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.25);font-family:'Nunito',sans-serif;font-size:17px;font-weight:700;cursor:pointer;transition:0.3s;border-radius:50px;",hover:"background:rgba(255,255,255,0.3);"},
  neon:{btn:"display:block;width:100%;padding:16px;margin:10px 0;background:transparent;border:2px solid #0ff;font-family:'Orbitron',sans-serif;font-size:16px;font-weight:700;cursor:pointer;transition:0.3s;border-radius:6px;text-transform:uppercase;letter-spacing:3px;text-shadow:0 0 10px #0ff;box-shadow:0 0 15px rgba(0,255,255,0.2);",hover:"background:#0ff;color:#000;text-shadow:none;box-shadow:0 0 30px rgba(0,255,255,0.5);"}
};
var accents={gold:{a:"#fcc201",b:"#d4af37",d:"#111"},modern:{a:"#ffffff",b:"#555",d:"#222"},soft:{a:"#ffffff",b:"rgba(255,255,255,0.3)",d:"rgba(255,255,255,0.1)"},neon:{a:"#00ffff",b:"#0ff",d:"transparent"}};
var titleCSS={gold:"font-family:'Cinzel Decorative',cursive;",modern:"font-family:'Inter',sans-serif;font-weight:900;text-transform:uppercase;letter-spacing:4px;",soft:"font-family:'Nunito',sans-serif;font-weight:900;",neon:"font-family:'Orbitron',sans-serif;font-weight:900;text-shadow:0 0 20px #0ff;"};

var s = C.style || 'gold';
var ac = accents[s] || accents.gold;
var bf = bodyFonts[s] || bodyFonts.gold;
var bc = btnCSS[s] || btnCSS.gold;
var tc = titleCSS[s] || titleCSS.gold;

// Build lives
var livesCount = C.lives || 3;
var ankhsHTML = '';
if(C.livesIcon){
  for(var i=0;i<livesCount;i++) ankhsHTML+='<span class="ankh"><img src="'+C.livesIcon+'" style="width:40px;height:40px;object-fit:contain"></span>';
} else {
  for(var i=0;i<livesCount;i++) ankhsHTML+='<span class="ankh">☥</span>';
}
var stepsHTML='';
for(var i=0;i<C.questions.length;i++) stepsHTML+='<div class="step"></div>';

// Font link
var link=document.createElement('link');link.rel='stylesheet';link.href=fonts[s]||fonts.gold;document.head.appendChild(link);

// Styles
var style=document.createElement('style');
style.textContent=`
body,html{margin:0;padding:0;background:#000;height:100vh;width:100vw;overflow:hidden;font-family:${bf};color:${ac.a}}
.tomb{position:relative;width:100vw;height:100vh;${C.bgImg?`background:url('${C.bgImg}') center/cover no-repeat`:'background:#1a1206'};display:flex;flex-direction:column;align-items:center}
.ui-top{position:absolute;top:20px;width:100%;display:flex;flex-direction:column;gap:15px;align-items:center;z-index:100}
.lives{display:flex;gap:20px}
.ankh{font-size:45px;color:${ac.a};text-shadow:0 0 15px ${ac.a};transition:0.8s;display:inline-flex;align-items:center;justify-content:center}
.ankh img{filter:drop-shadow(0 0 8px ${ac.a})}
.ankh.lost{opacity:0;transform:scale(0.5) translateY(50px);filter:blur(5px)}
.progress-container{display:flex;gap:8px}
.step{width:35px;height:12px;border:2px solid ${ac.b};background:rgba(0,0,0,0.8);transition:0.6s}
.step.active{background:${ac.a};box-shadow:0 0 20px ${ac.a}}
.scarab-wrap{position:absolute;width:90px;height:90px;z-index:10;transition:transform .1s linear;cursor:pointer}
.scarab-img{width:100%;height:100%;${C.charImg?`background:url('${C.charImg}') center/contain no-repeat`:`background:${ac.a};border-radius:50%`};filter:drop-shadow(0 0 10px ${ac.a})}
.wings-motion{animation:flap .3s infinite ease-in-out}
@keyframes flap{0%,100%{transform:scale(1)}50%{transform:scale(1.05);filter:brightness(1.2)}}
#countdown-box{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:${bf};font-size:180px;color:${ac.a};text-shadow:0 0 30px ${ac.a};z-index:3000;pointer-events:none;display:none;font-weight:900}
.count-anim{animation:countZoom .8s ease-out forwards}
@keyframes countZoom{0%{transform:translate(-50%,-50%) scale(0.3) rotate(-5deg);opacity:0;filter:brightness(3) blur(15px)}50%{transform:translate(-50%,-50%) scale(1.1);opacity:1;filter:brightness(1.5) blur(0)}100%{transform:translate(-50%,-50%) scale(1.8) rotate(5deg);opacity:0;filter:brightness(1)}}
#start-screen{position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,${C.overlayOpacity||0.6});display:flex;flex-direction:column;justify-content:center;align-items:center;z-index:4000}
.tablet{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0.8);width:90%;max-width:450px;background:${C.panelBg||'rgba(0,0,0,0.95)'};border:2px solid ${ac.b};padding:30px;text-align:center;z-index:1000;opacity:0;visibility:hidden;transition:opacity .4s ease,transform .4s ease,visibility .4s;border-radius:12px}
.tablet.active{opacity:1;visibility:visible;transform:translate(-50%,-50%) scale(1)}
.tablet.finale{transition:opacity 1.4s cubic-bezier(0.22,1,0.36,1),transform 1.4s cubic-bezier(0.22,1,0.36,1),visibility 0s}
.choice-btn{${bc.btn}color:${C.textColor||'#fff'} !important}
.choice-btn:hover{${bc.hover}}
.answer-input{width:100%;padding:14px;margin:10px 0;background:${ac.d};border:2px solid ${ac.b};color:${C.textColor||'#fff'};font-family:${bf};font-size:20px;text-align:center;border-radius:8px;outline:none}
.answer-input:focus{border-color:${ac.a};box-shadow:0 0 15px ${ac.a}44}
.shock-hit{filter:brightness(0) invert(1) drop-shadow(0 0 50px #00ffff)!important;animation:shockAnim 1.2s forwards;pointer-events:none}
@keyframes shockAnim{0%{transform:scale(1)}10%,30%,50%{transform:translate(15px,-15px)}20%,40%,60%{transform:translate(-15px,15px)}100%{transform:scale(0);opacity:0;filter:blur(30px)}}
.vol-ctrl{position:absolute;bottom:15px;right:15px;z-index:5000;display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.7);padding:8px 14px;border-radius:20px;border:1px solid ${ac.b}44}
.vol-ctrl label{font-size:14px;cursor:default}
.vol-ctrl input[type=range]{width:80px;accent-color:${ac.a}}
.game-logo{position:absolute;bottom:12px;left:12px;z-index:5000;display:flex;align-items:center;gap:8px;background:rgba(0,0,0,0.5);padding:6px 12px 6px 6px;border-radius:20px;text-decoration:none}
.game-logo img{width:28px;height:28px;object-fit:contain;border-radius:4px}
.game-logo span{font-size:9px;color:rgba(255,255,255,0.7);font-family:sans-serif;line-height:1.3}
`;
document.head.appendChild(style);

// Logo HTML
var logoHTML = '';
if(C.showLogo !== false) {
  logoHTML = '<div class="game-logo"><img src="https://raw.githubusercontent.com/VeRa422/Catch-Quiz/main/logo.png" alt=""><span>© 2026 Игровой Квартал<br>Все права защищены</span></div>';
}

// HTML
document.body.innerHTML=`
<div class="tomb" id="stage">
<div id="start-screen">
<h1 style="${tc}font-size:clamp(32px,8vw,60px);text-shadow:0 0 20px ${ac.a};margin-bottom:20px;color:${ac.a};padding:0 20px;text-align:center">${C.title||'Catch & Quiz'}</h1>
<button class="choice-btn" id="init-btn" style="max-width:300px">${C.startBtn||'START'}</button>
</div>
<div id="countdown-box"></div>
<div class="ui-top">
<div class="progress-container">${stepsHTML}</div>
<div class="lives" id="lives-box">${ankhsHTML}</div>
</div>
<div class="tablet" id="tablet">
<h2 style="${tc}color:${C.textColor||'#fff'};opacity:0.7">${C.riddleHeader||'RIDDLE'}</h2>
<p id="q-text" style="font-size:2.2em;margin:20px 0;color:${C.textColor||'#fff'}"></p>
<div id="options"></div>
</div>
<div class="vol-ctrl">
<label>🔊</label>
<input type="range" id="vol-slider" min="0" max="100" value="${Math.round((C.volume||0.8)*100)}" oninput="masterVol=this.value/100;if(window._lastAudio)window._lastAudio.volume=masterVol">
</div>
${logoHTML}
</div>`;

// === GAME LOGIC ===
var masterVol=C.volume||0.8;
var questions=C.questions;
var currentIdx=0;
var lives=livesCount;
var SPEED=C.speed||1.5;
var COUNTDOWN=C.countdown!==false;
var soundURLs=C.sounds||{};
var VICTORY_MSG=C.victoryMsg||'VICTORY!';
var REPLAY_WIN=C.replayWin||'REPLAY';
var GAMEOVER_MSG=C.gameOverTitle||'GAME OVER';
var REPLAY_BTN=C.replayBtn||'TRY AGAIN';
var TXT_CONTINUE=C.txtContinue||'Continue ➜';
var TXT_SUBMIT=C.txtSubmit||'Submit ✓';
var TXT_PLACEHOLDER=C.txtPlaceholder||'Type your answer...';

function playSfx(key,cb){
try{var a=new Audio(soundURLs[key]);a.volume=masterVol;window._lastAudio=a;
if(cb){var done=false;function fire(){if(!done){done=true;cb()}}
a.addEventListener('playing',fire,{once:true});a.addEventListener('error',fire,{once:true});setTimeout(fire,3000)}
a.play().catch(function(){if(cb)cb()});}catch(e){if(cb)cb()}}

document.getElementById('init-btn').onclick=function(){
document.getElementById('start-screen').style.display='none';
if(COUNTDOWN){playSfx('intro');startCountdown()}else{createScarab()}};

function startCountdown(){
var box=document.getElementById('countdown-box');var seq=['3','2','1','GO!'];box.style.display='block';var i=0;
function next(){if(i<seq.length){box.innerText=seq[i];box.classList.remove('count-anim');void box.offsetWidth;box.classList.add('count-anim');i++;setTimeout(next,800)}
else{box.style.display='none';createScarab()}}next()}

function createScarab(){
var wrap=document.createElement('div');wrap.className='scarab-wrap';
var img=document.createElement('div');img.className='scarab-img wings-motion';
wrap.appendChild(img);document.getElementById('stage').appendChild(wrap);
var x=Math.random()*(window.innerWidth-100),y=Math.random()*(window.innerHeight-300)+150;
var angle=Math.random()*Math.PI*2,speed=SPEED,flip=1,noise=Math.random()*100;
function drive(){if(wrap.dataset.stop==="true")return;noise+=0.02;angle+=Math.sin(noise)*0.03;
x+=Math.cos(angle)*speed;y+=Math.sin(angle)*speed;
var margin=90,topLimit=110;
if(x<0){angle=0;flip=1;x=1}else if(x>window.innerWidth-margin){angle=Math.PI;flip=-1;x=window.innerWidth-margin-1}
if(y<topLimit){angle=Math.PI/2;y=topLimit+1}else if(y>window.innerHeight-margin){angle=-Math.PI/2;y=window.innerHeight-margin-1}
wrap.style.left=x+'px';wrap.style.top=y+'px';wrap.style.transform='rotate('+(angle+1.57)+'rad)';
img.style.transform='scaleX('+flip+')';requestAnimationFrame(drive)}drive();
wrap.onclick=function(){playSfx('catch_s');wrap.dataset.stop="true";wrap.style.opacity="0";window.lastScarab=wrap;showQuest()}}

function showQuest(){
var q=questions[currentIdx];document.getElementById('q-text').innerText=q.q;
var opt=document.getElementById('options');opt.innerHTML='';
if(q.type==='quiz'){q.answers.forEach(function(o,i){var btn=document.createElement('button');btn.className='choice-btn';btn.innerText=o;btn.onclick=function(){check(i)};opt.appendChild(btn)})}
else if(q.type==='oral'){var btn=document.createElement('button');btn.className='choice-btn';btn.innerText=TXT_CONTINUE;btn.onclick=function(){checkOral()};opt.appendChild(btn)}
else if(q.type==='input'){var inp=document.createElement('input');inp.type='text';inp.className='answer-input';inp.placeholder=TXT_PLACEHOLDER;inp.autocomplete='off';opt.appendChild(inp);
var btn=document.createElement('button');btn.className='choice-btn';btn.innerText=TXT_SUBMIT;btn.onclick=function(){checkInput(inp.value)};opt.appendChild(btn);
inp.addEventListener('keydown',function(e){if(e.key==='Enter')checkInput(inp.value)});setTimeout(function(){inp.focus()},100)}
var tb=document.getElementById('tablet');tb.classList.remove('finale');tb.classList.add('active')}

function onCorrect(){playSfx('correct');document.querySelectorAll('.step')[currentIdx].classList.add('active');currentIdx++;
if(window.lastScarab)window.lastScarab.remove();if(currentIdx<questions.length)setTimeout(createScarab,600);else endGame(VICTORY_MSG)}
function onWrong(){playSfx('wrong');lives--;var ankhs=document.querySelectorAll('.ankh');if(ankhs[lives])ankhs[lives].classList.add('lost');
var el=window.lastScarab;if(el){el.style.opacity="1";el.classList.add('shock-hit')}
if(lives<=0)setTimeout(startGameOver,800);else setTimeout(createScarab,1400)}

function checkOral(){document.getElementById('tablet').classList.remove('active');onCorrect()}
function checkInput(val){document.getElementById('tablet').classList.remove('active');var correct=questions[currentIdx].answers[0]||'';
if(val.trim().toLowerCase()===correct.trim().toLowerCase()){onCorrect()}else{onWrong()}}
function check(ansIdx){document.getElementById('tablet').classList.remove('active');if(ansIdx===questions[currentIdx].correct){onCorrect()}else{onWrong()}}

function startGameOver(){var tb=document.getElementById('tablet');tb.classList.add('finale');
document.getElementById('q-text').innerText=GAMEOVER_MSG;
document.getElementById('options').innerHTML='<button class="choice-btn" onclick="location.reload()">'+REPLAY_BTN+'</button>';
playSfx('gameover',function(){tb.classList.add('active')})}

function endGame(m){var tb=document.getElementById('tablet');tb.classList.add('finale');
document.getElementById('q-text').innerText=m;
document.getElementById('options').innerHTML='<button class="choice-btn" onclick="location.reload()">'+REPLAY_WIN+'</button>';
playSfx('victory',function(){tb.classList.add('active')})}
})();
