const Home = () => {
  return (
    <h1>
      Welcome to <a href="https://nextjs.org">Next.js!</a>
    </h1>
  );
};

export default Home;

export const getServerSideProps = async ({ res }) => {
  res.statusCode = 302;
  res.setHeader('Location', '/register');
  return { props: {} };
};
