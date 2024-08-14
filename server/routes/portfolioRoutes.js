const express = require('express');
const { getPortfolio, addStock, removeStock } = require('../controllers/portfolioController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authenticate, getPortfolio);
router.post('/add', authenticate, addStock);
router.delete('/remove/:id', authenticate, removeStock);

module.exports = router;
