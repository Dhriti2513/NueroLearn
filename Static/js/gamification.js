// gamification.js – XP Logic, Font Toggles, Background Themes, and Timer Integration

let xp = 0;

function addXP(points) {
  xp += points;
  updateProgressBar();
  localStorage.setItem("xp", xp);
}

function updateProgressBar() {
  const progress = document.getElementById("xpProgress");
  const levelDisplay = document.getElementById("levelDisplay");
  const badgeContainer = document.getElementById("badgeContainer");
  const levelXP = 100;

  const percent = (xp % levelXP) / levelXP * 100;
  if (progress) {
    progress.style.width = percent + "%";
    progress.innerText = `${Math.floor(percent)}%`;
  }

  const level = Math.floor(xp / levelXP) + 1;
  if (levelDisplay) levelDisplay.innerText = `Level: ${level}`;

  // 🏅 Badge logic
  const badgeMap = {
    novice: { xp: 50, file: "novice.png", alt: "Novice" },
    learner: { xp: 150, file: "learner.png", alt: "Learner" },
    scholar: { xp: 300, file: "scholar.png", alt: "Scholar" },
    mastermind: { xp: 500, file: "mastermind.png", alt: "Mastermind" }
  };

  const badges = [];
  for (const badge in badgeMap) {
    if (xp >= badgeMap[badge].xp) {
      badges.push(`<img src="/static/images/${badgeMap[badge].file}" alt="${badgeMap[badge].alt}" title="${badgeMap[badge].alt}" class="badge-icon">`);
    }
  }

  if (badgeContainer) {
    badgeContainer.innerHTML = badges.join(" ");
    badgeContainer.classList.add("sparkle");
    setTimeout(() => badgeContainer.classList.remove("sparkle"), 4500);
  }
}

window.onload = () => {
  xp = parseInt(localStorage.getItem("xp")) || 0;
  updateProgressBar();
};

function toggleFont() {
  const checked = document.getElementById("dyslexiaToggle").checked;
  document.body.classList.toggle("dyslexia-font", checked);
}

function adjustLineSpacing() {
  const spacing = document.getElementById("lineSpacing").value;
  document.body.style.lineHeight = spacing;
}

function changeBG() {
  const value = document.getElementById("bgSelector").value;
  document.body.classList.remove("dark-bg", "softblue-bg");

  if (value === "dark") {
    document.body.classList.add("dark-bg");
  } else if (value === "softblue") {
    document.body.classList.add("softblue-bg");
  }
}

let timerInterval;
let totalTime;
let isPaused = false;

function startStudyTimer() {
  const studyTime = parseInt(document.getElementById("studyTime").value) || 25;
  totalTime = studyTime * 60;
  startTimer();
}

function startTimer() {
  if (timerInterval) clearInterval(timerInterval);
  isPaused = false;

  timerInterval = setInterval(() => {
    if (!isPaused && totalTime > 0) {
      totalTime--;
      updateCountdown();
    } else if (totalTime <= 0) {
      clearInterval(timerInterval);
      alert("⏳ Study time’s up! Take a break! 💫");
    }
  }, 1000);
}

function pauseTimer() {
  isPaused = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  totalTime = parseInt(document.getElementById("studyTime").value || 25) * 60;
  updateCountdown();
}

function updateCountdown() {
  const minutes = Math.floor(totalTime / 60);
  const seconds = totalTime % 60;
  document.getElementById("countdown").textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}
