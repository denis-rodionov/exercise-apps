import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';
import { TextType } from '../model/sentence';

@Injectable({
  providedIn: 'root'
})
export class FreeFormAnswerService {
  css: string;
  js: string;

  constructor(private commonService: CommonService) {
      commonService.getTextFromFile('assets/free-form/free-form.css')
          .subscribe(
              data => {
                  console.log('FreeFormAnswerService: received css');
                  this.css = data;
              },
              error => console.log(error)
      );
      commonService.getTextFromFile('assets/free-form/free-form.js')
          .subscribe(
              data => {
                  console.log('FreeFormAnswerService: received js');
                  this.js = data;
              },
              error => console.log(error)
          );
  }

  public createMarkup(exercise: Exercise) {
    const _this = this;

    let sentencesMarkup = '';
    let count = 1;
    exercise.sentences.forEach(function (sentence) {
        const rightAnswers = sentence.rightAnswer.split('#').map(w => w.trim());

        sentencesMarkup += '<tr><td><div class="ew-text">' + _this.commonService.getQuestionContent(sentence.text, sentence.type) +
          '</div><div class="ew-answer"><textarea type="ew-text" class="ew-input" data-answers="' + rightAnswers.join('|') +
          '"data-number="q' + count +
          '"></textarea></div><div class="right-answer hidden" data-number="q' + count +
          '">Правильный ответ: <span class="right-answer-text">"' + rightAnswers[0] +
          '"</span></div></td></tr>';

        count++;
    });

    const html = this.commonService.getHeader(exercise.header) + sentencesMarkup + this.commonService.getFooter();

    return this.commonService.getCombinedDocument(html, this.css, this.js);
  }
}
