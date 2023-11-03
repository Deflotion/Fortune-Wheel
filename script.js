// const options = ["a", "b", "c", "d", "e", "f"];
// const wheel = document.querySelector(".fortune");
// const spinButton = document.getElementById("spin");

// let isSpinning = false;

// spinButton.addEventListener("click", () => {
//   if (isSpinning) return;
//   isSpinning = true;

//   const randomDegree = Math.floor(Math.random() * 360);
//   const rounds = Math.floor(Math.random() * 5) + 5; // Random number of spins (between 5 to 10 rounds)
//   const totalDegree = 360 * rounds + randomDegree;

//   wheel.style.transition = "transform 3s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
//   wheel.style.transform = `rotate(${totalDegree}deg)`;

//   setTimeout(() => {
//     const index = Math.floor(((totalDegree + 30) % 360) / 60);
//     const selectedOption = options[index];
//     showPopup(selectedOption);
//     isSpinning = false;
//   }, 3000);
// });

// function showPopup(selectedOption) {
//   const popup = document.createElement("div");
//   popup.className = "popup";
//   popup.innerHTML = `
//     <div class="popup-content">
//       <div>Anda memilih: <strong>${selectedOption}</strong></div>
//       <div class="close-btn" onclick="closePopup()">Tutup</div>
//     </div>
//   `;
//   document.body.appendChild(popup);
// }

// function closePopup() {
//   const popup = document.querySelector(".popup");
//   if (popup) {
//     popup.remove();
//   }
// }


const sectors = 12; // Jumlah sektor roda
const wheel = document.getElementById('box');
const spinButton = document.querySelector('.spin');

let spinning = false;

function spin() {
  if (spinning) return;
  spinning = true;
  const deg = Math.floor(3600 + Math.random() * 360);
  wheel.style.transition = 'all 3s ease-out';
  wheel.style.transform = `rotate(${deg}deg)`;
  setTimeout(() => {
    wheel.style.transition = 'none';
    const actualDeg = deg % 360;
    displayNotification(actualDeg);
    spinning = false;
  }, 3000);
}

function displayNotification(deg) {
  let prize = '';
  if (deg >= 0 && deg < 30) {
    prize = 'Hadiah A';
  } else if (deg >= 30 && deg < 60) {
    prize = 'Hadiah B';
  } else if (deg >= 60 && deg < 90) {
    prize = 'Hadiah C';
  } else if (deg >= 90 && deg < 120) {
    prize = 'Hadiah D';
  } else if (deg >= 120 && deg < 150) {
    prize = 'Hadiah E';
  } else if (deg >= 150 && deg < 180) {
    prize = 'Jackpot';
  } else if (deg >= 180 && deg < 210) {
    prize = 'Hadiah F';
  } else if (deg >= 210 && deg < 240) {
    prize = 'Hadiah G';
  } else if (deg >= 240 && deg < 270) {
    prize = 'Hadiah H';
  } else if (deg >= 270 && deg < 300) {
    prize = 'Hadiah I';
  } else if (deg >= 300 && deg < 330) {
    prize = 'Hadiah J';
  } else {
    prize = 'Zonk';
  }
  // Menampilkan pemberitahuan
  alert(`Selamat! Anda memenangkan: ${prize}`);
}

spinButton.addEventListener('click', spin);
