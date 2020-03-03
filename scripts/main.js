var canvas = document.getElementById('canvas');

canvas.width = window.innerWidth*0.75;
canvas.height = window.innerHeight*0.75;
var canvasOffset = 1;

var context = canvas.getContext('2d');

/// set parameters
var cellW = 60;
var cellH = 60;
var _height = Math.floor(canvas.height/cellH); //y
var _width = Math.floor(canvas.width/cellW); //x

var maze;
var pathfinder;
var player;
var targetX;
var targetY;

window.onload = function(){
  console.log("Height :", _height, "Width: ", _width)
  canvas.addEventListener("mousedown", onMouseClick, false);
  maze = new Maze(_width, _height);
  var mazeGenerator = new dfsMazeGenerator(maze);
  mazeGenerator.generate();
  maze.draw();
  player = new Player();
}

function onMouseClick(event){
  var rect = canvas.getBoundingClientRect();
  targetX = Math.floor((event.pageX - rect.left)/cellW);
  targetY = Math.floor((event.pageY - rect.top)/cellH);
  console.log("Target :", targetY, targetX);
  pathfinder = new leePathfinder(maze, player.position, [targetY, targetX]);
  update();
}

function update(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawEverything(maze, pathfinder.pathMatrix, player);
  if(pathfinder.finish == false){
		pathfinder.getSearchStep();
		player.setPath(pathfinder.path);
	}
	else {
		player.makeStepOnPath();
		if(player.position[0] == targetY && player.position[1] == targetX){
			context.clearRect(0, 0, canvas.width, canvas.height);
			drawEverything(maze, pathfinder.pathMatrix, player);
			return;
		}
  }
  setTimeout(update, 80);
}
