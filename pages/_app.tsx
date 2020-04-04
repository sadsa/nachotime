import { AppProps } from "next/app";

function NachoApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <style jsx global>{`
        html {
          font-family: "Roboto";
        }
      `}</style>
    </div>
  );
}

export default NachoApp;
