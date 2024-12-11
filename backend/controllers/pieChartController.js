const Transaction = require('../models/Transaction');

exports.getPieChart = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        const transactions = await Transaction.find({
            dateOfSale: { $regex: `-${month}-`, $options: 'i' },
        });

        const categoryCounts = transactions.reduce((acc, item) => {
            acc[item.category] = (acc[item.category] || 0) + 1;
            return acc;
        }, {});

        const chartData = Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            count,
        }));

        res.status(200).json(chartData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pie chart data', error });
    }
};
