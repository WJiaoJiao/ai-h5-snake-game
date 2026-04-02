/* ========================================
   Renderer 类 - Canvas 渲染器
   ======================================== */

class Renderer {
    constructor(ctx) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
    }

    /**
     * 清空画布
     */
    clear() {
        this.ctx.fillStyle = COLORS.background;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * 绘制背景网格
     */
    drawGrid() {
        this.ctx.strokeStyle = COLORS.grid;
        this.ctx.lineWidth = 1;

        // 绘制垂直线
        for (let x = 0; x <= GRID_WIDTH; x++) {
            const pixelX = gridToPixel(x);
            this.ctx.beginPath();
            this.ctx.moveTo(pixelX, 0);
            this.ctx.lineTo(pixelX, this.canvas.height);
            this.ctx.stroke();
        }

        // 绘制水平线
        for (let y = 0; y <= GRID_HEIGHT; y++) {
            const pixelY = gridToPixel(y);
            this.ctx.beginPath();
            this.ctx.moveTo(0, pixelY);
            this.ctx.lineTo(this.canvas.width, pixelY);
            this.ctx.stroke();
        }
    }

    /**
     * 绘制蛇
     * @param {Snake} snake - 蛇对象
     */
    drawSnake(snake) {
        const body = snake.body;
        const bodyLength = body.length;

        body.forEach((segment, index) => {
            const pixelX = gridToPixel(segment.x);
            const pixelY = gridToPixel(segment.y);

            // 计算颜色渐变比例（头部到尾部）
            const ratio = index / bodyLength;

            // 创建径向渐变
            const centerX = pixelX + CELL_SIZE / 2;
            const centerY = pixelY + CELL_SIZE / 2;
            const gradient = this.ctx.createRadialGradient(
                centerX, centerY, 0,
                centerX, centerY, CELL_SIZE / 2
            );

            // 头部较亮，尾部较暗
            const lightness = 55 - ratio * 25;
            gradient.addColorStop(0, `hsl(162, 63%, ${lightness}%)`);
            gradient.addColorStop(1, `hsl(162, 63%, ${lightness - 10}%)`);

            // 绘制蛇身体节
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(pixelX, pixelY, CELL_SIZE, CELL_SIZE);

            // 添加白色半透明边框增强立体感
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(pixelX + 1, pixelY + 1, CELL_SIZE - 2, CELL_SIZE - 2);

            // 蛇头添加眼睛效果
            if (index === 0) {
                this.drawSnakeEyes(segment, snake.direction);
            }
        });
    }

    /**
     * 绘制蛇的眼睛
     * @param {Object} headPos - 蛇头位置 {x, y}
     * @param {string} direction - 蛇的方向
     */
    drawSnakeEyes(headPos, direction) {
        const pixelX = gridToPixel(headPos.x);
        const pixelY = gridToPixel(headPos.y);
        const centerX = pixelX + CELL_SIZE / 2;
        const centerY = pixelY + CELL_SIZE / 2;

        // 眼睛大小和偏移
        const eyeRadius = 3;
        const eyeOffset = 6;

        let eye1X, eye1Y, eye2X, eye2Y;

        // 根据方向确定眼睛位置
        switch (direction) {
            case 'UP':
                eye1X = centerX - eyeOffset;
                eye1Y = centerY - eyeOffset;
                eye2X = centerX + eyeOffset;
                eye2Y = centerY - eyeOffset;
                break;
            case 'DOWN':
                eye1X = centerX - eyeOffset;
                eye1Y = centerY + eyeOffset;
                eye2X = centerX + eyeOffset;
                eye2Y = centerY + eyeOffset;
                break;
            case 'LEFT':
                eye1X = centerX - eyeOffset;
                eye1Y = centerY - eyeOffset;
                eye2X = centerX - eyeOffset;
                eye2Y = centerY + eyeOffset;
                break;
            case 'RIGHT':
                eye1X = centerX + eyeOffset;
                eye1Y = centerY - eyeOffset;
                eye2X = centerX + eyeOffset;
                eye2Y = centerY + eyeOffset;
                break;
        }

        // 绘制眼睛
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.beginPath();
        this.ctx.arc(eye1X, eye1Y, eyeRadius, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(eye2X, eye2Y, eyeRadius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    /**
     * 绘制食物（带脉动动画效果）
     * @param {Food} food - 食物对象
     * @param {number} timestamp - 当前时间戳
     */
    drawFood(food, timestamp) {
        const pos = food.getPixelPosition();

        // 使用正弦函数实现脉动效果
        const pulse = Math.sin(timestamp * 0.005) * 0.15 + 1;
        const size = CELL_SIZE * pulse;
        const offset = (CELL_SIZE - size) / 2;

        const centerX = pos.x + CELL_SIZE / 2;
        const centerY = pos.y + CELL_SIZE / 2;

        // 创建径向渐变
        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, size / 2
        );
        gradient.addColorStop(0, COLORS.food);
        gradient.addColorStop(0.7, COLORS.foodGlow);
        gradient.addColorStop(1, 'rgba(255, 107, 107, 0.3)');

        // 绘制食物（圆形）
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // 添加光晕效果
        this.ctx.shadowColor = COLORS.food;
        this.ctx.shadowBlur = 15 * pulse;
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }
}
