/* ========================================
   Snake 类 - 蛇对象
   ======================================== */

class Snake {
    constructor() {
        // 初始化蛇的身体（数组，每个元素是一个坐标对象 {x, y}）
        // 初始位置在网格中心，长度为 3
        const startX = Math.floor(GRID_WIDTH / 2);
        const startY = Math.floor(GRID_HEIGHT / 2);

        this.body = [
            { x: startX, y: startY },           // 头部
            { x: startX - 1, y: startY },       // 身体
            { x: startX - 2, y: startY }        // 尾部
        ];

        // 当前移动方向
        this.direction = 'RIGHT';

        // 下一帧的方向（用于防止快速连按导致180度转向）
        this.nextDirection = 'RIGHT';

        // 是否刚吃到食物的标记
        this.justAte = false;
    }

    /**
     * 移动蛇
     */
    move() {
        // 更新当前方向为下一帧方向
        this.direction = this.nextDirection;

        // 复制头部坐标
        const head = { ...this.body[0] };

        // 根据方向更新头部坐标
        const dir = DIRECTIONS[this.direction];
        head.x += dir.x;
        head.y += dir.y;

        // 在头部添加新节点
        this.body.unshift(head);

        // 如果没有吃到食物，移除尾部节点
        if (!this.justAte) {
            this.body.pop();
        }

        // 重置吃食物标记
        this.justAte = false;
    }

    /**
     * 蛇增长（吃到食物时调用）
     */
    grow() {
        this.justAte = true;
    }

    /**
     * 设置蛇的移动方向
     * @param {string} newDirection - 新方向 (UP, DOWN, LEFT, RIGHT)
     */
    setDirection(newDirection) {
        // 防止180度转向（不能直接向反方向移动）
        if (OPPOSITE_DIRECTIONS[this.direction] !== newDirection) {
            this.nextDirection = newDirection;
        }
    }

    /**
     * 获取蛇头坐标
     * @returns {Object} 头部坐标 {x, y}
     */
    getHead() {
        return this.body[0];
    }

    /**
     * 检查蛇是否咬到自己
     * @returns {boolean} 是否发生自碰撞
     */
    checkSelfCollision() {
        const head = this.getHead();

        // 从第二个节点开始检查（第一个是头部本身）
        for (let i = 1; i < this.body.length; i++) {
            if (positionEquals(head, this.body[i])) {
                return true;
            }
        }

        return false;
    }

    /**
     * 检查某个坐标是否在蛇身体上
     * @param {Object} pos - 坐标 {x, y}
     * @returns {boolean} 是否在蛇身体上
     */
    isPositionOnBody(pos) {
        for (let i = 0; i < this.body.length; i++) {
            if (positionEquals(pos, this.body[i])) {
                return true;
            }
        }
        return false;
    }

    /**
     * 获取蛇的长度
     * @returns {number} 蛇的长度
     */
    getLength() {
        return this.body.length;
    }
}
