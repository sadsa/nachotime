import React from "react";
import styled from "styled-components";
import { Card, Button, Icon } from "semantic-ui-react";
import { ICard } from "../../interfaces/card";
import { formatShortDate } from "../../util/dateUtils";
import Link from "next/link";

interface IProps {
    card: ICard;
    selected?: boolean;
    onSelect?(cardId: string): void;
}

function usePreviewCard(playbackAudioUrl: string) {
    const [{ playing, track, hasActions }, setState] = React.useState({
        playing: false,
        track: new Audio(playbackAudioUrl),
        hasActions: false
    });

    function play() {
        track.play();
        track.addEventListener("playing", () => {
            setState(prevState => ({ ...prevState, playing: true }));
        });
        track.addEventListener("ended", () => {
            setState(prevState => ({ ...prevState, playing: false }));
        });
    }

    function stop() {
        track.pause();
        track.currentTime = 0;
        setState(prevState => ({ ...prevState, playing: false }));
    }

    function revealActions() {
        setState(prevState => ({
            ...prevState,
            hasActions: true
        }));
    }

    function hideActions() {
        setState(prevState => ({
            ...prevState,
            hasActions: false
        }));
    }

    return { playing, revealActions, hideActions, play, stop, hasActions };
}

const PreviewCard: React.FC<IProps> = ({ card, selected, onSelect }) => {
    const { id, title, createdDate, phrase, playbackAudioUrl } = card;
    const {
        playing,
        play,
        stop,
        revealActions,
        hideActions,
        hasActions
    } = usePreviewCard(playbackAudioUrl);

    const handlePlayAudio = () => {
        if (playing) {
            stop();
        } else {
            play();
        }
    };

    const handleSelect = () => {
        if (onSelect) {
            onSelect(card.id);
        }
    };

    return (
        <StyledCard
            fluid
            onMouseEnter={() => revealActions()}
            onMouseLeave={() => hideActions()}
            raised={selected}
        >
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
                            <Icon name="eye" /> Review
                        </Button>
                    </Link>
                </div>
                {hasActions || selected ? (
                    <Button
                        circular
                        basic={selected ? undefined : true}
                        color={selected ? "yellow" : undefined}
                        icon="check"
                        size="tiny"
                        className="select-button"
                        onClick={handleSelect}
                    />
                ) : (
                    undefined
                )}
            </Card.Content>
        </StyledCard>
    );
};

const StyledCard = styled(Card)`
    height: "100%";
    position: relative;
    .select-button {
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }
`;

export default PreviewCard;
