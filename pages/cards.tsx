import React from "react";
import { NextPage } from "next";
import { Header } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { firebaseClient } from "../util/firebaseClient";
import CardsTable from "../components/CardsTable";

type CardsProps = {
    cards: ICard[];
};

const CardsPage: NextPage<CardsProps> = ({ cards }) => {
    return (
        <>
            <Header as="h1">Cards</Header>
            <CardsTable cards={cards} />
        </>
    );
};

CardsPage.getInitialProps = async function () {
    const cards = await firebaseClient.getCards();
    return { cards };
};

export default CardsPage;
