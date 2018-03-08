var words = [
  "Bimp", "Bramp", "Priest", "Toger",
  "Nosewolf", "Lort", "Bruise", "Whitey",
  "Card", "Mary", "Glen", "Den", "Ernie",
  "Lorraine", "Chief"
];

//word = index of words array
var word = words[Math.floor(Math.random() * Math.floor(words.length))];
//chars in word
var charCount = word.length;
//array of chars in var word
var charAry = new Array;
charAry = buildCharAry(word);
function buildCharAry(word) {
  for (i = 0; i < charCount; i++) {
    charAry.push(word.charAt(i));
  }
  return charAry;
}

//add keys pressed by user to array
var keysPressedAry = new Array;

var lastKeyPress = document.getElementById("last-key-press");

//returns keysPressedAry as a string 
function keysPressedToString(keysPressedAry) {
  keysPressedString = "";
  for (i = 0; i < keysPressedAry.length; i++) {
    keysPressedString = keysPressedString + keysPressedAry[i] + " ";
  }
  return keysPressedString;
}

var keysPressedString = "";

//check if key pressed is an alpha
function isLetter(key) {
  //first check if one char (as opposed to "Shift")
  if ((key.length === 1) && (key.match(/[a-z]|[A-Z]/))) {
    return true;
  } else { return false; }
}

//check if key has not been pressed
function isUnique(key) {
  for (i = 0; i < keysPressedAry.length; i++) {
    if (key == keysPressedAry[i]) {
      //console.log(key + " key pressed already");
      return false;
    }
  }
  return true;
}

//draws hangman based on # moves left
function drawMove(movesLeft) {
  //console.log(movesLeft);
  if (movesLeft == parseInt(9)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(90, 190);
    context.lineTo(80, 175);
    context.stroke();
  } else if (movesLeft == parseInt(8)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(80, 175);
    context.lineTo(75, 100);
    context.stroke();
  } else if (movesLeft == parseInt(7)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(75, 100);
    context.lineTo(70, 175);
    context.stroke();
  } else if (movesLeft == parseInt(6)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(70, 175);
    context.lineTo(60, 190);
    context.stroke();
  } else if (movesLeft == parseInt(5)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(75, 100);
    context.lineTo(75, 50);
    context.stroke();
  } else if (movesLeft == parseInt(4)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(75, 60);
    context.lineTo(60, 140);
    context.stroke();
  } else if (movesLeft == parseInt(3)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(75, 60);
    context.lineTo(90, 140);
    context.stroke();
  } else if (movesLeft == parseInt(2)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(60, 140);
    context.lineTo(57, 150);
    context.stroke();
    context.moveTo(60, 140);
    context.lineTo(60, 150);
    context.stroke();
    context.moveTo(60, 140);
    context.lineTo(63, 150);
    context.stroke();
  } else if (movesLeft == parseInt(1)) {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.moveTo(90, 140);
    context.lineTo(87, 150);
    context.stroke();
    context.moveTo(90, 140);
    context.lineTo(90, 150);
    context.stroke();
    context.moveTo(90, 140);
    context.lineTo(93, 150);
    context.stroke();
  } else {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    context.beginPath();
    context.ellipse(90, 38, 20, 10, 155 * Math.PI / 180, 0, 2 * Math.PI);
    context.stroke();
    //twice to thicken line
    context.beginPath();
    context.ellipse(90, 38, 20, 10, 155 * Math.PI / 180, 0, 2 * Math.PI);
    context.stroke();
    //noose
    context.moveTo(75, 0);
    context.lineTo(75, 38);
    context.stroke();
    context.beginPath();
    context.ellipse(75, 55, 1, 3, 90 * Math.PI / 180, 0, 2 * Math.PI);
    context.stroke();
    context.beginPath();
    context.ellipse(75, 58, 1, 3, 90 * Math.PI / 180, 0, 2 * Math.PI);
    context.stroke();
  }
  //remove animation class *after* animation runs
  $("#canvas").addClass("moves-flash");
  //gameover handling
  if (!(movesLeft == 0)) {
    setTimeout(function () {
      $("#canvas").removeClass("moves-flash");
    }, 1000);
  } else {
    $("#canvas").css("background-color", "red");

  }

}

//sets gameover modal to display
function showModal() {
  modal.style.display = "block";
}

//updates game after valid keystroke
function updateMoves() {
  var continueGame = true;
  movesLeft.textContent = movesLeft.textContent - 1;
  //first check if gameover
  if (movesLeft.textContent == 0) {
    $("#moves-left").addClass("final-moves-flash");
    drawMove(0);
    showModal();
    continueGame = false;
  } else {
    //add animation class, then remove after delay
    $("#moves-left").addClass("moves-flash");
    setTimeout(function () {
      $("#moves-left").removeClass("moves-flash");
    }, 1000);
    //draw hangman
    drawMove(parseInt(movesLeft.textContent));
  }
  return continueGame;
}

//checks if keypress is in word
function isInWord(key) {
  var inWord = false;
  for (i = 0; i < charAry.length; i++) {
    if ((key == charAry[i]) || (key.toUpperCase() == charAry[i])) {
      //console.log(key + " appears in " + word)
      var charInWord = document.getElementById("charDiv" + i);
      charInWord.textContent = key;
      inWord = true;
    }
  }
  return inWord;
}

//listen for key-presses
document.onkeyup = function (e) {
  if (movesLeft.textContent == 0) {
    showModal();
    return;
  } else {
    lastKeyPress.textContent = e.key;
    eKey = e.key.toLowerCase();
    //check if keystroke is a letter
    if (isLetter(eKey)) {
      //check if keystroke is new
      if (isUnique(eKey)) {
        //check if key is in charAry
        if (!(isInWord(eKey))) {
          keysPressed.textContent = "";
          keysPressedAry.push(eKey);
          keysPressed.innerText = keysPressedToString(keysPressedAry);
          var done = updateMoves();
        } else {
          //nothin?
        }
      }
    }
  }
};

function htmlStr(charCount) {
  var str = "<div class=\"\">";
  for (i = 0; i < charCount; i++) {
    str = str + "<div id=\"charDiv" + i + "\" class=\"charDiv\"></div>";
  }
  str = str + "</div>";
  return str;
};

/* Code for Modal */
// Adapt to set modal to block when movesLeft = 0 

// Adapt to have yes button that resets game

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == moreButton) {
    modal.style.display = "none";
    console.log("more");
    //figure out how to reset things
  }
  else if (event.target == doneButton) {
    modal.style.display = "none";
    console.log("done");
  }
  else if (event.target == modal) {
    modal.style.display = "none";
    console.log("modal");
  }
}

var keysPressed = document.getElementById("keys-pressed");
var eKey = "";

var movesLeft = document.getElementById("moves-left");
movesLeft.textContent = 10;

setTimeout(function () {
  $("#banner").addClass("lift-banner");
}, 1000);
setTimeout(function () {
  $("#banner").addClass("hidden");
}, 2000);


var charPlaceholders = document.getElementById("char-placeholders");
charPlaceholders.innerHTML = htmlStr(charCount);

var numLetters = document.getElementById("num-letters");
numLetters.textContent = charCount;

var modal = document.getElementById("gameoverModal");
var doneButton = document.getElementById("done-button");
var moreButton = document.getElementById("more-button");