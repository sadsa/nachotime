import React from "react";
import { Icon, Step } from "semantic-ui-react";

const ReviewSteps: React.FC = () => (
    <Step.Group widths={3}>
        <Step>
            <Icon name="headphones" />
            <Step.Content>
                <Step.Title>Listen</Step.Title>
            </Step.Content>
        </Step>
        <Step active>
            <Icon name="translate" />
            <Step.Content>
                <Step.Title>Translate</Step.Title>
            </Step.Content>
        </Step>
        <Step disabled>
            <Icon name="microphone" />
            <Step.Content>
                <Step.Title>Review</Step.Title>
            </Step.Content>
        </Step>
    </Step.Group>
);

export default ReviewSteps;
