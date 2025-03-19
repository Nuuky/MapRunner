class Spikes extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        this.h = Game.cfg.scale / 2
        this.type = 'Spikes'
        this.color = 'gray'
        this.empty = false
        this.collision = true

        this.id = 3
        this.purpose = ['Static']
    }

    update() {
        this.w = this.game.cfg.scale
        this.h = this.game.cfg.scale / 2
    }

    draw() {
        const game = this.game,
            c = game.c,
            scale = game.cfg.scale,
            x = this.x * scale,
            y = this.y * scale + (scale - this.h);

        c.beginPath()
        c.drawImage(game.assets.textures.Spikes.img, x, y, this.w + 1, this.h + 1)
        c.closePath()
    }

    collisionTop(obj, player, newDelta, oldDelta) {
        player.die()
    }

    resolve(player, side) {
        if (player.type != 'Player') return
        this.normalCollision(player, side)
    }
}