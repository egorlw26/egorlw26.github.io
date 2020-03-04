//simple way to draw line
function draw_line(startX, startY, endX, endY){
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
}

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
  maze.draw();
  drawPathState(pathMatrix);
	drawPlayer(player);
}