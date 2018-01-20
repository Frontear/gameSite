var score, lives;
var theCircle, speedMove;
var isPaused, pauseText;
var gameRunning;

// Text Variables
var pauseText;
var scoreText;
var livesText;

// Event Listener
var instructionsOnClick = new Event("instructionsOnClick"); // Derived from https://stackoverflow.com/a/31222710/9091276

// Button Variables
var startButton;
var instructionButton;
var retryButton;

var playerElement, playerDirection;

var playerImage = "https://puu.sh/yZmDf/c11c111ae2.png";
var playerImage_Flip = "https://puu.sh/yZmCU/45c66b28d8.png";

var screenTypes = [getWidth(), getHeight(), getWidth() / 2, getHeight() / 2];
var circleColors = [Color.red, Color.orange, Color.yellow, Color.green, Color.blue, Color.purple, Color.cyan];
var playerDimensions = 120;
var fontConst = " sans-serif"; // This font is used everywhere, so just define it here.

function beginGame() {
	gameRunning = true;
	removeAll();
	score = 0;
	lives = 3;
	// Position player back into center
	playerElement.setPosition(screenTypes[2] - (playerElement.getWidth() / 2), screenTypes[1] - playerElement.getHeight());
	add(playerElement);
	createScoreAndLivesLabel();
	setTimer(playerMove, 16);
	/// -- Code credited and attributed to Cohen, Jordan.

	// Code recieved from FallingSquares example, modified for personal game idea.
	setTimer(drawCircles, 400);
	setTimer(setup, 8);

	/// -- End Code Crediting and Attributing.
}

function beginEndGame() {
	stopTimer(playerMove);
	stopTimer(drawCircles);
	if (theCircle.length === 0) {
		stopTimer(setup);
		endGame();
	}
}

function endGame() {
	gameRunning = false;
	setHighScore();
	createText("Highscore: " + sessionStorage.getItem("highScore_CatchCircles"), "24pt" + fontConst, screenTypes[2], 200, null);
	createButton("Retry", "24pt" + fontConst, 100, 50, screenTypes[2], screenTypes[3] + screenTypes[1] / 4, retryButton);
}

function pauseGame() {
	isPaused = true;
	stopAllTimers();

	createText("Game Paused", "24pt" + fontConst, screenTypes[2], 24, pauseText);
}

function unpauseGame() {
	remove(pauseText[0].t);
	pauseText.pop(); // This is done so the array isn't propagated with hundreds of pauseText elements, since we won't be able to remove it.
	isPaused = false;
	// Restart timers
	setTimer(playerMove, 16);
	setTimer(drawCircles, 400);
	setTimer(setup, 8);
}

function start() {
	// Assign global values
	definePlayerElement(); // This is put at the beginning to prevent loading of user sprite mid game.
	theCircle = [];
	pauseText = [];
	startButton = [];
	instructionButton = [];
	retryButton = [];
	scoreText = [];
	livesText = [];
	speedMove = false;
	isPaused = false;

	drawMenu();
}

function drawMenu() {
	createText("Catch The Circles!", "30pt" + fontConst, screenTypes[2], 0, null);
	createButton("Start", "24pt" + fontConst, 100, 50, screenTypes[2] - screenTypes[0] / 4, screenTypes[3] + screenTypes[1] / 4, startButton);
	createButton("Instructions", "16pt" + fontConst, 80, 50, screenTypes[2] + screenTypes[0] / 4, screenTypes[3] + screenTypes[1] / 4, instructionButton);

	mouseClickMethod(performAction_Click);

	// Code recieved from SmoothMove example, modified for personal game idea.
	keyDownMethod(performAction_keyDown);
	keyUpMethod(performAction_keyUp);
}

function setHighScore() {
	var Score = score;
	var HighScore = sessionStorage.getItem("highScore_CatchCircles");

	if (HighScore !== null) { // if highscore is already set
		if (Score > HighScore) { // If the new score is greater than the previous highscore
			sessionStorage.setItem("highScore_CatchCircles", score); // New highscore!
		}
	}
	else {
		sessionStorage.setItem("highScore_CatchCircles", score); // Actually make the highscore storage item.
	}
}

// Checks if the Player and the Circles have collided, that is, touched.
function hasCollided(playerObject, circleObject) {
	// Get the exact position of the four corners of the object.
	var playerX = {
		topLeft: playerObject.getX(),
		topRight: playerObject.getX() + playerObject.getWidth(),
	};

	var playerY = {
		topLeft: playerObject.getY(),
		topRight: playerObject.getY(),
	};
	// Find the four corners of a circle (assuming a square with the same diameter as lengths)
	var circleX = {
		topLeft: circleObject.getX() - circleObject.getRadius(),
		topRight: circleObject.getX() + circleObject.getRadius(),
	};

	var circleY = {
		topLeft: circleObject.getY() - circleObject.getRadius(),
		topRight: circleObject.getY() - circleObject.getRadius(),
	};
	/// -- Code credited and attributed to Cohen, Jordan.

	// Code recieved from SquaresCollisionCheck example, modified for personal game idea.
	if (playerX.topRight > circleX.topLeft && playerX.topLeft < circleX.topRight
		&& playerY.topLeft + playerObject.getWidth() > circleY.topLeft
		&& playerY.topRight < circleObject.getY() + circleObject.getWidth()) {
		return true;
	}
	/// -- End Code Crediting and Attributing.
}

// Defines a player image, right at the bottom
function definePlayerElement() {
	playerElement = new WebImage(playerImage);
	playerElement.setSize(playerDimensions, playerDimensions);
	playerElement.setPosition(screenTypes[2] - (playerElement.getWidth() / 2), screenTypes[1] - playerElement.getHeight());
}

function createScoreAndLivesLabel() {
	createText("Score: " + score, "16pt" + fontConst, 0 + 48, 0, scoreText);
	createText("Lives: " + lives, "16pt" + fontConst, screenTypes[0] - 48, 0, livesText);
}

// Creates a graphic text string
function createText(text, font, cX, cY, array) {
	// If the array is already defined, define it again. You may also add a remove element in the array, but removeAll() handles that for me already.
	if (array !== null && array.length == 1) { array.pop(); }
	var pText = { // This object is pushed to an array for control
		t: new Text(text, font),
	};

	// Set its x position based on the xCoordinate subtract its width divided by 2, which usually centers it at x param. Same thing for y, except divided 2 would not be needed
	pText.t.setPosition(cX - pText.t.getWidth() / 2, cY + pText.t.getHeight());
	pText.t.setColor(Color.black);

	// This is done if this function isn't supposed to push to an array (if the element won't be managed afterwards)
	// This just prevents any errors
	if (array != null) {
		array.push(pText);
	}

	add(pText.t);
}

// Creates a smooth button, with text inside it, where c = container, and t = text
function createButton(text, font, cWidth, cHeight, cX, cY, array) {
	// If the array is already defined, define it again. You may also add a remove element in the array, but removeAll() handles that for me already.
	if (array !== null && array.length == 1) { array.pop(); }
	var pButton = { // Big nice object, which has a lot of elements
		t: new Text(text, font),
		c: new Rectangle(cWidth, cHeight),
		c1: new Circle(cHeight / 2),
		c2: new Circle(cHeight / 2),
	};

	// Center the text based on the rectangle dimensions, and self dimensions
	pButton.t.setPosition(cX - pButton.t.getWidth() / 2, cY + pButton.c.getHeight() / 2 + (pButton.t.getHeight() / 3));
	pButton.t.setColor(Color.black);

	// Set the two circles based on the rectangle x and y, making sure they dont end up offscreen or not attached correctly.
	pButton.c1.setPosition(cX - pButton.c.getWidth() / 2, cY + pButton.c.getHeight() / 2);
	pButton.c2.setPosition(cX + pButton.c.getWidth() / 2, cY + pButton.c.getHeight() / 2);

	pButton.c1.setColor(Color.gray);
	pButton.c2.setColor(Color.gray);

	pButton.c.setPosition(cX - pButton.c.getWidth() / 2, cY);
	pButton.c.setColor(Color.gray);

	// This is done if this function isn't supposed to push to an array (if the element won't be managed afterwards)
	// This just prevents any errors
	if (array !== null) {
		array.push(pButton);
	}

	// Add the big list of elements
	add(pButton.c1);
	add(pButton.c2);
	add(pButton.c);
	add(pButton.t);
}

function setup() {
	if (lives === 0) {
		beginEndGame();
	}
	fallCircles();
}

function drawCircles() {
	var fallingRate = score !== 0 ? (score / 16) : (1 / 16); // This is done so we dont end up if 0/16 == 0.

	var circle = {
		obj: new Circle(30),
		speed: fallingRate + (Randomizer.nextInt(1, 3)),
		canCatch: true,
	};

	var randomX = Randomizer.nextInt(circle.obj.getRadius(),
		screenTypes[0] - circle.obj.getWidth()); // This is done to prevent the circle from ever being beyond the canvas, since player cant grab that.

	circle.obj.setPosition(randomX, 0);
	circle.obj.setColor(circleColors[Randomizer.nextInt(0, circleColors.length - 1)]);
	add(circle.obj);

	theCircle.push(circle);
}

function setScoreAndLives(valueOfScore, valueOfLives) {
	lives = valueOfLives;
	score = valueOfScore;
	updateScoreAndLives();
}

function updateScoreAndLives() {
	if (score < 0) { score = 0; }
	if (lives < 0) { lives = 0; }

	colorLabels();

	scoreText[0].t.setText("Score: " + score);
	livesText[0].t.setText("Lives: " + lives);
}

function colorLabels() {
	// Fun stuff to color score and lives as they change

	// A conditional statement, without if's and else's
	lives == 2 ? livesText[0].t.setColor(Color.orange) :
		lives == 1 ? livesText[0].t.setColor(Color.red) :
			lives === 0 ? livesText[0].t.setColor(Color.black) : null;

	score <= 10 ? scoreText[0].t.setColor(Color.blue) :
		score >= 25 ? scoreText[0].t.setColor(Color.purple) : null;
}

function fallCircles() {
	for (var i = 0; i < theCircle.length; i++) {
		theCircle[i].obj.move(0, theCircle[i].speed);
		// If the object has passed 80% of the height of the player, they should not be able to catch the object, however, the object should continue to fall. This 80% leniency was added to reduce difficulty of game
		if (theCircle[i].obj.getY() > (getHeight() - (playerElement.getHeight() - (playerElement.getHeight() / 5)))) { theCircle[i].canCatch = false; }
		// If the object collides with the player
		if (hasCollided(playerElement, theCircle[i].obj) && (theCircle[i].canCatch == true)) {
			remove(theCircle[i].obj);
			theCircle.remove(i);
			if (lives !== 0) {
				setScoreAndLives(score + 1, lives);
			}
		}
		// The moment the object is passed the canvas's height, you lose a life.
		else if (theCircle[i].obj.getY() > (getHeight() + theCircle[i].obj.getHeight())) {
			remove(theCircle[i].obj);
			theCircle.remove(i);
			if (lives !== 0) {
				setScoreAndLives(score, lives - 1);
			}
			i--;
		}
	}
}

function performAction_keyDown(e) {
	if (e.keyCode == 27) { // ESCAPE key is being pressed
		if (isPaused === true) {
			unpauseGame();
		}
		else {
			pauseGame();
		}
	}
	if (e.keyCode == Keyboard.SHIFT) {
		speedMove = true;
	}
	if (e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) {
		playerDirection = "LEFT";
	}
	if (e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) {
		playerDirection = "RIGHT";
	}
}

function playerMove() {
	if (playerDirection == "LEFT" && playerElement.getX() > 0) {
		if (speedMove) { playerElement.move(-45, 0); updatePlayerElementImage(playerImage_Flip); }
		else { playerElement.move(-15, 0); updatePlayerElementImage(playerImage_Flip); }
	}
	if (playerDirection == "RIGHT" && (playerElement.getX() + playerElement.getWidth()) < getWidth()) {
		if (speedMove) { playerElement.move(45, 0); updatePlayerElementImage(playerImage); }
		else { playerElement.move(15, 0); updatePlayerElementImage(playerImage); }
	}
}

function updatePlayerElementImage(imageURL) {
	playerElement.setImage(imageURL);
	playerElement.setSize(playerDimensions, playerDimensions); // This needs to be repeated, otherwise the image defaults to the defined image resolution, which isn't what we want.
}

function performAction_keyUp(e) {
	if (e.keyCode == Keyboard.SHIFT) {
		speedMove = false;
	}
	// If the player was moving left and the internal direction was left "or" if the player was moving right and the internal direction was right
	if (((e.keyCode == Keyboard.LEFT || e.keyCode == Keyboard.letter('A')) && playerDirection == "LEFT") || (e.keyCode == Keyboard.RIGHT || e.keyCode == Keyboard.letter('D')) && playerDirection == "RIGHT") {
		playerDirection = "";
	}
}

function performAction_Click(e) {
	var element = getElementAt(e.getX(), e.getY());
	if (gameRunning == true) { return; } // Reduce the amount of checks if game is running, since menu elements are no longer displayed
	if (element !== null) { // This is to prevent any undefined element errors
		if (buttonIndex(instructionButton[0], element) > -1) {
			document.dispatchEvent(instructionsOnClick);
		}
		else if ((buttonIndex(startButton[0], element) > -1) || (buttonIndex(retryButton[0], element) > -1)) {
			stopAllTimers();
			beginGame();
		}
	}
}

function buttonIndex(array, compare) {
	// Derived from https://stackoverflow.com/a/13737101
	try {
		return ([array.t, array.c, array.c1, array.c2].indexOf(compare));
	}
	catch (err) { console.log(err); } // This is done if you press something that isn't within an array (pText).
}

function stopAllTimers() {
	stopTimer(playerMove);
	stopTimer(drawCircles);
	stopTimer(setup);
}

if (typeof start === 'function') {
	start();
}