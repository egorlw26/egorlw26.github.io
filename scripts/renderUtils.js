// common draw
//simple way to draw line
function draw_line(startX, startY, endX, endY, strokeStyle){
  context.beginPath();
  context.strokeStyle = strokeStyle;
  context.lineWidth = 3;
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
function draw_maze(maze) {
  for (let y = 0; y < maze.height; ++y)
    for (let x = 0; x < maze.width; ++x)
      draw_maze_cell(maze.maze[y][x]);
}

function draw_maze_cell(cell) {
  draw_cell_walls(cell);
  draw_cell_type(cell);
}

function draw_cell_walls(cell) {
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
                '#b8d5d6');
    }
    x = next_x;
    y = next_y;
  }
}

function draw_cell_type(cell) {
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
