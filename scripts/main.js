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

var pacman_src = "sources/bedolaga.png";
var ghost_src = "sources/ghost.png";

var game;

window.onload = function(){
  console.log("Height :", _height, "Width: ", _width)
  //canvas.addEventListener("mousedown", onMouseClick, false);
  maze = new Maze(_width, _height);
  var mazeGenerator = new dfsMazeGenerator(maze);
  mazeGenerator.generate();
  makeCyclic(maze);
  game = new Game(maze);
  //player = new Player([0,0], pacman_src);
	//setTimeout(drawPlayer, 100, player);
  //fill_configurations();
  runGame();
}

function runGame() {
  drawGame(game);
  game.tick();
  updateGameStats(game);
  setTimeout(runGame, 250);
}

function onMouseClick(event){
  if (!pathfinder)
    return;
  var rect = canvas.getBoundingClientRect();
  target = [Math.floor((event.pageY - rect.top)/cellH),
            Math.floor((event.pageX - rect.left)/cellW)];
  console.log("Target :", target);
  pathfinder.reset(player.position, target);
  refresh();
  update();
}

function update(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw_maze(maze);
  if(pathfinder.finish == false){
		drawPathState(pathfinder.pathMatrix);
		pathfinder.getSearchStep();
    if(pathfinder.finish == true)
      player.setPath(pathfinder.path);
		drawPlayer(player);
    player.setPath(pathfinder.path);
	}
	else {
		drawPlayerPath(player.path);
		player.makeStepOnPath();
		drawPlayer(player);
  }
  update_timeout = setTimeout(update, 80);
}
