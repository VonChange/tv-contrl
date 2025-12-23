<script setup lang="ts">
import { KEYCODE } from '@/constants/keycodes'

const emit = defineEmits<{
  press: [keycode: number]
}>()
</script>

<template>
  <div class="direction-pad relative w-52 h-52">
    <!-- 外圈背景 -->
    <div class="absolute inset-0 rounded-full bg-neu-bg shadow-neu"></div>
    
    <!-- 上 -->
    <button
      class="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95 transition-all z-10"
      @click="emit('press', KEYCODE.DPAD_UP)"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 4l-8 8h16l-8-8z" />
      </svg>
    </button>

    <!-- 下 -->
    <button
      class="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95 transition-all z-10"
      @click="emit('press', KEYCODE.DPAD_DOWN)"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 20l8-8H4l8 8z" />
      </svg>
    </button>

    <!-- 左 -->
    <button
      class="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95 transition-all z-10"
      @click="emit('press', KEYCODE.DPAD_LEFT)"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4 12l8 8V4l-8 8z" />
      </svg>
    </button>

    <!-- 右 -->
    <button
      class="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 active:scale-95 transition-all z-10"
      @click="emit('press', KEYCODE.DPAD_RIGHT)"
    >
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 12l-8-8v16l8-8z" />
      </svg>
    </button>

    <!-- OK 按钮 (中心) -->
    <button
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-neu-bg shadow-neu flex items-center justify-center text-gray-500 font-semibold text-lg hover:text-gray-700 active:shadow-neu-inset transition-all z-20"
      @click="emit('press', KEYCODE.DPAD_CENTER)"
    >
      OK
    </button>
  </div>
</template>

<style scoped>
.direction-pad button:not(:last-child):active {
  background: radial-gradient(circle, rgba(163, 177, 198, 0.3) 0%, transparent 70%);
}
</style>

