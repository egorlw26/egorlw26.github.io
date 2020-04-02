class dfsPathfinder extends Pathfinder{
  constructor(maze, start, target) {
    super(maze, start, target);
    this.path = [start]
  }
  
  reset(start, target) {
    super.reset(start, target);
    this.path = [start];
  }
  
	getSearchStep(){
    if(this.path.length > 0 && !this.finish) {
      ++this.search_steps;
      const curr_pos = this.path[this.path.length -1];
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