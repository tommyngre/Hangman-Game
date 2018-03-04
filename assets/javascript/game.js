var words = ["Bimp", "Bramp"];

var word = words[Math.floor(Math.random() * Math.floor(words.length))];
//console.log(word);

var charCount = word.length;
console.log(word + " is " + charCount + " chars");

var lastKeyPress = document.getElementById("last-key-press");

document.onkeyup = function(e){
  lastKeyPress.textContent = e.key;  
};

function htmlStr(charCount){
  var str = "<div class=\"\">";  
  for (i=0; i<charCount; i++){
    str = str + "<div id=\"charDiv" + i +"\" class=\"charDiv\"></div>";
  }
  str = str + "</div>";
  return str;
};

// console.log(placeholders);
var charPlaceholders = document.getElementById("char-placeholders");
charPlaceholders.innerHTML = htmlStr(charCount);

var numLetters = document.getElementById("num-letters");
numLetters.textContent = charCount;