class End extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        this.h = Game.cfg.scale * 2
        this.type = 'End'
        this.color = 'cyan'
        this.empty = false
        this.collision = true

        this.id = 5
        this.purpose = ['Special']
    }

    update() {
        this.editUpdate()
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

    editUpdate() {
        this.w = this.game.cfg.scale
        this.h = this.game.cfg.scale * 2
    }

    resolve(player, side) {
        if (player.type != 'Player') return

        this.game.window.play.endTimer()
        player.dx = player.dy = 0
    }
}