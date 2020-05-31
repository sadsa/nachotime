import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext
} from "next/document";

class NachoDocument extends Document {
    static async getInitialProps(context: DocumentContext) {
        const initialProps = await Document.getInitialProps(context);
        return { ...initialProps, darkMode: !!context.query.darkMode };
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="manifest" href="/manifest.json" />
                    <link
                        href="/images/icons/favicon-16x16.png"
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                    />
                    <link
                        href="/images/icons/favicon-32x32.png"
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                    />
                    <link
                        rel="stylesheet"
                        href="/css/responsive-semantic-ui.css"
                    />
                    <meta name="theme-color" content="#317EFB" />
                    {(this.props as any).darkMode ? (
                        <link
                            rel="stylesheet"
                            href="/css/semantic-dark.min.css"
                        />
                    ) : (
                        <link
                            rel="stylesheet"
                            href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                        />
                    )}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default NachoDocument;
