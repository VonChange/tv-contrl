<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAdb } from '@/composables/useAdb'
import { KEYCODE } from '@/constants/keycodes'
import DeviceSelector from '@/components/device/DeviceSelector.vue'
import WifiConnectModal from '@/components/device/WifiConnectModal.vue'
import RemoteControl from '@/components/remote/RemoteControl.vue'
import KeyboardModal from '@/components/keyboard/KeyboardModal.vue'

const { devices, currentDevice, loading, error, getDevices, connectWifi, sendKey, sendText } = useAdb()

// 弹窗状态
const showWifiModal = ref(false)
const showKeyboardModal = ref(false)

// 提示消息
const toast = ref<{ message: string; type: 'success' | 'error' } | null>(null)

function showToast(message: string, type: 'success' | 'error' = 'success') {
  toast.value = { message, type }
  setTimeout(() => {
    toast.value = null
  }, 2000)
}

// 处理按键
async function handlePress(keycode: number) {
  const result = await sendKey(keycode)
  if (!result.success) {
    showToast(result.message, 'error')
  }
}

// 处理 WiFi 连接
async function handleWifiConnect(address: string) {
  const result = await connectWifi(address)
  if (result.success) {
    showWifiModal.value = false
    showToast('连接成功')
  } else {
    showToast(result.message, 'error')
  }
}

// 处理文本发送（不关闭键盘弹窗）
async function handleSendText(text: string) {
  const result = await sendText(text)
  if (!result.success) {
    showToast(result.message, 'error')
  }
}

// 键盘快捷键支持
function handleKeydown(e: KeyboardEvent) {
  // 如果弹窗打开，不处理快捷键
  if (showWifiModal.value || showKeyboardModal.value) return
  
  const keyMap: Record<string, number> = {
    ArrowUp: KEYCODE.DPAD_UP,
    ArrowDown: KEYCODE.DPAD_DOWN,
    ArrowLeft: KEYCODE.DPAD_LEFT,
    ArrowRight: KEYCODE.DPAD_RIGHT,
    Enter: KEYCODE.DPAD_CENTER,
    Escape: KEYCODE.BACK,
    Backspace: KEYCODE.BACK,
  }
  
  const keycode = keyMap[e.key]
  if (keycode) {
    e.preventDefault()
    handlePress(keycode)
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="app h-full flex flex-col bg-neu-bg">
    <!-- 设备选择区域 -->
    <DeviceSelector
      v-model="currentDevice"
      :devices="devices"
      :loading="loading"
      @refresh="getDevices"
      @add-wifi="showWifiModal = true"
    />

    <!-- 分隔线 -->
    <div class="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mx-4"></div>

    <!-- 遥控器主体 -->
    <div class="flex-1 overflow-auto">
      <RemoteControl
        @press="handlePress"
        @open-keyboard="showKeyboardModal = true"
      />
    </div>

    <!-- 错误提示 -->
    <div
      v-if="error && !toast"
      class="fixed bottom-4 left-4 right-4 bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg text-center"
    >
      {{ error }}
    </div>

    <!-- Toast 提示 -->
    <Transition name="toast">
      <div
        v-if="toast"
        class="fixed bottom-4 left-4 right-4 text-sm px-4 py-2 rounded-lg text-center"
        :class="toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'"
      >
        {{ toast.message }}
      </div>
    </Transition>

    <!-- WiFi 连接弹窗 -->
    <WifiConnectModal
      v-model:visible="showWifiModal"
      :loading="loading"
      @connect="handleWifiConnect"
    />

    <!-- 键盘弹窗 -->
    <KeyboardModal
      v-model:visible="showKeyboardModal"
      :loading="loading"
      @send="handleSendText"
    />
  </div>
</template>

<style>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>

