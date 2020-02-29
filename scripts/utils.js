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

function drawEverything(maze, pathMatrix){
  maze.draw();
  drawPathState(pathMatrix);
}