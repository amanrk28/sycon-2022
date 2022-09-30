import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import PageHead from 'components/PageHead';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  color: white;
  background-image: linear-gradient(to right, #0f0c29, #302b63, #24243e);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  width: 600px;
`;

const RegistrationSuccess: NextPage = () => {
  return (
    <>
      <PageHead
        title="Registration Successful"
        description="SYCon 2022 - Creating Leaders and Inspiring Change"
      />
      <Container>
        <Wrapper>
          <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
          <h1 style={{ textAlign: 'center' }}>🎉 Registration Successful 🎉</h1>
          <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 500 }}>
            An organising committee member will approach you within 3 days to
            confirm the payment. You will receive an email confirming your seat
            at Sycon &apos;22 after completing the payment.
          </p>
          <p style={{ fontSize: 20, marginTop: 20, fontWeight: 500 }}>
            See you on {process.env.NEXT_PUBLIC_EVENT_DATE}😃
          </p>
        </Wrapper>
      </Container>
    </>
  );
};

export default RegistrationSuccess;
