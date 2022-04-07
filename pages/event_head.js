import { useState } from 'react';
import Image from 'next/image';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from 'lib/AuthProvider';
import PageHead from 'components/PageHead';
import {
  Chart as ChartJS,
  Title,
  Tooltip as ChartTooltip,
  LinearScale,
  CategoryScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Doughnut from 'components/Doughnut';
import Card from 'components/Card';

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip);

const options = {
  responsive: true,
  borderRadius: 8,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const barData = {
  labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
  datasets: [
    {
      data: [10, 20, 30, 10],
      backgroundColor: [
        'rgba(0, 192, 255, 1)',
        'rgba(255, 216, 0, 1)',
        'rgba(0, 192, 255, 1)',
        'rgba(255, 216, 0, 1)',
      ],
    },
  ],
};

export default function EventHead() {
  const { currentUser, logout } = useAuth();
  const [search, setSearch] = useState('');
  return (
    <>
      <PageHead
        title="Event Head | SYCon2k22"
        description="Event Head | SYCon2k22"
      />
      <div className="eventhead-container">
        <nav className="eventhead-header">
          <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
          <Tooltip title="Logout" onClick={logout}>
            <div className="user">
              {currentUser?.displayName.split(' ').map(x => x[0]) || '12'}
            </div>
          </Tooltip>
        </nav>
        <div className="eventhead-body">
          <div className="overall-stats">
            <h3>Overall Statistics</h3>
            <div className="data">
              <Doughnut ticketsSold={100} />
              <div className="tickets-sold">
                <h3>Tickets Sold</h3>
                <Bar data={barData} options={options} />
              </div>
            </div>
          </div>
          <div className="individual-stats">
            <div className="header">
              <h3>Individual Statistics</h3>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="stats">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export const getServerSideProps = async ({ res, query: ctxQuery }) => {
//   if (!ctxQuery.code || ctxQuery.code === 'undefined') {
//     res.statusCode = 302;
//     res.setHeader('Location', '/auth');
//     return { props: {} };
//   }
// };
