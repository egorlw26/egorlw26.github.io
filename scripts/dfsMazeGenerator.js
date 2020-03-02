class dfsMazeGenerator {
	constructor(maze){
		this.maze = maze;
	}

	generate(){    
		var visited = [];
    for (let y = 0; y < this.maze.height; ++y) {
      var row = [];
      for (let x = 0; x < this.maze.width; ++x)
        row.push(false);
      visited.push(row);
    }
    var stack = [
      [randomInt(0, this.maze.height), randomInt(0, this.maze.width)]
    ];
    while (stack.length > 0) {
      const curr_pos = stack[stack.length - 1];
      const y = curr_pos[0];
      const x = curr_pos[1];
      visited[y][x] = true;
      var neighbours = this.maze.getNeighbours(y, x);
      var availableNeighbours = [];
      for(var i = 0; i<neighbours.length; ++i)
        if(!visited[neighbours[i][0]][neighbours[i][1]])
          availableNeighbours.push(neighbours[i]);

      if(availableNeighbours.length == 0)
      {
        stack.pop();
        continue;
      }

      var next = randomChoice(availableNeighbours);

      stack.push(next);
      this.maze.breakWallBetweenTwoCells(curr_pos, next);
    }
}
}