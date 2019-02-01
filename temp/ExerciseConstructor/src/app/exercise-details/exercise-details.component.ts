import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/execise.service';
import { Exercise } from '../model/exercise';
import { Sentence } from '../model/sentence';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-details',
  templateUrl: './exercise-details.component.html',
  styleUrls: ['./exercise-details.component.scss']
})
export class ExerciseDetailsComponent implements OnInit {
  exercise: Exercise;
  isNew: boolean;
  inProgress: boolean;
  changed: boolean;

  constructor(private exerciseService: ExerciseService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.exercise = new Exercise(null, '', '', []);
    this.route.params.subscribe( params => {
      console.log('params' + params);
      if (params['id']) {
        const exerciseId = params['id'];
        this.isNew = false;
        this.exerciseService.getExercise(exerciseId).subscribe(ex => {
          console.log('exercise got by id (' + exerciseId + '):' + ex);
          this.exercise = ex;
        });
        this.inProgress = false;
      } else {
        this.isNew = true;
      }
    });
  }

  saveExercise() {
    console.log('saving exercise: ' + JSON.stringify(this.exercise));
    this.inProgress = true;

    let promise: Promise<any>;
    if (this.isNew) {
      promise = this.exerciseService.createExercise(this.exercise);
    } else {
      promise = this.exerciseService.updateExercise(this.exercise);
    }

    promise.then(
        res => {
            this.inProgress = false;
            this.changed = false;
        }
    );
  }
}
