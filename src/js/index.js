let inputDir = {
    x: 0,
    y: 0
};
let board = $("#board");
let high_scoreBox = $("#hiscoreBox");
let score_box = $("#scoreBox");
let speed = 8;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{
    x: 15,
    y: 14
}];
let foodArr = {
    x: 6,
    y: 5
};

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // if you bump into yourself
    for (let b = 1; b < snakeArr.length; b++) {
        if (snake[b].x === snake[0].x && snake[b].y === snake[0].y) {
            return true;
        }
    }
    // if you bump the wall
    if (snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    //   **Part 1
    //   Updating the snake array & food
    if (isCollide(snakeArr)) {
        inputDir = {
            x: 0,
            y: 0
        };
        snakeArr = [{
            x: 15,
            y: 14
        }];
        score = 0;
        score_box.html("Score:" + score);
        alert("Game Over. Press any key to play again!");
    }
    // if you have eaten the food, increment the score & regenerate the food
    if (snakeArr[0].y === foodArr.y && snakeArr[0].x === foodArr.x) {
        score += 1;
        if (score > high_scoreVal) {
            high_scoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(high_scoreVal));
            high_scoreBox.html("High-Score:" + high_scoreVal);
        }
        score_box.html("Score:" + score);
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x,
            y: snakeArr[0].y + inputDir.y
        });
        let a = 2;
        let b = 16;
        foodArr = {
            x: Math.round(a + (b - a) * Math.random()),
            y: Math.round(a + (b - a) * Math.random())
        }
    }
    // Moving the snake
    // !problem
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = {
            ...snakeArr[i]
        };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //   **Part 2
    //  Display the snake
    board.html("");
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div");
        $(snakeElement).css({
            "grid-row-start": e.y,
            "grid-column-start": e.x
        });
        if (index === 0) {
            $(snakeElement).addClass("head");
        } else {
            $(snakeElement).addClass("snake");
        }
        $(board).append(snakeElement);
    });
    //  Display the food
    foodElement = document.createElement("div");
    $(foodElement).addClass("food");
    $(foodElement).css({
        "grid-row-start": foodArr.y,
        "grid-column-start": foodArr.x
    });
    $(board).append(foodElement);
}

// *Main logic here
// High Score
let high_score = localStorage.getItem("highScore");
if (high_score === null) {
    high_scoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(high_scoreVal));
} else {
    high_scoreVal = JSON.parse(high_score);
    high_scoreBox.html("High-Score:" + high_score);
}
window.requestAnimationFrame(main);
$(window).keydown((e) => {
    inputDir = {
        x: 0,
        y: 1
    }; //Start here
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
    }
})