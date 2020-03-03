class Player{
  constructor(){
    this.position = [0, 0];
  }
	
	setPath(path){
		this.path = path;
	}
	
	makeStepOnPath(){
		this.position = this.path[0];
		if(this.path.length == 1){
			return;
		}
		this.path = this.path.slice(1);
		console.log("position: ", this.position);
	}
}
