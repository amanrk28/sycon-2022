import { ChangeEventHandler, useCallback, useState } from 'react';
import { Card } from './card';
import styled from 'styled-components';
import { Card as AntCard, Input, Space } from 'antd';
import { Title } from 'components/title';
import { User } from './types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  scroll-behavior: smooth;
`;

const StatsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
  scroll-behavior: smooth;
`;

const TitleContainer = styled(Space)`
  justify-content: space-between;
  width: 100%;
  h3 {
    margin-bottom: 0;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const IndividualStats = ({ users }: { users: User[] }) => {
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    e => {
      const { value } = e.target;
      const newUsers = users.filter(x =>
        x.name.toLowerCase().includes(value.toLowerCase())
      );
      setSearch(value);
      setTimeout(() => {
        setFilteredUsers(newUsers);
      }, 500);
    },
    [users]
  );

  return (
    <Container>
      <AntCard
        style={{
          width: '100%',
          marginTop: 24,
          marginBottom: 24,
        }}
        bodyStyle={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        bordered={false}
        type="inner"
        title={
          <TitleContainer align="center" size="large">
            <Title level={3}>Individual Statistics</Title>
            <Input
              placeholder="Search..."
              value={search}
              onChange={onChange}
              style={{ width: 300 }}
            />
          </TitleContainer>
        }
      >
        <StatsGrid>
          {filteredUsers?.map(user => (
            <Card key={user.name} data={user} />
          ))}
        </StatsGrid>
      </AntCard>
    </Container>
  );
};
