import React from "react";
import { NextPage } from "next";
import { Header } from "semantic-ui-react";
import { ICard } from "../interfaces/card";
import { firebaseClient } from "../util/firebaseClient";
import ExerciseCard from "../components/Cards/ExerciseCard";
import ReviewSteps from "../components/Review/ReviewSteps";

type IReviewPageProps = {
    cards: ICard[];
};

const ReviewPage: NextPage<IReviewPageProps> = ({ cards }) => {
    return (
        <>
            <Header as="h1">Review Cards</Header>
            <ReviewSteps />
            {cards.map((card) => (
                <ExerciseCard {...card} />
            ))}
        </>
    );
};

ReviewPage.getInitialProps = async function () {
    const cards = await firebaseClient.getCards();
    return { cards };
};

export default ReviewPage;
