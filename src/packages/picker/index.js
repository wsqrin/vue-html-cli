import OverLay from './src/Overlay.vue'

OverLay.install = Vue => {
  Vue.component(OverLay.name, OverLay)
}

export default OverLay