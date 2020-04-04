import { NextPage } from "next";
import { Button } from "semantic-ui-react";

const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
  <div>
    <Button>Click here</Button>
    <h1>Hello world! - user agent: {userAgent}</h1>
  </div>
);

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
