/* ========================================
   UIManager 类 - UI 管理器
   ======================================== */

class UIManager {
    constructor(game) {
        this.game = game;

        // 获取 DOM 元素引用
        this.elements = {
            // 分数显示
            score: document.getElementById('score'),
            highScore: document.getElementById('highScore'),

            // 界面屏幕
            menuScreen: document.getElementById('menuScreen'),
            pauseScreen: document.getElementById('pauseScreen'),
            gameOverScreen: document.getElementById('gameOverScreen'),

            // 游戏结束界面元素
            finalScore: document.getElementById('finalScore'),
            newRecord: document.getElementById('newRecord'),

            // 按钮
            startBtn: document.getElementById('startBtn'),
            resumeBtn: document.getElementById('resumeBtn'),
            quitBtn: document.getElementById('quitBtn'),
            restartBtn: document.getElementById('restartBtn'),
            backToMenuBtn: document.getElementById('backToMenuBtn')
        };

        this.setupEventListeners();
        this.updateHighScore();
    }

    /**
     * 设置按钮事件监听器
     */
    setupEventListeners() {
        // 开始游戏按钮
        this.elements.startBtn.addEventListener('click', () => {
            this.game.start();
        });

        // 继续游戏按钮
        this.elements.resumeBtn.addEventListener('click', () => {
            this.game.resume();
        });

        // 退出到菜单按钮（从暂停界面）
        this.elements.quitBtn.addEventListener('click', () => {
            this.game.quitToMenu();
        });

        // 重新开始按钮
        this.elements.restartBtn.addEventListener('click', () => {
            this.game.restart();
        });

        // 返回菜单按钮（从游戏结束界面）
        this.elements.backToMenuBtn.addEventListener('click', () => {
            this.game.quitToMenu();
        });
    }

    /**
     * 显示主菜单
     */
    showMenu() {
        this.hideAllScreens();
        this.elements.menuScreen.classList.remove('hidden');
    }

    /**
     * 隐藏所有界面
     */
    hideAllScreens() {
        this.elements.menuScreen.classList.add('hidden');
        this.elements.pauseScreen.classList.add('hidden');
        this.elements.gameOverScreen.classList.add('hidden');
    }

    /**
     * 显示暂停界面
     */
    showPauseScreen() {
        this.elements.pauseScreen.classList.remove('hidden');
    }

    /**
     * 隐藏暂停界面
     */
    hidePauseScreen() {
        this.elements.pauseScreen.classList.add('hidden');
    }

    /**
     * 显示游戏结束界面
     * @param {number} score - 最终分数
     * @param {number} highScore - 最高分
     * @param {boolean} isNewRecord - 是否是新纪录
     */
    showGameOverScreen(score, highScore, isNewRecord) {
        this.elements.finalScore.textContent = score;

        // 显示或隐藏新纪录提示
        if (isNewRecord) {
            this.elements.newRecord.classList.remove('hidden');
        } else {
            this.elements.newRecord.classList.add('hidden');
        }

        this.updateHighScore();
        this.elements.gameOverScreen.classList.remove('hidden');
    }

    /**
     * 更新分数显示
     * @param {number} score - 当前分数
     */
    updateScore(score) {
        this.elements.score.textContent = score;
    }

    /**
     * 更新最高分显示
     */
    updateHighScore() {
        const highScore = Storage.getHighScore();
        this.elements.highScore.textContent = highScore;
    }

    /**
     * 重置分数显示
     */
    resetScore() {
        this.elements.score.textContent = '0';
    }
}
