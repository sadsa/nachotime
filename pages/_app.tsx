import { AppProps } from "next/app";
import Layout from "../components/Layout";

function NachoApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default NachoApp;
