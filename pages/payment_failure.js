import Image from 'next/image';
import Box from '@mui/material/Box';

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

export default function PaymentFailure() {
  return (
    <Box sx={ContainerBoxSx}>
      <Box sx={WrapperboxSx}>
        <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
        <h2 style={{ textAlign: 'center', color: 'red' }}>
          It seems there was an error processing your payment!😮
        </h2>
        <p style={{ fontSize: 20, textAlign: 'center' }}>
          We have saved your registration details. You can choose to pay on the
          day of the event!😃
        </p>
        <p style={{ textAlign: 'center', fontSize: 20 }}>
          If the amount has been deducted from your account, kindly contact us
          at <a href="tel:+917358487202">(phone number)</a> or send us your
          registration and payment details at{' '}
          <a href="mailto:amankhemka.ak28@gmail.com">(email)</a>
        </p>
      </Box>
    </Box>
  );
}
