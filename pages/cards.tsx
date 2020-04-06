import React from "react";
import { NextPage } from "next";
import { Header, Grid, Button, Icon } from "semantic-ui-react";
import SummaryCard from "../components/SummaryCard";
import { ICard } from "../interfaces/card";
import database from "../lib/database";

type CardsProps = {
    cards: ICard[];
};

const Cards: NextPage<CardsProps> = ({ cards }) => {
    return (
    <>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h1">Cards</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button primary icon labelPosition="right" floated="right">
                        <Icon name="add square" />
                        Create New
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Grid columns={3}>
            <Grid.Row>
                {cards.map((card, index) => (
                    <Grid.Column key={index}>
                        <SummaryCard {...card} />
                    </Grid.Column>
                ))}
            </Grid.Row>
        </Grid>
    </>
)};

Cards.getInitialProps = async function() {
    const snapshot = await database.collection("cards").get();
    const cards = snapshot.docs.map(doc => doc.data() as ICard);
    return { cards }
};

export default Cards;
