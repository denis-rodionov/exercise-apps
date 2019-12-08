export enum TextType {
    Text = 'text',
    AudioLink = 'audio',
    Separator = 'separator'
}

export class Sentence {
    constructor(
        public number: number,
        public text: string,
        public extraText: string,
        public words: string,
        public wrongText: string,
        public rightAnswer: string,
        public type: TextType,
        public extraAudioUrl: string) {
    }
}
