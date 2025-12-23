<script setup lang="ts">
defineProps<{
  /** 图标类型 */
  icon: 'power' | 'home' | 'back' | 'menu' | 'keyboard'
  /** 标签 */
  label?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="control-button neu-btn w-14 h-14 rounded-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700"
    @click="emit('click')"
  >
    <!-- 电源 -->
    <svg v-if="icon === 'power'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636a9 9 0 11-12.728 0M12 3v9" />
    </svg>
    
    <!-- 主页 -->
    <svg v-else-if="icon === 'home'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
    
    <!-- 返回 -->
    <svg v-else-if="icon === 'back'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
    </svg>
    
    <!-- 菜单 -->
    <svg v-else-if="icon === 'menu'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
    
    <!-- 键盘 -->
    <svg v-else-if="icon === 'keyboard'" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"/>
    </svg>
    
    <!-- 标签 -->
    <span v-if="label" class="text-xs mt-1">{{ label }}</span>
  </button>
</template>

<style scoped>
.control-button:active {
  transform: scale(0.95);
}
</style>

