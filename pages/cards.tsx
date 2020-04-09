import React from "react";
import { NextPage } from "next";
import { Header, Grid, Button, Icon } from "semantic-ui-react";
import SummaryCard from "../components/SummaryCard";
import { ICard } from "../interfaces/card";
import Link from "next/link";
import { firebaseClient } from "../util/firebaseClient";

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
                        <Link href="/card/create">
                            <Button
                                primary
                                icon
                                labelPosition="right"
                                floated="right"
                            >
                                <Icon name="add square" />
                                Create New
                            </Button>
                        </Link>
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
    );
};

Cards.getInitialProps = async function () {
    const cards = await firebaseClient.getCards();
    return { cards };
};

export default Cards;
