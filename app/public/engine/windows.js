class PlayWindow {
    constructor(game) {
        this.game = game
        this.list = ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup", "keyup", "keydown"] //, "wheel" , "mouseleave"

        this.startTime = 0
        this.endTime = 0
        this.pauseStart = 0
        this.timer = 0
        this.dt = 0
    }

    update(dt) {
        // console.time('check')
        const game = this.game
        if (!game.playing[1]) return

        this.dt = dt


        const cfg = game.cfg,
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

        const offMap = 20,
            gridTX = Math.floor((tX / scale)) * -1,
            gridTY = Math.floor((tY / scale)) * -1,
            gridCWidth = Math.ceil(cWidth / scale),
            gridCHeight = Math.ceil(cHeight / scale),

            colStart = (gridTX - offMap > 0) ? gridTX - offMap : 0,
            rowStart = (gridTY - offMap > 0) ? gridTY - offMap : 0,

            colEnd = (gridTX + gridCWidth + offMap >= colMax) ? colMax : gridTX + gridCWidth + offMap,
            rowEnd = (gridTY + gridCHeight + offMap >= rowMax) ? rowMax : gridTY + gridCHeight + offMap;

        // console.log([{colStart, colEnd, result: colEnd-colStart}, {rowStart, rowEnd, result: rowEnd-rowStart}])

        // console.log(rowEnd, rowStart)
        Engine.create(colEnd - colStart, rowEnd - rowStart, scale, offMap, tX, tY)


        if (!Player.isDead && !Player.hide) {
            Player.move(dt)
            Engine.insert(Player)
        }

        const layerName = ['static', 'dynamic']
        layerName.map(name => {
            const layer = game[name]

            for (let y = rowStart; y < rowEnd; y++) {
                for (let x = colStart; x < colEnd; x++) {
                    if (!layer[y] || !layer[y][x]) continue

                    const cell = layer[y][x]
                    if (cell.empty || !cell.collision) continue

                    cell.update(dt)
                    Engine.insert(cell)
                }
            }
        })

        // Test block
        // this.Block = new game.Objects.Wall(10.628, 6, game)
        // this.Block.tile.value = 2
        // this.Block.update()
        // Engine.insert(this.Block)

        Engine.checkCells()
        Player.update(dt)

        this.timer = Date.now() - this.startTime
        // console.timeEnd('check')
    }


    draw() {
        const game = this.game
        if (!game.playing[1]) return


        const cfg = game.cfg,
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
        c.clearRect(0, 0, canvas.width, canvas.height)

        game.Camera.update()

        c.save()
        c.translate(tX, tY)

        const offMap = 1,
            gridTX = Math.floor((tX / scale)) * -1,
            gridTY = Math.floor((tY / scale)) * -1,
            gridCWidth = Math.ceil(cWidth / scale),
            gridCHeight = Math.ceil(cHeight / scale),

            colStart = (gridTX - offMap > 0) ? gridTX - offMap : 0,
            rowStart = (gridTY - offMap > 0) ? gridTY - offMap : 0,

            colEnd = (gridTX + gridCWidth + offMap >= colMax) ? colMax : gridTX + gridCWidth + offMap,
            rowEnd = (gridTY + gridCHeight + offMap >= rowMax) ? rowMax : gridTY + gridCHeight + offMap;

        const layerName = ['background', 'static', 'dynamic', 'foreground']
        layerName.map(name => {
            const layer = game[name]

            if (name === 'dynamic') Player.draw()

            for (let y = rowStart; y < rowEnd; y++) {
                for (let x = colStart; x < colEnd; x++) {
                    if (!layer[y] || (layer[y] && !layer[y][x])) continue

                    const cell = layer[y][x]
                    if (cell.empty) continue

                    //if (!cell.collision) cell.update()
                    //if (cell.type === "Block") return
                    cell.draw()
                }
            }
        })

        // Test block
        // this.Block.draw()

        c.restore()

        this.displayTimer()
    }

    startTimer() {
        this.startTime = Date.now()
        this.game.Player.hide = false
    }

    pauseTimer() {
        if (!this.game.playing[0]) {
            if (this.startTime) this.startTime -= this.pauseStart - Date.now()
            this.game.playing[0] = true
            this.game.resetAnimate = true
            this.game.animate()
            console.log('Play')
        } else {
            this.pauseStart = Date.now()
            this.game.playing[0] = false
            console.log('Pause')
        }
        this.game.canvas.focus()
    }

    resetTimer() {
        this.startTime = 0
        this.endTime = 0
        this.pauseStart = 0
    }

    endTimer() {
        this.endTime = Date.now() - this.startTime
        this.game.Player.hide = true
        console.log(getTime(this.endTime))

        if ((this.game.cfg.time != null && this.endTime >= this.game.cfg.time) || this.game.cfg.edited) return

        var scoreReq = new XMLHttpRequest();
        scoreReq.open('POST', '/scoreMap', true);
        scoreReq.setRequestHeader("Content-type", "application/json");
        scoreReq.send(JSON.stringify({ name: this.game.cfg.name, time: this.endTime }));
        reloadMaps()
    }


    displayTimer() {
        const game = this.game,
            canvas = game.canvas,
            c = game.c,
            rectWidth = 300,
            rectHeight = 50;

        let time = (this.endTime > 0) ? this.endTime : this.timer;
        if (this.startTime === 0) time = 0
        const str = getTime(time),
            timer = document.getElementById('timer');
        if (!timer) return
        timer.children[0].innerHTML = str
    }

    start() {
        console.log('Start window Play')
        this.list.forEach(evt => document.addEventListener(evt, this, false));

        const divGame = document.getElementById('game'),
            menu = gameMenu(this.game);
        divGame.insertBefore(menu, this.game.canvas)
    }

    end() {
        console.log('End window Play')
        this.list.forEach(evt => document.removeEventListener(evt, this, false));

        const menu = document.getElementById('playMenu'),
            style = document.getElementById('stylePlay'),
            timer = document.getElementById('timer');
        menu.parentNode.removeChild(menu)
        timer.parentNode.removeChild(timer)
        style.parentNode.removeChild(style)

        this.resetTimer()
    }

    gameReset() {
        const game = this.game
        game.init()

        if (!game.playing[0]) {
            game.playing[0] = true
            game.animate()
        }
        game.canvas.focus()
        this.resetTimer()
        game.Player.hide = false
        game.Player.dx = 0
        game.Player.dy = 0
    }

    handleEvent(evt) {
        let handler = `on${evt.type}`;
        if (typeof this[handler] === "function") {
            evt.preventDefault();
            return this[handler](evt);
        }
    }

    // event glue
    onkeydown(e) {
        const game = this.game
        e.preventDefault()
        if (!game.playing[0]) return
        if (game.Player.keys.hasOwnProperty(e.code)) game.Player.keys[e.code] = true
        if (e.code == "Escape") {
            const div = document.getElementById('playMenu')

            this.pauseTimer()
            const width = div.style.width.replace(/[px%]/i, '')
            if (width > 0) {
                div.style.width = 0
            } else {
                div.style.width = '100%'
            }

            game.canvas.focus()
        }

        if (e.code == "KeyR") this.gameReset()
    }

    onkeyup(e) {
        const game = this.game
        e.preventDefault()
        if (!game.playing[0]) return

        if (!game.Player.keys.hasOwnProperty(e.code)) return
        game.Player.keys[e.code] = false
    }

    onmousedown(e) {
    }

    onmouseup(e) {
    }

    onmousemove(e) {
    }

    onmouseleave(e) {
        const game = this.game
        if (!game.playing[0]) return

        game.mouse.left = false
        game.mouse.right = false
        game.mouse.middle = {
            click: false,
            x: null,
            y: null
        }
    }

    ontouchstart(e) {
        const game = this.game
        const touch = e.targetTouches.item(0);
        if (touch) {
            // game.startDrawingAt({x: touch.clientX, y: touch.clientY});
        }
    }

    ontouchmove(e) {
        const game = this.game
        const touch = e.targetTouches.item(0);
        if (touch) {
            // game.continueDrawingTo({x: touch.clientX, y: touch.clientY});
        }
    }

    ontouchend(e) {
        const game = this.game
        // game.finishDrawing();
    }
}


class EditWindow {
    constructor(game) {
        this.game = game
        this.list = ["mousedown", "mousemove", "mouseup", "wheel", "mouseleave", "keyup", "keydown"] //, "keyup", "keydown" ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] :
    }

    update() {
        const game = this.game

        if (!game.playing[1]) return

        const scale = game.cfg.scale,
            canvas = game.canvas,
            tX = game.translate.x,
            tY = game.translate.y,
            c = game.c,
            uptAll = game.cfg.updateAll,
            uptArr = game.cfg.updateArr;


        if (uptAll) c.clearRect(0, 0, canvas.width, canvas.height)

        c.save()
        c.translate(tX, tY)



        const layerName = ['background', 'static', 'dynamic', 'foreground']
        if (uptAll) {
            const canvasCols = Math.ceil(canvas.width / scale)
            const canvasRows = Math.ceil(canvas.height / scale)
            const xStart = (Math.floor((tX / scale) * -1) > 0) ? Math.floor((tX / scale) * -1) : 0
            const yStart = (Math.floor((tY / scale) * -1) > 0) ? Math.floor((tY / scale) * -1) : 0

            for (let y = yStart; y < canvasRows + yStart + 1; y++) {
                for (let x = xStart; x < canvasCols + xStart + 1; x++) {
                    layerName.forEach(name => {
                        const layer = game[name]

                        if (!layer[y]) return
                        if (!layer[y][x]) return
                        const cell = layer[y][x]
                        cell.editUpdate()
                        cell.draw()
                    })
                }
            }
            game.cfg.updateAll = false
        }
        else if (uptArr.length > 0) {
            uptArr.forEach((arr) => {
                layerName.forEach(name => {
                    const layer = game[name]
                    if (!layer[arr.y] || !layer[arr.y][arr.x]) return
                    const cell = layer[arr.y][arr.x]
                    cell.editUpdate()
                    cell.draw()
                })
            })

            game.cfg.updateArr = []
        }

        c.restore()
    }

    start() {
        console.log('Start window Edit')
        const div = document.getElementById('game'),
            toolBar = toolbar(this.game)
        div.insertBefore(toolBar, this.game.canvas)

        this.list.forEach(evt => this.game.canvas.addEventListener(evt, this, false));
    }

    end() {
        this.game.cfg.scale = 64
        console.log('End window Edit')
        this.list.forEach(evt => this.game.canvas.removeEventListener(evt, this, false));

        const elem = document.getElementById('toolbar'),
            style = document.getElementById('styleEdit')
        elem.parentNode.removeChild(elem);
        style.parentNode.removeChild(style);
    }

    handleEvent(evt) {
        let handler = `on${evt.type}`;
        if (typeof this[handler] === "function") {
            evt.preventDefault();
            return this[handler](evt);
        }
    }

    onkeydown(e) {
        const game = this.game
        if (!game.playing[0]) return

        if (e.keyCode === 70) {
            game.mouse.middle = {
                click: true,
                x: game.mouse.x,
                y: game.mouse.y
            }
        }
    }

    onkeyup(e) {
        const game = this.game
        if (!game.playing[0]) return

        if (e.keyCode === 70) {
            game.mouse.middle = {
                click: false,
                x: null,
                y: null
            }
        }
    }

    onmousedown(e) {
        const game = this.game
        if (!game.playing[0]) return

        switch (e.button) {
            case 0:
                game.mouse.click = 'left'
                game.mouse.left = true
                break;

            case 1:
                game.mouse.click = 'middle'
                game.mouse.middle = {
                    click: true,
                    x: game.mouse.x,
                    y: game.mouse.y
                }
                break;

            case 2:
                game.mouse.click = 'right'
                game.mouse.right = true
                break;
        }

        this.checkForClicks()
    }

    onmouseup(e) {
        const game = this.game
        if (!game.playing[0]) return

        game.mouse.click = null
        switch (e.button) {
            case 0:
                game.mouse.left = false
                break;

            case 1:
                game.mouse.middle = {
                    click: false,
                    x: null,
                    y: null
                }
                break;

            case 2:
                game.mouse.right = false
                break;
        }
    }

    onwheel(e) {
        const game = this.game
        e.preventDefault()
        if (!game.playing[0]) return

        const mouse = game.mouse,
            tx = game.translate.x,
            ty = game.translate.y,
            scale = game.cfg.scale;

        const zoomTo = (e.wheelDelta > 0) ? 4 : -4

        if (8 <= scale + zoomTo && scale + zoomTo <= 96) {
            game.translate.x = mouse.x - ((mouse.x - tx) / scale * (scale + zoomTo))
            game.translate.y = mouse.y - ((mouse.y - ty) / scale * (scale + zoomTo))
            game.cfg.oldScale = game.cfg.scale
            game.cfg.scale += zoomTo
            game.cfg.updateAll = true
        }
    }

    onmousemove(e) {
        const game = this.game
        if (!game.playing[0]) return

        const mouse = game.mouse,
            scale = game.cfg.scale,
            tx = game.translate.x,
            ty = game.translate.y;

        game.mouse.x = e.clientX
        game.mouse.y = e.clientY

        game.mouse.gridX = Math.floor((mouse.x - tx) / scale)
        game.mouse.gridY = Math.floor((mouse.y - ty) / scale)

        if (!mouse.left && !mouse.right && !mouse.middle.click) return
        if (mouse.middle.click) this.checkForClicks()
        if ((mouse.gridX === mouse.last.gridX && mouse.gridY === mouse.last.gridY) && mouse.click === mouse.last.click) return
        this.checkForClicks()
    }

    onmouseleave(e) {
        const game = this.game
        if (!game.playing[0]) return

        game.mouse.left = false
        game.mouse.right = false
        game.mouse.middle = {
            click: false,
            x: null,
            y: null
        }
    }

    ontouchstart(e) {
        const game = this.game
        const touch = e.targetTouches.item(0);
    }

    ontouchmove(e) {
        const game = this.game
        const touch = e.targetTouches.item(0);
    }

    ontouchend(e) {
        const game = this.game
        // game.finishDrawing();
    }

    checkForClicks() {
        const game = this.game,
            gridX = game.mouse.gridX,
            gridY = game.mouse.gridY,
            mouse = game.mouse,
            cfg = game.cfg,
            select = document.getElementById('selectBlock');

        let layerName = ['background', 'static', 'dynamic', 'foreground', 'special']
        let updtID = layerName.indexOf(game.select.layer)
        if (updtID === 4) updtID = 1

        const map = game[layerName[updtID]]

        if (!map[gridY] || (!map[gridY][gridX] && map[gridY][gridX] != 0)) return

        const cell = map[gridY][gridX],
            mouseX = mouse.x,
            mouseY = mouse.y;

        mouse.last.gridX = gridX
        mouse.last.gridY = gridY

        const DrawPixel = () => {
            if (!game.select.block) return

            if (game.select.block[3]) {
                let linkAproved = false

                layerName = ['background', 'static', 'dynamic', 'foreground']
                layerName.forEach(name => {
                    const layer = game[name],
                        theCell = layer[gridY][gridX]

                    if (game.select.block[3] === theCell.type) linkAproved = true
                })

                if (!linkAproved) return game.utils.handleError(game.select.block[1], 'link')
            }

            if (game.select.block[1] === 1) {
                map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)

                cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, false, false))
                cfg.updateArr.push({ x: gridX, y: gridY })
            }

            else if (game.select.block[1] === 4 || game.select.block[1] === 5) {

                if (map[gridY - 1][gridX].type === 'Wall') {
                    map[gridY - 1][gridX] = 0
                    cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY - 1, true, false))
                } else {
                    map[gridY - 1][gridX] = 0
                }

                if (map[gridY][gridX].type === 'Wall') {
                    map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
                    cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, true, false))
                } else {
                    map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
                }

                if (game.select.block[1] === 4) game.Player.respawn = [gridX, gridY - 1]
                cfg.updateArr.push({ x: gridX, y: gridY - 1 }, { x: gridX, y: gridY })
                document.dispatchEvent(refreshBlockType);
            }

            else {
                if (map[gridY][gridX].type === 'Wall') {
                    map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
                    cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, true, false))
                } else {
                    map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
                }
                cfg.updateArr.push({ x: gridX, y: gridY })
            }
        }


        if (mouse.right) {
            if (!map[gridY][gridX]) return

            mouse.last.click = 'right'

            if (layerName[updtID] != 'background') game.background[gridY][gridX] = new game.Objects.Block[0](gridX, gridY, game)

            map[gridY][gridX] = 0

            cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, true, false))
            cfg.updateArr.push({ x: gridX, y: gridY })
            document.dispatchEvent(refreshBlockType);
        }

        if (mouse.left) {
            mouse.last.click = 'left'

            DrawPixel(gridX, gridY)
        }
        if (mouse.middle.click) {
            mouse.last.click = 'middle'
            game.translate.x += mouseX - mouse.middle.x
            game.translate.y += mouseY - mouse.middle.y
            mouse.middle.x = mouseX
            mouse.middle.y = mouseY
            cfg.updateAll = true
        }
    }
}