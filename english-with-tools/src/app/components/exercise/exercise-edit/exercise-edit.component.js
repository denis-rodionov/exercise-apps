var exerciseEdit = {
  bindings: {
    exercise: '<'
  },
  templateUrl: './exercise-edit.html',
  controller: 'ExerciseEditController'
};

angular
  .module('components.exercise')
  .component('exerciseEdit', exerciseEdit)
  .config(function ($stateProvider) {
    $stateProvider
      .state('exercise', {
        parent: 'app',
        url: '/exercise/:id',
        component: 'exerciseEdit',
        resolve: {
          exercise: function ($transition$, ExerciseService) {
            var key = $transition$.params().id;
            return ExerciseService.getExerciseById(key).$loaded();
          }
        }
      });
  });
