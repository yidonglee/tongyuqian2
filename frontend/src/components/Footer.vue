<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3 class="footer-title">道邦科技</h3>
        <p class="footer-desc">科技赋能品质<br>创新引领未来</p>
      </div>

      <div class="footer-section">
        <h4 class="section-title">快速链接</h4>
        <a v-for="item in quickLinks" :key="item.path" class="footer-link" @click="navigateTo(item.path)">
          {{ item.name }}
        </a>
      </div>

      <div class="footer-section">
        <h4 class="section-title">联系方式</h4>
        <div class="contact-info">
          <p>📍 {{ companyInfo.address }}</p>
          <p>📞 {{ companyInfo.phone }}</p>
          <p>📧 {{ companyInfo.email }}</p>
        </div>
      </div>

      <div class="footer-section">
        <h4 class="section-title">关注我们</h4>
        <div class="social-links">
          <div class="social-icon">微信</div>
          <div class="social-icon">微博</div>
          <div class="social-icon">抖音</div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {{ new Date().getFullYear() }} 道邦科技 版权所有</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const companyInfo = ref({
  address: '四川省成都市新都区白螺路117号',
  phone: '18581996143',
  email: 'liyidong1984@outlook.com'
})

const quickLinks = [
  { name: '首页', path: '/' },
  { name: '关于我们', path: '/about' },
  { name: '产品中心', path: '/products' },
  { name: '新闻资讯', path: '/news' }
]

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.footer {
  background: rgba(10, 14, 39, 0.98);
  border-top: 1px solid rgba(74, 158, 255, 0.2);
  padding: 60px 20px 30px;
  margin-top: 80px;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-title {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-desc {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
}

.section-title {
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 8px;
}

.footer-link {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #00d4ff;
}

.contact-info p {
  color: rgba(255, 255, 255, 0.6);
  line-height: 2;
  font-size: 14px;
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(74, 158, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.social-icon:hover {
  background: rgba(0, 212, 255, 0.2);
  color: #00d4ff;
  transform: translateY(-2px);
}

.footer-bottom {
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid rgba(74, 158, 255, 0.1);
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 14px;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 20px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}
</style>
