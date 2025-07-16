<template>
  <div class="css-variables-test">
    <h3>CSS变量测试</h3>
    
    <div class="test-section">
      <h4>颜色变量测试</h4>
      <div class="color-box primary">--van-primary-color</div>
      <div class="color-box blue">--van-blue</div>
      <div class="color-box red">--van-red</div>
      <div class="color-box green">--van-green</div>
    </div>

    <div class="test-section">
      <h4>背景色变量测试</h4>
      <div class="bg-box bg-light">--van-background-color-light</div>
      <div class="bg-box bg-gray">--face-background-color-gray-3</div>
      <div class="bg-box bg-primary-light">--face-background-color-primary-light</div>
    </div>

    <div class="test-section">
      <h4>边框圆角测试</h4>
      <div class="radius-box radius-sm">--van-border-radius-sm</div>
      <div class="radius-box radius-md">--van-border-radius-md</div>
      <div class="radius-box radius-lg">--van-border-radius-lg</div>
      <div class="radius-box radius-max">--van-border-radius-max</div>
    </div>

    <div class="test-section">
      <h4>字体大小测试</h4>
      <div class="font-xs">--van-font-size-xs (10px)</div>
      <div class="font-sm">--van-font-size-sm (12px)</div>
      <div class="font-md">--van-font-size-md (14px)</div>
      <div class="font-lg">--van-font-size-lg (16px)</div>
    </div>

    <div class="test-section">
      <h4>间距测试</h4>
      <div class="padding-test padding-xs">--van-padding-xs</div>
      <div class="padding-test padding-sm">--van-padding-sm</div>
      <div class="padding-test padding-md">--van-padding-md</div>
      <div class="padding-test padding-lg">--van-padding-lg</div>
    </div>
  </div>
</template>

<script setup>
// CSS变量测试组件
</script>

<style scoped>
.css-variables-test {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.test-section {
  margin-bottom: 30px;
  padding: 15px;
  border: 1px solid var(--van-border-color);
  border-radius: var(--van-border-radius-md);
}

.test-section h4 {
  margin: 0 0 15px 0;
  color: var(--van-text-color);
  font-size: var(--van-font-size-lg);
}

/* 颜色测试 */
.color-box {
  display: inline-block;
  width: 120px;
  height: 40px;
  margin: 5px;
  line-height: 40px;
  text-align: center;
  color: white;
  font-size: var(--van-font-size-sm);
  border-radius: var(--van-border-radius-sm);
}

.color-box.primary {
  background-color: var(--van-primary-color);
}

.color-box.blue {
  background-color: var(--van-blue);
}

.color-box.red {
  background-color: var(--van-red);
}

.color-box.green {
  background-color: var(--van-green);
}

/* 背景色测试 */
.bg-box {
  display: inline-block;
  width: 200px;
  height: 40px;
  margin: 5px;
  line-height: 40px;
  text-align: center;
  font-size: var(--van-font-size-sm);
  border: 1px solid var(--van-border-color);
  border-radius: var(--van-border-radius-sm);
}

.bg-box.bg-light {
  background-color: var(--van-background-color-light);
  color: var(--van-text-color);
}

.bg-box.bg-gray {
  background-color: var(--face-background-color-gray-3);
  color: var(--van-text-color);
}

.bg-box.bg-primary-light {
  background-color: var(--face-background-color-primary-light);
  color: var(--van-text-color);
}

/* 圆角测试 */
.radius-box {
  display: inline-block;
  width: 120px;
  height: 40px;
  margin: 5px;
  line-height: 40px;
  text-align: center;
  background-color: var(--van-primary-color);
  color: white;
  font-size: var(--van-font-size-xs);
}

.radius-box.radius-sm {
  border-radius: var(--van-border-radius-sm);
}

.radius-box.radius-md {
  border-radius: var(--van-border-radius-md);
}

.radius-box.radius-lg {
  border-radius: var(--van-border-radius-lg);
}

.radius-box.radius-max {
  border-radius: var(--van-border-radius-max);
}

/* 字体大小测试 */
.font-xs {
  font-size: var(--van-font-size-xs);
  color: var(--van-text-color);
  margin: 5px 0;
}

.font-sm {
  font-size: var(--van-font-size-sm);
  color: var(--van-text-color);
  margin: 5px 0;
}

.font-md {
  font-size: var(--van-font-size-md);
  color: var(--van-text-color);
  margin: 5px 0;
}

.font-lg {
  font-size: var(--van-font-size-lg);
  color: var(--van-text-color);
  margin: 5px 0;
}

/* 间距测试 */
.padding-test {
  background-color: var(--face-background-color-primary-light);
  border: 1px solid var(--van-border-color);
  margin: 5px 0;
  color: var(--van-text-color);
  font-size: var(--van-font-size-sm);
}

.padding-test.padding-xs {
  padding: var(--van-padding-xs);
}

.padding-test.padding-sm {
  padding: var(--van-padding-sm);
}

.padding-test.padding-md {
  padding: var(--van-padding-md);
}

.padding-test.padding-lg {
  padding: var(--van-padding-lg);
}
</style>
