import { getCollection } from "~/utils/db.server";

const expressionsCollection = getCollection("expressions");

export async function getExpressions() {
  const snapshot = await expressionsCollection.get();
  return snapshot.docs.map((doc) => doc.data());
}
