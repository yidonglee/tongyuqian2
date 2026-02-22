<template>
  <div class="news">
    <!-- Hero Section -->
    <section class="news-hero">
      <div class="hero-content">
        <h1 class="hero-title">新闻资讯</h1>
        <p class="hero-subtitle">了解我们的最新动态</p>
      </div>
    </section>

    <!-- News List -->
    <section class="news-list section">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        <div v-else-if="newsList.length === 0" class="empty">
          <p>暂无新闻资讯</p>
        </div>
        <div v-else class="news-grid">
          <article
            v-for="item in newsList"
            :key="item.id"
            class="news-card"
            @click="showNewsDetail(item)"
          >
            <div class="news-image">
              <img :src="item.image" :alt="item.title" />
              <div class="news-date">
                {{ formatDate(item.created_at) }}
              </div>
            </div>
            <div class="news-content">
              <h2 class="news-title">{{ item.title }}</h2>
              <p class="news-summary">{{ item.summary }}</p>
              <div class="news-footer">
                <button class="read-more-btn">阅读更多 →</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- News Detail Modal -->
    <t-dialog
      v-model:visible="detailVisible"
      :header="selectedNews?.title"
      width="800px"
      :footer="false"
    >
      <div v-if="selectedNews" class="news-detail">
        <div class="detail-header">
          <div class="detail-date">{{ formatDate(selectedNews.created_at) }}</div>
        </div>
        <div class="detail-image">
          <img :src="selectedNews.image" :alt="selectedNews.title" />
        </div>
        <div class="detail-summary">
          <strong>摘要：</strong>{{ selectedNews.summary }}
        </div>
        <div class="detail-content">
          {{ selectedNews.content }}
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog as TDialog } from 'tdesign-vue-next'
import axios from 'axios'

const newsList = ref([])
const loading = ref(true)
const detailVisible = ref(false)
const selectedNews = ref(null)

onMounted(async () => {
  try {
    const res = await axios.get('/api/news')
    if (res.data.success) {
      newsList.value = res.data.data
    }
  } catch (error) {
    console.error('加载新闻失败:', error)
  } finally {
    loading.value = false
  }
})

const showNewsDetail = (news) => {
  selectedNews.value = news
  detailVisible.value = true
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
</script>

<style scoped>
.news {
  padding-top: 70px;
}

.news-hero {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(74, 158, 255, 0.15), rgba(0, 212, 255, 0.05));
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
}

.section {
  padding: 60px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.loading, .empty {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.5);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 3px solid rgba(74, 158, 255, 0.2);
  border-top-color: #00d4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 30px;
}

.news-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.news-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.news-image {
  position: relative;
  width: 100%;
  height: 280px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.news-card:hover .news-image img {
  transform: scale(1.1);
}

.news-date {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 8px 16px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

.news-content {
  padding: 24px;
}

.news-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-summary {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-footer {
  display: flex;
  justify-content: flex-end;
}

.read-more-btn {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid rgba(74, 158, 255, 0.5);
  color: #00d4ff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.read-more-btn:hover {
  background: rgba(0, 212, 255, 0.1);
}

.news-detail {
  padding: 20px;
}

.detail-header {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.detail-date {
  padding: 8px 24px;
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 20px;
  color: #00d4ff;
  font-size: 14px;
}

.detail-image {
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-summary {
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-left: 4px solid #00d4ff;
  border-radius: 0 12px 12px 0;
  margin-bottom: 24px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
}

.detail-content {
  font-size: 16px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.85);
  text-align: justify;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }

  .detail-image {
    height: 250px;
  }
}
</style>
