//global variables, then objs, then calls

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
    "Bimp's treatment of the Flapjacks was questionable, but might he have been redeemed? First he suffered at the hands of the togers, and then he suffered mightily for Toger herself. Who's to say?",
    "Bramp never thought he'd marry a girl like Toger, so maybe it's no wonder the engagement didn't last. What he did in the kitchen with Lort was wrong, but how could he have known what would happen?",
    "Priest didn't just take care of the church; he seemed to always be there for everyone. He mended things between Bruise and Chief. But he also summoned the Nosewolf with the church-bell tune in E Minor.",
    "Toger was an indigenous toger who was brought back from Iowa by Bramp, and who met an unfortunate fate at the hands of the Nosewolf in a joint moment of ecstasy.",
    "What Nosewolf did to Toger was wrong, but remember: he was under the curse of longing, transformed by Mary's denial of his original advances.",
    "Lort nursed a baby which wasn't hers, but that doesn't mean she deserved to be secretly filmed while nursing, even if it was ultimately arranged by the baby's real mother.",
    "Bruise vowed to bridge the gap between the Blue and Black Lives Matter movements. His means were radical and controversial, but there is no doubt about this: he meant well.",
    "Whitey's real name was Whitney, but that ironic nickname, a product of an honest mistake made by Bruise, made enough sense that it stuck.",
    "Card spoke against Priest, to none other than Pope, ultimately because he was jealous of Priest because of what he did with Toger. Who could blame him?",
    "Mary denied the first couple conceived by Jones, the result of which was the Nosewolf. Ultimately, who could say anything except her whereabouts are unknown. Acounts vary.",
    "Glen's dementia worsened while he and Big Den co-wrote Bimpernent, a story based on Bimp and Ern. He couldn't remember who wrote what, or even who was who. Now wonder he couldn't remember if he killed Lorraine.",
    "Big Den consented to Jane's request that he film Lort while she nursed Jane's baby, and lived to regret how he had abused the opportunity.",
    "Ernie survived the togers, albeit barely, but he wasn't the same afterward. He didn't start to come around until his reunion with Bimp, who was also rescued from the togers. We know why Bimp was down there, but what about Ern?",
    "Lorraine was accidentally killed by Big Den, or so he and Glen thought, and Glen was actually glad about it, until the day she came back.",
    "Chief had done wrong. That he know. He'd been on the job for a long time, and developed some contemptible biases, but doesn't that make it all the more admirable that he embraced Bruise's cause?",
    "Bap happened to be at Priest's church when he had a vision, which spurred various actors into heroic action. But what was a Southern Bap doing thereabouts?."
    ,
  ],
  moves: 10,
}

//TODO: optionally refactor some of these away and use jquery
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

var game = {
  word: '',
  goodguesses: [''],
  bio: '',
  key: '',
  rnd: '',
  chooseWord: function () {
    this.rnd = Math.floor(Math.random() * Math.floor(dictionary.words.length));
    this.word = dictionary.words[this.rnd];
    this.bio = dictionary.bios[this.rnd];
    this.render();
  },
  //theoretically, dictionary val could be modified
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
    if (this.goodguesses.indexOf(this.key) > -1) {
      //do nothing
      return;
    }
    for (i = 0; i < this.word.length; i++) {
      if (key.toLowerCase() == this.word.charAt(i).toLowerCase()) {
        this.render();
        return;
      }
    }
    //if not word and hasn't been guessed, handle 
    if (this.badguesses.indexOf(key) < 0) {
      this.badguesses.push(key);
      this.moves--;
      //add animation class, remove after delay
      $("#moves-left").addClass("moves-flash");
      setTimeout(function () {
        $("#moves-left").removeClass("moves-flash");
      }, 1000);
      //animate canvas after any move
      $("#canvas").addClass("moves-flash");
      if (!(this.moves == 0)) {
        //diff handling for gameover
        setTimeout(function () {
          $("#canvas").removeClass("moves-flash");
        }, 1000);
      }
      if (this.moves == 0) {
        this.gameover();
      }
    }
    this.render();
  },
  writeLetters: function () {
    //loop through new divs, populate guessed chars
    for (i = 0; i < this.word.length; i++) {
      if (this.key.toLowerCase() == this.word.charAt(i).toLowerCase()) {
        $("#charDiv" + i).text(this.key);
        this.goodguesses.push(this.key);
        if ((this.goodguesses.length - 1) == this.word.length) {
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
      context.font = "200px 'Nanum Gothic Coding',monospace ";
      context.fillText("?",30,160);
    };
    if (this.moves < 10) {
      context.clearRect(0, 0, c.width, c.height);
      context.moveTo(90, 190);
      context.lineTo(80, 175);
      context.stroke();
    } 
    if (this.moves < 9) {
      context.moveTo(80, 175);
      context.lineTo(75, 100);
      context.stroke();
    } 
    if (this.moves < 8) {
      context.moveTo(75, 100);
      context.lineTo(70, 175);
      context.stroke();
    } 
    if (this.moves < 7) {
      context.moveTo(70, 175);
      context.lineTo(60, 190);
      context.stroke();
    } 
    if (this.moves < 6) {
      context.moveTo(75, 100);
      context.lineTo(75, 50);
      context.stroke();
    } 
    if (this.moves < 5) {
      context.moveTo(75, 60);
      context.lineTo(60, 140);
      context.stroke();
    } 
    if (this.moves < 4) {
      context.moveTo(75, 60);
      context.lineTo(90, 140);
      context.stroke();
    } 
    if (this.moves < 3) {
      context.moveTo(60, 140);
      context.lineTo(57, 150);
      context.stroke();
      context.moveTo(60, 140);
      context.lineTo(60, 150);
      context.stroke();
      context.moveTo(60, 140);
      context.lineTo(63, 150);
      context.stroke();
    } 
    if (this.moves < 2) {
      context.moveTo(90, 140);
      context.lineTo(87, 150);
      context.stroke();
      context.moveTo(90, 140);
      context.lineTo(90, 150);
      context.stroke();
      context.moveTo(90, 140);
      context.lineTo(93, 150);
      context.stroke();
    } 
    if (this.moves == 0) {
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
      //grim red background on gameover
      $("#canvas").css("background-color", "red");
    } else {
      //nothin
    };
  },
  isKeyAlpha: function (key) {
    if ((key.length === 1) && (key.match(/[a-z]|[A-Z]/))) {
      return true;
    } else { return false; }
  },
  //prep new game
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
    this.saveGame();
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
        scope.loadStoredGames();
        window.location.href = "#previous-games";
      }
      else if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  },
  saveGame: function () {
    //console.log(JSON.stringify(this));
    var n = "game" + (gameIndex);
    localStorage.setItem(n, JSON.stringify(this));
    $("#saved-games").html("");
  },
  guessesToString: function () {
    var str = "";
    for (i = 0; i < this.badguesses.length; i++) {
      str = str + " " + this.badguesses[i];
    }
    return str;
  },
  render: function () {
    movesLeft.textContent = this.moves;
    keysPressed.textContent = this.guessesToString();
    this.writeLetters();
    this.drawMove();
    //gameover handling
  },
  loadStoredGames: function () {
    $("#saved-games").text("Previous games:");
    for (i = 0; i < localStorage.length; i++) {
      var n = "game" + (i + 1); // because gameIndex starts at 1
      var data = JSON.parse(localStorage.getItem(n));
      //console.log(data.word);
      var div = $("<div>");
      div.attr(n);
      div.addClass("row game-data");
      var outcome = '';
      if ((data.moves == 0)) {
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
    this.loadStoredGames();
    this.chooseWord();
    //console.log(this.word);
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

$(document).ready(function () {
  game.startGame();
});