# SelectField 选择字段

用于在表单中提供多个选项供用户选择。

## 基础用法

最简单的用法，提供一个选项数组。

```vue
<template>
  <select-field 
    v-model="value" 
    label="选择城市" 
    placeholder="请选择" 
    :options="options" 
  />
</template>

<script setup>
import { ref } from 'vue';

const value = ref('');
const options = [
  { text: '北京', value: 'beijing' },
  { text: '上海', value: 'shanghai' },
  { text: '广州', value: 'guangzhou' },
  { text: '深圳', value: 'shenzhen' }
];
</script>
```

## 禁用状态

设置 `disabled` 属性禁用组件。

```vue
<template>
  <select-field 
    v-model="value" 
    label="选择城市" 
    disabled 
    :options="options" 
  />
</template>
```

## 自定义占位符

通过 `placeholder` 属性自定义占位文本。

```vue
<template>
  <select-field 
    v-model="value" 
    label="选择城市" 
    placeholder="请点击选择城市" 
    :options="options" 
  />
</template>
```

## 必填标记

设置 `required` 属性在标签前显示红色星号。

```vue
<template>
  <select-field 
    v-model="value" 
    label="选择城市" 
    required 
    :options="options" 
  />
</template>
```

## 自定义宽度

通过 `label-width` 属性设置标签宽度。

```vue
<template>
  <select-field 
    v-model="value" 
    label="选择城市" 
    label-width="100px" 
    :options="options" 
  />
</template>
```

## 多列选择

通过 `columns` 属性设置多列选择。

```vue
<template>
  <select-field 
    v-model="multiValue" 
    label="选择地区" 
    :columns="columns" 
  />
</template>

<script setup>
import { ref } from 'vue';

const multiValue = ref(['110000', '110100', '110101']);
const columns = [
  {
    values: [
      { text: '北京市', value: '110000' },
      { text: '广东省', value: '440000' }
    ]
  },
  {
    values: [
      { text: '北京市', value: '110100' },
      { text: '广州市', value: '440100' }
    ]
  },
  {
    values: [
      { text: '东城区', value: '110101' },
      { text: '天河区', value: '440106' }
    ]
  }
];
</script>
```

## 级联选择

通过 `cascade` 属性启用级联选择模式。

```vue
<template>
  <select-field 
    v-model="cascadeValue" 
    label="选择地区" 
    cascade 
    :options="cascadeOptions" 
  />
</template>

<script setup>
import { ref } from 'vue';

const cascadeValue = ref('110101');
const cascadeOptions = [
  {
    text: '北京市',
    value: '110000',
    children: [
      {
        text: '北京市',
        value: '110100',
        children: [
          { text: '东城区', value: '110101' },
          { text: '西城区', value: '110102' }
        ]
      }
    ]
  },
  {
    text: '广东省',
    value: '440000',
    children: [
      {
        text: '广州市',
        value: '440100',
        children: [
          { text: '天河区', value: '440106' },
          { text: '海珠区', value: '440105' }
        ]
      }
    ]
  }
];
</script>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| v-model | 选中项的值 | _string \| number \| boolean \| array_ | - |
| label | 左侧文本 | _string_ | - |
| options | 选项数组 | _Option[]_ | `[]` |
| columns | 多列选择的数据 | _Column[]_ | - |
| placeholder | 占位文本 | _string_ | `请选择` |
| disabled | 是否禁用 | _boolean_ | `false` |
| readonly | 是否只读 | _boolean_ | `false` |
| required | 是否显示必填星号 | _boolean_ | `false` |
| cascade | 是否使用级联模式 | _boolean_ | `false` |
| label-width | 左侧文本宽度 | _string \| number_ | `90px` |
| label-align | 左侧文本对齐方式，可选值为 `center` `right` | _string_ | `left` |
| error | 是否显示错误状态 | _boolean_ | `false` |
| error-message | 底部错误提示文案 | _string_ | - |
| title-class | 左侧标题额外类名 | _string_ | - |
| value-class | 右侧内容额外类名 | _string_ | - |

### Option 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| text | 选项文字 | _string_ |
| value | 选项对应的值 | _string \| number \| boolean_ |
| disabled | 是否禁用选项 | _boolean_ |
| children | 子选项列表，用于级联选择 | _Option[]_ |

### Column 数据结构

| 键名 | 说明 | 类型 |
| --- | --- | --- |
| values | 列选项数组 | _Option[]_ |
| defaultIndex | 初始选中项的索引 | _number_ |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| change | 选项改变时触发 | _value: string \| number \| boolean \| array_ |
| confirm | 点击完成按钮时触发 | _value: string \| number \| boolean \| array, selectedOptions: Option[]_ |
| cancel | 点击取消按钮时触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义显示内容 |
| label | 自定义左侧标签 |
| right-icon | 自定义右侧图标 |

### 样式变量

以下为组件提供的 CSS 变量，可用于自定义样式。

| 名称 | 默认值 | 说明 |
| --- | --- | --- |
| --ql-select-field-height | `44px` | 字段高度 |
| --ql-select-field-padding | `0 var(--ql-padding-md)` | 内边距 |
| --ql-select-field-label-width | `90px` | 标签宽度 |
| --ql-select-field-label-color | `var(--ql-text-color)` | 标签颜色 |
| --ql-select-field-value-color | `var(--ql-text-color)` | 值颜色 |
| --ql-select-field-placeholder-color | `var(--ql-text-color-3)` | 占位符颜色 |
| --ql-select-field-disabled-color | `var(--ql-text-color-3)` | 禁用状态颜色 |
| --ql-select-field-background | `var(--ql-background-color-light)` | 背景色 |
| --ql-select-field-border-color | `var(--ql-border-color)` | 边框颜色 |
