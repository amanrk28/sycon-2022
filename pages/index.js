import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import toast from 'react-hot-toast';
import styles from 'styles/Home.module.css';
import PageHead from 'components/PageHead';

const Home = () => {
  // Toast test
  const router = useRouter();
  useEffect(() => {
    toast.success('Successfully Toasted');
    router.push('/register');
  }, []);

  return (
    <div className={styles.container}>
      <PageHead
        title="Create Next App"
        description="Generated by create next app"
      />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;