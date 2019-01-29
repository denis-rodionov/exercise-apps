import { Sentence } from './sentence';

export class Exercise {
    constructor(
        public name: string,
        public tag: string,
        public sentences: Sentence[]) {
    }
}
