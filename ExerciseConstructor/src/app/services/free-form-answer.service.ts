import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';
import { TextType } from '../model/sentence';

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

        let text;
        switch (sentence.type) {
          case TextType.Text:
            text = sentence.text;
            break;
          case TextType.AudioLink:
            text = '<audio controls><source src="' + sentence.text + '">Ваш браузер не поддерживает аудио</audio>';
            break;
        }

        sentencesMarkup += '<tr><td><div class="ew-text">' + text +
          '</div><div class="ew-answer"><textarea type="ew-text" class="ew-input" data-answers="' + rightAnswers.join('|') +
          '"data-number="q' + count +
          '"></textarea></div><div class="right-answer hidden" data-number="q' + count +
          '">Правильный ответ: <span class="right-answer-text">"' + rightAnswers[0] +
          '"</span></div></td></tr>';

        count++;
    });

    return this.commonService.getHeader(exercise.header) + sentencesMarkup + this.commonService.getFooter();
  }
}
