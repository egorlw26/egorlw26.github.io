var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth*0.75;
canvas.height = window.innerHeight*0.75;
var canvasOffset = 1;

var context = canvas.getContext('2d')

/// set parameters
var rows = 25;
var columns = 25;
var _height = Math.floor(canvas.width/cellW);
var _width = Math.floor(canvas.height/cellH);

//simple way to draw line
function draw_line(startX, startY, endX, endY){
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

function randomInt(a, b) {
  return Math.floor(a + Math.random() * (b - a));
}

function randomChoice(list) {
  const id = randomInt(0, list.length);
  return list[id];
}

const Dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1]
];

class Cell {
  constructor(type = 0) {
    this.type = type;
    this.walls = [true, true, true, true];
  }

  draw(x, y) {
    context.strokeStyle = '#2b3cff'
    for (let i = 0; i < 4; ++i) {
      const next_x = x + Dirs[(i + 1) % 4][0];
      const next_y = y + Dirs[(i + 1) % 4][1];
      if (this.walls[i]) {
        draw_line(canvasOffset + x * cellW, canvasOffset + y * cellH,
          canvasOffset + next_x * cellW, canvasOffset + next_y * cellH);
      }
      x = next_x;
      y = next_y;
    }
  }
}

class Maze {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.initGrid()
  }

  initGrid() {
    this.maze = [];
    for (let y = 0; y < this.height; ++y) {
      var row = [];
      for (let x = 0; x < this.width; ++x)
        row.push(new Cell(0));
      this.maze.push(row);
    }
  }

  isInGrid(y, x) {
    return (x >= 0 && y >= 0 && x < this.width && y < this.height);
  }

  dfsGenerator() {
    var visited = [];
    for (let y = 0; y < this.height; ++y) {
      var row = [];
      for (let x = 0; x < this.width; ++x)
        row.push(false);
      visited.push(row);
    }
    var stack = [
      [randomInt(0, this.width), randomInt(0, this.height)]
    ];
    while (stack.length > 0) {
      const curr_pos = stack[stack.length - 1];
      const x = curr_pos[0];
      const y = curr_pos[1];
      visited[y][x] = true;
      var available_dirs = [];
      for (let i = 0; i < 4; ++i) {
        const cell_x = x + Dirs[i][0];
        const cell_y = y + Dirs[i][1];
        if (this.isInGrid(cell_y, cell_x) && !visited[cell_y][cell_x])
          available_dirs.push(i);
      }
      if (available_dirs.length == 0) {
        stack.pop();
        continue;
      }
      const dir_id = randomChoice(available_dirs);
      const next_x = x + Dirs[dir_id][0];
      const next_y = y + Dirs[dir_id][1];
      stack.push([next_x, next_y]);
      this.maze[y][x].walls[dir_id] = false;
      this.maze[next_y][next_x].walls[(dir_id + 2) % 4] = false;
    }
  }

  draw() {
    for (let y = 0; y < this.height; ++y)
      for (let x = 0; x < this.width; ++x)
        this.maze[y][x].draw(x, y);
  }
}

class Player{
  constructor(maze){
    this.path = [];
    this.found = false;
    this.visited = [];
    this.maze = maze;
  }
  dfsPathfinderStart(){
    this.found = false;
    this.visited = [];
    for(var i = 0; i<_height; i++){
      var row = [];
      for(var j = 0; j<_width; j++)
        row.push(false);
      this.visited.push(row);
    }

    this.path =[
      [_height-1, _width-1]
    ];
  }

  dfsPathfinderMakeStep(targetX, targetY) {
      if(this.path.length > 0 && !this.found) {
      const curr_pos = this.path[this.path.length -1];
      const x = curr_pos[1];
      const y = curr_pos[0];
      this.visited[y][x] = true;

      /// We found our target!
      if(x === targetX && y === targetY){
        this.found = true;
        return;
      }

      var available_dirs = []
      for(var i = 0; i<4; i++){
        const cell_x = x + Dirs[i][0];
        const cell_y = y + Dirs[i][1];
        if(this.maze.isInGrid(cell_y, cell_x) && !this.visited[cell_y][cell_x] && !this.maze.maze[y][x].walls[i])
          available_dirs.push(i);
      }

      if (available_dirs.length == 0) {
        this.path.pop();
        return;
      }

      const dir_id = randomChoice(available_dirs);
      const next_x = x + Dirs[dir_id][0];
      const next_y = y + Dirs[dir_id][1];
      this.path.push([next_x, next_y]);
    }
  }
}

class dfsPathfinder{
	constructor(maze, start, target){
    	this.start = start;
    	this.target = target;
    	this.maze = maze;
    	this.finish = false;
		this.visited = [];
    	this.pathMatrix =[];
    	for(var i = 0; i<_height; i++){
      		var visitedRow = [];
      		var pathRow = [];
      		for(var j = 0; j<_width; j++){
        		visitedRow.push(false);
        		pathRow.push(0);
      		}
      	this.visited.push(visitedRow);
      	this.pathMatrix.push(pathRow);
      	this.pathMatrix[start[1]][start[0]] = 1;
      	this.path = [
      		[start[1], start[0]
      		]];
    	}
	}

	getSearchStep(){
	      if(this.path.length > 0 && !this.finish) {
	      const curr_pos = this.path[this.path.length -1];
	      const x = curr_pos[1];
	      const y = curr_pos[0];
	      this.visited[y][x] = true;

	      /// We found our target!
	      if(x === this.target[1] && y === this.target[0]){
	        this.finish = true;
	        return;
	      }

	      var available_dirs = []
	      for(var i = 0; i<4; i++){
	        const cell_x = x + Dirs[i][0];
	        const cell_y = y + Dirs[i][1];
	        if(this.maze.isInGrid(cell_x, cell_y) && !this.visited[cell_y][cell_x] && !this.maze.maze[y][x].walls[i])
	          available_dirs.push(i);
	      }

	      if (available_dirs.length == 0) {
	      	this.pathMatrix[x][y] = 0;
	        this.path.pop();
	        return;
	      }

	      const dir_id = randomChoice(available_dirs);
	      const next_x = x + Dirs[dir_id][0];
	      const next_y = y + Dirs[dir_id][1];
	      this.path.push([next_x, next_y]);
	      this.pathMatrix[next_x][next_y] = 1;
	    }
	}
}

function drawPathState(pathMatrix){
	for(var i = 0; i < _height; i++)
		for(var j = 0; j< _width; j++)
			if(pathMatrix[i][j]===1)
			{
				context.rect(i*cellW + cellW/4, j*cellH + cellH/4, 
					cellW/2, cellH/2);
				context.fill();
			}
}

function drawPlayerPath(path){
	context.strokeStyle = 'red';
  	for(var i = 1; i<path.length; i++)
  		draw_line(path[i-1][0]*cellW + cellW/2, path[i-1][1]*cellH + cellH/2, 
    		path[i][0]*cellW + cellW/2, path[i][1]*cellH + cellH/2);
}

function drawEverything(maze, player){
  maze.draw();
  drawPlayerPath(player.path);
}

window.onload = function(){
  canvas.addEventListener("mousedown", onMouseClick, false);
  maze = new Maze(_height, _width);
  maze.dfsGenerator();
  maze.draw();
  player = new Player(maze);
}

var maze;
var player;
var targetX;
var targetY;

function onMouseClick(event){
  player.dfsPathfinderStart();
  var rect = canvas.getBoundingClientRect();
  targetX = Math.floor((event.pageX - rect.left)/cellW);
  targetY = Math.floor((event.pageY - rect.top)/cellH);
  console.log("target ", targetX, targetY);
  update();
}

function update(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  player.dfsPathfinderMakeStep(targetX, targetY);
  drawEverything(maze, player);
  if(player.found === true)
  {
    console.log("STOP");
    return;
  }
  setTimeout(update, 40);
}
