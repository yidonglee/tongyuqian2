import { reactive } from 'vue'

// 语言包
const translations = {
  zh: {
    code: 'zh',
    name: '中文',
    // Header
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.products': '产品中心',
    'nav.news': '新闻资讯',
    'nav.contact': '联系我们',

    // Home
    'home.hero.title': '科技赋能品质',
    'home.hero.subtitle': '创新引领未来',
    'home.hero.description': '专注高品质魔芋粉研发生产，致力于为全球客户提供优质产品',
    'home.explore': '探索产品',
    'home.contact': '联系我们',
    'home.features': '核心优势',
    'home.feature1.title': '自主研发',
    'home.feature1.desc': '拥有专业的研发团队，持续创新生产工艺',
    'home.feature2.title': '先进设备',
    'home.feature2.desc': '引进国际领先的生产设备，确保产品品质',
    'home.feature3.title': '品质保证',
    'home.feature3.desc': '严格的质量控制体系，每批产品都经过检测',
    'home.feature4.title': '全球服务',
    'home.feature4.desc': '产品远销全球多个国家和地区',
    'home.featured': '精选产品',
    'home.featured.subtitle': '匠心打造，品质保证',
    'home.viewAll': '查看全部产品',
    'home.experience': '年行业经验',
    'home.partners': '合作伙伴',
    'home.quality': '品质保证',
    'home.service': '客户服务',
    'home.news': '最新动态',
    'home.news.subtitle': '了解我们的最新资讯',
    'home.moreNews': '查看更多资讯'
  },

  en: {
    code: 'en',
    name: 'English',
    // Header
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.news': 'News',
    'nav.contact': 'Contact',

    // Home
    'home.hero.title': 'Technology Empowers Quality',
    'home.hero.subtitle': 'Innovation Leads the Future',
    'home.hero.description': 'Dedicated to R&D and production of high-quality konjac powder, committed to providing premium products to global customers',
    'home.explore': 'Explore Products',
    'home.contact': 'Contact Us',
    'home.features': 'Core Advantages',
    'home.feature1.title': 'Independent R&D',
    'home.feature1.desc': 'Professional R&D team, continuously innovating production processes',
    'home.feature2.title': 'Advanced Equipment',
    'home.feature2.desc': 'Imported world-class production equipment to ensure product quality',
    'home.feature3.title': 'Quality Assurance',
    'home.feature3.desc': 'Strict quality control system, every batch tested',
    'home.feature4.title': 'Global Service',
    'home.feature4.desc': 'Products sold to many countries and regions worldwide',
    'home.featured': 'Featured Products',
    'home.featured.subtitle': 'Crafted with Excellence',
    'home.viewAll': 'View All Products',
    'home.experience': 'Years Experience',
    'home.partners': 'Partners',
    'home.quality': 'Quality Guarantee',
    'home.service': 'Customer Service',
    'home.news': 'Latest News',
    'home.news.subtitle': 'Stay Updated with Our Latest News',
    'home.moreNews': 'View More News'
  },

  ja: {
    code: 'ja',
    name: '日本語',
    // Header
    'nav.home': 'ホーム',
    'nav.about': '会社概要',
    'nav.products': '製品',
    'nav.news': 'ニュース',
    'nav.contact': 'お問い合わせ',

    // Home
    'home.hero.title': '技術が品質を向上',
    'home.hero.subtitle': '革新が未来をリード',
    'home.hero.description': '高品質コンニャク粉の研究開発と製造に専念し、世界中のお客様に最高品質の製品を提供します',
    'home.explore': '製品を探す',
    'home.contact': 'お問い合わせ',
    'home.features': '核心的強み',
    'home.feature1.title': '独自研究開発',
    'home.feature1.desc': '専門的な研究開発チームを擁し、継続的に製造プロセスを革新',
    'home.feature2.title': '先進設備',
    'home.feature2.desc': '世界クラスの生産設備を導入し、製品品質を確保',
    'home.feature3.title': '品質保証',
    'home.feature3.desc': '厳格な品質管理システム、全製品を検査',
    'home.feature4.title': 'グローバルサービス',
    'home.feature4.desc': '世界各国・地域に製品を販売',
    'home.featured': '注目製品',
    'home.featured.subtitle': '卓越した製品造り',
    'home.viewAll': '全製品を見る',
    'home.experience': '年の経験',
    'home.partners': 'パートナー',
    'home.quality': '品質保証',
    'home.service': '顧客サービス',
    'home.news': '最新ニュース',
    'home.news.subtitle': '最新情報をご確認ください',
    'home.moreNews': 'もっと見る'
  }
}

// 创建响应式状态
const state = reactive({
  currentLang: 'zh'
})

// i18n对象
const i18n = {
  // 获取当前语言
  getCurrentLang() {
    return state.currentLang
  },

  // 设置语言
  setLanguage(lang) {
    if (translations[lang]) {
      state.currentLang = lang
      return true
    }
    return false
  },

  // 获取翻译
  t(key) {
    const langData = translations[state.currentLang]
    if (langData && langData[key]) {
      return langData[key]
    }
    // 如果当前语言没有翻译，尝试使用中文
    if (state.currentLang !== 'zh' && translations.zh[key]) {
      return translations.zh[key]
    }
    // 如果都没有，返回key本身
    return key
  },

  // 获取当前语言信息
  getCurrentLanguage() {
    return translations[state.currentLang]
  },

  // 获取所有可用语言
  getAvailableLanguages() {
    return Object.values(translations)
  }
}

// 导出状态以便组件中使用
export { state }
export default i18n
