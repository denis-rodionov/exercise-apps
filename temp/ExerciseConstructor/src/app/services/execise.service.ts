import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Exercise } from '../model/exercise';
import { AuthService } from './auth.service';


@Injectable()
export class ExerciseService {
    collectionRef: AngularFirestoreCollection<Exercise>;
    exercises$: Observable<Exercise[]>;

    collectionName = 'exercises';
    rootCollectionName = 'users';
    userId: string;

    constructor(public database: AngularFirestore, private authService: AuthService) {
        this.init();
    }

    public init() {
        this.userId = this.authService.getUser().uid;
        this.collectionRef = this.database.collection(this.getDbPath(this.userId, null));
        this.exercises$ = this.collectionRef.snapshotChanges().pipe(map(changes => {
        console.log('change comes: ' + changes.length);
        return changes.map(a => {
            const data: Exercise = this.toExercise(a.payload.doc.data()['json'] as string);
            data.id = a.payload.doc.id;
            console.log('exercise converted: Exercise id:' + data.id + ', json:' + JSON.stringify(data));
            return data;
        });
        }));
    }

    getExercises(): Observable<Exercise[]> {
        return this.exercises$;
    }

    getExercise(id: string): Observable<Exercise> {
        return this.database.doc(this.getDbPath(this.userId, id)).get().pipe(map(
            a => {
                const data: Exercise = this.toExercise(a.data()['json'] as string);
                data.id = a.id;
                console.log('exercise converted: Exercise id:' + data.id + ', json:' + JSON.stringify(data));
                return data;
            }));
    }

    /*
    getExercise(id: string): Observable<Exercise> {
        return this.exercises$.pipe(map(list =>
            list.find(ex => ex.id === id)
        ));
    }*/

    getDbPath(userId: string, exerciseId: string) {
        const res = this.rootCollectionName + '/' + userId + '/' + this.collectionName;

        if (exerciseId) {
            return res + '/' + exerciseId;
        }

        return res;
    }

    createExercise(exercise) {
        return this.database.collection(this.rootCollectionName + '/' + this.userId + '/' + this.collectionName)
            .add(this.toDbEntity(exercise));
    }

    private toDbEntity(exercise: Exercise): {} {
        return {
            json: JSON.stringify(exercise)
        };
    }

    deleteExercise(exercise: Exercise) {
        console.log('deleting exercise with id=' + exercise.id + ' : ' + JSON.stringify(exercise));
        const ref = this.database.doc(this.getDbPath(this.userId, exercise.id));
        return ref.delete();
    }

    updateExercise(exercise: Exercise) {
        const ref = this.database.doc(this.getDbPath(this.userId, exercise.id));
        return ref.update(this.toDbEntity(exercise));
    }

    private toExercise(json: string): Exercise {
        const ex: Exercise = JSON.parse(json);
        return ex;
    }
}