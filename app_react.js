var Map = React.createClass({displayName: 'Map',
  getInitialState: function() {
    var tilesWide = this.props.pxWidth / this.props.tileSize;
    var tilesHigh = this.props.pxHeight / this.props.tileSize;
    var tiles = [];
    for(var i = 0; i < (tilesWide * tilesHigh); i++) {
      if (i === this.props.startIndex) {
        var status = 'start';
      } else if (i === this.props.finishIndex) {
        var status = 'finish';
      } else {
        var status = 'open';
      }
      tiles.push(status);
    }
    return {tiles: tiles, tilesWide: tilesWide, tilesHigh: tilesHigh, strategy: this.props.strategy};
  },
  componentDidMount: function() {
    this.cycleStatus(10);
    this.drawRoute(this.state.strategy);
  },
  handleClick: function(event) {
    console.log("click!");
  },
  cycleStatus: function(index) {
    var newTiles = this.state.tiles.slice(0);
    newTiles[index] = 'wall';
    this.setState({tiles: newTiles});
  },
  changeStrategy: function(strategy) {
    this.setState({strategy: strategy});
  },
  drawRoute: function(strategy) {
    var maze = new Maze(this.state.tiles, this.state.tilesWide, this.state.tilesWide);
    var solver = new Solver(strategy);
    var route = solver.run(maze);
    route.pop();

    var newTiles = this.state.tiles.slice(0);
    for(var i = 0; i < newTiles.length; i++) {
      if (route.indexOf(i) >  -1) {
        newTiles[i] = 'route';
      }
    }
    this.setState({tiles: newTiles});
  },
  getX: function(index){
    return (index % this.state.tilesWide);
  },
  getY: function(index){
    return Math.floor(index / this.state.tilesWide);
  },
  renderTiles: function () {
    var tileSize = this.props.tileSize;
    var getX = this.getX;
    var getY = this.getY;
    return this.state.tiles.map(function(value, i) {
      var attributes = {
        className: "cell " + value,
        transform: "translate(" + (getX(i) * tileSize) + "," + (getY(i) * tileSize) + ")",
        d: 'M 0,0 L ' + tileSize + ',0 L ' + tileSize + ',' + tileSize + ' L 0,' + tileSize + ' Z'
      }
      if ((value === 'start') || (value === 'finish')) { attributes.id = value; }
      return React.createElement('path', attributes);
    });
  },
  render: function() {
    return React.createElement('svg', { width: this.props.pxWidth, height: this.props.pxHeight, id: "map" }, this.renderTiles());
  }
});

var mapArgs = {
  pxWidth: 1000,
  pxHeight: 500,
  tileSize: 20,
  startIndex: 0,
  finishIndex: 1048,
  strategy: 'a*'
}
React.render(
  React.createElement(Map, mapArgs),
  document.getElementById('canvas')
);