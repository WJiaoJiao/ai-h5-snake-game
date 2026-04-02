/* ========================================
   游戏常量配置
   ======================================== */

// 网格配置
const CELL_SIZE = 20;           // 每个格子的像素大小
const GRID_WIDTH = 32;          // 网格宽度（格子数）
const GRID_HEIGHT = 32;         // 网格高度（格子数）
const CANVAS_WIDTH = CELL_SIZE * GRID_WIDTH;   // Canvas 宽度
const CANVAS_HEIGHT = CELL_SIZE * GRID_HEIGHT; // Canvas 高度

// 游戏速度配置
const INITIAL_SPEED = 8;        // 初始速度（格子/秒）
const SPEED_INCREMENT = 0.5;    // 每级增加的速度
const MAX_SPEED = 20;           // 最大速度限制
const SPEED_UP_INTERVAL = 5;    // 每吃多少个食物提升速度

// 方向常量
const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// 方向的反方向映射（用于防止180度��向）
const OPPOSITE_DIRECTIONS = {
    UP: 'DOWN',
    DOWN: 'UP',
    LEFT: 'RIGHT',
    RIGHT: 'LEFT'
};

// 颜色配置
const COLORS = {
    background: '#16213e',
    grid: 'rgba(255, 255, 255, 0.05)',
    snakeHead: '#4ecca3',
    snakeTail: '#2d8a6b',
    food: '#ff6b6b',
    foodGlow: '#ee5a52'
};

// 安全区域配置（避免食物生成在被UI遮挡的区域）
const SCORE_PANEL_HEIGHT_PX = 90;  // 分数面板占用的像素高度（含间距）
const SAFE_AREA_TOP = Math.ceil(SCORE_PANEL_HEIGHT_PX / CELL_SIZE);  // 顶部安全区域（格子数）

/* ========================================
   LocalStorage 工具函数
   ======================================== */

const Storage = {
    /**
     * 保存最高分
     * @param {number} score - 当前分数
     * @returns {boolean} 是否是新纪录
     */
    saveHighScore(score) {
        const currentHighScore = this.getHighScore();
        if (score > currentHighScore) {
            localStorage.setItem('snakeHighScore', score.toString());
            return true;
        }
        return false;
    },

    /**
     * 获取最高分
     * @returns {number} 最高分
     */
    getHighScore() {
        const highScore = localStorage.getItem('snakeHighScore');
        return highScore ? parseInt(highScore, 10) : 0;
    },

    /**
     * 清除最高分（调试用）
     */
    clearHighScore() {
        localStorage.removeItem('snakeHighScore');
    }
};

/* ========================================
   辅助工具函数
   ======================================== */

/**
 * 生成指定范围内的随机整数
 * @param {number} min - 最小值（包含）
 * @param {number} max - 最大值（不包含）
 * @returns {number} 随机整数
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * 检查两个坐标是否相等
 * @param {Object} pos1 - 坐标1 {x, y}
 * @param {Object} pos2 - 坐标2 {x, y}
 * @returns {boolean} 是否相等
 */
function positionEquals(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

/**
 * 将网格坐标转换为像素坐标
 * @param {number} gridPos - 网格坐标
 * @returns {number} 像素坐标
 */
function gridToPixel(gridPos) {
    return gridPos * CELL_SIZE;
}

/**
 * 将像素坐标转换为网格坐标
 * @param {number} pixelPos - 像素坐标
 * @returns {number} 网格坐标
 */
function pixelToGrid(pixelPos) {
    return Math.floor(pixelPos / CELL_SIZE);
}
