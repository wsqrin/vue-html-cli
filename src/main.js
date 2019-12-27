import '@/assets/scss/app.scss'
import '@/assets/icons/rin-icon.css'

import Test from './packages/test'
import Overlay from './packages/overlay'
import Dialog from './packages/dialog'
import Loading from './packages/loading'
import Backtop from './packages/backtop'
import Picker from './packages/picker'

import Confirm from './packages/message-box/comfirm'

const components = [
  Test,
  Overlay,
  Loading,
  Dialog,
  Backtop,
  Picker
]

const install = function (Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.prototype.$confirm = Confirm.install(Vue)
  // Vue.prototype.$ELEMENT = {
  //   size: opts.size || '',
  //   zIndex: opts.zIndex || 2000
  // }

}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
} else {
  console.error('vue is not defind')
}

export default {
  version: '1.0.0',
  Test: Test.use,
  Overlay: Overlay.use,
  Dialog: Dialog.use,
  Loading: Loading.use,
}



