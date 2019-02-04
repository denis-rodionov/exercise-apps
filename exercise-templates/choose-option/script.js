var sentences = document.getElementsByClassName('ew-sentence')
for (var i = 0; i < sentences.length; i++)
  sentences[i].onclick = sentenceOnClick;

function sentenceOnClick(e) {
  var parent = this.parentElement.parentElement;
  var neighbour;
  if (parent.getElementsByClassName("ew-sentence")[0].innerHTML === this.innerHTML) {
  	neighbour = parent.getElementsByClassName("ew-sentence")[1];
  } else {
  	neighbour = parent.getElementsByClassName("ew-sentence")[0];
  }
  
  this.classList.toggle('selected');
  if (this.classList.contains('selected') && neighbour.classList.contains('selected')) {
  	neighbour.classList.remove('selected');
  }  
}

document.getElementById("ew-check-results").onclick = function() {
  var rows = document.getElementsByClassName('ew-exercise')[0].getElementsByTagName('tr');
  
  var score = 0;
  for (var i = 0; i < rows.length; i++) {
  	var row = rows[i];
    
    var sentences = row.getElementsByClassName('ew-sentence');
    if (sentences.length != 2) {
    	alert("System error: found " + sentences.length + " in one row");
    };
    
    // check if there is no answer
    if (!sentences[0].classList.contains('selected') && !sentences[1].classList.contains('selected')) {
    	sentences[0].classList.add('wrong');
      sentences[1].classList.add('wrong');
      continue;
    }
    
    // check the answer
    var selected =  row.getElementsByClassName('selected')[0];
    if (selected.dataset.answer == "1") {
    	score++;
      selected.classList.add('right');
    } else {
    	selected.classList.add('wrong');
    }
  }

  showResult(score, rows.length);
}

function showResult(score, total) {
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
    sendButton.click();
  } else {
    var commentIntputs = document.getElementsByClassName('new-comment-textarea');
    if (commentIntputs.length == 0) {
      console.log('comment input not found!')
    } else {
      console.log('comment input found');
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