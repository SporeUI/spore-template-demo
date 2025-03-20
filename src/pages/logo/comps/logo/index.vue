<template>
<div class="example-logo">
  <img class="example-logo-img" :src="logo" />
  <h3 class="example-logo-title">{{title}}</h3>
</div>
</template>

<script>
export default {
  props: {
    logo: {
      type: String,
      default: 'https://rocket-team.cdn-go.cn/rocket-assets/latest/logo-240x240.png',
    },
    title: {
      type: String,
      default: 'LOGO TEXT',
    },
  },
};
</script>

<style lang="less">
.example-logo{
  &-img{
    display: block;
    margin: 0 auto;
  }
  &-title {
    margin: 10px 0;
    padding: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
  }
}
</style>
