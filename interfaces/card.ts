export interface ICard {
    id: string;
    name: string;
    summary: string;
    body: string;
    translation: string;
    playbackAudioUrl: string;
    bannerImageUrl: string;
    createdDate?: number;
}
