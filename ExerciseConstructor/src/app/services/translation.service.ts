import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';
import { Type } from '@angular/compiler';
import { TextType } from '../model/sentence';
import { ChooseSentenceComponent } from '../exercise-components/choose-sentence-sentence/choose-sentence.component';

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
    // tslint:disable-next-line:max-line-length
    const postSeparator = '</div><a class="ew-button ew-check-button ew-continue-button invisible" href="#" draggable="false">Продолжить</a><br></td></tr>';
    const _this = this;

    var sentencesMarkup = '';
    exercise.sentences.forEach(function(sentence) {

      if (sentence.type === TextType.Separator) {
        sentencesMarkup += preSentence + sentence.text + postSeparator;
      } else {
        sentencesMarkup += preSentence + _this.commonService.getQuestionContent(sentence.text, sentence.type) + middleSentence;
        sentencesMarkup += sentence.rightAnswer;
        
        if (sentence.extraAudioUrl) {
          sentencesMarkup += '<br/><br/>' + _this.commonService.getQuestionContent(sentence.extraAudioUrl, TextType.AudioLink);
        }

        if (sentence.extraImageUrl) {
          sentencesMarkup += '<br/><br/><img src="' + sentence.extraImageUrl + '"/>';
        }

        sentencesMarkup += postSentence;
      }
    });

    const html = this.commonService.getHeader(exercise) + sentencesMarkup + this.commonService.getFooter();

    return this.commonService.getCombinedDocument(html, this.css, this.js);
  }
}
