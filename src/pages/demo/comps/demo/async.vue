<template>
<div class="example-async">
  <h3 class="example-async-title">{{title}}</h3>
  <div class="example-async-content">{{content}}</div>
</div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'title',
    },
    content: {
      type: String,
      default: 'content',
    },
  },
};
</script>

<style lang="less">
.example-async{
  color: #333;
  margin: 12px;
  border: 1px solid #d99;
  border-radius: 4px;
  overflow: hidden;
  &-title{
    font-size: 18px;
    line-height: 36px;
    margin: 0;
    padding: 0 10px;
    background-color: #efdddd;
    border-bottom: 1px solid #d99;
  }
  &-content{
    font-size: 14px;
    padding: 5px 10px;
    line-height: 28px;
    border-bottom: 1px solid #d99;
  }
  &-content:last-child{
    border-bottom: none;
  }
}
</style>
