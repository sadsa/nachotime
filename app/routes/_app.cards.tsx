import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { getCards } from "~/models/card.server";

export async function loader() {
  const cards = await getCards();
  return json({ cards });
}

export default function CardsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      CARDS PAGE
      {JSON.stringify(data.cards, null, 2)}
      <Outlet />
    </div>
  );
}
