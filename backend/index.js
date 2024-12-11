const express = require('express');
const connectDB = require('./config/db');
const seedData = require('./seed/seedData');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

// Seed the database on server startup
seedData();

// Define routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
