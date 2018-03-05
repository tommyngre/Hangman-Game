var words = ["Bimp", "Bramp", "Priest"];

var word = words[Math.floor(Math.random() * Math.floor(words.length))];
//console.log(word);

var charCount = word.length;
//console.log(word + " is " + charCount + " chars");

// build array of chars in var word
var charAry = new Array;
charAry = buildCharAry(word);
function buildCharAry(word) {
  for (i = 0; i < charCount; i++) {
    charAry.push(word.charAt(i));
    //console.log(charAry);
  }
  return charAry;
}

//add keys pressed by user to array
var keysPressedAry = new Array;

var lastKeyPress = document.getElementById("last-key-press");

function keysPressedToString(keysPressedAry) {
  keysPressedString = "";
  for (i = 0; i < keysPressedAry.length; i++) {
    keysPressedString = keysPressedString + keysPressedAry[i] + " ";
  }
  //console.log(keysPressedString);
  return keysPressedString;
}

var keysPressedString = "";

function isLetter(key) {
  //if one char
  if ((key.length === 1) && (key.match(/[a-z]|[A-Z]/))) {
    return true;
  } else { return false; }
}

function isUnique(key) {
  for (i = 0; i < keysPressedAry.length; i++) {
    if (key == keysPressedAry[i]) {
      //console.log(key + " key pressed already");
      return false;
    }
  }
  return true;
}

var keysPressed = document.getElementById("keys-pressed");
var eKey = "";

function updateMoves() {
  if (parseInt(movesLeft.textContent) > 1) {
    movesLeft.textContent = movesLeft.textContent - 1;
    $("#moves-left").addClass("moves-flash");
    //remove animation class *after* animation runs
    setTimeout(function () {
      $("#moves-left").removeClass("moves-flash");
    }, 1000);
    //update graphic
  } else {
    //handle game over scenario
    movesLeft.textContent = 0;
    console.log("game over");
    $("#moves-left").addClass("final-moves-flash");
    //update graphic
  }
}

function isInWord(key){
  for (i=0; i<charAry.length; i++){
    if ((key == charAry[i]) || (key.toUpperCase() == charAry[i])){
      //console.log(key + " appears in " + word)
      var charInWord = document.getElementById("charDiv"+i);
      charInWord.textContent = key;
    }
  }
}

document.onkeyup = function (e) {
  lastKeyPress.textContent = e.key;
  eKey = e.key.toLowerCase();
  //check if keystroke is a letter
  if (isLetter(eKey)) {
    //check if keystroke is new
    if (isUnique(eKey)) {
      //check if key is in charAry
      isInWord(eKey);
      keysPressed.textContent = "";
      keysPressedAry.push(eKey);
      keysPressed.innerText = keysPressedToString(keysPressedAry);
      updateMoves();
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

var movesLeft = document.getElementById("moves-left");
movesLeft.textContent = 10;

var charPlaceholders = document.getElementById("char-placeholders");
charPlaceholders.innerHTML = htmlStr(charCount);

var numLetters = document.getElementById("num-letters");
numLetters.textContent = charCount;