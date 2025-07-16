# 主题定制

擎路H5组件库提供了一套默认主题，同时支持自定义主题，以满足不同的视觉需求。

## 样式变量

擎路H5组件库使用 CSS 变量实现主题定制，CSS 变量具有继承性，你可以在任意位置声明变量，它会对你的页面生效。

### 基础变量

以下是一些基础变量，所有组件的样式都基于这些变量：

```css
:root {
  --ql-primary-color: #1989fa;
  --ql-success-color: #07c160;
  --ql-danger-color: #ee0a24;
  --ql-warning-color: #ff976a;
  --ql-text-color: #323233;
  --ql-text-color-2: #969799;
  --ql-text-color-3: #c8c9cc;
  --ql-active-color: #f2f3f5;
  --ql-active-opacity: 0.7;
  --ql-disabled-opacity: 0.5;
  --ql-background-color: #f7f8fa;
  --ql-background-color-light: #ffffff;
  --ql-padding-base: 4px;
  --ql-padding-xs: 8px;
  --ql-padding-sm: 12px;
  --ql-padding-md: 16px;
  --ql-padding-lg: 24px;
  --ql-padding-xl: 32px;
  --ql-font-size-xs: 10px;
  --ql-font-size-sm: 12px;
  --ql-font-size-md: 14px;
  --ql-font-size-lg: 16px;
  --ql-font-size-xl: 18px;
  --ql-font-bold: 500;
  --ql-line-height-xs: 14px;
  --ql-line-height-sm: 18px;
  --ql-line-height-md: 20px;
  --ql-line-height-lg: 22px;
  --ql-line-height-xl: 24px;
  --ql-border-color: #ebedf0;
  --ql-border-width: 1px;
  --ql-border-radius-sm: 2px;
  --ql-border-radius-md: 4px;
  --ql-border-radius-lg: 8px;
  --ql-border-radius-max: 999px;
}
```

## 定制方法

### 方法一：使用 CSS 覆盖

创建一个自定义样式文件，覆盖 CSS 变量：

```css
/* custom-theme.css */
:root {
  --ql-primary-color: #1890ff;
  --ql-success-color: #52c41a;
  --ql-danger-color: #ff4d4f;
  --ql-warning-color: #faad14;
  --ql-text-color: #333333;
  --ql-background-color: #f5f5f5;
}
```

然后在入口文件中引入你的自定义 CSS：

```js
import 'qinglu-vant/dist/index.css';
import './custom-theme.css';
```

### 方法二：使用 JavaScript 动态修改

你可以在运行时通过 JavaScript 动态修改 CSS 变量，实现主题的实时切换：

```js
// 设置主题色
document.documentElement.style.setProperty('--ql-primary-color', '#1890ff');

// 设置成功色
document.documentElement.style.setProperty('--ql-success-color', '#52c41a');
```

### 方法三：使用预处理器变量

如果你使用了 Less 或 Sass 等预处理器，可以通过修改预处理器的变量来自定义主题。

首先，在你的项目中创建一个 theme.less 文件：

```less
// theme.less
@primary-color: #1890ff;
@success-color: #52c41a;
@danger-color: #ff4d4f;
@warning-color: #faad14;
@text-color: #333333;
@background-color: #f5f5f5;

:root {
  --ql-primary-color: @primary-color;
  --ql-success-color: @success-color;
  --ql-danger-color: @danger-color;
  --ql-warning-color: @warning-color;
  --ql-text-color: @text-color;
  --ql-background-color: @background-color;
}
```

然后在入口文件中引入：

```js
import 'qinglu-vant/dist/index.css';
import './theme.less';
```

## 主题切换

以下是一个实现暗黑模式切换的示例：

```js
// 切换到暗黑模式
function toggleDarkMode(isDark) {
  if (isDark) {
    document.documentElement.style.setProperty('--ql-primary-color', '#177ddc');
    document.documentElement.style.setProperty('--ql-text-color', '#ffffff');
    document.documentElement.style.setProperty('--ql-background-color', '#141414');
    document.documentElement.style.setProperty('--ql-background-color-light', '#1f1f1f');
    document.documentElement.style.setProperty('--ql-border-color', '#434343');
  } else {
    document.documentElement.style.setProperty('--ql-primary-color', '#1989fa');
    document.documentElement.style.setProperty('--ql-text-color', '#323233');
    document.documentElement.style.setProperty('--ql-background-color', '#f7f8fa');
    document.documentElement.style.setProperty('--ql-background-color-light', '#ffffff');
    document.documentElement.style.setProperty('--ql-border-color', '#ebedf0');
  }
}

// 使用示例
toggleDarkMode(true); // 切换到暗黑模式
toggleDarkMode(false); // 切换到亮色模式
```

## 组件变量

除了基础变量外，每个组件也有自己的 CSS 变量。你可以在组件文档中查看对应组件的 CSS 变量列表。

例如，SelectField 组件的变量：

```css
:root {
  --ql-select-field-height: 44px;
  --ql-select-field-padding: 0 var(--ql-padding-md);
  --ql-select-field-label-width: 90px;
  --ql-select-field-label-color: var(--ql-text-color);
  --ql-select-field-value-color: var(--ql-text-color);
  --ql-select-field-placeholder-color: var(--ql-text-color-3);
  --ql-select-field-disabled-color: var(--ql-text-color-3);
  --ql-select-field-background: var(--ql-background-color-light);
  --ql-select-field-border-color: var(--ql-border-color);
}
```
