import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';
import PageHead from 'components/PageHead';
import { Title } from 'components/title';

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
  width: 610px;
`;

const Success: NextPage = () => {
  return (
    <>
      <PageHead
        title="Registration Successful"
        description="SYCon 2022 - Creating Leaders and Inspiring Change"
      />
      <Container>
        <Wrapper>
          <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
          <Title level={1} style={{ textAlign: 'center', color: 'white' }}>
            🎉 Registration Successful 🎉
          </Title>
          <p style={{ textAlign: 'center', fontSize: 18, fontWeight: 500 }}>
            You will soon receive an email with the QR code for event day.
            <br />
            <br />
            <span
              style={{ fontWeight: 600, fontSize: 21, fontStyle: 'italic' }}
            >
              Use this unique QR code generated exclusively for you to avail
              auditorium entrance and at the snacks and food counters!!
            </span>
          </p>
          <p style={{ fontSize: 20, marginTop: 20, fontWeight: 500 }}>
            See you on {process.env.NEXT_PUBLIC_EVENT_DATE} 😃
          </p>
        </Wrapper>
      </Container>
    </>
  );
};

export default Success;
