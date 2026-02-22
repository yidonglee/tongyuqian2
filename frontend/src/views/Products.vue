<template>
  <div class="products">
    <!-- Hero Section -->
    <section class="products-hero">
      <div class="hero-content">
        <h1 class="hero-title">产品中心</h1>
        <p class="hero-subtitle">匠心打造每一份产品</p>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="filter-section section">
      <div class="container">
        <div class="category-filter">
          <button
            v-for="cat in categories"
            :key="cat"
            class="filter-btn"
            :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-list section">
      <div class="container">
        <div v-if="loading" class="loading">
          <div class="loading-spinner"></div>
          <p>加载中...</p>
        </div>
        <div v-else-if="filteredProducts.length === 0" class="empty">
          <p>暂无产品</p>
        </div>
        <div v-else class="products-grid">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="product-card"
            @click="showProductDetail(product)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
              <div v-if="product.featured" class="featured-badge">精选</div>
            </div>
            <div class="product-info">
              <span class="product-category">{{ product.category }}</span>
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-spec">{{ product.specification }}</p>
              <div class="product-footer">
                <span class="product-price">¥{{ product.price }}/kg</span>
                <button class="view-btn">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Product Detail Modal -->
    <t-dialog
      v-model:visible="detailVisible"
      :header="selectedProduct?.name"
      width="600px"
      :footer="false"
    >
      <div v-if="selectedProduct" class="product-detail">
        <div class="detail-image">
          <img :src="selectedProduct.image" :alt="selectedProduct.name" />
        </div>
        <div class="detail-info">
          <div class="detail-badge">{{ selectedProduct.category }}</div>
          <p class="detail-desc">{{ selectedProduct.description }}</p>
          <div class="detail-spec">
            <h4>产品规格：</h4>
            <p>{{ selectedProduct.specification }}</p>
          </div>
          <div class="detail-price">
            <span class="price-label">参考价格：</span>
            <span class="price-value">¥{{ selectedProduct.price }}/kg</span>
          </div>
          <button class="contact-btn" @click="contactUs">联系我们</button>
        </div>
      </div>
    </t-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Dialog as TDialog } from 'tdesign-vue-next'
import axios from 'axios'

const products = ref([])
const loading = ref(true)
const selectedCategory = ref('全部')
const detailVisible = ref(false)
const selectedProduct = ref(null)

const categories = computed(() => {
  const cats = ['全部', ...new Set(products.value.map(p => p.category))]
  return cats
})

const filteredProducts = computed(() => {
  if (selectedCategory.value === '全部') {
    return products.value
  }
  return products.value.filter(p => p.category === selectedCategory.value)
})

onMounted(async () => {
  try {
    const res = await axios.get('/api/products')
    if (res.data.success) {
      products.value = res.data.data
    }
  } catch (error) {
    console.error('加载产品失败:', error)
  } finally {
    loading.value = false
  }
})

const showProductDetail = (product) => {
  selectedProduct.value = product
  detailVisible.value = true
}

const contactUs = () => {
  detailVisible.value = false
  // 可以添加跳转到联系页面的逻辑
}
</script>

<style scoped>
.products {
  padding-top: 70px;
}

.products-hero {
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

.category-filter {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.4);
}

.filter-btn.active {
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  border-color: #00d4ff;
  color: #ffffff;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
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

.product-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.product-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.product-image {
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.featured-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 14px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
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
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #ffffff;
}

.product-spec {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 24px;
  font-weight: 700;
  color: #00d4ff;
}

.view-btn {
  padding: 10px 24px;
  background: transparent;
  border: 1px solid rgba(74, 158, 255, 0.5);
  color: #00d4ff;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  background: rgba(0, 212, 255, 0.1);
}

.product-detail {
  padding: 20px;
}

.detail-image {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 24px;
}

.detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detail-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(0, 212, 255, 0.1);
  color: #00d4ff;
  border-radius: 20px;
  font-size: 14px;
  margin-bottom: 20px;
}

.detail-desc {
  font-size: 15px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 24px;
}

.detail-spec {
  margin-bottom: 24px;
}

.detail-spec h4 {
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 8px;
}

.detail-spec p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
}

.detail-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 24px;
}

.price-label {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
}

.price-value {
  font-size: 28px;
  font-weight: 700;
  color: #00d4ff;
}

.contact-btn {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(74, 158, 255, 0.4);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .category-filter {
    gap: 8px;
  }

  .filter-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}
</style>
