import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence } from 'src/app/model/sentence';

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
  }

  delete() {
    this.deleted.emit(this.sentence);
  }
}
