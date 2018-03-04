var words = ["Bimp", "Bramp", "Priest"];

var word = words[Math.floor(Math.random() * Math.floor(words.length))];
//console.log(word);

var charCount = word.length;
//console.log(word + " is " + charCount + " chars");

// build array of chars in var word
var charAry = new Array;
charAry = buildCharAry(word);
function buildCharAry(word){
for (i=0 ; i<charCount; i++){
  charAry.push(word.charAt(i));
  //console.log(charAry);
}
return charAry;
}

//add keys pressed by user to array
var keysPressedAry = new Array;

var lastKeyPress = document.getElementById("last-key-press");

function keysPressedToString(keysPressedAry){
  for (i=0; i<keysPressedAry.length; i++){
  keysPressedString = keysPressedString + keysPressedAry[i];
  }
  console.log(keysPressedString);
  return keysPressedString;
}

var keysPressedString = "";


document.onkeyup = function(e){
  lastKeyPress.textContent = e.key;  
  //check if unique alpha; if so, add to array
  keysPressedAry.push(e.key);
  //console.log(keysPressedAry);

  //print keys pressed array to screen
  keysPressed.textContent = keysPressedToString(keysPressedAry);
};

function htmlStr(charCount){
  var str = "<div class=\"\">";  
  for (i=0; i<charCount; i++){
    str = str + "<div id=\"charDiv" + i +"\" class=\"charDiv\"></div>";
  }
  str = str + "</div>";
  return str;
};

var keysPressed = document.getElementById("keys-pressed");

// console.log(placeholders);
var charPlaceholders = document.getElementById("char-placeholders");
charPlaceholders.innerHTML = htmlStr(charCount);

var numLetters = document.getElementById("num-letters");
numLetters.textContent = charCount;

