function ExerciseDetailController() {
  var ctrl = this;
  ctrl.$onInit = function () {
    ctrl.isNewExercise = !ctrl.exercise.$id;
  };
  ctrl.saveExercise = function () {
    ctrl.onSave({
      $event: {
        exercise: ctrl.exercise
      }
    });
  };
  ctrl.updateExercise = function () {
    ctrl.onUpdate({
      $event: {
        exercise: ctrl.exercise
      }
    });
  };
  ctrl.deleteExercise = function () {
    ctrl.onDelete({
      $event: {
        exercise: ctrl.exercise
      }
    });
  };
  ctrl.tagChange = function (event) {
    ctrl.exercise.tag = event.tag;
    ctrl.updateExercise();
  }
  ctrl.addSentence = function () {
    if (!ctrl.exercise.sentences) {
      ctrl.exercise.sentences = [];
    }
    ctrl.exercise.sentences.push({
      text: "",
      words: ""
    });
  };

  ctrl.deleteSentence = function (event) {
    const index = ctrl.exercise.sentences.indexOf(event.sentence);
    ctrl.exercise.sentences.splice(index, 1);
  };
}

angular
  .module('components.exercise')
  .controller('ExerciseDetailController', ExerciseDetailController);
