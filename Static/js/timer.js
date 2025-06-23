let timer;
let timeLeft = 0;
let isStudySession = true;

function startTimer() {
  const study = parseInt(document.getElementById("studyTime").value) || 25;
  const breakTime = parseInt(document.getElementById("breakTime").value) || 5;

  if (!timeLeft) {
    timeLeft = (isStudySession ? study : breakTime) * 60;
  }

  if (!timer) {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        isStudySession = !isStudySession;

        // 🌟 Alert on session switch
        alert(isStudySession ? "🔔 Time to Study!" : "🍵 Take a Break!");

        // Restart timer for new session
        timeLeft = (isStudySession ? study : breakTime) * 60;
        updateTimerDisplay();
      } else {
        timeLeft--;
        updateTimerDisplay();
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  pauseTimer();
  isStudySession = true;
  timeLeft = parseInt(document.getElementById("studyTime").value) * 60;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById("countdown").textContent = `${minutes}:${seconds}`;
}

window.onload = () => {
  timeLeft = parseInt(document.getElementById("studyTime").value) * 60;
  updateTimerDisplay();
};
