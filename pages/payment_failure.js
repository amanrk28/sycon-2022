import Image from 'next/image';

const ContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const WrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 2,
  marginTop: 4,
  borderRadius: 4,
  width: 500,
};

export default function PaymentFailure() {
  return (
    <div style={ContainerStyle}>
      <div style={WrapperStyle}>
        <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
        <h2 style={{ textAlign: 'center', color: 'red' }}>
          It seems there was an error processing your payment!😮
        </h2>
        <p
          style={{
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Keep calm! We have saved your registration details. You can choose to
          pay on the day of the event!😃
        </p>
        <p style={{ textAlign: 'center', fontSize: 20 }}>
          If the amount has been deducted from your account, kindly contact us
          at <a href="tel:+917358487202">(phone number)</a> or send us your
          registration details at{' '}
          <a href="mailto:amankhemka.ak28@gmail.com">(email)</a>
        </p>
      </div>
    </div>
  );
}
