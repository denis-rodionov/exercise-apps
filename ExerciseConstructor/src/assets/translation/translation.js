//disable shared element, which is useless in this exercise:
document.getElementsByClassName('ew-controls')[0].classList.add('invisible');

var exercise = document.getElementsByClassName('ew-exercise')[0];
var table = document.getElementsByClassName('ew-table')[0];
var totalNumber = exercise.getElementsByClassName('ew-tr').length;
var correctNumber = totalNumber;	// it is supposed to be decreased when user press "repeat the sentence"
var repeatedQuestions = [];
var shuffle = exercise.dataset.shuffle;

if (shuffle === 'true') {
	shuffleTable(table);
}

showQuestion(0);


function shuffleTable(table) {
  var rowsCollection = table.querySelectorAll('tr');
  let rows = Array.from(rowsCollection);
  
  for (var i = rows.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = rows[i];
    rows[i] = rows[j];
    rows[j] = temp;
  }
  
  for (const row of rows) {
    table.appendChild(row);
  }
}

function showQuestion(index) {
	var questions = exercise.getElementsByClassName('ew-tr');
	var question = enable(questions[index]);
  
  // check if the current quesion is a separator
  var continueButtons = question.getElementsByClassName('ew-continue-button');
  if (continueButtons.length != 0) {
  	enable(continueButtons[0]).onclick = function(event) {
    	event.preventDefault();
      totalNumber--;
      correctNumber--;
      disable(continueButtons[0]);
      showQuestion(index + 1);
    }
    return;
	}
  
  var checkButton = enable(question.getElementsByClassName('ew-check-button')[0]);
  checkButton.onclick = function(event) {
    event.preventDefault();

    disable(event.target);

    enable(question.getElementsByClassName('ew-right-answer')[0]);
    var rightButton = enable(question.getElementsByClassName('ew-right-button')[0]);
    var wrongButton = enable(question.getElementsByClassName('ew-wrong-button')[0]);

    rightButton.onclick = function(e) {
      e.preventDefault();

      disable(rightButton);
      disable(wrongButton);
      
      
      if (index + 1 == questions.length) {
      	showResult(correctNumber, totalNumber);
      } else {
      	showQuestion(index + 1);
      }
    }
    
    wrongButton.onclick = function(e) {
      e.preventDefault();

    	disable(rightButton);
      disable(wrongButton);
    	repeatQuestion(question);
      
      if (index + 1 < questions.length) {
      	showQuestion(index + 1);
			}
		}
  }
}

function repeatQuestion(question) {
		var clone = question.cloneNode(true);
    clone.classList.add('invisible');
    table.appendChild(clone);
    disable(clone.getElementsByClassName('ew-right-answer')[0]);
    repeatedQuestions.push(clone.getElementsByClassName('ew-text')[0].innerText);
    correctNumber--;
}

function enable(tag) {
  tag.classList.remove('invisible');
  
  // autoplay audio
  if (exercise.dataset.autoplay === 'true') {
    var audioTags = tag.getElementsByTagName('audio');
    if (audioTags.length > 0 && audioTags[0].parentElement === tag) {
      audioTags[0].play();
    }
  }
  
  return tag;
}

function disable(tag) {
	tag.classList.add('invisible');
  return tag;
}

function generateAnswer(correctNumber, totalNumber) {
	var result = "Набрано баллов: " + correctNumber + " из " + totalNumber + '\t\nREPEATED:';
  repeatedQuestions.forEach(function(question) {
  	result += '\t\n * ' + question;
  });
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