const Transaction = require('../models/Transaction');

exports.getStatistics = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $regex: `-${month}-`, $options: 'i' },
        });

        const totalSale = transactions.reduce((sum, item) => sum + item.price, 0);
        const soldItems = transactions.filter((item) => item.isSold).length;
        const unsoldItems = transactions.length - soldItems;

        res.status(200).json({ totalSale, soldItems, unsoldItems });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error });
    }
};
