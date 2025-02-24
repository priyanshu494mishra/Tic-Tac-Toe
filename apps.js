const boxes=document.querySelectorAll(".box");
const resetButton=document.querySelector(".reset-button");
const startButton=document.querySelector(".start-button");
const msg=document.querySelector(".msg");
const msgContainer=document.querySelector(".msg-container");


let turn0=true;
let winningPattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];
const resetgame=()=>{
    turn0=true;
    enableBox();
    msgContainer.classList.add("hide");
}

const disableBox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("click");
        if(turn0){
            box.innerText="O";
            turn0=false;
        }
        else{
            box.innerText="X";
            turn0=true;
        }
        box.disabled=true;
        checkWinner();
    })

})
const showWinner=((winner)=>{
    msgContainer.classList.remove("hide");
    msg.innerText=`Winner is ${winner}`;
    disableBox();
})

const checkWinner=()=>{
    for(let pattern of winningPattern){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1==pos2 && pos2==pos3){
                showWinner(pos1);
            }
        }
    }
}
startButton.addEventListener("click",resetgame);
resetButton.addEventListener("click",resetgame);