<template>
  <div class="shopcart">
    <div class="content">
      <div class="left-item">
        <!-- 当有商品时，购物车图标会高亮显示。totalCount大于0时，添加样式highlight，使购物车图标和背景改变颜色 -->
        <div class="logo-item" :class="{'highlight':totalCount>0}">
          <div class="logo">
            <i class="iconfont icon-cart"></i>
          </div>
          <div class="goodsNum" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <!-- 当价格大于0时，样式高亮 -->
        <div class="total-price" :class="{'highlight':totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="delivery-price">
          另需配送费￥{{deliveryPrice}}元
        </div>
      </div>
      <div class="right-item">
        <!-- 可结算时，按钮改变样式 -->
        <div class="pay" :class="{'enough':totalPrice>minPrice}">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //送餐费
    deliveryPrice: {
      type: Number,
      default: 0
    },
    //起送价
    minPrice: {
      type: Number,
      default: 0
    },
    //接收选择的商品。数组中是1个1个对象（商品），对象中有商品价格和商品数量
    selectFoods:{
      type:Array, 
      default:function(){ //默认为1个函数，返回1个数组
        return []
      }
    }
  },
  computed:{
    //这个totalPrice变量依赖于selectFoods，根据它来计算出选择商品的总价格
    totalPrice(){
      let total = 0; //总结默认0
      //遍历传递过来的数组中的商品
      this.selectFoods.forEach((food) => {
        total += food.price * food.count; //累加商品价格
      });
      return total;
    },
    // 计算商品的总数
    totalCount(){
      let count = 0;
      this.selectFoods.forEach((food) => {
        count += food.count;
      });
      return count;
    },
    // 右侧起送价格信息实现
    payDesc(){
      if(this.totalPrice === 0){  //当总价为0时，直接显示起送价格
        return `￥${this.minPrice}元起送`;
      } else if(this.totalPrice < this.minPrice){ //当商品价格小于起送价格时，返回起送价-总价
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      }else{
        return `去结算` //剩下情况就是可以结算
      }
    },
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.shopcart {
  position: fixed;
  width: 100%;
  height: 1.28rem;
  background-color: #141d27;
  left: 0;
  bottom: 0;
  .content {
    display: flex;
    .left-item {
      flex: 1;
      .logo-item {
        display: inline-block;
        padding: 0.16rem;
        background-color: #141d27;
        border-radius: 50%;
        position: relative;
        top: -0.18rem;
        margin-left: 0.32rem;
        &.highlight{
          .logo{
            background-color: #00A0DC;
            .icon-cart{
              color: #fff;
            }
          }
        }
        .logo {
          width: 1.1733rem;
          height: 1.1733rem;
          line-height: 1.1733rem;
          text-align: center;
          background-color: #2b343c;
          border-radius: 50%;
          .icon-cart {
            .font-dpr(22px);
            color: #80858a;
          }
        }
        .goodsNum{
          position: absolute;
          right: 0;
          top: 0;
          background-color: red;
          color: #fff;
          padding: 0.0267rem 0.16rem;
          font-weight: 700;
          .font-dpr(12px);
          border-radius: 0.16rem;
        }
      }
      .total-price {
        display: inline-block;
        vertical-align: top;
        .font-dpr(16px);
        font-weight: 700;
        border-right: 1px solid #5c6d81;
        padding-right: 0.32rem;
        line-height: 0.68rem;
        margin-top: 0.32rem;
        margin-left: 0.32rem;
        &.highlight{
          color: #fff;
        }
      }
      .delivery-price {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        margin-top: 0.47rem;
        padding-left: 0.32rem;
        color: #85878A;
      }
    }
    .right-item {
      flex: 0 0 2.8rem;
      width: 2.8rem;
      .pay {
        text-align: center;
        width: 100%;
        height: 1.28rem;
        line-height: 1.28rem;
        background-color: #2b333b;
        color: #979a9c;
        font-weight: 700;
        .font-dpr(14px);
        &.enough{
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
}
</style>