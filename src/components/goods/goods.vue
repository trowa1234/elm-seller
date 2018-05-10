<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuscroll">
      <ul>
        <li v-for="(item,index) in GoodsData" :key="index" class="menu-item">

          <span class="menu-text">
            <!-- 数据中type值为-1表示没有图标显示。所以当type值大于0时才显示图标 -->
            <supports-ico v-if="item.type>0" class="supportsico" :icotype="item.type" :icoStyle="1"></supports-ico>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsscroll">
      <ul>
        <li v-for="(item,index) in GoodsData" :key="index" class="food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item">
              <div class="food-img">
                <img :src="food.icon" alt="">
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
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getGoodsData } from "@/api/api";
import supportsIco from "@/components/supports-ico/supports-ico";
import BScroll from "better-scroll";

export default {
  data() {
    return {
      GoodsData: []
    };
  },
  created() {
    this._getGoodsData();
  },
  //当dom加载完毕时初始化插件
  mounted() {
    setTimeout(() => {
      this._initScroll();
    }, 20);
  },
  methods: {
    _getGoodsData() {
      getGoodsData().then(res => {
        if (res.code == 0) {
          this.GoodsData = res.data;
        }
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuscroll, {});
      this.goodsScroll = new BScroll(this.$refs.goodsscroll, {});
    }
  },
  components: {
    supportsIco
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

    .menu-item {
      width: 100%;
      height: 1.4267rem;
      box-sizing: border-box;
      border-bottom: 1px solid #dddee0;
      padding: 0 0.3rem;
      display: table;
      .menu-text {
        display: table-cell;
        vertical-align: middle;
        line-height: 0.32rem;
        .font-dpr(12px);
        .supportsico {
          width: 0.32rem;
          height: 0.32rem;
          margin-right: 4px;
        }
      }
    }
  }
  .goods-wrapper {
    flex: 1;
    .food-list {
      .title {
        height: 0.6933rem;
        line-height: 0.6933rem;
        border-left: 0.0533rem solid #d9dde1;
        background-color: #f3f5f7;
        color: #93999f;
        padding-left: 0.32rem;
        .font-dpr(14px);
      }
      .food-item {
        display: flex;
        margin: 0.48rem 0.48rem 0 0.48rem;
        border-bottom: 1px solid #d9dde1;
        padding-bottom: 0.48rem;
        &:last-child {
          border-bottom: 0;
        }
        .food-img {
          flex: 0 0 1.52rem;
          margin-right: 0.2667rem;
          img {
            width: 1.52rem;
            height: 1.52rem;
            border-radius: 0.08rem;
          }
        }
        .food-content {
          .food-name {
            .font-dpr(14px);
            color: #000;
            margin-bottom: 0.1067rem;
          }
          .food-des,
          .food-info {
            .font-dpr(12px);
            color: #93999f;
            margin-bottom: 0.1067rem;
          }
          .food-info {
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
        }
      }
    }
  }
}
</style>