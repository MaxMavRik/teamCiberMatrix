// Масиви запитань для різних рівнів складності
const easyQuestions = [
    { question: "Яка столиця Бразилії?", options: ["Сан-Томе", "Афіни", "Бразиліа", "Порт-Морсбі"], correct: 2 },
    { question: "Яка столиця України?", options: ["Львів", "Київ", "Харків", "Одеса"], correct: 1 },
    { question: "Яка столиця Франції?", options: ["Берлін", "Рим", "Париж", "Мадрид"], correct: 2 }
];

const hardQuestions = [
    { question: "Яка відстань від Землі до Місяця?", options: ["384 400 км", "500 000 км", "250 000 км", "100 000 км"], correct: 0 },
    { question: "Що таке O(n) в алгоритмах?", options: ["Часова складність", "Математична формула", "Кількість ітерацій", "Змінна"], correct: 0 },
    { question: "Яка найбільша пустеля у світі?", options: ["Сахара", "Антарктична", "Гобі", "Калахарі"], correct: 1 }
];

// Вибір рівня складності
let currentQuestions = easyQuestions;
if (localStorage.getItem("difficulty") === "hard") {
    currentQuestions = hardQuestions;
}

let currentQuestion = 0;
let completedQuizzes = JSON.parse(localStorage.getItem("completedQuizzes")) || [];

// Завантаження запитання
function loadQuestion() {
    if (currentQuestion >= currentQuestions.length) {
        showFinalScreen();
        return;
    }

    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    questionEl.textContent = currentQuestions[currentQuestion].question;
    optionsEl.innerHTML = "";

    currentQuestions[currentQuestion].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(index);
        optionsEl.appendChild(button);
    });
}

// Перевірка відповіді
function checkAnswer(index) {
    const feedbackEl = document.getElementById("feedback");
    if (index === currentQuestions[currentQuestion].correct) {
        feedbackEl.textContent = "Правильно!";
        completedQuizzes.push(currentQuestions[currentQuestion].question);
    } else {
        feedbackEl.textContent = "Неправильно!";
    }
    currentQuestion++;
    setTimeout(loadQuestion, 1000);
}

// Випадковий ще не пройдений квест
function loadRandomQuiz() {
    let remainingQuizzes = currentQuestions.filter(q => !completedQuizzes.includes(q.question));
    if (remainingQuizzes.length === 0) {
        alert("Всі квести пройдені!");
        return;
    }
    currentQuestion = currentQuestions.indexOf(remainingQuizzes[Math.floor(Math.random() * remainingQuizzes.length)]);
    loadQuestion();
}

// Оцінювання після проходження
function showFinalScreen() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Вікторина завершена!</h2>
        <p>Оцініть її:</p>
        <button onclick="rateQuiz(1)">★</button>
        <button onclick="rateQuiz(2)">★★</button>
        <button onclick="rateQuiz(3)">★★★</button>
        <button onclick="rateQuiz(4)">★★★★</button>
        <button onclick="rateQuiz(5)">★★★★★</button>
        <button onclick="goHome()">На головну</button>
    `;
}

function rateQuiz(stars) {
    alert("Ви оцінили квест на " + stars + " зірок!");
}

function goHome() {
    window.location.href = "viktoruna.html";
}

document.addEventListener("DOMContentLoaded", loadQuestion);
