function FillGapsSentenceController() {
    var ctrl = this;

    ctrl.deleteSentence = function () {
      ctrl.onDelete({
        $event: {
          sentence: ctrl.sentence
        }
      });
    };
  }
  
  angular
    .module('components.exercise')
    .controller('FillGapsSentenceController', FillGapsSentenceController);
  