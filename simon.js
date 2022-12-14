
var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$("body").keypress(function(event){
    pressA(event.key);
});
function nextSequence(){
	userClickedPattern=[];
	level++;
	$("#level-title").text("Level"+" "+level);
	randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChoosenColour);

    $("#"+randomChoosenColour).fadeIn().fadeOut().fadeIn();
    playSound(randomChoosenColour);
}
function playSound(name){
   var audio = new Audio(name + ".mp3");
   audio.play();
}


$(".btn").click(function(){
	userChoosenColour = $(this).attr("id");
	userClickedPattern.push(userChoosenColour);
	playSound(userChoosenColour);
	animatePress(userChoosenColour);
	checkAnswer(userClickedPattern.length-1);

});
function animatePress(checkColour){
	$("#"+checkColour).addClass("pressed");
	setTimeout(function(){
	$(".btn").removeClass("pressed");	
	},100);
}


function checkAnswer(currentlevel){
    if (gamePattern[currentlevel]===userClickedPattern[currentlevel]) {
    	 if (userClickedPattern.length===gamePattern.length) {

    	 	setTimeout(function(){
    	 		nextSequence();
    	 	},1000);
    	 }
     }
   	else{
   		var audio1 = new Audio("wrong.mp3");
   		audio1.play();
   		$("body").addClass("game-over");
   		setTimeout(function(){
   	    $("body").removeClass("game-over");
   		},300);
   		$("#level-title").text("Game-Over, Press any key to restart.");
   		repeat();
   	}
}

function  repeat(){
	    started = false;
   		level=0;
   		gamePattern = [];
   		userClickedPattern = [];
        $("body").keypress(function(){
        if(started===false){
   	    $("#level-title").text("Level"+" "+level);
   	    nextSequence();
   	    started = true;
        }
        });
}


function pressA(key){
	switch(key){
		case "a" :  if(started===false){
   	                $("#level-title").text("Level"+" "+level);
   	                nextSequence();
   	                started = true;
                    break;
                    }
        default : $("#level-title").text("incorrect input");
	}
}