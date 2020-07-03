<template>
  <div class='rin-drawer'>
    <transition name="fade"
                v-if="value"
                class="rin-drawer__dialog">

      <div class="rin-drawer__container">
        <transition name="rin-zoom-in-bottom">

          <div v-visible="drawer_show"
               class="rin-drawer">
            <div class="rin-drawer__wrap">
              <div class="rin-drawer__title">
                <span>{{ title }}</span>
                <i v-if="show_close"
                   class="iconfont rin-icon-close"></i>
              </div>
              <div class="rin-drawer__body">
                <div>13</div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
      drawer_show: false
    }
  },
  props: {
    value: Boolean,
    show_close: { // 提示文字
      type: Boolean,
      default: true
    },
    title: String // 标题
  },
  watch: {
    value (val) {
      setTimeout(() => {
        this.drawer_show = val
      }, 200)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
