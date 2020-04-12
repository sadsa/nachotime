export interface IExpression {
    value: string;
    type: "word" | "expression";
    translation: string;
    definition?: string;
}
