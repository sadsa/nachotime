export interface ICard {
    name: string;
    summary: string;
    body: string;
    translation: string;
    createdDate: number;
    lastEditedDate: number;
    lastReviewDate: number;
    highlightedText: string[];
    playbackAudioUrl: string;
    bannerImageUrl: string;
}
