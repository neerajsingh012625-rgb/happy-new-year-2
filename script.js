const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const giftsEl = document.getElementById("gifts");
const revealEl = document.getElementById("reveal");
const photoEl = document.getElementById("photo");
const textEl = document.getElementById("text");
const music = document.getElementById("music");

const giftEls = [
  document.getElementById("gift1"),
  document.getElementById("gift2"),
  document.getElementById("gift3")
];

const slides = [
  { photo: "photo1.jpg", text: "You are amazing 💖" },
  { photo: "photo2.jpg", text: "Keep smiling always 😊" },
  { photo: "photo3.jpg", text: "This year is yours ✨" }
];

let count = 10;
let giftIndex = 0;

const timer = setInterval(() => {
  countdownEl.textContent = count;
  count--;

  if (count < 0) {
    clearInterval(timer);
    countdownEl.style.display = "none";
    messageEl.classList.remove("hidden");
    giftsEl.classList.remove("hidden");
    music.play().catch(()=>{});

    startAutoOpen();
    startFireworks();
    startSnow();
    startRoses();
  }
}, 1000);

function startAutoOpen() {
  setInterval(() => {
    if (giftIndex >= slides.length) return;

    giftEls[giftIndex].classList.add("open");
    photoEl.src = slides[giftIndex].photo;
    textEl.textContent = slides[giftIndex].text;
    revealEl.classList.remove("hidden");

    giftIndex++;
  }, 5000);
}

function startFireworks() {
  const c = document.getElementById("fireworks");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;
  let p = [];

  function burst() {
    for (let i = 0; i < 120; i++) {
      p.push({ x: Math.random()*c.width, y: Math.random()*c.height/2,
               vx: (Math.random()-0.5)*6, vy: (Math.random()-0.5)*6, life: 100 });
    }
  }

  (function anim() {
    ctx.clearRect(0,0,c.width,c.height);
    p.forEach((o,i)=>{
      ctx.fillStyle="gold";
      ctx.fillRect(o.x,o.y,3,3);
      o.x+=o.vx; o.y+=o.vy; o.life--;
      if(o.life<=0) p.splice(i,1);
    });
    if(p.length<200) burst();
    requestAnimationFrame(anim);
  })();
}

function startSnow() {
  const c = document.getElementById("snow");
  const ctx = c.getContext("2d");
  c.width = innerWidth;
  c.height = innerHeight;

  const flakes = Array.from({length:200},()=>({
    x:Math.random()*c.width, y:Math.random()*c.height,
    r:Math.random()*3+1, s:Math.random()+0.5
  }));

  (function anim(){
    ctx.clearRect(0,0,c.width,c.height);
    flakes.forEach(f=>{
      ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
      ctx.fillStyle="white"; ctx.fill();
      f.y+=f.s; if(f.y>c.height) f.y=0;
    });
    requestAnimationFrame(anim);
  })();
}

function startRoses() {
  const container = document.getElementById("rose-container");

  setInterval(() => {
    const rose = document.createElement("span");
    rose.textContent = "🌹";
    rose.style.left = Math.random()*100+"vw";
    rose.style.animationDuration = 5 + Math.random()*5 + "s";
    container.appendChild(rose);
    setTimeout(()=>rose.remove(),10000);
  }, 500);
}
