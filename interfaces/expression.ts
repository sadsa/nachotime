export enum ExpressionType {
    new = "new",
    known = "known",
}

export interface IExpression {
    value: string;
    type?: keyof typeof ExpressionType;
    translation?: string;
    definition?: string;
}
