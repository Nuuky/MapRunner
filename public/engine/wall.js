class Wall extends Block {
    constructor(x, y, Game) {
        super(x, y, Game)

        this.type = 'Wall'
        this.tile = {
            name: this.game.select.tile.name
        }
        this.empty = false
        this.collision = true

        this.id = 1
        this.purpose = ['Static']
    }

    draw() {
        const game = this.game,
            c = game.c,
            tile = game.assets.tiles[this.tile.name];

        c.drawImage(
            tile.img,              // IMG
            this.tile.x,           // CANVAS_X
            this.tile.y,           // CANVAS_Y
            tile.size,             // CANVAS_WIDTH
            tile.size,             // CANVAS_HEIGHT
            this.x * game.cfg.scale, // IMG_X
            this.y * game.cfg.scale, // IMG_Y 
            game.cfg.scale + 1,      // IMG_WIDTH
            game.cfg.scale + 1       // IMG_HEIGHT
        )
    }

    editUpdate() {
        const game = this.game
        this.w = game.cfg.scale
        this.h = game.cfg.scale

        if (this.tile) {
            this.collision = (this.tile.value < 255) ? true : false
            let v = this.game.utils.tileManager.getID(this.tile.value)
            this.tile.id = (v === 0) ? 0 : v - 1

            const x = (this.tile.id % game.assets.tiles[this.tile.name].w)
            const y = Math.floor(this.tile.id / game.assets.tiles[this.tile.name].w)

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
        if (player.type != 'Player') return

        this.normalCollision(player, side)
        // console.log(player.hasBounced)
    }
}