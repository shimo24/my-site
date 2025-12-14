// === PRENS & PRENSES OYUNU (FULL) ===
// PC: ok tuşları basılı tutunca yürür + sayfa kaymaz
// Telefon: yön tuşuna BASINCA 1 ADIM (basılı tutunca sürekli gitmez)
// Telefon: sahnede sürükleme ile hareket (istersen kapatabilirsin)
(() => {
  const stage = document.getElementById("stage");
  if (!stage) return;

  const prince = document.getElementById("prince");
  const princess = document.getElementById("princess");
  const scoreEl = document.getElementById("score");
  const livesEl = document.getElementById("lives");
  const timeEl = document.getElementById("time");
  const toast = document.getElementById("toast");
  const win = document.getElementById("win");
  const btnReset = document.getElementById("btnResetGame");

  // Ayarlar
  const NEED_SCORE = 7;
  const SPEED = 3.6;
  const PRINCESS_FLEE_DIST = 220;
  const PRINCESS_FLEE_SPEED = 2.0;
  const WIN_DIST = 70;

  // Mobil 1-adım miktarı
  const MOBILE_STEP = 22;

  // State
  let keys = { ArrowLeft: false, ArrowRight: false, ArrowUp: false, ArrowDown: false };
  let score = 0;
  let lives = 3;
  let time = 30;
  let running = true;

  // stage içi koordinatlar (px)
  let p = { x: 0, y: 0 }; // prince
  let q = { x: 0, y: 0 }; // princess

  let hearts = [];
  let thorns = [];

  // Helpers
  function rect() {
    return stage.getBoundingClientRect();
  }
  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }
  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function render() {
    prince.style.left = p.x + "px";
    prince.style.top = p.y + "px";
    princess.style.left = q.x + "px";
    princess.style.top = q.y + "px";
  }

  function showToast(t) {
    if (!toast) return;
    toast.textContent = t;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), 1100);
  }

  function spawn(type) {
    const r = rect();
    const el = document.createElement("div");
    el.className = "item" + (type === "thorn" ? " danger" : "");
    el.textContent = type === "thorn" ? "🌵" : "💖";

    const x = 60 + Math.random() * (r.width - 120);
    const y = 80 + Math.random() * (r.height - 140);

    el.style.left = x + "px";
    el.style.top = y + "px";
    stage.appendChild(el);

    (type === "thorn" ? thorns : hearts).push({ x, y, el });
  }

  function clearItems() {
    hearts.forEach(o => o.el.remove());
    thorns.forEach(o => o.el.remove());
    hearts = [];
    thorns = [];
  }

  function resetGame() {
    clearItems();

    score = 0;
    lives = 3;
    time = 30;
    running = true;

    if (scoreEl) scoreEl.textContent = score;
    if (livesEl) livesEl.textContent = lives;
    if (timeEl) timeEl.textContent = time;
    if (win) win.classList.add("hidden");

    const r = rect();
    p = { x: r.width * 0.20, y: r.height * 0.70 };
    q = { x: r.width * 0.78, y: r.height * 0.42 };

    for (let i = 0; i < 6; i++) spawn("heart");
    for (let i = 0; i < 4; i++) spawn("thorn");

    render();
    showToast("Başla! Kalpleri topla 💖");
  }

  // =========================
  // PC: Ok tuşları sayfa kaydırmasın
  // =========================
  window.addEventListener("keydown", (e) => {
    const allowed = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (allowed.includes(e.key)) {
      e.preventDefault();
      keys[e.key] = true;
    }
  }, { passive: false });

  window.addEventListener("keyup", (e) => {
    const allowed = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
    if (allowed.includes(e.key)) {
      e.preventDefault();
      keys[e.key] = false;
    }
  }, { passive: false });

  // =========================
  // Telefon: Mobil tuşlar -> 1 BASIŞ = 1 ADIM
  // =========================
  document.querySelectorAll(".m-btn").forEach(btn => {
    const dir = btn.getAttribute("data-dir");

    btn.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      if (!running) return;

      const r = rect();

      if (dir === "left")  p.x -= MOBILE_STEP;
      if (dir === "right") p.x += MOBILE_STEP;
      if (dir === "up")    p.y -= MOBILE_STEP;
      if (dir === "down")  p.y += MOBILE_STEP;

      p.x = clamp(p.x, 40, r.width - 40);
      p.y = clamp(p.y, 40, r.height - 40);

      // küçük yürüyüş animasyonu
      prince.classList.add("walk");
      setTimeout(() => prince.classList.remove("walk"), 150);

      // mobilde de oyunun kuralları çalışsın
      tickLogic();
      render();
    });
  });

  // =========================
  // Telefon: sahnede sürükleme (istersen kaldırabilirsin)
  // =========================
  let dragging = false;
  let last = null;

  stage.addEventListener("pointerdown", (e) => {
    if (!running) return;
    // sadece touch/pen ile sürükle (mouse ile olmasın)
    if (e.pointerType === "mouse") return;

    dragging = true;
    last = { x: e.clientX, y: e.clientY };
  });

  stage.addEventListener("pointermove", (e) => {
    if (!dragging || !running) return;
    if (e.pointerType === "mouse") return;

    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    last = { x: e.clientX, y: e.clientY };

    const r = rect();
    p.x = clamp(p.x + dx, 40, r.width - 40);
    p.y = clamp(p.y + dy, 40, r.height - 40);

    tickLogic();
    render();
  });

  stage.addEventListener("pointerup", () => { dragging = false; last = null; });
  stage.addEventListener("pointercancel", () => { dragging = false; last = null; });

  // =========================
  // Timer
  // =========================
  setInterval(() => {
    if (!running) return;
    time--;
    if (timeEl) timeEl.textContent = time;

    if (time === 10) showToast("10 saniye! Hadi 😏");
    if (time <= 0) {
      running = false;
      showToast("Süre bitti 😢");
    }
  }, 1000);

  // =========================
  // Oyun mantığı (hem PC loop hem mobil tıklama için ortak)
  // =========================
  function tickLogic() {
    if (!running) return;

    // prenses yaklaşınca kaçar
    if (dist(p, q) < PRINCESS_FLEE_DIST) {
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const l = Math.hypot(dx, dy) || 1;

      const r = rect();
      q.x = clamp(q.x + (dx / l) * PRINCESS_FLEE_SPEED, 40, r.width - 40);
      q.y = clamp(q.y + (dy / l) * PRINCESS_FLEE_SPEED, 40, r.height - 40);
    }

    // kalp toplama
    for (let i = hearts.length - 1; i >= 0; i--) {
      const h = hearts[i];
      if (dist(p, h) < 40) {
        h.el.remove();
        hearts.splice(i, 1);
        score++;
        if (scoreEl) scoreEl.textContent = score;
        showToast(`Kalp! (${score}/${NEED_SCORE}) 💖`);
        spawn("heart");
      }
    }

    // diken çarpması
    for (let i = 0; i < thorns.length; i++) {
      const t = thorns[i];
      if (dist(p, t) < 38) {
        lives--;
        if (livesEl) livesEl.textContent = lives;
        showToast("Diken! 🌵");

        p.x -= 30; // geri itme

        if (lives <= 0) {
          running = false;
          showToast("Can bitti 😭");
        }
      }
    }

    // kazanma
    if (score >= NEED_SCORE && dist(p, q) < WIN_DIST) {
      running = false;
      if (win) win.classList.remove("hidden");
      showToast("Kavuşma! 💖");
    }
  }

  // =========================
  // PC Loop (basılı tutarak hareket)
  // =========================
  function loop() {
    if (running) {
      let vx = 0, vy = 0;

      if (keys.ArrowLeft) vx--;
      if (keys.ArrowRight) vx++;
      if (keys.ArrowUp) vy--;
      if (keys.ArrowDown) vy++;

      const moving = vx !== 0 || vy !== 0;
      prince.classList.toggle("walk", moving);

      // normalize
      const len = Math.hypot(vx, vy) || 1;
      vx /= len; vy /= len;

      const r = rect();
      p.x = clamp(p.x + vx * SPEED, 40, r.width - 40);
      p.y = clamp(p.y + vy * SPEED, 40, r.height - 40);

      tickLogic();
      render();
    }

    requestAnimationFrame(loop);
  }

  // Reset
  if (btnReset) btnReset.addEventListener("click", resetGame);

  // Start
  resetGame();
  loop();

  // Resize olunca düzgün kalsın
  window.addEventListener("resize", () => resetGame());
})();
