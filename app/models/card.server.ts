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

import { createCollection } from "~/firebase";
import { getFileBlob } from "~/utils/file";
import { type cardSchema } from "~/schemas/card.schema";

const cardsCollection = createCollection<z.infer<typeof cardSchema>>("cards");

export async function getCards() {
  const snapshot = await getDocs(cardsCollection);
  return snapshot.docs.map((doc) => doc.data());
}

export async function getCard(id: string) {
  const snapshot = await getDocs(query(cardsCollection, where("id", "==", id)));
  return snapshot.docs[0].data();
}

export async function createCard(data: z.infer<typeof cardSchema>) {
  const docRef = doc(cardsCollection);
  const playbackAudioUrl = await uploadAudio(data.playbackAudioUrl, docRef.id);
  await setDoc(docRef, {
    ...data,
    id: docRef.id,
    playbackAudioUrl,
    createdDate: Timestamp.now(),
  });
}

export async function updateCard(data: z.infer<typeof cardSchema>) {
  const docRef = doc(cardsCollection, data.id);
  const playbackAudioUrl = await uploadAudio(data.playbackAudioUrl, docRef.id);
  await updateDoc(docRef, {
    ...data,
    playbackAudioUrl,
  });
}

export async function deleteCard(id: string) {
  await deleteDoc(doc(cardsCollection, id));
}

export async function uploadAudio(url: string, id: string) {
  const file = await getFileBlob(url);
  const audioRef = ref(getStorage(), `audio/cards/recording_${id}.mp3`);
  const metadata = {
    contentType: "audio/mpeg",
  };
  return uploadBytes(audioRef, file, metadata).then(() => {
    return getDownloadURL(audioRef);
  });
}
