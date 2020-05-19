import React from "react";
import { NextPage } from "next";
import { expressionsClient } from "../../util/expressionsClient";
import { IExpression } from "../../interfaces/expression";
import { Header } from "semantic-ui-react";

type ExpressionsPageProps = {
    expressions: IExpression[];
};

const ExpressionsPage: NextPage<ExpressionsPageProps> = ({ expressions }) => {
    return (
        <>
            <Header as="h1">Expressions</Header>
            <div>
                {expressions.map((expression, index) => (
                    <span key={index}>{expression}</span>
                ))}
            </div>
        </>
    );
};

ExpressionsPage.getInitialProps = async function () {
    const expressions = await expressionsClient.getExpressions();
    return { expressions };
};

export default ExpressionsPage;
