// Quiz questions
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which programming language runs in the browser?",
        options: ["Python", "Java", "C++", "JavaScript"],
        correct: 3
    }
];

let currentQuestion = 0; // Tracks the current question index
let score = 0;           // Tracks the user's score
let isAnswered = false;  // Prevents multiple clicks on options

// DOM Elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");
const resultElement = document.getElementById("result");
const feedbackElement = document.getElementById("feedback");

// Load the current question
function loadQuestion() {
    if (currentQuestion < questions.length) {
        const current = questions[currentQuestion];
        questionElement.textContent = current.question;
        optionsElement.innerHTML = "";
        feedbackElement.textContent = "";
        isAnswered = false;

        // Create buttons for each option
        current.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.classList.add("btn", "btn-outline-primary", "option-btn");
            button.addEventListener("click", () => checkAnswer(index, button));
            optionsElement.appendChild(button);
        });
    } else {
        // Quiz is over, display the result
        questionElement.textContent = "Quiz Over!";
        optionsElement.innerHTML = "";
        resultElement.textContent = `Your score: ${score}/${questions.length}`;
        nextButton.style.display = "none";

        // Add Restart Button
        const restartButton = document.createElement("button");
        restartButton.textContent = "Restart Quiz";
        restartButton.classList.add("btn", "btn-secondary", "w-100", "restart-btn");
        restartButton.addEventListener("click", restartQuiz);
        optionsElement.appendChild(restartButton);
    }
}

// Check the selected answer
function checkAnswer(selected, button) {
    if (isAnswered) return; // Prevent multiple answers
    const correct = questions[currentQuestion].correct;
    isAnswered = true;

    if (selected === correct) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.classList.add("text-success");
        feedbackElement.classList.remove("text-danger");
        button.classList.add("btn-success");
    } else {
        feedbackElement.textContent = "Incorrect!";
        feedbackElement.classList.add("text-danger");
        feedbackElement.classList.remove("text-success");
        button.classList.add("btn-danger");
    }

    // Disable all buttons after answering
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach((btn) => btn.setAttribute("disabled", "true"));
}

// Event listener for the "Next" button
nextButton.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});

// Restart the quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultElement.textContent = "";
    nextButton.style.display = "block";
    loadQuestion();
}

// Load the first question
loadQuestion();