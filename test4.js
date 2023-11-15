const canvas = document.getElementById('wheelCanvas');
const ctx = canvas.getContext('2d');

const wheelColors = ['#e74c3c', '#f39c12', '#3498db', '#2ecc71', '#9b59b6', '#e67e22', '#1abc9c', '#d35400', '#2980b9', '#27ae60', '#8e44ad', '#c0392b'];
const wheelTexts = ['Hadiah A', 'Hadiah B', 'Hadiah C', 'Hadiah D', 'Hadiah E', 'Jackpot', 'Hadiah F', 'Hadiah G', 'Hadiah H', 'Hadiah I', 'Hadiah J', 'Zonk'];

let isWheelSpinning = false;

function drawWheel() {
  const radius = canvas.width/2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 10;

  ctx.beginPath();
  ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
  ctx.stroke();

  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12;
    ctx.fillStyle = wheelColors[i];
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius - 10, angle, angle + (Math.PI * 2) / 12);
    ctx.lineTo(radius, radius);
    ctx.fill();
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + Math.PI / 12);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(wheelTexts[i], radius / 2 - 20, 5);
    ctx.restore();
  }
}

drawWheel(); // Gambar roda saat halaman dimuat

const spinButton = document.getElementById('spinButton');
spinButton.addEventListener('click', spinWheel);

function spinWheel() {
  if (isWheelSpinning) {
    return; // Jika roda sudah berputar, keluar dari fungsi
  }

  isWheelSpinning = true; // Set roda sedang berputar menjadi true
  const randomDegree = 820 + Math.floor(Math.random() * 360);
  const spinDuration = 30000; // 3 seconds
  const spinInterval = 20; // 50 milliseconds
  const totalRotation = randomDegree;

  let currentRotation = 0;
  let spinIntervalId = setInterval(() => {
    if (currentRotation >= totalRotation) {
      clearInterval(spinIntervalId);
      const resultIndex = Math.floor(((360 - (currentRotation % 360)) % 360) / (360 / 12));
      const result = wheelTexts[resultIndex];
      displayResult(result);
      isWheelSpinning = false; // Set roda sedang berputar menjadi false setelah berhenti
    } else {
      currentRotation += 10;
      drawWheelWithRotation(currentRotation);
    }
  }, spinInterval);
}

function drawWheelWithRotation(rotation) {
  const radius = canvas.width / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'black';

  ctx.beginPath();
  ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
  ctx.stroke();

  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI * 2) / 12 + Math.PI * 2 * (rotation / 360);
    ctx.fillStyle = wheelColors[i];
    ctx.beginPath();
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius - 10, angle, angle + (Math.PI * 2) / 12);
    ctx.lineTo(radius, radius);
    ctx.fill();
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + Math.PI / 12);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(wheelTexts[i], radius / 2 - 20, 5);
    ctx.restore();
  }
}

function rotationToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

function displayResult(result) {
  let message;
  if (result === 'Zonk') {
    message = 'Yah, Anda mendapat Zonk. Coba lagi!';
  } else if (result === 'Jackpot') {
    message = 'Wow, Anda mendapat Jackpot! Selamat!';
  } else {
    message = `Selamat, Anda mendapatkan ${result}!`;
  }
  alert(message);
}

function showMessage(message) {
  const messageBox = document.getElementById('messageBox');
  const messageText = document.getElementById('messageText');
  messageText.innerText = message;
  messageBox.style.display = 'flex';
}

function closeMessage() {
  const messageBox = document.getElementById('messageBox');
  messageBox.style.display = 'none';
}

function showCustomPopup(message) {
  Swal.fire({
    title: 'Pesan Khusus!',
    text: message,
    icon: 'info',
    confirmButtonText: 'Tutup',
  });
}
