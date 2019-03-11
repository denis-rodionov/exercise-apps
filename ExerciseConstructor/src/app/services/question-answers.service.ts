import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Exercise } from '../model/exercise';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswersService {
  css: string;
  js: string;

  constructor(private commonService: CommonService) {
      commonService.getTextFromFile('assets/question-answer/question-answer.css')
          .subscribe(
              data => {
                  console.log('QuestionAnswersService: received css');
                  this.css = data;
              },
              error => console.log(error)
      );
      commonService.getTextFromFile('assets/question-answer/question-answer.js')
          .subscribe(
              data => {
                  console.log('QuestionAnswersService: received js');
                  this.js = data;
              },
              error => console.log(error)
          );
  }

  public createMarkup(exercise: Exercise) {
    const _this = this;
    const separator = '#';
    let sentences = '';
    let count = 1;
    exercise.sentences.forEach(function (sentence) {
        let answers = [];
        sentence.words.split(separator).forEach(function (word) {
          answers.push(word.trim());
        });
        answers.push(sentence.rightAnswer);

        answers = answers.map(a => '<div class="ew-answer" data-answer="' + _this.isRightAnswer(a, sentence.rightAnswer)
            + '" data-question="qw-' + count + '">' + a + '</div>');

        const answersMarkup = _this.commonService.shuffle(answers).join('');

        sentences += '<tr><td><div class="ew-question" id="qw-' + count + '">' + sentence.text +
          '</div><div class="ew-answers">' + answersMarkup + '</div></td></tr>';

        count++;
    });

    const html = this.commonService.getHeader(exercise.header) + sentences + this.commonService.getFooter();

    return this.commonService.getCombinedDocument(html, this.css, this.js);
  }

  isRightAnswer(answer: string, rightAnswer: string): string {
    if (answer === rightAnswer) {
      return '1';
    } else {
      return '0';
    }
  }
}
