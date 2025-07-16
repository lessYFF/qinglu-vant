# 快速上手

本文将介绍如何在项目中使用擎路H5组件库。

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```js
import { createApp } from 'vue';
import QingluVant from 'qinglu-vant';
import 'qinglu-vant/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(QingluVant);
app.mount('#app');
```

## 按需引入

如果你只希望引入部分组件，可以使用按需引入的方式：

### 方式一：手动按需引入组件

```js
import { createApp } from 'vue';
import { SelectField, DatetimeField } from 'qinglu-vant';
import 'qinglu-vant/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.component('SelectField', SelectField);
app.component('DatetimeField', DatetimeField);

app.mount('#app');
```

### 方式二：使用插件自动按需引入（推荐）

首先，安装 unplugin-vue-components 和 unplugin-auto-import 插件：

```bash
npm i unplugin-vue-components unplugin-auto-import -D
```

然后在 Vite 配置文件中添加如下配置：

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { QingluVantResolver } from 'qinglu-vant/lib/resolver';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [QingluVantResolver()],
    }),
    Components({
      resolvers: [QingluVantResolver()],
    }),
  ],
});
```

这样你就可以直接在模板中使用擎路H5组件库的组件，而无需在每个组件中手动引入：

```vue
<template>
  <select-field label="选择框" v-model="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  { text: '选项1', value: '1' },
  { text: '选项2', value: '2' },
  { text: '选项3', value: '3' }
];
</script>
```

## 在 TypeScript 中使用

擎路H5组件库提供了完整的 TypeScript 类型定义，可以享受到完整的类型推导：

```vue
<template>
  <select-field v-model="value" :options="options" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { SelectFieldOption } from 'qinglu-vant';

const value = ref<string>('');
const options: SelectFieldOption[] = [
  { text: '选项1', value: '1' },
  { text: '选项2', value: '2' },
  { text: '选项3', value: '3' }
];
</script>
```

## 浏览器兼容性

擎路H5组件库支持现代浏览器和 Android 4.0+, iOS 8.0+。
