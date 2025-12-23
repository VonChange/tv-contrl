/**
 * ADB KeyCode 常量定义
 * @see https://developer.android.com/reference/android/view/KeyEvent
 */
export const KEYCODE = {
  /** 主页键 */
  HOME: 3,
  /** 返回键 */
  BACK: 4,
  /** 方向键 - 上 */
  DPAD_UP: 19,
  /** 方向键 - 下 */
  DPAD_DOWN: 20,
  /** 方向键 - 左 */
  DPAD_LEFT: 21,
  /** 方向键 - 右 */
  DPAD_RIGHT: 22,
  /** 方向键 - 确认 (OK) */
  DPAD_CENTER: 23,
  /** 音量 + */
  VOLUME_UP: 24,
  /** 音量 - */
  VOLUME_DOWN: 25,
  /** 电源键 */
  POWER: 26,
  /** 菜单键 */
  MENU: 82,
} as const

/** KeyCode 类型 */
export type KeyCodeType = typeof KEYCODE[keyof typeof KEYCODE]

