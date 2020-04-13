export interface IPhraseSegment {
    value: string;
    meta?: {
        translation: string;
        type: "word" | "expression";
    };
}
