$(function(){
  var mapArgs = {
    pxWidth: 1000,
    pxHeight: 500,
    tileSize: 20,
    startIndex: 0,
    finishIndex: 1048
  }
  var dimensions = drawMap(mapArgs);
  var strategy = $('#strategy').val();

  drawRoute(dimensions.width, dimensions.height, strategy);

  $('.cell')
    .on("click", cycleStatus)
    .on("click", function(){
    	drawRoute(dimensions.width, dimensions.height, strategy);
    });

  $('#strategy').change(function(){
  	strategy = $('#strategy').val();
  	drawRoute(dimensions.width, dimensions.height, strategy)
  });
});
