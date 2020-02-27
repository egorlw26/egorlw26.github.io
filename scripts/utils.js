$("input[type=range]").each(function(){
  var curr_id = $(this).attr("id");
  const value_id = "#" + curr_id + "_value";
  $(this).on("change", function(){
    const val = $(this).val();
    $(value_id).text(val);
    if (curr_id === "height_range")
      columns = val;
    else
      rows = val;
    cellW = Math.floor(canvas.width/rows);
    cellH = Math.floor(canvas.height/columns);
    maze = new Maze(rows, columns);
    maze.dfsGenerator();
    maze.draw();
    player = new Player(maze);
    update();
    });
});