import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="vi">
        <Head>
          <meta name="theme-color" content="#061825" />
          <link
            rel="alternate"
            href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}
            hrefLang="vi"
          />
          <link
            rel="alternate"
            href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}
            hrefLang="x-default"
          />
 
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
