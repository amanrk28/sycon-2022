import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

const Home: NextPage = () => {
  return (
    <h1>
      Welcome to <a href="https://nextjs.org">Next.js!</a>
    </h1>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.statusCode = 302;
  res.setHeader('Location', '/register');
  return { props: {} };
};
