import React from "react";
import { ICard } from "../../interfaces/card";
import { Button, Segment, Header, List, Popup, Label } from "semantic-ui-react";
import { formatShortDate } from "../../util/dateUtils";
import { IExpression } from "../../interfaces/expression";
import classnames from "classnames";

interface IExerciseCardProps extends ICard {}

function breakPhraseIntoSegments(
    phrase: string,
    expressions: IExpression[]
): IExpression[] {
    const portions: string[] = getPhraseAsPortions(phrase, expressions);
    const segments: IExpression[] = portions.map((portion) => {
        const expressionFound = expressions.find(
            (exp) => exp.value === portion
        );
        if (expressionFound) {
            return expressionFound;
        }
        return { value: portion };
    });
    return segments;
}

function getPhraseAsPortions(phrase: string, expressions: any) {
    const separator = "|";
    expressions.forEach((expression: any) => {
        phrase = phrase.replace(
            new RegExp(expression.value, "g"),
            separator + expression.value + separator
        );
    });
    return phrase.split(separator);
}

const ReviewCard: React.FC<IExerciseCardProps> = ({
    createdDate,
    phrase,
    playbackAudioUrl,
    translation,
    expressions,
}) => {
    const [revealed, reveal] = React.useState(false);
    const phraseAsExpressions: IExpression[] = breakPhraseIntoSegments(
        phrase,
        expressions
    );
    function handlePlayAudio() {
        const track = new Audio(playbackAudioUrl);
        track.play();
    }

    return (
        <Segment size="massive" textAlign="center">
            <div className="review-card">
                <div className="bottom-spacer">
                    <Button
                        icon="volume up"
                        className="playback-button"
                        color="teal"
                        circular
                        size="massive"
                        onClick={handlePlayAudio}
                        style={{ fontSize: "2.5rem" }}
                    />
                </div>
                <Header>
                    {createdDate ? (
                        <Header.Subheader>
                            Created {formatShortDate(createdDate)}
                        </Header.Subheader>
                    ) : (
                        "No Date"
                    )}
                </Header>
                <div className="phrase bottom-spacer">
                    {revealed
                        ? translation
                        : phraseAsExpressions.map((expression, index) => (
                              <Expression key={index} {...expression} />
                          ))}
                </div>
                <div className="bottom-spacer">
                    <Button
                        icon="eye"
                        content={`${revealed ? "Hide" : "Show"} Translation`}
                        basic
                        size="small"
                        onClick={() => reveal(!revealed)}
                    />
                </div>
                <style jsx>{`
                    .review-card {
                        padding: 2em;
                    }
                    .review-card .phrase {
                        padding-top: 2em;
                        padding-bottom: 2em;
                        width: 100%;
                        text-align: center;
                        margin: auto;
                    }
                    .review-card button {
                        font-size: 2.714286rem;
                    }
                    .review-card .spacer {
                        margin: 0 0 1em;
                    }
                `}</style>
            </div>
        </Segment>
    );
};

export default ReviewCard;

interface IExpressionProps extends IExpression {}

export const Expression: React.FC<IExpressionProps> = ({
    value,
    translation,
}) => {
    const [hidden, setHidden] = React.useState(true);
    return (
        <span className="expression">
            <Popup
                disabled={!translation}
                size="huge"
                position="top center"
                trigger={
                    <Label
                        size="huge"
                        color={translation ? "yellow" : undefined}
                        style={{
                            fontSize: "24px",
                            display: "inline-block",
                            marginBottom: "4px",
                        }}
                        className={classnames("expression-label", {
                            "is-hidden": hidden,
                        })}
                        content={value}
                    />
                }
            >
                {translation}
            </Popup>
            <style jsx>{`
                .expression {
                    font-style: normal;
                    display: inline-block;
                    position: relative;
                    padding: 4px;
                    border-radius: 6px;
                    cursor: pointer;
                }
                .expression-label {
                    font-size: 24px;
                    display: inline-block;
                    margin-bottom: 10px;
                }
                .expression-label.is-hidden {
                    visibility: hidden;
                }
            `}</style>
        </span>
    );
};
