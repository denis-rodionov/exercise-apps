function ExercisesController($filter, $state) {
  var ctrl = this;

  ctrl.$onInit = function() {
    ctrl.filteredExercises = $filter('exercisesFilter')(ctrl.exercises, ctrl.filter);
  };

  ctrl.goToExercise = function (event) {
    $state.go('exercise', {
      id: event.exerciseId
    });
  };
}

angular
  .module('components.exercise')
  .controller('ExercisesController', ExercisesController);
