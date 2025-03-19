function Game(N, T, M, cfg = {
	gravity: 0.0035,
	jumpforce: 1.0,
	maxspeed: 0.6,
	accel: 0.2,
	magnitudex: 2,
	magnitudey: 0.2
}) {

	var game = this,
		divGame = document.getElementById('game');

	this.canvas = document.createElement('canvas')
	this.canvas.id = 'canvas'
	this.canvas.tabindex = 1
	this.canvas.innerHTML = "You browser is too old to use canvas technologies."
	divGame.appendChild(this.canvas)
	this.c = this.canvas.getContext('2d');


	this.canvas.oncontextmenu = e => e.preventDefault();
	this.canvas.width = innerWidth
	this.canvas.height = innerHeight


	this.cfg = {
		name: N || "",
		time: T || null,
		edited: false,
		cols: 32,
		rows: 32,
		scale: 64,
		oldScale: 64,
		updateArr: [[], [], [], []],
		updateAll: false,
		...cfg
	}


	this.utils = {
		rand: (min, max) => {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},

		loadImg: (obj) => {
			let img = new Image()
			img.src = obj.url
			obj.img = img
		},

		lerp: (value1, value2, amount) => {
			if (value1 === 0) return false
			amount = amount < 0 ? 0 : amount;
			amount = amount > 1 ? 1 : amount;
			const result = Number((value1 + (value2 - value1) * amount).toFixed(5))
			const diff = Math.abs(result - value2)
			return (diff.toFixed(2) == 0) ? value2 : result;
		},

		getBlock: (arr, x, y) => {
			if (!arr[y]) return false
			else if (arr[y] && !arr[y][x]) return false
			else if (!arr[y][x].collision) return false
			else return true
		},

		events: (el, list) => {
			// list =>  ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "keyup", "keydown", "wheel", "mouseleave"]
			// console.log('evenThis', el)
			el.listen = () => {
				list.forEach(evt => el.game.canvas.addEventListener(evt, el, false));
			}

			el.mute = () => {
				list.forEach(evt => el.game.canvas.removeEventListener(evt, el, false));
			}

			el.handleEvent = (evt) => {
				let handler = `on${evt.type}`;
				if (typeof el[handler] === "function") {
					evt.preventDefault();
					return el[handler](evt);
				}
			}
		},

		textSize: (c, txt) => {
			return [
				c.measureText(txt).width,
				parseInt(c.font.match(/\d+/), 10) * 0.7
			]
		},

		mouseCollision: (a, b) => {
			const aL = a.x, aR = aL + a.w, aT = a.y, aB = aT + a.h,
				bL = b.x, bT = b.y;

			if (
				aL <= bL && aR >= bL &&
				aT <= bT && aB >= bT
			) return true
			return false
		},

		catchBlockCollision: (x, y) => {
			const layerName = ['static', 'dynamic']

			let toReturn = false

			const exeptions = ['SwordSupport', 'Key']

			layerName.forEach(name => {
				const layer = game[name]
				if (!layer[y] || !layer[y][x] || !layer[y][x].collision || exeptions.includes(layer[y][x].type)) return false
				toReturn = layer[y][x]
			})

			return toReturn
		},

		load: (url, element) => {
			const req = new XMLHttpRequest();
			req.open("GET", url, false);
			req.send(null);

			element.innerHTML = req.responseText;
		},

		handleError: () => {
			return
		},

		tileManager: {

			getID: (value) => {
				const tiles = {
					0: 1,       // 
					2: 2,       // N
					8: 3,       // W 
					10: 4,      // W N
					11: 5,      // W N NW 
					16: 6,      // E
					18: 7,      // E N
					22: 8,      // E N NE
					24: 9,      // E W
					26: 10,     // E N W
					27: 11,     // E N W NW
					30: 12,     // E N W NE
					31: 13,     // E N W NW NE
					64: 14,     // S
					66: 15,     // S N
					72: 16,     // S W
					74: 17,     // S N W
					75: 18,     // S N W NW
					80: 19,     // S E
					82: 20,     // S N E
					86: 21,     // S N E NE
					88: 22,     // S W E
					90: 23,     // S N W E
					91: 24,     // S N W E NW
					94: 25,     // S N W E NE
					95: 26,     // S N W E NW NE
					104: 27,    // S W SW
					106: 28,    // S N W SW
					107: 29,    // S N W NW SW
					120: 30,    // S W E SW
					122: 31,    // S N W E SW
					123: 32,    // S N W E NW SW
					126: 33,    // S N W E NE SW
					127: 34,    // S N W E NW NE SW
					208: 35,    // S E SE
					210: 36,    // S N E SE
					214: 37,    // S N E NE SE
					216: 38,    // S W E SE
					218: 39,    // S N W E SE
					219: 40,    // S N W E NW SE 
					222: 41,    // S N W E NE SE 
					223: 42,    // S N W E NW NE SE 
					248: 43,    // S W E SW SE
					250: 44,    // S N W E SW SE
					251: 45,    // S N W E NW SW SE
					254: 46,    // S N W E NE SW SE
					255: 47     // S N W E NW NE SW SE
				}
				return tiles[value]
			},

			getValue(game, x, y, del = false, child = false) {
				const map = game.static,
					theMap = game.map;

				let tileValue = 0
				let updateArr = []

				const N = 2
				const S = 64
				const W = 8
				const E = 16

				const NW = 1
				const NE = 4
				const SW = 32
				const SE = 128

				const NSWE = [false, false, false, false]

				function checkObj(a, b, v, id, test = false) {
					if ((!map[b] || (map[b] && !map[b][a])) &&
						(theMap[b] && theMap[b][a] && theMap[b][a][1] != '1')) return

					if (map[b] && map[b][a] && map[b][a].type != 'Wall') return

					// console.log(map[b][a])
					// if(b===5 && a === 11) {
					//   if(map[b]) {
					//     console.log(map[b][a])
					//     console.log(map)
					//   }
					// }

					// console.log(map[y][b])
					if (map[b] && map[b][a] &&
						(map[b][a].empty)) return

					tileValue += v
					if (id >= 0) NSWE[id] = true;
					if (child) return
					if (!map[b] || !map[b][a]) return

					game.utils.tileManager.getValue(game, a, b, false, true)
					updateArr.push({ x: a, y: b })
				}

				checkObj(x, y - 1, N, 0)     // N
				checkObj(x, y + 1, S, 1, true)    // S
				checkObj(x - 1, y, W, 2)     // W // 24 + 64
				checkObj(x + 1, y, E, 3)    // E

				if (NSWE[0] && NSWE[2]) checkObj(x - 1, y - 1, NW)   // NW
				if (NSWE[0] && NSWE[3]) checkObj(x + 1, y - 1, NE)   // NE
				if (NSWE[1] && NSWE[2]) checkObj(x - 1, y + 1, SW)  // SW
				if (NSWE[1] && NSWE[3]) checkObj(x + 1, y + 1, SE) // SE


				if (!del) {
					// console.log(x, y, map[y][x])
					map[y][x].tile.value = tileValue
				}

				if (map[y][x]) map[y][x].editUpdate()
				return updateArr
			}
		}
	}

	this.map = "0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###"
	if (M) this.map = M

	this.firstInit = true

	this.background = []
	this.static = []
	this.dynamic = []
	this.foreground = []

	this.lastRender = null
	this.now = null
	this.resetAnimate = true

	this.Player = new Player(5, 5, 'Player1', this)

	this.Objects = {
		// MAP OBJECTS: [CLASS, ID, PURPOSE, LINK]
		Block: [Block, 0, 'background'],

		Wall: [Wall, 1, 'static'],

		BouncingBox: [BouncingBox, 2, 'static'],

		Spikes: [Spikes, 3, 'static'],

		Spawn: [Spawn, 4, 'static'],

		End: [End, 5, 'static'],

		SwordSupport: [SwordSupport, 6, 'static'],

		Sword: [Sword, 7, 'dynamic', 'SwordSupport'],

		Key: [Key, 8, 'static'],

		Door: [Door, 9, 'static'],
	}

	this.editObjects = Object.values(this.Objects).filter(o => typeof o[1] === 'number')

	this.mode = "edit"

	this.Engine = new Engine(this.c, this.cfg.cols, this.cfg.rows, this.cfg.scale)

	this.Camera = new Camera(game)

	this.assets = {
		tiles: {
			spaceGround: {
				name: "spaceGround",
				w: 8,
				h: 6,
				l: 47,
				iX: 10,
				iY: 10,
				size: 64,
				url: "./img/space-tileMap.png",
				img: null
			}
		},
		textures: {
			Spikes: {
				name: "Spikes",
				url: "./img/spikes.png",
				img: null
			},
			BouncingBox: {
				name: "BouncingBox",
				url: "./img/bouncingBox.png",
				img: null
			}
		}
	}

	this.translate = {
		x: 0,
		y: 0
	}

	this.playing = [false, false]

	this.select = {
		color: 'blue',
		brushSize: 0,
		block: null,
		tile: game.assets.tiles.spaceGround,
		layer: null
	}

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
	}

	this.window = {
		play: new PlayWindow(this),
		edit: new EditWindow(this)
	}


	this.mapInit = {
		load: function () {
			var Game = game

			if (Game.firstInit) {
				let map = Game.map.split(',')

				map.map((row, rID) => {
					map[rID] = row.split('-')
					map[rID].map((cell, cID) => {
						map[rID][cID] = cell.split('')
					})
				})

				Game.map = map
				Game.cfg.cols = map[0].length
				Game.cfg.rows = map.length
				Game.firstInit = false
			}

			for (let row = 0; row < Game.map.length; row++) {
				for (let col = 0; col < Game.map[0].length; col++) {
					const cell = Game.map[row][col]

					const layerName = ['background', 'static', 'dynamic', 'foreground']
					cell.forEach((layerValue, layerId) => {
						const mapLayer = Game[layerName[layerId]]

						if (!mapLayer[row]) mapLayer[row] = []

						const block = Game.editObjects.find(b => (b[1] == layerValue) && (b[2] == layerName[layerId]))

						if (!block) return mapLayer[row][col] = 0

						switch (block[0].name) {
							case 'Wall':
								mapLayer[row][col] = new block[0](col, row, Game)
								game.utils.tileManager.getValue(Game, col, row, false, false)
								break;

							case 'Spawn':
								Game.Player.respawn = [col, row - 1]
								mapLayer[row][col] = new block[0](col, row, Game)
								Game["background"][row][col] = new Game.Objects.Block[0](col, row, Game)
								break;

							default:
								mapLayer[row][col] = new block[0](col, row, Game)

						}
					})
				}
			}
		},

		save: function () {
			var Game = game
			var map = []

			const layerName = ['background', 'static', 'dynamic', 'foreground']
			layerName.forEach((name, id) => {
				const layer = Game[name]
				layer.forEach((row, y) => {
					if (!map[y]) map[y] = []

					row.forEach((col, x) => {
						if (!map[y][x]) map[y][x] = []
						map[y][x][id] = (col) ? col.id : '#'

					})
				})
			})

			Game.map = map
			Game.cfg.cols = map[0].length
			Game.cfg.rows = map.length
		}
	}




	// Load tiles
	for (let t in game.assets.tiles) {
		game.utils.loadImg(game.assets.tiles[t])
	}

	// Load IMG
	for (let i in game.assets.textures) {
		game.utils.loadImg(game.assets.textures[i])
	}



	this.init = function (save = false) {
		if (save) this.mapInit.save(this)

		this.mapInit.load(this)


		this.Player.init()
		this.Camera = new Camera(this)
		console.log("Lets go !")
	}


	// Display FPS / ZOOM
	let fpsCount = 0, dispFps = 0;
	const displayInfo = () => {
		fpsCount++

		game.c.beginPath()
		game.c.fillStyle = "rgba(0, 0, 0, 0.5)";
		game.c.fillRect(game.canvas.width - 80, 0, 100, 40)
		game.c.fillStyle = "white";
		game.c.font = "11px Arial";
		game.c.fillText(`ZOOM: x${(game.cfg.scale / 64).toFixed(2)}`, game.canvas.width - 75, 15);
		game.c.fillText(`FPS: ${dispFps}`, game.canvas.width - 75, 30);
		game.c.rect(0, 0, game.canvas.width, game.canvas.height)
		game.c.stroke()
		game.c.closePath()
	}

	const framePerSeconds = setInterval(() => {
		dispFps = fpsCount
		fpsCount = 0
	}, 1000)

	// Animation Loop
	let lastRender

	var reqAnim = null

	this.animate = function (time) {
		if (!time) time = 0
		const now = time

		if (game.resetAnimate) lastRender = time

		this.dt = now - lastRender;

		if (this.dt > 100) this.dt = 100

		if (game.mode === 'play') {
			game.window.play.update(this.dt)
			// console.time('check')
			game.window.play.draw()
			// console.timeEnd('check')
		}

		else if (game.mode === 'edit') game.window.edit.update()

		displayInfo()

		lastRender = time

		if (game.resetAnimate) game.resetAnimate = false
		if (game.playing[0]) reqAnim = window.requestAnimationFrame(game.animate);
	}

	this.play = () => {
		var divList = document.getElementById('mapList'),
			divGame = document.getElementById('game');
		divList.style.display = "none"
		divGame.style.display = "block"

		this.mode = 'play'
		this.init()
		this.playing = [true, true]
		this.cfg.updateAll = true
		this.resetAnimate = true

		this.window.play.start()
		this.animate()
	}

	this.edit = () => {
		var divList = document.getElementById('mapList'),
			divGame = document.getElementById('game');
		divList.style.display = "none"
		divGame.style.display = "block"

		this.mode = 'edit'
		this.init()
		this.playing = [true, true]
		this.cfg.updateAll = true

		this.window.edit.start()
		this.animate()
	}

	this.end = () => {
		this.window[this.mode].end()
		window.cancelAnimationFrame(reqAnim)
		this.canvas.parentNode.removeChild(this.canvas)

		for (el in this) {
			delete this[el]
		}
		var divList = document.getElementById('mapList'),
			divGame = document.getElementById('game');
		divList.style.display = "block"
		divGame.style.display = "none"
		reloadMaps()
	}

}


function gameMenu(game) {
	// CSS
	const head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style'),
		css = `#playMenu{position:absolute;width:0;top:0;bottom:0;left:0;background:rgba(15,15,15,.99);text-align:center;overflow:hidden;padding-top:36vh;padding-top:calc(50vh - ((7vh*4) + (10px*3))/2)}.playBtn{font-weight:bold;display:block;width:20vw;height:7vh;background:#000;color:#fff;margin:0 auto 10px auto}#timer{display:inline-block;margin:0;position:absolute;text-align:center;top:0;left:0;width:100%;padding:10px 0;color:#fff;font-size:2.3em;font-weight:700;z-index:1000}#timer>span{padding:10px 20px;background:rgba(0,0,0,.7)}`
	head.appendChild(style);
	style.type = 'text/css';
	style.id = 'stylePlay';
	if (style.styleSheet) {
		// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}


	const gameDiv = document.getElementById('game'),
		canvas = document.getElementById('canvas');

	// DISPLAY TIME
	const timer = document.createElement('p')
	timer.id = "timer"
	const timerSpan = document.createElement('span')
	timerSpan.innerHTML = "00:00:00"
	timer.appendChild(timerSpan)
	gameDiv.appendChild(timer)


	// CONTAINER
	const div = document.createElement('div')
	div.id = 'playMenu'



	// BUTTON Resume
	const btnResume = document.createElement('input')
	btnResume.id = 'btnResume'
	btnResume.type = 'button'
	btnResume.classList.add('playBtn')
	btnResume.value = 'RESUME'
	btnResume.onclick = (e) => {
		e.preventDefault()

		game.window.play.pauseTimer()
		div.style.width = 0
	}
	div.append(btnResume)



	// BUTTON Restart
	const btnRestart = document.createElement('input')
	btnRestart.id = 'btnRestart'
	btnRestart.type = 'button'
	btnRestart.classList.add('playBtn')
	btnRestart.value = 'RESTART (R)'
	btnRestart.onclick = (e) => {
		e.preventDefault()
		game.window.play.gameReset()
	}
	div.append(btnRestart)



	// BUTTON EDIT
	const btnEdit = document.createElement('input')
	btnEdit.id = 'btnEdit'
	btnEdit.type = 'button'
	btnEdit.classList.add('playBtn')
	btnEdit.value = 'EDIT MAP'
	btnEdit.onclick = (e) => {
		e.preventDefault()

		game.window.play.end()
		game.mode = 'edit'
		game.window.edit.start()

		game.init()
		game.playing = [true, true]
		game.cfg.updateAll = true
		game.canvas.focus()
		game.animate()
		game.cfg.edited = true
	}
	div.append(btnEdit)



	// BUTTON Quit
	const btnQuit = document.createElement('input')
	btnQuit.id = 'btnQuit'
	btnQuit.type = 'button'
	btnQuit.classList.add('playBtn')
	btnQuit.value = 'QUIT'
	btnQuit.onclick = (e) => {
		e.preventDefault()
		game.end()
	}
	div.append(btnQuit)




	return div
}


function toolbar(game) {
	// CSS
	const head = document.head || document.getElementsByTagName('head')[0],
		style = document.createElement('style'),
		css = `#toolbar{position:absolute;top:0;bottom:0;left:0;background:rgba(15,15,15,1);overflow:hidden;text-align:center;padding-top:20vh}#toolbar>*{margin:20px auto}.dispBlock{display:block}#playH2{margin-bottom:30px}#btnHide{position:absolute;padding:${game.canvas.height / 2 - 20}px 7px;top:0;right:0;background:#000;color:#fff;margin:0 auto;text-decoration:none}.inputSpan>input{width:15%}#selectSpan>*{display:block;margin:auto}.playBtn{border:1px solid #fff;padding:10px 20px;background:#000;font-weight:700;color:#fff;margin:auto 5px!important;cursor:pointer}#errorMsg{color:red;font-size:1.1em}`
	head.appendChild(style);
	style.type = 'text/css';
	style.id = 'styleEdit'
	if (style.styleSheet) {
		// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	// CONTAINER
	const div = document.createElement('div')
	div.id = 'toolbar'
	div.style.width = '25%'


	// HIDE
	const btnHide = document.createElement('a')
	btnHide.id = 'btnHide'
	btnHide.innerHTML = '|||'
	btnHide.href = ''
	btnHide.onclick = (e) => {
		e.preventDefault()
		const width = div.style.width.replace(/px|%/i, '')
		// e.preventDefault()
		if (width > 20) div.style.width = "20px"
		else div.style.width = '25%'
	}
	div.appendChild(btnHide)


	// TITLE
	const h2 = document.createElement('h2')
	h2.innerHTML = "SETTINGS:"
	h2.id = 'playH2'
	div.appendChild(h2)


	// INPUT NAME
	const nameSpan = document.createElement('span')
	nameSpan.innerHTML = 'Name: '
	nameSpan.classList.add('dispBlock', 'inputSpan')
	const inputName = document.createElement('input')
	inputName.type = 'text'
	inputName.maxLength = 10
	inputName.value = game.cfg.name

	inputName.onchange = function (e) {
		game.cfg.name = e.target.value;
	}


	nameSpan.appendChild(inputName)
	div.appendChild(nameSpan)


	const layerName = ['background', 'static', 'dynamic', 'foreground']
	// INPUT ROW
	const rowSpan = document.createElement('span')
	rowSpan.innerHTML = 'Row: '
	rowSpan.classList.add('dispBlock', 'inputSpan')
	const inputRows = document.createElement('input')
	inputRows.type = 'number'
	inputRows.min = 10
	inputRows.max = 500
	inputRows.value = game.cfg.rows
	inputRows.onchange = function (e) {
		let newRows = e.target.value;

		if (newRows > 500) newRows = e.target.value = 500
		else if (newRows < 10) newRows = e.target.value = 10

		layerName.forEach((name) => {
			const layer = game[name],
				map = []

			for (let j = 0; j < newRows; j++) {
				map[j] = []
				for (let i = 0; i < game.cfg.cols; i++) {
					if (name === 'background') map[j][i] = new game.Objects.Block[0](i, j, game)
					else map[j][i] = 0
				}
			}
			game[name] = map
		})

		game.cfg.rows = Number(newRows)
		game.cfg.updateAll = true
		game.translate.x = game.translate.y = 0
	}
	rowSpan.appendChild(inputRows)
	div.appendChild(rowSpan)


	// INPUT COL
	const colSpan = document.createElement('span')
	colSpan.innerHTML = 'Col: '
	colSpan.classList.add('dispBlock', 'inputSpan')
	const inputCols = document.createElement('input')
	inputCols.type = 'number'
	inputCols.min = 10
	inputCols.max = 1000
	inputCols.value = game.cfg.cols
	inputCols.onchange = function (e) {
		let newCols = e.target.value


		if (newCols > 500) newCols = e.target.value = 1000
		else if (newCols < 10) newCols = e.target.value = 10


		layerName.forEach((name) => {
			const layer = game[name]

			let map = []

			for (let j = 0; j < game.cfg.rows; j++) {
				map[j] = []
				for (let i = 0; i < newCols; i++) {
					if (layer[j][i]) map[j][i] = layer[j][i]
					else {
						if (name === 'background') map[j][i] = new game.Objects.Block[0](i, j, game)
						else map[j][i] = 0
					}
				}
			}

			game[name] = map
		})

		game.cfg.cols = Number(newCols)
		game.cfg.updateAll = true
		game.translate.x = game.translate.y = 0
	}
	colSpan.appendChild(inputCols)
	div.appendChild(colSpan)


	// SELECT LAYER
	const layerType = ['background', 'static', 'dynamic', 'foreground'],
		layerBlock = document.createElement('select')
	layerBlock.id = 'layerBlock'

	for (var i = 0; i < layerType.length; i++) {
		const option = document.createElement("option")
		option.value = layerType[i]
		option.text = layerType[i]
		layerBlock.appendChild(option)
	}


	layerBlock.value = 'static'
	game.select.layer = 'static'

	layerBlock.style.display = 'block'
	layerBlock.onchange = (e) => {
		const id = e.target.selectedIndex,
			value = e.target[id].value
		game.select.layer = value

		document.dispatchEvent(refreshBlockType);
	}
	const layerSpan = document.createElement('span')
	layerSpan.innerHTML = 'Layer '
	layerSpan.classList.add('dispBlock')
	layerSpan.id = 'selectSpan'
	layerSpan.appendChild(layerBlock)
	div.appendChild(layerSpan)


	// SELECT BLOCK
	const selectSpan = document.createElement('span')
	selectSpan.classList.add('dispBlock')
	selectSpan.id = 'selectSpan'
	div.appendChild(selectSpan)




	function makeBlockSelect() {
		selectSpan.innerHTML = 'Block Type: '

		const selectBlock = document.createElement('select')
		selectBlock.id = 'selectBlock'


		const hasSpawn = typeExist('Spawn', game.static),
			hasEnd = typeExist('End', game.static);

		let option = document.createElement("option")
		selectBlock.appendChild(option)
		for (var i = 0; i < game.editObjects.length; i++) {
			const obj = game.editObjects[i],
				layer = game.select.layer;


			if (obj.name === 'Block') continue

			if (obj[2] != layer) continue

			option = document.createElement("option")
			option.value = obj[0].name
			option.text = obj[0].name
			if (obj[0].name === "Spawn" && hasSpawn) option.disabled = true
			else if (obj[0].name === "End" && hasEnd) option.disabled = true
			selectBlock.appendChild(option)
		}

		selectBlock.style.display = 'block'
		selectBlock.onchange = (e) => {
			const id = e.target.selectedIndex,
				value = e.target[id].value
			game.select.block = game.Objects[value]
		}

		selectSpan.appendChild(selectBlock)
	}

	window.refreshBlockType = new Event('refreshBlockType');
	document.addEventListener('refreshBlockType', makeBlockSelect, false);

	document.dispatchEvent(refreshBlockType);


	// BLOCK PARAMS


	// LOAD MAP
	const loadMap = document.createElement('input')
	loadMap.type = 'text'
	//div.appendChild(loadMap)


	// BUTTON PLAY
	const btnPlay = document.createElement('input')
	btnPlay.type = 'button'
	btnPlay.value = 'Play'
	btnPlay.classList.add('playBtn')
	btnPlay.onclick = (e) => {
		// e.preventDefault()

		const hasSpawn = typeExist('Spawn', game.static),
			hasEnd = typeExist('End', game.static);

		if (!hasSpawn || !hasEnd) {
			return errorMsg.innerHTML = `You can't play without ${(!hasSpawn) ? 'Spawn' : 'End'} block !`
		}

		game.window[game.mode].end()
		game.mode = 'play'


		game.init(true)
		game.cfg.updateAll = true
		game.canvas.focus()
		game.window.play.resetTimer()
		game.Player.hide = false
		if (!game.playing[0]) {
			game.playing[0] = true
			game.resetAnimate = true
			game.animate()
		}
		game.window.play.start()
	}
	div.appendChild(btnPlay)




	// BUTTON SAVE
	const btnSave = document.createElement('input')
	btnSave.type = 'button'
	btnSave.value = 'Save'
	btnSave.classList.add('playBtn')
	btnSave.onclick = (e) => {
		// e.preventDefault();

		if (!game.cfg.name) return errorMsg.innerHTML = `You forgot to set the name !`


		const hasSpawn = typeExist('Spawn', game.static),
			hasEnd = typeExist('End', game.static);

		if (!hasSpawn || !hasEnd) {
			return errorMsg.innerHTML = `You can't save without ${(!hasSpawn) ? 'Spawn' : 'End'} block !`
		}

		let str = ''

		var mapTest = game.static,
			cols = mapTest[0].length,
			rows = mapTest.length;

		for (let row = 0; row < mapTest.length; row++) {
			for (let col = 0; col < mapTest[0].length; col++) {
				layerName.forEach((name, id) => {
					const layer = game[name]
					if (!layer[row][col]) str += '#'
					else str += layer[row][col].id
				})

				str += (col + 1 < mapTest[0].length) ? '-' : ''
			}

			str += (row + 1 < mapTest.length) ? ',' : ''
		}



		var saveReq = new XMLHttpRequest();
		saveReq.onloadend = () => {
			return
		};
		saveReq.open('POST', '/saveMap', true);
		saveReq.setRequestHeader("Content-type", "application/json");
		saveReq.send(JSON.stringify({ name: game.cfg.name, cols: game.cfg.cols, rows: game.cfg.rows, data: str }));

		// copyToClipboard(str)
		// alert('The map has been copied on your clipboard');
	}
	div.appendChild(btnSave)



	const errorMsg = document.createElement('span')
	errorMsg.classList.add('dispBlock')
	errorMsg.id = 'errorMsg'
	div.appendChild(errorMsg)




	return div


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
		result.type = obj.type
		if (obj.tile) {
			result.tile = {}
			result.tile.name = obj.tile.name
			result.tile.value = obj.tile.value
		}
		return result;
	}

	function typeExist(type, map) {
		if (!map) {
			console.error("No map:", map)
			console.error("Type:", type)
			return false
		}
		for (let row = 0; row < map.length; row++) {
			if (map[row].some(cell => cell.type === type)) return true
		}
	}
}
