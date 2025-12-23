<script setup lang="ts">
import { KEYCODE } from '@/constants/keycodes'
import DirectionPad from './DirectionPad.vue'
import VolumeControl from './VolumeControl.vue'
import ControlButton from './ControlButton.vue'

const emit = defineEmits<{
  press: [keycode: number]
  openKeyboard: []
}>()

function handlePress(keycode: number) {
  emit('press', keycode)
}
</script>

<template>
  <div class="remote-control flex flex-col items-center py-4 px-6">
    <!-- 顶部按钮：电源 + 主页 -->
    <div class="flex justify-between w-full mb-6">
      <ControlButton icon="power" @click="handlePress(KEYCODE.POWER)" />
      <ControlButton icon="home" @click="handlePress(KEYCODE.HOME)" />
    </div>

    <!-- 方向键盘 -->
    <div class="mb-6">
      <DirectionPad @press="handlePress" />
    </div>

    <!-- 底部按钮：菜单+键盘 | 音量 | 返回 -->
    <div class="flex items-center justify-between w-full">
      <!-- 左侧：菜单 + 键盘（垂直排列） -->
      <div class="flex flex-col items-center gap-2">
        <ControlButton icon="menu" @click="handlePress(KEYCODE.MENU)" />
        <ControlButton icon="keyboard" @click="emit('openKeyboard')" />
      </div>
      
      <!-- 中间：音量 -->
      <VolumeControl @press="handlePress" />
      
      <!-- 右侧：返回 -->
      <ControlButton icon="back" @click="handlePress(KEYCODE.BACK)" />
    </div>
  </div>
</template>

<style scoped>
.remote-control {
  max-width: 320px;
  margin: 0 auto;
}
</style>

