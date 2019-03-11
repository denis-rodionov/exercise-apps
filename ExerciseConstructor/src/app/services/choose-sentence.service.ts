import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';
import { CommonService } from './common.service';

@Injectable()
export class ChooseSentenceService {
    css: string;
    js: string;

    constructor(private commonService: CommonService) {
        commonService.getTextFromFile('assets/choose-option/choose-option.css')
            .subscribe(
                data => {
                    console.log('ChooseSentenceService: received css');
                    this.css = data;
                },
                error => console.log(error)
        );
        commonService.getTextFromFile('assets/choose-option/choose-option.js')
            .subscribe(
                data => {
                    console.log('ChooseSentenceService: received js');
                    this.js = data;
                },
                error => console.log(error)
            );
    }

    public createMarkup(exercise: Exercise) {
        const preCorrectOption = '<td><div class="ew-sentence" data-answer="1">';
        const preWrongOption = '<td><div class="ew-sentence" data-answer="0">';
        const postOption = '</div></td>';

        const _this = this;

        let sentences = '';

        exercise.sentences.forEach(function (sentence) {
            const options: string[] = [
                preCorrectOption + sentence.text + postOption,
                preWrongOption + sentence.wrongText + postOption
            ];

            const sentenceMarkup = _this.commonService.shuffle(options).join('');
            sentences += '<tr>' + sentenceMarkup + '</tr>';
        });

        const html = this.commonService.getHeader(exercise.header) + sentences + this.commonService.getFooter();

        return this.commonService.getCombinedDocument(html, this.css, this.js);
    }
}
