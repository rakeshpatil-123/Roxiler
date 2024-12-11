const Transaction = require('../models/Transaction');

// API to list transactions
exports.listTransactions = async (req, res) => {
    const { page = 1, perPage = 10, search = '', month } = req.query;

    // Build the query
    const query = {
        ...(month ? { dateOfSale: { $regex: `-${month}-`, $options: 'i' } } : {}),
        ...(search ? { $or: [
            { title: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { category: { $regex: search, $options: 'i' } },
        ] } : {}),
    };

    try {
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(Number(perPage));
        const total = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, total });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};
