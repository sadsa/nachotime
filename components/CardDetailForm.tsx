import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import { ICard } from "../interfaces/card";
import dynamic from "next/dynamic";
import * as yup from "yup";
import { firebaseClient } from "../util/firebaseClient";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";

const AudioRecordField = dynamic(() => import("./AudioRecordField"), {
    ssr: false,
});

const CardFormSchema = yup.object().shape({
    name: yup.string().required(),
    summary: yup.string().required(),
    body: yup.string().required(),
    translation: yup.string().required(),
    playbackAudioUrl: yup.string().required(),
    bannerImageUrl: yup.string().required(),
});

async function createOrUpdateCard(audioBlob: Blob, data: ICard): Promise<void> {
    if (!data.createdDate) {
        const playbackAudioUrl = await firebaseClient.uploadAudio(audioBlob);
        firebaseClient.createCard({
            ...data,
            playbackAudioUrl,
            createdDate: Date.now(),
        });
    }
    firebaseClient.updateCard(data);
}

const CardDetailForm: React.FC<ICard> = ({ ...card }) => {
    const { register, handleSubmit, setValue, errors } = useForm<
        ICard
    >({
        validationSchema: CardFormSchema,
        defaultValues: { ...card },
    });
    const router = useRouter();
    const [audioBlob, setAudioBlob] = React.useState<Blob>();

    const onSubmit = handleSubmit(async (data: ICard) => {
        if (!audioBlob) return undefined;
        try {
            await createOrUpdateCard(audioBlob, data);
            router.push("/cards");
        } catch (error) {
            throw Error("There was a problem saving this card");
        }
    });

    const handleStopRecording = (audioBlob: Blob) => {
        setValue("playbackAudioUrl", URL.createObjectURL(audioBlob));
        setAudioBlob(audioBlob);
    };

    React.useEffect(() => {
        register({
            name: "playbackAudioUrl",
            defaultValue: card?.playbackAudioUrl || "",
        });
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
                                <textarea
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
                                <AudioRecordField
                                    onChange={handleStopRecording}
                                />
                                {card.playbackAudioUrl ? (
                                    <AudioPlayer
                                        ref={register}
                                        src={card.playbackAudioUrl}
                                        autoPlay={false}
                                        autoPlayAfterSrcChange={false}
                                        onPlay={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    />
                                ) : undefined}
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
};

export default CardDetailForm;
