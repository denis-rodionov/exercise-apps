import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/execise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercises: Observable<any[]>;

  constructor(exerciseService: ExerciseService) {
    this.exercises = exerciseService.getExercises();
  }

  ngOnInit() {
  }

}
