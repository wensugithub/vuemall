<template>
  <div class="tab-control">
    <!--@click="currentIndex=index">-->
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active: index == currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit("tabClick", index);
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    heigth: 40px;
    line-height: 40px;
    background-color: #fff;
    z-index: 9
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span {
    padding: 5px
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
