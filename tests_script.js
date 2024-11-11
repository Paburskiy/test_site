function addQuestion() {
    const questionsContainer = document.getElementById('questions-container');
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');
    questionDiv.innerHTML = `
        <input type="text" placeholder="Questions" required>
        <input type="text" placeholder="Responce 1" required>
        <input type="text" placeholder="Responce 2" required>
        <input type="text" placeholder="Responce 3" required>
        <input type="text" placeholder="Responce 4" required>
        <label>Correct answer:
            <input type="number" min="1" max="4" required>
        </label>
    `;
    questionsContainer.appendChild(questionDiv);
}

document.getElementById('test-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const testName = document.getElementById('test-name').value;
    const questions = Array.from(document.querySelectorAll('.question')).map(questionDiv => {
        const inputs = questionDiv.querySelectorAll('input');
        return {
            question: inputs[0].value,
            answers: [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value],
            correctAnswer: parseInt(inputs[5].value) - 1
        };
    });

    const response = await fetch('/api/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: testName, questions })
    });
    if (response.ok) alert('Test added!');
});

async function fetchTests() {
    try {
       const response = await fetch('http://localhost:3000/tests');
       const tests = await response.json();
 
       const testList = document.getElementById('test-list');
       tests.forEach(test => {
          const testDiv = document.createElement('div');
          testDiv.innerText = test.title;
          testList.appendChild(testDiv);
       });
    } catch (error) {
       console.error('Ошибка при получении тестов:', error);
    }
 }
 
 fetchTests(); 