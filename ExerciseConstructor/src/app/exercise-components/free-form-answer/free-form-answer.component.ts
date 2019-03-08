import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence, TextType } from 'src/app/model/sentence';

@Component({
  selector: 'app-free-form-answer',
  templateUrl: './free-form-answer.component.html',
  styleUrls: ['./free-form-answer.component.scss']
})
export class FreeFormAnswerComponent implements OnInit {
  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() {  }

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
        return 'Введите текст';
      case TextType.AudioLink:
        return 'Вставьте ссылку на аудио файл';
    }
  }
}
