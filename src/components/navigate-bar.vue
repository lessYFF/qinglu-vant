<!--
 * @Author: duhuo
 * @Date: 2022-10-23 19:40:41
 * @LastEditors: duhuo
 * @LastEditTime: 2022-10-24 15:54:01
 * @Description: Do not edit
-->
<script setup>
import { ref, toRefs } from "vue";
import { useRouter } from 'vue-router';
import { useThemeVars } from '../use';
const themeVars = useThemeVars({
  navBarBackgroundColor: "#3975C6",
  navBarIconColor: "#fff",
  navBarTextColor: "#fff",
  navBarTitleTextColor: "#fff",
  navBarArrowSize: "20px",
});
const props = defineProps({
  btnTxt: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    default: "页面标题",
  },
  leftText: {
    type: String,
    default: "返回",
  },
  rightText: {
    type: String,
    default: "",
  },
});

const { btnTxt, title, leftText, rightText } = toRefs(props);

// 安全地获取router，在演示环境中可能不存在
let router = null;
try {
  router = useRouter();
} catch (error) {
  console.log('Router not available in demo environment');
}

// 在演示环境中，可能没有路由信息，使用props中的title作为默认值
const pageName = ref(props.title || "页面标题");

const goBack = () => {
  // 在演示环境中，可能没有路由历史，添加安全检查
  if (router && typeof router.go === 'function') {
    router.go(-1);
  } else {
    console.log('返回上一页（演示环境）');
    // 在演示环境中，可以触发一个自定义事件
    // emit('back');
  }
};
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <van-nav-bar
      left-arrow
      @click-left="goBack"
      :title="pageName"
      :right-text="rightText || btnTxt"
      safe-area-inset-top
    />
  </van-config-provider>
</template>

<style lang="less" scoped>
.nav-back {
  width: 60px;
  padding: 5px;
  font-size: 20px;
}
.nav-title {
  width: 200px;
  font-size: 16px;
  text-align: center;
}
</style>