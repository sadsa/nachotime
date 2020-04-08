export interface ICard {
    id: string;
    title: string;
    phrase: string;
    phraseTranslation: string;
    highlightedText?: string[];
    playbackAudioUrl?: string;
    bannerImageUrl?: string;
    createdDate: number;
    lastEditedDate: number;
    lastReviewDate: number;
}
