<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="titles"
                 @tabClick="tabClick"
                 ref="tabControllForDisplay"
                 class="tab-control" v-show="isTabFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles"
                   @tabClick="tabClick"
                   ref="tabControll"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top v-show="isShowBackTopFlag" @click.native="backClick"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from 'network/home';
  import {debounce} from "common/utils";


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ["流行", "新款", "精选"],
        goods: {
          "pop": {page: 0, list:[]},
          "new": {page: 0, list:[]},
          "sell": {page: 0, list:[]},
        },
        currentType: "pop",
        isShowBackTopFlag: false,
        tabControllOffsetTop: 0,
        isTabFixed: false,
        saveY: 0
      }
    },
    created() {
      console.log("created");
      // 1.请求多个数据(created中不适合写太多逻辑，应该放到方法中，因此具体的操作抽离到方法里)
      this.getHomeMultidata();
      // 2.商品详情「流行,新款,精选」
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");
    },
    mounted() {
      // 1.图片加载完的事件监听 防抖函数调用
      const refresh = debounce(this.$refs.scroll.refresh, 1000)
      this.$bus.$on("itemImageLoad", () => {
        // 为了防止refresh调用很多次
        refresh()
      })
    },
    destroyed() {
      console.log("home destroyed");
    },
    activated() {
      console.log("active", this.saveY);
      this.$refs.scroll.scrollTo(0, this.saveY, 10);
      this.$refs.scroll.refresh();
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY();
      console.log("deactive", this.saveY);
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    methods: {
      tabClick(index) {
        // 流行，新款，精选点击事件
        console.log(Object.keys(this.goods)[index]);
        this.currentType = Object.keys(this.goods)[index];
        this.$refs.tabControllForDisplay.currentIndex = index;
        this.$refs.tabControll.currentIndex = index;
      },
      backClick() {
        // 回到首页点击事件
        // console.log(this.$refs.scroll.scroll);
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        // scroll.vue中监听滚动位置实时触发的函数
        // console.log("home", Math.abs(position.y));
        // 1. 判断backTop是否显示
        this.isShowBackTopFlag = Math.abs(position.y) > 1000 ? true: false;
        // 2. 决定tabControll是否吸顶(position: fixed)
        this.isTabFixed = Math.abs(position.y) > this.tabControllOffsetTop ? true: false;
      },
      loadMore() {
        console.log("home", "上拉加载更多");
        this.getHomeGoods(this.currentType);
      },
      swiperImageLoad() {
        //  获取tabControll的offsetTop
        //    所有组件都有一个元素$el:用于获取组件中的元素
        // console.log(this.$refs.tabControll.$el.offsetTop);
        this.tabControllOffsetTop = this.$refs.tabControll.$el.offsetTop;
      },
      /**
       *  网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page +=1;
          // // 可以继续显示上拉加载
          this.$refs.scroll.finishPullUp();
          // // 图片异步加载后，让bscroll重新计算可滚动区域
          // this.$refs.scroll.refresh();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*方案1*/
    /*padding-top: 44px;*/
    /*position: relative;*/
    height: 100vh;
    /*方案2*/
    /*vh:view-port height*/
    /*height: 100vh;*/
  }
  /*用了betterScroll后，会在局部区域内滚动, 因此nav bar就不需要再固定了*/
  /*之前固定是由于，用的原生html滚动，滚动的话，整个html一起跟着滚动*/
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;!*让home-bar始终显示到最外,不被覆盖*!*/
  }
  /*.tab-control {*/
    /*!*position: sticky;*!*/
    /*!*top: 44px;!*达到44后,position属性会改为fixed, 缺点是很多浏览器不支持该属性*!*!*/
    /*!*background-color: #fff;*!*/
  /*}*/
  .content {
    overflow: hidden;
    /*方案1 定位*/
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    /*方案2*/
    /*height: calc(100% - 44px - 49px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  }
  /*在betterScroll中，通过transform: translate来实现的，即使你用fixed属性，也是随着transform改变而变化*/
  /*:class="{fixed: isTabFixed}"*/
  /*.fixed {*/
    /*position: fixed;*/
    /*left:0;*/
    /*right: 0;*/
    /*top: 44px*/
  /*}*/
  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
