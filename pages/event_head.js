import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useAuth } from 'lib/AuthProvider';
import Tooltip from '@mui/material/Tooltip';
import PageHead from 'components/PageHead';
import {
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  LinearScale,
  CategoryScale,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from 'lib/firebase';

const Doughnut = dynamic(() => import('components/Doughnut'));
const Card = dynamic(() => import('components/Card'));

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

const barData = yearData => ({
  labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
  datasets: [
    {
      data: yearData,
      backgroundColor: [
        'rgba(0, 192, 255, 1)',
        'rgba(255, 216, 0, 1)',
        'rgba(0, 192, 255, 1)',
        'rgba(255, 216, 0, 1)',
      ],
    },
  ],
});

export default function EventHead({ users, ticketsSold, yearData }) {
  const { currentUser, logout } = useAuth();
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push('/auth');
  });

  const onChange = e => {
    const { value } = e.target;
    const newUsers = users.filter(x =>
      x.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearch(value);
    setFilteredUsers(newUsers);
  };

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
              {currentUser?.displayName.split(' ').map(x => x[0])}
            </div>
          </Tooltip>
        </nav>
        <div className="eventhead-body">
          <div className="overall-stats">
            <h3>Overall Statistics</h3>
            <div className="data">
              <Doughnut ticketsSold={ticketsSold} />
              <div className="tickets-sold">
                <h3>Tickets Sold</h3>
                <Bar data={barData(yearData)} options={options} />
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
                onChange={onChange}
              />
            </div>
            <div className="stats">
              {filteredUsers.length > 0
                ? filteredUsers.map(user => (
                    <Card key={user.name} data={user} />
                  ))
                : users.map(user => <Card key={user.name} data={user} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ res }) => {
  // if (!ctxQuery.code || ctxQuery.code === 'undefined') {
  //   res.statusCode = 302;
  //   res.setHeader('Location', '/auth');
  //   return { props: {} };
  // }
  const usersQuerySnapshot = await getDocs(
    query(collection(firestore, 'users'), orderBy('registrations', 'desc'))
  );
  let users = [];
  let ticketsSold = 0;
  let yearData = [0, 0, 0, 0];
  for (const userDoc of usersQuerySnapshot.docs) {
    const userData = userDoc.data();
    let x = { name: userData.fullName, cash: 0, online: 0 };
    const registrationsSnapshot = await getDocs(
      query(
        collection(firestore, 'registrations'),
        where('hasPaid', '==', true),
        where('referral_code', '==', userData.referral_code)
      )
    );
    ticketsSold += registrationsSnapshot.size;
    registrationsSnapshot.forEach(regDoc => {
      const regData = regDoc.data();
      if (regData.paymentLink) x.online += 200;
      else x.cash += 200;
      const year = parseInt(regData.year);
      yearData[year - 1] += 1;
    });
    users.push(x);
  }
  return {
    props: {
      users,
      ticketsSold,
      yearData,
    },
  };
};
