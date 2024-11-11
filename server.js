// server.js (продолжение)
app.get('/api/tests/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        res.send(test);
    } catch (error) {
        res.status(404).send({ error: 'Test not found' });
    }
});

app.post('/api/tests/:id/check', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        const userAnswers = req.body.answers;
        let score = 0;

        test.questions.forEach((question, index) => {
            if (userAnswers[index] === question.correctAnswer) {
                score++;
            }
        });

        res.send({ score, total: test.questions.length });
    } catch (error) {
        res.status(500).send({ error: 'Error of problem checking' });
    }
});