let choices=document.querySelectorAll(".choice");
let userscore=0;
let compscore=0;
const msg=document.querySelector("#msg");

choices.forEach((choice) => {
    choice.addEventListener("click",() => {
        const userchoice=choice.getAttribute("id");
        console.log("button is clicked",userchoice);
        decisionmaker(userchoice);
        

    })
})
const decisionmaker=(userchoice) =>
{
    console.log("user choice is:",userchoice);
    const computerchoice=compchoice();
    console.log("computer choice is ",computerchoice);
    if(userchoice==computerchoice){
        console.log("game is draw");
        msg.innerText="game is drawn";
    }
    else if(userchoice=="rock" && computerchoice=="paper"||userchoice=="paper"&&computerchoice=="scissors"){
        console.log("computer wins");
        compscore++;
        const compid=document.querySelector("#comp");
        compid.innerText=compscore;
        msg.innerText="you lose";
    }
        
    else {
        console.log("user wins");
        userscore++;  
        const userid=document.querySelector("#user");
        userid.innerText=userscore;
        msg.innerText="you win";
        
    }
}
        
    

const compchoice=() =>
{
    const array=["rock","paper","scissors"];
    const randind=Math.floor(Math.random()*3);
     return array[randind];

}


