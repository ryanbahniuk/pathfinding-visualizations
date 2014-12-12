function cycleStatus() {
  var classString = $(this).attr('class');
  if (classString.match(/open/g)) {
    classString = classString.replace(/open/g, "wall");
  } else if (classString.match(/route/g)) {
    classString = classString.replace(/route/g, "wall");
  } else if (classString.match(/wall/g)) {
    classString = classString.replace(/wall/g, "open");
  }
  $(this).attr('class', classString);
}

function drawRoute(width, height, strategy) {
  var parsedMap = parseMap();
  var maze = new Maze(parsedMap, width, height);
  var solver = new Solver(strategy);
  var route = solver.run(maze);

  var svg = document.getElementById('map');
  var cells = svg.children;

  for (var i = 0; i < cells.length; i++) {
  	var classes = cells[i].classList;
  	if (classes.contains('route')) { classes.remove('route'); }
  	if (route.indexOf(i) > -1) { classes.add("route") };
  }
}

function parseMap() {
	var svg = document.getElementById('map');
	var cells = svg.children;
	var result = [];

	for (var i = 0; i < cells.length; i++) {
		var classes = cells[i].classList;
		if (classes.contains('open')) {
			var status = 'open';
		} else if (classes.contains('wall')) {
			var status = 'wall';
		} else if (classes.contains('start')) {
			var status = 'start';
		} else if (classes.contains('finish')) {
			var status = 'finish';
		}
		result.push(status);
	}
	return result;
}
