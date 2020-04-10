import React from "react";
import CardDetailForm from "../../components/CardDetailForm";
import { Header } from "semantic-ui-react";
import { NextPage, NextPageContext } from "next";
import { firebaseClient } from "../../util/firebaseClient";
import { ICard } from "../../interfaces/card";

const Card: NextPage<ICard> = ({ ...card }) => {
    return (
        <>
            <Header as="h1">{card.id ? "Edit Card" : "Create New Card"}</Header>
            <CardDetailForm {...card} />
        </>
    );
};

const emptyCard: ICard = {
    id: "",
    title: "",
    phrase: "",
    translation: "",
    playbackAudioUrl: "",
    createdDate: 0,
};

Card.getInitialProps = async function (
    context: NextPageContext
): Promise<ICard> {
    const slug = context.query.id[0];
    if (slug === "create") {
        return { ...emptyCard };
    }
    const card = await firebaseClient.getCard(slug);
    return { ...card };
};

export default Card;
