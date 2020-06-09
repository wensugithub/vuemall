<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "#FF1493"
      }
    },
    data() {
      return {
        // 默认未点击状态
        // isActive: false
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // this.$router.replace(this.path);
        // console会报错，连续点击2次相同的url
        // 解决方法1:
        this.$router.replace(this.path, () => {})
        // 解决方法2:
        // this.$router.replace(this.path).catch(err => {});
        // 解决方法3: use router-link
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1px;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    /*图片和阴影间留点空隙*/
    margin-top: 3px;
    /*著名的3像素Bug*/
    vertical-align: middle;
    /*margin-bottom: 2px;*/
  }
</style>
