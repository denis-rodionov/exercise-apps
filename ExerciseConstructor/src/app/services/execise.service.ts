import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Exercise, ExerciseType, ExerciseTypeView } from '../model/exercise';
import { AuthService } from './auth.service';
import { Sentence, TextType } from '../model/sentence';
import { nodeChildrenAsMap } from '@angular/router/src/utils/tree';
import { ExerciseListComponent } from '../exercise-list/exercise-list.component';


@Injectable()
export class ExerciseService {
    collectionRef: AngularFirestoreCollection<Exercise>;
    exercises$: Observable<Exercise[]>;

    collectionName = 'exercises';
    rootCollectionName = 'users';
    userId: string;

    filter: ExerciseType;

    backupStarted = false;

    constructor(public database: AngularFirestore, private authService: AuthService) {
        this.init();
    }

    public init() {
        console.log('ExerciseService.init()');
        const user = this.authService.getUser();
        if (!user) {
            console.log('ExerciseService.init: no user');
            return;
        }
        this.userId = user.uid;
        this.collectionRef = this.database.collection(this.getDbPath(this.userId, null));
        this.exercises$ = this.collectionRef.snapshotChanges().pipe(map(changes => {
            console.log('change comes: ' + changes.length + ', filter: ' + this.filter);
            const defaultTimestamp = new Date(2019, 1, 1).getTime();
            return changes.map(a => this.toExercise(a.payload.doc.data()['json'] as string, a.payload.doc.id, defaultTimestamp))
            .filter(ex => !this.filter || this.filter === ex.type)
            .sort((a, b) => {
                if (a.timestamp < b.timestamp) { return 1; }
                if (a.timestamp > b.timestamp) { return -1; }

                return a.name > b.name ? -1 : 1;
            });
        }));

        // semi-manual backup: uncomment this and run, when backup is needed. Do not deploy uncommented on production.
        //this.backupExercises();
    }

    public filterExercises(filterValue: ExerciseType) {
        console.log(filterValue);
        this.filter = filterValue;
        this.init();
    }

    public resetFilter() {
        this.filter = null;
        this.init();
    }

    public getTypes(): ExerciseTypeView[] {
        return [
            { value: ExerciseType.FillGaps, viewValue: 'Drag & Drop' },
            { value: ExerciseType.ChooseSentence, viewValue: 'Выбери предложение' },
            { value: ExerciseType.QuestionAnswers, viewValue: 'Вопрос ответ'},
            { value: ExerciseType.FreeFormAnswer, viewValue: 'Свободная форма'},
            { value: ExerciseType.DroppedGaps, viewValue: 'Выпадающие пробелы'},
            { value: ExerciseType.Matches, viewValue: 'Сопоставления'},
            { value: ExerciseType.Translation, viewValue: 'Перевод'}
        ];
    }

    public getExercises(): Observable<Exercise[]> {
        return this.exercises$;
    }

    public getExerciseTypeView(exerciseType: string) {
        const exerciseTypeParsed: ExerciseType = ExerciseType[exerciseType];
        return this.getExerciseTypeViewByType(exerciseTypeParsed);
    }

    public getExerciseTypeViewByType(exerciseType: ExerciseType) {
        return this.getTypes().find(t => t.value === exerciseType).viewValue;
    }

    getExercise(id: string): Observable<Exercise> {
        return this.database.doc(this.getDbPath(this.userId, id)).get().pipe(map(
            a => {
                const data: Exercise = this.toExercise(a.data()['json'] as string, a.id, new Date(2019, 1, 1).getTime());
                data.sentences.forEach(s => this.setDefaultsForSentence(s));
                console.log('exercise converted: Exercise id:' + data.id + ', json:' + JSON.stringify(data));
                return data;
            }));
    }

    setDefaultsForSentence(sentence: Sentence) {
        if (!sentence.type) {
            console.log('set defaults');
            sentence.type = TextType.Text;
        }
    }

    getDbPath(userId: string, exerciseId: string) {
        const res = this.rootCollectionName + '/' + userId + '/' + this.collectionName;

        if (exerciseId) {
            return res + '/' + exerciseId;
        }

        return res;
    }

    createExercise(exercise: Exercise) {
        return this.createExerciseForUser(exercise, this.userId);
    }

    private createExerciseForUser(exercise: Exercise, userId: string) {
        console.log('creating exercises for user ' + userId + ' with exerciseId: ' + exercise.id);
        return this.database.collection(this.rootCollectionName + '/' + userId + '/' + this.collectionName)
            .add(this.toDbEntity(exercise)).then(e => console.log('Document created: ' + e.id));
    }

    private toDbEntity(exercise: Exercise): {} {
        return {
            json: JSON.stringify(exercise)
        };
    }

    deleteExercise(exercise: Exercise) {
        return this.deleteExerciseForUser(exercise, this.userId);
    }

    private deleteExerciseForUser(exercise: Exercise, userId: string) {
        console.log('deleting exercise for user ' + userId + ' with id=' + exercise.id + ' : ' + JSON.stringify(exercise));
        const ref = this.database.doc(this.getDbPath(userId, exercise.id));
        return ref.delete();
    }

    updateExercise(exercise: Exercise) {
        const ref = this.database.doc(this.getDbPath(this.userId, exercise.id));
        exercise.timestamp = new Date().getTime();
        return ref.update(this.toDbEntity(exercise));
    }

    private toExercise(json: string, id: string, defaultTimestamp: number): Exercise {
        const ex: Exercise = JSON.parse(json);
        ex.id = id;
        if (!ex.timestamp) {
            ex.timestamp = defaultTimestamp;
        }
        return ex;
    }

    backupExercises() {
        const backupUserId = 'QkvZYPuVEMXnNNCX9zXxlsEUWZA2';

        if (this.userId === backupUserId) {
            console.log('cannot make backup for the user ' + backupUserId + ' because this user ID is used for backup');
            return;
        }

        let deletedCount = 0;

        this.exercises$.subscribe(exercises => {
            if (this.backupStarted) {
                return;
            }
            this.backupStarted = true;
            console.log('backup started...');
            const backupCollectionPath = this.rootCollectionName + '/' + backupUserId + '/exercises';
            this.database.collection(backupCollectionPath).get()
                .subscribe(backupExercises => {
                    exercises.forEach(e => {
                        this.createExerciseForUser(e, backupUserId);
                    });

                    backupExercises.docs.forEach(e => {
                        const path = backupCollectionPath + '/' + e.id;
                        this.database.doc(path).delete()
                            .then(() => console.log('document deleted: ' + path + ' (total: ' + ++deletedCount + ')'));
                    });
                });
        });
    }
}
