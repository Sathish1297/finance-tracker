import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
  Legend,
  Bar,
  Line,
} from 'recharts';

function BarChart({ portfolio }) {
  if (!portfolio || portfolio.length === 0) {
    return <div>No data available</div>;
  }

  const data = portfolio.map((item) => ({
    name: item?.Stock?.symbol || 'Unknown',
    value: item.quantity * 100, // Example: price * quantity
  }));

  return (
    <ComposedChart width={730} height={250} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="value" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
    </ComposedChart>
  );
}

export default BarChart;
