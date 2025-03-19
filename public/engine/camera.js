class Camera {

    constructor(game) {
        this.game = game
        this.x = 0
        this.y = 0
        this.oldX = 0
        this.oldY = 0
    }


    update() {
        const game = this.game,
            canvas = game.canvas,
            Player = game.Player,
            scale = game.cfg.scale,
            mapWidth = game.cfg.cols * scale,
            mapHeight = game.cfg.rows * scale,
            halfMapWidth = mapWidth - canvas.width,
            halfMapHeight = mapHeight - canvas.height,
            isOffsetX = (canvas.width < mapWidth) ? true : false,
            isOffsetY = (canvas.height < mapHeight) ? true : false,
            imgHorizontal = (mapWidth > mapHeight) ? true : false,
            PlayerHalfWidth = Player.camX + (Player.w / 2),
            PlayerHalfHeight = Player.camY + (Player.h / 2);

        let tx = -PlayerHalfWidth + canvas.width / 2,
            ty = -PlayerHalfHeight + canvas.height / 2;

        if (!isOffsetX) tx = canvas.width / 2 - mapWidth / 2
        if (!isOffsetY) ty = canvas.height / 2 - mapHeight / 2

        if (isOffsetX && PlayerHalfWidth <= canvas.width / 2) tx = 0
        else if (isOffsetX && PlayerHalfWidth >= (mapWidth - canvas.width / 2)) tx = -halfMapWidth

        if (isOffsetY && PlayerHalfHeight <= canvas.height / 2) ty = 0
        else if (isOffsetY && PlayerHalfHeight >= (mapHeight - canvas.height / 2)) ty = -halfMapHeight

        if (!Player.isDead) {
            game.translate.x = tx
            game.translate.y = ty
            this.x = game.translate.x
            this.y = game.translate.y
        } else {
            // If Camera POS === Player Respawn POS
            if (game.translate.x == tx && game.translate.y == ty) {
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