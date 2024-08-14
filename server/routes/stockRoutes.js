const express = require('express');
const { fetchStockData } = require('../controllers/stockController');
const router = express.Router();

router.get('/real-time', fetchStockData);

module.exports = router;
