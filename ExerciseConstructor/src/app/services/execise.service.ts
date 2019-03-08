import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, filter, take } from 'rxjs/operators';
import { Exercise, ExerciseType, ExerciseTypeView } from '../model/exercise';
import { AuthService } from './auth.service';
import { Sentence, TextType } from '../model/sentence';


@Injectable()
export class ExerciseService {
    collectionRef: AngularFirestoreCollection<Exercise>;
    exercises$: Observable<Exercise[]>;

    collectionName = 'exercises';
    rootCollectionName = 'users';
    userId: string;

    filter: ExerciseType;

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
            return changes.map(a => {
                const data: Exercise = this.toExercise(a.payload.doc.data()['json'] as string);
                data.id = a.payload.doc.id;

                return data;
            })
            .filter(ex => !this.filter || this.filter === ex.type)
            .sort((a, b) => a.name > b.name ? -1 : 1);
        }));
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
            { value: ExerciseType.Matches, viewValue: 'Сопоставления'}
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
                const data: Exercise = this.toExercise(a.data()['json'] as string);
                data.id = a.id;
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