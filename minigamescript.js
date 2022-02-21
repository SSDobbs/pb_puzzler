/*'MINESWEEPER' GAME WITH FEZZIK*/
var components = {
    num_of_rows: 12,
    num_of_cols: 12,
    num_of_rocks: 26,
    rock: "🪨",
    alive: true,
    colors: {
        1: 'blue',
        2: 'green',
        3: 'red',
        4: 'purple',
        5: 'maroon',
        6: 'turquoise',
        7: 'black',
        8: 'grey'
    }
}

function startGame() {
    components.rocks = placeRocks();
    document.getElementById('field').appendChild(createTable());
}

function placeRocks() {
    var i, rows = [];
    for (let i = 0; i < components.num_of_rocks; i++) {
        placeSingleRock(rows);
    }
    return rows;
}

function placeSingleRock(rocks) {

    var nrow, ncol, row, col;
    nrow = Math.floor(Math.random() * components.num_of_rows);
    ncol = Math.floor(Math.random() * components.num_of_cols);
    row = rocks[nrow];

    if (!row) {
        row = [];
        rocks[nrow] = row;
    }

    col = row[ncol];

    if (!col) {
        row[ncol] = true;
        return
    } else {
        placeSingleRock(rocks);
    }
}

function cellID(i, j) {
    return 'cell-' + i + '-' + j;
}

function createTable() {
    var table, row, td, i, j;
    table = document.createElement('table');

    for (i = 0; i < components.num_of_rows; i++) {
        row = document.createElement('tr');
        for (j = 0; j < components.num_of_cols; j++) {
            td = document.createElement('td');
            td.id = cellID(i, j);
            row.appendChild(td);
            addCellListeners(td, i, j);
        }
        table.appendChild(row);
    }
    return table;
}

function addCellListeners(td, i, j) {
    td.addEventListener('mousedown', function (event) {
        if (!components.alive) {
            return;
        }
        components.mousewhiches += event.which;
        if (event.which === 3) {
            return;
        }
        if (this.flagged) {
            return;
        }
        this.style.backgroundColor = 'hsl(27, 85%, 38%)';
    });

    td.addEventListener('mouseup', function (event) {

        if (!components.alive) {
            return;
        }

        if (this.clicked && components.mousewhiches == 4) {
            performMassClick(this, i, j);
        }

        components.mousewhiches = 0;

        if (event.which === 3) {

            if (this.clicked) {
                return;
            }
            if (this.flagged) {
                this.flagged = false;
                this.textContent = '';
            } else {
                this.flagged = true;
                this.textContent = components.flag;
            }

            event.preventDefault();
            event.stopPropagation();

            return false;
        } else {
            handleCellClick(this, i, j);
        }
    });

    td.oncontextmenu = function () {
        return false;
    };
}

function handleCellClick(cell, i, j) {
    if (!components.alive) {
        return;
    }

    if (cell.flagged) {
        return;
    }

    cell.clicked = true;

    if (components.rocks[i][j]) {
        cell.style.color = 'red';
        cell.textContent = components.rock;
        gameOver();

    } else {
        cell.style.backgroundColor = '#b87635';
        num_of_rocks = adjacentRocks(i, j);
        if (num_of_rocks) {
            cell.style.color = components.colors[num_of_rocks];
            cell.textContent = num_of_rocks;
        } else {
            clickAdjacentRocks(i, j);
        }
    }
}

function adjacentRocks(row, col) {
    var i, j, num_of_rocks;
    num_of_rocks = 0;

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            if (components.rocks[row + i] && components.rocks[row + i][col + j]) {
                num_of_rocks++;
            }
        }
    }
    return num_of_rocks;
}

function adjacentFlags(row, col) {
    var i, j, num_flags;
    num_flags = 0;

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            cell = document.getElementById(cellID(row + i, col + j));
            if (!!cell && cell.flagged) {
                num_flags++;
            }
        }
    }
    return num_flags;
}

function clickAdjacentRocks(row, col) {
    var i, j, cell;

    for (i = -1; i < 2; i++) {
        for (j = -1; j < 2; j++) {
            if (i === 0 && j === 0) {
                continue;
            }
            cell = document.getElementById(cellID(row + i, col + j));
            if (!!cell && !cell.clicked && !cell.flagged) {
                handleCellClick(cell, row + i, col + j);
            }
        }
    }
}

function performMassClick(cell, row, col) {
    if (adjacentFlags(row, col) === adjacentRocks(row, col)) {
        clickAdjacentrRcks(row, col);
    }
}

function gameOver() {
    components.alive = false;
    document.getElementById('lost').style.display = "block";
    alert("Fezzik has knocked you out!");

}

function reload() {
    window.location.reload();
}

window.addEventListener('load', function () {
    document.getElementById('lost').style.display = "none";
    startGame();
});
/*END 'MINESWEEPER GAME WITH FEZZIK*/



/*SWORD MINI GAME*/
var myGamePiece;
var myObstacles = [];

function startSword() {
    myGamePiece = new component(30, 30, "hsl(27, 85%, 38%)", 10, 120);
    myGameArea.start();
    /* var audio = new Audio('/decent.mp3');
    audio.play();*/
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(10, height, "black", x, 0));
        myObstacles.push(new component(10, x - height - gap, "black", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}

function moveup() {
    myGamePiece.speedY = -1;
}

function movedown() {
    myGamePiece.speedY = 1;
}

function moveleft() {
    myGamePiece.speedX = -1;
}

function moveright() {
    myGamePiece.speedX = 1;
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
} /*END SWORD MINI GAME*/