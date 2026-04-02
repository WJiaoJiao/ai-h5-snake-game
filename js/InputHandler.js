/* ========================================
   InputHandler 类 - 输入处理器
   ======================================== */

class InputHandler {
    constructor(game) {
        this.game = game;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.minSwipeDistance = 30; // 最小滑动距离

        this.setupKeyboardControls();
        this.setupTouchControls();
    }

    /**
     * 设置键盘控制
     */
    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            // 阻止方向键和空格键的默认行为（防止页面滚动）
            if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape'].includes(e.key)) {
                e.preventDefault();
            }

            // 游戏进行中时的控制
            if (this.game.state === 'PLAYING') {
                switch (e.key) {
                    case 'ArrowUp':
                    case 'w':
                    case 'W':
                        this.game.snake.setDirection('UP');
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        this.game.snake.setDirection('DOWN');
                        break;
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        this.game.snake.setDirection('LEFT');
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        this.game.snake.setDirection('RIGHT');
                        break;
                    case ' ':
                    case 'Escape':
                        this.game.pause();
                        break;
                }
            }
            // 暂停状态时的控制
            else if (this.game.state === 'PAUSED') {
                if (e.key === ' ' || e.key === 'Escape') {
                    this.game.resume();
                }
            }
        });
    }

    /**
     * 设置触摸控制（移动端滑动）
     */
    setupTouchControls() {
        const canvas = this.game.canvas;

        // 触摸开始
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.touchStartX = touch.clientX;
            this.touchStartY = touch.clientY;
        }, { passive: false });

        // 触摸结束
        canvas.addEventListener('touchend', (e) => {
            e.preventDefault();

            if (this.game.state !== 'PLAYING') {
                return;
            }

            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;

            // 计算滑动距离
            const dx = touchEndX - this.touchStartX;
            const dy = touchEndY - this.touchStartY;

            // 判断是否达到最小滑动距离
            if (Math.abs(dx) < this.minSwipeDistance && Math.abs(dy) < this.minSwipeDistance) {
                return;
            }

            // 判断滑动方向（取绝对值较大的轴）
            if (Math.abs(dx) > Math.abs(dy)) {
                // 水平滑动
                if (dx > 0) {
                    this.game.snake.setDirection('RIGHT');
                } else {
                    this.game.snake.setDirection('LEFT');
                }
            } else {
                // 垂直滑动
                if (dy > 0) {
                    this.game.snake.setDirection('DOWN');
                } else {
                    this.game.snake.setDirection('UP');
                }
            }
        }, { passive: false });

        // 阻止触摸移动时的默认行为（防止页面滚动）
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
}
