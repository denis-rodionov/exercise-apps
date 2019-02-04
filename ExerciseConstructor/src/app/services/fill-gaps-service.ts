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
        const preText = '<tr><td><div class=\"ew-text\">';
        const middleMarkup = '</div><div class=\"ew-words\">';
        const postText = '</div></td></tr>';
        const preWord = '<span class=\"ew-gap\" data-answer=\"';
        const postWord = '\"></span>';
        const separator = '#';
        const _this = this;

        let sentenceMarkup = '';
        let wordsCounter = 0;
        exercise.sentences.forEach(function (sentence) {
            // find words
            let words = [];
            sentence.words.split(',').forEach(function (word) {
                words.push(word.trim());
            });

            // column1 markup. It is the main text if no column 2.
            let column1 = sentence.text;
            sentence.text.split(separator).forEach(function (str, index) {
                if (index % 2 === 1) {
                    words.push(str);
                    column1 = column1.replace(separator + str + separator, preWord + str + postWord);
                }
            });

            // column 2 if exists
            let column2 = '';
            if (sentence.extraText) {
                sentence.extraText.split(separator).forEach(function (str, index) {
                    if (index % 2 === 1) {
                        words.push(str);
                        column2 = column2.replace(separator + str + separator, preWord + str + postWord);
                    }
                });
            }

            // words markup
            words = _this.commonService.shuffle(words);
            const wordsMarkup = words.map(function (word) {
                return '<div id=\"' + wordsCounter++ + '\" class=\"ew-word\">' + word + '</div>';
            }).join('');

            // sentence markup
            sentenceMarkup += preText + column1 + middleMarkup + wordsMarkup + postText;
        });

        return this.commonService.getHeader(exercise.header) + sentenceMarkup + this.commonService.getFooter();
    }
}
