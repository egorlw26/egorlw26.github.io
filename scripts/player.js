class Player{
  constructor(){
    this.position = [0, 0];
  }
	
	setPath(path){
		this.path = path;
	}
	
	makeStepOnPath(){
		this.position = this.path[0];
		this.path = this.path.slice(1);
		console.log(this.path);
		console.log("position: ", this.position);
		setTimeout(this.makeStepOnPath, 40);
	}
}
