import Vue from 'vue'
import vueResource from "vue-resource"

Vue.use(vueResource);

export function getSellerData(){
  const url = '/api/seller';

  return Vue.http.get(url).then(res => {
    return Promise.resolve(res.data)
  })
}