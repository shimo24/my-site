// Kübra için tatlı sevgi mesajları
const loveMessages = [
  "Civcivim, sensiz geçen her dakika boşa gidiyor gibi hissediyorum. 💖",
  "Eşek gözlüm, bakışlarınla kalbime imza attın, artık resmi olarak senindir. 💌",
  "Prensesim, iyi ki kalbimin sultanı olmuşsun. Tahtın sonsuza kadar sende. 👑",
  "Sen güldüğünde, içimden 'iyi ki Kübra var' diyorum. 💫",
  "Seninle 'biz' olmak, hayatımdaki en güzel kararım. 💘"
];

const loveButton = document.getElementById("loveButton");
const loveModal = document.getElementById("loveModal");
const loveMessage = document.getElementById("loveMessage");
const loveClose = document.getElementById("loveClose");
// Kübra için tatlı sevgi mesajları
const loveMessages = [
  "Civcivim, sensiz geçen her dakika boşa gidiyor gibi hissediyorum. 💖",
  "Eşek gözlüm, bakışlarınla kalbime imza attın, artık resmi olarak senindir. 💌",
  "Prensesim, iyi ki kalbimin sultanı olmuşsun. Tahtın sonsuza kadar sende. 👑",
  "Sen güldüğünde, içimden 'iyi ki Kübra var' diyorum. 💫",
  "Seninle 'biz' olmak, hayatımdaki en güzel kararım. 💘"
];

const loveButton = document.getElementById("loveButton");
const loveModal = document.getElementById("loveModal");
const loveMessage = document.getElementById("loveMessage");
const loveClose = document.getElementById("loveClose");

if (loveButton) {
  loveButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    loveMessage.textContent = loveMessages[randomIndex];
    loveModal.style.display = "flex";
  });
}

if (loveClose) {
  loveClose.addEventListener("click", () => {
    loveModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === loveModal) {
    loveModal.style.display = "none";
  }
});

// Uçan kalpler
const floatingHearts = document.getElementById("floatingHearts");

function createHeart() {
  if (!floatingHearts) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤";

  const left = Math.random() * 100;
  const duration = 4000 + Math.random() * 3000;

  heart.style.left = `${left}vw`;
  heart.style.bottom = "-40px";
  heart.style.animationDuration = `${duration}ms`;

  floatingHearts.appendChild(heart);

  setTimeout(() => {
    floatingHearts.removeChild(heart);
  }, duration);
}

// Her 700ms'de bir kalp
setInterval(createHeart, 700);




const steps = {
  current: "1",
};

const quizMsg = document.getElementById("quiz-msg");
const finalStep = document.getElementById("quiz-step-final");
const finalText = document.getElementById("final-secret-text");
const finalBtn = document.getElementById("btn-show-final-text");

function showStep(id) {
  // Tüm adımları gizle
  document
    .querySelectorAll("#askim-quiz .quiz-step")
    .forEach((el) => el.classList.add("hidden"));

  // İstenen adımı göster
  const target =
    id === "final"
      ? document.getElementById("quiz-step-final")
      : document.getElementById("quiz-step-" + id);

  if (target) {
    target.classList.remove("hidden");
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    steps.current = id;
  }
}

function setMessage(text, isError = false) {
  if (!quizMsg) return;
  quizMsg.textContent = text;
  quizMsg.classList.remove("error", "success");
  quizMsg.classList.add(isError ? "error" : "success");
}

// Başlangıç: Sadece 1. soru açık
showStep("1");

// Tüm seçenek butonları için tek event listener (event delegation)
document
  .getElementById("askim-quiz")
  .addEventListener("click", function (e) {
    const btn = e.target.closest(".option-btn");
    if (!btn) return;

    const isCorrect = btn.getAttribute("data-correct") === "true";
    const next = btn.getAttribute("data-next"); // 2, 3 veya "final"

    if (!isCorrect) {
      setMessage("Yanlış cevap, bir daha dene. 😊", true);
      return;
    }

    // Doğru cevapsa:
    if (steps.current === "1") {
      setMessage(
        "Bu soruya cevap veremeyeceğin kadar zor yani? AI kullandın!!!!!. 😏",
        false
      );
    } else if (steps.current === "2") {
      setMessage(
        "Aferin, bu aşamayı da geçtin, tebrikler! Bir sonraki bu kadar kolay olmayacak. 😉",
        false
      );
    } else if (steps.current === "3") {
      setMessage(
        "Aferin, bütün soruları doğru cevapladın! Şu an sana biraz açılmak istiyorum. 💕",
        false
      );
    }

    // Sonraki adıma geç
    if (next) {
      showStep(next);
    }
  });

// Final butonu – yazıyı aç/kapat
if (finalBtn && finalText) {
  finalBtn.addEventListener("click", function () {
    finalText.classList.toggle("hidden");
  });
}

if (loveButton) {
  loveButton.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    loveMessage.textContent = loveMessages[randomIndex];
    loveModal.style.display = "flex";
  });
}

if (loveClose) {
  loveClose.addEventListener("click", () => {
    loveModal.style.display = "none";
  });
}

window.addEventListener("click", (e) => {
  if (e.target === loveModal) {
    loveModal.style.display = "none";
  }
});

// Uçan kalpler
const floatingHearts = document.getElementById("floatingHearts");

function createHeart() {
  if (!floatingHearts) return;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "❤";

  const left = Math.random() * 100;
  const duration = 4000 + Math.random() * 3000;

  heart.style.left = `${left}vw`;
  heart.style.bottom = "-40px";
  heart.style.animationDuration = `${duration}ms`;

  floatingHearts.appendChild(heart);

  setTimeout(() => {
    floatingHearts.removeChild(heart);
  }, duration);
}

// Her 700ms'de bir kalp
setInterval(createHeart, 700);

