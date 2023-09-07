var gamepads = {};

//Buttons
//B0 = "A"
//B1 = "B"
//B2 = "X"
//B3 = "Y"
//B4 = "LB"
//B5 = "RB"
//B6 = "LT"
//B7 = "RT"
//B8 = "SELECT"
//B9 = "START"
//B10 = "L3" //LJ
//B11 = "R3" //RJ
//B12 = "UP"
//B13 = "DOWN"
//B14 = "LEFT"
//B15 = "RIGHT"
//B16 = "XBOX" //NOT WORKING because Windows uses it!

//Axes
//AXES0 = LJ (LEFT/RIGHT) (-1/1)
//AXES1 = LJ (UP/DOWN) (-1/1)
//AXES2 = RJ (LEFT/RIGHT) (-1/1)
//AXES3 = RJ (UP/DOWN) (-1/1)

const gamepadHandler = (event, connecting) => {
    var gamepad = event.gamepad;
    // Note:
    // gamepad === navigator.getGamepads()[gamepad.index]

    if (connecting) {
        gamepads[gamepad.index] = gamepad;
    } else {
        delete gamepads[gamepad.index];
    }
}

const pollGamepads = (snakes) => {
    var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    for (var i = 0; i < gamepads.length; i++) {
        var gp = gamepads[i];
        if (gp) {
            // gamepadInfo.innerHTML = "Gamepad connected at index " + gp.index + ": " + gp.id +
            //   ". It has " + gp.buttons.length + " buttons and " + gp.axes.length + " axes.";
            console.log(gp);            
            gamepad_changeDirection(gp, snakes[i])
            
            // gameLoop();
            // clearInterval(interval);
        }
    }
};

const gamepad_changeDirection = (gamepad, snake) => {
    let buttons = gamepad.buttons;
    let axes = gamepad.axes;
    //B12 = "UP"
    //B13 = "DOWN"
    //B14 = "LEFT"
    //B15 = "RIGHT"
    if (buttons[12].pressed) { snake.direction = enum_directions.UP; }
    else if (buttons[13].pressed) { snake.direction = enum_directions.DOWN; }
    else if (buttons[14].pressed) { snake.direction = enum_directions.LEFT; }
    else if (buttons[15].pressed) { snake.direction = enum_directions.RIGHT; }

    //AXES0 = LJ (LEFT/RIGHT) (-1/1)
    //AXES1 = LJ (UP/DOWN) (-1/1)
    //AXES2 = RJ (LEFT/RIGHT) (-1/1)
    //AXES3 = RJ (UP/DOWN) (-1/1)
    let joyStick_threshold = 0.6;
    if (axes[1] <= -joyStick_threshold && axes[0] >= -joyStick_threshold && axes[0] <= joyStick_threshold) { snake.direction = enum_directions.UP; }
    else if (axes[1] >= joyStick_threshold && axes[0] >= -joyStick_threshold && axes[0] <= joyStick_threshold) { snake.direction = enum_directions.DOWN; }
    else if (axes[0] <= -joyStick_threshold && axes[1] >= -joyStick_threshold && axes[1] <= joyStick_threshold) { snake.direction = enum_directions.LEFT; }
    else if (axes[0] >= joyStick_threshold && axes[1] >= -joyStick_threshold && axes[1] <= joyStick_threshold) { snake.direction = enum_directions.RIGHT; }
}



window.addEventListener("gamepadconnected", function (e) { gamepadHandler(e, true); }, false);
window.addEventListener("gamepaddisconnected", function (e) { gamepadHandler(e, false); }, false);