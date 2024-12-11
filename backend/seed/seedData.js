const axios = require('axios');
const Transaction = require('../models/Transaction'); // Mongoose model for transactions

const seedData = async () => {
    try {
        console.log('Fetching data from third-party API...');
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        console.log('Seeding data into the database...');
        await Transaction.deleteMany(); // Clear existing records
        await Transaction.insertMany(transactions); // Insert new records

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding data:', error.message);
    }
};

module.exports = seedData;
