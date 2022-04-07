import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'right',
      labels: {
        boxWidth: 10,
        boxHeight: 10,
      },
    },
  },
};

const data = {
  labels: ['Cash', 'Online Money'],
  datasets: [
    {
      label: ['Cash', 'Online Money'],
      data: [5500, 3000],
      backgroundColor: ['rgba(0, 192, 255, 1)', 'rgba(255, 216, 0, 1)'],
      borderColor: ['rgba(0, 192, 255, 1)', 'rgba(255, 216, 0, 1)'],
      borderWidth: 1,
    },
  ],
};

export default function Card() {
  return (
    <div className="card-container">
      <h3>Mohammed Arshad</h3>
      <div className="pie-container">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
