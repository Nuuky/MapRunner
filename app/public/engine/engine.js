class Engine {
    constructor(c, cols, rows, scale) {
        this.c = c
        this.cols = cols
        this.rows = rows
        this.cells = []
        this.scale = scale

        this.offX = null
        this.offY = null

        this.first = true;
    }

    create(cols, rows, scale, gap, offX, offY) {
        this.rows = rows
        this.cols = cols
        this.scale = scale

        this.offX = getOff(offX, gap)
        this.offY = getOff(offY, gap)

        this.clear()

        for (let i = 0; i < this.rows; i++) {
            this.cells[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.cells[i][j] = []
            }
        }

        function getOff(off, gap) {
            if (off >= 0) return 0
            if (off + gap * 64 > 0) {
                return off + (gap * 64 - (off + gap * 64))
            }
            else {
                return off + gap * 64
            }
        }
    }

    clear() {
        this.cells = []
    }

    insert(entity) {
        const x = entity.getLeft(true) + this.offX,
            y = entity.getTop(true) + this.offY,
            w = x + entity.w,
            h = y + entity.h,
            scale = this.scale,
            cellStartX = Math.floor(x / scale),
            cellEndX = Math.ceil(w / scale),
            cellStartY = Math.floor(y / scale),
            cellEndY = Math.ceil(h / scale);

        for (let row = cellStartY; row < cellEndY; row++) {
            for (let col = cellStartX; col < cellEndX; col++) {
                if (this.makeCell(row, col)) {
                    this.cells[row][col].push(entity)
                }
            }
        }

    }

    makeCell(row, col) {
        const cells = this.cells
        if (!cells[row]) return false
        if (!cells[row][col]) return false
        return true
    }

    isColliding(o1, o2) {
        const l1 = o1.getLeft(true), r1 = o1.getRight(true),
            t1 = o1.getTop(true), b1 = o1.getBottom(true),
            l2 = o2.getLeft(true), r2 = o2.getRight(true),
            t2 = o2.getTop(true), b2 = o2.getBottom(true);


        if (l1 < r2 && r1 > l2 && t1 < b2 && b1 > t2) {
            // console.log('collision')
            return true
        }
        // console.log('in')
        // console.log('no collision')
        return false
    }

    checkCells() {
        this.cells.forEach(row => {
            row.forEach(cell => {
                // if(this.first) console.log(cell)
                //if(!cell || cell.length <= 1) return
                this.testCellEntities(cell)
            })
        })
        this.first = false
    }

    testCellEntities(cell) {
        //console.log(cell)

        const length = cell.length;

        cell.forEach((entity1, i) => {
            // this.c.beginPath()
            // this.c.rect(entity1.getLeft(true), entity1.getTop(true), 64, 64)
            // this.c.fillStyle = 'green'
            // this.c.fill()
            // this.c.closePath()

            for (let j = i + 1; j < length; j++) {
                const entity2 = cell[j]
                if (!this.isColliding(entity1, entity2) || entity1 === entity2) continue //  || (isWall1 && isWall2)
                this.resolve(entity1, entity2)
            }
        })
    }

    resolve(A, B) {
        let Adx = A.dx, Ady = A.dy,
            Bdx = B.dx, Bdy = B.dy,
            steps = 1, maxSpeed = 16;

        if (Math.abs(A.dx) > maxSpeed || Math.abs(A.dy) > maxSpeed ||
            Math.abs(B.dx) > maxSpeed || Math.abs(B.dy) > maxSpeed) {
            steps = 10
        }

        for (let i = 1; i <= steps; i++) {
            Adx = A.dx / steps * i, Ady = A.dy / steps * i,
                Bdx = B.dx / steps * i, Bdy = B.dy / steps * i;

            const w = 0.5 * (A.w + B.w),
                h = 0.5 * (A.h + B.h),
                dx = (A.getHalfWidth() + Adx) - (B.getHalfWidth() + Bdx),
                dy = (A.getHalfHeight() + Ady) - (B.getHalfHeight() + Bdy);

            if (Math.abs(dx) <= w && Math.abs(dy) <= h) {
                /* collision! */
                const wy = w * dy,
                    hx = h * dx;

                if (wy > hx) {
                    if (wy > -hx) {
                        /* collision at the top */
                        A.resolve(B, 'TOP')
                        B.resolve(A, 'BOTTOM')
                    }
                    else {
                        /* on the left */
                        A.resolve(B, 'RIGHT')
                        B.resolve(A, 'LEFT')
                    }
                    break;
                }
                else {
                    if (wy > -hx) {
                        /* on the right */
                        A.resolve(B, 'LEFT')
                        B.resolve(A, 'RIGHT')
                    }
                    else {
                        /* at the bottom */
                        A.resolve(B, 'BOTTOM')
                        B.resolve(A, 'TOP')
                    }
                    break;
                }
            }
        }
    }
}