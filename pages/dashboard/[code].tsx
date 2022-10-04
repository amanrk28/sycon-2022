import { Tooltip, Typography } from 'antd';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect } from 'react';
import styled from 'styled-components';
import { firestore } from 'lib/firebase';
import { useAuth } from 'lib/AuthProvider';
import { AmountSummary, LeaderBoard, Referrals, ReferralsColumn, LeaderboardColumn, PaymentType } from 'components/dashboard';
import PageHead from 'components/PageHead';

const Container = styled.div`
 display: flex;
  flex-direction: column;
  width: 100%;
`;

const Body = styled.div`
    background-color: #eee;
    padding: 2% 5%;
    height: 88vh;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    overflow-y: scroll;
    @media screen and (max-width: 1024px) {
      flex-direction: column;
    }
`;

const ReferralsContainer = styled.div`
  width: 48%;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin: 10px 0;
  }
`;

const NavBar = styled.nav`
  background-color: white;
  padding: 30px 5%;
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 5px 32px rgba(100, 100, 100, 0.2);
  z-index: 10;
  p {
    font-weight: 500;
    @media screen and (max-width: 1024px) {
      display: none;
    }
    span {
      font-size: 18px;
      color: #00c0ff;
      font-weight: 600;
    }
  }
`;

const UserBox = styled.div`
    background-color: #00c0ff;
    color: white;
    font-size: 18px;
    font-weight: 500;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
`;

interface DashboardProps {
  amountCollected: PaymentType,
  referrals: ReferralsColumn[],
  leaderboard: LeaderboardColumn[],
  referralSize: number,
  highlighted: number,
}

const Dashboard: NextPage<DashboardProps> = ({ amountCollected, referralSize, referrals, leaderboard, highlighted }) => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (
      !currentUser ||
      !router.query?.code ||
      router.query.code === 'undefined'
    )
      router.push('/auth');

  }, [currentUser, router]);

  return (
    <>
      <PageHead
        title="Organizer's Dashboard"
        description="View all your referrals and move the leaderboard"
      />
      <Container>
        <NavBar>
          <Image src="/logo.svg" alt="SYCon" width={165} height={69} />
          <p>
            Referral Code: <Typography.Text copyable>{router.query.code}</Typography.Text>
          </p>
          <Tooltip title="Logout">
            <UserBox onClick={logout}>
              {currentUser?.displayName?.split(' ').map(x => x[0])}
            </UserBox>
          </Tooltip>
        </NavBar>
        <Body>
          <ReferralsContainer>
            <AmountSummary amountCollected={amountCollected} code={router.query.code as string} />
            <Referrals referralSize={referralSize} referrals={referrals} />
          </ReferralsContainer>
          <LeaderBoard data={leaderboard} highlighted={highlighted} />
        </Body>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res, query: ctxQuery }) => {
  if (!ctxQuery.code || ctxQuery.code === 'undefined') {
    res.statusCode = 302;
    res.setHeader('Location', '/auth');
    return { props: {} };
  }
  const referralCode = parseInt(ctxQuery.code as string, 10);
  const regQuerySnapshot = await getDocs(
    query(
      collection(firestore, 'registrations'),
      where('hasPaid', '==', true),
      where('referral_code', '==', referralCode)
    )
  );
  let amountCollected = { cash: 0, online: 0 };
  let referrals: ReferralsColumn[] = [];
  regQuerySnapshot.forEach(doc => {
    if (doc.exists() && doc.data()) {
      const data = doc.data();
      referrals.push({
        fullName: data.fullName,
        year: data.year,
        branch: data.branch,
        paymentMode: data.paymentLink ? 'Razorpay' : 'Cash',
        key: `${data.email}_${data.year}_${data.branch}`,
      });
      if (data.paymentLink) amountCollected.online += 200;
      else amountCollected.cash += 200;
    }
  });
  let leaderboard: LeaderboardColumn[] = [],
    referralSize = 0,
    highlighted = 0;
  const usersQuerySnapshot = await getDocs(
    query(collection(firestore, 'users'), orderBy('registrations', 'desc'))
  );
  usersQuerySnapshot.forEach(doc => {
    const data = doc.data();
    if (data.referral_code === referralCode) {
      referralSize = data.registrations;
      highlighted = leaderboard.length;
    }
    leaderboard.push({
      fullName: data.fullName,
      registrations: data.registrations,
      position: leaderboard.length + 1,
      key: data.email,
    });
  });
  return {
    props: {
      amountCollected,
      referrals,
      leaderboard,
      referralSize,
      highlighted,
    },
  };
};

export default Dashboard;
