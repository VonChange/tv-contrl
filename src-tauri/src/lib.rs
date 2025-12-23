mod adb;

use adb::{connect_wifi, get_devices, send_key, send_text};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_devices,
            connect_wifi,
            send_key,
            send_text,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

