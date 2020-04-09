import React from "react";
import { Button, Checkbox, Form, Grid, TextArea } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";
import { ICard } from "../interfaces/card";
import dynamic from "next/dynamic";
import * as yup from "yup";

const AudioRecordField = dynamic(() => import("./AudioRecordField"), {
    ssr: false,
});

export type ICardDetailsFormData = ICard;

const CardFormSchema = yup.object().shape({
    name: yup.string().required(),
    summary: yup.string().required(),
    body: yup.string().required(),
    translation: yup.string().required(),
    playbackAudioUrl: yup.string().required(),
    bannerImageUrl: yup.string().required(),
});

function CardDetailForm() {
    const { register, handleSubmit, setValue, errors, control } = useForm<
        ICardDetailsFormData
    >({
        validationSchema: CardFormSchema,
    });

    const onSubmit = handleSubmit((data) => {
        console.log(errors);
        console.log(data);
    });

    const onStopRecording = (playbackAudioUrl: string) => {
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
                            <Form.Field error={!!errors.name}>
                                <label>Name</label>
                                <input
                                    name="name"
                                    placeholder="Name"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field error={!!errors.summary}>
                                <label>Summary</label>
                                <input
                                    name="summary"
                                    placeholder="Summary"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field error={!!errors.body}>
                                <label>Body</label>
                                <TextArea
                                    name="body"
                                    placeholder="Body"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field error={!!errors.translation}>
                                <label>Translation</label>
                                <input
                                    name="translation"
                                    placeholder="Translation"
                                    ref={register}
                                />
                            </Form.Field>
                            <Form.Field error={!!errors.playbackAudioUrl}>
                                <label>Audio</label>
                                <AudioRecordField onChange={onStopRecording} />
                            </Form.Field>
                            <Form.Field error={!!errors.bannerImageUrl}>
                                <label>Banner Image</label>
                                <input
                                    name="bannerImageUrl"
                                    placeholder="Banner Image"
                                    ref={register}
                                />
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
