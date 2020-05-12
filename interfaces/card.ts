import { IExpression } from "./expression";

export enum WorkflowStatus {
    notApproved = 0,
    approved = 1,
    rejected = -1,
}

export interface ICard {
    id: string;
    title: string;
    phrase: string;
    translation: string;
    playbackAudioUrl: string;
    workflowStatus: WorkflowStatus;
    expressions: IExpression[];
    createdDate?: firebase.firestore.Timestamp;
}
