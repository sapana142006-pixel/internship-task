// Select DOM Elements
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthMessage = document.getElementById('strengthMessage');
const matchMessage = document.getElementById('matchMessage');
const resetBtn = document.getElementById('resetBtn');

// Checklist Items
const ruleLength = document.getElementById('ruleLength');
const ruleUpper = document.getElementById('ruleUpper');
const ruleLower = document.getElementById('ruleLower');
const ruleNumber = document.getElementById('ruleNumber');
const ruleSpecial = document.getElementById('ruleSpecial');

// Helper function to toggle checklist item styling and icon
function updateChecklistItem(element, isPassed) {
    const icon = element.querySelector('.icon');
    if (isPassed) {
        element.classList.remove('invalid');
        element.classList.add('valid');
        icon.textContent = '✔';
    } else {
        element.classList.remove('valid');
        element.classList.add('invalid');
        icon.textContent = '✖';
    }
}

// Evaluate Password Rules and Strength
function evaluatePassword() {
    const password = passwordInput.value;

    // Check individual criteria
    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;]/.test(password);

    // Update Checklist UI
    updateChecklistItem(ruleLength, hasLength);
    updateChecklistItem(ruleUpper, hasUpper);
    updateChecklistItem(ruleLower, hasLower);
    updateChecklistItem(ruleNumber, hasNumber);
    updateChecklistItem(ruleSpecial, hasSpecial);

    // Handle Empty Input
    if (password.length === 0) {
        strengthBar.className = 'bar-fill';
        strengthMessage.className = 'strength-text empty';
        strengthMessage.textContent = 'Enter a password to check strength';
        checkPasswordMatch();
        return;
    }

    // Count satisfied criteria (0 to 5)
    let passedCriteria = 0;
    if (hasLength) passedCriteria++;
    if (hasUpper) passedCriteria++;
    if (hasLower) passedCriteria++;
    if (hasNumber) passedCriteria++;
    if (hasSpecial) passedCriteria++;

    // Update Strength Bar and Text based on score
    if (passedCriteria <= 2) {
        strengthBar.className = 'bar-fill weak';
        strengthMessage.className = 'strength-text weak';
        strengthMessage.textContent = 'Weak Password';
    } else if (passedCriteria <= 4) {
        strengthBar.className = 'bar-fill medium';
        strengthMessage.className = 'strength-text medium';
        strengthMessage.textContent = 'Medium Password';
    } else {
        strengthBar.className = 'bar-fill strong';
        strengthMessage.className = 'strength-text strong';
        strengthMessage.textContent = 'Strong Password';
    }

    // Re-check Confirm Password match whenever main password changes
    checkPasswordMatch();
}

// Bonus Challenge: Check if Confirm Password matches
function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (confirmPassword.length === 0) {
        matchMessage.textContent = '';
        matchMessage.className = 'match-text';
        return;
    }

    if (password === confirmPassword) {
        matchMessage.textContent = '✔ Passwords Match';
        matchMessage.className = 'match-text matched';
    } else {
        matchMessage.textContent = '✖ Passwords Do Not Match';
        matchMessage.className = 'match-text unmatched';
    }
}

// Show / Hide Password Toggle
togglePasswordBtn.addEventListener('click', function () {
    const isHidden = passwordInput.type === 'password';
    passwordInput.type = isHidden ? 'text' : 'password';
    confirmPasswordInput.type = isHidden ? 'text' : 'password';
    togglePasswordBtn.textContent = isHidden ? 'Hide' : 'Show';
});

// Reset All Fields (Bonus Challenge)
resetBtn.addEventListener('click', function () {
    passwordInput.value = '';
    confirmPasswordInput.value = '';
    passwordInput.type = 'password';
    confirmPasswordInput.type = 'password';
    togglePasswordBtn.textContent = 'Show';
    evaluatePassword();
    passwordInput.focus();
});

// Real-time Input Event Listeners
passwordInput.addEventListener('input', evaluatePassword);
confirmPasswordInput.addEventListener('input', checkPasswordMatch);