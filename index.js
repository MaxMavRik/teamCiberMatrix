// варіанти відповідей 4 
let questionsArray = []; 

function saveQuestion() {
    const questionText = document.getElementById("questionText").value;
    const answers = document.querySelectorAll(".answer");
    const correctAnswer = document.getElementById("correctAnswer").value;

    if (!questionText.trim() || [...answers].some(a => !a.value.trim())) {
        alert("Заповніть всі поля!");
        return;
    }

    let questionObject = {
        question: questionText,
        options: [
            answers[0].value,
            answers[1].value,
            answers[2].value,
            answers[3].value
        ],
        correct: parseInt(correctAnswer) 
    };

    questionsArray.push(questionObject);

    
    document.getElementById("questionText").value = "";
    answers.forEach(input => input.value = "");

    console.log("Збережено питання:", questionsArray);

    displayQuestions();
}

function displayQuestions() {
    const container = document.getElementById("questionsContainer");
    container.innerHTML = ""; 

    questionsArray.forEach((question, index) => {
        const questionBox = document.createElement("div");
        questionBox.classList.add("question-box");

        const questionText = document.createElement("h3");
        questionText.textContent = `${index + 1}. ${question.question}`;
        questionBox.appendChild(questionText);

        question.options.forEach((option, i) => {
            const answerBtn = document.createElement("button");
            answerBtn.textContent = option;
            answerBtn.classList.add("answer-btn");
            answerBtn.onclick = () => checkAnswer(index, i);
            questionBox.appendChild(answerBtn);
        });

        container.appendChild(questionBox);
    });
}

function checkAnswer(questionIndex, selectedOption) {
    const correctAnswer = questionsArray[questionIndex].correct;
    if (selectedOption === correctAnswer) {
        alert("Правильно! ✅");
    } else {
        alert("Неправильно! ❌");
    }
}

document.getElementById("saveQuestionBtn").addEventListener("click", saveQuestion);



///////////////////////////////////////////////////////////////

