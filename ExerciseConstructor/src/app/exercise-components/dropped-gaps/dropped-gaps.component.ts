import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sentence } from 'src/app/model/sentence';

@Component({
  selector: 'app-dropped-gaps',
  templateUrl: './dropped-gaps.component.html',
  styleUrls: ['./dropped-gaps.component.scss']
})
export class DroppedGapsComponent implements OnInit {

  @Input() sentence: Sentence;
  @Output() deleted = new EventEmitter<Sentence>();

  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.deleted.emit(this.sentence);
  }
}
