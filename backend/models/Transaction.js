const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    price: Number,
    dateOfSale: Date,
    isSold: Boolean,
    category: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
