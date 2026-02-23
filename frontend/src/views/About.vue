<template>
  <div class="about">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-content">
        <h1 class="hero-title">关于我们</h1>
        <p class="hero-subtitle">科技赋能品质 · 创新引领未来</p>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="intro section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-content">
            <h2 class="section-title">公司简介</h2>
            <div class="intro-text">
              <p>{{ companyInfo.description }}</p>
              <p>自成立以来，道邦科技始终秉承"质量第一、客户至上"的经营理念，不断引进先进的生产设备和技术，建立了完善的质量管理体系。公司通过了ISO9001质量管理体系认证，产品远销欧美、东南亚等多个国家和地区，未来会积极拓展和深耕国内市场。</p>
            </div>
            <div class="intro-stats">
              <div class="intro-stat">
                <div class="stat-value">{{ companyInfo.founded }}</div>
                <div class="stat-label">成立年份</div>
              </div>
              <div class="intro-stat">
                <div class="stat-value">6+</div>
                <div class="stat-label">年行业经验</div>
              </div>
              <div class="intro-stat">
                <div class="stat-value">50+</div>
                <div class="stat-label">员工人数</div>
              </div>
            </div>
          </div>
          <div class="intro-image">
            <div class="image-placeholder">
              <div class="placeholder-icon">🏭</div>
              <p>现代化生产基地</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Vision -->
    <section class="mission-vision section">
      <div class="container">
        <div class="mv-grid">
          <div class="mv-card">
            <div class="mv-icon">🎯</div>
            <h3>企业使命</h3>
            <p>为客户提供高品质的产品，推动产业的可持续发展，为社会进步贡献力量</p>
          </div>
          <div class="mv-card">
            <div class="mv-icon">👁️</div>
            <h3>企业愿景</h3>
            <p>成为全球领先的科技创新企业，引领行业技术发展方向，打造世界级品牌</p>
          </div>
          <div class="mv-card">
            <div class="mv-icon">💡</div>
            <h3>核心价值观</h3>
            <p>创新、诚信、品质、共赢，以科技创新驱动企业发展，以诚信经营赢得客户信任</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Culture -->
    <section class="culture section">
      <div class="container">
        <h2 class="section-title">企业文化</h2>
        <div class="culture-grid">
          <div v-for="(item, index) in cultureItems" :key="index" class="culture-item">
            <div class="culture-number">0{{ index + 1 }}</div>
            <h3 class="culture-title">{{ item.title }}</h3>
            <p class="culture-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Team 
    <section class="team section">
      <div class="container">
        <h2 class="section-title">核心团队</h2>
        <p class="section-subtitle">专业团队，成就卓越</p>
        <div class="team-grid">
          <div v-for="member in teamMembers" :key="member.name" class="team-card">
            <div class="team-avatar">{{ member.avatar }}</div>
            <h3 class="team-name">{{ member.name }}</h3>
            <p class="team-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>
-->
    <!-- Certifications -->
    <section class="certifications section">
      <div class="container">
        <h2 class="section-title">资质认证</h2>
        <div class="cert-grid">
          <div v-for="cert in certifications" :key="cert" class="cert-badge">
            {{ cert }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const companyInfo = ref({
  description: '',
  founded: '2015'
})

const cultureItems = [
  {
    title: '创新驱动',
    desc: '持续投入研发，推动技术创新和产品升级，保持行业领先地位'
  },
  {
    title: '质量为本',
    desc: '严格把控产品质量，建立完善的质量管理体系，确保每一件产品都符合标准'
  },
  {
    title: '客户至上',
    desc: '以客户需求为导向，提供优质的产品和服务，与客户共同成长'
  },
  {
    title: '绿色发展',
    desc: '坚持可持续发展理念，推行绿色生产，保护环境，回馈社会'
  }
]

const teamMembers = [
  {
    name: '张明',
    role: '总经理',
    avatar: '👨‍💼'
  },
  {
    name: '李华',
    role: '技术总监',
    avatar: '👩‍🔬'
  },
  {
    name: '王强',
    role: '生产总监',
    avatar: '👨‍🏭'
  },
  {
    name: '赵敏',
    role: '销售总监',
    avatar: '👩‍💼'
  }
]

const certifications = [
  'ISO9001质量管理体系认证',
  '食品生产许可证',
  '出口食品卫生注册证书',
  '有机食品认证',
  '高新技术产品认证'
]

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
</script>

<style scoped>
.about {
  padding-top: 70px;
}

.about-hero {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(74, 158, 255, 0.15), rgba(0, 212, 255, 0.05));
  text-align: center;
}

.hero-content {
  z-index: 2;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.7);
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
  margin-bottom: 60px;
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

.intro-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.intro-content {
  .section-title {
    text-align: left;
  }
}

.intro-text p {
  font-size: 16px;
  line-height: 2;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.intro-stats {
  display: flex;
  gap: 40px;
  margin-top: 40px;
}

.intro-stat {
  text-align: center;
}

.stat-value {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 8px;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.placeholder-icon {
  font-size: 80px;
}

.image-placeholder p {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.5);
}

.mv-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.mv-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s;
}

.mv-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
}

.mv-icon {
  font-size: 56px;
  margin-bottom: 24px;
}

.mv-card h3 {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #ffffff;
}

.mv-card p {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
}

.culture-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.culture-item {
  position: relative;
  padding: 30px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
}

.culture-number {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 48px;
  font-weight: 800;
  color: rgba(74, 158, 255, 0.1);
  line-height: 1;
}

.culture-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
}

.culture-desc {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.8;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.team-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(74, 158, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s;
}

.team-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(0, 212, 255, 0.3);
  transform: translateY(-5px);
}

.team-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(74, 158, 255, 0.2), rgba(0, 212, 255, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  margin: 0 auto 20px;
  border: 2px solid rgba(0, 212, 255, 0.3);
}

.team-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ffffff;
}

.team-role {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.cert-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.cert-badge {
  background: linear-gradient(135deg, rgba(74, 158, 255, 0.1), rgba(0, 212, 255, 0.05));
  border: 1px solid rgba(74, 158, 255, 0.2);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  transition: all 0.3s;
}

.cert-badge:hover {
  background: rgba(0, 212, 255, 0.15);
  transform: translateY(-3px);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .intro-grid {
    grid-template-columns: 1fr;
  }

  .intro-content .section-title {
    text-align: center;
  }

  .intro-stats {
    justify-content: center;
  }

  .mv-grid,
  .culture-grid,
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
