import { IExpression } from "./expression";

export interface ICard {
    id: string;
    title: string;
    phrase: string;
    translation: string;
    playbackAudioUrl: string;
    createdDate?: firebase.firestore.Timestamp;
    expressions?: IExpression[];
}
