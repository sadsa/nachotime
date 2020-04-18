import React from "react";
import { Button, Checkbox, Icon, Table, Confirm } from "semantic-ui-react";
import { ICard } from "../../interfaces/card";
import Link from "next/link";
import { firebaseClient } from "../../util/firebaseClient";
import { useRouter } from "next/router";

type CardTableFields = "title" | "phrase" | "translation";

type CardTableHeaders = Partial<Record<CardTableFields, string>>;

const columns: CardTableHeaders = {
    title: "Title",
    phrase: "Phrase",
    translation: "Translation",
};

interface ICardsTableProps {
    cards: ICard[];
}

const CardsTable: React.FC<ICardsTableProps> = ({ cards }) => {
    const [showConfirm, setShowConfirm] = React.useState(false);
    const [selected, setSelected] = React.useState<string[]>([]);
    const { reload } = useRouter();
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
        Promise.all(selected.map((id) => firebaseClient.deleteCard(id))).then(
            () => {
                reload();
            }
        );
    };
    return (
        <>
            <Table celled compact definition>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        {Object.keys(columns).map((key, index) => (
                            <Table.HeaderCell key={index}>
                                {columns[key as CardTableFields]}
                            </Table.HeaderCell>
                        ))}
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {cards.map((card, index) => (
                        <Table.Row key={index}>
                            <Table.Cell collapsing>
                                <Checkbox
                                    onChange={() => handleCheck(card.id)}
                                />
                            </Table.Cell>
                            {Object.keys(columns).map((key, index) => (
                                <Table.Cell key={index}>
                                    {card[key as keyof ICard]}
                                </Table.Cell>
                            ))}
                            <Table.Cell collapsing>
                                <Link href={`card/${card.id}`}>
                                    <Button>
                                        <Icon name="edit" /> Edit
                                    </Button>
                                </Link>
                                <Link href={`card/view/${card.id}`}>
                                    <Button>
                                        <Icon name="eye" /> View
                                    </Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan="2">
                            {selected?.length ? (
                                <Button
                                    icon
                                    floated="left"
                                    color="red"
                                    labelPosition="left"
                                    onClick={handleClickDelete}
                                    size="small"
                                >
                                    <Icon name="trash" />
                                    Delete
                                </Button>
                            ) : undefined}
                        </Table.HeaderCell>
                        <Table.HeaderCell colSpan="3">
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
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
            <Confirm
                open={showConfirm}
                onCancel={() => setShowConfirm(false)}
                onConfirm={() => onDeleteConfirm()}
            />
        </>
    );
};

export default CardsTable;
