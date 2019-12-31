import Tabs from './src/Tabs.vue'
import TabItem from './src/TabItem.vue'

Tabs.install = Vue => {
  Vue.component(Tabs.name, Tabs)
}

TabItem.install = Vue => {
  Vue.component(TabItem.name, TabItem)
}

console.log(Tabs)
console.log(TabItem)


export {
  Tabs,
  TabItem
}