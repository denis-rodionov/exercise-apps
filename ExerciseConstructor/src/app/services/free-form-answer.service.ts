import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class FreeFormAnswerService {

  constructor(private commonService: CommonService) { }

  public createMarkup(exercise: Exercise): string {
    const _this = this;

    let sentencesMarkup = '';
    let count = 1;
    exercise.sentences.forEach(function (sentence) {
        const rightAnswers = sentence.rightAnswer.split('#').map(w => w.trim());

        sentencesMarkup += '<tr><td><div class="ew-text">' + sentence.text +
          '</div></td><td><div class="ew-answer"><textarea type="ew-text" class="ew-input" data-answers="' + rightAnswers.join('|') +
          '"data-number="q' + count +
          '"></textarea></div></td><td><div class="right-answer hidden" data-number="q' + count +
          '">Правильный ответ: <span class="right-answer-text">"' + rightAnswers[0] +
          '"</span></div></td></tr>';

        count++;
    });

    return this.commonService.getHeader(exercise.header) + sentencesMarkup + this.commonService.getFooter();
  }
}
