import React from "react";
import CardDetailForm from "../../components/CardDetailForm";
import { Header } from "semantic-ui-react";
import { NextPage } from "next";

const Card: NextPage = () => {
    return (
        <>
            <Header as="h1">Card</Header>
            <CardDetailForm />
        </>
    );
};

export default Card;
