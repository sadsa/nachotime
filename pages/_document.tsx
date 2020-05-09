import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
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
