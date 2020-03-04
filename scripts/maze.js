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

  getNeighbours(y, x){
      var neighbours = [];
      for (let i = 0; i < 4; ++i) {
        const cell_x = x + Dirs[i][0];
        const cell_y = y + Dirs[i][1];
        if (this.isInGrid(cell_y, cell_x))
          neighbours.push([cell_y, cell_x]);
      }
      return neighbours;
  }

  breakWallBetweenTwoCells(firstCell, secondCell){
    var dir = [secondCell[0] - firstCell[0], secondCell[1] - firstCell[1]];
    var dir_id = -1;
    for(var i = 0; i<4; ++i)
      if(Dirs[i][0] == dir[1] && Dirs[i][1] == dir[0]){
        dir_id = i;
        break;
      }
    this.maze[firstCell[0]][firstCell[1]].walls[(dir_id)%4] = false;
      this.maze[secondCell[0]][secondCell[1]].walls[(dir_id + 2) % 4] = false;
  }

  isInGrid(y, x) {
    return (x >= 0 && y >= 0 && x < this.width && y < this.height);
  }
  draw() {
    for (let y = 0; y < this.height; ++y)
      for (let x = 0; x < this.width; ++x)
        this.maze[y][x].draw(x, y);
  }
}