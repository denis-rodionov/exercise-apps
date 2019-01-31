import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/execise.service';
import { Exercise } from '../model/exercise';
import { Sentence } from '../model/sentence';
import { Router } from '@angular/router';

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

  constructor(private exerciseService: ExerciseService, private router: Router) {
      this.exercise = new Exercise(null, '', '', []);
      this.isNew = true;
  }

  ngOnInit() {
  }

  saveExercise() {
    console.log('saving exercise: ' + JSON.stringify(this.exercise));
    this.inProgress = true;
    this.exerciseService.createExercise(this.exercise)
    .then(
        res => {
            this.inProgress = false;
            this.changed = false;
        }
    );
  }
}
