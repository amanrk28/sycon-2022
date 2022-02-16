import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import Box from '@mui/material/Box';
import { getLs, lsKeys, removeLs } from 'utils/lsUtil';

const ContainerBoxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 1,
};

const WrapperboxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 2,
  mt: 4,
  borderRadius: 4,
  width: 500,
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
    <Box sx={ContainerBoxSx}>
      <Box sx={WrapperboxSx}>
        <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
        <h1 style={{ textAlign: 'center' }}>Payment made successfully ✅</h1>
        <p style={{ textAlign: 'center', fontSize: 18 }}>
          You will soon receive the payment receipt on{' '}
          <span style={{ color: 'blue' }}>{customer.email}</span>
        </p>
        <p style={{ fontSize: 18 }}>See you on (event date)😃</p>
      </Box>
    </Box>
  );
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
export const getServerSideProps = async ctx => {
  const session = await stripe.checkout.sessions.retrieve(ctx.query.session_id);
  const dashboardLink = `${process.env.STRIPE_DASHBOARD_LINK}/${session.payment_intent}`;
  return {
    props: {
      customer: { id: session.customer, email: session.customer_details.email },
      link: dashboardLink,
    },
  };
};
