import { Component, OnInit, Input, Output } from '@angular/core';
import { Sentence } from 'src/app/model/sentence';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-sentence',
  templateUrl: './choose-sentence.component.html',
  styleUrls: ['./choose-sentence.component.scss']
})
export class ChooseSentenceComponent implements OnInit {

  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.sentence);
  }
}
