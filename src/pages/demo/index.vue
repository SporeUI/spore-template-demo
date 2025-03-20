<template>
<div class="page-demo">
  <Title title="Example"/>
  <Demo title="demo1" content="组件之间可以通信"/>
  <Demo title="demo2" content="点击按钮来确认能力"/>
  <div class="demo-title">样式测试</div>
  <div class="demo-rem"></div>
  <div class="demo-keyframe"></div>
</div>
</template>

<script>
import Title from '../../common/Title';
import Demo from './comps/Demo';

export default {
  components: {
    Title,
    Demo,
  },
  created() {
    const { $store } = this;
    $store.commit('pageTitle', 'Spore template Demo');
  },
};
</script>

<style lang="less">
@import url("../../common/style/reset.less");

.page-demo{
  margin-bottom: 100px;
  .demo-title{
    font-size: 18px;
    font-weight: bold;
  }
  .demo-rem{
    width: 375px;
    height: 10px;
    background-color: #ff9501;
  }
  .demo-keyframe{
    margin: 10px auto 0;
    width: 50px;
    height: 50px;
    background-color: #ff9501;
    animation: roll 2000ms ease-in-out infinite;
  }
}

@keyframes roll {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0);
  }
}
</style>
