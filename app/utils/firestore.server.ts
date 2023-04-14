import admin from "firebase-admin";
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
// import { initializeApp } from "firebase/app";

import { env } from "~/env";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: env.API_KEY,
//   authDomain: env.AUTH_DOMAIN,
//   databaseURL: env.FB_DATABASE_URL,
//   projectId: env.PROJECT_ID,
//   storageBucket: env.STORAGE_BUCKET,
//   messagingSenderId: env.MESSAGING_SENDER_ID,
//   appId: env.APP_ID,
// };

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: env.DATABASE_URL,
  });
}

const firestore = admin.firestore();

export const getCollection = <T = admin.firestore.DocumentData>(
  collectionName: string
) => {
  return firestore.collection(
    collectionName
  ) as admin.firestore.CollectionReference<T>;
};

// initializeApp(firebaseConfig);
