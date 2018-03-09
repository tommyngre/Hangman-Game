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
  movesLeft: 10,
  guesses: [],
  logGuess: function (key) {
    this.guesses.push(key);
  },
  evaluateMove: function (key) {
    this.guesses.forEach(function (guess) {
      if (key == guess) {
        console.log(key + " already guessed");
      } else {
        console.log(key + " deduct move");
      }
    })
  },
  startGame: function () {
    this.chooseWord();

  }
}

game.startGame();
document.onkeyup = function (e) {
  game.evaluateMove(e.key);
  game.logGuess(e.key);
  console.log(game.guesses);
}