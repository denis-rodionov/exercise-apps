var exerciseDetail = {
  bindings: {
    exercise: '<',
    onSave: '&',
    onUpdate: '&',
    onDelete: '&'
  },
  templateUrl: './exercise-detail.html',
  controller: 'ExerciseDetailController'
};

angular
  .module('components.exercise')
  .component('exerciseDetail', exerciseDetail);
