import Table, { ColumnsType } from 'antd/lib/table';
import styled from 'styled-components';
import { LeaderboardColumn } from './types';
import { Gold, Silver, Bronze } from 'assets/svg';

const Container = styled.div`
  padding: 24px;
  background-color: white;
  width: 48%;
  height: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 105px rgba(120, 120, 120, 0.3);
  p {
    margin-bottom: 27px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: auto;
    margin: 10px 0;
  }
`;

const lbColumns: ColumnsType<LeaderboardColumn> = [
  {
    dataIndex: 'position',
    title: '',
    width: 60,
    render: (_, _r, index) => {
      switch (index) {
        case 0:
          return <Gold width={20} />;
        case 1:
          return <Silver width={20} />;
        case 2:
          return <Bronze width={20} />;
        default:
          return index + 1;
      }
    },
  },
  { dataIndex: 'fullName', title: 'Student Name', width: 100, align: 'left' },
  {
    dataIndex: 'registrations',
    title: 'Referrals',
    width: 100,
    align: 'center',
  },
];

export const LeaderBoard = ({
  data,
  highlighted,
}: {
  data: any[];
  highlighted: number;
}) => {
  return (
    <Container>
      <p>Leaderboard</p>
      <Table
        scroll={{ y: 650 }}
        pagination={false}
        dataSource={data}
        columns={lbColumns}
        rowClassName={(_, index) =>
          index === highlighted ? 'current-user-row' : ''
        }
      />
    </Container>
  );
};
