import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockList from '../Stocks/StockList';
import AddStock from '../Stocks/AddStock';
import PortfolioChart from '../Charts/PortfolioChart';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const [portfolio, setPortfolio] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3307/api/portfolio', {
          headers: { Authorization: `Bearer ${token}` }, 
        });
        setPortfolio(response.data.portfolio);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
      }
    };
    fetchPortfolio();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div>
      <div className="dashboard-header">
        <h2>Your Portfolio</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <AddStock setPortfolio={setPortfolio} />
      <StockList portfolio={portfolio} setPortfolio={setPortfolio} />
      <PortfolioChart portfolio={portfolio} />
    </div>
  );
}

export default Dashboard;
