<template>
    <i :class="ico"></i>
</template>

<script>
export default {
  props:{
    //根据icotype结合下面的样式数组supportsIco，显示不同的图标
    icotype:{
      type:Number,
      default:0
    },
    //图标样式变化，此图标有套样式，0为第一套样式，不为0为第二套样式
    icoStyle:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      supportsIco: ["des01", "des02", "des03", "des04", "des05"]
    }
  },
  computed:{
    //根据icoStyle的值判断使用第一套样式或者第二套样式。样式名通过拼接字符串得到
    ico(){
      return this.icoStyle == 0 ? ('supports-ico ' + this.supportsIco[this.icotype]) : ('supports-ico-t ' + this.supportsIco[this.icotype]);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";

  .supports-ico {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    vertical-align: top;
    &.des01 {
      background-image: url("decrease_2@3x.png");
    }
    &.des02 {
      background-image: url("discount_2@3x.png");
    }
    &.des03 {
      background-image: url("special_2@3x.png");
    }
    &.des04 {
      background-image: url("invoice_2@3x.png");
    }
    &.des05 {
      background-image: url("guarantee_2@3x.png");
    }
  }

  .supports-ico-t {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    vertical-align: top;
    &.des01 {
      background-image: url("decrease_4@3x.png");
    }
    &.des02 {
      background-image: url("discount_4@3x.png");
    }
    &.des03 {
      background-image: url("special_4@3x.png");
    }
    &.des04 {
      background-image: url("invoice_4@3x.png");
    }
    &.des05 {
      background-image: url("guarantee_4@3x.png");
    }
  }
</style>