import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/execise.service';
import { Exercise, ExerciseType } from '../model/exercise';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercises$: Observable<Exercise[]>;

  constructor(private exerciseService: ExerciseService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('ExerciseListComponent: exercises$: ' + this.exercises$);

    this.route.params.subscribe( params => {
      console.log('ExerciseListComponent: params' + JSON.stringify(params));
      this.exercises$ = this.exerciseService.getExercises();

      if (params['filter']) {
        const filter: string = params['filter'];
        if (filter === 'all') {
          this.exerciseService.resetFilter();
        } else {
          const filterType: ExerciseType = ExerciseType[filter];
          this.exerciseService.filterExercises(filterType);
        }
        this.exercises$ = this.exerciseService.getExercises();
      }});
  }

  deleteExercise(exercise: Exercise) {
    const response = confirm('Вы уверены что хотите удалить упражнение ' + exercise.name);
    if (response) {
      this.exerciseService.deleteExercise(exercise);
    }
    return;
  }

  editExercise(exercise: Exercise) {
  }

}