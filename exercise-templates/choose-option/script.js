var sentences = document.getElementsByClassName('sentence')
for (var i = 0; i < sentences.length; i++)
  sentences[i].onclick = sentenceOnClick;

function sentenceOnClick(e) {
  var parent = this.parentElement.parentElement;
  var neighbour;
  if (parent.getElementsByClassName("sentence")[0].innerHTML === this.innerHTML) {
  	neighbour = parent.getElementsByClassName("sentence")[1];
  } else {
  	neighbour = parent.getElementsByClassName("sentence")[0];
  }
  
  this.classList.toggle('selected');
  if (this.classList.contains('selected') && neighbour.classList.contains('selected')) {
  	neighbour.classList.remove('selected');
  }  
}

document.getElementById("checkResultsButton").onclick = function() {
  var rows = document.getElementsByClassName('exercise')[0].getElementsByTagName('tr');
  
  
  var score = 0;
  for (var i = 0; i < rows.length; i++) {
  	var row = rows[i];
    
    var sentences = row.getElementsByClassName('sentence');
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
  
  document.getElementById("resultScore").innerText = score + "/" + rows.length;
  document.getElementById("resultScoreP").classList.remove('hidden');

  sendAnswer("Итог: " + score + " баллов из " + rows.length);
}

function sendAnswer(answer) {
  var answerInput = document.getElementById('lessonanswer-answer_text');
  answerInput.innerText = answer;
  var sendButton = document.getElementsByName('send-answer')[0];
  sendButton.click();
}