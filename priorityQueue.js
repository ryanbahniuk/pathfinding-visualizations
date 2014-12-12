function PriorityQueue() {
  this.memory = {};
}

PriorityQueue.prototype.add = function(element, priority) {
  this.memory[element] = priority;
}

PriorityQueue.prototype.pull = function() {
  var sortable = [];
  for (var element in this.memory) {
    sortable.push([element, this.memory[element]])
  }
  var result = sortable.sort(function(a, b) { return b[1] - a[1] })[0][0];
  delete this.memory[result];
  return result
}

PriorityQueue.prototype.isEmpty = function() {
  return Object.keys(this.memory).length === 0;
}

PriorityQueue.prototype.includes = function(element) {
  return Object.keys(this.memory).indexOf(element.toString()) > -1
}
