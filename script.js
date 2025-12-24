window.onload = () => {
  try {

    const cd = document.getElementById("countdown");
    const msg = document.getElementById("message");
    const show = document.getElementById("slideshow");
    const slide = document.getElementById("slide");
    const text = document.getElementById("stext");
    const music = document.getElementById("music");

    if (!cd || !msg || !show || !slide || !text) {
      console.error("Missing HTML elements");
      return;
    }

    let count = 10;
    let index = 0;

    const slides = [
      { photo: "photo1.jpg", text: "You are amazing 💖" },
      { photo: "photo2.jpg", text: "Keep smiling always 😊" },
      { photo: "photo3.jpg", text: "This year is ours ✨" }
    ];

    const timer = setInterval(() => {
      cd.textContent = count;
      count--;

      if (count < 0) {
        clearInterval(timer);
        cd.style.display = "none";
        msg.classList.remove("hidden");
        show.classList.remove("hidden");

        music && music.play().catch(()=>{});

        startSlideshow();
        startFireworks();
        startSnow();
        startRoses();
      }
    }, 1000);

    function startSlideshow() {
      slide.src = slides[0].photo;
      text.textContent = slides[0].text;

      setInterval(() => {
        index = (index + 1) % slides.length;
        slide.src = slides[index].photo;
        text.textContent = slides[index].text;
      }, 5000);
    }

    function resize(c) {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }

    function startFireworks() {
      const c = document.getElementById("fireworks");
      if (!c) return;
      const ctx = c.getContext("2d");
      resize(c);

      let parts = [];

      function burst() {
        for (let i = 0; i < 120; i++) {
          parts.push({
            x: Math.random() * c.width,
            y: Math.random() * c.height / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 100
          });
        }
      }

      (function anim() {
        ctx.clearRect(0, 0, c.width, c.height);
        parts.forEach((p, i) => {
          ctx.fillStyle = "gold";
          ctx.fillRect(p.x, p.y, 3, 3);
          p.x += p.vx;
          p.y += p.vy;
          p.life--;
          if (p.life <= 0) parts.splice(i, 1);
        });
        if (parts.length < 200) burst();
        requestAnimationFrame(anim);
      })();
    }

    function startSnow() {
      const c = document.getElementById("snow");
      if (!c) return;
      const ctx = c.getContext("2d");
      resize(c);

      const flakes = Array.from({ length: 200 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 3 + 1,
        s: Math.random() + 0.5
      }));

      (function anim() {
        ctx.clearRect(0, 0, c.width, c.height);
        flakes.forEach(f => {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fillStyle = "white";
          ctx.fill();
          f.y += f.s;
          if (f.y > c.height) f.y = 0;
        });
        requestAnimationFrame(anim);
      })();
    }

    function startRoses() {
      const c = document.getElementById("roses");
      if (!c) return;
      const ctx = c.getContext("2d");
      resize(c);

      const roses = Array.from({ length: 60 }, () => ({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        s: Math.random() + 0.5
      }));

      (function anim() {
        ctx.clearRect(0, 0, c.width, c.height);
        roses.forEach(r => {
          ctx.beginPath();
          ctx.arc(r.x, r.y, 5, 0, Math.PI * 2);
          ctx.fillStyle = "hotpink";
          ctx.fill();
          r.y += r.s;
          if (r.y > c.height) r.y = 0;
        });
        requestAnimationFrame(anim);
      })();
    }

  } catch (e) {
    console.error("Fatal error:", e);
  }
};
