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

        let result = '';
        let wordsCounter = 0;
        exercise.sentences.forEach(function (sentence) {
            // find words
            let words = [];
            sentence.words.split(',').forEach(function (word) {
                words.push(word.trim());
            });

            let processedText = sentence.text;
            sentence.text.split(separator).forEach(function (str, index) {
                if (index % 2 === 1) {
                    words.push(str);
                    processedText = processedText.replace(separator + str + separator, preWord + str + postWord);
                }
            });
            words = _this.commonService.shuffle(words);

            // markup
            const wordsMarkup = words.map(function (word) {
                return '<div id=\"' + wordsCounter++ + '\" class=\"ew-word\">' + word + '</div>';
            }).join('');

            result += preText + processedText + middleMarkup + wordsMarkup + postText;
        });

        return this.commonService.getHeader(exercise.header) + result + this.commonService.getFooter();
    }
}
