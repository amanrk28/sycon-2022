import { Routes } from 'components/types';
import type { GetServerSideProps, NextPage } from 'next';

const DashboardIndex: NextPage = () => {
  return <></>;
};

export default DashboardIndex;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 302;
  res.setHeader('Location', Routes.Auth);
  return { props: {} };
};
