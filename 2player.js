let p1Message = document.getElementById("p1Message");
let p2Message = document.getElementById("p2Message");
let tally = 0;
let held1 = 0;
let textHeld1 = document.getElementById("held1");
let held2 = 0;
let textHeld2= document.getElementById("held2");
let current1 = document.getElementById("current1");
let current2 = document.getElementById("current2");
let rollButton = document.getElementById("rollButton");
let holdButton = document.getElementById("holdButton");
let newGameButton = document.getElementById("newGame");
let image = document.getElementById("image");
let startMessage = document.getElementsByTagName("p")[0];

// Generate Random Number
const genNum = () => {
    return Math.floor((Math.random() * 6) + 1);
};

// Switch player
let player1Turn = true;
let player2Turn = false;
const switchPlayer = () => {
    if (player1Turn) {
        player1Turn = false;
        player2Turn = true;
    } else if (player2Turn) {
        player1Turn = true;
        player2Turn = false;
    }
}

// Roll 1
const roll1 = () => {
    tally = 0;
    startMessage.style.display = "inline-block";
    if (player1Turn) {
        current1.textContent = tally;
        startMessage.textContent = "Next player's turn ▶︎▷▶︎"
    } else if (player2Turn) {
        current2.textContent = tally;
        startMessage.textContent = "◀︎◁◀︎ Next player's turn"
    }
    console.log(`Sorry, your current score has been reset and it is the next player's turn`);
    switchPlayer();
}

// Roll function
const roll = () => {
    startMessage.style.display = "none";
    let newNum = genNum();
    image.style.display = "inline-block";
    image.src = `./img/dice${newNum}.png`;
    console.log(`You rolled a ${newNum}`);
    if (newNum == 1) {
        roll1();
    } else {
        tally = tally + newNum;
        console.log(`Nice one! Your current score is now ${tally}. Roll again or hold?`)
        if (player1Turn) {
            current1.textContent = tally;
        } else if (player2Turn) {
            current2.textContent = tally;
        }
    }
};  

// Check win
const checkWin = () => {
    if (held1 >= 20) {
        startMessage.style.display = "none";
        p1Message.textContent = "🎉 Winner 🎉";
        rollButton.style.display = "none";
        holdButton.style.display = "none";
    } else if (held2 >= 20) {
        startMessage.style.display = "none";
        p2Message.textContent = "🎉 Winner 🎉";
        rollButton.style.display = "none";
        holdButton.style.display = "none"; 
    }
}

// Hold function
const hold = () => {
    startMessage.style.display = "inline-block";
    if (player1Turn) {
        held1 = held1 + tally;
        textHeld1.textContent = held1;
        tally = 0;
        current1.textContent = "0";
        startMessage.textContent = "Score held - Next player ▶︎▷▶︎"
    } else if (player2Turn) {
        held2 = held2 + tally;
        textHeld2.textContent = held2;
        tally = 0;
        current2.textContent = "0";
        startMessage.textContent = "◀︎◁◀︎ Score held - Next player"
    }
    checkWin();
    switchPlayer();
} 

const newGame = () => {
    player = 1;
    p1Message.textContent = "Player 1";
    p2Message.textContent = "Player 2";
    tally = 0;
    held1 = 0;
    held2 = 0;
    textHeld1.textContent = "0";
    textHeld2.textContent = "0";
    current1.textContent = "0";
    current2.textContent = "0";
    image.style.display = "none";
    rollButton.style.display = "inline-block";
    holdButton.style.display = "inline-block";
    startMessage.style.display = "inline-block";
    startMessage.innerHTML = "Press 'roll' to start<br>Player 1 goes first";
}
    
// Event listeners
rollButton.addEventListener("click", () => {
    roll();
});   

holdButton.addEventListener("click", () => {
    hold();
});   

newGameButton.addEventListener("click", () => {
    newGame();
});   