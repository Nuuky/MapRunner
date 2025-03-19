class Player extends Block {
    constructor(x, y, name, Game) {
        super(x, y, Game)

        this.type = 'Player'
        this.color = 'brown'
        this.name = name

        this.h = 100
        this.w = 50

        this.camX = this.x,
            this.camY = this.y

        this.key = 0

        this.hide = false

        this.respawn = [this.x, this.y]

        this.accel = this.game.cfg.accel
        this.maxSpeed = this.game.cfg.maxspeed
        this.gravity = this.game.cfg.gravity
        this.jumpForce = this.game.cfg.jumpforce

        this.native = {
            w: this.w,
            h: this.h,
            maxSpeed: this.maxSpeed
        }

        this.canJump = true
        this.isOnFloor = false
        this.isDead = false
        this.hasBounced = false
        this.isCrouching = false

        this.keys = {
            // Jump
            'ArrowUp': false,
            'Space': false,
            'KeyW': false, // Z or W

            // Crouch
            'KeyS': false,
            'ArrowDown': false,
            'ShiftLeft': false,

            // Left
            'ArrowRight': false,
            'KeyA': false, // A or Q

            // Right
            'ArrowLeft': false,
            'KeyD': false,
        }

        this.collision = {
            left: [],
            top: [],
            right: [],
            bottom: []
        }
    }

    getLeft(vel) {
        return this.x + ((vel) ? this.dx : 0)
    }

    getRight(vel) {
        return this.x + this.w + ((vel) ? this.dx : 0)
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
        this.key = 0
    }

    jump() {
        if (!this.isOnFloor || !this.canJump) return
        this.dy = -this.jumpForce
        this.isOnFloor = false
        this.canJump = false
    }

    crouch() {
        this.h = 50
        this.y += this.h
        this.maxSpeed *= 0.2
        this.isCrouching = true
    }

    uncrouch() {
        const game = this.game,
            cfg = game.cfg,
            col = Math.floor(this.x / cfg.scale),
            row = Math.floor((this.y - this.h) / cfg.scale),
            isCollidingTopLeft = this.isColliding(game.static, row, col, this),
            isCollidingTopRight = this.isColliding(game.static, row, col + 1, this);

        // console.log(isCollidingTopLeft || isCollidingTopRight)
        if (isCollidingTopLeft || isCollidingTopRight) return

        this.y -= this.h
        this.h = 100
        this.maxSpeed = this.native.maxSpeed
        this.isCrouching = false
    }

    die() {
        this.x = this.respawn[0] * this.game.cfg.scale
        this.y = this.respawn[1] * this.game.cfg.scale
        this.dx = 0
        this.dy = 0
        this.isOnFloor = false
        this.hasBounced = false
        this.isDead = true
        this.key = 0
        this.game.window.play.gameReset()
    }

    spawn() {
        this.isDead = false
    }


    draw() {
        if (this.isDead || this.hide) return

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
        const dx = this.dx,
            dy = this.dy,
            onFloor = this.isOnFloor,
            crouching = this.isCrouching,
            maxSpeed = this.maxSpeed,
            accel = this.accel,
            left = this.keys.ArrowLeft || this.keys.KeyA,
            up = this.keys.ArrowUp || this.keys.Space || this.keys.KeyW,
            right = this.keys.ArrowRight || this.keys.KeyD,
            down = this.keys.ArrowDown || this.keys.ShiftLeft || this.keys.KeyS;


        if (this.isDead || this.hide) return


        if (left) {
            if (!(crouching && Math.abs(dx) > maxSpeed)) {
                this.dx = Math.max((dx - accel), -maxSpeed)
            }
            this.isIdle = false
        }

        if (right) {
            if (!(crouching && Math.abs(dx) > maxSpeed)) {
                this.dx = Math.min((dx + accel), maxSpeed)
            }
            this.isIdle = false
        }

        if (left && right) {
            this.dx = 0
        }

        if (up) {
            this.jump()
        } else {
            this.canJump = true
        }

        if (!crouching && down) this.crouch()

        if (crouching && !down) this.uncrouch()


        // GRAVITY AND FRICTIONS
        this.dy += this.gravity * dt;
        if (this.isIdle || (crouching && Math.abs(dx) > maxSpeed)) {
            let friction = (onFloor) ? 0.02 : 0.012
            if (crouching && Math.abs(dx) > maxSpeed) friction = (onFloor) ? 0.0013 : 0
            this.dx = this.game.utils.lerp(dx, 0, friction * dt)
        }


        if (this.game.window.play.startTime === 0) {
            const keysArr = Object.values(this.keys)
            if (keysArr.some(e => e)) this.game.window.play.startTimer()
        }

    }

    resolve(obj, side) {
        // Something
    }

    update(dt) {
        // console.log(this.isDead)
        if (this.isDead || this.hide) return
        // console.log('PlayerY =', this.dy)

        this.handleCollision()


        if (this.dy > 0) this.isOnFloor = false

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
            cols = this.game.cfg.cols,
            rows = this.game.cfg.rows;

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
            return this.die()
            this.dy = 0
        }

        // console.log(this.x, dt, this.x*dt)
        this.x += this.dx * dt
        this.y += this.dy * dt




        this.camX = this.x
        this.camY = this.y
        if (this.isCrouching) this.camY -= this.h / 2

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
            t1 = box.getTop(), b1 = box.getBottom(),

            l2 = this.getLeft(),
            r2 = this.getRight(),
            t2 = (crouching) ? this.getTop() - this.h : this.getTop(),
            b2 = this.getBottom();


        if (l1 < r2 && r1 > l2 &&
            t1 < b2 && b1 > t2) {
            return true
        }
        return false
    }

    handleCollision() {
        const collLeft = this.collision.left,
            collTop = this.collision.top,
            collRight = this.collision.right,
            collBottom = this.collision.bottom,
            isCollLeft = (collLeft.length > 0) ? true : false,
            isCollTop = (collTop.length > 0) ? true : false,
            isCollRight = (collRight.length > 0) ? true : false,
            isCollBottom = (collBottom.length > 0) ? true : false,
            delta = {
                x: this.dx,
                y: this.dy
            };

        if (isCollTop) {
            const typePriority = {
                Spikes: false,
                BouncingBox: false,
                End: false,
                Wall: false,
                Door: false,
            }

            collTop.forEach(({ obj, callback }) => {
                if (typePriority.hasOwnProperty(obj.type)) typePriority[obj.type] = { obj, callback }
            })

            const priorityArray = Object.values(typePriority),
                objectToHandle = priorityArray.find(e => e);

            objectToHandle.callback(objectToHandle.obj, this, { x: this.dx, y: this.dy }, delta)
        }

        if (isCollBottom) {
            collBottom.forEach(({ obj, callback }) => {
                callback(obj, this, { x: this.dx, y: this.dy }, delta)
            })
        }

        if (isCollLeft) {
            collLeft.forEach(({ obj, callback }) => {
                callback(obj, this, { x: this.dx, y: this.dy }, delta)
            })
        }

        if (isCollRight) {
            collRight.forEach(({ obj, callback }) => {
                callback(obj, this, { x: this.dx, y: this.dy }, delta)
            })
        }
        // console.log(this.dy)

        this.collision.left = []
        this.collision.top = []
        this.collision.right = []
        this.collision.bottom = []
    }
}