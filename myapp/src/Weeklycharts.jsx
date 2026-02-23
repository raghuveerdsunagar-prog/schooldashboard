import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

function WeeklyChart({ trends }) {
  // Transform trends into chart-friendly format
  const data = [];
  const grouped = {};

  trends.forEach(item => {
    if (!grouped[item.day]) grouped[item.day] = { day: item.day };
    grouped[item.day][item.activity_type] = item.count;
  });

  for (let day in grouped) {
    data.push(grouped[day]);
  }

  return (
    <div>
      <h3>Weekly Activity Trends</h3>
      <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3"  />
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Lesson Plan" stroke="#8884d8" />
        <Line type="monotone" dataKey="Quiz" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Question Paper" stroke="#ffc658" />
      </LineChart>
    </div>
  );
}

export default WeeklyChart;