const fieldSize = 20;
const fieldSize_x = fieldSize;
const fieldSize_y = fieldSize;

const enum_snakecolors = {
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

const enum_foodColors = {    
    GRAY: "#BDBDBD",        //enum_foodEffects.NORMAL_GROWTH
    BLUE_GRAY: "#78909C",   //enum_foodEffects.DOUBLE_GROWTH
    RED: "#EF5350",         //enum_foodEffects.DOUBLE_SPEED
    DEEP_PURPLE: "#311B92"  //enum_foodEffects.POISON_BITE
}

const enum_foodType = {
    SINGLE_GROWTH: "SINGLE_GROWTH", //enum_foodColors.GRAY
    DOUBLE_GROWTH: "DOUBLE_GROWTH", //enum_foodColors.BLUE_GRAY
    DOUBLE_SPEED: "DOUBLE_SPEED",   //enum_foodColors.RED
    POISON_BITE: "POISON_BITE"      //enum_foodColors.DEEP_PURPLE
};

const default_snake = {
    user_name: "user_zero",
    color: enum_snakecolors.ZERO,
    direction: null,
    last_direction: enum_directions.RIGHT,
    controlls: {
        up: "w",
        down: "s",
        left: "a",
        right: "d"
    },
    effects: [],
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
    color: enum_snakecolors.RED,
    direction: null,
    last_direction: enum_directions.RIGHT,
    controlls: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight"
    },
    effects: [],
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
    color: enum_snakecolors.GREEN,
    direction: null,
    last_direction: enum_directions.UP,
    controlls: {
        up: "ArrowUp",
        down: "ArrowDown",
        left: "ArrowLeft",
        right: "ArrowRight"
    },
    effects: [],
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
    id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    type: enum_foodType.SINGLE_GROWTH,
    color: enum_foodColors.GRAY,
    position: {
        x: 0,
        y: 0
    }       
};

// const default_effect = {
//     type: SINGLE_GROWTH,
//     activeRounds: 1
// }

const effect_SINGLE_GROWTH = {
    type: enum_foodType.SINGLE_GROWTH,
    activeRounds: 1
}

const effect_DOUBLE_GROWTH = {
    type: enum_foodType.DOUBLE_GROWTH,
    activeRounds: 1
}

const effect_DOUBLE_SPEED = {
    type: enum_foodType.DOUBLE_SPEED,
    activeRounds: 4
}

const effect_POISON_BITE = {
    type: enum_foodType.POISON_BITE,
    activeRounds: 4
}

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
    snakes.map(otherSnake => {
        if(otherSnake.user_name != snake.user_name && otherSnake.alive){            
            otherSnake.body.map(element => {
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
    snakes.map(snake => {
        if(snake.alive){
            collisionHappened = check_snakeWallCollision(snake);
            collisionHappened = check_snakeOwnBodyCollision(snake);
            collisionHappened = check_snakeSnakeCollision(snake, snakes);
        }        
    });
    // snakes.map(snake => {
    //     if(snake.alive){
    //         snake.body = [];
    //     }
    // });
    return collisionHappened;
};

const create_foodElement = (snakes, food) => {    
    let collisionHappened = true;
    let newFoodPos = null;
    let newFood = JSON.parse(JSON.stringify(default_food));

    while(collisionHappened){
        newFoodPos = {
            x: Math.floor(Math.random() * fieldSize_x),
            y: Math.floor(Math.random() * fieldSize_y)
        };
        collisionHappened = false;
        //check for food snake collision
        for(let snake_index = 0; snake_index < snakes.length; snake_index++){
            for(let bodyElement_index = 0; bodyElement_index < snakes[snake_index].body.length; bodyElement_index++){
                if(JSON.stringify(snakes[snake_index].body[bodyElement_index]) == JSON.stringify(newFoodPos)){
                    collisionHappened = true;
                }
                if(collisionHappened){
                    break;
                }
            }
            if(collisionHappened){
                break;
            }
        }
        //check for food food collision
        if(collisionHappened == false){
            for (let food_index = 0; food_index < food.length; food_index++) {
                if(JSON.stringify(food[food_index].position) == JSON.stringify(newFoodPos)){
                    collisionHappened = true;
                }
                if(collisionHappened){
                    break;
                }
            }
        }
    }

    newFood.position = newFoodPos;
    newFood.id = uuidv4();
    return newFood;
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
};

const changeDirection = (keycode, snakes) => {
    keycode = keycode.toLowerCase();

    snakes.map(snake => {
        if (keycode == snake.controlls.left.toLowerCase()) { snake.direction = enum_directions.LEFT; }
        else if (keycode == snake.controlls.up.toLowerCase()) { snake.direction = enum_directions.UP; }
        else if (keycode == snake.controlls.right.toLowerCase()) { snake.direction = enum_directions.RIGHT; }
        else if (keycode == snake.controlls.down.toLowerCase()) { snake.direction = enum_directions.DOWN; }
    });
};

const check_snakeFoodEaten = (snakes, food) => {
    let foodEaten = false;
    snakes.map(snake => {
        for (let food_index = 0; food_index < food.length; food_index++) {
            if(JSON.stringify(snake.body[0]) == JSON.stringify(food[food_index].position)){                
                if(food[food_index].type == enum_foodType.SINGLE_GROWTH){
                    snake.effects.push(JSON.parse(JSON.stringify(effect_SINGLE_GROWTH)));                    
                }
                else if(food[food_index].type == enum_foodType.DOUBLE_GROWTH){
                    snake.effects.push(JSON.parse(JSON.stringify(effect_DOUBLE_GROWTH)));                    
                }
                else if(food[food_index].type == enum_foodType.DOUBLE_SPEED){
                    snake.effects.push(JSON.parse(JSON.stringify(effect_DOUBLE_SPEED)));                    
                }
                else if(food[food_index].type == enum_foodType.POISON_BITE){
                    snake.effects.push(JSON.parse(JSON.stringify(effect_POISON_BITE)));                    
                }
                else{
                    snake.effects.push(JSON.parse(JSON.stringify(effect_SINGLE_GROWTH)));                    
                    console.log(`food.type: ${food[food_index].type} -> NOT IMPLEMENTED: Fallback to SINGLE_GROWTH.`);
                }
                food.splice(food_index, 1);
                foodEaten = true;
            }
        }
    });
    return foodEaten;
};

const activate_effects = (snakes) => {
    //TODO: implement activate_effects function
    snakes.map(snake => {
        if(snake.alive){
            for (let effect_index = 0; effect_index < snake.effects.length; effect_index++) {
                let effect = snake.effects[effect_index];

                if(effect.type == enum_foodType.SINGLE_GROWTH){
                    snake.grow++;                
                }
                else if(effect.type == enum_foodType.DOUBLE_GROWTH){
                    snake.grow += 2;                
                }
                else if(effect.type == enum_foodType.DOUBLE_SPEED){
                    //NOT IMPLEMENTED
                }
                else if(effect.type == enum_foodType.POISON_BITE){
                    //NOT IMPLEMENTED
                }

                effect.activeRounds--;
                if(effect.activeRounds == 0){
                    snake.effects.splice(effect_index, 1);
                }
            }
        }
    });
    return true;
};

const game_loop = (snakes, food) => {
    //initialize canvas
    ctx.beginPath();

    //draw field
    drawField();

    //draw snakes
    snakes.map(snake => {
        if(snake.alive){
            drawSnake(snake);
        }
    });

    //draw food
    food.map(foodElement => {
        drawFood(foodElement);
    });

    //activate all collected effects
    activate_effects(snakes);

    //move snakes
    snakes.map(snake => {
        if(snake.alive){
            move_snake(snake);
        }
    });
    
    //check snakes collisions
    if(check_snakeCollisions(snakes)){
        console.log("collision happend!")
    }

    //check food eaten
    check_snakeFoodEaten(snakes, food);

    if(food.length < 1){
        food.push(create_foodElement(snakes, food));
    }

    // drawSnake(snake1);
    // move_snake(snake1);
};

const new_game = () => {    
    let snakes = [
        JSON.parse(JSON.stringify(default_snake)),
        JSON.parse(JSON.stringify(default_snake2)),
        // JSON.parse(JSON.stringify(default_snake3))
    ];
    let food = [];
    food.push(create_foodElement(snakes, food));

    document.addEventListener('keydown', function (event) {
        console.log(`keyCode: ${event.key}`);
        changeDirection(event.key, snakes);
    });

    // snake1 = JSON.parse(JSON.stringify(default_snake));
    setInterval(function(){ game_loop(snakes, food); }, 200);
};

new_game();

//TODO: effect sichtbar machen -> eventuell an den user_name anhängen    
//TODO: activate_effects implementieren -> function vordefiniert
//TODO: rethink/rework how items work
//TODO: implement missing effects like speed up snake


//TODO: add an option for wall warping
//TODO: usernames mit colors of snake anzeigen
//TODO: ensure there is always one foodElement on field
