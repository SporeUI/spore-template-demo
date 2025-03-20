<template>
<div class="example-demo">
  <h3 class="example-demo-title">{{title}}</h3>
  <div class="example-demo-content">{{content}}</div>
  <div class="example-demo-content">
    <span class="example-demo-label">prefetch data</span>
    <span class="example-demo-info">{{prefetchInfo}}</span>
  </div>
  <div class="example-demo-content">
    <span class="example-demo-btn" @click="onBusClick">bus demo</span>
    <span class="example-demo-info">{{busClicked}}</span>
  </div>
  <div class="example-demo-content">
    <span class="example-demo-btn" @click="onFetch">fetch demo</span>
    <span class="example-demo-info">{{fetchInfo}}</span>
  </div>
  <div class="example-demo-content">
    <!-- 异步模块必须放在 no-ssr 标签里面，避免被直接载入 -->
    <no-ssr placeholder="Loading...">
      <Async title="异步模块" content="异步加载的内容" />
    </no-ssr>
  </div>
</div>
</template>

<script>
// 如果有异步模块的存在
// components 选项需要独立于组件对象之外进行配置
const components = {};

// 异步模块必须判断仅在客户端环境插入, 避免服务端渲染报错
// 由于代码打包为插件在另外的服务中运行，打包后的文件中 process 变量是互相隔离的环境数据
// 所以不能用 process.browser 或则 process.env.VUE_ENV 来判断服务端环境
if (typeof window !== 'undefined') {
  components.Async = () => import('./Async');
}

export default {
  components,
  props: {
    title: {
      type: String,
      default: 'title',
    },
    content: {
      type: String,
      default: 'content',
    },
    apiPrefetchInfoName: {
      type: String,
      default: 'example/demo/async-data',
    },
  },
  data() {
    return {
      busClicked: 0,
      fetchInfo: '',
    };
  },
  computed: {
    prefetchInfo() {
      return this.apiPrefetchInfo.get('data.info');
    },
  },
  methods: {
    onBusEmit(num) {
      this.busClicked = num;
    },
    onBusClick() {
      this.busClicked += 1;
      // 结合 vue-router, 可以便捷地处理无刷新跳转
      this.setQuery();
      // 打印一条日志
      this.$logger.info('bus demo clicked');
      // 发送一条广播
      this.$bus.emit('example/bus-test-click', this.busClicked);
    },
    // vue router 使用示例
    // 因为活动页面没有独立路由页面路径
    // 所以应该只操作 query
    setQuery() {
      // 传递给 router 的对象
      // 必须是新对象
      // 否则会报错 `vue router Navigating to current location is not allowed`
      const query = {
        ...this.$route.query,
        bus_clicked: this.busClicked,
      };
      this.$router.replace({
        query,
      });
    },
    checkQuery() {
      let num = this.$route.query.bus_clicked;
      num = parseInt(num, 10) || 0;
      this.busClicked = num;
    },
    async onFetch() {
      this.fetchInfo = 'loading ...';
      // 注意 $request 方法不能用于数据预取
      const rs = await this.$request({
        // name 选项可用于辅助统计
        // 推荐命名规则: `插件名称/组件名称/数据名称`
        name: 'example/demo/ajax-data',
        url: 'https://rocket-team.cdn-go.cn/rocket-assets/latest/json/example-ajax.json',
      });
      this.fetchInfo = JSON.stringify(rs);
    },
    // 注意预取数据的方法执行在没有 window 的服务端环境内
    async loadPrefetchInfo() {
      // 推荐用 $api 方法来预取数据
      // 如果期望请求可以在全局配置中被修改，也应该使用 $api
      await this.apiPrefetchInfo.fetch();
    },
  },
  // 预取数据统一封装在这个方法内
  // Vue 2.6 之后都支持
  // @see https://ssr.vuejs.org/guide/data.html#logic-collocation-with-components
  async serverPrefetch() {
    await this.loadPrefetchInfo();
  },
  // create 使用 async 是无效的
  // mounted 事件会并行触发
  // created 生命周期内不要做 dom 操作
  created() {
    // 服务端预渲染数据使用 $api 方法来请求获取
    // created 方法执行早于 serverPrefetch
    // 所以可以在这里提早定义 api 实例
    this.apiPrefetchInfo = this.$api({
      // 这部分选项，可被布局信息覆盖
      // 注意由于数据挂载到 store, 所以要避免接口名称冲突
      // 推荐命名规则: `插件名称/组件名称/数据名称`
      // 推荐命名添加到 props，这样可以在配置端解决组件接口命名冲突问题
      name: this.apiPrefetchInfoName,
      // 缓存时间内，会复用之前的请求结果，不会发起新的请求
      cache: 1000,
      url: 'https://rocket-team.cdn-go.cn/rocket-assets/latest/json/example-prefetch.json',
    });
    // 使用 $logger 对象打印染色日志
    this.$logger.info('demo created');
    // 使用 $bus 来发送和接收广播
    this.$bus.on('example/bus-test-click', this.onBusEmit);
  },
  // 所有涉及到 dom 操作的环节，在 mouted 周期内完成
  async mounted() {
    // 组件有时可能会仅在客户端加载
    // 此时服务端预取方法并未执行
    // 如果期望预取数据依然在组件客户端加载后生效
    // 就需要在 mounted 周期检查并重新拉取数据
    if (!this.prefetchInfo) {
      await this.loadPrefetchInfo();
    }
    // 获取路由信息的方法
    // 最好在 mounted 生命周期执行
    this.checkQuery();
  },
  destroyed() {
    // 绑定的广播一定要记得在 destroyed 周期移除
    this.$bus.off('example/bus-test-click', this.onBusEmit);
  },
};
</script>

<style lang="less">
.example-demo{
  color: #333;
  margin: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
  &-title{
    font-size: 18px;
    line-height: 36px;
    margin: 0;
    padding: 0 10px;
    background-color: #efefef;
    border-bottom: 1px solid #ddd;
  }
  &-content{
    font-size: 14px;
    padding: 5px 10px;
    line-height: 28px;
    border-bottom: 1px solid #ddd;
  }
  &-content:last-child{
    border-bottom: none;
  }
  &-label{
    font-weight: bold;
  }
  &-label:after{
    content: ':';
  }
  &-btn{
    padding: 5px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  &-info{
    margin: 0 12px;
  }
}
</style>
