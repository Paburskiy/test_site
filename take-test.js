// take-test.js
const urlParams = new URLSearchParams(window.location.search);
const testId = urlParams.get('id');

async function loadTest() {
    const response = await fetch(`/api/tests/${testId}`);
    const test = await response.json();
    document.getElementById('test-name').innerText = test.name;

    const quizForm = document.getElementById('quiz-form');
    test.questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `<p>${q.question}</p>`;

        q.answers.forEach((answer, i) => {
            const answerElem = document.createElement('label');
            answerElem.innerHTML = `
                <input type="radio" name="question${index}" value="${i}">
                ${answer}
            `;
            questionDiv.appendChild(answerElem);
        });

        quizForm.appendChild(questionDiv);
    });
}

function submitQuiz() {
    const quizForm = document.getElementById('quiz-form');
    const answers = [];

    Array.from(quizForm.elements).forEach((input, index) => {
        if (input.checked) {
            answers.push(parseInt(input.value));
        }
    });

    checkAnswers(answers);
}

async function checkAnswers(userAnswers) {
    const response = await fetch(`/api/tests/${testId}/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: userAnswers })
    });
    const result = await response.json();
    document.getElementById('result').innerText = `Your result: ${result.score} from ${result.total}`;
}

loadTest();