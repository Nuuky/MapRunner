class BouncingBox extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        this.h = Game.cfg.scale / 2
        this.type = 'BouncingBox'
        this.color = 'purple'
        this.empty = false
        this.collision = true

        this.id = 2
        this.purpose = ['Static']
    }

    bounceFactor(obj) {
        return (obj.hasBounced) ? 0.7 : 1.1
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
        c.drawImage(game.assets.textures.BouncingBox.img, x, y, this.w + 1, this.h + 1)
        c.closePath()
    }


    collisionLeft(obj, player, newDelta, oldDelta) {
        // console.log('BB-LEFT')
        if (player.dx > this.game.cfg.magnitudex) {
            player.dx *= -obj.bounceFactor(player)
            player.hasBounced = true
        }
        else obj.stopLeft(obj, player)
    }

    collisionTop(obj, player, newDelta, oldDelta) {
        // console.log('BB-TOP')
        if (player.dy > this.game.cfg.magnitudey) {
            player.dy *= -obj.bounceFactor(player)
            // player.y += player.dy
            player.isOnFloor = true
            player.hasBounced = true
        }
        else obj.stopTop(obj, player)
    }

    collisionRight(obj, player, newDelta, oldDelta) {
        // console.log('BB-RIGHT')
        if (player.dx < -this.game.cfg.magnitudex) {
            player.dx *= -obj.bounceFactor(player)
            player.hasBounced = true
        }
        else obj.stopRight(obj, player)
    }

    collisionBottom(obj, player, newDelta, oldDelta) {
        // console.log('BB-BOT')
        if (player.dy < -this.game.cfg.magnitudex) {
            player.dy *= -obj.bounceFactor(player)
            player.hasBounced = true
        }
        else obj.stopBottom(obj, player)
    }


    resolve(player, side) {
        if (player.type != 'Player') return

        this.normalCollision(player, side)
    }
}