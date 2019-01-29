import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/execise.service';
import { Exercise } from '../model/exercise';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercises$: Observable<Exercise[]>;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    console.log('init ExerciseListComponent');
    this.exercises$ = this.exerciseService.getExercises();
  }

}
