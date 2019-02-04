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

document.getElementById("ew-check-results").onclick = function(e) {
  e.preventDefault();
  var answers = document.getElementsByClassName('ew-answer');
	var totalAnswers = 0;
  var correctAnswers = 0;
  for (var i = 0; i < answers.length; i++) {
  	if (answers[i].dataset.answer === '1') {
    	totalAnswers++;
      answers[i].classList.add('right');
    }
    
    if (answers[i].classList.contains('selected')) {
    	if (answers[i].dataset.answer === '0') {
      	answers[i].classList.add('wrong');
      } else {
      	correctAnswers++;
      }      
    }
    answers[i].classList.remove('selected');
  }
  
  showResult(correctAnswers, totalAnswers);
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