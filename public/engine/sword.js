class SwordSupport extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        this.type = 'SwordSupport'
        this.color = 'gray'
        this.empty = false
        this.collision = true

        this.id = 6
        this.purpose = ['Static']
    }

    draw() {
        const game = this.game,
            c = game.c,
            scale = game.cfg.scale,
            x = this.x * scale + (scale - this.w),
            y = this.y * scale + (scale - this.h);

        c.beginPath()
        c.fillStyle = this.color
        c.lineWidth = 1;
        c.rect(x, y, this.w + 1, this.h + 1)
        c.fill()
        c.closePath()
    }

    resolve(obj, side) {
        if (obj.type === 'Sword') {

        }
    }
}


class Sword extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        const scale = Game.cfg.scale

        this.w = scale / 2
        this.h = scale / 2

        this.inX = scale / 2 - this.w / 2
        this.inY = scale / 2 - this.h / 2

        this.type = 'Sword'
        this.color = 'yellow'
        this.empty = false
        this.collision = true


        this.dx = 0.3

        this.id = 7
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
        const game = this.game,
            scale = game.cfg.scale,
            movingLeft = (this.dx > 0) ? false : true,
            inX = this.inX,
            dx = this.dx;

        this.w = game.cfg.scale / 2
        this.h = game.cfg.scale / 2


        this.inX += dx * dt

        if (movingLeft && inX < 0) {
            this.game.dynamic[this.y][this.x] = 0
            this.x--
            this.game.dynamic[this.y][this.x] = this

            this.inX += scale
        }

        if (!movingLeft && inX > scale) {
            this.game.dynamic[this.y][this.x] = 0
            this.x++
            this.game.dynamic[this.y][this.x] = this

            this.inX -= scale
        }
    }


    editUpdate() {
        const scale = this.game.cfg.scale

        this.inX = scale / 2 - this.w / 2
        this.inY = scale / 2 - this.h / 2

        this.w = scale / 2
        this.h = scale / 2
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


    resolve(obj, side) {

        const game = this.game,
            dir = (this.dx > 0) ? 1 : 0,
            map = game.static,
            m_left = (this.dx > 0) ? false : true,
            dx = this.dx, x = this.x, y = this.y;

        switch (obj.type) {
            case 'SwordSupport':
                if ((map[y][x + dir]) && map[y][x + dir].type === 'SwordSupport') return
                else {
                    if (m_left && this.getLeft() < obj.getLeft()) this.dx = -dx
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