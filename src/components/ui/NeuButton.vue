<script setup lang="ts">
/**
 * 新拟物风格按钮组件
 */
defineProps<{
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg'
  /** 是否圆形 */
  round?: boolean
  /** 是否禁用 */
  disabled?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="neu-button flex items-center justify-center"
    :class="[
      size === 'sm' ? 'neu-btn-sm' : 'neu-btn',
      round ? 'rounded-full' : 'rounded-xl',
      disabled ? 'opacity-50 cursor-not-allowed' : '',
      size === 'sm' ? 'w-10 h-10' : size === 'lg' ? 'w-16 h-16' : 'w-14 h-14',
    ]"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.neu-button {
  color: #6b7280;
  font-weight: 500;
  outline: none;
  border: none;
}

.neu-button:focus {
  outline: none;
}

.neu-button:active:not(:disabled) {
  transform: scale(0.96);
}
</style>

