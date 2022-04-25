pickerPanel = document.querySelector(".picker");
resultPanel = document.querySelector(".result");
rulesPanel = document.querySelector(".rules");
rulesPanelOverlay = document.querySelector(".overlay");

paperHand = document.querySelector(".paper");
rockHand = document.querySelector(".rock");
scissorsHand = document.querySelector(".scissors");

rulesOpenBtn = document.querySelector("footer .btn");
rulesCloseBtn = document.querySelector(".rules button");
playAgainBtn = document.querySelector(".txt-result button");

scoreDisp = document.querySelector(".score output");
textDisp = document.querySelector(".txt-result");
yourPickDiv = document.querySelector("#your-pick .pick-circle");
botPickDiv = document.querySelector("#bot-pick .pick-circle");

let hand = ["rock", "paper", "scissors"]
let yourPick;
let botPick;
let winner;
let score = 0;

function pick() {
    yourPick = this.classList[0];
    const random = Math.floor(Math.random() * 3);
    botPick = hand[random];
    winner = getWinner(yourPick, botPick);
    displayWinner(yourPick, botPick, winner);
    animateResult();
}
function getWinner(you, bot) {
    return you == "rock" && bot == "paper" ? "bot" :
        you == "rock" && bot == "scissors" ? "you" :
            you == "paper" && bot == "rock" ? "you" :
                you == "paper" && bot == "scissors" ? "bot" :
                    you == "scissors" && bot == "rock" ? "bot" :
                        you == "scissors" && bot == "paper" ? "you" :
                            "draw";
}
function displayWinner(yourPick, botPick, winner) {
    const yourPicked = document
        .querySelector(`.${yourPick}`)
        .cloneNode(true);
    const botPicked = document
        .querySelector(`.${botPick}`)
        .cloneNode(true);
    yourPickDiv.append(yourPicked);
    botPickDiv.append(botPicked);
}
function animateResult() {
    pickerPanel.classList.add("hide");
    setTimeout(() => {
        resultPanel.classList.add("show");
        setTimeout(() => {
            yourPickDiv.childNodes[0].classList.add("scale");
        }, 500)
        setTimeout(() => {
            botPickDiv.childNodes[0].classList.add("scale");
        }, 1000)
        setTimeout(() => {
            textDisp.classList.add("show");
            yourPickDiv.parentElement.classList.add("offset-left");
            botPickDiv.parentElement.classList.add("offset-right");
            if(winner === "you"){
                yourPickDiv.classList.add("winner");
                textDisp.firstElementChild.innerText = "you win"
                score++;
            } else if(winner === "bot"){
                botPickDiv.classList.add("winner");
                textDisp.firstElementChild.innerText = "you lose"
                score--;
            } else {
                textDisp.firstElementChild.innerText = "draw"
            }
            scoreDisp.innerText = score.toString();
        }, 2000)
    }, 500);
}
function playAgain() {
    yourPickDiv.innerHTML = "";
    botPickDiv.innerHTML = "";
    resultPanel.classList.remove("show");
    pickerPanel.classList.remove("hide");
    textDisp.classList.remove("show");
    yourPickDiv.classList.remove("winner");
    botPickDiv.classList.remove("winner");
    yourPickDiv.parentElement.classList.remove("offset-left");
    botPickDiv.parentElement.classList.remove("offset-right");
}

paperHand.addEventListener("click", pick);
rockHand.addEventListener("click", pick);
scissorsHand.addEventListener("click", pick);
playAgainBtn.addEventListener("click", playAgain);

rulesOpenBtn.addEventListener("click", () => {
    rulesPanel.classList.add("show");
    rulesPanelOverlay.style.display = "block";
});
rulesCloseBtn.addEventListener("click", () => {
    rulesPanel.classList.remove("show");
    rulesPanelOverlay.style.display = "none";
});
rulesPanelOverlay.addEventListener("click", () => {
    rulesPanel.classList.remove("show");
    rulesPanelOverlay.style.display = "none";
})