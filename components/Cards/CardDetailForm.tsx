import React from "react";
import { Button, Form, Grid, Header, Checkbox } from "semantic-ui-react";
import { useForm, useFieldArray } from "react-hook-form";
import { ICard, WorkflowStatus } from "../../interfaces/card";
import dynamic from "next/dynamic";
import * as yup from "yup";
import { firebaseClient } from "../../util/cardsClient";
import { useRouter } from "next/router";

const AudioRecordField = dynamic(() => import("../common/AudioRecordField"), {
    ssr: false
});

type CardFormField = keyof Omit<ICard, "id" | "createdDate">;
type CardFormViewModel = Record<CardFormField, any>;

enum StatusEnum {
    idle = "idle",
    pending = "pending",
    resolved = "resolved",
    rejected = "rejected"
}

const CardFormSchema = yup.object().shape<CardFormViewModel>({
    title: yup.string().required(),
    phrase: yup.string().required(),
    translation: yup.string().required(),
    workflowStatus: yup.number().required(),
    playbackAudioUrl: yup.string().required(),
    expressions: yup.array().of(yup.object())
});

async function createOrUpdateCard(data: ICard): Promise<void> {
    if (!data.id) {
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
        control,
        watch,
    } = useForm<ICard>({
        validationSchema: CardFormSchema,
        defaultValues: { ...card }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "expressions"
    });
    const router = useRouter();
    const [status, setStatus] = React.useState(StatusEnum.resolved);
    const workflowStatus = watch("workflowStatus");

    const onSubmit = (data: Partial<ICard>) => {
        setStatus(StatusEnum.pending);
        createOrUpdateCard({ ...card, ...data })
            .then(() => {
                router.push("/");
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
            defaultValue: card?.playbackAudioUrl || ""
        });
        register({
            name: "workflowStatus",
            defaultValue: card?.workflowStatus ?? WorkflowStatus.notApproved
        });
    }, [register]);

    return (
        <>
            <Form
                onSubmit={handleSubmit(onSubmit)}
                loading={status === StatusEnum.pending}
            >
                <Grid columns={2}>
                    <Grid.Row>
                        <Grid.Column verticalAlign="middle" width="8">
                            <Header as="h1">
                                {!card.createdDate ? "Create New" : "Edit"} Card
                            </Header>
                        </Grid.Column>
                        <Grid.Column width="8" textAlign="right">
                            <Button
                                basic={workflowStatus !== WorkflowStatus.approved}
                                color={workflowStatus === WorkflowStatus.approved ? "green" : undefined}
                                type="button"
                                label={
                                    workflowStatus === WorkflowStatus.approved
                                        ? "Approved"
                                        : "Not Approved"
                                }
                                icon="check"
                                onClick={(e: React.SyntheticEvent) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setValue(
                                        "workflowStatus",
                                        workflowStatus ===
                                            WorkflowStatus.approved
                                            ? WorkflowStatus.notApproved
                                            : WorkflowStatus.approved
                                    )}
                                }
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column mobile="16" computer="ten">
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
        </>
    );
};

export default CardDetailForm;
