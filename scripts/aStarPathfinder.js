class AStarQElement{
	constructor(element, h, parent){
    this.element = element;
		this.h = h;
		this.g = parent.g+1;
    this.priority = this.h+ this.g;
    this.parent = parent;
  }
}

class AStarPathfinder extends Pathfinder{
	constructor(maze, start, target) {
    super(maze, start, target);
		this.preparate();
  }

	reset(start, target){
		super.reset(start, target);
		this.preparate();
	}

	preparate(){
		this.open = new PriorityQueue();
		this.closed = [];

		var startEl = new AStarQElement(this.start, 0, 0);
		startEl.g = 0;
		startEl.priority = 0;
		startEl.parent = startEl;

		this.open.enqueue(startEl);
	}

	getSearchStep(){
		if(!this.open.isEmpty() && !this.finish){
      ++this.search_steps;
			var currCell = this.open.shift();

			this.pathMatrix[currCell.element[0]][currCell.element[1]] =
				this.pathMatrix[currCell.parent.element[0]][currCell.parent.element[1]] + 1;

			//getting successors
			var neighbours = this.maze.getNeighbours(currCell.element[0], currCell.element[1]);
			var availableNeighbours = [];
			for(let i = 0; i < neighbours.length; ++i)
				if(!this.maze.isWallBetweenTwoCells(currCell.element, neighbours[i]))
					availableNeighbours.push(neighbours[i]);

			for(let i = 0; i < availableNeighbours.length; ++i) {
				var neigh = availableNeighbours[i];
				this.pathMatrix[neigh[0]][neigh[1]] =
					this.pathMatrix[currCell.element[0]][currCell.element[1]] + 1;
				var h = this.calculateH(neigh);
				var element = new AStarQElement(neigh, h, currCell);

				//target found
				if(areCellsEqual(neigh, this.target)) {
					  this.open.enqueue(element);
						this.createPath(element);
						this.finish = true;
						return;
					}

				if(this.isInOpenWithLowerPriority(element) != -1)
					continue;

				if(this.isInClosed(element) != -1) {
					var index = this.isInClosed(element);
					if(this.closed[index].priority > element.priority) {
							this.closed.splice(index, 1);
							this.open.enqueue(element);
						}
						continue;
				}
				this.open.enqueue(element);
			}
			this.closed.push(currCell);
		}
	}

	createPath(lastCell)
	{
		var currCell = lastCell;
		while(!areCellsEqual(currCell.element, this.start)){
				this.path.push(currCell.element);
				currCell = currCell.parent;
			}
		this.path.reverse();
	}

	calculateH(cell){
		return Math.sqrt(Math.pow(target[1] - cell[1], 2) +
			Math.pow(target[0] - cell[0], 2));
	}

	isInOpenWithLowerPriority(element){
		for(let i =0; i < this.open.length; ++i)
			if(areCellsEqual(this.open[i].element, element.element)
			  && this.open[i].priority < element.priority)
				return i;
		return -1;
	}

	isInClosed(element){
		for(let i =0; i < this.closed.length; ++i)
			if(areCellsEqual(this.closed[i].element, element.element))
				return i;
		return -1;
	}
}
