// frontend/index.js
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.game-button');
    const resultText = document.querySelector('.result-text');
    const scoreText = document.querySelector('.score-text');
    const historyList = document.querySelector('.history-list');
    const resetButton = document.querySelector('.reset-button');
    const playerHand = document.querySelector('.player-hand i');
    const computerHand = document.querySelector('.computer-hand i');

    let playerScore = 0;
    let computerScore = 0;
    let history = [];
    let animationInProgress = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (animationInProgress) return;
            
            const playerChoice = button.getAttribute('data-choice');
            playGame(playerChoice);
        });
    });

    function playGame(playerChoice) {
        animationInProgress = true;
        const computerChoice = getComputerChoice();
        
        // Reset hands to rock for animation
        playerHand.className = 'fas fa-hand-rock';
        computerHand.className = 'fas fa-hand-rock';
        
        // Add shake animation
        const hands = document.querySelectorAll('.hand');
        hands.forEach(hand => {
            hand.classList.add('shake');
        });
        
        // After shake animation, show the choices
        setTimeout(() => {
            hands.forEach(hand => {
                hand.classList.remove('shake');
            });
            
            // Update hands to show choices
            playerHand.className = `fas fa-hand-${playerChoice}`;
            computerHand.className = `fas fa-hand-${computerChoice}`;
            
            const result = determineWinner(playerChoice, computerChoice);
            updateScore(result);
            updateHistory(playerChoice, computerChoice, result);
            displayResults(result, playerChoice, computerChoice);
            
            animationInProgress = false;
        }, 500);
    }

    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        return choices[Math.floor(Math.random() * choices.length)];
    }

    function determineWinner(player, computer) {
        if (player === computer) {
            return 'draw';
        }
        if (
            (player === 'rock' && computer === 'scissors') ||
            (player === 'paper' && computer === 'rock') ||
            (player === 'scissors' && computer === 'paper')
        ) {
            return 'player';
        }
        return 'computer';
    }

    function updateScore(result) {
        if (result === 'player') {
            playerScore++;
        } else if (result === 'computer') {
            computerScore++;
        }
        scoreText.textContent = `Player: ${playerScore} - Computer: ${computerScore}`;
    }

    function updateHistory(player, computer, result) {
        const outcome = result === 'draw' ? 'Draw' : result === 'player' ? 'Player Wins' : 'Computer Wins';
        const historyItem = `Player: ${player}, Computer: ${computer} - ${outcome}`;
        history.push(historyItem);
        
        // Clear existing history display
        historyList.innerHTML = '';
        
        // Add each history item as a list item with appropriate class
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            
            if (item.includes('Player Wins')) {
                li.classList.add('history-win');
            } else if (item.includes('Computer Wins')) {
                li.classList.add('history-lose');
            } else {
                li.classList.add('history-draw');
            }
            
            historyList.prepend(li); // Add newest at top
        });
    }

    function displayResults(result, player, computer) {
        const outcome = result === 'draw' ? 'It\'s a draw!' : result === 'player' ? 'You win!' : 'You lose!';
        resultText.textContent = `You chose ${player}, computer chose ${computer}. ${outcome}`;
    }

    resetButton.addEventListener('click', () => {
        playerScore = 0;
        computerScore = 0;
        history = [];
        scoreText.textContent = 'Player: 0 - Computer: 0';
        historyList.innerHTML = '';
        resultText.textContent = 'Choose an option to start the game';
        playerHand.className = 'fas fa-hand-rock';
        computerHand.className = 'fas fa-hand-rock';
    });
});