/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './docs/**/*.{vue,js,ts,jsx,tsx,md}',
    './docs/.vitepress/**/*.{vue,js,ts,jsx,tsx}'
  ],
  corePlugins: {
    preflight: false, // 禁用Tailwind的基础样式重置，避免与VitePress冲突
  },
  theme: {
    extend: {
      maxWidth: {
        'screen-xl': '1280px',
        'screen-2xl': '1536px',
        'content': '100%',
      },
      width: {
        'content': '100%',
      },
      padding: {
        'content': '2rem',
      },
    },
  },
  // 只在文档站点中使用，不影响组件库本身
  important: '.vp-doc', // 使Tailwind样式在VitePress文档中优先级更高
} 