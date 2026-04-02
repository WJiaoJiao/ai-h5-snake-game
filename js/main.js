/* ========================================
   主入口文件
   ======================================== */

// 等待 DOM 加载完成
window.addEventListener('DOMContentLoaded', () => {
    // 获取 Canvas 元素
    const canvas = document.getElementById('gameCanvas');

    if (!canvas) {
        console.error('Canvas 元素未找到');
        return;
    }

    // 设置 Canvas 尺寸
    // 根据屏幕大小动态调整
    function resizeCanvas() {
        const isMobile = window.innerWidth < 768;

        if (isMobile) {
            // 移动端：全屏
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            // 桌面端：固定尺寸
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
        }
    }

    // 初始化 Canvas 尺寸
    resizeCanvas();

    // 监听窗口大小变化
    window.addEventListener('resize', resizeCanvas);

    // 创建游戏实例
    const game = new Game(canvas);

    // 初始化游戏
    game.init();

    // 调试信息（可选，生产环境可删除）
    console.log('🎮 贪吃蛇游戏已启动');
    console.log(`Canvas 尺寸: ${canvas.width}x${canvas.height}`);
    console.log(`网格大小: ${GRID_WIDTH}x${GRID_HEIGHT}`);
});
