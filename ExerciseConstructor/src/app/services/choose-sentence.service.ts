import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { CommonService } from './common.service';

@Injectable()
export class ChooseSentenceService {

    constructor(private commonService: CommonService) {
    }

    public createMarkup(exercise: Exercise): string {
        const preExercise = '<div class="exercise"><p>';
        const postHeader = '</p><table>';
        // tslint:disable-next-line:max-line-length
        const postExercise = '</table><button id="checkResultsButton">Проверить</button><br/><p id="resultScoreP" class="hidden">Результат: <span id="resultScore"></span></p></div>';

        const preCorrectOption = '<td><div class="sentence" data-answer="1">';
        const preWrongOption = '<td><div class="sentence" data-answer="0">';
        const postOption = '</div></td>';

        const _this = this;

        let sentences = '';

        exercise.sentences.forEach(function (sentence) {
            const options: string[] = [
                preCorrectOption + sentence.text + postOption,
                preWrongOption + sentence.wrongText + postOption
            ];

            const sentenceMarkup = _this.commonService.shuffle(options).join('');
            sentences += '<tr>' + sentenceMarkup + '</tr>';
        });

        return preExercise + exercise.header + postHeader + sentences + postExercise;
    }
}
