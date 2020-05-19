import React from "react";
import { Button, Checkbox, Icon, Table, TableProps } from "semantic-ui-react";
import { ICard } from "../../interfaces/card";
import Link from "next/link";

type CardTableFields = "title" | "phrase" | "translation";

type CardTableHeaders = Record<CardTableFields, string>;

const columns: CardTableHeaders = {
    title: "Title",
    phrase: "Phrase",
    translation: "Translation",
};

interface ICardsTableProps extends TableProps {
    cards: ICard[];
    onSelect?(cardId: string): void;
}

const CardsTable: React.FC<ICardsTableProps> = ({
    cards,
    onSelect,
    ...tableProps
}) => {
    const handleSelect = (cardId: string) => {
        if (onSelect) {
            onSelect(cardId);
        }
    };
    return (
        <>
            <Table celled compact definition {...tableProps}>
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
                                    onChange={() => handleSelect(card.id)}
                                />
                            </Table.Cell>
                            {Object.keys(columns).map((key, index) => {
                                const value: any = card[key as keyof ICard];
                                return (
                                    <Table.Cell key={index}>{value}</Table.Cell>
                                );
                            })}
                            <Table.Cell collapsing>
                                <Link href={`cards/${card.id}`}>
                                    <Button>
                                        <Icon name="edit" />
                                        Edit
                                    </Button>
                                </Link>
                                <Link href={`cards/view/${card.id}`}>
                                    <Button>
                                        <Icon name="eye" />
                                        Review
                                    </Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};

export default CardsTable;
