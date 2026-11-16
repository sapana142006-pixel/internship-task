
const redBtn = document.getElementById('redBtn');
const greenBtn = document.getElementById('greenBtn');
const blueBtn = document.getElementById('blueBtn');
const yellowBtn = document.getElementById('yellowBtn');
const randomBtn = document.getElementById('randomBtn');
const resetBtn = document.getElementById('resetBtn');
const colorNameSpan = document.getElementById('colorName');


const defaultColor = '#f1f5f9';


function changeBackgroundColor(colorCode, displayName) {
    document.body.style.backgroundColor = colorCode;
    colorNameSpan.textContent = displayName;
}

function getRandomHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

redBtn.addEventListener('click', function () {
    changeBackgroundColor('#f8786f', 'Red');
});

greenBtn.addEventListener('click', function () {
    changeBackgroundColor('#a7e0bc', 'Green');
});

blueBtn.addEventListener('click', function () {
    changeBackgroundColor('#78a9f9', 'Blue');
});

yellowBtn.addEventListener('click', function () {
    changeBackgroundColor('#f1e760', 'Yellow');
});

randomBtn.addEventListener('click', function () {
    const randomColor = getRandomHexColor();
    changeBackgroundColor(randomColor, `Random (${randomColor})`);
});

resetBtn.addEventListener('click', function () {
    changeBackgroundColor(defaultColor, 'Default (#F1F5F9)');
});