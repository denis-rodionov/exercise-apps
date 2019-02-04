import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseService } from '../services/execise.service';
import { Exercise, ExerciseType, ExerciseTypeView } from '../model/exercise';
import { Sentence } from '../model/sentence';
import { Router, ActivatedRoute } from '@angular/router';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';
import { FillGapsService } from '../services/fill-gaps-service';
import { MatSnackBar } from '@angular/material';
import { ChooseSentenceService } from '../services/choose-sentence.service';
import { QuestionAnswersService } from '../services/question-answers.service';
import { FreeFormAnswerService } from '../services/free-form-answer.service';
import { DroppedGapsService } from '../services/dropped-gaps.service';


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

  possibleTypes: ExerciseTypeView[];

  constructor(private exerciseService: ExerciseService, private router: Router, private route: ActivatedRoute,
      private fillGapsService: FillGapsService, private snackBar: MatSnackBar, private chooseSentenceService: ChooseSentenceService,
      private questionAnswersService: QuestionAnswersService, private freeFormAnswerService: FreeFormAnswerService,
      private droppedGapsService: DroppedGapsService) {
    this.possibleTypes = this.exerciseService.getTypes();
  }

  ngOnInit() {
    this.inProgress = true;
    this.exercise = new Exercise(null, '', ExerciseType.FillGaps, '', '', []);
    this.route.params.subscribe( params => {
      console.log('params' + params);
      if (params['id']) {
        const exerciseId = params['id'];
        this.isNew = false;
        this.exerciseService.getExercise(exerciseId).subscribe(ex => {
          console.log('exercise got by id (' + exerciseId + '):' + ex);
          this.exercise = ex;
          this.inProgress = false;
        });
      } else {
        this.isNew = true;
        this.inProgress = false;
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

  addSentence() {
    this.exercise.sentences.push(new Sentence(this.exercise.sentences.length + 1, '', '', '', ''));
  }

  deleteSentence(sentence: Sentence) {
    const temp: Sentence[] = [];

    let newNumber = 1;
    this.exercise.sentences.forEach(s => {
      if (s.number !== sentence.number) {
        s.number = newNumber++;
        temp.push(s);
      }
    });

    this.exercise.sentences = temp;
  }

  createMarkup() {
    switch (this.exercise.type) {
      case ExerciseType.FillGaps: {
        this.copyToClipboard(this.fillGapsService.createMarkup(this.exercise));
        break;
      }
      case ExerciseType.ChooseSentence: {
        this.copyToClipboard(this.chooseSentenceService.createMarkup(this.exercise));
        break;
      }
      case ExerciseType.QuestionAnswers: {
        this.copyToClipboard(this.questionAnswersService.createMarkup(this.exercise));
        break;
      }
      case ExerciseType.FreeFormAnswer: {
        this.copyToClipboard(this.freeFormAnswerService.createMarkup(this.exercise));
        break;
      }
      case  ExerciseType.DroppedGaps: {
        this.copyToClipboard(this.droppedGapsService.createMarkup(this.exercise));
      }
    }
  }

  copyToClipboard(val: string) {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    this.openSnackBar('Упражнение в HTML виде скопировано в буфер обмена', 'Закрыть');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  isOfType(exerciseType: string) {
    const exerciseTypeParsed: ExerciseType = ExerciseType[exerciseType];
    return this.exercise.type === exerciseTypeParsed;
  }
}
