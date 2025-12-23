<script setup lang="ts">
import { onMounted } from 'vue'
import type { Device } from '@/types'

defineProps<{
  devices: Device[]
  modelValue: string | null
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
  refresh: []
  addWifi: []
}>()

// 组件挂载时刷新设备列表
onMounted(() => {
  emit('refresh')
})
</script>

<template>
  <div class="device-selector flex items-center gap-2 px-3 py-2">
    <!-- 设备下拉选择 -->
    <select
      :value="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value || null)"
      class="flex-1 h-9 px-3 rounded-lg bg-neu-bg text-sm text-gray-600 outline-none appearance-none cursor-pointer"
      style="box-shadow: inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff;"
      :disabled="loading"
    >
      <option value="" disabled>{{ devices.length === 0 ? '无设备' : '选择设备' }}</option>
      <option
        v-for="device in devices"
        :key="device.id"
        :value="device.id"
      >
        {{ device.id }} {{ device.status !== 'device' ? `(${device.status})` : '' }}
      </option>
    </select>

    <!-- WiFi 连接按钮 -->
    <button
      class="neu-btn-sm w-9 h-9 flex items-center justify-center text-gray-500 hover:text-blue-500"
      title="WiFi 连接"
      @click="emit('addWifi')"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    </button>

    <!-- 刷新按钮 -->
    <button
      class="neu-btn-sm w-9 h-9 flex items-center justify-center text-gray-500 hover:text-green-500"
      :class="{ 'animate-spin': loading }"
      title="刷新设备列表"
      :disabled="loading"
      @click="emit('refresh')"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.device-selector select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
</style>

