<template>
  <transition name="silde">
    <div class="food" v-if="showFlag" ref="foodScroll">
      <!-- better-scroll插件的滚动内部必须是1个整体元素，所以用div包裹一层 -->
      <div>
      <!-- 顶部图片宽高自适应，见下方css -->
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back-item" @click="hide">
          <i class="iconfont icon-back"></i>
        </div>
      </div>
      <div class="food-content">
        <p class="food-name">{{food.name}}</p>
        <p class="food-des">{{food.description}}</p>
        <p class="food-info">
          <span class="sellcount">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </p>
        <p class="food-price">
          <span class="price">￥{{food.price}}</span>
          <span v-show="food.oldPrice" class="oldprice">￥{{food.oldPrice}}</span>
        </p>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="add-cart" v-show="!food.count||food.count===0" @click="addCartFirst">
          加入购物车
        </div>
      </div>
      <space></space>
      <div class="food-introduce">
        <h2 class="title">商品介绍</h2>
        <p class="introduce-text">
          {{food.info}}
        </p>
      </div>
      </div>
    </div>
  </transition>
</template>

<script>
import cartcontrol from "@/components/cartcontrol/cartcontrol"; //商品加减数量组件
import space from "@/components/space/space"; //间隔组件
import Vue from "vue";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    show() {
      this.showFlag = true;

      //异步初始化滚动插件
      this.$nextTick(() => {
        if (!this.scroll) {
          //防止一直重新初始化，
          this.scroll = new BScroll(this.$refs.foodScroll);
        } else {
          this.scroll.refresh(); //当this.scroll已经初始化时，直接调用起重新计算滚动高度的方法
        }
      });
    },
    hide() {
      this.showFlag = false;
    },
    addCartFirst() {
      //使用vue.set()，第一个参数为设置的对象，第二个参数为添加的新字段名，第三个参数为设置的值
      //创建商品中的count属性，并且赋值为1
      Vue.set(this.food, "count", 1);

      //使用事件bus派发事件传递参数，获取点击的元素传给其他组件
      this.$root.eventBus.$emit("addcart", event.target);
    }
  },
  components: {
    cartcontrol,
    space
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.food {
  position: fixed;
  background-color: #fff;
  top: 0;
  left: 0;
  bottom: 1.28rem;
  width: 100%;
  // height: 100%;
  z-index: 80;
  .img-header {
    //顶部图片宽高自适应:使用padding-top: 100%;占满容器，它会根据width的宽度来撑开高度
    width: 100%;
    height: 0;
    position: relative;
    padding-top: 100%;
    img {
      //顶部图片宽高自适应:图片使用宽高100%，并且用绝对定位，这样在图片加载时就不会产生页面内容跳动
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    .back-item {
      position: absolute;
      top: 0.233rem;
      left: 0.233rem;
      width: 0.6667rem;
      height: 0.6667rem;
      line-height: 0.6667rem;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      .icon-back {
        .font-dpr(18px);
        color: #fff;
      }
    }
  }
  .food-content {
    padding: 0.48rem;
    position: relative;
    .food-name {
      .font-dpr(16px);
      color: #000;
      font-weight: 700;
      margin-bottom: 0.2133rem;
    }
    .food-des,
    .food-info {
      .font-dpr(12px);
      color: #93999f;
      margin-bottom: 0.1067rem;
    }
    .food-info {
      margin-bottom: 0.48rem;
      .rating {
        margin-left: 0.32rem;
      }
    }
    .food-price {
      .price {
        .font-dpr(14px);
        color: red;
        font-weight: 700;
      }
      .oldprice {
        .font-dpr(12px);
        color: #93999f;
        text-decoration: line-through;
      }
    }
    .cartcontrol-wrapper {
      position: absolute;
      right: 0.48rem;
      bottom: 0.28rem;
    }
    .add-cart {
      .font-dpr(12px);
      padding: 0.16rem 0.2133rem;
      color: #fff;
      background-color: #00a0dc;
      border-radius: 0.1333rem;
      position: absolute;
      right: 0.48rem;
      bottom: 0.48rem;
    }
  }
  .food-introduce {
    padding: 0.48rem;
    .title {
      .font-dpr(14px);
      font-weight: 700;
    }
    .introduce-text {
      padding: 0.16rem 0.2133rem 0 0.2133rem;
      .font-dpr(14px);
      color: #4d555d;
      line-height: 0.64rem;
    }
  }
}

//页面切换动画样式
.silde-enter-active,
.silde-leave-active {
  transition: all 0.3s ease;
}
.silde-enter,
.silde-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>