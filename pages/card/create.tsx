import React from "react";
import CardDetailForm from "../../components/Cards/CardDetailForm";
import { Header, Button } from "semantic-ui-react";
import { NextPage } from "next";
import { ICard } from "../../interfaces/card";
import { useRouter } from "next/router";
import Link from "next/link";

const emptyCard: ICard = {
    id: "",
    title: "",
    phrase: "",
    translation: "",
    playbackAudioUrl: "",
    createdDate: 0,
};

const CreateCardPage: NextPage<ICard> = () => {
    const { back } = useRouter();
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
