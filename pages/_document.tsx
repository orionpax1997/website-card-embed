import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="referrer" content="never"></meta>
          <link rel="preconnect" href="https://t3.gstatic.com"></link>
          <link rel="preconnect" href="https://images.weserv.nl"></link>
          <link rel="preconnect" href="https://vitals.vercel-insights.com"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
