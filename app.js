$(document).ready(function(){
  var dimensions = drawMap(1000, 500, 20, 0, 1048);
  var strategy = $('#strategy').val();

  drawRoute(dimensions.width, dimensions.height, strategy);

  $('.cell').on("click", cycleStatus)
  .on("click", function(){
  	drawRoute(dimensions.width, dimensions.height, strategy);
  });

  $('#strategy').change(function(){
  	strategy = $('#strategy').val();
  	drawRoute(dimensions.width, dimensions.height, strategy)
  });
});
