function ExerciseService(AuthService, $firebaseRef, $firebaseArray, $firebaseObject) {
  var ref = $firebaseRef.exercises;
  var uid = AuthService.getUser().uid;
  return {
    createNewExercise: function (exercise) {
      return $firebaseArray(ref.child(uid)).$add(exercise);
    },
    getExerciseById: function (id) {
      return $firebaseObject(ref.child(uid).child(id));
    },
    getExerciseList: function () {
      return $firebaseArray(ref.child(uid));
    },
    updateExercise: function (exercise) {
      return exercise.$save();
    },
    deleteExercise: function (exercise) {
      return exercise.$remove();
    }
  };
}

/**
 * @ngdoc service
 * @name ExerciseService
 * @module components.exercise
 *
 * @description Provides HTTP methods for our firebase connection.
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */

angular
  .module('components.exercise')
  .factory('ExerciseService', ExerciseService);
