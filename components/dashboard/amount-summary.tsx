import { Title } from '../title';
import styled from 'styled-components';
import { Typography } from 'antd';
import { PaymentType } from './types';

const amountSummary = [
  { id: 'cash', label: 'Offline collection' },
  { id: 'online', label: 'Online Collection' },
];

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 36px;
  width: 100%;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  min-width: 250px;
  width: 48%;
  background-color: white;
  box-shadow: 0px 0px 105px rgba(120, 120, 120, 0.2);
  border-radius: 4px;
  padding: 30px 30px 40px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    margin: 10px 0;
    text-align: center;
  }
  h3 {
    font-weight: 800;
    font-size: 56px;
    margin: 0;
    span {
      font-weight: 600;
      font-size: 36px;
    }
  }
  &.cash > h3 {
    color: #00c0ff;
  }
  &.online > h3 {
    color: #ffd800;
  }
`;

const ReferralCodeForMobile = styled.div`
  padding: 12px 30px;
  display: none;
  font-size: 20px;
  background: #444;
  color: white;
  width: 100%;
  border-radius: 4px;
  text-align: center;
  @media screen and (max-width: 1024px) {
    display: block;
  }
  span {
    color: #00c0ff;
    font-weight: 600;
  }
`;

export const AmountSummary = ({
  amountCollected,
  code,
}: {
  amountCollected: PaymentType;
  code: string;
}) => {
  return (
    <Container>
      <ReferralCodeForMobile>
        Referral Code: <Typography.Text copyable>{code}</Typography.Text>
      </ReferralCodeForMobile>
      {amountSummary.map(item => (
        <Card className={item.id} key={item.id}>
          <Title level={3}>
            <span>&#x20b9;</span>
            {amountCollected[item.id as keyof PaymentType]}
          </Title>
          <p>
            {item.label} ({amountCollected[item.id as keyof PaymentType] / 200})
          </p>
        </Card>
      ))}
    </Container>
  );
};
