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
    const templateTable = "<table>\n" +
      "        <tbody id=\"ew-table\">\n" +
      "        <tr id=\"ew-template\" class=\"hidden\">\n" +
      "            <td>\n" +
      "                <div class=\"ew-text\">\n" +
      "                    He is suspicious-looking (I).\n" +
      "                </div>\n" +
      "                <div class=\"ew-answer\">\n" +
      "                    <textarea type=\"text\" class=\"ew-input\"\n" +
      "                              data-answers=\"Template sentence\" data-number=\"q1\"></textarea>\n" +
      "                </div>\n" +
      "                <div class=\"right-answer hidden\" data-number=\"q1\">\n" +
      "                    Правильный ответ: <span class=\"right-answer-text\">\"Template answer\"</span>\n" +
      "                </div>\n" +
      "            </td>\n" +
      "        </tr>\n" +
      "        </tbody>\n" +
      "    </table>";

    const preSentence = '<p class="ew-hidden-sentense">';
    const postSentence = '</p>';
    const _this = this;

    var sentencesMarkup = '<div id="ew-hidden-sentenses" class="hidden">';
    exercise.sentences.forEach(function(sentence) {
      sentencesMarkup += preSentence + sentence.text + postSentence;
    });
    sentencesMarkup += '</div>';

    const html = this.commonService.getHeader(exercise, false) +
                 sentencesMarkup +
                 templateTable +
                 this.commonService.getFooter(false);

    return this.commonService.getCombinedDocument(html, this.css, this.js);
  }
}
