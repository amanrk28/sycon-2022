import { Space, Typography } from 'antd';
import DoughnutIcon from 'assets/svg/DoughnutSvg';
import { Title } from 'components/title';
import { Body, ColorBox, Container, Doughnuts, Inner, Outer } from './styles';

const legend = [
  { title: 'Tickets Sold', id: 'ticketsSold', color: '#00C0FF' },
  { title: 'Money Collected', id: 'moneyCollected', color: '#FFD800' },
];

export const DoughnutChart = ({ ticketsSold }: { ticketsSold: number }) => {
  return (
    <Container>
      <Title level={3}>Tickets & Money</Title>
      <Body>
        <Doughnuts>
          <Outer>
            <DoughnutIcon endAt={ticketsSold / 10} />
          </Outer>
          <Inner>
            <DoughnutIcon endAt={ticketsSold / 10} isInner />
          </Inner>
        </Doughnuts>
        <Space direction="vertical" style={{ marginLeft: 24 }}>
          {legend.map(item => (
            <Space key={item.id} direction="vertical">
              <Space align="center">
                <ColorBox style={{ backgroundColor: item.color }} />
                <Typography.Text>
                  {item.title} -{' '}
                  {item.id === 'ticketsSold' ? ticketsSold : ticketsSold * 200}
                </Typography.Text>
              </Space>
            </Space>
          ))}
        </Space>
      </Body>
    </Container>
  );
};
