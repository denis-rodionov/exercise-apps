const sentenses = $(".ew-hidden-sentense");
const verbs = [["abandon","abandons","abandoned","abandoned","abandoning"],["abase","abases","abased","abased","abasing"],["be","is","was","been","being"],["finish","finishes","finished","finished","finishing"],["start","starts","started","started","starting"],["take","takes","took","taken","taking"],["put","puts","put","put","putting"]];

const indicatorWords = [["always", "mid", "presentSimple"],["already", "mid", "presentPerfect"],["at 4 pm", "end", "pastSimple"],["now", "end", "presentContinuous"],["at that moment", "end", "pastContinuous"],["lately", "end", "presentPerfect"],["предпрошедшее","empty","pastPerfect"],["often","mid","presentSimple"],["yesterday","end","pastSimple"]];

function isPlural(subject) {
  // works only with pronoun. If not a pronoun, assumed to be singular.
  var lowercaseSubject = subject.toLowerCase();
  switch (lowercaseSubject) {
    case "they":
    case "we":
    case "you":
      return true;
    default:
      return false;
  }
}

function cleanWord(word) {
  return word.trim().replace("(", "").replace(")", "");
}

function findArrayElement(element, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][0] == element) {
      return arr[i];
    }
  }
  alert("No element " + element + " in array");
  return null;
}

function buildCorrectVerb(initialVerb, tense, isPlural, indicatorWord, indicatorPosition, subject) {
  const verbInfo = findArrayElement(initialVerb, verbs);
  var resultVerb = "";

  switch (tense) {
    case "presentSimple":
      if (subject.toLowerCase() == "i") {
        resultVerb = verbInfo[0];
      } else if (!isPlural) {
        resultVerb = verbInfo[1];
      } else if (initialVerb == "be") {
        resultVerb = "are";
      } else {
        resultVerb = verbInfo[0];
      }
      if (indicatorPosition == "mid") {
        if (initialVerb == "be") {
          resultVerb =  resultVerb + " " + indicatorWord;
        } else {
          resultVerb = indicatorWord + " " + resultVerb;
        }
      }
      break;
    case "presentPerfect":
      var axilaryVerb = "";
      if (subject.toLowerCase() == "i") {
        axilaryVerb = "have"
      } else if (!isPlural) {
        axilaryVerb = "has";
      } else {
        axilaryVerb = "have";
      }
      if (indicatorPosition == "mid") {
        resultVerb = axilaryVerb + " " + indicatorWord + " " + verbInfo[3];
      } else {
        resultVerb = axilaryVerb + " " + verbInfo[3];
      }
      break;
    case "pastSimple":
      resultVerb = verbInfo[2];
      if (indicatorPosition == "mid") {
        if (resultVerb == "be") {
          resultVerb =  resultVerb + " " + indicatorWord;
        } else if (initialVerb == "be") {
          resultVerb = "were";
        } else {
          resultVerb = indicatorWord + " " + resultVerb;
        }
      }
      break;
    case "pastContinuous":
      if (!isPlural) {
        axilaryVerb = "was";
      } else {
        axilaryVerb = "were";
      }
      if (indicatorPosition == "mid") {
        resultVerb = axilaryVerb + " " + indicatorWord + " " + verbInfo[4];
      } else {
        resultVerb = axilaryVerb + " " + verbInfo[4];
      }
      break;
    case "presentContinuous":
      if (subject.toLowerCase() == "i") {
        axilaryVerb = "am";
      } else if (!isPlural) {
        axilaryVerb = "is";
      } else {
        axilaryVerb = "are";
      }
      if (indicatorPosition == "mid") {
        resultVerb = axilaryVerb + " " + indicatorWord + " " + verbInfo[4];
      } else {
        resultVerb = axilaryVerb + " " + verbInfo[4];
      }
      break;
    case "pastPerfect":
      if (indicatorPosition == "mid") {
        resultVerb = "had " + indicatorWord + " " + verbInfo[3];
      } else {
        resultVerb = "had " + verbInfo[3];
      }
      break;
    default:
      alert("Unknown tense: " + tense);
  }

  return resultVerb;
}

sentenses.each(function () {
  var sentenceText = $(this).text().trim().replace(/\s\s+/g, ' ').replace(".", "");

  // show the sentence
  const newItem = $("#ew-template").clone();
  newItem.appendTo("#ew-table").removeClass("hidden");
  newItem.find(".ew-text").text(sentenceText);

  // building the answer
  // replace the answer with the answer in the correct form
  const words = sentenceText.split(" ");
  const subject = words[0];		// limitation
  var isSubjectPlural = isPlural(subject);
  var wordsInParentesis = sentenceText.match(/\([^()]+\)/g);
  const initialVerb = cleanWord(wordsInParentesis[0]);
  const indicatorWord = cleanWord(wordsInParentesis[1]);
  const indicatorWordInfo = findArrayElement(indicatorWord, indicatorWords);
  const tense = indicatorWordInfo[2];
  const indicatorPosition = indicatorWordInfo[1];
  const correctVerb = buildCorrectVerb(initialVerb, tense, isSubjectPlural, indicatorWord, indicatorPosition, subject);

  var answerSentence = sentenceText.replace(wordsInParentesis[0], correctVerb).replace(wordsInParentesis[1], "");
  if (indicatorPosition == "end") {
    answerSentence = answerSentence + " " + indicatorWord;
  }
  answerSentence = answerSentence.trim() + ".";

  newItem.find(".right-answer-text").text(answerSentence);
  newItem.find(".ew-input").attr("data-answers", answerSentence);
  newItem.removeAttr("id");
});

// delete template row
$("tr.hidden").remove();


$("#ew-check-results").click(function (e) {
  e.preventDefault();
  var answers = document.getElementsByClassName('ew-input');

  var totalAnswers = 0;
  var rightAnswers = 0;
  for (var i = 0; i < answers.length; i++) {
    totalAnswers++;
    if (isCorrectAnswer(answers[i])) {
      rightAnswers++;
      answers[i].classList.add('correct');
    } else {
      answers[i].classList.add('incorrect')
      showCorrectAnswer(answers[i].dataset.number);
    }
  }

  showResult(rightAnswers, totalAnswers);
});

function isCorrectAnswer(answer) {
  var correctAnswers = answer.dataset.answers.split("|");
  for (var i = 0; i < correctAnswers.length; i++) {
    const sanitizedAnswer = sanitize(answer.value);
    const sanitizedCorrectAnswer = sanitize(correctAnswers[i]);
    if (sanitizedAnswer.includes("he_s")) {
      if (sanitizedAnswer.replace("he_s", "he is") === sanitizedAnswer ||
        sanitizedAnswer.replace("he_s", "he has" === sanitizedAnswer)) {
        return true;
      }
    }
    if (sanitizedAnswer.includes("she_s")) {
      if (sanitizedAnswer.replace("she_s", "she is") === sanitizedAnswer ||
        sanitizedAnswer.replace("she_s", "she has" === sanitizedAnswer)) {
        return true;
      }
    }
    if (sanitizedAnswer.includes("it_s")) {
      if (sanitizedAnswer.replace("it_s", "it is") === sanitizedAnswer ||
        sanitizedAnswer.replace("it_s", "it has" === sanitizedAnswer)) {
        return true;
      }
    }
    if (sanitizedCorrectAnswer === sanitizedAnswer) {
      return true;
    }
  }
  return false;
}

function sanitize(text) {
  text = text.replace(/\s\s+/g, ' ');
  text = text.replace(/é/g,'e');
  text = text.trim().toLowerCase();
  text = text.replace("you're", "you are");
  text = text.replace("i'm", "i am");
  text = text.replace("they're", "they are");
  text = text.replace("we're", "we are");
  text = text.replace("i've", "i have");
  text = text.replace("you've", "you have");
  text = text.replace("they've", "they have");
  text = text.replace("we've", "we have");
  text = text.replace("he's", "he_s");
  text = text.replace("she's", "she_s");
  text = text.replace("it's", "it_s");
  text = text.replace(/(\r\n|\n|\r|\?|\.|\,|\'|\"|\`|\’|\!)/gm, "");
  return text;
}

function showCorrectAnswer(number) {
  var correctAnswers = document.getElementsByClassName('right-answer');
  for (var i = 0; i < correctAnswers.length; i++) {
    if (correctAnswers[i].dataset.number === number) {
      correctAnswers[i].classList.remove('hidden');
    }
  }
}

function generateAnswer(correctNumber, total) {
  var exerciseTag = document.getElementsByClassName('ew-exercise');
  console.log('exercise tags found: ' + exerciseTag.length);

  var rows = exerciseTag[0].getElementsByTagName('tr');

  var result = "Набрано баллов: " + correctNumber + " из " + total + '\n';
  for (var i = 0; i < rows.length; i++) {
    var question = rows[i].getElementsByClassName('ew-text')[0].innerText;
    var answerTag = rows[i].getElementsByClassName('ew-input')[0];

    result += '\n' + (i + 1) + ') ' + question;

    if (answerTag.classList.contains('correct')) {
      result += '     Answer: ' + answerTag.value;
    } else {
      result += '\nINCORRECT: ' + answerTag.value;
    }
  }

  return result;
}

// --------  Common functions -------------------

function showResult(score, total) {
  document.getElementById("ew-check-results").classList.add('disabled');
  var resultText = generateAnswer(score, total);
  //document.getElementById("ew-result-text").innerText = resultText;
  sendAnswer(resultText);
}

function sendAnswer(answer) {
  var answerInput = document.getElementById('lessonanswer-answer_text');

  if (answerInput) {
    console.log('answer input found!')
    answerInput.innerText = answer;
    var sendButton = document.getElementsByName('send-answer')[0];
  } else {
    var commentIntputs = document.getElementsByClassName('new-comment')[0]
      .getElementsByClassName('new-comment-textarea');
    if (commentIntputs.length == 0) {
      console.log('comment input not found!')
    } else {
      console.log('comment input found. inserting answer: ' + answer);
      commentIntputs[0].innerText = answer;
      var sendButtons = document.getElementsByClassName('btn-send');
      if (sendButtons.legnth == 0) {
        console.log('not found a button to send a comment');
      } else {
        console.log('send comment button found');
        sendButtons[0].click();
      }
    }
  }
}
