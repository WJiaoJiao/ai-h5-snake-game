/* ========================================
   Game 类 - 游戏核心控制器
   ======================================== */

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // 游戏状态: MENU, PLAYING, PAUSED, GAME_OVER
        this.state = 'MENU';

        // 分数
        this.score = 0;
        this.highScore = Storage.getHighScore();

        // 速度配置
        this.speed = INITIAL_SPEED;
        this.frameDelay = 1000 / this.speed;
        this.lastFrameTime = 0;
        this.animationId = null;

        // 创建游戏对象
        this.snake = new Snake();
        this.food = new Food();
        this.renderer = new Renderer(this.ctx);
        this.inputHandler = new InputHandler(this);
        this.uiManager = new UIManager(this);
    }

    /**
     * 初始化游戏
     */
    init() {
        // 显示主菜单
        this.uiManager.showMenu();
        this.uiManager.updateHighScore();
    }

    /**
     * 开始游戏
     */
    start() {
        // 重置游戏状态
        this.state = 'PLAYING';
        this.score = 0;
        this.speed = INITIAL_SPEED;
        this.frameDelay = 1000 / this.speed;

        // 创建新的蛇和食物
        this.snake = new Snake();
        this.food = new Food();
        this.food.spawn(this.snake);

        // 更新 UI
        this.uiManager.hideAllScreens();
        this.uiManager.resetScore();
        this.uiManager.updateHighScore();

        // 启动游戏循环
        this.lastFrameTime = performance.now();
        this.loop(this.lastFrameTime);
    }

    /**
     * 游戏主循环
     * @param {number} timestamp - 当前时间戳
     */
    loop(timestamp) {
        if (this.state !== 'PLAYING') {
            return;
        }

        // 帧率控制
        if (timestamp - this.lastFrameTime < this.frameDelay) {
            this.animationId = requestAnimationFrame((t) => this.loop(t));
            return;
        }

        this.lastFrameTime = timestamp;

        // 更新游戏逻辑
        this.update();

        // 渲染画面
        this.render(timestamp);

        // 继续下一帧
        this.animationId = requestAnimationFrame((t) => this.loop(t));
    }

    /**
     * 更新游戏逻辑
     */
    update() {
        // 蛇移动
        this.snake.move();

        // 食物碰撞检测
        if (this.food.checkCollision(this.snake.getHead())) {
            // 吃到食物
            this.snake.grow();
            this.food.spawn(this.snake);
            this.score++;
            this.updateSpeed();
            this.uiManager.updateScore(this.score);
        }

        // 游戏结束检测
        if (this.checkCollision()) {
            this.gameOver();
        }
    }

    /**
     * 渲染画面
     * @param {number} timestamp - 当前时间戳
     */
    render(timestamp) {
        this.renderer.clear();
        this.renderer.drawGrid();
        this.renderer.drawFood(this.food, timestamp);
        this.renderer.drawSnake(this.snake);
    }

    /**
     * 检查碰撞（墙壁和自身）
     * @returns {boolean} 是否发生碰撞
     */
    checkCollision() {
        const head = this.snake.getHead();

        // 墙壁碰撞检测
        if (head.x < 0 || head.x >= GRID_WIDTH ||
            head.y < 0 || head.y >= GRID_HEIGHT) {
            return true;
        }

        // 自身碰撞检测
        return this.snake.checkSelfCollision();
    }

    /**
     * 更新游戏速度
     */
    updateSpeed() {
        // 每吃 SPEED_UP_INTERVAL 个食物提升一次速度
        const level = Math.floor(this.score / SPEED_UP_INTERVAL);
        this.speed = INITIAL_SPEED + (level * SPEED_INCREMENT);

        // 限制最大速度
        this.speed = Math.min(this.speed, MAX_SPEED);

        // 更新帧延迟
        this.frameDelay = 1000 / this.speed;
    }

    /**
     * 暂停游戏
     */
    pause() {
        if (this.state === 'PLAYING') {
            this.state = 'PAUSED';
            this.uiManager.showPauseScreen();

            // 取消动画循环
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
    }

    /**
     * 继续游戏
     */
    resume() {
        if (this.state === 'PAUSED') {
            this.state = 'PLAYING';
            this.uiManager.hidePauseScreen();

            // 重新启动游戏循环
            this.lastFrameTime = performance.now();
            this.loop(this.lastFrameTime);
        }
    }

    /**
     * 游戏结束
     */
    gameOver() {
        this.state = 'GAME_OVER';

        // 取消动画循环
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // 保存最高分
        const isNewRecord = Storage.saveHighScore(this.score);
        if (isNewRecord) {
            this.highScore = this.score;
        }

        // 显示游戏结束界面
        this.uiManager.showGameOverScreen(this.score, this.highScore, isNewRecord);
    }

    /**
     * 重新开始游戏
     */
    restart() {
        this.start();
    }

    /**
     * 退出到主菜单
     */
    quitToMenu() {
        this.state = 'MENU';

        // 取消动画循环
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }

        // 显示主菜单
        this.uiManager.showMenu();
    }
}
