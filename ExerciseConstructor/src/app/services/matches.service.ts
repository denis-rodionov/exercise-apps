import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {
  css: string;
  js: string;

  constructor(private commonService: CommonService) {
      commonService.getTextFromFile('assets/matches/matches.css')
          .subscribe(
              data => {
                  console.log('MatchesService: received css');
                  this.css = data;
              },
              error => console.log(error)
      );
      commonService.getTextFromFile('assets/matches/matches.js')
          .subscribe(
              data => {
                  console.log('MatchesService: received js');
                  this.js = data;
              },
              error => console.log(error)
          );
  }

  public createMarkup(exercise: Exercise) {
    const resultTable = '<table id="ew-result-table" class="ew-table"></table>';

    const beforeTable = '<div id="ew-options-table" class="ew-inner-table"><div class="ew-row"><div id="ew-left-column" class="ew-cell">';
    const betweenColumns = '</div><div id="ew-right-column" class="ew-cell">';
    const afterTable = '</div></div></div>';

    const beforeSentence = '<div class="ew-sentence ';
    const afterClass = '" data-match="';
    const middleSentence = '">';
    const afterSentence = '</div>';

    let leftColumn = [];
    let rightColunn = [];
    let matchNumber = 0;
    exercise.sentences.forEach(sentence => {
      leftColumn.push(beforeSentence + 'ew-left-answer' + afterClass + matchNumber + middleSentence + sentence.text + afterSentence);
      rightColunn.push(beforeSentence + 'ew-right-answer' + afterClass + matchNumber + middleSentence + sentence.extraText + afterSentence);
      matchNumber++;
    });
    leftColumn = this.commonService.shuffle(leftColumn);
    rightColunn = this.commonService.shuffle(rightColunn);

    const html = this.commonService.getHeader(exercise.header, false) + resultTable +
        beforeTable + leftColumn.join('') + betweenColumns + rightColunn.join('') + afterTable + this.commonService.getFooter(false);

    return this.commonService.getCombinedDocument(html, this.css, this.js);
  }
}
