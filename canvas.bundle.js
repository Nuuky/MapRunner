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

    document.addEventListener('mousemove', this.onOver);

    document.addEventListener('click', this.click);

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
      c.strokeStyle = this.fontColor;
      c.lineWidth = 3;
      c.rect(this.x, this.y, size[0] + this.offX, size[1] + this.offY);
      c.fill();
      c.stroke();
      c.closePath();

      c.beginPath();
      c.fillStyle = this.fontColor;
      c.fillText(this.str, this.halfX - size[0] / 2, this.halfY + size[1] / 2);
      c.closePath();
    }
  }, {
    key: 'getLeft',
    value: function getLeft() {
      return this.halfX;
    }
  }, {
    key: 'getTop',
    value: function getTop() {
      return this.halfY;
    }
  }, {
    key: 'getRight',
    value: function getRight() {
      return this.getLeft() + this.w;
    }
  }, {
    key: 'getBottom',
    value: function getBottom() {
      return this.getTop() + this.h;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      document.removeEventListener('mousemove', this.onOver);
      document.removeEventListener('click', this.click);
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


var _objects = __webpack_require__(/*! ./objects */ "./src/objects.js");

var _objects2 = _interopRequireDefault(_objects);

var _game = __webpack_require__(/*! ./game */ "./src/game.js");

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('canvas');
canvas.oncontextmenu = function (e) {
    return e.preventDefault();
};
canvas.width = innerWidth;
canvas.height = innerHeight;

// Game
var Game = new _game2.default(canvas);
var c = Game.c;

Game.assets.tiles = __webpack_require__(/*! ./json/tiles.json */ "./src/json/tiles.json");
Game.assets.textures = __webpack_require__(/*! ./json/img.json */ "./src/json/img.json");
Game.select.tile = Game.assets.tiles.spaceGround;
Game.cfg.scale = 64;
Game.cfg.cols = 32;
Game.cfg.rows = 32;
Game.map = __webpack_require__(/*! ./json/map.json */ "./src/json/map.json").map;
Game.translate.y = -(Game.cfg.rows * Game.cfg.scale) + canvas.height;

// Load tiles
for (var t in Game.assets.tiles) {
    Game.utils.loadImg(Game.assets.tiles[t]);
}

// Load IMG
for (var i in Game.assets.textures) {
    Game.utils.loadImg(Game.assets.textures[i]);
}

// Player
Game.Player = new _objects2.default.Player[0](5, 5, 'James', Game); // x, y, w, h, name, Game)


// Implementation
var mapInit = __webpack_require__(/*! ./initMap */ "./src/initMap.js");
Game.init = function () {
    var save = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (save) mapInit.save(Game);

    mapInit.load(Game);

    Game.Player.init();
    Game.Camera = new Game.Objects.Camera[0](Game);
    console.log("Lets go !");
};

// Display FPS / ZOOM
var fpsCount = 0,
    dispFps = 0;
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

// Animation Loop
var lastRender = void 0;

Game.animate = function (time) {
    if (!time) time = 0;
    var now = time;

    if (Game.resetAnimate) lastRender = time;

    var delta = now - lastRender;

    if (delta > 100) delta = 100;

    if (Game.mode === 'play') {
        Game.window.play.update(delta);
        // console.time('check')
        Game.window.play.draw();
        // console.timeEnd('check')
    } else if (Game.mode === 'edit') Game.window.edit.update();

    displayInfo();

    lastRender = time;

    if (Game.resetAnimate) Game.resetAnimate = false;
    if (Game.playing[0]) window.requestAnimationFrame(Game.animate);
};

// TempMenu
var btn = new __webpack_require__(/*! ./button */ "./src/button.js");
var btns = [];

var btn1 = new btn(Game, canvas.width / 2, canvas.height / 2 - 40, 250, 80, 20, 'PLAY', 'test1', function () {
    Game.mode = 'play';
    Game.init();
    Game.playing = [true, true];
    Game.cfg.updateAll = true;

    // Game.window[Game.mode].end()

    Game.resetAnimate = true;
    Game.animate();
    Game.window[Game.mode].start();
    btns.forEach(function (b) {
        return b.destroy();
    });
});

var btn2 = new btn(Game, canvas.width / 2, btn1.getBottom() + 20, 250, 80, 20, 'CUSTOM', 'test2', function () {
    Game.mode = 'edit';
    Game.init();
    setTimeout(function () {
        Game.playing = [true, true];
        Game.cfg.updateAll = true;

        // Game.window[Game.mode].end()
        Game.window[Game.mode].start();

        Game.animate();
        btns.forEach(function (b) {
            return b.destroy();
        });
    }, 200);
});

// const btn3 = new btn(Game, canvas.width/2, btn2.getBottom()+10, 250, 80, 20, 'Quit', 'test3', () => {
// })
btns = [btn1, btn2];

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
                // console.log('collision')
                return true;
            }
            //console.log('in')
            // console.log('no collision')
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
            var Adx = A.dx,
                Ady = A.dy,
                Bdx = B.dx,
                Bdy = B.dy,
                steps = 1,
                maxSpeed = 16;

            if (Math.abs(A.dx) > maxSpeed || Math.abs(A.dy) > maxSpeed || Math.abs(B.dx) > maxSpeed || Math.abs(B.dy) > maxSpeed) {
                steps = 10;
            }

            for (var i = 1; i <= steps; i++) {
                Adx = A.dx / steps * i, Ady = A.dy / steps * i, Bdx = B.dx / steps * i, Bdy = B.dy / steps * i;

                var w = 0.5 * (A.w + B.w),
                    h = 0.5 * (A.h + B.h),
                    dx = A.getHalfWidth() + Adx - (B.getHalfWidth() + Bdx),
                    dy = A.getHalfHeight() + Ady - (B.getHalfHeight() + Bdy);

                if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
                    /* collision! */
                    var wy = w * dy,
                        hx = h * dx;

                    if (wy > hx) {
                        if (wy > -hx) {
                            /* collision at the top */
                            A.resolve(B, 'TOP');
                            B.resolve(A, 'BOTTOM');
                        } else {
                            /* on the left */
                            A.resolve(B, 'RIGHT');
                            B.resolve(A, 'LEFT');
                        }
                        break;
                    } else {
                        if (wy > -hx) {
                            /* on the right */
                            A.resolve(B, 'LEFT');
                            B.resolve(A, 'RIGHT');
                        } else {
                            /* at the bottom */
                            A.resolve(B, 'BOTTOM');
                            B.resolve(A, 'TOP');
                        }
                        break;
                    }
                }
            }

            // if(B.type === 'BouncingBox') {
            //     console.log('BouncingBox', A.dy)
            //     this.game.playing[0] = false
            // }
        }
    }, {
        key: 'oldResolve',
        value: function oldResolve(A, B) {
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

var Game = function Game(canvas) {
  _classCallCheck(this, Game);

  this.canvas = canvas;
  this.c = canvas.getContext('2d');

  this.map = null;
  this.firstInit = true;

  this.background = [];
  this.static = [];
  this.dynamic = [];
  this.foreground = [];

  this.lastRender = null;
  this.now = null;
  this.resetAnimate = true;

  this.Player = undefined;

  this.Objects = __webpack_require__(/*! ./objects */ "./src/objects.js");

  this.editObjects = Object.values(this.Objects).filter(function (o) {
    return typeof o[1] === 'number';
  });

  this.utils = new _utils2.default(this);

  this.cfg = {
    name: "default",
    cols: null,
    rows: null,
    scale: 64,
    oldScale: 64,
    updateArr: [[], [], [], []],
    updateAll: false
  };

  this.mode = "edit";

  this.Engine = new _engine2.default(this.c, this.cfg.cols, this.cfg.rows, this.cfg.scale);

  this.Camera = new this.Objects.Camera[0](this);

  this.assets = {
    tiles: {},
    textures: {}
  };

  this.translate = {
    x: 0,
    y: 0
  };

  this.playing = [false, false];

  this.select = {
    color: 'blue',
    brushSize: 0,
    block: null,
    tile: this.assets.tiles.spaceGround,
    layer: null
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

  //this.events = new Events(this)

  this.window = {
    play: new _play2.default(this),
    edit: new _edit2.default(this)
  };
};

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

/***/ "./src/html_elements/playMenu.js":
/*!***************************************!*\
  !*** ./src/html_elements/playMenu.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (game) {
  // CSS
  var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style'),
      css = '\n    #playMenu {\n      position: absolute;\n      width: 0;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      background: rgba(15,15,15,0.99);\n      text-align: center;\n      overflow: hidden;\n      padding-top: 36vh;\n      padding-top: calc(50vh - (7vh*2+10));\n    }\n\n    .playBtn {\n      display: block;\n      width: 20vw;\n      height: 7vh;\n      background: black;\n      color: white;\n      margin: 0 auto 10px auto;\n    }\n  ';
  head.appendChild(style);
  style.type = 'text/css';
  style.id = 'stylePlay';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // CONTAINER
  var div = document.createElement('div');
  div.id = 'playMenu';

  // BUTTON Resume
  var btnResume = document.createElement('input');
  btnResume.id = 'btnResume';
  btnResume.type = 'button';
  btnResume.classList.add('playBtn');
  btnResume.value = 'RESUME';
  btnResume.onclick = function (e) {
    e.preventDefault();

    game.window.play.pauseTimer();
    div.style.width = 0;
  };
  div.append(btnResume);

  // BUTTON Restart
  var btnRestart = document.createElement('input');
  btnRestart.id = 'btnRestart';
  btnRestart.type = 'button';
  btnRestart.classList.add('playBtn');
  btnRestart.value = 'RESTART';
  btnRestart.onclick = function (e) {
    e.preventDefault();
    game.init();
    game.playing[0] = true;
    div.style.width = 0;
    game.resetAnimate = true;
    game.animate();
    game.canvas.focus();
    game.window.play.resetTimer();
    game.Player.hide = false;
  };
  div.append(btnRestart);

  // BUTTON EDIT
  var btnEdit = document.createElement('input');
  btnEdit.id = 'btnEdit';
  btnEdit.type = 'button';
  btnEdit.classList.add('playBtn');
  btnEdit.value = 'EDIT MAP';
  btnEdit.onclick = function (e) {
    e.preventDefault();

    game.window.play.end();
    game.mode = 'edit';
    game.window.edit.start();

    game.init();
    game.playing = [true, true];
    game.cfg.updateAll = true;
    game.canvas.focus();
    game.animate();
  };
  div.append(btnEdit);

  return div;
};

// FUNCTIONS

/***/ }),

/***/ "./src/html_elements/toolbar.js":
/*!**************************************!*\
  !*** ./src/html_elements/toolbar.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (game) {
  // CSS
  var head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style'),
      css = '\n    #toolbar {\n      position: absolute;\n      top: 0;\n      bottom: 0;\n      left: 0;\n      background: rgba(15,15,15, 1);\n      overflow: hidden;\n      text-align: center;\n      padding-top: 20vh;\n    }\n\n    #toolbar > * {\n      margin: 20px auto;\n    }\n\n    .dispBlock {\n      display: block;\n    }\n\n    #playH2 {\n      margin-bottom: 30px;\n    }\n\n    #btnHide {\n      position: absolute;\n      padding: ' + (game.canvas.height / 2 - 20) + 'px 7px;\n      height: 100%;\n      top: 0;\n      right: 0;\n      background: black;\n      color: white;\n      margin: 0 auto;\n      text-decoration: none;\n    }\n\n    .inputSpan > input {\n      width: 10%;\n    }\n\n    #selectSpan > * {\n      display: block;\n      margin: auto;\n    }\n\n    .playBtn {\n      border: 1px solid white;\n      padding: 10px 20px;\n      background: black;\n      font-weight: bold;\n      color: white;\n      margin: auto 5px !important;\n      cursor: pointer;\n    }\n\n    #errorMsg {\n      color: red;\n      font-size: 1.1em;\n    }\n  ';
  head.appendChild(style);
  style.type = 'text/css';
  style.id = 'styleEdit';
  if (style.styleSheet) {
    // This is required for IE8 and below.
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  // CONTAINER
  var div = document.createElement('div');
  div.id = 'toolbar';
  div.style.width = '25%';

  var btnHide = document.createElement('a');
  btnHide.id = 'btnHide';
  btnHide.innerHTML = '|||';
  btnHide.href = '';
  btnHide.onclick = function (e) {
    e.preventDefault();
    var width = div.style.width.replace(/px|%/i, '');
    // e.preventDefault()
    if (width > 20) div.style.width = 20;else div.style.width = '25%';
  };
  div.appendChild(btnHide);

  // TITLE
  var h2 = document.createElement('h2');
  h2.innerHTML = "SETTINGS:";
  h2.id = 'playH2';
  div.appendChild(h2);

  var layerName = ['background', 'static', 'dynamic', 'foreground'];
  // INPUT ROW
  var rowSpan = document.createElement('span');
  rowSpan.innerHTML = 'Row: ';
  rowSpan.classList.add('dispBlock', 'inputSpan');
  var inputRows = document.createElement('input');
  inputRows.type = 'number';
  inputRows.value = game.cfg.rows;
  inputRows.onchange = function (e) {
    var newRows = e.target.value,
        map = [];

    layerName.forEach(function (name) {
      var layer = game[name];

      for (var j = 0; j < newRows; j++) {
        if (layer[j]) map[j] = layer[j];else {
          map[j] = [];
          for (var _i = 0; _i < game.cfg.cols; _i++) {
            if (name === 'background') map[j][_i] = new game.Objects.Block[0](_i, j, game);else map[j][_i] = 0;
          }
        }
      }

      game[name] = map;
    });

    game.cfg.rows = Number(newRows);
    game.cfg.updateAll = true;
    game.translate.x = game.translate.y = 0;
  };
  rowSpan.appendChild(inputRows);
  div.appendChild(rowSpan);

  // INPUT COL
  var colSpan = document.createElement('span');
  colSpan.innerHTML = 'Col: ';
  colSpan.classList.add('dispBlock', 'inputSpan');
  var inputCols = document.createElement('input');
  inputCols.type = 'number';
  inputCols.value = game.cfg.cols;
  inputCols.onchange = function (e) {
    var newCols = e.target.value;

    layerName.forEach(function (name) {
      var layer = game[name];

      var map = [];

      for (var j = 0; j < game.cfg.rows; j++) {
        map[j] = [];
        for (var _i2 = 0; _i2 < newCols; _i2++) {
          if (layer[j][_i2]) map[j][_i2] = layer[j][_i2];else {
            if (name === 'background') map[j][_i2] = new game.Objects.Block[0](_i2, j, game);else map[j][_i2] = 0;
          }
        }
      }

      game[name] = map;
    });

    game.cfg.cols = Number(newCols);
    game.cfg.updateAll = true;
    game.translate.x = game.translate.y = 0;
  };
  colSpan.appendChild(inputCols);
  div.appendChild(colSpan);

  // SELECT LAYER
  var layerType = ['background', 'static', 'dynamic', 'foreground', 'special'],
      layerBlock = document.createElement('select');
  layerBlock.id = 'layerBlock';

  for (var i = 0; i < layerType.length; i++) {
    var option = document.createElement("option");
    option.value = layerType[i];
    option.text = layerType[i];
    layerBlock.appendChild(option);
  }

  layerBlock.value = 'static';
  game.select.layer = 'static';

  layerBlock.style.display = 'block';
  layerBlock.onchange = function (e) {
    var id = e.target.selectedIndex,
        value = e.target[id].value;
    game.select.layer = value;

    document.dispatchEvent(refreshBlockType);
  };
  var layerSpan = document.createElement('span');
  layerSpan.innerHTML = 'Layer ';
  layerSpan.classList.add('dispBlock');
  layerSpan.id = 'selectSpan';
  layerSpan.appendChild(layerBlock);
  div.appendChild(layerSpan);

  // SELECT BLOCK
  var selectSpan = document.createElement('span');
  selectSpan.classList.add('dispBlock');
  selectSpan.id = 'selectSpan';
  div.appendChild(selectSpan);

  function makeBlockSelect() {
    selectSpan.innerHTML = 'Block Type: ';

    var selectBlock = document.createElement('select');
    selectBlock.id = 'selectBlock';

    var hasSpawn = typeExist('Spawn', game.static),
        hasEnd = typeExist('End', game.static);

    var option = document.createElement("option");
    selectBlock.appendChild(option);
    for (var i = 0; i < game.editObjects.length; i++) {
      var obj = game.editObjects[i],
          layer = game.select.layer;

      if (obj[2] != layer) continue;

      option = document.createElement("option");
      option.value = obj[0].name;
      option.text = obj[0].name;
      if (obj[1] === 4 && hasSpawn) option.disabled = true;else if (obj[1] === 5 && hasEnd) option.disabled = true;
      selectBlock.appendChild(option);
    }

    selectBlock.style.display = 'block';
    selectBlock.onchange = function (e) {
      var id = e.target.selectedIndex,
          value = e.target[id].value;
      game.select.block = game.Objects[value];
    };

    selectSpan.appendChild(selectBlock);
  }

  window.refreshBlockType = new Event('refreshBlockType');
  document.addEventListener('refreshBlockType', makeBlockSelect, false);

  document.dispatchEvent(refreshBlockType);

  // BLOCK PARAMS


  // LOAD MAP
  var loadMap = document.createElement('input');
  loadMap.type = 'text';
  //div.appendChild(loadMap)


  // BUTTON PLAY
  var btnPlay = document.createElement('input');
  btnPlay.type = 'button';
  btnPlay.value = 'Play';
  btnPlay.classList.add('playBtn');
  btnPlay.onclick = function (e) {
    // e.preventDefault()

    var hasSpawn = typeExist('Spawn', game.static),
        hasEnd = typeExist('End', game.static);

    if (!hasSpawn || !hasEnd) {
      return errorMsg.innerHTML = 'You can\'t play without ' + (!hasSpawn ? 'Spawn' : 'End') + ' block !';
    }

    game.window[game.mode].end();
    game.mode = 'play';

    game.init(true);
    game.cfg.updateAll = true;
    game.canvas.focus();
    game.window.play.resetTimer();
    game.Player.hide = false;
    if (!game.playing[0]) {
      game.playing[0] = true;
      game.resetAnimate = true;
      game.animate();
    }
    game.window.play.start();
  };
  div.appendChild(btnPlay);

  // BUTTON SAVE
  var btnSave = document.createElement('input');
  btnSave.type = 'button';
  btnSave.value = 'Save';
  btnSave.classList.add('playBtn');
  btnSave.onclick = function (e) {
    // e.preventDefault();

    var str = '';

    var mapTest = game.static;

    var _loop = function _loop(row) {
      var _loop2 = function _loop2(col) {
        layerName.forEach(function (name, id) {
          var layer = game[name];
          if (!layer[row][col]) str += '#';else str += layer[row][col].id;

          str += id + 1 < layerName.length ? '.' : '';
        });

        str += col + 1 < mapTest[0].length ? '-' : '';
      };

      for (var col = 0; col < mapTest[0].length; col++) {
        _loop2(col);
      }

      str += row + 1 < mapTest.length ? ',' : '';
    };

    for (var row = 0; row < mapTest.length; row++) {
      _loop(row);
    }

    layerName.forEach(function (name) {
      var layer = game[name];
    });

    copyToClipboard(str);
    alert('The map has been copied on your clipboard');
  };
  div.appendChild(btnSave);

  var errorMsg = document.createElement('span');
  errorMsg.classList.add('dispBlock');
  errorMsg.id = 'errorMsg';
  div.appendChild(errorMsg);

  return div;
};

// FUNCTIONS
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

function classToNumber(className) {
  switch (className) {
    case 'Block':
      return 0;

    case 'Wall':
      return 1;

    case 'BouncingBox':
      return 2;

    case 'Spikes':
      return 3;

    case 'Spawn':
      return 4;

    case 'End':
      return 5;

    default:
      return false;
    // case 4:
    //   return

    // case 5:
    //   return
  }
}

function typeExist(type, map) {
  for (var row = 0; row < map.length; row++) {
    if (map[row].some(function (cell) {
      return cell.type === type;
    })) return true;
  }
}

/***/ }),

/***/ "./src/initMap.js":
/*!************************!*\
  !*** ./src/initMap.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tilesManager = __webpack_require__(/*! ./tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports.load = function (Game) {
    if (Game.firstInit) {
        var map = Game.map.split(',');

        map.map(function (row, rID) {
            map[rID] = row.split('-');
            map[rID].map(function (cell, cID) {
                map[rID][cID] = cell.split('.');
                map[rID][cID] = map[rID][cID].map(function (e) {
                    if (e != '#') return Number(e);else return '#';
                });
            });
        });

        Game.map = map;
        Game.cfg.cols = map[0].length;
        Game.cfg.rows = map.length;
        Game.firstInit = false;
    }

    var _loop = function _loop(row) {
        var _loop2 = function _loop2(col) {
            var cell = Game.map[row][col];

            var layerName = ['background', 'static', 'dynamic', 'foreground'];
            cell.forEach(function (layer, id) {
                var mapLayer = Game[layerName[id]];

                if (!mapLayer[row]) mapLayer[row] = [];
                if (layer === '#') return mapLayer[row][col] = 0;

                var block = Game.editObjects.find(function (b) {
                    return b[1] == layer;
                });

                switch (layer) {
                    case 1:
                        mapLayer[row][col] = new block[0](col, row, Game);
                        _tilesManager2.default.getValue(Game, col, row, false, false);
                        break;

                    case 4:
                        Game.Player.respawn = [col, row - 1];
                        mapLayer[row][col] = new block[0](col, row, Game);
                        Game[layerName[0]][row][col] = new Game.Objects.Block[0](col, row, Game);
                        break;

                    default:
                        mapLayer[row][col] = new block[0](col, row, Game);

                }
            });
        };

        for (var col = 0; col < Game.map[0].length; col++) {
            _loop2(col);
        }
    };

    for (var row = 0; row < Game.map.length; row++) {
        _loop(row);
    }
};

module.exports.save = function (Game) {
    var map = [];

    var layerName = ['background', 'static', 'dynamic', 'foreground'];
    layerName.forEach(function (name, id) {
        var layer = Game[name];
        layer.forEach(function (row, y) {
            if (!map[y]) map[y] = [];

            row.forEach(function (col, x) {
                if (!map[y][x]) map[y][x] = [];
                map[y][x][id] = col ? col.id : '#';
            });
        });
    });

    Game.map = map;
    Game.cfg.cols = map[0].length;
    Game.cfg.rows = map.length;
};

/***/ }),

/***/ "./src/json/img.json":
/*!***************************!*\
  !*** ./src/json/img.json ***!
  \***************************/
/*! exports provided: Spikes, BouncingBox, Block, default */
/***/ (function(module) {

module.exports = {"Spikes":{"name":"Spikes","url":"./img/spikes.png","img":null},"BouncingBox":{"name":"BouncingBox","url":"./img/bouncingBox.png","img":null},"Block":{"name":"Block","url":"./img/Block.jpg","img":null}};

/***/ }),

/***/ "./src/json/map.json":
/*!***************************!*\
  !*** ./src/json/map.json ***!
  \***************************/
/*! exports provided: map, default */
/***/ (function(module) {

module.exports = {"map":"#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.0.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.5.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-#.1.#.#-#.1.#.#-0.1.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.7.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.3.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.3.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.6.7.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.7.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.3.#.#-0.3.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-0.1.#.#-0.3.#.#-0.3.#.#-0.3.#.#-0.3.#.#-0.1.#.#-0.1.#.#-0.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.6.#.#-0.6.7.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.6.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.2.#.#-0.2.#.#-0.2.#.#-0.2.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-0.4.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-0.#.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-0.3.#.#-0.3.#.#-0.3.#.#-0.3.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#,#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#-#.1.#.#"};

/***/ }),

/***/ "./src/json/tiles.json":
/*!*****************************!*\
  !*** ./src/json/tiles.json ***!
  \*****************************/
/*! exports provided: landscape, spaceGround, default */
/***/ (function(module) {

module.exports = {"landscape":{"name":"landscape","w":8,"h":6,"l":47,"iX":10,"iY":10,"size":64,"url":"https://cdn.glitch.com/e683167b-6e53-40d8-9a05-e24a714a856d%2FtileMap.png?1551459491160","img":null},"spaceGround":{"name":"spaceGround","w":8,"h":6,"l":47,"iX":10,"iY":10,"size":64,"url":"./img/space-tileMap.png","img":null}};

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
  // GAME OBJECTS
  Player: [__webpack_require__(/*! ./objects/player */ "./src/objects/player.js")],

  Camera: [__webpack_require__(/*! ./objects/camera */ "./src/objects/camera.js")],

  // MAP OBJECTS: [CLASS, ID, PURPOSE, LINK]

  Block: [__webpack_require__(/*! ./objects/block */ "./src/objects/block.js"), 0, ['background']],

  Wall: [__webpack_require__(/*! ./objects/wall */ "./src/objects/wall.js"), 1, ['static']],

  BouncingBox: [__webpack_require__(/*! ./objects/bouncingBox */ "./src/objects/bouncingBox.js"), 2, ['static']],

  Spikes: [__webpack_require__(/*! ./objects/spikes */ "./src/objects/spikes.js"), 3, ['static']],

  Spawn: [__webpack_require__(/*! ./objects/spawn */ "./src/objects/spawn.js"), 4, ['special']],

  End: [__webpack_require__(/*! ./objects/end */ "./src/objects/end.js"), 5, ['special']],

  SwordSupport: [__webpack_require__(/*! ./objects/swordSupport */ "./src/objects/swordSupport.js"), 6, ['static']],

  Sword: [__webpack_require__(/*! ./objects/sword */ "./src/objects/sword.js"), 7, ['dynamic'], 'SwordSupport']
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
    this.color = '#111115';
    this.empty = false;
    this.collision = false;

    this.id = 0;
    this.purpose = ['Background'];
    this.link = false;
  }

  _createClass(Block, [{
    key: 'getLeft',
    value: function getLeft(displayDelta) {
      var scale = this.game.cfg.scale;
      return this.x * scale + (scale - this.w) + (displayDelta ? this.dx : 0);
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
      // const game      = this.game,
      //       c         = game.c,
      //       scale     = game.cfg.scale,
      //       x         = this.x * scale + (scale - this.w),
      //       y         = this.y * scale + (scale - this.h);


      // c.drawImage(game.assets.textures.Block.img, x, y, this.w+1, this.h+1)
      // if (this.game.mode === 'edit') {
      //   c.strokeStyle = 'gray'
      //   c.stroke()
      // } 

      var game = this.game,
          c = game.c,
          scale = game.cfg.scale,
          x = this.x * scale + (scale - this.w),
          y = this.y * scale + (scale - this.h);

      c.beginPath();
      c.fillStyle = this.color;
      c.rect(x, y, this.w, this.h);
      c.fill();
      if (this.game.mode === 'edit') {
        c.strokeStyle = 'gray';
        c.stroke();
      }
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
    key: 'editUpdate',
    value: function editUpdate() {
      this.update();
    }
  }, {
    key: 'collisionLeft',
    value: function collisionLeft(obj, player, newDelta, oldDelta) {
      obj.stopLeft(obj, player);
    }
  }, {
    key: 'collisionTop',
    value: function collisionTop(obj, player, newDelta, oldDelta) {
      obj.stopTop(obj, player);
    }
  }, {
    key: 'collisionRight',
    value: function collisionRight(obj, player, newDelta, oldDelta) {
      obj.stopRight(obj, player);
    }
  }, {
    key: 'collisionBottom',
    value: function collisionBottom(obj, player, newDelta, oldDelta) {
      obj.stopBottom(obj, player);
    }
  }, {
    key: 'stopLeft',
    value: function stopLeft(obj, player) {
      player.x = obj.getLeft() - player.w;
      player.dx = 0;
    }
  }, {
    key: 'stopTop',
    value: function stopTop(obj, player) {
      player.y = obj.getTop() - player.h;
      player.dy = 0;
      player.hasBounced = false;
      player.isOnFloor = true;
    }
  }, {
    key: 'stopRight',
    value: function stopRight(obj, player) {
      player.x = obj.getRight();
      player.dx = 0;
    }
  }, {
    key: 'stopBottom',
    value: function stopBottom(obj, player) {
      player.y = obj.getBottom();
      player.dy = 0;
    }
  }, {
    key: 'normalCollision',
    value: function normalCollision(obj, side) {
      var objMovingLeft = obj.dx < 0 ? true : false,
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
        if (collisionTop && isColliding(this, obj, false, true)) {
          obj.collision.top.push({ obj: this, callback: this.collisionTop });
        }
        if (collisionLeft && objMovingRight) {
          if (utils.catchBlockCollision(col - 1, row) && isColliding(utils.catchBlockCollision(col - 1, row), obj, false, true)) {
            obj.collision.top.push({ obj: this, callback: this.collisionTop });
          } else {
            obj.collision.left.push({ obj: this, callback: this.collisionLeft });
          }
        }
        if (collisionRight && objMovingLeft) {
          if (utils.catchBlockCollision(col + 1, row) && isColliding(utils.catchBlockCollision(col + 1, row), obj, false, true)) {
            obj.collision.top.push({ obj: this, callback: this.collisionTop });
          } else {
            obj.collision.right.push({ obj: this, callback: this.collisionRight });
          }
        }
      } else if (objMovingTop) {
        if (collisionBottom && isColliding(this, obj, false, true)) {
          obj.collision.bottom.push({ obj: this, callback: this.collisionBottom });
        }
        if (collisionLeft) {
          if (utils.catchBlockCollision(col - 1, row) && isColliding(utils.catchBlockCollision(col - 1, row), obj, false, true)) {
            obj.collision.bottom.push({ obj: this, callback: this.collisionBottom });
          } else {
            obj.collision.left.push({ obj: this, callback: this.collisionLeft });
          }
        }
        if (collisionRight) {
          if (utils.catchBlockCollision(col + 1, row) && isColliding(utils.catchBlockCollision(col + 1, row), obj, false, true)) {
            obj.collision.bottom.push({ obj: this, callback: this.collisionBottom });
          } else {
            obj.collision.right.push({ obj: this, callback: this.collisionRight });
          }
        }
      } else if (objMovingLeft && collisionRight) {
        obj.collision.right.push({ obj: this, callback: this.collisionRight });
      } else if (objMovingRight && collisionLeft) {
        obj.collision.left.push({ obj: this, callback: this.collisionLeft });
      }
    }
  }]);

  return Block;
}();

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


var MAGNITUDEX = 2;
var MAGNITUDEY = 0.2;

var BouncingBox = function (_Block) {
  _inherits(BouncingBox, _Block);

  function BouncingBox(x, y, Game) {
    _classCallCheck(this, BouncingBox);

    var _this = _possibleConstructorReturn(this, (BouncingBox.__proto__ || Object.getPrototypeOf(BouncingBox)).call(this, x, y, Game));

    _this.h = Game.cfg.scale / 2;
    _this.type = 'BouncingBox';
    _this.color = 'purple';
    _this.empty = false;
    _this.collision = true;

    _this.id = 2;
    _this.purpose = ['Static'];
    return _this;
  }

  _createClass(BouncingBox, [{
    key: 'bounceFactor',
    value: function bounceFactor(obj) {
      return obj.hasBounced ? 0.7 : 1.1;
    }
  }, {
    key: 'update',
    value: function update() {
      this.w = this.game.cfg.scale;
      this.h = this.game.cfg.scale / 2;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var game = this.game,
          c = game.c,
          scale = game.cfg.scale,
          x = this.x * scale,
          y = this.y * scale + (scale - this.h);

      c.beginPath();
      c.drawImage(game.assets.textures.BouncingBox.img, x, y, this.w + 1, this.h + 1);
      c.closePath();
    }
  }, {
    key: 'collisionLeft',
    value: function collisionLeft(obj, player, newDelta, oldDelta) {
      // console.log('BB-LEFT')
      if (player.dx > MAGNITUDEX) {
        player.dx *= -obj.bounceFactor(player);
        player.hasBounced = true;
      } else obj.stopLeft(obj, player);
    }
  }, {
    key: 'collisionTop',
    value: function collisionTop(obj, player, newDelta, oldDelta) {
      // console.log('BB-TOP')
      if (player.dy > MAGNITUDEY) {
        player.dy *= -obj.bounceFactor(player);
        // player.y += player.dy
        player.isOnFloor = true;
        player.hasBounced = true;
      } else obj.stopTop(obj, player);
    }
  }, {
    key: 'collisionRight',
    value: function collisionRight(obj, player, newDelta, oldDelta) {
      // console.log('BB-RIGHT')
      if (player.dx < -MAGNITUDEX) {
        player.dx *= -obj.bounceFactor(player);
        player.hasBounced = true;
      } else obj.stopRight(obj, player);
    }
  }, {
    key: 'collisionBottom',
    value: function collisionBottom(obj, player, newDelta, oldDelta) {
      // console.log('BB-BOT')
      if (player.dy < -MAGNITUDEY) {
        player.dy *= -obj.bounceFactor(player);
        player.hasBounced = true;
      } else obj.stopBottom(obj, player);
    }
  }, {
    key: 'resolve',
    value: function resolve(player, side) {
      if (player.type != 'Player') return;

      this.normalCollision(player, side);
    }
  }]);

  return BouncingBox;
}(_block2.default);

module.exports = BouncingBox;

/***/ }),

/***/ "./src/objects/camera.js":
/*!*******************************!*\
  !*** ./src/objects/camera.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera(game) {
    _classCallCheck(this, Camera);

    this.game = game;
    this.x = 0;
    this.y = 0;
    this.oldX = 0;
    this.oldY = 0;
  }

  _createClass(Camera, [{
    key: "update",
    value: function update() {
      var game = this.game,
          canvas = game.canvas,
          Player = game.Player,
          scale = game.cfg.scale,
          mapWidth = game.cfg.cols * scale,
          mapHeight = game.cfg.rows * scale,
          halfMapWidth = mapWidth - canvas.width,
          halfMapHeight = mapHeight - canvas.height,
          isOffsetX = canvas.width < mapWidth ? true : false,
          isOffsetY = canvas.height < mapHeight ? true : false,
          imgHorizontal = mapWidth > mapHeight ? true : false,
          PlayerHalfWidth = Player.camX + Player.w / 2,
          PlayerHalfHeight = Player.camY + Player.h / 2;

      var tx = -PlayerHalfWidth + canvas.width / 2,
          ty = -PlayerHalfHeight + canvas.height / 2;

      if (!isOffsetX) tx = canvas.width / 2 - mapWidth / 2;
      if (!isOffsetY) ty = canvas.height / 2 - mapHeight / 2;

      if (isOffsetX && PlayerHalfWidth <= canvas.width / 2) tx = 0;else if (isOffsetX && PlayerHalfWidth >= mapWidth - canvas.width / 2) tx = -halfMapWidth;

      if (isOffsetY && PlayerHalfHeight <= canvas.height / 2) ty = 0;else if (isOffsetY && PlayerHalfHeight >= mapHeight - canvas.height / 2) ty = -halfMapHeight;

      if (!Player.isDead) {
        game.translate.x = tx;
        game.translate.y = ty;
        this.x = game.translate.x;
        this.y = game.translate.y;
      } else {
        // If Camera POS === Player Respawn POS
        if (game.translate.x == tx && game.translate.y == ty) {
          Player.spawn();
        } else {
          game.translate.x = game.utils.lerp(game.translate.x, tx, 0.2);
          game.translate.y = game.utils.lerp(game.translate.y, ty, 0.2);
          this.x = game.translate.x;
          this.y = game.translate.y;
        }
      }

      this.oldX = this.x;
      this.oldY = this.y;
    }
  }]);

  return Camera;
}();

module.exports = Camera;

/***/ }),

/***/ "./src/objects/end.js":
/*!****************************!*\
  !*** ./src/objects/end.js ***!
  \****************************/
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
  _inherits(End, _Block);

  function End(x, y, Game) {
    _classCallCheck(this, End);

    var _this = _possibleConstructorReturn(this, (End.__proto__ || Object.getPrototypeOf(End)).call(this, x, y, Game));

    _this.h = Game.cfg.scale * 2;
    _this.type = 'End';
    _this.color = 'cyan';
    _this.empty = false;
    _this.collision = true;

    _this.id = 5;
    _this.purpose = ['Special'];
    return _this;
  }

  _createClass(End, [{
    key: 'update',
    value: function update() {
      this.editUpdate();
    }
  }, {
    key: 'draw',
    value: function draw() {
      var game = this.game,
          c = game.c,
          scale = game.cfg.scale,
          x = this.x * scale + (scale - this.w),
          y = this.y * scale + (scale - this.h);

      c.beginPath();
      c.fillStyle = this.color;
      c.lineWidth = 1;
      c.rect(x, y, this.w + 1, this.h + 1);
      c.fill();
      c.closePath();
    }
  }, {
    key: 'editUpdate',
    value: function editUpdate() {
      this.w = this.game.cfg.scale;
      this.h = this.game.cfg.scale * 2;
    }
  }, {
    key: 'resolve',
    value: function resolve(player, side) {
      if (player.type != 'Player') return;

      this.game.window.play.endTimer();
      player.dx = player.dy = 0;
    }
  }]);

  return End;
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

var GRAVITY = 0.0035;
var JUMPFORCE = 1.0;
var MAXSPEED = 0.6;
var ACCEL = 0.2;

var Player = function (_Block) {
  _inherits(Player, _Block);

  function Player(x, y, name, Game) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, x, y, Game));

    _this.type = 'Player';
    _this.color = 'brown';
    _this.name = name;

    _this.h = 100;
    _this.w = 50;

    _this.camX = _this.x, _this.camY = _this.y;

    _this.hide = false;

    _this.respawn = [_this.x, _this.y];

    _this.accel = ACCEL;
    _this.maxSpeed = MAXSPEED;
    _this.gravity = GRAVITY;
    _this.jumpForce = JUMPFORCE;

    _this.native = {
      w: _this.w,
      h: _this.h,
      maxSpeed: _this.maxSpeed
    };

    _this.canJump = true;
    _this.isOnFloor = false;
    _this.isDead = false;
    _this.hasBounced = false;
    _this.isCrouching = false;

    _this.keys = {
      '38': false, // Up
      '32': false, // Space
      '90': false, // Z


      '83': false, // S
      '40': false, // Down
      '16': false, // LShift


      '39': false, // Right
      '37': false, // Left
      '81': false, // Q
      '68': false // D
    };

    _this.collision = {
      left: [],
      top: [],
      right: [],
      bottom: []
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
    key: 'init',
    value: function init() {
      this.x = this.respawn[0] * this.game.cfg.scale;
      this.y = this.respawn[1] * this.game.cfg.scale;
    }
  }, {
    key: 'jump',
    value: function jump() {
      if (!this.isOnFloor || !this.canJump) return;
      this.dy = -this.jumpForce;
      this.isOnFloor = false;
      this.canJump = false;
    }
  }, {
    key: 'crouch',
    value: function crouch() {
      this.h = 50;
      this.y += this.h;
      this.maxSpeed *= 0.2;
      this.isCrouching = true;
    }
  }, {
    key: 'uncrouch',
    value: function uncrouch() {
      var game = this.game,
          cfg = game.cfg,
          col = Math.floor(this.x / cfg.scale),
          row = Math.floor((this.y - this.h) / cfg.scale),
          isCollidingTopLeft = this.isColliding(game.static, row, col, this),
          isCollidingTopRight = this.isColliding(game.static, row, col + 1, this);

      // console.log(isCollidingTopLeft || isCollidingTopRight)
      if (isCollidingTopLeft || isCollidingTopRight) return;

      this.y -= this.h;
      this.h = 100;
      this.maxSpeed = this.native.maxSpeed;
      this.isCrouching = false;
    }
  }, {
    key: 'die',
    value: function die() {
      this.x = this.respawn[0] * this.game.cfg.scale;
      this.y = this.respawn[1] * this.game.cfg.scale;
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
      if (this.isDead || this.hide) return;

      var c = this.game.c;

      c.beginPath();
      c.rect(this.x, this.y, this.w, this.h);
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    }
  }, {
    key: 'move',
    value: function move(dt) {
      this.isIdle = true;

      // console.log(this.x, this.y)
      var dx = this.dx,
          dy = this.dy,
          onFloor = this.isOnFloor,
          crouching = this.isCrouching,
          maxSpeed = this.maxSpeed,
          accel = this.accel,
          key = this.keys,
          left = key['37'] || key['81'] ? true : false,
          up = key['38'] || key['32'] || key['90'] ? true : false,
          right = key['39'] || key['68'] ? true : false,
          down = key['40'] || key['83'] || key['16'] ? true : false;

      if (this.isDead || this.hide) return;

      if (left) {
        if (!(crouching && Math.abs(dx) > maxSpeed)) {
          this.dx = Math.max(dx - accel, -maxSpeed);
        }
        this.isIdle = false;
      }

      if (right) {
        if (!(crouching && Math.abs(dx) > maxSpeed)) {
          this.dx = Math.min(dx + accel, maxSpeed);
        }
        this.isIdle = false;
      }

      if (left && right) {
        this.dx = 0;
      }

      if (up) {
        this.jump();
      } else {
        this.canJump = true;
      }

      if (!crouching && down) this.crouch();

      if (crouching && !down) this.uncrouch();

      // GRAVITY AND FRICTIONS
      this.dy += this.gravity * dt;
      if (this.isIdle || crouching && Math.abs(dx) > maxSpeed) {
        var friction = onFloor ? 0.02 : 0.012;
        if (crouching && Math.abs(dx) > maxSpeed) friction = onFloor ? 0.0013 : 0;
        this.dx = this.game.utils.lerp(dx, 0, friction * dt);
      }

      if (this.game.window.play.startTime === 0) {
        var keysArr = Object.values(this.keys);
        if (keysArr.some(function (e) {
          return e;
        })) this.game.window.play.startTimer();
      }
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      // Something
    }
  }, {
    key: 'update',
    value: function update(dt) {
      // console.log(this.isDead)
      if (this.isDead || this.hide) return;
      // console.log('PlayerY =', this.dy)

      this.handleCollision();

      if (this.dy > 0) this.isOnFloor = false;

      // const maxSpeed = 63
      // if(this.dy > 0)
      // {
      //   this.dy = (this.dy > maxSpeed) ? maxSpeed : this.dy
      // } else if(this.dy < 0) {
      //   this.dy = (this.dy < -maxSpeed) ? -maxSpeed : this.dy
      // }
      // if(this.dx > 0)
      // {
      //   this.dx = (this.dx > maxSpeed) ? maxSpeed : this.dx
      // } else if(this.dx < 0) {
      //   this.dx = (this.dx < -maxSpeed) ? -maxSpeed : this.dx
      // }


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

      // console.log(this.x, dt, this.x*dt)
      this.x += this.dx * dt;
      this.y += this.dy * dt;

      this.camX = this.x;
      this.camY = this.y;
      if (this.isCrouching) this.camY -= this.h / 2;

      // console.log(this.canY , this.canY )

      // this.draw()

      // console.log(this.hasBounced)

      // console.log('------------------')
    }
  }, {
    key: 'isColliding',
    value: function isColliding(map, row, col, crouching) {
      if (!map[row] || !map[row][col] && map[row][col] != 0) return true;else if (map[row][col].type != 'Wall') return false;
      // console.log(col, row)

      var box = map[row][col],
          l1 = box.getLeft(),
          r1 = box.getRight(),
          t1 = box.getTop(),
          b1 = box.getBottom(),
          l2 = this.getLeft(),
          r2 = this.getRight(),
          t2 = crouching ? this.getTop() - this.h : this.getTop(),
          b2 = this.getBottom();

      if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) {
        return true;
      }
      return false;
    }
  }, {
    key: 'handleCollision',
    value: function handleCollision() {
      var _this2 = this;

      var collLeft = this.collision.left,
          collTop = this.collision.top,
          collRight = this.collision.right,
          collBottom = this.collision.bottom,
          isCollLeft = collLeft.length > 0 ? true : false,
          isCollTop = collTop.length > 0 ? true : false,
          isCollRight = collRight.length > 0 ? true : false,
          isCollBottom = collBottom.length > 0 ? true : false,
          delta = {
        x: this.dx,
        y: this.dy
      };

      if (isCollTop) {
        var typePriority = {
          Spikes: false,
          BouncingBox: false,
          End: false,
          Wall: false
        };

        collTop.forEach(function (_ref) {
          var obj = _ref.obj,
              callback = _ref.callback;

          if (typePriority.hasOwnProperty(obj.type)) typePriority[obj.type] = { obj: obj, callback: callback };
        });

        var priorityArray = Object.values(typePriority),
            objectToHandle = priorityArray.find(function (e) {
          return e;
        });

        objectToHandle.callback(objectToHandle.obj, this, { x: this.dx, y: this.dy }, delta);
      }

      if (isCollBottom) {
        collBottom.forEach(function (_ref2) {
          var obj = _ref2.obj,
              callback = _ref2.callback;

          callback(obj, _this2, { x: _this2.dx, y: _this2.dy }, delta);
        });
      }

      if (isCollLeft) {
        collLeft.forEach(function (_ref3) {
          var obj = _ref3.obj,
              callback = _ref3.callback;

          callback(obj, _this2, { x: _this2.dx, y: _this2.dy }, delta);
        });
      }

      if (isCollRight) {
        collRight.forEach(function (_ref4) {
          var obj = _ref4.obj,
              callback = _ref4.callback;

          callback(obj, _this2, { x: _this2.dx, y: _this2.dy }, delta);
        });
      }
      // console.log(this.dy)

      this.collision.left = [];
      this.collision.top = [];
      this.collision.right = [];
      this.collision.bottom = [];
    }
  }]);

  return Player;
}(_block2.default);

module.exports = Player;

/***/ }),

/***/ "./src/objects/spawn.js":
/*!******************************!*\
  !*** ./src/objects/spawn.js ***!
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
  _inherits(Spawn, _Block);

  function Spawn(x, y, Game) {
    _classCallCheck(this, Spawn);

    var _this = _possibleConstructorReturn(this, (Spawn.__proto__ || Object.getPrototypeOf(Spawn)).call(this, x, y, Game));

    _this.h = Game.cfg.scale * 2;
    _this.type = 'Spawn';
    _this.color = 'brown';
    _this.empty = true;
    _this.collision = false;

    _this.id = 4;
    _this.purpose = ['Special'];
    return _this;
  }

  _createClass(Spawn, [{
    key: 'draw',
    value: function draw() {
      if (this.game.mode === 'edit') {
        var c = this.game.c,
            scale = this.game.cfg.scale,
            x = this.x * scale,
            y = this.y * scale + (scale - this.h);

        c.beginPath();
        c.fillStyle = this.color;
        c.fillRect(x, y, this.w, this.h);
        c.closePath();
      }
    }
  }, {
    key: 'editUpdate',
    value: function editUpdate() {
      this.w = this.game.cfg.scale;
      this.h = this.game.cfg.scale * 2;
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      if (obj.type != 'Player') return;
    }
  }]);

  return Spawn;
}(_block2.default);

/***/ }),

/***/ "./src/objects/spikes.js":
/*!*******************************!*\
  !*** ./src/objects/spikes.js ***!
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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //import autotile from '../tilesManager';


module.exports = function (_Block) {
  _inherits(Spikes, _Block);

  function Spikes(x, y, Game) {
    _classCallCheck(this, Spikes);

    var _this = _possibleConstructorReturn(this, (Spikes.__proto__ || Object.getPrototypeOf(Spikes)).call(this, x, y, Game));

    _this.h = Game.cfg.scale / 2;
    _this.type = 'Spikes';
    _this.color = 'gray';
    _this.empty = false;
    _this.collision = true;

    _this.id = 3;
    _this.purpose = ['Static'];
    return _this;
  }

  _createClass(Spikes, [{
    key: 'update',
    value: function update() {
      this.w = this.game.cfg.scale;
      this.h = this.game.cfg.scale / 2;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var game = this.game,
          c = game.c,
          scale = game.cfg.scale,
          x = this.x * scale,
          y = this.y * scale + (scale - this.h);

      c.beginPath();
      c.drawImage(game.assets.textures.Spikes.img, x, y, this.w + 1, this.h + 1);
      c.closePath();
    }
  }, {
    key: 'collisionTop',
    value: function collisionTop(obj, player, newDelta, oldDelta) {
      player.die();
    }
  }, {
    key: 'resolve',
    value: function resolve(player, side) {
      if (player.type != 'Player') return;

      this.normalCollision(player, side);
    }
  }]);

  return Spikes;
}(_block2.default);

/***/ }),

/***/ "./src/objects/sword.js":
/*!******************************!*\
  !*** ./src/objects/sword.js ***!
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
  _inherits(Sword, _Block);

  function Sword(x, y, Game) {
    _classCallCheck(this, Sword);

    var _this = _possibleConstructorReturn(this, (Sword.__proto__ || Object.getPrototypeOf(Sword)).call(this, x, y, Game));

    var scale = Game.cfg.scale;

    _this.w = scale / 2;
    _this.h = scale / 2;

    _this.inX = scale / 2 - _this.w / 2;
    _this.inY = scale / 2 - _this.h / 2;

    _this.type = 'Sword';
    _this.color = 'yellow';
    _this.empty = false;
    _this.collision = true;

    _this.dx = 0.3;

    _this.id = 7;
    _this.purpose = ['Dynamic'];

    _this.link = 'SwordSupport';
    return _this;
  }

  _createClass(Sword, [{
    key: 'getLeft',
    value: function getLeft(displayDelta) {
      return this.x * this.game.cfg.scale + this.inX + (displayDelta ? this.dx : 0);
    }
  }, {
    key: 'getTop',
    value: function getTop(displayDelta) {
      return this.y * this.game.cfg.scale + this.inY + (displayDelta ? this.dx : 0);
    }
  }, {
    key: 'update',
    value: function update(dt) {
      var game = this.game,
          c = game.c,
          scale = game.cfg.scale,
          gridX = Math.floor(this.getLeft() / scale | 0),
          gridY = Math.floor(this.getTop() / scale | 0),
          movingLeft = this.dx > 0 ? false : true,
          inX = this.inX,
          inY = this.inY,
          dx = this.dx;

      this.w = game.cfg.scale / 2;
      this.h = game.cfg.scale / 2;

      this.inX += this.dx * dt;

      if (movingLeft && inX < 0) {
        this.x--;
        this.inX = scale + this.inX;
      }

      if (!movingLeft && inX > scale) {
        this.x++;
        this.inX = this.inX - scale;
      }
    }
  }, {
    key: 'editUpdate',
    value: function editUpdate() {
      var game = this.game,
          cfg = game.cfg,
          scale = cfg.scale,
          oldScale = cfg.oldScale;

      this.inX = scale / 2 - this.w / 2;
      this.inY = scale / 2 - this.h / 2;

      this.w = scale / 2;
      this.h = scale / 2;
    }
  }, {
    key: 'draw',
    value: function draw() {
      var game = this.game,
          c = game.c;

      c.beginPath();
      c.fillStyle = this.color;
      c.fillRect(this.getLeft(), this.getTop(), this.w, this.h);
      c.closePath();
    }

    // collisionTop(obj, player, newDelta, oldDelta) {
    //   player.die()
    // }

  }, {
    key: 'resolve',
    value: function resolve(obj, side) {

      var game = this.game,
          dir = this.dx > 0 ? 1 : 0,
          map = game.static,
          scale = game.cfg.scale,
          movingLeft = this.dx > 0 ? false : true;

      switch (obj.type) {
        case 'SwordSupport':
          if (map[this.y][this.x + dir] && map[this.y][this.x + dir].type === 'SwordSupport') return;else {
            if (movingLeft && this.getLeft() < obj.getLeft()) this.dx = -this.dx;else if (!movingLeft && this.getRight() > obj.getRight()) this.dx = -this.dx;
          }
          break;

        case 'Sword':
          this.dx = -this.dx;
          break;

        case 'Player':
          obj.die();
          break;
      }
    }
  }]);

  return Sword;
}(_block2.default);

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

/***/ }),

/***/ "./src/objects/swordSupport.js":
/*!*************************************!*\
  !*** ./src/objects/swordSupport.js ***!
  \*************************************/
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
  _inherits(SwordSupport, _Block);

  function SwordSupport(x, y, Game) {
    _classCallCheck(this, SwordSupport);

    var _this = _possibleConstructorReturn(this, (SwordSupport.__proto__ || Object.getPrototypeOf(SwordSupport)).call(this, x, y, Game));

    _this.type = 'SwordSupport';
    _this.color = 'gray';
    _this.empty = false;
    _this.collision = true;

    _this.id = 6;
    _this.purpose = ['Static'];
    return _this;
  }

  _createClass(SwordSupport, [{
    key: 'draw',
    value: function draw() {
      var game = this.game,
          c = game.c,
          scale = game.cfg.scale,
          x = this.x * scale + (scale - this.w),
          y = this.y * scale + (scale - this.h);

      c.beginPath();
      c.fillStyle = this.color;
      c.lineWidth = 1;
      c.rect(x, y, this.w + 1, this.h + 1);
      c.fill();
      c.closePath();
    }
  }, {
    key: 'resolve',
    value: function resolve(obj, side) {
      if (obj.type === 'Sword') {}
    }
  }]);

  return SwordSupport;
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

    _this.id = 1;
    _this.purpose = ['Static'];

    // autotile.getValue(this.game, this.x, this.y, false, false)
    return _this;
  }

  _createClass(Wall, [{
    key: 'draw',
    value: function draw() {
      var game = this.game,
          c = game.c,
          tile = game.assets.tiles[this.tile.name];

      c.drawImage(tile.img, // IMG
      this.tile.x, // CANVAS_X
      this.tile.y, // CANVAS_Y
      tile.size, // CANVAS_WIDTH
      tile.size, // CANVAS_HEIGHT
      this.x * game.cfg.scale, // IMG_X
      this.y * game.cfg.scale, // IMG_Y 
      game.cfg.scale + 1, // IMG_WIDTH
      game.cfg.scale + 1 // IMG_HEIGHT
      );
    }
  }, {
    key: 'editUpdate',
    value: function editUpdate() {
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
    key: 'update',
    value: function update() {
      var game = this.game;
      this.w = game.cfg.scale;
      this.h = game.cfg.scale;
    }

    // collisionTop(obj) {
    //   console.log('WALLTOP')
    //   this.stopTop(obj)
    // }

  }, {
    key: 'resolve',
    value: function resolve(player, side) {
      if (player.type != 'Player') return;

      this.normalCollision(player, side);
      // console.log(player.hasBounced)
    }
  }]);

  return Wall;
}(_block2.default);

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

  var map = game.static,
      theMap = game.map;

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
    var test = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    if ((!map[b] || map[b] && !map[b][a]) && theMap[b] && theMap[b][a] && theMap[b][a][1] != '1') return;

    if (map[b] && map[b][a] && map[b][a].type != 'Wall') return;

    // console.log(map[b][a])
    // if(b===5 && a === 11) {
    //   if(map[b]) {
    //     console.log(map[b][a])
    //     console.log(map)
    //   }
    // }

    // console.log(map[y][b])
    if (map[b] && map[b][a] && map[b][a].empty) return;

    tileValue += v;
    if (id >= 0) NSWE[id] = true;
    if (child) return;
    if (!map[b] || !map[b][a]) return;

    getTileValue(game, a, b, false, true);
    updateArr.push({ x: a, y: b });
  }

  checkObj(x, y - 1, N, 0); // N
  checkObj(x, y + 1, S, 1, true); // S
  checkObj(x - 1, y, W, 2); // W // 24 + 64
  checkObj(x + 1, y, E, 3); // E

  if (NSWE[0] && NSWE[2]) checkObj(x - 1, y - 1, NW); // NW
  if (NSWE[0] && NSWE[3]) checkObj(x + 1, y - 1, NE); // NE
  if (NSWE[1] && NSWE[2]) checkObj(x - 1, y + 1, SW); // SW
  if (NSWE[1] && NSWE[3]) checkObj(x + 1, y + 1, SE); // SE


  if (!del) {
    // console.log(x, y, map[y][x])
    map[y][x].tile.value = tileValue;
  }

  if (map[y][x]) map[y][x].editUpdate();
  return updateArr;
}

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
    this.list = ["mousedown", "mousemove", "mouseup", "wheel", "mouseleave"]; //, "keyup", "keydown" ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] :
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
          c = game.c,
          uptAll = game.cfg.updateAll,
          uptArr = game.cfg.updateArr;

      if (uptAll) c.clearRect(0, 0, canvas.width, canvas.height);

      c.save();
      c.translate(tX, tY);

      var layerName = ['background', 'static', 'dynamic', 'foreground'];
      if (uptAll) {
        var canvasCols = Math.ceil(canvas.width / scale);
        var canvasRows = Math.ceil(canvas.height / scale);
        var xStart = Math.floor(tX / scale * -1) > 0 ? Math.floor(tX / scale * -1) : 0;
        var yStart = Math.floor(tY / scale * -1) > 0 ? Math.floor(tY / scale * -1) : 0;

        var _loop = function _loop(y) {
          var _loop2 = function _loop2(x) {
            layerName.forEach(function (name) {
              var layer = game[name];

              if (!layer[y]) return;
              if (!layer[y][x]) return;
              var cell = layer[y][x];
              cell.editUpdate();
              cell.draw();
            });
          };

          for (var x = xStart; x < canvasCols + xStart + 1; x++) {
            _loop2(x);
          }
        };

        for (var y = yStart; y < canvasRows + yStart + 1; y++) {
          _loop(y);
        }
        game.cfg.updateAll = false;
      } else if (uptArr.length > 0) {
        uptArr.forEach(function (arr) {
          layerName.forEach(function (name) {
            var layer = game[name];
            if (!layer[arr.y] || !layer[arr.y][arr.x]) return;
            var cell = layer[arr.y][arr.x];
            cell.editUpdate();
            cell.draw();
          });
        });

        game.cfg.updateArr = [];
      }

      c.restore();
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      console.log('Start window Edit');
      var div = document.getElementById('game'),
          toolBar = __webpack_require__(/*! ../html_elements/toolbar */ "./src/html_elements/toolbar.js")(this.game);
      div.insertBefore(toolBar, this.game.canvas);

      this.list.forEach(function (evt) {
        return _this.game.canvas.addEventListener(evt, _this, false);
      });
    }
  }, {
    key: "end",
    value: function end() {
      var _this2 = this;

      this.game.cfg.scale = 64;
      console.log('End window Edit');
      this.list.forEach(function (evt) {
        return _this2.game.canvas.removeEventListener(evt, _this2, false);
      });

      var elem = document.getElementById('toolbar'),
          style = document.getElementById('styleEdit');
      elem.parentNode.removeChild(elem);
      style.parentNode.removeChild(style);
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
        game.cfg.oldScale = game.cfg.scale;
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
      mouse = game.mouse,
      cfg = game.cfg,
      select = document.getElementById('selectBlock');

  var layerName = ['background', 'static', 'dynamic', 'foreground', 'special'];
  var updtID = layerName.indexOf(game.select.layer);
  if (updtID === 4) updtID = 1;

  var map = game[layerName[updtID]];

  if (!map[gridY] || !map[gridY][gridX] && map[gridY][gridX] != 0) return;

  var cell = map[gridY][gridX],
      mouseX = mouse.x,
      mouseY = mouse.y;

  mouse.last.gridX = gridX;
  mouse.last.gridY = gridY;

  var DrawPixel = function DrawPixel() {
    if (!game.select.block) return;

    if (game.select.block[3]) {
      var linkAproved = false;

      layerName = ['background', 'static', 'dynamic', 'foreground'];
      layerName.forEach(function (name) {
        var layer = game[name],
            theCell = layer[gridY][gridX];

        if (game.select.block[3] === theCell.type) linkAproved = true;
      });

      if (!linkAproved) return game.utils.handleError(game.select.block[1], 'link');
    }

    if (game.select.block[1] === 1) {
      var _cfg$updateArr;

      map[gridY][gridX] = new game.select.block[0](gridX, gridY, game);

      (_cfg$updateArr = cfg.updateArr).push.apply(_cfg$updateArr, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY, false, false)));
      cfg.updateArr.push({ x: gridX, y: gridY });
    } else if (game.select.block[1] === 4 || game.select.block[1] === 5) {

      if (map[gridY - 1][gridX].type === 'Wall') {
        var _cfg$updateArr2;

        map[gridY - 1][gridX] = new game.Objects.Block[0](gridX, gridY - 1, game);
        (_cfg$updateArr2 = cfg.updateArr).push.apply(_cfg$updateArr2, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY - 1, true, false)));
      } else {
        map[gridY - 1][gridX] = new game.Objects.Block[0](gridX, gridY - 1, game);
      }

      if (map[gridY][gridX].type === 'Wall') {
        var _cfg$updateArr3;

        map[gridY][gridX] = new game.select.block[0](gridX, gridY, game);
        (_cfg$updateArr3 = cfg.updateArr).push.apply(_cfg$updateArr3, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY, true, false)));
      } else {
        map[gridY][gridX] = new game.select.block[0](gridX, gridY, game);
      }

      if (game.select.block[1] === 4) game.Player.respawn = [gridX, gridY - 1];
      cfg.updateArr.push({ x: gridX, y: gridY - 1 }, { x: gridX, y: gridY });
      document.dispatchEvent(refreshBlockType);
    } else {
      if (map[gridY][gridX].type === 'Wall') {
        var _cfg$updateArr4;

        map[gridY][gridX] = new game.select.block[0](gridX, gridY, game);
        (_cfg$updateArr4 = cfg.updateArr).push.apply(_cfg$updateArr4, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY, true, false)));
      } else {
        map[gridY][gridX] = new game.select.block[0](gridX, gridY, game);
      }
      cfg.updateArr.push({ x: gridX, y: gridY });
    }
  };

  if (mouse.right) {
    var _cfg$updateArr5;

    if (!map[gridY][gridX]) return;

    mouse.last.click = 'right';

    if (layerName[updtID] != 'background') game.background[gridY][gridX] = new game.Objects.Block[0](gridX, gridY, game);

    map[gridY][gridX] = 0;

    (_cfg$updateArr5 = cfg.updateArr).push.apply(_cfg$updateArr5, _toConsumableArray(_tilesManager2.default.getValue(game, gridX, gridY, true, false)));
    cfg.updateArr.push({ x: gridX, y: gridY });
    document.dispatchEvent(refreshBlockType);
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

    this.startTime = 0;
    this.endTime = 0;
    this.pauseStart = 0;
    this.timer = 0;
  }

  _createClass(Play, [{
    key: "update",
    value: function update(dt) {
      // console.time('check')
      var game = this.game;
      if (!game.playing[1]) return;

      this.dt = dt;

      var cfg = game.cfg,
          scale = cfg.scale,
          canvas = game.canvas,
          tX = game.translate.x,
          tY = game.translate.y,
          Player = game.Player,
          Engine = game.Engine,
          map = game.map,
          colMax = map[0].length,
          rowMax = map.length,
          cWidth = canvas.width,
          cHeight = canvas.height;

      Engine.create(cfg.rows, cfg.cols, scale);

      if (!Player.isDead && !Player.hide) {
        Player.move(dt);
        Engine.insert(Player);
      }

      var offMap = 10,
          colStart = Math.floor(tX / scale * -1) - offMap > 0 ? Math.floor(tX / scale * -1) - offMap : 0,
          rowStart = Math.floor(tY / scale * -1) - offMap > 0 ? Math.floor(tY / scale * -1) - offMap : 0,
          colEnd = Math.ceil(cWidth / scale) + colStart + offMap * 2 > colMax ? colMax : Math.ceil(cWidth / scale) + colStart + offMap * 2,
          rowEnd = Math.ceil(cHeight / scale) + rowStart + offMap * 2 > rowStart ? rowMax : Math.ceil(cHeight / scale) + rowStart + offMap * 2;

      var layerName = ['static', 'dynamic'];
      layerName.map(function (name) {
        var layer = game[name];

        for (var y = rowStart; y < rowEnd; y++) {
          for (var x = colStart; x < colEnd; x++) {
            if (!layer[y] || !layer[y][x]) continue;

            var cell = layer[y][x];
            if (cell.empty || !cell.collision) continue;

            cell.update(dt);
            Engine.insert(cell);
          }
        }
      });

      // Test block
      // this.Block = new game.Objects.Wall(10.628, 6, game)
      // this.Block.tile.value = 2
      // this.Block.update()
      // Engine.insert(this.Block)

      Engine.checkCells();
      Player.update(dt);

      this.timer = Date.now() - this.startTime;
      // console.timeEnd('check')
    }
  }, {
    key: "draw",
    value: function draw() {
      var game = this.game;
      if (!game.playing[1]) return;

      var cfg = game.cfg,
          scale = cfg.scale,
          canvas = game.canvas,
          tX = game.translate.x,
          tY = game.translate.y,
          Player = game.Player,
          map = game.map,
          c = game.c,
          colMax = map[0].length,
          rowMax = map.length,
          cWidth = canvas.width,
          cHeight = canvas.height;
      c.clearRect(0, 0, canvas.width, canvas.height);

      game.Camera.update();

      c.save();
      c.translate(tX, tY);

      var offMap = 10,
          colStart = Math.floor(tX / scale * -1) - offMap > 0 ? Math.floor(tX / scale * -1) - offMap : 0,
          rowStart = Math.floor(tY / scale * -1) - offMap > 0 ? Math.floor(tY / scale * -1) - offMap : 0,
          colEnd = Math.ceil(cWidth / scale) + colStart + offMap * 2 > colMax ? colMax : Math.ceil(cWidth / scale) + colStart + offMap * 2,
          rowEnd = Math.ceil(cHeight / scale) + rowStart + offMap * 2 > rowStart ? rowMax : Math.ceil(cHeight / scale) + rowStart + offMap * 2;

      var layerName = ['background', 'static', 'dynamic', 'foreground'];
      layerName.map(function (name) {
        var layer = game[name];

        if (name === 'dynamic') Player.draw();

        for (var y = rowStart; y < rowEnd; y++) {
          for (var x = colStart; x < colEnd; x++) {
            if (!layer[y] || layer[y] && !layer[y][x]) continue;

            var cell = layer[y][x];
            if (cell.empty) continue;

            if (!cell.collision) cell.update();
            cell.draw();
          }
        }
      });

      // Test block
      // this.Block.draw()

      c.restore();

      this.displayTimer();
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      this.startTime = Date.now();
      this.game.Player.hide = false;
    }
  }, {
    key: "pauseTimer",
    value: function pauseTimer() {
      if (!this.game.playing[0]) {
        if (this.startTime) this.startTime -= this.pauseStart - Date.now();
        this.game.playing[0] = true;
        this.game.resetAnimate = true;
        this.game.animate();
        console.log('Play');
      } else {
        this.pauseStart = Date.now();
        this.game.playing[0] = false;
        console.log('Pause');
      }
      this.game.canvas.focus();
    }
  }, {
    key: "resetTimer",
    value: function resetTimer() {
      this.startTime = 0;
      this.endTime = 0;
      this.pauseStart = 0;
    }
  }, {
    key: "endTimer",
    value: function endTimer() {
      this.endTime = Date.now() - this.startTime;
      this.game.Player.hide = true;
      console.log(this.game.utils.getTime(this.endTime));
    }
  }, {
    key: "displayTimer",
    value: function displayTimer() {
      var game = this.game,
          canvas = game.canvas,
          c = game.c,
          rectWidth = 300,
          rectHeight = 50;

      var time = this.endTime > 0 ? this.endTime : this.timer;
      if (this.startTime === 0) time = 0;
      c.font = "20pt Tahoma";
      var str = game.utils.getTime(time),
          size = game.utils.textSize(c, str);

      c.beginPath();
      c.fillStyle = "black";
      c.fillRect(canvas.width / 2 - rectWidth / 2, 0, rectWidth, rectHeight);
      c.closePath();

      c.beginPath();
      c.fillStyle = "white";
      c.fillText(str, canvas.width / 2 - size[0] / 2, size[1] + 15);
      c.closePath();
    }
  }, {
    key: "start",
    value: function start() {
      var _this = this;

      console.log('Start window Play');
      this.list.forEach(function (evt) {
        return _this.game.canvas.addEventListener(evt, _this, false);
      });

      var divGame = document.getElementById('game'),
          menu = __webpack_require__(/*! ../html_elements/playMenu */ "./src/html_elements/playMenu.js")(this.game);
      divGame.insertBefore(menu, this.game.canvas);
    }
  }, {
    key: "end",
    value: function end() {
      var _this2 = this;

      console.log('End window Play');
      this.list.forEach(function (evt) {
        return _this2.game.canvas.removeEventListener(evt, _this2, false);
      });

      var menu = document.getElementById('playMenu'),
          style = document.getElementById('stylePlay');
      menu.parentNode.removeChild(menu);
      style.parentNode.removeChild(style);

      this.resetTimer();
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
      if (game.Player.keys.hasOwnProperty(e.keyCode)) game.Player.keys[e.keyCode] = true;
      if (e.keyCode == 27) {
        var div = document.getElementById('playMenu');

        this.pauseTimer();
        var width = div.style.width.replace(/[px%]/i, '');
        if (width > 0) {
          div.style.width = 0;
        } else {
          div.style.width = '100%';
        }

        game.canvas.focus();
      }

      if (e.keyCode == 82) {
        game.init();

        if (!game.playing[0]) {
          game.playing[0] = true;
          game.animate();
        }
        game.canvas.focus();
        game.window.play.resetTimer();
        game.Player.hide = false;
      }
    }
  }, {
    key: "onkeyup",
    value: function onkeyup(e) {
      var game = this.game;
      e.preventDefault();
      if (!game.playing[0]) return;

      if (!game.Player.keys.hasOwnProperty(e.keyCode)) return;
      game.Player.keys[e.keyCode] = false;
    }
  }, {
    key: "onmousedown",
    value: function onmousedown(e) {}
  }, {
    key: "onmouseup",
    value: function onmouseup(e) {}
  }, {
    key: "onmousemove",
    value: function onmousemove(e) {}
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

  this.loadImg = function (obj) {
    var img = new Image();
    img.src = obj.url;
    obj.img = img;
  };

  this.lerp = function (value1, value2, amount) {
    if (value1 === 0) return false;
    amount = amount < 0 ? 0 : amount;
    amount = amount > 1 ? 1 : amount;
    var result = Number((value1 + (value2 - value1) * amount).toFixed(5));
    var diff = Math.abs(result - value2);
    return diff.toFixed(2) == 0 ? value2 : result;
  };

  this.getBlock = function (arr, x, y) {
    if (!arr[y]) return false;else if (arr[y] && !arr[y][x]) return false;else if (!arr[y][x].collision) return false;else return true;
  };

  this.events = function (el, list) {
    // list =>  ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "keyup", "keydown", "wheel", "mouseleave"]
    // console.log('evenThis', el)
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
    var layerName = ['static', 'dynamic'];

    var toReturn = false;

    layerName.forEach(function (name) {
      var layer = _this.game[name];
      if (!layer[y] || !layer[y][x] || !layer[y][x].collision) return false;
      toReturn = layer[y][x];
    });

    return toReturn;
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
        return _this.game.Objects.Spikes;

      case 4:
        return _this.game.Objects.Spawn;

      case 5:
        return _this.game.Objects.End;

      default:
        return false;
      // case 4:
      //   return

      // case 5:
      //   return
    }
  };

  this.load = function (url, element) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);

    element.innerHTML = req.responseText;
  };

  this.getTime = function (nb) {
    nb = Number(nb);

    if (nb === 0) return '00:00:00';

    var msA = '' + Math.floor(nb % 1000);

    // // 1000).toFixed(2)
    if (msA > 1000) msA = (msA / 1000).toFixed(0); //* 10
    else if (msA > 100) msA = (msA / 1000).toFixed(2) * 100;

    var ms = '' + (msA < 10 ? '0' : '') + Math.round(msA);
    var sec = '' + (Math.floor(nb / 1000 % 60) < 10 ? '0' : '') + Math.floor(nb / 1000 % 60);
    var min = '' + (Math.floor(nb / 1000 / 60) < 10 ? '0' : '') + Math.floor(nb / 1000 / 60);
    return min + ':' + sec + ':' + ms;
  };

  this.handleError = function () {
    return;
  };
};

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map