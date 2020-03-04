class leePathfinder {
	constructor(maze, start, target){
		this.maze = maze;
		this.reset(start, target);
	}
	
  reset(start, target) {
    this.start = start;
		this.target = target;
    this.finish = false;
    this.pathMatrix = [];
    for (let i = 0; i < this.maze.height; ++i) {
      var row = [];
      for (let j = 0; j < this.maze.width; ++j)
        row.push(0);
      this.pathMatrix.push(row);
    }
		  this.queue = [
      [this.start[0], this.start[1]]
    ];
    this.pathMatrix[this.start[0]][this.start[1]] = 1;
		this.path = [];
  }
  
	getSearchStep(){
    if(this.queue.length > 0 && !this.finish){
      var front = this.queue.shift();
      var x = front[1];
      var y = front[0];
			if(x == this.target[1] && y == this.target[0]){
				this.finish = true;
			}
      for (let i = 0; i < 4; ++i) {
        const cell_x = x + Dirs[i][0];
        const cell_y = y + Dirs[i][1];
        if (this.maze.isInGrid(cell_y, cell_x) &&
          !this.maze.maze[y][x].walls[i] &&
          this.pathMatrix[cell_y][cell_x] === 0) {
          this.pathMatrix[cell_y][cell_x] = this.pathMatrix[y][x] + 1;
          this.queue.push([cell_y, cell_x]);
        }
      }
    }
		if(this.finish)
		{
			var x = this.target[1];
			var y = this.target[0];
			var curr_val = this.pathMatrix[y][x];
			while (x !== this.start[1] || y !== this.start[0]) {
				this.path.push([y, x]);
				for (let i = 0; i < 4; ++i) {
					const cell_x = x + Dirs[i][0];
					const cell_y = y + Dirs[i][1];
					if (this.maze.isInGrid(cell_y, cell_x) &&
							this.pathMatrix[cell_y][cell_x] === curr_val - 1 &&
						!this.maze.maze[y][x].walls[i]) {
						x = cell_x;
						y = cell_y;
						curr_val = this.pathMatrix[y][x];
						break;
					}
				}
			}
			this.path.push([this.start[0], this.start[1]]);
			this.path.reverse();
			this.path.push(this.target);
			this.finish = true;
			return;
		}
	}
  }