<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuscroll">
      <ul>
        <!-- 绑定class，当当前索引值index等于计算属性中的currentIndex时，给这个li标签添加current这个样式名 -->
        <li v-for="(item,index) in GoodsData" :key="index" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
          <span class="menu-text">
            <!-- 数据中type值为-1表示没有图标显示。所以当type值大于0时才显示图标 -->
            <supports-ico v-if="item.type>0" class="supportsico" :icotype="item.type" :icoStyle="1"></supports-ico>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsscroll">
      <ul>
        <li v-for="(item,index) in GoodsData" :key="index" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(food,index) in item.foods" :key="index" class="food-item" @click="foodDetail(food,$event)">
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
              <div class="cartcontrol-wrapper">
                <!-- 传入item.foods中的每个food对象。@add-cart接收cartcontrol传递出来的事件 -->
                <cartcontrol :food='food'></cartcontrol>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 送餐费和起送价格都是通过父级数据传递过来，在购物车组件中通过props获取 -->
    <shopcart :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
    <food :food='selectFoodDetail' ref="fooddetail"></food>
  </div>
</template>

<script>
import { getGoodsData } from "@/api/api";
import supportsIco from "@/components/supports-ico/supports-ico"; //打折信息图标组件
import shopcart from "@/components/shopcart/shopcart"; //购物车组件
import cartcontrol from "@/components/cartcontrol/cartcontrol"; //商品加减数量组件
import food from "@/components/food/food"; //商品详情组件
import BScroll from "better-scroll";

export default {
  props: {
    seller: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      GoodsData: [], //接收商品数据
      listHeight: [], //存储每组商品的高度,实现滚动到相应位置左边菜单高亮
      scrollY: 0, //定义变量存放滚动条滚动的Y值
      selectFoodDetail:{} //商品详情数据
    };
  },
  computed: {
    //根据Y值和高度数组比较，落在哪个区间，那个区间就高亮显示
    //获取落在哪个区间
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]; //获取当前项高度
        let height2 = this.listHeight[i + 1]; //获取下一项高度，从而得到1个区间

        //当Y值大于等于当前高度，小于下一项高度时说明落在了这个区间，就返回这个区间。i就是这个区间
        //当height2为undefined是因为到了最后1项了，所以返回的就是最后1个区间
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0; //默认返回0，第1个区间
    },
    //在goos组件中的计算属性中定义selectFoods,这样就可以把这个selectFoods传递给shopcart组件
    //这样可以把shopcart和cartcontrol两个组件联动起来了
    selectFoods(){
      let foods = []; //定义空数组，添加的商品
      this.GoodsData.forEach((good) => { //第一层遍历商品的大类
        good.foods.forEach((food) => { //第二层遍历各大类下所有的商品
          if(food.count){ //如果商品对象有count这个属性,说明这个商品被选中
            foods.push(food); //就把这个商品添加到数组中
          }
        })
      })

      return foods; //获得选中的商品
    }
  },
  created() {
    this._getGoodsData();
  },
  //当dom加载完毕时初始化插件
  mounted() {
    //延迟20毫秒后再初始化
    setTimeout(() => {
      this._initScroll();
      this._getGoodsListHeight();
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
      this.menuScroll = new BScroll(this.$refs.menuscroll, {
        click: true //是指click为true，否则会阻止点击事件
      });

      this.goodsScroll = new BScroll(this.$refs.goodsscroll, {
        click: true,
        probeType: 3 //利用插件，设置probeType为3，可以开启监听滚动条的坐标值
      });

      //监听商品列表的滚动事件
      this.goodsScroll.on("scroll", pos => {
        //获取Y值。Y可能是小数所以使用Math.round对小数取整
        //而且向下滚动Y值得到是负值，所以使用Math.abs得到绝对值(正数)
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    //计算每组商品的高度
    _getGoodsListHeight() {
      let foodList = document.querySelectorAll(".food-list-hook"); //获取每个商品列表li元素
      let height = 0; //设置高度初始为0
      this.listHeight.push(height); //把初始高度值添加到数组，也就是第一个li的高度是从0开始的
      for (let i = 0; i < foodList.length; i++) {
        let listHei = foodList[i].clientHeight; //使用clientHeight获取每个li的高度
        height += listHei; //累加每个li的高度
        this.listHeight.push(height); //把每次循环得到的高度添加到数组中，数组中存放的就是所有li的高度值
      }
    },
    //左侧菜单点击，跳转到相应的商品位置
    selectMenu(index) {
      let foodList = document.querySelectorAll(".food-list-hook"); //获取每个商品列表li元素
      let el = foodList[index];

      //使用插件提供的方法跳转到指定元素位置
      this.goodsScroll.scrollToElement(el, 300);
    },
    //点事件传递商品详情数据
    foodDetail(food,event){
      this.selectFoodDetail = food;
      this.$refs.fooddetail.show();
    }
  },
  components: {
    supportsIco,
    shopcart,
    cartcontrol,
    food
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
      &.current {
        background-color: #fff;
        font-weight: 700;
        position: relative;
        z-index: 10;
        margin-top: -2px;
      }
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
        position: relative;
        display: flex;
        position: relative;
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
        .cartcontrol-wrapper {
          position: absolute;
          bottom: 0.1rem;
          right: 0;
        }
      }
    }
  }
}
</style>