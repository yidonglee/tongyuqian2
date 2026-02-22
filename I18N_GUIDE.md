# 国际化（i18n）功能说明

## 🌐 支持的语言

网站已支持以下三种语言：

- **中文** (zh) - 简体中文
- **English** (en) - 英文
- **日本語** (ja) - 日文

## 🎯 功能特性

### 1. 语言切换
- 在顶部导航栏右侧可以看到语言切换按钮
- 点击语言按钮，显示可用的语言列表
- 选择语言后，整个网站内容立即切换

### 2. 实时翻译
- 所有页面内容支持语言切换
- 导航菜单、按钮、表单标签等自动翻译
- 产品分类和新闻内容支持多语言

### 3. 持久化存储（建议后续添加）
```javascript
// 可以在 i18n.js 中添加 localStorage 支持
const savedLang = localStorage.getItem('language')
if (savedLang && i18n.languages[savedLang]) {
  i18n.current = savedLang
}
```

## 📝 使用方法

### 在组件中使用

```vue
<script setup>
import { useI18n } from '../composables/useI18n.js'

const { t, currentLang, setLanguage } = useI18n()
</script>

<template>
  <h1>{{ t('home.hero.title') }}</h1>
  <p>{{ t('home.hero.description') }}</p>

  <!-- 显示当前语言 -->
  <span>Current: {{ currentLang.name }}</span>

  <!-- 切换语言 -->
  <button @click="setLanguage('en')">English</button>
  <button @click="setLanguage('ja')">日本語</button>
</template>
```

### 在 JavaScript 中使用

```javascript
import i18n from '../i18n.js'

// 获取翻译文本
const title = i18n.t('products.title')

// 设置语言
i18n.setLanguage('en')

// 获取当前语言
const current = i18n.getCurrentLanguage()

// 获取所有可用语言
const langs = i18n.getAvailableLanguages()
```

## 🔧 添加新的翻译

### 1. 在 `i18n.js` 中添加翻译键

```javascript
export const i18n = {
  languages: {
    zh: {
      'new.key': '新的中文翻译'
    },
    en: {
      'new.key': 'New English Translation'
    },
    ja: {
      'new.key': '新しい日本語翻訳'
    }
  }
}
```

### 2. 在组件中使用

```vue
<template>
  <p>{{ t('new.key') }}</p>
</template>
```

## 📋 翻译键命名规范

建议使用以下命名规范：

```
页面类型.功能描述.具体内容
```

示例：
- `nav.home` - 导航栏首页
- `home.hero.title` - 首页Hero标题
- `products.loading` - 产品加载状态
- `contact.send` - 联系页面发送按钮

## 🎨 自定义语言主题

可以修改 `i18n.js` 中的语言配置来自定义：

```javascript
languages: {
  zh: {
    code: 'zh',
    name: '简体中文',  // 语言显示名称
    // ... 翻译内容
  }
}
```

## 🔍 当前已翻译的页面

✅ 导航栏 (Header)
✅ 首页 (Home)
✅ 关于我们 (About)
✅ 产品中心 (Products)
✅ 新闻资讯 (News)
✅ 联系我们 (Contact)
✅ 页脚 (Footer)

## 📌 注意事项

1. **翻译完整性**：确保所有三种语言都有对应的翻译
2. **翻译准确性**：建议使用专业翻译工具或人工翻译
3. **上下文适配**：注意不同语言的文本长度差异，可能需要调整UI布局
4. **特殊字符**：日文和英文可能需要特殊的字体支持

## 🚀 后续优化建议

1. **添加语言包懒加载** - 按需加载语言文件
2. **集成翻译API** - 使用Google Translate等API进行动态翻译
3. **添加RTL支持** - 支持阿拉伯语等从右到左的语言
4. **语言检测** - 根据浏览器语言自动选择
5. **SEO优化** - 为每种语言生成独立的SEO标签

## 📞 技术支持

如有问题，请联系：
- 邮箱: contact@konjac-tech.com
- 电话: 028-88888888

---

**最后更新**: 2026年2月22日
