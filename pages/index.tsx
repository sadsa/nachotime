import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { Header, Grid, Button, Icon } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { firebaseClient } from "../util/firebaseClient";
import CardsTable from "../components/Cards/CardsTable";
import Link from "next/link";
const PreviewCard = dynamic(() => import("../components/Cards/PreviewCard"), {
    ssr: false
});

type CardsProps = {
    cards: ICard[];
};

enum DisplayTypes {
    table = "table",
    block = "block"
}

const CardsPage: NextPage<CardsProps> = ({ cards }) => {
    const [displayType, setDisplayType] = React.useState(DisplayTypes.block);
    return (
        <>
            <div style={{ float: "right" }}>
                <Button.Group basic size="small" style={{ marginRight: "20px" }}>
                    <Button
                        icon="block layout"
                        active={displayType === DisplayTypes.block}
                        onClick={() => setDisplayType(DisplayTypes.block)}
                    />
                    <Button
                        icon="table"
                        active={displayType === DisplayTypes.table}
                        onClick={() => setDisplayType(DisplayTypes.table)}
                    />
                </Button.Group>
                <Link href="card/create">
                    <Button
                        floated="right"
                        icon
                        labelPosition="left"
                        primary
                        size="small"
                    >
                        <Icon name="add square" />
                        Create New
                    </Button>
                </Link>
            </div>
            <Header as="h1">Cards</Header>
            {displayType === DisplayTypes.table && <CardsTable cards={cards} />}
            {displayType === DisplayTypes.block && (
                <Grid columns="4" stackable>
                    {cards.map((card, index) => (
                        <Grid.Column key={index}>
                            <PreviewCard {...card} />
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </>
    );
};

CardsPage.getInitialProps = async function() {
    const cards = await firebaseClient.getCards();
    return { cards };
};

export default CardsPage;
