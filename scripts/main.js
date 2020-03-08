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
var target;

var update_timeout;

window.onload = function(){
  console.log("Height :", _height, "Width: ", _width)
  canvas.addEventListener("mousedown", onMouseClick, false);
  maze = new Maze(_width, _height);
  var mazeGenerator = new dfsMazeGenerator(maze);
  mazeGenerator.generate();
  maze.draw();
  player = new Player();
	setTimeout(drawPlayer, 100, player);
  fill_configurations();
  isRunning = false;
}

function onMouseClick(event){
  if (!pathfinder)
    return;
  var rect = canvas.getBoundingClientRect();
  target = [Math.floor((event.pageY - rect.top)/cellH),
            Math.floor((event.pageX - rect.left)/cellW)];
  console.log("Target :", target);
  pathfinder.reset(player.position, target);
  clearTimeout(update_timeout);
  update();
}

function update(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  maze.draw();
  if(pathfinder.finish == false){
		drawPathState(pathfinder.pathMatrix);
		pathfinder.getSearchStep();
    if(pathfinder.finish == true)
      player.setPath(pathfinder.path);
		drawPlayer(player);
	}
	else {
		drawPlayerPath(player.path);
		player.makeStepOnPath();
		drawPlayer(player);
		if(player.position === target){
			context.clearRect(0, 0, canvas.width, canvas.height);
			maze.draw();
			drawPlayer(player);
			return;
		}
  }
  update_timeout = setTimeout(update, 80);
}
