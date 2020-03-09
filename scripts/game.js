class Ghost extends Player{
  move(new_position) {
    this.position = new_position;
  }
}

class Pacman extends Player {
  move (new_position) {
    this.position = new_position;
  }
}

class Game {
  constructor(maze) {
    this.maze = maze;
    let pacman_position = [randomInt(0, maze.height), randomInt(0, maze.width)];
    let ghost_position = [randomInt(0, maze.height), randomInt(0, maze.width)];
    this.pacman = new Pacman(pacman_position, pacman_src);
    this.ghost = new Ghost(ghost_position, ghost_src);
    this.ghost_pathfinder = new leePathfinder(this.maze, ghost_position, pacman_position);
    this.pacman_pathfinder = new leePathfinder(this.maze, pacman_position, [0,0]);
    this.target_path = [];
    this.generate();
    this.score = 0;
    this.lifes = 0;
    this.ult_time = 0;
    this.ult = false;
  }
  
  collideProcess() {
    --this.lifes;
    this.pacman.position = [randomInt(0, this.maze.height), randomInt(0, this.maze.width)];
    this.pacman_pathfinder.reset(this.pacman.position, [0,0]);
    this.target_path = [];
    
    this.ghost.position = [randomInt(0, this.maze.height), randomInt(0, this.maze.width)];
    this.ghost_pathfinder.reset(this.ghost.position, this.pacman.position);
  }
  
  generate() {
    const special_food_cnt = Math.floor(this.maze.height * this.maze.width * 0.05);
    for (let i = 0; i < special_food_cnt; ++i) {
      const y = randomInt(0, this.maze.height);
      const x = randomInt(0, this.maze.width);
      this.maze.maze[y][x].type = CellType.SpecialFood;
    }

    for (let y = 0; y < this.maze.height; ++y)
      for (let x = 0; x < this.maze.width; ++x)
        if (this.maze.maze[y][x].type === CellType.Empty)
          this.maze.maze[y][x].type = CellType.Food;
  }
  
  tick() {
    console.log("tick");
    if (isEqual(this.pacman.position,this.ghost.position)) {
      this.collideProcess();
      return;
    }
    const pos = this.pacman.position;
    var curr_cell = this.maze.maze[pos[0]][pos[1]];
    if (curr_cell.type !== CellType.Empty) {
      this.score += curr_cell.type;
      curr_cell.type = CellType.Empty;
    }
    //if (this.target_path.length === 0) {
      const pacman_pos = this.pacman.position;
      const ghost_pos = this.ghost.position;
      var available_paths = [];
      var available_food_cnt = 0;
      for (let y = 0; y < this.maze.height; ++y)
        for (let x = 0; x < this.maze.width; ++x) {
          if (this.maze.maze[y][x].type != CellType.Empty) {
            ++available_food_cnt;
            this.pacman_pathfinder.reset(pacman_pos, [y, x]);
            while (!this.pacman_pathfinder.finish)
              this.pacman_pathfinder.getSearchStep();
            var is_good = true;
            for (let i = 0; i < this.pacman_pathfinder.path.length; ++i) {
              const pos = this.pacman_pathfinder.path[i];
              if (isEqual(pos, ghost_pos)) {
                is_good = false;
                break;
              }
            }
            available_paths.push([y, x, this.pacman_pathfinder.path, is_good]);
          }
        }
      if (available_food_cnt == 0) {
        this.generate();
        return;
      }
      console.log('sort');
      var sort_func = function(a, b) {
        if (a[2].length < b[2].length) 
          return -1; 
        if (a[2].length > b[2].length || a.length == 0 || !a[3])
          return 1;
        return 0;};
      available_paths.sort(sort_func);
      this.target_path = available_paths[0][2];
      // delete start position because we need only next steps
      this.target_path.shift();
    //}
    
    console.log('ghost search');
    while (!this.ghost_pathfinder.finish)
      this.ghost_pathfinder.getSearchStep();
    
    const new_pacman_position = this.target_path.shift();
    const new_ghost_position = this.ghost_pathfinder.path[1];
    if (isEqual(new_pacman_position, this.ghost.position) && 
        isEqual(this.pacman.position, new_ghost_position)) {
        this.collideProcess();
        return;
      }
    
    console.log('move');
    this.ghost.move(new_ghost_position);
    this.pacman.move(new_pacman_position);
    
    this.ghost_pathfinder.reset(this.ghost.position, this.pacman.position);
  }
}