import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence } from 'src/app/model/sentence';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.scss']
})
export class MatchesComponent implements OnInit {

  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.sentence);
  }
}
