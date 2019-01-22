function ExerciseController() {
  var ctrl = this;
  ctrl.selectExercise = function () {
    ctrl.onSelect({
      $event: {
        exerciseId: ctrl.exercise.$id
      }
    });
  };
}

angular
  .module('components.exercise')
  .controller('ExerciseController', ExerciseController);
