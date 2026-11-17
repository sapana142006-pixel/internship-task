
const counterDisplay = document.getElementById('counterValue');
const statusMessage = document.getElementById('statusMessage');
const decreaseBtn = document.getElementById('decreaseBtn');
const resetBtn = document.getElementById('resetBtn');
const increaseBtn = document.getElementById('increaseBtn');
const increaseFiveBtn = document.getElementById('increaseFiveBtn');


let count = 0;

asses
function updateDisplay() {
    counterDisplay.textContent = count;

    // Reset color classes
    counterDisplay.classList.remove('positive', 'negative', 'zero');

    // Optional Challenge:   Change color based on value
    if (count > 0) {
        counterDisplay.classList.add('positive');
    } else if (count < 0) {
        counterDisplay.classList.add('negative');
    } else {
        counterDisplay.classList.add('zero');
    }
}

// Increase by 1
increaseBtn.addEventListener('click', function () {
    count++;
    statusMessage.textContent = '';
    updateDisplay();
});

// Optional Challenge: Increase by 5
increaseFiveBtn.addEventListener('click', function () {
    count += 5;
    statusMessage.textContent = '';
    updateDisplay();
});


decreaseBtn.addEventListener('click', function () {
    if (count > 0) {
        count--;
        statusMessage.textContent = '';
        updateDisplay();
    } else {
        statusMessage.textContent = 'Counter cannot go below 0!';
    }
});


resetBtn.addEventListener('click', function () {
    count = 0;
    statusMessage.textContent = '';
    updateDisplay();
});