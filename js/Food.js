/* ========================================
   Food 类 - 食物对象
   ======================================== */

class Food {
    constructor() {
        // 食物位置
        this.position = { x: 0, y: 0 };
    }

    /**
     * 生成新的食物位置
     * @param {Snake} snake - 蛇对象，用于确保食物不生成在蛇身体上
     */
    spawn(snake) {
        let newPosition;
        let attempts = 0;
        const maxAttempts = 1000; // 防止无限循环

        // 随机生成位置，直到找到一个不在蛇身体上的位置
        do {
            newPosition = {
                x: randomInt(0, GRID_WIDTH),
                y: randomInt(SAFE_AREA_TOP, GRID_HEIGHT)  // 避开顶部安全区域
            };
            attempts++;

            // 如果尝试次数过多，说明几乎没有空位，直接使用当前位置
            if (attempts >= maxAttempts) {
                console.warn('食物生成尝试次数过多，使用当前位置');
                break;
            }
        } while (snake.isPositionOnBody(newPosition));

        this.position = newPosition;
    }

    /**
     * 检查蛇头是否吃到食物
     * @param {Object} snakeHead - 蛇头坐标 {x, y}
     * @returns {boolean} 是否吃到食物
     */
    checkCollision(snakeHead) {
        return positionEquals(this.position, snakeHead);
    }

    /**
     * 获取食物位置
     * @returns {Object} 食物坐标 {x, y}
     */
    getPosition() {
        return this.position;
    }

    /**
     * 获取食物的像素坐标（用于渲染）
     * @returns {Object} 像素坐标 {x, y}
     */
    getPixelPosition() {
        return {
            x: gridToPixel(this.position.x),
            y: gridToPixel(this.position.y)
        };
    }
}
