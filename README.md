# 魔芋科技企业门户网站

> 高端科技风格的魔芋粉企业门户网站，采用前后端分离架构

## 项目简介

这是一个为魔芋粉生产企业打造的现代化企业门户网站，采用高端科技风格设计，提供产品展示、企业介绍、新闻资讯等功能。

## 技术栈

### 前端
- **Vue 3** - 渐进式JavaScript框架
- **Vite** - 下一代前端构建工具
- **Vue Router** - 官方路由管理器
- **TDesign** - 腾讯企业级UI组件库
- **Axios** - HTTP客户端

### 后端
- **Node.js** - JavaScript运行环境
- **Express** - Web应用框架
- **SQLite** - 轻量级数据库（better-sqlite3）
- **CORS** - 跨域资源共享

## 项目结构

```
konjac-enterprise-portal/
├── backend/                 # 后端目录
│   ├── server.js           # 服务器入口文件
│   ├── package.json        # 后端依赖配置
│   └── konjac.db           # SQLite数据库文件（自动生成）
├── frontend/               # 前端目录
│   ├── index.html          # HTML入口
│   ├── vite.config.js      # Vite配置
│   ├── package.json        # 前端依赖配置
│   └── src/
│       ├── main.js         # 应用入口
│       ├── App.vue         # 根组件
│       ├── components/     # 公共组件
│       │   ├── Header.vue  # 顶部导航
│       │   └── Footer.vue  # 底部页脚
│       └── views/          # 页面组件
│           ├── Home.vue    # 首页
│           ├── About.vue   # 关于我们
│           ├── Products.vue # 产品中心
│           ├── News.vue    # 新闻资讯
│           └── Contact.vue # 联系我们
└── package.json            # 根目录配置
```

## 功能特性

### 前端页面
- **首页** - 展示公司亮点、精选产品、统计数据、最新资讯
- **关于我们** - 公司简介、企业使命愿景、企业文化、核心团队
- **产品中心** - 产品分类筛选、产品详情展示
- **新闻资讯** - 新闻列表、新闻详情查看
- **联系我们** - 联系表单、公司信息、地图展示

### 多语言支持（i18n）
- ✅ **中文** (zh) - 简体中文
- ✅ **English** (en) - 英文
- ✅ **日本語** (ja) - 日文
- 实时语言切换，无需刷新页面
- 全站内容支持多语言翻译
- 详细的国际化文档请参考 [I18N_GUIDE.md](./I18N_GUIDE.md)

### 后端API
- **产品管理** - 产品的增删改查（CRUD）
- **新闻管理** - 新闻信息获取
- **公司信息** - 企业基本信息

## 设计风格

- **配色方案**: 深色背景 + 科技蓝渐变 (#0a0e27 → #1a1f3a)
- **主题色**: 科技蓝 (#4a9eff) 和青色 (#00d4ff)
- **设计元素**: 玻璃态效果、渐变、圆角、阴影
- **响应式**: 完美适配PC端和移动端

## 快速开始

### 1. 安装依赖

```bash
# 安装根目录依赖
npm install

# 安装前端依赖
cd frontend && npm install

# 安装后端依赖
cd ../backend && npm install
```

### 2. 启动开发服务器

```bash
# 同时启动前后端开发服务器
npm run dev

# 或分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:3001
```

### 3. 构建生产版本

```bash
# 构建前端
npm run build

# 启动生产服务器
npm start
```

## API 接口文档

### 产品相关

- `GET /api/products` - 获取产品列表
- `GET /api/products/:id` - 获取单个产品详情
- `POST /api/products` - 创建产品
- `PUT /api/products/:id` - 更新产品
- `DELETE /api/products/:id` - 删除产品

查询参数：
- `category` - 按分类筛选
- `featured` - 筛选精选产品 (true/false)

### 新闻相关

- `GET /api/news` - 获取新闻列表
- `GET /api/news/:id` - 获取单条新闻详情

### 公司信息

- `GET /api/company` - 获取公司基本信息

## 数据库说明

项目使用SQLite数据库，首次启动会自动创建 `konjac.db` 文件并初始化示例数据。

数据表：
- `products` - 产品表
- `news` - 新闻表
- `company` - 公司信息表

## 移动端适配

项目采用响应式设计，完美适配各种屏幕尺寸：
- 桌面端: > 768px
- 平板端: 768px - 1024px
- 移动端: < 768px

## 技术亮点

1. **前后端分离** - 清晰的架构设计，便于维护和扩展
2. **零配置数据库** - SQLite无需额外安装，开箱即用
3. **现代化UI** - 采用TDesign组件库，高端科技风格
4. **快速开发** - Vite构建工具，开发体验极佳
5. **移动端优先** - 响应式设计，适配各种设备
6. **国际化支持** - 支持中文、英文、日文三种语言
7. **实时语言切换** - 无需刷新，即时生效

## 后续优化建议

1. 添加用户认证和权限管理
2. 实现真正的图片上传功能
3. 添加产品搜索功能
4. 集成真实的地图API
5. 添加数据统计分析功能
6. 实现SEO优化
7. 添加国际化支持

## 部署建议

### 前端部署
- 构建后上传到任意静态服务器
- 支持Vercel、Netlify、阿里云OSS等

### 后端部署
- 可部署到云服务器（阿里云、腾讯云等）
- 推荐使用PM2进行进程管理
- 建议配置Nginx作为反向代理

## 许可证

MIT

## 联系方式

- 企业名称: 魔芋科技有限公司
- 联系电话: 028-88888888
- 电子邮箱: contact@konjac-tech.com

---

**开发时间**: 2026年2月
**技术栈**: Vue 3 + Express + SQLite
**设计风格**: 高端科技风
