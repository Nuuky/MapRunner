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

/***/ "./src/button.js":
/*!***********************!*\
  !*** ./src/button.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(game, x, y, w, h, fontSize, str, eventName, callback) {
    var _this = this;

    var autoDestroy = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;

    _classCallCheck(this, Button);

    this.x = x;
    this.y = y;
    this.halfX = x;
    this.halfY = y;
    this.fontSize = fontSize;
    this.str = str;
    this.game = game;
    this.w = w;
    this.h = h;
    this.offX = 0;
    this.offY = 0;
    this.backColor = 'black';
    this.fontColor = 'white';
    this.cb = callback;
    this.autoDestroy = autoDestroy;

    this.onOver = function (e) {
      if (_this.game.utils.mouseCollision(_this, { x: e.clientX, y: e.clientY })) {
        _this.backColor = 'brown';
        _this.draw();
      } else {
        _this.backColor = 'black';
        _this.draw();
      }
    };

    this.click = function (e) {
      if (!_this.game.utils.mouseCollision(_this, { x: e.clientX, y: e.clientY })) return;
      _this.cb();
      if (autoDestroy) _this.destroy();
    };

    this.game.canvas.addEventListener('mousemove', this.onOver);

    this.game.canvas.addEventListener('click', this.click);

    this.draw();
  }

  _createClass(Button, [{
    key: 'draw',
    value: function draw() {
      var game = this.game,
          canvas = game.canvas,
          c = game.c;

      c.font = this.fontSize + 'pt Tahoma';
      var size = game.utils.textSize(c, this.str);
      this.offX = this.w - size[0];
      this.offY = this.h - size[1];
      this.x = this.halfX - (size[0] + this.offX) / 2;
      this.y = this.halfY - (size[1] + this.offY) / 2;

      c.beginPath();
      c.fillStyle = this.backColor;
      c.fillRect(this.x, this.y, size[0] + this.offX, size[1] + this.offY);
      c.closePath();

      c.beginPath();
      c.fillStyle = this.fontColor;
      c.fillText(this.str, this.halfX - size[0] / 2, this.halfY + size[1] / 2);
      c.closePath();
    }
  }, {
    key: 'getTop',
    value: function getTop() {
      return this.halfY;
    }
  }, {
    key: 'getBottom',
    value: function getBottom() {
      return this.getTop() + this.h;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      console.log('destroying');
      this.game.canvas.removeEventListener('mousemove', this.onOver);
      this.game.canvas.removeEventListener('click', this.click);
    }

    // canvas.on('handleClick', function(e, mouse)

  }]);

  return Button;
}();

module.exports = Button;

/***/ }),

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

var _game = __webpack_require__(/*! ./game */ "./src/game.js");

var _game2 = _interopRequireDefault(_game);

var _tilesManager = __webpack_require__(/*! ./tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

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

// Player
var Player = Game.Player = new _objects2.default.Player(3, 27, 'James', Game); // x, y, w, h, name, Game)

// Toolbar
var elUI = (0, _toolbar2.default)(Game);
gameDiv.append(elUI);
elUI = null;

// Implementation
Game.init = function () {
    // Listeners
    Game.events.start();

    Game.map = __webpack_require__(/*! ./json/map */ "./src/json/map.json");

    if (!Game.map) {
        Game.map = [];
        for (var row = 0; row < Game.cfg.rows; row++) {
            Game.map[row] = [];
            for (var col = 0; col < Game.cfg.cols; col++) {
                Game.map[row][col] = new Game.Objects.Block(col, row, Game);
            }
        }
    } else {
        var bouncingCalls = [9, 10, 11];

        for (var _row = 0; _row < Game.map.length; _row++) {
            for (var _col = 0; _col < Game.map[0].length; _col++) {
                var cell = Game.map[_row][_col];
                var obj = Game.utils.numberToClass(cell);
                Game.map[_row][_col] = new obj(_col, _row, Game);
                // console.log(Game.map[row][col])
                if (Game.map[_row][_col].type === 'Wall') _tilesManager2.default.getValue(Game, _col, _row, false, false);
                // return
                // if(Game.map[row][col] != 0) {
                //     const objName = Game.map[row][col].type
                //     let obj = new Game.Objects[objName](col, row, Game)
                //     Game.map[row][col] = Object.assign(obj, Game.map[row][col]);
                // }
                // else if(row === 23 && bouncingCalls.includes(col)) {
                //     let obj = new Game.Objects.BouncingBox(col, row, Game) // x, y, w, h, Game
                //     Game.map[row][col] = Object.assign(obj, Game.map[row][col]);
                // }
                // else {
                //     if(Game.editor) Game.map[row][col] = new Game.Objects.Block(col, row, Game);
                // }
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
    fpsCount = 0,
    dispFps = 0;
var interval = 1000 / fps,
    first = then;
var displayInfo = function displayInfo() {
    fpsCount++;

    c.beginPath();
    c.fillStyle = "rgba(0, 0, 0, 0.5)";
    c.fillRect(canvas.width - 80, 0, 100, 40);
    c.fillStyle = "white";
    c.font = "11px Arial";
    c.fillText('ZOOM: x' + (Game.cfg.scale / 64).toFixed(2), canvas.width - 75, 15);
    c.fillText('FPS: ' + dispFps, canvas.width - 75, 30);
    c.rect(0, 0, canvas.width, canvas.height);
    c.stroke();
    c.closePath();
};

var framePerSeconds = setInterval(function () {
    dispFps = fpsCount;
    fpsCount = 0;
}, 1000);

var mapWidth = Game.cfg.cols * Game.cfg.scale,
    mapHeight = Game.cfg.rows * Game.cfg.scale,
    halfMapWidth = mapWidth - canvas.width,
    halfMapHeight = mapHeight - canvas.height;

// Animation Loop
Game.animate = function () {
    if (Game.playing[0]) requestAnimationFrame(Game.animate);
    now = Date.now();
    delta = now - then;

    if (delta > interval) {
        // console.log(delta)
        // console.time('check')
        then = now - delta % interval;

        Game.update[Game.mode].update();

        displayInfo();

        //Game.message.error('Test')

        // console.timeEnd('check')
    }
};

// TempMenu
var btn = new __webpack_require__(/*! ./button */ "./src/button.js");
var btns = [];

var btn1 = new btn(Game, canvas.width / 2, canvas.height / 3, 250, 80, 30, 'Story', 'test1', function () {
    Game.init();
    setTimeout(function () {
        Game.playing = [true, true];
        Game.cfg.updateAll = true;

        Game.update[Game.mode].mute();
        Game.mode = 'play';
        Game.update[Game.mode].listen();

        Game.animate();
        btns.forEach(function (b) {
            return b.destroy();
        });
    }, 200);
});

var btn2 = new btn(Game, canvas.width / 2, btn1.getBottom() + 10, 250, 80, 30, 'Map Maker', 'test2', function () {
    Game.init();
    setTimeout(function () {
        Game.playing = [true, true];
        Game.cfg.updateAll = true;

        Game.update[Game.mode].mute();
        Game.mode = 'edit';
        Game.update[Game.mode].listen();

        Game.animate();
        btns.forEach(function (b) {
            return b.destroy();
        });
    }, 200);
});

var btn3 = new btn(Game, canvas.width / 2, btn2.getBottom() + 10, 250, 80, 30, 'Quit', 'test3', function () {});
btns = [btn1, btn2, btn3];

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
        this.cells = [];
    }

    _createClass(Engine, [{
        key: 'create',
        value: function create(rows, cols, scale) {
            this.rows = rows;
            this.cols = cols;
            this.scale = scale;

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

            // if(entity.type === 'Player') {
            //     // console.log(cellStartX, cellEndX)
            //     // console.log(cellStartY, cellEndY)
            // }


            for (var row = cellStartY; row < cellEndY; row++) {
                for (var col = cellStartX; col < cellEndX; col++) {
                    if (this.makeCell(row, col)) {
                        this.cells[row][col].push(entity);
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

/***/ "./src/events.js":
/*!***********************!*\
  !*** ./src/events.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Events(game) {
    _classCallCheck(this, Events);

    this.game = game;
    this.list = "ontouchstart" in window ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "keyup", "keydown", "wheel", "mouseleave"];
  }

  _createClass(Events, [{
    key: "start",
    value: function start() {
      var _this = this;

      this.list.forEach(function (evt) {
        return _this.game.canvas.addEventListener(evt, _this, false);
      });
      console.log('start');
    }
  }, {
    key: "end",
    value: function end() {
      var _this2 = this;

      this.list.forEach(function (evt) {
        return _this2.game.canvas.removeEventListener(evt, _this2, false);
      });
      console.log('end');
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(evt) {
      var handler = "on" + evt.type;
      if (typeof this[handler] === "function") {
        evt.preventDefault();
        return this[handler](evt);
      }
    }

    // event glue

  }, {
    key: "onkeydown",
    value: function onkeydown(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0] || game.editor) return;
      if (!game.Player.keys.hasOwnProperty(e.key)) return;
      game.Player.keys[e.key] = true;
    }
  }, {
    key: "onkeyup",
    value: function onkeyup(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0] || game.editor) return;

      if (!game.Player.keys.hasOwnProperty(e.key)) return;
      game.Player.keys[e.key] = false;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(e) {
      var game = this.game;
      if (!game.playing[0] || !game.editor) return;

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
    }
  }, {
    key: "onmouseup",
    value: function onmouseup(e) {
      var game = this.game;
      if (!game.playing[0] || !game.editor) return;

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
    }
  }, {
    key: "onwheel",
    value: function onwheel(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0] || !game.editor) return;

      var mouse = game.mouse,
          tx = game.translate.x,
          ty = game.translate.y,
          scale = game.cfg.scale;

      var zoomTo = e.wheelDelta > 0 ? 4 : -4;

      if (8 <= scale + zoomTo && scale + zoomTo <= 96) {
        game.translate.x = mouse.x - (mouse.x - tx) / scale * (scale + zoomTo);
        game.translate.y = mouse.y - (mouse.y - ty) / scale * (scale + zoomTo);
        game.cfg.scale += zoomTo;
        game.cfg.updateAll = true;
      }
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(e) {
      var game = this.game;
      if (!game.playing[0] || !game.editor) return;

      var mouse = game.mouse,
          scale = game.cfg.scale,
          tx = game.translate.x,
          ty = game.translate.y;

      game.mouse.x = e.clientX;
      game.mouse.y = e.clientY;

      game.mouse.gridX = Math.floor((mouse.x - tx) / scale);
      game.mouse.gridY = Math.floor((mouse.y - ty) / scale);

      if (!mouse.left && !mouse.right && !mouse.middle.click) return;
      if (mouse.middle.click) game.checkForClicks();
      if (mouse.gridX === mouse.last.gridX && mouse.gridY === mouse.last.gridY && mouse.click === mouse.last.click) return;
      game.checkForClicks();
    }
  }, {
    key: "onmouseleave",
    value: function onmouseleave(e) {
      var game = this.game;
      if (!game.playing[0] || !game.editor) return;

      game.mouse.left = false;
      game.mouse.right = false;
      game.mouse.middle = {
        click: false,
        x: null,
        y: null
      };
    }
  }, {
    key: "ontouchstart",
    value: function ontouchstart(e) {
      var game = this.game;
      var touch = e.targetTouches.item(0);
      if (touch) {
        // game.startDrawingAt({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: "ontouchmove",
    value: function ontouchmove(e) {
      var game = this.game;
      var touch = e.targetTouches.item(0);
      if (touch) {
        // game.continueDrawingTo({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: "ontouchend",
    value: function ontouchend(e) {
      var game = this.game;
      // game.finishDrawing();
    }
  }]);

  return Events;
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

var _events = __webpack_require__(/*! ./events */ "./src/events.js");

var _events2 = _interopRequireDefault(_events);

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _engine = __webpack_require__(/*! ./engine */ "./src/engine.js");

var _engine2 = _interopRequireDefault(_engine);

var _play = __webpack_require__(/*! ./update/play */ "./src/update/play.js");

var _play2 = _interopRequireDefault(_play);

var _edit = __webpack_require__(/*! ./update/edit */ "./src/update/edit.js");

var _edit2 = _interopRequireDefault(_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(canvas) {
    _classCallCheck(this, Game);

    this.canvas = canvas;
    this.c = canvas.getContext('2d');

    this.map = null;

    this.Player = undefined;

    this.Objects = __webpack_require__(/*! ./objects */ "./src/objects.js");

    this.utils = new _utils2.default(this);

    this.cfg = {
      name: "default",
      cols: null,
      rows: null,
      scale: null,
      updateArr: [],
      updateAll: false,
      gravity: 0.98
    };

    this.mode = "edit";

    this.Engine = new _engine2.default(this.c, this.cfg.cols, this.cfg.rows, this.cfg.scale);

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

    this.events = new _events2.default(this);

    this.update = {
      play: new _play2.default(this),
      edit: new _edit2.default(this)
    };
  }

  _createClass(Game, [{
    key: 'menu',
    value: function menu() {
      __webpack_require__(/*! ./menu */ "./src/menu.js")(this);
    }
  }, {
    key: 'start',
    value: function start() {}
  }, {
    key: 'pause',
    value: function pause() {}
  }, {
    key: 'updateMap',
    value: function updateMap() {
      if (this.cfg.updateAll || !this.editor) {
        var scale = this.cfg.scale,
            canvas = this.canvas,
            tX = this.translate.x,
            tY = this.translate.y;

        var canvasCols = Math.ceil(canvas.width / scale);
        var canvasRows = Math.ceil(canvas.height / scale);
        var xStart = Math.floor(tX / scale * -1) > 0 ? Math.floor(tX / scale * -1) : 0;
        var yStart = Math.floor(tY / scale * -1) > 0 ? Math.floor(tY / scale * -1) : 0;

        for (var y = yStart; y < canvasRows + yStart + 1; y++) {
          for (var x = xStart; x < canvasCols + xStart + 1; x++) {
            if (!this.map[y]) continue;
            if (!this.map[y][x]) continue;
            if (!this.editor && this.map[y][x].empty) continue;
            this.map[y][x].update();
            this.map[y][x].draw();
            if (this.map[y][x].collision) this.Engine.insert(this.map[y][x]);
          }
        }
        this.cfg.updateAll = false;
      } else if (this.cfg.updateArr.length > 0) {
        for (var i = 0; i < this.cfg.updateArr.length; i++) {
          this.map[this.cfg.updateArr[i].y][this.cfg.updateArr[i].x].draw(this);
        }

        this.cfg.updateArr = [];
      }
    }
  }]);

  return Game;
}();

Game.prototype.Camera = function () {
  if (this.editor) return;

  var canvas = this.canvas,
      Player = this.Player,
      scale = this.cfg.scale,
      mapWidth = this.cfg.cols * scale,
      mapHeight = this.cfg.rows * scale,
      halfMapWidth = mapWidth - canvas.width,
      halfMapHeight = mapHeight - canvas.height,
      isOffsetX = canvas.width < mapWidth ? true : false,
      isOffsetY = canvas.height < mapHeight ? true : false;

  var tx = -Player.getHalfWidth() + canvas.width / 2,
      ty = -Player.getHalfHeight() + canvas.height / 2;

  if (!isOffsetX) tx = canvas.width / 2 - mapWidth / 2;
  if (!isOffsetY) ty = canvas.height / 2 - mapHeight / 2;
  if (isOffsetX && Player.getHalfWidth() <= canvas.width / 2) tx = 0;else if (isOffsetX && Player.getHalfWidth() >= mapWidth - canvas.width / 2) tx = -halfMapWidth;
  if (isOffsetY && Player.getHalfHeight() <= canvas.height / 2) ty = 0;else if (isOffsetY && Player.getHalfHeight() >= mapHeight - canvas.height / 2) ty = -halfMapHeight;

  if (!Player.isDead) {
    this.translate.x = tx;
    this.translate.y = ty;
  } else {
    // If Camera POS === Player Respawn POS
    if (this.translate.x == tx && this.translate.y == ty) {
      Player.spawn();
    } else {
      this.translate.x = this.utils.lerp(this.translate.x, tx, 0.2);
      this.translate.y = this.utils.lerp(this.translate.y, ty, 0.2);
    }
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

module.exports = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,1,1,0,0,1,1,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1],[1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1],[1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1],[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,1],[1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],[1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],[1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],[1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],[1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1],[1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];

/***/ }),

/***/ "./src/json/tiles.json":
/*!*****************************!*\
  !*** ./src/json/tiles.json ***!
  \*****************************/
/*! exports provided: landscape, default */
/***/ (function(module) {

module.exports = {"landscape":{"name":"landscape","w":8,"h":6,"l":47,"iX":10,"iY":10,"size":64,"url":"https://cdn.glitch.com/e683167b-6e53-40d8-9a05-e24a714a856d%2FtileMap.png?1551459491160"}};

/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (game) {
  var canvas = game.canvas,
      c = game.c;

  this.game = game;
  this.evtList = ['mousemove', 'mouseclick'];

  game.utils.events(evtList);
  evt.start();

  onmousemove = function onmousemove(e) {
    var event = new CustomEvent('menuOver', {
      'mouse': {
        x: e.clientX,
        y: e.clienty
      }
    });
    canvas.dispatchEvent(event);
  };

  onmouseclick = function onmouseclick(e) {
    var event = new CustomEvent('menuOver', {
      'mouse': {
        x: e.clientX,
        y: e.clienty
      }
    });
    canvas.dispatchEvent(event);
  };
};

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
  Block: __webpack_require__(/*! ./objects/block */ "./src/objects/block.js"),

  Wall: __webpack_require__(/*! ./objects/wall */ "./src/objects/wall.js"),

  Player: __webpack_require__(/*! ./objects/player */ "./src/objects/player.js"),

  BouncingBox: __webpack_require__(/*! ./objects/bouncingBox */ "./src/objects/bouncingBox.js"),

  Spike: __webpack_require__(/*! ./objects/spike */ "./src/objects/spike.js")
};

/***/ }),

/***/ "./src/objects/block.js":
/*!******************************!*\
  !*** ./src/objects/block.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import autotile from '../tilesManager';

module.exports = function () {
  function Block(x, y, Game) {
    _classCallCheck(this, Block);

    this.type = 'Block';
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

  _createClass(Block, [{
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
      var objHalfHeight = this.h / 2 | 0,
          objHalfWidth = this.h / 2 | 0,
          objMovingLeft = obj.dx < 0 ? true : false,
          objMovingRight = obj.dx > 0 ? true : false,
          objMovingTop = obj.dy < 0 ? true : false,
          objMovingBottom = obj.dy > 0 ? true : false,
          collisionLeft = side === 'LEFT' ? true : false,
          collisionRight = side === 'RIGHT' ? true : false,
          collisionTop = side === 'TOP' ? true : false,
          collisionBottom = side === 'BOTTOM' ? true : false,
          col = this.x,
          row = this.y,
          utils = this.game.utils;

      if (objMovingBottom) {
        if (collisionTop) {
          obj.isOnFloor = true;
          obj.hasBounced = false;
          obj.y = this.getTop() - obj.h;
          obj.dy = 0;
        }
        if (collisionLeft) {
          if (utils.catchBlockCollision(col - 1, row)) {
            obj.isOnFloor = true;
            obj.hasBounced = false;
            obj.y = this.getTop() - obj.h;
            obj.dy = 0;
          } else {
            obj.x = this.getLeft() - obj.w;
            obj.dx = 0;
          }
        }
        if (collisionRight) {
          if (utils.catchBlockCollision(col + 1, row)) {
            obj.isOnFloor = true;
            obj.hasBounced = false;
            obj.y = this.getTop() - obj.h;
            obj.dy = 0;
          } else {
            obj.x = this.getRight();
            obj.dx = 0;
          }
        }
      } else if (objMovingTop) {
        if (collisionBottom) {
          obj.y = this.getBottom();
          obj.dy = 0;
        }
        if (collisionLeft) {
          if (utils.catchBlockCollision(col - 1, row)) {
            obj.y = this.getBottom();
            obj.dy = 0;
          } else {
            obj.x = this.getLeft() - obj.w;
            obj.dx = 0;
          }
        }
        if (collisionRight) {
          if (utils.catchBlockCollision(col + 1, row)) {
            obj.y = this.getBottom();
            obj.dy = 0;
          } else {
            obj.x = this.getRight();
            obj.dx = 0;
          }
        }
      } else if (objMovingLeft && collisionLeft) {
        obj.x = this.getLeft() - obj.w;
        obj.dx = 0;
      } else if (objMovingRight && collisionRight) {
        obj.x = this.getRight();
        obj.dx = 0;
      }

      // switch(side) {
      //   case 'TOP':
      //     if (obj.dy < -half) {
      //       obj.dy = 0
      //       obj.y = this.getBottom()
      //     } else {
      //       obj.dy = 0
      //       obj.y = this.getTop() - obj.h
      //       obj.isOnFloor = true
      //       obj.hasBounced = false
      //     }
      //     break;

      //   case 'BOTTOM':
      //     if (obj.dy >= half) {
      //       obj.dy = 0
      //       obj.y = this.getTop() - obj.h
      //       obj.isOnFloor = true
      //       obj.hasBounced = false
      //     } else {
      //       obj.dy = 0
      //       obj.y = this.getBottom()
      //     }
      //     break;

      //   case 'LEFT':
      //     if (obj.dx < -half) {
      //       if (isColliding(this, obj, true, false)) {
      //         if (this.game.map[this.y][this.x+1].collision) {
      //           obj.dx = 0
      //           obj.y = this.getTop() - obj.h
      //           break; 
      //         }
      //         obj.dx = 0
      //         obj.x = this.getRight()
      //       }
      //     } else {
      //       if (isColliding(this, obj, true, false)) {
      //         if (this.game.map[this.y][this.x-1].collision) {
      //           obj.dx = 0
      //           obj.y = this.getTop() - obj.h
      //           break; 
      //         }
      //         obj.dx = 0
      //         obj.x = this.getLeft() - obj.w
      //       }
      //     }
      //     break;

      //   case 'RIGHT':
      //     if (obj.dx >= half) {
      //       if (isColliding(this, obj, true, false)) {
      //         if (this.game.map[this.y][this.x-1].collision) {
      //           obj.dx = 0
      //           obj.y = this.getTop() - obj.h
      //           break; 
      //         }
      //         obj.dx = 0
      //         obj.x = this.getLeft() - obj.w
      //       }
      //     } else {
      //       if (isColliding(this, obj, true, false)) {
      //         if (this.game.map[this.y][this.x+1].collision) {
      //           obj.dx = 0
      //           obj.y = this.getTop() - obj.h
      //           break; 
      //         }
      //         obj.dx = 0
      //         obj.x = this.getRight()
      //       }
      //     }
      //     break;
      // }


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

  return Block;
}();

/***/ }),

/***/ "./src/objects/bouncingBox.js":
/*!************************************!*\
  !*** ./src/objects/bouncingBox.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(/*! ./block */ "./src/objects/block.js");

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import autotile from '../tilesManager';


module.exports = function (_Block) {
  _inherits(BouncingBox, _Block);

  function BouncingBox(x, y, Game) {
    _classCallCheck(this, BouncingBox);

    var _this = _possibleConstructorReturn(this, (BouncingBox.__proto__ || Object.getPrototypeOf(BouncingBox)).call(this, x, y, Game));

    _this.h = Game.cfg.scale / 2;
    _this.type = 'BouncingBox';
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

      var half = this.h / 2 | 0,
          bounce = 1.1;

      switch (side) {
        case 'TOP':
          if (obj.dy < -half) {
            obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -bounce) | 0;
            obj.hasBounced = true;
          } else {
            if (obj.dy < 15) {
              obj.y = this.getTop() - obj.h;
              obj.dy = 0;
              obj.isOnFloor = true;
            } else {
              obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -bounce) | 0;
              obj.hasBounced = true;
            }
          }
          break;

        case 'BOTTOM':
          if (obj.dy >= half) {
            obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -bounce) | 0;
            obj.hasBounced = true;
          } else {
            if (obj.dy < 15) {
              obj.y = this.getBottom();
              obj.dy = 0;
              obj.isOnFloor = true;
            } else {
              obj.dy = obj.dy * (obj.hasBounced ? -0.9 : -bounce) | 0;
              obj.hasBounced = true;
            }
          }
          break;

        case 'LEFT':
          if (obj.dx < -half) {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -bounce);
              obj.hasBounced = true;
              // obj.x = this.getRight()
            }
          } else {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -bounce);
              obj.x = this.getLeft() - obj.w;
              obj.hasBounced = true;
            }
          }
          break;

        case 'RIGHT':
          if (obj.dx >= half) {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -bounce);
              obj.x = this.getLeft() - obj.w;
              obj.hasBounced = true;
            }
          } else {
            if (isColliding(this, obj, true, false)) {
              obj.dx = obj.dx * (obj.hasBounced ? -0.9 : -bounce);
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
}(_block2.default);

/***/ }),

/***/ "./src/objects/player.js":
/*!*******************************!*\
  !*** ./src/objects/player.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(/*! ./block */ "./src/objects/block.js");

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Block) {
  _inherits(Player, _Block);

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
}(_block2.default);

/***/ }),

/***/ "./src/objects/spike.js":
/*!******************************!*\
  !*** ./src/objects/spike.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _block = __webpack_require__(/*! ./block */ "./src/objects/block.js");

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import autotile from '../tilesManager';


module.exports = function (_Block) {
  _inherits(Spike, _Block);

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
}(_block2.default);

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

var _block = __webpack_require__(/*! ./block */ "./src/objects/block.js");

var _block2 = _interopRequireDefault(_block);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

module.exports = function (_Block) {
  _inherits(Wall, _Block);

  function Wall(x, y, Game) {
    _classCallCheck(this, Wall);

    var _this = _possibleConstructorReturn(this, (Wall.__proto__ || Object.getPrototypeOf(Wall)).call(this, x, y, Game));

    _this.type = 'Wall';
    _this.tile = {
      name: _this.game.select.tile.name
    };
    _this.empty = false;
    _this.collision = true;

    // autotile.getValue(this.game, this.x, this.y, false, false)
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
}(_block2.default);

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

  var NSWE = [false, false, false, false];

  function checkObj(a, b, v, id) {
    // console.log(game.map[y][b])
    if (game.map[b] && game.map[b][a] && (game.map[b][a].empty || game.map[b][a] === 0)) return;

    tileValue += v;
    if (id >= 0) NSWE[id] = true;
    if (child) return;
    if (!game.map[b] || game.map[b] && !game.map[b][a]) return;
    if (game.map[b][a].type != 'Wall') return;

    getTileValue(game, a, b, false, true);
    game.cfg.updateArr.push({ x: a, y: b });
  }

  checkObj(x, y - 1, N, 0); // N
  checkObj(x, y + 1, S, 1); // S
  checkObj(x - 1, y, W, 2); // W // 24 + 64
  checkObj(x + 1, y, E, 3); // E

  if (NSWE[0] && NSWE[2]) checkObj(x - 1, y - 1, NW); // NW
  if (NSWE[0] && NSWE[3]) checkObj(x + 1, y - 1, NE); // NE
  if (NSWE[1] && NSWE[2]) checkObj(x - 1, y + 1, SW); // SW
  if (NSWE[1] && NSWE[3]) checkObj(x + 1, y + 1, SE); // SE


  if (!del) {
    // console.log(x, y, game.map[y][x])
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
    result.type = obj.type;
    if (obj.tile) {
        result.tile = {};
        result.tile.name = obj.tile.name;
        result.tile.value = obj.tile.value;
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

/***/ "./src/update/edit.js":
/*!****************************!*\
  !*** ./src/update/edit.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tilesManager = __webpack_require__(/*! ../tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Edit = function () {
  function Edit(game) {
    _classCallCheck(this, Edit);

    this.game = game;
    this.list = "ontouchstart" in window ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "wheel", "mouseleave"]; //, "keyup", "keydown"
  }

  _createClass(Edit, [{
    key: "update",
    value: function update() {
      var game = this.game;

      if (!game.playing[1]) return;

      var scale = game.cfg.scale,
          canvas = game.canvas,
          tX = game.translate.x,
          tY = game.translate.y,
          Player = game.Player,
          Engine = game.Engine,
          c = game.c,
          uptAll = game.cfg.updateAll,
          uptArr = game.cfg.updateArr;

      if (uptAll) c.clearRect(0, 0, canvas.width, canvas.height);

      c.save();
      c.translate(tX, tY);

      if (uptAll) {
        var canvasCols = Math.ceil(canvas.width / scale);
        var canvasRows = Math.ceil(canvas.height / scale);
        var xStart = Math.floor(tX / scale * -1) > 0 ? Math.floor(tX / scale * -1) : 0;
        var yStart = Math.floor(tY / scale * -1) > 0 ? Math.floor(tY / scale * -1) : 0;

        for (var y = yStart; y < canvasRows + yStart + 1; y++) {
          for (var x = xStart; x < canvasCols + xStart + 1; x++) {
            if (!game.map[y]) continue;
            if (!game.map[y][x]) continue;
            var cell = game.map[y][x];
            cell.update();
            cell.draw();
          }
        }
        game.cfg.updateAll = false;
      } else if (uptArr.length > 0) {
        for (var i = 0; i < uptArr.length; i++) {
          game.map[uptArr[i].y][uptArr[i].x].draw(game);
        }

        game.cfg.updateArr = [];
      }

      c.restore();
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      this.list.forEach(function (evt) {
        return _this.game.canvas.addEventListener(evt, _this, false);
      });
    }
  }, {
    key: "mute",
    value: function mute() {
      var _this2 = this;

      this.list.forEach(function (evt) {
        return _this2.game.canvas.removeEventListener(evt, _this2, false);
      });
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(evt) {
      var handler = "on" + evt.type;
      if (typeof this[handler] === "function") {
        evt.preventDefault();
        return this[handler](evt);
      }
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(e) {
      var game = this.game;
      if (!game.playing[0]) return;

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

      this.checkForClicks();
    }
  }, {
    key: "onmouseup",
    value: function onmouseup(e) {
      var game = this.game;
      if (!game.playing[0]) return;

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
    }
  }, {
    key: "onwheel",
    value: function onwheel(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0]) return;

      var mouse = game.mouse,
          tx = game.translate.x,
          ty = game.translate.y,
          scale = game.cfg.scale;

      var zoomTo = e.wheelDelta > 0 ? 4 : -4;

      if (8 <= scale + zoomTo && scale + zoomTo <= 96) {
        game.translate.x = mouse.x - (mouse.x - tx) / scale * (scale + zoomTo);
        game.translate.y = mouse.y - (mouse.y - ty) / scale * (scale + zoomTo);
        game.cfg.scale += zoomTo;
        game.cfg.updateAll = true;
      }
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(e) {
      var game = this.game;
      if (!game.playing[0]) return;

      var mouse = game.mouse,
          scale = game.cfg.scale,
          tx = game.translate.x,
          ty = game.translate.y;

      game.mouse.x = e.clientX;
      game.mouse.y = e.clientY;

      game.mouse.gridX = Math.floor((mouse.x - tx) / scale);
      game.mouse.gridY = Math.floor((mouse.y - ty) / scale);

      if (!mouse.left && !mouse.right && !mouse.middle.click) return;
      if (mouse.middle.click) this.checkForClicks();
      if (mouse.gridX === mouse.last.gridX && mouse.gridY === mouse.last.gridY && mouse.click === mouse.last.click) return;
      this.checkForClicks();
    }
  }, {
    key: "onmouseleave",
    value: function onmouseleave(e) {
      var game = this.game;
      if (!game.playing[0]) return;

      game.mouse.left = false;
      game.mouse.right = false;
      game.mouse.middle = {
        click: false,
        x: null,
        y: null
      };
    }
  }, {
    key: "ontouchstart",
    value: function ontouchstart(e) {
      var game = this.game;
      var touch = e.targetTouches.item(0);
      if (touch) {
        // game.startDrawingAt({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: "ontouchmove",
    value: function ontouchmove(e) {
      var game = this.game;
      var touch = e.targetTouches.item(0);
      if (touch) {
        // game.continueDrawingTo({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: "ontouchend",
    value: function ontouchend(e) {
      var game = this.game;
      // game.finishDrawing();
    }
  }]);

  return Edit;
}();

Edit.prototype.checkForClicks = function () {
  var game = this.game,
      gridX = game.mouse.gridX,
      gridY = game.mouse.gridY,
      map = game.map,
      mouse = game.mouse,
      cfg = game.cfg;

  if (!map[gridY] || map[gridY] && !map[gridY][gridX]) return;

  var cell = map[gridY][gridX],
      mouseX = mouse.x,
      mouseY = mouse.y;

  mouse.last.gridX = gridX;
  mouse.last.gridY = gridY;

  var DrawPixel = function DrawPixel() {
    if (!cell.tile || cell.tile && game.assets.tiles[cell.tile.name] != game.select.tile.name) {
      var _cfg$updateArr;

      map[gridY][gridX] = new game.select.block(cell.x, cell.y, game);

      (_cfg$updateArr = cfg.updateArr).push.apply(_cfg$updateArr, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY, false, false)));
      cfg.updateArr.push({ x: gridX, y: gridY });
    } else if (false) {}
  };

  if (mouse.right) {
    var _cfg$updateArr2;

    mouse.last.click = 'right';

    map[gridY][gridX] = new this.game.Objects.Block(cell.x, cell.y, game);

    (_cfg$updateArr2 = cfg.updateArr).push.apply(_cfg$updateArr2, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY, true, false)));
    cfg.updateArr.push({ x: gridX, y: gridY });
  }

  if (mouse.left) {
    mouse.last.click = 'left';

    DrawPixel(gridX, gridY);
  }
  if (mouse.middle.click) {
    mouse.last.click = 'middle';
    game.translate.x += mouseX - mouse.middle.x;
    game.translate.y += mouseY - mouse.middle.y;
    mouse.middle.x = mouseX;
    mouse.middle.y = mouseY;
    cfg.updateAll = true;
  }
};

module.exports = Edit;

/***/ }),

/***/ "./src/update/play.js":
/*!****************************!*\
  !*** ./src/update/play.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Play(game) {
    _classCallCheck(this, Play);

    this.game = game;
    this.list = "ontouchstart" in window ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "keyup", "keydown"]; //, "wheel" , "mouseleave"
  }

  _createClass(Play, [{
    key: "update",
    value: function update() {
      var game = this.game;
      if (!game.playing[1]) return;

      game.Camera();

      var scale = game.cfg.scale,
          canvas = game.canvas,
          tX = game.translate.x,
          tY = game.translate.y,
          Player = game.Player,
          Engine = game.Engine,
          map = game.map,
          c = game.c,
          cfg = game.cfg,
          mapWidth = cfg.cols * cfg.scale,
          mapHeight = cfg.rows * cfg.scale,
          imgHorizontal = mapWidth > mapHeight ? true : false,
          imgWidth = imgHorizontal ? mapWidth : mapWidth / 1080 * 1920,
          imgHeight = !imgHorizontal ? mapHeight : mapHeight / 1920 * 1080,
          background = new Image(mapWidth, mapHeight);
      background.src = 'https://cdn.glitch.com/e683167b-6e53-40d8-9a05-e24a714a856d%2Fspace-background.svg?1551610099211';

      Engine.create(cfg.rows, cfg.cols, scale);
      c.clearRect(0, 0, canvas.width, canvas.height);

      // Background
      c.beginPath();
      c.drawImage(background, tX, tY, imgWidth, imgHeight);
      c.closePath();

      c.save();
      c.translate(tX, tY);

      var canvasCols = Math.ceil(canvas.width / scale);
      var canvasRows = Math.ceil(canvas.height / scale);
      var xStart = Math.floor(tX / scale * -1) > 0 ? Math.floor(tX / scale * -1) : 0;
      var yStart = Math.floor(tY / scale * -1) > 0 ? Math.floor(tY / scale * -1) : 0;

      for (var y = yStart; y < canvasRows + yStart + 1; y++) {
        for (var x = xStart; x < canvasCols + xStart + 1; x++) {
          if (!map[y] || map[y] && !map[y][x]) continue;

          var cell = map[y][x];
          if (cell.empty) continue;
          // if(typeof cell != Object) continue

          cell.update();
          cell.draw();
          if (cell.collision) Engine.insert(cell);
        }
      }

      if (!Player.isDead) Player.actions();
      Engine.insert(Player);
      Engine.checkCells();
      Player.update();

      c.restore();
    }
  }, {
    key: "listen",
    value: function listen() {
      var _this = this;

      this.list.forEach(function (evt) {
        return _this.game.canvas.addEventListener(evt, _this, false);
      });
      console.log('start');
    }
  }, {
    key: "mute",
    value: function mute() {
      var _this2 = this;

      this.list.forEach(function (evt) {
        return _this2.game.canvas.removeEventListener(evt, _this2, false);
      });
      console.log('end');
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(evt) {
      var handler = "on" + evt.type;
      if (typeof this[handler] === "function") {
        evt.preventDefault();
        return this[handler](evt);
      }
    }

    // event glue

  }, {
    key: "onkeydown",
    value: function onkeydown(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0]) return;
      if (!game.Player.keys.hasOwnProperty(e.key)) return;
      game.Player.keys[e.key] = true;
    }
  }, {
    key: "onkeyup",
    value: function onkeyup(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0]) return;

      if (!game.Player.keys.hasOwnProperty(e.key)) return;
      game.Player.keys[e.key] = false;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(e) {
      var game = this.game;
      if (!game.playing[0]) return;

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
    }
  }, {
    key: "onmouseup",
    value: function onmouseup(e) {
      var game = this.game;
      if (!game.playing[0]) return;

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
    }
  }, {
    key: "onmousemove",
    value: function onmousemove(e) {
      var game = this.game;
      if (!game.playing[0]) return;

      var mouse = game.mouse,
          scale = game.cfg.scale,
          tx = game.translate.x,
          ty = game.translate.y;

      game.mouse.x = e.clientX;
      game.mouse.y = e.clientY;

      game.mouse.gridX = Math.floor((mouse.x - tx) / scale);
      game.mouse.gridY = Math.floor((mouse.y - ty) / scale);

      if (!mouse.left && !mouse.right && !mouse.middle.click) return;
      if (mouse.middle.click) game.checkForClicks();
      if (mouse.gridX === mouse.last.gridX && mouse.gridY === mouse.last.gridY && mouse.click === mouse.last.click) return;
      game.checkForClicks();
    }
  }, {
    key: "onmouseleave",
    value: function onmouseleave(e) {
      var game = this.game;
      if (!game.playing[0]) return;

      game.mouse.left = false;
      game.mouse.right = false;
      game.mouse.middle = {
        click: false,
        x: null,
        y: null
      };
    }
  }, {
    key: "ontouchstart",
    value: function ontouchstart(e) {
      var game = this.game;
      var touch = e.targetTouches.item(0);
      if (touch) {
        // game.startDrawingAt({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: "ontouchmove",
    value: function ontouchmove(e) {
      var game = this.game;
      var touch = e.targetTouches.item(0);
      if (touch) {
        // game.continueDrawingTo({x: touch.clientX, y: touch.clientY});
      }
    }
  }, {
    key: "ontouchend",
    value: function ontouchend(e) {
      var game = this.game;
      // game.finishDrawing();
    }
  }]);

  return Play;
}();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function Utils(game) {
  var _this = this;

  this.game = game;

  this.rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  this.loadTiles = function (tile) {
    var img = new Image();
    img.src = tile.url;
    img.addEventListener('load', function () {
      tile.img = img;
      console.log(tile.name, 'loaded.');
    }, false);
  };

  this.lerp = function (value1, value2, amount) {
    if (value1 === 0) return false;
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    var result = Number((value1 + (value2 - value1) * amount).toFixed(2));
    return result.toFixed(0) != value2 ? result : value2;
  };

  this.getBlock = function (arr, x, y) {
    if (!arr[y]) return false;else if (arr[y] && !arr[y][x]) return false;else if (!arr[y][x].collision) return false;else return true;
  };

  this.events = function (el, list) {
    // list =>  ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "keyup", "keydown", "wheel", "mouseleave"]
    console.log('evenThis', el);
    el.listen = function () {
      list.forEach(function (evt) {
        return el.game.canvas.addEventListener(evt, el, false);
      });
    };

    el.mute = function () {
      list.forEach(function (evt) {
        return el.game.canvas.removeEventListener(evt, el, false);
      });
    };

    el.handleEvent = function (evt) {
      var handler = 'on' + evt.type;
      if (typeof el[handler] === "function") {
        evt.preventDefault();
        return el[handler](evt);
      }
    };
  };

  this.textSize = function (c, txt) {
    return [c.measureText(txt).width, parseInt(c.font.match(/\d+/), 10) * 0.7];
  };

  this.mouseCollision = function (a, b) {
    var aL = a.x,
        aR = aL + a.w,
        aT = a.y,
        aB = aT + a.h,
        bL = b.x,
        bT = b.y;

    if (aL <= bL && aR >= bL && aT <= bT && aB >= bT) return true;
    return false;
  };

  this.catchBlockCollision = function (x, y) {
    if (!_this.game.map[y]) return false;
    if (!_this.game.map[y][x]) return false;
    if (!_this.game.map[y][x].collision) return false;
    return true;
  };

  this.numberToClass = function (num) {
    switch (num) {
      case 0:
        return _this.game.Objects.Block;

      case 1:
        return _this.game.Objects.Wall;

      case 2:
        return _this.game.Objects.BouncingBox;

      case 3:
        return _this.game.Objects.Spike;

      // case 4:
      //   return

      // case 5:
      //   return
    }
  };
};

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

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map