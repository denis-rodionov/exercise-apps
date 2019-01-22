var exerciseNew = {
  templateUrl: './exercise-new.html',
  controller: 'ExerciseNewController'
};

angular
  .module('components.exercise')
  .component('exerciseNew', exerciseNew)
  .config(function ($stateProvider) {
    $stateProvider
      .state('new', {
        parent: 'app',
        url: '/new',
        component: 'exerciseNew'
      });
  });
