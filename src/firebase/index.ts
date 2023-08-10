import { initializeApp } from "firebase/app";
import {
  type CollectionReference,
  type DocumentData,
  collection,
  getFirestore,
} from "firebase/firestore/lite";

import { env } from "../env";

const firebaseConfig = {
  apiKey: env.API_KEY,
  authDomain: env.AUTH_DOMAIN,
  databaseURL: env.FB_DATABASE_URL,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
};