<template>
  <div id="app">
    <m-header :seller="sellerData"></m-header>
    <tab></tab>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from "@/components/header/m-header";
import Tab from "@/components/tab/tab";
import { getSellerData } from "@/api/api";
export default {
  name: "App",
  data(){
    return{
      sellerData:{}
    }
  },
  created() {
    this._getSellerData();
  },
  methods: {
    _getSellerData() {
      getSellerData().then(res => {
        if (res.code == 0) {
          this.sellerData = res.data;
        }
      });
    }
  },
  components: {
    MHeader,
    Tab
  }
};
</script>

<style scoped lang='less'>
#app {
}
</style>