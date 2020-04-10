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

type CardFormField = keyof Omit<ICard, "id" | "createdDate">;
type CardFormViewModel = Record<CardFormField, any>;

const CardFormSchema = yup.object().shape<CardFormViewModel>({
    title: yup.string().required(),
    phrase: yup.string().required(),
    translation: yup.string().required(),
    playbackAudioUrl: yup.string().required(),
});

async function createOrUpdateCard(data: ICard): Promise<void> {
    if (!data.createdDate) {
        return firebaseClient.createCard(data);
    }
    return firebaseClient.updateCard(data);
}

const CardDetailForm: React.FC<ICard> = ({ ...card }) => {
    const {
        register,
        handleSubmit,
        setValue,
        errors,
        watch,
        getValues,
    } = useForm<ICard>({
        validationSchema: CardFormSchema,
        defaultValues: { ...card },
    });
    const router = useRouter();

    const onSubmit = handleSubmit((data: ICard) => {
        createOrUpdateCard(data).then(() => {
            router.push("/cards");
        });
    });

    const handleStopRecording = (audioBlob: Blob) => {
        setValue("playbackAudioUrl", URL.createObjectURL(audioBlob));
    };

    React.useEffect(() => {
        register({
            name: "playbackAudioUrl",
            defaultValue: card?.playbackAudioUrl || "",
        });
    }, [register]);

    return (
        <div>
            {JSON.stringify(getValues())}
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Form onSubmit={onSubmit}>
                            <Form.Field error={!!errors.title}>
                                <label>Title</label>
                                <input name="title" ref={register} />
                            </Form.Field>
                            <Form.Field error={!!errors.phrase}>
                                <label>Phrase</label>
                                <input name="phrase" ref={register} />
                            </Form.Field>
                            <Form.Field error={!!errors.translation}>
                                <label>Translation</label>
                                <input name="translation" ref={register} />
                            </Form.Field>
                            <Form.Field error={!!errors.playbackAudioUrl}>
                                <label>Audio</label>
                                <AudioRecordField
                                    onChange={handleStopRecording}
                                />
                                {watch("playbackAudioUrl") ? (
                                    <AudioPlayer
                                        src={watch("playbackAudioUrl")}
                                        autoPlay={false}
                                        autoPlayAfterSrcChange={false}
                                        onPlay={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                    />
                                ) : undefined}
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
