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

document.getElementById("checkResultsButton").onclick = function() {
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
  
  document.getElementById("resultScore").innerText = correctAnswers + "/" + totalAnswers;
  document.getElementById("resultScoreP").classList.remove('hidden');

  sendAnswer("Результат: " + correctAnswers + " баллов из " + totalAnswers);
}

function sendAnswer(answer) {
  var answerInput = document.getElementById('lessonanswer-answer_text');
  answerInput.innerText = answer;
  var sendButton = document.getElementsByName('send-answer')[0];
  sendButton.click();
}