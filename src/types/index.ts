/**
 * 设备信息
 */
export interface Device {
  /** 设备ID (如 192.168.1.100:5555 或 emulator-5554) */
  id: string
  /** 状态 (device/offline/unauthorized) */
  status: string
  /** 设备名称（可选） */
  name?: string
}

/**
 * ADB 命令执行结果
 */
export interface AdbResult {
  /** 是否成功 */
  success: boolean
  /** 结果消息 */
  message: string
}

/**
 * 按键类型
 */
export type KeyCode = number

