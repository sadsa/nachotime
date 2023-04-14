import {
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore/lite";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { type z } from "zod";

import { getFileBlob } from "~/utils/file";
import { type cardSchema } from "~/schemas/card.schema";
import { getCollection } from "~/utils/firestore.server";

const cardsCollection = getCollection<z.infer<typeof cardSchema>>("cards");

export async function getCards() {
  const snapshot = await cardsCollection.get();
  return snapshot.docs.map((doc) => doc.data());
}

export async function getCard(id: string) {
  const snapshot = await cardsCollection.where("id", "==", id).get();
  return snapshot.docs[0].data();
}

// export async function createCard(data: z.infer<typeof cardSchema>) {
//   const docRef = cardsRef.doc();
//   const playbackAudioUrl = await uploadAudio(data.playbackAudioUrl, docRef.id);
//   return await docRef.set({
//     ...data,
//     id: docRef.id,
//     playbackAudioUrl,
//     createdDate: firebase.firestore.Timestamp.now(),
//   });
// }

// export async function updateCard(data: z.infer<typeof cardSchema>) {
//   const docRef = doc(cardsCollection, data.id);
//   const playbackAudioUrl = await uploadAudio(data.playbackAudioUrl, docRef.id);
//   await updateDoc(docRef, {
//     ...data,
//     playbackAudioUrl,
//   });
// }

export async function deleteCard(id: string) {
  return cardsCollection.doc(id).delete();
}

// export async function uploadAudio(url: string, id: string) {
//   const file = await getFileBlob(url);
//   const audioRef = ref(getStorage(), `audio/cards/recording_${id}.mp3`);
//   const metadata = {
//     contentType: "audio/mpeg",
//   };
//   return uploadBytes(audioRef, file, metadata).then(() => {
//     return getDownloadURL(audioRef);
//   });
// }
