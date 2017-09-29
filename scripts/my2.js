var $num1 = $('#user-input1');
var $num2 = $('#user-input2');
var $num3 = $('#user-input3');
var $num4 = $('#user-input4');
var $numInputs = $('.user-input');

var $digit1 = $('#dig1');
var $digit2 = $('#dig2');
var $digit3 = $('#dig3');
var $digit4 = $('#dig4');
var $digits = $('.digit');

var $hint1 = $('#hint1');
var $hint2 = $('#hint2');
var $hint3 = $('#hint3');
var $hint4 = $('#hint4');
var $hints = $('.hint');

var $last1 = $('#last1');
var $last2 = $('#last2');
var $last3 = $('#last3');
var $last4 = $('#last4');
var $lasts = $('.last-hint');

const $btnStart = $('#btn-start');
const $btnSubmit = $('#btn-sub');
const $out = $('#out');
const $startmessage = $('#startmessage');

const minNum = 0;
const maxNum = 9;

var pinNum1;
var pinNum2;
var pinNum3;
var pinNum4;

let tryCount = 0;
let gameOver = false;

let correctCount = 0;	
let gameWin = false;
let gameOn = false;

let clickCount = 0;

//Button Actions
//Start The Game - Sets Pin Code
$btnStart.click(function(){
		setGame();
		gameOn = true;
	});
//Submit Attempt
	$btnSubmit.click(function(){
		$startmessage.hide();
		tryCount++;
		runSubmit();
		tries();
	});
//Keypress Actions	
//Keypress Enter(13) Run the game
//if (gameOn == false){
	$(document).keypress(function(e){
		if(e.which === 13 && gameOn === false){
		destroyLightBox();
		setGame();
		gameOn = true;
		}else if(e.which === 13 && gameOn === true){
		tryCount++;
		runSubmit();
		tries();
		}
	});

$numInputs.keypress(function(e){
	let inputNumber = $(this).data('number');
	if($(this).val().length >= 0){
		if(inputNumber == 4){
			inputNumber = 0;
		}
	}
	while( $(`#user-input${inputNumber+1}`).attr('disabled') == 'disabled'){
		inputNumber++;
		if(inputNumber == 4){
			inputNumber = 0;
		}
	}
	$(`#user-input${inputNumber+1}`).focus();
});

//Generate a random number between 0-9
function genRanNum(min, max){
		return Math.floor(Math.random() * 10);
}

//Timer Clock
var initial = 3000;
var count = initial;
var counter; //10 will  run it every 100th of a second
var milliCounter;
var milliCounter2;

var milliSecond = 100;
var milliSecond2 = 100;

var beepTimer;

//var $timerOut = $('.timer');
var $milliSecondOut = $('.milli');
var $secondsOut = $('.seconds');

function timer() {
  if (count <= 0) {
   	clearInterval(counter);
    return;
  }
  count--;
  displayCount(count);
}

//Millisecond Timer
function milliTimer(){
		milliSecond--;
	if(milliSecond === 75){
		setTimeout(beeper, 200);
		}
	if(milliSecond < 0) {
		milliSecond = 99;
	}
	if(milliSecond < 10){
		$milliSecondOut.text("0" + milliSecond);
		return;
	}
		$milliSecondOut.text(milliSecond);
}

//Millisecond Timer for last 99 milliseconds
function milliTimer2(){
	milliSecond2--;

	if(milliSecond2 === 10){
		$secondsOut.text('00:00:10');
		return;
	}

	if(milliSecond2 > 10){
		$secondsOut.text("00:00:" + milliSecond2);		//return milliSecond;
		//$secondsOut.text("WHooo HOOO!!!!");
	}else if(milliSecond2 >0){
		$secondsOut.text("00:00:0" + milliSecond2);
		//return "0" + milliSecond;
	}else{
		$secondsOut.text("00:00:00");
		clearInterval(milliCounter2);
		gameWin = false;
		endGame();	
	}
}

//Display Full Seconds
function displayCount(count) {
	var res = count / 100;

  if(res > 10){
  	$secondsOut.text( "00:" + res.toPrecision(2) + ":");
  }else if(res.toPrecision(1).toString() === '1e+1' ){
  	$secondsOut.text( "00:" + 10 + ":");
  }else if(res < 10 && res > 1){
   	$secondsOut.text("00:0" + res.toPrecision(1) + ":");
  }else if(res < 1){
  	$milliSecondOut.hide();
  	clearInterval(milliTimer);
   	clearInterval(counter);
   	$secondsOut.text("00:01:00");
   	milliCounter2 = setInterval(milliTimer2, 10);
  }
}
//End Timer

//Beeper function on every second
function beeper(){
	$.playSound('http://jinnanen.bcitwebdeveloper.ca/Game/media/beep.wav');
}

//Try Counter 
//Keeps Track and Displays the Number of Attempts
//Limit Set to 10
function tries() {
	if (tryCount <= 0) {
		return;
	}else if(tryCount < 10){
		document.getElementById("tries").innerHTML = tryCount + "/10";
	}else if(tryCount == 10){
		gameOver = true;
		document.getElementById("tries").innerHTML ="10/10";
		endGame();
	}
}

//Set Game Values
//Initializes and Sets Values for the Game
function setGame(){
	$.stopSound();
	//document.getElementById(`user-input`).focus();
//Reset to Initial Values
	gameWin = false;
	gameOn = true;
	console.log(gameOn);
	count = initial;
	gameOver = false;
	tryCount = 0;
	correctCount = 0;
	milliSecond = 100;
	milliSecond2 = 100;
	clickCount = 0;
//Reset Intervals on Counters
	clearInterval(counter);
	clearInterval(milliCounter);
	clearInterval(milliCounter2);
//Initial Timer and Tries Display
	document.getElementById("tries").innerHTML ="0/10";
//document.getElementById("timer").innerHTML = "00:30:00";
	$secondsOut.text('00:30:');
	$milliSecondOut.text('00');
	$milliSecondOut.show();
//Hide Start Button & Reveal Submit Button
	$btnStart.hide();
	document.getElementById("btn-sub").innerHTML = "Submit First Attempt";
	$btnSubmit.show();
//Clears Previous Values of Inputs & Outputs
	$digits.css({
		'color': 'red',
		'text-shadow': '0px 0px 8px red',
		'box-shadow': '1px 2px 0px 2px rgba(255,0,51,0.15)',
	});
	$hints.css({
		'color': 'red', 
		'text-shadow': '0px 0px 8px red',
	});
	$digits.html('0');
	$digits.addClass('glowing');
	$digits.css('color', 'red');
	$hints.html('&nbsp;');
	$lasts.html('&nbsp;');
	$lasts.show();
	$numInputs.val('');
	$numInputs.removeAttr("disabled");
//Sets Randomly Generated Number to Pin Code Digit
	pinNum1 = genRanNum(minNum, maxNum);
	pinNum2 = genRanNum(minNum, maxNum);
	pinNum3 = genRanNum(minNum, maxNum);
	pinNum4 = genRanNum(minNum, maxNum);
//Initial Game Message
	$startmessage.html(`Let's Crack That PIN!!!!`);
	$numInputs.data("guess", "incorrect");
//display in colsole for testing
	console.log(pinNum1);
	console.log(pinNum2);
	console.log(pinNum3);
	console.log(pinNum4);
//set initial input focus
	$(`#user-input1`).focus();
}
//End Set Game Values Function

//Start Game and Submit Functions
function runSubmit(){
	$startmessage.hide();
	document.getElementById("btn-sub").innerHTML = "Submit Attempt";
	//clearInterval(counter);
 
//start timers
  clickCount++;
  if(clickCount === 1){
  	  counter = setInterval(timer, 10);
  		milliCounter = setInterval(milliTimer, 10);
  		//beepTimer = setInterval(beeper, 1000);
  }
//End Timers

//Correct Guess Counter
	let i = 0;
  	for(i = 1; i < 5; i++){
   	checkGuess(window[`$num${i}`], window[`$last${i}`], window[`$hint${i}`], window[`pinNum${i}`], window[`$digit${i}`]);
 	}
 	$numInputs.each(function(){
 		if($(this).data('guess')  == 'correct'){
			correctCount++;
 		}
 	});
 	if(correctCount === 4){
 		gameWin = true;
 		endGame();
 	}else{
 		correctCount = 0;

 		let inputNumber = 1;
		
		while( $(`#user-input${inputNumber}`).attr('disabled') == 'disabled'){
			inputNumber++;
			if(inputNumber == 5){
				inputNumber = 1;
			}
		}
		$(`#user-input${inputNumber}`).focus();
 	}
}
//End Start / Submit Functions



//Check Guess Function
function checkGuess($element, $lastout, $hintout, pinnumber, digit) {
	const theGuess = $element.val();
//if blank, lets user know via hintbox
	if(theGuess === ''){
		$hintout.html(`?`);
	}
//run validate the guess
	const numValid = validateGuess(theGuess, $hintout);
//check if guess is too high or too low
	if(numValid){
//number is valid see if they are high or low
		if(theGuess < pinnumber){
			$lastout.html(theGuess);
			$hintout.html(`&#9650;`);
			$element.val('');
		}else if(theGuess > pinnumber){
			$lastout.html(theGuess);
			$hintout.html(`&#9660;`);
			$element.val('');
		}else{
			digit.css({
				'color': 'green',
				'text-shadow': '0px 0px 8px green',
				'box-shadow': '1px 2px 0px 2px rgba(0,128,0,0.15)',
			});
			$hintout.css({
				'color': 'green', 
				'text-shadow': '0px 0px 8px green',
			});
			digit.html(pinnumber);
			$lastout.html('&nbsp;');
			$lastout.hide();
			$hintout.html('&#10004;');
			$element.attr('disabled', 'disabled');
			$element.data('guess', 'correct');
			//$element.html('&nbsp;');
		}
	}
}
 
//validates the guess is a number between the min and max
function validateGuess(value, $hintout){
//is it a number
	if($.isNumeric(value)){
//guess is a number
//test if between min max
		if(value < minNum || value > maxNum){
			$hintout.html(`?`);
			return false;
		}else{
			return true;
		}
	}else{
 		$hintout.html(`?`);
 		return false;
 	}
}
//End Check Guess Function

//End Game Function
function endGame(){
 	gameOver = true;
 	clearInterval(beepTimer);
 	if (gameWin === true){
 		overlay();
 		$.playSound('http://jinnanen.bcitwebdeveloper.ca/Game/media/win.wav');
 		$out.html(`You Won!! Now Grab the Loot and RUN!!!` + `<br>` + `Click Anywhere or Press Enter to Play Again!`);
 		document.getElementById("btn-start").innerHTML = "Restart Game";
 		gameOn = false;
  	clearInterval(counter);
  	clearInterval(milliCounter);
  	clearInterval(milliCounter2);
  	$btnStart.show();
		$btnSubmit.hide();
		correctCount = 0;
		$lasts.html('&nbsp;');
		
		//Verify Data
		$numInputs.val('');
//end test line
  }else{
  	overlay();
  	$.playSound('http://jinnanen.bcitwebdeveloper.ca/Game/media/alarm.wav');
  	$out.html(`Game Over - Cops Are On The Way!!!!!` + `<br>` + `Click Anywhere or Press Enter to Play Again!`);
  	gameOn = false;
  	clearInterval(counter);
  	clearInterval(milliCounter);
  	clearInterval(milliCounter2);
  	document.getElementById("btn-start").innerHTML = "Restart Game";
  	$btnStart.show();
		$btnSubmit.hide();
		correctCount = 0;
		$digits.html('&nbsp;');
		$numInputs.attr('disabled', 'disabled');
		$lasts.html('&nbsp;');
		$lasts.show();
		$hints.html('&nbsp;');
		$digits.css('box-shadow', 'none');
		$numInputs.val('');

	}
}


//Lightbox on Win/Lose
const $body = $('body');
const $gameMessage = $('.game-messages');

function overlay(){
//disable scroll 
		$body.css('overflow', "hidden");
//create lightbox overlay
	$('<div class="overlay"></div>').css({
		'background-color' : '#000',
		'position' : 'fixed',
		'top' : 0,
		'left' : 0,
		'width' : '100%',
		'height' : '100%',
		'opacity' : 0
	}).appendTo($body).animate({'opacity' : 0.5}, 'fast', function(){
$gameMessage.show().center();

	}).on('click', destroyLightBox);

}

//Destroy LightBox
function destroyLightBox(){
	$startmessage.html(`Let's Play Again!`);
	$startmessage.show();

	$gameMessage.hide();
	$('.overlay, .lightbox_01')
			.fadeOut('fast', function(){
				$.stopSound();
				$(this).remove();
				$body.css('overflow', 'auto');
			});	

}
	
// Adds a center element function to jQuery
jQuery.fn.center = function () {
	this.css('position', 'absolute');
	this.css('top', ( $(window).height() - this.height() ) / 2 + $(window).scrollTop());
	this.css('left', ( $(window).width() - this.width() ) / 2 + $(window).scrollLeft());
	return this;
};



////Matrix Background Rain
var c = document.getElementById("c");
var ctx = c.getContext("2d");

c.height = window.innerHeight;
c.width = window.innerWidth;

var chinese = "｡｢｣､･ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ";

var latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ,./<>:;[]=+-1234567890";

latin = latin.split("");

chinese = chinese.split("");

var font_size = 14;
var columns = c.width/font_size; 
var drops = [];
for(var x = 0; x < columns; x++)
drops[x] = 1; 

function draw()
{
ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
ctx.fillRect(0, 0, c.width, c.height);

ctx.fillStyle = "#0F0";
ctx.font = font_size + "px arial";
var text;
for(var i = 0; i < drops.length; i++)
{
var rand = Math.random() * (chinese.length+latin.length);
if(rand < 8)
text = latin[Math.floor(Math.random()*latin.length)];
else
text = chinese[Math.floor(Math.random()*chinese.length)];

ctx.fillText(text, i*font_size, drops[i]*font_size);

if(drops[i]*font_size > c.height && Math.random() > 0.975)
drops[i] = 0;

drops[i]++;
}
}

setInterval(draw, 33);