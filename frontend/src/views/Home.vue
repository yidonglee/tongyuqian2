<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-background">
        <!-- 大魔芋图像 -->
        <div class="konjac-shape konjac-shape-1"></div>
        <div class="konjac-shape konjac-shape-2"></div>

        <!-- 魔芋颗粒背景动画 
        <div class="konjac-particle particle-1"></div>
        <div class="konjac-particle particle-2"></div>
        <div class="konjac-particle particle-3"></div>
        <div class="konjac-particle particle-4"></div>
        <div class="konjac-particle particle-5"></div>
        <div class="konjac-particle particle-6"></div>
        <div class="konjac-particle particle-7"></div>
        <div class="konjac-particle particle-8"></div>
-->
        <!-- 科技线条 -->
        <div class="tech-line line-1"></div>
        <div class="tech-line line-2"></div>
        <div class="tech-line line-3"></div>

        <!-- 光晕效果 -->
        <div class="glow-effect glow-1"></div>
        <div class="glow-effect glow-2"></div>
        <div class="glow-effect glow-3"></div>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-gradient">科技赋能品质</span><br>
          <span class="title-highlight">创新引领未来</span>
        </h1>
        <p class="hero-subtitle">专注于科技创新，致力于为客户提供卓越的产品和服务</p>
        <div class="hero-buttons">
          <button class="btn-primary" @click="$router.push('/products')">探索产品</button>
          <button class="btn-secondary" @click="$router.push('/contact')">联系我们</button>
        </div>
      </div>

      <div class="hero-decoration">
        <div class="floating-circle circle-1"></div>
        <div class="floating-circle circle-2"></div>
        <div class="floating-circle circle-3"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features section">
      <div class="container">
        <h2 class="section-title">核心优势</h2>
        <div class="features-grid">
          <div v-for="feature in features" :key="feature.title" class="feature-card">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Preview -->
    <section class="products-preview section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">精选产品</h2>
          <p class="section-subtitle">匠心打造，品质保证</p>
        </div>
        <div class="products-grid">
          <div v-for="product in featuredProducts" :key="product.id" class="product-card" @click="viewProduct(product.id)">
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-price">¥{{ product.price }}/kg</p>
            </div>
          </div>
        </div>
        <div class="section-actions">
          <button class="btn-outline" @click="$router.push('/products')">查看全部产品 →</button>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats">
      <div class="stats-container">
        <div v-for="stat in stats" :key="stat.label" class="stat-item">
          <div class="stat-number">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- News Preview -->
    <section class="news-preview section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">最新动态</h2>
          <p class="section-subtitle">了解我们的最新资讯</p>
        </div>
        <div class="news-grid">
          <div v-for="item in latestNews" :key="item.id" class="news-card" @click="viewNews(item.id)">
            <div class="news-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="news-content">
              <h3 class="news-title">{{ item.title }}</h3>
              <p class="news-summary">{{ item.summary }}</p>
            </div>
          </div>
        </div>
        <div class="section-actions">
          <button class="btn-outline" @click="$router.push('/news')">查看更多资讯 →</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const featuredProducts = ref([])
const latestNews = ref([])

const features = [
  {
    icon: '🔬',
    title: '自主研发',
    desc: '拥有专业的研发团队，持续创新生产工艺'
  },
  {
    icon: '🏭',
    title: '先进设备',
    desc: '引进国际领先的生产设备，确保产品品质'
  },
  {
    icon: '✅',
    title: '品质保证',
    desc: '严格的质量控制体系，每批产品都经过检测'
  },
  {
    icon: '🌍',
    title: '全球服务',
    desc: '产品远销全球多个国家和地区'
  }
]

const stats = [
  { value: '9+', label: '年行业经验' },
  { value: '50+', label: '合作伙伴' },
  { value: '100%', label: '品质保证' },
  { value: '24/7', label: '客户服务' }
]

onMounted(async () => {
  try {
    const [productsRes, newsRes] = await Promise.all([
      axios.get('/api/products?featured=true'),
      axios.get('/api/news')
    ])
    featuredProducts.value = productsRes.data.data.slice(0, 4)
    latestNews.value = newsRes.data.data.slice(0, 3)
  } catch (error) {
    console.error('加载数据失败:', error)
  }
})

const viewProduct = (id) => {
  // 可以添加产品详情页
  console.log('查看产品:', id)
}

const viewNews = (id) => {
  console.log('查看新闻:', id)
}
</script>

<style scoped>
.home {
  padding-top: 70px;
}

.hero {
  position: relative;
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1428 100%);
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
}

/* 大魔芋形状 */
.konjac-shape {
  position: absolute;
  z-index: 2;
  animation: floatKonjac 8s ease-in-out infinite;
}

.konjac-shape::before {
  content: '🍠';
  font-size: 200px;
  opacity: 0.15;
  filter: drop-shadow(0 0 30px rgba(74, 158, 255, 0.3));
}

.konjac-shape-1 {
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.konjac-shape-1::before {
  transform: rotate(-20deg);
}

.konjac-shape-2 {
  bottom: 10%;
  right: 5%;
  animation-delay: 4s;
}

.konjac-shape-2::before {
  transform: rotate(20deg);
}

@keyframes floatKonjac {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-30px) rotate(5deg);
  }
  50% {
    transform: translateY(0) rotate(0deg);
  }
  75% {
    transform: translateY(30px) rotate(-5deg);
  }
}

/* 魔芋颗粒 */
.konjac-particle {
  position: absolute;
  background: radial-gradient(circle, rgba(74, 158, 255, 0.6) 0%, rgba(0, 212, 255, 0.2) 100%);
  border-radius: 50%;
  animation: riseUp linear infinite;
  box-shadow: 0 0 30px rgba(74, 158, 255, 0.5);
  border: 2px solid rgba(74, 158, 255, 0.3);
}

.particle-1 { width: 40px; height: 40px; left: 8%; animation-duration: 10s; animation-delay: 0s; }
.particle-2 { width: 30px; height: 30px; left: 20%; animation-duration: 12s; animation-delay: 1.5s; }
.particle-3 { width: 50px; height: 50px; left: 35%; animation-duration: 14s; animation-delay: 3s; }
.particle-4 { width: 35px; height: 35px; left: 50%; animation-duration: 11s; animation-delay: 4.5s; }
.particle-5 { width: 45px; height: 45px; left: 65%; animation-duration: 13s; animation-delay: 6s; }
.particle-6 { width: 32px; height: 32px; left: 78%; animation-duration: 10.5s; animation-delay: 7.5s; }
.particle-7 { width: 55px; height: 55px; left: 88%; animation-duration: 15s; animation-delay: 9s; }
.particle-8 { width: 38px; height: 38px; left: 12%; animation-duration: 12.5s; animation-delay: 10.5s; }

@keyframes riseUp {
  0% {
    transform: translateY(100vh) scale(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1.5) rotate(360deg);
    opacity: 0;
  }
}

/* 科技线条 */
.tech-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.5), transparent);
  animation: scanLine 3s linear infinite;
}

.line-1 {
  top: 20%;
  width: 200px;
  animation-delay: 0s;
}

.line-2 {
  top: 40%;
  width: 300px;
  animation-delay: 1s;
}

.line-3 {
  top: 60%;
  width: 250px;
  animation-delay: 2s;
}

@keyframes scanLine {
  0% {
    left: -300px;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

/* 光晕效果 */
.glow-effect {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74, 158, 255, 0.2) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.glow-2 {
  width: 300px;
  height: 300px;
  top: 50%;
  right: 10%;
  animation-delay: 1.5s;
}

.glow-3 {
  width: 350px;
  height: 350px;
  bottom: 10%;
  left: 30%;
  animation-delay: 3s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
}

.hero-content {
  text-align: center;
  z-index: 2;
  max-width: 800px;
}

.hero-title {
  font-size: 64px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 30px;
}

.title-gradient {
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-highlight {
  color: #ffffff;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 50px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary, .btn-secondary, .btn-outline {
  padding: 16px 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  color: #ffffff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(74, 158, 255, 0.4);
}

.btn-secondary {
  background: transparent;
  border-color: rgba(74, 158, 255, 0.5);
  color: #00d4ff;
}

.btn-secondary:hover {
  background: rgba(0, 212, 255, 0.1);
}

.hero-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
}

.floating-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(74, 158, 255, 0.1), rgba(0, 212, 255, 0.05));
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.circle-2 {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: 10%;
  left: 15%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

.section {
  padding: 100px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 42px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-bottom: 60px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
  padding: 40px 30px;
  text-align: center;
  transition: all 0.3s;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
}

.feature-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.products-grid, .news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card, .news-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.product-card:hover, .news-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
}

.product-image, .news-image {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.product-image img, .news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img,
.news-card:hover .news-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 24px;
}

.product-category {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  font-size: 12px;
  border-radius: 6px;
  margin-bottom: 12px;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
}

.product-price {
  font-size: 20px;
  font-weight: 700;
  color: #00d4ff;
}

.stats {
  background: linear-gradient(135deg, rgba(74, 158, 255, 0.1), rgba(0, 212, 255, 0.05));
  padding: 80px 20px;
}

.stats-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 56px;
  font-weight: 800;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

.news-content {
  padding: 24px;
}

.news-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
  line-height: 1.4;
}

.news-summary {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.section-actions {
  text-align: center;
  margin-top: 50px;
}

.btn-outline {
  background: transparent;
  border: 2px solid rgba(74, 158, 255, 0.5);
  color: #00d4ff;
  padding: 14px 36px;
  font-size: 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-outline:hover {
  background: rgba(0, 212, 255, 0.1);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn-primary, .btn-secondary, .btn-outline {
    width: 100%;
    max-width: 280px;
  }

  .features-grid, .products-grid, .news-grid {
    grid-template-columns: 1fr;
  }

  .floating-circle {
    display: none;
  }
}
</style>
