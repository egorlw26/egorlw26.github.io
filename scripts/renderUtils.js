// common draw
//simple way to draw line
function draw_line(startX, startY, endX, endY, strokeStyle){
  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

function draw_circle(x, y, radius, fill = true) {
  context.beginPath();
  context.fillStyle = "white";
  context.arc(x, y, radius, 0, 2 * Math.PI, false);
  if (fill)
    context.fill();
}


// draw maze
function drawMaze(maze) {
  for (let y = 0; y < maze.height; ++y)
    for (let x = 0; x < maze.width; ++x)
      drawMazeCell(maze.maze[y][x]);
}

function drawMazeCell(cell) {
  drawCellWalls(cell);
  drawCellType(cell);
}

function drawCellWalls(cell) {
  var x = cell.x;
  var y = cell.y;
  for (let i = 0; i < 4; ++i) {
    const next_x = x + Dirs[(i + 1) % 4][0];
    const next_y = y + Dirs[(i + 1) % 4][1];
    if (cell.walls[i]) {
      draw_line(canvasOffset + x * cellW, 
                canvasOffset + y * cellH,
                canvasOffset + next_x * cellW, 
                canvasOffset + next_y * cellH,
                '#2b3cff');
    }
    x = next_x;
    y = next_y;
  }
}

function drawCellType(cell) {
  switch (cell.type) {
    case CellType.Empty :
      break;
    case CellType.Food :
      draw_circle(canvasOffset + (cell.x + 0.5) * cellW,
                  canvasOffset + (cell.y + 0.5) * cellH,
                  cellW / 16);
      break;
    case CellType.SpecialFood :
      draw_circle(canvasOffset + (cell.x + 0.5) * cellW,
                  canvasOffset + (cell.y + 0.5) * cellH,
                  cellW / 8);
      break;
  }
}

// draw path
function drawPathState(pathMatrix){
  for(var i = 0; i < _height; ++i)
    for(var j = 0; j< _width; ++j)
      if(pathMatrix[i][j] >= 1)
      {
        context.fillStyle = `rgb(
        ${Math.floor(255 - 10* pathMatrix[i][j])},
        ${Math.floor(0 + 5 *pathMatrix[i][j])},
        ${Math.floor(255 - 3*pathMatrix[i][j])})`;
        context.fillRect(j*cellW + cellW*0.25, i*cellH +cellH*0.25, 
          cellW*0.5, cellH*0.5);
      }
}

function drawPlayerPath(path){
	for(let i = 0; i < path.length; ++i){
		context.fillStyle = 'red';
		context.fillRect(path[i][1]*cellW + cellW*0.25, path[i][0]*cellH + cellH*0.25,
			cellW*0.5, cellH*0.5);
	}
}

function drawPlayer(player){
	context.drawImage(player.image, player.position[1]*cellW, player.position[0]*cellH, cellW, cellH);
}

function drawEverything(maze, pathMatrix, player){
  draw_maze(maze);
  drawPathState(pathMatrix);
	drawPlayer(player);
}

function refresh() {
  clearTimeout(update_timeout);
  context.clearRect(0, 0, canvas.width, canvas.height);
  draw_maze(maze);
  drawPlayer(player);
}

function drawGame(game) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze(game.maze);
  drawPlayer(game.ghost);
  drawPlayer(game.pacman);
}