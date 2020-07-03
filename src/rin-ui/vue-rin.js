'use strict'
// promise兼容性处理
var _newscript = document.createElement('script')
_newscript.setAttribute('type', 'text/javascript')
_newscript.setAttribute(
  'src',
  'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js'
)
document.getElementsByTagName('head')[0].appendChild(_newscript)

var _Rin = new Object({
  // 修改body样式
  setBodyStyle: function(visible) {
    console.log('visible')
    if (visible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'visible	'
    }
  }
})

// @ 全局组件
// 遮罩层-------------------
var RinOverlay = Vue.component('RinOverlay', {
  name: 'RinOverlay',
  model: {
    prop: 'visible'
  },
  props: {
    visible: Boolean,

    showOverlay: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    RinOverlayStyle: function() {
      return {
        backgroundColor: this.showOverlay ? 'rgba(0,0,0,0.6)' : '',
        position: 'fixed',
        zIndex: 2032,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    }
  },
  methods: {
    change: function(flag) {
      this.$emit('change', flag)
    }
  },
  template: [
    '<transition name="rin-opacity" mode="out-in" @before-enter="change(true)" @before-leave="change(false)">',
    '<div v-show="visible" :style="[RinOverlayStyle]">',
    '<slot></slot>',
    '</div>',
    '</transition>'
  ].join('')
})

// 加载动画------------------------------
var RinLoading = Vue.component('RinLoading', {
  name: 'RinLoading',
  data: function() {
    return {
      boxStyle: {
        width: '7.6em',
        height: '7.6em',
        marginTop: '-60px',
        backgroundColor: 'hsla(0, 0%, 7%, 0.7)',
        textAlign: 'center',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#d5dbe4'
      },
      icon:
        'data:image/gif;base64,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'
    }
  },
  model: {
    prop: 'visible'
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    // 显示的文字
    text: {
      type: String,
      default: '数据加载中'
    },
    // 是否显示遮罩层
    showOverlay: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconStyle: function() {
      return {
        width: '40px',
        height: '40px',
        backgroundImage: 'url(' + this.icon + ')',
        backgroundSize: '40px 40px',
        backgroundRepeat: 'no-repeat'
      }
    }
  },
  created: function() {
    _Rin.setBodyStyle(this.visible)
  },
  watch: {
    visible: function(n) {
      // 触发动画-滚动禁止滚动
      _Rin.setBodyStyle(n)
    }
  },
  template: [
    '<rin-overlay v-model="visible" :showOverlay="showOverlay">',
    '<div v-if="visible">',
    '<div :style="boxStyle">',
    '<div :style="iconStyle"></div>',
    '<div style="margin-top: 10px;">{{ text }}</div>',
    '</div>',
    '</div>',
    '</div>',
    '</rin-overlay>'
  ].join('')
})

// 返回顶部组件----------------------------------
var RinBacktop = Vue.component('RinBacktop', {
  name: 'RinBacktop',
  data: function() {
    return {
      visible: false,
      hoverStyle: {}
    }
  },
  props: {
    // 滚动多少高度显示
    moveHeight: {
      type: Number,
      default: 200
    },
    // 距离底部距离
    bottom: {
      type: Number,
      default: 40
    },
    // 距离右边距离
    right: {
      type: Number,
      default: 40
    }
  },
  computed: {
    styleObj: function() {
      return {
        right: this.right + 'px',
        bottom: this.bottom + 'px',
        position: 'fixed',
        width: '40px',
        height: '40px',
        color: '#409eff',
        backgroundColor: '#fff',
        boxShadow: '0 0 6px rgba(0, 0, 0, 0.12)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '5'
      }
    }
  },
  methods: {
    // 回到顶部
    backTop: function() {
      console.log('back')

      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    // 计算滚动条
    handleScroll: function() {
      var scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop

      this.visible = scrollTop > this.moveHeight
    },
    mouseenter: function() {
      this.hoverStyle = {
        boxShadow:
          '0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5)'
      }
    },
    mouseleave: function() {
      this.hoverStyle = {}
    }
  },

  mounted: function() {
    window.addEventListener('scroll', this.handleScroll, true)
  },
  destroyed: function() {
    window.removeEventListener('scroll', this.handleScroll, true)
  },
  template: [
    '<div v-if="visible" @mouseenter="mouseenter()" @mouseleave="mouseleave()"  @click="backTop()" :style="styleObj">',
    '<i class="iconfont rin-icon-backtop" style="font-size: 20px;"></i>',
    '</div>'
  ].join('')
})

// 黑板组件----------------------------------
var RinBlackboard = Vue.component('RinBlackboard', {
  name: 'RinBlackboard',
  model: {
    prop: 'visible'
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  template: [
    '<div v-if="visible" class=".rin-black-board__box">',
    '<div class="rin-black-board__head-round"></div>',
    '<div class="rin-black-board__head-line"></div>',
    '<div class="rin-black-board__body">',
    '<slot></slot>',
    '</div>',
    '</div>'
  ].join('')
})

// 标签页---------------------------------
var RinTabs = Vue.component('RinTabs', {
  name: 'RinTabs',
  props: {
    // 控制动画的显示
    loading: {
      type: Boolean,
      default: true
    },
    // 提示文字
    tip: {
      type: String,
      default: '数据加载中'
    },
    // 遮罩层颜色
    backColor: {
      type: String,
      default: 'rgba(0,0,0, 0.4)'
    }
  },
  template: [
    '<section v-if="loading" class="loading__wrap" :style="{ background: backColor }">',
    '<div class="loading__box">',
    '<div class="loading__icon"></div>',
    '<div v-if="" style="margin-top: 10px;">{{ tip }}</div>',
    '</div>',
    '</section>'
  ].join('')
})

// 抽屉---------------------------------
var RinDrawer = Vue.component('RinDrawer', {
  name: 'RinDrawer',
  data: function() {
    return {
      drawer_show: false
    }
  },
  model: {
    prop: 'visible'
  },
  props: {
    visible: Boolean,
    // 提示文字
    show_close: {
      type: Boolean,
      default: true
    },
    title: String
  },
  watch: {
    visible: function() {
      setTimeout(function() {
        this.drawer_show = this.visible
      }, 200)
      console.log(this.drawer_show)
    }
  },
  template: [
    '<transition-group name="fade" tag="div" v-if="visible" class="rin-drawer__dialog">',
    '<div class="rin-drawer__container">',
    '<transition name="rin-zoom-in-bottom">',
    '<div v-visible="drawer_show" class="rin-drawer">',
    '<div class="rin-drawer__wrap">',
    '<div class="rin-drawer__title">',
    '<span>{{ title }}</span>',
    '<i v-if="show_close" class="iconfont rin-icon-close"></i>',
    '</div>',
    '<div class="rin-drawer__body">',
    '<div>13</div>',
    '</div>',
    '</div>',
    '</div>',
    '</transition>',
    '</div>',
    '</transition-group>'
  ].join('')
})

// 询问框---------------------------------
var RinDialog = Vue.extend({
  name: 'RinDialog',
  data: function() {
    return {
      showDialog: false
    }
  },
  props: {
    visible: Boolean,
    // 标题
    title: {
      type: String,
      default: '提示'
    },
    // 内容
    message: {
      type: String,
      default: '消息内容'
    },
    // 确认按钮的文字
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    // 取消按钮的显示文字
    cancelButtonText: {
      type: String,
      default: '取消'
    },
    // 确认按钮文字颜色
    confirmButtonColor: {
      type: String,
      default: '#409eff'
    },
    // 取消按钮文字颜色
    cancelButtonColor: {
      type: String,
      default: '#303133'
    },
    // 是否显示遮罩层
    showOverlay: {
      type: Boolean,
      default: true
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true
    },
    // 是否显示关闭按钮
    showCancelButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 确认
    confirm: function() {
      this.showDialog = false
    },
    // 取消
    cancel: function() {
      this.showDialog = false
    },
    // 离开时触发
    leave: function() {
      this.$emit('update:visible', false)
    }
  },
  created: function() {
    this.showDialog = this.visible
  },
  template: [
    '<rin-overlay v-model="visible" :showOverlay="showOverlay" @change="showDialog = $event">',
    '<transition name="rin-zoom" mode="out-in" @leave="leave()">',
    '<div v-if="showDialog" class="rin-confirm-box" @closed="this.$emit(closed)">',
    '<div class="rin-confirm__header" v-if="showTitle">',
    '<div class="rin-confirm__title">',
    '<span>{{ title }}</span>',
    '</div>',
    '</div>',
    '<div class="rin-confirm__content">',
    '<slot v-if="$slots.default"></slot>',
    '<div v-else class="rin-confirm-box__message">',
    '<span>{{ message }}</span>',
    '</div>',
    '</div>',
    '<div class="rin-confirm__footer-btns">',
    '<button v-if="showCancelButton" class="rin-confirm__btn" @click="cancel()" style="border-right: 1px solid #ebeef5;" :style="{color: cancelButtonColor }">',
    '<span>{{ cancelButtonText }}</span>',
    '</button >',
    '<button :style="{color: confirmButtonColor}" class="rin-confirm__btn" @click="confirm()">',
    '<span>{{ confirmButtonText }}</span>',
    '</button>',
    '</div>',
    '</div>',
    '</transition>',
    '</rin-overlay>'
  ].join('')
})

var $RinConfirm = function(o) {
  console.log(o)
  return new Promise(function(resolve, reject) {
    var D = new RinDialog({ el: document.createElement('div') })
    // NEW一个对象，然后插入body里面
    document.body.appendChild(D.$el)
    // console.log(D.$el)
    for (var key in o) {
      if (o[key]) {
        D[key] = o[key]
      }
    }
    D.visible = true
    D.confirm = function() {
      resolve()

      D.visible = false
    }

    D.cancel = function() {
      reject()
      D.visible = false
    }
  })
}

Vue.prototype.$confirm = $RinConfirm

// var version = '1.0.0'

// var install = function(Vue, config = {}) {
//   if (install.installed) return

//   Vue.component(RinOverlay.name, RinOverlay)
// }

// Vue.use({ version, install })

//暴露出去，别忘记挂载到vue的原型上
//   => 在main.js里面先引入 import theConfirm from './components/confirm/confirm.js'
//   => 再挂载 Vue.prototype.$confirm = theConfirm;
//在需要的地方直接用以下方法调用即可：
//   this.$confirm({
//     type:'提示',
//     msg:'是否删除这条信息？',
//     btn:{
//         ok:'yes',
//         no:'no'
//     }
// }).then(() => {
//     console.log('ok')
// })
// .catch(() => {
//     console.log('no')
// })
