import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://apis.google.com" />
        <link rel="preconnect" href="https://apis.google.com" />
        <link rel="dns-prefetch" href="https://apis.google.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
      </Head>
      <body>
        <Main />
        <div id="portal"></div>
        <NextScript />
      </body>
    </Html>
  );
}
