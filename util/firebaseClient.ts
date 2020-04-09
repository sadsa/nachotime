import { ICard } from "../interfaces/card";
import firebase from "../firebase/clientApp";

const database = firebase.firestore();
const collectionName = "cards";

async function getCards(): Promise<ICard[]> {
    const snapshot = await database.collection(collectionName).get();
    const cards = snapshot.docs.map((doc) => doc.data() as ICard);
    return cards;
}

async function setCard(model: ICard): Promise<void> {
    database.collection(collectionName).doc().set(model);
}

export const firebaseClient = { getCards, setCard };
