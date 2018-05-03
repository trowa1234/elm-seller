<template>
  <div class="star" :class="starType">
    <span v-for="(item,index) in classItems" :key="index" class="star-item" :class="item"></span>
  </div>
</template>

<script>
const LENGTH = 5; //星的个数
const CLS_ON = "on"; //全星样式名
const CLS_HALF = "half"; //半星样式名
const CLS_OFF = "off"; //空星样式名

export default {
  props: {
    //传入星的尺寸大小
    size: {
      type: String,
      default: "big"
    },
    //传入评分
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    //根据传入size来拼接样式，这样就可以星的大小样式
    starType() {
      return "star-" + this.size;
    },
    //根据评分生成星的数组
    classItems() {
      let result = []; //存放星的数组
      let score = Math.floor(this.score * 2) / 2; //简单的算法，可以取得整数或者是.5的小数。如:4.2*2取整后为8,再除2结果为4（显示4颗星）
      let hasDecimal = score % 1 !== 0; //判断处理后的评分是否有小数
      let integer = Math.floor(score); //取整处理后的评分，获得全星的个数
      //把全星的状态样式加入到数组中
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      //把半星的样式加入到数组中，半星只可能是1个
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      //使用循环把空星补齐，如果通常上面的全星半星的添加后，数组的长度没有星的总数，则添加空星的样式
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }

      return result;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    //星的三种状态样式，全星、半星、空星
    &.on {
      background-image: url("on.png");
    }
    &.half {
      background-image: url("half.png");
    }
    &.off {
      background-image: url("off.png");
    }
  }
  // 大星样式
  &.star-big {
    .star-item {
      width: 0.64rem;
      height: 0.64rem;
      margin-right: 0.64rem;
      background-size: 0.64rem 0.64rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  // 中星样式
  &.star-middle {
    .star-item {
      width: 0.4rem;
      height: 0.4rem;
      margin-right: 0.16rem;
      background-size: 0.4rem 0.4rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  // 小星样式
  &.star-small {
    .star-item {
      width: 0.2667rem;
      height: 0.2667rem;
      margin-right: 0.08rem;
      background-size: 0.2667rem 0.2667rem;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>