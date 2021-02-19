var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var cellCount = 20
var cellCount_x = cellCount;
var cellCount_y = cellCount;

var cellSize_x = canvas.width / cellCount_x
var cellSize_y = canvas.width / cellCount_y

var field_gridLineThickness = 1; //1 for standart thickness (default = 1)
var fieldColor_background = "#ffffff";
var fieldColor_backgroundGrid  = "#eeeeee";
var splitSnakePieces = true;

//WORKING
const drawField = () => {
    ctx.fillStyle = fieldColor_background;
    ctx.strokeStyle = fieldColor_backgroundGrid;
    ctx.lineWidth = field_gridLineThickness;

    ctx.fillRect(0, 0, canvas.height, canvas.width);

    for(var x = 0; x <= canvas.width; x += cellSize_x) {        
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
    }
    for(var y = 0; y <= canvas.height; y += cellSize_y) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
    }

    ctx.stroke()
};

//WORKING
function drawSquare(x,y,color) {
    ctx.fillStyle = color;
    if (splitSnakePieces){
        ctx.fillRect(
            x * cellSize_x + field_gridLineThickness / 2, 
            y * cellSize_y + field_gridLineThickness / 2, 
            cellSize_x - field_gridLineThickness, 
            cellSize_y - field_gridLineThickness
        );
    }
    else{
        ctx.fillRect(
            x * cellSize_x, 
            y * cellSize_y, 
            cellSize_x, 
            cellSize_y
        );
    }
        
}

//WORKING
const drawSnake = (snake) => {
    let body = snake.body;
    body.forEach(element => {
        drawSquare(element.x, element.y, snake.color);
    });
};

//WORKING
const drawFood = (food) => {
    drawSquare(food.position.x, food.position.y, food.color);
}

//TESTDATA
var testSnake = {
    "points": 0,
    "color": "#4EC5F1",
    "body": [
        {
            "x": 1,
            "y": 1
        },
        {
            "x": 2,
            "y": 1
        },
        {
            "x": 3,
            "y": 1
        },
        {
            "x": 4,
            "y": 1
        }
    ]
}
//TESTDATA
var testSnake2 = {
    "points": 0,
    "color": "#c6f575",
    "body": [
        {
            "x": 7,
            "y": 6
        },
        {
            "x": 7,
            "y": 5
        },
        {
            "x": 7,
            "y": 4
        },
        {
            "x": 7,
            "y": 3
        }
    ]
}
//TESTDATA
var testFood = {
    color: "#d86969",
    x: 0,
    y: 9
}

//TESTFUNCTION
const testFunction = () => {
    ctx.beginPath();
    drawField();
    drawSnake(testSnake);
    drawSnake(testSnake2);
    drawFood(testFood);
};

// testFunction();