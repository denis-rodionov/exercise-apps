import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DroppedGapsService {
  css: string;
  js: string;

  constructor(private commonService: CommonService) {
    commonService.getTextFromFile('assets/dropped-gaps/dropped-gaps.css')
      .subscribe(
            data => {
                console.log('DroppedGapsService: received css');
                this.css = data;
            },
            error => console.log(error)
        );
    commonService.getTextFromFile('assets/dropped-gaps/dropped-gaps.js')
      .subscribe(
            data => {
                console.log('DroppedGapsService: received js');
                this.js = data;
            },
            error => console.log(error)
        );
  }

  public createMarkup(exercise: Exercise) {
      const separator = '#';
      const _this = this;

      let sentencesMarkup = '';
      exercise.sentences.forEach(sentence => {
        let processedSentence = sentence.text;
        sentence.text.split(separator).forEach(function (str, index) {
            if (index % 2 === 1) {
              const words = str.split(',').map(s => s.trim()).filter(s => s !== '');
              const wordsMarkup = _this.commonService.shuffle(words.map(s => '<option value="' + s + '">' + s + '</option>')).join('');

              const preGap = '<select class="ew-gap-option" data-correct="' + words[0] + '">';

              processedSentence = processedSentence.replace(separator + str + separator, preGap + wordsMarkup + '</select>');
            }
        });

        sentencesMarkup += '<tr><td class="ew-td"><div class="ew-text">' + processedSentence + '</div></td></tr>';
      });

      const html = this.commonService.getHeader(exercise) + sentencesMarkup + this.commonService.getFooter();

      return this.commonService.getCombinedDocument(html, this.css, this.js);
  }
}
