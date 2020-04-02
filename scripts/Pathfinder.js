class Pathfinder{
	constructor(maze, start, target){
      this.maze = maze;
      this.reset(start, target);
	}
  
  reset(start, target) {
    this.start = start;
    this.target = target;
    this.search_steps = 0;
    this.memory = 0;
    this.time = 0;
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
  
  calculateStats() {
    var n = 10;
    var avarage_memory = 0;
    var avarage_time = 0;
    for (let i = 0; i < n; ++i) {
      var start = performance.now();
      while(!this.finish) {
        this.getSearchStep();
      }
      var finish = performance.now();
      var time = finish - start;
      var memory = this.maze.width * this.maze.height * 8 * 2 + this.path.length * 8 * 2 + 1024 * time * 8 + this.search_steps * 8;
      this.reset(this.start, this.target);
      avarage_time += time / n;
      avarage_memory += memory / n;
    }
    avarage_memory /= 1024;
    this.time = avarage_time.toFixed(2);
    this.memory = avarage_memory.toFixed(2);
  }
}