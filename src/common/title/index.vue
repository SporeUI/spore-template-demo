<template>
<h3 class="example-title">{{title}}</h3>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title',
    },
  },
};
</script>

<style lang="less">
.example-title{
  color: #333;
  font-size: 24px;
  padding: 0;
  margin: 0 12px 10px 12px;
  border-bottom: 1px solid #ddd;
  line-height: 48px;
}
</style>
