import Head from 'next/head';

interface PageHeadProps {
  title: string;
  description: string;
}

export default function PageHead({ title, description }: PageHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
