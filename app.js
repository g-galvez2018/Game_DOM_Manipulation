/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let roundScore, activePlayer


const init = () =>{  
  const scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  hideDice();
  resetCurrentScore();
  resetPlayerScore();
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  
}



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
  scores = [0,0];   
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
}


// Begin Game
  init();


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

  //Update UI
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

  //Check if player won game
  if (scores[activePlayer]>= 20){
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    hideDice();
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
  } else {
    //Next Player
    nextPlayer();
  } 
  
})

// Add event for NEW GAME button

document.querySelector('.btn-new').addEventListener('click', init);







