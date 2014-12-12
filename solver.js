function Solver(type) {
  this.type = type;
}

Solver.prototype.run = function(maze) {
  switch(this.type) {
    case "a*":
      return this.a(maze);
      break;
    case "manhattan":
      return this.manhattan(maze);
      break;
    case "bfs":
      return this.bfs(maze);
      break;
    case "dfs":
      return this.dfs(maze);
      break;
    default:
      break;
  }
}

Solver.prototype.bfs = function(maze) {
  var frontier = [maze.start];
  var cameFrom = {};
  cameFrom[maze.start] = null;
  var visited = new Set;
  while (!(frontier.length === 0)) {
    var current = frontier.shift();
    if (current === maze.finish) {
      return this.findPath(cameFrom, current);
    }
    visited.add(current);
    var neighbors = maze.openNeighbors(current);
    for (var i = 0; i < neighbors.length; i++) {
      if (((frontier.indexOf(neighbors[i])) === -1) && (!visited.has(neighbors[i]))) {
        frontier.push(neighbors[i]);
      }
      if (Object.keys(cameFrom).indexOf(neighbors[i].toString()) === -1) {
        cameFrom[neighbors[i]] = current;
      }
    }
  }
  return false
}

Solver.prototype.dfs = function(maze) {
  var frontier = [maze.start];
  var cameFrom = {};
  cameFrom[maze.start] = null;
  var visited = new Set;
  while (!(frontier.length === 0)) {
    var current = frontier.pop();
    if (current === maze.finish) {
      return this.findPath(cameFrom, current);
    }
    visited.add(current);
    var neighbors = maze.openNeighbors(current);
    for (var i = 0; i < neighbors.length; i++) {
      if (((frontier.indexOf(neighbors[i])) === -1) && (!visited.has(neighbors[i]))) {
        frontier.push(neighbors[i]);
      }
      if (Object.keys(cameFrom).indexOf(neighbors[i].toString()) === -1) {
        cameFrom[neighbors[i]] = current;
      }
    }
  }
  return false
}

Solver.prototype.manhattan = function(maze) {
  var frontier = new PriorityQueue;
  frontier.add(maze.start, 0);
  var cameFrom = {};
  cameFrom[maze.start] = null;
  var visited = new Set;
  while (!(frontier.isEmpty())) {
   var current = parseInt(frontier.pull());
   if (current === maze.finish) {
     return this.findPath(cameFrom, current);
   }
   visited.add(current);
   var neighbors = maze.openNeighbors(current);
   for (var i = 0; i < neighbors.length; i++) {
     if ((!frontier.includes(neighbors[i])) && (!visited.has(neighbors[i]))) {
       frontier.add(neighbors[i], this.manhattanHeuristic(neighbors[i], maze));
     }
     if (Object.keys(cameFrom).indexOf(neighbors[i].toString()) === -1) {
       cameFrom[neighbors[i]] = current;
     }
   }
  }
  return false
}

Solver.prototype.a = function(maze) {
  var frontier = new PriorityQueue;
  frontier.add(maze.start, 0);
  var cameFrom = {};
  cameFrom[maze.start] = null;
  var visited = new Set;
  while (!(frontier.isEmpty())) {
   var current = parseInt(frontier.pull());
   if (current === maze.finish) {
     return this.findPath(cameFrom, current);
   }
   visited.add(current);
   var neighbors = maze.openNeighbors(current);
   for (var i = 0; i < neighbors.length; i++) {
    if (Object.keys(cameFrom).indexOf(neighbors[i].toString()) === -1) {
      cameFrom[neighbors[i]] = current;
    }
    if ((!frontier.includes(neighbors[i])) && (!visited.has(neighbors[i]))) {
      frontier.add(neighbors[i], this.aStarHeuristic(neighbors[i], this.findPath(cameFrom, neighbors[i]), maze));
    }
   }
  }
  return false
}

Solver.prototype.manhattanHeuristic = function(start, maze) {
  var startX = maze.getRowIndex(start)
  var startY = maze.getColumnIndex(start)
  var finishX = maze.getRowIndex(maze.finish)
  var finishY = maze.getColumnIndex(maze.finish)
  return (1.0 / (Math.abs(startX - finishX) + Math.abs(startY - finishY)))
}

Solver.prototype.aStarHeuristic = function(point, path, maze) {
  return this.manhattanHeuristic(point, maze) + (1.0 / path.length);
}

Solver.prototype.findPath = function(cameFrom, point, path) {
  var path = path || [];
  var origin = cameFrom[point];
  if (origin === undefined || origin === null) {
    return path
  }
  path.push(origin);
  return this.findPath(cameFrom, origin, path);
}

