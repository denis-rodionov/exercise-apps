import { Sentence } from './sentence';

export enum ExerciseType {
    FillGaps = 1,
    ChooseSentence = 2,
    QuestionAnswers = 3,
    FreeFormAnswer = 4,
    DroppedGaps = 5,
    Matches = 6,
    Translation = 7
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
        public header: string,
        public sentences: Sentence[],
        public timestamp: number,
        public shuffle: boolean) {
    }
}

export function parse(mode: string): ExerciseType {
    return ExerciseType[mode];
}