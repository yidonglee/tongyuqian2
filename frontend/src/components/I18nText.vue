<template>
  <span>{{ text }}</span>
</template>

<script setup>
import { computed, watch, ref } from 'vue'
import i18n, { state as i18nState } from '../i18n.js'

const props = defineProps({
  key: {
    type: String,
    required: true
  }
})

const text = ref(i18n.t(props.key))

// 监听语言变化
watch(() => i18nState.currentLang, () => {
  text.value = i18n.t(props.key)
})
</script>
