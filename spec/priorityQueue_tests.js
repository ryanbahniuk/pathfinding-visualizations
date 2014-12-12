module('PriorityQueue');

QUnit.test( "add()", function(assert) {
  var queue = new PriorityQueue();
  queue.add("first", 1);
  assert.deepEqual( queue.memory, {"first": 1}, "adds an element to memory");
});

QUnit.test( "pull()", function(assert) {
  var queue = new PriorityQueue();
  queue.add("first", 1);
  queue.add("second", 2);
  assert.deepEqual( queue.pull(), "second", "returns the item with the higher priority");
  assert.deepEqual( queue.memory, {"first": 1}, "removes the item from the queue");
});

QUnit.test( "isEmpty()", function(assert) {
  var queue = new PriorityQueue();
  assert.equal(queue.isEmpty(), true, "returns true when the queue is empty");
  queue.add("first", 1);
  assert.equal(queue.isEmpty(), false, "returns false when the queue is not empty");
});

QUnit.test( "includes()", function(assert) {
  var queue = new PriorityQueue();
  queue.add("first", 1);
  assert.equal( queue.includes("first"), true, "returns true when the string is included");
  assert.equal( queue.includes("second"), false, "returns false when the string is not included");
  queue.add(1, 1);
  assert.equal( queue.includes(1), true, "returns true when the numeral is included");
  assert.equal( queue.includes(2), false, "returns false when the numeral is not included");
});
