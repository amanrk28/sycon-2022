export default function DashboardIndex() {
  return <></>;
}

export const getServerSideProps = ({ res }) => {
  res.statusCode = 302;
  res.setHeader('Location', '/auth');
  return { props: {} };
};
