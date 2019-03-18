import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence, TextType } from 'src/app/model/sentence';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {

  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() { }

  ngOnInit() {
    if (!this.sentence.type) {
      this.sentence.type = TextType.Text;
    }
  }

  delete() {
    this.deleted.emit(this.sentence);
  }

  getPlaceholder(textType: TextType) {
    switch (textType) {
      case TextType.Text:
        return 'Введите предложение или вопрос, на который ученику будут предложены варианты ответа';
      case TextType.AudioLink:
        return 'Вставьте ссылку на аудио файл в котором звучит предложение или вопрос, на которые предлагаются варианты ответа';
    }
  }
}
