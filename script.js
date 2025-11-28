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
