use serde::{Deserialize, Serialize};
use std::process::Command;
use std::path::Path;

/// 设备信息
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Device {
    /// 设备ID
    pub id: String,
    /// 状态
    pub status: String,
}

/// ADB 命令结果
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct AdbResult {
    /// 是否成功
    pub success: bool,
    /// 消息
    pub message: String,
}

/// 获取 ADB 可执行文件路径
fn get_adb_path() -> String {
    // 常见的 ADB 安装路径
    let common_paths = [
        // macOS 常见路径
        format!("{}/Library/Android/sdk/platform-tools/adb", std::env::var("HOME").unwrap_or_default()),
        "/usr/local/bin/adb".to_string(),
        "/opt/homebrew/bin/adb".to_string(),
        // Linux 常见路径
        format!("{}/Android/Sdk/platform-tools/adb", std::env::var("HOME").unwrap_or_default()),
        "/usr/bin/adb".to_string(),
        // Windows 常见路径
        format!("{}\\AppData\\Local\\Android\\Sdk\\platform-tools\\adb.exe", std::env::var("USERPROFILE").unwrap_or_default()),
    ];

    // 查找存在的 adb 路径
    for path in &common_paths {
        if Path::new(path).exists() {
            return path.clone();
        }
    }

    // 如果都找不到，返回 "adb"，尝试使用 PATH 中的
    "adb".to_string()
}

/// 执行 ADB 命令
fn exec_adb(args: &[&str]) -> Result<String, String> {
    let adb_path = get_adb_path();
    
    let output = Command::new(&adb_path)
        .args(args)
        .output()
        .map_err(|e| {
            if e.kind() == std::io::ErrorKind::NotFound {
                format!("ADB 未找到，请确认已安装 Android SDK\n尝试路径: {}", adb_path)
            } else {
                format!("执行 ADB 失败: {}", e)
            }
        })?;

    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        let stdout = String::from_utf8_lossy(&output.stdout);
        Err(format!("{}{}", stdout, stderr))
    }
}

/// 获取设备列表
#[tauri::command]
pub fn get_devices() -> Result<Vec<Device>, String> {
    let output = exec_adb(&["devices"])?;
    
    let mut devices = Vec::new();
    for line in output.lines().skip(1) {
        let line = line.trim();
        if line.is_empty() {
            continue;
        }
        let parts: Vec<&str> = line.split_whitespace().collect();
        if parts.len() >= 2 {
            devices.push(Device {
                id: parts[0].to_string(),
                status: parts[1].to_string(),
            });
        }
    }
    
    Ok(devices)
}

/// WiFi 连接设备
#[tauri::command]
pub fn connect_wifi(address: &str) -> Result<AdbResult, String> {
    let output = exec_adb(&["connect", address]);
    
    match output {
        Ok(msg) => {
            let success = msg.contains("connected") || msg.contains("already connected");
            Ok(AdbResult {
                success,
                message: msg.trim().to_string(),
            })
        }
        Err(e) => Ok(AdbResult {
            success: false,
            message: e,
        }),
    }
}

/// 发送按键
#[tauri::command]
pub fn send_key(device_id: &str, keycode: i32) -> Result<AdbResult, String> {
    let keycode_str = keycode.to_string();
    let output = exec_adb(&["-s", device_id, "shell", "input", "keyevent", &keycode_str]);
    
    match output {
        Ok(_) => Ok(AdbResult {
            success: true,
            message: "OK".to_string(),
        }),
        Err(e) => Ok(AdbResult {
            success: false,
            message: e,
        }),
    }
}

/// 发送文本
#[tauri::command]
pub fn send_text(device_id: &str, text: &str) -> Result<AdbResult, String> {
    let output = exec_adb(&["-s", device_id, "shell", "input", "text", text]);
    
    match output {
        Ok(_) => Ok(AdbResult {
            success: true,
            message: "OK".to_string(),
        }),
        Err(e) => Ok(AdbResult {
            success: false,
            message: e,
        }),
    }
}

