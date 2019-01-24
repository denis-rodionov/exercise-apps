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

  ctrl.markup = function () {
    var preExercise = "<div class=\"exercise\"><table>";
    var postExercise = "</table><div class=\"controls\"><a class=\"button\" id=\"checkResult\" href=\"#\" draggable=\"false\">Check</a><a class=\"button\" id=\"resetResults\" href=\"#\" draggable=\"false\" style=\"visibility: hidden\">Reset</a></div><div id=\"result\"></div></div>";
    var preText = "<tr><td><div class=\"text\"><p>";
    var middleMarkup = "</p></div><div class=\"words\">";
    var postText = "</div></td></tr>";
    var preWord = "<span class=\"gap\" data-answer=\"";
    var postWord = "\"></span>";
    var separator = "#";

    var result = "";
    var wordsCounter = 0;
    ctrl.exercise.sentences.forEach(function(sentence) {

      // find words
      var words = [];
      sentence.words.split(',').forEach(function(word) {
        words.push(word.trim());
      });

      var processedText = sentence.text;
      sentence.text.split(separator).forEach(function(str, index) {
        if (index % 2 == 1) {
          words.push(str);
          processedText = processedText.replace(separator + str + separator, preWord + str + postWord);
        }
      });
      words = Shuffle(words);

      // markup
      var wordsMarkup = words.map(function(word) {
        return "<div id=\"" + wordsCounter++ + "\" class=\"word\">" + word + "</div>";
      }).join("");

      result += preText + processedText + middleMarkup + wordsMarkup + postText;
    });

    ctrl.markupText = preExercise + result + postExercise;
  }

  ctrl.copyToClipboard = function() {
    var textarea = document.getElementById("markup");
    textarea.select();
    document.execCommand("copy");
  }

  function Shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
}

angular
  .module('components.exercise')
  .controller('ExerciseDetailController', ExerciseDetailController);
