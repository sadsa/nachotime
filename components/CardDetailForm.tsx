import React from "react";
import { Button, Checkbox, Form, Grid, TextArea } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { ICard } from "../interfaces/card";
import dynamic from "next/dynamic";

const AudioRecordField = dynamic(() => import("./AudioRecordField"), {
    ssr: false,
});

export type ICardDetailsFormData = ICard;

function CardDetailForm() {
    const formContextValues = useForm<ICardDetailsFormData>();
    const { register, handleSubmit, setValue } = formContextValues;

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });
    
    const onStopRecording = (playbackAudioUrl: string) => {
        console.log(playbackAudioUrl);
        setValue("playbackAudioUrl", playbackAudioUrl);
    };

    React.useEffect(() => {
        register({ name: "playbackAudioUrl", defaultValue: "" });
    }, [register]);

    return (
        <div>
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form onSubmit={onSubmit}>
                            <Form.Field>
                                <label>Name</label>
                                <input
                                    name="name"
                                    placeholder="Name"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Summary</label>
                                <input
                                    name="summary"
                                    placeholder="Summary"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Body</label>
                                <TextArea
                                    name="body"
                                    placeholder="Body"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Translation</label>
                                <input
                                    name="translation"
                                    placeholder="Translation"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Audio</label>
                                <AudioRecordField onChange={onStopRecording} />
                            </Form.Field>
                            <Form.Field>
                                <label>Banner Image</label>
                                <input
                                    name="bannerImageUrl"
                                    placeholder="Banner Image"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label="I agree to the Terms and Conditions" />
                            </Form.Field>
                            <Button type="submit">Submit</Button>
                        </Form>
                    </Grid.Column>
                    <Grid.Column>preview</Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
}

export default CardDetailForm;
