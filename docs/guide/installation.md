# 安装

## 环境准备

- Node.js 14.0+
- Vue 3.0+

## 通过 npm 安装

在现有项目中使用擎路H5组件库，可以通过 npm 或 yarn 进行安装：

```bash
# 通过 npm 安装
npm i qinglu-vant -S

# 通过 yarn 安装
yarn add qinglu-vant
```

## 通过 CDN 使用

可以通过 CDN 的方式引入，此时组件注册为全局组件：

```html
<!-- 引入样式文件 -->
<link rel="stylesheet" href="https://cdn.example.com/qinglu-vant/index.css">

<!-- 引入 Vue -->
<script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
<!-- 引入组件库 -->
<script src="https://cdn.example.com/qinglu-vant/index.js"></script>

<script>
  // 现在可以使用全局注册的组件了
  const app = Vue.createApp({
    // ...
  });
  
  app.mount('#app');
</script>
```

## 示例项目

我们提供了一个基于 Vue 3 和 Vite 的示例项目，可以通过以下方式获取：

```bash
# 克隆示例项目
git clone https://github.com/yourusername/qinglu-vant-demo.git

# 安装依赖
cd qinglu-vant-demo
npm install

# 启动开发服务器
npm run dev
```
