<template>
<div class="page-logo">
  <Title title="Example Logo"/>
  <Logo/>
</div>
</template>

<script>
import Title from '../../common/Title';
import Logo from './comps/Logo';

const strPageInject = `
<style>
body,html{
  overflow: hidden;
  background-color: transparent;
}
</style>
`;

export default {
  components: {
    Title,
    Logo,
  },
  created() {
    const { $store, $route } = this;
    const { query } = $route;
    const info = query.info || '';
    if (info) {
      // 这里获取参数不依赖 window 对象
      // 可以实现不同页面参数渲染不同结果
      console.info('=====> this.$route.query.info:', info);
    }
    $store.commit('pageTitle', 'Poodle template Logo');
    $store.commit('pageContext', {
      pageInject: strPageInject,
    });
  },
};
</script>

<style lang="less">
.page-logo{
  margin-bottom: 100px;
}
</style>
