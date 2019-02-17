import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class DroppedGapsService {

  constructor(private commonService: CommonService) {
  }

  public createMarkup(exercise: Exercise): string {
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

      return this.commonService.getHeader(exercise.header) + sentencesMarkup + this.commonService.getFooter();
  }
}
