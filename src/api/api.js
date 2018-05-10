import Vue from 'vue'
import vueResource from "vue-resource"

Vue.use(vueResource);

//商家数据
export function getSellerData(){
  const url = '/api/seller';

  return Vue.http.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}

//商品数据
export function getGoodsData(){
  const url = '/api/goods';

  return Vue.http.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}