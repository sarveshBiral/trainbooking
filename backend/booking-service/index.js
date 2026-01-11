const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3004;

// Prometheus Metrics Setup
const client = require('prom-client');
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

app.get('/', (req, res) => {
    res.send('Booking Service is running!');
});

let bookings = [];

app.post('/bookings', (req, res) => {
    const { userId, trainId, seats } = req.body;
    const booking = { id: bookings.length + 1, userId, trainId, seats, status: 'CONFIRMED' };
    bookings.push(booking);
    res.status(201).json(booking);
});

app.get('/bookings/all', (req, res) => {
    res.json(bookings);
});

app.post('/bookings/cancel', (req, res) => {
    const { bookingId } = req.body;
    res.json({ message: `Booking ${bookingId} cancelled` });
});

app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});
