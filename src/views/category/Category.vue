<template>
  <div class="wrapper">

  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Category",
    // data() {
    //   return {
    //     scroll
    //   }
    // },
    // mounted() {
    //   console.log(document.querySelector('.wrapper'));
    //   this.scroll = new BScroll('.wrapper',{
    //     // 获取位置信息，包含惯性滚动
    //     probeType: 3,
    //     // 上拉加载
    //     pullUpLoad: true
    //   })
    //   this.scroll.on('scroll', (position) => {
    //     // console.log(position);
    //   })
    //   this.scroll.on('pullingUp', () => {
    //     console.log("上拉加载");
    //     this.scroll.finishPullUp();
    //   })
    //   // document.querySelector(".btn").addEventListener("click", (event) => {
    //   //   console.log("##click##", event);
    //   // })

    // },
    // methods: {
    //   btnClick(event) {
    //     console.log("btnClick", event);
    //   }
    // }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: #FFFF00;
    overflow: hidden;
    /*移动端卡，所以不用*/
    /*overflow-y: scroll;*/
  }
</style>
