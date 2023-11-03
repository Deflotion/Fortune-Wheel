const optionsContainer = document.getElementById('wheel');

const options = [
    { text: 'Option 1', color: '#e74c3c' },
    { text: 'Option 2', color: '#3498db' },
    { text: 'Option 3', color: '#2ecc71' },
    { text: 'Option 4', color: '#f39c12' },
    { text: 'Option 5', color: '#9b59b6' },
    { text: 'Option 6', color: '#e74c3c' },
    { text: 'Option 7', color: '#3498db' },
    { text: 'Option 8', color: '#2ecc71' },
    { text: 'Option 9', color: '#f39c12' },
    { text: 'Option 10', color: '#9b59b6' },
    { text: 'Jackpot', color: '#27ae60' },
    { text: 'Zonk', color: '#c0392b' }
];

function createOptions() {
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option.text;
        optionDiv.style.backgroundColor = option.color;
        optionsContainer.appendChild(optionDiv);
    });
}

createOptions();

const wheel = document.getElementById('wheel');
const resultElement = document.getElementById('result');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');

function spinWheel() {
    const randomIndex = Math.floor(Math.random() * options.length);
    const degrees = 360 / options.length;
    const randomDegree = randomIndex * degrees + Math.floor(Math.random() * degrees);
    const rotation = `rotate(${randomDegree}deg)`;

    wheel.style.transition = 'transform 3s ease-out';
    wheel.style.transform = rotation;

    setTimeout(() => {
        const selectedOption = options[randomIndex];
        resultElement.textContent = selectedOption.text;
        popupMessage.textContent = `Anda memilih: ${selectedOption.text}`;
        popup.style.display = 'flex';
    }, 3000);
}

function closePopup() {
    popup.style.display = 'none';
}

wheel.addEventListener('click', spinWheel);
