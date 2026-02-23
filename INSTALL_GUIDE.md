# 道邦科技企业门户网站 - 安装部署指南

## 📋 前提条件

- Node.js 16.0 或更高版本
- npm 8.0 或更高版本
- 磁盘空间至少 500MB（建议预留 1GB）

## 🚀 快速开始

### 第一步：安装依赖

```bash
# 在项目根目录执行
npm install
```

### 第二步：安装前端依赖

```bash
cd frontend
npm install
```

### 第三步：安装后端依赖

```bash
cd ../backend
npm install
```

### 第四步：启动开发服务器

```bash
# 方式1：同时启动前后端（推荐）
# 在项目根目录执行
npm run dev

# 方式2：分别启动
npm run dev:frontend  # 前端: http://localhost:3000
npm run dev:backend   # 后端: http://localhost:3001
```

## 📦 生产环境部署

### 构建前端

```bash
cd frontend
npm run build
```

构建完成后，前端文件将输出到 `frontend/dist` 目录。

### 启动生产服务器

```bash
# 启动后端服务器
cd backend
npm start
```

后端将运行在 http://localhost:3001

## 🗄️ 数据库说明

项目使用 SQLite 数据库，首次运行后会自动创建 `backend/konjac.db` 文件。

数据库会自动初始化以下示例数据：

- 6个产品记录（包含精粉、微粉等）
- 3条新闻资讯
- 公司基本信息

### 手动重置数据库

删除 `backend/konjac.db` 文件，重启服务器即可重新创建。

## 🔧 配置说明

### 前端配置 (frontend/vite.config.js)

```javascript
export default defineConfig({
  server: {
    port: 3000,              // 前端端口
    proxy: {
      '/api': {
        target: 'http://localhost:3001',  // 后端地址
        changeOrigin: true
      }
    }
  }
})
```

### 后端配置 (backend/server.js)

```javascript
const PORT = 3001  // 后端端口
```

## 🌐 API接口文档

### 产品接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/products | 获取产品列表 |
| GET | /api/products/:id | 获取产品详情 |
| POST | /api/products | 创建产品 |
| PUT | /api/products/:id | 更新产品 |
| DELETE | /api/products/:id | 删除产品 |

查询参数：
- `category` - 按分类筛选（如：精粉、微粉）
- `featured` - 筛选精选产品（true/false）

### 新闻接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/news | 获取新闻列表 |
| GET | /api/news/:id | 获取新闻详情 |

### 公司信息接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/company | 获取公司信息 |

## 📱 移动端适配

项目采用响应式设计，完美适配：

- ✅ 桌面端 (> 768px)
- ✅ 平板端 (768px - 1024px)
- ✅ 移动端 (< 768px)

移动端特性：
- 自适应布局
- 触摸友好的交互
- 移动端菜单
- 优化的字体大小

## 🎨 自定义主题

### 修改主色调

在以下文件中修改颜色变量：

1. `frontend/src/App.vue` - 全局背景色
2. `frontend/src/components/Header.vue` - 导航栏颜色
3. `frontend/src/views/*.vue` - 各页面配色

当前主题色：
- 主色: #4a9eff (科技蓝)
- 辅助色: #00d4ff (青色)
- 背景: #0a0e27 (深色)

## 🔍 故障排查

### 问题1：npm install 失败

**解决方案**：
```bash
# 清除npm缓存
npm cache clean --force

# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install
```

### 问题2：端口被占用

**解决方案**：
修改 `vite.config.js` 或 `server.js` 中的端口号

### 问题3：API请求失败

**解决方案**：
1. 检查后端服务是否正常运行
2. 检查代理配置是否正确
3. 查看浏览器控制台错误信息

## 📊 项目结构详解

```
konjac-enterprise-portal/
│
├── backend/                    # 后端目录
│   ├── server.js              # Express服务器
│   ├── package.json           # 后端依赖
│   ├── konjac.db              # SQLite数据库（自动生成）
│   └── node_modules/          # 后端依赖包
│
├── frontend/                   # 前端目录
│   ├── index.html             # HTML入口
│   ├── vite.config.js         # Vite配置
│   ├── package.json           # 前端依赖
│   ├── dist/                  # 构建输出目录（自动生成）
│   ├── node_modules/          # 前端依赖包
│   └── src/
│       ├── main.js            # 应用入口
│       ├── App.vue            # 根组件
│       ├── components/        # 公共组件
│       │   ├── Header.vue     # 顶部导航
│       │   └── Footer.vue     # 底部页脚
│       └── views/             # 页面组件
│           ├── Home.vue       # 首页
│           ├── About.vue      # 关于我们
│           ├── Products.vue   # 产品中心
│           ├── News.vue       # 新闻资讯
│           └── Contact.vue    # 联系我们
│
├── .gitignore                 # Git忽略文件
├── README.md                  # 项目说明
├── INSTALL_GUIDE.md           # 本文档
└── package.json               # 根目录配置
```

## 🚀 部署到云服务器

### 前端部署 (Vercel)

1. 安装 Vercel CLI
```bash
npm i -g vercel
```

2. 部署
```bash
cd frontend
vercel
```

### 后端部署 (云服务器)

1. 上传代码到服务器
2. 安装依赖
```bash
npm install --production
```

3. 使用 PM2 启动
```bash
npm install -g pm2
pm2 start backend/server.js --name konjac-api
pm2 save
pm2 startup
```

### 使用 Nginx 反向代理

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # 前端
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # 后端API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 💡 开发建议

1. **代码风格**：使用 ESLint 和 Prettier 统一代码风格
2. **版本控制**：使用 Git 进行版本管理
3. **环境变量**：使用 .env 文件管理敏感信息
4. **日志记录**：添加 Winston 等日志库
5. **错误处理**：完善错误处理和用户提示

## 📞 技术支持

如有问题，请联系：
- 邮箱: contact@daobang-tech.com
- 电话: 028-88888888

---

**祝您使用愉快！** 🎉
