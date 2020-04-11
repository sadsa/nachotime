import React from "react";
import CardDetailForm from "../../components/Cards/CardDetailForm";
import { Header, Button } from "semantic-ui-react";
import { NextPage, NextPageContext } from "next";
import { firebaseClient } from "../../util/firebaseClient";
import { ICard } from "../../interfaces/card";
import Link from "next/link";

const CardPage: NextPage<ICard> = ({ ...card }) => {
    return (
        <>
            <Link href="/cards">
                <Button basic content="< Back" />
            </Link>
            <Header as="h1">Edit Card</Header>
            <CardDetailForm {...card} />
        </>
    );
};

CardPage.getInitialProps = async function (
    context: NextPageContext
): Promise<ICard> {
    const slug = context.query.id[0];
    const card = await firebaseClient.getCard(slug);
    return { ...card };
};

export default CardPage;
