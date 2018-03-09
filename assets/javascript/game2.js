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
    if (this.moves == 0) { return; }
    if (!(this.isKeyAlpha(key))) { return; };
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
      //add animation class, then remove after delay
      $("#moves-left").addClass("moves-flash");
      setTimeout(function () {
        $("#moves-left").removeClass("moves-flash");
      }, 1000);
      //console.log(this.moves + " moves left");
      //console.log(game.guesses + " guessed so far");
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
    } else {
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
    console.log(this.moves);
    if (!(this.moves == 0)) {
      setTimeout(function () {
        $("#canvas").removeClass("moves-flash");
      }, 1000);
    } else {
      $("#canvas").css("background-color", "red");
    }
  },
  isKeyAlpha: function (key) {
    //console.log("checkin if key is alpha");
    if ((key.length === 1) && (key.match(/[a-z]|[A-Z]/))) {
      return true;
    } else { return false; }
  },
  getKeystrokes: function () {
    document.onkeyup = function (e) {
      this.handleMove(e.key);
      if (this.moves == 0) {
        this.showModal();
      }
      this.render();
    }
  },
  startGame: function () {
    this.chooseWord();
    this.getKeystrokes();
    setTimeout(function () {
      $("#banner").addClass("lift-banner");
    }, 1000);
    setTimeout(function () {
      $("#banner").addClass("hidden");
    }, 2000);
  },
  drawLetters: function () {
    var html = "<div class=\"\">";
    for (i = 0; i < this.word.length; i++) {
      html = html + "<div id=\"charDiv" + i + "\" class=\"charDiv\"></div>";
    }
    html = html + "</div>";
    //console.log(html);
    charPlaceholders.innerHTML = html;
  },
  showModal: function () {
    console.log("show modal");
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
  },
  render: function () {
    console.log(this.moves);
    movesLeft.textContent = this.moves;
    this.drawLetters();
    keysPressed.textContent = this.guesses;
    this.drawMove();
  }
}

var movesLeft = document.getElementById("moves-left");
movesLeft.textContent = 10;

var charPlaceholders = document.getElementById("char-placeholders");

var keysPressed = document.getElementById("keys-pressed");

var modal = document.getElementById("gameover-modal");
var doneBtn = document.getElementById("done-button");
var moreBtn = document.getElementById("more-button");

var wordModal = document.getElementById("word");
wordModal.textContent = game.word;
console.log(game.word);
var outcome = document.getElementById("outcome");
outcome.textContent = " got hung!";

game.startGame();
document.onkeyup = function (e) {
  game.evaluateMove(e.key);
  if (game.moves == 0) {
    game.showModal();
  }
  game.render();

}
