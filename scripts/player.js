class Player{
  constructor(position, src){
    this.position = position;
		this.image = new Image();
		this.image.src = src;
  }
	
	setPath(path){
		this.path = path;
	}
	
	makeStepOnPath(){
		this.position = this.path[0];
		if(this.path.length === 1){
			return;
		}
		this.path = this.path.slice(1);
	}
}
