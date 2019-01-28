import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable()
export class ExerciseService {
    exercises: Observable<any[]>;

    constructor(private database: AngularFirestore) {
        this.exercises = database.collection('exercises').valueChanges();
    }

    getExercises() {
        return this.exercises;
    }
}