# 国际化（i18n）修复和使用指南

## 🔧 问题修复

### 已修复的问题

1. **翻译不响应语言切换** - 已修复
   - 使用Vue的reactive创建响应式状态
   - 添加refreshKey强制组件更新
   - 使用watch监听语言变化

2. **导航菜单翻译** - 已修复
   - 导航项使用computed自动更新
   - 语言切换时立即刷新显示

### 技术实现

```javascript
// i18n.js - 响应式状态管理
import { reactive } from 'vue'

const state = reactive({
  currentLang: 'zh'
})

const i18n = {
  setLanguage(lang) {
    if (translations[lang]) {
      state.currentLang = lang  // 触发响应式更新
      return true
    }
    return false
  },
  // ...
}
```

## 📝 使用方法

### 方法1：直接调用i18n函数（简单场景）

```vue
<script setup>
import i18n from '../i18n.js'

// 获取翻译
const title = i18n.t('home.hero.title')

// 切换语言
const changeToEnglish = () => {
  i18n.setLanguage('en')
}
</script>

<template>
  <h1>{{ i18n.t('home.hero.title') }}</h1>
  <button @click="changeToEnglish">English</button>
</template>
```

### 方法2：使用组合函数（推荐）

```vue
<script setup>
import { useI18n } from '../composables/useI18n.js'

const { t, currentLangCode, setLanguage } = useI18n()
</script>

<template>
  <h1>{{ t('home.hero.title') }}</h1>
  <p>{{ t('home.hero.description') }}</p>

  <!-- 显示当前语言代码 -->
  <span>当前语言: {{ currentLangCode }}</span>

  <!-- 切换语言 -->
  <button @click="setLanguage('zh')">中文</button>
  <button @click="setLanguage('en')">English</button>
  <button @click="setLanguage('ja')">日本語</button>
</template>
```

### 方法3：使用I18nText组件（简单快捷）

```vue
<script setup>
import I18nText from '../components/I18nText.vue'
</script>

<template>
  <I18nText key="home.hero.title" />
  <I18nText key="home.hero.description" />
</template>
```

### 方法4：使用watch监听变化（高级用法）

```vue
<script setup>
import { watch } from 'vue'
import i18n, { state as i18nState } from '../i18n.js'

// 监听语言变化
watch(() => i18nState.currentLang, (newLang, oldLang) => {
  console.log(`语言从 ${oldLang} 切换到 ${newLang}`)

  // 执行语言变化后的逻辑
  // 例如：重新加载数据、更新图表等
})
</script>
```

## 🎯 在页面中使用示例

### Home.vue示例

```vue
<script setup>
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()
</script>

<template>
  <h1 class="hero-title">
    <span class="title-gradient">{{ t('home.hero.title') }}</span><br>
    <span class="title-highlight">{{ t('home.hero.subtitle') }}</span>
  </h1>
  <p class="hero-subtitle">{{ t('home.hero.description') }}</p>
</template>
```

### Products.vue示例

```vue
<script setup>
import { useI18n } from '../composables/useI18n.js'

const { t } = useI18n()

const categories = [
  { key: 'products.all', code: '' },
  { key: 'category.konjac', code: '魔芋精粉' },
  { key: 'category.micropowder', code: '魔芋微粉' }
]
</script>

<template>
  <h1 class="section-title">{{ t('products.title') }}</h1>
  <p class="section-subtitle">{{ t('products.subtitle') }}</p>

  <button
    v-for="cat in categories"
    :key="cat.code"
    @click="selectCategory(cat.code)"
  >
    {{ t(cat.key) }}
  </button>
</template>
```

## 🔍 调试技巧

### 1. 查看当前语言

```javascript
import i18n, { state as i18nState } from '../i18n.js'

console.log('当前语言:', i18nState.currentLang)
console.log('语言信息:', i18n.getCurrentLanguage())
```

### 2. 查看所有可用语言

```javascript
import i18n from '../i18n.js'

const langs = i18n.getAvailableLanguages()
console.log('可用语言:', langs)
// 输出: [{ code: 'zh', name: '中文' }, ...]
```

### 3. 测试翻译是否存在

```javascript
import i18n from '../i18n.js'

const translated = i18n.t('some.key')
if (translated === 'some.key') {
  console.log('翻译不存在')
}
```

## ⚠️ 注意事项

1. **响应式更新**
   - 使用 `computed` 包裹翻译调用，确保自动更新
   - 或使用 `watch` 监听语言变化

2. **翻译键命名**
   - 建议使用 `页面类型.功能描述.具体内容` 格式
   - 例如: `home.hero.title`, `products.loading`

3. **语言切换**
   - 通过Header组件的语言切换器切换
   - 或在代码中调用 `setLanguage('en')`

4. **组件更新**
   - 如果翻译不更新，确保使用了computed或watch
   - 或使用refreshKey强制刷新（Header组件中已实现）

## 🚀 性能优化建议

1. **避免频繁调用t()**
   ```javascript
   // ❌ 不推荐 - 每次渲染都调用
   <div>{{ t('key') }}</div>

   // ✅ 推荐 - 使用computed缓存
   const text = computed(() => t('key'))
   ```

2. **批量翻译**
   ```javascript
   // 一次性获取所有需要的翻译
   const translations = {
     title: t('home.title'),
     subtitle: t('home.subtitle'),
     description: t('home.description')
   }
   ```

3. **条件翻译**
   ```javascript
   // 只在需要时获取翻译
   if (showTitle) {
     return t('home.title')
   }
   ```

## 📚 相关文件

- `frontend/src/i18n.js` - 国际化核心系统
- `frontend/src/composables/useI18n.js` - 组合函数
- `frontend/src/components/I18nText.vue` - 翻译组件
- `frontend/src/components/Header.vue` - 语言切换器

## 🆘 常见问题

### Q: 翻译不更新？
A: 确保使用了computed或watch监听语言变化

### Q: 如何添加新语言？
A: 在i18n.js的translations对象中添加新语言

### Q: 翻译键找不到怎么办？
A: 系统会回退到中文，或显示键名

### Q: 如何持久化语言选择？
A: 在setLanguage中添加localStorage保存

---

**最后更新**: 2026年2月22日
**状态**: ✅ 已修复并测试通过
