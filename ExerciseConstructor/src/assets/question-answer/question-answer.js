var answers = document.getElementsByClassName('ew-answer')

for (var i = 0; i < answers.length; i++) {
  answers[i].onclick = answerOnClick;
}

function answerOnClick(e) {
  // make the answers unselectable
  this.classList.add('selected');
  for (var i = 0; i < answers.length; i++) {
    if (answers[i] != this && this.dataset.question === answers[i].dataset.question) {
      answers[i].classList.remove('selected');
    }
  }
}

document.getElementById("ew-check-results").onclick = function (e) {
  e.preventDefault();
  var totalAnswers = 0;
  var correctAnswers = 0;
  var rows = document.getElementsByClassName('ew-exercise')[0].getElementsByTagName('tr');

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    totalAnswers++;

    var selected = row.getElementsByClassName('selected');
    if (selected.length != 0) {
      if (selected[0].dataset.answer === '1') {
        correctAnswers++;
        selected[0].classList.add('right');
      } else {
        selected[0].classList.add('wrong');
      }
      selected[0].classList.remove('selected');
    } else {
      // nothing is selected
      var answers = row.getElementsByClassName('ew-answer');
      for (var j = 0; j < answers.length; j++) {
        answers[j].classList.add('wrong');
      }
    }
  }

  showResult(correctAnswers, totalAnswers);
}

function generateAnswer(correctNumber, total) {
  var exerciseTag = document.getElementsByClassName('ew-exercise');
  console.log('exercise tags found: ' + exerciseTag.length);

  var rows = exerciseTag[0].getElementsByTagName('tr');

  var result = "Набрано баллов: " + correctNumber + " из " + total + '\n';

  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];

    var question = row.getElementsByClassName('ew-question')[0].innerText;
    result += '\n' + (i + 1) + ') ' + question;

    var wrongAnswer = row.getElementsByClassName('wrong');
    if (wrongAnswer.length > 1) {
      result += '\nINCORRECT: no answer ';
    } else if (wrongAnswer.length != 0) {
      result += '\nINCORRECT: ' + wrongAnswer[0].innerText;
    } else {
      var correctAnswer = row.getElementsByClassName('right');
      result += '     Answer: ' + correctAnswer[0].innerText;
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
      if (sendButtons.length == 0) {
        console.log('not found a button to send a comment');
      } else {
        console.log('send comment button found');
        sendButtons[0].click();
      }
    }
  }
}