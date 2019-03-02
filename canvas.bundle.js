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

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _objects = __webpack_require__(/*! ./objects */ "./src/objects.js");

var _objects2 = _interopRequireDefault(_objects);

var _tiles = __webpack_require__(/*! ./json/tiles */ "./src/json/tiles.json");

var _tiles2 = _interopRequireDefault(_tiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var gameDiv = document.getElementById('game');
var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
canvas.oncontextmenu = function (e) {
    return e.preventDefault();
};
canvas.width = 800;
canvas.height = 600;

// Game
var Game = new _objects2.default.Game(c);
Game.assets.tiles = _tiles2.default;
Game.select.tile = Game.assets.tiles.landscape;
Game.cfg.scale = 64;
Game.cfg.cols = 32;
Game.cfg.rows = 32;
Game.translate.y = -(Game.cfg.rows * Game.cfg.scale) + canvas.height;
// Game.engine = new Engine()
// Load tiles IMG
for (var t in Game.assets.tiles) {
    _utils2.default.loadTiles(Game.assets.tiles[t]);
}

// Player
var Player = new _objects2.default.Player(c, Game, 11, 19, 64, 64, 'James');

// Toolbar
var elUI = (0, _toolbar2.default)(Game);
gameDiv.append(elUI);
elUI = null;

// Implementation
Game.init = function () {
    // Listeners
    (0, _gameListeners2.default)(canvas, Game);
    (0, _playerListeners2.default)(Player, Game);

    Game.map = __webpack_require__(/*! ./json/map */ "./src/json/map.json");

    if (!Game.map) {
        Game.map = [];
        for (var row = 0; row < Game.cfg.rows; row++) {
            Game.map[row] = [];
            for (var col = 0; col < Game.cfg.cols; col++) {
                Game.map[row][col] = new _objects2.default.Rectangle(c, col, row);
            }
        }
    } else {
        for (var _row = 0; _row < Game.map.length; _row++) {
            for (var _col = 0; _col < Game.map[0].length; _col++) {
                if (Game.map[_row][_col]) {
                    var obj = new _objects2.default[Game.map[_row][_col].type](c, _col, _row);
                    Game.map[_row][_col] = Object.assign(obj, Game.map[_row][_col]);
                } else {
                    // Game.map[row][col] = new Objects.Rectangle(c, col, row);
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
    counter = 0;
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
    c.fillText('ZOOM: x' + (Game.cfg.scale / 32).toFixed(2), canvas.width - 75, 15);
    c.fillText('FPS: ' + Math.round(counter / time_el), canvas.width - 75, 30);
    c.rect(0, 0, canvas.width, canvas.height);
    c.stroke();
    c.closePath();
};

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

        var separator = ' ';
        for (var i = 0; i < 52 - counter.toString().length; i++) {
            separator += '-';
        }
        // console.log('\n\n' + counter + separator)

        then = now - delta % interval;

        // console.time('frame')
        Game.cfg.updateAll = true;
        c.clearRect(0, 0, canvas.width, canvas.height); // if (Game.cfg.updateAll)

        c.beginPath();
        c.rect(0, 0, canvas.width, canvas.height);
        c.fillStyle = 'cyan';
        c.fill();
        c.closePath();

        c.save();
        c.translate(Game.translate.x, Game.translate.y);

        Game.update(canvas, Player);

        Player.update();
        // console.timeEnd('frame')

        // Camera


        var tx = -Player.getHalfWidth() + canvas.width / 2,
            ty = -Player.getHalfHeight() + canvas.height / 2;

        if (Player.getHalfWidth() <= canvas.width / 2) tx = 0;else if (Player.getHalfWidth() >= mapWidth - canvas.width / 2) tx = -halfMapWidth;
        if (Player.getHalfHeight() <= canvas.height / 2) ty = 0;
        if (Player.getHalfHeight() >= mapHeight - canvas.height / 2) ty = -halfMapHeight;

        Game.translate.x = tx;
        Game.translate.y = ty;

        c.restore();

        displayInfo();
    }
};

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
        if (!game.playing[0]) return;

        game.mouse.x = e.clientX;
        game.mouse.y = e.clientY;

        game.mouse.gridX = Math.floor((game.mouse.x - game.translate.x) / game.cfg.scale);
        game.mouse.gridY = Math.floor((game.mouse.y - game.translate.y) / game.cfg.scale);
        if (!game.mouse.left && !game.mouse.right && !game.mouse.middle.click) return;

        if (game.mouse.middle.click) game.checkForClicks();
        if (game.mouse.gridX === game.mouse.last.gridX && game.mouse.gridY === game.mouse.last.gridY && game.mouse.click === game.mouse.last.click) return;
        game.checkForClicks();
    });

    canvas.addEventListener('resize', function () {
        if (!game.playing[0]) return;

        game.c.width = innerWidth;
        game.c.height = innerHeight;

        init();
    });

    canvas.addEventListener('mouseleave', function (e) {
        if (!game.playing[0]) return;

        game.mouse.left = false;
        game.mouse.right = false;
        game.mouse.middle = {
            click: false,
            x: null,
            y: null
        };
    });

    canvas.addEventListener("wheel", function (e) {

        var cx = game.mouse.x / game.cfg.scale | 0,
            cy = game.mouse.y / game.cfg.scale | 0;
        console.log(game.map[cy][cx]);
        return;
        if (!game.playing[0]) return;
        var zoomTo = e.wheelDelta > 0 ? 4 : -4;

        if (8 <= game.cfg.scale + zoomTo && game.cfg.scale + zoomTo <= 96) {
            game.translate.x = game.mouse.x - (game.mouse.x - game.translate.x) / game.cfg.scale * (game.cfg.scale + zoomTo);
            game.translate.y = game.mouse.y - (game.mouse.y - game.translate.y) / game.cfg.scale * (game.cfg.scale + zoomTo);
            game.cfg.scale += zoomTo;
            game.cfg.updateAll = true;
        }
    });

    canvas.addEventListener('mousedown', function (e) {
        if (!game.playing[0]) return;

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
        if (!game.playing[0]) return;

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

module.exports = [[{"type":"Rectangle","x":0,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":16,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":17,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":18,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":19,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":0,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Rectangle","x":14,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":15,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":16,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":17,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":18,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":19,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":20,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":21,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":22,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":23,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":24,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":25,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":26,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":27,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":1,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":27,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":28,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":29,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":30,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":31,"y":2,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Rectangle","x":2,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":3,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":4,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":5,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":6,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":7,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":8,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":9,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":10,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":11,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":12,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":13,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":30,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":31,"y":3,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":4,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":4,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":12,"y":4,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":13,"y":4,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":30,"y":4,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":31,"y":4,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":12,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":13,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":28,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":29,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":30,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":31,"y":5,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":12,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":13,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,{"type":"Rectangle","x":18,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":0,"id":0,"x":0,"y":0},"collision":true},0,0,0,{"type":"Rectangle","x":22,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":0,"id":0,"x":0,"y":0},"collision":true},0,0,0,{"type":"Rectangle","x":26,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":6,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":12,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":13,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":7,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":2,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":8,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":9,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":3,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,{"type":"Rectangle","x":6,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Rectangle","x":7,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":216,"id":37,"x":370,"y":296},"collision":true},{"type":"Rectangle","x":8,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":9,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":10,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":11,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":12,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":13,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":14,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":15,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":16,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":10,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,{"type":"Rectangle","x":7,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":8,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":9,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":10,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":11,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":12,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":13,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":14,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":15,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":16,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":27,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":11,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":4,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":26,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":27,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":28,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":29,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":12,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":28,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":29,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":30,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":13,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":5,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":29,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":30,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":14,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":29,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":30,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":31,"y":15,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":6,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":7,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,{"type":"Rectangle","x":10,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":16,"id":5,"x":370,"y":0},"collision":true},{"type":"Rectangle","x":11,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,0,{"type":"Rectangle","x":15,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":17,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":18,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":19,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":20,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":21,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":22,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":23,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":24,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":25,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":26,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,{"type":"Rectangle","x":30,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":31,"y":16,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":17,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":18,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":19,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,{"type":"Rectangle","x":30,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":31,"y":17,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":17,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":18,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":19,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Rectangle","x":20,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":21,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":22,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":23,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":24,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":25,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":26,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":27,"id":10,"x":148,"y":74},"collision":true},{"type":"Rectangle","x":27,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,{"type":"Rectangle","x":30,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":31,"y":18,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":17,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":18,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":19,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":30,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":31,"y":19,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Rectangle","x":3,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":4,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":5,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":223,"id":41,"x":74,"y":370},"collision":true},{"type":"Rectangle","x":6,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":16,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":17,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":18,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":19,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":29,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":30,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":31,"y":20,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":5,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":6,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":7,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,{"type":"Rectangle","x":15,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":22,"id":7,"x":518,"y":0},"collision":true},{"type":"Rectangle","x":16,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":17,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":18,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":31,"id":12,"x":296,"y":74},"collision":true},{"type":"Rectangle","x":19,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,{"type":"Rectangle","x":28,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":29,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":30,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":21,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":127,"id":33,"x":74,"y":296},"collision":true},{"type":"Rectangle","x":2,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":11,"id":4,"x":296,"y":0},"collision":true},0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,{"type":"Rectangle","x":27,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":28,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":29,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":22,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,{"type":"Rectangle","x":10,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":11,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":12,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,0,0,0,0,0,0,{"type":"Rectangle","x":21,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":22,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":23,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":24,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":25,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":26,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":27,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":28,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":23,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,{"type":"Rectangle","x":5,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":6,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":7,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":8,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,{"type":"Rectangle","x":10,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":11,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,0,0,0,0,0,{"type":"Rectangle","x":21,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":22,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":24,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":123,"id":31,"x":518,"y":222},"collision":true},{"type":"Rectangle","x":2,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":8,"id":2,"x":148,"y":0},"collision":true},0,0,{"type":"Rectangle","x":5,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":6,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":9,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":10,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":11,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":13,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":14,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":15,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":20,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":21,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":22,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":25,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,0,{"type":"Rectangle","x":5,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":6,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":26,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":4,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":208,"id":34,"x":148,"y":296},"collision":true},{"type":"Rectangle","x":5,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":6,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":27,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":2,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":104,"id":26,"x":148,"y":222},"collision":true},0,{"type":"Rectangle","x":4,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":5,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":28,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":251,"id":44,"x":296,"y":370},"collision":true},{"type":"Rectangle","x":3,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":248,"id":42,"x":148,"y":370},"collision":true},{"type":"Rectangle","x":4,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":254,"id":45,"x":370,"y":370},"collision":true},{"type":"Rectangle","x":5,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":29,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":30,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}],[{"type":"Rectangle","x":0,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":1,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":2,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":3,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":4,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":5,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":6,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":7,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":8,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":9,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":10,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":11,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":12,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":13,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":14,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":15,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":107,"id":28,"x":296,"y":222},"collision":true},0,0,{"type":"Rectangle","x":18,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":214,"id":36,"x":296,"y":296},"collision":true},{"type":"Rectangle","x":19,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":20,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":21,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":22,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":23,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":24,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":25,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":26,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":27,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":28,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":29,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":30,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false},{"type":"Rectangle","x":31,"y":31,"color":"white","empty":false,"tile":{"name":"landscape","value":255,"id":46,"x":444,"y":370},"collision":false}]];

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
  Game: __webpack_require__(/*! ./objects/game */ "./src/objects/game.js"),

  Rectangle: __webpack_require__(/*! ./objects/rectangle */ "./src/objects/rectangle.js"),

  Player: __webpack_require__(/*! ./objects/player */ "./src/objects/player.js")
};

/***/ }),

/***/ "./src/objects/game.js":
/*!*****************************!*\
  !*** ./src/objects/game.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tilesManager = __webpack_require__(/*! ../tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (ctx) {
  var _this = this;

  this.c = ctx;

  this.map = null;

  this.cfg = {
    name: "default",
    cols: null,
    rows: null,
    scale: null,
    updateArr: [],
    updateAll: false,
    gravity: 0.98
  };

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

    // FUNCTIONS
  };this.checkForClicks = function () {
    var gridX = _this.mouse.gridX;
    var gridY = _this.mouse.gridY;

    _this.mouse.last.gridX = gridX;
    _this.mouse.last.gridY = gridY;

    var DrawPixel = function DrawPixel(a, b) {
      if (!_this.map[b] || _this.map[b] && !_this.map[b][a]) return;

      if (!_this.map[b][a].tile || _this.map[b][a].tile && _this.assets.tiles[_this.map[b][a].tile.name] != _this.select.tile.name) {
        var _cfg$updateArr;

        _this.map[b][a].empty = false;
        _this.map[b][a].tile = {};
        _this.map[b][a].tile.name = _this.select.tile.name, (_cfg$updateArr = _this.cfg.updateArr).push.apply(_cfg$updateArr, _toConsumableArray(_tilesManager2.default.getValue(_this, gridX, gridY, false, false)));
        _this.cfg.updateArr.push({ x: a, y: b });
      }
      //else map[b][a].color = (mouse.left) ? theColor : 'white'
    };

    if (_this.mouse.right) {
      var _cfg$updateArr2;

      //return console.log(this.map[gridY][gridX])
      _this.mouse.last.click = 'right';
      if (!_this.map[gridY] || _this.map[gridY] && !_this.map[gridY][gridX]) return;
      _this.map[gridY][gridX].empty = true;
      _this.map[gridY][gridX].collision = false;
      (_cfg$updateArr2 = _this.cfg.updateArr).push.apply(_cfg$updateArr2, _toConsumableArray(_tilesManager2.default.getValue(_this, gridX, gridY, true, false)));
      _this.cfg.updateArr.push({ x: gridX, y: gridY });
    }

    if (_this.mouse.left) {
      _this.mouse.last.click = 'left';

      DrawPixel(gridX, gridY);
    }
    if (_this.mouse.middle.click) {
      _this.mouse.last.click = 'middle';
      _this.translate.x += _this.mouse.x - _this.mouse.middle.x;
      _this.translate.y += _this.mouse.y - _this.mouse.middle.y;
      _this.mouse.middle.x = _this.mouse.x;
      _this.mouse.middle.y = _this.mouse.y;
      _this.cfg.updateAll = true;
    }
  };

  this.update = function (canvas, p) {
    if (_this.cfg.updateAll) {
      var scale = _this.cfg.scale;
      var tX = _this.translate.x;
      var tY = _this.translate.y;

      // const canvasCols = Math.ceil(canvas.width / scale)
      // const canvasRows = Math.ceil(canvas.height / scale)
      // const xStart = (Math.floor((tX / scale) * -1) > 0) ? Math.floor((tX / scale) * -1) : 0
      // const yStart = (Math.floor((tY / scale) * -1) > 0) ? Math.floor((tY / scale) * -1) : 0

      // for(let y = yStart; y < canvasRows + yStart+1; y++) {
      //   for(let x = xStart; x < canvasCols + xStart+1; x++) {
      //     if(!this.map[y]) continue
      //     if(!this.map[y][x]) continue
      //     this.map[y][x].draw(this)
      //     //if(this.map[y][x].collision && p) p.check(this, this.map[y][x])
      //   }
      // }
      for (var y = 0; y < _this.map.length; y++) {
        for (var x = 0; x < _this.map[0].length; x++) {
          if (!_this.map[y]) continue;
          if (!_this.map[y][x]) continue;
          _this.map[y][x].draw(_this);
          //if(this.map[y][x].collision && p) p.check(this, this.map[y][x])
        }
      }

      _this.cfg.updateAll = false;
    } else if (_this.cfg.updateArr.length > 0) {
      for (var i = 0; i < _this.cfg.updateArr.length; i++) {
        _this.map[_this.cfg.updateArr[i].y][_this.cfg.updateArr[i].x].draw(_this);
      }

      _this.cfg.updateArr = [];
    }
  };
};

/***/ }),

/***/ "./src/objects/player.js":
/*!*******************************!*\
  !*** ./src/objects/player.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ../utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (c, game, x, y, w, h) {
  var _this = this;

  var name = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 'Tom';

  this.type = 'Player';
  this.color = 'brown';
  this.name = name;

  this.w = w;
  this.h = h;
  this.cw = h / game.cfg.scale | 0;
  this.ch = h / game.cfg.scale | 0;
  this.x = x * game.cfg.scale + (game.cfg.scale / 2 - w / 2);
  this.y = y * game.cfg.scale;

  this.dx = 0;
  this.dy = 0;
  this.accel = 0.5;
  this.maxSpeed = 10;
  this.jumpForce = 0;
  this.vel = 0;
  this.mass = 1;
  this.gravity = this.mass * 0.98;

  this.getLeft = function () {
    return _this.x;
  };

  this.getRight = function () {
    return _this.x + _this.w;
  };

  this.getTop = function () {
    return _this.y;
  };

  this.getBottom = function () {
    return _this.y + _this.h;
  };

  this.getHalfWidth = function () {
    return _this.x + _this.w / 2;
  };

  this.getHalfHeight = function () {
    return _this.y + _this.h / 2;
  };

  this.isOnFloor = false;

  this.keys = {
    'ArrowLeft': false, // LEFT
    'ArrowUp': false, // UP
    'ArrowRight': false, // RIGHT
    'ArrowDown': false // DOWN
  };

  this.draw = function () {
    c.beginPath();
    c.rect(_this.x, _this.y, _this.w, _this.h);
    c.fillStyle = _this.color;
    c.fill();
    c.closePath();

    // c.beginPath()
    // c.arc(this.cx, this.cy, 3, 0, 2 * Math.PI)
    // c.fillStyle = 'red'
    // c.fill()
    // c.closePath()
  };

  this.jump = function () {
    if (!_this.isOnFloor) return;
    _this.dy = -16;
    _this.isOnFloor = false;
  };

  this.canMove = {
    left: true,
    right: true,
    up: true,
    down: true,
    actor: this,
    clear: function clear() {
      this.left = true;
      this.right = true;
      this.up = true;
      this.down = true;
    },
    check: function check() {
      this.clear();

      var scale = game.cfg.scale,
          x = this.actor.x,
          y = this.actor.y,
          cx = x / scale | 0,
          cy = y / scale | 0;

      if (x % scale === 0) {
        if (_utils2.default.getBlock(game.map, cx - 1, cy)) {
          this.left = false;
        }
        // else if(y % scale !== 0 && fn.getBlock(game.map, cx-1, cy +1)){
        //   this.left = false;
        // }

        if (_utils2.default.getBlock(game.map, cx + 1, cy)) {
          this.right = false;
        }
        // else if(y % scale !== 0 && fn.getBlock(game.map, cx+1, cy +1)){
        //   this.right = false;
        // }
      }
      if (y % scale === 0) {
        if (_utils2.default.getBlock(game.map, cx, cy - 1)) {
          this.up = false;
        }
        // else if(x % scale !== 0 && fn.getBlock(game.map, cx+1, cy -1)){
        //   this.up = false;
        // }

        if (_utils2.default.getBlock(game.map, cx, cy + 1)) {
          this.down = false;
        }
        // else if(x % scale !== 0 && fn.getBlock(game.map, cx+1,cy +1)){
        //   this.down = false;
        // }
      }
      // console.log(this.actor.canMove)
    }
  };

  this.actions = function () {
    _this.isIdle = true;

    if (_this.keys.ArrowLeft && _this.canMove.left) {
      _this.dx = Math.max(_this.dx - _this.accel, -_this.maxSpeed);
      _this.isIdle = false;
    }

    if (_this.keys.ArrowRight && _this.canMove.right) {
      _this.dx = Math.min(_this.dx + _this.accel, _this.maxSpeed);
      _this.isIdle = false;
    }

    if (_this.keys.ArrowUp && _this.canMove.up) {
      _this.jump();
    }

    // if (this.keys.ArrowDown && this.canMove.down)
    // {
    //     // Something
    // }
  };

  this.cx = this.x + this.w / 2;
  this.cy = this.y + this.h / 2;

  this.update = function () {
    this.canMove.check();
    this.actions();

    var scale = game.cfg.scale,
        dy = this.dy,
        dx = this.dx,
        x = this.x,
        y = this.y,
        ph = this.h,
        pw = this.w,
        xx = x + dx,
        yy = y + dy,
        cx = (x + pw / 2) / scale | 0,
        cy = (y + ph / 2) / scale | 0;

    var speed = Math.sqrt(dx * dx + dy * dy);

    //game.map[cy][cx].strokeStyle = 'red'

    if (dy > 0) this.isOnFloor = false;

    // GRAVITY AND FRICTIONS
    this.dy += dy < 0 ? 0.98 : 1.3;
    if (this.isIdle) {
      var friction = this.isOnFloor ? 0.3 : 0.07;
      this.dx = _utils2.default.lerp(dx, 0, friction);
    }

    var checkCollision = function checkCollision(ox, oy) {
      if (!_utils2.default.getBlock(game.map, ox, oy)) return false;

      var px1 = xx,
          px2 = xx + pw,
          py1 = yy,
          py2 = yy + ph,
          ox1 = ox * scale,
          ox2 = ox * scale + scale,
          oy1 = oy * scale,
          oy2 = oy * scale + scale;

      var bool = false;

      if (px2 > ox1 && px1 < ox2 && py2 > oy1 && py1 < oy2) bool = true;

      // if(bool) {}
      return bool;
    };

    var isCollidingRight = checkCollision(cx + 1, cy),
        isCollidingLeft = checkCollision(cx - 1, cy),
        isCollidingDown = dy > 0 ? checkCollision(cx, cy + 1) : null,
        isCollidingTop = dy < 0 ? checkCollision(cx, cy - 1) : null,
        isCollidingDownLeft = dy > 0 ? checkCollision(cx - 1, cy + 1) : null,
        isCollidingDownRight = dy > 0 ? checkCollision(cx + 1, cy + 1) : null,
        isCollidingTopLeft = dy < 0 ? checkCollision(cx - 1, cy - 1) : null,
        isCollidingTopRight = dy < 0 ? checkCollision(cx + 1, cy - 1) : null;

    if (dy > 0 && (isCollidingDown || !isCollidingDown && isCollidingDownLeft && !isCollidingLeft || !isCollidingDown && isCollidingDownRight && !isCollidingRight)) {
      this.y = (cy + 1) * scale - ph;
      this.dy = dy = 0;
      this.isOnFloor = true;
      // console.log('>> Down')
    }

    if (dy < 0 && (isCollidingTop || !isCollidingTop && isCollidingTopLeft && !isCollidingLeft || !isCollidingTop && isCollidingTopRight && !isCollidingRight)) {
      this.y = (cy - 1) * scale + ph;
      this.dy = dy = 0;
      // console.log('>> Top')
    }

    if (dx < 0 && isCollidingLeft) {
      this.x = (cx - 1) * scale + pw;
      this.dx = dx = 0;
      // console.log('>> Left')
    }

    if (dx > 0 && isCollidingRight) {
      this.x = (cx + 1) * scale - pw;
      this.dx = dx = 0;
      // console.log('>> Right')
    }

    this.x += dx;
    this.y += dy;

    this.draw();
  };
};

/***/ }),

/***/ "./src/objects/rectangle.js":
/*!**********************************!*\
  !*** ./src/objects/rectangle.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _tilesManager = __webpack_require__(/*! ../tilesManager */ "./src/tilesManager.js");

var _tilesManager2 = _interopRequireDefault(_tilesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (c, x, y) {
  var _this = this;

  this.type = 'Rectangle';
  this.x = x;
  this.y = y;
  this.w = 32;
  this.h = 32;
  this.color = 'white';
  this.strokeStyle = 'gray';
  this.empty = true;
  this.tile = null;
  this.collision = false;

  this.getLeft = function () {
    return _this.x;
  };

  this.getTop = function () {
    return _this.y;
  };

  this.getRight = function () {
    return _this.x + _this.w;
  };

  this.getBottom = function () {
    return _this.y + _this.h;
  };

  this.draw = function (game) {
    if (!this.tile) {
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
  };

  this.update = function (game) {
    if (this.tile) {
      this.collision = this.tile.value < 255 ? true : false;
      var v = _tilesManager2.default.getID(this.tile.value);
      this.tile.id = v === 0 ? 0 : v - 1;

      var _x = this.tile.id % game.assets.tiles[this.tile.name].w;
      var _y = Math.floor(this.tile.id / game.assets.tiles[this.tile.name].w);

      this.tile.x = _x * game.assets.tiles[this.tile.name].size + _x * game.assets.tiles[this.tile.name].iX;
      this.tile.y = _y * game.assets.tiles[this.tile.name].size + _y * game.assets.tiles[this.tile.name].iY;
    }
  };

  this.check = function (g, p) {
    if (!this.collision) return;

    if (p.x > this.x && p.x < this.x + g.cfg.scale && p.y > this.y && p.y < this.y + g.cfg.scale) {
      p.x = this.x - p.w;
    }
  };
};

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
    if (!game.playing[0]) return;
    if (!p.keys.hasOwnProperty(e.key)) return;
    e.preventDefault();
    p.keys[e.key] = true;
  });

  document.addEventListener('keyup', function (e) {
    if (!game.playing[0]) return;
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
    var result = value1 + (value2 - value1) * amount;
    return result.toFixed(0) != 0 ? result : 0;
  },

  getBlock: function getBlock(arr, x, y) {
    if (!arr[y]) return false;else if (arr[y] && !arr[y][x]) return false;else if (!arr[y][x].collision) return false;else return true;
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