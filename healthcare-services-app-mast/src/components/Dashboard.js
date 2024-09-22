import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

function Dashboard({ services }) {
  const totalServices = services.length;
  const totalValue = services.reduce((sum, service) => sum + service.price, 0);
  const averagePrice = totalValue / totalServices || 0;

  const priceRanges = [
    { name: '0-50', count: 0 },
    { name: '51-100', count: 0 },
    { name: '101-200', count: 0 },
    { name: '201+', count: 0 },
  ];

  services.forEach(service => {
    if (service.price <= 50) priceRanges[0].count++;
    else if (service.price <= 100) priceRanges[1].count++;
    else if (service.price <= 200) priceRanges[2].count++;
    else priceRanges[3].count++;
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="stats">
        <div className="stat-card">
          <h3>Total Services</h3>
          <p>{totalServices}</p>
        </div>
        <div className="stat-card">
          <h3>Total Value</h3>
          <p>${totalValue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Average Price</h3>
          <p>${averagePrice.toFixed(2)}</p>
        </div>
      </div>
      <div className="charts">
        <div className="chart">
          <h3>Services by Price Range</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={priceRanges}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {priceRanges.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h3>Service Prices</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={services}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;