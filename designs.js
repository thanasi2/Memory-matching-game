
const cards = document.querySelector('.gameBoard');

const box = document.querySelectorAll('.gridBox');

// Array of widgets
const items = [0x2615, 0x26BD, 0X1F308, 0X1F30E, 0X1F32E, 0X1F369, 0X1F37A, 0X1F40D, 0x2615, 0x26BD, 0X1F308, 0X1F30E, 0X1F32E, 0X1F369, 0X1F37A, 0X1F40D];

var click = 0;
var match = [];
var matchCount = 0;
var roundsWon = 0;
var attempts = 10;

// generates random numbers 0 through 15 and stores in num array
var randomIndex = function(){
  var num = [];
  while (num.length < 16){
    var int = randomNum = Math.floor((Math.random() * 16));
    if (num.indexOf(int) === -1){
      num.push(int);
    }
  }
// assigns emojis from items using num array
  for (var i = 0; i < box.length; i++){
    var rndmInt = num[i].toString();
    box[i].textContent = String.fromCodePoint(items[rndmInt]);
  }
}

//Function adding emojis to cards using num array to randomly assign emojis
randomIndex();

// loop adding event listener to each card
for (var i = 0; i < box.length; i++){
  box[i].addEventListener('click',reveal)
}

// revealing the emoji and "flipping" the card
function reveal(evt){
  evt.target.style.cssText = "background: blue; font-size: 2em; transition: font-size 2s, background 1s; ";
  click += 1;
  var iD = evt.target.id;
  match.push(iD);
  var cardCont1 = match[0];
  var cardCont2 = match[1];
  var cardCntId1 = document.getElementById(cardCont1);
  var cardCntId2 = document.getElementById(cardCont2);
  var rslt1 = cardCntId1.textContent;
  var rslt2 = cardCntId2.textContent;
  var loseWin = document.getElementById('winLose');

  // function to reset board
  var resetBoard = function(){
    matchCount = 0;
    attempts = 10;
    var noMatch = document.getElementById('noMatch');
    noMatch.textContent = attempts;
    var rld = document.querySelectorAll(".gridBox");
    for (var j = 0; j < rld.length; j++){
      rld[j].style.cssText = "background: red; font-size: 0px; transition: font-size 1s,   background 1s;";
    }
    for (var i = 0; i < box.length; i++){
      box[i].textContent = "";
      console.log(box[i].textContent)
    }
    loseWin.textContent = '';
  }

  // checking to see if pairs match
  if (click === 2){
    if (rslt1 === rslt2){
      matchCount += 1;
      match = [];
      click = 0;
      // checking match count to determin of round has been won
      if (matchCount === 8){
        roundsWon += 1;
        loseWin.textContent = 'ROUND WON!';
        var winnings = document.getElementById('winnings');
        winnings.textContent = roundsWon;
        setTimeout(resetBoard, 2000);
        setTimeout(randomIndex, 5000)
      }
    } else if(rslt1 !== rslt2 && attempts === 1){
      loseWin.textContent = 'YOU LOST THIS ROUND!';
      var noMatch = document.getElementById('noMatch');
      noMatch.textContent = attempts;
        setTimeout(resetBoard, 2000);
        setTimeout(randomIndex, 5000);
        click = 0;
        match = [];
    }else if (rslt1 !== rslt2){
      attempts -= 1;
      var noMatch = document.getElementById('noMatch');
      noMatch.textContent = attempts;
      var reset = function(){
        for (var x = 0; x < match.length; x++){
          var rev = document.getElementById(match[x]);
          rev.style.cssText = "background: red; font-size: 0px; transition: font-size 1s, background 1s;";
        }
        click = 0;
        match = [];
      }
      setTimeout(reset, 1000);
    }
  }
}
