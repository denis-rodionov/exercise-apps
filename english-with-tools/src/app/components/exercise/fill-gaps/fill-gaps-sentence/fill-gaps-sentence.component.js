var fillGapsSentence = {
    bindings: {
      sentence: '=',
      onDelete: '&'
    },
    templateUrl: './fill-gaps-sentence.html',
    controller: 'FillGapsSentenceController'
  };
  
  angular
    .module('components.exercise')
    .component('fillGapsSentence', fillGapsSentence);
  