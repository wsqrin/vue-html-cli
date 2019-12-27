<template>
  <transition name="rin-overlay"
              mode="out-in">

    <div v-show="value"
         class='rin-overlay__wrap'
         :style="{backgroundColor : overlay ? overlayBackgroundColor: ''}">

      <transition name="rin-overlay-body"
                  mode="out-in">

        <slot></slot>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'RinOverlay',
  data () {
    return {
      showOverlay: false
    }
  },
  props: {
    value: Boolean,
    // @遮罩层背景颜色
    overlayBackgroundColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.66)'
    },
    // @是否显示遮罩层
    overlay: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    value (val) {
      this.showOverlay = val
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
  position: fixed;
}

.rin-overlay-enter-active,
.rin-overlay-leave-active {
  transition: all 0.2s ease;
}

.rin-overlay-enter,
.rin-overlay-leave-to {
  opacity: 0;
}

.rin-overlay-body-enter-active {
  transition: all 0.3s ease;
}

.rin-overlay-body-leave-active {
  transition: all 0.2s ease-in-out;
}

.rin-overlay-body-enter {
  opacity: 0;
  transform: scale(0.8);
}

.rin-overlay-body-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
