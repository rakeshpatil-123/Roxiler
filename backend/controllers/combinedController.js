const { listTransactions } = require('./transactionController');
const { getStatistics } = require('./statisticsController');
const { getBarChart } = require('./barChartController');
const { getPieChart } = require('./pieChartController');

exports.getCombinedData = async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ message: 'Month is required' });
    }

    try {
        const transactionsPromise = listTransactions(req, res);
        const statisticsPromise = getStatistics(req, res);
        const barChartPromise = getBarChart(req, res);
        const pieChartPromise = getPieChart(req, res);

        // Wait for all promises to resolve
        const [transactions, statistics, barChart, pieChart] = await Promise.all([
            transactionsPromise,
            statisticsPromise,
            barChartPromise,
            pieChartPromise,
        ]);

        // Combine all responses into a single object
        const combinedData = {
            transactions: transactions.transactions,
            statistics,
            barChart,
            pieChart,
        };

        res.status(200).json(combinedData);
    } catch (error) {
        console.error('Error fetching combined data:', error.message);
        res.status(500).json({ message: 'Error fetching combined data', error });
    }
};
