// Grab all the cards and store them in the "cards" array
const cards = document.querySelectorAll('.memoryCard');

// Set up variables to keep track of game state
let hasFlippedCard = false; // Tracks if a card has been flipped
let lockBoard = false; // Prevents flipping more than 2 cards at once
let firstCard, secondCard; // Stores the first and second flipped cards

// Function to flip a card when clicked
function flipCard() {
  // If board is locked or card is already flipped, return
  if (lockBoard) return;
  if (this === firstCard) return;

  // Add 'flip' class to show card face
  this.classList.add('flip');

  // If it's the first card flipped, store it and return
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // If it's the second card flipped, store it and check for match
  secondCard = this;
  checkForMatch();
}

// Function to check if two flipped cards match
function checkForMatch() {
  // Compare the dataset identifier of the two cards, original had dataset frameworks which I didn't understand so I changed it to numbers
  let isMatch = firstCard.dataset.identifier === secondCard.dataset.identifier;

  // If they match, disable them, otherwise unflip them
  isMatch ? disableCards() : unflipCards();
}

// Function to disable matched cards
function disableCards() {
  // Remove click event listeners from matched cards
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  // Reset the game board
  resetBoard();
}

// Function to unflip unmatched cards
function unflipCards() {
  // Lock the board to prevent flipping more cards
  lockBoard = true;

  // After a short delay, remove 'flip' class from unmatched cards
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    // Reset the game board
    resetBoard();
  }, 1500); // Adjust the delay time if needed
}

// Function to reset the game state after each round
function resetBoard() {
  // Reset game variables
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Immediately-invoked function expression (IIFE) to shuffle cards on page load
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
})();

// Add click event listener to each card to handle flipping
cards.forEach(card => card.addEventListener('click', flipCard));
