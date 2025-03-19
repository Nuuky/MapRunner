class Spawn extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        this.h = Game.cfg.scale * 2
        this.type = 'Spawn'
        this.color = 'brown'
        this.empty = true
        this.collision = false

        this.id = 4
        this.purpose = ['Special']
    }

    draw() {
        if (this.game.mode === 'edit') {
            const c = this.game.c,
                scale = this.game.cfg.scale,
                x = this.x * scale,
                y = this.y * scale + (scale - this.h);

            c.beginPath()
            c.fillStyle = this.color
            c.fillRect(x, y, this.w, this.h)
            c.closePath()
        }
    }

    editUpdate() {
        this.w = this.game.cfg.scale
        this.h = this.game.cfg.scale * 2
    }

    resolve(obj, side) {
        if (obj.type != 'Player') return


    }
}