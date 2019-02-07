document.getElementById("ew-check-results").onclick = function(e) {
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
  }

  function isCorrectAnswer(answer) {
      var correctAnswers = answer.dataset.answers.split("|");
    for (var i = 0; i < correctAnswers.length; i++) {
        
        if (sanitize(correctAnswers[i]) === sanitize(answer.value)) {
          return true;
      }
    }
    return false;
  }
  
  function sanitize(text) {
      text = text.replace(/\s\s+/g, ' ');
    text = text.replace(/(\r\n|\n|\r|\?|\.|\,)/gm,"");
    return text.trim().toLowerCase();
  }
  
  function showCorrectAnswer(number) {
      var correctAnswers = document.getElementsByClassName('right-answer');
    for (var i = 0; i < correctAnswers.length; i++) {
        if (correctAnswers[i].dataset.number === number) {
          correctAnswers[i].classList.remove('hidden');
      }
    }
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