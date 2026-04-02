# 贪吃蛇游戏

一个精美流畅的 H5 贪吃蛇小游戏，采用原生 HTML5 Canvas + CSS3 + ES6+ 技术栈开发。

## 功能特性

- ✨ **精美 UI** - 现代化暗色主题，渐变色设计
- 🎮 **流畅交互** - 60 FPS 流畅动画，响应迅速
- 📱 **跨平台支持** - 支持桌面端和移动端
- ⌨️ **多种控制方式** - 键盘方向键和触摸滑动控制
- 📊 **分数系统** - 实时显示分数和最高分
- ⚡ **速度递增** - 随游戏进度自动提升难度
- 💾 **本地存储** - 自动保存最高分记录
- ⏸️ **暂停功能** - 随时暂停和继续游戏

## 技术栈

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **Canvas 2D API** - 游戏渲染
- **ES6+** - 现代 JavaScript
- **LocalStorage** - 数据持久化

## 如何运行

1. 克隆或下载本项目
2. 使用浏览器直接打开 `index.html` 文件
3. 或使用本地服务器运行（推荐）：

```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Python 2
python -m SimpleHTTPServer 8000

# 使用 Node.js http-server
npx http-server
```

4. 在浏览器中访问 `http://localhost:8000`

## 游戏说明

### 控制方式

**桌面端：**
- 方向键 ↑ ↓ ← → 或 W A S D 控制蛇移动
- 空格键或 ESC 键暂停游戏

**移动端：**
- 在屏幕上滑动控制蛇移动方向
- 上下左右滑动即可改变方向

### 游戏规则

1. 控制蛇吃食物（红色圆点）
2. 每吃一个食物，蛇会增长，分数 +1
3. 每吃 5 个食物，蛇的移动速度会提升
4. 撞到墙壁或咬到自己会游戏结束
5. 挑战更高分数，刷新你的最高记录！

## 项目结构

```
ai-h5-test/
├── index.html              # 主页面
├── css/
│   ├── style.css          # 全局样式
│   └── animations.css     # 动画效果
├── js/
│   ├── utils.js           # 工具函数和常量
│   ├── Snake.js           # 蛇对象类
│   ├── Food.js            # 食物对象类
│   ├── Renderer.js        # Canvas 渲染器
│   ├── InputHandler.js    # 输入处理器
│   ├── UIManager.js       # UI 管理器
│   ├── Game.js            # 游戏核心控制器
│   └── main.js            # 入口文件
└── README.md              # 项目说明
```

## 架构设计

游戏采用面向对象和模块化设计：

```
Game (游戏控制器)
├── Snake (蛇对象) - 负责蛇的移动、增长、碰撞检测
├── Food (食物对象) - 负责食物生成和碰撞检测
├── Renderer (渲染器) - 负责 Canvas 绘制
├── InputHandler (输入处理器) - 负责键盘和触摸事件
└── UIManager (UI管理器) - 负责界面切换和分数显示
```

## 性能优化

- 使用 `requestAnimationFrame` 实现流畅动画
- 帧率控制确保稳定的游戏速度
- 整数坐标避免子像素渲染
- 高效的碰撞检测算法

## 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器 (iOS Safari, Chrome Mobile)

## 开发说明

### 修改配置

在 `js/utils.js` 中可以修改游戏配置：

```javascript
const CELL_SIZE = 20;           // 格子大小
const GRID_WIDTH = 32;          // 网格宽度
const GRID_HEIGHT = 32;         // 网格高度
const INITIAL_SPEED = 8;        // 初始速度
const SPEED_INCREMENT = 0.5;    // 速度增量
const MAX_SPEED = 20;           // 最大速度
```

### 自定义主题

在 `css/style.css` 中修改 CSS 变量来自定义主题颜色：

```css
:root {
    --primary-bg: #1a1a2e;
    --secondary-bg: #16213e;
    --accent-color: #0f3460;
    --highlight-color: #00d9ff;
    --text-color: #eaeaea;
    --success-color: #4ecca3;
    --danger-color: #ff6b6b;
}
```

## 许可证

MIT License

---

**享受游戏吧！🐍**
