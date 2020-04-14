import React from "react";
import { ICard } from "../../interfaces/card";
import { Button, Segment, Header, List, Popup, Label } from "semantic-ui-react";
import { formatShortDate } from "../../util/dateUtils";

interface IExerciseCardProps extends ICard {}

const ReviewCard: React.FC<IExerciseCardProps> = ({
    createdDate,
    phrase,
    playbackAudioUrl,
    translation,
    expressions,
}) => {
    const [revealed, reveal] = React.useState(false);
    function handlePlayAudio() {
        const track = new Audio(playbackAudioUrl);
        track.play();
    }
    return (
        <Segment size="massive" textAlign="center">
            <div className="review-card">
                <p>
                    <Button
                        icon="volume up"
                        className="playback-button"
                        color="teal"
                        circular
                        size="massive"
                        onClick={handlePlayAudio}
                        style={{ fontSize: "2.5rem" }}
                    />
                </p>
                <Header>
                    {createdDate ? (
                        <Header.Subheader>
                            Created {formatShortDate(createdDate)}
                        </Header.Subheader>
                    ) : (
                        "No Date"
                    )}
                </Header>
                <p className="phrase">{revealed ? translation : phrase}</p>
                <p>
                    <Button
                        icon="eye"
                        content={`${revealed ? "Hide" : "Show"} Translation`}
                        basic
                        size="small"
                        onClick={() => reveal(!revealed)}
                    />
                </p>
                <div>
                    <Header>
                        <Header.Subheader>Expressions</Header.Subheader>
                    </Header>
                    <Label.Group color="blue" size="medium">
                        {expressions
                            ? expressions.map((exp, index) => (
                                  <Popup
                                      key={index}
                                      trigger={<Label content={exp.value} />}
                                  >
                                      <List>
                                          <List.Item>
                                              <List.Content>
                                                  <List.Header>
                                                      Translation
                                                  </List.Header>
                                                  <List.Description>
                                                      {exp.translation}
                                                  </List.Description>
                                              </List.Content>
                                          </List.Item>
                                          <List.Item>
                                              <List.Content>
                                                  <List.Header>
                                                      Definition
                                                  </List.Header>
                                                  <List.Description>
                                                      {exp.definition}
                                                  </List.Description>
                                              </List.Content>
                                          </List.Item>
                                      </List>
                                  </Popup>
                              ))
                            : null}
                    </Label.Group>
                </div>
                <style jsx>{`
                    .review-card {
                        padding: 2em 6em;
                    }
                    .phrase {
                        padding-top: 1em;
                        padding-bottom: 1em;
                        width: 540px;
                        margin: auto;
                    }
                    .review-card button {
                        font-size: 2.714286rem;
                    }
                `}</style>
            </div>
        </Segment>
    );
};

export default ReviewCard;
