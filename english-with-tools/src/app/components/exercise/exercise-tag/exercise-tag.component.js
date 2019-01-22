var exerciseTag = {
  bindings: {
    tag: '<',
    onChange: '&'
  },
  templateUrl: './exercise-tag.html',
  controller: 'ExerciseTagController'
};

angular
  .module('components.exercise')
  .component('exerciseTag', exerciseTag);
