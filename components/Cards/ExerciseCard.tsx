import React from "react";
import { ICard } from "../../interfaces/card";
import { Card, Button } from "semantic-ui-react";
import { formatShortDate } from "../../util/dateUtils";

interface IExerciseCardProps extends ICard {}

const ExerciseCard: React.FC<IExerciseCardProps> = ({
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
            <Card raised fluid>
                <Card.Content textAlign="center">
                    <p>
                        <Button
                            icon="volume up"
                            color="teal"
                            circular
                            size="large"
                            onClick={handlePlayAudio}
                        />
                    </p>
                    <Card.Header>{title}</Card.Header>
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

export default ExerciseCard;
