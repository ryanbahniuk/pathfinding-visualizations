function Maze(data, width, height) {
  this.data = data;
  this.indexArray = this.indexArray();
  this.width = width;
  this.height = height;
  this.start = this.findIndex('start');
  this.finish = this.findIndex('finish');
}

Maze.prototype.findIndex = function(marker) {
  for (var i = 0; i < this.data.length; i++) {
    if (this.data[i] === marker) { return i }
  }
  return null
}

Maze.prototype.columnIndices = function(inputted_index) {
  if (inputted_index > (this.data.length - 1)) { return null }
  var maze = this;
  return maze.indexArray.filter(function(index) { return maze.getColumnIndex(index) === maze.getColumnIndex(inputted_index) })
}

Maze.prototype.rowIndices = function(inputted_index) {
  if (inputted_index > (this.data.length - 1)) { return null }
  var maze = this;
  return maze.indexArray.filter(function(index) { return maze.getRowIndex(index) === maze.getRowIndex(inputted_index) })
}

Maze.prototype.getColumnIndex = function(index) {
  return (index % this.width);
}

Maze.prototype.getRowIndex = function(index) {
  return Math.floor(index / this.width);
}

Maze.prototype.indexArray = function() {
  var result = [];
  for (var i = 0; i < this.data.length; i++) {
    result.push(i);
  }
  return result
}

Maze.prototype.openNeighbors = function(index) {
  if (index > (this.data.length - 1)) { return null }
  var rowIndices = this.rowIndices(index);
  var columnIndices = this.columnIndices(index);
  var mazeData = this.data;
  var one = this.getRowIndex(index) - 1 >= 0 ? columnIndices[this.getRowIndex(index) - 1] : null
  var two = this.getRowIndex(index) + 1 <= this.height ? columnIndices[this.getRowIndex(index) + 1] : null
  var three = this.getColumnIndex(index) - 1 >= 0 ? rowIndices[this.getColumnIndex(index) - 1] : null
  var four = this.getColumnIndex(index) + 1 <= this.width ? rowIndices[this.getColumnIndex(index) + 1] : null
  return [one, two, three, four].filter(function(i) { return ((mazeData[i] !== 'wall') && (mazeData[i] !== 'start') && (i !== null) && (i !== undefined))})
}
