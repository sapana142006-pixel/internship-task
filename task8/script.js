
const quizData = [
    {
        question: "1. What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyperlink and Text Management Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "2. Which CSS property is used to change the text color of an element?",
        options: [
            "font-color",
            "text-style",
            "color",
            "background-color"
        ],
        correct: 2
    },
    {
        question: "3. Inside which HTML element do we put the JavaScript?",
        options: [
            "<js>",
            "<scripting>",
            "<javascript>",
            "<script>"
        ],
        correct: 3
    },
    {
        question: "4. Which symbol is used for single-line comments in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "/* */",
            "#"
        ],
        correct: 1
    },
    {
        question: "5. Which CSS property controls the space between the element's border and its content?",
        options: [
            "margin",
            "spacing",
            "padding",
            "border-gap"
        ],
        correct: 2
    }
];


const questionsContainer = document.getElementById('questionsContainer');
const quizForm = document.getElementById('quizForm');
const errorMessage = document.getElementById('errorMessage');
const resultContainer = document.getElementById('resultContainer');
const scoreText = document.getElementById('scoreText');
const feedbackMessage = document.getElementById('feedbackMessage');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');


function loadQuiz() {
    questionsContainer.innerHTML = '';

    quizData.forEach((item, questionIndex) => {
        const questionBlock = document.createElement('div');
        questionBlock.classList.add('question-block');

        // Question Title
        const questionTitle = document.createElement('p');
        questionTitle.classList.add('question-title');
        questionTitle.textContent = item.question;
        questionBlock.appendChild(questionTitle);

        // Options Container
        const optionsList = document.createElement('div');
        optionsList.classList.add('options-list');

        item.options.forEach((optionText, optionIndex) => {
            const label = document.createElement('label');
            label.classList.add('option-label');
            label.id = `q${questionIndex}_opt${optionIndex}`;

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question${questionIndex}`;
            radio.value = optionIndex;

            label.appendChild(radio);
            label.appendChild(document.createTextNode(optionText));
            optionsList.appendChild(label);
        });

        questionBlock.appendChild(optionsList);
        questionsContainer.appendChild(questionBlock);
    });
}

// Handle Quiz Submission
quizForm.addEventListener('submit', function (event) {
    event.preventDefault(); 

    let score = 0;
    let unansweredCount = 0;
    const userAnswers = [];

    
    quizData.forEach((_, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (!selectedOption) {
            unansweredCount++;
        } else {
            userAnswers.push(parseInt(selectedOption.value));
        }
    });

    
    if (unansweredCount > 0) {
        errorMessage.textContent = `Please answer all questions before submitting! (${unansweredCount} remaining)`;
        return;
    }

    
    errorMessage.textContent = '';

    
    quizData.forEach((item, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = item.correct;

        
        const radios = document.querySelectorAll(`input[name="question${index}"]`);
        radios.forEach(radio => radio.disabled = true);

        const correctLabel = document.getElementById(`q${index}_opt${correctAnswer}`);
        correctLabel.classList.add('correct');

        if (userAnswer === correctAnswer) {
            score++;
        } else {
            const wrongLabel = document.getElementById(`q${index}_opt${userAnswer}`);
            wrongLabel.classList.add('incorrect');
        }
    });


    scoreText.textContent = `${score}/${quizData.length}`;


    if (score >= 4) {
        feedbackMessage.textContent = "Awesome job  !  You have a strong grasp of web development basics!";
    } else if (score === 3) {
        feedbackMessage.textContent = "Good effort ! Review a few concepts and try again to get a top score.";
    } else {
        feedbackMessage.textContent = "Keep practicing ! Review HTML, CSS, and JS fundamentals and give it another shot.";
    }

    
    resultContainer.classList.remove('hidden');
    submitBtn.classList.add('hidden');
});


restartBtn.addEventListener('click', function () {
    resultContainer.classList.add('hidden');
    submitBtn.classList.remove('hidden');
    errorMessage.textContent = '';
    loadQuiz(); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

loadQuiz();