function spinWheel() {
    const wheel = document.getElementById("wheel");
    const degrees = Math.floor(Math.random() * 360) + 1440; // Putaran minimal 4 putaran (1440 derajat) plus tambahan acak
    wheel.style.transition = "transform 3s cubic-bezier(0.25, 0.1, 0.25, 1)";
    wheel.style.transform = `rotate(${degrees}deg)`;
}
