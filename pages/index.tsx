import { NextPage } from "next";
import { Image, Header, Container } from "semantic-ui-react";

const Home: NextPage<{}> = () => (
    <Container text>
        <Header as="h1">Semantic UI React Fixed Template</Header>
        <p>This is a basic fixed menu template using fixed size containers.</p>
        <p>
            A text container is used for the main container, which is useful for
            single column layouts.
        </p>

        <Image
            src="/images/wireframe/media-paragraph.png"
            style={{ marginTop: "2em" }}
        />
        <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
        />
        <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
        />
        <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
        />
        <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
        />
        <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
        />
        <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
        />
    </Container>
);

Home.getInitialProps = async ({ req }) => {
    const userAgent = req
        ? req.headers["user-agent"] || ""
        : navigator.userAgent;
    return { userAgent };
};

export default Home;
