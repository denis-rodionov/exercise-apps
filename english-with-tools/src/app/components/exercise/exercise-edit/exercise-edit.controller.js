function ExerciseEditController($state, ExerciseService, cfpLoadingBar, $window) {
  var ctrl = this;
  /**
   * @ngdoc method
   * @name ExerciseEditController#updateExercise
   *
   * @param {event} event Receive the emitted event
   * Updates the exercise information
   *
   * @return {method} ExerciseService returns the updateExercise method and a promise
   */
  ctrl.updateExercise = function (event) {
    cfpLoadingBar.start();
    return ExerciseService
      .updateExercise(event.exercise)
      .then(cfpLoadingBar.complete, cfpLoadingBar.complete);
  };
  /**
   * @ngdoc method
   * @name exerciseEditController#deleteExercise
   *
   * @param {event} event Delete the exercise
   *
   * @return {method} ExerciseService returns the deleteExercise method and a promise
   */
  ctrl.deleteexercise = function (event) {
    var message = 'Delete ' + event.exercise.name + ' from exercises?';
    if ($window.confirm(message)) {
      return ExerciseService
        .deleteExercise(event.exercise)
        .then(function () {
          $state.go('exercises');
        });
    }
  };
}

/**
 * @ngdoc type
 * @module components.exercise
 * @name ExerciseEditController
 *
 * @description
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
  .controller('ExerciseEditController', ExerciseEditController);
