var available_pathfinders = ["DFSPathfinder", "LeePathfinder"]

function onChecked() {
    if (!this.checked)
      return;
    switch(this.value) {
      case "DFSPathfinder": 
        pathfinder = new dfsPathfinder(maze, player.position, target);
        break;
      case "LeePathfinder": 
        pathfinder = new leePathfinder(maze, player.position, target);
        break;
      default: 
        pathfinder = new dfsPathfinder(maze, player.position, target);
    }
  context.clearRect(0, 0, canvas.width, canvas.height);
  maze.draw();
  drawPlayer(player);
}

function fill_configurations() {
  var pathfinders = $('#pathfinders');
  for (let i = 0; i < available_pathfinders.length; ++i) {
    const name = available_pathfinders[i];
    var list = $('<li></li>');
    list.append($('<input type = "radio" name = "pathfinder"/>').val(name).attr("id",name).on("change", onChecked));
    list.append($('<label class = "text"/>').text(name).attr("for", name));
    pathfinders.append(list);
  }
  $('#DFSPathfinder').attr('checked', true).trigger('change');
}