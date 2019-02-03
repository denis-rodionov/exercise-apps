import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence } from 'src/app/model/sentence';

@Component({
  selector: 'app-free-form-answer',
  templateUrl: './free-form-answer.component.html',
  styleUrls: ['./free-form-answer.component.scss']
})
export class FreeFormAnswerComponent implements OnInit {
  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.sentence);
  }
}
