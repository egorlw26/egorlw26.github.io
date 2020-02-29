class dfsPathfinder{
	constructor(maze, start, target){
    	this.start = start;
    	this.target = target;
    	this.maze = maze;
    	this.finish = false;
		this.visited = [];
    	this.pathMatrix =[];
    	for(var i = 0; i<this.maze.height; i++){
      		var visitedRow = [];
      		var pathRow = [];
      		for(var j = 0; j<this.maze.width; j++){
        		visitedRow.push(false);
        		pathRow.push(0);
      		}
      	this.visited.push(visitedRow);
      	this.pathMatrix.push(pathRow);
      	}
      	this.pathMatrix[start[0]][start[1]] = 1;
      	this.path = [
      		[start[0], start[1]]
      		];
	}

	getSearchStep(){
	      if(this.path.length > 0 && !this.finish) {
	      const curr_pos = this.path[this.path.length -1];
	      console.log("Curr pos: ", curr_pos);
	      const y = curr_pos[0];
	      const x = curr_pos[1];
	      this.visited[y][x] = true;

	      /// We found our target!
	      if(y === this.target[0] && x === this.target[1]){
	        this.finish = true;
	        return;
	      }

	      var available_dirs = [];
	      for(var i = 0; i<4; i++){
	        const cell_x = x + Dirs[i][0];
	        const cell_y = y + Dirs[i][1];
	        if(this.maze.isInGrid(cell_y, cell_x) && !this.visited[cell_y][cell_x] && !this.maze.maze[y][x].walls[i])
	          available_dirs.push(i);
	      }
	      if (available_dirs.length === 0) {
	      	this.pathMatrix[y][x] = 0;
	        this.path.pop();
	        return;
	      }

	      const dir_id = randomChoice(available_dirs);
	      const next_x = x + Dirs[dir_id][0];
	      const next_y = y + Dirs[dir_id][1];
	      this.path.push([next_y, next_x]);
	      this.pathMatrix[next_y][next_x] = this.pathMatrix[y][x]+1;
	    }
	}
}