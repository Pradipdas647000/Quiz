// Quiz questions[these are limited ]
/*const questions = [
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mars", "Jupiter", "Venus", "Saturn"],
        correctAnswer: 0
    },
    {
        question: "Who painted the Mona Lisa?",
        choices: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 1
    }
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

// Load question
function loadQuestion() {
    const question = questions[currentQuestion];
    questionEl.textContent = question.question;

    choicesEl.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("choice");
        button.addEventListener("click", () => selectChoice(i));
        choicesEl.appendChild(button);
    }

    submitBtn.style.display = "none";
    resultEl.textContent = "";
}

// Select choice
function selectChoice(choiceIndex) {
    const buttons = choicesEl.getElementsByTagName("button");
    for (let button of buttons) {
        button.classList.remove("selected");
    }
    buttons[choiceIndex].classList.add("selected");
    submitBtn.style.display = "block";
}

// Submit answer
submitBtn.addEventListener("click", () => {
    const selectedButton = choicesEl.querySelector(".selected");
    if (!selectedButton) return;

    const selectedAnswer = Array.from(choicesEl.children).indexOf(selectedButton);
    const question = questions[currentQuestion];

    if (selectedAnswer === question.correctAnswer) {
        score++;
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Incorrect. The correct answer was: " + question.choices[question.correctAnswer];
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(showFinalScore, 2000);
    }
});

// Show final score
function showFinalScore() {
    questionEl.textContent = `Quiz completed! Your score: ${score} out of ${questions.length}`;
    choicesEl.innerHTML = "";
    submitBtn.style.display = "none";
    resultEl.textContent = "";
}

// Start the quiz[attend multiple questions]
loadQuestion();*/
let questions = [];
let currentQuestion = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

// Fetch questions from API
async function fetchQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    questions = data.results.map(q => ({
        question: q.question,
        choices: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
        correctAnswer: q.correct_answer
    }));
    loadQuestion();
}

// Load question
function loadQuestion() {
    const question = questions[currentQuestion];
    questionEl.innerHTML = question.question;

    choicesEl.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const choice = question.choices[i];
        const button = document.createElement("button");
        button.innerHTML = choice;
        button.classList.add("choice");
        button.addEventListener("click", () => selectChoice(i));
        choicesEl.appendChild(button);
    }

    submitBtn.style.display = "none";
    resultEl.textContent = "";
}

// Select choice
function selectChoice(choiceIndex) {
    const buttons = choicesEl.getElementsByTagName("button");
    for (let button of buttons) {
        button.classList.remove("selected");
    }
    buttons[choiceIndex].classList.add("selected");
    submitBtn.style.display = "block";
}

// Submit answer
submitBtn.addEventListener("click", () => {
    const selectedButton = choicesEl.querySelector(".selected");
    if (!selectedButton) return;

    const selectedAnswer = selectedButton.innerHTML;
    const question = questions[currentQuestion];

    if (selectedAnswer === question.correctAnswer) {
        score++;
        resultEl.textContent = "Correct!";
    } else {
        resultEl.textContent = "Incorrect. The correct answer was: " + question.correctAnswer;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
        setTimeout(loadQuestion, 2000);
    } else {
        setTimeout(showFinalScore, 2000);
    }
});

// Show final score
function showFinalScore() {
    questionEl.textContent = `Quiz completed! Your score: ${score} out of ${questions.length}`;
    choicesEl.innerHTML = "";
    submitBtn.style.display = "none";
    resultEl.textContent = "";
}

// Start the quiz
fetchQuestions();
