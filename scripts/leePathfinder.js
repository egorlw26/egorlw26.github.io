class leePathfinder extends Pathfinder{
	constructor(maze, start, target){
    super(maze, start, target);
		this.queue = [this.start];
	}
  
  reset(start, target) {
    super.reset(start, target);
    this.queue = [this.start]
  }
  
	getSearchStep(){
    if(this.queue.length > 0 && !this.finish){
      ++this.search_steps;
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