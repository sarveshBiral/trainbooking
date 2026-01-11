const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3003;

app.get('/', (req, res) => {
    res.send('Train Service is running!');
});

const trains = [
    { id: '1', name: 'Express Alpha', source: 'New York', destination: 'Boston', price: 100 },
    { id: '2', name: 'Super Beta', source: 'Boston', destination: 'New York', price: 120 },
    { id: '3', name: 'Rapid Gamma', source: 'New York', destination: 'Chicago', price: 200 }
];

app.get('/trains/search', (req, res) => {
    const { from, to } = req.query;
    if (!from || !to) {
        return res.json(trains);
    }
    const results = trains.filter(t =>
        t.source.toLowerCase() === from.toLowerCase() &&
        t.destination.toLowerCase() === to.toLowerCase()
    );
    res.json(results);
});

app.get('/trains/:id', (req, res) => {
    const train = trains.find(t => t.id === req.params.id);
    if (train) res.json(train);
    else res.status(404).send('Train not found');
});

app.listen(PORT, () => {
    console.log(`Train Service running on port ${PORT}`);
});
