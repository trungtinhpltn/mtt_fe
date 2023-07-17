import ErrorBoundary from "@/components/ErrorBoundary";
import AppLayout from "@/layouts/AppLayout";
import GlobalProvider from "Context/GlobalProvider";
import "aos/dist/aos.css";
import type { AppProps } from "next/app";
import App from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/ckeditor5.css";
import "../styles/custom.css";
import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        {favicon && (
          <link rel="shortcut icon" href={getMediaFormat(favicon, "small")} />
        )}
        {structuredData && (
          <script type="application/ld+json">{structuredData}</script>
        )}
      </Head> */}
      <DefaultSeo
        defaultTitle={"MTFood"}
        title={"MTFood"}
        description={"MTFood"}
        // canonical={defaultSeo?.canonicalURL || "ftech.ai"}
        robotsProps={{
          noarchive: true,
        }}
      />
      <GlobalProvider {...pageProps}>
        <ErrorBoundary>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ErrorBoundary>
      </GlobalProvider>
    </>
  );
};

MyApp.getInitialProps = async (context: any) => {
  const appProps = await App.getInitialProps(context);
  return {
    ...appProps,
    pageProps: {},
  };
};

export default MyApp;
