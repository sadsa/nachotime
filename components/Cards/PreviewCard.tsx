import React from "react";
import { Card, Button } from "semantic-ui-react";
import { ICard } from "../../interfaces/card";
import { formatShortDate } from "../../util/dateUtils";

interface ISummaryCard extends ICard {}

const PreviewCard: React.FC<ISummaryCard> = ({
    title,
    createdDate,
    phrase,
    playbackAudioUrl,
    translation,
}) => {
    const [revealed, reveal] = React.useState(false);
    function handlePlayAudio() {
        const track = new Audio(playbackAudioUrl);
        track.play();
    }
    return (
        <>
            <Card>
                <Card.Content>
                    <Card.Header>
                        {title}
                        <Button
                            icon="volume up"
                            color="teal"
                            circular
                            size="large"
                            floated="right"
                            onClick={handlePlayAudio}
                        />
                    </Card.Header>
                    <Card.Meta>
                        {createdDate ? formatShortDate(createdDate) : "No Date"}
                    </Card.Meta>
                    <Card.Description>
                        {revealed ? translation : phrase}{" "}
                    </Card.Description>
                </Card.Content>
            </Card>
            <Button
                icon="eye"
                content="Toggle Translation"
                basic
                size="small"
                onClick={() => reveal(!revealed)}
            />
        </>
    );
};

export default PreviewCard;
