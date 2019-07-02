/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
const scores = [0,0];
let roundScore, activePlayer
roundScore = 0;
activePlayer = 0;

const randomNumber = (range) =>{
  return Math.floor(Math.random() * range ) + 1;  
}

const toggleActivePlayer = () => {
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

const nextPlayer = () => {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  resetCurrentScore();  
  toggleActivePlayer();
  hideDice();
}

const hideDice = () => {
  document.querySelector(".dice").style.display = 'none';
}

const resetCurrentScore = () => {
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
}

const resetPlayerScore = () => {
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
}

const resetGame = () => {
  // Hide dice to begin game
  hideDice();
  // Reset current Score
  resetCurrentScore();
  // Reset Player's Scores
  resetPlayerScore();
}

// Begin Game
resetGame();


//Add event to button roll
document.querySelector('.btn-roll').addEventListener('click', function(){
  //1. Random Number
  let dice = randomNumber(6);

  //2. Display the result
  let diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + dice + '.png';

  //3. Update the round score IF the rolled number was not a 1
  if (dice !==1) {
    roundScore += dice;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
  } else {
    nextPlayer();
  }
})

//Add event to HOLD button
document.querySelector('.btn-hold').addEventListener('click', function () {
  // Add CURRENT score to Global score
  scores[activePlayer] += roundScore;
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  //Update the UI
  nextPlayer();
})





