class Pathfinder{
	constructor(maze, start, target){
      this.maze = maze;
      this.reset(start, target);
	}
  
  reset(start, target) {
    this.start = start;
    this.target = target;
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
    this.path = [];
  }
}