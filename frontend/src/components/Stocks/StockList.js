import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StockList({ portfolio, setPortfolio }) {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const fetchStockData = async () => {
      const token = localStorage.getItem('token');

      try {
        // Use Promise.all to wait for all requests to complete
        const dataPromises = portfolio.map((item) =>
          axios.get('http://localhost:3307/api/stocks/real-time', {
            params: { symbol: item.Stock.symbol },
            headers: { Authorization: `Bearer ${token}` },
          })
        );

        const responses = await Promise.all(dataPromises);

        // Update stockData state with the fetched data
        const newStockData = {};
        responses.forEach((response, index) => {
          const symbol = portfolio[index].Stock.symbol;
          newStockData[symbol] = response.data['Time Series (5min)'];
        });

        setStockData(newStockData);
      } catch (err) {
        console.error('Failed to fetch stock data', err);
      }
    };

    if (portfolio.length > 0) {
      fetchStockData();
    }
  }, [portfolio]);

  const handleRemoveStock = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3307/api/portfolio/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert('Failed to remove stock');
    }
  };

  return (
    <ul>
      {portfolio.map((item) => (
        <li key={item.id}>
          {item?.Stock?.symbol} - {item.quantity} shares
          {stockData[item?.Stock?.symbol] && (
            <div>
              Latest Price: $
              {
                stockData[item.Stock.symbol][
                  Object.keys(stockData[item.Stock.symbol])[0]
                ]['4. close']
              }
            </div>
          )}
          <button onClick={() => handleRemoveStock(item.id)}>Remove</button>
        </li>
      ))}
    </ul>
  );
}

export default StockList;
