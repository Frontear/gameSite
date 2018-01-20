// Global Variables
var theTarget, difficulty, score, lives;
var clickedCircle, radius;
var isPaused, pauseText;
var gameRunning;

// Button variables
var startButton;
var instructionButton;
var retryButton;

// Event Listener
var instructionsOnClick = new Event("instructionsOnClick"); // Derived from https://stackoverflow.com/a/31222710/9091276

// Text Variables
var scoreText;
var livesText;
var pauseText;

// Gets the width and height of canvas, then find the center.
var screenTypes = [getWidth(), getHeight(), getWidth() / 2, getHeight() / 2];
var fontConst = " sans-serif";

function start() {
	isPaused = false;
	pauseText = [];
	startButton = [];
	instructionButton = [];
	retryButton = [];
	scoreText = [];
	livesText = [];
	theTarget = [];

	drawMenu();
}

function startGame() {
	radius = 64; // Reset the radius back to full, this is done for the onrestart.
	clickedCircle = undefined; // This must be done, otherwise onrestart, the game will attempt to penalize you.
	gameRunning = true;
	difficulty = 1000;
	score = 0;
	lives = 3;
	removeAll();
	setTimer(step, 33);
	renderFirstElements();
	Randomize();
}

function pauseGame() {
	stopTimer(drawRandomCircles);
	createText("Game Paused", "24pt" + fontConst, screenTypes[2], 24, pauseText);
}

function unpauseGame() {
	remove(pauseText[0].t);
	Randomize();
}

function endGame() {
	gameRunning = false;
	stopTimer(step);
	stopTimer(drawRandomCircles);
	removeTheTarget();
	setHighScore();
	createText("Highscore: " + sessionStorage.getItem("highScore_FastAim"), "24pt" + fontConst, screenTypes[2], 200, null);
	createButton("Retry", "24pt" + fontConst, 100, 50, screenTypes[2], screenTypes[3] + screenTypes[1] / 4, retryButton);
}

function setHighScore() {
	var Score = score;
	var HighScore = sessionStorage.getItem("highScore_FastAim");

	if (HighScore !== null) { // if highscore is already set
		if (Score > HighScore) { // If the new score is greater than the previous highscore
			sessionStorage.setItem("highScore_FastAim", score); // New highscore!
		}
	}
	else {
		sessionStorage.setItem("highScore_FastAim", score); // Actually make the highscore storage item.
	}
}

function step() {
	if (lives == 0) {
		endGame();
	}
	updateElementText(livesText[0].t, "Lives: " + lives);
	updateElementText(scoreText[0].t, "Score: " + score);
}

function renderFirstElements() {
	createText("Score: " + score, "16pt" + fontConst, 0 + 48, 0, scoreText);
	createText("Lives: " + lives, "16pt" + fontConst, screenTypes[0] - 48, 0, livesText);
}

function Randomize() {
	stopTimer(drawRandomCircles);
	setTimer(drawRandomCircles, difficulty);
}

function drawRandomCircles() {
	if (clickedCircle == false) {
		penalizeThePlayer();
	}

	var target = {
		// Calculations to make the circle's within smaller, in order to make a nice looking target
		// I originally planned to use a webImage, the issue with this, is that it defines a larger, invisible portion of the image, which would be counted as an element, allowing you to click even if the object wasn't actually there
		// This forced me to resort to this method.
		c: new Circle(radius),
		c1: new Circle(radius - (radius / 4)),
		c2: new Circle(radius - (radius / 2)),
		c3: new Circle(radius / 4),
	};

	target.c.setPosition(Randomizer.nextInt(0 + target.c.getWidth(), screenTypes[0] - target.c.getRadius()), Randomizer.nextInt(0 + target.c.getRadius(), screenTypes[1] - target.c.getRadius()));
	target.c.setColor(Randomizer.nextColor());

	// since CodeHS defines the x and y coordinate by the exact center of the circle, it is just a bunch of repeating code
	target.c1.setPosition(target.c.getX(), target.c.getY());
	target.c1.setColor(Color.white);

	target.c2.setPosition(target.c.getX(), target.c.getY());
	target.c2.setColor(target.c.getColor());

	target.c3.setPosition(target.c.getX(), target.c.getY());
	target.c3.setColor(Color.white);

	theTarget.push(target);

	add(target.c);
	add(target.c1);
	add(target.c2);
	add(target.c3);

	clickedCircle = false;
}

function penalizeThePlayer() {
	removeTheTarget();
	if (lives >= 1) {
		lives--;
	}
}

function drawMenu() {
	createText("FastAim!", "30pt" + fontConst, screenTypes[2], 0, null);
	createButton("Start", "24pt" + fontConst, 100, 50, screenTypes[2] - screenTypes[0] / 4, screenTypes[3] + screenTypes[1] / 4, startButton);
	createButton("Instructions", "16pt" + fontConst, 80, 50, screenTypes[2] + screenTypes[0] / 4, screenTypes[3] + screenTypes[1] / 4, instructionButton);

	mouseClickMethod(performAction_Click);
	keyDownMethod(performAction_keyDown);
}

function rewardThePlayer() {
	removeTheTarget();
	if (difficulty > 400) { // Does anyone know anyone who can react and click within 400ms? I want to meet them
		difficulty -= 10; // Make the game slightly more difficult each time. Of course, it cant keep infinitely going, otherwise user won't even be able to play
	}
	if (radius > 48) { // This game isn't about clicking molecules, we want nice, large circles. I dont need players using microscopes to play.
		radius -= 1; // Make the circle slightly smaller each time, adding to the difficulty.
	}
	clickedCircle = true;
	score++;
	Randomize(); // Restart drawCircle with the new Time.
}

/// Helper Functions

function removeTheTarget() {
	remove(theTarget[0].c);
	remove(theTarget[0].c1);
	remove(theTarget[0].c2);
	remove(theTarget[0].c3);
	theTarget.pop();
}

function updateElementText(textElem, stringText) {
	textElem.setText(stringText);
}

function performAction_Click(e) {
	var element = getElementAt(e.getX(), e.getY());
	if (element !== null) { // This is to prevent any undefined element errors
		if (gameRunning == true) { // Reduce the amount of checks if game is running, since menu elements are no longer displayed
			if ([theTarget[0].c, theTarget[0].c1, theTarget[0].c2, theTarget[0].c3].indexOf(element) > -1) {
				rewardThePlayer();
			}
		}
		else {
			if (buttonIndex(instructionButton[0], element) > -1) {
				document.dispatchEvent(instructionsOnClick);
			}
			else if ((buttonIndex(startButton[0], element) > -1) || (buttonIndex(retryButton[0], element) > -1)) {
				startGame();
			}
		}
	}
}

function performAction_keyDown(e) {
	if (gameRunning == false) { return; }
	if (e.keyCode == 27) { // ESCAPE key is being pressed
		if (isPaused == true) {
			unpauseGame();
			isPaused = false;
		}
		else {
			pauseGame();
			isPaused = true;
		}
	}
}

function buttonIndex(array, compare) {
	// Derived from https://stackoverflow.com/a/13737101
	try {
		return ([array.t, array.c, array.c1, array.c2].indexOf(compare));
	}
	catch (err) { console.log(err); } // This is done if you press something that isn't within an array (pText or pButton).
}

if (typeof start === 'function') {
	start();
}