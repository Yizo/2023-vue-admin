<template>
  <div class="not-found">
    <svg-icon class-name="icon" icon="404"/>
    <p>404, 找不到该页面</p>
    <a-button type="primary">返回</a-button>
  </div>
</template>

<script>
  import SvgIcon from "@/SvgIcon/src/index.vue";

  export default {
    name: '404',
    components: {SvgIcon},
  };
</script>

<style lang="less" scoped>
  .not-found {
    text-align: center;
    padding-top: 20%;
    p {
      padding: 20px 0;
    }
    .icon {
      font-size: 60px;
      color: cornflowerblue;
    }
  }
</style>
