import React, { useState } from 'react';
import axios from 'axios';

function AddStock({ setPortfolio }) {
  const [symbol, setSymbol] = useState('');
  const [quantity, setQuantity] = useState('');
  const API_KEY = '3SSNT12I3004VJEI';
  const BASE_URL = 'https://www.alphavantage.co/query';

  const handleAddStock = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const responseBase = await axios.get(BASE_URL, {
        params: {
          function: 'TIME_SERIES_INTRADAY',
          symbol: symbol,
          interval: '1min',
          apikey: API_KEY
        }
      });
      const data = responseBase.data;
      console.log({ responseBase },data);
      if (data) {
        const response = await axios.post('http://localhost:3307/api/portfolio/add', { symbol, quantity }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio((prev) => [...prev, response.data.portfolio]);
      }
    } catch (err) {
      alert('Failed to add stock');
    }
  };

  return (
    <form onSubmit={handleAddStock}>
      <input type="text" value={symbol} onChange={(e) => setSymbol(e.target.value)} placeholder="Stock Symbol" required />
      <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
      <button type="submit">Add Stock</button>
    </form>
  );
}

export default AddStock;
