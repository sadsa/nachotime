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
    Modal,
} from "semantic-ui-react";
import { ICard } from "../../interfaces/card";
import { cardsClient } from "../../util/cardsClient";
import CardsTable from "../../components/Cards/CardsTable";
import Link from "next/link";
import { useRouter } from "next/router";
const PreviewCard = dynamic(() => import("../../components/Cards/PreviewCard"), {
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
    if(!a.createdDate || !b.createdDate) return 0;
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
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [sortType, setSortType] = React.useState("DATE_DESC");
    const [selected, setSelected] = React.useState<string[]>([]);
    const { reload } = useRouter();

    function handleChangeSort(e: React.SyntheticEvent, data: DropdownProps) {
        if (typeof data.value !== "string") return;
        setSortType(data.value);
    }

    const handleCheck = (cardId: string) => {
        const selectedIds = Object.assign([], selected);
        const index = selectedIds.indexOf(cardId);
        if (index >= 0) {
            selectedIds.splice(index, 1);
        } else {
            selectedIds.push(cardId);
        }
        setSelected(selectedIds);
    };

    const handleClickDelete = () => {
        setShowConfirm(true);
    };

    const onDeleteConfirm = () => {
        Promise.all(selected.map((id) => cardsClient.deleteCard(id))).then(
            () => {
                reload();
            }
        );
    };

    const filteredCards = cards.sort((a, b) => sortCards(a, b, sortType));

    return (
        <>
            <Grid stackable>
                <Grid.Row>
                    <Grid.Column width={8} verticalAlign="middle">
                        <Header as="h1">
                            Cards
                        </Header>
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="right">
                        {selected?.length ? (
                            <Dropdown
                                basic
                                text="Actions"
                                style={{ marginRight: "1rem" }}
                                floating
                            >
                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        icon="trash"
                                        text="Delete Selected"
                                        onClick={handleClickDelete}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : undefined}
                        <Dropdown
                            basic
                            selection
                            style={{ marginRight: "1rem" }}
                            options={sortOptions}
                            defaultValue={sortOptions[0].value}
                            onChange={handleChangeSort}
                        />
                        <Button.Group
                            basic
                            size="small"
                            style={{ marginRight: "1rem" }}
                        >
                            <Button
                                icon="block layout"
                                active={displayType === DisplayTypes.block}
                                onClick={() =>
                                    setDisplayType(DisplayTypes.block)
                                }
                            />
                            <Button
                                icon="table"
                                active={displayType === DisplayTypes.table}
                                onClick={() =>
                                    setDisplayType(DisplayTypes.table)
                                }
                            />
                        </Button.Group>
                        <Link href="cards/create">
                            <Button primary>
                                <Icon name="edit" />
                                Create New
                            </Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        {displayType === DisplayTypes.table && (
                            <CardsTable
                                cards={filteredCards}
                                onSelect={handleCheck}
                            />
                        )}
                        {displayType === DisplayTypes.block && (
                            <Grid columns="4" stackable>
                                {filteredCards.map((card, index) => (
                                    <Grid.Column key={index}>
                                        <PreviewCard
                                            card={card}
                                            onSelect={handleCheck}
                                            selected={
                                                selected.indexOf(card.id) >= 0
                                            }
                                        />
                                    </Grid.Column>
                                ))}
                            </Grid>
                        )}
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Modal
                size="tiny"
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
            >
                <Modal.Header>
                    Delete {selected.length > 1 ? "Cards" : "Card"}
                </Modal.Header>
                <Modal.Content>
                    <p>
                        Are you sure you want to delete{" "}
                        {selected.length > 1 ? "these" : "this"} card
                    </p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={() => setShowConfirm(false)}>
                        No
                    </Button>
                    <Button
                        positive
                        icon="checkmark"
                        labelPosition="right"
                        content="Yes"
                        onClick={() => onDeleteConfirm()}
                    />
                </Modal.Actions>
            </Modal>
        </>
    );
};

CardsPage.getInitialProps = async function () {
    const cards = await cardsClient.getCards();
    return { cards };
};

export default CardsPage;
