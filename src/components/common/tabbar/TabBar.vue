<template>
  <div id="tab-bar">
    <!--tabbar应该只关注tarbar的属性，至于每一个tabbar-item不应该都写到这, 所以这里用插槽-->
    <!--在app.vue中，调用tabbar的时候,向tabbar里面传4个tabbar-item就可以了-->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0px -5px 10px rgba(100, 100, 100, .3);
  }
</style>
