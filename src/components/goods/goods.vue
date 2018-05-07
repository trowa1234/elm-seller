<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="(item,index) in GoodsData" :key="index" class="menu-item">
          <span class="menu-text">{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper"></div>
  </div>
</template>

<script>
import { getGoodsData } from "@/api/api";
export default {
  data(){
    return {
      GoodsData:[]
    }
  },
  created() {
    this._getGoodsData();
  },
  methods: {
    _getGoodsData() {
      getGoodsData().then(res => {
        if (res.code == 0) {
          this.GoodsData = res.data;
          console.log(this.GoodsData)
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.goods {
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 1.28rem;
  top: 4.64rem;
  display: flex;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 2.1333rem;
    background-color: #f4f5f7;
    
    .menu-item{
      width: 100%;
      height: 1.4267rem;
      box-sizing: border-box;
      border-bottom: 1px solid #DDDEE0;
      padding: 0 0.32rem;
      display: table;
      .menu-text{
        display: table-cell;
        vertical-align: middle;
        line-height: 0.3733rem;
        .font-dpr(12px);
      }
    }
  }
  .goods-wrapper {
    flex: 1;
  }
}
</style>