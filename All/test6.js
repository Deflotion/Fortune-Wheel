const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const wheelColors = ["#e74c3c", "#f39c12", "#3498db", "#2ecc71", "#9b59b6", "#e67e22", "#1abc9c", "#d35400", "#2980b9", "#27ae60", "#8e44ad", "#c0392b"];
const wheelTexts = ["Hadiah A", "Hadiah B", "Hadiah C", "Hadiah D", "Hadiah E", "Jackpot", "Hadiah F", "Hadiah G", "Hadiah H", "Hadiah I", "Hadiah J", "Zonk"];

const pointerColor = "#e74c3c";
const pointerWidth = 10;

function drawWheel() {
    const radius = canvas.width / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";

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
        ctx.rotate(angle + (Math.PI / 12));
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        ctx.fillText(wheelTexts[i], radius / 2 - 20, 5);
        ctx.restore();
    }

    drawPointer();
}

function drawPointer() {
    const radius = canvas.width / 2;
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((Math.PI / 180) * 30);
    ctx.fillStyle = pointerColor;
    ctx.beginPath();
    ctx.moveTo(-pointerWidth / 2, 0);
    ctx.lineTo(pointerWidth / 2, 0);
    ctx.lineTo(0, radius - 30);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

drawWheel(); // Gambar roda saat halaman dimuat

const spinButton = document.getElementById("spinButton");
spinButton.addEventListener("click", spinWheel);

function spinWheel() {
    // Implementasi logika putaran roda di sini
    // Anda dapat memodifikasi logika putaran sesuai kebutuhan Anda
    const randomDegree = 720 + Math.floor(Math.random() * 360);
    const spinDuration = 3000; // 3 seconds
    const spinInterval = 50; // 50 milliseconds
    const totalRotation = randomDegree;

    let currentRotation = 0;
    let spinIntervalId = setInterval(() => {
        if (currentRotation >= totalRotation) {
            clearInterval(spinIntervalId);
            const resultIndex = Math.floor(((360 - (currentRotation % 360)) % 360) / (360 / 12));
            const result = wheelTexts[resultIndex];
            displayResult(result);
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
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.arc(radius, radius, radius - 10, 0, 2 * Math.PI);
    ctx.stroke();

    for (let i = 0; i < 12; i++) {
        const angle = ((i * Math.PI * 2) / 12) + (Math.PI * 2 * (rotation / 360));
        ctx.fillStyle = wheelColors[i];
        ctx.beginPath();
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius - 10, angle, angle + (Math.PI * 2) / 12);
        ctx.lineTo(radius, radius);
        ctx.fill();
        ctx.save();
        ctx.translate(radius, radius);
        ctx.rotate(angle + (Math.PI / 12));
        ctx.fillStyle = "white";
        ctx.font = "bold 20px Arial";
        ctx.fillText(wheelTexts[i], radius / 2 - 20, 5);
        ctx.restore();
    }

    drawPointer();
}

function displayResult(result) {
    const resultMessage = document.getElementById("resultMessage");
    resultMessage.innerText = "Selamat, Anda memenangkan: " + result;
}