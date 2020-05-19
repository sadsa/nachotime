import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
    const { pathname, push } = useRouter();
    React.useEffect(() => {
        if (pathname == "/") {
            push("/cards");
        }
    });
    return <></>;
};

export default HomePage;
