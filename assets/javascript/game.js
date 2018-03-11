var gameIndex = 0;

var dictionary = {
  words: [
    "Bimp",
    "Bramp",
    "Priest",
    "Toger",
    "Nosewolf",
    "Lort",
    "Bruise",
    "Whitey",
    "Card",
    "Mary",
    "Glen",
    "Den",
    "Ernie",
    "Lorraine",
    "Chief",
    "Bap"
  ],
  //words and bios should be same length
  //indices should correspond
  bios: [
    "Bimp suffered at the hands of the togers, and suffered mightily for Toger herself",
    "Bramp never thought marry a girl like Toger, so no wonder the engagement didn't last",
    "Priest took care of the church and mended things between Bruise and Chief, but he also summoned the Nosewolf",
    "Toger was an indigenous toger from Iowa, who met an unfortunate fate at the hands of the Nosewolf",
    "What Nosewolf did to Toger was wrong, but remember he was under the curse of longing",
    "Lort was secretly filmed by Den while she nursed a baby which wasn't hers",
    "Bruise vowed to bridge the gap between the Black and Blue Lives Matter movements",
    "Whitey volunteered to carry Bruise's baby in order to advance his post-racial cause",
    "Card spoke against Priest, to none other than Pope, because he was jealous of what Priest saw",
    "Mary denied the first couple conceived by Jones, and begat the Nosewolf",
    "Glen suffered from dementia as he and Den co-wrote Bimpernent, a story based on Bimp and Ern",
    "Den consented to Jane's request that he film Lort nurse her baby, and paid the price",
    "Ernie survived the togers, but he wasn't the same afterward, until his reunion with Bimp, which didn't last",
    "Lorraine was accidentally killed by Den, or so he and Glen thought, and Glen was glad about it until she came back",
    "Chief occasionally dreamt he was a woman who was sexually abused by a man he arrested",
    "Bap happened to be at Priest's church when he had a vision, which spurred the group into heroic action"
    ,
  ],
  moves: 10,
}

var game = {
  word: '',
  goodguesses: [''],
  bio: '',
  key: '',
  rnd: '',
  wonGame: '',
  chooseWord: function () {
    this.rnd = Math.floor(Math.random() * Math.floor(dictionary.words.length));
    this.word = dictionary.words[this.rnd];
    this.bio = dictionary.bios[this.rnd];
    this.render();
  },
  moves: dictionary.moves,
  badguesses: [],
  evaluateMove: function (key) {
    //if 0 moves, stop
    if (this.moves == 0) {
      return;
    }
    //if not alpha, stop
    if (!(this.isKeyAlpha(key) == true)) {
      return;
    };
    //if in var word, and already guessed, stop
    if (this.goodguesses.indexOf(this.key) > -1){
      //do nothing
      return;
    }
    for (i=0; i<this.word.length; i++){
      if (key.toLowerCase() == this.word.charAt(i).toLowerCase()){
        this.render();
        return;
      }
    }

    var isNew = true;
    for (i = 0; i < this.badguesses.length; i++) {
      if (key == this.badguesses[i]) {
        //console.log(key + " already guessed");
        isNew = false;
      } else { }
    };
    if (isNew) {
      this.badguesses.push(key);
      this.moves--;
      if (this.moves == 0) {
        this.wonGame = false;
        this.gameover();
      }

      //add animation class, then remove after delay
      $("#moves-left").addClass("moves-flash");
      setTimeout(function () {
        $("#moves-left").removeClass("moves-flash");
      }, 1000);
      //console.log(this.moves + " moves left");
      //console.log(game.guesses + " guessed so far");
    }
    this.render();
  },
  writeLetters: function () {
    //loop through new divs, populate guessed chars
    for (i = 0; i < this.word.length; i++) {
      if (this.key.toLowerCase() == this.word.charAt(i).toLowerCase()) {
        $("#charDiv" + i).text(this.key);
        this.goodguesses.push(this.key);
        console.log("goodguesses length:" + this.goodguesses.length);
        console.log(this.goodguesses);
        console.log("word length:" + this.word.length);
        console.log(this.word);
        if ((this.goodguesses.length-1) == this.word.length){
          this.gameover();
        }
      }
    }
  },
  drawMove: function () {
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.lineWidth = 4;
    if (this.moves == 10) {
      //nothin 
    };
    if (this.moves == 9) {
      context.moveTo(90, 190);
      context.lineTo(80, 175);
      context.stroke();
    } else if (this.moves == 8) {
      context.moveTo(80, 175);
      context.lineTo(75, 100);
      context.stroke();
    } else if (this.moves == 7) {
      context.moveTo(75, 100);
      context.lineTo(70, 175);
      context.stroke();
    } else if (this.moves == 6) {
      context.moveTo(70, 175);
      context.lineTo(60, 190);
      context.stroke();
    } else if (this.moves == 5) {
      context.moveTo(75, 100);
      context.lineTo(75, 50);
      context.stroke();
    } else if (this.moves == 4) {
      context.moveTo(75, 60);
      context.lineTo(60, 140);
      context.stroke();
    } else if (this.moves == 3) {
      context.moveTo(75, 60);
      context.lineTo(90, 140);
      context.stroke();
    } else if (this.moves == 2) {
      context.moveTo(60, 140);
      context.lineTo(57, 150);
      context.stroke();
      context.moveTo(60, 140);
      context.lineTo(60, 150);
      context.stroke();
      context.moveTo(60, 140);
      context.lineTo(63, 150);
      context.stroke();
    } else if (this.moves == 1) {
      context.moveTo(90, 140);
      context.lineTo(87, 150);
      context.stroke();
      context.moveTo(90, 140);
      context.lineTo(90, 150);
      context.stroke();
      context.moveTo(90, 140);
      context.lineTo(93, 150);
      context.stroke();
    } else if (this.moves == 0) {
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
    } else {
      //nothing 
    };

    //make canvas flash red after any move
    //and remain red at gameover
    $("#canvas").addClass("moves-flash");
    if (!(this.moves == 0)) {
      setTimeout(function () {
        $("#canvas").removeClass("moves-flash");
      }, 1000);
    } else {
      $("#canvas").css("background-color", "red");
    }

  },
  isKeyAlpha: function (key) {
    if ((key.length === 1) && (key.match(/[a-z]|[A-Z]/))) {
      return true;
    } else { return false; }
  },
  clearStuff: function () {
    this.moves = dictionary.moves;
    this.badguesses = [''];
    this.goodguesses = [''];
    //clear canvas
    var c = document.getElementById("canvas");
    var context = c.getContext("2d");
    context.clearRect(0, 0, c.width, c.height);
    $("#canvas").css("background-color", "seashell");
  },
  drawLetters: function () {
    var html = "<div class=\"\">";
    for (i = 0; i < this.word.length; i++) {
      html = html + "<div id=\"charDiv" + i + "\" class=\"charDiv\"></div>";
    }
    html = html + "</div>";
    charPlaceholders.innerHTML = html;
  },
  gameover: function () {
    this.saveToLocalStorage();
    wordModal.textContent = this.word;
    bioModal.textContent = dictionary.bios[this.rnd];
    if (this.moves == 0) {
      outcome.textContent = " got hung!";
    } else {
      outcome.textContent = "lives another day!";
    }
    $("#gameover-modal").css("display", "block");
    var scope = this;
    window.onclick = function (event) {
      if (event.target == moreBtn) {
        modal.style.display = "none";
        scope.startGame();
      }
      else if (event.target == doneBtn) {
        modal.style.display = "none";
        scope.loadFromLocalStorage();
      }
      else if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  },
  saveToLocalStorage: function () {
    //console.log(JSON.stringify(this));
    var n = "game"+(gameIndex);
    localStorage.setItem(n, JSON.stringify(this));
    $("#saved-games").html("");
  },
  guessesToString: function () {
    var str = "";
    for (i = 0; i < this.badguesses.length; i++) {
      str = str + " " + this.badguesses[i];
    }
    return str;
  }
  ,
  render: function () {
    movesLeft.textContent = this.moves;
    keysPressed.textContent = this.guessesToString();
    this.writeLetters();
    this.drawMove();
    //gameover handling
  },
  loadFromLocalStorage: function(){
  for (i = 0; i < localStorage.length; i++) {
    var n = "game"+(i+1); // because gameIndex starts at 1
    var data = JSON.parse(localStorage.getItem(n));
    //console.log(data);
    //console.log(data.word + " was hung after you guessed" + data.guesses);
    var div = $("<div>");
    div.attr(n);
    div.addClass("row game-data");
    var outcome = '';    
    if ((data.moves == 0)){
      outcome = " got hung!";
    } else { 
      outcome = " survived, with " + data.moves + " guesses to spare!";
    }
    div.html("<h3>" + data.word + outcome + "</h3>");
    $("#saved-games").append(div);
  }
},
  startGame: function () {
    gameIndex++;
    this.clearStuff();
    this.loadFromLocalStorage();
    this.chooseWord();
    console.log(this.word);
    this.drawLetters();
    setTimeout(function () {
      $("#banner").addClass("lift-banner");
    }, 1000);
    setTimeout(function () {
      $("#banner").addClass("hidden");
    }, 2000);
    var scope = this;
    document.onkeyup = function (e) {
      scope.key = e.key;
      game.evaluateMove(scope.key);
    }
  }
}

var movesLeft = document.getElementById("moves-left");
movesLeft.textContent = dictionary.moves;

var charPlaceholders = document.getElementById("char-placeholders");

var keysPressed = document.getElementById("keys-pressed");

var modal = document.getElementById("gameover-modal");
var doneBtn = document.getElementById("done-button");
var moreBtn = document.getElementById("more-button");
var wordModal = document.getElementById("word");
var bioModal = document.getElementById("bio");
var outcome = document.getElementById("outcome");

$(document).ready( function (){
game.startGame();
});