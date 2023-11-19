let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let displayDiv = document.getElementById("text");
let randomDegree = 720 + Math.floor(Math.random() * (355 - 0 + 1) + 0);

let rotationAngle = 0;
let resultDegree = 0;
let isSpinning = false;
let spinCount = 0;
const maxSpinCount = 4;
let freeSpinCount = 0;
let hasDisplayedMessage = false; 

window.onload = function () {
  btn.classList.add("pulsating-text");
};

btn.onclick = function () {
  if (!isSpinning) {
    text.innerHTML = `Късмет!`;
    btn.disabled = true;
    btn.classList.remove("pulsating-text");
    container.style.transform = "rotate(" + (randomDegree + 720) + "deg)";
    console.log(randomDegree);
    let rotationAngle = 720 + Math.floor(Math.random() * (355 - 0 + 1) + 0);
    if (randomDegree < 360) {
      resultDegree = randomDegree;
    } else {
      resultDegree = randomDegree % 360;
    }

  
    let activeDiv;
    if (resultDegree <= 22.5 || resultDegree >= 337.5) {
      activeDiv = document.querySelector(".one");
    } else if (resultDegree > 22.5 && resultDegree < 68) {
      activeDiv = document.querySelector(".eight");
    } else if (resultDegree < 113) {
      activeDiv = document.querySelector(".seven");
    } else if (resultDegree < 157) {
      activeDiv = document.querySelector(".six");
    } else if (resultDegree < 203) {
      activeDiv = document.querySelector(".five");
    } else if (resultDegree < 246) {
      activeDiv = document.querySelector(".four");
    } else if (resultDegree < 292) {
      activeDiv = document.querySelector(".three");
    } else {
      activeDiv = document.querySelector(".two");
    }

    randomDegree += rotationAngle;

    const transitionComplete = () => {

      if (activeDiv.className.includes("eight")) {
        text.innerHTML = `Честито! Печелиш 3 безплатни завъртания!`;
        spinCount++;
        if (spinCount < maxSpinCount) {
          freeSpinCount = 0;
          setTimeout(() => {
            btn.click();
          }, 500);
        } else {
          setTimeout(() => {
            text.innerHTML = "Честито! Печелиш общо {total} бонус точки!";
            btn.disabled = false;
            btn.classList.add("pulsating-text");
          }, 1200);
        }
      } else {
        text.innerHTML = `Честито! Печелиш ${activeDiv.textContent}00 точки!`;
        isSpinning = false;
        btn.disabled = false;
        btn.classList.add("pulsating-text");
      }
    };

    container.addEventListener("transitionend", transitionComplete);
  }
};

