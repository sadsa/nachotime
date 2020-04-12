import React from "react";
import CardDetailForm from "../../components/Cards/CardDetailForm";
import { Header, Button } from "semantic-ui-react";
import { NextPage } from "next";
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
            type: "word",
        },
    ],
};

const CreateCardPage: NextPage<ICard> = () => {
    return (
        <>
            <Link href="/cards">
                <Button basic content="< Back" />
            </Link>
            <Header as="h1">Create New Card</Header>
            <CardDetailForm {...emptyCard} />
        </>
    );
};

export default CreateCardPage;
