import Image from 'next/image';
import PageHead from 'components/PageHead';

const ContainerBoxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100vh',
  color: 'white',
  backgroundImage: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
};

const WrapperboxSx = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  width: '600px',
};

export default function Success() {
  return (
    <>
      <PageHead
        title="Registration Successful"
        description="SYCon 2022 - Creating Leaders and Inspiring Change"
      />
      <div style={ContainerBoxSx}>
        <div style={WrapperboxSx}>
          <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
          <h1 style={{ textAlign: 'center' }}>🎉 Registration Successful 🎉</h1>
          <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }}>
            You will soon receive an email with the QR code for event day.
            <br />
            <br />
            <span
              style={{ fontWeight: 600, fontSize: 21, fontStyle: 'italic' }}
            >
              Don&apos;t forget to show this unique QR code generated
              exclusively for you at the auditorium entrance and at the snacks
              and food counters on that day!!
            </span>
          </p>
          <p style={{ fontSize: 20, marginTop: 20, fontWeight: 500 }}>
            See you on {process.env.NEXT_PUBLIC_EVENT_DATE} 😃
          </p>
        </div>
      </div>
    </>
  );
}
