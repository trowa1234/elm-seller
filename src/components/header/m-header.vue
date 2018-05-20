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
          <supports-ico class="supportsico" :icotype="seller.supports[0].type"></supports-ico>
          {{seller.supports[0].description}}
        </p>
      </div>
      <div class="supports-btn" v-if="seller.supports" @click="showDetail">
        {{seller.supports.length}}个
        <i class="iconfont icon-enter"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <div class="bulletin">
        <i class="bulletin-icon"></i>
        <span class="bulletin-text">{{seller.bulletin}}</span>
      </div>
      <i class="iconfont icon-enter"></i>
    </div>
    <div class="background-wrapper" :style="{backgroundImage:'url(' + seller.avatar +')'}">
    </div>
    <transition name="slide">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main">
            <h1 class="title">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="size" :score="seller.score"></star>
            </div>
            <div class="title-item">
              <div class="line"></div>
              <div class="title-text">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="supports-item">
              <ul>
                <li v-for="(item,index) in seller.supports" :key="index">
                  <supports-ico class="supportsico" :icotype="seller.supports[index].type"></supports-ico>
                  <span class="supports-text">{{seller.supports[index].description}}</span>
                </li>
              </ul>
            </div>
            <div class="title-item">
              <div class="line"></div>
              <div class="title-text">商家信息</div>
              <div class="line"></div>
            </div>
            <div class="sellerinfo-item">
              <p class="seller-info">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close">
          <i class="iconfont icon-close" @click="closeDetail"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Star from "@/components/star/star";
import supportsIco from "@/components/supports-ico/supports-ico";
export default {
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      supportsIco: ["des01", "des02", "des03", "des04", "des05"],
      detailShow: false,
      size: "big"
    };
  },
  methods: {
    showDetail() {
      this.detailShow = true;
    },
    closeDetail() {
      this.detailShow = false;
    }
  },
  components: {
    Star,
    supportsIco
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
  height: 3.56rem;
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
      .supportsico{
        width: 0.4rem;
        height: 0.4rem;
        margin-right: 0.1067rem;
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
    margin-top: 0.4rem;
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
  .detail {
    width: 100%;
    height: 100%;
    z-index: 200;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    position: fixed;
    left: 0;
    top: 0;
    .detail-wrapper {
      min-height: 100%;
      .clearfix();
      .detail-main {
        width: 100%;
        margin-top: 1.7067rem;
        padding-bottom: 1.7067rem;
        .title {
          .font-dpr(22px);
          font-weight: 700;
          text-align: center;
        }
        .star-wrapper {
          text-align: center;
          margin-top: 0.4267rem;
        }
        .title-item {
          width: 90%;
          display: flex;
          margin: 0.7467rem auto 0 auto;
          .line {
            flex: 1;
            border-bottom: 0.0267rem solid #5c6269;
            top: -0.32rem;
            position: relative;
          }
          .title-text {
            .font-dpr(20px);
            font-weight: 700;
            padding: 0 0.32rem;
          }
        }
        .supports-item {
          width: 86%;
          margin: 0 auto;
          padding-top: 0.64rem;
          li {
            margin-bottom: 0.32rem;
            width: 100%;
            .text-overflow();
          }
          .supportsico {
            width: 0.48rem;
            height: 0.48rem;
            margin-right: 0.16rem;
          }
          .supports-text {
            line-height: 0.48rem;
            .font-dpr(14px);
          }
        }
        .sellerinfo-item {
          width: 86%;
          margin: 0 auto;
          padding-top: 0.64rem;
          .seller-info {
            line-height: 0.64rem;
            .font-dpr(14px);
          }
        }
      }
    }
    .detail-close {
      position: relative;
      margin: -1.7067rem auto 0 auto;
      text-align: center;
      .icon-close {
        .font-dpr(24px);
        color: #8f9297;
      }
    }
  }
}

//页面切换动画样式
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}
</style>