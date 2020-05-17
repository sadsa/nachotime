import React from "react";
import styled from "styled-components";
import {
    Card,
    Button,
    Icon,
    CardProps,
    Popup,
    Label,
    LabelGroup,
} from "semantic-ui-react";
import { ICard, WorkflowStatus } from "../../interfaces/card";
import { formatShortDate } from "../../util/dateUtils";
import Link from "next/link";

interface IProps extends CardProps {
    card: ICard;
    selected?: boolean;
    onSelect?(cardId: string): void;
}

function usePreviewCard(playbackAudioUrl: string) {
    const [{ playing, track, hasActions }, setState] = React.useState({
        playing: false,
        track: new Audio(playbackAudioUrl),
        hasActions: false,
    });

    function play() {
        track.play();
        track.addEventListener("playing", () => {
            setState((prevState) => ({ ...prevState, playing: true }));
        });
        track.addEventListener("ended", () => {
            setState((prevState) => ({ ...prevState, playing: false }));
        });
    }

    function stop() {
        track.pause();
        track.currentTime = 0;
        setState((prevState) => ({ ...prevState, playing: false }));
    }

    function revealActions() {
        setState((prevState) => ({
            ...prevState,
            hasActions: true,
        }));
    }

    function hideActions() {
        setState((prevState) => ({
            ...prevState,
            hasActions: false,
        }));
    }

    return { playing, revealActions, hideActions, play, stop, hasActions };
}

const PreviewCard: React.FC<IProps> = ({
    card,
    selected,
    onSelect,
    ...cardProps
}) => {
    const {
        id,
        title,
        createdDate,
        phrase,
        playbackAudioUrl,
        workflowStatus,
        tags,
    } = card;
    const {
        playing,
        play,
        stop,
        revealActions,
        hideActions,
        hasActions,
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
            raised={selected || hasActions}
            {...cardProps}
        >
            <Card.Content>
                <Card.Header>
                    <StyledCardTitle>{title}</StyledCardTitle>
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
                <Card.Description as="p">{phrase}</Card.Description>
                {tags && tags.length ? (
                    <Card.Description>
                        <LabelGroup>
                            {tags.map((tag, index) => (
                                <Label
                                    key={index}
                                    as="a"
                                    content={tag}
                                    size="tiny"
                                />
                            ))}
                        </LabelGroup>
                    </Card.Description>
                ) : undefined}
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
                    <>
                        <StyledCardSelectButton
                            circular
                            basic={selected ? undefined : true}
                            color={selected ? "yellow" : undefined}
                            icon="check"
                            size="tiny"
                            onClick={handleSelect}
                        />
                        <StyledCardStatusLabel
                            size="tiny"
                            color={
                                workflowStatus === WorkflowStatus.approved
                                    ? "green" 
                                    : "yellow"
                            }
                        >
                            {workflowStatus === WorkflowStatus.approved
                                ? "Approved"
                                : "Needs Approval"}
                        </StyledCardStatusLabel>
                    </>
                ) : undefined}
            </Card.Content>
        </StyledCard>
    );
};

const StyledCard = styled(Card)`
    &.ui {
        height: 100%;
        position: relative;
        padding-top: 0.5rem;
    }
`;

const StyledCardTitle = styled.span`
    display: inline-block;
    width: 80%;
`;

const StyledCardStatusLabel = styled(Label)`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -70%);
`;

const StyledCardSelectButton = styled(Button)`
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
`;

export default PreviewCard;
