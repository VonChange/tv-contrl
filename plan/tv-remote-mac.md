# TV Remote Mac 版 - ADB 遥控器

## 1. 需求概述

开发一个 Mac 桌面应用，通过 ADB 命令控制 Android TV 设备，模拟遥控器功能。

## 2. 功能清单

### 2.1 需要实现的功能

| 功能 | ADB KeyCode | 说明 |
|------|-------------|------|
| 电源 OFF | `KEYCODE_POWER` (26) | 关闭/唤醒设备 |
| 主页 Home | `KEYCODE_HOME` (3) | 返回主页 |
| 方向-上 | `KEYCODE_DPAD_UP` (19) | 导航上 |
| 方向-下 | `KEYCODE_DPAD_DOWN` (20) | 导航下 |
| 方向-左 | `KEYCODE_DPAD_LEFT` (21) | 导航左 |
| 方向-右 | `KEYCODE_DPAD_RIGHT` (22) | 导航右 |
| OK/确认 | `KEYCODE_DPAD_CENTER` (23) | 确认选择 |
| 返回 | `KEYCODE_BACK` (4) | 返回上一页 |
| 菜单 | `KEYCODE_MENU` (82) | 打开菜单 |
| 音量+ | `KEYCODE_VOLUME_UP` (24) | 增加音量 |
| 音量- | `KEYCODE_VOLUME_DOWN` (25) | 减少音量 |
| 英文键盘 | `input text "xxx"` | 26 个字母输入 |

### 2.2 不需要的功能（图中红圈标注）

- ❌ 投屏/截图按钮（右侧）
- ❌ 多任务/画中画按钮（左下）

## 3. 技术栈

**Tauri + Vue 3**

```
前端：
- Vue 3 (Composition API)
- Vite (构建工具)
- TailwindCSS (样式)

后端（Tauri/Rust）：
- 执行 ADB 命令
- 设备连接管理

工具：
- ADB (系统 PATH)

打包体积：~10MB
```

## 4. 设备连接

### 连接方式
- ✅ USB 连接（自动检测）
- ✅ WiFi 连接（手动输入 IP:端口）
- 使用系统 PATH 中的 `adb` 命令

### 设备选择
- 启动时自动检测已连接设备（`adb devices`）
- 多设备时显示设备列表供选择
- 单设备时自动选中
- 支持刷新设备列表

### WiFi 连接
- 点击 [+] 按钮弹出 WiFi 连接弹窗
- 输入框：IP:端口（如 `192.168.1.100:5555`）
- 点击"连接"执行 `adb connect IP:端口`
- 连接成功后自动添加到设备列表

### 错误处理
- 无设备：提示"请连接设备"
- ADB 未安装：提示"请安装 ADB 并添加到 PATH"
- WiFi 连接失败：提示"连接失败，请检查 IP 和端口"
- 命令失败：显示错误信息

## 5. 窗口配置

```
尺寸：320 x 560（窄长遥控器形状）
可拖动：✅
可缩放：❌
置顶：可选（按钮切换）
```

## 6. UI 设计

参照图片中的遥控器样式：

```
┌─────────────────────────────────┐
│  [设备选择 ▼]      [+]  [🔄]   │  ← 设备选择 + WiFi连接 + 刷新
├─────────────────────────────────┤
│  [OFF]              [🏠 Home]   │  ← 顶部按钮
│                                 │
│           ● (上)                │
│                                 │
│    ●     [ OK ]     ●          │  ← 方向键 + OK
│  (左)              (右)         │
│                                 │
│           ● (下)                │
│                                 │
│  [↩ 返回]   [音量]   [≡ 菜单]   │  ← 底部按钮
│              +                  │
│            音量                 │
│              -                  │
│                                 │
│  [⌨️ 键盘]                      │  ← 键盘按钮
└─────────────────────────────────┘
```

**设计风格：**
- 新拟物风格（Neumorphism）
- 浅灰色背景 `#e0e5ec`
- 圆形/圆角按钮
- 柔和阴影（凸起/凹陷效果）
- 按钮点击时有按下反馈

## 7. ADB 命令参考

```bash
# 获取设备列表
adb devices

# WiFi 连接
adb connect 192.168.1.100:5555

# WiFi 断开
adb disconnect 192.168.1.100:5555

# 指定设备执行（多设备时）
adb -s <device_id> shell input keyevent <keycode>

# 按键事件
adb shell input keyevent <keycode>

# 文本输入
adb shell input text "hello"

# 常用 keycode
KEYCODE_HOME = 3
KEYCODE_BACK = 4
KEYCODE_DPAD_UP = 19
KEYCODE_DPAD_DOWN = 20
KEYCODE_DPAD_LEFT = 21
KEYCODE_DPAD_RIGHT = 22
KEYCODE_DPAD_CENTER = 23
KEYCODE_VOLUME_UP = 24
KEYCODE_VOLUME_DOWN = 25
KEYCODE_POWER = 26
KEYCODE_MENU = 82
```

## 8. 任务清单

### Phase 1: 项目初始化
- [ ] 初始化 Tauri + Vue 3 项目
- [ ] 配置 TailwindCSS
- [ ] 配置窗口（320x560，不可缩放）

### Phase 2: 核心功能
- [ ] 实现 ADB 命令执行（Rust 后端）
- [ ] 设备列表获取（`adb devices`）
- [ ] WiFi 连接功能（`adb connect`）
- [ ] 设备选择功能
- [ ] 封装按键发送接口

### Phase 3: UI 开发
- [ ] 设备选择下拉框 + 刷新按钮
- [ ] WiFi 连接弹窗（IP:端口输入）
- [ ] 遥控器整体布局（新拟物风格）
- [ ] 电源、主页按钮
- [ ] 方向键 + OK 圆盘
- [ ] 返回、菜单、音量按钮
- [ ] 键盘弹窗（26 英文字母）

### Phase 4: 优化完善
- [ ] 按键反馈效果（点击动画）
- [ ] 快捷键支持（方向键、Enter 等）
- [ ] 错误提示（无设备、命令失败）

## 9. 验收标准

1. ✅ 能检测并选择已连接设备（USB/WiFi）
2. ✅ 所有按钮功能正常（参照功能清单）
3. ✅ 键盘能输入 26 个英文字母并发送
4. ✅ UI 美观，新拟物风格
5. ✅ 窗口 320x560，可拖动不可缩放
6. ✅ 应用可正常打包为 Mac .dmg

## 10. 代码结构

### 目录结构

```
tv-contrl/
├── plan/
│   └── tv-remote-mac.md        # 本文档
│
├── src/                         # Vue 前端
│   ├── components/              # 组件
│   │   ├── device/              # 设备相关
│   │   │   ├── DeviceSelector.vue
│   │   │   └── WifiConnectModal.vue
│   │   ├── remote/              # 遥控器相关
│   │   │   ├── RemoteControl.vue
│   │   │   ├── DirectionPad.vue
│   │   │   ├── ControlButton.vue
│   │   │   └── VolumeControl.vue
│   │   ├── keyboard/            # 键盘相关
│   │   │   └── KeyboardModal.vue
│   │   └── ui/                  # 通用 UI
│   │       └── NeuButton.vue    # 新拟物按钮
│   │
│   ├── composables/             # 组合式函数
│   │   └── useAdb.ts            # ADB 操作封装
│   │
│   ├── types/                   # 类型定义
│   │   └── index.ts
│   │
│   ├── constants/               # 常量
│   │   └── keycodes.ts          # ADB KeyCode 定义
│   │
│   ├── App.vue                  # 根组件
│   ├── main.ts                  # 入口
│   └── style.css                # 全局样式
│
├── src-tauri/                   # Rust 后端
│   ├── src/
│   │   ├── main.rs              # 入口
│   │   ├── adb.rs               # ADB 命令模块
│   │   └── lib.rs               # 模块导出
│   ├── Cargo.toml
│   └── tauri.conf.json
│
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### 前端代码结构

#### 1. 类型定义 `src/types/index.ts`

```typescript
// 设备信息
export interface Device {
  id: string          // 设备ID (如 192.168.1.100:5555)
  status: string      // 状态 (device/offline/unauthorized)
  name?: string       // 设备名称（可选）
}

// ADB 命令结果
export interface AdbResult {
  success: boolean
  message: string
}

// 按键类型
export type KeyCode = number
```

#### 2. 常量定义 `src/constants/keycodes.ts`

```typescript
export const KEYCODE = {
  HOME: 3,
  BACK: 4,
  DPAD_UP: 19,
  DPAD_DOWN: 20,
  DPAD_LEFT: 21,
  DPAD_RIGHT: 22,
  DPAD_CENTER: 23,
  VOLUME_UP: 24,
  VOLUME_DOWN: 25,
  POWER: 26,
  MENU: 82,
} as const
```

#### 3. ADB 封装 `src/composables/useAdb.ts`

```typescript
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'
import type { Device, AdbResult } from '@/types'

export function useAdb() {
  const devices = ref<Device[]>([])
  const currentDevice = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // 获取设备列表
  async function getDevices(): Promise<void>

  // WiFi 连接
  async function connectWifi(address: string): Promise<AdbResult>

  // 发送按键
  async function sendKey(keycode: number): Promise<AdbResult>

  // 发送文本
  async function sendText(text: string): Promise<AdbResult>

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
```

#### 4. 组件职责

| 组件 | 职责 |
|------|------|
| `App.vue` | 布局容器，组合所有组件 |
| `DeviceSelector.vue` | 设备下拉选择 + 刷新按钮 |
| `WifiConnectModal.vue` | WiFi 连接弹窗（IP 输入） |
| `RemoteControl.vue` | 遥控器主体，组合各控制区 |
| `DirectionPad.vue` | 方向键 + OK 圆盘 |
| `ControlButton.vue` | 单个控制按钮（电源、主页等） |
| `VolumeControl.vue` | 音量 +/- 控制 |
| `KeyboardModal.vue` | 26 字母键盘弹窗 |
| `NeuButton.vue` | 新拟物风格按钮基础组件 |

### Rust 后端代码结构

#### `src-tauri/src/adb.rs`

```rust
use std::process::Command;

/// 执行 ADB 命令
fn exec_adb(args: &[&str]) -> Result<String, String>

/// 获取设备列表
#[tauri::command]
pub fn get_devices() -> Result<Vec<Device>, String>

/// WiFi 连接
#[tauri::command]
pub fn connect_wifi(address: &str) -> Result<AdbResult, String>

/// 发送按键
#[tauri::command]
pub fn send_key(device_id: Option<&str>, keycode: i32) -> Result<AdbResult, String>

/// 发送文本
#[tauri::command]
pub fn send_text(device_id: Option<&str>, text: &str) -> Result<AdbResult, String>
```

#### `src-tauri/src/main.rs`

```rust
mod adb;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            adb::get_devices,
            adb::connect_wifi,
            adb::send_key,
            adb::send_text,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### 数据流

```
┌─────────────────────────────────────────────────────┐
│                    Vue 前端                          │
│  ┌─────────────┐    ┌─────────────┐                 │
│  │ DeviceSelector │◄──│ useAdb()   │                │
│  └─────────────┘    └──────┬──────┘                 │
│  ┌─────────────┐           │                        │
│  │ RemoteControl│◄─────────┤ invoke()               │
│  └─────────────┘           │                        │
└────────────────────────────┼────────────────────────┘
                             │ Tauri IPC
┌────────────────────────────┼────────────────────────┐
│                    Rust 后端                         │
│                      ┌─────▼─────┐                  │
│                      │  adb.rs   │                  │
│                      └─────┬─────┘                  │
│                            │ Command::new("adb")   │
│                      ┌─────▼─────┐                  │
│                      │ 系统 ADB  │                  │
│                      └───────────┘                  │
└─────────────────────────────────────────────────────┘
```

---

**状态：** 技术栈已确认，待开发。

