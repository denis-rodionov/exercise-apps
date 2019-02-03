document.getElementById("checkResultsButton").onclick = function() {
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
    
    document.getElementById("resultScore").innerText = rightAnswers + "/" + totalAnswers;
    document.getElementById("resultScoreP").classList.remove('hidden');
    document.getElementById("checkResultsButton").classList.add('disabled');
  
    sendAnswer("Итог: " + rightAnswers + " баллов из " + totalAnswers);
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
    text = text.replace(/(\r\n|\n|\r)/gm,"");
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