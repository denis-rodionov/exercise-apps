var checkButton = document.getElementById("checkResult");

setWordsDraggable(true);

checkButton.onclick = function() {
  var rightCount = 0;
  var gaps = document.getElementsByClassName('gap');
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
  document.getElementById("result").innerText = "Result: " + rightCount + " / " + gaps.length;
}

function freeze() {
	setWordsDraggable(false);
  
  checkButton.classList.add('disabled');
}

function setWordsDraggable(value) {
	var words = document.getElementsByClassName('word');
  var i;
  for (i = 0; i < words.length; i++) {
    words[i].draggable = value;
  }
}

document.addEventListener("dragstart", function(event) {
  event.dataTransfer.setData("Text", event.target.id);
  event.target.style.opacity = "0.01";
});

// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(event) {
  if (event.target.classList.contains('gap') && !event.target.classList.contains('filled')) {
    event.target.classList.add('drag')
  }
});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
  if (event.target.classList.contains('gap')) {
    event.target.classList.remove('drag');
  }
});

document.addEventListener("dragend", function(event) {
  fixGaps();
  fixWords();
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
  event.preventDefault();
  var wordId = event.dataTransfer.getData("Text");
  var word = document.getElementById(wordId);

  if (event.target.classList.contains('gap') && !event.target.classList.contains('filled')) {
    var gap = event.target;
    gap.appendChild(word);
    gap.classList.remove('drag');
    gap.classList.add('filled')
  }

  if (event.target.classList.contains('words')) {
    event.target.appendChild(word);
  }
});

/**
 * Fixing gaps to avoid inconsisten state
 */
function fixGaps() {
  var gaps = document.getElementsByClassName('gap');
  var i;
  for (i = 0; i < gaps.length; i++) {
    if (!gaps[i].hasChildNodes()) {
      gaps[i].className = 'gap';
    }
  }
}

/**
 * Fixing gaps to avoid inconsisten state
 */
function fixWords() {
  var words = document.getElementsByClassName('word');
  var i;
  for (i = 0; i < words.length; i++) {
    words[i].style.opacity = "1";
  }
}

// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
  event.preventDefault();
});
