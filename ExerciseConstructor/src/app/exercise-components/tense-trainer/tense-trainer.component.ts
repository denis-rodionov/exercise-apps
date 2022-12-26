import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence, TextType } from 'src/app/model/sentence';

@Component({
  selector: 'app-tense-trainer',
  templateUrl: './tense-trainer.component.html',
  styleUrls: ['./tense-trainer.component.scss']
})
export class TenseTrainerComponent implements OnInit {

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
        return 'Введите предложение в следующей форме: подлежащее + (глагол в инфинитиве) + ... + (слово-индикатор)';
    }
  }
}
