import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Exercise } from '../model/exercise';
import { AuthService } from './auth.service';


@Injectable()
export class ExerciseService {
    collectionRef: AngularFirestoreCollection<Exercise>;
    exercisesX: Observable<Exercise[]>;

    collectionName = 'exercises';
    rootCollectionName = 'users';
    userId: string;

  constructor(public database: AngularFirestore, private authService: AuthService) {
    this.userId = this.authService.getUser().uid;
    this.collectionRef = this.database.collection(this.rootCollectionName + '/' + this.userId + '/' + this.collectionName);
    this.exercisesX = this.collectionRef.snapshotChanges().pipe(map(changes => {
      console.log('change comes...');
      return changes.map(a => {
        const data: Exercise = this.toExercise(a.payload.doc.data()['json'] as string);
        console.log('exercise converted: Exercise name:' + data.name + ', json:' + JSON.stringify(data));
        return data;
      });
    }));
  }

    getExercises(): Observable<Exercise[]> {
        return this.exercisesX;
    }

    createExercise(exercise) {
        return this.database.collection(this.rootCollectionName + '/' + this.userId + '/' + this.collectionName).add({
            json: JSON.stringify(exercise)
        });
    }

    private toExercise(json: string): Exercise {
        const ex: Exercise = JSON.parse(json);
        return ex;
    }
}