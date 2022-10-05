import type { NextPage } from 'next';
import Image from 'next/image';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  margin-top: 4px;
  border-radius: 4px;
  width: 500px;
`;

const Header = styled.h2`
  text-align: center;
  color: red;
`;

const Text = styled.p`
  font-size: 20px;
  text-align: center;
`;

const PaymentFailure: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Image src="/logo.svg" alt="SYCon 2022" width={254} height={106} />
        <Header>It seems there was an error processing your payment!😮</Header>
        <Text>
          Keep calm! We have saved your registration details. You can choose to
          pay on the day of the event!😃
        </Text>
        <Text>
          If the amount has been deducted from your account, kindly contact us
          at <a href="tel:+917358487202">(phone number)</a> or send us your
          registration details at{' '}
          <a href="mailto:amankhemka.ak28@gmail.com">(email)</a>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default PaymentFailure;
