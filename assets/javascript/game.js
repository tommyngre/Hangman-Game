var game = {
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
  ],
  word: '',
  bio: '',
  key: '',
  rnd: '',
  wordChars: [],
  buildWordChars: function () {
    for (i = 0; i < this.word.length; i++) {
      this.wordChars.push(this.word.charAt(i));
    }
  },
  chooseWord: function () {
    this.rnd = Math.floor(Math.random() * Math.floor(this.words.length));
    this.word = this.words[this.rnd];
    this.bio = this.bios[this.rnd];
    this.buildWordChars();
    this.render();
  },
  moves: 10,
  guesses: [],
  evaluateMove: function (key) {
    if (this.moves == 0) {
      return;
    }
    if (!(this.isKeyAlpha(key))) {
      return;
    };
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
  writeLetters: function () {
    //loop through new divs, populate guessed chars
    for (i = 0; i < this.word.length; i++) {
      console.log("key: " + this.key + " charAt: " + this.word.charAt(i));
      if (this.key.toLowerCase() == this.word.charAt(i).toLowerCase()) {
        $("#charDiv" + i).text(this.key);
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
    //$("#canvas").addClass("moves-flash");
  },
  isKeyAlpha: function (key) {
    if ((key.length === 1) && (key.match(/[a-z]|[A-Z]/))) {
      return true;
    } else { return false; }
  },
  startGame: function () {
    this.chooseWord();
    this.drawLetters();
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
    charPlaceholders.innerHTML = html;
  },
  showModal: function () {
    wordModal.textContent = this.word;
    console.log(this.bio[this.rnd]);
    bioModal.textContent = this.bios[this.rnd];
    outcome.textContent = " got hung!";
    $("#gameover-modal").css("display", "block");
    window.onclick = function (event) {
      if (event.target == moreBtn) {
        modal.style.display = "none";
        //figure out how to reset things
      }
      else if (event.target == doneBtn) {
        modal.style.display = "none";
      }
      else if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  },
  guessesToString: function () {
    var str = "";
    for (i = 0; i < this.guesses.length; i++) {
      str = str + " " + this.guesses[i];
    }
    return str;
  }
  ,
  render: function () {
    //console.log(this.moves);
    movesLeft.textContent = this.moves;
    keysPressed.textContent = this.guessesToString();
    this.writeLetters();
    this.drawMove();
    //gameover handling
    if (!(this.moves == 0)) {
      setTimeout(function () {
        $("#canvas").removeClass("moves-flash");
      }, 1000);
    } else {
      $("#canvas").css("background-color", "red");
    }

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
var bioModal = document.getElementById("bio");
var outcome = document.getElementById("outcome");

game.startGame();
document.onkeyup = function (e) {
  game.key = e.key;
  game.evaluateMove(game.key);
  if (game.moves == 0) {
    game.showModal();
  }
  game.render();
}
