import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { formatShortDate } from "../util/dateUtils";

const SummaryCard: React.FC<ICard> = (props) => {
    return (
        <Card>
            <Image src="/images/avatar/daniel.jpg" wrapped ui={false} />
            <Card.Content>
                <Card.Header>{props.name}</Card.Header>
                <Card.Meta>
                    {formatShortDate(props.createdDate)}
                </Card.Meta>
                <Card.Description>{props.summary}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name="user" />
                    {formatShortDate(props.lastReviewDate)}
                </a>
            </Card.Content>
        </Card>
    );
};

export default SummaryCard;
