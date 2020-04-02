function randomInt(a, b) {
  return Math.floor(a + Math.random() * (b - a));
}

function randomChoice(list) {
  const id = randomInt(0, list.length);
  return list[id];
}

function areCellsEqual(firstCell, secondCell){
  return (firstCell[0] == secondCell[0] && firstCell[1] == secondCell[1]);
}

class PriorityQueue{
  constructor(){
      this.elements = [];
  }

  //add element to priority-sorted list (the first one with the highest priority)
  enqueue(nElement){
    var contain = false;

    for(let i = 0; i<this.elements.length; ++i)
      if(this.elements[i].priority > nElement.priority)
      {
        this.elements.splice(i, 0, nElement);
        contain = true;
        break;
      }

      if(!contain)
        this.elements.push(nElement);
  }

  // returns and delete first element in array, if possible
  shift(){
    if(this.isEmpty())
      return "No elements!";
    return this.elements.shift();
  }

  isEmpty(){
    return this.elements.length == 0;
  }
}

function updateFindStatus() {
  $('#steps_stat').text("Steps: " + pathfinder.search_steps);
  $('#memory_stat').text("Memory: " + pathfinder.memory + "kb");
  $('#time_stat').text("Time: " + pathfinder.time + "ms");
}
