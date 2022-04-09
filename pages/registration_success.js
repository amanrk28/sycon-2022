import Image from 'next/image';
import PageHead from 'components/PageHead';

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

export default function RegistrationSuccess() {
  return (
    <>
      <PageHead
        title="Registration Successful"
        description="SYCon 2022 - Creating Leaders and Inspiring Change"
      />
      <div style={ContainerBoxSx}>
        <div style={WrapperboxSx}>
          <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
          <h1 style={{ textAlign: 'center' }}>Registration successful ✅</h1>
          <p style={{ textAlign: 'center', fontSize: 18 }}>
            You will soon receive an email confirming your seat for SYCon 2022
            and instructions for payment on the event day.
          </p>
          <p style={{ fontSize: 18 }}>
            See you on {process.env.NEXT_PUBLIC_EVENT_DATE}😃
          </p>
        </div>
      </div>
    </>
  );
}
