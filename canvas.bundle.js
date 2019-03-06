/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _toolbar = __webpack_require__(/*! ./toolbar */ "./src/toolbar.js");

var _toolbar2 = _interopRequireDefault(_toolbar);

var _gameListeners = __webpack_require__(/*! ./gameListeners */ "./src/gameListeners.js");

var _gameListeners2 = _interopRequireDefault(_gameListeners);

var _playerListeners = __webpack_require__(/*! ./playerListeners */ "./src/playerListeners.js");

var _playerListeners2 = _interopRequireDefault(_playerListeners);

var _objects = __webpack_require__(/*! ./objects */ "./src/objects.js");

var _objects2 = _interopRequireDefault(_objects);

var _tiles = __webpack_require__(/*! ./json/tiles */ "./src/json/tiles.json");

var _tiles2 = _interopRequireDefault(_tiles);

var _engine = __webpack_require__(/*! ./engine */ "./src/engine.js");

var _engine2 = _interopRequireDefault(_engine);

var _game = __webpack_require__(/*! ./game */ "./src/game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameDiv = document.getElementById('game');
var canvas = document.getElementById('canvas');
canvas.oncontextmenu = function (e) {
    return e.preventDefault();
};
canvas.width = innerWidth - 50;
canvas.height = innerHeight - 50;

// Game
var Game = new _game2.default(canvas);
var c = Game.c;

Game.assets.tiles = _tiles2.default;
Game.select.tile = Game.assets.tiles.landscape;
Game.cfg.scale = 64;
Game.cfg.cols = 32;
Game.cfg.rows = 32;
Game.translate.y = -(Game.cfg.rows * Game.cfg.scale) + canvas.height;
// Game.engine = new Engine()
// Load tiles IMG
for (var t in Game.assets.tiles) {
    Game.utils.loadTiles(Game.assets.tiles[t]);
}

Game.Engine = new _engine2.default(c, Game.cfg.cols, Game.cfg.rows, Game.cfg.scale);

// Player
var Player = new _objects2.default.Player(3, 27, 'James', Game); // x, y, w, h, name, Game)

// Toolbar
var elUI = (0, _toolbar2.default)(Game);
gameDiv.append(elUI);
elUI = null;

// Implementation
Game.init = function () {
    // Listeners
    if (Game.editor) (0, _gameListeners2.default)(canvas, Game);
    if (!Game.editor) (0, _playerListeners2.default)(Player, Game);

    Game.map = __webpack_require__(/*! ./json/map */ "./src/json/map.json");

    if (!Game.map) {
        Game.map = [];
        for (var row = 0; row < Game.cfg.rows; row++) {
            Game.map[row] = [];
            for (var col = 0; col < Game.cfg.cols; col++) {
                Game.map[row][col] = new Game.Objects.Box(col, row, Game);
            }
        }
    } else {
        var bouncingCalls = [9, 10, 11];

        for (var _row = 0; _row < Game.map.length; _row++) {
            for (var _col = 0; _col < Game.map[0].length; _col++) {
                if (Game.map[_row][_col]) {
                    var obj = new Game.Objects[Game.map[_row][_col].type](_col, _row, Game);
                    Game.map[_row][_col] = Object.assign(obj, Game.map[_row][_col]);
                }
                // else if(row === 23 && bouncingCalls.includes(col)) {
                //     let obj = new Game.Objects.BouncingBox(col, row, Game) // x, y, w, h, Game
                //     Game.map[row][col] = Object.assign(obj, Game.map[row][col]);
                //     console.log(Game.map[row][col])
                // }
                else {
                        if (Game.editor) Game.map[_row][_col] = new Game.Objects.Box(_col, _row, Game);
                    }
            }
        }
    }

    console.log("Lets go !");
};

// Display FPS / ZOOM
var fps = 60,
    now = void 0,
    then = Date.now(),
    delta = void 0,
    counter = fps;
var interval = 1000 / fps,
    first = then;
var displayInfo = function displayInfo() {
    var time_el = (then - first) / 1000;
    ++counter;

    c.beginPath();
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(canvas.width - 80, 0, 100, 40);
    c.fillStyle = "white";
    c.font = "11px Arial";
    if (Game.editor) c.fillText('ZOOM: x' + (Game.cfg.scale / 64).toFixed(2), canvas.width - 75, 15);
    c.fillText('FPS: ' + Math.round(counter / time_el), canvas.width - 75, 30);
    c.rect(0, 0, canvas.width, canvas.height);
    c.stroke();
    c.closePath();
};

var mapWidth = Game.cfg.cols * Game.cfg.scale,
    mapHeight = Game.cfg.rows * Game.cfg.scale,
    halfMapWidth = mapWidth - canvas.width,
    halfMapHeight = mapHeight - canvas.height,
    imgHorizontal = mapWidth > mapHeight ? true : false,
    imgWidth = imgHorizontal ? mapWidth : mapWidth / 1080 * 1920,
    imgHeight = !imgHorizontal ? mapHeight : mapHeight / 1920 * 1080,
    background = new Image(mapWidth, mapHeight);
background.src = 'https://cdn.glitch.com/e683167b-6e53-40d8-9a05-e24a714a856d%2Fspace-background.svg?1551610099211';

// Animation Loop
Game.animate = function () {
    if (Game.playing[0]) requestAnimationFrame(Game.animate);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        // console.time('check')

        // Camera
        if (!Game.editor) {
            var tx = -Player.getHalfWidth() + canvas.width / 2,
                ty = -Player.getHalfHeight() + canvas.height / 2,
                isOffsetX = canvas.width < mapWidth ? true : false,
                isOffsetY = canvas.height < mapHeight ? true : false;

            if (!isOffsetX) tx = canvas.width / 2 - mapWidth / 2;
            if (!isOffsetY) ty = canvas.height / 2 - mapHeight / 2;
            if (isOffsetX && Player.getHalfWidth() <= canvas.width / 2) tx = 0;else if (isOffsetX && Player.getHalfWidth() >= mapWidth - canvas.width / 2) tx = -halfMapWidth;
            if (isOffsetY && Player.getHalfHeight() <= canvas.height / 2) ty = 0;else if (isOffsetY && Player.getHalfHeight() >= mapHeight - canvas.height / 2) ty = -halfMapHeight;

            if (!Player.isDead) {
                Game.translate.x = tx;
                Game.translate.y = ty;
            } else {
                // console.log('Player is dead !')
                // If Camera POS === Player Respawn POS
                if (Game.translate.x == tx && Game.translate.y == ty) {
                    Player.spawn();
                } else {
                    // console.log(Game.translate.x, tx, ' -- ', Game.translate.y, ty)
                    Game.translate.x = Game.utils.lerp(Game.translate.x, tx, 0.2);
                    Game.translate.y = Game.utils.lerp(Game.translate.y, ty, 0.2);
                }
            }
        }

        if (!Game.editor) Game.Engine.create();

        then = now - delta % interval;

        if (Game.cfg.updateAll) c.clearRect(0, 0, canvas.width, canvas.height); // if (Game.cfg.updateAll)

        if (!Game.editor) {
            Game.cfg.updateAll = true;
            c.beginPath();
            c.drawImage(background, Game.translate.x, Game.translate.y, imgWidth, imgHeight);
            c.closePath();
        }

        c.save();
        c.translate(Game.translate.x, Game.translate.y);

        Game.update(canvas);

        if (!Game.editor) {
            if (!Player.isDead) Player.actions();
            Game.Engine.insert(Player);
            Game.Engine.checkCells();
            Player.update();
        }

        c.restore();

        displayInfo();

        //Game.message.error('Test')

        var separator = ' ';
        for (var i = 0; i < 52 - counter.toString().length; i++) {
            separator += '-';
        }
        // console.log('\n\n' + counter + separator)
        // console.timeEnd('check')
    }
};

/***/ }),

/***/ "./src/engine.js":
/*!***********************!*\
  !*** ./src/engine.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function Engine(c, cols, rows, scale) {
        _classCallCheck(this, Engine);

        this.c = c;
        this.cols = cols;
        this.rows = rows;
        this.scale = scale;
        this.cells = [];
        this.done = false;
    }

    _createClass(Engine, [{
        key: 'create',
        value: function create() {
            this.clear();
            for (var i = 0; i < this.rows; i++) {
                // this.cells[i] = new Array(this.cols)
                this.cells[i] = [];
                for (var j = 0; j < this.cols; j++) {
                    this.cells[i][j] = [];
                }
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.cells = [];
        }
    }, {
        key: 'insert',
        value: function insert(entity) {
            var x = entity.getLeft(true),
                y = entity.getTop(true),
                w = entity.getRight(true),
                h = entity.getBottom(true),
                scale = this.scale,
                cellStartX = Math.floor(x / scale),
                cellEndX = Math.ceil(w / scale),
                cellStartY = Math.floor(y / scale),
                cellEndY = Math.ceil(h / scale);

            if (entity.type === 'Player') {
                // console.log(cellStartX, cellEndX)
                // console.log(cellStartY, cellEndY)
            }

            for (var row = cellStartY; row < cellEndY; row++) {
                for (var col = cellStartX; col < cellEndX; col++) {
                    if (this.makeCell(row, col)) {
                        this.cells[row][col].push(entity);
                        this.done = true;
                    }
                }
            }
        }
    }, {
        key: 'makeCell',
        value: function makeCell(row, col) {
            var cells = this.cells;
            if (!cells[row]) return false;
            if (!cells[row][col]) this.cells[row][col] = [];
            return true;
        }
    }, {
        key: 'isColliding',
        value: function isColliding(o1, o2) {
            var l1 = o1.getLeft(true),
                r1 = o1.getRight(true),
                t1 = o1.getTop(true),
                b1 = o1.getBottom(true),
                l2 = o2.getLeft(true),
                r2 = o2.getRight(true),
                t2 = o2.getTop(true),
                b2 = o2.getBottom(true);

            if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) {
                return true;
            }
            //console.log('in')
            return false;
        }
    }, {
        key: 'checkCells',
        value: function checkCells() {
            var _this = this;

            this.cells.forEach(function (row) {
                row.forEach(function (cell) {
                    if (!cell || cell.length <= 1) return;
                    _this.testCellEntities(cell);
                });
            });
        }
    }, {
        key: 'testCellEntities',
        value: function testCellEntities(cell) {
            var _this2 = this;

            // console.log(cell)

            var length = cell.length;

            cell.forEach(function (entity1, i) {
                // this.c.beginPath()
                // this.c.rect(entity1.getLeft(true), entity1.getTop(true), 64, 64)
                // this.c.fillStyle = 'green'
                // this.c.fill()
                // this.c.closePath()

                for (var j = i + 1; j < length; j++) {
                    var entity2 = cell[j];
                    if (!_this2.isColliding(entity1, entity2) || entity1 === entity2) continue; //  || (isWall1 && isWall2)
                    _this2.resolve(entity1, entity2);
                }
            });
        }
    }, {
        key: 'resolve',
        value: function resolve(A, B) {
            // console.log('in')
            var vX = A.getHalfWidth(true) - B.getHalfWidth(true),
                vY = A.getHalfHeight(true) - B.getHalfHeight(true),
                ww2 = A.w / 2 + B.w / 2,
                hh2 = A.h / 2 + B.h / 2,
                sideA = ['TOP', 'BOTTOM', 'LEFT', 'RIGHT', 'TOP_LEFT', 'TOP_RIGHT', 'BOTTOM_LEFT', 'BOTTOM_RIGHT'],
                sideB = ['BOTTOM', 'TOP', 'RIGHT', 'LEFT', 'BOTTOM_RIGHT', 'BOTTOM_LEFT', 'TOP_RIGHT', 'TOP_LEFT'];

            var dId = "",
                isNegative = vX < 0 && vY < 0 ? true : false;

            if (Math.abs(vX) < ww2 && Math.abs(vY) < hh2) {
                var oX = ww2 - Math.abs(vX),
                    oY = hh2 - Math.abs(vY);

                if (oX > oY) {
                    if (vY > 0) {
                        dId = 0;
                    } else {
                        dId = 1;
                    }
                } else if (oX < oY) {
                    if (vX > 0) {
                        dId = 2;
                    } else {
                        dId = 3;
                    }
                } else {
                    if (!isNegative && vX === vY) dId = 0;else if (!isNegative && vX < vY) dId = 0;else if (!isNegative && vX > vY) dId = 1;else if (isNegative && vX === vY) dId = 1;
                }
            }

            // console.log(this.cells)

            A.resolve(B, sideA[dId]);
            B.resolve(A, sideB[dId]);
        }
    }]);

    return Engine;
}();

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tilesManager = __webpack_require__(/*! ./tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(canvas) {
    var _this2 = this;

    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.c = canvas.getContext('2d');

    this.map = null;
    this.game = this;

    this.engine = undefined;

    this.Objects = __webpack_require__(/*! ./objects */ "./src/objects.js");

    this.utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

    this.cfg = {
      name: "default",
      cols: null,
      rows: null,
      scale: null,
      updateArr: [],
      updateAll: false,
      gravity: 0.98
    };

    this.editor = false;

    this.assets = {
      tiles: {},
      textures: {}
    };

    this.translate = {
      x: 0,
      y: 0
    };

    this.playing = [false, false], this.select = {
      color: 'blue',
      brushSize: 0,
      block: this.Objects.Wall,
      tile: this.assets.tiles.landscape
    };

    this.mouse = {
      x: null,
      y: null,
      gridX: 0,
      gridY: 0,
      left: false,
      right: false,
      click: null,
      middle: {
        click: false,
        x: null,
        y: null
      },
      last: {
        gridX: undefined,
        gridY: undefined,
        click: "nop"
      }
    };

    this.message = {
      game: this,
      list: [],
      fontSize: 35,
      offX: 200,
      offY: 100,
      error: function error(msg) {
        var _this = this.game,
            c = _this.c,
            canvas = _this.canvas,
            h = this.fontSize * 1.2;
        msg = 'Vous êtes mort !';

        //const size = _this.utils.textSize(msg, 'Arial', this.fontSize, false)
        c.font = this.fontSize + 'pt Tahoma';
        var size = [c.measureText(msg).width, parseInt(c.font.match(/\d+/), 10) * 0.7];
        console.log(size);
        var textWidth = c.measureText(msg).width;
        c.beginPath();
        c.fillStyle = 'black';
        c.fillRect(canvas.width / 2 - (size[0] + this.offX) / 2, canvas.height / 2 - (size[1] + this.offY) / 2, textWidth + this.offX, size[1] + this.offY);
        c.closePath();

        c.beginPath();
        c.fillStyle = 'red';
        c.fillText(msg, canvas.width / 2 - size[0] / 2, canvas.height / 2 + size[1] / 2);
        c.closePath();
      }
    };

    var events = ["mousedown", "mousemove", "mouseup"];
    if ("ontouchstart" in window) {
      events = events.concat("touchstart", "touchmove", "touchend");
    }
    events.forEach(function (evt) {
      return _this2.canvas.addEventListener(evt, _this2, false);
    });
  }

  _createClass(Game, [{
    key: 'start',
    value: function start() {}
  }, {
    key: 'pause',
    value: function pause() {}
  }, {
    key: 'update',
    value: function update(canvas) {
      if (this.cfg.updateAll) {
        var scale = this.cfg.scale;
        var tX = this.translate.x;
        var tY = this.translate.y;

        var canvasCols = Math.ceil(canvas.width / scale);
        var canvasRows = Math.ceil(canvas.height / scale);
        var xStart = Math.floor(tX / scale * -1) > 0 ? Math.floor(tX / scale * -1) : 0;
        var yStart = Math.floor(tY / scale * -1) > 0 ? Math.floor(tY / scale * -1) : 0;

        for (var y = yStart; y < canvasRows + yStart + 1; y++) {
          for (var x = xStart; x < canvasCols + xStart + 1; x++) {
            if (!this.map[y]) continue;
            if (!this.map[y][x]) continue;
            this.map[y][x].update();
            this.map[y][x].draw();
            if (this.map[y][x].collision) this.Engine.insert(this.map[y][x]);
          }
        }
        // for(let y = 0; y < this.map.length; y++) {
        //   for(let x = 0; x < this.map[0].length; x++) {
        //     if(!this.map[y]) continue
        //     if(!this.map[y][x]) continue
        //     this.map[y][x].draw(this)
        //     if(this.map[y][x].collision) this.Engine.insert(this.map[y][x])
        //   }
        // }

        this.cfg.updateAll = false;
      } else if (this.cfg.updateArr.length > 0) {
        for (var i = 0; i < this.cfg.updateArr.length; i++) {
          this.map[this.cfg.updateArr[i].y][this.cfg.updateArr[i].x].draw(this);
        }

        this.cfg.updateArr = [];
      }
    }
  }, {
    key: 'handleEvent',
    value: function handleEvent(evt) {
      var handler = 'on' + evt.type;
      if (typeof this[handler] === "function") {
        evt.preventDefault();
        return this[handler](evt);
      }
    }

    // event glue

  }, {
    key: 'onmousedown',
    value: function onmousedown(evt) {
      console.log(evt);
      // this.startDrawingAt({x: evt.clientX, y: evt.clientY});
    }
  }, {
    key: 'ontouchstart',
    value: function ontouchstart(evt) {
      var touch = evt.targetTouches.item(0);
      if (touch) {
        // this.startDrawingAt({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: 'onmousemove',
    value: function onmousemove(evt) {
      // this.continueDrawingTo({x: evt.clientX, y: evt.clientY});
    }
  }, {
    key: 'ontouchmove',
    value: function ontouchmove(evt) {
      var touch = evt.targetTouches.item(0);
      if (touch) {
        // this.continueDrawingTo({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: 'onmouseup',
    value: function onmouseup(evt) {
      // this.finishDrawing();
    }
  }, {
    key: 'ontouchend',
    value: function ontouchend(evt) {
      // this.finishDrawing();
    }
  }]);

  return Game;
}();

Game.prototype.canvasListeners = function (type) {
  var _this3 = this;

  canvas.removeEventListener('mousemove');
  var mouse = this.mouse,
      gridX = this.mouse.gridX,
      gridY = this.mouse.gridY,
      scale = this.cfg.scale,
      canvas = this.canvas,
      tx = this.translate.x,
      ty = this.translate.y;

  if (type === 'edit') {
    canvas.addEventListener('mousemove', function (e) {
      if (!_this3.playing[0] || !_this3.editor) return;

      mouse.x = e.clientX;
      mouse.y = e.clientY;

      mouse.gridX = Math.floor((mouse.x - tx) / scale);
      mouse.gridY = Math.floor((mouse.y - ty) / scale);
      if (!mouse.left && !mouse.right && !mouse.middle.click) return;

      if (mouse.middle.click) _this3.checkForClicks();
      if (gridX === mouse.last.gridX && gridY === mouse.last.gridY && mouse.click === mouse.last.click) return;
      _this3.checkForClicks();
    });

    canvas.addEventListener('mouseleave', function (e) {
      if (!_this3.playing[0] || !_this3.editor) return;

      mouse.left = false;
      mouse.right = false;
      mouse.middle = {
        click: false,
        x: null,
        y: null
      };
    });

    canvas.addEventListener("wheel", function (e) {
      if (!_this3.playing[0] || !_this3.editor) return;
      var zoomTo = e.wheelDelta > 0 ? 4 : -4;

      if (8 <= scale + zoomTo && scale + zoomTo <= 96) {
        _this3.translate.x = mouse.x - (mouse.x - tx) / scale * (scale + zoomTo);
        _this3.translate.y = mouse.y - (mouse.y - ty) / scale * (scale + zoomTo);
        _this3.cfg.scale += zoomTo;
        _this3.cfg.updateAll = true;
      }
    });

    canvas.addEventListener('mousedown', function (e) {
      if (!_this3.playing[0] || !_this3.editor) return;

      e.preventDefault();

      switch (e.button) {
        case 0:
          mouse.click = 'left';
          mouse.left = true;
          break;

        case 1:
          mouse.click = 'middle';
          mouse.middle = {
            click: true,
            x: mouse.x,
            y: mouse.y
          };
          break;

        case 2:
          mouse.click = 'right';
          mouse.right = true;
          break;
      }
      _this3.checkForClicks();
    });

    canvas.addEventListener('mouseup', function (e) {
      if (!_this3.playing[0] || !_this3.editor) return;

      e.preventDefault();
      mouse.click = null;
      switch (e.button) {
        case 0:
          mouse.left = false;
          break;

        case 1:
          mouse.middle = {
            click: false,
            x: null,
            y: null
          };
          break;

        case 2:
          mouse.right = false;
          break;
      }
    });
  } else if (type === 'play') {
    canvas.addEventListener('keydown', function (e) {
      if (!_this3.playing[0] || _this3.editor) return;

      if (!_this3.Player.keys.hasOwnProperty(e.key)) return;
      e.preventDefault();
      _this3.Player.keys[e.key] = true;
    });

    canvas.addEventListener('keyup', function (e) {
      if (!_this3.playing[0] || _this3.editor) return;
      if (!_this3.Player.keys.hasOwnProperty(e.key)) return;
      e.preventDefault();
      _this3.Player.keys[e.key] = false;
    });
  }
};

Game.prototype.checkForClicks = function () {
  var _this4 = this;

  var gridX = this.mouse.gridX,
      gridY = this.mouse.gridY;

  if (!this.map[gridY] || this.map[gridY] && !this.map[gridY][gridX]) return;

  var cell = this.map[gridY][gridX],
      mouseX = this.mouse.x,
      mouseY = this.mouse.y;

  this.mouse.last.gridX = gridX;
  this.mouse.last.gridY = gridY;

  var DrawPixel = function DrawPixel() {
    if (!cell.tile || cell.tile && _this4.assets.tiles[cell.tile.name] != _this4.select.tile.name) {
      var _cfg$updateArr;

      cell.empty = false;
      cell.tile = {};
      cell.tile.name = _this4.select.tile.name;

      (_cfg$updateArr = _this4.cfg.updateArr).push.apply(_cfg$updateArr, _toConsumableArray(_tilesManager2.default.getValue(_this4, gridX, gridY, false, false)));
      _this4.cfg.updateArr.push({ x: gridX, y: gridY });
    } else if (false) {}
  };

  if (this.mouse.right) {
    var _cfg$updateArr2;

    this.mouse.last.click = 'right';
    cell.empty = true;
    cell.collision = false;

    (_cfg$updateArr2 = this.cfg.updateArr).push.apply(_cfg$updateArr2, _toConsumableArray(_tilesManager2.default.getValue(this, gridX, gridY, true, false)));
    this.cfg.updateArr.push({ x: gridX, y: gridY });
  }

  if (this.mouse.left) {
    this.mouse.last.click = 'left';

    DrawPixel(gridX, gridY);
  }
  if (this.mouse.middle.click) {
    this.mouse.last.click = 'middle';
    this.translate.x += mouseX - this.mouse.middle.x;
    this.translate.y += mouseY - this.mouse.middle.y;
    this.mouse.middle.x = mouseX;
    this.mouse.middle.y = mouseY;
    this.cfg.updateAll = true;
  }
};

module.exports = Game;

/***/ }),

/***/ "./src/gameListeners.js":
/*!******************************!*\
  !*** ./src/gameListeners.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (canvas, game) {
    canvas.addEventListener('mousemove', function (e) {
        if (!game.playing[0] || !game.editor) return;

        game.mouse.x = e.clientX;
        game.mouse.y = e.clientY;

        game.mouse.gridX = Math.floor((game.mouse.x - game.translate.x) / game.cfg.scale);
        game.mouse.gridY = Math.floor((game.mouse.y - game.translate.y) / game.cfg.scale);
        if (!game.mouse.left && !game.mouse.right && !game.mouse.middle.click) return;

        if (game.mouse.middle.click) game.checkForClicks();
        if (game.mouse.gridX === game.mouse.last.gridX && game.mouse.gridY === game.mouse.last.gridY && game.mouse.click === game.mouse.last.click) return;
        game.checkForClicks();
    });

    canvas.addEventListener('mouseleave', function (e) {
        if (!game.playing[0] || !game.editor) return;

        game.mouse.left = false;
        game.mouse.right = false;
        game.mouse.middle = {
            click: false,
            x: null,
            y: null
        };
    });

    canvas.addEventListener("wheel", function (e) {

        // const cx = game.mouse.gridX = Math.floor((game.mouse.x - game.translate.x) / game.cfg.scale),
        //       cy = game.mouse.gridY = Math.floor((game.mouse.y - game.translate.y) / game.cfg.scale)
        // return console.log(game.map[cy][cx])

        if (!game.playing[0] || !game.editor) return;
        var zoomTo = e.wheelDelta > 0 ? 4 : -4;

        if (8 <= game.cfg.scale + zoomTo && game.cfg.scale + zoomTo <= 96) {
            game.translate.x = game.mouse.x - (game.mouse.x - game.translate.x) / game.cfg.scale * (game.cfg.scale + zoomTo);
            game.translate.y = game.mouse.y - (game.mouse.y - game.translate.y) / game.cfg.scale * (game.cfg.scale + zoomTo);
            game.cfg.scale += zoomTo;
            game.cfg.updateAll = true;
        }
    });

    canvas.addEventListener('mousedown', function (e) {
        if (!game.playing[0] || !game.editor) return;

        e.preventDefault();

        switch (e.button) {
            case 0:
                game.mouse.click = 'left';
                game.mouse.left = true;
                break;

            case 1:
                game.mouse.click = 'middle';
                game.mouse.middle = {
                    click: true,
                    x: game.mouse.x,
                    y: game.mouse.y
                };
                break;

            case 2:
                game.mouse.click = 'right';
                game.mouse.right = true;
                break;
        }
        game.checkForClicks();
    });

    canvas.addEventListener('mouseup', function (e) {
        if (!game.playing[0] || !game.editor) return;

        e.preventDefault();
        game.mouse.click = null;
        switch (e.button) {
            case 0:
                game.mouse.left = false;
                break;

            case 1:
                game.mouse.middle = {
                    click: false,
                    x: null,
                    y: null
                };
                break;

            case 2:
                game.mouse.right = false;
                break;
        }
    });
};

/***/ }),

/***/ "./src/json/map.json":
/*!***************************!*\
  !*** ./src/json/map.json ***!
  \***************************/
/*! exports provided: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, default */
/***/ (function(module) {

module.exports = [[{"type":"Wall","x":0,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":15,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,{"type":"Wall","x":17,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":18,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":19,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":20,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":21,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,{"type":"Wall","x":25,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":26,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":27,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":28,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":29,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":30,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":0,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":14,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":15,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,{"type":"Wall","x":18,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":19,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":20,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":30,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":31,"y":1,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true}],[{"type":"Wall","x":0,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":31,"y":2,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true}],[{"type":"Wall","x":0,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":5,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":6,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":7,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":8,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":13,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":31,"y":3,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true}],[{"type":"Wall","x":0,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":4,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,{"type":"Wall","x":7,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":8,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":9,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":10,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":11,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":12,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":30,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":31,"y":4,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true}],[{"type":"Wall","x":0,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":2,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":3,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,{"type":"Wall","x":10,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":11,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":30,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":5,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":17,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":18,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,{"type":"Wall","x":24,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":0,"id":0,"x":0,"y":0},"collision":true},0,0,0,0,{"type":"Wall","x":29,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":30,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":6,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":17,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":18,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":30,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":7,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":16,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Wall","x":17,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":30,"id":11,"x":222,"y":74},"collision":true},{"type":"Wall","x":18,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,{"type":"Wall","x":28,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":29,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":30,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":8,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":27,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":28,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":29,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":9,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":2,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":3,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,{"type":"Wall","x":6,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Wall","x":7,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,0,0,0,{"type":"Wall","x":13,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Wall","x":14,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":27,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":28,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":10,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":27,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":28,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":11,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":4,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":27,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":28,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":29,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":12,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":28,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":29,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":30,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":13,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":5,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":30,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":14,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":30,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":31,"y":15,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":6,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":7,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":120,"id":29,"x":370,"y":222},"collision":true},{"type":"Wall","x":8,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,0,0,{"type":"Wall","x":13,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Wall","x":14,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":216,"id":37,"x":370,"y":296},"collision":true},{"type":"Wall","x":15,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":120,"id":29,"x":370,"y":222},"collision":true},{"type":"Wall","x":16,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,0,0,0,{"type":"Wall","x":22,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Wall","x":23,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":216,"id":37,"x":370,"y":296},"collision":true},{"type":"Wall","x":24,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":25,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":26,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,{"type":"Wall","x":30,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":31,"y":16,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true}],[{"type":"Wall","x":0,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,{"type":"Wall","x":14,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":15,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":75,"id":17,"x":74,"y":148},"collision":true},0,0,0,0,0,0,0,{"type":"Wall","x":23,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":24,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":25,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,{"type":"Wall","x":31,"y":17,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true}],[{"type":"Wall","x":0,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,{"type":"Wall","x":15,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":66,"id":14,"x":444,"y":74},"collision":true},0,0,0,0,0,0,0,0,{"type":"Wall","x":24,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":25,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":26,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":27,"id":10,"x":148,"y":74},"collision":true},{"type":"Wall","x":27,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,0,{"type":"Wall","x":31,"y":18,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true}],[{"type":"Wall","x":0,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":6,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":7,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,{"type":"Wall","x":15,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":2,"id":1,"x":74,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":30,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":31,"y":19,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true}],[{"type":"Wall","x":0,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":4,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Wall","x":5,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":30,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":31,"y":20,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":3,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":29,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":30,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":21,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Wall","x":2,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":28,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":29,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":30,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":22,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":23,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":23,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Wall","x":28,"y":23,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":29,"y":23,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":23,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":23,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,{"type":"Wall","x":5,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":6,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":7,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":8,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":9,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","c":{},"x":10,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true,"strokeStyle":"gray"},{"type":"Wall","x":11,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":12,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":13,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":14,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,{"type":"Wall","x":17,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Wall","x":18,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,{"type":"Wall","x":21,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":22,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":23,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":24,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":25,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":26,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":27,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":28,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":29,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":24,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,{"type":"Wall","x":5,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":6,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,{"type":"Wall","x":21,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":22,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":23,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":24,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":25,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Wall","x":4,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":5,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":6,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":15,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,{"type":"Wall","x":22,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Wall","x":23,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Wall","x":24,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":26,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Wall","x":4,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":5,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":15,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,{"type":"Wall","x":23,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":24,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":27,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":2,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,{"type":"Wall","x":4,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":5,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":15,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":16,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,{"type":"Wall","x":22,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":23,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":24,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":28,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":3,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":4,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":5,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":15,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":16,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,{"type":"Wall","x":22,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Wall","x":23,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":24,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":29,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":15,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":16,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":17,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,{"type":"Wall","x":21,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Wall","x":22,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":23,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":24,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":30,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Wall","x":0,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":1,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":2,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":3,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":4,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":5,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":6,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":7,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":8,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":9,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":10,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":11,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":12,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":13,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":14,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":15,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":16,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":17,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Wall","x":18,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":19,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":20,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Wall","x":21,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Wall","x":22,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":23,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":24,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":25,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":26,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":27,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":28,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":29,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":30,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Wall","x":31,"y":31,"w":64,"h":64,"dx":0,"dy":0,"color":"white","strokeStyle":"gray","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}]];

/***/ }),

/***/ "./src/json/tiles.json":
/*!*****************************!*\
  !*** ./src/json/tiles.json ***!
  \*****************************/
/*! exports provided: landscape, default */
/***/ (function(module) {

module.exports = {"landscape":{"name":"landscape","w":8,"h":6,"l":47,"iX":10,"iY":10,"size":64,"url":"https://cdn.glitch.com/e683167b-6e53-40d8-9a05-e24a714a856d%2FtileMap.png?1551459491160"}};

/***/ }),

/***/ "./src/objects.js":
/*!************************!*\
  !*** ./src/objects.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tilesManager = __webpack_require__(/*! ./tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  Box: __webpack_require__(/*! ./objects/box */ "./src/objects/box.js"),

  Wall: __webpack_require__(/*! ./objects/wall */ "./src/objects/wall.js"),

  Player: __webpack_require__(/*! ./objects/player */ "./src/objects/player.js"),

  BouncingBox: __webpack_require__(/*! ./objects/bouncingBox */ "./src/objects/bouncingBox.js"),

  Spike: __webpack_require__(/*! ./objects/spike */ "./src/objects/spike.js")
};

/***/ }),

/***/ "./src/objects/bouncingBox.js":
/*!************************************!*\
  !*** ./src/objects/bouncingBox.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _box = __webpack_require__(/*! ./box */ "./src/objects/box.js");

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import autotile from '../tilesManager';


module.exports = function (_Box) {
  _inherits(BouncingBox, _Box);

  function BouncingBox(x, y, Game) {
    _classCallCheck(this, BouncingBox);

    var _this = _possibleConstructorReturn(this, (BouncingBox.__proto__ || Object.getPrototypeOf(BouncingBox)).call(this, x, y, Game));

    _this.h = Game.cfg.scale / 2;
    _this.type = 'BoundingBox';
    _this.color = 'purple';
    _this.empty = false;
    _this.collision = true;
    return _this;
  }

  _createClass(BouncingBox, [{
    key: 'update',
    value: function update() {
      // this.w = this.game.cfg.scale
      this.h = this.game.cfg.scale;
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      if (obj.type != 'Player') return;

      var half = this.h / 2 | 0;
      switch (side) {
        case 'TOP':
          if (obj.dy < -half) {
            obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -1.1) | 0;
            obj.hasBounced = true;
          } else {
            if (obj.dy < 15) {
              obj.y = this.getTop() - obj.h;
              obj.dy = 0;
              obj.isOnFloor = true;
            } else {
              obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -1.1) | 0;
              obj.hasBounced = true;
            }
          }
          break;

        case 'BOTTOM':
          if (obj.dy >= half) {
            obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -1.1) | 0;
            obj.hasBounced = true;
          } else {
            if (obj.dy < 15) {
              obj.y = this.getBottom();
              obj.dy = 0;
              obj.isOnFloor = true;
            } else {
              obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -1.1) | 0;
              obj.hasBounced = true;
            }
          }
          break;

        case 'LEFT':
          if (obj.dx < -half) {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -1.1);
              obj.hasBounced = true;
              // obj.x = this.getRight()
            }
          } else {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -1.1);
              obj.x = this.getLeft() - obj.w;
              obj.hasBounced = true;
            }
          }
          break;

        case 'RIGHT':
          if (obj.dx >= half) {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -1.1);
              obj.x = this.getLeft() - obj.w;
              obj.hasBounced = true;
            }
          } else {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -1.1);
              obj.x = this.getRight();
              obj.hasBounced = true;
            }
          }
          break;
      }

      function isColliding(box, p, x, y) {
        var l1 = box.getLeft(),
            r1 = box.getRight(),
            t1 = box.getTop(),
            b1 = box.getBottom(),
            l2 = p.getLeft(x),
            r2 = p.getRight(x),
            t2 = p.getTop(y),
            b2 = p.getBottom(y);

        if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) {
          return true;
        }
        //console.log('in')
        return false;
      }
    }
  }]);

  return BouncingBox;
}(_box2.default);

/***/ }),

/***/ "./src/objects/box.js":
/*!****************************!*\
  !*** ./src/objects/box.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import autotile from '../tilesManager';

module.exports = function () {
  function Box(x, y, Game) {
    _classCallCheck(this, Box);

    this.type = 'Box';
    this.game = Game;
    this.x = x;
    this.y = y;
    this.w = Game.cfg.scale;
    this.h = Game.cfg.scale;
    this.dx = 0;
    this.dy = 0;
    this.color = 'white';
    this.empty = true;
    this.collision = false;
  }

  _createClass(Box, [{
    key: 'getLeft',
    value: function getLeft(displayDelta) {
      var scale = this.game.cfg.scale;
      return this.x * scale + (displayDelta ? this.dx : 0);
    }
  }, {
    key: 'getTop',
    value: function getTop(displayDelta) {
      var scale = this.game.cfg.scale;
      return this.y * scale + (scale - this.h) + (displayDelta ? this.dy : 0);
    }
  }, {
    key: 'getRight',
    value: function getRight(displayDelta) {
      return this.getLeft(displayDelta) + this.w;
    }
  }, {
    key: 'getBottom',
    value: function getBottom(displayDelta) {
      return this.getTop(displayDelta) + this.h;
    }
  }, {
    key: 'getHalfWidth',
    value: function getHalfWidth(displayDelta) {
      return this.getRight(displayDelta) - this.w / 2;
    }
  }, {
    key: 'getHalfHeight',
    value: function getHalfHeight(displayDelta) {
      return this.getBottom(displayDelta) - this.h / 2;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var c = this.game.c,
          scale = this.game.cfg.scale,
          x = this.x * scale,
          y = this.y * scale + (scale - this.h);

      c.beginPath();
      c.rect(x, y, this.w, this.h);
      c.fillStyle = this.color;
      c.stroke();
      c.fill();
      c.closePath();
    }
  }, {
    key: 'update',
    value: function update() {
      var scale = this.game.cfg.scale;
      this.w = scale;
      this.h = scale;
    }
  }, {
    key: 'normalCollision',
    value: function normalCollision(obj, side) {
      var half = this.h / 2 | 0;

      console.log(obj.hasBounced);
      switch (side) {
        case 'TOP':
          if (obj.dy < -half) {
            obj.dy = 0;
            obj.y = this.getBottom();
          } else {
            obj.dy = 0;
            obj.y = this.getTop() - obj.h;
            obj.isOnFloor = true;
            obj.hasBounced = false;
          }
          break;

        case 'BOTTOM':
          if (obj.dy >= half) {
            obj.dy = 0;
            obj.y = this.getTop() - obj.h;
            obj.isOnFloor = true;
            obj.hasBounced = false;
          } else {
            obj.dy = 0;
            obj.y = this.getBottom();
          }
          break;

        case 'LEFT':
          if (obj.dx < -half) {
            if (isColliding(this, obj, true, false)) {
              obj.dx = 0;
              obj.x = this.getRight();
            }
          } else {
            if (isColliding(this, obj, true, false)) {
              obj.dx = 0;
              obj.x = this.getLeft() - obj.w;
            }
          }
          break;

        case 'RIGHT':
          if (obj.dx >= half) {
            if (isColliding(this, obj, true, false)) {
              obj.dx = 0;
              obj.x = this.getLeft() - obj.w;
            }
          } else {
            if (isColliding(this, obj, true, false)) {
              obj.dx = 0;
              obj.x = this.getRight();
            }
          }
          break;
      }

      function isColliding(box, p, x, y) {
        var l1 = box.getLeft(),
            r1 = box.getRight(),
            t1 = box.getTop(),
            b1 = box.getBottom(),
            l2 = p.getLeft(x),
            r2 = p.getRight(x),
            t2 = p.getTop(y),
            b2 = p.getBottom(y);

        if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) {
          return true;
        }
        return false;
      }
    }
  }]);

  return Box;
}();

/***/ }),

/***/ "./src/objects/player.js":
/*!*******************************!*\
  !*** ./src/objects/player.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _box = __webpack_require__(/*! ./box */ "./src/objects/box.js");

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Box) {
  _inherits(Player, _Box);

  function Player(x, y, name, Game) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, Game));

    _this.type = 'Player';
    _this.color = 'brown';
    _this.name = name;

    _this.x = x * _this.game.cfg.scale;
    _this.y = y * _this.game.cfg.scale;
    _this.h = 100;
    _this.w = 50;

    _this.respawn = [_this.x, _this.y];

    _this.accel = 1;
    _this.maxSpeed = 10;
    _this.jumpForce = 0;
    _this.mass = 1;
    _this.gravity = 0.98; // this.mass * 0.98;

    _this.canJump = true;
    _this.isOnFloor = false;
    _this.isDead = false;
    _this.hasBounced = false;

    _this.keys = {
      'ArrowLeft': false, // LEFT
      'ArrowUp': false, // UP
      'ArrowRight': false, // RIGHT
      'ArrowDown': false, // DOWN
      'SpaceDown': false,
      'SpaceBarre': false
    };
    return _this;
  }

  _createClass(Player, [{
    key: 'getLeft',
    value: function getLeft(vel) {
      return this.x + (vel ? this.dx : 0);
    }
  }, {
    key: 'getRight',
    value: function getRight(vel) {
      return this.x + this.w + (vel ? this.dx : 0);
    }
  }, {
    key: 'getTop',
    value: function getTop(vel) {
      return this.y + (vel ? this.dy : 0);
    }
  }, {
    key: 'getBottom',
    value: function getBottom(vel) {
      return this.y + this.h + (vel ? this.dy : 0);
    }
  }, {
    key: 'getHalfWidth',
    value: function getHalfWidth(vel) {
      return this.x + this.w / 2 + (vel ? this.dx : 0);
    }
  }, {
    key: 'getHalfHeight',
    value: function getHalfHeight(vel) {
      return this.y + this.h / 2 + (vel ? this.dy : 0);
    }
  }, {
    key: 'jump',
    value: function jump() {
      if (!this.isOnFloor || !this.canJump) return;
      this.dy = -17;
      this.isOnFloor = false;
      this.canJump = false;
    }
  }, {
    key: 'die',
    value: function die() {
      this.x = this.respawn[0];
      this.y = this.respawn[1];
      this.dx = 0;
      this.dy = 0;
      this.isOnFloor = false;
      this.hasBounced = false;
      this.isDead = true;
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      this.isDead = false;
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (this.isDead) return;
      var c = this.game.c;
      c.beginPath();
      c.rect(this.x, this.y, this.w, this.h);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: 'actions',
    value: function actions() {
      this.isIdle = true;
      if (this.isDead) return;

      if (!this.keys.ArrowUp) {
        this.canJump = true;
      }

      if (this.keys.ArrowLeft) {
        this.dx = Math.max(this.dx - this.accel, -this.maxSpeed);
        this.isIdle = false;
      }

      if (this.keys.ArrowRight) {
        this.dx = Math.min(this.dx + this.accel, this.maxSpeed);
        this.isIdle = false;
      }

      if (this.keys.ArrowUp) {
        this.jump();
      } // if (this.keys.ArrowDown)  


      // GRAVITY AND FRICTIONS
      this.dy += 0.98;
      if (this.isIdle) {
        var friction = this.isOnFloor ? 0.3 : 0.07;
        this.dx = this.game.utils.lerp(this.dx, 0, friction);
      }
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      // Something
    }
  }, {
    key: 'update',
    value: function update() {
      // console.log(this.isDead)
      if (this.isDead) return;

      // console.log('PlayerY =', this.dy)

      if (this.dy > 0) this.isOnFloor = false;

      if (this.dy > 0) {
        this.dy = this.dy > 63 ? 63 : this.dy;
      } else if (this.dy < 0) {
        this.dy = this.dy < -63 ? -63 : this.dy;
      }
      if (this.dx > 0) {
        this.dx = this.dx > 63 ? 63 : this.dx;
      } else if (this.dx < 0) {
        this.dx = this.dx < -63 ? -63 : this.dx;
      }

      // Map border
      var scale = this.game.cfg.scale,
          cols = this.game.cfg.cols,
          rows = this.game.cfg.rows;

      if (this.getLeft(true) < 0) {
        this.x = 0;
        // return this.die()
        this.dx = 0;
      } else if (this.getRight(true) > cols * scale) {
        this.x = cols * scale - this.w;
        // return this.die()
        this.dx = 0;
      }

      if (this.getTop(true) < 0) {
        this.y = 0;
        // return this.die()
        this.dy = 0;
      } else if (this.getBottom(true) > rows * scale) {
        this.y = rows * scale - this.h;
        this.isOnFloor = true;
        // return this.die()
        this.dy = 0;
      }

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
    }
  }]);

  return Player;
}(_box2.default);

/***/ }),

/***/ "./src/objects/spike.js":
/*!******************************!*\
  !*** ./src/objects/spike.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _box = __webpack_require__(/*! ./box */ "./src/objects/box.js");

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import autotile from '../tilesManager';


module.exports = function (_Box) {
  _inherits(Spike, _Box);

  function Spike(x, y, Game) {
    _classCallCheck(this, Spike);

    var _this = _possibleConstructorReturn(this, (Spike.__proto__ || Object.getPrototypeOf(Spike)).call(this, x, y, Game));

    _this.h = Game.cfg.scale / 2;
    _this.type = 'Spike';
    _this.color = 'gray';
    _this.empty = false;
    _this.collision = true;
    return _this;
  }

  _createClass(Spike, [{
    key: 'update',
    value: function update() {
      // this.w = this.game.cfg.scale
      this.h = this.game.cfg.scale / 2;
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      if (obj.type != 'Player') return;

      if (side === 'TOP') {
        return obj.die();
      }
      this.normalCollision(obj, side);
    }
  }]);

  return Spike;
}(_box2.default);

/***/ }),

/***/ "./src/objects/wall.js":
/*!*****************************!*\
  !*** ./src/objects/wall.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tilesManager = __webpack_require__(/*! ../tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

var _box = __webpack_require__(/*! ./box */ "./src/objects/box.js");

var _box2 = _interopRequireDefault(_box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Box) {
  _inherits(Wall, _Box);

  function Wall(x, y, Game) {
    _classCallCheck(this, Wall);

    var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, x, y, Game));

    _this.type = 'Wall';
    _this.tile = null;
    return _this;
  }

  _createClass(Wall, [{
    key: 'draw',
    value: function draw() {
      var game = this.game;
      var c = game.c;
      if (!this.tile) {
        return;
        c.beginPath();
        c.rect(this.x * game.cfg.scale, this.y * game.cfg.scale, game.cfg.scale, game.cfg.scale);
        c.fillStyle = this.color;
        c.fill();
        c.strokeStyle = this.strokeStyle;
        c.stroke();
        c.closePath();

        this.strokeStyle = 'gray';
      } else {
        c.beginPath();
        c.drawImage(game.assets.tiles[this.tile.name].img, this.tile.x, this.tile.y, game.assets.tiles[this.tile.name].size, game.assets.tiles[this.tile.name].size, this.x * game.cfg.scale, this.y * game.cfg.scale, game.cfg.scale, game.cfg.scale);
        c.closePath();
      }
    }
  }, {
    key: 'update',
    value: function update() {
      if (!this.game.editor) return;
      var game = this.game;
      this.w = game.cfg.scale;
      this.h = game.cfg.scale;

      if (this.tile) {
        this.collision = this.tile.value < 255 ? true : false;
        var v = _tilesManager2.default.getID(this.tile.value);
        this.tile.id = v === 0 ? 0 : v - 1;

        var x = this.tile.id % game.assets.tiles[this.tile.name].w;
        var y = Math.floor(this.tile.id / game.assets.tiles[this.tile.name].w);

        this.tile.x = x * game.assets.tiles[this.tile.name].size + x * game.assets.tiles[this.tile.name].iX;
        this.tile.y = y * game.assets.tiles[this.tile.name].size + y * game.assets.tiles[this.tile.name].iY;
      }
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      if (obj.type != 'Player') return;

      // console.log(side)
      // console.log(
      //   obj.dx, obj.dy
      // )
      this.normalCollision(obj, side);
    }
  }]);

  return Wall;
}(_box2.default);

/***/ }),

/***/ "./src/playerListeners.js":
/*!********************************!*\
  !*** ./src/playerListeners.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (p, game) {
  document.addEventListener('keydown', function (e) {
    if (!game.playing[0] || game.editor) return;

    if (!p.keys.hasOwnProperty(e.key)) return;
    e.preventDefault();
    p.keys[e.key] = true;
  });

  document.addEventListener('keyup', function (e) {
    if (!game.playing[0] || game.editor) return;
    if (!p.keys.hasOwnProperty(e.key)) return;
    e.preventDefault();
    p.keys[e.key] = false;
  });
};

/***/ }),

/***/ "./src/tilesManager.js":
/*!*****************************!*\
  !*** ./src/tilesManager.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {

  getID: function getID(value) {
    var tiles = {
      0: 1, // 
      2: 2, // N
      8: 3, // W 
      10: 4, // W N
      11: 5, // W N NW 
      16: 6, // E
      18: 7, // E N
      22: 8, // E N NE
      24: 9, // E W
      26: 10, // E N W
      27: 11, // E N W NW
      30: 12, // E N W NE
      31: 13, // E N W NW NE
      64: 14, // S
      66: 15, // S N
      72: 16, // S W
      74: 17, // S N W
      75: 18, // S N W NW
      80: 19, // S E
      82: 20, // S N E
      86: 21, // S N E NE
      88: 22, // S W E
      90: 23, // S N W E
      91: 24, // S N W E NW
      94: 25, // S N W E NE
      95: 26, // S N W E NW NE
      104: 27, // S W SW
      106: 28, // S N W SW
      107: 29, // S N W NW SW
      120: 30, // S W E SW
      122: 31, // S N W E SW
      123: 32, // S N W E NW SW
      126: 33, // S N W E NE SW
      127: 34, // S N W E NW NE SW
      208: 35, // S E SE
      210: 36, // S N E SE
      214: 37, // S N E NE SE
      216: 38, // S W E SE
      218: 39, // S N W E SE
      219: 40, // S N W E NW SE 
      222: 41, // S N W E NE SE 
      223: 42, // S N W E NW NE SE 
      248: 43, // S W E SW SE
      250: 44, // S N W E SW SE
      251: 45, // S N W E NW SW SE
      254: 46, // S N W E NE SW SE
      255: 47 // S N W E NW NE SW SE
    };
    if (!tiles.hasOwnProperty(value)) console.log(value);
    return tiles[value];
  },

  getValue: function getValue(game, x, y, del, child) {
    return getTileValue(game, x, y, del, child);
  }
};

function getTileValue(game, x, y) {
  var del = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var child = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var tileValue = 0;
  var updateArr = [];

  var N = 2;
  var S = 64;
  var W = 8;
  var E = 16;

  var NW = 1;
  var NE = 4;
  var SW = 32;
  var SE = 128;

  function checkObj(a, b, v, id) {
    if (game.map[b] && game.map[b][a] && game.map[b][a].empty) return;

    tileValue += v;
    if (id >= 0) NSWE[id] = true;
    if (child) return;
    if (!game.map[b] || game.map[b] && !game.map[b][a]) return;

    getTileValue(game, a, b, false, true);
    game.cfg.updateArr.push({ x: a, y: b });
  }
  var NSWE = [false, false, false, false];

  checkObj(x, y - 1, N, 0); // N
  checkObj(x, y + 1, S, 1); // S
  checkObj(x - 1, y, W, 2); // W // 24 + 64
  checkObj(x + 1, y, E, 3); // E

  if (NSWE[0] && NSWE[2]) checkObj(x - 1, y - 1, NW); // NW
  if (NSWE[0] && NSWE[3]) checkObj(x + 1, y - 1, NE); // NE
  if (NSWE[1] && NSWE[2]) checkObj(x - 1, y + 1, SW); // SW
  if (NSWE[1] && NSWE[3]) checkObj(x + 1, y + 1, SE); // SE


  if (!del) {
    game.map[y][x].tile.value = tileValue;
  } else {
    game.map[y][x].tile = null;
  }

  game.map[y][x].update(game);
  return updateArr;
}

/***/ }),

/***/ "./src/toolbar.js":
/*!************************!*\
  !*** ./src/toolbar.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (game) {
    // GameEngine UI
    var form = document.createElement('form');

    var playBtn = document.createElement('button');
    playBtn.innerHTML = 'PLAY';
    playBtn.onclick = function (e) {
        e.preventDefault();
        if (!game.playing[1]) {
            game.playing[0] = true;
            game.playing[1] = true;
            game.cfg.updateAll = true;
            game.init();
            setTimeout(function () {
                game.animate();
            }, 500);
            e.target.innerHTML = 'PAUSE';
        } else {
            if (game.playing[0]) {
                e.target.innerHTML = 'PLAY';
                game.playing[0] = false;
            } else if (!game.playing[0]) {
                game.playing[0] = true;
                game.animate();
                e.target.innerHTML = 'PAUSE';
            }
        }
    };

    // Colors selection
    var inputColor = document.createElement('input');
    inputColor.type = 'color';
    inputColor.onchange = function (e) {
        game.select.color = e.target.value;
    };

    var saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'SAVE';
    saveBtn.onclick = function (e) {
        e.preventDefault();

        var str = '[';

        game.map.forEach(function (a, aId) {
            str += '[';
            a.forEach(function (o, oId) {
                if (o.empty) str += '' + 0 + (oId < a.length - 1 ? ', ' : '');else str += '' + JSON.stringify(flatten(o)) + (oId < a.length - 1 ? ', ' : '');
            });
            str += aId < game.map.length - 1 ? '], ' : ']';
        });
        str += ']';

        copyToClipboard(str);
        alert('The map has been copied on your clipboard');
    };

    form.append(playBtn);
    form.append(inputColor);
    form.append(saveBtn);
    return form;
};

function copyToClipboard(text) {
    var dummy = document.createElement("input");
    document.body.appendChild(dummy);
    dummy.setAttribute('value', text);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

function flatten(obj) {
    var result = Object.create(obj);
    for (var key in result) {
        result[key] = result[key];
    }
    return result;
}

/*
// brushsize selector
const inputBrush = document.createElement('input');
inputBrush.type = 'number'
inputBrush.value = brushSize
inputBrush.onchange = (e) => {
    const value = e.target.value;
    if(!isNaN(value) && (0 <= value && value <= 60)) brushSize = Number(e.target.value);
}


// form.append(inputBrush);
*/

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  rand: function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  loadTiles: function loadTiles(tile) {
    var img = new Image();
    img.src = tile.url;
    img.addEventListener('load', function () {
      tile.img = img;
      console.log(tile.name, 'loaded.');
    }, false);
  },

  lerp: function lerp(value1, value2, amount) {
    if (value1 === 0) return false;
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    var result = Number((value1 + (value2 - value1) * amount).toFixed(2));
    return result.toFixed(0) != value2 ? result : value2;
  },

  getBlock: function getBlock(arr, x, y) {
    if (!arr[y]) return false;else if (arr[y] && !arr[y][x]) return false;else if (!arr[y][x].collision) return false;else return true;
  },

  textSize: function textSize(text, font, size) {
    var bold = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    var div = document.createElement("div");
    div.innerHTML = text;
    div.style.position = 'absolute';
    div.style.top = '-9999px';
    div.style.left = '-9999px';
    div.style.fontFamily = font;
    div.style.fontWeight = bold ? 'bold' : 'normal';
    div.style.fontSize = size + 'px'; // or 'pt'
    document.body.appendChild(div);
    var result = [div.offsetWidth, div.offsetHeight];
    document.body.removeChild(div);

    console.log(result);
    return result;
  }

  /*
      function brush() {
          let x = brushSize, y = 0, radiusError = 1 - x;
          while (x >= y) {
  
              for(let i = 0; i <= y; i++) {
                  if(i === 0) {
                      DrawPixel(x + gridX, i + gridY);
                      DrawPixel(-x + gridX, i + gridY);
                      continue
                  }
                  DrawPixel(x + gridX, i + gridY);
                  DrawPixel(x + gridX, -i + gridY);
                  
                  DrawPixel(-x + gridX, i + gridY);
                  DrawPixel(-x + gridX, -i + gridY);
              }
  
              for(let i = 0; i <= x; i++) {
                  if(x === y) break
                  if(y === 0 && i === 0) continue
                  if(i === 0) {
                      DrawPixel(y + gridX, i + gridY);
                      DrawPixel(-y + gridX, i + gridY);
                      continue
                  }
  
                  DrawPixel(y + gridX, i + gridY);
                  DrawPixel(y + gridX, -i + gridY);
                  if(y === 0) continue
  
                  DrawPixel(-y + gridX, i + gridY);
                  DrawPixel(-y + gridX, -i + gridY);
              }
  
              y++;
              
              if (radiusError < 0) {
                  radiusError += 2 * y + 1;
              }
              else {
                  x--;
                  radiusError+= 2 * (y - x + 1);
              }
          }
      }
  */

};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map