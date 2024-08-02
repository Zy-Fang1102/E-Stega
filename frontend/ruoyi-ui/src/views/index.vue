<template>
  <div class="env_container"> <!-- 修改了外层 div 的类名 -->
    <div class="env_content">
      <env-left />
      <env-center />
      <env-right />
    </div>
  </div>
</template>

<script>
import envLeft from "../components/envLeft.vue";
import envRight from "../components/envRight.vue";
import envCenter from "../components/envCenter.vue";
export default {
  components: { envLeft, envCenter, envRight },
};
</script>

<style scoped>
.env_container { /* 新增外层背景样式 */
  background-image: url('../assets/images/bg1.jpg'); /* 设置背景图片 */
  background-size: cover; /* 使背景图像覆盖整个容器 */
  background-position: center; /* 中心对齐背景图像 */
  color: white; /* 字体颜色设置为白色，以便与背景对比 */
  padding: 20px; /* 添加一些内边距以增加可读性 */
}

.env_content {
  display: flex;
  justify-content: space-between;
}
</style>
