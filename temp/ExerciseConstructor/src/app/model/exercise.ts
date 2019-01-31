import { Sentence } from './sentence';

export class Exercise {
    constructor(
        public id: string,
        public name: string,
        public tag: string,
        public sentences: Sentence[]) {
    }
}
