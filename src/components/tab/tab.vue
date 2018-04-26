<template>
  <div class="tab">
    <router-link class="tab-item" to="/goods">
      <span class="tab-link">商品</span>
    </router-link>
    <router-link class="tab-item" to="/ratings">
      <span class="tab-link">评价</span>
    </router-link>
    <router-link class="tab-item" to="/seller">
      <span class="tab-link">商家</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.tab {
  display: flex;
  height: 40px;
  line-height: 40px;
  .tab-item{
    flex: 1;
    .font-dpr(14px);
    text-align: center;
    &.router-link-active{
      color: red;
    }
  }
}
</style>