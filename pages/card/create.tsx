import React from "react";
import CardDetailForm from "../../components/CardDetailForm";
import { Header } from "semantic-ui-react";
import { NextPage } from "next";
import { ICard } from "../../interfaces/card";

const emptyCard: ICard = {
    id: "",
    title: "",
    phrase: "",
    translation: "",
    playbackAudioUrl: "",
    createdDate: 0,
};

const CreateCardPage: NextPage<ICard> = () => {
    return (
        <>
            <Header as="h1">Create New Card</Header>
            <CardDetailForm {...emptyCard} />
        </>
    );
};


export default CreateCardPage;
