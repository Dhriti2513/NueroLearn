// profile.js (inside /static/js or personalization depending on setup)
document.addEventListener("DOMContentLoaded", applyPreferences);

// Function to save profile preferences
function saveProfile() {
  const name = document.getElementById('username').value;
  const theme = document.getElementById('theme').value;
  const font = document.getElementById('font').value;
  const goals = document.getElementById('goals').value;

  localStorage.setItem('neuroName', name);
  localStorage.setItem('neuroTheme', theme);
  localStorage.setItem('neuroFont', font);
  localStorage.setItem('neuroGoals', goals);

  alert('✨ Your preferences have been saved!');
}

// Function to apply stored preferences
function applyPreferences() {
  const name = localStorage.getItem('neuroName');
  const theme = localStorage.getItem('neuroTheme');
  const font = localStorage.getItem('neuroFont');
  const goals = localStorage.getItem('neuroGoals');

  // Apply display name & goals if available
  const nameDisplay = document.getElementById("userName");
  const goalDisplay = document.getElementById("goalDisplay");

  if (name && nameDisplay) {
    nameDisplay.textContent = `Welcome back, ${name} 💫`;
  }

  if (goals && goalDisplay) {
    goalDisplay.textContent = `🌟 Your Goal: ${goals}`;
  }

  // Apply theme with gradient if specified
  if (theme) {
    switch (theme) {
      case 'pink':
        document.body.style.background = 'linear-gradient(135deg, #fce4ec, #f8bbd0)';
        break;
      case 'purple':
        document.body.style.background = 'linear-gradient(135deg, #ede7f6, #d1c4e9)';
        break;
      case 'sky':
        document.body.style.background = 'linear-gradient(135deg, #e3f2fd, #bbdefb)';
        break;
      default:
        document.body.style.background = '#ffffff';
    }
  }

  // Apply font style
  if (font === 'dyslexic') {
    document.body.classList.add('dyslexia');
  } else if (font === 'comic') {
    document.body.style.fontFamily = "'Comic Neue', cursive";
  } else {
    document.body.style.fontFamily = 'Segoe UI, sans-serif';
  }
}

// Apply preferences on DOM content loaded
window.addEventListener('DOMContentLoaded', applyPreferences);

function changeTheme(color) {
  let background;
  switch (color) {
    case "pink":
      background = "linear-gradient(135deg, #fce4ec, #f8bbd0)";
      break;
    case "blue":
      background = "linear-gradient(135deg, #e3f2fd, #bbdefb)";
      break;
    case "purple":
      background = "linear-gradient(135deg, #ede7f6, #d1c4e9)";
      break;
    case "white":
      background = "#ffffff";
      break;
    default:
      background = "#ffffff";
  }

  document.body.style.background = background;
  localStorage.setItem("neuroTheme", color); // Save to reuse
}

// Apply saved theme on load
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("neuroTheme");
  if (savedTheme) changeTheme(savedTheme);
});

const fontColors = ["#4a148c", "#1a237e", "#000000", "#d81b60"];
let currentFontColorIndex = 0;

function toggleFontColor() {
  currentFontColorIndex = (currentFontColorIndex + 1) % fontColors.length;
  const newColor = fontColors[currentFontColorIndex];

  document.body.style.color = newColor;
  localStorage.setItem("neuroFontColor", newColor);
}

// Apply saved font color on load
window.addEventListener("DOMContentLoaded", () => {
  const savedColor = localStorage.getItem("neuroFontColor");
  if (savedColor) {
    document.body.style.color = savedColor;
    currentFontColorIndex = fontColors.indexOf(savedColor) || 0;
  }
});
