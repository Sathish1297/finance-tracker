import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockList from '../Stocks/StockList';
import AddStock from '../Stocks/AddStock';
import PortfolioChart from '../Charts/PortfolioChart';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import PieChart2 from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';

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
  }, [portfolio]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  return (
    <div className='dashboard'>
      <div className="dashboard-header">
        <h2>Portfolio Dashboard</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className='container'>
        <div className='left-container'>
          <AddStock setPortfolio={setPortfolio} />
          <StockList portfolio={portfolio} setPortfolio={setPortfolio} />
        </div>
        <div className='right-container'>
          <PortfolioChart portfolio={portfolio} />
          <PieChart2 portfolio={portfolio} />
          <BarChart portfolio={portfolio} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
