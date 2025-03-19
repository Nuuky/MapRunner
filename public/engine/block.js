class Block {
    constructor(x, y, Game) {
        this.type = 'Block'
        this.game = Game
        this.x = x
        this.y = y
        this.w = Game.cfg.scale
        this.h = Game.cfg.scale
        this.dx = 0
        this.dy = 0
        this.color = '#111115'
        this.empty = false
        this.collision = false

        this.id = 0
        this.purpose = ['Background']
        this.link = false
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
        return this.getRight(displayDelta) - this.w / 2
    }

    getHalfHeight(displayDelta) {
        return this.getBottom(displayDelta) - this.h / 2
    }

    draw() {
        if (this.game.mode === 'play') return
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

        const game = this.game,
            c = game.c,
            scale = game.cfg.scale,
            x = this.x * scale + (scale - this.w),
            y = this.y * scale + (scale - this.h);

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
        const objMovingLeft = (obj.dx < 0) ? true : false, objMovingRight = (obj.dx > 0) ? true : false,
            objMovingTop = (obj.dy < 0) ? true : false, objMovingBottom = (obj.dy > 0) ? true : false,
            collisionLeft = (side === 'LEFT') ? true : false, collisionRight = (side === 'RIGHT') ? true : false,
            collisionTop = (side === 'TOP') ? true : false, collisionBottom = (side === 'BOTTOM') ? true : false,
            col = this.x, row = this.y,
            utils = this.game.utils;



        if (objMovingBottom) {
            if (collisionTop && this.isColliding(this, obj, false, true)) {
                obj.collision.top.push({ obj: this, callback: this.collisionTop.bind(this) })
            }
            if (collisionLeft && objMovingRight) {
                if (utils.catchBlockCollision(col - 1, row) && this.isColliding(utils.catchBlockCollision(col - 1, row), obj, false, true)) {
                    obj.collision.top.push({ obj: this, callback: this.collisionTop.bind(this) })
                }
                else {
                    obj.collision.left.push({ obj: this, callback: this.collisionLeft.bind(this) })
                }
            }
            if (collisionRight && objMovingLeft) {
                if (utils.catchBlockCollision(col + 1, row) && this.isColliding(utils.catchBlockCollision(col + 1, row), obj, false, true)) {
                    obj.collision.top.push({ obj: this, callback: this.collisionTop.bind(this) })
                }
                else {
                    obj.collision.right.push({ obj: this, callback: this.collisionRight.bind(this) })
                }
            }
        }

        else if (objMovingTop) {
            if (collisionBottom && this.isColliding(this, obj, false, true)) {
                obj.collision.bottom.push({ obj: this, callback: this.collisionBottom.bind(this) })
            }
            if (collisionLeft) {
                if (utils.catchBlockCollision(col - 1, row) && this.isColliding(utils.catchBlockCollision(col - 1, row), obj, false, true)) {
                    obj.collision.bottom.push({ obj: this, callback: this.collisionBottom.bind(this) })
                }
                else {
                    obj.collision.left.push({ obj: this, callback: this.collisionLeft.bind(this) })
                }
            }
            if (collisionRight) {
                if (utils.catchBlockCollision(col + 1, row) && this.isColliding(utils.catchBlockCollision(col + 1, row), obj, false, true)) {
                    obj.collision.bottom.push({ obj: this, callback: this.collisionBottom.bind(this) })
                }
                else {
                    obj.collision.right.push({ obj: this, callback: this.collisionRight.bind(this) })
                }
            }
        }

        else if (objMovingLeft && collisionRight) {
            obj.collision.right.push({ obj: this, callback: this.collisionRight.bind(this) })
        }
        else if (objMovingRight && collisionLeft) {
            obj.collision.left.push({ obj: this, callback: this.collisionLeft.bind(this) })
        }
    }

    isColliding(box, p, x, y) {
        const l1 = box.getLeft(), r1 = box.getRight(),
            t1 = box.getTop(), b1 = box.getBottom(),

            l2 = p.getLeft(x),
            r2 = p.getRight(x),
            t2 = p.getTop(y),
            b2 = p.getBottom(y);


        if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) {
            return true
        }
        return false
    }
}