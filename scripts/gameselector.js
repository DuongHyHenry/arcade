//Assigning variables to the different buttons
let fireball = document.getElementById("fireball");
let blackjack = document.getElementById("blackjack");
let memorygame = document.getElementById("memorygame");

//On click, goes to respective pages
fireball.addEventListener("click", function(e) {
    window.location.href = "fireball.html";
});

blackjack.addEventListener("click", function(e) {
    window.location.href = "blackjack.html";
});

memorygame.addEventListener("click", function(e) {
    window.location.href = "memorygame.html";
});
