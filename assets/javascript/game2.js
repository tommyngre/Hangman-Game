var game = {
  words: [
    "Bimp", "Bramp", "Priest", "Toger",
    "Nosewolf", "Lort", "Bruise", "Whitey",
    "Card", "Mary", "Glen", "Den", "Ernie",
    "Lorraine", "Chief"
  ],
  word: '',
  wordChars: [],
  buildWordChars: function () {
    //console.log("buildWordChars: " + this.word);
    for (i = 0; i < this.word.length; i++) {
      this.wordChars.push(this.word.charAt(i));
      //console.log(this.wordChars);
    }
  },
  chooseWord: function () {
    this.word = this.words[Math.floor(Math.random() * Math.floor(this.words.length))];
    this.buildWordChars();
  },
  moves: 10,
  guesses: [],
  evaluateMove: function (key) {
    var isNew = true;
    for (i = 0; i < this.guesses.length; i++) {
      if (key == this.guesses[i]) {
        //console.log(key + " already guessed");
        isNew = false;
      } else { }
    };
    if (isNew) {
      this.guesses.push(key);
      this.moves--;
      console.log(this.moves + " moves left");
      console.log(game.guesses + " guessed so far");
    }
  },
  startGame: function () {
    this.chooseWord();
    setTimeout(function () {
      $("#banner").addClass("lift-banner");
    }, 1000);
    setTimeout(function () {
      $("#banner").addClass("hidden");
    }, 2000);
  },
  showModal: function () {
    console.log("here");
    $("#gameover-modal").css("display", "block");
    window.onclick = function (event) {
      if (event.target == moreBtn) {
        modal.style.display = "none";
        //console.log("keep hangin!");
        //figure out how to reset things
      }
      else if (event.target == doneBtn) {
        modal.style.display = "none";
        //console.log("done hangin");
      }
      else if (event.target == modal) {
        modal.style.display = "none";
        console.log("modal");
      }
    }    
  }
}

var modal = document.getElementById("gameover-modal");
var doneBtn = document.getElementById("done-button");
var moreBtn = document.getElementById("more-button");

game.startGame();
document.onkeyup = function (e) {
  game.evaluateMove(e.key);
  if (game.moves == 0) {
    game.showModal();
  }
}
