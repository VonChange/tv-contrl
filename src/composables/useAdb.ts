import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import type { Device, AdbResult } from '@/types'

/**
 * ADB 操作封装
 */
export function useAdb() {
  /** 设备列表 */
  const devices = ref<Device[]>([])
  /** 当前选中的设备ID */
  const currentDevice = ref<string | null>(null)
  /** 加载状态 */
  const loading = ref(false)
  /** 错误信息 */
  const error = ref<string | null>(null)

  /**
   * 获取设备列表
   */
  async function getDevices(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const result = await invoke<Device[]>('get_devices')
      devices.value = result
      // 如果只有一个设备，自动选中
      if (result.length === 1) {
        currentDevice.value = result[0].id
      }
      // 如果当前选中的设备不在列表中，清空选择
      if (currentDevice.value && !result.find(d => d.id === currentDevice.value)) {
        currentDevice.value = result.length > 0 ? result[0].id : null
      }
    } catch (e) {
      error.value = String(e)
      devices.value = []
    } finally {
      loading.value = false
    }
  }

  /**
   * WiFi 连接设备
   * @param address IP:端口 (如 192.168.1.100:5555)
   */
  async function connectWifi(address: string): Promise<AdbResult> {
    loading.value = true
    error.value = null
    try {
      const result = await invoke<AdbResult>('connect_wifi', { address })
      if (result.success) {
        // 连接成功后刷新设备列表
        await getDevices()
        // 自动选中新连接的设备
        currentDevice.value = address
      }
      return result
    } catch (e) {
      const msg = String(e)
      error.value = msg
      return { success: false, message: msg }
    } finally {
      loading.value = false
    }
  }

  /**
   * 发送按键
   * @param keycode Android KeyCode
   */
  async function sendKey(keycode: number): Promise<AdbResult> {
    if (!currentDevice.value) {
      return { success: false, message: '请先选择设备' }
    }
    try {
      return await invoke<AdbResult>('send_key', {
        deviceId: currentDevice.value,
        keycode,
      })
    } catch (e) {
      return { success: false, message: String(e) }
    }
  }

  /**
   * 发送文本
   * @param text 要发送的文本
   */
  async function sendText(text: string): Promise<AdbResult> {
    if (!currentDevice.value) {
      return { success: false, message: '请先选择设备' }
    }
    try {
      return await invoke<AdbResult>('send_text', {
        deviceId: currentDevice.value,
        text,
      })
    } catch (e) {
      return { success: false, message: String(e) }
    }
  }

  return {
    devices,
    currentDevice,
    loading,
    error,
    getDevices,
    connectWifi,
    sendKey,
    sendText,
  }
}

