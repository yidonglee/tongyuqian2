import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3001

// 中间件
app.use(cors())
app.use(express.json())

// 初始化数据库
const db = new Database(join(__dirname, 'konjac.db'))

// 创建表
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    description TEXT,
    specification TEXT,
    price REAL,
    image TEXT,
    featured INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS news (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    summary TEXT,
    content TEXT,
    image TEXT,
    published INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS company (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value TEXT
  );
`)

// 初始化示例数据
const initSampleData = () => {
  // 检查是否有数据
  const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count
  if (productCount === 0) {
    const products = [
      {
        name: '魔芋精粉 K-100',
        category: '魔芋精粉',
        description: '采用优质魔芋精制而成，粘度高，纯度达95%以上，广泛应用于食品工业',
        specification: '纯度≥95% | 粘度≥25000mpa·s | 细度200目',
        price: 28.00,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        featured: 1
      },
      {
        name: '魔芋微粉 K-200',
        category: '魔芋微粉',
        description: '超微研磨技术，颗粒更细，溶解性更强，适合高端食品应用',
        specification: '纯度≥90% | 粘度≥30000mpa·s | 细度300目',
        price: 35.00,
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        featured: 1
      },
      {
        name: '魔芋膳食纤维',
        category: '膳食纤维',
        description: '高纯度魔芋膳食纤维，健康食品首选，零脂肪低热量',
        specification: '膳食纤维≥90% | 胶质≥85%',
        price: 42.00,
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400',
        featured: 0
      },
      {
        name: '魔芋凝胶粉',
        category: '功能性配料',
        description: '特制凝胶配方，成型效果好，适用于果冻、布丁等制品',
        specification: '凝胶强度≥200g/cm² | 凝固时间5-10分钟',
        price: 32.00,
        image: 'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=400',
        featured: 1
      },
      {
        name: '魔芋复配粉',
        category: '复配产品',
        description: '科学配比多种功能性成分，满足多样化应用需求',
        specification: '魔芋粉+果胶+卡拉胶 | 定制化配比',
        price: 38.00,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
        featured: 0
      },
      {
        name: '魔芋素食品专用粉',
        category: '魔芋精粉',
        description: '专为素食食品开发，口感接近肉类，富含植物蛋白',
        specification: '纯度≥92% | 蛋白质≥8% | 粘度≥28000mpa·s',
        price: 30.00,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
        featured: 0
      }
    ]

    const insertProduct = db.prepare(`
      INSERT INTO products (name, category, description, specification, price, image, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)

    products.forEach(product => {
      insertProduct.run(product.name, product.category, product.description,
        product.specification, product.price, product.image, product.featured)
    })
  }

  // 检查新闻数据
  const newsCount = db.prepare('SELECT COUNT(*) as count FROM news').get().count
  if (newsCount === 0) {
    const news = [
      {
        title: '魔芋科技荣获2024年度食品行业创新奖',
        summary: '凭借在魔芋深加工领域的持续创新，魔芋科技荣获2024年度食品行业创新奖',
        content: '在刚刚结束的2024年度食品行业创新大会上，魔芋科技凭借其在魔芋深加工领域的持续创新和技术突破，荣获年度创新奖。这一奖项不仅是对魔芋科技在产品研发方面努力的肯定，也标志着公司在行业内的领先地位。',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
        published: 1
      },
      {
        title: '公司二期生产线正式投产，产能提升300%',
        summary: '二期生产线引进国际先进设备，实现生产流程全自动化',
        content: '经过两年的筹备和建设，魔芋科技二期生产线于今日正式投产。新生产线引进了德国先进的生产设备，实现了从原料投入到成品包装的全自动化生产流程，产能较一期提升了300%，将更好地满足市场需求。',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
        published: 1
      },
      {
        title: '魔芋科技与知名食品企业达成战略合作',
        summary: '双方将共同研发魔芋健康食品，拓展应用领域',
        content: '魔芋科技与国内知名食品企业正式签署战略合作协议，双方将发挥各自优势，共同开发新一代魔芋健康食品产品。此次合作将推动魔芋在休闲食品、功能性食品等领域的应用。',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800',
        published: 1
      }
    ]

    const insertNews = db.prepare(`
      INSERT INTO news (title, summary, content, image, published)
      VALUES (?, ?, ?, ?, ?)
    `)

    news.forEach(item => {
      insertNews.run(item.title, item.summary, item.content, item.image, item.published)
    })
  }

  // 初始化公司信息
  const insertCompanyInfo = db.prepare(`
    INSERT OR IGNORE INTO company (key, value) VALUES (?, ?)
  `)
  insertCompanyInfo.run('name', '魔芋科技有限公司')
  insertCompanyInfo.run('slogan', '科技赋能品质，创新引领未来')
  insertCompanyInfo.run('description', '魔芋科技是一家专注于魔芋粉研发、生产和销售的高新技术企业。公司拥有先进的的生产设备和专业的技术团队，致力于为客户提供高品质的魔芋粉产品和全方位的技术支持。')
  insertCompanyInfo.run('founded', '2015')
  insertCompanyInfo.run('address', '四川省成都市高新区天府大道1000号')
  insertCompanyInfo.run('phone', '028-88888888')
  insertCompanyInfo.run('email', 'contact@konjac-tech.com')
}

initSampleData()

// API路由

// 产品相关
app.get('/api/products', (req, res) => {
  try {
    const { category, featured } = req.query
    let sql = 'SELECT * FROM products WHERE 1=1'
    const params = []

    if (category) {
      sql += ' AND category = ?'
      params.push(category)
    }

    if (featured === 'true') {
      sql += ' AND featured = 1'
    }

    sql += ' ORDER BY featured DESC, created_at DESC'

    const products = db.prepare(sql).all(...params)
    res.json({ success: true, data: products })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get('/api/products/:id', (req, res) => {
  try {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, error: '产品不存在' })
    }
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.post('/api/products', (req, res) => {
  try {
    const { name, category, description, specification, price, image, featured } = req.body
    const result = db.prepare(`
      INSERT INTO products (name, category, description, specification, price, image, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(name, category, description, specification, price, image, featured ? 1 : 0)

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid)
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.put('/api/products/:id', (req, res) => {
  try {
    const { name, category, description, specification, price, image, featured } = req.body
    db.prepare(`
      UPDATE products
      SET name = ?, category = ?, description = ?, specification = ?, price = ?, image = ?, featured = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(name, category, description, specification, price, image, featured ? 1 : 0, req.params.id)

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id)
    res.json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.delete('/api/products/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id)
    res.json({ success: true, message: '删除成功' })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 新闻相关
app.get('/api/news', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news WHERE published = 1 ORDER BY created_at DESC LIMIT 10').all()
    res.json({ success: true, data: news })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get('/api/news/:id', (req, res) => {
  try {
    const news = db.prepare('SELECT * FROM news WHERE id = ?').get(req.params.id)
    if (!news) {
      return res.status(404).json({ success: false, error: '新闻不存在' })
    }
    res.json({ success: true, data: news })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 公司信息
app.get('/api/company', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM company').all()
    const info = {}
    rows.forEach(row => {
      info[row.key] = row.value
    })
    res.json({ success: true, data: info })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
