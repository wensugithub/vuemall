<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :paramInfo="paramInfo"/>
    </scroll>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import {getItemDetail, Goods, Shop, GoodsParam} from "network/detail";
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {}
      }
    },
    created() {
      // 1.保存传入的商品Id
      this.iid = this.$route.params.id;

      // 2.获取详情页面数据
      getItemDetail(this.iid).then(res => {
        const data = res.data.result;
        console.log(data);
        // 1.获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages;

        // 2.获取商品信息(销量，收藏 ，售后服务)
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        // 3.店铺相关信息
        this.shop = new Shop(data.shopInfo);

        // 4.商品详情数据(穿着效果图片)
        this.detailInfo = data.detailInfo;

        // 5.获取尺寸等商品具体信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
      })
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        console.log("refresh finish");
      }
    },
    activated() {
      console.log("detail activated");
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px);
  }
  /*在betterScroll进行滚动时，为了不让deatailNavbar被覆盖*/
  /*尽量用relative,特别适合于微调*/
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
