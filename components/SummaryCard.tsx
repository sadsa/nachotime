import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { formatShortDate } from "../util/dateUtils";
import AudioPlayer from "react-h5-audio-player";
import Link from "next/link";

const SummaryCard: React.FC<ICard> = ({
    id,
    title,
    createdDate,
    phrase,
    playbackAudioUrl,
    translation,
}) => {
    return (
        <Link href={`card/${id}`}>
            <Card>
                <Card.Header>
                    <AudioPlayer src={playbackAudioUrl} layout="stacked" />
                </Card.Header>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>
                        {createdDate ? formatShortDate(createdDate) : "No Date"}
                    </Card.Meta>
                    <Card.Description>{phrase}</Card.Description>
                    <Card.Description>{translation}</Card.Description>
                </Card.Content>
            </Card>
        </Link>
    );
};

export default SummaryCard;
