<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      console.log("scroll.vue", "mounted");
      // 1.创建BetterScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        // 获取位置信息，包含惯性滚动
        probeType: this.probeType,
        // 上拉加载
        pullUpLoad: this.pullUpLoad,
        click: true
      })
      // 2. 监听滚动区域
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position);
          // console.log(position);
        })
      }
      // 3. 监听上拉加载
      if (this.pullUpLoad) {
        this.scroll.on("pullingUp", () => {
          console.log("mounted pullUpLoad on");
          // 监听滚动到底部
          this.$emit("pullingUp");
        })
      }
    },
    methods: {
      scrollTo(x, y, time=1000) {
        // 点击↑图标跳到首页时传入0, 0
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        // 上拉加载完成后需要调用finsihPullUp方法告诉betterScroll已经加载完，否则只会发生一次上拉加载
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        // 图片加载时，利用防抖函数，加载完图片后，需要重新计算better-scroll的位置来容纳图片
        this.scroll && this.scroll.refresh();
      },
      getScrollY() {
        // 取出跳转前的位置
        return this.scroll ? this.scroll.y : 0;
      }
    }
  }
</script>

<style scoped>

</style>
