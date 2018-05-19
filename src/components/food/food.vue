<template>
<transition name="silde">
  <div class="food" v-if="showFlag">
    {{food.name}}
  </div>
  </transition>
</template>

<script>
export default {
  data(){
    return{
      showFlag:false
    }
  },
  props:{
    food:{
      type:Object
    }
  },
  methods:{
    show(){
      this.showFlag = true;
    }
  }
};
</script>

<style scoped lang="less">
@import "../../common/less/main.less";
.food{
  position: fixed;
  background-color: red;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 80;
}

//页面切换动画样式
.silde-enter-active,
.silde-leave-active {
  transition: all 0.3s ease;
}
.silde-enter,
.silde-leave-to {
  transform: translate3d(100%, 0, 0) ;
}
</style>