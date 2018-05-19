<template>
  <div class="cartcontrol">
    <!-- 商品个数为0时，不显示减号和数量 -->
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decreaseCart">
        <span class="iconfont icon-minus"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop="addCart">
      <span class="iconfont icon-plus"></span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  props: {
    //这个组件关联到所有的商品和商品的数量，所以传入商品的对象
    food: {
      type: Object
    }
  },
  methods: {
    //点击加号添加商品数量
    addCart(event) {
      //如果food这个对象中没有count这个字段就创建它
      if (!this.food.count) {
        //使用vue.set()，第一个参数为设置的对象，第二个参数为添加的新字段名，第三个参数为设置的值
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      //传递点击按钮的元素dom给父级
      //this.$emit('add-cart',this.$refs.cartAdd);

      //使用事件bus派发事件传递参数，获取点击的元素传给其他组件
      this.$root.eventBus.$emit("addcart", event.target);
    },
    decreaseCart() {
      this.food.count--;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.cartcontrol {
  height: 1rem;
  .cart-decrease {
    display: inline-block;
    padding: 0.16rem;
  }
  .cart-count {
    display: inline-block;
    .font-dpr(12px);
    vertical-align: top;
    margin-top: 0.22rem;
    color: #c1c1c1;
  }
  .cart-add {
    display: inline-block;
    padding: 0.16rem;
  }
  .iconfont {
    .font-dpr(16px);
    color: #00a0dc;
  }
}
//页面切换动画样式
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  transform: translate3d(0.64rem, 0, 0) rotate(180deg);
  opacity: 0;
}
</style>