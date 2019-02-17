import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { CommonService } from './common.service';
import { getFactoryOf } from '@angular/core/src/render3';

@Injectable()
export class FillGapsService {

    constructor(private commonService: CommonService) {
    }

    public createMarkup(exercise: Exercise): string {
        // tslint:disable-next-line:max-line-length
        const preSentence = '<tr class="ew-tr"><td><div class="ew-inner-table"><div class="ew-row"><div class="ew-cell">';
        const betweenColumnsMarkup = '</div><div class="ew-cell" class="ew-column2">';
        const beforeWordsMarkup = '</div></div></div><div class="ew-words">';
        const postSentence = '</div></td></tr>';
        const preGap = '<span class="ew-gap" data-answer="';
        const postGap = '"></span>';
        const separator = '#';
        const _this = this;

        let sentenceMarkup = '';
        let wordsCounter = 0;
        exercise.sentences.forEach(function (sentence) {
            // find words
            let words = [];
            sentence.words.split(separator).forEach(function (word) {
                if (word.trim() !== '') {
                    words.push(word.trim());
                }
            });

            // column1 markup. It is the main text if no column 2.
            let column1 = sentence.text;
            sentence.text.split(separator).forEach(function (str, index) {
                if (index % 2 === 1) {
                    words.push(str);
                    column1 = column1.replace(separator + str + separator, preGap + str + postGap);
                }
            });

            // column 2 if exists
            let column2 = sentence.extraText;
            if (sentence.extraText) {
                console.log('sentense.extraTextExists');
                sentence.extraText.split(separator).forEach(function (str, index) {
                    if (index % 2 === 1) {
                        words.push(str);
                        column2 = column2.replace(separator + str + separator, preGap + str + postGap);
                    }
                });
            }

            // words markup
            words = _this.commonService.shuffle(words);
            const wordsMarkup = words.map(function (word) {
                return '<div id=\"' + wordsCounter++ + '\" class=\"ew-word\">' + word + '</div>';
            }).join('');

            // sentence markup
            console.log('column2: ' + column2);
            if (column2 && column2 !== '') {
                sentenceMarkup += preSentence + column1 + betweenColumnsMarkup + column2 + beforeWordsMarkup + wordsMarkup + postSentence;
            } else {
                sentenceMarkup += preSentence + column1 + beforeWordsMarkup + wordsMarkup + postSentence;
            }
        });

        return this.commonService.getHeader(exercise.header) + sentenceMarkup + this.commonService.getFooter();
    }
}
