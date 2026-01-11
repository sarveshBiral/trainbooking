const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3005;

app.get('/', (req, res) => {
    res.send('Admin Service is running!');
});

app.get('/admin/stats', (req, res) => {
    res.json({
        totalUsers: 150,
        activeBookings: 45,
        revenue: 12500,
        systemHealth: 'Good'
    });
});

app.listen(PORT, () => {
    console.log(`Admin Service running on port ${PORT}`);
});
