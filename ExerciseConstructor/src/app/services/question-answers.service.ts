import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswersService {

  constructor(private commonService: CommonService) { }

  public createMarkup(exercise: Exercise): string {
    const preExercise = '<div class="exercise-question-answers"><p>';
    const postHeader = '</p><table>';
    // tslint:disable-next-line:max-line-length
    const postExercise = '</table><button id="checkResultsButton" class="ew-button">Проверить</button><br/><p id="resultScoreP" class="hidden">Результат: <span id="resultScore"></span></p></div>';

    const _this = this;

    let sentences = '';
    let count = 1;
    exercise.sentences.forEach(function (sentence) {
        let answers = [];
        sentence.words.split(',').forEach(function (word) {
          answers.push(word.trim());
        });
        answers.push(sentence.rightAnswer);

        answers = answers.map(a => '<div class="ew-answer" data-answer="' + _this.isRightAnswer(a, sentence.rightAnswer)
            + '" data-question="qw-' + count + '">' + a + '</div>');

        const answersMarkup = _this.commonService.shuffle(answers).join('');

        sentences += '<tr><td><div class="ew-question" id="qw-' + count + '">' + sentence.text +
          '</div></td><td><div class="ew-answers">' + answersMarkup + '</div></td></tr>';

        count++;
    });

    return preExercise + exercise.header + postHeader + sentences + postExercise;
  }

  isRightAnswer(answer: string, rightAnswer: string): string {
    if (answer === rightAnswer) {
      return '1';
    } else {
      return '0';
    }
  }
}
