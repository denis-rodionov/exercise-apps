var exercise = {
  bindings: {
    exercise: '<',
    onSelect: '&'
  },
  templateUrl: './exercise.html',
  controller: 'ExerciseController'
};

angular
  .module('components.exercise')
  .component('exercise', exercise);
