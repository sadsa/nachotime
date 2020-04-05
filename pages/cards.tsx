import { NextPage } from "next";
import { Header, Grid, Button, Icon } from "semantic-ui-react";
import SummaryCard from "../components/SummaryCard";

const Cards: NextPage<any> = () => (
    <>
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h1">Cards</Header>
                </Grid.Column>
                <Grid.Column>
                    <Button primary icon labelPosition="right" floated="right">
                        <Icon name="add square" />
                        Create New
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        <Grid columns={3}>
            <Grid.Row>
                {[0, 1, 2].map(() => (
                    <>
                        <Grid.Column>
                            <SummaryCard />
                        </Grid.Column>
                    </>
                ))}
            </Grid.Row>
        </Grid>
    </>
);

export default Cards;
