<template>
  <div class="m-header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" class="avatar-img">
      </div>
      <div class="content">
        <p class="seller-name">
          <span class="tag">品牌</span>{{seller.name}}</p>
        <p class="seller-dispatching">{{seller.description}} / {{seller.deliveryTime}}分钟送达</p>
        <p class="seller-supports" v-if="seller.supports">
          <span class="supports-ico" :class="supportsIco[seller.supports[0].type]"></span>{{seller.supports[0].description}}</p>
      </div>
      <div class="supports-btn" v-if="seller.supports">
        {{seller.supports.length}}个
        <i class="iconfont icon-enter"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <div class="bulletin">
        <i class="bulletin-icon"></i>
        <span class="bulletin-text">{{seller.bulletin}}</span>
      </div>
      <i class="iconfont icon-enter"></i>
    </div>
    <div class="background-wrapper" :style="{backgroundImage:'url(' + seller.avatar +')'}">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      supportsIco: ["des01", "des02", "des03", "des04", "des05"]
    };
  }
};
</script>
<style scoped lang="less">
@import "../../common/less/main.less";
.m-header {
  position: relative;
  color: #fff;
  background: rgba(7, 17, 27, 0.5);
      overflow: hidden;
  .content-wrapper {
    padding-left: 0.64rem;
    padding-top: 0.64rem;
    position: relative;
  }
  .avatar {
    display: inline-block;
    vertical-align: top;
    .avatar-img {
      width: 1.7067rem;
      height: 1.7067rem;
      border-radius: 5px;
    }
  }
  .content {
    display: inline-block;
    margin-left: 0.2133rem;
    .seller-name {
      .font-dpr(16px);
      font-weight: 600;
      .tag {
        display: inline-block;
        .font-dpr(12px);
        font-weight: 600;
        background-color: #ef1219;
        padding: 0.0267rem 0.15rem;
        vertical-align: top;
        margin-top: 0.04rem;
        border-radius: 8px;
        margin-right: 0.1867rem;
      }
    }
    .seller-dispatching {
      .font-dpr(14px);
      margin-top: 0.1067rem;
    }
    .seller-supports {
      .font-dpr(12px);
      margin-top: 0.16rem;
      .supports-ico {
        width: 0.4rem;
        height: 0.4rem;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 0.4rem 0.4rem;
        vertical-align: top;
        margin-right: 0.2133rem;
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
    }
  }
  .supports-btn {
    position: absolute;
    padding: 0 0.2133rem;
    height: 0.64rem;
    line-height: 0.64rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 24px;
    right: 0.32rem;
    bottom: 0;
    color: #fff;
    .font-dpr(12px);
    .icon-enter {
      .font-dpr(10px);
      margin-left: 0.1333rem;
    }
  }

  .bulletin-wrapper {
    position: relative;
    margin-top: 0.48rem;
    line-height: 0.7467rem;
    height: 0.7467rem;
    background: rgba(7, 17, 27, 0.2);
    padding: 0 0.4rem;
    .bulletin {
      .font-dpr(12px);
      .text-overflow();
      color: #fff;
      .bulletin-icon {
        width: 0.5867rem;
        height: 0.32rem;
        display: inline-block;
        background: url("bulletin@3x.png") no-repeat;
        background-size: 0.5867rem 0.32rem;
        vertical-align: top;
        margin-top: 0.21rem;
        margin-right: 0.1067rem;
      }
    }
    .icon-enter {
      position: absolute;
      right: 0.1333rem;
      bottom: 0;
      .font-dpr(10px);
      color: #fff;
    }
  }
  .background-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    filter: blur(18px);
  }
}
</style>