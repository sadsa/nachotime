import React from "react";
import { NextPage, NextPageContext } from "next";
import { Button } from "semantic-ui-react";
import { ICard } from "../../../interfaces/card";
import ReviewCard from "../../../components/Cards/ReviewCard";
import { cardsClient } from "../../../util/cardsClient";
import { useRouter } from "next/router";

const CardViewPage: NextPage<ICard> = card => {
    const { back } = useRouter();
    return (
        <>
            <div className="bottom-spacer">
                <Button onClick={back} basic content="< Back" />
            </div>
            <ReviewCard {...card} />
        </>
    );
};

CardViewPage.getInitialProps = async function(
    context: NextPageContext
): Promise<ICard> {
    const slug = context?.query?.id ? context.query.id[0] : "";
    const card = await cardsClient.getCard(slug);
    return { ...card };
};

export default CardViewPage;
