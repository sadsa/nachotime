import React from "react";
import { NextPage } from "next";
import { Header, Button } from "semantic-ui-react";
import CardDetailForm from "../../components/Cards/CardDetailForm";
import firebase from "../../firebase/clientApp";
import { ICard } from "../../interfaces/card";
import Link from "next/link";

const emptyCard: ICard = {
    id: "",
    title: "",
    phrase: "",
    translation: "",
    playbackAudioUrl: "",
    expressions: [
        {
            value: "",
            translation: "",
        },
    ],
    createdDate: firebase.firestore.Timestamp.now()
};

const CreateCardPage: NextPage<ICard> = () => {
    return (
        <>
            <Link href="/">
                <Button basic content="< Back" />
            </Link>
            <Header as="h1">Create New Card</Header>
            <CardDetailForm {...emptyCard} />
        </>
    );
};

export default CreateCardPage;
