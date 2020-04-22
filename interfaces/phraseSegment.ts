import { IExpression } from "./expression";

export interface IPhraseSegment {
    value: string;
    meta?: IExpression;
}
