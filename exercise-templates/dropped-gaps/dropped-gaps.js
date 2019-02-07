document.getElementById("ew-check-results").onclick = function (e) {
  e.preventDefault();
  var gaps = document.getElementsByClassName('ew-gap-option');

  var correctAnswers = 0;
  for (var i = 0; i < gaps.length; i++) {
    if (gaps[i].value === gaps[i].dataset.correct) {
      correctAnswers++;
      gaps[i].classList.add('right');
    } else {
      gaps[i].classList.add('wrong');
    }
  }

  showResult(correctAnswers, gaps.length);
}

// --------  Common functions -------------------

function showResult(score, total) {
  document.getElementById("ew-check-results").classList.add('disabled');
  var resultText = "Набрано баллов: " + score + " из " + total;
  document.getElementById("ew-result-text").innerText = resultText;
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