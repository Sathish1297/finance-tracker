const axios = require('axios');

exports.fetchStockData = async (req, res) => {
  const { symbol } = req.query;
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '5min',
        apikey: process.env.STOCK_API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stock data' });
  }
};
