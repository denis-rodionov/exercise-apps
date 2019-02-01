import { Sentence } from './sentence';

export enum ExerciseType {
    FillGaps = 1
}

export interface ExerciseTypeView {
    value: ExerciseType;
    viewValue: string;
}

export class Exercise {
    constructor(
        public id: string,
        public name: string,
        public type: ExerciseType,
        public tag: string,
        public sentences: Sentence[]) {
    }
}
