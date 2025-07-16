import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { viteMockServe as mockServe } from 'vite-plugin-mock'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isLib = mode === 'lib'
  
  if (isLib) {
    // 库模式配置
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/index.js'),
          name: 'QingluVant',
          fileName: (format) => `index.${format}.js`,
          formats: ['es', 'umd']
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['vue', 'vant'],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals: {
              vue: 'Vue',
              vant: 'Vant'
            }
          }
        }
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      }
    }
  }

  // 开发模式配置
  return {
    define: {
      // 为浏览器环境定义环境变量
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.__APP_ENV__': JSON.stringify(process.env.APP_ENV || 'local'),
    },
    plugins: [
      vue(),
      mockServe({
        mockPath: './mock',
        localEnabled: command === 'serve',
        prodEnabled: false,
        logger: true,
        watchFiles: true,
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3000,
      open: true,
      host: '0.0.0.0'
    },
    css: {
      postcss: './postcss.config.cjs'
    }
  }
})
