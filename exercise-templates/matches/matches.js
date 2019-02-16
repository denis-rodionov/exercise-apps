var sentences = document.getElementsByClassName('ew-sentence')
for (var i = 0; i < sentences.length; i++)
  sentences[i].onclick = sentenceOnClick;

function sentenceOnClick(e) {
  var sentence = e.target;
  var parent = sentence.parentElement;

  if (parent.classList.contains('ew-result')) {
    removeResult(sentence);
  } else {
    chooseResult(sentence);
  }
}

function removeResult(sentence) {
  var row = sentence.parentElement.parentElement;
  var sentences = row.getElementsByClassName('ew-sentence');
  var leftOptionsColumn = document.getElementById('ew-left-column');
  var rightOptionsColumn = document.getElementById('ew-right-column');

  var leftSentence;
  var rightSentence;
  for (var i = 0; i < sentences.length; i++) {
    var sentenceTag = sentences[i];
    if (sentenceTag.classList.contains('ew-left-answer')) {
      leftSentence = sentenceTag;
    } else {
      rightSentence = sentenceTag;
    }
  }
  leftOptionsColumn.appendChild(leftSentence);
  rightOptionsColumn.appendChild(rightSentence);

  document.getElementById('ew-result-table').deleteRow(row.rowIndex);
}

function chooseResult(sentence) {
  var parent = sentence.parentElement;

  // select sentence
  var selected = parent.getElementsByClassName('selected');
  if (selected.length != 0) {
    selected[0].classList.remove('selected');
  }
  sentence.classList.add('selected');

  // find all selected sentences
  var selectedOptions = document.getElementById('ew-options-table').getElementsByClassName('selected');

  if (selectedOptions.length == 2) {
    var leftSelected, rightSelected;
    if (selectedOptions[0].classList.contains('ew-left-answer')) {
      addResult(selectedOptions[0], selectedOptions[1]);
    } else {
      addResult(selectedOptions[1], selectedOptions[0]);
    }
  }
}

function addResult(leftSentence, rightSentence) {
  leftSentence.classList.remove('selected');
  rightSentence.classList.remove('selected');

  var table = document.getElementById('ew-result-table');
  var row = table.insertRow(0);
  row.classList.add('ew-tr');

  var cellRight = row.insertCell(0);
  cellRight.appendChild(leftSentence);
  cellRight.classList.add('ew-result')

  var cellLeft = row.insertCell(0);
  cellLeft.appendChild(rightSentence);
  cellLeft.classList.add('ew-result');
}

// check result
document.getElementById("ew-check-results").onclick = function (e) {
  e.preventDefault();

  var rows = document.getElementById('ew-result-table').getElementsByTagName('tr');
  var correctAnswers = 0;
  for (var i = 0; i < rows.length; i++) {
    var answers = rows[i].getElementsByClassName('ew-sentence');
    if (answers.length != 2) {
      alert('Each row should contain exactly 2 answers. Found: ' + answers.length);
    }
    if (answers[0].dataset.match == answers[1].dataset.match) {
      correctAnswers++;
      answers[0].classList.add('right');
      answers[1].classList.add('right');
    } else {
      answers[0].classList.add('wrong');
      answers[1].classList.add('wrong');
    }
  }

  var totalAnswers = document.getElementsByClassName('ew-sentence').length / 2;

  showResult(correctAnswers, totalAnswers);
}

function generateAnswer(correctNumber, total) {
  var exerciseTag = document.getElementsByClassName('ew-exercise');
  console.log('exercise tags found: ' + exerciseTag.length);

  var rows = exerciseTag[0].getElementsByTagName('tr');

  var result = "Набрано баллов: " + correctNumber + " из " + total + '\n';
  for (var i = 0; i < rows.length; i++) {
    result += '\n' + (i + 1) + ') ';

    var correctSentences = rows[i].getElementsByClassName('right');

    if (correctSentences.length == 2) {
      result += correctSentences[0].innerText + ' - ' + correctSentences[1].innerText + '     : Correct.';
    } else {
      result += 'INCORRECT: ' + wrongSentences[0].innerText + ' - ' + wrongSentences[1].innerText;
    }
  }

  var notUsedSentences = document.getElementById('ew-options-table').getElementsByClassName('ew-sentence');
  if (notUsedSentences > 0) {
    result += '\n\nНе использованные варианты: ' + notUsedSentences.length;
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
      if (sendButtons.length == 0) {
        console.log('not found a button to send a comment');
      } else {
        console.log('send comment button found');
        sendButtons[0].click();
      }
    }
  }
}

function clearTags(text) {
  return text.replace(/<([a-z][a-z0-9]*)\b[^>]*>/g, '').replace(/<\/([a-z][a-z0-9]*)\b[^>]*>/g, '');
}