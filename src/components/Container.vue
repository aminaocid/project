<template>
  <div class="title"> 全国空气质量数据可视化系统</div>
  <slot name="main"></slot>
  <slot name="right"></slot>
  <div class="footer">
    <a href="https://beian.miit.gov.cn" target="_blank"
      >黑ICP备2021001647号-2</a
    >
  </div>
</template>
<script>
export default {
  name: "container",
  data() {
    return {};
  },
};
</script>

<style scoped>
.title {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 50px;
  background-color: rgb(238, 238, 240);
  color: #888888;
  font-size: 25px;
  line-height: 50px;
  /* text-align: center; */
  box-shadow: 0px 5px 3px #888888;
}

.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  height: 20px;
  background-color: rgba(255, 255, 255, 0.7);
}

.footer a {
  color: black;
  position: absolute;
  left: calc(50% - 92px);
  text-decoration: none;
}
</style>