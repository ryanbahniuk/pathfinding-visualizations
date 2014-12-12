module('Solver');

QUnit.test( "run() + bfs()", function(assert) {
  var fixture = ['start', 'open', 'open', 'open', 'open',
                'open', 'wall', 'wall', 'wall', 'open',
                'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  var bfsSolver = new Solver('bfs');
  assert.deepEqual( bfsSolver.run(maze), [13,12,11,10,5,0], "returns the path by breadth first search");
});

QUnit.test( "run() + dfs()", function(assert) {
  var fixture = ['start', 'open', 'open', 'open', 'open',
                'open', 'wall', 'wall', 'wall', 'open',
                'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  var dfsSolver = new Solver('dfs');
  assert.deepEqual( dfsSolver.run(maze), [9, 4, 3, 2, 1, 0], "returns the path by depth first search");
});

QUnit.test( "run() + manhattan()", function(assert) {
  var fixture = ['start', 'open', 'open', 'open', 'open',
                'open', 'wall', 'wall', 'wall', 'open',
                'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  var manhattanSolver = new Solver('manhattan');
  assert.deepEqual( manhattanSolver.run(maze), [9, 4, 3, 2, 1, 0], "returns the path by Manhattan priority queue search");
});

QUnit.test( "run() + a()", function(assert) {
  var fixture = ['start', 'open', 'open', 'open', 'open',
                'open', 'wall', 'wall', 'wall', 'open',
                'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  var aStarSolver = new Solver('a*');
  assert.deepEqual( aStarSolver.run(maze), [9, 4, 3, 2, 1, 0], "returns the path by a*");
});

QUnit.test( "findPath()", function(assert) {
  var solver = new Solver('test');
  var cameFrom = {10: 5, 5: 3, 3: 1, 1: 0, 0: null};
  assert.deepEqual( solver.findPath(cameFrom, 10), [5, 3, 1, 0], "returns the correct historical path");
});

QUnit.test( "manhattanHeuristic()", function(assert) {
 var fixture = ['start', 'open', 'open', 'open', 'open',
              'open', 'wall', 'wall', 'wall', 'open',
              'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  var solver = new Solver('test');
  assert.equal( solver.manhattanHeuristic(4, maze), 0.5, "returns the correct manhattan heuristic value");
  assert.equal( solver.manhattanHeuristic(10, maze), 0.25, "returns the correct manhattan heuristic value");
});

QUnit.test( "aStarHeuristic()", function(assert) {
 var fixture = ['start', 'open', 'open', 'open', 'open',
              'open', 'wall', 'wall', 'wall', 'open',
              'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  var solver = new Solver('test');
  var path = [4, 3, 2, 1, 0];
  assert.equal( solver.aStarHeuristic(4, path, maze), 0.7, "returns the correct manhattan heuristic value");
});
