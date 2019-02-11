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

function generateAnswer(correctNumber, total) {
  var exerciseTag = document.getElementsByClassName('ew-exercise');
  console.log('exercise tags found: ' + exerciseTag.length);
  
  var rows = exerciseTag[0].getElementsByTagName('tr');

  var result = "Набрано баллов: " + correctNumber + " из " + total + '\n';
  for (var i = 0; i < rows.length; i++) {
  	var questions = rows[i].getElementsByClassName('ew-text');
    
    if (questions.length == 1) {
      var questionTag = questions[0];
    	result += '\n' + (i + 1) + ') ' + getTextFromHtml(questionTag);
      
      var wrongAnswers = questionTag.getElementsByClassName('wrong');
      
      if (wrongAnswers.length != 0) {
        result += '\nINCORRECT: wrong answers: ' + wrongAnswers.length;
      } else {
        result += '   : Correct';
      }
    }
  }

  return result;
}

function getTextFromHtml(htmlTag) {
	var selectTags = htmlTag.getElementsByClassName('ew-gap-option');
  var result = htmlTag.innerHTML;
  
  for (var i = 0; i < selectTags.length; i++) {
 		var selectTag = selectTags[i];
  	result = result.replace(/<select\b[^>]*>((.|\n)*?)<\/select>/, selectTag.options[selectTag.selectedIndex].value);
  }
  
  result = clearTags(result);
  
  result = result.replace(/\n/g, '');
  
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

function clearTags(text) {
	return text.replace(/<([a-z][a-z0-9]*)\b[^>]*>/g, '').replace(/<\/([a-z][a-z0-9]*)\b[^>]*>/g, '');
}