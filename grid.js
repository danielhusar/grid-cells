(function (window, document, undefined) {
  'use strict';

  var APP = window.APP = function (config) {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.config = config;
    this.draw();

    document.querySelector('button').addEventListener('click', function () {
      this.recalculate().draw();
    }.bind(this));
  };

  //shortcut
  var FN = APP.prototype;

  /**
   * Draw cells
   * @param  {int} x coord
   * @param  {int} y coord
   * @return {this}
   */
  FN.draw = function () {
    var i, j;
    var step = 30;

    this.context.clearRect(0, 0, 450, 450);
    this.context.fillStyle = '#00B2B3';

    for (i = 0; i < 15; i++) {
      for (j = 0; j < 15; j++) {
        var method = this.isAlive(j + 1, i + 1) ? 'drawFull' : 'drawEmpty';
        this[method](i * step, j * step);
      }
    }

    this.context.lineWidth = 1;
    this.context.stroke();

    return this;
  };

  /**
   * Recalculate all the cells
   * @return {this}
   */
  FN.recalculate = function () {
    var config = {};
    var i, j;
    var step = 30;

    for (i = 0; i < 15; i++) {
      for (j = 0; j < 15; j++) {
        var x = i + 1;
        var y = j + 1;
        var current = this.isAlive(x, y);
        var neighbours = this.checkNeighbours(x, y);
        if ( (current && (neighbours === 2 || neighbours === 3)) || (!current && neighbours === 2) ) {
          var subConfig = config[x] ? config[x] : [];
          subConfig.push(y);
          config[x] = subConfig;
        }
      }
    }

    this.config = config;
    return this;
  };

  /**
   * Check how many living neighbours have the cell
   * @param {int} x coord
   * @param {int} y coord
   * @return int
   */
  FN.checkNeighbours = function (x, y) {
    var config = {};
    var i, j;
    var iMin = x - 1;
    var jMin = y - 1;
    var iTop = iMin + 3;
    var jTop = jMin + 3;
    var aliveCount = 0;

    for (var i = iMin; i < iTop; i++) {
      for (j = jMin; j < jTop; j++) {
        if (this.isAlive(i, j)) {
          aliveCount = aliveCount + 1;
        }
      }
    }

    return aliveCount - 1; //minus itself
  };

  /**
   * Draw empty rectangle
   * @param  {int} x coord
   * @param  {int} y coord
   * @return {this}
   */
  FN.drawEmpty = function(x, y) {
    this.context.rect(x, y, 30, 30);
    return this;
  };


  /**
   * Check if the cell is alive or dead
   * @param {int} x coord
   * @param {int} y coord
   * @return boolean
   */
  FN.isAlive = function(x, y) {
    return !! (this.config[x] && this.config[x].indexOf(y) !== -1);
  };

  /**
   * Draw filled rectangle
   * @param  {int} x coord
   * @param  {int} y coord
   * @return {this}
   */
  FN.drawFull = function(x, y) {
    this.context.fillRect(x, y, 30,30);
    return this;
  };


  var config = {
    2 : [2, 6, 8, 12, 13, 14],
    3 : [3, 4, 8, 9, 11],
    4 : [5, 7, 10, 12],
    5 : [2],
    6 : [3, 4, 13],
    7 : [5, 7, 8],
    8 : [12],
    9 : [3, 10],
    10 : [4, 6],
    11 : [8, 15],
    12 : [10, 11],
    13 : [3, 15],
    14 : [4, 7],
    15 : [9, 11, 15]
  };

  window.Instance = new APP(config);

})(this, this.document);
