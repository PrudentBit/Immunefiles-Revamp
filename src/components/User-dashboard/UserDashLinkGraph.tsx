'use client';

import React from 'react';
import {
  Chart,
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { Line } from 'react-chartjs-2';

const UserDashLinkGraph = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [2, 4, 2, 3, 1, 0, 0],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: '#8E8EFF',
        pointRadius: 0,
        borderWidth: 2,
        tension: 0.02,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#8E8EFF',
          font: {
            size: 13,
          },
        },
        grid: {
          color: '#E0E0E0',
          tickColor: '#FFFFFF',
        },
        border: {
          color: '#FFFFFF',
        },
      },
      x: {
        ticks: {
          color: '#8E8EFF',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default UserDashLinkGraph;
