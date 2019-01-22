var exercises = {
  bindings: {
    exercises: '<',
    filter: '<'
  },
  templateUrl: './exercises.html',
  controller: 'ExercisesController'
};

angular
  .module('components.exercise')
  .component('exercises', exercises)
  .config(function ($stateProvider) {
    $stateProvider
      .state('exercises', {
        parent: 'app',
        url: '/exercises?filter',
        component: 'exercises',
        params: {
          filter: {
            value: 'none'
          }
        },
        resolve: {
          exercises: function (ExerciseService) {
            return ExerciseService.getExerciseList().$loaded();
          },
          filter: function ($transition$) {
            return $transition$.params();
          }
        }
      });
  });
