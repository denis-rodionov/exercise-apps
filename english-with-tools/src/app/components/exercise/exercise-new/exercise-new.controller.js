function ExerciseNewController(ExerciseService, $state) {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.exercise = {
      name: '',
      date: '',   //TODO: make date field
      orderNumber: 0,
      tag: 'fill-gaps',
      sentences: []
    };
  };
  ctrl.createNewExercise = function (event) {
    return ExerciseService
      .createNewExercise(event.exercise)
      .then(function (exercise) {
        $state.go('exercise', {
          id: exercise.key
        });
      });
  };
}

angular
  .module('components.exercise')
  .controller('ExerciseNewController', ExerciseNewController);
