

  // CLASS
  var GRAVITY   = 0.0035,
      JUMPFORCE = 1.0,
      MAXSPEED  = 0.6,
      ACCEL     = 0.2,
      MAGNITUDEX = 2,
      MAGNITUDEY = 0.2;
  class Engine {
    constructor(c, cols, rows, scale) {
        this.c = c
        this.cols = cols
        this.rows = rows
        this.cells = []
        this.scale = scale
    }

    create(rows, cols, scale) {
        this.rows = rows
        this.cols = cols
        this.scale = scale

        this.clear()
        for(let i = 0; i < this.rows; i++) {
            // this.cells[i] = new Array(this.cols)
            this.cells[i] = []
            for(let j = 0; j < this.cols; j++) {
                this.cells[i][j] = []
            }
        }
    }

    clear() {
        this.cells = []
    }

    insert(entity) {
        const x             = entity.getLeft(true),
              y             = entity.getTop(true),
              w             = entity.getRight(true),
              h             = entity.getBottom(true),
              scale         = this.scale,
              cellStartX    = Math.floor(x / scale),
              cellEndX      = Math.ceil(w / scale),
              cellStartY    = Math.floor(y / scale),
              cellEndY      = Math.ceil(h / scale);

        // if(entity.type === 'Player') {
        //     // console.log(cellStartX, cellEndX)
        //     // console.log(cellStartY, cellEndY)
        // }


        for(let row = cellStartY; row < cellEndY; row++) {
            for(let col = cellStartX; col < cellEndX; col++) {
                if(this.makeCell(row, col)) {
                    this.cells[row][col].push(entity)
                }
            }
        }
    }

    makeCell(row, col) {
        const cells = this.cells
        if(!cells[row]) return false
        if(!cells[row][col]) this.cells[row][col] = []
        return true
    }

    isColliding(o1, o2) {
        const l1 = o1.getLeft(true), r1 = o1.getRight(true),
              t1 = o1.getTop(true),  b1 = o1.getBottom(true),
              l2 = o2.getLeft(true), r2 = o2.getRight(true),
              t2 = o2.getTop(true),  b2 = o2.getBottom(true);

        
            if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) 
            {
                // console.log('collision')
                return true
            }
            //console.log('in')
                // console.log('no collision')
            return false
    }

    checkCells() {
        this.cells.forEach(row => {
            row.forEach(cell => {
                if(!cell || cell.length <= 1) return
                this.testCellEntities(cell)
            })
        })
    }

    testCellEntities(cell) {
        // console.log(cell)

        const length = cell.length;

        cell.forEach((entity1, i) => {
            // this.c.beginPath()
            // this.c.rect(entity1.getLeft(true), entity1.getTop(true), 64, 64)
            // this.c.fillStyle = 'green'
            // this.c.fill()
            // this.c.closePath()

            for(let j = i+1; j < length; j++) {
                const entity2 = cell[j]
                if(!this.isColliding(entity1, entity2) || entity1 === entity2) continue //  || (isWall1 && isWall2)
                this.resolve(entity1, entity2)
            }
        })
    }



    resolve(A, B) {
        let Adx = A.dx, Ady = A.dy,
            Bdx = B.dx, Bdy = B.dy,
            steps = 1, maxSpeed = 16;

        if (Math.abs(A.dx) > maxSpeed || Math.abs(A.dy) > maxSpeed ||
            Math.abs(B.dx) > maxSpeed || Math.abs(B.dy) > maxSpeed ) {
            steps = 10
        }

        for (let i = 1; i <= steps; i++) {
            Adx = A.dx/steps*i, Ady = A.dy/steps*i,
            Bdx = B.dx/steps*i, Bdy = B.dy/steps*i;

            const   w  = 0.5 * (A.w + B.w),
                    h  = 0.5 * (A.h + B.h),
                    dx =(A.getHalfWidth() + Adx)  - (B.getHalfWidth() + Bdx),
                    dy = (A.getHalfHeight() + Ady) - (B.getHalfHeight() + Bdy);

            if (Math.abs(dx) <= w && Math.abs(dy) <= h)
            {
                /* collision! */
                const wy = w * dy,
                    hx = h * dx;

                if (wy > hx) 
                {
                    if (wy > -hx) {
                        /* collision at the top */
                        A.resolve(B, 'TOP')
                        B.resolve(A, 'BOTTOM')
                    }
                    else {
                        /* on the left */
                        A.resolve(B, 'RIGHT')
                        B.resolve(A, 'LEFT')
                    }
                    break;
                }
                else 
                {
                    if (wy > -hx) {
                        /* on the right */
                        A.resolve(B, 'LEFT')
                        B.resolve(A, 'RIGHT')
                    }
                    else {
                        /* at the bottom */
                        A.resolve(B, 'BOTTOM')
                        B.resolve(A, 'TOP')
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
  }
  class Camera {

    constructor(game) {
      this.game = game
      this.x = 0
      this.y = 0
      this.oldX = 0
      this.oldY = 0
    }


    update() {
      const game          = this.game,
            canvas        = game.canvas,
            Player        = game.Player,
            scale         = game.cfg.scale,
            mapWidth      = game.cfg.cols * scale,
            mapHeight     = game.cfg.rows * scale,
            halfMapWidth  = mapWidth  - canvas.width,
            halfMapHeight = mapHeight - canvas.height,
            isOffsetX     = (canvas.width  < mapWidth ) ? true : false,
            isOffsetY     = (canvas.height < mapHeight) ? true : false,
            imgHorizontal = (mapWidth > mapHeight) ? true : false,
            PlayerHalfWidth  = Player.camX + (Player.w / 2),
            PlayerHalfHeight = Player.camY + (Player.h / 2);

      let tx        = -PlayerHalfWidth  + canvas.width /2,
          ty        = -PlayerHalfHeight + canvas.height/2;

      if (!isOffsetX)  tx = canvas.width/2 - mapWidth/2
      if (!isOffsetY)  ty = canvas.height/2 - mapHeight/2

      if      (isOffsetX && PlayerHalfWidth <= canvas.width/2)                  tx = 0
      else if (isOffsetX && PlayerHalfWidth >= (mapWidth  - canvas.width/2))    tx = -halfMapWidth

      if      (isOffsetY && PlayerHalfHeight <= canvas.height/2)                ty = 0
      else if (isOffsetY && PlayerHalfHeight >= (mapHeight - canvas.height/2))  ty = -halfMapHeight

      if(!Player.isDead) {
        game.translate.x = tx
        game.translate.y = ty
        this.x = game.translate.x
        this.y = game.translate.y
      } else {
        // If Camera POS === Player Respawn POS
        if(game.translate.x == tx && game.translate.y == ty) {
            Player.spawn()
        } else {
          game.translate.x = game.utils.lerp(game.translate.x, tx, 0.2)
          game.translate.y = game.utils.lerp(game.translate.y, ty, 0.2)
          this.x = game.translate.x
          this.y = game.translate.y
        }
      }

      this.oldX = this.x
      this.oldY = this.y
    }
  }
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
      if(!game.playing[1]) return
  
      this.dt = dt
    
    
      const cfg     = game.cfg,
            scale   = cfg.scale,
            canvas  = game.canvas,
            tX      = game.translate.x,
            tY      = game.translate.y,
            Player  = game.Player,
            Engine  = game.Engine,
            map     = game.map,
            colMax  = map[0].length,
            rowMax  = map.length,
            cWidth  = canvas.width,
            cHeight  = canvas.height;
    
      Engine.create(cfg.rows, cfg.cols, scale)
      
      if(!Player.isDead && !Player.hide) {
        Player.move(dt)
        Engine.insert(Player)
      }
  
      const offMap   = 20,
            colStart = (Math.floor((tX / scale) * -1) - offMap > 0) ? Math.floor((tX / scale) * -1) - offMap : 0,
            rowStart = (Math.floor((tY / scale) * -1) - offMap > 0) ? Math.floor((tY / scale) * -1) - offMap : 0,
            colEnd   = ((Math.ceil(cWidth  / scale) + colStart)+offMap*2 > colMax  ) ? colMax : (Math.ceil(cWidth  / scale) + colStart)+offMap*2,
            rowEnd   = ((Math.ceil(cHeight / scale) + rowStart)+offMap*2 > rowStart) ? rowMax : (Math.ceil(cHeight / scale) + rowStart)+offMap*2
  
      const layerName = ['static', 'dynamic']
      layerName.map(name => {
        const layer = game[name]
  
        for(let y = rowStart; y < rowEnd; y++) {
          for(let x = colStart; x < colEnd; x++) {
            if(!layer[y] || !layer[y][x]) continue
  
            const cell = layer[y][x]
            if(cell.empty || !cell.collision) continue
      
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
      if(!game.playing[1]) return
    
    
      const cfg     = game.cfg,
            scale   = cfg.scale,
            canvas  = game.canvas,
            tX      = game.translate.x,
            tY      = game.translate.y,
            Player  = game.Player,
            map     = game.map,
            c       = game.c,
            colMax  = map[0].length,
            rowMax  = map.length,
            cWidth  = canvas.width,
            cHeight  = canvas.height;
      c.clearRect(0, 0, canvas.width, canvas.height)
      
      game.Camera.update()
      
      c.save()
      c.translate(tX, tY)
      
    
      const offMap   = 1,
            colStart = (Math.floor((tX / scale) * -1) - offMap > 0) ? Math.floor((tX / scale) * -1) - offMap : 0,
            rowStart = (Math.floor((tY / scale) * -1) - offMap > 0) ? Math.floor((tY / scale) * -1) - offMap : 0,
            colEnd   = ((Math.ceil(cWidth  / scale) + colStart)+offMap*2 > colMax  ) ? colMax : (Math.ceil(cWidth  / scale) + colStart)+offMap*2,
            rowEnd   = ((Math.ceil(cHeight / scale) + rowStart)+offMap*2 > rowStart) ? rowMax : (Math.ceil(cHeight / scale) + rowStart)+offMap*2
  
      const layerName = ['background', 'static', 'dynamic', 'foreground']
      layerName.map(name => {
        const layer = game[name]
  
        if (name === 'dynamic') Player.draw()
    
        for(let   y = rowStart; y < rowEnd; y++) {
          for(let x = colStart; x < colEnd; x++) {
            if(!layer[y] || (layer[y] && !layer[y][x])) continue
      
            const cell = layer[y][x]
            if(cell.empty) continue
            
            if (!cell.collision) cell.update()
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
      if(!this.game.playing[0]) {
        if(this.startTime) this.startTime -= this.pauseStart - Date.now()
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
      
      console.log(this.game.cfg)
      
      if((this.game.cfg.time != null && this.endTime >= this.game.cfg.time) || this.game.cfg.edited) return
      
      var scoreReq = new XMLHttpRequest();
      scoreReq.open('POST', '/scoreMap', true);
      scoreReq.setRequestHeader("Content-type", "application/json");
      scoreReq.send(JSON.stringify({name: this.game.cfg.name, time: this.endTime}));
    }
  
  
    displayTimer() {
      const game        = this.game,
            canvas      = game.canvas,
            c           = game.c,
            rectWidth   = 300,
            rectHeight  = 50;
          
      let  time = (this.endTime > 0) ? this.endTime : this.timer;
      if (this.startTime === 0) time = 0
      const str = getTime(time),
            timer = document.getElementById('timer');
      if(!timer) return
      timer.children[0].innerHTML = str
    }
  
    start() {
      console.log('Start window Play')
      this.list.forEach(evt => document.addEventListener(evt, this.handleEvent(evt), false));
  
      const divGame = document.getElementById('game'),
            menu    = gameMenu(this.game);
      divGame.insertBefore(menu, this.game.canvas)
    }
  
    end() {
      console.log('End window Play')
      this.list.forEach(evt => document.removeEventListener(evt, this.handleEvent(evt), false));
  
      const menu    = document.getElementById('playMenu'),
            style   = document.getElementById('stylePlay'),
            timer   = document.getElementById('timer');
      menu.parentNode.removeChild(menu)
      timer.parentNode.removeChild(timer)
      style.parentNode.removeChild(style)
  
      this.resetTimer()
    }
  
    gameReset() {
      const game = this.game
      game.init()
  
      if(!game.playing[0]) {
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
      let handler = `on${evt.type}`,
          self = this;
      if (typeof self[handler] === "function") {
        evt.preventDefault();
        return self[handler](evt);
      }
    }
    
    // event glue
    onkeydown(e) {
      const game = this.game
      e.preventDefault()
      if(!game.playing[0]) return
      if(game.Player.keys.hasOwnProperty(e.keyCode)) game.Player.keys[e.keyCode] = true
      if(e.keyCode == 27) 
      {
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
  
      if(e.keyCode == 82) this.gameReset()
    }
  
    onkeyup(e) {
      const game = this.game
      e.preventDefault()
      if(!game.playing[0]) return
  
      if(!game.Player.keys.hasOwnProperty(e.keyCode)) return
      game.Player.keys[e.keyCode] = false
    }
  
    onmousedown(e) {
    }
  
    onmouseup(e) {
    }
    
    onmousemove(e) {
    }
  
    onmouseleave(e) {
      const game = this.game
      if(!game.playing[0]) return
  
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
      this.list =  ["mousedown", "mousemove", "mouseup", "wheel" , "mouseleave", "keyup", "keydown"] //, "keyup", "keydown" ("ontouchstart" in window) ? ["touchstart", "touchmove", "touchend"] :
    }
  
    update() {
      const game = this.game
      
      if(!game.playing[1]) return
    
      const scale   = game.cfg.scale,
            canvas  = game.canvas,
            tX      = game.translate.x,
            tY      = game.translate.y,
            c       = game.c,
            uptAll  = game.cfg.updateAll,
            uptArr  = game.cfg.updateArr;
    
      
      if(uptAll) c.clearRect(0, 0, canvas.width, canvas.height)
  
      c.save()
      c.translate(tX, tY)
    
  
      
      const layerName = ['background', 'static', 'dynamic', 'foreground']
      if (uptAll)
      {  
        const canvasCols = Math.ceil(canvas.width / scale)
        const canvasRows = Math.ceil(canvas.height / scale)
        const xStart = (Math.floor((tX / scale) * -1) > 0) ? Math.floor((tX / scale) * -1) : 0
        const yStart = (Math.floor((tY / scale) * -1) > 0) ? Math.floor((tY / scale) * -1) : 0
    
        for(let y = yStart; y < canvasRows + yStart+1; y++) {
          for(let x = xStart; x < canvasCols + xStart+1; x++) {
          layerName.forEach(name => {
            const layer = game[name]
  
            if(!layer[y]) return
            if(!layer[y][x]) return
            const cell = layer[y][x]
            cell.editUpdate()
            cell.draw()
          })
          }
        }
        game.cfg.updateAll = false
      }
      else if (uptArr.length > 0)
      {
        uptArr.forEach((arr) => {
          layerName.forEach(name => {
            const layer = game[name]
            if(!layer[arr.y] || !layer[arr.y][arr.x]) return
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
  
      this.list.forEach(evt => this.game.canvas.addEventListener(evt, this.handleEvent(evt), false));
    }
  
    end() {
      this.game.cfg.scale = 64
      console.log('End window Edit')
      this.list.forEach(evt => this.game.canvas.removeEventListener(evt, this.handleEvent(evt), false));
      
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
      if(!game.playing[0]) return

      if(e.keyCode === 70) {
        game.mouse.middle = {
          click: true,
          x: game.mouse.x,
          y: game.mouse.y
        }
      }
    }

    onkeyup(e) {
      const game = this.game
      if(!game.playing[0]) return

      if(e.keyCode === 70) {
        game.mouse.middle = {
          click: false,
          x: null,
          y: null
        }
      }
    }
  
    onmousedown(e) {
      const game = this.game
      if(!game.playing[0]) return
  
      switch(e.button) {
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
      if(!game.playing[0]) return
        
        game.mouse.click = null
        switch(e.button) {
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
      if(!game.playing[0]) return
  
      const mouse = game.mouse,
            tx    = game.translate.x,
            ty    = game.translate.y,
            scale = game.cfg.scale;
  
      const zoomTo = (e.wheelDelta > 0) ? 4 : -4
  
      if(8 <= scale + zoomTo && scale + zoomTo <= 96) 
      {
        game.translate.x   = mouse.x - ((mouse.x - tx) / scale * (scale + zoomTo))
        game.translate.y   = mouse.y - ((mouse.y - ty) / scale * (scale + zoomTo))
        game.cfg.oldScale  = game.cfg.scale
        game.cfg.scale    += zoomTo
        game.cfg.updateAll = true
      }
    }
    
    onmousemove(e) {
      const game = this.game
      if(!game.playing[0]) return
  
      const mouse = game.mouse,
            scale = game.cfg.scale,
            tx    = game.translate.x,
            ty    = game.translate.y;
  
      game.mouse.x = e.clientX
      game.mouse.y = e.clientY
  
      game.mouse.gridX = Math.floor((mouse.x - tx) / scale)
      game.mouse.gridY = Math.floor((mouse.y - ty) / scale)
  
        if(!mouse.left && !mouse.right && !mouse.middle.click) return
        if(mouse.middle.click) this.checkForClicks()
        if((mouse.gridX === mouse.last.gridX && mouse.gridY === mouse.last.gridY) && mouse.click === mouse.last.click) return
        this.checkForClicks()
    }
  
    onmouseleave(e) {
      const game = this.game
      if(!game.playing[0]) return
  
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
      const game    = this.game,
            gridX   = game.mouse.gridX,
            gridY   = game.mouse.gridY,
            mouse   = game.mouse,
            cfg     = game.cfg,
            select  = document.getElementById('selectBlock');
    
      let layerName   = ['background', 'static', 'dynamic', 'foreground', 'special']
      let updtID = layerName.indexOf(game.select.layer)
      if(updtID === 4) updtID = 1
    
      const  map = game[layerName[updtID]]
    
      if(!map[gridY] || (!map[gridY][gridX] && map[gridY][gridX] != 0)) return
    
      const cell    = map[gridY][gridX],
            mouseX  = mouse.x,
            mouseY  = mouse.y;
    
      mouse.last.gridX = gridX
      mouse.last.gridY = gridY
    
      const DrawPixel = () => {
        if (!game.select.block) return
    
        if (game.select.block[3]) {
          let linkAproved = false
    
          layerName = ['background', 'static', 'dynamic', 'foreground']
          layerName.forEach(name => {
            const layer = game[name],
                  theCell  = layer[gridY][gridX]
    
            if(game.select.block[3] === theCell.type) linkAproved = true
          })
    
          if (!linkAproved) return game.utils.handleError(game.select.block[1], 'link')
        }
    
        if(game.select.block[1] === 1)
        {
          map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
    
          cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, false, false))
          cfg.updateArr.push({x: gridX, y: gridY})
        }
        
        else if (game.select.block[1] === 4 || game.select.block[1] === 5) {
    
          if(map[gridY-1][gridX].type === 'Wall') {
            map[gridY-1][gridX] = new game.Objects.Block[0](gridX, gridY-1, game)
            cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY-1, true, false))
          } else {
            map[gridY-1][gridX] = new game.Objects.Block[0](gridX, gridY-1, game)
          }
    
          if(map[gridY][gridX].type === 'Wall') {
            map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
            cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, true, false))
          } else {
            map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
          }
    
          if(game.select.block[1] === 4)  game.Player.respawn = [gridX, gridY - 1]
          cfg.updateArr.push({x: gridX, y: gridY-1}, {x: gridX, y: gridY})
          document.dispatchEvent(refreshBlockType);
        }
    
        else {
          if(map[gridY][gridX].type === 'Wall') {
            map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
            cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, true, false))
          } else {
            map[gridY][gridX] = new game.select.block[0](gridX, gridY, game)
          }
          cfg.updateArr.push({x: gridX, y: gridY})
        }
      }
    
      
      if(mouse.right)
      {
        if(!map[gridY][gridX]) return
    
          mouse.last.click = 'right'
    
          if (layerName[updtID] != 'background') game.background[gridY][gridX] = new game.Objects.Block[0](gridX, gridY, game)
    
          map[gridY][gridX] = 0
    
          cfg.updateArr.push(... this.game.utils.tileManager.getValue(game, gridX, gridY, true, false))
          cfg.updateArr.push({x: gridX, y: gridY})
          document.dispatchEvent(refreshBlockType);
      }
    
      if (mouse.left)
      {
          mouse.last.click = 'left'
    
          DrawPixel(gridX, gridY)
      }
      if (mouse.middle.click)
      {
          mouse.last.click = 'middle'
          game.translate.x     += mouseX - mouse.middle.x
          game.translate.y     += mouseY - mouse.middle.y
          mouse.middle.x   = mouseX
          mouse.middle.y   = mouseY
          cfg.updateAll    = true
      }
    }
  }
  class Block {
    constructor(x, y, Game)  {
      this.type       = 'Block'
      this.game       = Game
      this.x          = x
      this.y          = y
      this.w          = Game.cfg.scale
      this.h          = Game.cfg.scale
      this.dx         = 0
      this.dy         = 0
      this.color      = '#111115'
      this.empty      = false
      this.collision  = false

      this.id         = 0
      this.purpose    = ['Background']
      this.link       = false
    }

    getLeft(displayDelta) {
      const scale = this.game.cfg.scale
      return this.x * scale + (scale - this.w) + ((displayDelta) ? this.dx : 0)
    }

    getTop(displayDelta) {
      const scale = this.game.cfg.scale
      return this.y * scale + (scale - this.h) + ((displayDelta) ? this.dy : 0)
    }

    getRight(displayDelta) {
      return this.getLeft(displayDelta) + this.w
    }

    getBottom(displayDelta) {
      return this.getTop(displayDelta) + this.h
    }

    getHalfWidth(displayDelta) {
      return this.getRight(displayDelta) - this.w/2
    }

    getHalfHeight(displayDelta) {
      return this.getBottom(displayDelta) - this.h/2
    }

    draw() {
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
      
      const game      = this.game,
            c         = game.c,
            scale     = game.cfg.scale,
            x         = this.x * scale + (scale - this.w),
            y         = this.y * scale + (scale - this.h);

      c.beginPath()
      c.fillStyle = this.color
      c.rect(x, y, this.w, this.h)
      c.fill()
      if (this.game.mode === 'edit') {
        c.strokeStyle = 'gray'
        c.stroke()
      } 
      c.closePath()
    }

    update() {
      const scale = this.game.cfg.scale
      this.w = scale
      this.h = scale
    }

    editUpdate() {
      this.update()
    }

    collisionLeft(obj, player, newDelta, oldDelta) {
      obj.stopLeft(obj, player)
    }

    collisionTop(obj, player, newDelta, oldDelta) {
      obj.stopTop(obj, player)
    }

    collisionRight(obj, player, newDelta, oldDelta) {
      obj.stopRight(obj, player)
    }

    collisionBottom(obj, player, newDelta, oldDelta) {
      obj.stopBottom(obj, player)
    }

    stopLeft(obj, player) {
      player.x = obj.getLeft() - player.w
      player.dx = 0
    }

    stopTop(obj, player) {
      player.y = obj.getTop() - player.h
      player.dy = 0
      player.hasBounced = false
      player.isOnFloor = true
    }

    stopRight(obj, player) {
      player.x = obj.getRight()
      player.dx = 0
    }

    stopBottom(obj, player) {
      player.y = obj.getBottom()
      player.dy = 0
    }

    normalCollision(obj, side) {
      const objMovingLeft   = (obj.dx < 0)      ? true : false, objMovingRight  = (obj.dx > 0)        ? true : false,
            objMovingTop    = (obj.dy < 0)      ? true : false, objMovingBottom = (obj.dy > 0)        ? true : false,
            collisionLeft   = (side === 'LEFT') ? true : false, collisionRight  = (side === 'RIGHT')  ? true : false, 
            collisionTop    = (side === 'TOP')  ? true : false, collisionBottom = (side === 'BOTTOM') ? true : false,
            col             = this.x,                           row             = this.y,
            utils = this.game.utils;
    
    
      
      if(objMovingBottom)
      {
        if(collisionTop && this.isColliding(this, obj, false, true)) {
          obj.collision.top.push({obj: this, callback: this.collisionTop})
        }
        if (collisionLeft && objMovingRight) {
          if (utils.catchBlockCollision(col-1, row) && this.isColliding(utils.catchBlockCollision(col-1, row), obj, false, true)) {
            obj.collision.top.push({obj: this, callback: this.collisionTop})
          }
          else {
            obj.collision.left.push({obj: this, callback: this.collisionLeft})
          }
        }
        if (collisionRight && objMovingLeft) {
          if (utils.catchBlockCollision(col+1, row) && this.isColliding(utils.catchBlockCollision(col+1, row), obj, false, true)){
            obj.collision.top.push({obj: this, callback: this.collisionTop})
          }
          else {
            obj.collision.right.push({obj: this, callback: this.collisionRight})
          }
        }
      } 
      
      else if(objMovingTop)
      {
        if(collisionBottom && this.isColliding(this, obj, false, true)) {
          obj.collision.bottom.push({obj: this, callback: this.collisionBottom})
        }
        if (collisionLeft) {
          if (utils.catchBlockCollision(col-1, row) && this.isColliding(utils.catchBlockCollision(col-1, row), obj, false, true)) {
            obj.collision.bottom.push({obj: this, callback: this.collisionBottom})
          }
          else {
            obj.collision.left.push({obj: this, callback: this.collisionLeft})
          }
        }
        if (collisionRight) {
          if (utils.catchBlockCollision(col+1, row) && this.isColliding(utils.catchBlockCollision(col+1, row), obj, false, true)) {
            obj.collision.bottom.push({obj: this, callback: this.collisionBottom})
          }
          else {
            obj.collision.right.push({obj: this, callback: this.collisionRight})
          }
        }
      }
    
      else if(objMovingLeft && collisionRight) {
        obj.collision.right.push({obj: this, callback: this.collisionRight})
      }
      else if(objMovingRight && collisionLeft) {
        obj.collision.left.push({obj: this, callback: this.collisionLeft})
      }
    }
    
    isColliding(box, p, x, y) {
      const l1 = box.getLeft(), r1 = box.getRight(),
            t1 = box.getTop(),  b1 = box.getBottom(),

            l2 = p.getLeft(x),
            r2 = p.getRight(x),
            t2 = p.getTop(y),
            b2 = p.getBottom(y);

      
      if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) 
      {
        return true
      }
      return false
    }
  }
  class Player extends Block {
  constructor(x, y, name, Game) {
    super(x, y, Game)

    this.type  = 'Player'
    this.color = 'brown'
    this.name  = name

    this.h = 100
    this.w = 50

    this.camX = this.x,
    this.camY = this.y

    this.hide = false

    this.respawn = [this.x, this.y]

    this.accel     = ACCEL
    this.maxSpeed  = MAXSPEED
    this.gravity   = GRAVITY
    this.jumpForce = JUMPFORCE

    this.native = {
      w        : this.w,
      h        : this.h,
      maxSpeed : this.maxSpeed
    }

    this.canJump      = true
    this.isOnFloor    = false
    this.isDead       = false
    this.hasBounced   = false
    this.isCrouching  = false

    this.keys = {
        '38' : false, // Up
        '32' : false, // Space
        '90' : false, // Z


        '83' : false, // S
        '40' : false, // Down
        '16' : false, // LShift


        '39' : false, // Right
        '37' : false, // Left
        '81' : false, // Q
        '68' : false, // D
    }

    this.collision = {
      left:   [],
      top:    [],
      right:  [],
      bottom: []
    }
  }

  getLeft(vel) {
    return this.x + ((vel) ? this.dx : 0)
  }

  getRight(vel) {
    return this.x + this.w  + ((vel) ? this.dx : 0)
  }

  getTop(vel) {
    return this.y + ((vel) ? this.dy : 0)
  }

  getBottom(vel) {
    return this.y + this.h + ((vel) ? this.dy : 0)
  }

  getHalfWidth(vel) {
    return this.x + this.w / 2 + ((vel) ? this.dx : 0)
  }

  getHalfHeight(vel) {
    return this.y + this.h / 2 + ((vel) ? this.dy : 0)
  }

  init() {
    this.x = this.respawn[0] * this.game.cfg.scale
    this.y = this.respawn[1] * this.game.cfg.scale
  }

  jump() {
    if (!this.isOnFloor || !this.canJump) return
    this.dy         = -this.jumpForce
    this.isOnFloor  = false
    this.canJump    = false
  }

  crouch() {
    this.h        =  50
    this.y        += this.h
    this.maxSpeed *= 0.2
    this.isCrouching = true
  }

  uncrouch() {
    const game                = this.game,
          cfg                 = game.cfg,
          col                 = Math.floor(this.x / cfg.scale),
          row                 = Math.floor((this.y-this.h) / cfg.scale),
          isCollidingTopLeft  = this.isColliding(game.static, row, col, this),
          isCollidingTopRight = this.isColliding(game.static, row, col+1, this);

    // console.log(isCollidingTopLeft || isCollidingTopRight)
    if(isCollidingTopLeft || isCollidingTopRight) return
    
    this.y            -= this.h
    this.h            =  100
    this.maxSpeed     =  this.native.maxSpeed
    this.isCrouching  =  false
  }

  die() {
    this.x          = this.respawn[0] * this.game.cfg.scale
    this.y          = this.respawn[1] * this.game.cfg.scale
    this.dx         = 0
    this.dy         = 0
    this.isOnFloor  = false
    this.hasBounced = false
    this.isDead     = true
  }

  spawn() {
    this.isDead = false
  }


  draw() {
    if(this.isDead || this.hide) return

    const c = this.game.c
    
    c.beginPath()
    c.rect(this.x, this.y, this.w, this.h)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    
  }

  move(dt) {
    this.isIdle = true

    // console.log(this.x, this.y)
    const dx        = this.dx,
          dy        = this.dy,
          onFloor   = this.isOnFloor,
          crouching = this.isCrouching,
          maxSpeed  = this.maxSpeed,
          accel     = this.accel,
          key       = this.keys,
          left      = (key['37'] || key['81']) ? true : false,
          up        = (key['38'] || key['32'] || key['90']) ? true : false,
          right     = (key['39'] || key['68']) ? true : false,
          down      = (key['40'] || key['83'] || key['16']) ? true : false;


    if(this.isDead || this.hide) return

      
    if (left)
    {
      if (!(crouching && Math.abs(dx) > maxSpeed))
      {
        this.dx = Math.max((dx - accel), -maxSpeed)
      }
      this.isIdle = false
    }      
    
    if (right)
    {
      if (!(crouching && Math.abs(dx) > maxSpeed))
      {
        this.dx = Math.min((dx + accel), maxSpeed)
      }
      this.isIdle = false
    }

    if (left && right) {
      this.dx = 0
    }

    if (up)
    {
      this.jump()
    } else {
      this.canJump = true
    }
    
    if (!crouching && down) this.crouch()
    
    if (crouching && !down) this.uncrouch()
    

    // GRAVITY AND FRICTIONS
    this.dy += this.gravity*dt;
    if(this.isIdle || (crouching && Math.abs(dx) > maxSpeed)) {
      let friction = (onFloor) ? 0.02 : 0.012
      if(crouching && Math.abs(dx) > maxSpeed) friction = (onFloor) ? 0.0013 : 0
      this.dx = this.game.utils.lerp(dx, 0, friction*dt)
    }


    if(this.game.window.play.startTime === 0)
    {
      const keysArr = Object.values(this.keys)
      if(keysArr.some(e => e)) this.game.window.play.startTimer()
    }

  }

  resolve(obj, side) {
    // Something
  }

  update(dt) {
    // console.log(this.isDead)
    if(this.isDead || this.hide) return
    // console.log('PlayerY =', this.dy)

    this.handleCollision()


    if(this.dy > 0) this.isOnFloor = false

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
    const scale = this.game.cfg.scale,
          cols  = this.game.cfg.cols,
          rows  = this.game.cfg.rows;

    if (this.getLeft(true) < 0) {
      this.x = 0
      // return this.die()
      this.dx = 0
    }
    else if (this.getRight(true) > cols * scale) {
      this.x = cols * scale - this.w
      // return this.die()
      this.dx = 0
    }

    if (this.getTop(true) < 0) {
      this.y = 0
      // return this.die()
      this.dy = 0
    }
    else if (this.getBottom(true) > rows * scale) {
      this.y = rows * scale - this.h
      this.isOnFloor = true
      // return this.die()
      this.dy = 0
    }
    
    // console.log(this.x, dt, this.x*dt)
    this.x += this.dx*dt
    this.y += this.dy*dt



    
    this.camX = this.x
    this.camY = this.y
    if (this.isCrouching) this.camY -= this.h/2

    // console.log(this.canY , this.canY )

    // this.draw()

    // console.log(this.hasBounced)

    // console.log('------------------')
  }


  isColliding(map, row, col, crouching) {
    if (!map[row] || (!map[row][col] && map[row][col] != 0)) return true
    else if (map[row][col].type != 'Wall') return false
    // console.log(col, row)

    const box = map[row][col],
          l1 = box.getLeft(), r1 = box.getRight(),
          t1 = box.getTop(),  b1 = box.getBottom(),

          l2 = this.getLeft(),
          r2 = this.getRight(),
          t2 = (crouching) ? this.getTop()-this.h : this.getTop(),
          b2 = this.getBottom();

    
    if (l1 < r2 && r1 > l2 && 
        t1 < b2 && b1 > t2) 
    {
      return true
    }
    return false
  }

  handleCollision() {
    const collLeft     = this.collision.left,
          collTop      = this.collision.top,
          collRight    = this.collision.right,
          collBottom   = this.collision.bottom,
          isCollLeft   = (collLeft.length > 0)   ? true : false,
          isCollTop    = (collTop.length > 0)    ? true : false,
          isCollRight  = (collRight.length > 0)  ? true : false,
          isCollBottom = (collBottom.length > 0) ? true : false,
          delta        = {
            x: this.dx,
            y: this.dy
          };

    if (isCollTop)
    {
      const typePriority = {
        Spikes      : false,
        BouncingBox : false,
        End         : false,
        Wall        : false
      }

      collTop.forEach(({obj, callback}) => {
        if (typePriority.hasOwnProperty(obj.type)) typePriority[obj.type] = {obj, callback}
      })

      const priorityArray = Object.values(typePriority),
            objectToHandle = priorityArray.find(e => e);

      objectToHandle.callback(objectToHandle.obj, this, {x: this.dx, y: this.dy}, delta)
    }

    if (isCollBottom)
    {
      collBottom.forEach(({obj, callback}) => {
        callback(obj, this, {x: this.dx, y: this.dy}, delta)
      })
    }

    if (isCollLeft)
    {
      collLeft.forEach(({obj, callback}) => {
        callback(obj, this, {x: this.dx, y: this.dy}, delta)
      })
    }

    if (isCollRight)
    {
      collRight.forEach(({obj, callback}) => {
        callback(obj, this, {x: this.dx, y: this.dy}, delta)
      })
    }
    // console.log(this.dy)

    this.collision.left   = []
    this.collision.top    = []
    this.collision.right  = []
    this.collision.bottom = []
  }
  }
  class Spawn extends Block {
    constructor(x, y, Game)  {
      super(x, y, Game)
      
      this.h = Game.cfg.scale*2
      this.type = 'Spawn'
      this.color = 'brown'
      this.empty = true
      this.collision = false

      this.id         = 4
      this.purpose    = ['Special']
    }

    draw() {
      if(this.game.mode === 'edit') {
        const c         = this.game.c,
              scale     = this.game.cfg.scale,
              x         = this.x * scale,
              y         = this.y * scale + (scale - this.h);

        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(x, y, this.w, this.h)
        c.closePath()
      }
    }

    editUpdate() {
      this.w = this.game.cfg.scale
      this.h = this.game.cfg.scale*2
    }

    resolve(obj, side) {
      if(obj.type != 'Player') return

      
    }
  }
  class End extends Block {
    constructor(x, y, Game)  {
      super(x, y, Game)
      
      this.h = Game.cfg.scale*2
      this.type = 'End'
      this.color = 'cyan'
      this.empty = false
      this.collision = true

      this.id         = 5
      this.purpose    = ['Special']
    }

    update() {
      this.editUpdate()
    }

    draw() {
      const game      = this.game,
            c         = game.c,
            scale     = game.cfg.scale,
            x         = this.x * scale + (scale - this.w),
            y         = this.y * scale + (scale - this.h);

      c.beginPath()
      c.fillStyle = this.color
      c.lineWidth = 1;
      c.rect(x, y, this.w+1, this.h+1)
      c.fill()
      c.closePath()
    }

    editUpdate() {
      this.w = this.game.cfg.scale
      this.h = this.game.cfg.scale*2
    }

    resolve(player, side) {
      if(player.type != 'Player') return

      this.game.window.play.endTimer()
      player.dx = player.dy = 0
    }
  }
  class Wall extends Block {
    constructor(x, y, Game) {
      super(x, y, Game)
    
      this.type = 'Wall'
      this.tile = {
        name: this.game.select.tile.name
      }
      this.empty = false
      this.collision = true
  
      this.id         = 1
      this.purpose    = ['Static']
    }
  
    draw() {
      const game = this.game,
            c    = game.c,
            tile = game.assets.tiles[this.tile.name];
  
      c.drawImage(
        tile.img,              // IMG
        this.tile.x,           // CANVAS_X
        this.tile.y,           // CANVAS_Y
        tile.size,             // CANVAS_WIDTH
        tile.size,             // CANVAS_HEIGHT
        this.x*game.cfg.scale, // IMG_X
        this.y*game.cfg.scale, // IMG_Y 
        game.cfg.scale+1,      // IMG_WIDTH
        game.cfg.scale+1       // IMG_HEIGHT
      )
    }
  
    editUpdate() {
      const game = this.game
      this.w = game.cfg.scale
      this.h = game.cfg.scale
  
      if(this.tile)
      {
          this.collision = (this.tile.value < 255) ? true : false
          let v = this.game.utils.tileManager.getID(this.tile.value)
          this.tile.id = (v === 0) ? 0 : v - 1
  
          const x = ( this.tile.id % game.assets.tiles[this.tile.name].w )
          const y = Math.floor( this.tile.id / game.assets.tiles[this.tile.name].w )
  
          this.tile.x = x * game.assets.tiles[this.tile.name].size + (x * game.assets.tiles[this.tile.name].iX)
          this.tile.y = y * game.assets.tiles[this.tile.name].size + (y * game.assets.tiles[this.tile.name].iY)
      }
    }
  
    update() {
      const game = this.game
      this.w = game.cfg.scale
      this.h = game.cfg.scale
    }
  
    // collisionTop(obj) {
    //   console.log('WALLTOP')
    //   this.stopTop(obj)
    // }
  
    resolve(player, side) {
      if(player.type != 'Player') return
      
      this.normalCollision(player, side)
      // console.log(player.hasBounced)
    }
  }
  class Spikes extends Block {
    constructor(x, y, Game)  {
      super(x, y, Game)
      
      this.h = Game.cfg.scale/2
      this.type = 'Spikes'
      this.color = 'gray'
      this.empty = false
      this.collision = true

      this.id         = 3
      this.purpose    = ['Static']
    }

    update() {
      this.w = this.game.cfg.scale
      this.h = this.game.cfg.scale/2
    }

    draw() {
      const game  = this.game,
            c     = game.c,
            scale = game.cfg.scale,
            x     = this.x * scale,
            y     = this.y * scale + (scale - this.h);

      c.beginPath()
      c.drawImage(game.assets.textures.Spikes.img, x, y, this.w+1, this.h+1)
      c.closePath()
    }

    collisionTop(obj, player, newDelta, oldDelta) {
      player.die()
    }

    resolve(player, side) {
      if(player.type != 'Player') return
      
      this.normalCollision(player, side)
    }
  }
  class BouncingBox extends Block {
    constructor(x, y, Game)  {
      super(x, y, Game)

      this.h = Game.cfg.scale/2
      this.type = 'BouncingBox'
      this.color = 'purple'
      this.empty = false
      this.collision = true

      this.id         = 2
      this.purpose    = ['Static']
    }

    bounceFactor(obj) {
        return (obj.hasBounced) ? 0.7 : 1.1
    }

    update() {
      this.w = this.game.cfg.scale
      this.h = this.game.cfg.scale/2
    }

    draw() {
      const game  = this.game,
            c     = game.c,
            scale = game.cfg.scale,
            x     = this.x * scale,
            y     = this.y * scale + (scale - this.h);

      c.beginPath()
      c.drawImage(game.assets.textures.BouncingBox.img, x, y, this.w+1, this.h+1)
      c.closePath()
    }


    collisionLeft(obj, player, newDelta, oldDelta) {
      // console.log('BB-LEFT')
      if (player.dx > MAGNITUDEX) {
        player.dx *= -obj.bounceFactor(player)
        player.hasBounced = true
      }
      else obj.stopLeft(obj, player)
    }

    collisionTop(obj, player, newDelta, oldDelta) {
      // console.log('BB-TOP')
      if (player.dy > MAGNITUDEY) {
        player.dy *= -obj.bounceFactor(player)
        // player.y += player.dy
        player.isOnFloor = true
        player.hasBounced = true
      }
      else obj.stopTop(obj, player)
    }

    collisionRight(obj, player, newDelta, oldDelta) {
      // console.log('BB-RIGHT')
      if (player.dx < -MAGNITUDEX) {
        player.dx *= -obj.bounceFactor(player)
        player.hasBounced = true
      }
      else obj.stopRight(obj, player)
    }

    collisionBottom(obj, player, newDelta, oldDelta) {
      // console.log('BB-BOT')
      if (player.dy < -MAGNITUDEY) {
        player.dy *= -obj.bounceFactor(player)
        player.hasBounced = true
      }
      else obj.stopBottom(obj, player)
    }


    resolve(player, side) {
      if(player.type != 'Player') return
      
      this.normalCollision(player, side)
    }
  }
  class SwordSupport extends Block {
    constructor(x, y, Game)  {
      super(x, y, Game)
      
      this.type = 'SwordSupport'
      this.color = 'gray'
      this.empty = false
      this.collision = true
  
      this.id         = 6
      this.purpose    = ['Static']
    }
  
  draw() {
      const game      = this.game,
      c         = game.c,
      scale     = game.cfg.scale,
      x         = this.x * scale + (scale - this.w),
      y         = this.y * scale + (scale - this.h);
  
  c.beginPath()
  c.fillStyle = this.color
  c.lineWidth = 1;
  c.rect(x, y, this.w+1, this.h+1)
  c.fill()
  c.closePath()
  }
  
    resolve(obj, side) {
      if(obj.type === 'Sword') {
        
      }
    }
  }
  class Sword extends Block {
    constructor(x, y, Game)  {
      super(x, y, Game)
  
      const scale = Game.cfg.scale
  
      this.w = scale/2
      this.h = scale/2
  
      this.inX = scale/2 - this.w/2
      this.inY = scale/2 - this.h/2
  
      this.type      = 'Sword'
      this.color     = 'yellow'
      this.empty     = false
      this.collision = true
  
  
      this.dx = 0.3
  
      this.id      = 7
      this.purpose = ['Dynamic']
      
      this.link = 'SwordSupport'
    }  
  
    getLeft(displayDelta) {
      return this.x * this.game.cfg.scale + this.inX + ((displayDelta) ? this.dx : 0)
    }
  
    getTop(displayDelta) {
      return this.y * this.game.cfg.scale + this.inY + ((displayDelta) ? this.dx : 0)
    }
  
    update(dt) {
      const game  = this.game,
            scale = game.cfg.scale,
            movingLeft = (this.dx > 0) ? false : true,
            inX = this.inX,
            dx = this.dx;
  
      this.w = game.cfg.scale/2
      this.h = game.cfg.scale/2
  
  
      this.inX += dx * dt
  
      if(movingLeft && inX <  0) {
        this.game.dynamic[this.y][this.x] = 0
        this.x--
        this.game.dynamic[this.y][this.x] = this
        
        this.inX += scale
      }
      
      if(!movingLeft && inX > scale) {
        this.game.dynamic[this.y][this.x] = 0
        this.x++
        this.game.dynamic[this.y][this.x] = this
  
        this.inX -= scale
      }
    }
  
  
    editUpdate() {
      const game     = this.game,
            cfg      = game.cfg,
            scale    = cfg.scale;
      
      this.inX = scale/2 - this.w/2
      this.inY = scale/2 - this.h/2
  
      this.w = scale/2
      this.h = scale/2
    }
  
  
    draw() {
      const c = this.game.c,
            x = this.getLeft(), y = this.getTop(),
            w = this.w,         h = this.h;
  
      c.beginPath()
      c.fillStyle = this.color
      c.fillRect(x, y, w, h)
      c.closePath()
    }
  
  
    resolve(obj, side) {
  
      const game   = this.game,
            dir    = (this.dx > 0) ? 1 : 0,
            map    = game.static,
            m_left = (this.dx > 0) ? false : true,
            dx     = this.dx, x = this.x, y = this.y;
            
      switch(obj.type) {
        case 'SwordSupport':
          if((map[y][x+dir]) && map[y][x+dir].type === 'SwordSupport') return
          else {
            if      ( m_left && this.getLeft()  < obj.getLeft() ) this.dx = -dx
            else if (!m_left && this.getRight() > obj.getRight()) this.dx = -dx
          }
          break;
          
        case 'Sword':
          this.dx = -dx
        break;
        
        case 'Player':
          obj.die()
          break;
      }
    }
  }




function Game(N, T, M){

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
    name      : N || "",
    time      : T || null,
    edited    : false,
    cols      : 32,
    rows      : 32,
    scale     : 64,
    oldScale  : 64,
    updateArr : [[], [], [], []],
    updateAll : false
  }
  
  console.log("TIME =", this.cfg.time)


  this.utils = {
    rand: (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    },
  
    loadImg: (obj) => {
      let img = new Image()
      img.src = obj.url
      obj.img = img
    },
  
    lerp: (value1, value2, amount) => {
      if(value1 === 0) return false
      amount = amount < 0 ? 0 : amount;
      amount = amount > 1 ? 1 : amount;
      const result = Number((value1 + (value2 - value1) * amount).toFixed(5))
      const diff = Math.abs(result - value2) 
      return (diff.toFixed(2) == 0) ? value2 : result;
    },
  
    getBlock: (arr, x, y) => {
      if(!arr[y]) return false
      else if(arr[y] && !arr[y][x]) return false
      else if(!arr[y][x].collision) return false
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
  
      if(
        aL <= bL && aR >= bL &&
        aT <= bT && aB >= bT
      ) return true
      return false
    },
    
    catchBlockCollision: (x, y) => {
      const layerName = ['static', 'dynamic']
  
      let toReturn = false
  
      layerName.forEach(name => {
        const layer = game[name]
        if (!layer[y] || !layer[y][x] || !layer[y][x].collision || layer[y][x].type === "SwordSupport") return false
        toReturn = layer[y][x]
      })
  
      return  toReturn
    },
  
    numberToClass: (game, num) => {
      switch(num) {
        case 0:
          return game.Objects.Block
  
        case 1:
          return game.Objects.Wall
  
        case 2:
          return game.Objects.BouncingBox
  
        case 3:
          return game.Objects.Spikes
  
        case 4:
          return game.Objects.Spawn
  
        case 5:
          return game.Objects.End
  
        default:
          return false
        // case 4:
        //   return
  
        // case 5:
        //   return
      }
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
            0:   1,       // 
            2:   2,       // N
            8:   3,       // W 
            10:  4,      // W N
            11:  5,      // W N NW 
            16:  6,      // E
            18:  7,      // E N
            22:  8,      // E N NE
            24:  9,      // E W
            26:  10,     // E N W
            27:  11,     // E N W NW
            30:  12,     // E N W NE
            31:  13,     // E N W NW NE
            64:  14,     // S
            66:  15,     // S N
            72:  16,     // S W
            74:  17,     // S N W
            75:  18,     // S N W NW
            80:  19,     // S E
            82:  20,     // S N E
            86:  21,     // S N E NE
            88:  22,     // S W E
            90:  23,     // S N W E
            91:  24,     // S N W E NW
            94:  25,     // S N W E NE
            95:  26,     // S N W E NW NE
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
        const map    = game.static,
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
        
        const NSWE = [false, false , false , false]
      
        function checkObj(a, b, v, id, test = false) {
          if((!map[b] || (map[b] && !map[b][a])) && 
            (theMap[b] && theMap[b][a] && theMap[b][a][1] != '1')) return
            
          if(map[b] && map[b][a] && map[b][a].type != 'Wall') return
      
          // console.log(map[b][a])
          // if(b===5 && a === 11) {
          //   if(map[b]) {
          //     console.log(map[b][a])
          //     console.log(map)
          //   }
          // }
          
          // console.log(map[y][b])
          if(map[b] && map[b][a] && 
            (map[b][a].empty)) return
      
            tileValue += v
            if(id >= 0) NSWE[id] = true;
            if(child) return
            if(!map[b] || !map[b][a]) return
      
            game.utils.tileManager.getValue(game, a , b, false, true)
            updateArr.push({x: a, y: b})
        }
      
        checkObj(x, y-1, N, 0)     // N
        checkObj(x, y+1, S, 1, true)    // S
        checkObj(x-1, y, W, 2)     // W // 24 + 64
        checkObj(x+1, y, E, 3)    // E
      
        if(NSWE[0] && NSWE[2]) checkObj(x-1, y-1, NW)   // NW
        if(NSWE[0] && NSWE[3]) checkObj(x+1, y-1, NE)   // NE
        if(NSWE[1] && NSWE[2]) checkObj(x-1, y+1, SW)  // SW
        if(NSWE[1] && NSWE[3]) checkObj(x+1, y+1, SE) // SE
      
          
        if(!del)
        {
          // console.log(x, y, map[y][x])
          map[y][x].tile.value = tileValue
        }
      
        if (map[y][x]) map[y][x].editUpdate()
        return updateArr
      }
    }
  }

  
  this.map       = M || "0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###,0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###-0###"
    
  this.firstInit = true

  this.background = []
  this.static     = []
  this.dynamic    = []
  this.foreground = []

  this.lastRender = null
  this.now = null
  this.resetAnimate = true

  this.Player = new Player(5, 5, 'Player1', this)

  this.Objects = {  
    // MAP OBJECTS: [CLASS, ID, PURPOSE, LINK]
    Block:        [Block,        0,  ['background']                 ],
  
    Wall:         [Wall,         1,  [  'static'  ]                 ],
  
    BouncingBox:  [BouncingBox,  2,  [  'static'  ]                 ],
  
    Spikes:       [Spikes,       3,  [  'static'  ]                 ],
  
    Spawn:        [Spawn,        4,  [  'special' ]                 ],
  
    End:          [End,          5,  [  'special' ]                 ],
  
    SwordSupport: [SwordSupport, 6,  [  'static'  ]                 ],
  
    Sword:        [Sword,        7,  [  'dynamic' ],  'SwordSupport'],
  }

  this.editObjects = Object.values(this.Objects).filter(o => typeof o[1] === 'number')

  this.mode = "edit"

  this.Engine = new Engine(this.c, this.cfg.cols, this.cfg.rows, this.cfg.scale)

  this.Camera = new Camera(game)

  this.assets = {
    tiles    : {
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
    textures : {
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
    color     : 'blue',
    brushSize : 0,
    block     : null,
    tile      : game.assets.tiles.spaceGround,
    layer     : null
  }

  this.mouse = {
    x     : null,
    y     : null,
    gridX : 0,
    gridY : 0,
    left  : false,
    right : false,
    click : null,

    middle: {
      click: false,
      x    : null,
      y    : null
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
    load: function() {
      var Game = game

      if(Game.firstInit) {
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
              cell.forEach((layer, id) => {
                  const mapLayer = Game[layerName[id]]
                  
                  if(!mapLayer[row]) mapLayer[row] = []
                  if(layer === '#') return mapLayer[row][col] = 0
  
                  const block = Game.editObjects.find(b => b[1] == layer)
  
                  switch (layer.toString()) {
                      case '1':
                          mapLayer[row][col] = new block[0](col, row, Game)
                          game.utils.tileManager.getValue(Game, col, row, false, false)
                          break;
  
                      case '4':
                          Game.Player.respawn = [col, row - 1]
                          mapLayer[row][col] = new block[0](col, row, Game)
                          Game[layerName[0]][row][col] = new Game.Objects.Block[0](col, row, Game)
                          break;
  
                      default:
                          mapLayer[row][col] = new block[0](col, row, Game)
  
                  }
              })
          }
      }
    },
  
    save: function() {
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
  for(let t in game.assets.tiles) {
    game.utils.loadImg(game.assets.tiles[t])
  }

  // Load IMG
  for(let i in game.assets.textures) {
    game.utils.loadImg(game.assets.textures[i])
  }



  this.init = function(save = false) {
    if(save) this.mapInit.save(this)
    
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
      game.c.fillText(`ZOOM: x${(game.cfg.scale/64).toFixed(2)}`, game.canvas.width - 75, 15);
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

  this.animate = function(time) {
      if(!time) time = 0
      const now = time

      if(game.resetAnimate) lastRender = time

      this.dt = now - lastRender;

      if(this.dt > 100) this.dt = 100

      if (game.mode === 'play') {
        game.window.play.update(this.dt)
          // console.time('check')
          game.window.play.draw()
          // console.timeEnd('check')
      }

      else if (game.mode === 'edit') game.window.edit.update()
      
      displayInfo()
      
      lastRender = time

      if(game.resetAnimate) game.resetAnimate = false
      if(game.playing[0]) reqAnim = window.requestAnimationFrame(game.animate);
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
    
    for(el in this) {
      delete this[el]
    }
    var divList = document.getElementById('mapList'),
        divGame = document.getElementById('game');
    divList.style.display = "block"
    divGame.style.display = "none"
  }
  
}





// var Runner = new Game()




//   // TempMenu
//   let btns = []
          
//   const btn1 = new Button(Runner, Runner.canvas.width/2, Runner.canvas.height/2-40,     250, 80, 20, 'PLAY', 'test1', () => {
//     Runner.mode = 'play'
//     Runner.init()
//     Runner.playing = [true, true]
//     Runner.cfg.updateAll = true

//     Runner.resetAnimate = true
//     Runner.animate()
//     Runner.window.play.start()
//       btns.forEach(b => b.destroy())
//   })


//   const btn2 = new Button(Runner, Runner.canvas.width/2, btn1.getBottom()+20, 250, 80, 20, 'CUSTOM', 'test2', () => {
//     Runner.mode = 'edit'
//     Runner.init()
//       setTimeout(() => {
//         Runner.playing = [true, true]
//         Runner.cfg.updateAll = true

//         Runner.window[Runner.mode].start()
          
//         Runner.animate()
//           btns.forEach(b => b.destroy())
//       }, 200)
//   })
//   btns = [btn1, btn2]


  function gameMenu(game) {
    // CSS
    const head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style'),
          css = `
      #playMenu {
        position: absolute;
        width: 0;
        top: 0;
        bottom: 0;
        left: 0;
        background: rgba(15,15,15,0.99);
        text-align: center;
        overflow: hidden;
        padding-top: 36vh;
        padding-top: calc(50vh - (7vh*2+10));
      }
  
      .playBtn {
        display: block;
        width: 20vw;
        height: 7vh;
        background: black;
        color: white;
        margin: 0 auto 10px auto;
      }

      #timer {
        display: inline-block;
        margin: 0;
        position: absolute;
        text-align: center;
        top: 0;
        left: 0;
        width:100%;
        padding: 10px 0;
        color: white;
        font-size: 2.3em;
        font-weight: bold;
        z-index: 1000;
      }

      #timer > span {
        padding: 10px 20px;
        background: rgba(0,0,0,0.7);
      }
    `
    head.appendChild(style);
    style.type = 'text/css';
    style.id = 'stylePlay';
    if (style.styleSheet){
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
    div.id    = 'playMenu'
  
    
  
    // BUTTON Resume
    const btnResume = document.createElement('input')
    btnResume.id    = 'btnResume'
    btnResume.type  = 'button'
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
    btnRestart.id    = 'btnRestart'
    btnRestart.type  = 'button'
    btnRestart.classList.add('playBtn')
    btnRestart.value = 'RESTART'
    btnRestart.onclick = (e) => {
      e.preventDefault()
      game.window.play.gameReset()
    }
    div.append(btnRestart)
  
    
  
    // BUTTON EDIT
    const btnEdit = document.createElement('input')
    btnEdit.id    = 'btnEdit'
    btnEdit.type  = 'button'
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
  
  
  
  
    return div
  }


  function toolbar(game) {
    // CSS
    const head = document.head || document.getElementsByTagName('head')[0],
          style = document.createElement('style'),
          css = `
      #toolbar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        background: rgba(15,15,15, 1);
        overflow: hidden;
        text-align: center;
        padding-top: 20vh;
      }
  
      #toolbar > * {
        margin: 20px auto;
      }
  
      .dispBlock {
        display: block;
      }
  
      #playH2 {
        margin-bottom: 30px;
      }
  
      #btnHide {
        position: absolute;
        padding: ${game.canvas.height/2-20}px 7px;
        height: 100%;
        top: 0;
        right: 0;
        background: black;
        color: white;
        margin: 0 auto;
        text-decoration: none;
      }
  
      .inputSpan > input {
        width: 15%;
      }
  
      #selectSpan > * {
        display: block;
        margin: auto;
      }
  
      .playBtn {
        border: 1px solid white;
        padding: 10px 20px;
        background: black;
        font-weight: bold;
        color: white;
        margin: auto 5px !important;
        cursor: pointer;
      }
  
      #errorMsg {
        color: red;
        font-size: 1.1em;
      }
    `
    head.appendChild(style);
    style.type = 'text/css';
    style.id = 'styleEdit'
    if (style.styleSheet){
      // This is required for IE8 and below.
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  
    // CONTAINER
    const div = document.createElement('div')
    div.id          = 'toolbar'
    div.style.width = '25%'
  
  
    const btnHide = document.createElement('a')
    btnHide.id = 'btnHide'
    btnHide.innerHTML       = '|||'
    btnHide.href = ''
    btnHide.onclick = (e) => {
      e.preventDefault()
      const width = div.style.width.replace(/px|%/i, '')
      // e.preventDefault()
      if(width > 20) div.style.width = 20
      else div.style.width = '25%'
    }
    div.appendChild(btnHide)
  
  
    // TITLE
    const h2 = document.createElement('h2')
    h2.innerHTML = "SETTINGS:"
    h2.id = 'playH2'
    div.appendChild(h2)
    
    
    // INPUT NAME
    const nameSpan       = document.createElement('span')
    nameSpan.innerHTML   = 'Name: '
    nameSpan.classList.add('dispBlock', 'inputSpan')
    const inputName     = document.createElement('input')
    inputName.type      = 'text'
    inputName.value     = game.cfg.name
    
    inputName.onchange  = function(e) {
      game.cfg.name = e.target.value;
    }
    
    
    nameSpan.appendChild(inputName)
    div.appendChild(nameSpan)
  
  
    const layerName = ['background', 'static', 'dynamic', 'foreground']
    // INPUT ROW
    const rowSpan       = document.createElement('span')
    rowSpan.innerHTML   = 'Row: '
    rowSpan.classList.add('dispBlock', 'inputSpan')
    const inputRows     = document.createElement('input')
    inputRows.type      = 'number'
    inputRows.value     = game.cfg.rows
    inputRows.onchange  = function(e) {
      const newRows     = e.target.value,
            map         = [];
  
      layerName.forEach((name) => {
        const layer = game[name]
  
        for(let j = 0; j < newRows; j++) {
          if(layer[j]) map[j] = layer[j]
          else {
            map[j] = []
            for(let i = 0; i < game.cfg.cols; i++) {
              if(name === 'background') map[j][i] = new game.Objects.Block[0](i, j, game)
              else map[j][i] = 0
            }
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
    const colSpan       = document.createElement('span')
    colSpan.innerHTML   = 'Col: '
    colSpan.classList.add('dispBlock', 'inputSpan')
    const inputCols = document.createElement('input')
    inputCols.type  = 'number'
    inputCols.value = game.cfg.cols
    inputCols.onchange = function(e) {
      const newCols     = e.target.value
  
  
  
      layerName.forEach((name) => {
        const layer = game[name]
  
        let map = []
  
        for(let j = 0; j < game.cfg.rows; j++) {
          map[j] = []
          for(let i = 0; i < newCols; i++) {
            if(layer[j][i]) map[j][i] = layer[j][i]
            else {
              if(name === 'background') map[j][i] = new game.Objects.Block[0](i, j, game)
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
    const layerType = ['background', 'static', 'dynamic', 'foreground', 'special'],
          layerBlock = document.createElement('select')
    layerBlock.id    = 'layerBlock'
  
    for (var i = 0; i < layerType.length; i++) {
      const option  = document.createElement("option")
      option.value  = layerType[i]
      option.text   = layerType[i]
      layerBlock.appendChild(option)
    }
  
    
    layerBlock.value  = 'static'
    game.select.layer = 'static'
  
    layerBlock.style.display = 'block'
    layerBlock.onchange = (e) => {
      const id    = e.target.selectedIndex,
            value = e.target[id].value
      game.select.layer = value
  
      document.dispatchEvent(refreshBlockType);
    }
    const layerSpan       = document.createElement('span')
    layerSpan.innerHTML   = 'Layer '
    layerSpan.classList.add('dispBlock')
    layerSpan.id          = 'selectSpan'
    layerSpan.appendChild(layerBlock)
    div.appendChild(layerSpan)
  
  
    // SELECT BLOCK
    const selectSpan       = document.createElement('span')
    selectSpan.classList.add('dispBlock')
    selectSpan.id          = 'selectSpan'
    div.appendChild(selectSpan)
  
  
  
  
    function makeBlockSelect() {
      selectSpan.innerHTML = 'Block Type: '
  
      const selectBlock = document.createElement('select')
      selectBlock.id = 'selectBlock'
    
    
      const hasSpawn = typeExist('Spawn', game.static), 
            hasEnd   = typeExist('End',   game.static);
    
      let option  = document.createElement("option")
      selectBlock.appendChild(option)
      for (var i = 0; i < game.editObjects.length; i++) {
        const obj   = game.editObjects[i],
              layer = game.select.layer;
    
        if (obj[2] != layer) continue
    
        option  = document.createElement("option")
        option.value  = obj[0].name
        option.text   = obj[0].name
        if(obj[1] === 4 && hasSpawn) option.disabled = true
        else if(obj[1] === 5 && hasEnd) option.disabled = true
        selectBlock.appendChild(option)
      }
    
      selectBlock.style.display = 'block'
      selectBlock.onchange = (e) => {
        const id    = e.target.selectedIndex,
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
            hasEnd   = typeExist('End',   game.static);
  
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
      if(!game.playing[0]) {
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
  
    let str = ''

    var mapTest = game.static,
        cols    = mapTest[0].length,
        rows    = mapTest.length;

    for(let row = 0; row < mapTest.length; row++) {
      for(let col = 0; col < mapTest[0].length; col++) {
        layerName.forEach((name, id) => {
          const layer = game[name]
          if(!layer[row][col]) str += '#'
          else str += layer[row][col].id
        })

        str += (col+1 < mapTest[0].length) ? '-' : ''
      }

      str += (row+1 < mapTest.length) ? ',' : ''
    }



    var saveReq = new XMLHttpRequest();
    saveReq.onloadend = () => {
      return
    };
    saveReq.open('POST', '/saveMap', true);
    saveReq.setRequestHeader("Content-type", "application/json");
    saveReq.send(JSON.stringify({name: game.cfg.name, cols: cols, rows: rows, data: str}));

      // copyToClipboard(str)
      // alert('The map has been copied on your clipboard');
  }
  div.appendChild(btnSave)
  
  
  
  const errorMsg  = document.createElement('span')
  errorMsg.classList.add('dispBlock')
  errorMsg.id     = 'errorMsg'
  div.appendChild(errorMsg)
  
  
  
  
  return div




  
  
  // FUNCTIONS
  function copyToClipboard(text){
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
    if(obj.tile) 
    {
        result.tile = {}
        result.tile.name = obj.tile.name
        result.tile.value = obj.tile.value
    }
    return result;
  }
  
  function classToNumber(className) {
    switch(className) {
       case 'Block':
         return 0
  
      case 'Wall':
        return 1
  
      case 'BouncingBox':
        return 2
  
      case 'Spikes':
        return 3
  
      case 'Spawn':
        return 4
  
      case 'End':
        return 5
  
      default:
        return false
      // case 4:
      //   return
  
      // case 5:
      //   return
    }
  }
  
  function typeExist(type, map) {
    for(let row = 0; row < map.length; row++) {
      if(map[row].some(cell => cell.type === type)) return true
    }
  }
}
  
  