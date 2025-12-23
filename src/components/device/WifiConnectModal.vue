<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  visible: boolean
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  connect: [address: string]
}>()

const address = ref('')
const errorMsg = ref('')

function handleConnect() {
  const addr = address.value.trim()
  if (!addr) {
    errorMsg.value = '请输入 IP:端口'
    return
  }
  // 简单验证格式
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d+)?$/.test(addr)) {
    errorMsg.value = '格式错误，示例: 192.168.1.100:5555'
    return
  }
  errorMsg.value = ''
  // 如果没有端口，默认 5555
  const fullAddr = addr.includes(':') ? addr : `${addr}:5555`
  emit('connect', fullAddr)
}

function handleClose() {
  address.value = ''
  errorMsg.value = ''
  emit('update:visible', false)
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
      @click.self="handleClose"
    >
      <div class="bg-neu-bg rounded-2xl p-5 w-72 shadow-neu">
        <h3 class="text-gray-700 font-medium text-center mb-4">WiFi 连接</h3>
        
        <!-- 输入框 -->
        <div class="mb-3">
          <label class="text-xs text-gray-500 mb-1 block">IP:端口</label>
          <input
            v-model="address"
            type="text"
            placeholder="192.168.1.100:5555"
            class="w-full h-10 px-3 rounded-lg bg-neu-bg text-sm text-gray-600 outline-none"
            style="box-shadow: inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff;"
            :disabled="loading"
            @keyup.enter="handleConnect"
          />
          <p v-if="errorMsg" class="text-red-500 text-xs mt-1">{{ errorMsg }}</p>
        </div>

        <!-- 按钮 -->
        <div class="flex gap-3 mt-4">
          <button
            class="flex-1 h-10 rounded-xl neu-btn-sm text-gray-500 text-sm"
            :disabled="loading"
            @click="handleClose"
          >
            取消
          </button>
          <button
            class="flex-1 h-10 rounded-xl neu-btn-sm text-blue-500 text-sm font-medium"
            :disabled="loading"
            @click="handleConnect"
          >
            {{ loading ? '连接中...' : '连接' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

