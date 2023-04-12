import { getDocs } from "firebase/firestore/lite";
import { createCollection } from "~/firebase";

const expressionsCollection = createCollection("expressions");

export async function getExpressions() {
  const snapshot = await getDocs(expressionsCollection);
  return snapshot.docs.map((doc) => doc.data());
}
