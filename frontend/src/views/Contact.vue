<template>
  <div class="contact">
    <!-- Hero Section -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title">联系我们</h1>
        <p class="hero-subtitle">期待与您携手合作</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-content section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2 class="section-title">发送消息</h2>
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-group">
                <label>姓名 *</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              <div class="form-group">
                <label>邮箱 *</label>
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="请输入您的邮箱"
                  required
                />
              </div>
              <div class="form-group">
                <label>电话</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="请输入您的联系电话"
                />
              </div>
              <div class="form-group">
                <label>主题</label>
                <select v-model="form.subject">
                  <option value="">请选择主题</option>
                  <option value="product">产品咨询</option>
                  <option value="price">价格咨询</option>
                  <option value="cooperation">商务合作</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div class="form-group">
                <label>消息内容 *</label>
                <textarea
                  v-model="form.message"
                  placeholder="请输入您的留言内容"
                  rows="6"
                  required
                ></textarea>
              </div>
              <button type="submit" class="submit-btn">
                发送消息
              </button>
            </form>
          </div>

          <!-- Contact Info -->
          <div class="contact-info-section">
            <h2 class="section-title">联系方式</h2>
            <div class="info-cards">
              <div class="info-card">
                <div class="info-icon">📍</div>
                <h3>公司地址</h3>
                <p>{{ companyInfo.address }}</p>
              </div>
              <div class="info-card">
                <div class="info-icon">📞</div>
                <h3>联系电话</h3>
                <p>{{ companyInfo.phone }}</p>
              </div>
              <div class="info-card">
                <div class="info-icon">📧</div>
                <h3>电子邮箱</h3>
                <p>{{ companyInfo.email }}</p>
              </div>
              <div class="info-card">
                <div class="info-icon">🕐</div>
                <h3>工作时间</h3>
                <p>周一至周五 9:00-18:00</p>
              </div>
            </div>

            <!-- Map Section -->
            <div class="map-section">
              <h3 class="map-title">地图位置</h3>
              <div class="map-container">
                <iframe
                  class="amap-iframe"
                  frameborder="0"
                  src="https://uri.amap.com/marker?position=104.156,30.825&name=道邦科技&coordinate=gaode&callnative=1"
                ></iframe>
              </div>
              <div class="map-actions">
                <a
                  href="https://uri.amap.com/marker?position=104.156,30.825&name=道邦科技&coordinate=gaode&callnative=1"
                  target="_blank"
                  class="map-btn"
                >
                  🗺️ 高德地图导航
                </a>
              </div>
            </div>

            <!-- Social Links -->
            <div class="social-section">
              <h3>关注我们</h3>
              <div class="social-links">
                <div class="social-link">微信</div>
                <div class="social-link">微博</div>
                <div class="social-link">抖音</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MessagePlugin } from 'tdesign-vue-next'
import axios from 'axios'

const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const companyInfo = ref({
  address: '四川省成都市高新区天府大道1000号',
  phone: '028-88888888',
  email: 'contact@konjac-tech.com'
})

onMounted(async () => {
  try {
    const res = await axios.get('/api/company')
    if (res.data.success) {
      companyInfo.value = { ...companyInfo.value, ...res.data.data }
    }
  } catch (error) {
    console.error('加载公司信息失败:', error)
  }
})

const handleSubmit = () => {
  // 这里可以添加实际的表单提交逻辑
  console.log('表单提交:', form.value)
  MessagePlugin.success('消息发送成功！我们会尽快与您联系。')
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
}
</script>

<style scoped>
.contact {
  padding-top: 70px;
}

.contact-hero {
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
  padding: 80px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 10px;
  color: #ffffff;
  font-size: 15px;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00d4ff;
  background: rgba(255, 255, 255, 0.08);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-group select {
  cursor: pointer;
}

.form-group select option {
  background: #0a0e27;
  color: #ffffff;
}

.submit-btn {
  padding: 16px 32px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  border: none;
  border-radius: 12px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(74, 158, 255, 0.4);
}

.info-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 40px;
}

.info-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: all 0.3s;
}

.info-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-3px);
}

.info-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.info-card h3 {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
}

.info-card p {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
}

.map-section, .social-section {
  margin-top: 40px;
}

.map-title, .social-section h3 {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 20px;
}

.map-container {
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
}

.amap-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.map-actions {
  display: flex;
  justify-content: center;
}

.map-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 28px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  color: #ffffff;
  text-decoration: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
}

.map-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(74, 158, 255, 0.4);
}

.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-link {
  padding: 12px 28px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(0, 212, 255, 0.1);
  border-color: #00d4ff;
  color: #00d4ff;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .info-cards {
    grid-template-columns: 1fr;
  }
}
</style>
