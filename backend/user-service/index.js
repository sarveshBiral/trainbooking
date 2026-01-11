const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => {
    res.send('User Service is running!');
});

// Mock Data
const userProfile = {
    username: 'traveler_one',
    email: 'traveler@example.com',
    preferences: ['Window Seat', 'Vegetarian']
};

app.get('/users/profile', (req, res) => {
    // In real app, verify JWT header here
    res.json(userProfile);
});

app.get('/users/history', (req, res) => {
    // Mock booking history
    res.json([
        { id: 101, train: 'Express A', date: '2025-01-20' },
        { id: 102, train: 'Superfast B', date: '2025-02-15' }
    ]);
});

app.listen(PORT, () => {
    console.log(`User Service running on port ${PORT}`);
});
