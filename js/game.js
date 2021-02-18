const fieldSize = 20;
const fieldSize_x = fieldSize;
const fieldSize_y = fieldSize;

const enum_colors = {
    ZERO: "#000000",
    RED: "#ff0000",
    BLUE: "#0000ff",
    GREEN: "#00ff00",
    YELLOW: "#ffff00",
    ORANGE: "#FF9100",
    PURPLE: "#651FFF",
    BROWN: "#3E2723",
    TURQUOISE: "#18FFFF"
};

const enum_directions = {
    UP: "UP",
    DOWN: "DOWN",
    LEFT: "LEFT",
    RIGHT: "RIGHT"
};

const enum_items = {
    DOUBLE_SPEED: "DOUBLE_SPEED",
    POISON_BITE: "POISON_BITE"
};

const default_snake = {
    user_name: "user_zero",
    color: enum_colors.ZERO,
    direction: null,
    last_direction: enum_directions.RIGHT,
    controlls: {
        up: "w",
        down: "s",
        left: "a",
        right: "d"
    },
    speed: 1,
    grow: 0,
    points: 1,
    alive: true,
    items: [],
    body: [
        {
            x: 6,
            y: 0
        },
        {
            x: 5,
            y: 0
        },
        {
            x: 4,
            y: 0
        },
        {
            x: 3,
            y: 0
        },
        {
            x: 2,
            y: 0
        },
        {
            x: 1,
            y: 0
        },
        {
            x: 0,
            y: 0
        }
    ]
};

const default_snake2 = {
    user_name: "user_red",
    color: enum_colors.RED,
    direction: null,
    last_direction: enum_directions.RIGHT,
    controlls: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight"
    },
    speed: 1,
    grow: 0,
    points: 1,
    alive: true,
    items: [],
    body: [
        {
            x: 6,
            y: 2
        },
        {
            x: 5,
            y: 2
        },
        {
            x: 4,
            y: 2
        },
        {
            x: 3,
            y: 2
        },
        {
            x: 2,
            y: 2
        },
        {
            x: 1,
            y: 2
        },
        {
            x: 0,
            y: 2
        }
    ]
};

const default_snake3 = {
    user_name: "user_green",
    color: enum_colors.GREEN,
    direction: null,
    last_direction: enum_directions.UP,
    controlls: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight"
    },
    speed: 1,
    grow: 0,
    points: 1,
    alive: true,
    items: [],
    body: [
        {
            x: 10,
            y: 6
        },
        {
            x: 10,
            y: 7
        },
        {
            x: 10,
            y: 8
        },
        {
            x: 10,
            y: 9
        },
        {
            x: 10,
            y: 10
        }
    ]
};

const default_food = {
    color: "#d86969",
    x: 0,
    y: 0
};

const check_snakeWallCollision = (snake) => {
    if (
        snake.body[0].x < 0 ||
        snake.body[0].x >= fieldSize_x ||
        snake.body[0].y < 0 ||
        snake.body[0].y >= fieldSize_y
    ) {
        snake.alive = false;        
        return true;
    }
    else {
        return false
    }
};

const check_snakeOwnBodyCollision = (snake) => {
    for(let i = 0; i < snake.body.length; i++){
        if(JSON.stringify(snake.body[0]) == JSON.stringify(snake.body[i]) && i > 0){
            snake.alive = false;            
            return true;
        }
    }
    return false;
}

const check_snakeSnakeCollision = (snake, snakes) => {
    let collisionHappened = false;
    snakes.forEach(otherSnake => {
        if(otherSnake.user_name != snake.user_name){            
            otherSnake.body.forEach(element => {
                if(JSON.stringify(snake.body[0]) == JSON.stringify(element)){
                    snake.alive = false;                    
                    collisionHappened = true;
                }
            });
        }
    });
    return collisionHappened;
};

const check_snakeCollisions = (snakes) => {
    let collisionHappened = false;
    snakes.forEach(snake => {
        if(snake.alive){
            collisionHappened = check_snakeWallCollision(snake);
            collisionHappened = check_snakeOwnBodyCollision(snake);
            collisionHappened = check_snakeSnakeCollision(snake, snakes);
        }        
    });
    // snakes.forEach(snake => {
    //     if(snake.alive){
    //         snake.body = [];
    //     }
    // });
    return collisionHappened;
};

const move_snake = (snake) => {
    if (snake.direction == null && snake.last_direction != null){
        snake.direction = snake.last_direction;
    }

    if (snake.direction == enum_directions.UP  && snake.last_direction == enum_directions.DOWN ||
        snake.direction == enum_directions.DOWN  && snake.last_direction == enum_directions.UP ||
        snake.direction == enum_directions.LEFT  && snake.last_direction == enum_directions.RIGHT ||
        snake.direction == enum_directions.RIGHT  && snake.last_direction == enum_directions.LEFT){
            snake.direction = snake.last_direction;
        }
    
    let newBodyElement = {
        "x": snake.body[0].x,
        "y": snake.body[0].y
    };

    for (i = 0; i < snake.speed; i++){
        if(snake.direction == enum_directions.UP){
            --newBodyElement.y;
        }
        else if(snake.direction == enum_directions.DOWN){
            ++newBodyElement.y;
        }
        else if(snake.direction == enum_directions.LEFT){
            --newBodyElement.x;
        }
        else if(snake.direction == enum_directions.RIGHT){
            ++newBodyElement.x;
        }
    }

    snake.body.unshift(newBodyElement);
    snake.last_direction = snake.direction;
    snake.direction = null

    if(snake.grow < 0){
        snake.grow = 0;
    }
    if(snake.grow == 0){
        for (i = 0; i < snake.speed; i++){
            snake.body.pop();
        }
    }
    else{
        --snake.grow;
    }

    console.log("moved");

    // if (check_snakeWallCollision(snake)){
    //     console.log("collision");
    // }
};

const changeDirection = (keycode, snakes) => {
    keycode = keycode.toLowerCase();

    snakes.forEach(snake => {
        if (keycode == snake.controlls.left.toLowerCase()) { snake.direction = enum_directions.LEFT; }
        else if (keycode == snake.controlls.up.toLowerCase()) { snake.direction = enum_directions.UP; }
        else if (keycode == snake.controlls.right.toLowerCase()) { snake.direction = enum_directions.RIGHT; }
        else if (keycode == snake.controlls.down.toLowerCase()) { snake.direction = enum_directions.DOWN; }
    });
};

const game_loop = (snakes) => {    
    ctx.beginPath();
    drawField();
    snakes.forEach(snake => {
        if(snake.alive){
            drawSnake(snake);
        }        
    });
    snakes.forEach(snake => {
        if(snake.alive){
            move_snake(snake);
        }        
    });
    
    if(check_snakeCollisions(snakes)){
        console.log("collision happend!")
    }
    

    // drawSnake(snake1);
    // move_snake(snake1);
};

const new_game = () => {    
    let snakes = [
        JSON.parse(JSON.stringify(default_snake)),
        // JSON.parse(JSON.stringify(default_snake2)),
        // JSON.parse(JSON.stringify(default_snake3))
    ];

    document.addEventListener('keydown', function (event) {
        console.log(`keyCode: ${event.key}`);
        changeDirection(event.key, snakes);
    });

    // snake1 = JSON.parse(JSON.stringify(default_snake));
    setInterval(function(){ game_loop(snakes); }, 200);
};

new_game();

//TODO: add wall collision or an option for wall warping 
//TODO: implement 2 snake
//TODO: implement snake collision (also speed up snake)
