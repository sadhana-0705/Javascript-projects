let choices = document.querySelectorAll(".choice");

let userscore = 0;
let compscore = 0;

const msg = document.querySelector("#msg");

choices.forEach((choice) => {

    choice.addEventListener("click", () => {

        const userchoice = choice.getAttribute("id");

        console.log("Button clicked:", userchoice);

        decisionmaker(userchoice);

    });

});

const decisionmaker = (userchoice) => {

    console.log("User choice:", userchoice);

    const computerchoice = compchoice();

    console.log("Computer choice:", computerchoice);

    // Draw condition
    if (userchoice === computerchoice) {

        console.log("Game is draw");

        msg.innerText = "Game Drawn!";

    }

    // Computer wins
    else if (
        (userchoice === "rock" && computerchoice === "paper") ||
        (userchoice === "paper" && computerchoice === "scissors") ||
        (userchoice === "scissors" && computerchoice === "rock")
    ) {

        console.log("Computer wins");

        compscore++;

        document.querySelector("#comp").innerText = compscore;

        msg.innerText = `You Lose! ${computerchoice} beats ${userchoice}`;

    }

    // User wins
    else {

        console.log("User wins");

        userscore++;

        document.querySelector("#user").innerText = userscore;

        msg.innerText = `You Win! ${userchoice} beats ${computerchoice}`;

    }

};

const compchoice = () => {

    const array = ["rock", "paper", "scissors"];

    const randind = Math.floor(Math.random() * 3);

    return array[randind];

};

// Clear Button

const clearbtn = document.querySelector("#clear");

clearbtn.addEventListener("click", () => {

    userscore = 0;
    compscore = 0;

    document.querySelector("#user").innerText = userscore;

    document.querySelector("#comp").innerText = compscore;

    msg.innerText = "Play your move";

});

