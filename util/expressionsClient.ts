import firebase from "../firebase/clientApp";
import { IExpression } from "../interfaces/expression";

const firestore = firebase.firestore();
const expressionsRef = firestore.collection("expressions");

async function getExpressions(): Promise<IExpression[]> {
    const snapshot = await expressionsRef.get();
    return snapshot.docs.map((doc) => doc.data() as IExpression);
}

export const expressionsClient = {
    getExpressions,
};
