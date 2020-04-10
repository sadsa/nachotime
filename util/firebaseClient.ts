import { ICard } from "../interfaces/card";
import firebase from "../firebase/clientApp";

const firestore = firebase.firestore();
const cardsRef = firestore.collection("cards");
const storageRef = firebase.storage().ref();

async function getCards(): Promise<ICard[]> {
    const snapshot = await cardsRef.get();
    return snapshot.docs.map((doc) => doc.data() as ICard);
}

async function getCard(id: string): Promise<ICard> {
    const snapshot = await cardsRef.where("id", "==", id).get();
    const card = snapshot.docs[0].data();
    return card as ICard;
}

async function createCard(model: ICard): Promise<void> {
    const { id } = cardsRef.doc();
    return await cardsRef.doc().set({ ...model, id });
}

async function updateCard(model: ICard): Promise<void> {
    return await cardsRef.doc().set(model);
}

async function uploadAudio(blob: Blob): Promise<string> {
    const audioRef = storageRef.child(`audio/cards/test.mp3`);
    const metadata = {
        contentType: "audio/mpeg",
    };
    await audioRef.put(blob, metadata);
    return audioRef.getDownloadURL();
}

export const firebaseClient = {
    getCard,
    getCards,
    createCard,
    updateCard,
    uploadAudio,
};
