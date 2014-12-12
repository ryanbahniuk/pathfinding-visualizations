var drawMap = function(mapArgs) {
  var width = mapArgs.pxWidth;
  var height = mapArgs.pxHeight;
  var tileSize = mapArgs.tileSize;
  var start = mapArgs.startIndex;
  var finish = mapArgs.finishIndex;

  var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("id", "map");
  var tilesWide = width / tileSize;
  var tilesHigh = height / tileSize;

  document.body.appendChild(svg);
  var index = 0;
  for (var y = 0; y < tilesHigh; y++) {
    for (var x = 0; x < tilesWide; x++) {
      var newPath = document.createElementNS("http://www.w3.org/2000/svg", 'path');
      newPath.setAttribute("transform",'translate(' + (x * tileSize) + ',' + (y * tileSize) + ')');
      newPath.setAttribute("d",'M 0,0 L ' + tileSize + ',0 L ' + tileSize + ',' + tileSize + ' L 0,' + tileSize + ' Z');

      if (index === start) {
        newPath.setAttribute("class",'cell start index-' + index);
        newPath.setAttribute("id",'start');
      } else if (index === finish) {
        newPath.setAttribute("class",'cell finish index-' + index);
        newPath.setAttribute("id",'finish');
      } else {
        newPath.setAttribute("class",'cell open index-' + index);
      }

      index++;
      svg.appendChild(newPath);
    }
  }
  return {width: tilesWide, height: tilesHigh};
}
