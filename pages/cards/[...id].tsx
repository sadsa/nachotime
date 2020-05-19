import React from "react";
import CardDetailForm from "../../components/Cards/CardDetailForm";
import { Button } from "semantic-ui-react";
import { NextPage, NextPageContext } from "next";
import { cardsClient } from "../../util/cardsClient";
import { ICard } from "../../interfaces/card";
import { useRouter } from "next/router";

const CardPage: NextPage<ICard> = ({ ...card }) => {
    const { back } = useRouter();
    return (
        <>
            <div className="bottom-spacer">
                <Button onClick={back} basic content="< Back" />
            </div>
            <CardDetailForm {...card} />
        </>
    );
};

CardPage.getInitialProps = async function(
    context: NextPageContext
): Promise<ICard> {
    const slug = context?.query?.id ? context.query.id[0] : "";
    const card = await cardsClient.getCard(slug);
    return { ...card };
};

export default CardPage;
