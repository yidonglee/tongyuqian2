<template>
  <header class="header">
    <div class="header-container">
      <div class="logo" @click="router.push('/')">
        <span class="logo-icon">🌿</span>
        <span class="logo-text">魔芋科技</span>
      </div>

      <nav class="nav" :class="{ 'nav-open': mobileMenuOpen }">
        <a
          v-for="item in navItems"
          :key="`${item.path}-${refreshKey}`"
          class="nav-item"
          :class="{ active: route.path === item.path }"
          @click="navigateTo(item.path)"
        >
          {{ item.name }}
        </a>

        <div class="lang-switcher">
          <button class="lang-btn" @click="langDropdownOpen = !langDropdownOpen">
            {{ currentLang.code }}
            <span class="lang-arrow">▼</span>
          </button>
          <div class="lang-dropdown" :class="{ show: langDropdownOpen }">
            <div
              v-for="lang in availableLangs"
              :key="`${lang.code}-${refreshKey}`"
              class="lang-option"
              :class="{ active: lang.code === currentLang.code }"
              @click="changeLanguage(lang.code)"
            >
              {{ lang.name }}
            </div>
          </div>
        </div>
      </nav>

      <button class="mobile-menu-btn" @click="mobileMenuOpen = !mobileMenuOpen">
        <span :class="{ open: mobileMenuOpen }"></span>
        <span :class="{ open: mobileMenuOpen }"></span>
        <span :class="{ open: mobileMenuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import i18n, { state as i18nState } from '../i18n.js'

const router = useRouter()
const route = useRoute()

const mobileMenuOpen = ref(false)
const langDropdownOpen = ref(false)

// 强制刷新key，用于触发组件更新
const refreshKey = ref(0)

const navItems = computed(() => [
  { name: i18n.t('nav.home'), path: '/' },
  { name: i18n.t('nav.about'), path: '/about' },
  { name: i18n.t('nav.products'), path: '/products' },
  { name: i18n.t('nav.news'), path: '/news' },
  { name: i18n.t('nav.contact'), path: '/contact' }
])

const currentLang = computed(() => i18n.getCurrentLanguage())
const availableLangs = computed(() => i18n.getAvailableLanguages())

const changeLanguage = (langCode) => {
  i18n.setLanguage(langCode)
  langDropdownOpen.value = false
  refreshKey.value++ // 触发组件更新
}

// 监听语言变化
watch(() => i18nState.currentLang, () => {
  refreshKey.value++
})

const navigateTo = (path) => {
  router.push(path)
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(74, 158, 255, 0.2);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.logo-icon {
  font-size: 32px;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #4a9eff, #00d4ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 8px;
  align-items: center;
}

.nav-item {
  padding: 10px 20px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}

.nav-item:hover {
  color: #ffffff;
  background: rgba(74, 158, 255, 0.1);
}

.nav-item.active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.15);
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 2px;
  background: linear-gradient(90deg, #4a9eff, #00d4ff);
  border-radius: 2px;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.mobile-menu-btn span {
  width: 25px;
  height: 2px;
  background: linear-gradient(90deg, #4a9eff, #00d4ff);
  transition: all 0.3s;
  border-radius: 2px;
}

.mobile-menu-btn span.open:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-btn span.open:nth-child(2) {
  opacity: 0;
}

.mobile-menu-btn span.open:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(10, 14, 39, 0.98);
    flex-direction: column;
    padding: 20px;
    gap: 5px;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
    border-bottom: 1px solid rgba(74, 158, 255, 0.2);
  }

  .nav.nav-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-item {
    padding: 15px 20px;
    text-align: center;
  }

  .nav-item.active::after {
    display: none;
  }

  .nav-item.active {
    background: rgba(0, 212, 255, 0.2);
  }

  .lang-switcher {
    display: none;
  }
}

.lang-switcher {
  position: relative;
  margin-left: 10px;
}

.lang-btn {
  padding: 8px 16px;
  background: rgba(74, 158, 255, 0.1);
  border: 1px solid rgba(74, 158, 255, 0.3);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s;
}

.lang-btn:hover {
  background: rgba(74, 158, 255, 0.2);
  border-color: rgba(0, 212, 255, 0.5);
}

.lang-arrow {
  font-size: 10px;
  transition: transform 0.3s;
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  background: rgba(10, 14, 39, 0.98);
  border: 1px solid rgba(74, 158, 255, 0.3);
  border-radius: 8px;
  min-width: 120px;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s;
  z-index: 1001;
}

.lang-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  padding: 10px 16px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.3s;
}

.lang-option:hover {
  background: rgba(74, 158, 255, 0.1);
  color: #ffffff;
}

.lang-option.active {
  color: #00d4ff;
  background: rgba(0, 212, 255, 0.1);
}
</style>
