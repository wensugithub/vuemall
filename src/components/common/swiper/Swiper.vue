<template>
  <div id="ws-swiper">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <!--轮播图下方，小圈圈-->
    <div class="indicator" v-if="showIndicator && slideCount > 1">
      <div v-for="(item, index) in slideCount" class="indicator-item" :class="{active: index === currentIndex - 1}" :key="item" @click="changeItem(index)"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      // 轮播间隔时间,其实是图片切换的间隔时间
      intervalTime: {
        type: Number,
        default: 3000
      },
      // 图片横向移动时间transition
      transitionTime: {
        type: Number,
        default: 500
      },
      // 是否显示轮播图下方小圈圈
      showIndicator: {
        type: Boolean,
        default: true
      },
      // 手动拖拽多少比例可以换页
      moveRatio: {
        type: Number,
        default: 0.3
      }
    },
    data() {
      return {
        slideCount: 0,  // 元素个数
        swiperWidth: 0, // swiper宽度
        swiperStyle: {}, // swiper样式
        currentIndex: 1, // 当前的index
        scrolling: false, // 是否正在滚动(添加这个属性是为了，手动拖拽时需要判断是否正在滚动中)
      }
    },
    mounted() {
      // 1.初始化
      // 由于图片是异步加载，这里设置timeout等待图片加
      setTimeout(() => {
        // 这里只有用箭头函数,this才代表vuecomponent对象，用function的话就是window对象
        this.addDom();
        // 开启timer，由于是轮播所以得用到setInterval
        this.startTimer();
      } ,2000)
    },
    methods: {
      /**
       * 在api取出的数据前后添加slide
       */
      addDom() {
        // 1.获取现有的图片list
        let swiperNode = document.querySelector('.swiper');
        let swiperChildrenNodeList = swiperNode.getElementsByClassName('slide');

        // 2.保存个数
        this.slideCount = swiperChildrenNodeList.length;

        // 3.如果图片数量 > 1, (为了首尾连接，front前+最后一张图片, end后+第一张图片)
        if (this.slideCount > 1) {
          let cloneFirstNode = swiperChildrenNodeList[0].cloneNode(true);
          let cloneLastNode = swiperChildrenNodeList[swiperChildrenNodeList.length - 1].cloneNode(true);
          swiperNode.insertBefore(cloneLastNode, swiperChildrenNodeList[0]);
          swiperNode.appendChild(cloneFirstNode);

          // 将swiper宽度和style赋值给对应变量
          // 因为图片轮播需要用到css3的transform
          this.swiperWidth = swiperNode.offsetWidth;
          this.swiperStyle = swiperNode.style;

          // 4.显示从api取出来的第一张图片(目前的第一张是根据api数据中最后一张图片进行clone出来的)
          // 由于目前第一张图片是api取回的最后一张，所以需要整体向左移
          this.setTransform(-this.swiperWidth)
        }
      },
      /**
       * 通过css的transform属性里的translate3d(x,y,z)来移动图片(图片移动的核心)
       * x > 0 swiper整体右移，x < 0则左移
       *
       */
      setTransform(xPosition) {
        // Internet Explorer 10、Firefox、Opera 支持 transform 属性。
        this.swiperStyle.transform = `translate3d(${xPosition}px, 0, 0)`;
        // Internet Explorer 9 支持替代的 -ms-transform 属性（仅适用于 2D 转换）。
        this.swiperStyle['-ms-transform'] = `translate3d(${xPosition}px, 0, 0)`;
        // Safari 和 Chrome 支持替代的 -webkit-transform 属性（3D 和 2D 转换）。
        this.swiperStyle['-webkit-transform'] = `translate3d(${xPosition}px, 0, 0)`;
      },
      /**
       * 设置轮播图循环timer
       */
      startTimer() {
        this.intervalTimer = window.setInterval(() => {
          this.currentIndex++;
          this.setScrollContent(-this.currentIndex * this.swiperWidth)
        }, this.intervalTime)
      },
      /**
       *  停止轮播图循环timer
       */
      stopTimer() {
        window.clearInterval(this.intervalTimer);
      },
      /**
       *  由于图片轮播到最后一张时需要进行translate3d不需要继续偏移，需要添加判断
       *  这里重新抽离出一个方法
       */
      setScrollContent(currentPosition) {
        // 1.开始滚动
        this.scrolling = true;
        // 2.设置transform的translate3d属性让图片移动
        // 设置transiton是让图片有横向慢慢移动效果，否则是intervalTime时间一到，图片立即切换的效果
        this.swiperStyle.transition = "transform " + this.transitionTime + "ms";
        this.setTransform(currentPosition);
        // 3.检查轮播图是否到最后一张
        this.checkPosition();
        // 4.滚动结束
        this.scrolling = false;
      },
      /**
       * 检查轮播图的位置
       */
      checkPosition() {
        // 这里加上timeout是由于最后一张图片向第一张图片移动时，为了让他看起来有滑动的效果
        setTimeout(() => {
          this.swiperStyle.transition = "0ms";
          // 转到最后一张图片(api取出数据的第一张)
          if (this.currentIndex >= this.slideCount + 1) {
            this.currentIndex = 1;
            this.setTransform(-this.swiperWidth);
          } else if(this.currentIndex <= 0) {
            this.currentIndex = this.slideCount;
            this.setTransform(-this.currentIndex * this.swiperWidth)
          }
        }, this.transitionTime)
      },
      /**
       * 鼠标点击
       */
      touchStart(e) {
        // 1.如果正在滚动，则不可以拖动
        if (this.scrolling) return;
        // 2.拖动时暂停timer
        this.stopTimer();
        // 3.保存鼠标点击时的横向坐标x
        this.startX = e.touches[0].pageX
      },
      /**
       * 鼠标点击后移动
       */
      touchMove(e) {
        this.currentX = e.touches[0].pageX;
        // 鼠标移动时X - 鼠标点击时X
        // >0 的话，是向右移动，trslate3d 值减少 比如：-750的话，向右移动后变为-730
        this.distance = this.currentX - this.startX;
        this.currentPosition = -this.currentIndex * this.swiperWidth;
        // 手动拖拽后要移动的距离
        this.moveDistance = this.distance + this.currentPosition;
        // 为了让图片拖动时跟着动, 此时还是需要设置transform
        this.setTransform(this.moveDistance);
      },
      /**
       *  鼠标松开
       */
      touchEnd() {
        // 1.判断移动的distance和当前的currentIndex的关系
        let currentMove = Math.abs(this.distance);
        // 2.如果距离为0的话直接就跳到对应的网站了
        if (this.distance == 0) return;
        else if(this.distance > 0 && currentMove > this.swiperWidth * this.moveRatio) {
          // 向右拖拽并且拖拽的距离达到swiper宽的moveRatio比例的话
          this.currentIndex--
        } else if (this.distance < 0 && currentMove > this.swiperWidth * this.moveRatio) {
          // 向左拖拽并且拖拽的距离达到swiper宽的moveRatio比例的话
          this.currentIndex++
        }
        // 3.设置滚动位置
        this.setScrollContent(-this.currentIndex * this.swiperWidth);

        // 4.重启timer
        this.startTimer();
      },
      /**
       * 点击小圈圈
       */
      changeItem(index) {
        // 1.去除定时器
        this.stopTimer();
        // 2.设置当前点击的index
        this.currentIndex = index + 1;
        // 3.设置scroll的位置
        this.setScrollContent(-this.currentIndex * this.swiperWidth);
        // 4.重启timer
        this.startTimer();
      }
    }
  }
</script>

<style scoped>
  #ws-swiper {
    overflow: hidden;
    position: relative;
  }
  .swiper {
    display: flex;
  }
  .indicator {
    display: flex;
    /*css3属性项目位于容器的中心。*/
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }
  .indicator-item {
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #fff;
    line-height: 8px;
    text-align: center;
    font-size: 12px;
    margin: 0 5px;
  }
  .indicator-item.active{
    background-color: rgba(212,62,46,1.0);
  }
</style>
