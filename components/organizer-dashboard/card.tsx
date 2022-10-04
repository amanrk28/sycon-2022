import { Fragment, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, ChartData } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
import { Title } from 'components/title';
import { Space, Typography } from 'antd';
import { ColorBox } from 'components/doughnut-chart';

ChartJS.register(ArcElement, Tooltip);

const legend = [
  { title: 'Cash', id: 'cash', color: '#00C0FF' },
  { title: 'Online', id: 'online', color: '#FFD800' },
];

const Container = styled.div`
  padding: 20px;
  background-color: white;
  max-width: 400px;
  width: 100%;
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const PieChart = styled.div`
  position: absolute;
  left: -50px;
  top: 18px;
`;

const Legend = styled.div`
  position: absolute;
  right: 20px;
  top: 100px;
`;

export const Card = ({ data }: { data: any }) => {
  const pieData: ChartData<'pie'> = useMemo(() => {
    return {
      labels: ['Cash', 'Online', 'None'],
      datasets: [
        {
          label: 'firstDataset',
          data: [data.cash, data.online, 0.0001],
          backgroundColor: [
            'rgba(0, 192, 255, 1)',
            'rgba(255, 216, 0, 1)',
            '#ccc',
          ],
          borderColor: [
            'rgba(0, 192, 255, 1)',
            'rgba(255, 216, 0, 1)',
            'rgba(255, 216, 0, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data.cash, data.online]);

  return (
    <Container>
      <Title level={4}>{data.name || ''}</Title>
      <PieChart>
        <Pie data={pieData} options={{ radius: 80 }} />
      </PieChart>
      <Legend>
        {legend.map(item => (
          <Fragment key={item.id}>
            <Space align="center" style={{ display: 'flex', marginTop: 12 }}>
              <ColorBox style={{ backgroundColor: item.color }} />
              <Typography.Text>{item.title}</Typography.Text>
            </Space>
            <Typography.Text style={{ marginLeft: 26 }}>
              {item.id === 'cash' ? data.cash : data.online}
            </Typography.Text>
          </Fragment>
        ))}
      </Legend>
    </Container>
  );
};
