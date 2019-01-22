function ExerciseNewController(ExerciseService, $state) {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.exercise = {
      name: '',
      email: '',
      job: '',
      location: '',
      social: {
        facebook: '',
        github: '',
        twitter: '',
        linkedin: ''
      },
      tag: 'none'
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
