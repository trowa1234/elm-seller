<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
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
        <div class="pay" :class="{'enough':totalPrice>=minPrice}">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ballcontainer">
      <transition name="drop" v-for="(ball,index) in balls" :key="index" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
        <!-- 推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。 -->
        <div v-show="ball.show" class="ball" v-bind:css="false">
          <div class="inner inner-hook"></div>
        </div>
      </transition>
    </div>
    <transition name="slidedown">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <span class="title">购物车</span>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="(food,index) in selectFoods" :key="index" class="list-item">
              <span class="food-name">{{food.name}}</span>
              <div class="price">￥{{food.price * food.count}}</div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>

        </div>
      </div>
    </transition>
    <div class="cart-shdow" v-show="listShow"></div>
  </div>
</template>

<script>
import cartcontrol from "@/components/cartcontrol/cartcontrol"; //商品加减数量组件
import BScroll from "better-scroll";

export default {
  data() {
    return {
      //定义5个小球数组，初始为隐藏
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [], //定义空数组用来存放已经下落的小球
      listShow: false
    };
  },
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
    selectFoods: {
      type: Array,
      default: function() {
        //默认为1个函数，返回1个数组
        return [];
      }
    }
  },
  created() {
    //使用全局bus事件从cartcontrol组件中调用addcart事件，把获取到的元素传递过来
    this.$root.eventBus.$on("addcart", elm => {
      this.dorp(elm); //定义dorp方法接收元素参数
    });
  },
  computed: {
    //这个totalPrice变量依赖于selectFoods，根据它来计算出选择商品的总价格
    totalPrice() {
      let total = 0; //总结默认0
      //遍历传递过来的数组中的商品
      this.selectFoods.forEach(food => {
        total += food.price * food.count; //累加商品价格
      });
      return total;
    },
    // 计算商品的总数
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    // 右侧起送价格信息实现
    payDesc() {
      if (this.totalPrice === 0) {
        //当总价为0时，直接显示起送价格
        return `￥${this.minPrice}元起送`;
      } else if (this.totalPrice < this.minPrice) {
        //当商品价格小于起送价格时，返回起送价-总价
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}元起送`;
      } else {
        return `去结算`; //剩下情况就是可以结算
      }
    }
  },
  methods: {
    dorp(elm) {
      //console.log(elm); //输出的是在cartcontrol组件中点击的元素
      for (let i = 0; i < this.balls.length; i++) {
        //遍历balls数组
        let ball = this.balls[i];
        if (!ball.show) {
          //当这个ball的show为false时
          ball.show = true; //把show设置为true
          ball.el = elm; //用el属性保存元素位置参数，这是算小球位置时需要的
          this.dropBalls.push(ball); //把动画过程中的小球添加到dropBalls这个数组中
          return;
        }
      }
    },
    //动画钩子函数
    //在beforrEnter的时候需要拿到所有的show被设置为true的小球。这些小球都要添加动画效果
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          //console.log(ball);
          let rect = ball.el.getBoundingClientRect(); //获取这个元素相对于屏幕视口的所在位置，这个值包括left和top
          let x = rect.left - 100; //获取小球元素元素x轴偏移值
          let y = -(window.innerHeight - rect.top - 70); //获取小球元素元素Y轴偏移值
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner-hook")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; //使浏览器重绘
      //异步执行
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner-hook")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
      });
    },
    //在afterEnter时，让在执行动画后的ball取出，使他重置为默认的隐藏，就可以反复的使用他
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    },
    //控制购物车面板显示隐藏
    toggleList() {
      if (this.totalCount === 0) {
        return;
      } else {
        this.listShow = !this.listShow;
        //在列表显示时，this.listShow为true时。
        if (this.listShow) {
          this.$nextTick(() => {
            //异步初始化滚动插件
            if (!this.scroll) {
              //防止一直重新初始化，
              this.scroll = new BScroll(this.$refs.listContent);
            } else {
              this.scroll.refresh(); //当this.scroll已经初始化时，直接调用起重新计算滚动高度的方法
            }
          });
        }
      }
    },
    //清空购物车
    empty() {
      //遍历选中商品，把它们的count设置为0
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    }
  },
  components: {
    cartcontrol
  },
  watch: {
    //监听商品总数，为0时，将购物车面板隐藏
    totalCount(newVal, oldVal) {
      if (newVal === 0) {
        this.listShow = false;
      }
    }
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
  z-index: 100;
  .content {
    display: flex;
    .left-item {
      flex: 1;
      background-color: #141d27;
      .logo-item {
        display: inline-block;
        padding: 0.16rem;
        background-color: #141d27;
        border-radius: 50%;
        position: relative;
        top: -0.18rem;
        margin-left: 0.32rem;
        &.highlight {
          .logo {
            background-color: #00a0dc;
            .icon-cart {
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
        .goodsNum {
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
        &.highlight {
          color: #fff;
        }
      }
      .delivery-price {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        margin-top: 0.47rem;
        padding-left: 0.32rem;
        color: #85878a;
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
        &.enough {
          background-color: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .ballcontainer {
    .ball {
      position: fixed;
      left: 0.8533rem;
      bottom: 0.5867rem;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
    .inner {
      width: 0.4267rem;
      height: 0.4267rem;
      border-radius: 50%;
      background-color: rgb(0, 160, 220);
      transition: all 0.4s linear;
    }
  }
  .shopcart-list {
    position: absolute;
    left: 0;
    bottom: 1.28rem;
    width: 100%;
    background-color: #fff;
    z-index: -1;
    .list-header {
      height: 1.0667rem;
      background: #f3f5f7;
      border-bottom: 1px solid #dbdee1;
      .title {
        .font-dpr(14px);
        line-height: 1.0667rem;
        float: left;
        margin-left: 0.48rem;
      }
      .empty {
        .font-dpr(12px);
        line-height: 1.0667rem;
        float: right;
        margin-right: 0.48rem;
        color: #00a0dc;
      }
    }
    .list-content {
      max-height: 5.8rem;
      overflow: hidden;
      .list-item {
        height: 1.28rem;
        margin: 0 0.48rem;
        background-color: #fff;
        border-bottom: 1px solid #dbdee1;
        position: relative;
        line-height: 1.28rem;
        .price {
          line-height: 1.28rem;
          position: absolute;
          top: 0;
          right: 2.4rem;
        }
        .cartcontrol-wrapper {
          position: absolute;
          top: 0.22rem;
          right: 0.1rem;
          line-height: normal;
        }
      }
    }
  }
  .cart-shdow {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -2;
    background: rgba(0, 0, 0, 0.5);
  }
}

.slidedown-enter-active,
.slidedown-leave-active {
  transition: all 0.3s ease;
}
.slidedown-enter,
.slidedown-leave-to {
  transform: translate3d(0, 100%, 0);
}
</style>