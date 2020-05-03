import React from "react";
import { Button, Form, Grid } from "semantic-ui-react";
import { useForm, useFieldArray } from "react-hook-form";
import { ICard } from "../../interfaces/card";
import dynamic from "next/dynamic";
import * as yup from "yup";
import { firebaseClient } from "../../util/cardsClient";
import { useRouter } from "next/router";

const AudioRecordField = dynamic(() => import("../common/AudioRecordField"), {
    ssr: false,
});

type CardFormField = keyof Omit<ICard, "id" | "createdDate">;
type CardFormViewModel = Record<CardFormField, any>;

enum StatusEnum {
    idle = "idle",
    pending = "pending",
    resolved = "resolved",
    rejected = "rejected",
}

const CardFormSchema = yup.object().shape<CardFormViewModel>({
    title: yup.string().required(),
    phrase: yup.string().required(),
    translation: yup.string().required(),
    playbackAudioUrl: yup.string().required(),
    expressions: yup.array().of(yup.object()),
});

async function createOrUpdateCard(data: ICard): Promise<void> {
    if (!data.id) {
        return firebaseClient.createCard(data);
    }
    return firebaseClient.updateCard(data);
}

const CardDetailForm: React.FC<ICard> = ({ ...card }) => {
    const { register, handleSubmit, setValue, errors, control } = useForm<
        ICard
    >({
        validationSchema: CardFormSchema,
        defaultValues: { ...card },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "expressions",
    });
    const router = useRouter();
    const [status, setStatus] = React.useState(StatusEnum.resolved);

    const onSubmit = (data: Partial<ICard>) => {
        setStatus(StatusEnum.pending);
        createOrUpdateCard({ ...card, ...data })
            .then(() => {
                router.push("/cards");
                setStatus(StatusEnum.resolved);
            })
            .catch(() => setStatus(StatusEnum.rejected));
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
            <Form
                onSubmit={handleSubmit(onSubmit)}
                loading={status === StatusEnum.pending}
            >
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column width="ten">
                            <Form.Field error={!!errors.title}>
                                <label>Title</label>
                                <input name="title" ref={register} />
                            </Form.Field>
                            <Form.Field error={!!errors.phrase}>
                                <label>Phrase</label>
                                <textarea
                                    name="phrase"
                                    ref={register}
                                    className="textarea"
                                    rows={4}
                                />
                            </Form.Field>
                            <Form.Field error={!!errors.translation}>
                                <label>Translation</label>
                                <textarea
                                    name="translation"
                                    ref={register}
                                    className="textarea"
                                    rows={4}
                                />
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
                                    playbackAudioUrl={card.playbackAudioUrl}
                                />
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
