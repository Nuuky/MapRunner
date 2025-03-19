class Door extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        const scale = Game.cfg.scale

        this.h = scale * 2

        this.type = 'Door'
        this.color = 'green'
        this.empty = false
        this.collision = true

        this.open = false

        this.openSpeed = 0.5

        this.id = 9
        this.purpose = ['Static']
    }

    getLeft(displayDelta) {
        const scale = this.game.cfg.scale
        return this.x * scale + (scale - this.w) + ((displayDelta) ? this.dx : 0)
    }

    getTop(displayDelta) {
        const scale = this.game.cfg.scale
        return this.y * scale - scale + ((displayDelta) ? this.dy : 0)
    }

    draw() {
        const c = this.game.c,
            x = this.getLeft(), y = this.getTop(),
            w = this.w, h = this.h;

        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(x, y, w, h)
        c.closePath()
    }

    update(dt) {
        const scale = this.game.cfg.scale

        if (this.open && this.h > scale * 0.25) {
            this.h -= this.openSpeed * dt
        }
    }

    editUpdate() {
        const scale = this.game.cfg.scale
        this.h = scale * 2
        this.w = scale
    }

    resolve(obj, side) {
        if (obj.type != "Player") return

        if (!this.open && obj.key > 0) {
            obj.key = 0
            this.open = true
            console.log('open !')
        }

        this.normalCollision(obj, side)
    }
}

class Key extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        const scale = Game.cfg.scale

        this.w = scale / 2
        this.h = scale / 2

        this.type = 'Key'
        this.color = 'green'
        this.empty = false
        this.collision = true

        this.id = 8
        this.purpose = ['Static']
    }


    draw() {
        const c = this.game.c,
            x = this.getLeft(), y = this.getTop(),
            w = this.w, h = this.h;

        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(x, y, w, h)
        c.closePath()
    }

    update() {
        const scale = this.game.cfg.scale
        this.w = scale / 2
        this.h = scale / 2
    }

    resolve(obj, side) {
        if (obj.type != "Player") return

        if (obj.key > 0) return

        obj.key = 1
        this.game.static[this.y][this.x] = 0
    }
}