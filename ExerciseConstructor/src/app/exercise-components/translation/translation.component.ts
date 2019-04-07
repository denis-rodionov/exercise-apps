import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TextType, Sentence } from 'src/app/model/sentence';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnInit {
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
        return 'Введите перевод фразы на аглийском';
      case TextType.AudioLink:
        return 'Вставьте ссылку на аудио файл с переводом фразы';
    }
  }
}
