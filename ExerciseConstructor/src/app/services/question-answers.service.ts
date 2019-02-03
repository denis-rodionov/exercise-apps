import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswersService {

  constructor(private commonService: CommonService) { }

  public createMarkup(exercise: Exercise): string {
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
          '</div><div class="ew-answers">' + answersMarkup + '</div></td></tr>';

        count++;
    });

    return this.commonService.getHeader(exercise.header) + sentences + this.commonService.getFooter();
  }

  isRightAnswer(answer: string, rightAnswer: string): string {
    if (answer === rightAnswer) {
      return '1';
    } else {
      return '0';
    }
  }
}
