var checkButton = document.getElementById("ew-check-results");

setWordsDraggableAndClickable(true);

if (!checkButton) {
  console.log('check button not found');
}

checkButton.onclick = function (e) {
  e.preventDefault();
  var rightCount = 0;
  var gaps = document.getElementsByClassName('ew-gap');
  var i;
  for (i = 0; i < gaps.length; i++) {
    var gap = gaps[i];

    if (gap.hasChildNodes()) {
      var word = gap.firstChild;
      if (gap.dataset.answer == word.innerText) {
        rightCount++;
        word.classList.add('right');
      } else {
        word.classList.add('wrong');
      }
    } else {
      gap.classList.add('missed');
    }
  }

  freeze();
  showResult(rightCount, gaps.length);
}

function freeze() {
  setWordsDraggable(false);

  checkButton.classList.add('disabled');
}

function onWordClick(event) {
	var tr = event.target.closest(".ew-tr");
  var word = event.target;

  if (word.parentElement.classList.contains('ew-gap')) {
  	var gap = word.parentElement;
  	tr.getElementsByClassName('ew-words')[0].appendChild(word);
    gap.classList.remove('filled');
    return;
  }
	
	var gaps = tr.getElementsByClassName('ew-gap');
  
  for (var i = 0; i < gaps.length; i++) {
  	if (!gaps[i].classList.contains('filled')) {
    	gaps[i].appendChild(word);
    	gaps[i].classList.add('filled')
      break;
    }
  }
}

function setWordsDraggableAndClickable(value) {
  var words = document.getElementsByClassName('ew-word');
  var i;
  for (i = 0; i < words.length; i++) {
    words[i].draggable = value;
    words[i].onclick = onWordClick;
  }
}

document.addEventListener("dragstart", function (event) {
  event.dataTransfer.setData("Text", event.target.id);
  event.target.style.opacity = "0.01";
});

// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function (event) {
  if (event.target.classList.contains('ew-gap') && !event.target.classList.contains('filled')) {
    event.target.classList.add('drag')
  }
});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function (event) {
  if (event.target.classList.contains('ew-gap')) {
    event.target.classList.remove('drag');
  }
});

document.addEventListener("dragend", function (event) {
  fixGaps();
  fixWords();
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function (event) {
  event.preventDefault();
  var wordId = event.dataTransfer.getData("Text");
  var word = document.getElementById(wordId);

  if (event.target.classList.contains('ew-gap') && !event.target.classList.contains('filled')) {
    var gap = event.target;
    gap.appendChild(word);
    gap.classList.remove('drag');
    gap.classList.add('filled')
  }

  if (event.target.classList.contains('ew-words')) {
    event.target.appendChild(word);
  }
});

/**
 * Fixing gaps to avoid inconsisten state
 */
function fixGaps() {
  var gaps = document.getElementsByClassName('ew-gap');
  var i;
  for (i = 0; i < gaps.length; i++) {
    if (!gaps[i].hasChildNodes()) {
      gaps[i].className = 'ew-gap';
    }
  }
}

/**
 * Fixing gaps to avoid inconsisten state
 */
function fixWords() {
  var words = document.getElementsByClassName('ew-word');
  var i;
  for (i = 0; i < words.length; i++) {
    words[i].style.opacity = "1";
  }
}

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function (event) {
  event.preventDefault();
});

function generateAnswer(correctNumber, total) {
  var exerciseTag = document.getElementsByClassName('ew-exercise');
  console.log('exercise tags found: ' + exerciseTag.length);
  
  var rows = exerciseTag[0].getElementsByTagName('tr');

  var result = "Набрано баллов: " + correctNumber + " из " + total + '\n';
  for (var i = 0; i < rows.length; i++) {
  	var questions = rows[i].getElementsByClassName('ew-cell');
    
    if (questions.length == 1) {
    	result += '\n' + (i + 1) + ') ' + generateAnswerForQuestion(questions[0]);
    } else {
    	result += '\n' + (i + 1) + 'a) ' + generateAnswerForQuestion(questions[0]);
      result += '\n' + (i + 1) + 'b) ' + generateAnswerForQuestion(questions[1]);
    }
  }

  return result;
}

function generateAnswerForQuestion(questionTag) {
	var result = questionTag.innerText;

  var wrongAnswers = questionTag.getElementsByClassName('missed');
  
  if (wrongAnswers.length != 0) {
  	result += '\nINCORRECT: wrong answers: ' + wrongAnswers.length;
  } else {
  	result += '   Correct';
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