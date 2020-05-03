import React from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import {
    Header,
    Grid,
    Button,
    Icon,
    Dropdown,
    DropdownProps,
} from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { firebaseClient } from "../util/cardsClient";
import CardsTable from "../components/Cards/CardsTable";
import Link from "next/link";
const PreviewCard = dynamic(() => import("../components/Cards/PreviewCard"), {
    ssr: false,
});

type CardsProps = {
    cards: ICard[];
};

enum DisplayTypes {
    table = "table",
    block = "block",
}

const sortOptions = [
    {
        key: "Sort by Date (DESC)",
        text: "Sort by Date (DESC)",
        value: "DATE_DESC",
    },
    {
        key: "Sort by Date (ASC)",
        text: "Sort by Date (ASC)",
        value: "DATE_ASC",
    },
];

function sortCards(a: ICard, b: ICard, sortType: string): number {
    if (sortType === "DATE_ASC") {
        return a.createdDate.seconds - b.createdDate.seconds;
    }
    if (sortType === "DATE_DESC") {
        return b.createdDate.seconds - a.createdDate.seconds;
    }
    return 0;
}

const CardsPage: NextPage<CardsProps> = ({ cards }) => {
    const [displayType, setDisplayType] = React.useState(DisplayTypes.block);
    const [sortType, setSortType] = React.useState("DATE_DESC");

    function handleChangeSort(e: React.SyntheticEvent, data: DropdownProps) {
        if (typeof data.value !== "string") return;
        setSortType(data.value);
    }

    const filteredCards = cards.sort((a, b) => sortCards(a, b, sortType));

    return (
        <>
            <Grid>
                <Grid.Column width={8}>
                    <Header as="h1">Cards</Header>
                </Grid.Column>
                <Grid.Column width={8} textAlign="right">
                    <Dropdown
                        basic
                        selection
                        style={{ marginRight: "20px" }}
                        options={sortOptions}
                        defaultValue={sortOptions[0].value}
                        onChange={handleChangeSort}
                    />
                    <Button.Group
                        basic
                        size="small"
                        style={{ marginRight: "20px" }}
                    >
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
                </Grid.Column>
            </Grid>
            {displayType === DisplayTypes.table && (
                <CardsTable cards={filteredCards} />
            )}
            {displayType === DisplayTypes.block && (
                <Grid columns="4" stackable>
                    {filteredCards.map((card, index) => (
                        <Grid.Column key={index}>
                            <PreviewCard {...card} />
                        </Grid.Column>
                    ))}
                </Grid>
            )}
        </>
    );
};

CardsPage.getInitialProps = async function () {
    const cards = await firebaseClient.getCards();
    return { cards };
};

export default CardsPage;
