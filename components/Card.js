import { Fragment } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip);

const legend = [
  { title: 'Cash', id: 'cash', color: '#00C0FF' },
  { title: 'Online Money', id: 'onlineMoney', color: '#FFD800' },
];

export default function Card({ data }) {
  const pieData = {
    labels: ['Cash', 'Online Money', 'None'],
    datasets: [
      {
        label: ['Cash', 'Online Money', 'None'],
        data: [data.cash, data.online, 0.0001],
        backgroundColor: [
          'rgba(0, 192, 255, 1)',
          'rgba(255, 216, 0, 1)',
          '#ccc',
        ],
        borderColor: [
          'rgba(0, 192, 255, 1)',
          'rgba(255, 216, 0, 1)',
          'rgba(255, 216, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className="card-container">
      <h3>{data.name || ''}</h3>
      <div className="pie-container">
        <Pie data={pieData} options={{ radius: 80 }} />
      </div>
      <div className="legend">
        {legend.map(item => (
          <Fragment key={item.id}>
            <div className="item">
              <div className="color" style={{ backgroundColor: item.color }} />
              <div className="title">{item.title}</div>
            </div>
            <div className="number">
              {item.id === 'cash' ? data.cash : data.online}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
