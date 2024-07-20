document.addEventListener('DOMContentLoaded', () => {
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
        }
        // Add more questions as needed
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const questionNumberElement = document.getElementById('question-number');
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const submitButton = document.getElementById('submit-button');

    function loadQuestion() {
        clearTimeout(timer);
        if (currentQuestionIndex < questions.length) {
            const currentQuestion = questions[currentQuestionIndex];
            questionElement.textContent = currentQuestion.question;
            questionNumberElement.textContent = currentQuestionIndex + 1;
            optionsElement.innerHTML = '';

            currentQuestion.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.textContent = option;
                button.onclick = () => selectOption(index);
                optionsElement.appendChild(button);
            });

            startTimer();
        } else {
            showResults();
        }
    }

    function startTimer() {
        let timeRemaining = 60;
        timerElement.textContent = timeRemaining;

        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = timeRemaining;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                checkAnswer(-1); // -1 to indicate time ran out
            }
        }, 1000);
    }

    function selectOption(index) {
        clearInterval(timer);
        checkAnswer(index);
    }

    function checkAnswer(selectedIndex) {
        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = selectedIndex === currentQuestion.correct;
        if (isCorrect) {
            score++;
            scoreElement.textContent = score;
        }

        // Provide feedback (e.g., change button color)
        optionsElement.childNodes.forEach((button, index) => {
            if (index === currentQuestion.correct) {
                button.style.backgroundColor = 'green';
            } else {
                button.style.backgroundColor = 'red';
            }
            button.disabled = true;
        });

        submitButton.disabled = false;
    }

    submitButton.addEventListener('click', () => {
        currentQuestionIndex++;
        loadQuestion();
        submitButton.disabled = true;
    });

    function showResults() {
        questionElement.textContent = 'Quiz Over! Your score: ' + score;
        optionsElement.innerHTML = '';
        submitButton.style.display = 'none';
    }

    loadQuestion();
});
