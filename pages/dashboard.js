import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CustomTable from 'components/Table';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestore } from 'lib/firebase';
import { useAuth } from 'lib/AuthProvider';
import { referralColumns, lbColumns, amountSummary } from 'constants/dashboard';
import Tooltip from '@mui/material/Tooltip';

export default function Dashboard({
  amountCollected,
  referrals,
  leaderboard,
  referralSize,
  highlighted,
}) {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!currentUser || !router.query?.code) router.push('/auth');
  }, [currentUser, router]);
  return (
    <div className="organizer-container">
      <nav className="organizer-header">
        <Image src="/logo.svg" alt="SYCon" width={160} height={70} />
        <Tooltip title="Logout" onClick={logout}>
          <div className="user">
            {currentUser?.displayName.split(' ').map(x => x[0])}
          </div>
        </Tooltip>
      </nav>
      <section className="organizer-body">
        <div className="referrals-container">
          <div className="amount-summary">
            {amountSummary.map(item => (
              <div className={item.id} key={item.id}>
                <h3>
                  <span>&#8377;</span>
                  {amountCollected[item.id]}
                </h3>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
          <div className="referrals">
            <h3>{referralSize}</h3>
            <p>Referral{referrals.length > 1 ? 's' : ''}</p>
            <CustomTable
              rows={referrals}
              columns={referralColumns}
              tableMaxHeight={440}
            />
          </div>
        </div>
        <div className="leaderboard">
          <p>LeaderBoard</p>
          <CustomTable
            rows={leaderboard}
            columns={lbColumns}
            tableMaxHeight={720}
            highlighted={highlighted}
          />
        </div>
      </section>
    </div>
  );
}

export const getServerSideProps = async ({ res, query: ctxQuery }) => {
  if (!ctxQuery.code) {
    res.statusCode = 302;
    res.setHeader('Location', '/auth');
    return { props: {} };
  }
  const referralCode = parseInt(ctxQuery.code, 10);
  const regQuerySnapshot = await getDocs(
    query(
      collection(firestore, 'registrations'),
      where('referral_code', '==', referralCode)
    )
  );
  let amountCollected = { cash: 0, online: 0 };
  let referrals = [];
  regQuerySnapshot.forEach(doc => {
    if (doc.exists() && doc.data()) {
      const data = doc.data();
      referrals.push({
        fullName: data.fullName,
        year: data.year,
        branch: data.branch,
        paymentMode: data.hasPaid ? 'Online' : 'Cash',
        key: data.email,
      });
      if (data.hasPaid) {
        amountCollected.online += 100;
      } else {
        amountCollected.cash += 100;
      }
    }
  });
  let leaderboard = [],
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
      year: data.year,
      department: data.department,
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
