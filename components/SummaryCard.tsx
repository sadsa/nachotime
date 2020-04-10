import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { formatShortDate } from "../util/dateUtils";
import Link from "next/link";

const SummaryCard: React.FC<ICard> = ({ id, name, createdDate, summary }) => {
    return (
        <Link href={`card/${id}`}>
            <Card>
                <Image src="/images/avatar/daniel.jpg" wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>
                        {createdDate ? formatShortDate(createdDate) : "No Date"}
                    </Card.Meta>
                    <Card.Description>{summary}</Card.Description>
                </Card.Content>
            </Card>
        </Link>
    );
};

export default SummaryCard;
