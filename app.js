$(function(){
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
