// tests.js
async function loadTests() {
    const response = await fetch('/api/tests');
    const tests = await response.json();
    const container = document.getElementById('tests-container');

    tests.forEach(test => {
        const testElement = document.createElement('div');
        testElement.className = 'test-item';
        testElement.innerHTML = `<h3>${test.name}</h3><button onclick="startTest('${test._id}')">Pass test</button>`;
        container.appendChild(testElement);
    });
}

function startTest(testId) {
    window.location.href = `take-test.html?id=${testId}`;
}

loadTests();