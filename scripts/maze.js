const Dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1]
];

const CellType = {
  "Empty"       : 0,
  "Food"        : 1,
  "SpecialFood" : 2,
}

class Cell {
  constructor(y, x, type) {
    this.type = type;
    this.walls = [true, true, true, true];
    this.x = x;
    this.y = y;
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
        row.push(new Cell(y, x, CellType.Food));
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

  isWallBetweenTwoCells(firstCell, secondCell){
    var dir = [secondCell[0] - firstCell[0], secondCell[1] - firstCell[1]];
    var dir_id = -1;
    for(var i = 0; i<4; ++i)
      if(Dirs[i][0] == dir[1] && Dirs[i][1] == dir[0]){
        dir_id = i;
        break;
      }
    return this.maze[firstCell[0]][firstCell[1]].walls[(dir_id)%4];
  }

  breakWallBetweenTwoCells(firstCell, secondCell){
    var dir = [secondCell[0] - firstCell[0], secondCell[1] - firstCell[1]];
    var dir_id = -1;
    for(var i = 0; i<4; ++i)
      if(Dirs[i][0] == dir[1] && Dirs[i][1] == dir[0]){
        dir_id = i;
        break;
      }
    this.maze[firstCell[0]][firstCell[1]].walls[dir_id % 4] = false;
    this.maze[secondCell[0]][secondCell[1]].walls[(dir_id + 2) % 4] = false;
  }
  
  buildWallBetweenTwoCells(firstCell, secondCell){
    var dir = [secondCell[0] - firstCell[0], secondCell[1] - firstCell[1]];
    var dir_id = -1;
    for(var i = 0; i<4; ++i)
      if(Dirs[i][0] == dir[1] && Dirs[i][1] == dir[0]){
        dir_id = i;
        break;
      }
    this.maze[firstCell[0]][firstCell[1]].walls[dir_id % 4] = true;
    this.maze[secondCell[0]][secondCell[1]].walls[(dir_id + 2) % 4] = true;
  }

  isInGrid(y, x) {
    return (x >= 0 && y >= 0 && x < this.width && y < this.height);
  }
}
