# 🚀 项目启动指南

## 前提条件

- Node.js 16.0+
- npm 8.0+

## 启动步骤

### 方式一：使用启动脚本（推荐）

1. **启动后端服务器**
```bash
# 方法1：直接启动
node c:\Users\liyid\CodeBuddy\20260222114450\backend\server-cjs.js

# 方法2：使用批处理文件
cd c:\Users\liyid\CodeBuddy\20260222114450\backend
node server-cjs.js
```

2. **启动前端服务器**
```bash
# 新开一个终端窗口
cd c:\Users\liyid\CodeBuddy\20260222114450\frontend
node ../node_modules/vite/bin/vite.js
```

### 方式二：使用npm脚本

1. **安装依赖**（首次运行）
```bash
npm install
```

2. **启动开发服务器**
```bash
# 同时启动前后端
npm run dev

# 或分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:3001
```

## 访问地址

- **前端**: http://localhost:3000
- **后端**: http://localhost:3001
- **API**: http://localhost:3001/api

## 功能特性

### 🌐 国际化支持

网站支持三种语言切换：
- **中文** (zh) - 简体中文
- **English** (en) - 英文
- **日本語** (ja) - 日文

**使用方法**：
1. 在顶部导航栏右侧找到语言切换按钮（显示当前语言代码）
2. 点击语言按钮，显示语言选择下拉菜单
3. 选择目标语言，整个网站内容立即切换

### 📱 响应式设计

- **PC端** (> 768px) - 完整功能布局
- **平板端** (768px - 1024px) - 优化布局
- **移动端** (< 768px) - 移动端菜单，触摸友好

## 预置数据

首次启动会自动创建SQLite数据库并初始化：

### 产品数据（6个）
- 精粉 K-100
- 微粉 K-200
- 膳食纤维
- 凝胶粉
- 复配粉
- 素食品专用粉

### 新闻数据（3条）
- 道邦科技荣获2024年度行业创新奖
- 公司二期生产线正式投产，产能提升300%
- 道邦科技与知名企业达成战略合作

### 公司信息
- 公司名称：道邦科技有限公司
- 成立年份：2015
- 地址：四川省成都市高新区天府大道1000号
- 电话：028-88888888
- 邮箱：contact@daobang-tech.com

## 常见问题

### Q: 后端启动失败，提示找不到模块？
A: 确保已安装依赖：`npm install`

### Q: 前端启动失败，连接被拒绝？
A: 确保后端服务已启动（端口3001）

### Q: 如何添加新的翻译？
A: 参考 `I18N_GUIDE.md` 文档

### Q: 如何修改默认语言？
A: 编辑 `frontend/src/i18n.js` 文件，修改 `current` 的值

## 文档说明

- **README.md** - 项目概述和功能介绍
- **INSTALL_GUIDE.md** - 详细安装部署指南
- **I18N_GUIDE.md** - 国际化功能使用指南
- **STARTUP_GUIDE.md** - 本文件，快速启动指南

## 技术支持

- 邮箱: contact@konjac-tech.com
- 电话: 028-88888888

---

**祝您使用愉快！** 🎉
