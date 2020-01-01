<template>
  <div class='rin-backtop'
       v-show="show"
       @click="backTop()"
       :style="{
         right: `${right}px`,
         bottom: `${bottom}px`
       }">

    <svg t="1577433514892"
         class="icon"
         viewBox="0 0 1024 1024"
         version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         p-id="1512"
         width="20"
         height="20">
      <path d="M495.36 268.448l-296.672 384a31.936 31.936 0 0 0 25.28 51.552l593.504 0a32 32 0 0 0 25.28000001-51.552l-296.70400001-384a32 32 0 0 0-50.656 0"
            p-id="1513"
            fill="#409EFF"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'RinBacktop',
  data: function () {
    return {
      show: false,
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
  methods: {
    backTop () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.$emit('backTop')
    },
    handleScroll () { // 计算滚动条
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.show = scrollTop > this.moveHeight
    }
  },
  mounted () { window.addEventListener('scroll', this.handleScroll, true) },

  destroyed () { window.removeEventListener('scroll', this.handleScroll, true) }
}
</script>

<style scoped>
.rin-backtop {
  position: fixed;
  width: 40px;
  height: 40px;
  color: #409eff;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.14);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
}

.rin-backtop:hover {
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3);
}
</style>
