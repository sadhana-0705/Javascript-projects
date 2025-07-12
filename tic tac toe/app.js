let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let win = [
    [0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]
];

// Reset game function
const resetGame = () => {
    turnO = true;
    boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
    });
    msgContainer.style.display = "none";
};

// Add click event to reset button
resetbtn.addEventListener("click", resetGame);

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO){
            box.innerText = "O";
            turnO = false; 
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkwinner();
    });
});

const checkwinner = () => {
    for(let pattern of win) {
        let posval1 = boxes[pattern[0]].innerText;
        let posval2 = boxes[pattern[1]].innerText;
        let posval3 = boxes[pattern[2]].innerText;
        
        if(posval1 != "" && posval2 != "" && posval3 != "") {
            if(posval1 == posval2 && posval2 == posval3) {
                showWinner(posval1);
                return;
            }
        }
    }
    
    // Check for draw
    let isDraw = true;
    boxes.forEach(box => {
        if(box.innerText === "") isDraw = false;
    });
    if(isDraw) showDraw();
};

const showWinner = (winner) => {
    msg.innerText = `Player ${winner} wins!`;
    msgContainer.style.display = "block";
    boxes.forEach(box => box.disabled = true);
};

const showDraw = () => {
    msg.innerText = "Game ended in a draw!";
    msgContainer.style.display = "block";
};