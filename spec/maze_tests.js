module('Maze');
var fixture = ['start', 'open', 'open', 'open', 'open', 'open', 'open', 'open', 'open', 'finish'];
var maze = new Maze(fixture, 5, 2);

QUnit.test( "findIndex()", function(assert) {
  assert.equal( maze.start, 0, "accurately retrieves the starting index");
  assert.equal( maze.finish, 9, "accurately retrieves the finishing index");
});

QUnit.test( "columnIndices()", function( assert ) {
  assert.deepEqual(maze.columnIndices(0), [0, 5], "accurately retrieves the first column indices");
  assert.deepEqual(maze.columnIndices(4), [4, 9], "accurately retrieves the last column indices");
});

QUnit.test( "rowIndices()", function( assert ) {
  assert.deepEqual( maze.rowIndices(0), [0, 1, 2, 3, 4], "accurately retrieves the first row indices");
  assert.deepEqual( maze.rowIndices(6), [5, 6, 7, 8, 9], "accurately retrieves the last row indices");
});

QUnit.test( "getColumnIndex()", function( assert ) {
  assert.equal( maze.getColumnIndex(0), 0, "accurately retrieves the first column index");
  assert.equal( maze.getColumnIndex(4), 4, "accurately retrieves the fourth column index");
  assert.equal( maze.getColumnIndex(7), 2, "accurately retrieves the second column index");
});

QUnit.test( "getRowIndex()", function( assert ) {
  assert.equal( maze.getRowIndex(0), 0, "accurately retrieves the first column index");
  assert.equal( maze.getRowIndex(4), 0, "accurately retrieves the first column index at the end of the maze");
  assert.equal( maze.getRowIndex(7), 1, "accurately retrieves the second column index");
});

QUnit.test( "indexArray()", function( assert ) {
  assert.deepEqual( maze.indexArray, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "accurately returns the value at a random index");
});

QUnit.test( "openNeighbors()", function( assert ) {
  var fixture = ['start', 'open', 'open', 'open', 'open',
                  'open', 'wall', 'wall', 'wall', 'open',
                  'open', 'open', 'open', 'open', 'finish'];
  var maze = new Maze(fixture, 5, 3);
  assert.deepEqual( maze.openNeighbors(0), [5, 1], "accurately returns the neighbors for the first index");
  assert.deepEqual( maze.openNeighbors(2), [1, 3], "accurately returns the neighbors for the third index");
  assert.deepEqual( maze.openNeighbors(10), [5, 11], "accurately returns the neighbors for the eleventh index");
  assert.deepEqual( maze.openNeighbors(13), [12, 14], "accurately returns the neighbors if next to finish");
});
