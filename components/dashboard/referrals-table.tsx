import Table, { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';
import { Title } from 'components/title';
import { ReferralsColumn } from './types';
import { stringSorting } from './util';

const columns: ColumnsType<ReferralsColumn> = [
  { dataIndex: 'fullName', title: 'Student Name', width: 150, align: 'left' },
  { dataIndex: 'year', title: 'Year', width: 100, align: 'center' },
  {
    dataIndex: 'branch',
    title: 'Department',
    width: 150,
    align: 'center',
  },
  {
    dataIndex: 'paymentMode',
    title: 'Payment Mode',
    width: 120,
    align: 'left',
    sorter: (a, b) => stringSorting(a.paymentMode, b.paymentMode),
  },
];

const ReferralsContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 105px rgba(120, 120, 120, 0.2);
  p {
    margin-bottom: 27px;
  }
  @media screen and (max-width: 1024px) {
    height: auto;
  }
`;

export const Referrals = ({
  referralSize,
  referrals,
}: {
  referralSize: number;
  referrals: any[];
}) => {
  return (
    <ReferralsContainer>
      <Title level={3} style={{ color: '#00c0ff', fontSize: 64, margin: 0 }}>
        {referralSize}
      </Title>
      <p>Referral{referrals.length > 1 ? 's' : ''}</p>
      <Table
        scroll={{ y: 364 }}
        columns={columns}
        dataSource={referrals}
        pagination={false}
      />
    </ReferralsContainer>
  );
};
