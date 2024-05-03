// Grabbing all the buttons and banners we need for our game
let fireballButton = document.getElementById("fireball");
let shieldButton = document.getElementById("shield");
let chargeButton = document.getElementById("charge");
let restartButton = document.getElementById("restart");

// Getting the boards and texts
let fireballBoard = document.getElementById("fireballBoard");
let shieldBoard = document.getElementById("shieldBoard");
let chargeBoard = document.getElementById("chargeBoard");
let errorText = document.getElementById("errorText");
let winText = document.getElementById("winningBanner");
let loseText = document.getElementById("losingBanner");

// CPU's moves
let CPUFireball = document.getElementById("CPUFireball");
let CPUShield = document.getElementById("CPUShield");
let CPUCharge = document.getElementById("CPUCharge");

// Game status and moves
let gameActive = true;
let currentMove;
let currentMoveString;
let lastMoveString;
let CPUMove;

// Charge counts
let chargeCount = 0;
let CPUChargeCount = 0;

// Function to get a random integer
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Attacks on click
fireballButton.addEventListener("click", function(e) {
    if (gameActive) {
        if (currentMove) {
            currentMove.classList.add("hidden");
            lastMoveString = currentMoveString;
        }
        if (chargeCount > 0) {
            fireballBoard.classList.toggle("hidden");
            currentMove = fireballBoard;
            currentMoveString = "fireball";
            chargeCount = chargeCount - 1;
            CPUHandler();
        }
        else {
            errorText.classList.toggle("hidden");
            currentMove = errorText;
        }
    }
});

// Shields player on click
shieldButton.addEventListener("click", function(e) {
    if(gameActive) {
        if (currentMove) {
            currentMove.classList.add("hidden");
            lastMoveString = currentMoveString;
        }
        gameActive = true;
        shieldBoard.classList.toggle("hidden");
        currentMove = shieldBoard;
        currentMoveString = "shield";
        CPUHandler();
    }
});

// Adds 1 to charge on click
chargeButton.addEventListener("click", function(e) {
    if (gameActive) {
        if (currentMove) {
            currentMove.classList.add("hidden");
            lastMoveString = currentMoveString;
        }    
        gameActive = true;
        chargeBoard.classList.toggle("hidden");
        currentMove = chargeBoard;
        chargeCount = chargeCount + 1;
        currentMoveString = "charge";
        CPUHandler();
    }
});

// Restarts game on click
restartButton.addEventListener("click", function(e) {
    gameActive = true;
    if (currentMove) {
        currentMove.classList.add("hidden");
    }
    if (CPUMove) {
        CPUMove.classList.add("hidden");
    }
    
    if (winText) {
        winText.classList.add("hidden");
    }

    if (loseText) {
        loseText.classList.add("hidden");
    }
    chargeCount = 0;
    CPUChargeCount = 0;
});

// The CPU decides what move to make next
function CPUHandler() {
    if (CPUMove) {
        CPUMove.classList.add("hidden");
    }
    if (CPUChargeCount === 0) {
        let random = getRandomInt(3);
        if (random === 0) {
            CPUMove = CPUCharge;
            CPUChargeCount = CPUChargeCount + 1;
            UpdateCPU();
        } else {
            CPUMove = CPUCharge;
            CPUChargeCount = CPUChargeCount + 1;
            UpdateCPU();
        }
    } else if (lastMoveString === "charge") {
        let random = getRandomInt(2);
        if (random === 0) {
            CPUMove = CPUCharge;
            CPUChargeCount = CPUChargeCount + 1;
            UpdateCPU();
        } else if (CPUChargeCount > 0) {
            let random = getRandomInt(3);
            if (random === 0) {
                CPUMove = CPUShield;
                UpdateCPU();
            } else {
                CPUMove = CPUFireball;
                CPUChargeCount = CPUChargeCount - 1;
                UpdateCPU();
            }
        }
    } else {
        let random = getRandomInt(5);
        if (random === 0 || random === 1) {
            CPUMove = CPUFireball;
            CPUChargeCount = CPUChargeCount - 1;
            UpdateCPU();
        } else if (random === 2 || random === 3) {
            CPUMove = CPUCharge;
            CPUChargeCount = CPUChargeCount + 1;
            UpdateCPU();
        } else {
            CPUMove = CPUShield;
            UpdateCPU();
        }
    }
}

// Update the CPU's move
function UpdateCPU() {
    CPUMove.classList.toggle("hidden");
    if (CPUMove === CPUFireball && currentMove === chargeBoard) {
        loseText.classList.toggle("hidden");
        gameActive = false;
    } 
    else if (currentMove === fireballBoard && CPUMove === CPUCharge) {
        winText.classList.toggle("hidden");
        gameActive = false;
    }
}
