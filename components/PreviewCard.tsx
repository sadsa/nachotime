import React from "react";
import { Card, Button } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { formatShortDate } from "../util/dateUtils";
import AudioPlayer from "react-h5-audio-player";
import Link from "next/link";

interface ISummaryCard extends ICard {}

const PreviewCard: React.FC<ISummaryCard> = ({
    id,
    title,
    createdDate,
    phrase,
    playbackAudioUrl,
    translation,
}) => {
    return (
        <Card>
            <Card.Header>
                <AudioPlayer src={playbackAudioUrl} />
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
    );
};

export default PreviewCard;
