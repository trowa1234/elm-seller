<template>
    <i class="supports-ico" :class="supportsIco[icotype]"></i>
</template>

<script>
export default {
  props:{
    icotype:{
      type:Number,
      default:0
    }
  },
  data(){
    return{
      icoStyle:{
        width:this.width + 'rem',
        height:this.height + 'rem',
        marginRight:this.marginRight + 'rem'
      },
      supportsIco: ["des01", "des02", "des03", "des04", "des05"]
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
</style>