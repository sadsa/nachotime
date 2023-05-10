import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Content, Flex, Heading, Text } from "@adobe/react-spectrum";
import { Card } from "@react-spectrum/card";
import { TagGroup, Item } from "@react-spectrum/tag";

import { getCards } from "~/models/card.server";

export async function loader() {
  const cards = await getCards();
  return json({ cards });
}

export default function CardsPage() {
  const { cards } = useLoaderData<typeof loader>();

  return (
    <div>
      <Flex direction="row" gap="size-100" wrap>
        {cards.map((item) => (
          <Card key={item.id} textValue={item.title} flex="1 0 320px">
            <Heading>
              {item.title}
            </Heading>
            <Text slot="detail">
              PNG
            </Text>
            <Content>
              {item.phrase}
              <TagGroup items={item.expressions.map((e, i) => ({ ...e, key: i }))} aria-label="Expressions">
                {expression => <Item key={expression.key}>{expression.value}</Item>}
              </TagGroup>
            </Content>
          </Card>
        ))}
      </Flex>
      <Outlet />
    </div >
  );
}
