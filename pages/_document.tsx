import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

type Props = {};

class Document extends NextDocument<Props> {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://apis.google.com" />
          <link rel="dns-prefetch" href="https://apis.google.com" />
          <link rel="dns-prefetch" href="https://www.googleapis.com" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
