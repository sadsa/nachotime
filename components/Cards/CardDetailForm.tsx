import React from "react";
import { Button, Form, Grid, TextArea } from "semantic-ui-react";
import { useForm, useFieldArray } from "react-hook-form";
import { ICard } from "../../interfaces/card";
import dynamic from "next/dynamic";
import * as yup from "yup";
import { firebaseClient } from "../../util/firebaseClient";
import { useRouter } from "next/router";
import AudioPlayer from "react-h5-audio-player";
    
const AudioRecordField = dynamic(() => import("../common/AudioRecordField"), {
    ssr: false,
});

type CardFormField = keyof Omit<ICard, "id" | "createdDate">;
type CardFormViewModel = Record<CardFormField, any>;

const CardFormSchema = yup.object().shape<CardFormViewModel>({
    title: yup.string().required(),
    phrase: yup.string().required(),
    translation: yup.string().required(),
    playbackAudioUrl: yup.string().required(),
    expressions: yup.array().of(yup.object()).required(),
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
        control,
    } = useForm<ICard>({
        validationSchema: CardFormSchema,
        defaultValues: { ...card },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "expressions",
    });
    const router = useRouter();

    const onSubmit = (data: ICard) => {
        // console.log(data);
        createOrUpdateCard(data).then(() => {
            router.push("/cards");
        });
    };

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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width="ten">
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
                            <Form.Field error={!!errors.expressions}>
                                <label>Expressions</label>
                                {fields.map((field, index) => {
                                    const fieldName = `expressions[${index}]`;
                                    return (
                                        <Form.Group inline key={field.id}>
                                            <Form.Field>
                                                <input
                                                    type="text"
                                                    placeholder="Word or Phrase"
                                                    name={`${fieldName}.value`}
                                                    ref={register()}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <input
                                                    type="text"
                                                    placeholder="Translation"
                                                    name={`${fieldName}.translation`}
                                                    ref={register()}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <input
                                                    type="text"
                                                    placeholder="Definition"
                                                    name={`${fieldName}.definition`}
                                                    ref={register()}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                                <Button
                                                    onClick={() =>
                                                        remove(index)
                                                    }
                                                    type="button"
                                                    icon="trash"
                                                ></Button>
                                            </Form.Field>
                                        </Form.Group>
                                    );
                                })}
                                <Button
                                    type="button"
                                    onClick={() => append({ name: "test" })}
                                >
                                    Add
                                </Button>
                            </Form.Field>
                            <Form.Field error={!!errors.playbackAudioUrl}>
                                <label>Record Voice</label>
                                <AudioRecordField
                                    onChange={handleStopRecording}
                                />
                            </Form.Field>
                            <Form.Field error={!!errors.playbackAudioUrl}>
                                <label>Playback</label>
                                {watch("playbackAudioUrl") ? (
                                    <AudioPlayer
                                        src={watch("playbackAudioUrl")}
                                        autoPlay={false}
                                        autoPlayAfterSrcChange={false}
                                        onPlay={(e) => e.stopPropagation()}
                                        layout="horizontal-reverse"
                                    />
                                ) : undefined}
                            </Form.Field>
                            <Button type="submit" id="submit">
                                Submit
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
        </div>
    );
};

export default CardDetailForm;
