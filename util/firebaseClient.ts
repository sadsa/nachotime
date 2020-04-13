import { ICard } from "../interfaces/card";
import firebase from "../firebase/clientApp";
import { getFileBlob } from "./fileUtils";

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

async function createCard(data: ICard): Promise<void> {
    const docRef = cardsRef.doc();
    const playbackAudioUrl = await uploadAudio(
        data.playbackAudioUrl,
        docRef.id
    );
    return await docRef.set({
        id: docRef.id,
        playbackAudioUrl,
        createdDate: firebase.firestore.Timestamp.now(),
        ...data,
    });
}

async function updateCard(data: ICard): Promise<void> {
    const docRef = cardsRef.doc(data.id);
    const playbackAudioUrl = await uploadAudio(
        data.playbackAudioUrl,
        docRef.id
    );
    return await docRef.set({
        playbackAudioUrl,
        ...data,
    });
}

async function deleteCard(id: string): Promise<void> {
    return await cardsRef.doc(id).delete();
}

async function uploadAudio(url: string, id: string): Promise<string> {
    const blob: Blob = await getFileBlob(url);
    const audioRef = storageRef.child(`audio/cards/recording_${id}.mp3`);
    const metadata = {
        contentType: "audio/mpeg",
    };
    return audioRef.put(blob, metadata).then(() => {
        return audioRef.getDownloadURL();
    });
}

export const firebaseClient = {
    getCard,
    getCards,
    createCard,
    updateCard,
    deleteCard,
    uploadAudio,
};
