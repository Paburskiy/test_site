// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// Подключение к базе данных MongoDB
mongoose.connect('mongodb://localhost:27017/tests', { useNewUrlParser: true, useUnifiedTopology: true });

// Определим схему для тестов
const testSchema = new mongoose.Schema({
    name: String,
    questions: [
        {
            question: String,
            answers: [String],
            correctAnswer: Number
        }
    ]
});

const Test = mongoose.model('Test', testSchema);

app.use(express.json());

// API для добавления тестов
app.post('/api/tests', async (req, res) => {
    try {
        const test = new Test(req.body);
        await test.save();
        res.status(201).send(test);
    } catch (error) {
        res.status(400).send(error);
    }
});

// API для получения всех тестов
app.get('/api/tests', async (req, res) => {
    try {
        const tests = await Test.find();
        res.status(200).send(tests);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});
