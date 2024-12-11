const express = require('express');
const { listTransactions } = require('../controllers/transactionController');
const { getStatistics } = require('../controllers/statisticsController');
const { getBarChart } = require('../controllers/barChartController');
const { getPieChart } = require('../controllers/pieChartController');
const { getCombinedData } = require('../controllers/combinedController'); // This is the new controller

const router = express.Router();

router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData); // Combined data route

module.exports = router;
