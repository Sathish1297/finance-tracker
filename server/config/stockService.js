const axios = require('axios');

const API_KEY = '3SSNT12I3004VJEI';
const BASE_URL = 'https://www.alphavantage.co/query';

const getStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol: symbol,
        interval: '1min',
        apikey: API_KEY
      }
    });

      const data = response.data;
    if (data['Time Series (1min)']) {
      const latestTime = Object.keys(data['Time Series (1min)'])[0];
      const latestData = data['Time Series (1min)'][latestTime];
      const latestPrice = latestData['1. open'];
      return latestPrice;
    } else {
      throw new Error('Invalid stock symbol or API error');
    }
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw new Error('Failed to fetch stock data');
  }
};

module.exports = { getStockData };
