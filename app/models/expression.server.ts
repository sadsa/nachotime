import { getDocs } from "firebase/firestore/lite";
import { getCollection } from "~/firebase.server";

const expressionsCollection = getCollection("expressions");

export async function getExpressions() {
  const snapshot = await getDocs(expressionsCollection);
  return snapshot.docs.map((doc) => doc.data());
}
