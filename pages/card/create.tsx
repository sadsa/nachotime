import React from "react";
import { NextPage } from "next";
import { Button } from "semantic-ui-react";
import CardDetailForm from "../../components/Cards/CardDetailForm";
import { ICard, WorkflowStatus } from "../../interfaces/card";
import { useRouter } from "next/router";

const emptyCard: ICard = {
    id: "",
    title: "",
    phrase: "",
    translation: "",
    playbackAudioUrl: "",
    workflowStatus: WorkflowStatus.notApproved,
    expressions: [
        {
            value: "",
            translation: ""
        }
    ]
};

const CreateCardPage: NextPage<ICard> = () => {
    const { back } = useRouter();
    return (
        <>
            <div className="bottom-spacer">
                <Button onClick={back} basic content="< Back" />
            </div>
            <CardDetailForm {...emptyCard} />
        </>
    );
};

export default CreateCardPage;
