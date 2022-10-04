import { Card } from 'antd';
import { DoughnutChart } from 'components/doughnut-chart';
import { Title } from 'components/title';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const gridStyle = {
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const options = {
  responsive: true,
  borderRadius: 8,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
`;

const BarContainer = styled.div`
  width: 100%;
`;

export const OverallStats = ({
  ticketsSold,
  yearData,
}: {
  ticketsSold: number;
  yearData: number[];
}) => {
  const barData = useMemo(() => {
    return {
      labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      datasets: [
        {
          data: yearData,
          backgroundColor: [
            'rgba(0, 192, 255, 1)',
            'rgba(255, 216, 0, 1)',
            'rgba(0, 192, 255, 1)',
            'rgba(255, 216, 0, 1)',
          ],
        },
      ],
    };
  }, [yearData]);
  return (
    <Container>
      <Card
        bordered={false}
        type="inner"
        style={{ width: '100%' }}
        title={<Title level={3}>Overall Statistics</Title>}
      >
        <Card.Grid style={gridStyle} hoverable={false}>
          <DoughnutChart ticketsSold={ticketsSold} />
        </Card.Grid>
        <Card.Grid style={gridStyle} hoverable={false}>
          <BarContainer>
            <Title level={3}>Tickets Sold</Title>
            <Bar data={barData} options={options} />
          </BarContainer>
        </Card.Grid>
      </Card>
    </Container>
  );
};
