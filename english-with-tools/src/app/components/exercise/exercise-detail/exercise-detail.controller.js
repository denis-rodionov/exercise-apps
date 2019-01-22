function ExerciseDetailController() {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.isNewExercise = !ctrl.exercise.$id;
  };
  ctrl.saveExercise = function () {
    ctrl.onSave({
      $event: {
        exercise: ctrl.exercise
      }
    });
  };
  ctrl.updateExercise = function () {
    ctrl.onUpdate({
      $event: {
        exercise: ctrl.exercise
      }
    });
  };
  ctrl.deleteExercise = function () {
    ctrl.onDelete({
      $event: {
        exercise: ctrl.exercise
      }
    });
  };
  ctrl.tagChange = function (event) {
    ctrl.exercise.tag = event.tag;
    ctrl.updateExercise();
  }
}

angular
  .module('components.exercise')
  .controller('ExerciseDetailController', ExerciseDetailController);
