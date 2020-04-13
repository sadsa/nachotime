import React from "react";
import { NextPage, NextPageContext } from "next";
import { Header } from "semantic-ui-react";
import { ICard } from "../../../interfaces/card";
import ReviewCard from "../../../components/Cards/ReviewCard";
import { firebaseClient } from "../../../util/firebaseClient";

const CardViewPage: NextPage<ICard> = (card) => {
    return (
        <>
            <Header as="h1">{card.title}</Header>
            <ReviewCard {...card} />
        </>
    );
};

CardViewPage.getInitialProps = async function (
    context: NextPageContext
): Promise<ICard> {
    const slug = context.query.id[0];
    const card = await firebaseClient.getCard(slug);
    return { ...card };
};

export default CardViewPage;
