import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function PortfolioChart({ portfolio }) {
  if (!portfolio || portfolio.length === 0) {
    return <div>No data available</div>;
  }

  const data = portfolio.map((item) => ({
    name: item?.Stock?.symbol || 'Unknown',
    value: item.quantity * 100, // Example: price * quantity
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PortfolioChart;
