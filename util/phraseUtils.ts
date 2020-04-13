import { IPhraseSegment } from "../interfaces/phraseSegment";
import { IExpression } from "../interfaces/Expression";

export function convertPhraseToSegments(
    phrase: string,
    expressions: IExpression[]
): IPhraseSegment[] {
    const wordArray = phrase.split(/[ ,]+/);
    let segments: IPhraseSegment[] = [];
    for (let index = 0; index < wordArray.length; index++) {
        const value = wordArray[index];
        segments.push({ value });
    }
}
