import { Component, OnInit, Input, Output } from '@angular/core';
import { Sentence } from 'src/app/model/sentence';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fill-gaps-sentence',
  templateUrl: './fill-gaps-sentence.component.html',
  styleUrls: ['./fill-gaps-sentence.component.scss']
})
export class FillGapsSentenceComponent implements OnInit {

  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.sentence);
  }
}
