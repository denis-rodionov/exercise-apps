import { Injectable } from '@angular/core';
import { Exercise } from '../model/exercise';

@Injectable()
export class FillGapsService {

    constructor() {
    }

    public createMarkup(exercise: Exercise): string {
        const preExercise = '<div class=\"exercise\"><table>';
        // tslint:disable-next-line:max-line-length
        const postExercise = '</table><div class="controls"><a class="button" id="checkResult" href="#" draggable="fals">Проверить</a></div><div id="result"></div></div>';
        const preText = '<tr><td><div class=\"text\"><p>';
        const middleMarkup = '</p></div><div class=\"words\">';
        const postText = '</div></td></tr>';
        const preWord = '<span class=\"gap\" data-answer=\"';
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
            words = _this.shuffle(words);

            // markup
            const wordsMarkup = words.map(function (word) {
                return '<div id=\"' + wordsCounter++ + '\" class=\"word\">' + word + '</div>';
            }).join('');

            result += preText + processedText + middleMarkup + wordsMarkup + postText;
        });

        return preExercise + result + postExercise;
    }

    shuffle(arr) {
        let newArray = new Array<string>();

        while (arr.length) {
            const i = Math.floor(Math.random() * arr.length);
            newArray = newArray.concat(arr.splice(i, 1));
        }

        return newArray;
    }
}
