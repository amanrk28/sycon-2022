import { FC, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAuth } from 'lib/AuthProvider';
import PageHead from 'components/PageHead';
import {
  Chart as ChartJS,
  Tooltip as ChartTooltip,
  LinearScale,
  CategoryScale,
  BarElement,
} from 'chart.js';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from 'lib/firebase';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { Tooltip } from 'antd';
import {
  IndividualStats,
  OverallStats,
  User,
} from 'components/organizer-dashboard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Header = styled.nav`
  background-color: white;
  padding: 30px 5%;
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 32px rgba(100, 100, 100, 0.2);
  z-index: 10;
`;

const UserBox = styled.div`
  background-color: #00c0ff;
  color: white;
  font-size: 18px;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2% 5% 5%;
  background-color: #eee;
`;

ChartJS.register(CategoryScale, LinearScale, BarElement, ChartTooltip);

interface Props {
  users: User[];
  ticketsSold: number;
  yearData: number[];
}

const Organizer: FC<Props> = ({ users, ticketsSold, yearData }) => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) router.push('/auth');
  });

  if (!currentUser) return null;

  return (
    <>
      <PageHead
        title="Event Head | SYCon2k22"
        description="Event Head | SYCon2k22"
      />
      <Container>
        <Header>
          <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
          <Tooltip title="Logout">
            <UserBox onClick={logout}>
              {currentUser?.displayName?.split(' ').map(x => x[0])}
            </UserBox>
          </Tooltip>
        </Header>
        <Body>
          <OverallStats ticketsSold={ticketsSold} yearData={yearData} />
          <IndividualStats users={users} />
        </Body>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const usersQuerySnapshot = await getDocs(
    query(collection(firestore, 'users'), orderBy('registrations', 'desc'))
  );
  let users = [];
  let ticketsSold = 0;
  let yearData = [0, 0, 0, 0];
  for (const userDoc of usersQuerySnapshot.docs) {
    const userData = userDoc.data();
    let x = { name: userData.fullName as string, cash: 0, online: 0 };
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

export default Organizer;
