const sectors = ['Hadiah A', 'Hadiah B', 'Hadiah C', 'Hadiah D', 'Hadiah E', 'Jackpot', 'Hadiah F', 'Hadiah G', 'Hadiah H', 'Hadiah I', 'Hadiah J', 'Zonk'];

let isSpinning = false;
let degree = 0;

function spin() {
  if (isSpinning) return;

  isSpinning = true;
  const randomDegree = Math.floor(Math.random() * 360);
  degree += +randomDegree + 360 * 5; // Spin 5 times before stopping
  // console.log(randomDegree, 'random degree');

  const wheel = document.getElementById('box');
  wheel.style.transition = 'all 6s ease-out';
  wheel.style.transform = `rotate(${degree}deg)`;
  
  setTimeout(() => {
    // console.log(degree % 360, 'hasil');
    const sectorIndex = Math.floor((degree % 360) / (360 / sectors.length));
    // console.log(sectorIndex);
    const result = sectors[sectorIndex];
    let alertMessage = '';
    
    if (result === 'Jackpot') {
      alertMessage = 'Selamat, Anda mendapatkan Jackpot!';
    } else if (result === 'Zonk') {
      alertMessage = 'Maaf, Anda mendapatkan Zonk. Coba lagi!';
    } else {
      alertMessage = `Anda mendapatkan: ${result}`;
    }
    // alert(alertMessage);
    // console.log(result);
    isSpinning = false;
  }, 6000); // Wait for 6 seconds (same duration as the wheel spin transition)
}
