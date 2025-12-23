/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 新拟物风格颜色
        neu: {
          bg: '#e0e5ec',
          light: '#ffffff',
          dark: '#a3b1c6',
        },
      },
      boxShadow: {
        // 新拟物阴影 - 凸起效果
        'neu': '6px 6px 12px #a3b1c6, -6px -6px 12px #ffffff',
        // 新拟物阴影 - 凹陷效果（按下状态）
        'neu-inset': 'inset 4px 4px 8px #a3b1c6, inset -4px -4px 8px #ffffff',
        // 小按钮阴影
        'neu-sm': '3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff',
        'neu-sm-inset': 'inset 2px 2px 4px #a3b1c6, inset -2px -2px 4px #ffffff',
      },
    },
  },
  plugins: [],
}

