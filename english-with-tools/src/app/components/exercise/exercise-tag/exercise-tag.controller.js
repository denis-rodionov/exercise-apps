function ExerciseTagController() {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.tags = [
      'fill-gaps'
    ];
  };
  ctrl.$onChanges = function (changes) {
    if (changes.tag) {
      ctrl.tag = angular.copy(ctrl.tag);
    }
  };
  ctrl.updateTag = function (tag) {
    ctrl.onChange({
      $event: {
        tag: tag
      }
    });
  };
}

angular
  .module('components.exercise')
  .controller('ExerciseTagController', ExerciseTagController);
