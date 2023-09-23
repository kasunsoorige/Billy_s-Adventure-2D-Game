var start = 0;

//sound
var runSound = new Audio("run.mp3");
runSound.loop = true;

var jumpSound = new Audio("jump.mp3");
var deadSound = new Audio("dead.mp3");


function keyCheck(event){

    if(event.which == 13){
        //alert("enter");
        if(runWorkerId == 0){
            runWorkerId = setInterval(run,100);
            runSound.play();

            start = 1;
            backgroundWorkerId = setInterval(moveBackground,100);
            scoreWorkerId = setInterval(updateScore,1000);
            blockWorkerId = setInterval(createBlock,1000);
            moveBlockWorkerId = setInterval(moveBlocks,100);
        }
    }

    if(event.which == 32){
        //alert("space");
        if(start == 1){
            if(jumpWorkerId == 0){
                clearInterval(runWorkerId);
                runSound.pause();

                runWorkerId = -1;
                jumpWorkerId = setInterval(jump,100);
                jumpSound.play();
                
                
            }
        }
    }
}



//player
var player = document.getElementById("player");

//run function
var runImageNumber = 1;
var runWorkerId = 0;

function run(){
    runImageNumber = runImageNumber + 1;

    if(runImageNumber == 9){
        runImageNumber = 1;
    }

    player.src = "Run ("+ runImageNumber + ").png";
}


//jump function
var jumpImageNumber = 1;
var jumpWorkerId = 0;
var playerMarginTop =320;

function jump(){
    jumpImageNumber = jumpImageNumber + 1;

    if(jumpImageNumber <=7){
        //fly
        playerMarginTop = playerMarginTop - 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    if(jumpImageNumber >=8){
        //land
        playerMarginTop = playerMarginTop + 30;
        player.style.marginTop = playerMarginTop + "px";
    }

    if(jumpImageNumber == 13){
        jumpImageNumber = 1;
        clearInterval(jumpWorkerId);
        runWorkerId = setInterval(run,100);
        runSound.play();
        jumpWorkerId = 0;
    }

    player.src = "Jump ("+ jumpImageNumber + ").png";
}


//background move

var background = document.getElementById("background");
var backgroundX = 0;
var backgroundWorkerId = 0;

function moveBackground(){
    backgroundX = backgroundX - 20;
    background.style.backgroundPositionX = backgroundX + "px"; 
}


//upadte score 

var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;

function updateScore(){
    newScore = newScore + 1;
    score.innerHTML = newScore;

}

//create block function
var blockMarginLeft = 0;
var blockWorkerId = 0;
var blockId = 1;

function createBlock(){
    var block = document.createElement("div");

    block.className = "block";
    block.id = "block"+blockId;
    blockId = blockId + 1;
    //to generate a random value for flame distances
    var gap = Math.random()*(1000-400)+400;

    blockMarginLeft = blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";
    //blockMarginLeft = blockMarginLeft + 400;

    
    document.getElementById("background").appendChild(block);
}

//move blocks function

var moveBlockWorkerId = 0;

function moveBlocks(){

    for(var i = 1;i <= blockId; i++){
        
    var currentBlock = document.getElementById("block"+i);
    var currentMarginLeft = currentBlock.style.marginLeft; 

    var newMarginLeft = parseInt(currentMarginLeft) - 20;
    currentBlock.style.marginLeft = newMarginLeft + "px";

    //alert(newMarginLeft);
    //180 - 80
        //detecting player death

    if(newMarginLeft < 180){

        if(newMarginLeft > 80){
            //alert(playerMarginTop);
            if(playerMarginTop <=320){
                
                if(playerMarginTop >230){
                    //alert("dead");
                    runSound.pause();
                    clearInterval(runWorkerId);
                    clearInterval(jumpWorkerId);
                    jumpWorkerId = -1;
                    clearInterval(backgroundWorkerId);
                    clearInterval(blockWorkerId);
                    clearInterval(moveBlockWorkerId);
                    clearInterval(scoreWorkerId);
                    deadWorkerId = setInterval(dead,100);
                    deadSound.play();


                }

            }
        }
    }

    }

}

//dead function
var deadImageNumber = 1;
var deadWorkerId = 0;

function dead(){
    deadImageNumber = deadImageNumber + 1;

    if(deadImageNumber == 10){
        clearInterval(deadWorkerId);
        player.style.marginTop = "320px";
        document.getElementById("gameOver").style.visibility = "visible";
        document.getElementById("text2").innerHTML = "Your Score - "+ newScore;
    }

    player.src = "Dead ("+ deadImageNumber +").png";

}


function reload(){
    location.reload();
}