import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  css: string;
  js: string;

  constructor(private commonService: CommonService) {
      commonService.getTextFromFile('assets/translation/translation.css')
          .subscribe(
              data => {
                  console.log('TranslateService: received css');
                  this.css = data;
              },
              error => console.log(error)
      );
      commonService.getTextFromFile('assets/translation/translation.js')
          .subscribe(
              data => {
                  console.log('TranslateService: received js');
                  this.js = data;
              },
              error => console.log(error)
          );
  }

  public createMarkup(exercise: Exercise) {
    const preSentence = '<tr class="ew-tr invisible"><td><div class="ew-text">';
    // tslint:disable-next-line:max-line-length
    const middleSentence = '</div><a class="ew-button ew-check-button invisible" href="#" draggable="false">Проверить</a><div class="ew-right-answer invisible">';
    // tslint:disable-next-line:max-line-length
    const postSentence = '</div><a class="ew-button ew-right-button invisible" href="#" draggable="false">Правильно</a><a class="ew-button ew-wrong-button invisible" href="#" draggable="false">Повторить</a></td></tr>';
    const _this = this;

    let sentencesMarkup = '';
    exercise.sentences.forEach(function(sentence) {
      sentencesMarkup += preSentence + sentence.text + middleSentence +
        _this.commonService.getQuestionContent(sentence.rightAnswer, sentence.type) + postSentence;
    });

    const html = this.commonService.getHeader(exercise.header) + sentencesMarkup + this.commonService.getFooter();

    return this.commonService.getCombinedDocument(html, this.css, this.js);
  }
}
