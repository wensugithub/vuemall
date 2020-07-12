<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div class="title" slot="center">
        <div v-for="(title, index) in titles"
             class="title-item"
             :class="{active: index === currentIndex}"
             @click="titleClick(index)">
          {{title}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavVar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    font-size: 15px;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text)
  }
  .back img {
    margin-top: 10px;
  }
</style>
