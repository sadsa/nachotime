import React from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { ICard } from "../../interfaces/card";
import { formatShortDate } from "../../util/dateUtils";
import Link from "next/link";

interface ISummaryCard extends ICard {}

const PreviewCard: React.FC<ISummaryCard> = ({
    id,
    title,
    createdDate,
    phrase,
    playbackAudioUrl
}) => {
    const [playing, setPlaying] = React.useState(false);
    const [track] = React.useState(new Audio(playbackAudioUrl));
    
    function handlePlayAudio() {
        if (playing) {
            track.pause();
            track.currentTime = 0;
            console.log(track)
            setPlaying(false);
        } else {
            track.play();
            track.addEventListener("playing", () => {
                setPlaying(true);
            });
            track.addEventListener("ended", () => {
                setPlaying(false);
            });
        }
    }

    return (
        <Card style={{ height: "100%" }} fluid>
            <Card.Content>
                <Card.Header>
                    <span style={{ display: "inline-block", width: "80%" }}>
                        {title}
                    </span>
                    <Button
                        icon={!playing ? "volume up" : "stop"}
                        color="teal"
                        circular
                        size="medium"
                        floated="right"
                        onClick={handlePlayAudio}
                    />
                </Card.Header>
                <Card.Meta>
                    {createdDate ? formatShortDate(createdDate) : "No Date"}
                </Card.Meta>
                <Card.Description>{phrase}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className="ui two buttons">
                    <Link href={`card/${id}`}>
                        <Button basic>
                            <Icon name="edit" /> Edit
                        </Button>
                    </Link>
                    <Link href={`card/view/${id}`}>
                        <Button basic>
                            <Icon name="eye" /> View
                        </Button>
                    </Link>
                </div>
            </Card.Content>
        </Card>
    );
};

export default PreviewCard;
