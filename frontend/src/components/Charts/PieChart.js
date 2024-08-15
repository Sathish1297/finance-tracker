import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';

function PieChart2({ portfolio }) {
  if (!portfolio || portfolio.length === 0) {
    return <div>No data available</div>;
  }

  const data = portfolio.map((item) => ({
    name: item?.Stock?.symbol || 'Unknown',
    value: item.quantity * 100, // Example: price * quantity
  }));

  return (
    <ResponsiveContainer width="30%" height={300}>
      {/* <LineChart data={data}>
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
      </LineChart> */}
      <PieChart width={730} height={350} data={data}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label />
        </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChart2;
