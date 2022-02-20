import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { getLs, lsKeys, removeLs } from 'utils/lsUtil';

const ContainerBoxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  color: 'white',
  backgroundImage: 'linear-gradient(to right, #a855f7, #d946ef)',
};

const WrapperboxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '8px',
  width: '500px',
};

export default function Success({ customer, link }) {
  const router = useRouter();
  useEffect(() => {
    if (!router.query?.session_id && !customer) {
      router.push('/register');
    } else {
      const username = getLs(lsKeys.firebaseRegUserRef);
      const referralCode = getLs(lsKeys.refCode);
      if (username && referralCode) {
        axios({
          baseURL: window.location.origin,
          method: 'PUT',
          url: '/api/registration',
          data: {
            username,
            hasPaid: true,
            customer,
            link,
            referralCode,
          },
        });
        removeLs(lsKeys.refCode);
        removeLs(lsKeys.firebaseRegUserRef);
      }
    }
  }, [router, customer, link]);
  return (
    <div style={ContainerBoxSx}>
      <div style={WrapperboxSx}>
        <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
        <h1 style={{ textAlign: 'center' }}>Payment made successfully ✅</h1>
        <p style={{ textAlign: 'center', fontSize: 18 }}>
          You will soon receive the payment receipt and instructions for event
          day on {customer.email}
        </p>
        <p style={{ fontSize: 18 }}>See you on (event date)😃</p>
      </div>
    </div>
  );
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const getServerSideProps = async ({ query }) => {
  const session = await stripe.checkout.sessions.retrieve(query.session_id);
  const dashboardLink = `${process.env.STRIPE_DASHBOARD_LINK}/${session.payment_intent}`;
  return {
    props: {
      customer: { id: session.customer, email: session.customer_details.email },
      link: dashboardLink,
    },
  };
};
