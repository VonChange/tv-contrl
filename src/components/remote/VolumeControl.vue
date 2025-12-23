<script setup lang="ts">
import { KEYCODE } from '@/constants/keycodes'

const emit = defineEmits<{
  press: [keycode: number]
}>()
</script>

<template>
  <div class="volume-control flex flex-col items-center">
    <!-- 音量 + -->
    <button
      class="w-14 h-10 rounded-t-2xl neu-btn-sm flex items-center justify-center text-gray-500 hover:text-gray-700"
      @click="emit('press', KEYCODE.VOLUME_UP)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>
    
    <!-- 音量标签 -->
    <div class="py-2 text-xs text-gray-400">音量</div>
    
    <!-- 音量 - -->
    <button
      class="w-14 h-10 rounded-b-2xl neu-btn-sm flex items-center justify-center text-gray-500 hover:text-gray-700"
      @click="emit('press', KEYCODE.VOLUME_DOWN)"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.volume-control button {
  box-shadow: 3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff;
}

.volume-control button:active {
  box-shadow: inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff;
}
</style>

