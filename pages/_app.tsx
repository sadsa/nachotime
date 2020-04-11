import { AppProps } from "next/app";
import Layout from "../components/common/Layout";
import "react-h5-audio-player/lib/styles.css";

function NachoApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default NachoApp;
