<template>
  <transition name="rin-overlay"
              mode="out-in">

    <div v-show="value"
         class='rin-overlay__wrap'
         :style="{backgroundColor : overlay ? overlayColor: ''}">

      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RinOverlay',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    // @遮罩层背景颜色
    overlayColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.7)'
    },
    // @是否显示遮罩层
    overlay: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value (v) {
      console.log(v);

      document.body.style.overflow = v ? 'hidden' : 'visible'
    }
  }
}
</script>

<style scoped>
.rin-overlay__wrap {
  position: fixed;
  z-index: 1000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rin-overlay-enter-active,
.rin-overlay-leave-active {
  transition: all 0.2s ease;
}

.rin-overlay-enter,
.rin-overlay-leave-to {
  opacity: 0;
}
</style>
