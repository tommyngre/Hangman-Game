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

function isUnique(key){
  for (i=0; i<keysPressedAry.length; i++){
    if (key == keysPressedAry[i]){
      console.log(hi);
      return false;
    }
  }
  return true;
}

var keysPressed = document.getElementById("keys-pressed");

document.onkeyup = function (e) {
  lastKeyPress.textContent = e.key;
  if (isLetter(e.key)){
    if (isUnique(e.key)){
      keysPressed.textContent = "";
      keysPressedAry.push(e.key);
      keysPressed.innerText = keysPressedToString(keysPressedAry);
      //console.log(keysPressedAry);  
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


// console.log(placeholders);
var charPlaceholders = document.getElementById("char-placeholders");
charPlaceholders.innerHTML = htmlStr(charCount);

var numLetters = document.getElementById("num-letters");
numLetters.textContent = charCount;

