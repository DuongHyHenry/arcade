// Grabbing all the elements we need from the HTML and setting up some game variables
let restartButton = document.getElementById("restart");
let drawButton = document.getElementById("draw");
let bustText = document.getElementById("bustBanner");
let winText = document.getElementById("winBanner");
let loseText = document.getElementById("loseBanner");
let stopButton = document.getElementById("stop");
let CPUValue = 0;
let currentValue = 0;
let gameActive = true;

// Defining the suits and ranks of the cards, and creating the deck
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
const deck = [];

// Building the deck by combining suits and ranks
for (const suit of suits) {
    for (const rank of ranks) {
        const card = {
            suit: suit,
            rank: rank,
        };
        deck.push(card);
    }
}

// Event listener for the restart button
restartButton.addEventListener("click", function(e) {
    // Clearing card containers and resetting the deck
    const cardContainer = document.getElementById('cardContainer');
    const CPUCardContainer = document.getElementById('CPUCardContainer');
    
    cardContainer.innerHTML = '';
    CPUCardContainer.innerHTML = '';
    deck.length = 0;
    
    // Rebuilding the deck
    for (const suit of suits) {
        for (const rank of ranks) {
            const card = {
                suit: suit,
                rank: rank,
                image: `images/${rank}Of${suit}.jpg`
            };
            deck.push(card);
        }
    }

    // Hiding banners and resetting values before restarting the game
    bustText.classList.add("hidden");
    winText.classList.add("hidden");
    loseText.classList.add("hidden");
    CPUValue = 0;
    currentValue = 0;
    gameActive = true;

});

// Event listener for the stop button, representing CPU's turn
stopButton.addEventListener("click", function(e) {
    if (gameActive === true) {
        // CPU keeps drawing cards until its total is higher than the player's
        while (CPUValue <= currentValue) {
            const cardContainer = document.getElementById('CPUCardContainer');

            const randomIndex = getRandomInt(deck.length);
            const drawnCard = deck.splice(randomIndex, 1)[0];
            
            const newCard = document.createElement('div');
            newCard.classList.add('card');
            
            newCard.style.backgroundImage = `url('images/${drawnCard.rank}Of${drawnCard.suit}.jpg')`;
        
            let cardNumber = 0;
            
            switch (drawnCard.rank) {
                case "2": 
                    cardNumber = 2;
                    break;
                case "3": 
                    cardNumber = 3;
                    break;
                case "4": 
                    cardNumber = 4;
                    break;
                case "5": 
                    cardNumber = 5;
                    break;
                case "6": 
                    cardNumber = 6;
                    break;
                case "7": 
                    cardNumber = 7;
                    break;
                case "8": 
                    cardNumber = 8;
                    break;
                case "9": 
                    cardNumber = 9;
                    break;
                case "10": 
                    cardNumber = 10;
                    break;
                case "Ace": 
                    cardNumber = 1;
                    break;
                case "Jack": 
                    cardNumber = 10;
                    break;
                case "Queen": 
                    cardNumber = 10;
                    break;
                case "King": 
                    cardNumber = 10;
                    break;
            }
        
            CPUValue = CPUValue + cardNumber;
            cardContainer.appendChild(newCard);

            // Check if CPU busts or wins
            if (CPUValue > 21) {
                winText.classList.toggle("hidden");
                gameActive = false;
            } else if (CPUValue > currentValue) {
                loseText.classList.toggle("hidden");
                gameActive = false;
            }
        }
    }
    
});

// Event listener for the draw button, representing player's turn
drawButton.addEventListener("click", function(e) {
    if (gameActive === true) {
        const cardContainer = document.getElementById('cardContainer');
        
        const randomIndex = getRandomInt(deck.length);
        const drawnCard = deck.splice(randomIndex, 1)[0];
        
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        
        newCard.style.backgroundImage = `url('images/${drawnCard.rank}Of${drawnCard.suit}.jpg')`;

        let cardNumber = 0;

        switch (drawnCard.rank) {
            case "2": 
                cardNumber = 2;
                break;
            case "3": 
                cardNumber = 3;
                break;
            case "4": 
                cardNumber = 4;
                break;
            case "5": 
                cardNumber = 5;
                break;
            case "6": 
                cardNumber = 6;
                break;
            case "7": 
                cardNumber = 7;
                break;
            case "8": 
                cardNumber = 8;
                break;
            case "9": 
                cardNumber = 9;
                break;
            case "10": 
                cardNumber = 10;
                break;
            case "Ace": 
                cardNumber = 1;
                break;
            case "Jack": 
                cardNumber = 10;
                break;
            case "Queen": 
                cardNumber = 10;
                break;
            case "King": 
                cardNumber = 10;
                break;
        }

        currentValue = currentValue + cardNumber;

        // Check if player busts
        if (currentValue > 21) {
            bustText.classList.toggle("hidden");
            gameActive = false;
        }

        cardContainer.appendChild(newCard);
    }
});

// Function to generate random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
